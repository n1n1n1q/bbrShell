import { bind } from "astal"
import { Astal, Gtk, Gdk } from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"
import Battery from "gi://AstalBattery"
import Tray from "gi://AstalTray"
import NixIcon from "./modules/NixIcon"
import Media from "./modules/Media"
import Wifi from "./modules/Wifi"
import TimeDate from "./modules/TimeDate"
import Workspaces from "./modules/Workspaces"
import Volume from "./modules/Volume"

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

function Left() {
    return <box hexpand halign={Gtk.Align.START} margin-top={10} margin-bottom={10}>
                <NixIcon />
                <Media />
            </box>
}

function Middle() {
    return <box halign={Gtk.Align.CENTER} margin-top={10} margin-bottom={10}>
        <Workspaces />
    </box>
}

function Right() {
    return <box hexpand halign={Gtk.Align.END} margin-top={10} margin-bottom={10}>
            <TimeDate />
            {/* <SysTray /> */}
            <Wifi />
            {/* <AudioSlider /> */}
            <BatteryLevel />
            <Volume />
        </box>
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
                <Left />
                <Middle />
                <Right />
            </centerbox>
        </window>
    );
}
