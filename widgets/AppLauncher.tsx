import Apps from "gi://AstalApps"
import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import { Variable } from "astal"

const MAX_ITEMS = 8

function hide() {
    App.get_window("launcher")!.hide()
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

export default function Applauncher(monitor: Gdk.Monitor) {
    const { CENTER } = Gtk.Align
    const apps = new Apps.Apps()

    const text = Variable("")
    const list = text(text => apps.fuzzy_query(text).slice(0, MAX_ITEMS))
    const onEnter = () => {
        apps.fuzzy_query(text.get())?.[0].launch()
        hide()
    }

    // Create window as a POPUP
    const window = new Gtk.Window({ type: Gtk.WindowType.POPUP })

    return <window
        // __instance={window}
        name="launcher"
        gdkmonitor={monitor}
        anchor={Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.TOP}
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
        <box className="launcher-container">
            <box hexpand={false} vertical>
                <box widthRequest={500} className="Applauncher" vertical>
                    <entry
                        placeholderText="Search Applications..."
                        text={text()}
                        onChanged={self => text.set(self.text)}
                        onActivate={onEnter}
                    />
                    <box spacing={6} vertical>
                        {list.as(list => list.map(app => (
                            <AppButton key={app.name} app={app} />
                        )))}
                    </box>
                    <box
                        halign={CENTER}
                        className="not-found"
                        vertical
                        visible={list.as(l => l.length === 0)}>
                        <icon icon="system-search-symbolic" />
                        <label label="No applications found" />
                    </box>
                </box>
            </box>
        </box>
    </window>
}