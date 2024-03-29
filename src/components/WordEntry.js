import {AiOutlineSound} from "react-icons/ai";
import {Grid} from "@mui/material";
import React, {useState, CSSProperties, useEffect} from "react";
import Paradigm from "./Paradigm.js";
import MultiPlayer from './MultiPlayer';
import {useQuery} from "react-query";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ClipLoader from "react-spinners/ClipLoader";
import {Button} from "react-bootstrap";
import LikeWord from "./LikeWord.js";

function WordEntry(props) {
    const backendUrl = process.env.REACT_APP_BACKEND;
    let word = window.location.href.split("/")[4];
    console.log(word)
    const [displayText, setDisplayText] = useState("");
    const settings = JSON.parse(window.localStorage.getItem("settings"));
    
    let [likeWordInfo, setLikeWordInfo] = useState(null);

    useEffect(() => {
        console.log("settings: ");
        console.log(JSON.parse(window.localStorage.getItem("settings")));
        setDisplayText(getDisplayText());
    }, [settings]);

    async function getWord() {
        if (word === "") {
            return null;
        }
        return fetch(backendUrl + "/api/word/" + word).then((res) => {
                if (res.status !== 200) {
                    console.log(res.status);
                    return res.status;
                } else {
                    return res.json();
                }
            }
        );
    }

    async function getLikeWordInfo() {
        if (word === "") {
            return null;
        }
        if (word === "k%C3%AE-@2"){
            word = "ki";
        }
        else if (word === "k%C3%AEm%C3%B4ci-@ipv"){
            word = "kîmôci";
        }
        console.log(word);
        return fetch(backendUrl + "/api/search/?name=" + word).then((res) => {
                if (res.status !== 200) {
                    console.log(res.status);
                    return res.status;
                } else {
                    return res.json();
                }
            }
        );
    }


    async function getWordRes() {
        let namedData = await getWord();
        console.log(namedData);
        let likeInfo = await getLikeWordInfo();
        console.log(likeInfo);

        //find correct 
        let searchResults = likeInfo["search_results"];
        for (let resultIndex in searchResults) {
            if (namedData.entry.lemma_id === searchResults[resultIndex].lemma_wordform.id) {
                setLikeWordInfo(searchResults[resultIndex]);
            }


        }
        console.log(likeWordInfo);
        try {
            // namedData = JSON.parse(namedData);
            return namedData;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    const {isFetching, error, data, refetch} = useQuery(
        "getWordRes",
        () => getWordRes(),
        {
            refetchOnWindowFocus: false,
        }
    );

    while (isFetching) {
        const override: CSSProperties = {
              display: "block",
              margin: "0 auto",
            };
        return <ClipLoader
        color={"red"}
        loading={isFetching}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    }

    let wordform = "";
    let wordInformation = "";
    let likeword = "";
    let recordings = "";
    let paradigm = "";
    let type = getType();

    window.addEventListener("settings" , () => {
        type = getType();
        setDisplayText(getDisplayText());
        
    });

    if ((!isFetching && typeof (data) === "number") || (!isFetching && !data)) {
        // No results found
        // or no search term given
        const searchWord = word.split("@")[0];
        return <>
            <Redirect
                to={{
                    pathname: "/search/?q=" + searchWord,
                    state: {
                        queryString: searchWord,
                        query: searchWord,
                        type: type,
                    },
                }}
            ></Redirect>
        </>
    }

    function getType() {
        let settings = JSON.parse(window.localStorage.getItem("settings"));
        if (settings.latn){return "Latn"}
        else if (settings.latn_x_macron){return "Latn-x-macron"}
        else if (settings.syllabics){return "Cans"}
        return "Latn";
    }

    if (!type) {
        type = "Latn"
    }

    if (!isFetching && !error && data !== null) {
        wordform = data.entry.wordform;
        recordings = data.entry.recordings;
        paradigm = data.entry.paradigm;
    }

    let recs = [];
    if (recordings) {
        recs = recordings.map((recording) =>
            <option onClick={submittedAudio} key={recording.url} data-link={recording.speaker_bio_url}
                    value={recording.recording_url}>
                {recording.speaker_name}, {recording.language[0]}
            </option>
        );
    }

    const handleSoundPlay = () => {
        const recToPlay = recordings[0].recording_url;
        const audio = new Audio(recToPlay);
        audio.play();
    };

    function submittedAudio() {
        const link = document.getElementById("audio_select").value;
        const audio = new Audio(link);
        audio.play();
    }

    const audioChanged = (e) => {
        const idx = e.target.selectedIndex;
        const option = e.target.querySelectorAll('option')[idx];
        const link = option.getAttribute('data-link');
        const linkElement = document.getElementById("learnMoreLink");
        linkElement.href = link;
        submittedAudio();
        return false;
    }

    if (type === "Latn" && process.env.REACT_APP_ISO_CODE === "cwd") {
        type = "Latn-x-macron"
    }
    
    function getDisplayText() {
        let text = ""
        if (!isFetching && !error && data !== null) {
            let settings = JSON.parse(window.localStorage.getItem("settings"));
            console.log("type in wordentry:", type);
            text =  wordform["text"][type];
            let emoji = wordform["wordclass_emoji"];

            if (emoji && emoji.includes("🧑🏽")) {
                emoji = emoji.replaceAll("🧑🏽", settings.active_emoji);
            }

            wordInformation = wordform["inflectional_category"] + "  " + emoji + "  ";
            likeword = wordform["inflectional_category_plain_english"][type];
            if (settings.morphemes_everywhere || settings.morphemes_headers) {
                if ("morphemes" in wordform) {
                    text =  wordform["morphemes"][type].join("•");
                }
            }
        }
        return text;
    }

    

   

    const wolvengrey =
        "Wolvengrey, Arok, editor. Cree: Words. Regina, University of Regina Press, 2001";
    const maskwacis =
        "Maskwacîs Dictionary. Maskwacîs, Maskwachees Cultural College, 1998.";
    const aecd = "Alberta Elders' Cree Dictionary/alberta ohci kehtehayak nehiyaw otwestamâkewasinahikan, compiled by Nancy LeClaire and George Cardinal, edited by Earle H. Waugh. Edmonton: University of Alberta Press, 2002."
    const tvpd = "Starlight, Bruce, Gary Donovan, and Christopher Cox, editors. Tsuut'ina Verb Phrase Dictionary";

    const citationChoices = {"CW": wolvengrey, "MD": maskwacis, "AECD": aecd, "TVPD": tvpd}

    const renderInformationToolTip = (props) => (
        <Tooltip data-cy="meanings" id="button-tooltip" {...props}>
            {props.citation}
        </Tooltip>
    );

    let soundBtn = "";
    let sound = "sound";

    const handleSoundIconOnMouseOver = () => {
        document.getElementById("soundicon").style.color="#1c9dfe";
    }

    const handleSoundIconMouseLeave = () => {
        document.getElementById("soundicon").style.color="#286995";
    }
    

    if (sound !== "") {
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


    return (
        <>
            {(!isFetching && !error && data !== null) ? (
                <article id="definition" className="definition">
                    <header className="definition__header">
                        <Grid container direction="row">
                            <Grid item>
                                <h1 id="head" className="definition-title" data-cy="definition-title">
                                    <dfn className="definition__matched-head">
                                        <data id="data:head" value="{{ lemma.text }}">
                                            {displayText}
                                            {soundBtn}
                                        </data>
                                    </dfn>
                                </h1>
                            </Grid>
                        </Grid>
                    </header>
                    
                    <div style={{marginLeft: "-0.4em"}}>
                    <LikeWord wordform={likeWordInfo}/>
                    </div>
                    


                    {recordings[0] ? (<section
                        className="multiple-recordings"
                        id="recordings-dropdown"
                        data-cy="multiple-recordings"
                        key={"speakerDropdownSection"}
                    >
                        <h6 key={"speakerDropdownHelpText"}>Choose a name from the dropdown to hear the word said by the
                            speaker.</h6>
                        <select id="audio_select" onChange={audioChanged}>
                            {recs}
                        </select>
                        &nbsp;<FontAwesomeIcon icon={faVolumeUp} size="sm" onClick={submittedAudio} data-cy={"playRecording"} />&nbsp;
                        <a href={recordings[0].speaker_bio_url} id={"learnMoreLink"} target={"_blank"}>Learn more about
                            the speaker...</a>
                    </section>) : <></>}

                    <section className="definition__meanings" data-cy="meanings">
                        <ol className="meanings">
                            {wordform.definitions.map((def, index) => (
                                <li className="meanings__meaning" key={index} style={{fontSize: "120%"}}>
                                    {def.text} 
                                    <span style={{fontSize:"50%", verticalAlign: "0.1em", marginLeft: "0.5em", fontWeight: "700"}}> {def.source_ids.map((i, index) => (
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{show: 250, hide: 400}}
                                        overlay={<Tooltip id="button-tooltip-dicts" {...props} key={index + ""}>
                                            {citationChoices[i]}
                                        </Tooltip>}
                                    >
                                        <span>{i+" "}</span>
                                    </OverlayTrigger>))}</span>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {paradigm ? (<section>
                        <Paradigm paradigm={paradigm} type={type}></Paradigm>
                    </section>) : <></>}

                </article>
            ) : <></>}
        </>
    );
}
export default WordEntry;