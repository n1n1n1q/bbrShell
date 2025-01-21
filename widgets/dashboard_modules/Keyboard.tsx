import { Variable, bind } from "astal"
import { Gtk } from "astal/gtk3"
import {
  getKbdBrightness,
  setKbdBrightness
} from "../../utils/brightness"

export default function BrightnessSlider() {
  return (
    <box className="dashboard-slider" valign={Gtk.Align.CENTER}>
      <icon icon = "keyboard-brightness-symbolic" />
      <slider
        min={0.1}
        hexpand
        value={bind(Variable(getKbdBrightness()))}
        onChangeValue={(self) => {
          setKbdBrightness(self.value)
        }}
      />
    </box>
  )
}