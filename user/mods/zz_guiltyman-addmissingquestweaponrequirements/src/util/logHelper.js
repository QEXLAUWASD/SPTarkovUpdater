"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogType = exports.LogHelper = void 0;
const LogBackgroundColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogBackgroundColor");
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const ILogger_1 = require("C:/snapshot/project/obj/models/spt/utils/ILogger");
const DatabaseServer_1 = require("C:/snapshot/project/obj/servers/DatabaseServer");
const IAddMissingQuestRequirementConfig_1 = require("../models/IAddMissingQuestRequirementConfig");
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const fs_1 = __importDefault(require("fs"));
const localeHelper_1 = require("./localeHelper");
const VFS_1 = require("C:/snapshot/project/obj/utils/VFS");
let LogHelper = class LogHelper {
    db;
    winstonLogger;
    config;
    localeHelper;
    vfs;
    logger;
    logType;
    indentLiteral = "\t";
    indent = "";
    defaultTextColor = LogTextColor_1.LogTextColor.CYAN;
    defaultBackgroundColor = LogBackgroundColor_1.LogBackgroundColor.MAGENTA;
    logStream;
    logModName = "[Add Missing Quest Weapon Requirements]"; // would be better to get this from the mod name
    constructor(db, winstonLogger, config, localeHelper, vfs) {
        this.db = db;
        this.winstonLogger = winstonLogger;
        this.config = config;
        this.localeHelper = localeHelper;
        this.vfs = vfs;
        this.logger = winstonLogger;
        this.logType = LogType[this.config.logType.toUpperCase()] || LogType.FILE;
        // delete the log file if it exists
        if (fs_1.default.existsSync(this.config.logPath)) {
            fs_1.default.rmSync(this.config.logPath);
        }
        this.logStream = fs_1.default.createWriteStream(this.config.logPath, { flags: "a" });
    }
    stringify(obj) {
        return JSON.stringify(obj, (_key, value) => (value instanceof Set ? [...value] : value), 4);
    }
    // convertAllToReadable(str: string) : string
    // {
    //     // for every word in the string, try to convert it to readable, for debugging purposes
    //     const words = str.split(" ");
    //     let newStr = "";
    //     for (const word of words)
    //     {
    //         // strip any special characters
    //         const stripped = word.match(/[a-zA-Z0-9]+/g);
    //         const [converted, success] = this.tryToConvertToReadable(stripped ? stripped[0] : word);
    //         newStr += success ? (stripped? word.replace(/[a-zA-Z0-9]+/g, converted) : converted) : word;
    //         newStr += " ";
    //     }
    //     return newStr;
    // }
    convertAllToReadable(str) {
        // Split by any whitespace character, including spaces, tabs, and new lines
        const words = str.split(/\s+/);
        const allSpaces = str.match(/\s+/g) || [];
        // sanity check to ensure there is one more word than spaces to not blow up the code for i have no idea how regex works
        const addSpaces = words.length === allSpaces.length + 1;
        let newStr = "";
        // this.log(str, LogType.FILE, false)
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            // Strip any special characters
            const stripped = word.match(/[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*/g);
            const [converted, success] = this.tryToConvertToReadable(stripped ? stripped[0] : word);
            newStr += success ? (stripped ? word.replace(/[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*/g, converted) : converted) : word;
            if (!addSpaces)
                newStr += " ";
            else if (i < allSpaces.length)
                newStr += allSpaces[i]; // Add the original whitespace between words
        }
        return newStr;
        // // Preserve original whitespace by replacing spaces between words with the original whitespace found in the input
        // let whitespaceIndex = 0;
        // let preservedStr = "";
        // for (const match of str.matchAll(/\s+/g)) 
        // {
        //     const whitespace = match[0];
        //     const nextSlice = newStr.slice(whitespaceIndex, whitespaceIndex + whitespace.length);
        //     preservedStr += nextSlice + whitespace;
        //     whitespaceIndex += nextSlice.length + whitespace.length;
        // }
        // preservedStr += newStr.slice(whitespaceIndex); // Add the remaining part of the newStr
        // return preservedStr;
    }
    error(error) {
        error = error || "Unknown error";
        error = `${this.logModName} ${error}`;
        this.logger.error("An error occurred in AddMissingQuestRequirements mod. Please check the 'log.log' file in the mod directory  for more information.");
        try {
            this.logger.error(this.convertAllToReadable(error));
            this.logToFile(this.convertAllToReadable(error));
        }
        catch (e) {
            this.logger.error(error);
            this.logToFile(error);
        }
    }
    blackListedIds = ["weapon"];
    tryToConvertToReadable(potentialId) {
        if (this.blackListedIds.includes(potentialId)) {
            return [potentialId, false];
        }
        const name = this.localeHelper.getName(potentialId) || "Unknown";
        return [`${name} (${potentialId})`, name !== "Unknown"];
    }
    asReadable(id) {
        return this.tryToConvertToReadable(id)[0];
    }
    logDebug(s, forceType = LogType.NONE, asReadable = true) {
        if (this.config.debug) {
            this.log(s, forceType, asReadable);
        }
    }
    // log to file
    logToFile(s) {
        this.logStream.write(s);
    }
    log(s, forceType = LogType.NONE, asReadable = true) {
        const logType = forceType !== LogType.NONE ? forceType : this.logType;
        if (logType === LogType.NONE)
            return;
        if (typeof s !== "string" && typeof s === "object") {
            s = this.stringify(s);
        }
        if (asReadable) {
            s = this.convertAllToReadable(s);
        }
        if ((logType & LogType.FILE) === LogType.FILE) {
            // add indent to all lines
            // s = s.toString().split("\n").map((line) => this.indent + line).join("\n");
            this.logToFile(s + "\n");
        }
        if ((logType & LogType.CONSOLE) === LogType.CONSOLE) {
            s = `${this.logModName} ${s}`;
            this.logger.logWithColor(s, this.defaultTextColor, this.defaultBackgroundColor);
        }
    }
    // why?
    plusIndent() {
        this.indent += this.indentLiteral;
    }
    minusIndent() {
        if (this.indent.length > 0)
            this.indent = this.indent.slice(0, -1);
    }
};
exports.LogHelper = LogHelper;
exports.LogHelper = LogHelper = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("DatabaseServer")),
    __param(1, (0, tsyringe_1.inject)("WinstonLogger")),
    __param(2, (0, tsyringe_1.inject)("AMQRConfig")),
    __param(3, (0, tsyringe_1.inject)("LocaleHelper")),
    __param(4, (0, tsyringe_1.inject)("VFS")),
    __metadata("design:paramtypes", [typeof (_a = typeof DatabaseServer_1.DatabaseServer !== "undefined" && DatabaseServer_1.DatabaseServer) === "function" ? _a : Object, typeof (_b = typeof ILogger_1.ILogger !== "undefined" && ILogger_1.ILogger) === "function" ? _b : Object, typeof (_c = typeof IAddMissingQuestRequirementConfig_1.IAddMissingQuestRequirementConfig !== "undefined" && IAddMissingQuestRequirementConfig_1.IAddMissingQuestRequirementConfig) === "function" ? _c : Object, typeof (_d = typeof localeHelper_1.LocaleHelper !== "undefined" && localeHelper_1.LocaleHelper) === "function" ? _d : Object, typeof (_e = typeof VFS_1.VFS !== "undefined" && VFS_1.VFS) === "function" ? _e : Object])
], LogHelper);
var LogType;
(function (LogType) {
    LogType[LogType["NONE"] = 0] = "NONE";
    LogType[LogType["CONSOLE"] = 1] = "CONSOLE";
    LogType[LogType["FILE"] = 2] = "FILE";
    LogType[LogType["ALL"] = 3] = "ALL";
})(LogType || (exports.LogType = LogType = {}));
//# sourceMappingURL=logHelper.js.map