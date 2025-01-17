import Mpris from "gi://AstalMpris"
import { bind } from "astal"
import { Gtk } from "astal/gtk3"

export default function Media() {
    const mpris = Mpris.get_default()
    const truncate = (text, limit) => 
        text.length > limit ? `${text.slice(0, limit)}...` : text

    return <box className="Media">
        {bind(mpris, "players").as(ps => ps[0] ? (
            <box>
                <box
                    className="Cover"
                    valign={Gtk.Align.CENTER}
                    css={bind(ps[0], "coverArt").as(cover =>
                        `background-image: url('${cover}');`
                    )}
                />
                <box orientation={1} className="MediaContainer"
                halign={Gtk.Align.START}>
                <label
                halign={Gtk.Align.START}
                    className="Title"
                    label={bind(ps[0], "title").as(() =>
                        truncate(ps[0].title || "", 40)
                    )}
                />
                <label
                halign={Gtk.Align.START}
                    className="Artist"
                    label={bind(ps[0], "artist").as(() =>
                        truncate(ps[0].artist || "", 40)
                    )}
                />
            </box>
            </box>
        ) : (
            ""
        ))}
    </box>
}
