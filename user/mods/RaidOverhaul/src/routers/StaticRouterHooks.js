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
exports.StaticRouters = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
//Json Imports
const EventWeightingsConfig = require("../../config/EventWeightings.json");
//Modules
const path = __importStar(require("node:path"));
const fs = __importStar(require("node:fs"));
let StaticRouters = class StaticRouters {
    utils;
    logger;
    configManager;
    weatherController;
    profileHelper;
    staticRouter;
    routerPrefix = "[Raid Overhaul] ";
    constructor(utils, logger, configManager, weatherController, profileHelper, staticRouter) {
        this.utils = utils;
        this.logger = logger;
        this.configManager = configManager;
        this.weatherController = weatherController;
        this.profileHelper = profileHelper;
        this.staticRouter = staticRouter;
    }
    registerHooks() {
        //Backup profile
        this.staticRouter.registerStaticRouter(`${this.routerPrefix}-/client/game/start`, [
            {
                url: "/client/game/start",
                action: async (url, info, sessionID, output) => {
                    const profileInfo = this.profileHelper.getFullProfile(sessionID);
                    if (this.configManager.modConfig().BackupProfile) {
                        this.utils.profileBackup(sessionID, profileInfo);
                    }
                    return Promise.resolve(output);
                },
            },
        ], "spt");
        //Get and send configs to the client
        this.staticRouter.registerStaticRouter("GetEventConfig", [
            {
                url: "/RaidOverhaul/GetEventConfig",
                action: async (url, info, sessionId, output) => {
                    const EventWeightings = EventWeightingsConfig;
                    return JSON.stringify(EventWeightings);
                },
            },
        ], "spt");
        this.staticRouter.registerStaticRouter("GetServerConfig", [
            {
                url: "/RaidOverhaul/GetServerConfig",
                action: async (url, info, sessionId, output) => {
                    const ServerConfig = this.configManager.modConfig();
                    return JSON.stringify(ServerConfig);
                },
            },
        ], "spt");
        this.staticRouter.registerStaticRouter("GetWeatherConfig", [
            {
                url: "/RaidOverhaul/GetWeatherConfig",
                action: async (url, info, sessionId, output) => {
                    const WeatherConfig = this.configManager.seasonProgressionFile();
                    return JSON.stringify(WeatherConfig);
                },
            },
        ], "spt");
        this.staticRouter.registerStaticRouter("GetDebugConfig", [
            {
                url: "/RaidOverhaul/GetDebugConfig",
                action: async (url, info, sessionId, output) => {
                    const DebugConfig = this.configManager.debugConfig();
                    return JSON.stringify(DebugConfig);
                },
            },
        ], "spt");
        // Randomize weather pre-raid
        if (this.configManager.modConfig().Seasons.EnableWeatherOptions) {
            if (this.configManager.modConfig().Seasons.NoWinter &&
                !this.configManager.modConfig().Seasons.AllSeasons &&
                !this.configManager.modConfig().Seasons.SeasonalProgression &&
                !this.configManager.modConfig().Seasons.WinterWonderland) {
                this.staticRouter.registerStaticRouter(`[${this.routerPrefix}]-/Seasons`, [
                    {
                        url: "/client/items",
                        action: async (url, info, sessionId, output) => {
                            this.weatherController.weatherChangesNoWinter();
                            return Promise.resolve(output);
                        },
                    },
                ], "spt");
            }
            if (this.configManager.modConfig().Seasons.AllSeasons &&
                !this.configManager.modConfig().Seasons.NoWinter &&
                !this.configManager.modConfig().Seasons.SeasonalProgression &&
                !this.configManager.modConfig().Seasons.WinterWonderland) {
                this.staticRouter.registerStaticRouter(`[${this.routerPrefix}]-/Seasons`, [
                    {
                        url: "/client/items",
                        action: async (url, info, sessionId, output) => {
                            this.weatherController.weatherChangesAllSeasons();
                            return Promise.resolve(output);
                        },
                    },
                ], "spt");
            }
            if (this.configManager.modConfig().Seasons.SeasonalProgression &&
                !this.configManager.modConfig().Seasons.AllSeasons &&
                !this.configManager.modConfig().Seasons.NoWinter &&
                !this.configManager.modConfig().Seasons.WinterWonderland) {
                this.staticRouter.registerStaticRouter(`[${this.routerPrefix}]-/Seasons`, [
                    {
                        url: "/client/match/local/start",
                        action: async (url, info, sessionId, output) => {
                            const profileId = info.uid;
                            this.weatherController.seasonProgression();
                            return Promise.resolve(output);
                        },
                    },
                ], "spt");
            }
            this.staticRouter.registerStaticRouter(`${this.routerPrefix}-ProfileSelected/Seasons`, [
                {
                    url: "/client/game/profile/select",
                    action: async (url, info, sessionId, output) => {
                        const profileId = info.uid;
                        const modLoc = path.join(__dirname, "..", "..");
                        const seasonsProgressionLoc = `${modLoc}/src/utils/data/seasonsProgressionFile.json5`;
                        if (!fs.existsSync(seasonsProgressionLoc)) {
                            this.logger.logWarning("No season progress file exists for this profile. Creating...");
                            this.weatherController.createSeasonsProgressFile();
                            this.logger.log(`Season progression file created.`, LogTextColor_1.LogTextColor.MAGENTA);
                        }
                        return Promise.resolve(output);
                    },
                },
            ], "spt");
        }
    }
};
exports.StaticRouters = StaticRouters;
exports.StaticRouters = StaticRouters = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("Utils")),
    __param(1, (0, tsyringe_1.inject)("ROLogger")),
    __param(2, (0, tsyringe_1.inject)("ConfigManager")),
    __param(3, (0, tsyringe_1.inject)("ROWeatherController")),
    __param(4, (0, tsyringe_1.inject)("ProfileHelper")),
    __param(5, (0, tsyringe_1.inject)("StaticRouterModService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], StaticRouters);
//# sourceMappingURL=StaticRouterHooks.js.map