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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponCategorizer = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const logHelper_1 = require("./util/logHelper");
const IAddMissingQuestRequirementConfig_1 = require("./models/IAddMissingQuestRequirementConfig");
const OverridedSettings_1 = require("./models/OverridedSettings");
const DatabaseServer_1 = require("C:/snapshot/project/obj/servers/DatabaseServer");
const localeHelper_1 = require("./util/localeHelper");
const misc_1 = require("./util/misc");
let WeaponCategorizer = class WeaponCategorizer {
    logger;
    databaseServer;
    config;
    overridedSettings;
    localeHelper;
    allItems;
    weaponsTypes = {};
    weaponToType = {};
    locale;
    constructor(logger, databaseServer, config, overridedSettings, localeHelper) {
        this.logger = logger;
        this.databaseServer = databaseServer;
        this.config = config;
        this.overridedSettings = overridedSettings;
        this.localeHelper = localeHelper;
        this.allItems = this.databaseServer.getTables().templates.items;
        this.locale = this.databaseServer.getTables().locales.global["en"];
        logger.log("WeaponCategorizer created");
    }
    // todo: make it more generic to support more than just weapons
    countAsWeapon = (name) => {
        return name == "Weapon" ? 0 : (name == "ThrowWeap" || name == "Knife" || name == "Launcher") ? 1 : -1;
    };
    getWeaponType = (item) => {
        if (!item._parent) {
            return null;
        }
        switch (this.countAsWeapon(this.allItems[item._parent]._name)) {
            case 1:
                return this.allItems[item._parent]._name;
            case 0:
                return item._name;
            case -1:
                return this.getWeaponType(this.allItems[item._parent]);
        }
    };
    getWeapClass = (item) => {
        if (item._type !== "Item" || !item._props) {
            return null;
        }
        return this.getWeaponType(item);
    };
    addWeaponType = (weaponType, itemId) => {
        if (!this.weaponsTypes[weaponType]) {
            this.weaponsTypes[weaponType] = [];
        }
        (0, misc_1.pushIfNotExists)(this.weaponsTypes[weaponType], itemId);
        if (!this.weaponToType[itemId]) {
            this.weaponToType[itemId] = [];
        }
        (0, misc_1.pushIfNotExists)(this.weaponToType[itemId], weaponType);
    };
    addToWeaponType = (weaponType, item) => {
        const itemId = item._id;
        if (!weaponType || !itemId || this.config.BlackListedWeaponsTypes.includes(weaponType) || this.config.BlackListedItems.includes(itemId)) {
            return;
        }
        if (this.overridedSettings.overriddenWeapons[itemId]) {
            this.overridedSettings.overriddenWeapons[itemId].split(",").map(w => w.trim()).forEach(w => this.addWeaponType(w, itemId));
            return;
        }
        // check if the weapon is a more restrive type (e.g. bolt action, pump action, etc)
        switch (weaponType) {
            case "Shotgun":
                // until i find a better way to categorize shotguns
                if (this.locale[`${itemId} Name`].includes("pump")) {
                    if (this.config.categorizeWithLessRestrive) {
                        this.addWeaponType(weaponType, itemId);
                    }
                    weaponType = "PumpActionShotgun";
                }
                break;
            case "SniperRifle":
                if (item._props.BoltAction) {
                    if (this.config.categorizeWithLessRestrive) {
                        this.addWeaponType(weaponType, itemId);
                    }
                    weaponType = "BoltActionSniperRifle";
                }
                break;
            case "Revolver":
                if (this.config.categorizeWithLessRestrive) {
                    this.addWeaponType("Pistol", itemId);
                }
                break;
            default:
                break;
        }
        this.addWeaponType(weaponType, itemId);
    };
    run(dependecyContainer) {
        for (const itemId in this.allItems) {
            try {
                const item = this.allItems[itemId];
                if (item._type !== "Item" || !item._props) {
                    continue;
                }
                this.addToWeaponType(this.getWeapClass(item), item);
            }
            catch (e) {
                this.logger.error(`Error processing ${itemId}: ${e}`);
            }
        }
        const allWeaponIds = Object.keys(this.weaponToType);
        const addToCanBeUsedAs = (id0, id1) => {
            if (!this.overridedSettings.canBeUsedAs[id0]) {
                this.overridedSettings.canBeUsedAs[id0] = [];
            }
            (0, misc_1.pushIfNotExists)(this.overridedSettings.canBeUsedAs[id0], id1);
        };
        const allShortNames = allWeaponIds.map(id => [id, this.localeHelper.getShortName(id)]);
        // can be used to find similar names
        const whiteList = this.overridedSettings.canBeUsedAsShortNameWhitelist;
        for (let i0 = 0; i0 < allShortNames.length; i0++) {
            const name = allShortNames[i0][1];
            if (this.overridedSettings.canBeUsedAsShortNameBlackList.includes(name)) {
                continue;
            }
            for (let i1 = i0 + 1; i1 < allShortNames.length; i1++) {
                const name2 = allShortNames[i1][1];
                if (this.overridedSettings.canBeUsedAsShortNameBlackList.includes(name2)) {
                    continue;
                }
                if (name === name2) {
                    // this.logger.log(`${allShortNames[i0][0]} - ${allShortNames[i1][0]}`);
                    addToCanBeUsedAs(allShortNames[i0][0], allShortNames[i1][0]);
                    continue;
                }
                const s0 = name.split(" ");
                const s1 = name2.split(" ");
                if (s0.length === 1 && s1.length === 1) {
                    continue;
                }
                let same = true;
                for (const w of s0) {
                    if (!s1.includes(w) && !whiteList.includes(w)) {
                        same = false;
                        break;
                    }
                }
                if (!same) {
                    same = true;
                    for (const w of s1) {
                        if (!s0.includes(w) && !whiteList.includes(w)) {
                            same = false;
                            break;
                        }
                    }
                }
                if (same) {
                    // this.logger.log(`${allShortNames[i0][0]} - ${allShortNames[i1][0]}`);
                    addToCanBeUsedAs(allShortNames[i0][0], allShortNames[i1][0]);
                    continue;
                }
            }
        }
        const matches = (item, regexes, alsoDesc) => {
            const name = this.localeHelper.getName(item._id);
            const desc = this.localeHelper.getDescription(item._id);
            for (const regex of regexes) {
                if (name.match(new RegExp(regex, "i")) || (alsoDesc && desc.match(new RegExp(regex, "i")))) {
                    return true;
                }
            }
            return false;
        };
        // process custom categories
        for (const k in this.overridedSettings.customCategories) {
            try {
                this.logger.log("Processing Custom Category");
                this.logger.log(this.overridedSettings.customCategories[k]);
                const customCategory = this.overridedSettings.customCategories[k];
                this.logger.log(`Processing Custom Category:  ${customCategory.name}`);
                const potentials = [];
                this.logger.plusIndent();
                for (const id of allWeaponIds) {
                    this.logger.minusIndent();
                    const item = this.allItems[id];
                    this.logger.logDebug(`Processing ${item._id}`, logHelper_1.LogType.NONE, true);
                    this.logger.plusIndent();
                    if (customCategory?.ids.includes(id)) {
                        this.logger.logDebug(`Adding ${item._id} to ${customCategory.name}. Found in ids.`);
                        potentials.push(item);
                        continue;
                    }
                    if (customCategory?.blackListedKeywords?.length > 0) {
                        if (matches(item, Array.from(customCategory.blackListedKeywords), customCategory.alsoCheckDescription)) {
                            this.logger.logDebug(`Skipping ${item._id} from ${customCategory.name}. Found in blacklisted keywords.`);
                            continue;
                        }
                    }
                    if (customCategory?.whiteListedKeywords?.length > 0) {
                        if (!matches(item, Array.from(customCategory.whiteListedKeywords), customCategory.alsoCheckDescription)) {
                            this.logger.logDebug(`Skipping ${item._id} from ${customCategory.name}. Not found in whitelisted keywords.`);
                            continue;
                        }
                    }
                    if (customCategory?.allowedCalibres?.length > 0) {
                        if (!item._props.ammoCaliber || !customCategory.allowedCalibres.includes(item._props.ammoCaliber)) {
                            this.logger.logDebug(`Skipping ${item._id} from ${customCategory.name}. Not found in allowed calibres.`);
                            continue;
                        }
                    }
                    potentials.push(item);
                }
                this.logger.minusIndent();
                for (const item of potentials) {
                    this.logger.log(`Adding ${item._id} to ${customCategory.name}`);
                    this.addWeaponType(customCategory.name, item._id);
                }
            }
            catch (e) {
                this.logger.error(`Error processing custom category ${k}: ${e}`);
            }
        }
        // process can be used as once more 
        for (let i = Object.keys(this.overridedSettings.canBeUsedAs).length - 1; i >= 0; --i) {
            const key = Object.keys(this.overridedSettings.canBeUsedAs)[i];
            const value = this.overridedSettings.canBeUsedAs[key];
            // process custom categories
            for (const v of value) {
                if (this.weaponsTypes[v]) {
                    for (const id of this.weaponsTypes[v]) {
                        if (id === key)
                            continue;
                        (0, misc_1.pushIfNotExists)(this.overridedSettings.canBeUsedAs[key], id);
                    }
                }
            }
            // add to each other
            for (const v of value) {
                if (!this.overridedSettings.canBeUsedAs[v]) {
                    this.overridedSettings.canBeUsedAs[v] = [];
                }
                (0, misc_1.pushIfNotExists)(this.overridedSettings.canBeUsedAs[v], key);
                for (const id of value) {
                    if (id === v)
                        continue;
                    (0, misc_1.pushIfNotExists)(this.overridedSettings.canBeUsedAs[v], id);
                }
            }
        }
        this.logger.log("\n\n ###############  Can be used as weapons:  ################\n\n");
        this.logger.log(this.overridedSettings.canBeUsedAs);
        this.logger.log("\n\n ###############  Prepared weapon types:  ################\n\n");
        this.logger.log(this.weaponsTypes);
        this.logger.logDebug("\n\n ###############  Prepared weapon to type:  ################\n\n");
        this.logger.logDebug(this.weaponToType);
        this.logger.logDebug("\n\n ###############################\n\n");
        dependecyContainer.registerInstance("WeaponTypes", this.weaponsTypes);
        dependecyContainer.registerInstance("WeaponToType", this.weaponToType);
    }
};
exports.WeaponCategorizer = WeaponCategorizer;
exports.WeaponCategorizer = WeaponCategorizer = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("LogHelper")),
    __param(1, (0, tsyringe_1.inject)("DatabaseServer")),
    __param(2, (0, tsyringe_1.inject)("AMQRConfig")),
    __param(3, (0, tsyringe_1.inject)("OverridedSettings")),
    __param(4, (0, tsyringe_1.inject)("LocaleHelper")),
    __metadata("design:paramtypes", [typeof (_a = typeof logHelper_1.LogHelper !== "undefined" && logHelper_1.LogHelper) === "function" ? _a : Object, typeof (_b = typeof DatabaseServer_1.DatabaseServer !== "undefined" && DatabaseServer_1.DatabaseServer) === "function" ? _b : Object, typeof (_c = typeof IAddMissingQuestRequirementConfig_1.IAddMissingQuestRequirementConfig !== "undefined" && IAddMissingQuestRequirementConfig_1.IAddMissingQuestRequirementConfig) === "function" ? _c : Object, typeof (_d = typeof OverridedSettings_1.OverridedSettings !== "undefined" && OverridedSettings_1.OverridedSettings) === "function" ? _d : Object, typeof (_e = typeof localeHelper_1.LocaleHelper !== "undefined" && localeHelper_1.LocaleHelper) === "function" ? _e : Object])
], WeaponCategorizer);
//# sourceMappingURL=weaponCategorizer.js.map