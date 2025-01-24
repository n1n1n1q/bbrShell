import { execAsync, exec } from "astal";
import { App } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";

const hyprland = Hyprland.get_default();

export function toggleWindow(windowName: string) {
    console.log('toggleWindow', windowName);
    const win = App.get_window(windowName);
    if (!win) return;

    if (win.is_visible()) {
        win.hide();
        return;
    }

    win.set_property("monitor", hyprland.focused_monitor.id);
    win.show();
}

export function restart() {
    print("restarting")
    try {
        exec("bash -c 'bbrShell -q'");
    } catch (e) {
        console.error(e);
    }
    execAsync("bash -c 'bbrshell -q'");
}

export function bash(command: string) {
    execAsync(`bash -c '${command}'`);
}