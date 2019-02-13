#!/usr/bin/env node

"use strict";

require("dotenv").config();

const cmd = require("commander");

const commandVal = require("../src/command-validate-auth.js");
const flags = require("../src/flags.js");
const main = require("../src/main.js");

cmd
  .description(
    "Manage AMI launch permissions"
  )
  .option(
    "-l, --loglevel <level>",
    "Set logging level {trace|debug|info|warn|error}",
    /^(trace|debug|info|warn|error)$/i,
    "error"
  )
  .version("1.0.0");

cmd
  .command("auth")
  .description("Test authentication via STS getCallerIdentity")
  .action(function() {
    commandVal.confirmCreds(cmd.loglevel);
  });

cmd
  .command("add")
  .description("Add missing account IDs to AMI permissions")
  .action(function() {
    main.flag = flags.ADD;
    main.doIt(cmd.loglevel);
  });

cmd
  .command("full")
  .description(
    "Both add and remove, account IDs to exactly match configuration"
  )
  .action(function() {
    main.flag = flags.ADD | flags.REMOVE;
    main.doIt(cmd.loglevel);
  });

cmd
  .command("remove")
  .description("Remove extra account IDs from AMI permissions")
  .action(function() {
    main.flag = flags.REMOVE;
    main.doIt(cmd.loglevel);
  });

cmd
  .command("*")
  .description("Invalid commands print help")
  .action(function() {
    cmd.help();
  });

cmd.parse(process.argv);
