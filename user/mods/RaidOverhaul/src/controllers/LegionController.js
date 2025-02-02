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
var LegionController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegionController = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
//Json Imports
const botSettings = require("../Utils/data/botInfo.json");
const bosslegion = require("../../db/RaidBoss/bosslegion.json");
const bosslegion2 = require("../../db/RaidBoss/bosslegionNoCustomItems.json");
//Modules
const path = __importStar(require("node:path"));
const fs = __importStar(require("node:fs"));
let LegionController = class LegionController {
    static { LegionController_1 = this; }
    utils;
    logger;
    configManager;
    traderController;
    staticRouter;
    jsonUtil;
    randomUtil;
    configServer;
    databaseService;
    constructor(utils, logger, configManager, traderController, staticRouter, jsonUtil, randomUtil, configServer, databaseService) {
        this.utils = utils;
        this.logger = logger;
        this.configManager = configManager;
        this.traderController = traderController;
        this.staticRouter = staticRouter;
        this.jsonUtil = jsonUtil;
        this.randomUtil = randomUtil;
        this.configServer = configServer;
        this.databaseService = databaseService;
    }
    routerPrefix = "[Raid Overhaul] ";
    static modLoc = path.join(__dirname, "..", "..");
    static legionFileChance;
    static profileId;
    static progressFile;
    static setupRan = false;
    addBossToDb() {
        const tables = this.databaseService.getTables();
        const botConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.BOT);
        const preset = botConfig.presetBatch;
        preset.bosslegion = 1;
        botConfig.equipment["bosslegion"] = botSettings.equipmentSettings;
        botConfig.itemSpawnLimits["bosslegion"] = {};
        botConfig.walletLoot["bosslegion"] = botConfig.walletLoot["bossgluhar"];
        botConfig.bosses.push("bosslegion");
        if (this.configManager.modConfig().EnableCustomItems) {
            try {
                tables.bots.types["bosslegion"] = this.jsonUtil.deserialize(this.jsonUtil.serialize(bosslegion));
            }
            catch (error) {
                this.logger.logError(`Error loading default Legion files: ${error}`);
            }
        }
        if (!this.configManager.modConfig().EnableCustomItems) {
            try {
                tables.bots.types["bosslegion"] = this.jsonUtil.deserialize(this.jsonUtil.serialize(bosslegion2));
            }
            catch (error) {
                this.logger.logError(`Error loading default Legion files: ${error}`);
            }
        }
    }
    loadBossLocationData() {
        let bossLegionChance = 15;
        const tables = this.databaseService.getTables();
        const escortAmount = this.randomUtil.randInt(1, 4).toString();
        //const diffType = this.utils.drawRandom(botSettings.difficulties);
        const bossDifficulty = "normal";
        const escortDifficulty = "normal";
        const escortType = this.utils.drawRandom(botSettings.followers);
        const legionSpawnPath = `${LegionController_1.modLoc}/config/profiles/${LegionController_1.profileId}/LegionChance.json`;
        if (fs.existsSync(legionSpawnPath)) {
            try {
                const spawnChance = JSON.parse(fs.readFileSync(legionSpawnPath, "utf8"));
                bossLegionChance = spawnChance?.legionChance ?? 15;
            }
            catch (error) {
                console.log("Can't find Legion spawn chance file. Make sure you have it in your config folder.");
            }
            if (this.configManager.debugConfig().debugMode) {
                this.logger.log(`Current spawn chance for Legion is [${bossLegionChance}]`, LogTextColor_1.LogTextColor.BLUE);
                this.logger.log(`Current Boss Difficulty is [${bossDifficulty}]`, LogTextColor_1.LogTextColor.BLUE);
                this.logger.log(`Current Escort Difficulty is [${escortDifficulty}]`, LogTextColor_1.LogTextColor.BLUE);
                this.logger.log(`Current Escort type is [${escortType}]`, LogTextColor_1.LogTextColor.BLUE);
                this.logger.log(`Current number of Escorts is [${escortAmount}]`, LogTextColor_1.LogTextColor.BLUE);
            }
            let bossLegionSpawn = {
                BossChance: bossLegionChance,
                BossDifficult: bossDifficulty,
                BossEscortAmount: escortAmount,
                BossEscortDifficult: escortDifficulty,
                BossEscortType: escortType,
                BossName: "bosslegion",
                BossPlayer: false,
                BossZone: "?",
                RandomTimeSpawn: false,
                Time: -1,
                TriggerId: "",
                TriggerName: "",
                spawnMode: ["regular", "pve"],
            };
            for (const location of Object.values(tables.locations)) {
                if (location.base) {
                    const zonesString = location.base.Id === "factory4_night"
                        ? tables.locations.factory4_day.base.OpenZones
                        : location.base.OpenZones;
                    if (!zonesString) {
                        continue;
                    }
                    const foundOpenZones = zonesString
                        .split(",")
                        .map((zone) => zone.trim())
                        .filter((zone) => zone && !zone.includes("Snipe"));
                    if (foundOpenZones.length === 0) {
                        continue;
                    }
                    const randomIndex = Math.floor(Math.random() * foundOpenZones.length);
                    const randomZone = foundOpenZones[randomIndex];
                    bossLegionSpawn = {
                        ...bossLegionSpawn,
                        BossZone: randomZone,
                    };
                    location.base.BossLocationSpawn.push(bossLegionSpawn);
                }
            }
        }
        else {
            this.logger.logWarning("No progress file exists for this profile, this is normal. Creating...");
            this.createLegionProgressFile();
            this.logger.log(`Progression file for ${LegionController_1.profileId} created.`, LogTextColor_1.LogTextColor.MAGENTA);
        }
    }
    removeBossSpawns() {
        const removedLocations = [];
        const tables = this.databaseService.getTables();
        for (const location of Object.values(tables.locations)) {
            if (location.base) {
                const removedSpawns = location.base.BossLocationSpawn.filter((spawn) => spawn.BossName === "bosslegion");
                location.base.BossLocationSpawn = location.base.BossLocationSpawn.filter((spawn) => spawn.BossName !== "bosslegion");
                if (removedSpawns.length > 0) {
                    removedLocations.push({
                        map: location.base.Id,
                        zones: removedSpawns.map((spawn) => spawn.BossZone),
                    });
                }
            }
        }
    }
    swagPatch() {
        let bossLegionChance = 15;
        const legionSpawnPath = `${LegionController_1.modLoc}/config/profiles/${LegionController_1.profileId}/LegionChance.json`;
        const spawnChance = JSON.parse(fs.readFileSync(legionSpawnPath, "utf8"));
        bossLegionChance = spawnChance?.legionChance ?? 15;
        try {
            const swagBossConfigPath = path.join(__dirname, "../../../SWAG/config/bossConfig.json");
            const swagLegionPath = path.join(__dirname, "../../../SWAG/config/custom/legion.json");
            const swagBossConfig = JSON.parse(fs.readFileSync(swagBossConfigPath, "utf-8"));
            const swagLegionConfig = JSON.parse(fs.readFileSync(swagLegionPath, "utf-8"));
            if (!swagBossConfig.CustomBosses.legion.enabled) {
                swagBossConfig.CustomBosses.legion.enabled = true;
            }
            if (swagBossConfig.CustomBosses.legion.useProgressSpawnChance) {
                swagBossConfig.CustomBosses.legion.useProgressSpawnChance = false;
                swagBossConfig.CustomBosses.legion.customs = bossLegionChance;
                swagBossConfig.CustomBosses.legion.factory = bossLegionChance;
                swagBossConfig.CustomBosses.legion.factory_night = bossLegionChance;
                swagBossConfig.CustomBosses.legion.groundzero = bossLegionChance;
                swagBossConfig.CustomBosses.legion.groundzero_high = bossLegionChance;
                swagBossConfig.CustomBosses.legion.interchange = bossLegionChance;
                swagBossConfig.CustomBosses.legion.laboratory = bossLegionChance;
                swagBossConfig.CustomBosses.legion.lighthouse = bossLegionChance;
                swagBossConfig.CustomBosses.legion.reserve = bossLegionChance;
                swagBossConfig.CustomBosses.legion.shoreline = bossLegionChance;
                swagBossConfig.CustomBosses.legion.streets = bossLegionChance;
                swagBossConfig.CustomBosses.legion.woods = bossLegionChance;
                swagLegionConfig.customs[0].BossChance = bossLegionChance;
                swagLegionConfig.factory[0].BossChance = bossLegionChance;
                swagLegionConfig.factory_night[0].BossChance = bossLegionChance;
                swagLegionConfig.groundzero[0].BossChance = bossLegionChance;
                swagLegionConfig.groundzero_high[0].BossChance = bossLegionChance;
                swagLegionConfig.interchange[0].BossChance = bossLegionChance;
                swagLegionConfig.laboratory[0].BossChance = bossLegionChance;
                swagLegionConfig.lighthouse[0].BossChance = bossLegionChance;
                swagLegionConfig.reserve[0].BossChance = bossLegionChance;
                swagLegionConfig.shoreline[0].BossChance = bossLegionChance;
                swagLegionConfig.streets[0].BossChance = bossLegionChance;
                swagLegionConfig.woods[0].BossChance = bossLegionChance;
            }
            else {
                swagBossConfig.CustomBosses.legion.customs = bossLegionChance;
                swagBossConfig.CustomBosses.legion.factory = bossLegionChance;
                swagBossConfig.CustomBosses.legion.factory_night = bossLegionChance;
                swagBossConfig.CustomBosses.legion.groundzero = bossLegionChance;
                swagBossConfig.CustomBosses.legion.groundzero_high = bossLegionChance;
                swagBossConfig.CustomBosses.legion.interchange = bossLegionChance;
                swagBossConfig.CustomBosses.legion.laboratory = bossLegionChance;
                swagBossConfig.CustomBosses.legion.lighthouse = bossLegionChance;
                swagBossConfig.CustomBosses.legion.reserve = bossLegionChance;
                swagBossConfig.CustomBosses.legion.shoreline = bossLegionChance;
                swagBossConfig.CustomBosses.legion.streets = bossLegionChance;
                swagBossConfig.CustomBosses.legion.woods = bossLegionChance;
                swagLegionConfig.customs[0].BossChance = bossLegionChance;
                swagLegionConfig.factory[0].BossChance = bossLegionChance;
                swagLegionConfig.factory_night[0].BossChance = bossLegionChance;
                swagLegionConfig.groundzero[0].BossChance = bossLegionChance;
                swagLegionConfig.groundzero_high[0].BossChance = bossLegionChance;
                swagLegionConfig.interchange[0].BossChance = bossLegionChance;
                swagLegionConfig.laboratory[0].BossChance = bossLegionChance;
                swagLegionConfig.lighthouse[0].BossChance = bossLegionChance;
                swagLegionConfig.reserve[0].BossChance = bossLegionChance;
                swagLegionConfig.shoreline[0].BossChance = bossLegionChance;
                swagLegionConfig.streets[0].BossChance = bossLegionChance;
                swagLegionConfig.woods[0].BossChance = bossLegionChance;
            }
            swagBossConfig;
            fs.writeFileSync(swagBossConfigPath, JSON.stringify(swagBossConfig, null, 2), "utf-8");
            fs.writeFileSync(swagLegionPath, JSON.stringify(swagLegionConfig, null, 2), "utf-8");
        }
        catch (error) {
            this.logger.logError(`Error adding Legion to SWAG: ${error}`);
        }
    }
    modifySpawnChance(info, output) {
        let bossLegionChance = 15;
        const legionSpawnPath = `${LegionController_1.modLoc}/config/profiles/${LegionController_1.profileId}/LegionChance.json`;
        const spawnChance = JSON.parse(fs.readFileSync(legionSpawnPath, "utf8"));
        const pmcData = info.results.profile;
        const victimRoles = pmcData.Stats.Eft.Victims?.map((victim) => victim.Role.toLowerCase());
        bossLegionChance = spawnChance?.legionChance ?? 15;
        if (victimRoles?.includes("bosslegion")) {
            bossLegionChance = 10;
            this.logger.log("Legion eliminated", LogTextColor_1.LogTextColor.MAGENTA);
        }
        if (info.results.result === "Survived") {
            bossLegionChance += 1.5;
            if (this.configManager.debugConfig().debugMode) {
                this.logger.log("Survived raid. Increasing Legion chance by 1.5", LogTextColor_1.LogTextColor.CYAN);
            }
        }
        if (info.results.result === "Runner") {
            bossLegionChance += 3;
            if (this.configManager.debugConfig().debugMode) {
                this.logger.log("Left raid early. Increasing Legion chance by 3", LogTextColor_1.LogTextColor.CYAN);
            }
        }
        if (info.results.result === "Left") {
            bossLegionChance += 0.5;
            if (this.configManager.debugConfig().debugMode) {
                this.logger.log("Left raid. Increasing Legion chance by 0.5", LogTextColor_1.LogTextColor.CYAN);
            }
        }
        if (info.results.result === "Killed") {
            bossLegionChance += 1;
            if (this.configManager.debugConfig().debugMode) {
                this.logger.log("Died in raid. Increasing Legion chance by 1", LogTextColor_1.LogTextColor.CYAN);
            }
        }
        if (bossLegionChance > 100) {
            bossLegionChance = 100;
        }
        if (bossLegionChance < 1) {
            bossLegionChance = 1;
        }
        spawnChance.legionChance = bossLegionChance;
        try {
            fs.writeFileSync(legionSpawnPath, JSON.stringify(spawnChance, null, 4), "utf-8");
        }
        catch (error) {
            this.logger.logError(`Error writing Legion progress file: ${error}`);
        }
        return output;
    }
    moarLocationDataPatch() {
        let bossLegionChance = 15;
        const tables = this.databaseService.getTables();
        const escortAmount = this.randomUtil.randInt(1, 4).toString();
        const bossDifficulty = "normal";
        const escortDifficulty = "normal";
        const escortType = this.utils.drawRandom(botSettings.followers);
        const legionSpawnPath = `${LegionController_1.modLoc}/config/profiles/${LegionController_1.profileId}/LegionChance.json`;
        if (fs.existsSync(legionSpawnPath)) {
            try {
                const spawnChance = JSON.parse(fs.readFileSync(legionSpawnPath, "utf8"));
                bossLegionChance = spawnChance?.legionChance ?? 15;
            }
            catch (error) {
                console.log("Can't find Legion spawn chance file. Make sure you have it in your config folder.");
            }
        }
        const bossLegionSpawn = {
            BossChance: bossLegionChance,
            BossDifficult: bossDifficulty,
            BossEscortAmount: escortAmount,
            BossEscortDifficult: escortDifficulty,
            BossEscortType: escortType,
            BossName: "bosslegion",
            BossPlayer: false,
            BossZone: "",
            RandomTimeSpawn: false,
            Time: -1,
            TriggerId: "",
            TriggerName: "",
            spawnMode: ["regular", "pve"],
        };
        for (const location of Object.values(tables.locations)) {
            if (location.base) {
                location.base.BossLocationSpawn.push(bossLegionSpawn);
            }
        }
    }
    legionPreSptPatch() {
        this.staticRouter.registerStaticRouter(`${this.routerPrefix}-ProfileSelected`, [
            {
                url: "/client/game/profile/select",
                action: async (url, info, sessionId, output) => {
                    LegionController_1.profileId = info.uid;
                    if (this.configManager.modConfig().EnableCustomBoss) {
                        const legionSpawnPath = `${LegionController_1.modLoc}/config/profiles/${LegionController_1.profileId}/LegionChance.json`;
                        if (!fs.existsSync(legionSpawnPath)) {
                            this.logger.logWarning("No Legion progress file exists for this profile, this is normal. Creating...");
                            this.createLegionProgressFile();
                            this.logger.log(`Legion progression file for ${LegionController_1.profileId} created.`, LogTextColor_1.LogTextColor.MAGENTA);
                        }
                        if (!LegionController_1.setupRan) {
                            const profileLevel = this.utils.checkProfileLevel(LegionController_1.profileId);
                            if (profileLevel != null && profileLevel < 10) {
                                this.logger.log(`Profile is under minimum spawn level for Legion, setting spawn chance to 0. \nHe'll be on the hunt after level 10`, LogTextColor_1.LogTextColor.MAGENTA);
                                LegionController_1.legionFileChance = 0;
                                const spawnChance = JSON.parse(fs.readFileSync(legionSpawnPath, "utf8"));
                                spawnChance.legionChance = LegionController_1.legionFileChance;
                                fs.writeFileSync(legionSpawnPath, JSON.stringify(spawnChance, null, 2), "utf-8");
                                this.pushLocationData();
                            }
                            else {
                                this.pushLocationData();
                            }
                            LegionController_1.setupRan = true;
                        }
                    }
                    return Promise.resolve(output);
                },
            },
        ], "spt");
        //Modify trader rep and legion chance post raid
        this.staticRouter.registerStaticRouter(`${this.routerPrefix}-RaidSaved`, [
            {
                url: "/client/match/local/end",
                action: async (url, info, sessionId, output) => {
                    if (this.configManager.debugConfig().debugMode && this.configManager.debugConfig().dumpData) {
                        this.createEndpointDataFile(info);
                    }
                    const pmcProfileExists = this.utils.checkProfileExists(LegionController_1.profileId);
                    if (!pmcProfileExists) {
                        if (this.configManager.debugConfig().debugMode) {
                            this.logger.logWarning("No profile detected. Not pushing Legion to maps");
                        }
                        this.removeBossSpawns();
                        return Promise.resolve(output);
                    }
                    const profileLevel = this.utils.checkProfileLevel(LegionController_1.profileId);
                    if (profileLevel != null && profileLevel < 10) {
                        this.traderController.traderRepLogic(info, sessionId);
                        if (this.configManager.modConfig().EnableCustomBoss) {
                            this.traderController.legionRepLogic(info, sessionId);
                            this.logger.log(`Profile is under minimum spawn level for Legion, setting spawn chance to 0. \nHe'll be on the hunt after hitting level 10`, LogTextColor_1.LogTextColor.MAGENTA);
                        }
                        else {
                            this.traderController.noBossRepLogic(info, sessionId);
                        }
                        LegionController_1.legionFileChance = 0;
                        const legionSpawnPath = `${LegionController_1.modLoc}/config/profiles/${LegionController_1.profileId}/LegionChance.json`;
                        const spawnChance = JSON.parse(fs.readFileSync(legionSpawnPath, "utf8"));
                        spawnChance.legionChance = LegionController_1.legionFileChance;
                        fs.writeFileSync(legionSpawnPath, JSON.stringify(spawnChance, null, 2), "utf-8");
                    }
                    else {
                        this.traderController.traderRepLogic(info, sessionId);
                        if (this.configManager.modConfig().EnableCustomBoss) {
                            this.traderController.legionRepLogic(info, sessionId);
                            this.modifySpawnChance(info, output);
                            this.pushLocationData();
                        }
                        if (!this.configManager.modConfig().EnableCustomBoss) {
                            this.traderController.noBossRepLogic(info, sessionId);
                        }
                    }
                    return Promise.resolve(output);
                },
            },
        ], "spt");
    }
    pushLocationData() {
        const swagKey = "SWAG";
        const moarKey = "DewardianDev-MOAR";
        if (this.utils.checkForMod(swagKey)) {
            this.swagPatch();
        }
        else if (this.utils.checkForMod(moarKey)) {
            this.moarLocationDataPatch();
        }
        else {
            this.removeBossSpawns();
            this.loadBossLocationData();
        }
    }
    removeLegionPatch() {
        const swagFolder = path.join(__dirname, "../../../SWAG");
        if (fs.existsSync(swagFolder)) {
            const swagBossConfigPath = path.join(__dirname, "../../../SWAG/config/bossConfig.json");
            const swagBossConfig = JSON.parse(fs.readFileSync(swagBossConfigPath, "utf-8"));
            swagBossConfig.CustomBosses.legion.enabled = false;
            fs.writeFileSync(swagBossConfigPath, JSON.stringify(swagBossConfig, null, 2), "utf-8");
        }
        else {
            this.logger.logDebug("SWAG not detected. Skipping RemoveLegionPatch.");
        }
    }
    createLegionProgressFile() {
        const legionProgressActual = this.configManager.debugConfig().baseLegionChance;
        const progressFileLegion = (LegionController_1.progressFile = {
            legionChance: legionProgressActual,
        });
        const progressLocFolder = `${LegionController_1.modLoc}/config/profiles/${LegionController_1.profileId}`;
        const progressLoc = `${progressLocFolder}/LegionChance.json`;
        if (!fs.existsSync(progressLocFolder)) {
            fs.mkdirSync(progressLocFolder, { recursive: true });
        }
        try {
            fs.writeFileSync(progressLoc, JSON.stringify(progressFileLegion, null, 4));
        }
        catch (error) {
            this.logger.logError(`Error writing Legion progress file: ${error}`);
        }
    }
    createEndpointDataFile(data) {
        const dataLocFolder = `${LegionController_1.modLoc}/ROData/Endpoints`;
        const dataLoc = `${dataLocFolder}/endpointData.json`;
        if (!fs.existsSync(dataLocFolder)) {
            fs.mkdirSync(dataLocFolder, { recursive: true });
        }
        try {
            fs.writeFileSync(dataLoc, JSON.stringify(data, null, 4));
        }
        catch (error) {
            this.logger.logError(`Error writing endpoint data file: ${error}`);
        }
    }
};
exports.LegionController = LegionController;
exports.LegionController = LegionController = LegionController_1 = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("Utils")),
    __param(1, (0, tsyringe_1.inject)("ROLogger")),
    __param(2, (0, tsyringe_1.inject)("ConfigManager")),
    __param(3, (0, tsyringe_1.inject)("ReqsController")),
    __param(4, (0, tsyringe_1.inject)("StaticRouterModService")),
    __param(5, (0, tsyringe_1.inject)("JsonUtil")),
    __param(6, (0, tsyringe_1.inject)("RandomUtil")),
    __param(7, (0, tsyringe_1.inject)("ConfigServer")),
    __param(8, (0, tsyringe_1.inject)("DatabaseService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object])
], LegionController);
//# sourceMappingURL=LegionController.js.map