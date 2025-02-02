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
exports.TraderData = void 0;
const Utils_1 = require("../Refs/Utils");
const LoyalLevel1_1 = require("./Items/LoyalLevel1");
const LoyalLevel2_1 = require("./Items/LoyalLevel2");
const LoyalLevel3_1 = require("./Items/LoyalLevel3");
const LoyalLevel4_1 = require("./Items/LoyalLevel4");
const baseJson = __importStar(require("../../db/base.json"));
class TraderData {
    traderConfig;
    ref;
    traderHelper;
    assortUtils;
    mod;
    logstring;
    constructor(traderConfig, ref, traderHelper, assortUtils) {
        this.traderConfig = traderConfig;
        this.ref = ref;
        this.traderHelper = traderHelper;
        this.assortUtils = assortUtils;
        this.mod = "SariaShop";
        this.logstring = "Saria Shop";
    }
    registerProfileImage() {
        const imageFilepath = `./${this.ref.preSptModLoader.getModPath(this.mod)}res`;
        this.ref.imageRouter.addRoute(baseJson.avatar.replace(".jpg", ""), `${imageFilepath}/Saria.jpg`);
    }
    setupTraderUpdateTime() {
        const traderRefreshRecord = {
            traderId: baseJson._id,
            seconds: {
                min: 1800,
                max: 7200,
            },
        };
        this.traderConfig.updateTime.push(traderRefreshRecord);
    }
    pushTrader() {
        this.traderHelper = new Utils_1.TraderUtils();
        this.traderHelper.addTraderToDb(baseJson, this.ref.tables, this.ref.jsonUtil);
    }
    addTraderToLocales(tables, fullName, firstName, nickName, location, description) {
        const locales = Object.values(tables.locales.global);
        for (const locale of locales) {
            locale[`${baseJson._id} FullName`] = fullName;
            locale[`${baseJson._id} FirstName`] = firstName;
            locale[`${baseJson._id} Nickname`] = nickName;
            locale[`${baseJson._id} Location`] = location;
            locale[`${baseJson._id} Description`] = description;
        }
    }
    createAssorts() {
        const loyalLevel1 = new LoyalLevel1_1.LL1(this.ref, this.assortUtils);
        const loyalLevel2 = new LoyalLevel2_1.LL2(this.ref, this.assortUtils);
        const loyalLevel3 = new LoyalLevel3_1.LL3(this.ref, this.assortUtils);
        const loyalLevel4 = new LoyalLevel4_1.LL4(this.ref, this.assortUtils);
        loyalLevel1.createAssort1();
        loyalLevel2.createAssort2();
        loyalLevel3.createAssort3();
        loyalLevel4.createAssort4();
    }
}
exports.TraderData = TraderData;
//# sourceMappingURL=SariaShop.js.map