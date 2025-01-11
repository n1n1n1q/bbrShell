import Battery from "gi://AstalBattery";
import { bind } from "astal"

export default function BatteryLevel() {
    const bat = Battery.get_default();
    return <box className="BatteryBox">
        <circularprogress value={bind(bat, "percentage")}
            startAt={0.75} endAt={0.75} rounded="true">
        <icon icon={bind(bat, "batteryIconName")} css="font-size: 12px"></icon>
        </circularprogress>
    </box>
}
