"use strict";

const amis = require("../amis.js");

const awsAcctId = process.env.AWS_ACCT_ID;
const dummyAmiID = process.env.DUMMY_AMI_ID;

test("fetchAmiIds returns one element array", async () => {
  expect.assertions(1);

  const params = {
    Owners: ["amazon"],
    Filters: [
      {
        Name: "name",
        Values: [
          "aws-elasticbeanstalk-amzn-2015.03.0.x86_64-tomcat8java8-hvm-201507300439"
        ]
      }
    ]
  };

  const ids = await amis.fetchAmiIds(params);
  expect(ids).toEqual(["ami-0d61c466"]);
});

test("fetchAmiIds returns multiple element array", async () => {
  expect.assertions(1);

  const params = {
    Owners: ["amazon"],
    Filters: [
      {
        Name: "name",
        Values: [
          "aws-elasticbeanstalk-amzn-2015.03.0.x86_64-tomcat8java8-hvm-*"
        ]
      }
    ]
  };

  const ids = await amis.fetchAmiIds(params);
  expect(ids).toEqual([
    "ami-0c6f5f64",
    "ami-0d61c466",
    "ami-3332c258",
    "ami-51933f3a",
    "ami-643c220c",
    "ami-68969100",
    "ami-ffa1d79a"
  ]);
});

test("fetchAmiIds returns empty array", async () => {
  expect.assertions(1);

  const params = {
    Owners: ["amazon"],
    Filters: [
      {
        Name: "name",
        Values: ["aws-DOESNOTEXIST"]
      }
    ]
  };

  const ids = await amis.fetchAmiIds(params);
  expect(ids).toEqual([]);
});

test("fetchLaunchPermissions returns true", async () => {
  expect.assertions(1);
  const uids = await amis.fetchLaunchPermissions(dummyAmiID);
  expect(uids).toEqual([awsAcctId]);
});

test("setLaunchPermissions returns empty array", () => {
  expect(amis.setLaunchPermissions("", "")).toEqual(true);
});
