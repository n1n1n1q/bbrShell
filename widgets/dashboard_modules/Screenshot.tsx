import { execAsync } from "astal/process";
import { bash } from "../../utils/utils";

export default function Screenshot() {
    const takeScreenshot = async () => {
        try {
            const geometry = (await execAsync('slurp -d')).trim();
            if (geometry) {
                console.log("Taking screenshot...");
                await bash(`grim -g "${geometry}" - | wl-copy --type image/png`);
                console.log("Screenshot copied to clipboard");
            }
        } catch (error) {
            console.log("Screenshot cancelled");
        }
    };

    return (
        <button 
            onClick={takeScreenshot}
            tooltipText="Take Screenshot"
            className="quick"
        >
            <icon icon="camera-photo-symbolic"/>
        </button>
    );
}