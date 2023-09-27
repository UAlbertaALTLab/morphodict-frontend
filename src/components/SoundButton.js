import React, { CSSProperties } from "react";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons'
const SoundButton = (props) => {
    const handleSoundIconOnMouseOver = () => {
        document.getElementById("soundicon").style.color="#1c9dfe";
    }
    async function handleSoundPlay() {
        const audio = new Audio(soundLink);
        audio.play();
    };
    const handleSoundIconMouseLeave = () => {
        document.getElementById("soundicon").style.color="#286995";
    }
    let soundLink = props.sound; 
    let soundBtn = null;
    if(soundLink){
        soundBtn = (
            <Button onMouseDown={(e)=> {e.preventDefault()}}
                    id="soundbutton"
                    style={{backgroundColor:"transparent", border:"none", outline:"none", boxShadow:"none", paddingLeft: "1.2em"}}
                    data-cy="playRecording"
                    onClick={handleSoundPlay}
                    >
                <FontAwesomeIcon icon={faVolumeUp}
                id="soundicon"
                size="xl"
                style={{color:"#286995", marginLeft:"-12px"}}
                onMouseOver={handleSoundIconOnMouseOver}
                onMouseLeave={handleSoundIconMouseLeave}
                />
            </Button>
        );
    }
    return (
        <div style= {{marginTop: "0.1em"}} className="definition-title__play-icon">
            {soundBtn}
        </div> 
    )
}

export default SoundButton;