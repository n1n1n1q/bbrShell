import { execAsync } from "astal/process";

export default function Lock() {
    return (
        <button 
            onClick={() => execAsync("hyprlock")}
            tooltipText="Lock Screen"
            className="quick"
        >
            <icon icon="lock-symbolic"/>
        </button>
    );
}