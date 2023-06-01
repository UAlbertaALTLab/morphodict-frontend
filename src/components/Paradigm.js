import "./style.css";
import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom/cjs/react-router-dom.min";
import {
    Card,
    Collapse,
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Grid,
} from "@mui/material";
import {faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function getLabelSetting() {
    let settings = JSON.parse(window.localStorage.getItem("settings"));
    switch (settings["label"]) {
        case "ENGLISH":
            return "plain_english";
        case "LINGUISTIC (LONG)":
            return "ling_long";
        case "LINGUISTIC (SHORT)":
            return "ling_short";
        default:
            return "source_language";
    }
}


function getMorphemeSettings() {
    const settings = JSON.parse(window.localStorage.getItem("settings"));
    if (settings["morphemes_everywhere"]) {
        return "everywhere";
    }

    if (settings["morphemes_headers"]) {
        return "headers";
    }

    if (settings["morphemes_paradigms"]) {
        return "paradigms";
    }

    return "no";
}


function Paradigm(state) {
    const paradigm = state.paradigm;
    const type = state.type;
    const showAudio = JSON.parse(window.localStorage.getItem("settings"))["showAudio"];
    const showMorphemes = getMorphemeSettings();
    let counter = 0;

    let labelSetting = getLabelSetting();
    let [relabelling, setRelabelling] = useState(labelSetting);
    window.addEventListener("settings", () => {
        labelSetting = getLabelSetting();
        setRelabelling(labelSetting);
    });

    return (
        <div className="container" data-cy={"paradigm"} style={{width: "30em"}}>
            <div className={"row"}>
                {
                    Object.keys(paradigm).map((label, index) => {
                        let header = paradigm[label]["relabelled_header"][labelSetting];
                        return <Accordion key={index}>
                            <AccordionSummary>
                                <div>
                                    <Typography style={{fontWeight: "bold", fontSize: "14pt"}}>
                                        {header}
                                    </Typography>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {
                                    Object.keys(paradigm[label]["rows"]).map((element, index) => {
                                        let entry = paradigm[label]["rows"][element];
                                        if ("subheader" in entry) {
                                            let subheader = entry["subheader"][relabelling];
                                            return <div><div
                                                style={{textAlign: "center", fontStyle: "italic"}}>{subheader}</div>
                                                <br></br></div>
                                        } else {
                                            let actor = paradigm[label]["rows"][element]["label"][relabelling];
                                            if (header.includes("smaller")) {console.log(actor)}
                                            return  <div className="d-flex justify-content-between">
                                                <div style={{textAlign: "left"}}>
                                                    <p style={{fontStyle: "italic", textAlign: "left", marginLeft: "5em"}}>{actor}</p>
                                                </div>
                                                <div className="d-flex flex-column" style={{ marginRight: "0em", width: "10em"}}>
                                                {
                                                        Object.keys(entry["inflections"]).map((element, index) => {
                                                            let currentEntry = entry["inflections"][element];

                                                            let displayWord = currentEntry["wordform"];
                                                            if ("wordform_text" in currentEntry && type) {
                                                                displayWord = currentEntry["wordform_text"][type];
                                                            }
                                                            if (showMorphemes == "paradigms" || showMorphemes == "everywhere") {
                                                                if ("morphemes" in currentEntry && type) {
                                                                    displayWord = currentEntry["morphemes"][type].join("·");
                                                                }
                                                            }

                                                            let recording = "";
                                                            if ("recording" in currentEntry) {
                                                                recording = currentEntry["recording"];
                                                            }

                                                            if (recording && showAudio) {
                                                                function playRecording() {
                                                                    const audio = new Audio(recording);
                                                                    audio.play();
                                                                }

                                                                return (
                                                                <div className={"col"} style={{textAlign: "left"}}>
                                                                        <p>
                                                                            {displayWord}&nbsp;
                                                                            <FontAwesomeIcon icon={faVolumeUp} size="xs"
                                                                                            onClick={playRecording}/>
                                                                        </p>
                                                                    </div>
                                                                )
                                                            } else {
                                                                return (
                                                                <div style={{textAlign: "left", justifyContent: "left"}}>
                                                                        <p>{displayWord}</p>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                }
                                                </div>
                                            </div>
                                        }
                                    })
                                    

                                }
                               
                            </AccordionDetails>
                        </Accordion>
                    })
                }
            </div>
        </div>);
}

export default Paradigm;
