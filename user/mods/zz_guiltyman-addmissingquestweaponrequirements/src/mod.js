"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const jsonHelper_1 = require("./util/jsonHelper");
const logHelper_1 = require("./util/logHelper");
const weaponCategorizer_1 = require("./weaponCategorizer");
const questPatcher_1 = require("./questPatcher");
const overrideReader_1 = require("./overrideReader");
const localeHelper_1 = require("./util/localeHelper");
class Mod {
    postDBLoad(container) {
        // Database will be loaded, this is the fresh state of the DB so NOTHING from the AKI
        // logic has modified anything yet. This is the DB loaded straight from the JSON files
        const childContainer = container.createChildContainer();
        // read config and register it
        const config = (0, jsonHelper_1.readJson)(path_1.default.resolve(__dirname, "../config/config.jsonc"));
        if (!config.logPath) {
            config.logPath = path_1.default.resolve(__dirname, "../log.log");
        }
        childContainer.registerInstance("AMQRConfig", config);
        childContainer.registerSingleton("LocaleHelper", localeHelper_1.LocaleHelper);
        const logger = childContainer.registerSingleton("LogHelper", logHelper_1.LogHelper)
            .resolve("LogHelper");
        logger.log("Starting mod");
        childContainer.registerInstance("modDir", path_1.default.resolve(__dirname, "../../"));
        childContainer.registerSingleton("OverrideReader", overrideReader_1.OverrideReader);
        childContainer.registerSingleton("WeaponCategorizer", weaponCategorizer_1.WeaponCategorizer);
        childContainer.registerSingleton("QuestPatcher", questPatcher_1.QuestPatcher);
        const run = () => {
            childContainer.resolve("OverrideReader").run(childContainer);
            childContainer.resolve("WeaponCategorizer").run(childContainer);
            childContainer.resolve("QuestPatcher").run();
            logger.log("[AMQWR] Finished Patching", logHelper_1.LogType.CONSOLE, false);
            childContainer.dispose();
        };
        if (!config.delay || config.delay <= 0) {
            run();
        }
        else {
            setTimeout(() => run(), config.delay * 1000);
        }
        return;
    }
}
module.exports = { mod: new Mod() };
//# sourceMappingURL=mod.js.map