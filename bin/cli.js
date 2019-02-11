#!/usr/bin/env node

"use strict";

require("dotenv").config();

const cmd = require("commander");
const log = require("loglevel");

const amis = require("../src/amis.js");
const commandAdd = require("../src/command-add.js");
const commandRmv = require("../src/command-remove.js");
const commandVal = require("../src/command-validate-auth.js");

cmd
  .description('it does stuff')
  .option("-l, --loglevel <level>", "Set logging level", /^(trace|debug|info|warn|error)$/i, "error")
  .version("1.0.0");
  
cmd
  .command('auth')
  .description('Test authentication via STS getCallerIdentity')
  .action(function(){
    commandVal.confirmCreds(cmd.loglevel);
  });

cmd
  .command('add')
  .description('Add account IDs to AMI permissions')
  .action(function(){
    commandAdd.add(cmd.loglevel)
  });

cmd
  .command('remove')
  .description('Remove account IDs from AMI permissions')
  .action(function(){
    commandRmv.remove(cmd.loglevel)
  });

cmd.parse(process.argv);
