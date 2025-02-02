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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ROWeatherController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROWeatherController = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const Season_1 = require("C:/snapshot/project/obj/models/enums/Season");
//Modules
const path = __importStar(require("node:path"));
const fs = __importStar(require("node:fs"));
const json5_1 = __importDefault(require("C:/snapshot/project/node_modules/json5"));
let ROWeatherController = class ROWeatherController {
    static { ROWeatherController_1 = this; }
    logger;
    vfs;
    configManager;
    randomUtil;
    configServer;
    constructor(logger, vfs, configManager, randomUtil, configServer) {
        this.logger = logger;
        this.vfs = vfs;
        this.configManager = configManager;
        this.randomUtil = randomUtil;
        this.configServer = configServer;
    }
    static progressFile;
    static modLoc = path.join(__dirname, "..", "..");
    weatherChangesAllSeasons() {
        const weatherConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.WEATHER);
        if (this.configManager.modConfig().Seasons.AllSeasons &&
            !this.configManager.modConfig().Seasons.WinterWonderland &&
            !this.configManager.modConfig().Seasons.NoWinter &&
            !this.configManager.modConfig().Seasons.SeasonalProgression) {
            const weatherChance = this.randomUtil.getInt(1, 100);
            if (weatherChance >= 1 && weatherChance <= 20) {
                weatherConfig.overrideSeason = Season_1.Season.SUMMER;
                this.logger.log("Summer is active.", LogTextColor_1.LogTextColor.MAGENTA);
                return;
            }
            if (weatherChance >= 21 && weatherChance <= 40) {
                weatherConfig.overrideSeason = Season_1.Season.AUTUMN;
                this.logger.log("Autumn is active.", LogTextColor_1.LogTextColor.MAGENTA);
                return;
            }
            if (weatherChance >= 41 && weatherChance <= 60) {
                weatherConfig.overrideSeason = Season_1.Season.WINTER;
                this.logger.log("Winter is coming.", LogTextColor_1.LogTextColor.MAGENTA);
                return;
            }
            if (weatherChance >= 61 && weatherChance <= 80) {
                weatherConfig.overrideSeason = Season_1.Season.SPRING;
                this.logger.log("Spring is active.", LogTextColor_1.LogTextColor.MAGENTA);
                return;
            }
            if (weatherChance >= 81 && weatherChance <= 100) {
                weatherConfig.overrideSeason = Season_1.Season.STORM;
                this.logger.log("Storm is active.", LogTextColor_1.LogTextColor.MAGENTA);
                return;
            }
        }
        else if ((this.configManager.modConfig().Seasons.AllSeasons &&
            this.configManager.modConfig().Seasons.WinterWonderland) ||
            (this.configManager.modConfig().Seasons.NoWinter &&
                this.configManager.modConfig().Seasons.WinterWonderland) ||
            (this.configManager.modConfig().Seasons.SeasonalProgression &&
                this.configManager.modConfig().Seasons.WinterWonderland) ||
            (this.configManager.modConfig().Seasons.NoWinter &&
                this.configManager.modConfig().Seasons.SeasonalProgression) ||
            (this.configManager.modConfig().Seasons.NoWinter && this.configManager.modConfig().Seasons.AllSeasons) ||
            (this.configManager.modConfig().Seasons.SeasonalProgression &&
                this.configManager.modConfig().Seasons.AllSeasons)) {
            this.logger.log("Error modifying your weather. Make sure you only have ONE of the weather options enabled", LogTextColor_1.LogTextColor.RED);
            return;
        }
    }
    weatherChangesNoWinter() {
        const weatherConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.WEATHER);
        if (this.configManager.modConfig().Seasons.NoWinter &&
            !this.configManager.modConfig().Seasons.WinterWonderland &&
            !this.configManager.modConfig().Seasons.AllSeasons &&
            !this.configManager.modConfig().Seasons.SeasonalProgression) {
            const weatherChance = this.randomUtil.getInt(1, 100);
            if (weatherChance >= 1 && weatherChance <= 25) {
                weatherConfig.overrideSeason = Season_1.Season.SUMMER;
                this.logger.log("Summer is active.", LogTextColor_1.LogTextColor.MAGENTA);
                return;
            }
            if (weatherChance >= 26 && weatherChance <= 50) {
                weatherConfig.overrideSeason = Season_1.Season.AUTUMN;
                this.logger.log("Autumn is active.", LogTextColor_1.LogTextColor.MAGENTA);
                return;
            }
            if (weatherChance >= 51 && weatherChance <= 75) {
                weatherConfig.overrideSeason = Season_1.Season.SPRING;
                this.logger.log("Spring is active.", LogTextColor_1.LogTextColor.MAGENTA);
                return;
            }
            if (weatherChance >= 76 && weatherChance <= 100) {
                weatherConfig.overrideSeason = Season_1.Season.STORM;
                this.logger.log("Storm is active.", LogTextColor_1.LogTextColor.MAGENTA);
                return;
            }
        }
        if ((this.configManager.modConfig().Seasons.AllSeasons &&
            this.configManager.modConfig().Seasons.WinterWonderland) ||
            (this.configManager.modConfig().Seasons.NoWinter &&
                this.configManager.modConfig().Seasons.WinterWonderland) ||
            (this.configManager.modConfig().Seasons.SeasonalProgression &&
                this.configManager.modConfig().Seasons.WinterWonderland) ||
            (this.configManager.modConfig().Seasons.NoWinter &&
                this.configManager.modConfig().Seasons.SeasonalProgression) ||
            (this.configManager.modConfig().Seasons.NoWinter && this.configManager.modConfig().Seasons.AllSeasons) ||
            (this.configManager.modConfig().Seasons.SeasonalProgression &&
                this.configManager.modConfig().Seasons.AllSeasons)) {
            this.logger.log("Error modifying your weather. Make sure you only have ONE of the weather options enabled", LogTextColor_1.LogTextColor.RED);
            return;
        }
    }
    weatherChangesWinterWonderland() {
        const weatherConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.WEATHER);
        if (this.configManager.modConfig().Seasons.WinterWonderland &&
            !this.configManager.modConfig().Seasons.AllSeasons &&
            !this.configManager.modConfig().Seasons.NoWinter &&
            !this.configManager.modConfig().Seasons.SeasonalProgression) {
            weatherConfig.overrideSeason = Season_1.Season.WINTER;
            this.logger.log(`Snow is active. It's a whole fuckin' winter wonderland out there.`, LogTextColor_1.LogTextColor.MAGENTA);
            return;
        }
        if ((this.configManager.modConfig().Seasons.AllSeasons &&
            this.configManager.modConfig().Seasons.WinterWonderland) ||
            (this.configManager.modConfig().Seasons.NoWinter &&
                this.configManager.modConfig().Seasons.WinterWonderland) ||
            (this.configManager.modConfig().Seasons.SeasonalProgression &&
                this.configManager.modConfig().Seasons.WinterWonderland) ||
            (this.configManager.modConfig().Seasons.NoWinter &&
                this.configManager.modConfig().Seasons.SeasonalProgression) ||
            (this.configManager.modConfig().Seasons.NoWinter && this.configManager.modConfig().Seasons.AllSeasons) ||
            (this.configManager.modConfig().Seasons.SeasonalProgression &&
                this.configManager.modConfig().Seasons.AllSeasons)) {
            this.logger.log("Error modifying your weather. Make sure you only have ONE of the weather options enabled", LogTextColor_1.LogTextColor.RED);
            return;
        }
    }
    seasonProgression() {
        const weatherConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.WEATHER);
        const seasonsProgressionLoc = `${ROWeatherController_1.modLoc}/src/utils/data/seasonsProgressionFile.json5`;
        const seasonsProgressionFile = json5_1.default.parse(fs.readFileSync(seasonsProgressionLoc, "utf8"));
        let RaidsRun = seasonsProgressionFile.seasonsProgression;
        switch (RaidsRun) {
            //Spring
            case 1:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.SPRING;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Spring is active.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            case 2:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.SPRING;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Spring is active.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            case 3:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.SPRING;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Spring is active.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            //Storm (handled client side)
            case 4:
                RaidsRun++;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Storm is active.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            case 5:
                RaidsRun++;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Storm is active.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            case 6:
                RaidsRun++;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Storm is active.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            //Summer
            case 7:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.SUMMER;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Summer is active.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            case 8:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.SUMMER;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Summer is active.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            case 9:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.SUMMER;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Summer is active.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            //Autumn
            case 10:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.AUTUMN;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Autumn is active.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            case 11:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.AUTUMN;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Autumn is active.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            //Late Autumn
            case 13:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.AUTUMN_LATE;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Autumn is active.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            case 14:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.AUTUMN_LATE;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Autumn is active.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            //Winter
            case 15:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.WINTER;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Winter is coming.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            case 16:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.WINTER;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Winter is coming.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            case 17:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.WINTER;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Winter is coming.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            case 18:
                RaidsRun++;
                weatherConfig.overrideSeason = Season_1.Season.WINTER;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Winter is coming.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
            //Default catch
            default:
                weatherConfig.overrideSeason = Season_1.Season.SPRING_EARLY;
                RaidsRun = 1;
                seasonsProgressionFile.seasonsProgression = RaidsRun;
                if (this.configManager.debugConfig().debugMode) {
                    this.logger.log("Defaulting to spring.", LogTextColor_1.LogTextColor.MAGENTA);
                }
                break;
        }
        try {
            fs.writeFileSync(seasonsProgressionLoc, json5_1.default.stringify(seasonsProgressionFile, null, 4));
            if (this.configManager.debugConfig().debugMode) {
                this.logger.log(`Seasonal progress updated to ${seasonsProgressionFile.seasonsProgression}`, LogTextColor_1.LogTextColor.CYAN);
            }
        }
        catch (error) {
            this.logger.logError(`Error writing season progression file: ${error}`);
        }
    }
    createSeasonsProgressFile() {
        const seasonsProgressActual = 1;
        const progressFileseasons = (ROWeatherController_1.progressFile = {
            seasonsProgression: seasonsProgressActual,
        });
        const progressLocFolder = `${ROWeatherController_1.modLoc}/src/utils/data`;
        const progressLoc = `${progressLocFolder}/seasonsProgressionFile.json5`;
        if (!fs.existsSync(progressLocFolder)) {
            fs.mkdirSync(progressLocFolder, { recursive: true });
        }
        try {
            fs.writeFileSync(progressLoc, json5_1.default.stringify(progressFileseasons, null, 4));
        }
        catch (error) {
            this.logger.logError(`Error writing season progression file: ${error}`);
        }
    }
};
exports.ROWeatherController = ROWeatherController;
exports.ROWeatherController = ROWeatherController = ROWeatherController_1 = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ROLogger")),
    __param(1, (0, tsyringe_1.inject)("VFS")),
    __param(2, (0, tsyringe_1.inject)("ConfigManager")),
    __param(3, (0, tsyringe_1.inject)("RandomUtil")),
    __param(4, (0, tsyringe_1.inject)("ConfigServer")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], ROWeatherController);
//# sourceMappingURL=WeatherController.js.map