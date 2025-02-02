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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverrideReader = void 0;
const VFS_1 = require("C:/snapshot/project/obj/utils/VFS");
const path_1 = __importDefault(require("path"));
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const jsonHelper_1 = require("./util/jsonHelper");
const logHelper_1 = require("./util/logHelper");
const OverridedSettings_1 = require("./models/OverridedSettings");
const misc_1 = require("./util/misc");
let OverrideReader = class OverrideReader {
    logger;
    vfs;
    modsDirectory;
    constructor(logger, vfs, modsDirectory) {
        this.logger = logger;
        this.vfs = vfs;
        this.modsDirectory = modsDirectory;
        logger.log("OverrideReader created");
    }
    run(childContainer) {
        childContainer.registerInstance("OverridedSettings", this.readOverrides());
    }
    readOverrides() {
        const overridedSettings = new OverridedSettings_1.OverridedSettings();
        this.logger.log("Reading overrides");
        this.vfs.getDirs(this.modsDirectory).map(m => path_1.default.resolve(this.modsDirectory, m))
            .filter(modDir => this.vfs.exists(path_1.default.resolve(modDir, "MissingQuestWeapons")))
            .forEach(modDir => {
            this.logger.log(`Processing mod: ${path_1.default.basename(modDir)}`);
            this.logger.plusIndent();
            try {
                const questOverridesData = (0, jsonHelper_1.tryReadJson)(path_1.default.resolve(modDir, "MissingQuestWeapons"), "QuestOverrides");
                if (questOverridesData) {
                    questOverridesData.Overrides.forEach((v) => {
                        if (!overridedSettings.questOverrides[v.id]) {
                            overridedSettings.questOverrides[v.id] = {
                                id: v.id,
                                whiteListedWeapons: [],
                                blackListedWeapons: [],
                                skip: false,
                                onlyUseWhiteListedWeapons: false
                            };
                        }
                        const questOverride = overridedSettings.questOverrides[v.id];
                        questOverride.onlyUseWhiteListedWeapons ||= v.onlyUseWhiteListedWeapons || false;
                        this.logger.log(`Processing quest override: ${v.id})}`);
                        if (v.whiteListedWeapons) {
                            v.whiteListedWeapons.forEach(w => (0, misc_1.pushIfNotExists)(questOverride.whiteListedWeapons, w));
                        }
                        if (v.blackListedWeapons) {
                            v.blackListedWeapons.forEach(w => (0, misc_1.pushIfNotExists)(questOverride.blackListedWeapons, w));
                        }
                        if (v.skip) {
                            questOverride.skip = true;
                        }
                        // check if any weapons conflicted
                        if (v.whiteListedWeapons) {
                            for (const w of v.whiteListedWeapons) {
                                if (questOverride.blackListedWeapons.includes(w)) {
                                    this.logger.error(`Weapon ${w} is both blacklisted and whitelisted for quest ${v.id}`);
                                }
                            }
                        }
                    });
                    questOverridesData.BlackListedQuests.forEach(v => {
                        if (!overridedSettings.questOverrides[v]) {
                            overridedSettings.questOverrides[v] = {
                                id: v,
                                blackListed: true
                            };
                        }
                        else {
                            this.logger.error(`Quest ${v} is both in blacklisted quests and in quest overrides. Blacklisting will take precedence.`);
                            overridedSettings.questOverrides[v].skip = true;
                        }
                    });
                }
            }
            catch (e) {
                this.logger.error(`Error reading QuestOverrides in ${modDir}: ${e.message}`);
            }
            try {
                const overriddenWeaponsData = (0, jsonHelper_1.tryReadJson)(path_1.default.resolve(modDir, "MissingQuestWeapons"), "OverriddenWeapons");
                if (overriddenWeaponsData) {
                    if (overriddenWeaponsData.Override) {
                        for (const key in overriddenWeaponsData.Override) {
                            overridedSettings.overriddenWeapons[key] = overriddenWeaponsData.Override[key];
                        }
                    }
                    if (overriddenWeaponsData.CanBeUsedAs) {
                        for (const key in overriddenWeaponsData.CanBeUsedAs) {
                            if (!overridedSettings.canBeUsedAs[key]) {
                                overridedSettings.canBeUsedAs[key] = [];
                            }
                            overriddenWeaponsData.CanBeUsedAs[key].forEach(v => (0, misc_1.pushIfNotExists)(overridedSettings.canBeUsedAs[key], v));
                        }
                    }
                    if (overriddenWeaponsData.CanBeUsedAsShortNameWhitelist) {
                        overriddenWeaponsData.CanBeUsedAsShortNameWhitelist.forEach(v => (0, misc_1.pushIfNotExists)(overridedSettings.canBeUsedAsShortNameWhitelist, v));
                    }
                    if (overriddenWeaponsData.CanBeUsedAsShortNameBlacklist) {
                        overriddenWeaponsData.CanBeUsedAsShortNameBlacklist.forEach(v => (0, misc_1.pushIfNotExists)(overridedSettings.canBeUsedAsShortNameBlackList, v));
                    }
                    if (overriddenWeaponsData.CustomCategories) {
                        for (const customCategory of overriddenWeaponsData.CustomCategories) {
                            if (!overridedSettings.customCategories[customCategory.name]) {
                                overridedSettings.customCategories[customCategory.name] = {
                                    name: customCategory.name,
                                    ids: [],
                                    whiteListedKeywords: [],
                                    blackListedKeywords: [],
                                    allowedCalibres: [],
                                    alsoCheckDescription: customCategory.alsoCheckDescription || false
                                };
                            }
                            // merge with existing categories except the name
                            const category = overridedSettings.customCategories[customCategory.name];
                            if (customCategory.ids) {
                                for (const id of customCategory.ids) {
                                    (0, misc_1.pushIfNotExists)(category.ids, id);
                                }
                            }
                            if (customCategory.whiteListedKeywords) {
                                for (const id of customCategory.whiteListedKeywords) {
                                    (0, misc_1.pushIfNotExists)(category.whiteListedKeywords, id);
                                }
                            }
                            if (customCategory.blackListedKeywords) {
                                for (const id of customCategory.blackListedKeywords) {
                                    (0, misc_1.pushIfNotExists)(category.blackListedKeywords, id);
                                }
                            }
                            if (customCategory.allowedCalibres) {
                                for (const id of customCategory.allowedCalibres) {
                                    (0, misc_1.pushIfNotExists)(category.allowedCalibres, id);
                                }
                            }
                            customCategory.alsoCheckDescription ||= category.alsoCheckDescription;
                            this.logger.log(category);
                        }
                    }
                }
            }
            catch (e) {
                this.logger.error(`Error reading OverriddenWeapons in ${modDir}: ${e.message}`);
            }
            this.logger.minusIndent();
        });
        this.logger.log("##### Quest Overrides #####");
        this.logger.plusIndent();
        for (const key in overridedSettings.questOverrides) {
            this.logger.log(overridedSettings.questOverrides[key]);
        }
        this.logger.minusIndent();
        this.logger.log("##### #####");
        this.logger.log("##### Overridden Weapons #####");
        return overridedSettings;
    }
};
exports.OverrideReader = OverrideReader;
exports.OverrideReader = OverrideReader = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("LogHelper")),
    __param(1, (0, tsyringe_1.inject)("VFS")),
    __param(2, (0, tsyringe_1.inject)("modDir")),
    __metadata("design:paramtypes", [typeof (_a = typeof logHelper_1.LogHelper !== "undefined" && logHelper_1.LogHelper) === "function" ? _a : Object, typeof (_b = typeof VFS_1.VFS !== "undefined" && VFS_1.VFS) === "function" ? _b : Object, String])
], OverrideReader);
//# sourceMappingURL=overrideReader.js.map