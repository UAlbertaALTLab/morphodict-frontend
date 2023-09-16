/*
Name   : SearchSection
Inputs : Props ()
    
display: The resulting json image from the file. 
index  : the resulting index of the item from the returned array. 
       
Goal   : The purpose of this page is to display the search results gotten from user search. This is a single display of the word before a user picks the current file. 
       
*/
import React, {useEffect, useState} from "react";
import {Tooltip, OverlayTrigger, Button} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVolumeUp, faInfoCircle, faBorderNone} from '@fortawesome/free-solid-svg-icons'
import LikeWord from "./LikeWord";
const LANGUAGE_CODES = getLanguageCodesFromLocation();
const BASE_URL = "https://speech-db.altlab.app";
function getLanguageCodesFromLocation() {
    const location = window.location.toString();
    console.log("Hello");
    const audio_source = getCookie("audio_source");
    if (audio_source && audio_source != "both") {
      return [audio_source];
    } else if (location.includes(`itwewina`) || location.includes(`crk`)) {
      if (getCookie("synthesized_audio") == "yes") {
        return [`maskwacis`, `moswacihk`, `synth`];
      } else return [`maskwacis`, `moswacihk`];
    } else if (location.includes(`itwiwina`) || location.includes(`cwd`))
      return [`woodscree`];
    else if (location.includes(`gunaha`) || location.includes(`srs`))
      return [`tsuutina`];
    else if (location.includes(`nihiitono`)) return [`arapaho`];
    else if (location.includes(`guusaaw`) || location.includes(`hdn`))
      return [`haida`];
    return [`maskwacis`];
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
function getInflectionalCategory(wordInformation) {
    try {
        return wordInformation["lemma_wordform"]["inflectional_category_linguistic"] +
            " (" +
            wordInformation["lemma_wordform"]["inflectional_category"] +
            ")";
    } catch (TypeError) {
        return wordInformation["inflectional_category_linguistic"] +
            " (" +
            wordInformation["inflectional_category"] +
            ")";
    }
}


function getInflectionalCategoryPlainEnglish(wordInformation) {
    try {
        return wordInformation["lemma_wordform"]["inflectional_category_linguistic"] +
            " (" +
            wordInformation["lemma_wordform"]["inflectional_category_plain_english"] +
            ")";
    } catch (TypeError) {
        return wordInformation["inflectional_category_linguistic"] +
            " (" +
            wordInformation["inflectional_category_plain_english"] +
            ")";
    }
}

const SearchSection = (props) => {

    // let [soundBtnRes, setBtn] = useState();
    let [persistTooltip, setPersistTooltip] = useState(false);
    let [showTooltip, setShowTooltip] = useState(false);
    let sound = "";
    let soundBtn = "";
    useEffect(() => {
        async function fetchFirstRecordingURL(wordform) {
            let response = await getRecordingsForWordformsFromMultipleUrls([wordform]);
            return mapWordformsToBestRecordingURL(response).get(wordform);
        }
        async function getRecordingsForWordformsFromMultipleUrls(requestedWordforms) {
            let retObject = { matched_recordings: [], not_found: [] };
            for (let LANGUAGE_CODE of LANGUAGE_CODES) {
              let bulkApiUrl = `${BASE_URL}/${LANGUAGE_CODE}/api/bulk_search`;
              let response = await fetchRecordingUsingBulkSearch(
                bulkApiUrl,
                requestedWordforms
              );
              retObject["matched_recordings"] = retObject["matched_recordings"].concat(
                response["matched_recordings"]
              );
              retObject["not_found"] = retObject["not_found"].concat(
                response["not_found"]
              );
            }
            return retObject;
        }
        function mapWordformsToBestRecordingURL(response) {
            let wordform2recordingURL = new Map();
          
            for (let result of response["matched_recordings"]) {
              let wordform = result["wordform"];
          
              if (!wordform2recordingURL.has(wordform)) {
                // Assume the first result returned is the best recording:
                wordform2recordingURL.set(wordform, result["recording_url"]);
              }
            }
          
            return wordform2recordingURL;
        }
        async function fetchRecordingUsingBulkSearch(bulkApiUrl, requestedWordforms) {
            let batches = chunk(requestedWordforms);
          
            let allMatchedRecordings = [];
            let allNotFound = [];
          
            for (let batch of batches) {
              let response = await _fetchRecordingUsingBulkSearch(bulkApiUrl, batch);
          
              response["matched_recordings"].forEach((rec) =>
                allMatchedRecordings.push(rec)
              );
              response["not_found"].forEach((rec) => allNotFound.push(rec));
            }
          
            return {
              matched_recordings: allMatchedRecordings,
              not_found: allNotFound,
            };
        }
        async function _fetchRecordingUsingBulkSearch(bulkApiUrl, requestedWordforms) {
            // Construct the query parameters: ?q=word&q=word2&q=word3&q=...
            let searchParams = new URLSearchParams();
            for (let wordform of requestedWordforms) {
              searchParams.append("q", wordform);
            }
            let url = new URL(bulkApiUrl);
            url.search = searchParams;
          
            let response = await fetch(url);
            if (!response.ok) {
              throw new Error("Could not fetch recordings");
            }
          
            return response.json();
        }
        function chunk(collection) {
            const MAX_BATCH_SIZE = 30;
          
            // Chunk items iteratively, sort of like packing moving boxes, adding items
            // to one box at at time until the box gets full, and then moving on to a
            // new, empty box:
            let chunks = [[]];
            for (let item of collection) {
              // invariant: the array of all chunks has at least one chunk
              let currentChunk = chunks[chunks.length - 1];
          
              if (currentChunk.length >= MAX_BATCH_SIZE) {
                // The current chunk is full!
                // We can't add anymore items so start a new chunk.
                currentChunk = [];
                chunks.push(currentChunk);
              }
          
              // invariant: currentChunk.length < batch size:
              // ∴ it's safe to add an item to the current chunk
              currentChunk.push(item);
            }
          
            return chunks;
        }

        let wordform = displayWord();
        sound = fetchFirstRecordingURL(wordform)
        .then((sound) => {
            // Handle a successful response
            if (sound !== "") {
                console.log(sound)
                soundBtn = (
                    <Button onMouseDown={(e)=> {e.preventDefault()}}
                            id="soundbutton"
                            style={{backgroundColor:"transparent", border:"none", outline:"none", boxShadow:"none", paddingLeft: "1.2em"}}
                            data-cy="playRecording"
                            onClick={handleSoundPlay}
                            >
                        <FontAwesomeIcon icon={faVolumeUp}
                        id="soundicon"
                        size="xl"
                        style={{color:"#286995", marginLeft:"-12px"}}
                        onMouseOver={handleSoundIconOnMouseOver}
                        onMouseLeave={handleSoundIconMouseLeave}
                        />
                    </Button>
                );
            }
          })
          .catch((error) => {
            // Handle errors
            console.error("Error:", error);
          });
        //Information on api only learned on 2/24/2022 moved into sp3
        // if (sound !== "") {
        //     console.log("pranjalllll")
        //     soundBtnRes = (
        //         <Button variant="btn bg-white rounded" onMouseDown={(e)=> {e.preventDefault()}}
        //                 id="soundbutton"
        //                 onClick={handleSoundPlay}
        //                 data-cy="playRecording"
        //         >
        //             <FontAwesomeIcon icon={faVolumeUp}
        //             id="soundicon"
        //             size="xl"
        //             onMouseOver={handleSoundIconOnMouseOver}
        //             onMouseLeave={handleSoundIconMouseLeave}
        //             style={{color:"#286995", marginLeft:"-12px"}}
        //             />
        //         </Button>
        //     );
        //     // console.log(soundBtnRes);
        //     // setBtn(soundBtnRes);
        //     // <div className="definition-title__play-icon">{soundBtnRes}</div>
        // }

        // if (sound !== "") {
        //     console.log(sound)
        //     soundBtn = (
        //         <Button onMouseDown={(e)=> {e.preventDefault()}}
        //                 id="soundbutton"
        //                 style={{backgroundColor:"transparent", border:"none", outline:"none", boxShadow:"none", paddingLeft: "1.2em"}}
        //                 data-cy="playRecording"
        //                 onClick={handleSoundPlay}
        //                 >
        //             <FontAwesomeIcon icon={faVolumeUp}
        //             id="soundicon"
        //             size="xl"
        //             style={{color:"#286995", marginLeft:"-12px"}}
        //             onMouseOver={handleSoundIconOnMouseOver}
        //             onMouseLeave={handleSoundIconMouseLeave}
        //             />
        //         </Button>
        //     );
        // }
        // console.log(soundBtnRes);



      }, []);
    const getInformation = () => {
        if (wordInformation["relabelled_fst_analysis"]) {
            switch (settings.label) {
                case "ENGLISH":
                    return wordInformation["relabelled_fst_analysis"]["plain_english"];
                case "LINGUISTIC (LONG)":
                    return wordInformation["relabelled_fst_analysis"]["linguistic_long"];
                case "LINGUISTIC (SHORT)":
                    return wordInformation["relabelled_fst_analysis"]["linguistic_short"];
                case "NÊHIYAWÊWIN":
                    return wordInformation["relabelled_fst_analysis"]["source_language"];
                default:
                    return wordInformation["relabelled_fst_analysis"]
            }
        } else if (wordInformation["friendly_linguistic_breakdown_tail"]) {
            return wordInformation["friendly_linguistic_breakdown_tail"];
        } else {
            return [];
        }
    }
    //Information BTN tooltip(Here is where the info is to be typed out)
    let [settings, setSettings] = useState(JSON.parse(window.localStorage.getItem("settings")));
    window.addEventListener("settings", () => {
        setSettings(JSON.parse(window.localStorage.getItem("settings")));
    });
    const getStem = () => {
        if (wordInformation["lemma_wordform"]) {
            if (wordInformation["lemma_wordform"]["linguist_info"]) {
                if (wordInformation["lemma_wordform"]["linguist_info"]["stem"]) {
                    return wordInformation["lemma_wordform"]["linguist_info"]["stem"];
                }
            }
        } else if (wordInformation["linguist_info"]) {
            if (wordInformation["linguist_info"]["stem"]) {
                return wordInformation["linguist_info"]["stem"];
            }
        }
        return wordInformation["wordform_text"][displayType]
    }

    let wordInformation = props.display;
    if (!wordInformation) {
        return (<div>Something went wrong here</div>);
    }

    let information = getInformation(wordInformation, settings);

    const renderInformationToolTip = (props) => (
        <Tooltip data-cy="infoButtonInfo" id="button-tooltip" {...props}>
            {information.map((item, i) => (<li className="unbullet">{item}</li>))}
        </Tooltip>
    );

    const wordsDefs = wordInformation["definitions"];
    const displayType = props.type;

    const displayWord = function () {
        //TODO: this try catch is broken

        const settings = JSON.parse(window.localStorage.getItem("settings"));
        try {
            if (settings.morphemes_everywhere || settings.morphemes_headers) {
                return wordInformation["morphemes"][displayType].join("·");
            } else {
                return wordInformation['wordform_text'][displayType];
            }
        } catch (TypeError) {
            try {
                return wordInformation['wordform_text'][displayType];
            } catch (TypeError) {
                return wordInformation['text'];
            }
        }
        return wordInformation;
    }

    const infoSoundButtons = props.infoSoundButtons;
    const soundBtnResNew = props.soundBtnResNew;

    const wolvengrey =
        "Wolvengrey, Arok, editor. Cree: Words. Regina, University of Regina Press, 2001";
    const maskwacis =
        "Maskwacîs Dictionary. Maskwacîs, Maskwachees Cultural College, 1998.";
    const aecd = "Alberta Elders' Cree Dictionary/alberta ohci kehtehayak nehiyaw otwestamâkewasinahikan, compiled by Nancy LeClaire and George Cardinal, edited by Earle H. Waugh. Edmonton: University of Alberta Press, 2002."
    const tvpd = "Starlight, Bruce, Gary Donovan, and Christopher Cox, editors. Tsuut'ina Verb Phrase Dictionary"

    const citationChoices = {"CW": wolvengrey, "MD": maskwacis, "AECD": aecd, "TVPD": tvpd}

    const getLemmaWordform = () => {
        try {
            return wordInformation["lemma_wordform"];
        } catch (TypeError) {
            return "";
        }
    }

    let infoBtn = "";
    let wordBtn = "";
    let lemmaWordform = getLemmaWordform();
    async function handleSoundPlay() {
        const audio = new Audio(sound);
        audio.play();
    };

    const handleInfoLinkClick = () => {
        navigator.clipboard.writeText(getStem() +
        " - " +
        information);
        setPersistTooltip(!persistTooltip)
    }

    const handleSoundIconOnMouseOver = () => {
        document.getElementById("soundicon").style.color="#1c9dfe";
    }

    const handleSoundIconMouseLeave = () => {
        document.getElementById("soundicon").style.color="#286995";
    }

    if (information !== "") {
        infoBtn = (
            <Button
                style={{marginTop: "0.1em", marginLeft: "0.7em"}}
                variant="btn bg-white rounded shadow-none"
                onMouseDown={(e)=> {e.preventDefault()}}
                    onMouseLeave={() => setShowTooltip(false)}
                    onMouseEnter={() => setShowTooltip(true)}
                    onClick={() => handleInfoLinkClick()}
                data-cy="infoButton">
                <FontAwesomeIcon icon={faInfoCircle} size="xl" color="navy"/>
            </Button>
        );
    }


    const getEmoticon = () => {
        try {
            return wordInformation["lemma_wordform"]["wordclass_emoji"];
        } catch (TypeError) {
            try {
                return props.emoticon;
            } catch (e) {
                return "";
            }
        }
    }

    const getSlug = () => {
        try {
            return wordInformation["lemma_wordform"]["slug"];
        } catch (TypeError) {
            try {
                return props.slug;
            } catch (e) {
                return "";
            }
        }
    }

    const getIc = () => {
        if (wordInformation["lemma_wordform"]) {
            return wordInformation["lemma_wordform"];
        } else {
            return wordInformation;
        }
    }

    const shouldNotDisplayFormOf = () => {
        if (lemmaWordform) {
            return lemmaWordform["wordform_text"][displayType] === wordInformation["wordform_text"][displayType];
        } else {
            return true;
        }
    }

    const slug = getSlug();

    //change
    wordBtn = (
        <Button variant="btn bg-white rounded shadow-none" style={{fontSize:"105%", marginTop: "-1.5rem", textAlign: "left"}}>
            <Link
                to={{
                    pathname: "/word/" + slug,
                    state: {},
                }}
                data-cy="lemmaLink"
            >
                {displayWord()}
            </Link>
            {/*When font-settings is built in sp3 make the check from the local store here */}
            <br/>
        </Button>
    );

    return (
        <div id="results" className="shadow p-3 mb-5 bg-body rounded" data-cy="searchResults" style={{marginLeft: "auto", marginRight: "auto", paddingRight: "2em"}}>
            {wordInformation === "" &&
            <div>
                should never happen!
            </div>
            }
            <div className="d-flex flex-wrap" style={{marginLeft: "-0.8em", marginTop: "0.5em"}}>
                
                <div className="definition-title" data-cy="definitionTitle">{wordBtn}</div>
                <div className="definition__icon definition-title__tooltip-icon">
  {infoSoundButtons && (
    <>
      {/* Display the sound button */}
      <div className="sound-button">
        {/* Place your sound button component or code here */}
        {soundBtn}
      </div>
      {/* Display the info button */}
      <OverlayTrigger
        placement="bottom"
        overlay={renderInformationToolTip}
        show={persistTooltip || showTooltip}
      >
        {infoBtn}
      </OverlayTrigger>
    </>
  )}
</div>
                {/* <div name="sound-btn group" className="d-flex flex-row">
                <div className="definition__icon definition-title__tooltip-icon">
                    {infoSoundButtons ? 
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderInformationToolTip}
                        show={persistTooltip||showTooltip}
                    >
                        {infoBtn}
                    </OverlayTrigger> : null}
                </div> 
                </div> */}



                {/* <div name="sound-info-btn group" className="d-flex flex-row">
                <div className="definition__icon definition-title__tooltip-icon">
                    {infoSoundButtons ? 
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderInformationToolTip}
                        show={persistTooltip||showTooltip}
                    >
                        {infoBtn}
                    </OverlayTrigger> : null}
                </div> 

              

                </div> */}




            </div>
            <script src="pathToJs" defer></script>
            {shouldNotDisplayFormOf() ? <LikeWord
                wordform={wordInformation}

            /> : null}
            <ul style={{marginTop: "-0.5em"}} className="list-group text-center">
                {wordsDefs.map((item, i) => (
                    <li style={{fontSize: "130%", marginBottom: "-0.5em"}} className="list-group-item result-definition" data-cy="definitionText" key={i}>
                        {i + 1}. {item["text"]} &nbsp; <span id="result-definition-source-id"
                        style={{fontSize:"50%", verticalAlign: "0.1em", marginLeft: "-0.8em", fontWeight: "700"}}>
                        {item.source_ids.map((i, index) => (
                        <OverlayTrigger
                            placement="bottom"
                            delay={{show: 250, hide: 400}}
                            overlay={<Tooltip id="button-tooltip-dicts" {...props} key={index + ""}>
                                {citationChoices[i]}
                            </Tooltip>}
                        >
                            <span data-cy="citation">{i}&nbsp;</span>
                        </OverlayTrigger>))}</span>
                        {/*TODO: make a better trigger for src so that they can copy the tooltip SP3*/}
                    </li>
                ))}
            </ul>

            {shouldNotDisplayFormOf() ? <></> :
                <><p><i>Form of:</i></p>
                    <SearchSection
                        key={props.index + 0.5}
                        display={lemmaWordform}
                        index={props.index + 0.5}
                        type={props.type}
                        emoji={getEmoticon()}
                        slug={getSlug()}
                        information={getInformation()}
                        infoSoundButtons={false}
                    /></>}

        </div>
    );
};

export default SearchSection;
