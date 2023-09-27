import React, {useEffect, useState} from "react";
import {Tooltip, OverlayTrigger, Button} from "react-bootstrap";
import {faVolumeUp, faInfoCircle, faBorderNone} from '@fortawesome/free-solid-svg-icons'
import {Link, Redirect} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
const PreverbToolTip = (props) => {
    let item = props.preverb; 
    let definitions = item["definitions"];
    let url = item.lemma_url;
    console.log(item);
    console.log(url);
    let [showPreverbTooltip, setPreverbShowTooltip] = useState(false);
    let handlePreverbMouseEnter = () => {
        setPreverbShowTooltip(true);
      };
    
    let handlePreverbMouseLeave = () => {
        setPreverbShowTooltip(false);
    };
    const getSlug = () => {
        try {
            return item["slug"];
        } catch (TypeError) {
            try {
                return props.slug;
            } catch (e) {
                return "";
            }
        }
    }

    const slug = getSlug();
    console.log("My sluuug" + slug);

    let preverbLink = (
        <Button variant="btn bg-white rounded shadow-none" style={{fontSize:"105%", marginTop: "-0.5rem"}}>
            <Link
                to={{
                    pathname: "/word/" + slug,
                    state: {},
                }}
                data-cy="lemmaLink"
            >
                {item["text"]}
            </Link>
            {/*When font-settings is built in sp3 make the check from the local store here */}
            <br/>
        </Button>
    );
    let PreverbButton  = (
        <Button
            style={{marginTop: "0.1em", marginLeft: "0.7em"}}
            variant="btn bg-white rounded shadow-none"
            onMouseDown={(e)=> {e.preventDefault()}}
                onMouseLeave={() => setPreverbShowTooltip(false)}
                onMouseEnter={() => setPreverbShowTooltip(true)}
                data-cy="preverbButton">
            <FontAwesomeIcon icon={faInfoCircle} size="xl" color="navy"/>
        </Button>
    );
    const renderPreverbToolTip = () => (
        <Tooltip data-cy="infoButtonInfo" id="button-tooltip" >
            {definitions.map((defin, i) => (<li className="unbullet">{defin.text}</li>))}
        </Tooltip>
    );
    return(
        <li style={{fontSize: "100%", marginBottom: "-0.5em"}} className="list-group-item result-definition" data-cy="definitionText">
            {"Preverb : "} {preverbLink}
                <div className="definition__icon definition-title__tooltip-icon">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderPreverbToolTip()}
                        show={showPreverbTooltip}>
                        {PreverbButton}
                    </OverlayTrigger>
                </div>
                        {/*TODO: make a better trigger for src so that they can copy the tooltip SP3*/}
        </li>
    )
};
export default PreverbToolTip;

