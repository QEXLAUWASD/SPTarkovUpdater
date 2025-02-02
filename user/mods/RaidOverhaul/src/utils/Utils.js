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
var Utils_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const BaseClasses_1 = require("C:/snapshot/project/obj/models/enums/BaseClasses");
//Modules
//import weaponPresets from "../utils/data/weaponPresets.json";
//import gearPresets from "../utils/data/gearPresets.json";
const path = __importStar(require("node:path"));
const fs = __importStar(require("node:fs"));
let Utils = class Utils {
    static { Utils_1 = this; }
    logger;
    configManager;
    vfs;
    hashUtil;
    randomUtil;
    imageRouter;
    profileHelper;
    preSptModLoader;
    databaseService;
    ragfairPriceService;
    constructor(logger, configManager, vfs, hashUtil, randomUtil, imageRouter, profileHelper, preSptModLoader, databaseService, ragfairPriceService) {
        this.logger = logger;
        this.configManager = configManager;
        this.vfs = vfs;
        this.hashUtil = hashUtil;
        this.randomUtil = randomUtil;
        this.imageRouter = imageRouter;
        this.profileHelper = profileHelper;
        this.preSptModLoader = preSptModLoader;
        this.databaseService = databaseService;
        this.ragfairPriceService = ragfairPriceService;
    }
    static modLoc = path.join(__dirname, "..", "..");
    //#region Base Utils
    loadFiles(dirPath, extName, cb) {
        if (!fs.existsSync(dirPath))
            return;
        const dir = fs.readdirSync(dirPath, { withFileTypes: true });
        dir.forEach((item) => {
            const itemPath = path.normalize(`${dirPath}/${item.name}`);
            if (item.isDirectory())
                this.loadFiles(itemPath, extName, cb);
            else if (extName.includes(path.extname(item.name)))
                cb(itemPath);
        });
    }
    addQuests() {
        const modPath = `${path.resolve(__dirname.toString()).split(path.sep).join("/")}/`;
        const tables = this.databaseService.getTables();
        let questCount = 0;
        let imageCount = 0;
        this.loadFiles(`${modPath}../../db/questFilesWithBoss/quests/`, [".json"], (filepath) => {
            const keys = require(filepath);
            for (const i in keys) {
                tables.templates.quests[i] = keys[i];
                questCount++;
            }
        });
        this.loadFiles(`${modPath}../../db/questFilesWithBoss/locales/`, [".json"], (localepath) => {
            const Locales = require(localepath);
            for (const i in Locales) {
                for (const localeID in tables.locales.global) {
                    tables.locales.global[localeID][i] = Locales[i];
                }
            }
        });
        this.loadFiles(`${modPath}../../db/questFilesWithBoss/pics/`, [".png", ".jpg"], (filepath) => {
            this.imageRouter.addRoute(`/files/quest/icon/${path.basename(filepath, path.extname(filepath))}`, filepath);
            imageCount++;
        });
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`Loaded ${imageCount} custom images and ${questCount} custom quests.`, LogTextColor_1.LogTextColor.CYAN);
        }
    }
    addQuests2() {
        const modPath = `${path.resolve(__dirname.toString()).split(path.sep).join("/")}/`;
        const tables = this.databaseService.getTables();
        let questCount = 0;
        let imageCount = 0;
        this.loadFiles(`${modPath}../../db/questFilesNoBoss/quests/`, [".json"], (filepath) => {
            const keys = require(filepath);
            for (const i in keys) {
                tables.templates.quests[i] = keys[i];
                questCount++;
            }
        });
        this.loadFiles(`${modPath}../../db/questFilesNoBoss/locales/`, [".json"], (localepath) => {
            const Locales = require(localepath);
            for (const i in Locales) {
                for (const localeID in tables.locales.global) {
                    tables.locales.global[localeID][i] = Locales[i];
                }
            }
        });
        this.loadFiles(`${modPath}../../db/questFilesNoBoss/pics/`, [".png", ".jpg"], (filepath) => {
            this.imageRouter.addRoute(`/files/quest/icon/${path.basename(filepath, path.extname(filepath))}`, filepath);
            imageCount++;
        });
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`Loaded ${imageCount} custom images and ${questCount} custom quests.`, LogTextColor_1.LogTextColor.CYAN);
        }
    }
    /**
     * Checks the mods directory to see if another mod is installed.
     *
     * @param modName - Folder name of the mod to check for.
     * @returns True if the mod is installed, else return false.
     */
    checkForMod(modName) {
        return this.preSptModLoader.getImportedModsNames().includes(modName);
    }
    /**
     * Sorts and shuffles the specified array.
     *
     * @param array - Array to shuffle.
     * @returns The shuffled array.
     */
    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    /**
     * Generates a random string to be used as an instance Id.
     * Gens a new ID each time it runs so not suitable for tpls and such unless you cache the Id.
     *
     * @returns Valid instance Id.
     */
    genId() {
        return this.hashUtil.generate();
    }
    /**
     * Generates a random number in the supplied range.
     *
     * @returns Random integer in the given range.
     */
    genRandomCount(min, max) {
        return this.randomUtil.randInt(min, max);
    }
    /**
     * Pulls a random item from the specified array.
     *
     * @param list - The array to pull from.
     * @param count - Optional param. The number of items to return from the array. Returns 1 if left unused
     * @returns The pulled item as a string.
     */
    drawRandom(list, count) {
        return this.randomUtil.drawRandomFromList(list, count ?? 1, false).toString();
    }
    /**
     * Checks for dependancies in the specified path.
     *
     * @param path - The path to your dependancy. This is the containing folder. Ie BepInEx/plugins
     * @param dependancy - The dependancy you are checking for. Ie raidoverhaul.dll
     * @returns True if the dependancy exists and false if it doesn't.
     */
    checkDependancies(path, dependancy) {
        try {
            return path.includes(dependancy);
        }
        catch {
            return false;
        }
    }
    /**
     * Backs up your profile. Stores max of 3 profiles daily while deleting the oldest.
     * Folders inside of the profile folder are named based on the year-month-date timestamp with actual backups having an hour-minute-second timestamp.
     * More info in the ReadMe in the profileBackup folder.
     *
     * @param sessionID - Session Id for your selected profile
     * @param profile - Interface for profile data
     */
    profileBackup(sessionID, profile) {
        const date = new Date();
        const [year, month, day, hour, minute, second] = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
        ].map((num) => num.toString());
        const backupPath = `${Utils_1.modLoc}/profileBackup/${sessionID}/${year}-${month}-${day}/`;
        const profileData = JSON.stringify(profile, null, 4);
        const backupFile = `${backupPath + sessionID}_${hour}-${minute}-${second}.json`;
        const maxBackups = 3;
        if (!fs.existsSync(backupPath)) {
            fs.mkdirSync(backupPath, { recursive: true });
            this.logger.logWarning(`No backup path exist for this profile. \nProfile backup path at "${backupPath}" has been created`);
        }
        const profileCount = this.vfs
            .getFilesOfType(backupPath, "json")
            .sort((a, b) => fs.statSync(a).ctimeMs - fs.statSync(b).ctimeMs);
        if (profileCount.length >= maxBackups) {
            const lastProfile = profileCount[0];
            this.vfs.removeFile(lastProfile);
            profileCount.splice(0, 1);
        }
        try {
            fs.writeFileSync(backupFile, profileData);
            this.logger.log("Profile backup successful.", LogTextColor_1.LogTextColor.MAGENTA);
        }
        catch (error) {
            this.logger.logError(`Error writing profile backup: ${error}`);
        }
    }
    /**
     * Fetches the level of your Pmc profile.
     *
     * @param profileId - Id of the currently selected profile.
     * @returns The Pmc profile level.
     */
    checkProfileLevel(profileId) {
        const pmcProfile = this.profileHelper.getProfileByPmcId(profileId);
        const profileLevel = pmcProfile.Info.Level;
        return profileLevel;
    }
    /**
     * Checks to see if the pmc profile exists.
     *
     * @param profileId - Id of the currently selected profile.
     * @returns True if pmc profile exists, else returns false (ie. for scav runs).
     */
    checkProfileExists(profileId) {
        const pmcProfile = this.profileHelper.getProfileByPmcId(profileId);
        if (!pmcProfile) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * Fetches the handbook info for an item.
     *
     * @param itemID - Id of the item you want to get handbook info for.
     * @returns The handbook price of the item.
     */
    getItemInHandbook(itemID) {
        const tables = this.databaseService.getTables();
        try {
            const hbItem = tables.templates.handbook.Items.find((i) => i.Id === itemID);
            return Math.round(hbItem.Price);
        }
        catch (error) {
            this.logger.logWarning(`\nError getting Handbook ID for ${itemID}`);
        }
    }
    /**
     * Fetches the flea market info for an item.
     *
     * @param itemID - Id of the item you want to get flea market info for.
     * @returns The flea market price of the item.
     */
    getFleaPrice(itemID) {
        const tables = this.databaseService.getTables();
        if (typeof tables.templates.prices[itemID] !== "undefined") {
            return Math.round(tables.templates.prices[itemID]);
        }
        else {
            return this.getItemInHandbook(itemID);
        }
    }
    /**
     * Fetches the cost of an item in requisition forms.
     *
     * @param itemID - Id of the item you want to get the price for.
     * @returns The items flea price divided by the requisition forms flea price.
     */
    getFormCost(itemID) {
        const cost = Math.round(this.getFleaPrice(itemID) / 175);
        if (cost >= 1) {
            return cost;
        }
        else {
            return 1;
        }
    }
    /**
     * Fetches the cost of an item in requisition slips.
     *
     * @param itemID - Id of the item you want to get the price for.
     * @returns The items flea price divided by the requisition slips flea price.
     */
    getReqCost(itemID) {
        const cost = Math.round(this.getFleaPrice(itemID) / 53999);
        if (cost >= 1) {
            return cost;
        }
        else {
            return 1;
        }
    }
    /**
     * Pushes an item to the filters of the specified cases.
     *
     * @param casesToAdd - Ids of the cases you want to push your items to.
     * @param itemToAdd - Id of the item you want to push.
     */
    addToCases(casesToAdd, itemToAdd) {
        const tables = this.databaseService.getTables();
        const items = tables.templates.items;
        for (const cases of casesToAdd) {
            for (const item in items) {
                if (items[item]._id === cases) {
                    if (items[item]._props?.Grids[0]._props.filters[0].Filter === undefined ||
                        items[item]._props?.Grids[0]._props.filters[0].Filter === null) {
                        this.stopHurtingMeSVM(cases);
                    }
                    if (items[item]._props?.Grids[0]._props.filters[0].Filter !== undefined) {
                        items[item]._props?.Grids[0]._props.filters[0].Filter.push(itemToAdd);
                    }
                }
            }
        }
    }
    /**
     * Attempts to fix incompatabilities with SVM and other destructive mods that remove filters completely.
     * This just adds minimal filters back to hopefuly avoid erroring out.
     * Really need to make a better way to do this in the future.
     *
     * @param caseToAdd - Id of the case you want to try to add filters back to.
     */
    stopHurtingMeSVM(caseToAdd) {
        const tables = this.databaseService.getTables();
        const unbreakFilters = [
            {
                Filter: ["54009119af1c881c07000029"],
                ExcludedFilter: ["5448bf274bdc2dfc2f8b456a"],
            },
        ];
        tables.templates.items[caseToAdd]._props.Grids[0]._props.filters = unbreakFilters;
    }
    /**
     * Modifies container size.
     * Only works for items with a single grid. Not multiple, such as rigs and the multi-gridded backpack
     *
     * @param container - Id of the case you want to modify the size of.
     * @param horizontal - Horizontal filter size you want to change to.
     * @param vertical - Vertical filter size you want to change to.
     */
    modifyContainerSize(container, horizontal, vertical) {
        const tables = this.databaseService.getTables();
        const items = tables.templates.items;
        items[container]._props.Grids[0]._props.cellsH = horizontal;
        items[container]._props.Grids[0]._props.cellsV = vertical;
    }
    //#endregion
    //
    //
    //
    //#region Generate Fluid Assort
    /**
     * Sorts each item in the database by category and writes them to json based on their respective category.
     *
     */
    generateFluidAssortData() {
        const tables = this.databaseService.getTables();
        const items = Object.values(tables.templates.items);
        const itemArray = [];
        const ammoArray = [];
        const plateArray = [];
        const gearArray = [];
        const modsArray = [];
        const medsArray = [];
        const weaponArray = [];
        const keyArray = [];
        for (const item of items) {
            if (item._props.QuestItem !== true && item._type !== "Node" && item._props.Prefab.path !== "") {
                if (item._parent === BaseClasses_1.BaseClasses.INFO) {
                    itemArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.HEADPHONES) {
                    gearArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.AUXILIARY_MOD) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.FUNCTIONAL_MOD) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.GEAR_MOD) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.SILENCER &&
                    item._id !== "55d617094bdc2d89028b4568" &&
                    item._id !== "54490a4d4bdc2dbc018b4573") {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.SPECIAL_SCOPE) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.OPTIC_SCOPE) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.COMPENSATOR) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.COMPACT_COLLIMATOR) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.COLLIMATOR) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.FLASH_HIDER) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.LIGHT_LASER_DESIGNATOR) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.MAGAZINE &&
                    item._id !== "5d52d479a4b936793d58c76b" &&
                    item._id !== "5cffa483d7ad1a049e54ef1c" &&
                    item._id !== "6241c2c2117ad530666a5108") {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.FLASHLIGHT) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.TACTICAL_COMBO) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.ASSAULT_SCOPE) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.ELECTRONICS) {
                    itemArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.ARMBAND &&
                    item._id !== "619bddc6c9546643a67df6ee" &&
                    item._id !== "DeadArmband") {
                    itemArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.KEY_MECHANICAL) {
                    keyArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.NIGHTVISION) {
                    itemArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.MEDS &&
                    item._id !== "5e99735686f7744bfc4af32c" &&
                    item._id !== "5e99711486f7744bfc4af328") {
                    medsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.MOUNT) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.FOREGRIP) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.STOCK) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.STIMULATOR &&
                    item._id !== "64ba763be87866541c0d7c50" &&
                    item._id !== "637b60c3b7afa97bfc3d7001") {
                    medsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.FUEL) {
                    itemArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.DRUGS) {
                    medsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.MEDKIT &&
                    item._id !== "5e99735686f7744bfc4af32c" &&
                    item._id !== "5e99711486f7744bfc4af328") {
                    medsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.GAS_BLOCK) {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.BACKPACK) {
                    gearArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.FACECOVER) {
                    gearArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.VEST) {
                    gearArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.HEADWEAR) {
                    gearArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.VISORS) {
                    gearArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.UBGL && item._id !== "5648b62b4bdc2d9d488b4585") {
                    modsArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.BARTER_ITEM) {
                    itemArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.TOOL) {
                    itemArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.HOUSEHOLD_GOODS) {
                    itemArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.ARMOR_PLATE &&
                    !item._name.includes("soft_armor") &&
                    item._id !== "64b11c08506a73f6a10f9364") {
                    plateArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.THROW_WEAPON) {
                    weaponArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.PISTOL) {
                    weaponArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.REVOLVER) {
                    weaponArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.SMG) {
                    weaponArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.ASSAULT_RIFLE) {
                    weaponArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.ASSAULT_CARBINE) {
                    weaponArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.SHOTGUN) {
                    weaponArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.MARKSMAN_RIFLE) {
                    weaponArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.SNIPER_RIFLE) {
                    weaponArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.MACHINE_GUN && item._id !== "5cdeb229d7f00c000e7ce174") {
                    weaponArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.GRENADE_LAUNCHER && item._id !== "5d52cc5ba4b9367408500062") {
                    weaponArray.push(item._id);
                }
                if (item._parent === BaseClasses_1.BaseClasses.SPECIAL_WEAPON && item._id !== "5d52cc5ba4b9367408500062") {
                    weaponArray.push(item._id);
                }
            }
        }
        const dataLocFolder = `${Utils_1.modLoc}/ROData/Items`;
        const dataLocItem = `${dataLocFolder}/itemArray.json`;
        const dataLocAmmo = `${dataLocFolder}/ammoArray.json`;
        const dataLocPlate = `${dataLocFolder}/plateArray.json`;
        const dataLocGear = `${dataLocFolder}/gearArray.json`;
        const dataLocMods = `${dataLocFolder}/modsArray.json`;
        const dataLocMeds = `${dataLocFolder}/medsArray.json`;
        const dataLocWeapon = `${dataLocFolder}/weaponArray.json`;
        const dataLocKey = `${dataLocFolder}/keyArray.json`;
        const itemArrayFile = JSON.stringify(itemArray, null, 2);
        const ammoArrayFile = JSON.stringify(ammoArray, null, 2);
        const plateArrayFile = JSON.stringify(plateArray, null, 2);
        const gearArrayFile = JSON.stringify(gearArray, null, 2);
        const modsArrayFile = JSON.stringify(modsArray, null, 2);
        const medsArrayFile = JSON.stringify(medsArray, null, 2);
        const weaponArrayFile = JSON.stringify(weaponArray, null, 2);
        const keyArrayFile = JSON.stringify(keyArray, null, 2);
        if (!fs.existsSync(dataLocFolder)) {
            fs.mkdirSync(dataLocFolder, { recursive: true });
        }
        try {
            fs.writeFileSync(dataLocItem, JSON.stringify(itemArrayFile, null, 4));
            fs.writeFileSync(dataLocAmmo, JSON.stringify(ammoArrayFile, null, 4));
            fs.writeFileSync(dataLocPlate, JSON.stringify(plateArrayFile, null, 4));
            fs.writeFileSync(dataLocGear, JSON.stringify(gearArrayFile, null, 4));
            fs.writeFileSync(dataLocMods, JSON.stringify(modsArrayFile, null, 4));
            fs.writeFileSync(dataLocMeds, JSON.stringify(medsArrayFile, null, 4));
            fs.writeFileSync(dataLocWeapon, JSON.stringify(weaponArrayFile, null, 4));
            fs.writeFileSync(dataLocKey, JSON.stringify(keyArrayFile, null, 4));
        }
        catch (error) {
            this.logger.logError(`Error writing dumped item data file: ${error}`);
        }
    }
    /**
     * Sorts each type of ammo in the database into categories and writes those to their respective json files.
     *
     */
    generateAmmoTypeData() {
        const tables = this.databaseService.getTables();
        const items = Object.values(tables.templates.items);
        const rifleArray = [];
        const shotgunArray = [];
        const smgArray = [];
        const sniperArray = [];
        const ubglArray = [];
        for (const item of items) {
            if ((item._parent === BaseClasses_1.BaseClasses.AMMO && item._props.Caliber === "Caliber366TKM") ||
                item._props.Caliber === "Caliber9x39" ||
                item._props.Caliber === "Caliber762x39" ||
                item._props.Caliber === "Caliber556x45NATO" ||
                item._props.Caliber === "Caliber545x39" ||
                item._props.Caliber === "Caliber127x55" ||
                item._props.Caliber === "Caliber68x51" ||
                item._props.Caliber === "Caliber762x35") {
                rifleArray.push(item._id);
            }
            if ((item._parent === BaseClasses_1.BaseClasses.AMMO && item._props.Caliber === "Caliber12g") ||
                item._props.Caliber === "Caliber20g") {
                shotgunArray.push(item._id);
            }
            if ((item._parent === BaseClasses_1.BaseClasses.AMMO && item._props.Caliber === "Caliber1143x23ACP") ||
                item._props.Caliber === "Caliber46x30" ||
                item._props.Caliber === "Caliber57x28" ||
                item._props.Caliber === "Caliber762x25TT" ||
                item._props.Caliber === "Caliber9x18PM" ||
                item._props.Caliber === "Caliber9x19PARA" ||
                item._props.Caliber === "Caliber9x21" ||
                item._props.Caliber === "Caliber9x33R") {
                smgArray.push(item._id);
            }
            if ((item._parent === BaseClasses_1.BaseClasses.AMMO && item._props.Caliber === "Caliber762x51") ||
                item._props.Caliber === "Caliber762x54R" ||
                item._props.Caliber === "Caliber86x70") {
                sniperArray.push(item._id);
            }
            if ((item._parent === BaseClasses_1.BaseClasses.UBGL && item._props.Caliber === "Caliber26x75") ||
                item._props.Caliber === "Caliber30x29" ||
                item._props.Caliber === "Caliber40mmRU" ||
                item._props.Caliber === "Caliber40x46") {
                ubglArray.push(item._id);
            }
        }
        const rifleArrayFile = JSON.stringify(rifleArray, null, 2);
        const shotgunArrayFile = JSON.stringify(shotgunArray, null, 2);
        const smgArrayFile = JSON.stringify(smgArray, null, 2);
        const sniperArrayFile = JSON.stringify(sniperArray, null, 2);
        const ubglArrayFile = JSON.stringify(ubglArray, null, 2);
        const dataLocFolder = `${Utils_1.modLoc}/ROData/Ammo`;
        const dataLocRifle = `${dataLocFolder}/Rifle.json`;
        const dataLocShotgun = `${dataLocFolder}/Shotgun.json`;
        const dataLocSMG = `${dataLocFolder}/SMG.json`;
        const dataLocSniper = `${dataLocFolder}/Sniper.json`;
        const dataLocUBGL = `${dataLocFolder}/UBGL.json`;
        if (!fs.existsSync(dataLocFolder)) {
            fs.mkdirSync(dataLocFolder, { recursive: true });
        }
        try {
            fs.writeFileSync(dataLocRifle, JSON.stringify(rifleArrayFile, null, 4));
            fs.writeFileSync(dataLocShotgun, JSON.stringify(shotgunArrayFile, null, 4));
            fs.writeFileSync(dataLocSMG, JSON.stringify(smgArrayFile, null, 4));
            fs.writeFileSync(dataLocSniper, JSON.stringify(sniperArrayFile, null, 4));
            fs.writeFileSync(dataLocUBGL, JSON.stringify(ubglArrayFile, null, 4));
        }
        catch (error) {
            this.logger.logError(`Error writing dumped ammo data files: ${error}`);
        }
    }
    /**
     * Writes each preset in the globals database to json.
     *
     */
    generatePresetData() {
        fs.readFile(path.resolve(__dirname, "../../../../../SPT_Data/Server/database/globals.json"), (err, data) => {
            if (err)
                throw err;
            const presetList = JSON.parse(data).ItemPresets;
            const presetFile = {};
            for (const preset in presetList) {
                const newPreset = {
                    _changeWeaponName: presetList[preset]._changeWeaponName,
                    _encyclopedia: presetList[preset]._encyclopedia,
                    _id: this.hashUtil.generate(),
                    _items: [...presetList[preset]._items],
                    _name: presetList[preset]._name,
                    _parent: presetList[preset]._parent,
                    _type: presetList[preset]._type,
                };
                presetFile[presetList[preset]._name] = JSON.parse(JSON.stringify(newPreset));
            }
            const dataLocFolder = `${Utils_1.modLoc}/ROData/Presets`;
            const dataLocPreset = `${dataLocFolder}/presetArray.json`;
            if (!fs.existsSync(dataLocFolder)) {
                fs.mkdirSync(dataLocFolder, { recursive: true });
            }
            try {
                fs.writeFileSync(dataLocPreset, JSON.stringify(presetFile, null, "\t"));
            }
            catch (error) {
                this.logger.logError(`Error writing dumped preset data file: ${error}`);
            }
        });
    }
};
exports.Utils = Utils;
exports.Utils = Utils = Utils_1 = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ROLogger")),
    __param(1, (0, tsyringe_1.inject)("ConfigManager")),
    __param(2, (0, tsyringe_1.inject)("VFS")),
    __param(3, (0, tsyringe_1.inject)("HashUtil")),
    __param(4, (0, tsyringe_1.inject)("RandomUtil")),
    __param(5, (0, tsyringe_1.inject)("ImageRouter")),
    __param(6, (0, tsyringe_1.inject)("ProfileHelper")),
    __param(7, (0, tsyringe_1.inject)("PreSptModLoader")),
    __param(8, (0, tsyringe_1.inject)("DatabaseService")),
    __param(9, (0, tsyringe_1.inject)("RagfairPriceService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], Utils);
//# sourceMappingURL=Utils.js.map