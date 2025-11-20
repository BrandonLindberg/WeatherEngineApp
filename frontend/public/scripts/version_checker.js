import { VERSION } from "../../../global.js";

export function updateVersion() {
    const versionString = document.getElementById('versionText');
    versionString.innerHTML = `Version - ${VERSION}`;
}