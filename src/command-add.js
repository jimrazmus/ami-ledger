"use strict";

const log = require("loglevel");

const amis = require("./amis.js");

function add(logLevel) {
  log.setLevel(logLevel, true);
  log.trace("add");

  const cfg = require("../../al.json");

  log.debug("CONF File Contents\n" + JSON.stringify(cfg));
  log.debug("Environment:\n" + JSON.stringify(process.env));

  cfg.jobs.forEach(function(job) {
    log.debug("JOB:\n" + JSON.stringify(job));
    const amiIds = amis.fetchAmiIds(job.params);
    if (!(amiIds.length > 0)) {
      return;
    } else {
      log.debug("amiIds: " + JSON.stringify(amiIds));
    }
    amiIds.foreach(function(amiId) {
      log.debug("amiIds.forEach");
      const launchPermissions = amis.fetchLaunchPermissions(amId);
      const targetPermissions = amis.buildLaunchPermission(
        amiId,
        launchPermissons,
        job.accts
      );
      if (targetLaunchPermissions !== null) {
        const result = amis.setLaunchPermissions(targetPermissions);
        if (result) {
          log.debug(
            "Set permissions on " +
              amiId +
              " to " +
              JSON.stringify(targetPermissions) +
              "\n"
          );
        }
      }
    });
  });
}

module.exports = { add: add };
