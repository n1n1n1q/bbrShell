import { App, Gdk, Gtk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import AppLauncher from "../widgets/AppLauncher";
import Dashboard from "../widgets/Dashboard";

const hyprland = Hyprland.get_default();

export function toggleWindow(windowName: string) {
    const win = App.get_window(windowName);
    if (!win) return;

    if (win.is_visible()) {
        win.destroy();
        return;
    }
    
    const activeHyprMonitor = hyprland.focused_monitor;
    if (!activeHyprMonitor) return;

    const gdkDisplay = Gdk.Display.get_default();
    const gdkMonitor = gdkDisplay?.get_monitor(activeHyprMonitor.id);
    if (!gdkMonitor) return;

    switch (windowName) {
        case 'launcher':
            AppLauncher(gdkMonitor);
            break;
        case 'dashboard':
            Dashboard(gdkMonitor);
            break;
    }
}