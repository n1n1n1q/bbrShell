import Hyprland from "gi://AstalHyprland"
import { bind } from "astal"

export default function Workspaces() {
    const hypr = Hyprland.get_default();

    return (
        <box className="Workspaces">
            {
                bind(hypr, "workspaces").as(wss => {
                    const focusedWorkspace = hypr.focusedWorkspace;
                    const workspaces = Array.from({ length: 7 }, (_, i) => {
                        const ws = wss.find(ws => ws.id === i + 1);
                        return {
                            id: i + 1,
                            exists: !!ws,
                            workspace: ws,
                            isActive: ws && ws === focusedWorkspace,
                        };
                    });

                    return workspaces.map(ws => (
                        <button
                            key={ws.id}
                            // Ensure there are exactly 7 workspaces, with some potentially non-existent
                            className={ws.isActive ? "active" : (ws.exists ? "existing" : "nonexistent")}
                            onClick={() => {
                                if (ws.exists) {
                                    ws.workspace.focus();
                                }
                            }}
                        >
                            {ws.id}
                        </button>
                    ));
                })
            }
        </box>
    );
}             
