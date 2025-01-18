import AstalWp from "gi://AstalWp?version=0.1";
import { Gtk } from "astal/gtk3";
import { bind } from "astal";

// REPLACE WITH KB BRIGHTNESS ON LAPTOP
 
export default () => {
	const speaker = AstalWp.get_default()?.audio.defaultSpeaker!;

	return (
		<box
			className={bind(speaker, "mute").as((mute) =>
				mute ? "muted" : "",
			)}
		>
			<overlay
				className={"volume-slider"}
				child={
					<slider
						draw_value={false}
						hexpand={true}
						onDragged={({ value }) => {
							speaker.volume = value;
							speaker.mute = false;
						}}
						value={bind(speaker, "volume")}
					/>
				}
				overlay={
					<icon
						className={"slider-icon"}
						icon={bind(speaker, "volumeIcon")}
						hexpand={false}
						halign={Gtk.Align.START}
					/>
				}
			/>
		</box>
	);
};