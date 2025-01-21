import AstalWp from "gi://AstalWp?version=0.1";
import { bind } from "astal"

export default function AudioToggle() {
    const speaker = AstalWp.get_default()?.audio.defaultSpeaker!
    
    return <box>
        <button 
            tooltipText="Audio"
            className="dashboard-button"
        >
            <icon icon="audio-volume-high-symbolic"/>
        </button>
    </box>
}