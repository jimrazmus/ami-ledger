# ami-ledger

[![CircleCI](https://circleci.com/gh/jimrazmus/ami-ledger/tree/master.svg?style=svg)](https://circleci.com/gh/jimrazmus/ami-ledger/tree/master) [![Known Vulnerabilities](https://snyk.io/test/github/jimrazmus/ami-ledger/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jimrazmus/ami-ledger?targetFile=package.json) [![CodeCov](https://codecov.io/gh/jimrazmus/ami-ledger/branch/master/graph/badge.svg)](https://codecov.io/gh/jimrazmus/ami-ledger) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=jimrazmus/ami-ledger)](https://dependabot.com)

## Usage

    Usage: al [options] [command]

    configures AMI sharing (launchPermissions) to a list of account IDs

    Options:
      -l, --loglevel <level>  Set logging level {trace|debug|info|warn|error} (default: "error")
      -V, --version           output the version number
      -h, --help              output usage information

    Commands:
      auth                    Test authentication via STS getCallerIdentity
      add                     Add missing account IDs to AMI permissions
      full                    Both add and remove, account IDs to exactly match configuration
      remove                  Remove extra account IDs from AMI permissions
      *                       Invalid commands print help
