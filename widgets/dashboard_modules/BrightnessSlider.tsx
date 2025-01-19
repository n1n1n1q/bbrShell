import { Variable, bind } from "astal"
import { Gtk } from "astal/gtk3"
import {
  setScreenBrightness,
  getScreenBrightness
} from "../../utils/brightness"

const screenValue = new Variable(getScreenBrightness())

export default function BrightnessSlider() {
  return (
    <box className="brightness-slider" valign={Gtk.Align.CENTER}>
      {/* <image iconName="display-brightness-symbolic" valign={Gtk.Align.CENTER} /> */}
      <slider
        min={0.1}
        hexpand
        value={bind(Variable(getScreenBrightness()))}
        onChangeValue={(self) => {
          setScreenBrightness(self.value)
        }}
      />
    </box>
  )
}