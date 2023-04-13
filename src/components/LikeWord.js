/*
Name   : LikeWord
Inputs : Props ()
       
    likeWord        : a similer word to the current word found.   
    emoticon        : the emoticon that will show the current word 
    wordInformation : class of the word(current) information
       
Goal         : Show word information and also provide the ability to highlight and copy that information to the users clipboard. 
*/

import React, {useState} from "react";
import {Tooltip, OverlayTrigger, Button} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";


function updateLabelSettings(label, icPlainEnglish, icLinguisticLong, icLinguisticShort, icSourceLanguage) {
    let primaryInfo = "";
    let secondaryInfo = "";
    if (!icLinguisticLong) {
        icLinguisticLong = icLinguisticShort;
    }
    switch (label) {
        case "ENGLISH":
            primaryInfo = icPlainEnglish;
            secondaryInfo = icLinguisticShort + " - " + icSourceLanguage;
            return [primaryInfo, secondaryInfo];
        case "LINGUISTIC (LONG)":
            primaryInfo = icLinguisticLong;
            secondaryInfo = icLinguisticShort + " - " + icPlainEnglish + " - " + icSourceLanguage;
            return [primaryInfo, secondaryInfo];
        case "LINGUISTIC (SHORT)":
            primaryInfo = icLinguisticLong;
            secondaryInfo = icPlainEnglish + " - " + icSourceLanguage;
            return [primaryInfo, secondaryInfo];
        case "NÊHIYAWÊWIN":
            primaryInfo = icSourceLanguage;
            secondaryInfo = icLinguisticShort + " - " + icPlainEnglish;
            return [primaryInfo, secondaryInfo];
        default:
            return [primaryInfo, secondaryInfo];
    }
}

function getDisplayIc(wordform) {
    if (wordform["lemma_wordform"]) {
        return wordform.lemma_wordform.inflectional_category;
    } else {
        return wordform.inflectional_category;
    }

}

function getRelabelledIc(wordform) {
    if (wordform["lemma_wordform"]) {
        return wordform.lemma_wordform.inflectional_category_relabelled
    } else {
        return wordform;
    }
}

function getEmoticon(wordform) {
    if (wordform["lemma_wordform"]) {
        return wordform.lemma_wordform.wordclass_emoji;
    } else {
        return wordform.wordclass_emoji;
    }
}

const LikeWord = (props) => {
    let [persistTooltip, setPersistTooltip] = useState(false);
    let [showTooltip, setShowTooltip] = useState(false);
    const wordform = props.wordform;
    const relabelledIc = getRelabelledIc(wordform);
    let icLinguisticShort = wordform.inflectional_category_linguistic;
    let icLinguisticLong = wordform.inflectional_category_linguistic;;
    let icSourceLanguage = "";
    let icPlainEnglish = wordform.inflectional_category_plain_english;
    if (relabelledIc !== wordform) {
        icLinguisticShort = relabelledIc.linguistic_short;
        icLinguisticLong = relabelledIc.linguistic_long;
        icSourceLanguage = relabelledIc.source_language;
        icPlainEnglish = relabelledIc.plain_english
        if (icPlainEnglish === "Action word") {
            icPlainEnglish += " - " + wordform.lemma_wordform.inflectional_category_plain_english;
        }
    }
    const displayIc = getDisplayIc(wordform);
    console.log(displayIc);
    let emoticon = getEmoticon(wordform);
    let [settings, setSettings] = useState(JSON.parse(window.localStorage.getItem("settings")));

    if (emoticon && emoticon.includes("🧑🏽")) {
        emoticon = emoticon.replaceAll("🧑🏽", settings.active_emoji);
    }

    const showIc = settings.showIC;

    const showEmoji = settings.showEmoji;
    if (showEmoji === false) {
        emoticon = "";
    } else {
        emoticon = emoticon  //+ " - "
    }

    let primaryInfo = "";
    let secondaryInfo = "";

    window.addEventListener("settings", () => {
        setSettings(JSON.parse(window.localStorage.getItem("settings")));
    });

    [primaryInfo, secondaryInfo] = updateLabelSettings(settings.label, icPlainEnglish, icLinguisticLong, icLinguisticShort, icSourceLanguage);


    const infoLink = (
        <Button onMouseDown={(e)=> {e.preventDefault()}}
            onMouseLeave={() => setShowTooltip(false)}
            onMouseEnter={() => setShowTooltip(true)}
            onClick={() => handleInfoLinkClick()}
            className="like-word-text"
            style={{fontSize: "115%"}}
            >
            {primaryInfo}
        </Button>
    );

    const renderInformationToolTip = (props) => (
        <Tooltip id="word-info-tooltip" {...props}>
            {secondaryInfo}
        </Tooltip>
    );

    let bookIconInfo = "No info found";

    if (props.wordform.lemma_wordform) {
        if (props.wordform.lemma_wordform.linguist_info) {
            if (props.wordform.lemma_wordform.linguist_info.analysis){
                bookIconInfo = props.wordform.lemma_wordf0rm.linguist_info.analysis;
            } else if (props.wordform.lemma_wordform.linguist_info.stem) {
                bookIconInfo = props.wordform.lemma_wordform.linguist_info.stem;
            }
        }
    }

    // needed for Gunáhà refactor - analyis tag indicates an html table instead of a string
    /*else if (props.wordform){
        if (props.wordform.linguist_info.analysis){
            //bookIconInfo = <div>dangerouslySetInnerHTML={{__html: props.wordform.linguist_ingo.analysis}}</div>;
            console.log(props.wordform.linguist_info.analysis);
            //dangerouslySetInnerHTML={{__html: data}}
        } else {
            bookIconInfo = props.wordform.linguist_info.stem;
        }
    }*/

    const renderBookToolTip = (props) => (
        <Tooltip id="book-tooltip" {...props}>
            {bookIconInfo}
        </Tooltip>

    )

    const handleInfoLinkClick = () => {
        navigator.clipboard.writeText(secondaryInfo);
        setPersistTooltip(!persistTooltip)
    }

    return (<>
            <div data-cy="elaboration" className="container">
                <div style={{marginTop: "-1em", marginLeft: "-0.4em"}} className="d-flex flex-row">
                    <div className="mb-auto p-2">
                        <span style={{fontSize: "130%", verticalAlign: "-0.15em"}} data-cy="inflectionalCategory">{(showIc) ? displayIc + " " : ""}</span>
                        <span style={{fontSize: "130%", verticalAlign: "-0.15em"}} data-cy="wordclassEmoji">{showEmoji ? emoticon /*+ " "*/ : ""}</span>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={renderInformationToolTip}
                            show={persistTooltip||showTooltip}
                            
                        >
                            {infoLink}
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{show: 250, hide: 400}}
                            overlay={renderBookToolTip}
                            >
                        <Button style={{fontSize: "130%", verticalAlign: "-0.18em"}} className="book-icon-button">📖</Button>
                        </OverlayTrigger>

                    </div>

                </div>
            </div>
        </>
    );
};

export default LikeWord;
