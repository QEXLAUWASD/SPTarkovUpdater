"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiContainer = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
//Custom Classes
const WeatherController_1 = require("../controllers/WeatherController");
const HealthController_1 = require("../controllers/HealthController");
const ClothingGenerator_1 = require("../generators/ClothingGenerator");
const LegionController_1 = require("../controllers/LegionController");
const ItemController_1 = require("../controllers/ItemController");
const RaidController_1 = require("../controllers/RaidController");
const ReqsController_1 = require("../controllers/ReqsController");
const DynamicRouterHooks_1 = require("../routers/DynamicRouterHooks");
const StaticRouterHooks_1 = require("../routers/StaticRouterHooks");
const ItemGenerator_1 = require("../generators/ItemGenerator");
const SlotGenerator_1 = require("../generators/SlotGenerator");
const ConfigManager_1 = require("../managers/ConfigManager");
const TraderManager_1 = require("../managers/TraderManager");
const AssortUtils_1 = require("../utils/AssortUtils");
const TraderUtils_1 = require("../utils/TraderUtils");
const Logger_1 = require("../utils/Logger");
const Utils_1 = require("../utils/Utils");
const RaidOverhaul_1 = require("../RaidOverhaul");
class DiContainer {
    static register(container) {
        container.register("ROWeatherController", WeatherController_1.ROWeatherController, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("ROHealthController", HealthController_1.ROHealthController, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("ClothingGenerator", ClothingGenerator_1.ClothingGenerator, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("LegionController", LegionController_1.LegionController, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("ReqsController", ReqsController_1.ReqsController, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("ItemController", ItemController_1.ItemController, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("RaidController", RaidController_1.RaidController, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("DynamicRouters", DynamicRouterHooks_1.DynamicRouters, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("StaticRouters", StaticRouterHooks_1.StaticRouters, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("ConfigManager", ConfigManager_1.ConfigManager, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("TraderManager", TraderManager_1.TraderManager, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("ItemGenerator", ItemGenerator_1.ItemGenerator, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("SlotGenerator", SlotGenerator_1.SlotGenerator, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("RaidOverhaul", RaidOverhaul_1.RaidOverhaul, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("AssortUtils", AssortUtils_1.AssortUtils, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("TraderUtils", TraderUtils_1.TraderUtils, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("ROLogger", Logger_1.ROLogger, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
        container.register("Utils", Utils_1.Utils, {
            lifecycle: tsyringe_1.Lifecycle.Singleton,
        });
    }
}
exports.DiContainer = DiContainer;
//# sourceMappingURL=Container.js.map