import { execAsync } from "astal/process"
import { bash } from "../../utils/utils"

export default function SettingsButton() {
    return <box>
        <button 
            onClick={() => bash("gnome-control-center")}
            tooltipText="Settings"
            className="dashboard-button"
        >
            <icon icon="emblem-system-symbolic"/>
        </button>
    </box>
}