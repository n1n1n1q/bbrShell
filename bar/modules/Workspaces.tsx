import { Gtk } from "astal/gtk3";
import AstalHyprland from "gi://AstalHyprland?version=0.1";
import { bind } from "astal";
import { Variable } from "astal";
const hyprland = AstalHyprland.get_default();

function range(max) {
  return Array.from({ length: max }, (_, i) => i);
}

function WorkspaceButton({ ws, ...props }) {
  const classNames = Variable.derive(
    [
      bind(hyprland, "focused-workspace"),
      bind(hyprland, "clients"),
      bind(hyprland, "workspaces")
    ],
    (fws, clients, workspaces) => {
      const classes = ["workspace-button"];
      const currentWs = hyprland.get_workspace(ws.id);

      classes.forEach(cls => {
        if(['active', 'occupied', 'occupied-left', 'occupied-right'].includes(cls)) {
          classes.splice(classes.indexOf(cls), 1);
        }
      });

      const active = fws.id === ws.id;
      active && classes.push("active");

      const occupied = currentWs?.get_clients().length > 0;
      (occupied || active) && classes.push("occupied");

      const wsBefore = hyprland.get_workspace(ws.id - 1);
      const wsAfter = hyprland.get_workspace(ws.id + 1);
      
      const leftEdge = !wsBefore || 
        (wsBefore.get_clients().length === 0 && wsBefore.id !== fws.id);
      const rightEdge = !wsAfter || 
        (wsAfter.get_clients().length === 0 && wsAfter.id !== fws.id);

      if (occupied || active) {
        leftEdge && classes.push("occupied-left");
        rightEdge && classes.push("occupied-right");
      }

      return classes.join(" ");
    }
  );

  return (
    <button
      className={classNames()}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      onClicked={() => ws.focus()}
      {...props}
      >
        <label>{ws.id}</label>
      </button>
  );
}

export default function Workspaces() {
  return (
    <box className="workspace-container" 
    // spacing={4}
    >
      {range(9).map((i) => (
        <WorkspaceButton ws={AstalHyprland.Workspace.dummy(i + 1, null)} />
      ))}
    </box>
  );
}