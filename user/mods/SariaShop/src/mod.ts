import type { DependencyContainer } from "tsyringe";

import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { Traders } from "@spt/models/enums/Traders";
import type { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import type { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import type { IRagfairConfig } from "@spt/models/spt/config/IRagfairConfig";
import type { ITraderConfig } from "@spt/models/spt/config/ITraderConfig";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import type { ImageRouter } from "@spt/routers/ImageRouter";

import { References } from "./Refs/References";
import { AssortUtils, TraderUtils } from "./Refs/Utils";
import { TraderData } from "./Trader/SariaShop";

import * as baseJson from "../db/base.json";

const modConfig = require("../config.json");

class SariaShop implements IPreSptLoadMod, IPostDBLoadMod {
    mod: string;
    logstring: string;
    public imageRouter: ImageRouter;
    private ref: References = new References();
    static container: DependencyContainer;

    constructor() {
        this.mod = "SariaShop";
        this.logstring = "Saria Shop";
    }

    public preSptLoad(container: DependencyContainer): void {
        this.ref.preSptLoad(container);
        this.ref.container = container;

        const ragfair: IRagfairConfig = this.ref.configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        const traderConfig: ITraderConfig = this.ref.configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const assortUtils = new AssortUtils(this.ref.hashUtil, this.ref.logger);
        const traderUtils = new TraderUtils();
        const traderData = new TraderData(traderConfig, this.ref, traderUtils, assortUtils);

        traderData.registerProfileImage();
        traderData.setupTraderUpdateTime();
        Traders["66f4db5ca4958508883d700c"] = "66f4db5ca4958508883d700c";
        ragfair.traders[baseJson._id] = true;
    }

    public postDBLoad(container: DependencyContainer): void {
        this.ref.postDBLoad(container);
        this.ref.container = container;

        const traderConfig: ITraderConfig = this.ref.configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const assortUtils = new AssortUtils(this.ref.hashUtil, this.ref.logger);
        const traderUtils = new TraderUtils();
        const traderData = new TraderData(traderConfig, this.ref, traderUtils, assortUtils);

        //Random message on server on startup
        const messageArray = [
            "found some rare goods out there",
            "there are much less bears to worry about now",
            "returning to base",
            "that's how you clean up a battlefield",
            "good thing I brought extra ammo",
        ];
        const randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];

        //Check For LL Config Option
        if (modConfig.RemoveMoneyLLRequirements) {
            baseJson.loyaltyLevels.forEach((level) => {
                level.minSalesSum = 0;
            });
        }

        if (modConfig.RemoveLevelLLRequirements) {
            baseJson.loyaltyLevels.forEach((level) => {
                level.minLevel = 1;
            });
        }
        //Add Saria to the game
        traderData.pushTrader();
        //Add Saria to Locales
        traderData.addTraderToLocales(
            this.ref.tables,
            baseJson.name,
            "Saria",
            baseJson.nickname,
            baseJson.location,
            "A soldier with questionable motives, an unknown background, and a large supply of military goods. She's willing to trade, for a price of course.",
        );
        //Add in Sarias assort
        traderData.createAssorts();

        this.ref.logger.log(`[${this.logstring}] Mission accomplished, ${randomMessage}.`, LogTextColor.CYAN);
    }
}

module.exports = { mod: new SariaShop() };
