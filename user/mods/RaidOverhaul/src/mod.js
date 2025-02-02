"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("./di/Container");
class ROMod {
    async preSptLoadAsync(container) {
        Container_1.DiContainer.register(container);
        await container.resolve("RaidOverhaul").preSptLoadAsync();
    }
    async postDBLoadAsync(container) {
        container.resolve("RaidOverhaul").postDBLoadAsync();
    }
}
module.exports = { mod: new ROMod() };
//      \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/     \('_')/
//# sourceMappingURL=mod.js.map