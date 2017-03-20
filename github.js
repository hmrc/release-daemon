const chalk = require("chalk");
const config = require("./config").getConfig();
const q = require("q");
const request = require("request");

function authenticate(request)
{
    request.auth(config.githubUsername, config.githubAccessToken)
}

const gitTagsCache = {};

module.exports =
{
    hasAccessToken: function ()
    {
        return !!config.githubAccessToken;
    },

    getTags: function (repositoryName)
    {
        console.log(`Getting git tags from repository "${repositoryName}".`);

        const deferred = q.defer();

        if (gitTagsCache[repositoryName])
        {
            deferred.resolve(gitTagsCache[repositoryName]);
        }
        else
        {
            const requestComplete = (error, response, data) =>
            {
                if (error || response.statusCode !== 200)
                {
                    const message = "The request to get tags for repository has failed.";
                    console.error(chalk.red(message));

                    deferred.reject(message);
                }
                else
                {
                    console.log(chalk.green("Success."));
                    gitTagsCache[repositoryName] = JSON.parse(data);
                    deferred.resolve(gitTagsCache[repositoryName]);
                }
            };

            const options =
            {
                url: `${config.githubApiUrl}repos/hmrc/${repositoryName}/tags`,
                headers:
                {
                    "Content-Type": "application/json"
                }
            };

            authenticate(request.get(options, requestComplete));
        }

        return deferred.promise;
    },

    testAuthentication: function ()
    {
        function requestComplete(error, response)
        {
            if (error || response.statusCode !== 200)
            {
                const message = "Github authentication was unsuccessful.";
                console.error(chalk.red(message));

                deferred.reject(message);
            }
            else
            {
                console.log(chalk.green("Success."));
                deferred.resolve();
            }
        }

        console.log("Testing Github authentication.");

        const deferred = q.defer();
        authenticate(request.get(`${config.githubApiUrl}orgs/hmrc`, requestComplete));
        return deferred.promise;
    }

};