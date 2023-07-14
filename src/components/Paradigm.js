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
import { Button } from "react-bootstrap";

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
    let [expandThisAccordion, setExpandThisAccordion] = useState(Array(Object.keys(paradigm).length).fill(false));
    let [soundiconClicked, setSoundiconClicked] = useState(false);
    let [buttonMessage, setButtonMessage] = useState("EXPAND ALL");

    window.addEventListener("settings", () => {
        labelSetting = getLabelSetting();
        setRelabelling(labelSetting);
    });

    function changeButtonMessage() {
        if (buttonMessage == "EXPAND ALL") {
            setButtonMessage("COLLAPSE ALL");
            expandThisAccordion.fill(true);
        }
        else if (buttonMessage == "COLLAPSE ALL") {
            setButtonMessage("EXPAND ALL");
            expandThisAccordion.fill(false);
            
        }
    }

    function changeAccordionState(index) {
        if (!soundiconClicked) {
            let newArray = [...expandThisAccordion];
            newArray[index] = !newArray[index];
            setExpandThisAccordion(newArray);

            if (!newArray.includes(false)) {
                setButtonMessage("COLLAPSE ALL");
            }
            else if (!newArray.includes(true)) {
                setButtonMessage("EXPAND ALL");
            }
        } else {
            setSoundiconClicked(false);
        }
    
    }

    let soundicons = document.getElementsByName("soundicon");
    for (let i = 0; i < soundicons.length; i++) {
        soundicons[i].addEventListener("click", () => {
            setSoundiconClicked(true);
        });
    }

    return (  
        <div className="container" data-cy={"paradigm"} style={{width: "30em", maxWidth: "100%"}}>
        <Button 
            variant="btn bg-white rounded shadow-none"
            onClick={() => changeButtonMessage()}
            style={{marginTop: "1em", marginBottom: "1em", fontWeight: "bold", fontSize: "10pt", marginLeft: "-0.9em"}}>
                {buttonMessage}
                </Button>
            <div className={"row"}>
                {
                    Object.keys(paradigm).map((label, index) => {
                        let header = paradigm[label]["relabelled_header"][labelSetting];
                        return <Accordion key={index} expanded={expandThisAccordion[index]}   
                            onClick={() => {changeAccordionState(index)}} name="accordion">
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
                                                                                            onClick={playRecording} name="soundicon"/>
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
            <Button 
            variant="btn bg-white rounded shadow-none"
            onClick={() => changeButtonMessage()}
            style={{marginTop: "1em", marginBottom: "1em", fontWeight: "bold", fontSize: "10pt", marginLeft: "-0.9em"}}>
                {buttonMessage}
                </Button>
        </div>);
}

export default Paradigm;
