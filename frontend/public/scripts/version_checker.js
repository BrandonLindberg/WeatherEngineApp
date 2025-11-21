import { VERSION } from "../lib/global.js";

export function updateVersion() {
    const versionString = document.getElementById('versionText');
    versionString.innerHTML = `${VERSION}`;
}