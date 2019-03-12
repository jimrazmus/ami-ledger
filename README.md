# ami-access-manager

[![CircleCI](https://circleci.com/gh/jimrazmus/ami-access-manager/tree/master.svg?style=svg)](https://circleci.com/gh/jimrazmus/ami-access-manager/tree/master)
[![CodeCov](https://codecov.io/gh/jimrazmus/ami-access-manager/branch/master/graph/badge.svg)](https://codecov.io/gh/jimrazmus/ami-access-manager)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5985d326133248d483bd8d7e1105979a)](https://www.codacy.com/app/jim.razmus/ami-access-manager?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jimrazmus/ami-access-manager&amp;utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/github/jimrazmus/ami-access-manager/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jimrazmus/ami-access-manager?targetFile=package.json)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=jimrazmus/ami-access-manager)](https://dependabot.com)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

## Summary

Easily manage the launch permissions on thousands of your Amazon Machine Images (AMI). You define the queries that identify your AMIs along with the list of account IDs that should have launch permissions and AMI Access Manager will make it happen.

## Documentation

Detailed documentation is available at [https://jimrazmus.github.io/ami-access-manager/](https://jimrazmus.github.io/ami-access-manager/)

## Install

    #> npm install -g @jimrazmus/ami-access-manager

## Setup

1. Confirm you have the appropriate [Amazon permissions](https://jimrazmus.github.io/ami-access-manager/)
1. Create a [configuration file](https://jimrazmus.github.io/ami-access-manager/)

## Usage

    Usage: aam [options] [command]

    Manage AMI launch permissions

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

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Author

Jim Razmus II

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
