import { bind } from "astal"
import { Astal, Gtk, Gdk } from "astal/gtk3"
import AppsIcon from "./bar_modules/AppsIcon"
import Hyprland from "gi://AstalHyprland"
import NixIcon from "./bar_modules/NixIcon"
import Media from "./bar_modules/Media"
import Wifi from "./bar_modules/Wifi"
import TimeDate from "./bar_modules/TimeDate"
import Workspaces from "./bar_modules/Workspaces"
import Volume from "./bar_modules/Volume"
import BatteryLevel from "./bar_modules/Battery"
import { toggleWindow } from "../utils/utils"

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
        <Workspaces/>
    </box>
}

function Right() {
    return <box hexpand halign={Gtk.Align.END} margin-top={10} margin-bottom={10}>
            <TimeDate />
            <Wifi />
            <BatteryLevel />
            <Volume />
            <AppsIcon />
        </box>
}
export default function Bar(monitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

    return [
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
    ];
}