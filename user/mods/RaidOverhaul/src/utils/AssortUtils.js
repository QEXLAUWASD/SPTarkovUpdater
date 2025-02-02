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
exports.AssortUtils = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const BaseClasses_1 = require("C:/snapshot/project/obj/models/enums/BaseClasses");
//Custom Classes
const Enums_1 = require("../models/Enums");
//Json Imports
const baseJson = __importStar(require("../../db/base.json"));
let AssortUtils = class AssortUtils {
    utils;
    logger;
    itemHelper;
    presetHelper;
    databaseService;
    //#region AssortUtils
    itemsToSell = [];
    barterScheme = {};
    loyaltyLevel = {};
    constructor(utils, logger, itemHelper, presetHelper, databaseService) {
        this.utils = utils;
        this.logger = logger;
        this.itemHelper = itemHelper;
        this.presetHelper = presetHelper;
        this.databaseService = databaseService;
    }
    /**
     * Start selling item with tpl
     * @param itemTpl Tpl id of the item you want trader to sell
     * @param itemId Optional - set your own Id, otherwise unique id will be generated
     */
    createSingleAssortItem(itemTpl, itemId = undefined) {
        // Create item ready for insertion into assort table
        const newItemToAdd = {
            _id: !itemId ? this.utils.genId() : itemId,
            _tpl: itemTpl,
            parentId: "hideout", // Should always be "hideout"
            slotId: "hideout", // Should always be "hideout"
            upd: {
                UnlimitedCount: false,
                StackObjectsCount: 100,
            },
        };
        this.itemsToSell.push(newItemToAdd);
        return this;
    }
    createComplexAssortItem(items) {
        items[0].parentId = "hideout";
        items[0].slotId = "hideout";
        if (!items[0].upd) {
            items[0].upd = {};
        }
        items[0].upd.UnlimitedCount = false;
        items[0].upd.StackObjectsCount = 100;
        this.itemsToSell.push(...items);
        return this;
    }
    addStackCount(stackCount) {
        this.itemsToSell[0].upd.StackObjectsCount = stackCount;
        return this;
    }
    addBuyRestriction(maxBuyLimit) {
        this.itemsToSell[0].upd.BuyRestrictionMax = maxBuyLimit;
        this.itemsToSell[0].upd.BuyRestrictionCurrent = 0;
        return this;
    }
    addLoyaltyLevel(level) {
        this.loyaltyLevel[this.itemsToSell[0]._id] = level;
        return this;
    }
    addMoneyCost(currencyType, amount) {
        this.barterScheme[this.itemsToSell[0]._id] = [
            [
                {
                    count: amount,
                    _tpl: currencyType,
                },
            ],
        ];
        return this;
    }
    addBarterCost(itemTpl, count) {
        const sellableItemId = this.itemsToSell[0]._id;
        // No data at all, create
        if (Object.keys(this.barterScheme).length === 0) {
            this.barterScheme[sellableItemId] = [
                [
                    {
                        count: count,
                        _tpl: itemTpl,
                    },
                ],
            ];
        }
        else {
            // Item already exists, add to
            const existingData = this.barterScheme[sellableItemId][0].find((x) => x._tpl === itemTpl);
            if (existingData) {
                // itemtpl already a barter for item, add to count
                existingData.count += count;
            }
            else {
                // No barter for item, add it fresh
                this.barterScheme[sellableItemId][0].push({
                    count: count,
                    _tpl: itemTpl,
                });
            }
        }
        return this;
    }
    /**
     * Reset object ready for reuse
     * @returns
     */
    export(data, blockDupes) {
        const itemBeingSoldId = this.itemsToSell[0]._id;
        const itemBeingSoldTpl = this.itemsToSell[0]._tpl;
        if (blockDupes) {
            if (data.assort.items.find((x) => x._id === itemBeingSoldId)) {
                return;
            }
            if (data.assort.items.find((x) => x._tpl === itemBeingSoldTpl)) {
                return;
            }
        }
        data.assort.items.push(...this.itemsToSell);
        data.assort.barter_scheme[itemBeingSoldId] = this.barterScheme[itemBeingSoldId];
        data.assort.loyal_level_items[itemBeingSoldId] = this.loyaltyLevel[itemBeingSoldId];
        this.itemsToSell = [];
        this.barterScheme = {};
        this.loyaltyLevel = {};
        return this;
    }
    /**
     * Processes all items in a preset and fetches the total cost of them
     *
     * @param offerItems - The _items section of the selected preset
     * @returns Collective cost of all preset items
     */
    getPriceForPresetItems(offerItems) {
        let price = 0;
        for (const item of offerItems) {
            // Skip over armour inserts as those are not factored into item prices.
            if (this.itemHelper.isOfBaseclass(item._tpl, BaseClasses_1.BaseClasses.BUILT_IN_INSERTS)) {
                continue;
            }
            price += this.utils.getFleaPrice(item._tpl);
            if (item?.upd?.sptPresetId &&
                this.presetHelper.isPresetBaseClass(item.upd.sptPresetId, BaseClasses_1.BaseClasses.WEAPON)) {
                break;
            }
        }
        return Math.round(price);
    }
    /**
     * Adds an item to the traders assort based on the specified params.
     *
     * @param ItemID - Id of the item you are wanting to add. Also fetches the flea price for the item by Id.
     * @param StockCount - Stock count for the added item in the traders shop.
     * @param LoyaltyLevelToPush - Loyalty level you want your item to be available at.
     */
    buildBaseAssort(ItemID, StockCount, LoyaltyLevelToPush) {
        const itemPrice = this.utils.getFleaPrice(ItemID);
        const slipCost = Math.round(itemPrice / 53999);
        const formCost = Math.round(itemPrice / 175);
        try {
            if (itemPrice <= 0 || itemPrice === undefined) {
                this.createSingleItemOffer(ItemID, StockCount, LoyaltyLevelToPush, this.utils.genRandomCount(1, 10), Enums_1.Currency.ReqSlips);
            }
            else if (itemPrice <= 53999) {
                this.createSingleItemOffer(ItemID, StockCount, LoyaltyLevelToPush, formCost, Enums_1.Currency.ReqForms);
            }
            else if (itemPrice >= 54000) {
                this.createSingleItemOffer(ItemID, StockCount, LoyaltyLevelToPush, slipCost, Enums_1.Currency.ReqSlips);
            }
        }
        catch (error) {
            this.logger.log(`Error loading ${ItemID} => ${error}, skipping item.`, LogTextColor_1.LogTextColor.RED);
        }
    }
    /**
     * Adds a preset to the traders assort based on the specified params.
     * Mostly just for autopopulating it with random presets from the dumped globals preset array.
     *
     * @param ArrayToPull - Array holding your preset.
     * @param ItemKeys - Key of your preset in the array that will be used to generate the shop offer.
     * @param StockCount - Stock count for the preset in the traders shop.
     * @param LoyaltyLevelToPush - Loyalty level you want your preset to be available at.
     * @param presetName - Readable name of the preset for logging.
     */
    buildPresetAssort(PresetItems, StockCount, LoyaltyLevelToPush, presetName) {
        const presetPrice = this.getPriceForPresetItems(PresetItems);
        const slipCost = Math.round(presetPrice / 53999);
        const formCost = Math.round(presetPrice / 175);
        try {
            if (presetPrice <= 0 || presetPrice === undefined) {
                this.createPresetOffer(PresetItems, StockCount, LoyaltyLevelToPush, this.utils.genRandomCount(1, 10), Enums_1.Currency.ReqSlips);
            }
            else if (presetPrice <= 53999) {
                this.createPresetOffer(PresetItems, StockCount, LoyaltyLevelToPush, formCost, Enums_1.Currency.ReqForms);
            }
            else if (presetPrice >= 54000) {
                this.createPresetOffer(PresetItems, StockCount, LoyaltyLevelToPush, slipCost, Enums_1.Currency.ReqSlips);
            }
        }
        catch (error) {
            this.logger.log(`Error loading ${presetName} => ${error}, skipping preset.`, LogTextColor_1.LogTextColor.RED);
        }
    }
    createPresetOffer(PresetItems, StockCount, LoyaltyLevelToPush, ReqCost, CurrencyToUse) {
        const tables = this.databaseService.getTables();
        PresetItems[0].parentId = "hideout";
        PresetItems[0].slotId = "hideout";
        if (!PresetItems[0].upd) {
            PresetItems[0].upd = {};
        }
        PresetItems[0].upd.UnlimitedCount = false;
        PresetItems[0].upd.StackObjectsCount = StockCount;
        this.itemsToSell.push(...PresetItems);
        const complexOffer = this.itemsToSell;
        const barterScheme = [
            [
                {
                    count: ReqCost,
                    _tpl: CurrencyToUse,
                },
            ],
        ];
        const loyaltyLevel = LoyaltyLevelToPush;
        tables.traders[baseJson._id].assort.items.push(...complexOffer);
        tables.traders[baseJson._id].assort.barter_scheme[complexOffer[0]._id] = barterScheme;
        tables.traders[baseJson._id].assort.loyal_level_items[complexOffer[0]._id] = loyaltyLevel;
        this.itemsToSell = [];
    }
    createSingleItemOffer(ItemToAdd, StockCount, LoyaltyLevelToPush, ReqCost, CurrencyToUse) {
        const tables = this.databaseService.getTables();
        const singleOffer = {
            _id: this.utils.genId(),
            _tpl: ItemToAdd,
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: false,
                StackObjectsCount: StockCount,
            },
        };
        const barterScheme = [
            [
                {
                    count: ReqCost,
                    _tpl: CurrencyToUse,
                },
            ],
        ];
        const loyaltyLevel = LoyaltyLevelToPush;
        tables.traders[baseJson._id].assort.items.push(singleOffer);
        tables.traders[baseJson._id].assort.barter_scheme[singleOffer._id] = barterScheme;
        tables.traders[baseJson._id].assort.loyal_level_items[singleOffer._id] = loyaltyLevel;
    }
};
exports.AssortUtils = AssortUtils;
exports.AssortUtils = AssortUtils = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("Utils")),
    __param(1, (0, tsyringe_1.inject)("ROLogger")),
    __param(2, (0, tsyringe_1.inject)("ItemHelper")),
    __param(3, (0, tsyringe_1.inject)("PresetHelper")),
    __param(4, (0, tsyringe_1.inject)("DatabaseService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], AssortUtils);
//# sourceMappingURL=AssortUtils.js.map