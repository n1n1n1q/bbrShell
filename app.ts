import { App, Gdk, Gtk } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widgets/Bar"
import AppLauncher from "./widgets/AppLauncher"
import Dashboard from "./widgets/Dashboard"
import OSD from "./widgets/OSD"
import NotificationPopups from "./widgets/notifications/NotificationPopup"
import { restart } from "./utils/utils"

App.start({
    css: style,
    main() {
        const monitor = App.get_monitors()[0];
        Dashboard(monitor).hide();
        AppLauncher(monitor).hide();
        App.get_monitors().map(OSD);
        App.get_monitors().map(NotificationPopups);
        for (const gdkmonitor of App.get_monitors()) {
            Bar(gdkmonitor);
        }
        App.connect("monitor-added", (_, gdkmonitor) => {
            restart();
        })
        App.connect("monitor-removed", (_, gdkmonitor) => {
            restart();
        })
    }
})