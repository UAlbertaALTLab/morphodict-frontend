import "../style.css";
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
import {faInfoCircle, faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Paradigm(state) {
    const paradigm = state.paradigm;
    const type = state.type;
    const showAudio = JSON.parse(window.localStorage.getItem("settings"))["showAudio"];
    let counter = 0;
    console.log("PARADIGM:", paradigm)

    return (
        <div className="container">
            <div className={"row"}>
                {
                    Object.keys(paradigm).map((label, index) => {
                        console.log(label);
                       return <Accordion key={index}>
                            <AccordionSummary>
                                <div>
                                    <Typography style={{fontWeight: "bold", fontSize: "14pt"}}>
                                        {label}
                                    </Typography>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {
                                    Object.keys(paradigm[label]["rows"]).map((element, index) => {
                                        let entry = paradigm[label]["rows"][element];
                                        if ("subheader" in entry) {
                                            console.log("found a subheader");
                                            return <div style={{fontWeight: "bolder"}}>{entry["subheader"]}</div>
                                        } else {
                                            // console.log(paradigm[label]["rows"][element]);
                                            let actor = paradigm[label]["rows"][element]["label"];
                                            return <div className={"row"}>
                                                <div className={"col"}>
                                                    <p style={{fontStyle: "italic"}}>{actor}</p>
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
                                                                <div className={"col"}>
                                                                    <p>
                                                                        {displayWord}&nbsp;
                                                                        <FontAwesomeIcon icon={faVolumeUp} size="xs" onClick={playRecording} />
                                                                    </p>
                                                                </div>
                                                            )
                                                        } else {
                                                            return (
                                                                <div className={"col"}>
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
