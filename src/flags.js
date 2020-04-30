"use strict";

const ADD = 1 << 1;
const REMOVE = 1 << 2;

function isAddSet(flag) {
  if (flag & ADD) {
    return true;
  } else {
    return false;
  }
}

function isRemoveSet(flag) {
  if (flag & REMOVE) {
    return true;
  } else {
    return false;
  }
}

function isAllSet(flag) {
  if (isAddSet(flag) && isRemoveSet(flag)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  isAddSet: isAddSet,
  isRemoveSet: isRemoveSet,
  isAllSet: isAllSet,
  ADD,
  REMOVE,
};
