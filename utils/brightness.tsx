import { exec, execAsync } from "astal/process";
import { monitorFile, readFileAsync } from "astal/file";

const get = (args: string) => Number(exec(`brightnessctl ${args}`));
const screen = exec(`bash -c "ls -w1 /sys/class/backlight | head -1"`);
const kbd = exec(`bash -c "ls -w1 /sys/class/leds | head -1"`);

const screenMax = get("max");
const kbdMax = get(`--device ${kbd} max`);

export async function setScreenBrightness(value: number) {
  value = Math.max(0, Math.min(value, 1));
  await execAsync(`brightnessctl set ${Math.floor(value * 100)}% -q`);
}

export async function setKbdBrightness(value: number) {
  value = Math.max(0, Math.min(value, kbdMax));
  await execAsync(`brightnessctl -d ${kbd} s ${value} -q`);
}

export function getScreenBrightness(): number {
  return get("get") / (screenMax || 1);
}

export function getKbdBrightness(): number {
  return get(`--device ${kbd} get`);
}

export function watchBrightnessChanges(
  onScreenChange: (val: number) => void,
  onKbdChange: (val: number) => void
) {
  const screenPath = `/sys/class/backlight/${screen}/brightness`;
  const kbdPath = `/sys/class/leds/${kbd}/brightness`;

  monitorFile(screenPath, async (path) => {
    const data = await readFileAsync(path);
    onScreenChange(Number(data) / screenMax);
  });

  monitorFile(kbdPath, async (path) => {
    const data = await readFileAsync(path);
    onKbdChange(Number(data) / kbdMax);
  });
}