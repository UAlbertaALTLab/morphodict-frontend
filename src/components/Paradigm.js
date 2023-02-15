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

function Paradigm(state) {
    const paradigm = state.paradigm;
    const type = state.type;
    const showAudio = JSON.parse(window.localStorage.getItem("settings"))["showAudio"];
    let counter = 0;

    let labelSetting = getLabelSetting();
    let [relabelling, setRelabelling] = useState(labelSetting);
    window.addEventListener("settings", () => {
        labelSetting = getLabelSetting();
        setRelabelling(labelSetting);
    });

    return (
        <div className="container">
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
                                            return <div
                                                style={{fontWeight: "bolder", textAlign: "center"}}>{subheader}</div>
                                        } else {
                                            let actor = paradigm[label]["rows"][element]["label"][relabelling];
                                            return <div className={"row"}>
                                                <div className={"col"}>
                                                    <p style={{fontStyle: "italic", textAlign: "center"}}>{actor}</p>
                                                </div>
                                                {
                                                    Object.keys(entry["inflections"]).map((element, index) => {
                                                        let currentEntry = entry["inflections"][element];

                                                        let displayWord = currentEntry["wordform"];
                                                        if ("wordform_text" in currentEntry && type) {
                                                            displayWord = currentEntry["wordform_text"][type];
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
                                                                <div className={"col"} style={{textAlign: "center"}}>
                                                                    <p>
                                                                        {displayWord}&nbsp;
                                                                        <FontAwesomeIcon icon={faVolumeUp} size="xs"
                                                                                         onClick={playRecording}/>
                                                                    </p>
                                                                </div>
                                                            )
                                                        } else {
                                                            return (
                                                                <div className={"col"} style={{textAlign: "center"}}>
                                                                    <p>{displayWord}</p>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
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
