const convict = require("convict");

// precedence:
//  schema default (lowest)
//  file
//    /etc
//    ~/
//    ./
//  env
//  arg (highest)

const config = convict({
  something: {
    arg: "something",
    default: "default value",
    doc: "description",
    format: String,
    env: "SOMETHING"
  }
});

config.loadFile([
  "/etc/al.json",
  process.env("HOME") + "al.json",
  process.env("PWD") + "al.json"
]);

config.validate({ allowed: "warn" });

module.exports = config;
