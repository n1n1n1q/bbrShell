import { toggleWindow } from "../../utils/utils";

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