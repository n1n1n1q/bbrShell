import { execAsync } from "astal/process";

export default function ColorPicker() {
    return (
        <button 
            onClick={() => execAsync(`bash -c "hyprpicker | wl-copy"`)}
            tooltipText="Pick Color"
            className="quick"
        >
            <icon icon="color-select-symbolic"/>
        </button>
    );
}