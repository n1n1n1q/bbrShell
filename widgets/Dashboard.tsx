import Apps from "gi://AstalApps"
import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import { Variable } from "astal"
import AudioSlider from "./dashboard_modules/AudioSlider"
import Brightness from "./dashboard_modules/BrightnessSlider"
import Keyboard from "./dashboard_modules/Keyboard"
import WifiQA from "./dashboard_modules/WifiQuick"
import BluetoothQA from "./dashboard_modules/BluetoothQuick"
import Screenshot from "./dashboard_modules/Screenshot"
import ColorPicker from "./dashboard_modules/Colorpick"
import Lock from "./dashboard_modules/Lock"
import WifiButton from "./dashboard_modules/Wifi"
import BluetoothButton from "./dashboard_modules/Bluetooth"
import AudioButton from "./dashboard_modules/Audio"
import SettingsButton from "./dashboard_modules/Settings"

const MAX_ITEMS = 8

function hide() {
    App.get_window("dashboard")!.hide()
}

function AppButton({ app }: { app: Apps.Application }) {
    return <button
        className="AppButton"
        onClicked={() => { hide(); app.launch() }}>
        <box>
            <icon icon={app.iconName} />
            <box valign={Gtk.Align.CENTER} vertical>
                <label className="name" truncate xalign={0} label={app.name} />
                {app.description && 
                    <label className="description" wrap xalign={0} label={app.description} />
                }
            </box>
        </box>
    </button>
}

export default function Dashboard(monitor: Gdk.Monitor) {
    const { CENTER } = Gtk.Align
    const apps = new Apps.Apps()

    const text = Variable("")


    // Create window as a POPUP
    const window = new Gtk.Window({ type: Gtk.WindowType.POPUP })

    return <window
        name="dashboard"
        gdkmonitor={monitor}
        anchor={Astal.WindowAnchor.LEFT | Astal.WindowAnchor.TOP}
        exclusivity={Astal.Exclusivity.PASS_THROUGH}
        keymode={Astal.Keymode.ON_DEMAND}
        layer={Astal.Layer.TOP}
        application={App} 
        onShow={() => text.set("")}
        onFocusOutEvent={() => hide()}
        onKeyPressEvent={(self, event: Gdk.Event) => {
            if (event.get_keyval()[1] === Gdk.KEY_Escape)
                self.hide()
        }}>
        <box className="Dashboard" orientation={1} >
            <box className="quick-access">
                <WifiQA />
                <BluetoothQA />
                <Screenshot />
                <ColorPicker />
                <Lock />
            </box>
            <box className="buttons-container" orientation={1}> 
                <box className="buttons-row-1">
                    <WifiButton />
                    <BluetoothButton />
                    <AudioButton />
                </box>
                <box className="buttons-row-2">
                    <SettingsButton />
                </box>
            </box>
            <box className="sliders-container" orientation={1}>
                <AudioSlider />
                <Brightness />
                <Keyboard />
            </box>
            <box className="notifications-center">
                
            </box>
        </box>
    </window>
}