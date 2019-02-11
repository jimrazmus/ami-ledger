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

    return userIds;
  } catch (err) {
    log.error(err);
    return err;
  }
}

async function setLaunchPermissions(params) {
  try {
    log.trace("setLaunchPermissions");
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
  const additions = target.filter(x => !current.includes(x));
  const removals = current.filter(x => !target.includes(x));

  if (additions.length === 0 && removals.length === 0) {
    return null;
  }

  const params = {
    ImageId: ami_id,
    LaunchPermission: {}
  };

  if (additions.length > 0 && flags.isAddSet(flag)) {
    const uniqAdditions = [...new Set(additions)];
    params.LaunchPermission.Add = [];
    uniqAdditions.forEach(element => {
      params.LaunchPermission.Add.push({
        UserId: element
      });
    });
  }

  if (removals.length > 0 && flags.isRemoveSet(flag)) {
    const uniqRemovals = [...new Set(removals)];
    params.LaunchPermission.Remove = [];
    uniqRemovals.forEach(element => {
      params.LaunchPermission.Remove.push({
        UserId: element
      });
    });
  }

  return params;
}

module.exports = {
  buildLaunchPermission: buildLaunchPermission,
  fetchAmiIds: fetchAmiIds,
  fetchLaunchPermissions: fetchLaunchPermissions,
  setLaunchPermissions: setLaunchPermissions
};
