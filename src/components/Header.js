import "./style.css";
import morphodict_default_logo from "../static/morphodict-default-logo-192.png";

import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { InputAdornment, TextField, Snackbar, Alert } from "@mui/material";
import { Redirect } from "react-router-dom";
import Settings from "../HelperClasses/SettingClass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const crkSettings = {
    Latn: "SRO (êîôâ)",
    "Latn-x-macron": "SRO (ēīōā)",
    Cans: "Syllabics",
    ENGLISH: "English Labels",
    "LINGUISTIC (LONG)": "Linguistic Labels (long)",
    "LINGUISTIC (SHORT)": "Linguistic Labels (short)",
    NÊHIYAWÊWIN: "nêhiyawêwin labels",
}

const srsSettings = {
    ENGLISH: "English Labels",
    "LINGUISTIC (LONG)": "Linguistic Labels (long)",
    "LINGUISTIC (SHORT)": "Linguistic Labels (short)",
    "TSUUT'INA": "Tsuut'ina labels",
}

const hdnSettings = {
    ENGLISH: "English Labels",
    "LINGUISTIC (LONG)": "Linguistic Labels (long)",
    "LINGUISTIC (SHORT)": "Linguistic Labels (short)",
    "X̲AAD KÍL": "X̲aad Kíl labels",
}

const arpSettings = {
    ENGLISH: "English Labels",
    "LINGUISTIC (LONG)": "Linguistic Labels (long)",
    "LINGUISTIC (SHORT)": "Linguistic Labels (short)",
    "HINÓNO'ÉÍ": "Hinónoʼeitíít labels",
}

const cwdSettings = {
    "Latn-x-macron": "SRO (ēīōā)",
    CMRO: "CMRO",
    Cans: "Syllabics",
    ENGLISH: "English Labels",
    "LINGUISTIC (LONG)": "Linguistic Labels (long)",
    "LINGUISTIC (SHORT)": "Linguistic Labels (short)",
    NÊHIYAWÊWIN: "nîhithawîwin labels",
}

let defaultSettings;
switch (process.env.REACT_APP_ISO_CODE) {
    case "srs":
        defaultSettings = srsSettings;
        break;
    case "crk":
        defaultSettings = crkSettings;
        break;
    case "hdn":
        defaultSettings = hdnSettings;
        break;
    case "arp":
        defaultSettings = arpSettings;
        break;
    case "cwd":
        defaultSettings = cwdSettings;
        break;
    default:
        defaultSettings = crkSettings;
}

