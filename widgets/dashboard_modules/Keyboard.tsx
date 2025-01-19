import { Variable, bind } from "astal"
import { Gtk } from "astal/gtk3"
import {
  getKbdBrightness,
  setKbdBrightness
} from "../../utils/brightness"

export default function BrightnessSlider() {
  return (
    <box className="brightness-slider" valign={Gtk.Align.CENTER}>
      {/* <image iconName="display-brightness-symbolic" valign={Gtk.Align.CENTER} /> */}
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