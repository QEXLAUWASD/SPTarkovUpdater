"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const boss_1 = require("./boss");
const pmc_1 = require("./pmc");
class ValensProgression {
    configServer;
    locationConfig;
    botConfig;
    pmcConfig;
    databaseServer;
    profileHelper;
    // private scavs: Scavs;
    pmcs;
    boss;
    postDBLoad(container) {
        // get database from server
        this.configServer = container.resolve("ConfigServer");
        this.locationConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.LOCATION);
        this.botConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.BOT);
        this.pmcConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.PMC);
        this.databaseServer = container.resolve("DatabaseServer");
        this.profileHelper = container.resolve("ProfileHelper");
        // this.scavs = new Scavs(this.botConfig, this.databaseServer);
        // this.scavs.updateScavs();
        this.boss = new boss_1.Boss(this.locationConfig);
        this.boss.updateBoss();
        this.pmcs = new pmc_1.PMCs(this.botConfig, this.pmcConfig, this.databaseServer, this.profileHelper);
        this.pmcs.updatePmcs();
    }
}
module.exports = { mod: new ValensProgression() };
//# sourceMappingURL=mod.js.map