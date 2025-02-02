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
exports.LL4 = void 0;
const Enums_1 = require("../../Refs/Enums");
const Utils_1 = require("../../Refs/Utils");
const modConfig = __importStar(require("../../../config.json"));
const baseJson = __importStar(require("../../../db/base.json"));
const presetArray = __importStar(require("../../Refs/ArrayFiles/presetArray.json"));
class LL4 {
    ref;
    assortUtils;
    constructor(ref, assortUtils) {
        this.ref = ref;
        this.assortUtils = assortUtils;
    }
    createAssort4() {
        this.assortUtils = new Utils_1.AssortUtils(this.ref.hashUtil, this.ref.logger);
        let ammoStackCount = 60;
        let presetStackCount = 1;
        let baseStackCount = 3;
        if (modConfig.UnlimitedStackCount) {
            ammoStackCount = 999999;
            presetStackCount = 999999;
            baseStackCount = 999999;
        }
        else {
            ammoStackCount = this.ref.randomUtil.randInt(0, 300);
            presetStackCount = this.ref.randomUtil.randInt(0, 3);
            baseStackCount = this.ref.randomUtil.randInt(0, 10);
        }
        //
        //Items
        //
        this.assortUtils
            .createSingleAssortItem("59c1383d86f774290a37e0ca")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 47999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5a1ead28fcdbcb001912fa9f")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 179999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5a1eaa87fcdbcb001865f75e")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 499999)
            .export(this.ref.tables.traders[baseJson._id], false);
        //
        //Ammo
        //
        this.assortUtils
            .createSingleAssortItem("5efb0c1bd79ff02a1f5e68d9")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 1899)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5fc382a9d724d907e2077dab")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 5999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("601949593ae8f707c4608daa")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 1799)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5fc23426900b1d5091531e15")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(4)
            .addMoneyCost(Enums_1.Currency.Roubles, 19999)
            .export(this.ref.tables.traders[baseJson._id], false);
        //
        //Barters
        //
        this.assortUtils
            .createSingleAssortItem("5c0a840b86f7742ffa4f2482")
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .addBarterCost(Enums_1.Currency.Dollars, 29999)
            .addBarterCost("59fb042886f7746c5005a7b2", 2)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5c093ca986f7740a1867ab12")
            .addStackCount(1)
            .addLoyaltyLevel(4)
            .addBarterCost(Enums_1.Currency.Roubles, 2999999)
            .addBarterCost("59db794186f77448bc595262", 1)
            .export(this.ref.tables.traders[baseJson._id], false);
        //
        //WeaponPresets
        //
        this.assortUtils
            .createComplexAssortItem(presetArray["5fd25119dd870108a754a163"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 309999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["62875256bbbd995f3c41b253"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 349999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["5a3a85af86f774745637d46c"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 209999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["5a8ae21486f774377b73cf5d"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 699999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(this.ref.tables.traders[baseJson._id], false);
        //
        //GearPresets
        //
        this.assortUtils
            .createComplexAssortItem(presetArray["657bc821aab96fccee08becc"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 129999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["657fa92de65c0122b70ffdb9"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 89999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["657667f686f11bca4106d383"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 229999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["657665e2303700411c0242b2"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 279999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["6571960bacb85662e7024c23"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 229999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["65766a7b86f11bca4106d3c3"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 304999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(4)
            .export(this.ref.tables.traders[baseJson._id], false);
    }
}
exports.LL4 = LL4;
//# sourceMappingURL=LoyalLevel4.js.map