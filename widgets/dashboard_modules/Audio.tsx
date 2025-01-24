import AstalWp from "gi://AstalWp?version=0.1";
import { bash } from "../../utils/utils";

export default function AudioToggle() {
    const speaker = AstalWp.get_default()?.audio.defaultSpeaker!
    
    return <box>
        <button 
            tooltipText="Audio"
            className="dashboard-button"
            onClick={() => bash("pavucontrol")}
        >
            <icon icon="audio-volume-high-symbolic"/>
        </button>
    </box>
}