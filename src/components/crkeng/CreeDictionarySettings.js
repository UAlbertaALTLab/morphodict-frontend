/*
Name   : CreeDictionarySettings
Inputs : Props () None Allowed

Goal   : Allows the user to chaneg the settings of the app
*/

import {ListGroup, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import Settings from "../../HelperClasses/SettingClass";
import { color } from "@mui/system";

function CreeDictionarySettings(props) {
    let localStorage = window.localStorage;

    let settings = localStorage.getItem("settings");
    if (!settings) {
        settings = new Settings();
        localStorage.setItem("settings", JSON.stringify(settings));
    }

    settings = JSON.parse(localStorage.getItem("settings"));

    let changeSettingsMain = (e) => {
        settings.label = e.target.id;
        window.localStorage.setItem("settings", JSON.stringify(settings));
    };

    let changeSettingsEmoji = (e) => {
        settings.active_emoji = e.target.id;
        window.localStorage.setItem("settings", JSON.stringify(settings));
    };

    let changeSettingsDicts = (e) => {
        switch (e.target.id) {
            case "MD-DIC":
                settings.md_source = true;
                settings.cw_source = false;
                settings.aecd_source = false;
                settings.all_sources = false;
                break;
            case "CW-DIC":
                settings.md_source = false;
                settings.cw_source = true;
                settings.aecd_source = false;
                settings.all_sources = false;
                break;
            case "AECD-DIC":
                settings.md_source = false;
                settings.cw_source = false;
                settings.aecd_source = true;
                settings.all_sources = false;
                break;
            case "ALL-DIC":
                settings.md_source = false;
                settings.cw_source = false;
                settings.aecd_source = false;
                settings.all_sources = true;
                break;
            default:
                break;
        }
        window.localStorage.setItem("settings", JSON.stringify(settings));
    };

    let changeSettingsAudio = (e) => {
        switch (e.target.id) {
            case "audio-yes":
                settings.showAudio = true;
                break;
            case "audio-no":
                settings.showAudio = false;
                break;
            default:
                break;
        }

        window.localStorage.setItem("settings", JSON.stringify(settings));
    };

    let changeSettingsAudioSource = (e) => {
        switch (e.target.id) {
            case "MD-AUDIO":
                settings.md_audio = true;
                settings.mos_audio = false;
                settings.both_audio = false;
                break;
            case "MOS-AUDIO":
                settings.md_audio = false;
                settings.mos_audio = true;
                settings.both_audio = false;
                break;
            case "ALL-AUDIO":
                settings.md_audio = false;
                settings.mos_audio = false;
                settings.both_audio = true;
                break;
            default:
                break;
        }

        window.localStorage.setItem("settings", JSON.stringify(settings));
    }

    let changeSettingsMorphemes = (e) => {
         switch (e.target.id) {
            case "MORPH-EVERYWHERE":
                settings.morphemes_everywhere = true;
                settings.morphemes_headers = false;
                settings.morphemes_paradigms = false;
                settings.morphemes_nowhere = false;
                break;
            case "MORPH-HEADERS":
                settings.morphemes_everywhere = false;
                settings.morphemes_headers = true;
                settings.morphemes_paradigms = false;
                settings.morphemes_nowhere = false;
                break;
            case "MORPH-PARADIGMS":
                settings.morphemes_everywhere = false;
                settings.morphemes_headers = false;
                settings.morphemes_paradigms = true;
                settings.morphemes_nowhere = false;
                break;
            case "MORPH-NOWHERE":
                settings.morphemes_everywhere = false;
                settings.morphemes_headers = false;
                settings.morphemes_paradigms = false;
                settings.morphemes_nowhere = true;
                break;
            default:
                break;
        }

        window.localStorage.setItem("settings", JSON.stringify(settings));
    }

    let changeSettingsIc = (e) => {
        settings = JSON.parse(localStorage.getItem("settings"));
        switch (e.target.id) {
            case "IC-YES":
                settings.showIC = true;
                break;
            case "IC-NO":
                settings.showIC = false;
                break;
            default:
                break;
        }

        window.localStorage.setItem("settings", JSON.stringify(settings));
    }

    let changeSettingsShowEmoji = (e) => {
        settings = JSON.parse(localStorage.getItem("settings"));
        switch (e.target.id) {
            case "SHOW-EMOJI-YES":
                settings.showEmoji = true;
                break;
            case "SHOW-EMOJI-NO":
                settings.showEmoji = false;
                break;
            default:
                break;
        }

        window.localStorage.setItem("settings", JSON.stringify(settings));
    }

    let changeSettingsSynthAudio = (e) => {
        settings = JSON.parse(localStorage.getItem("settings"));
        switch (e.target.id) {
            case "SYNTH-YES":
                settings.synthAudio = true;
                break;
            case "SYNTH-NO":
                settings.synthAudio = false;
                break;
            default:
                break;
        }

        window.localStorage.setItem("settings", JSON.stringify(settings));
    }

    let changeSettingsSynthAudioParadigm = (e) => {
        settings = JSON.parse(localStorage.getItem("settings"));
        switch (e.target.id) {
            case "SYNTH-YES-PARA":
                settings.synthAudioParadigm = true;
                break;
            case "SYNTH-NO-PARA":
                settings.synthAudioParadigm = false;
                break;
            default:
                break;
        }

        window.localStorage.setItem("settings", JSON.stringify(settings));
    }

    let changeSettingsEspt = (e) => {
        settings = JSON.parse(localStorage.getItem("settings"));
        switch (e.target.id) {
            case "ESPT-YES":
                settings.espt = true;
                break;
            case "ESPT-NO":
                settings.espt = false;
                break;
            default:
                break;
        }

        window.localStorage.setItem("settings", JSON.stringify(settings));
    }

    let changeSettingsAuto = (e) => {
        settings = JSON.parse(localStorage.getItem("settings"));
        switch (e.target.id) {
            case "AUTO-YES":
                settings.autoTranslate = true;
                break;
            case "AUTO-NO":
                settings.autoTranslate = false;
                break;
            default:
                break;
        }

        window.localStorage.setItem("settings", JSON.stringify(settings));
    }

    return (
        <div className="container bg-white">
            <h2 style={{fontWeight: "bold", fontSize: "160%", paddingTop: "25px", paddingLeft: "5px", paddingBottom:"5px"}}>Settings</h2>

            <h2 className="settings-option-titles" style={{paddingTop:"10px"}}> Paradigm labels</h2>
            <p className="settings-option-subtitles">
                These are the labels that appear on the <b>paradigm table</b> to label
                features like person, tense, plurals, etc.
            </p>

            <ListGroup variant="flush" data-cy="label-choice">
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"ENGLISH"}
                        name="label_type"
                        label="Plain English labels"
                        defaultChecked={settings.label === "ENGLISH" ? true : false}
                        value={settings.label === "ENGLISH"}
                        onChange={changeSettingsMain}
                        style={{fontWeight: "bold", fontSize: "105%", paddingLeft: "35px"}}
                    />
                    <p className="settings-listgroup-item-subtext" style={{fontSize: "105%", paddingLeft:"0px", paddingTop: "10px"}}>
                        Examples: <i>I, you (one), s/he; something is happening now, something
                        happened earlier</i>
                        </p>
                </ListGroup.Item>

                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"LINGUISTIC (SHORT)"}
                        name="label_type"
                        label="Linguistic labels"
                        defaultChecked={settings.label === "LINGUISTIC (SHORT)" ? true : false}
                        value={settings.label === "LINGUISTIC (SHORT)"}
                        onChange={changeSettingsMain}
                        style={{fontWeight: "bold", fontSize: "105%", paddingLeft: "35px", borderWidth: "0 0 0px"}}
                    />
                    <p className="settings-listgroup-item-subtext" style={{fontSize: "105%", paddingLeft:"0px", paddingTop: "10px"}}>
                        Examples: <i>1s, 2s, 3s; Present, Past</i>
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"NÊHIYAWÊWIN"}
                        name="label_type"
                        label="nêhiyawêwin labels"
                        defaultChecked={settings.label === "NÊHIYAWÊWIN" ? true : false}
                        value={settings.label === "NÊHIYAWÊWIN"}
                        onChange={changeSettingsMain}
                        style={{fontWeight: "bold", fontSize: "105%", paddingLeft: "35px"}}
                    />
                    <p className="settings-listgroup-item-subtext" style={{fontSize: "105%", paddingLeft:"0px", paddingTop: "10px"}}>
                        Examples: <i>niya, kiya, wiya; ê-ispayik anohc/mêkwâc/mâna, ê-ispayik
                        kwayâc</i>
                    </p>
                </ListGroup.Item>
            </ListGroup>

            <h2 className="settings-option-titles">Show Morpheme Boundaries</h2>
            <p className="settings-option-subtitles">
                Where would you like morpheme boundaries to be shown?</p>

            <ListGroup variant="flush" data-cy="morpheme-choice">
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"MORPH-EVERYWHERE"}
                        name="morphemes"
                        label="Everywhere"
                        defaultChecked={settings.morphemes_everywhere ? true : false}
                        value={settings.morphemes_everywhere}
                        onChange={changeSettingsMorphemes}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Show morpheme boundaries everywhere
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"MORPH-HEADERS"}
                        name="morphemes"
                        label="Headers"
                        defaultChecked={settings.morphemes_headers ? true : false}
                        value={settings.morphemes_headers}
                        onChange={changeSettingsMorphemes}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Show morpheme boundaries in entry headers only
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"MORPH-PARADIGMS"}
                        name="morphemes"
                        label="Paradigms"
                        defaultChecked={settings.morphemes_paradigms ? true : false}
                        value={settings.morphemes_paradigms}
                        onChange={changeSettingsMorphemes}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Show morpheme boundaries in the paradigms
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"MORPH-NOWHERE"}
                        name="morphemes"
                        label="Nowhere"
                        defaultChecked={settings.morphemes_nowhere ? true : false}
                        value={settings.morphemes_nowhere}
                        onChange={changeSettingsMorphemes}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Don't show morpheme boundaries anywhere
                    </p>
                </ListGroup.Item>
            </ListGroup>

            <h2 className="settings-option-titles">Show Inflectional Category</h2>
            <p className="settings-option-subtitles">
                Would you like to see the inflectional category?</p>

            <ListGroup variant="flush" data-cy="ic-choice">
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"IC-YES"}
                        name="ic"
                        label="Yes"
                        defaultChecked={settings.showIC ? true : false}
                        value={settings.showIC}
                        onChange={changeSettingsIc}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        I want to see the inflectional category with every entry
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"IC-NO"}
                        name="ic"
                        label="No"
                        defaultChecked={settings.ShowIC ? false : true}
                        value={settings.ShowIC}
                        onChange={changeSettingsIc}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        I don't want to see the inflectional category with entries
                    </p>
                </ListGroup.Item>
            </ListGroup>

            <h2 className="settings-option-titles">Show Emojis</h2>
            <p className="settings-option-subtitles">
                Would you like to see the emojis?</p>

            <ListGroup variant="flush" data-cy="see-emoji-choice">
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"SHOW-EMOJI-YES"}
                        name="show-emoji"
                        label="Yes"
                        defaultChecked={settings.showEmoji ? true : false}
                        value={settings.showEmoji}
                        onChange={changeSettingsShowEmoji}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        I want to see emojis
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"SHOW-EMOJI-NO"}
                        name="show-emoji"
                        label="No"
                        defaultChecked={settings.showEmoji ? false : true}
                        value={settings.showEmoji}
                        onChange={changeSettingsShowEmoji}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        I do not want to see emojis
                    </p>
                </ListGroup.Item>
            </ListGroup>

            <h2 className="settings-option-titles">Emoji for animate nouns (awa words)</h2>
            <p className="settings-option-subtitles">
                Choose the emoji that will represent all awa words.
            </p>

            <ListGroup variant="flush" data-cy="animate-emoji-choice">
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"🧑🏽"}
                        name="emoji"
                        label="🧑🏽"
                        style={{paddingLeft: "35px"}}
                        defaultChecked={settings.active_emoti === "🧑🏽" ? true : false}
                        onChange={changeSettingsEmoji}
                    />
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"👵🏽"}
                        name="emoji"
                        label="👵🏽"
                        style={{paddingLeft: "35px"}}
                        defaultChecked={settings.active_emoti === "👵🏽" ? true : false}
                        onChange={changeSettingsEmoji}
                    />
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"👴🏽"}
                        name="emoji"
                        label="👴🏽"
                        style={{paddingLeft: "35px"}}
                        defaultChecked={settings.active_emoti === "👴🏽" ? true : false}
                        onChange={changeSettingsEmoji}
                    />
                </ListGroup.Item>

                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"🐺"}
                        name="emoji"
                        label="🐺"
                        style={{paddingLeft: "35px"}}
                        defaultChecked={settings.active_emoti === "🐺" ? true : false}
                        onChange={changeSettingsEmoji}
                    />
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"🐻"}
                        name="emoji"
                        label="🐻"
                        style={{paddingLeft: "35px"}}
                        defaultChecked={settings.active_emoti === "🐻" ? true : false}
                        onChange={changeSettingsEmoji}
                    />
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"🍞"}
                        name="emoji"
                        label="🍞"
                        style={{paddingLeft: "35px"}}
                        defaultChecked={settings.active_emoti === "🍞" ? true : false}
                        onChange={changeSettingsEmoji}
                    />
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"🌟"}
                        name="emoji"
                        label="🌟"
                        style={{paddingLeft: "35px"}}
                        defaultChecked={settings.active_emoti === "🌟" ? true : false}
                        onChange={changeSettingsEmoji}
                    />
                </ListGroup.Item>
            </ListGroup>

            <h2 className="settings-option-titles">Select Dictionary Source</h2>
            <p className="settings-option-subtitles">
                Select one of the following options to chose which entries are displayed
                in the search results
            </p>

            <ListGroup variant="flush" data-cy="dict-source-choice">
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"CW-DIC"}
                        name="dict-sources"
                        label="CW"
                        defaultChecked={settings.cw_source ? true : false}
                        value={settings.cw_source}
                        onChange={changeSettingsDicts}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Show entries from the Cree: Words dictionary. Wolvengrey, Arok,
                        editor. Cree: Words. Regina, University of Regina Press, 2001
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"MD-DIC"}
                        name="dict-sources"
                        label="MD"
                        defaultChecked={settings.md_source ? true : false}
                        value={settings.md_sources}
                        onChange={changeSettingsDicts}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Show entries from the Maskwacîs Dictionary. Maskwacîs Dictionary.
                        Maskwacîs, Maskwachees Cultural College, 1998.
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"AECD-DIC"}
                        name="dict-sources"
                        label="AECD"
                        defaultChecked={settings.aecd_source ? true : false}
                        value={settings.aecd_sources}
                        onChange={changeSettingsDicts}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Show entries from the Alberta Elders' Cree Dictionary/alberta ohci kehtehayak nehiyaw otwestamâkewasinahikan compiled by Nancy LeClaire and George Cardinal, edited by Earle H. Waugh. Edmonton: University of Alberta Press, 2002.
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"ALL-DIC"}
                        name="dict-sources"
                        label="All"
                        defaultChecked={settings.all_sources ? true : false}
                        value={settings.all_sources}
                        onChange={changeSettingsDicts}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                    Show entries from all sources (default) </p>
                </ListGroup.Item>
            </ListGroup>

            <h2 className="settings-option-titles">Select Audio Source</h2>
            <p className="settings-option-subtitles">
                Select one of the following options to chose which audio sources you'd like to hear
            </p>

            <ListGroup variant="flush" data-cy="audio-source-choice">
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"MD-AUDIO"}
                        name="audio-sources"
                        label="Maskwacîs"
                        defaultChecked={settings.md_audio ? true : false}
                        value={settings.md_audio}
                        onChange={changeSettingsAudioSource}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Show recordings from Maskwacîs.
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"MOS-AUDIO"}
                        name="audio-sources"
                        label="mōswacīhk"
                        defaultChecked={settings.mos_audio ? true : false}
                        value={settings.mos_audio}
                        onChange={changeSettingsAudioSource}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Show recordings from mōswacīhk.
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"ALL-AUDIO"}
                        name="audio-sources"
                        label="Both"
                        defaultChecked={settings.both_audio ? true : false}
                        value={settings.both_audio}
                        onChange={changeSettingsAudioSource}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                    Show recordings from Maskwacîs and mōswacīhk </p>
                </ListGroup.Item>
            </ListGroup>

            <h2 className="settings-option-titles">Show Paradigm Audio</h2>
            <p className="settings-option-subtitles">
                When available, paradigm audio will be displayed and played in paradigms
            </p>

            <ListGroup variant="flush" data-cy="paradigm-audio-choice">
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"audio-yes"}
                        name="audio-select"
                        label="Yes"
                        defaultChecked={settings.showAudio ? true : false}
                        value={settings.showAudio}
                        onChange={changeSettingsAudio}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">I would like to see audio in paradigm layouts</p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"audio-no"}
                        name="audio-select"
                        label="No"
                        defaultChecked={settings.showAudio ? false : true}
                        value={!settings.showAudio}
                        onChange={changeSettingsAudio}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">I do not want to see audio in paradigm layouts</p>
                </ListGroup.Item>
            </ListGroup>

            <h2 className="settings-option-titles">Show Synthesized Audio</h2>
            <p className="settings-option-subtitles">
                Synthesized audio is generated by a computer model. It is fairly accurate, but not as precise or natural
                as a human speaker. This setting applies to all speech except the paradigm layouts.
            </p>

            <ListGroup variant="flush" data-cy="synth-audio-choice">
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"SYNTH-YES"}
                        name="synth-audio"
                        label="Yes"
                        defaultChecked={settings.synthAudio ? true : false}
                        value={settings.synthAudio}
                        onChange={changeSettingsSynthAudio}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Show synthesized recordings
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"SYNTH-NO"}
                        name="synth-audio"
                        label="No"
                        defaultChecked={settings.synthAudio ? false : true}
                        value={settings.synthAudio}
                        onChange={changeSettingsSynthAudio}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Don't show synthesized recordings
                    </p>
                </ListGroup.Item>
            </ListGroup>

            <h2 className="settings-option-titles">Show Synthesized Audio in Paradigms</h2>
            <p className="settings-option-subtitles">
                Synthesized audio is generated by a computer model. It is fairly accurate, but not as precise or natural
                as a human speaker. This setting applies to the Paradigm Layouts specifically. <i>Note: this setting
                only applies if "Show Paradigm Audio" is set to "yes"</i></p>

            <ListGroup variant="flush" data-cy="synth-audio-paradigm-choice">
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"SYNTH-YES-PARA"}
                        name="synth-audio-paradigm"
                        label="Yes"
                        defaultChecked={settings.synthAudioParadigm ? true : false}
                        value={settings.synthAudioParadigm}
                        onChange={changeSettingsSynthAudioParadigm}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Show synthesized recordings in the paradigms
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"SYNTH-NO-PARA"}
                        name="synth-audio-paradigm"
                        label="No"
                        defaultChecked={settings.synthAudioParadigm ? false : true}
                        value={settings.synthAudioParadigm}
                        onChange={changeSettingsSynthAudioParadigm}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Don't show synthesized recordings in the paradigms
                    </p>
                </ListGroup.Item>
            </ListGroup>

            <h2 className="settings-option-titles">Automatically translate English phrases into Cree word-forms</h2>

            <ListGroup variant="flush" data-cy="espt-choice">
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"ESPT-YES"}
                        name="espt"
                        label="Yes"
                        defaultChecked={settings.espt ? true : false}
                        value={settings.espt}
                        onChange={changeSettingsEspt}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Generate Cree word-forms matching simple English verb or noun phrases
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"ESPT-NO"}
                        name="espt"
                        label="No"
                        defaultChecked={settings.espt ? false : true}
                        value={settings.espt}
                        onChange={changeSettingsEspt}
                        className="settings-listgroup-item-title"
                    />
                    <p className="settings-listgroup-item-subtext">
                        Only show dictionary entry headwords as they are
                    </p>
                </ListGroup.Item>
            </ListGroup>

            <h2 className="settings-option-titles">Automatically translate Cree word-forms into English phrases</h2>

            <ListGroup variant="flush" data-cy="auto-choice">
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"AUTO-YES"}
                        name="auto"
                        label="Yes"
                        defaultChecked={settings.autoTranslate ? true : false}
                        value={settings.autoTranslate}
                        onChange={changeSettingsAuto}
                        style={{fontWeight: "bold", fontSize: "105%", paddingLeft: "35px"}}
                    />
                    <p className="settings-listgroup-item-subtext">
                        Generate English definitions matching core Cree word-forms
                    </p>
                </ListGroup.Item>
                <ListGroup.Item className="settings-listgroup-item">
                    <Form.Check
                        type={"radio"}
                        id={"AUTO-NO"}
                        name="auto"
                        label="No"
                        defaultChecked={settings.autoTranslate ? false : true}
                        value={settings.autoTranslate}
                        onChange={changeSettingsAuto}
                        style={{fontWeight: "bold", fontSize: "105%", paddingLeft: "35px"}}
                    />
                    <p className="settings-listgroup-item-subtext">
                        Only show dictionary definitions as they are
                    </p>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default CreeDictionarySettings;
