"use strict";

const log = require("loglevel");

const amis = require("./amis.js");
const flags = require("./flags.js");

const flag = '';

function doIt(logLevel) {
  log.setLevel(logLevel, true);
  log.trace("main.doIt");
  log.info("Environment Variables:\n" + JSON.stringify(process.env) + "\n");

  const cfg = require("../al.json");

  log.info("Configuration File Contents:\n" + JSON.stringify(cfg) + "\n");

  loopOverJobs(cfg.jobs);
}

function loopOverJobs(jobs) {
  jobs.forEach(function(job) {
    log.debug("JOB:\n" + JSON.stringify(job));
    processJob(job);
  });
}

function processJob(job) {
  const amiIdsPromise = amis.fetchAmiIds(job.params);
  amiIdsPromise.then(
    function(amiIds) {
      if (!(amiIds.length > 0)) {
        return;
      } else {
        loopOverAmiIds(amiIds, job.accts);
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
  const fetchLaunchPermissionsPromise = amis.fetchLaunchPermissions(amiId);
  fetchLaunchPermissionsPromise.then(
    function(launchPermissions) {
      const targetLaunchPermissions = amis.buildLaunchPermission(
        amiId,
        launchPermissions,
        accts,
        flag
      );
      if (targetLaunchPermissions !== null) {
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