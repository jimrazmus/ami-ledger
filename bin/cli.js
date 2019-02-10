#!/usr/bin/env node

"use strict";

require("dotenv").config();

const cmd = require("commander");
const log = require("loglevel");

const amis = require("../src/amis.js");

cmd
  .description('it does stuff')
  .option("-l, --loglevel <level>", "Set logging level", /^(trace|debug|info|warn|error)$/i, "error")
  .version("1.0.0");

cmd.parse(process.argv);
