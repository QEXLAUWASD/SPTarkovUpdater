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
exports.LL1 = void 0;
const Enums_1 = require("../../Refs/Enums");
const Utils_1 = require("../../Refs/Utils");
const modConfig = __importStar(require("../../../config.json"));
const baseJson = __importStar(require("../../../db/base.json"));
const presetArray = __importStar(require("../../Refs/ArrayFiles/presetArray.json"));
class LL1 {
    ref;
    assortUtils;
    constructor(ref, assortUtils) {
        this.ref = ref;
        this.assortUtils = assortUtils;
    }
    createAssort1() {
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
            .createSingleAssortItem("56eabcd4d2720b66698b4574")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 29999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("584924ec24597768f12ae244")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 45999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5a3501acc4a282000d72293a")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 15999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("56eabf3bd2720b75698b4569")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 44999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("59db3a1d86f77429e05b4e92")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 34999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5a718f958dc32e00094b97e7")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 30999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("628e4e576d783146b124c64d")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 87999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5fb651dc85f90547f674b6f4")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 28999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5b057b4f5acfc4771e1bd3e9")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 34999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("58d2912286f7744e27117493")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 69999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5b2388675acfc4771e1be0be")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 37999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("618b9671d14d6d5ab879c5ea")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 9999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("618b9643526131765025ab35")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 16999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("593962ca86f774068014d9af")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 19999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5937ee6486f77408994ba448")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 19999)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5aafbcd986f7745e590fff23")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 379999)
            .export(this.ref.tables.traders[baseJson._id], false);
        10999;
        this.assortUtils
            .createSingleAssortItem("5c6d46132e221601da357d56")
            .addStackCount(baseStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 10999)
            .export(this.ref.tables.traders[baseJson._id], false);
        //
        //Ammo
        //
        this.assortUtils
            .createSingleAssortItem("5e023e53d4353e3302577c4c")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 199)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("59e6906286f7746c9f75e847")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 449)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("5c925fa22e221601da359b7b")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 399)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createSingleAssortItem("6529302b8c26af6326029fb7")
            .addStackCount(ammoStackCount)
            .addLoyaltyLevel(1)
            .addMoneyCost(Enums_1.Currency.Roubles, 549)
            .export(this.ref.tables.traders[baseJson._id], false);
        //
        //Barters
        //
        this.assortUtils
            .createSingleAssortItem("544a11ac4bdc2d470e8b456a")
            .addStackCount(1)
            .addLoyaltyLevel(1)
            .addBarterCost(Enums_1.Currency.Roubles, 599999)
            .addBarterCost("5732ee6a24597719ae0c0281", 1)
            .export(this.ref.tables.traders[baseJson._id], false);
        //
        //WeaponPresets
        //
        this.assortUtils
            .createComplexAssortItem(presetArray["657eb391aebd1b6d254bf6e2"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 899)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["5fd251c90d9c95034825edb5"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 599)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["5fd251ee16cac650092f5d02"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 749)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["5c0d1e9386f77440120288b7"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 699)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["5ebbff0841a637322117a5fb"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 1099)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["628753bba4a8431af4739d3b"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 1649)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["5fd251a31189a17bcc172662"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 849)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["5e03511086f7744ccb1fb6cf"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 799)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["618aafe23c1dcf601e0327db"]._items)
            .addMoneyCost(Enums_1.Currency.Dollars, 649)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        //
        //GearPresets
        //
        this.assortUtils
            .createComplexAssortItem(presetArray["657660eb86f11bca4106d34f"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 84999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["657661ad234b9f6e050a42a2"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 114999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["6576616086f11bca4106d35f"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 114999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["657faa0687e11c61f70bfae5"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 57999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["657fa95ae9433140ad0bafad"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 94999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
        this.assortUtils
            .createComplexAssortItem(presetArray["657bc772aab96fccee08bebc"]._items)
            .addMoneyCost(Enums_1.Currency.Roubles, 47999)
            .addStackCount(presetStackCount)
            .addLoyaltyLevel(1)
            .export(this.ref.tables.traders[baseJson._id], false);
    }
}
exports.LL1 = LL1;
//# sourceMappingURL=LoyalLevel1.js.map