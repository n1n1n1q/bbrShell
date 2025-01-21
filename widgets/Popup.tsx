import { Astal, Gdk, Gtk } from "astal/gtk3"
const { TOP, RIGHT, BOTTOM, LEFT } = Astal.WindowAnchor
type PopupProps = {
    name?: string
    application?: any
    child?: unknown
    marginBottom?: number
    marginTop?: number
    marginLeft?: number
    marginRight?: number
    halign?: Gtk.Align
    valign?: Gtk.Align
}

export function Popup({
    name = "launcher",
    application, // Add this
    child,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    halign = Gtk.Align.CENTER,
    valign = Gtk.Align.CENTER,
}: PopupProps) {
    return (
        <window
            name={name}
            application={application}
            visible={false}
            css="background-color: transparent"
            keymode={Astal.Keymode.EXCLUSIVE}
            anchor={TOP | RIGHT | BOTTOM | LEFT}
            exclusivity={Astal.Exclusivity.IGNORE}
            onButtonPressEvent={(self, event) => {
                const [, _x, _y] = event.get_coords()
                const { x, y, width, height } = self
                    .get_child()!
                    .get_allocation()

                if (_x < x || _x > x + width || _y < y || _y > y + height) {
                    self.hide()
                }
            }}
            onKeyPressEvent={(self, event: Gdk.Event) => {
                if (event.get_keyval()[1] === Gdk.KEY_Escape) {
                    self.hide()
                }
            }}
        >
            <box
                className="Popup"
                onButtonPressEvent={() => true}
                expand
                halign={halign}
                valign={valign}
                marginBottom={marginBottom}
                marginTop={marginTop}
                marginStart={marginLeft}
                marginEnd={marginRight}
            >
                {child}
            </box>
        </window>
    )
}