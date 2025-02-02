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
exports.TraderManager = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
//Json Imports
const baseJson2 = __importStar(require("../../db/baseNoBoss.json"));
const baseJson = __importStar(require("../../db/base.json"));
let TraderManager = class TraderManager {
    utils;
    traderUtils;
    configManager;
    reqsController;
    constructor(utils, traderUtils, configManager, reqsController) {
        this.utils = utils;
        this.traderUtils = traderUtils;
        this.configManager = configManager;
        this.reqsController = reqsController;
    }
    pushExports() {
        //Add Req Shop to the game
        this.traderUtils.pushTrader(baseJson);
        //Add Req Shop to Locales
        this.traderUtils.addTraderToLocales("Requisitions Office", "A collection of Ex-PMC's and rogue Scavs who formed a group to aid others in Tarkov. They routinely scour the battlefield for any leftover supplies and aren't afraid to fight their old comrades for it. They may not be the most trustworthy but they do have some much needed provisions in stock.", baseJson);
        //Add custom quests
        this.utils.addQuests();
    }
    pushExports2() {
        //Add Req Shop to the game
        this.traderUtils.pushTrader(baseJson2);
        //Add Req Shop to Locales
        this.traderUtils.addTraderToLocales("Requisitions Office", "A collection of Ex-PMC's and rogue Scavs who formed a group to aid others in Tarkov. They routinely scour the battlefield for any leftover supplies and aren't afraid to fight their old comrades for it. They may not be the most trustworthy but they do have some much needed provisions in stock.", baseJson2);
        //Add custom quests
        this.utils.addQuests2();
    }
    buildReqAssort() {
        //Push each type of item to the assort
        this.reqsController.createWeaponFluidAssort();
        this.reqsController.createItemsFluidAssort();
        this.reqsController.createPlateFluidAssort();
        this.reqsController.createGearFluidAssort();
        this.reqsController.createMedsFluidAssort();
        this.reqsController.createSpecFluidAssort();
        this.reqsController.createModsFluidAssort();
        this.reqsController.createAmmoFluidAssort();
        this.reqsController.addContainers();
        this.reqsController.addReqSlips();
        this.reqsController.addReqForms();
        this.reqsController.addWeaponPresets();
        this.reqsController.addGearPresets();
        //this.reqsController.addFlares();
        this.reqsController.addNewKeys();
        //Push custom items to the assort if they're enabled
        if (this.configManager.modConfig().EnableCustomItems) {
            this.reqsController.addCustomPresets();
            this.reqsController.addStaticItems();
            this.reqsController.addAmmo();
        }
    }
};
exports.TraderManager = TraderManager;
exports.TraderManager = TraderManager = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("Utils")),
    __param(1, (0, tsyringe_1.inject)("TraderUtils")),
    __param(2, (0, tsyringe_1.inject)("ConfigManager")),
    __param(3, (0, tsyringe_1.inject)("ReqsController")),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], TraderManager);
//# sourceMappingURL=TraderManager.js.map