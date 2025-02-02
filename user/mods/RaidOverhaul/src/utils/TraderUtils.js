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
exports.TraderUtils = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
//Json Imports
const dialogue = require("../../db/dialogue.json");
const services = require("../../db/services.json");
const baseJson = __importStar(require("../../db/base.json"));
let TraderUtils = class TraderUtils {
    jsonUtil;
    databaseService;
    imageRouter;
    configServer;
    preSptModLoader;
    constructor(jsonUtil, databaseService, imageRouter, configServer, preSptModLoader) {
        this.jsonUtil = jsonUtil;
        this.databaseService = databaseService;
        this.imageRouter = imageRouter;
        this.configServer = configServer;
        this.preSptModLoader = preSptModLoader;
    }
    addTraderToDb(traderDetailsToAdd, dialogueToAdd, servicesToAdd) {
        const tables = this.databaseService.getTables();
        tables.traders[traderDetailsToAdd._id] = {
            assort: this.createAssortTable(),
            base: this.jsonUtil.deserialize(this.jsonUtil.serialize(traderDetailsToAdd)),
            dialogue: this.jsonUtil.deserialize(this.jsonUtil.serialize(dialogueToAdd)),
            services: this.jsonUtil.deserialize(this.jsonUtil.serialize(servicesToAdd)),
            questassort: {
                started: {},
                success: {},
                fail: {},
            },
        };
    }
    createAssortTable() {
        const assortTable = {
            nextResupply: 0,
            items: [],
            barter_scheme: {},
            loyal_level_items: {},
        };
        return assortTable;
    }
    registerProfileImage() {
        const imageFilepath = `./${this.preSptModLoader.getModPath("RaidOverhaul")}res`;
        this.imageRouter.addRoute(baseJson.avatar.replace(".jpg", ""), `${imageFilepath}/Reqs.jpg`);
    }
    setupTraderUpdateTime(traderIdToUse) {
        const traderConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const traderRefreshRecord = {
            traderId: traderIdToUse,
            seconds: {
                min: 3600,
                max: 7200,
            },
        };
        traderConfig.updateTime.push(traderRefreshRecord);
    }
    pushTrader(baseToAdd) {
        this.addTraderToDb(baseToAdd, dialogue, services);
    }
    addTraderToLocales(firstName, description, baseJsonData) {
        const tables = this.databaseService.getTables();
        const locales = Object.values(tables.locales.global);
        for (const locale of locales) {
            locale[`${baseJsonData._id} FullName`] = baseJsonData.name;
            locale[`${baseJsonData._id} FirstName`] = firstName;
            locale[`${baseJsonData._id} Nickname`] = baseJsonData.nickname;
            locale[`${baseJsonData._id} Location`] = baseJsonData.location;
            locale[`${baseJsonData._id} Description`] = description;
        }
    }
};
exports.TraderUtils = TraderUtils;
exports.TraderUtils = TraderUtils = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("JsonUtil")),
    __param(1, (0, tsyringe_1.inject)("DatabaseService")),
    __param(2, (0, tsyringe_1.inject)("ImageRouter")),
    __param(3, (0, tsyringe_1.inject)("ConfigServer")),
    __param(4, (0, tsyringe_1.inject)("PreSptModLoader")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], TraderUtils);
//# sourceMappingURL=TraderUtils.js.map