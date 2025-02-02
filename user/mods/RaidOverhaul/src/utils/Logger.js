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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLogger = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
//Spt Classes
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const ILogger_1 = require("C:/snapshot/project/obj/models/spt/utils/ILogger");
//Modules
const path = __importStar(require("node:path"));
const json5_1 = __importDefault(require("C:/snapshot/project/node_modules/json5"));
let ROLogger = class ROLogger {
    vfs;
    logger;
    logPrefix = "[Raid Overhaul] ";
    constructor(vfs, logger) {
        this.vfs = vfs;
        this.logger = logger;
    }
    log(text, textColor) {
        if (typeof textColor !== "undefined") {
            this.logger.log(this.logPrefix + text, textColor);
        }
        else {
            this.logger.log(this.logPrefix + text, LogTextColor_1.LogTextColor.WHITE);
        }
    }
    logError(errorText) {
        this.logger.error(this.logPrefix + errorText);
    }
    logWarning(text) {
        this.logger.warning(this.logPrefix + text);
    }
    logDebug(text) {
        const debugConfig = json5_1.default.parse(this.vfs.readFile(path.resolve(__dirname, "./Data/debugOptions.json5")));
        if (debugConfig.debugMode) {
            this.logger.log(this.logPrefix + text, LogTextColor_1.LogTextColor.WHITE);
        }
    }
    logToServer(text) {
        this.logger.log(this.logPrefix + text, LogTextColor_1.LogTextColor.CYAN);
    }
    debugModeWarning() {
        this.logger.log(this.logPrefix + "DEBUG MODE ENABLED", LogTextColor_1.LogTextColor.YELLOW);
    }
};
exports.ROLogger = ROLogger;
exports.ROLogger = ROLogger = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("VFS")),
    __param(1, (0, tsyringe_1.inject)("WinstonLogger")),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof ILogger_1.ILogger !== "undefined" && ILogger_1.ILogger) === "function" ? _a : Object])
], ROLogger);
//# sourceMappingURL=Logger.js.map