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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const References_1 = require("./Refs/References");
const Utils_1 = require("./Refs/Utils");
const SariaShop_1 = require("./Trader/SariaShop");
const baseJson = __importStar(require("../db/base.json"));
const modConfig = require("../config.json");
class SariaShop {
    mod;
    logstring;
    imageRouter;
    ref = new References_1.References();
    static container;
    constructor() {
        this.mod = "SariaShop";
        this.logstring = "Saria Shop";
    }
    preSptLoad(container) {
        this.ref.preSptLoad(container);
        this.ref.container = container;
        const ragfair = this.ref.configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        const traderConfig = this.ref.configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const assortUtils = new Utils_1.AssortUtils(this.ref.hashUtil, this.ref.logger);
        const traderUtils = new Utils_1.TraderUtils();
        const traderData = new SariaShop_1.TraderData(traderConfig, this.ref, traderUtils, assortUtils);
        traderData.registerProfileImage();
        traderData.setupTraderUpdateTime();
        Traders_1.Traders["66f4db5ca4958508883d700c"] = "66f4db5ca4958508883d700c";
        ragfair.traders[baseJson._id] = true;
    }
    postDBLoad(container) {
        this.ref.postDBLoad(container);
        this.ref.container = container;
        const traderConfig = this.ref.configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const assortUtils = new Utils_1.AssortUtils(this.ref.hashUtil, this.ref.logger);
        const traderUtils = new Utils_1.TraderUtils();
        const traderData = new SariaShop_1.TraderData(traderConfig, this.ref, traderUtils, assortUtils);
        //Random message on server on startup
        const messageArray = [
            "found some rare goods out there",
            "there are much less bears to worry about now",
            "returning to base",
            "that's how you clean up a battlefield",
            "good thing I brought extra ammo",
        ];
        const randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];
        //Check For LL Config Option
        if (modConfig.RemoveMoneyLLRequirements) {
            baseJson.loyaltyLevels.forEach((level) => {
                level.minSalesSum = 0;
            });
        }
        if (modConfig.RemoveLevelLLRequirements) {
            baseJson.loyaltyLevels.forEach((level) => {
                level.minLevel = 1;
            });
        }
        //Add Saria to the game
        traderData.pushTrader();
        //Add Saria to Locales
        traderData.addTraderToLocales(this.ref.tables, baseJson.name, "Saria", baseJson.nickname, baseJson.location, "A soldier with questionable motives, an unknown background, and a large supply of military goods. She's willing to trade, for a price of course.");
        //Add in Sarias assort
        traderData.createAssorts();
        this.ref.logger.log(`[${this.logstring}] Mission accomplished, ${randomMessage}.`, LogTextColor_1.LogTextColor.CYAN);
    }
}
module.exports = { mod: new SariaShop() };
//# sourceMappingURL=mod.js.map