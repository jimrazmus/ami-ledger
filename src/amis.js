"use strict";

const AWS = require("aws-sdk");
const log = require("loglevel");

const flags = require("./flags.js");

AWS.config.logger = log;

async function fetchAmiIds(params) {
  try {
    log.trace("fetchAmiIds");
    log.debug("AWS.config: " + JSON.stringify(AWS.config));

    const ec2 = new AWS.EC2();
    const data = await ec2.describeImages(params).promise();
    const imageIds = [];

    data.Images.forEach(image => {
      imageIds.push(image.ImageId);
      log.trace("AMI:" + image.ImageId + "-" + image.Name + "\n");
    });

    return imageIds;
  } catch (err) {
    log.error(err);
    return err;
  }
}

async function fetchLaunchPermissions(ami_id) {
  try {
    log.trace("fetchLaunchPermissions");
    const ec2 = new AWS.EC2();
    const params = {
      Attribute: "launchPermission",
      ImageId: ami_id
    };
    const data = await ec2.describeImageAttribute(params).promise();
    const userIds = [];

    data.LaunchPermissions.forEach(launchPermission => {
      userIds.push(launchPermission.UserId);
    });

    log.trace(userIds.sort());
    
    return userIds;
  } catch (err) {
    log.error(err);
    return err;
  }
}

async function setLaunchPermissions(params) {
  try {
    log.trace("setLaunchPermissions");
    log.trace(JSON.stringify(params));
    const ec2 = new AWS.EC2();
    const data = await ec2.modifyImageAttribute(params).promise();
    return true;
  } catch (err) {
    log.error(err);
    return err;
  }
}

function buildLaunchPermission(ami_id, current, target, flag) {
  log.trace("buildLaunchPermissions");
  log.info(ami_id);
  const additions = [...new Set(target.filter(x => !current.includes(x)))];
  const removals = [...new Set(current.filter(x => !target.includes(x)))];
  log.trace("current\n" + current);
  log.trace("target\n" + target);
  log.trace("additions:" + additions.length + "\n" + additions);
  log.trace("removals:" + removals.length + "\n" + removals);

  if (additions.length === 0 && removals.length === 0) {
    return null;
  }

  const params = {
    ImageId: ami_id,
    LaunchPermission: {}
  };

  if (flags.isAddSet() && additions.length > 0) {
    params.LaunchPermission.Add = [];
    additions.forEach(element => {
      params.LaunchPermission.Add.push({
        UserId: element
      });
    });
  }

  if (flags.isRemoveSet() && removals.length > 0) {
    params.LaunchPermission.Remove = [];
    removals.forEach(element => {
      params.LaunchPermission.Remove.push({
        UserId: element
      });
    });
  }

  if (params.LaunchPermission === {}) {
    return null;
  }

  return params;
}

module.exports = {
  buildLaunchPermission: buildLaunchPermission,
  fetchAmiIds: fetchAmiIds,
  fetchLaunchPermissions: fetchLaunchPermissions,
  setLaunchPermissions: setLaunchPermissions
};
