import { inject, injectable } from "tsyringe";
//Spt Classes
import type { VFS } from "@spt/utils/VFS";
//Custom Classes
import type { configFile, debugFile, seasonalProgression } from "../models/Interfaces";
//Modules
import * as path from "node:path";
import JSON5 from "json5";

@injectable()
export class ConfigManager {
    constructor(@inject("VFS") protected vfs: VFS) {}

    /**
     * Parses the main mod config using the configFile interface.
     *
     * @returns The parsed modConfig file for use.
     */
    public modConfig(): configFile {
        const modConfig = JSON5.parse(
            this.vfs.readFile(path.resolve(__dirname, "../../config/config.json5")),
        ) as configFile;

        return modConfig;
    }

    /**
     * Parses the debug config using the debugFile interface.
     *
     * @returns The parsed debugConfig file for use.
     */
    public debugConfig(): debugFile {
        const debugConfig = JSON5.parse(
            this.vfs.readFile(path.resolve(__dirname, "../utils/data/debugOptions.json5")),
        ) as debugFile;

        return debugConfig;
    }

    /**
     * Parses the season progression file using the seasonalProgression interface.
     *
     * @returns The parsed seasonalProgression file for use.
     */
    public seasonProgressionFile(): seasonalProgression {
        const seasonalProgressionFile = JSON5.parse(
            this.vfs.readFile(path.resolve(__dirname, `../utils/data/seasonsProgressionFile.json5`)),
        ) as seasonalProgression;

        return seasonalProgressionFile;
    }
}
