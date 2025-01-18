import Apps from "gi://AstalApps"
import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import { Variable } from "astal"
import AudioSlider from "./dashboard_modules/AudioSlider"
import Brightness from "./dashboard_modules/Brightness"
import Keyboard from "./dashboard_modules/Keyboard"

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
        // __instance={window}
        name="dashboard"
        gdkmonitor={monitor}
        anchor={Astal.WindowAnchor.LEFT | Astal.WindowAnchor.TOP}
        // let clicks pass through to the icon behind the popup
        exclusivity={Astal.Exclusivity.PASS_THROUGH}
        keymode={Astal.Keymode.ON_DEMAND}
        layer={Astal.Layer.TOP}
        application={App} 
        onShow={() => text.set("")}
        // hide when losing focus, so you can click the icon again
        onFocusOutEvent={() => hide()}
        onKeyPressEvent={(self, event: Gdk.Event) => {
            if (event.get_keyval()[1] === Gdk.KEY_Escape)
                self.hide()
        }}>
        <box className="dashboard-container" orientation={1} >
        
            
            <box className="quickAccess">

            </box>
            <box className="buttons-container" orientation={1}> 
                <box className="buttons-row-1">
                    <button css="min-width: 30px"></button>
                    <button css="min-width: 30px"></button>
                    <button css="min-width: 30px"></button>
                    <button css="min-width: 30px"></button>
                    <button css="min-width: 30px"></button>
                </box>
                <box className="buttons-row-2" orientation={1}>
                    <box className="buttons-sub">
                        <button css="min-width: 50px"></button>
                        <button css="min-width: 50px"></button>
                        <button css="min-width: 50px"></button>
                    </box>
                    <box className="buttons-sub">
                        <button css="min-width: 50px"></button>
                        <button css="min-width: 50px"></button>
                        <button css="min-width: 50px"></button>
                    </box>
                   
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