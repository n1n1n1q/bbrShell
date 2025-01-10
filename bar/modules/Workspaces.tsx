
  import { Gtk } from "astal/gtk3";
  import AstalHyprland from "gi://AstalHyprland?version=0.1";
  import { bind } from "astal";
  import { Variable } from "astal";

  function range(max) {
    return Array.from({ length: max + 1 }, (_, i) => i);
  }


  export function WorkspaceButton({ ws, ...props }) {
    const hyprland = AstalHyprland.get_default();
    const classNames = Variable.derive(
      [bind(hyprland, "focused-workspace"), bind(hyprland, "clients")],
      (fws, _) => {
        const classes = ["workspace-button"];
  
        const active = fws.id == ws.id;
        active && classes.push("active");
  
        const occupied = hyprland.get_workspace(ws.id)?.get_clients().length > 0;
        occupied && classes.push("occupied");
        return classes.join(" ");
      },
    );
    return (
      <button
        className={classNames()}
        valign={Gtk.Align.CENTER}
        halign={Gtk.Align.CENTER}
        onClicked={() => ws.focus()}
        {...props}
      />
    );
  }
  
  export default function WorkspacesPanelButton() {
    return (
      <box className = "workspace-container" spacing={4}>
        {range(6).map((i) => (
          <WorkspaceButton ws={AstalHyprland.Workspace.dummy(i + 1, null)} />
        ))}
      </box>
    );
  }