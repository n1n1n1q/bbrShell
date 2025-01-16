import { App, Gdk, Gtk } from "astal/gtk3";

export function toggleWindow(windowName: string) {
    const win = App.get_window(windowName);
    if (!win) return;
    win.is_visible() ? win.hide() : win.present();
}
