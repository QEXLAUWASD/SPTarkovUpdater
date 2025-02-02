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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqsController = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const Enums_1 = require("../models/Enums");
//Json Imports
const customPresetArray = require("../utils/data/customPresets.json");
const items = require("../utils/data/shopArrays.json");
let ReqsController = class ReqsController {
    utils;
    logger;
    assortUtils;
    configManager;
    randomUtil;
    traderHelper;
    probHelper;
    databaseService;
    constructor(utils, logger, assortUtils, configManager, randomUtil, traderHelper, probHelper, databaseService) {
        this.utils = utils;
        this.logger = logger;
        this.assortUtils = assortUtils;
        this.configManager = configManager;
        this.randomUtil = randomUtil;
        this.traderHelper = traderHelper;
        this.probHelper = probHelper;
        this.databaseService = databaseService;
    }
    //#region Plates
    createPlateFluidAssort() {
        let count = 0;
        for (const item of items.plates) {
            if (this.probHelper.rollChance(13, 100)) {
                this.assortUtils.buildBaseAssort(item, this.utils.genRandomCount(0, 10), this.utils.genRandomCount(1, 4));
                count++;
            }
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`${count} total plates have been added`, LogTextColor_1.LogTextColor.GREEN);
        }
    }
    //#endregion
    //
    //
    //
    //#region Meds
    createMedsFluidAssort() {
        let count = 0;
        for (const item of items.meds) {
            if (this.probHelper.rollChance(20, 100)) {
                this.assortUtils.buildBaseAssort(item, this.utils.genRandomCount(0, 10), this.utils.genRandomCount(1, 4));
                count++;
            }
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`${count} total meds have been added`, LogTextColor_1.LogTextColor.GREEN);
        }
    }
    //#endregion
    //
    //
    //
    //#region Gear
    createGearFluidAssort() {
        let count = 0;
        for (const item of items.gear) {
            if (this.probHelper.rollChance(10, 100)) {
                this.assortUtils.buildBaseAssort(item, this.utils.genRandomCount(0, 10), this.utils.genRandomCount(1, 4));
                count++;
            }
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`${count} total pieces of gear have been added`, LogTextColor_1.LogTextColor.GREEN);
        }
    }
    //#endregion
    //
    //
    //
    //#region Mods
    createModsFluidAssort() {
        let count = 0;
        for (const item of items.mods) {
            if (this.probHelper.rollChance(5, 100)) {
                this.assortUtils.buildBaseAssort(item, this.utils.genRandomCount(0, 10), this.utils.genRandomCount(1, 4));
                count++;
            }
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`${count} total weapon mods have been added`, LogTextColor_1.LogTextColor.GREEN);
        }
    }
    //#endregion
    //
    //
    //
    //#region Ammo
    createAmmoFluidAssort() {
        let count = 0;
        for (const item of items.ammo) {
            if (this.probHelper.rollChance(9, 100)) {
                this.assortUtils.createSingleItemOffer(item, this.utils.genRandomCount(50, 300), this.utils.genRandomCount(1, 4), this.utils.getFormCost(item), Enums_1.Currency.ReqForms);
                count++;
            }
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`${count} total types of ammo have been added`, LogTextColor_1.LogTextColor.GREEN);
        }
    }
    //#endregion
    //
    //
    //
    //#region Items
    createItemsFluidAssort() {
        let count = 0;
        for (const item of items.items) {
            if (this.probHelper.rollChance(11, 100)) {
                this.assortUtils.buildBaseAssort(item, this.utils.genRandomCount(0, 10), this.utils.genRandomCount(1, 4));
                count++;
            }
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`${count} total items have been added`, LogTextColor_1.LogTextColor.GREEN);
        }
    }
    //#endregion
    //
    //
    //
    //#region Weapon Bases
    createWeaponFluidAssort() {
        let count = 0;
        for (const item of items.weaponBase) {
            if (this.probHelper.rollChance(7, 100)) {
                this.assortUtils.buildBaseAssort(item, this.utils.genRandomCount(0, 10), this.utils.genRandomCount(1, 4));
                count++;
            }
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`${count} total weapons have been added`, LogTextColor_1.LogTextColor.GREEN);
        }
    }
    //#endregion
    //
    //
    //
    //#region Special Items
    createSpecFluidAssort() {
        let count = 0;
        for (const item of items.special) {
            if (this.probHelper.rollChance(8, 100)) {
                count++;
                try {
                    this.assortUtils.createSingleItemOffer(item, this.utils.genRandomCount(0, 1), this.utils.genRandomCount(1, 4), this.utils.getReqCost(item), Enums_1.Currency.ReqSlips);
                }
                catch (error) {
                    this.logger.logError(`Error loading Special Items from Fluid Assort Trader Generator: ${error}`);
                }
            }
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`${count} total special items have been added`, LogTextColor_1.LogTextColor.GREEN);
        }
    }
    //#endregion
    //
    //
    //
    //#region Static Items
    addStaticItems() {
        let count = 0;
        for (const item of items.staticItems) {
            if (this.probHelper.rollChance(13, 100)) {
                this.assortUtils.createSingleItemOffer(item, this.utils.genRandomCount(0, 7), this.utils.genRandomCount(1, 4), this.utils.getReqCost(item), Enums_1.Currency.ReqSlips);
                count++;
            }
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`${count} total static items have been added`, LogTextColor_1.LogTextColor.GREEN);
        }
    }
    //#endregion
    //
    //
    //
    //#region Req Slips
    addReqSlips() {
        const formCost = Math.round(53999 / 175);
        this.assortUtils.createSingleItemOffer(Enums_1.Currency.ReqSlips, this.utils.genRandomCount(1, 20), 1, this.utils.genRandomCount(formCost * 0.75, formCost * 1.25), Enums_1.Currency.ReqForms);
        this.assortUtils.createSingleItemOffer(Enums_1.Currency.ReqSlips, this.utils.genRandomCount(1, 20), 1, this.utils.genRandomCount(1, 5), Enums_1.Currency.GPCoins);
    }
    //#endregion
    //
    //
    //
    //#region Req Forms
    addReqForms() {
        this.assortUtils.createSingleItemOffer(Enums_1.Currency.ReqForms, this.utils.genRandomCount(100, 7000), 1, this.utils.genRandomCount(175 * 0.75, 175 * 1.25), Enums_1.Currency.Roubles);
    }
    //#endregion
    //
    //
    //
    //#region Custom Keys
    addNewKeys() {
        if (this.probHelper.rollChance(5, 100)) {
            this.assortUtils.createSingleItemOffer("66a2fc926af26cc365283f23", 1, 1, 999, Enums_1.Currency.ReqSlips);
        }
        if (this.probHelper.rollChance(5, 100)) {
            this.assortUtils.createSingleItemOffer("66a2fc9886fbd5d38c5ca2a6", 1, 1, 999, Enums_1.Currency.ReqSlips);
        }
    }
    //#endregion
    //
    //
    //
    //#region Flares
    /*
    public addFlares(): void {
        this.assortUtils.createSingleItemOffer(
        AllItemList.GRENADELAUNCHER_FLARE,
        this.utils.genRandomCount(1, 3),
        1,
        this.utils.genRandomCount(2, 6),
        );
    }
*/
    //#endregion
    //
    //
    //
    //#region Containers
    addContainers() {
        this.assortUtils.createSingleItemOffer("666361eff60f4ea5a464eb70", 1, 4, 200, Enums_1.Currency.ReqSlips);
        this.assortUtils.createSingleItemOffer("664a55d84a90fc2c8a6305c9", 1, 1, 50, Enums_1.Currency.ReqSlips);
        this.assortUtils.createSingleItemOffer("6722254fd847a7aafccfbb54", 1, 1, 5, Enums_1.Currency.ReqSlips);
        this.assortUtils.createSingleItemOffer("67222453e6aee984bcfcf9d1", 1, 2, 10, Enums_1.Currency.ReqSlips);
        this.assortUtils.createSingleItemOffer("6722252e82ca09a7e62c4d84", 1, 3, 20, Enums_1.Currency.ReqSlips);
    }
    //#endregion
    //
    //
    //
    //#region Custom Ammo
    addAmmo() {
        this.assortUtils.createSingleItemOffer("66280a30d3b6f288cb6b9653", this.randomUtil.randInt(50, 300), 1, this.utils.getFormCost("66280a30d3b6f288cb6b9653"), Enums_1.Currency.ReqForms);
        this.assortUtils.createSingleItemOffer("662809f445b5ff428e21ac0a", this.randomUtil.randInt(50, 300), 1, this.utils.getFormCost("662809f445b5ff428e21ac0a"), Enums_1.Currency.ReqForms);
        this.assortUtils.createSingleItemOffer("662808ec26a8e83120bb25fe", this.randomUtil.randInt(50, 300), 1, this.utils.getFormCost("662808ec26a8e83120bb25fe"), Enums_1.Currency.ReqForms);
        this.assortUtils.createSingleItemOffer("6628185208dd86f969db7e03", this.randomUtil.randInt(50, 300), 1, this.utils.getFormCost("6628185208dd86f969db7e03"), Enums_1.Currency.ReqForms);
        this.assortUtils.createSingleItemOffer("662818a23a552da6aef8fada", this.randomUtil.randInt(50, 300), 1, this.utils.getFormCost("662818a23a552da6aef8fada"), Enums_1.Currency.ReqForms);
        this.assortUtils.createSingleItemOffer("66281ab7fca966e5021f81b5", this.randomUtil.randInt(10, 50), 1, this.utils.getFormCost("66281ab7fca966e5021f81b5"), Enums_1.Currency.ReqForms);
        this.assortUtils.createSingleItemOffer("66281ac038f9aebf6f914138", this.randomUtil.randInt(5, 30), 1, this.utils.getFormCost("66281ac038f9aebf6f914138"), Enums_1.Currency.ReqForms);
    }
    //#endregion
    //
    //
    //
    //#region Weapon Presets
    addWeaponPresets() {
        let count = 0;
        const tables = this.databaseService.getTables();
        const globalsPresets = tables.globals.ItemPresets;
        for (const key of items.weaponPresetKeys) {
            if (this.probHelper.rollChance(6, 100)) {
                try {
                    this.assortUtils.buildPresetAssort(globalsPresets[key]._items, this.utils.genRandomCount(1, 3), this.utils.genRandomCount(1, 4), globalsPresets[key]._name);
                    if (this.configManager.debugConfig().debugMode) {
                        this.logger.log(`${globalsPresets[key]._name} has been added to the Req Shop`, LogTextColor_1.LogTextColor.GREEN);
                    }
                    count++;
                }
                catch (error) {
                    this.logger.log(`Error loading weapon preset => ${error}, skipping.`, LogTextColor_1.LogTextColor.RED);
                }
            }
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`${count} total weapon presets have been added`, LogTextColor_1.LogTextColor.GREEN);
        }
    }
    //#endregion
    //
    //
    //
    //#region Gear Presets
    addGearPresets() {
        let count = 0;
        const tables = this.databaseService.getTables();
        const globalsPresets = tables.globals.ItemPresets;
        for (const key of items.gearPresetKeys) {
            if (this.probHelper.rollChance(9, 100)) {
                try {
                    this.assortUtils.buildPresetAssort(globalsPresets[key]._items, this.utils.genRandomCount(1, 3), this.utils.genRandomCount(1, 4), globalsPresets[key]._name);
                    if (this.configManager.debugConfig().debugMode) {
                        this.logger.log(`${globalsPresets[key]._name} has been added to the Req Shop`, LogTextColor_1.LogTextColor.GREEN);
                    }
                    count++;
                }
                catch (error) {
                    this.logger.log(`Error loading gear preset => ${error}, skipping.`, LogTextColor_1.LogTextColor.RED);
                }
            }
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`${count} total gear presets have been added`, LogTextColor_1.LogTextColor.GREEN);
        }
    }
    //#endregion
    //
    //
    //
    //#region Custom Presets
    addCustomPresets() {
        let count = 0;
        for (const key of items.customPresetKeys) {
            if (this.probHelper.rollChance(13, 100)) {
                try {
                    this.assortUtils.buildPresetAssort(customPresetArray[key]._items, this.utils.genRandomCount(1, 3), this.utils.genRandomCount(1, 4), customPresetArray[key]._name);
                    if (this.configManager.debugConfig().debugMode) {
                        this.logger.log(`${customPresetArray[key]._name} has been added to the Req Shop`, LogTextColor_1.LogTextColor.GREEN);
                    }
                    count++;
                }
                catch (error) {
                    this.logger.log(`Error loading custom preset => ${error}, skipping.`, LogTextColor_1.LogTextColor.RED);
                }
            }
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log(`${count} total custom presets have been added`, LogTextColor_1.LogTextColor.GREEN);
        }
    }
    //#endregion
    //
    //
    //
    //#region Reputation Change Logic
    traderRepLogic(info, sessionId) {
        try {
            if (info.results.result === "Left") {
                return;
            }
            else if (info.results.result === "Killed") {
                return;
            }
            else if (info.results.result === "Runner") {
                return;
            }
            else if (info.results.result === "Survived") {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.03);
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Raid survived. Increasing Req Shop Rep by 0.03", LogTextColor_1.LogTextColor.CYAN);
                }
                return;
            }
        }
        catch (error) {
            this.logger.logError(`Error modifying Trader Rep on Successful Raid Exfil: ${error}`);
        }
    }
    legionRepLogic(info, sessionId) {
        try {
            const pmcData = info.results.profile;
            const victimRole = pmcData.Stats.Eft.Victims?.map((victim) => victim.Role.toLowerCase());
            if (victimRole?.includes("bosslegion")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bossboar")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bossbully")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bossgluhar")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bosskilla")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bossknight")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bosskojaniy")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bosskolontay")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bosssanitar")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bosstagilla")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bosszryachiy")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("followerbigpipe")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("followerbirdeye")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else {
                return;
            }
        }
        catch (error) {
            this.logger.logError(`Error modifying Trader Rep on killing Legion: ${error}`);
        }
    }
    noBossRepLogic(info, sessionId) {
        try {
            const pmcData = info.results.profile;
            const victimRole = pmcData.Stats.Eft.Victims?.map((victim) => victim.Role.toLowerCase());
            if (victimRole?.includes("bossboar")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bossbully")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bossgluhar")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bosskilla")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bossknight")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bosskojaniy")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bosskolontay")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bosssanitar")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bosstagilla")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("bosszryachiy")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("followerbigpipe")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else if (victimRole?.includes("followerbirdeye")) {
                this.traderHelper.addStandingToTrader(sessionId, "66f0eaa93f6cc015bc1f3acb", 0.15);
                return;
            }
            else {
                return;
            }
        }
        catch (error) {
            this.logger.logError(`Error modifying Trader Rep on killing Legion: ${error}`);
        }
    }
};
exports.ReqsController = ReqsController;
exports.ReqsController = ReqsController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("Utils")),
    __param(1, (0, tsyringe_1.inject)("ROLogger")),
    __param(2, (0, tsyringe_1.inject)("AssortUtils")),
    __param(3, (0, tsyringe_1.inject)("ConfigManager")),
    __param(4, (0, tsyringe_1.inject)("RandomUtil")),
    __param(5, (0, tsyringe_1.inject)("TraderHelper")),
    __param(6, (0, tsyringe_1.inject)("ProbabilityHelper")),
    __param(7, (0, tsyringe_1.inject)("DatabaseService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object])
], ReqsController);
//# sourceMappingURL=ReqsController.js.map