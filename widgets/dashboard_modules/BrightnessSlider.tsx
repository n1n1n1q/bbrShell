import { Variable, bind } from "astal"
import { Gtk } from "astal/gtk3"
import {
  setScreenBrightness,
  getScreenBrightness
} from "../../utils/brightness"


// const getBrightnessIcon = (value: number) => {
//   if (value <= 0.25) return "display-brightness-symbolic"
//   if (value <= 0.5) return "display-brightness-symbolic" 
//   if (value <= 0.75) return "display-brightness-symbolic"
//   return "display-brightness-symbolic"
// }

export default function BrightnessSlider() {
  const brightness = Variable(getScreenBrightness())
  
  return (
    <box className="dashboard-slider" valign={Gtk.Align.CENTER}>
      <icon icon = "display-brightness-symbolic" />
      <slider
        min={0.1}
        hexpand
        value={bind(brightness)}
        onChangeValue={(self) => {
          setScreenBrightness(self.value)
        }}
      />
    </box>
  )
}