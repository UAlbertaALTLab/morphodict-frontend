import "../style.css";
import {useState, useEffect} from "react";
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

function Paradigm(state) {
    const paradigm = state.paradigm;
    const type = state.type;
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
                                                    <p style={{fontStyle: "italic"}}>{actor}&emsp;&emsp;</p>
                                                </div>
                                                {
                                                    Object.keys(entry["inflections"]).map((element, index) => {
                                                        if ("wordform_text" in entry["inflections"][element]) {
                                                            let wordform = entry["inflections"][element]["wordform_text"]
                                                            return <div className={"col"}> <p>{wordform[type]}</p> </div>
                                                        } else {
                                                            return <div className={"col"}> <p>{entry["inflections"][element]["wordform"]}</p> </div>
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
