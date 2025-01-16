import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./bar/Bar"
import AppLauncher from "./launcher/applauncher"

App.start({
    css: style,
    icons: `./icon`,
    main() {
        App.get_monitors().forEach(monitor => {
            Bar(monitor);
            AppLauncher(monitor).hide();
        })
    },
})