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
exports.ItemGenerator = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
//Custom Classes
const Enums_1 = require("../models/Enums");
//Modules
const path = __importStar(require("node:path"));
const fs = __importStar(require("node:fs"));
let ItemGenerator = class ItemGenerator {
    utils;
    configServer;
    customItem;
    databaseService;
    ragfairPriceService;
    itemConfig;
    constructor(utils, configServer, customItem, databaseService, ragfairPriceService) {
        this.utils = utils;
        this.configServer = configServer;
        this.customItem = customItem;
        this.databaseService = databaseService;
        this.ragfairPriceService = ragfairPriceService;
    }
    /**
     * Loads all of your json item files and creates items based on the supplied data.
     *
     * @param itemDirectory - The directory where you are storing your item json files.
     */
    createCustomItems(itemDirectory) {
        this.itemConfig = this.combineItems(itemDirectory);
        const tables = this.databaseService.getTables();
        for (const newId in this.itemConfig) {
            const itemConfig = this.itemConfig[newId];
            const tempClone = Enums_1.AllItemList[itemConfig.ItemToClone] || itemConfig.ItemToClone;
            const itemToClone = tempClone;
            const handbookData = this.createHandbook(itemConfig, newId);
            const newItem = {
                itemTplToClone: itemToClone,
                overrideProperties: itemConfig.OverrideProperties,
                parentId: tables.templates.items[itemToClone]._parent,
                newId: newId,
                handbookParentId: handbookData.ParentId,
                handbookPriceRoubles: handbookData.Price,
                fleaPriceRoubles: this.createFleaData(itemConfig, newId),
                locales: {
                    en: {
                        name: itemConfig.LocalePush.name,
                        shortName: itemConfig.LocalePush.shortName,
                        description: itemConfig.LocalePush.description,
                    },
                },
            };
            this.customItem.createItemFromClone(newItem);
            if (itemConfig.CloneToFilters) {
                this.cloneToFilters(itemConfig, newId);
            }
            if (itemConfig.PushMastery) {
                this.pushMastery(itemConfig, newId);
            }
            if (itemConfig.BotPush?.AddToBots) {
                this.addToBots(itemConfig, newId);
            }
            if (itemConfig.LootPush?.LootContainersToAdd !== undefined) {
                this.addToStaticLoot(itemConfig, newId);
            }
            if (itemConfig.CasePush?.CaseFiltersToAdd !== undefined) {
                this.addToCases(itemConfig, newId);
            }
            if (itemConfig.PushToFleaBlacklist) {
                this.pushToBlacklist(newId);
            }
            if (itemConfig.SlotPush?.Slot !== undefined) {
                this.pushToSlot(itemConfig, newId);
            }
            if (itemConfig.PresetPush !== undefined) {
                this.addCustomPresets(itemConfig);
            }
            if (itemConfig.QuestPush !== undefined) {
                this.addToQuests(tables.templates.quests, itemConfig.QuestPush.QuestConditionType, itemConfig.QuestPush.QuestTargetConditionToClone, newId);
            }
            this.buildCustomPresets(itemConfig, newId);
        }
    }
    /**
     * Creates handbook data for your item.
     *
     * @param itemConfig - Your items json data.
     * @param itemID - Your new items Id.
     * @returns the handbook entry for your new item.
     */
    createHandbook(itemConfig, itemID) {
        const tables = this.databaseService.getTables();
        const tempClone = Enums_1.AllItemList[itemConfig.ItemToClone] || itemConfig.ItemToClone;
        const itemToClone = tempClone;
        if (itemConfig.Handbook !== undefined) {
            const tempHBParent = Enums_1.HandbookIDs[itemConfig.Handbook.HandbookParent] || itemConfig.Handbook.HandbookParent;
            const hbParent = tempHBParent;
            const handbookEntry = {
                Id: itemID,
                ParentId: hbParent,
                Price: itemConfig.Handbook.HandbookPrice,
            };
            return handbookEntry;
        }
        else {
            const hbBase = tables.templates.handbook.Items.find((i) => i.Id === itemToClone);
            const handbookEntry = {
                Id: itemID,
                ParentId: hbBase.ParentId,
                Price: hbBase.Price,
            };
            return handbookEntry;
        }
    }
    /**
     * Creates flea market data for your item.
     *
     * @param itemConfig - Your items json data.
     * @returns the flea price for your cloned item.
     */
    createFleaData(itemConfig, itemID) {
        const tempClone = Enums_1.AllItemList[itemConfig.ItemToClone] || itemConfig.ItemToClone;
        const itemToClone = tempClone;
        if (itemConfig.Handbook !== undefined) {
            return this.createHandbook(itemConfig, itemID).Price;
        }
        else {
            return this.utils.getFleaPrice(itemToClone);
        }
    }
    /**
     * Clones your new item to the filters of the existing item you cloned.
     *
     * @param itemConfig - Your items json data.
     * @param itemID - Your new items Id.
     */
    cloneToFilters(itemConfig, itemID) {
        const tables = this.databaseService.getTables();
        const tempClone = Enums_1.AllItemList[itemConfig.ItemToClone] || itemConfig.ItemToClone;
        const itemToClone = tempClone;
        for (const item in tables.templates.items) {
            const itemConflictId = tables.templates.items[item]._props.ConflictingItems;
            for (const itemInConflicts in itemConflictId) {
                const itemInConflictsFiltersId = itemConflictId[itemInConflicts];
                if (itemInConflictsFiltersId === itemToClone) {
                    itemConflictId.push(itemID);
                }
            }
            for (const slots in tables.templates.items[item]._props.Slots) {
                const slotsId = tables.templates.items[item]._props.Slots[slots]._props.filters[0].Filter;
                for (const itemInFilters in slotsId) {
                    const itemInFiltersId = slotsId[itemInFilters];
                    if (itemInFiltersId === itemToClone) {
                        slotsId.push(itemID);
                    }
                }
            }
            for (const cartridge in tables.templates.items[item]._props.Cartridges) {
                const cartridgeId = tables.templates.items[item]._props.Cartridges[cartridge]._props.filters[0].Filter;
                for (const itemInFilters in cartridgeId) {
                    const itemInFiltersId = cartridgeId[itemInFilters];
                    if (itemInFiltersId === itemToClone) {
                        cartridgeId.push(itemID);
                    }
                }
            }
            for (const chamber in tables.templates.items[item]._props.Chambers) {
                const chamberId = tables.templates.items[item]._props.Chambers[chamber]._props.filters[0].Filter;
                for (const itemInFilters in chamberId) {
                    const itemInFiltersId = chamberId[itemInFilters];
                    if (itemInFiltersId === itemToClone) {
                        chamberId.push(itemID);
                    }
                }
            }
        }
    }
    /**
     * Gives your item a new mastery stat.
     *
     * @param itemConfig - Your items json data.
     * @param itemID - Your new items Id.
     */
    pushMastery(itemConfig, itemID) {
        const tables = this.databaseService.getTables();
        const new_mastery_DJCore = {
            Name: itemConfig.LocalePush.name,
            Templates: [itemID],
            Level2: 450,
            Level3: 900,
        };
        tables.globals.config.Mastering.push(new_mastery_DJCore);
    }
    /**
     * Adds your item onto bots.
     *
     * @param itemConfig - Your items json data.
     * @param itemID - Your new items Id.
     */
    addToBots(itemConfig, itemID) {
        const tables = this.databaseService.getTables();
        const tempClone = Enums_1.AllItemList[itemConfig.ItemToClone] || itemConfig.ItemToClone;
        const itemToClone = tempClone;
        for (const botId in tables.bots.types) {
            for (const lootSlot in tables.bots.types[botId].inventory.items) {
                const items = tables.bots.types[botId].inventory.items;
                if (items[lootSlot][itemToClone]) {
                    const weight = items[lootSlot][itemToClone];
                    items[lootSlot][itemID] = weight;
                }
            }
            for (const equipSlot in tables.bots.types[botId].inventory.equipment) {
                const equip = tables.bots.types[botId].inventory.equipment;
                if (equip[equipSlot][itemToClone]) {
                    const weight = equip[equipSlot][itemToClone];
                    equip[equipSlot][itemID] = weight;
                }
            }
            for (const modItem in tables.bots.types[botId].inventory.mods) {
                for (const modSlot in tables.bots.types[botId].inventory.mods[modItem]) {
                    if (tables.bots.types[botId]?.inventory?.mods[modItem][modSlot][itemToClone]) {
                        tables.bots.types[botId].inventory.mods[modItem][modSlot].push(itemID);
                    }
                }
                if (tables.bots.types[botId]?.inventory?.mods[itemToClone]) {
                    tables.bots.types[botId].inventory.mods[itemID] = structuredClone(tables.bots.types[botId].inventory.mods[itemToClone]);
                }
            }
        }
    }
    /**
     * Adds your item into the static loot pool.
     *
     * @param itemConfig - Your items json data.
     * @param itemID - Your new items Id.
     */
    addToStaticLoot(itemConfig, itemID) {
        const tables = this.databaseService.getTables();
        const locations = tables.locations;
        if (Array.isArray(itemConfig.LootPush?.LootContainersToAdd)) {
            itemConfig.LootPush?.LootContainersToAdd.forEach((lootContainer) => {
                const tempLC = Enums_1.AllItemList[lootContainer] || lootContainer;
                const staticLC = tempLC;
                const lootToPush = {
                    tpl: itemID,
                    relativeProbability: itemConfig.LootPush?.StaticLootProbability,
                };
                for (const map in locations) {
                    if (locations.hasOwnProperty(map)) {
                        const location = locations[map];
                        if (location.staticLoot) {
                            const staticLoot = location.staticLoot;
                            if (staticLoot.hasOwnProperty(staticLC)) {
                                const staticContainer = staticLoot[staticLC];
                                if (staticContainer) {
                                    staticContainer.itemDistribution.push(lootToPush);
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    /**
     * Adds your item to the specified cases.
     *
     * @param itemConfig - Your items json data.
     * @param itemID - Your new items Id.
     */
    addToCases(itemConfig, itemID) {
        const conInvKey = "harmer-configurableinventories";
        const svmKey = "[SVM] Server Value Modifier";
        const tables = this.databaseService.getTables();
        const items = tables.templates.items;
        if (!this.utils.checkForMod(conInvKey) && !this.utils.checkForMod(svmKey)) {
            if (Array.isArray(itemConfig.CasePush?.CaseFiltersToAdd)) {
                itemConfig.CasePush?.CaseFiltersToAdd.forEach((caseToAdd) => {
                    const tempCases = Enums_1.AllItemList[caseToAdd] || caseToAdd;
                    const cases = tempCases;
                    for (const item in items) {
                        if (items[item]._id === cases) {
                            if (items[item]._props?.Grids[0]._props.filters[0].Filter === undefined) {
                                const unbreakFilters = [
                                    {
                                        Filter: ["54009119af1c881c07000029"],
                                        ExcludedFilter: ["5447e1d04bdc2dff2f8b4567"],
                                    },
                                ];
                                tables.templates.items[cases]._props.Grids[0]._props.filters = unbreakFilters;
                            }
                            else if (items[item]._props?.Grids[0]._props.filters[0].Filter !== undefined) {
                                items[item]._props?.Grids[0]._props.filters[0].Filter.push(itemID);
                            }
                        }
                    }
                });
            }
            else {
                for (const item in items) {
                    if (items[item]._id === itemConfig.CasePush?.CaseFiltersToAdd) {
                        if (items[item]._props?.Grids[0]._props.filters[0].Filter === undefined) {
                            const unbreakFilters = [
                                {
                                    Filter: ["54009119af1c881c07000029"],
                                    ExcludedFilter: ["5447e1d04bdc2dff2f8b4567"],
                                },
                            ];
                            tables.templates.items[itemConfig.CasePush?.CaseFiltersToAdd]._props.Grids[0]._props.filters = unbreakFilters;
                        }
                        if (items[item]._props?.Grids[0]._props.filters[0].Filter !== undefined) {
                            items[item]._props?.Grids[0]._props.filters[0].Filter.push(itemID);
                        }
                    }
                }
            }
        }
    }
    /**
     * Pushes your specified item into a specific slot on your character.
     * Ie pushing rigs to the armband slot for creating armbands with grids.
     *
     * @param itemConfig - Your items json data.
     * @param itemID - Your new items Id.
     */
    pushToSlot(itemConfig, itemID) {
        const tables = this.databaseService.getTables();
        const DefaultInventory = tables.templates.items["55d7217a4bdc2d86028b456d"]._props.Slots;
        const tempSlot = Enums_1.SlotsIDs[itemConfig.SlotPush?.Slot] || itemConfig.SlotPush?.Slot;
        const slotToPush = tempSlot;
        DefaultInventory[slotToPush]._props.filters[0].Filter.push(itemID);
    }
    /**
     * .
     *
     * @param itemConfig - Your items json data.
     * @param itemID - Your new items Id.
     */
    pushToBlacklist(itemID) {
        const ragfair = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        ragfair.dynamic.blacklist.custom.push(...[itemID]);
    }
    /**
     * Loads all of your json item files into one config file for processing.
     *
     * @param itemDirectory - The directory for your item files.
     */
    combineItems(itemDirectory) {
        const modules = fs.readdirSync(path.join(__dirname, itemDirectory));
        const combinedModules = {};
        modules.forEach((modFile) => {
            const filesPath = path.join(__dirname, itemDirectory, modFile);
            const fileContents = fs.readFileSync(filesPath, "utf-8");
            const module = JSON.parse(fileContents);
            Object.assign(combinedModules, module);
        });
        return combinedModules;
    }
    /**
     * Create a custom preset for your item.
     *
     * @param itemConfig - Your items json data.
     */
    addCustomPresets(itemConfig) {
        const tables = this.databaseService.getTables();
        const customPresets = itemConfig.PresetPush.PresetToAdd;
        const presets = tables.globals.ItemPresets;
        if (itemConfig.PresetPush !== undefined) {
            customPresets.forEach((preset) => {
                const finalPreset = {
                    _changeWeaponName: preset._changeWeaponName,
                    _encyclopedia: preset._encyclopedia || undefined,
                    _id: preset._id,
                    _items: preset._items.map((itemData) => {
                        const item = {
                            _id: itemData._id,
                            _tpl: itemData._tpl,
                        };
                        if (itemData.parentId) {
                            item.parentId = itemData.parentId;
                        }
                        if (itemData.slotId) {
                            item.slotId = itemData.slotId;
                        }
                        return item;
                    }),
                    _name: preset._name,
                    _parent: preset._parent,
                    _type: "Preset",
                };
                presets[finalPreset._id] = finalPreset;
            });
        }
    }
    /**
     * Creates a preset for your item if it's an armor piece.
     * Ie rig, armor, helmet
     *
     * @param itemConfig - Your items json data.
     * @param itemID - Your new items Id.
     */
    buildCustomPresets(itemConfig, itemID) {
        const tables = this.databaseService.getTables();
        const presets = tables.globals.ItemPresets;
        const basePresetID = this.utils.genId();
        if (tables.templates.items[itemID]._parent === "5a341c4086f77401f2541505" ||
            tables.templates.items[itemID]._parent === "5448e5284bdc2dcb718b4567" ||
            tables.templates.items[itemID]._parent === "5448e54d4bdc2dcc718b4568") {
            const finalPreset = {
                _changeWeaponName: false,
                _encyclopedia: itemID,
                _id: this.utils.genId(),
                _items: [],
                _name: `${itemConfig.LocalePush.name} Preset`,
                _parent: basePresetID,
                _type: "Preset",
            };
            finalPreset._items.push({ _id: basePresetID, _tpl: itemID });
            tables.templates.items[itemID]._props.Slots.forEach((slot) => {
                if (slot._name !== "mod_nvg") {
                    finalPreset._items.push({
                        _id: this.utils.genId(),
                        _tpl: this.utils.drawRandom(slot._props.filters[0].Filter),
                        parentId: basePresetID,
                        slotId: slot._name,
                    });
                }
            });
            presets[finalPreset._id] = finalPreset;
        }
    }
    /**
     * Clones created item to existing quest conditions.
     *
     * @param quests - DatabaseTables.templates.quests.
     * @param condition - Condition you are wanting to add to.
     * @param target - Existing item in condition you are wanting to clone.
     * @param newTarget - Your item you are trying to add.
     */
    addToQuests(quests, condition, target, newTarget) {
        for (const quest of Object.keys(quests)) {
            const questConditions = quests[quest];
            for (const nextCondition of questConditions.conditions.AvailableForFinish) {
                const nextConditionData = nextCondition;
                if (nextConditionData.conditionType === condition && nextConditionData.target.includes(target)) {
                    nextConditionData.target.push(newTarget);
                }
            }
        }
    }
};
exports.ItemGenerator = ItemGenerator;
exports.ItemGenerator = ItemGenerator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("Utils")),
    __param(1, (0, tsyringe_1.inject)("ConfigServer")),
    __param(2, (0, tsyringe_1.inject)("CustomItemService")),
    __param(3, (0, tsyringe_1.inject)("DatabaseService")),
    __param(4, (0, tsyringe_1.inject)("RagfairPriceService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], ItemGenerator);
//# sourceMappingURL=ItemGenerator.js.map