import type { ITraderConfig, IUpdateTime } from "@spt/models/spt/config/ITraderConfig";
import type { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import type { References } from "../Refs/References";
import { type AssortUtils, TraderUtils } from "../Refs/Utils";
import { LL1 } from "./Items/LoyalLevel1";
import { LL2 } from "./Items/LoyalLevel2";
import { LL3 } from "./Items/LoyalLevel3";
import { LL4 } from "./Items/LoyalLevel4";

import * as baseJson from "../../db/base.json";

export class TraderData {
    mod: string;
    logstring: string;

    constructor(
        private traderConfig: ITraderConfig,
        private ref: References,
        private traderHelper: TraderUtils,
        private assortUtils: AssortUtils,
    ) {
        this.mod = "SariaShop";
        this.logstring = "Saria Shop";
    }

    public registerProfileImage() {
        const imageFilepath = `./${this.ref.preSptModLoader.getModPath(this.mod)}res`;

        this.ref.imageRouter.addRoute(baseJson.avatar.replace(".jpg", ""), `${imageFilepath}/Saria.jpg`);
    }

    public setupTraderUpdateTime() {
        const traderRefreshRecord: IUpdateTime = {
            traderId: baseJson._id,
            seconds: {
                min: 1800,
                max: 7200,
            },
        };
        this.traderConfig.updateTime.push(traderRefreshRecord);
    }

    public pushTrader() {
        this.traderHelper = new TraderUtils();
        this.traderHelper.addTraderToDb(baseJson, this.ref.tables, this.ref.jsonUtil);
    }

    public addTraderToLocales(
        tables: IDatabaseTables,
        fullName: string,
        firstName: string,
        nickName: string,
        location: string,
        description: string,
    ) {
        const locales = Object.values(tables.locales.global) as Record<string, string>[];
        for (const locale of locales) {
            locale[`${baseJson._id} FullName`] = fullName;
            locale[`${baseJson._id} FirstName`] = firstName;
            locale[`${baseJson._id} Nickname`] = nickName;
            locale[`${baseJson._id} Location`] = location;
            locale[`${baseJson._id} Description`] = description;
        }
    }

    public createAssorts() {
        const loyalLevel1 = new LL1(this.ref, this.assortUtils);
        const loyalLevel2 = new LL2(this.ref, this.assortUtils);
        const loyalLevel3 = new LL3(this.ref, this.assortUtils);
        const loyalLevel4 = new LL4(this.ref, this.assortUtils);

        loyalLevel1.createAssort1();
        loyalLevel2.createAssort2();
        loyalLevel3.createAssort3();
        loyalLevel4.createAssort4();
    }
}
