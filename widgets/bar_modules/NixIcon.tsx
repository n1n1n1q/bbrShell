import { toggleWindow } from "../../utils/utils";

export default function NixIcon() {
    return (
    <eventbox onClick={() => toggleWindow("dashboard")}>
        <label label="󱄅" className="NixIcon"/>
    </eventbox>
    );
}