import { DependencyContainer } from "tsyringe";

import { IPostSptLoadMod } from "@spt/models/external/IPostSptLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { BaseClasses } from "@spt/models/enums/BaseClasses";
import ConfigFile from "../config/settings.json"

class Mod implements IPostSptLoadMod
{
    public postSptLoad(container: DependencyContainer): void
    {}

	public async postDBLoadAsync(container: DependencyContainer)
    {}
	
}

export const mod = new Mod();
