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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaidController = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const DatabaseService_1 = require("C:/snapshot/project/obj/services/DatabaseService");
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const ConfigServer_1 = require("C:/snapshot/project/obj/servers/ConfigServer");
let RaidController = class RaidController {
    configManager;
    configServer;
    databaseService;
    constructor(configManager, configServer, databaseService) {
        this.configManager = configManager;
        this.configServer = configServer;
        this.databaseService = databaseService;
    }
    raidChanges() {
        const tables = this.databaseService.getTables();
        const globals = tables.globals.config;
        const questItems = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.LOST_ON_DEATH);
        if (this.configManager.modConfig().Raid.EnableExtendedRaids) {
            for (const location in tables.locations) {
                if (location === "base")
                    continue;
                tables.locations[location].base.EscapeTimeLimit = this.configManager.modConfig().Raid.TimeLimit * 60;
                tables.locations[location].base.EscapeTimeLimitCoop =
                    this.configManager.modConfig().Raid.TimeLimit * 60;
            }
        }
        if (this.configManager.modConfig().Raid.ReduceFoodAndHydroDegrade.Enabled) {
            globals.Health.Effects.Existence.EnergyDamage =
                this.configManager.modConfig().Raid.ReduceFoodAndHydroDegrade.EnergyDecay;
            globals.Health.Effects.Existence.HydrationDamage =
                this.configManager.modConfig().Raid.ReduceFoodAndHydroDegrade.HydroDecay;
        }
        if (this.configManager.modConfig().Raid.ChangeAirdropValues.Enabled) {
            tables.locations["bigmap"].base.AirdropParameters[0].PlaneAirdropChance =
                this.configManager.modConfig().Raid.ChangeAirdropValues.Customs;
            tables.locations["woods"].base.AirdropParameters[0].PlaneAirdropChance =
                this.configManager.modConfig().Raid.ChangeAirdropValues.Woods;
            tables.locations["lighthouse"].base.AirdropParameters[0].PlaneAirdropChance =
                this.configManager.modConfig().Raid.ChangeAirdropValues.Lighthouse;
            tables.locations["shoreline"].base.AirdropParameters[0].PlaneAirdropChance =
                this.configManager.modConfig().Raid.ChangeAirdropValues.Shoreline;
            tables.locations["interchange"].base.AirdropParameters[0].PlaneAirdropChance =
                this.configManager.modConfig().Raid.ChangeAirdropValues.Interchange;
            tables.locations["rezervbase"].base.AirdropParameters[0].PlaneAirdropChance =
                this.configManager.modConfig().Raid.ChangeAirdropValues.Reserve;
            tables.locations["tarkovstreets"].base.AirdropParameters[0].PlaneAirdropChance =
                this.configManager.modConfig().Raid.ChangeAirdropValues.Streets;
            tables.locations["sandbox"].base.AirdropParameters[0].PlaneAirdropChance =
                this.configManager.modConfig().Raid.ChangeAirdropValues.GroundZero;
            tables.locations["sandbox_high"].base.AirdropParameters[0].PlaneAirdropChance =
                this.configManager.modConfig().Raid.ChangeAirdropValues.GroundZero;
        }
        if (this.configManager.modConfig().Raid.SaveQuestItems) {
            questItems.questItems = false;
        }
        if (this.configManager.modConfig().Raid.NoRunThrough) {
            globals.exp.match_end.survived_exp_requirement = 0;
            globals.exp.match_end.survived_seconds_requirement = 0;
        }
    }
    weightChanges() {
        const tables = this.databaseService.getTables();
        const globals = tables.globals.config;
        if (this.configManager.modConfig().WeightChanges.Enabled) {
            globals.Stamina.BaseOverweightLimits.x *= this.configManager.modConfig().WeightChanges.WeightMultiplier;
            globals.Stamina.BaseOverweightLimits.y *= this.configManager.modConfig().WeightChanges.WeightMultiplier;
            globals.Stamina.WalkOverweightLimits.x *= this.configManager.modConfig().WeightChanges.WeightMultiplier;
            globals.Stamina.WalkOverweightLimits.y *= this.configManager.modConfig().WeightChanges.WeightMultiplier;
            globals.Stamina.WalkSpeedOverweightLimits.x *=
                this.configManager.modConfig().WeightChanges.WeightMultiplier;
            globals.Stamina.WalkSpeedOverweightLimits.y *=
                this.configManager.modConfig().WeightChanges.WeightMultiplier;
            globals.Stamina.SprintOverweightLimits.x *= this.configManager.modConfig().WeightChanges.WeightMultiplier;
            globals.Stamina.SprintOverweightLimits.y *= this.configManager.modConfig().WeightChanges.WeightMultiplier;
        }
    }
    lootChanges() {
        const tables = this.databaseService.getTables();
        const maps = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.LOCATION);
        const markedRoomCustoms = tables.locations.bigmap.looseLoot.spawnpoints;
        const markedRoomReserve = tables.locations.rezervbase.looseLoot.spawnpoints;
        const markedRoomStreets = tables.locations.tarkovstreets.looseLoot.spawnpoints;
        const markedRoomLighthouse = tables.locations.lighthouse.looseLoot.spawnpoints;
        if (this.configManager.modConfig().LootChanges.EnableLootOptions) {
            maps.looseLootMultiplier.bigmap = this.configManager.modConfig().LootChanges.LooseLootMultiplier;
            maps.looseLootMultiplier.factory4_day = this.configManager.modConfig().LootChanges.LooseLootMultiplier;
            maps.looseLootMultiplier.factory4_night = this.configManager.modConfig().LootChanges.LooseLootMultiplier;
            maps.looseLootMultiplier.interchange = this.configManager.modConfig().LootChanges.LooseLootMultiplier;
            maps.looseLootMultiplier.laboratory = this.configManager.modConfig().LootChanges.LooseLootMultiplier;
            maps.looseLootMultiplier.rezervbase = this.configManager.modConfig().LootChanges.LooseLootMultiplier;
            maps.looseLootMultiplier.shoreline = this.configManager.modConfig().LootChanges.LooseLootMultiplier;
            maps.looseLootMultiplier.woods = this.configManager.modConfig().LootChanges.LooseLootMultiplier;
            maps.looseLootMultiplier.lighthouse = this.configManager.modConfig().LootChanges.LooseLootMultiplier;
            maps.looseLootMultiplier.tarkovstreets = this.configManager.modConfig().LootChanges.LooseLootMultiplier;
            maps.looseLootMultiplier.sandbox = this.configManager.modConfig().LootChanges.LooseLootMultiplier;
            maps.staticLootMultiplier.bigmap = this.configManager.modConfig().LootChanges.StaticLootMultiplier;
            maps.staticLootMultiplier.factory4_day = this.configManager.modConfig().LootChanges.StaticLootMultiplier;
            maps.staticLootMultiplier.factory4_night = this.configManager.modConfig().LootChanges.StaticLootMultiplier;
            maps.staticLootMultiplier.interchange = this.configManager.modConfig().LootChanges.StaticLootMultiplier;
            maps.staticLootMultiplier.laboratory = this.configManager.modConfig().LootChanges.StaticLootMultiplier;
            maps.staticLootMultiplier.rezervbase = this.configManager.modConfig().LootChanges.StaticLootMultiplier;
            maps.staticLootMultiplier.shoreline = this.configManager.modConfig().LootChanges.StaticLootMultiplier;
            maps.staticLootMultiplier.woods = this.configManager.modConfig().LootChanges.StaticLootMultiplier;
            maps.staticLootMultiplier.lighthouse = this.configManager.modConfig().LootChanges.StaticLootMultiplier;
            maps.staticLootMultiplier.tarkovstreets = this.configManager.modConfig().LootChanges.StaticLootMultiplier;
            maps.staticLootMultiplier.sandbox = this.configManager.modConfig().LootChanges.StaticLootMultiplier;
        }
        for (const cSP of markedRoomCustoms) {
            if (cSP.template.Position.x > 180 &&
                cSP.template.Position.x < 185 &&
                cSP.template.Position.z > 180 &&
                cSP.template.Position.z < 185 &&
                cSP.template.Position.y > 6 &&
                cSP.template.Position.y < 7) {
                cSP.probability *= this.configManager.modConfig().LootChanges.MarkedRoomLootMultiplier;
            }
        }
        for (const rSP of markedRoomReserve) {
            if (rSP.template.Position.x > -125 &&
                rSP.template.Position.x < -120 &&
                rSP.template.Position.z > 25 &&
                rSP.template.Position.z < 30 &&
                rSP.template.Position.y > -15 &&
                rSP.template.Position.y < -14) {
                rSP.probability *= this.configManager.modConfig().LootChanges.MarkedRoomLootMultiplier;
            }
            else if (rSP.template.Position.x > -155 &&
                rSP.template.Position.x < -150 &&
                rSP.template.Position.z > 70 &&
                rSP.template.Position.z < 75 &&
                rSP.template.Position.y > -9 &&
                rSP.template.Position.y < -8) {
                rSP.probability *= this.configManager.modConfig().LootChanges.MarkedRoomLootMultiplier;
            }
            else if (rSP.template.Position.x > 190 &&
                rSP.template.Position.x < 195 &&
                rSP.template.Position.z > -230 &&
                rSP.template.Position.z < -225 &&
                rSP.template.Position.y > -6 &&
                rSP.template.Position.y < -5) {
                rSP.probability *= this.configManager.modConfig().LootChanges.MarkedRoomLootMultiplier;
            }
        }
        for (const sSP of markedRoomStreets) {
            if (sSP.template.Position.x > -133 &&
                sSP.template.Position.x < -129 &&
                sSP.template.Position.z > 265 &&
                sSP.template.Position.z < 275 &&
                sSP.template.Position.y > 8.5 &&
                sSP.template.Position.y < 11) {
                sSP.probability *= this.configManager.modConfig().LootChanges.MarkedRoomLootMultiplier;
            }
            else if (sSP.template.Position.x > 186 &&
                sSP.template.Position.x < 191 &&
                sSP.template.Position.z > 224 &&
                sSP.template.Position.z < 229 &&
                sSP.template.Position.y > -0.5 &&
                sSP.template.Position.y < 1.5) {
                sSP.probability *= this.configManager.modConfig().LootChanges.MarkedRoomLootMultiplier;
            }
        }
        for (const lSP of markedRoomLighthouse) {
            if (lSP.template.Position.x > 319 &&
                lSP.template.Position.x < 330 &&
                lSP.template.Position.z > 482 &&
                lSP.template.Position.z < 489 &&
                lSP.template.Position.y > 5 &&
                lSP.template.Position.y < 6.5) {
                lSP.probability *= this.configManager.modConfig().LootChanges.MarkedRoomLootMultiplier;
            }
        }
    }
    traderTweaks() {
        const tables = this.databaseService.getTables();
        const quests = tables.templates.quests;
        const traders = tables.traders;
        const ragfair = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.RAGFAIR);
        if (this.configManager.modConfig().Insurance.Enabled) {
            traders["54cb50c76803fa8b248b4571"].base.insurance.min_return_hour =
                this.configManager.modConfig().Insurance.PraporMinReturn;
            traders["54cb50c76803fa8b248b4571"].base.insurance.max_return_hour =
                this.configManager.modConfig().Insurance.PraporMaxReturn;
            traders["54cb57776803fa99248b456e"].base.insurance.min_return_hour =
                this.configManager.modConfig().Insurance.TherapistMinReturn;
            traders["54cb57776803fa99248b456e"].base.insurance.max_return_hour =
                this.configManager.modConfig().Insurance.TherapistMaxReturn;
        }
        this.configManager.modConfig().Trader.LL1Items;
        if (this.configManager.modConfig().Trader.LL1Items) {
            for (const item in tables.traders["66f0eaa93f6cc015bc1f3acb"].assort.loyal_level_items) {
                tables.traders["66f0eaa93f6cc015bc1f3acb"].assort.loyal_level_items[item] = 1;
            }
        }
        if (this.configManager.modConfig().Trader.DisableFleaBlacklist) {
            ragfair.dynamic.blacklist.enableBsgList = false;
        }
        if (this.configManager.modConfig().Trader.RemoveFirRequirementsForQuests) {
            for (const q in quests) {
                const quest = quests[q];
                if (quest?.conditions?.AvailableForFinish) {
                    const availableForFinish = quest.conditions.AvailableForFinish;
                    for (const requirement in availableForFinish) {
                        if (availableForFinish[requirement].onlyFoundInRaid) {
                            availableForFinish[requirement].onlyFoundInRaid = false;
                        }
                    }
                }
            }
        }
    }
};
exports.RaidController = RaidController;
exports.RaidController = RaidController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ConfigManager")),
    __param(1, (0, tsyringe_1.inject)("ConfigServer")),
    __param(2, (0, tsyringe_1.inject)("DatabaseService")),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof ConfigServer_1.ConfigServer !== "undefined" && ConfigServer_1.ConfigServer) === "function" ? _a : Object, typeof (_b = typeof DatabaseService_1.DatabaseService !== "undefined" && DatabaseService_1.DatabaseService) === "function" ? _b : Object])
], RaidController);
//# sourceMappingURL=RaidController.js.map