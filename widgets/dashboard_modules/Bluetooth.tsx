import Bluetooth from "gi://AstalBluetooth"
import { bind } from "astal"
import { bash } from "../../utils/utils"

export default function BluetoothButton() {
    const bluetooth = Bluetooth.get_default()
    
    return <box>
        <button 
            tooltipText="Bluetooth"
            className="dashboard-button"
            onClick={() => bash("blueman-manager")}>
            <icon icon="bluetooth-symbolic"/>
        </button>
    </box>
}