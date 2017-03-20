const config = require("../config").getConfig();
const path = require("path");
const spawn = require("child_process").spawn;

function runOnce()
{
    // Must be spawned because of fucking caching I've implemented ...
    // It doesn't clear out on the consecutive runs
    spawn("node", [ path.join(__dirname, "single.js") ], { stdio: "inherit" });
}

setInterval(runOnce, config.updateTime);
runOnce();