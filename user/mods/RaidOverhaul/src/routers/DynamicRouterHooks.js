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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicRouters = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
let DynamicRouters = class DynamicRouters {
    logger;
    configManager;
    jsonUtil;
    dynamicRouter;
    routerPrefix = "[Raid Overhaul] ";
    constructor(logger, configManager, jsonUtil, dynamicRouter) {
        this.logger = logger;
        this.configManager = configManager;
        this.jsonUtil = jsonUtil;
        this.dynamicRouter = dynamicRouter;
    }
    registerHooks() {
        //Log from the client to the server if in debug mode is enabled in debug options
        if (this.configManager.debugConfig().debugMode) {
            this.dynamicRouter.registerDynamicRouter(`DynamicLogToServer-${this.routerPrefix}`, [
                {
                    url: "/RaidOverhaul/LogToServer",
                    action: async (url, info, sessionID, output) => {
                        const loggerInfo = this.jsonUtil.serialize(info);
                        this.logger.logToServer(loggerInfo);
                        return JSON.stringify({ resp: "OK" });
                    },
                },
            ], "LogToServer");
        }
    }
};
exports.DynamicRouters = DynamicRouters;
exports.DynamicRouters = DynamicRouters = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ROLogger")),
    __param(1, (0, tsyringe_1.inject)("ConfigManager")),
    __param(2, (0, tsyringe_1.inject)("JsonUtil")),
    __param(3, (0, tsyringe_1.inject)("DynamicRouterModService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], DynamicRouters);
//# sourceMappingURL=DynamicRouterHooks.js.map