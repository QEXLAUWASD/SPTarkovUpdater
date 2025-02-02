import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { addedCrafts } from "./crafts.js";


class ArenaLockboxMod implements IPostDBLoadMod 
{
    public postDBLoad(container: DependencyContainer): void 
    {
        // Init logger
        const logger = container.resolve<ILogger>("WinstonLogger");

        // Get database from server
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();

        let hideoutCrafts = tables.hideout.production.recipes;

        // Loop and add new crafts
        for (const newCraft of addedCrafts) 
        {
            const alreadyAdded = hideoutCrafts.find((i) => i._id === newCraft._id);
            if (!alreadyAdded) 
            {
                hideoutCrafts.push(newCraft);
            } 
            
            else 
            
            {
                hideoutCrafts = hideoutCrafts.filter(i => i._id !== newCraft._id);
                hideoutCrafts.push(newCraft);
            }
        }

        logger.info(`ALM: Added ${addedCrafts.length} new crafting recipes for Arena Lockboxes`);
    }
}

module.exports = { mod: new ArenaLockboxMod() };