//add positive reinforcement comments for extended quiet time
//different lights for "inside voices" vs full quiet learning time

import RangeInput from "./RangeInput";
import ToggleSwitch from "./ToggleSwitch";
import {toggleSettings} from "./Audio"

//Add user control to adjust sensitivity
//volumeModifier = ;

export default function Settings(props) {
    return (
        <div className="settings-container slide-out">
            <div>
            <h2>Settings</h2>
                <span className="material-symbols-outlined close-btn" onClick={toggleSettings}>
                    close
                </span>
                <div className="slidecontainer">
                    <RangeInput />
                </div>
                <ToggleSwitch />
            </div>
        </div>
    )
}