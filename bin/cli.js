#!/usr/bin/env node

"use strict";

require("dotenv").config();

const cmd = require("commander");
const log = require("loglevel");

const amis = require("../src/amis.js");
const commandAdd = require("../src/command-add.js");

cmd
  .description('it does stuff')
  .option("-l, --loglevel <level>", "Set logging level", /^(trace|debug|info|warn|error)$/i, "error")
  .version("1.0.0");

cmd
  .command('add')
  .description('Add account IDs to AMI permissions')
  .action(function(){
    commandAdd.add(cmd.loglevel)
  });

cmd.parse(process.argv);
