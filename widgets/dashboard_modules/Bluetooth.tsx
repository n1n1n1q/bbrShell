import Bluetooth from "gi://AstalBluetooth"
import { bind } from "astal"

export default function BluetoothButton() {
    const bluetooth = Bluetooth.get_default()
    
    return <box>
        <button 
            tooltipText="Bluetooth"
            className="dashboard-button"
        >
            <icon icon="bluetooth-symbolic"/>
        </button>
    </box>
}