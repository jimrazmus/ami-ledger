"use strict";

const AWS = require("aws-sdk/global");
const EC2 = require("aws-sdk/clients/ec2");

// AWS.config.update({ region: 'us-east-1' });
// AWS.config.update({ maxRetries: 5 });
// AWS.config.logger = console;

async function fetchAmiIds(params) {
  try {
    const ec2 = new AWS.EC2();
    const data = await ec2.describeImages(params).promise();
    const imageIds = [];

    data.Images.forEach(image => {
      imageIds.push(image.ImageId);
    });

    return imageIds;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function fetchLaunchPermissions(ami_id) {
  try {
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
  } catch (e) {
    console.log(e);
    return e;
  }
}

async function setLaunchPermissions(params) {
  try {
    const ec2 = new AWS.EC2();
    const data = await ec2.modifyImageAttribute(params).promise();
    return true;
  } catch (e) {
    console.log(e);
    return e;
  }
}

function buildLaunchPermission(ami_id, current, target) {
  const additions = target.filter(x => !current.includes(x));
  const removals = current.filter(x => !target.includes(x));

  if (additions.length == 0 && removals.length == 0) {
    return null;
  }

  const params = {
    ImageId: ami_id,
    LaunchPermission: {}
  };

  if (additions.length > 0) {
    const uniqAdditions = [...new Set(additions)];
    params.LaunchPermission.Add = [];
    uniqAdditions.forEach(element => {
      params.LaunchPermission.Add.push({
        UserId: element
      });
    });
  }

  if (removals.length > 0) {
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
