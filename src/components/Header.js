import "./style.css";
import morphodict_default_logo from "../static/morphodict-default-logo-192.png";

import React, { useState } from "react";
import { InputAdornment, TextField, Snackbar, Alert } from "@mui/material";
import { Redirect } from "react-router-dom";
import Settings from "../HelperClasses/SettingClass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useEffect } from 'react';
import SearchResult from './SearchResult';
import {useLocation } from 'react-router-dom';

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
    const [queryString, setQueryString] = useState(""); // changed it from "" to false
    const [query, setQuery] = useState(false);
    const [type, setDispType] = useState("Latn");
    const [settingsLabelType, setSettingsLabelType] = useState("ENGLISH");
    const [showNoQueryAlert, setShowNoQueryAlert] = useState(false);
    const settingMenu = defaultSettings;
    const [isSearchBarDisabled, setSearchBarDisabled] = useState(false);

    // const backendUrl = process.env.REACT_APP_BACKEND;
    const disableOnUrl = '/word/';
    const location = useLocation();
    console.log(disableOnUrl)
    
    //Changes Made for back button
    useEffect(() => {
        const handleBackButton = () => {
          console.log('Back button pressed. Component is refreshed.');
          setQuery(true);
          setQueryString('')
          console.log(query)
          console.log(queryString)
          window.location.href = '/';  
        };
    
        window.addEventListener('popstate', handleBackButton);

        return () => {
          window.removeEventListener('popstate', handleBackButton);
        };
      }, []);

      useEffect(() => {
        const handleUrlChange = () => {
            setSearchBarDisabled(window.location.pathname.includes(disableOnUrl));
            console.log("ploi")
            console.log(setSearchBarDisabled)
          };

          window.addEventListener('popstate', handleUrlChange);

        return () => {
            window.removeEventListener('popstate', handleUrlChange);
          };
          // Check if the current URL matches the URL where you want to disable the search bar
         
        }, []);

    

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
        window.localStorage.setItem("settings", JSON.stringify(settings));
        window.dispatchEvent(new Event("settings"));
    };

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    window.dispatchEvent(new Event("type"));

    window.onload = () => {
        // console.log("pranjal")
        updateDictionaryName();
    }

    window.onstorage = () => {
        // When local storage changes, dump the list to
        // the console.
        console.log(JSON.parse(window.localStorage.getItem("settings")));
    };

    const handleSearchKey = (e) => {
        // if (e.target.value === "")
        // {
        //     e.preventDefault()
        //     console.log("llll")
        // }
       


        if (e.target.value === "" && e.key !== "Enter") {
            e.target.labels[0].innerText = "Search in Cree or English";
            console.log("lllml")
        }

        if (e.key === "Enter" && queryString && queryString !== "") {
            setQuery(true);
            setShowNoQueryAlert(false);
            window.dispatchEvent(new Event("executeSearch"));
            console.log("bhav")
        }

        else if (e.key === "Enter") {
            setShowNoQueryAlert(true);
            console.log("llll??")
        }

        else {
            setQueryString(e.target.value);
            console.log("hello")
        }

    };


    //start search when magnifynig glass icon is clicked
    const handleMagGlassClick = (e) => {
        if (queryString) {
            setQuery(true);
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

    // window.onpopstate = function(e) {  //prevents blank page when using "back" button  
    //     setQuery(true);
    //     window.dispatchEvent(new Event("executeSearch"));
    // }

    return (
        <div className="top-bar app__header">
            {query ? (
                <Redirect
                    push to={{
                        pathname: "/search/?q=" + queryString,
                        state: {
                            queryString: queryString,
                            query: query,
                            type: type,
                        },
                    }}
                ></Redirect>
            ) : console.log("no query")}

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
                    disabled: isSearchBarDisabled,                
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button onClick={handleMagGlassClick} className="mag-glass-btn" >
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" color="gray"> </FontAwesomeIcon>
                                </Button>
                            </InputAdornment>
                            
                        ),   
                    style: {backgroundColor: "white", fontStyle: "normal", borderRadius: "15px"},  //look of searchbar
                    
                    }}
                    // added these two lines because onclick was not perfoming if we comment onKeyUp
                    value={queryString}
                    onChange={(e) => setQueryString(e.target.value)}
                  

                    onKeyUp={handleSearchKey}

                ></TextField>
            </nav>




            {/* ++++++++++++++++++++ */}
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
