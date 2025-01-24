import Network from "gi://AstalNetwork"
import { bind } from "astal"
import { bash } from "../../utils/utils"

export default function WifiButton() {
    const network = Network.get_default()
    const wifi = bind(network, "wifi")
    
    return <box>
        <button 
            tooltipText={bind(wifi, "ssid").as(String)}
            className="dashboard-button"
            onClick={() => bash("nm-connection-editor")}
        >
            <icon icon="network-wireless-symbolic"/>
        </button>
    </box>
}