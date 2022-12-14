import {AiOutlineSound} from "react-icons/ai";
import {Grid} from "@mui/material";
import React, {useState} from "react";
import Paradigm from "./Paradigm/Paradigm";
import MultiPlayer from './MultiPlayer';
import {useQuery} from "react-query";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {Redirect} from "react-router-dom";

function WordEntry(props) {
    const backendUrl = process.env.REACT_APP_BACKEND;
    const word = window.location.href.split("/")[4];

    async function getWord() {
        if (word === "") {
            return null;
        }
        return fetch(backendUrl + "/api/word/" + word).then((res) => {
                if (res.status !== 200) {
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
    console.log(isFetching, error, data);

    let wordform = "";
    let wordInformation = "";
    let recordings = "";
    let paradigm = "";
    let type = getType();

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
        if ("state" in props.location && props.location.state) {
            if ("type" in props.location.state && props.location.state.type) {
                return props.location.state.type;
            }
        }
        return "Latn";
    }

    if (!type) {
        type = "Latn"
    }
    console.log("TYPE:", type);

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

    let displayText = "";
    if (!isFetching && !error && data !== null) {
        let settings = JSON.parse(window.localStorage.getItem("settings"));
        displayText = wordform["text"][type];
        console.log("WORDFORM", wordform);
        let emoji = wordform["wordclass_emoji"];

        if (emoji && emoji.includes("????????")) {
            emoji = emoji.replaceAll("????????", settings.active_emoji);
        }

        wordInformation = wordform["inflectional_category"] + "  " + emoji + "  " + wordform["inflectional_category_plain_english"][type]
        if (settings.morphemes_everywhere || settings.morphemes_headers) {
            displayText = wordform["morphemes"][type].join("???");
        }
    }

    const wolvengrey =
        "Wolvengrey, Arok, editor. Cree: Words. Regina, University of Regina Press, 2001";
    const maskwacis =
        "Maskwac??s Dictionary. Maskwac??s, Maskwachees Cultural College, 1998.";
    const aecd = "Alberta Elders' Cree Dictionary/alberta ohci kehtehayak nehiyaw otwestam??kewasinahikan, compiled by Nancy LeClaire and George Cardinal, edited by Earle H. Waugh. Edmonton: University of Alberta Press, 2002."
    const tvpd = "Starlight, Bruce, Gary Donovan, and Christopher Cox, editors. Tsuut'ina Verb Phrase Dictionary";

    const citationChoices = {"CW": wolvengrey, "MD": maskwacis, "AECD": aecd, "TVPD": tvpd}

    const renderInformationToolTip = (props) => (
        <Tooltip data-cy="meanings" id="button-tooltip" {...props}>
            {props.citation}
        </Tooltip>
    );

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
                                        </data>
                                    </dfn>
                                </h1>
                            </Grid>
                        </Grid>
                    </header>
                    <p> {wordInformation} </p>

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
                        <button onClick={submittedAudio} data-cy="playRecording">&#9655;</button>
                        <a href={recordings[0].speaker_bio_url} id={"learnMoreLink"} target={"_blank"}>Learn more about
                            the speaker...</a>
                    </section>) : <></>}

                    <section className="definition__meanings" data-cy="meanings">
                        <ol className="meanings">
                            {wordform.definitions.map((def, index) => (
                                <li className="meanings__meaning" key={index}>
                                    {def.text} {def.source_ids.map((i, index) => (
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{show: 250, hide: 400}}
                                        overlay={<Tooltip id="button-tooltip-dicts" {...props} key={index + ""}>
                                            {citationChoices[i]}
                                        </Tooltip>}
                                    >
                                        <span>{i}</span>
                                    </OverlayTrigger>))}
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
