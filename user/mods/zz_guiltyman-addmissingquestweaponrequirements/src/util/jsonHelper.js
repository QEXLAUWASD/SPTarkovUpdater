"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryReadJson = tryReadJson;
exports.readJson = readJson;
const fs_1 = __importDefault(require("fs"));
const jsonc_1 = require("C:/snapshot/project/node_modules/jsonc");
const path_1 = __importDefault(require("path"));
/**
 * Reads and parses a JSON or JSONC file from the specified file path.
 *
 * @template T - The type of the parsed JSON object.
 * @param {string} filePath - The path to the directory containing the file.
 * @param {string} fileName - The name of the file (without the extension).
 * @returns {T} - The parsed JSON object.
 * @throws {Error} - If the file is not found.
 */
function tryReadJson(filePath, fileName) {
    let [err, obj] = jsonc_1.safe.readSync(path_1.default.resolve(filePath, `${fileName}.jsonc`));
    if (!err) {
        return obj;
    }
    [err, obj] = jsonc_1.safe.readSync(path_1.default.resolve(filePath, `${fileName}.json`));
    if (!err) {
        return obj;
    }
    return null;
}
function readJson(filePath) {
    return jsonc_1.jsonc.parse(fs_1.default.readFileSync(filePath).toString());
}
//# sourceMappingURL=jsonHelper.js.map