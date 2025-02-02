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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROHealthController = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
//Spt Classes
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const DatabaseService_1 = require("C:/snapshot/project/obj/services/DatabaseService");
let ROHealthController = class ROHealthController {
    logger;
    configManager;
    databaseService;
    constructor(logger, configManager, databaseService) {
        this.logger = logger;
        this.configManager = configManager;
        this.databaseService = databaseService;
    }
    modifyEnemyHealth() {
        const tables = this.databaseService.getTables();
        const botTypes = tables.bots.types;
        for (const bot in botTypes) {
            botTypes[bot].health.BodyParts = [
                {
                    Chest: {
                        max: 85,
                        min: 85,
                    },
                    Head: {
                        max: 35,
                        min: 35,
                    },
                    LeftArm: {
                        max: 60,
                        min: 60,
                    },
                    LeftLeg: {
                        max: 65,
                        min: 65,
                    },
                    RightArm: {
                        max: 60,
                        min: 60,
                    },
                    RightLeg: {
                        max: 65,
                        min: 65,
                    },
                    Stomach: {
                        max: 70,
                        min: 70,
                    },
                },
            ];
        }
        if (this.configManager.debugConfig().debugMode) {
            this.logger.log("Enemy health modified.", LogTextColor_1.LogTextColor.GREEN);
        }
    }
};
exports.ROHealthController = ROHealthController;
exports.ROHealthController = ROHealthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ROLogger")),
    __param(1, (0, tsyringe_1.inject)("ConfigManager")),
    __param(2, (0, tsyringe_1.inject)("DatabaseService")),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof DatabaseService_1.DatabaseService !== "undefined" && DatabaseService_1.DatabaseService) === "function" ? _a : Object])
], ROHealthController);
//# sourceMappingURL=HealthController.js.map