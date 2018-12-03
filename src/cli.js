#!/usr/bin/env node

"use strict";

const program = require("commander");

program
  .version("1.0.0")
  .option("-f, --filter", "AMI filter string")
  .option("-r, --region", "AWS Region")
  .option("-a, --accounts <ids>", "List of account ids")
  .command("add", "only add account ids")
  .command("del", "only delete accounts ids")
  .command("list", "lists account ids")
  .parse(process.argv);

//if (!program.args.length) program.help();

// for each config tuple
// if region match
//   for each ami matching filter
// amis.array.forEach(element => {

// });
//     describeImageAttributes
//     DO array comparisons
//       use array.foreach(function acct_add(number))
//       use array.foreach(function acct_del(number))
//     modifyImageAttribute as necessary

// const main = async () => {
//   // do something
//   process.exit(0);
// };

// main();

console.log("Testing...");
process.exit(0);