function Header(props) {
    const [dictionaryName, setDictionaryName] = useState(process.env.REACT_APP_NAME);
    const description = process.env.REACT_APP_SUBTITLE;
    const sourceLanguageName = process.env.REACT_APP_SOURCE_LANGUAGE_ENDONYM;
    const [queryString, setQueryString] = useState("");
    const [queryBool, setQueryBool] = useState(false);
    const [type, setDispType] = useState("Latn");
    const [settingsLabelType, setSettingsLabelType] = useState("ENGLISH");
    const [showNoQueryAlert, setShowNoQueryAlert] = useState(false);
    const settingMenu = defaultSettings;
    const apiUrl = process.env.REACT_APP_BACKEND;
    const history = useHistory();
    


    window.onpopstate = function(e) {
        setQueryBool(false);
        if (document.location.href.includes("search")) {
                //console.log("search page");
                //console.log("query: " + document.location.href.split("q=")[1]);
                if (document.location.href.split("q=")[1] != undefined) {
                    setQueryString(document.location.href.split("q=")[1]);
                    setQueryBool(true);
                    window.dispatchEvent(new Event("executeSearch"));
                }
            }
    
        else {
            //console.log("not search page");  //this line prints to console, but user still ends up on "/search/?q=" with no queryString
            setQueryString("");
            setQueryBool(false);
        }

    };



    if (!window.localStorage.getItem("settings")) {
        window.localStorage.setItem("settings", JSON.stringify(new Settings()));
    }

    const updateDictionaryName = () => {
        let settings = JSON.parse(window.localStorage.getItem("settings"));

        if (sourceLanguageName === "nêhiyawêwin") {
            if (settings.latn) {
                setDictionaryName(process.env.REACT_APP_NAME);
            } else if (settings.latn_x_macron) {
                setDictionaryName(process.env.REACT_APP_SRO_MACRONS_NAME);
            } else if (settings.syllabics) {
                setDictionaryName(process.env.REACT_APP_SYLLABICS_NAME);
            }
        }
    }

    const handleSettingChange = (value) => {
        let settings = JSON.parse(window.localStorage.getItem("settings"));
        setQueryBool(false);
        switch (value) {
            case "Latn":
                settings.latn = true;
                settings.latn_x_macron = false;
                settings.syllabics = false;
                settings.cmro = false;
                if (sourceLanguageName === "nêhiyawêwin") {
                    setDictionaryName(process.env.REACT_APP_NAME);
                }
                setDispType("Latn");
                break;
            case "Latn-x-macron":
                settings.latn = false;
                settings.latn_x_macron = true;
                settings.syllabics = false;
                settings.cmro = false;
                if (sourceLanguageName === "nêhiyawêwin") {
                    setDictionaryName(process.env.REACT_APP_SRO_MACRONS_NAME);
                }
                setDispType("Latn-x-macron");
                break;
            case "Cans":
                settings.latn = false;
                settings.latn_x_macron = false;
                settings.syllabics = true;
                settings.cmro = false;
                if (sourceLanguageName === "nêhiyawêwin") {
                    setDictionaryName(process.env.REACT_APP_SYLLABICS_NAME);
                }
                setDispType("Cans");
                break;
            case "CMRO":
                settings.latn = false;
                settings.latn_x_macron = false;
                settings.syllabics = false;
                settings.cmro = true;
                setDispType("CMRO");
                break;
            case "ENGLISH":
                settings.label = "ENGLISH";
                setSettingsLabelType("ENGLISH");
                break;
            case "LINGUISTIC (LONG)":
                settings.label = "LINGUISTIC (LONG)";
                setSettingsLabelType("LINGUISTIC (LONG)");
                break;
            case "LINGUISTIC (SHORT)":
                settings.label = "LINGUISTIC (SHORT)";
                setSettingsLabelType("LINGUISTIC (SHORT)");
                break;
            case "NÊHIYAWÊWIN":
                settings.label = "NÊHIYAWÊWIN";
                setSettingsLabelType("NÊHIYAWÊWIN");
                break;
            case "TSUUT'INA":
                settings.label = "TSUUT'INA";
                break;
            case "X̲AAD KÍL":
                settings.label = "X̲AAD KÍL";
                break;
            case "HINÓNO'ÉÍ":
                settings.label = "HINÓNO'ÉÍ";
                break;
            default:
                break;
        }
        if (document.location.href.includes("search")) {
            if (document.location.href.split("q=")[1] != undefined) {
                setQueryString(document.location.href.split("q=")[1]);
                setQueryBool(true);
                window.dispatchEvent(new Event("executeSearch"));
            }
        }
        window.localStorage.setItem("settings", JSON.stringify(settings));
        window.dispatchEvent(new Event("settings"));
    };

    //window.dispatchEvent(new Event("type"));

    window.onload = () => {
        updateDictionaryName();
    }

    window.onstorage = () => {
        // When local storage changes, dump the list to
        // the console.
        console.log(JSON.parse(window.localStorage.getItem("settings")));
    };

    const handleSearchKey = (e) => {
        setQueryBool(false);
        if (e.target.value === "" && e.key !== "Enter") {
            e.target.labels[0].innerText = "Search in Cree or English";
        }

        if (e.key === "Enter" && queryString && queryString !== "") {

            setQueryBool(true);
            setShowNoQueryAlert(false);
            //console.log("queryString to be sent : " + queryString);
            history.push(window.location.pathname, {queryString: queryString, query: queryString, type: type, data: data, isFetching: isFetching});
            window.dispatchEvent(new Event("executeSearch"));
        }

        else if (e.key === "Enter") {
            setShowNoQueryAlert(true);
        }

        else {
            setQueryString(e.target.value);
        }

    };


    //start search when magnifynig glass icon is clicked
    const handleMagGlassClick = (e) => {
        if (queryString) {
            setQueryBool(true);
            history.push(window.location.pathname, {queryString: queryString, query: queryString, type: type, data: data, isFetching: isFetching});
            window.dispatchEvent(new Event("executeSearch"));
        } else {
            setShowNoQueryAlert(true);
        }
    };

    // when search bar focused, change message to search instructions
    const setEnterMessage = (e) => {
        e.target.labels[0].innerText = `Press Enter/Return to Search`;

        // when focused, the search bar has a blue border
        // that blue border cuts into the words
        // trial and error told me I need an extra 115px of padding to stop that from happening
        let legends = document.getElementsByTagName("legend");
        for (let l of legends) {
            l.style.paddingRight = "115px";
        }
    };

    // when search unfocused, change message back to default
    const setDefaultMessage = (e) => {
        e.target.labels[0].innerText = `Search in Cree or English`;

        // we no longer need the extra 100px of padding
        let legends = document.getElementsByTagName("legend");
        for (let l of legends) {
            if (queryString) {
                // is the legend above the text?
                // then it still needs more space
                l.style.paddingRight = "75px";
            } else {
                // no queryString means text is inside the input field
                // no additional padding needed
                l.style.paddingRight = "0px";
            }
        }
    };

    const handleClose = () => {
        setShowNoQueryAlert(false);
    }

    const handleHighlightedSettings = function(id) {
        if (id == settingsLabelType || id == type) {
            return "#DCDCDC";
        }
    }

    async function getAllData() {
        //console.log("query in getAllData: ", queryString);
        if (queryString === "") {
        return [];
        }
        return fetch(`${apiUrl}/api/search/?name=${queryString}`).then((res) =>
        res.json()
        );
    }
    
    async function getMyResults() {
        let namedData = await getAllData();
        try {
        // namedData = JSON.parse(namedData);
    
        return namedData["search_results"];
        } catch (err) {
        return "empty";
        }
    }
    
    const { isFetching, error, data, refetch } = useQuery(
        "getMyResults",
        () => getMyResults(),
        {
        refetchOnWindowFocus: false,
        }
    );
    
    window.addEventListener("executeSearch", () => refetch());

    return (
        <div className="top-bar app__header">
            {console.log("queryBool: "+queryBool) || (queryBool ?  (
                <Redirect
                    to={{
                        pathname: "/search/?q=" + queryString,
                        state: {
                            queryString: queryString,
                            query: queryString,
                            type: type,
                            data: data,
                            isFetching: isFetching,
                            queryBool: false,
                        },
                    }}
                ></Redirect>
            ): null)}


            <Snackbar open={showNoQueryAlert} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
              <Alert onClose={handleClose} severity="error">
                Please enter a word or a phrase to search
              </Alert>
            </Snackbar>

            <header className="branding top-bar__logo">
                <a className="branding__logo" href="/">
                    <img
                        className="branding__image"
                        src={morphodict_default_logo}
                        alt="mîkiwâhp (teepee) logo"
                    ></img>

                    <hgroup className="branding__text">
                        <h1 className="branding__heading branding__title">
                            {" "}
                            {dictionaryName}
                        </h1>
                        <p
                            className="branding__heading branding__subtitle"
                            role="doc-subtitle"
                        >
                            {description}
                        </p>
                    </hgroup>
                </a>
            </header>
            <nav className="search top-bar__search">
                
                <TextField
                    id="search"
                    className="search-bar"
                    variant="outlined"
                    width={"60%"}
                    fullWidth
                    label="Search in Cree or English"
                    autoComplete="off"  //prevents history from popping up
                    onFocus={setEnterMessage}
                    onBlur={setDefaultMessage}
                    
                    
                    //styling for label text
                    InputLabelProps={                      
                        {
                        style:{
                            fontStyle: "italic",
                            fontFamily: "",  //other acceptable fonts? - Tahoma, Segoe UI, Microsoft PhagsPa, Microsoft YaHei, Nirmala UI
                            fontSize: "160%", 
                            marginTop: "-7px",
                            color: "gray",
                            }
                        }
                    }

                   size="small"

                   InputProps={{                     
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button onClick={handleMagGlassClick} onMouseDown={(e)=> {e.preventDefault()} } className="mag-glass-btn" >
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" color="gray"> </FontAwesomeIcon>
                                </Button>
                            </InputAdornment>
                        ),   
                    style: {backgroundColor: "white", fontStyle: "normal", borderRadius: "15px"},  //look of searchbar
                    }}

                    onKeyUp={handleSearchKey}

                ></TextField>
            </nav>
            <nav className="top-bar__nav">
                <details className="toggle-box toggle-box--with-menu close-on-click-away">
                    <summary
                        id="settings-menu__button"
                        className="toggle-box__toggle"
                        data-cy="settings-menu"
                        aria-haspopup="menu"
                        tabIndex="0"
                    >
                        Settings
                    </summary>

                    <div
                        className="menu toggle-box__menu"
                        aria-labelledby="settings-menu__button"
                    >
                        <div className="menu__category">
                            <h3 className="menu__header">
                                Show {sourceLanguageName} words in…
                            </h3>
                            <ul className="menu__choices" data-cy="orthography-choices">
                                {/* list of setting menu */}
                                {Object.keys(settingMenu).map((id, index) => (
                                    <li className="menu-choice" key={index}>
                                        <button
                                            style={{backgroundColor: handleHighlightedSettings(id)}}
                                            data-orth-switch
                                            value={id}
                                            className="unbutton fill-width"
                                            onClick={() => handleSettingChange(id)}
                                        >
                      <span className="menu-choice__label">
                        {settingMenu[id]}
                        {id == "Cans"  &&  <hr style={{marginTop: "1.3em", marginBottom: "-0.5em"}} className="menu__separator"></hr>}

                      </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <hr style={{marginTop: "0.5em", marginBottom: "1em", marginLeft: "1.3em", marginRight: "1.3em"}} className="menu__separator"></hr>

                        <div className="menu__category">
                            <a
                                href="/settings"
                                className="menu-choice"
                                data-cy="settings-link"
                            >
                <span className="menu-choice__label fill-width" style={{marginTop: "-0.5em", marginBottom: "0.5em"}}>
                  View all settings
                </span>
                            </a>
                        </div>
                    </div>
                </details>
            </nav>
        </div>
    );
}

export default Header;
