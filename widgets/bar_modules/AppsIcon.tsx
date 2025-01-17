import { toggleWindow } from "../../utils/utils";
// import { App } from "astal/gtk3";

export default function AppsIcon() {
    return (
        <eventbox onClick={() => toggleWindow("launcher")}>
            <icon
                icon="apps-symbolic" 
                className="AppsIcon"
            />
        </eventbox>
    );
}