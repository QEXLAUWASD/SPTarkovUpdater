"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
//Modules
const path = __importStar(require("node:path"));
const json5_1 = __importDefault(require("C:/snapshot/project/node_modules/json5"));
let ConfigManager = class ConfigManager {
    vfs;
    constructor(vfs) {
        this.vfs = vfs;
    }
    /**
     * Parses the main mod config using the configFile interface.
     *
     * @returns The parsed modConfig file for use.
     */
    modConfig() {
        const modConfig = json5_1.default.parse(this.vfs.readFile(path.resolve(__dirname, "../../config/config.json5")));
        return modConfig;
    }
    /**
     * Parses the debug config using the debugFile interface.
     *
     * @returns The parsed debugConfig file for use.
     */
    debugConfig() {
        const debugConfig = json5_1.default.parse(this.vfs.readFile(path.resolve(__dirname, "../utils/data/debugOptions.json5")));
        return debugConfig;
    }
    /**
     * Parses the season progression file using the seasonalProgression interface.
     *
     * @returns The parsed seasonalProgression file for use.
     */
    seasonProgressionFile() {
        const seasonalProgressionFile = json5_1.default.parse(this.vfs.readFile(path.resolve(__dirname, `../utils/data/seasonsProgressionFile.json5`)));
        return seasonalProgressionFile;
    }
};
exports.ConfigManager = ConfigManager;
exports.ConfigManager = ConfigManager = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("VFS")),
    __metadata("design:paramtypes", [Object])
], ConfigManager);
//# sourceMappingURL=ConfigManager.js.map