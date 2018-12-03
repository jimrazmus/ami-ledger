"use strict";

const array = require("lodash/array");

function difference(arr1, arr2) {
  return arr1.filter(x => !arr2.includes(x));
}

function intersection(arr1, arr2) {
  return arr1.filter(x => arr2.includes(x));
}
