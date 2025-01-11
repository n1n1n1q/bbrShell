import Wp from "gi://AstalWp"
import { bind } from "astal"

export default function Volume() {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!
    return <box className="VolumeBox">
        <circularprogress value={bind(speaker, "volume")}
            startAt={0.75} endAt={0.75} rounded="true">
        <icon icon={bind(speaker, "volumeIcon")} css="font-size: 12px">
        </icon>
        </circularprogress>
        <label className={"volume-label"} 
        label={bind(speaker, "volume").as(p =>
            `${Math.floor(p * 100)} %`
        )} />
    </box>
}