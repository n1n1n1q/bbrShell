import Network from "gi://AstalNetwork"
import { bind } from "astal"

export default function WifiQA() {
    const network = Network.get_default()
    const wifi = bind(network, "wifi")
    
    return <box visible={wifi.as(Boolean)}>
        {wifi.as(wifi => wifi && (
            <button 
                onClick={() => wifi.enabled = !wifi.enabled}
                tooltipText={bind(wifi, "ssid").as(String)}
                className="quick"
                setup={self => {
                    self.toggleClassName("active", wifi.enabled)
                    self.hook(bind(wifi, "enabled"), () => {
                        self.toggleClassName("active", wifi.enabled)
                    })
                }}
            >
                <icon icon={bind(wifi, "iconName")}/>
            </button>
        ))}
    </box>
}