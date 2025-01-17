import { Gtk } from "astal/gtk3"
import { Variable, GLib } from "astal"

export default function TimeDate() {
    return <box orientation={1} 
                valign= {Gtk.Align.CENTER}
                className="TimeDate"
                halign={Gtk.Align.END}>
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