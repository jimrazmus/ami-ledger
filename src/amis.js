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
  } catch (e) {
    console.log(e);
    return e;
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

function setLaunchPermissions(ami_id, params) {
  return true;
  // var params = {
  //     ImageId: "ami-5731123e",
  //     LaunchPermission: {
  //         Add: [
  //             {
  //                 UserId: "123456789012"
  //             }
  //         ]
  //         Remove: [
  //             {
  //                 UserId: "123456789012"
  //             }
  //         ]
  //     }
  // };

  // Consider supporting the OperationType parameter to select adding or removing
  //   launch permissions instead of both.
  // Consider supporting the DryRun parameter.
}

function buildLauchPermission(ami_id,current,target) {
  const additions = target.filter(x => !current.includes(x));
  const removals = current.filter(x => !target.includes(x));

  if (additions.length == 0 && removals.length == 0) {
    return null;
  }

  const params = {
    ImageId: ami_id,
    LaunchPermission: {}
  }

  if (additions.length > 0) {
    params.LaunchPermission.Add = [...new Set(additions)];
  }

  if (removals.length > 0) {
    params.LaunchPermission.Remove = [...new Set(removals)];
  }

  return params;
}

module.exports = {
  buildLauchPermission: buildLauchPermission,
  fetchAmiIds: fetchAmiIds,
  fetchLaunchPermissions: fetchLaunchPermissions,
  setLaunchPermissions: setLaunchPermissions
};
