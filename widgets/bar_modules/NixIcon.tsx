import { toggleWindow } from "../../utils/utils";

export default function NixIcon() {
    return (
    <eventbox onClick={() => toggleWindow("dashboard")}>
        <icon icon="nixos-symbolic" className="NixIcon"></icon>
    </eventbox>
    );
}