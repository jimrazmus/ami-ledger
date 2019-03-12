"use strict";

const Ajv = require("ajv");
const ajv = Ajv({ allErrors: true });
const fs = require("fs");
const log = require("loglevel");
const os = require("os");
const pqueue = require("p-queue");

const amis = require("./amis.js");
const flags = require("./flags.js");
const schema = require("./schema.js");

const flag = "";
const pq = new pqueue({ concurrency: 10, intervalCap: 250, interval: 1000 });

function doIt(logLevel) {
  log.setLevel(logLevel, true);
  log.trace("main.doIt");
  log.info("Environment Variables:\n" + JSON.stringify(process.env) + "\n");

  var cfg = "";

  if (fs.existsSync("./aam.json")) {
    cfg = JSON.parse(fs.readFileSync("./aam.json"));
  } else if (fs.existsSync(os.homedir() + "/aam.json")) {
    cfg = JSON.parse(fs.readFileSync(os.homedir() + "/aam.json"));
  } else if (fs.existsSync("/etc/aam.json")) {
    cfg = JSON.parse(fs.readFileSync("/etc/aam.json"));
  } else {
    log.warn("No valid configuration file found.");
    process.exit(1);
  }

  log.info("Configuration File Contents:\n" + JSON.stringify(cfg) + "\n");

  loopOverJobs(cfg.jobs);
}

function loopOverJobs(jobs) {
  jobs.forEach(function(job) {
    log.debug("JOB:\n" + JSON.stringify(job));
    if (ajv.validate(schema.describeImagesSchema, job.query)) {
      processJob(job);
    } else {
      log.error(
        "Invalid query.\nReference: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeImages.html\n" +
          JSON.stringify(job.query)
      );
    }
  });
}

function processJob(job) {
  pq.add(() => amis.fetchAmiIds(job.query)).then(
    function(amiIds) {
      if (!(amiIds.length > 0)) {
        return;
      } else {
        loopOverAmiIds(amiIds, job.accounts);
      }
    },
    function(err) {
      log.error("processJob Error:\n" + err);
    }
  );
}

function loopOverAmiIds(amiIds, accts) {
  amiIds.forEach(function(amiId) {
    log.debug("loopOverAmiIds");
    processAmi(amiId, accts);
  });
}

function processAmi(amiId, accts) {
  pq.add(() => amis.fetchLaunchPermissions(amiId)).then(
    function(launchPermissions) {
      const targetLaunchPermissions = amis.buildLaunchPermission(
        amiId,
        launchPermissions,
        accts,
        flag
      );
      if (
        ajv.validate(schema.modifyImageAttributeSchema, targetLaunchPermissions)
      ) {
        const setLaunchPermissionsPromise = amis.setLaunchPermissions(
          targetLaunchPermissions
        );
        setLaunchPermissionsPromise.then(
          function(result) {
            log.info(
              "Set " +
                amiId +
                " perimissions to " +
                JSON.stringify(targetLaunchPermissions) +
                "\n"
            );
          },
          function(err) {
            log.error("setLaunchPermissions Error:\n" + err);
          }
        );
      }
    },
    function(err) {
      log.error("fetchLaunchPermissions Error:\n" + err);
    }
  );
}

module.exports = {
  doIt: doIt,
  flag
};
