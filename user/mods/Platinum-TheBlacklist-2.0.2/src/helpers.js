"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBulletOrShotgunShell = isBulletOrShotgunShell;
function isBulletOrShotgunShell(item) {
    const props = item._props;
    return props.ammoType === "bullet" || props.ammoType === "buckshot";
}
//# sourceMappingURL=helpers.js.map