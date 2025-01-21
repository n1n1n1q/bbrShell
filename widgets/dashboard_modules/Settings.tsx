import { execAsync } from "astal/process"

export default function SettingsButton() {
    return <box>
        <button 
            onClick={() => execAsync("gnome-control-center")}
            tooltipText="Settings"
            className="dashboard-button"
        >
            <icon icon="emblem-system-symbolic"/>
        </button>
    </box>
}