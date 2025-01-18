import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widgets/Bar"
import AppLauncher from "./widgets/AppLauncher"
import Dashboard from "./widgets/Dashboard"

App.start({
    css: style,
    icons: `./icon`,
    main() {
        App.get_monitors().forEach(monitor => {
            Bar(monitor);
            Dashboard(monitor).hide();
            AppLauncher(monitor).hide();
        })
    },
})