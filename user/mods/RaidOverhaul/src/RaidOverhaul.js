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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaidOverhaul = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
//Json Imports
const legionClothes = require("../db/ItemGen/Clothes/LegionClothing.json");
const baseJson = __importStar(require("../db/base.json"));
//Modules
const fs = __importStar(require("node:fs"));
let RaidOverhaul = class RaidOverhaul {
    utils;
    logger;
    traderUtils;
    traderManager;
    configManager;
    slotGenerator;
    itemGenerator;
    staticRouters;
    dynamicRouters;
    itemController;
    raidController;
    legionController;
    clothingGenerator;
    roHealthController;
    weatherController;
    configServer;
    databaseService;
    constructor(utils, logger, traderUtils, traderManager, configManager, slotGenerator, itemGenerator, staticRouters, dynamicRouters, itemController, raidController, legionController, clothingGenerator, roHealthController, weatherController, configServer, databaseService) {
        this.utils = utils;
        this.logger = logger;
        this.traderUtils = traderUtils;
        this.traderManager = traderManager;
        this.configManager = configManager;
        this.slotGenerator = slotGenerator;
        this.itemGenerator = itemGenerator;
        this.staticRouters = staticRouters;
        this.dynamicRouters = dynamicRouters;
        this.itemController = itemController;
        this.raidController = raidController;
        this.legionController = legionController;
        this.clothingGenerator = clothingGenerator;
        this.roHealthController = roHealthController;
        this.weatherController = weatherController;
        this.configServer = configServer;
        this.databaseService = databaseService;
    }
    async preSptLoadAsync() {
        const swagKey = "SWAG";
        const moarKey = "DewardianDev-MOAR";
        const ragfair = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        if (this.configManager.modConfig().RemoveFromSwag) {
            return;
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.debugModeWarning();
        }
        this.traderUtils.registerProfileImage();
        this.traderUtils.setupTraderUpdateTime("66f0eaa93f6cc015bc1f3acb");
        Traders_1.Traders["66f0eaa93f6cc015bc1f3acb"] = "66f0eaa93f6cc015bc1f3acb";
        ragfair.traders[baseJson._id] = true;
        //Register router hooks
        this.staticRouters.registerHooks();
        this.dynamicRouters.registerHooks();
        //Load Boss features
        if (this.utils.checkForMod(swagKey)) {
            this.logger.log("SWAG detected, modifying Legion patterns.", LogTextColor_1.LogTextColor.MAGENTA);
        }
        if (this.utils.checkForMod(moarKey)) {
            this.logger.log("MOAR detected, modifying Legion patterns.", LogTextColor_1.LogTextColor.MAGENTA);
        }
        this.legionController.legionPreSptPatch();
    }
    async postDBLoadAsync() {
        const pluginRO = "raidoverhaul.dll";
        const prePatchRO = "legionprepatch.dll";
        const pluginPath = fs.readdirSync("./BepInEx/plugins/RaidOverhaul").map((plugin) => plugin.toLowerCase());
        const patcherPath = fs.readdirSync("./BepInEx/patchers").map((patcher) => patcher.toLowerCase());
        //Random message on server on startup
        const messageArray = [
            "The hamsters can take a break now",
            "Time to get wrecked by Birdeye LOL",
            "Back to looking for cat pics",
            "I made sure to crank up your heart attack event chances",
            "If there's a bunch of red text it's 100% not my fault",
            "We are legion, for we are many",
            "All Hail the Cult of Cj",
            "Good luck out there",
        ];
        const randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];
        //Remove boss from SWAG
        if (this.configManager.modConfig().RemoveFromSwag) {
            this.legionController.removeLegionPatch();
            this.logger.logError("Removing Legion from Swag config. Ready to uninstall.");
            return;
        }
        //Check for proper install
        if (!this.utils.checkDependancies(pluginPath, pluginRO)) {
            this.logger.logError("Error, client portion of Raid Overhaul is missing from BepInEx/plugins folder.\nPlease install correctly.");
            return;
        }
        if (!this.utils.checkDependancies(patcherPath, prePatchRO)) {
            this.logger.logError("Error, Legion Boss PrePatch is missing from BepInEx/patchers folder.\nPlease install correctly.");
            return;
        }
        this.loadCustomItems();
        this.pushModFeatures();
        this.loadTraderData();
        if (this.configManager.modConfig().EnableCustomBoss) {
            this.pushBossData();
        }
        if (this.configManager.debugConfig().debugMode && this.configManager.debugConfig().dumpData) {
            this.utils.generateFluidAssortData();
            this.utils.generateAmmoTypeData();
            this.utils.generatePresetData();
            //this.utils.writePresetKeys();
        }
        this.logger.log(`has finished modifying your raids. ${randomMessage}.`, LogTextColor_1.LogTextColor.CYAN);
    }
    loadCustomItems() {
        const tables = this.databaseService.getTables();
        const apbsKey = "acidphantasm-progressivebotsystem";
        const alpKey = "AlgorithmicLevelProgression";
        const realismKey = "SPT-Realism";
        //Load all custom items
        this.itemGenerator.createCustomItems("../../db/ItemGen/Currency");
        this.itemGenerator.createCustomItems("../../db/ItemGen/ConstItems");
        this.itemGenerator.createCustomItems("../../db/ItemGen/CustomKeys");
        if (this.configManager.modConfig().EnableCustomItems) {
            if (this.utils.checkForMod(realismKey)) {
                this.itemGenerator.createCustomItems("../../db/ItemGen/Ammo Realism");
                this.logger.log("Realism detected, modifying custom ammunition.", LogTextColor_1.LogTextColor.MAGENTA);
            }
            else if (!this.utils.checkForMod(realismKey)) {
                this.itemGenerator.createCustomItems("../../db/ItemGen/Ammo");
            }
            this.itemGenerator.createCustomItems("../../db/ItemGen/Weapons");
            this.itemGenerator.createCustomItems("../../db/ItemGen/Gear");
            this.itemGenerator.createCustomItems("../../db/ItemGen/Cases");
            this.slotGenerator.buildSlots();
            /*
            if (!this.utils.checkForMod(apbsKey) && !this.utils.checkForMod(alpKey)) {
                this.itemController.pushCustomWeaponsToBots();
            }
*/
        }
        tables.locations.laboratory.base.AccessKeys.push(...["66a2fc9886fbd5d38c5ca2a6"]);
    }
    loadTraderData() {
        // Load Trader Data
        if (this.configManager.modConfig().EnableCustomBoss) {
            this.traderManager.pushExports();
            this.traderManager.buildReqAssort();
            this.raidController.traderTweaks();
        }
        else if (!this.configManager.modConfig().EnableCustomBoss) {
            this.traderManager.pushExports2();
            this.traderManager.buildReqAssort();
            this.raidController.traderTweaks();
        }
        return;
    }
    pushModFeatures() {
        //Push all the mods base features
        this.raidController.raidChanges();
        this.itemController.itemChanges();
        this.raidController.lootChanges();
        this.itemController.stackChanges();
        this.raidController.weightChanges();
        if (this.configManager.modConfig().Raid.ModifyEnemyBotHealth) {
            this.roHealthController.modifyEnemyHealth();
        }
        if (this.configManager.modConfig().Seasons.EnableWeatherOptions &&
            this.configManager.modConfig().Seasons.WinterWonderland) {
            this.weatherController.weatherChangesWinterWonderland();
        }
    }
    pushBossData() {
        // Load custom boss data
        this.legionController.addBossToDb();
        this.clothingGenerator.createClothingTop(legionClothes.Shirt);
        this.clothingGenerator.createClothingBottom(legionClothes.Pants);
    }
};
exports.RaidOverhaul = RaidOverhaul;
exports.RaidOverhaul = RaidOverhaul = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("Utils")),
    __param(1, (0, tsyringe_1.inject)("ROLogger")),
    __param(2, (0, tsyringe_1.inject)("TraderUtils")),
    __param(3, (0, tsyringe_1.inject)("TraderManager")),
    __param(4, (0, tsyringe_1.inject)("ConfigManager")),
    __param(5, (0, tsyringe_1.inject)("SlotGenerator")),
    __param(6, (0, tsyringe_1.inject)("ItemGenerator")),
    __param(7, (0, tsyringe_1.inject)("StaticRouters")),
    __param(8, (0, tsyringe_1.inject)("DynamicRouters")),
    __param(9, (0, tsyringe_1.inject)("ItemController")),
    __param(10, (0, tsyringe_1.inject)("RaidController")),
    __param(11, (0, tsyringe_1.inject)("LegionController")),
    __param(12, (0, tsyringe_1.inject)("ClothingGenerator")),
    __param(13, (0, tsyringe_1.inject)("ROHealthController")),
    __param(14, (0, tsyringe_1.inject)("ROWeatherController")),
    __param(15, (0, tsyringe_1.inject)("ConfigServer")),
    __param(16, (0, tsyringe_1.inject)("DatabaseService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], RaidOverhaul);
//# sourceMappingURL=RaidOverhaul.js.map