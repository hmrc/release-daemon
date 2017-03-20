const fs = require("fs");

let configCache = null;

module.exports =
{
    getConfig: function()
    {
        if (!configCache)
        {
            configCache = JSON.parse(fs.readFileSync("config.json", "utf8"));
        }

        return configCache;
    },

    saveConfig: function(config)
    {
        configCache = config;

        let configString = JSON.stringify(config);
        fs.writeFileSync("config.json", configString);
    }
};