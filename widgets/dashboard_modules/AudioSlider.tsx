import AstalWp from "gi://AstalWp?version=0.1";
import { Gtk } from "astal/gtk3";
import { bind } from "astal";


export default function AudioSlider() {
    const speaker = AstalWp.get_default()?.audio.defaultSpeaker!

    return <box className="dashboard-slider" css="min-width: 140px">
        <icon icon={bind(speaker, "volumeIcon")} />
        <slider
            hexpand
            onDragged={({ value }) => speaker.volume = value}
            value={bind(speaker, "volume")}
        />
    </box>
}
