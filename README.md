
# Release Daemon
[![Build Status](https://travis-ci.org/hmrc/release-daemon.svg?branch=master)](https://travis-ci.org/hmrc/release-daemon) [ ![Download](https://api.bintray.com/packages/hmrc/releases/release-daemon/images/download.svg) ](https://bintray.com/hmrc/releases/release-daemon/_latestVersion)

This tool has been made to automate the deployment process. It eliminates the need for every developer to trigger builds on ci-build.
Each build completed on ci-dev will be built on ci-build.


## Configuration requirements
Here's the list of things that the tool has to have access to:
- CI-DEV - checking built projects
- Github.com - checking git tags
- Github Enterprise - checking git tags
- CI-BUILD - checking currently running and scheduled projects; staring new builds
- List of projects to monitor


## Algorithm

This is the text description of algorithm used by the tool.
- Get list of all last builds for every project from projects list (CI-DEV)
- Using a locally stored file with all successful versions (used as a cache) remove projects which are considered built
- For each project using the commit tag:
    * Look for a release tag in github.
    * If has release tag -> skip project
- For all projects with builds without release tags (max. once for each project):
    * Obtain list of scheduled builds (CI-BUILD)
    * Filter the list of not-built commits and remove the ones which are already scheduled
    * Schedule remaining commit numbers
- Update the cache with versions known to be successfully build (which have release tags).

## Getting Started

- Edit `config.json`, add API URLs for appropriate services, usernames and credentials/keys
- Run `npm install` from the base of the project
- Run ./start.sh to begin

### License

This code is open source software licensed under the [Apache 2.0 License]("http://www.apache.org/licenses/LICENSE-2.0.html").
    
