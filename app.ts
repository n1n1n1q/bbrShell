import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widgets/Bar"
import AppLauncher from "./widgets/AppLauncher"

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