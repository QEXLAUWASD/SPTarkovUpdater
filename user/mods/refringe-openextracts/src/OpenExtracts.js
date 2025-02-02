"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExtractAdjuster_1 = require("./adjusters/ExtractAdjuster");
const ConfigServer_1 = require("./servers/ConfigServer");
/**
 * The main class of the OpenExtracts mod.
 */
class OpenExtracts {
    logger;
    config = null;
    /**
     * Handle loading the configuration file and registering our custom MatchCallbacks class.
     * Runs before the database is loaded.
     */
    preSptLoad(container) {
        this.logger = container.resolve("WinstonLogger");
        // Load and validate the configuration file.
        try {
            this.config = new ConfigServer_1.ConfigServer().loadConfig().validateConfig().getConfig();
        }
        catch (error) {
            this.config = null; // Set the config to null so we know it's failed to load or validate.
            this.logger.log(`OpenExtracts: ${error.message}`, "red");
        }
        // Set a flag so we know that we shouldn't continue when the postDBLoad method fires... just setting the config
        // back to null should do the trick. Use optional chaining because we have not yet checked if the config is
        // loaded and valid yet.
        if (this.config?.general?.enabled === false) {
            this.config = null;
            this.logger.log("OpenExtracts is disabled in the config file.", "red");
        }
        // If the configuration is null at this point we can stop here.
        if (this.config === null) {
            return;
        }
    }
    /**
     * Trigger the changes to extracts once the database has loaded.
     */
    postDBLoad(container) {
        // If the configuration is null at this point we can stop here. This will happen if the configuration file
        // failed to load, failed to validate, or if the mod is disabled in the configuration file.
        if (this.config === null) {
            return;
        }
        // Modify the extracts based on the configuration.
        new ExtractAdjuster_1.ExtractAdjuster(container, this.config).makeAdjustments();
    }
}
module.exports = { mod: new OpenExtracts() };
//# sourceMappingURL=OpenExtracts.js.map