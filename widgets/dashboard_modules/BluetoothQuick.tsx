import Bluetooth from "gi://AstalBluetooth"
import { bind } from "astal"

export default function BluetoothQA() {
    const bluetooth = Bluetooth.get_default()
    const adapter = bluetooth.adapter
    
    return <box visible={bind(bluetooth, "adapter").as(Boolean)}>
        {adapter && (
            <button 
                onClick={() => adapter.powered = !adapter.powered}
                tooltipText="Bluetooth"
                className="quick"
                setup={self => {
                    self.toggleClassName("active", adapter.powered)
                    self.hook(bind(adapter, "powered"), () => {
                        self.toggleClassName("active", adapter.powered)
                    })
                }}
            >
                <icon icon="bluetooth-symbolic"/>
            </button>
        )}
    </box>
}