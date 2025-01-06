import { App } from "astal/gtk3"
import { Variable, GLib, bind } from "astal"
import { Astal, Gtk, Gdk } from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"
import Mpris from "gi://AstalMpris"
import Battery from "gi://AstalBattery"
import Wp from "gi://AstalWp"
import Network from "gi://AstalNetwork"
import Tray from "gi://AstalTray"


function NixIcon() {
    return <icon icon="nixos-symbolic" className="NixIcon"></icon>
}

function SysTray() {
    const tray = Tray.get_default()

    return <box className="SysTray">
        {bind(tray, "items").as(items => items.map(item => (
            <menubutton
                tooltipMarkup={bind(item, "tooltipMarkup")}
                usePopover={false}
                actionGroup={bind(item, "action-group").as(ag => ["dbusmenu", ag])}
                menuModel={bind(item, "menu-model")}>
                <icon gicon={bind(item, "gicon")} />
            </menubutton>
        )))}
    </box>
}

function Wifi() {
    const network = Network.get_default()
    const wifi = bind(network, "wifi")

    return <box visible={wifi.as(Boolean)}>
        {wifi.as(wifi => wifi && (
            <icon
                tooltipText={bind(wifi, "ssid").as(String)}
                className="Wifi"
                icon={bind(wifi, "iconName")}
            />
        ))}
    </box>

}

function AudioSlider() {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!

    return <box className="AudioSlider" css="min-width: 140px">
        <icon icon={bind(speaker, "volumeIcon")} />
        <slider
            hexpand
            onDragged={({ value }) => speaker.volume = value}
            value={bind(speaker, "volume")}
        />
    </box>
}

function BatteryLevel() {
    const bat = Battery.get_default()

    return <box className="Battery"
        visible={bind(bat, "isPresent")}>
        <icon icon={bind(bat, "batteryIconName")} />
        <label label={bind(bat, "percentage").as(p =>
            `${Math.floor(p * 100)} %`
        )} />
    </box>
}

function Media() {
    const mpris = Mpris.get_default()

    return <box className="Media">
        {bind(mpris, "players").as(ps => ps[0] ? (
            <box>
                <box
                    className="Cover"
                    valign={Gtk.Align.CENTER}
                    css={bind(ps[0], "coverArt").as(cover =>
                        `background-image: url('${cover}');`
                    )}
                />
                <box orientation={1} className="MediaContainer"
                halign={Gtk.Align.START}>
                <label
                halign={Gtk.Align.START}
                    className="Title"
                    label={bind(ps[0], "title").as(() =>
                        `${ps[0].title}`
                    )}
                />
                <label
                halign={Gtk.Align.START}
                    className="Artist"
                    label={bind(ps[0], "title").as(() =>
                    `${ps[0].artist}`
                )}
                
            />
            </box>
            </box>
        ) : (
            ""
        ))}
    </box>
}

function MiddleSection() {
    return <box halign={Gtk.Align.CENTER} className="MiddleSection">

    </box>
}

function WorkspaceButton(id, hypr) {
    
    
}

function WorkspacesSection() {

}

function Workspaces() {
    const hypr = Hyprland.get_default();

    return (
        <box className="Workspaces">
            {
                bind(hypr, "workspaces").as(wss => {
                    const focusedWorkspace = hypr.focusedWorkspace;
                    const workspaces = Array.from({ length: 7 }, (_, i) => {
                        const ws = wss.find(ws => ws.id === i + 1);
                        return {
                            id: i + 1,
                            exists: !!ws,
                            workspace: ws,
                            isActive: ws && ws === focusedWorkspace,
                        };
                    });

                    return workspaces.map(ws => (
                        <button
                            key={ws.id}
                            // Ensure there are exactly 7 workspaces, with some potentially non-existent
                            className={ws.isActive ? "active" : (ws.exists ? "existing" : "nonexistent")}
                            onClick={() => {
                                if (ws.exists) {
                                    ws.workspace.focus();
                                }
                            }}
                        >
                            {ws.id}
                        </button>
                    ));
                })
            }
        </box>
    );
}

function FocusedClient() {
    const hypr = Hyprland.get_default()
    const focused = bind(hypr, "focusedClient")

    return <box
        className="Focused"
        visible={focused.as(Boolean)}>
        {focused.as(client => (
            client && <label label={bind(client, "title").as(String)} />
        ))}
    </box>
}

function TimeDate() {
    return <box orientation={1} className="TimeDate" halign={Gtk.Align.END}>
        <Time />
        <Date />
    </box>
}

function Date() {
    const date = Variable<string>("").poll(1000, () =>
    GLib.DateTime.new_now_local().format("%m/%d/%Y")!)
    return <label className="Date" halign={Gtk.Align.END} onDestroy={() => date.drop()} label={date()}/>
}

function Time({ format = "%H:%M" }) {
    const time = Variable<string>("").poll(1000, () =>
        GLib.DateTime.new_now_local().format(format)!)

    return <label
        className="Time"
        halign={Gtk.Align.END}
        onDestroy={() => time.drop()}
        label={time()}
    />
}

export default function Bar(monitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

    return (
        <window
            className="Bar"
            gdkmonitor={monitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            margin-top={10}
            margin-left={7}
            margin-right={7}
            >
            <centerbox>
                {/* Box for left-aligned items */}
                <box hexpand halign={Gtk.Align.START} margin-top={10} margin-bottom={10}>
                    <NixIcon />
                    <Media />
                    {/* <FocusedClient /> */}
                </box>

                {/* Box for center-aligned items (no margin here) */}
                <box halign={Gtk.Align.CENTER} margin-top={10} margin-bottom={10}>
                    <Workspaces />
                    {/* <Media /> */}
                </box>

                {/* Box for right-aligned items */}
                <box hexpand halign={Gtk.Align.END} margin-top={10} margin-bottom={10}>
                    <TimeDate />
                    {/* <SysTray /> */}
                    <Wifi />
                    {/* <AudioSlider /> */}
                    <BatteryLevel />
                    
                </box>
            </centerbox>
        </window>
    );
}
