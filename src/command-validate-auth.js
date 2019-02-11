"use strict";

const AWS = require("aws-sdk");
const log = require("loglevel");

AWS.config.logger = log;

async function confirmCreds(logLevel) {
  try {
    log.setLevel(logLevel, true);
    log.trace("confirmCreds");
    const sts = new AWS.STS();
    const data = await sts.getCallerIdentity({}).promise();
    log.debug("data: " + JSON.stringify(data));
    console.log("Authentication Successful");
    return data;
  } catch (err) {
    log.error(err);
    console.log("Authentication Failed");
    return null;
  }
}

module.exports = { confirmCreds: confirmCreds };
