"use strict";

const ADD = 1 << 1;
const REMOVE = 1 << 2;

let _flag = 0;

function isAddSet() {
  if (_flag & ADD) {
    return true;
  } else {
    return false;
  }
}

function isRemoveSet() {
  if (_flag & REMOVE) {
    return true;
  } else {
    return false;
  }
}

function isAllSet() {
  if (isAddSet(_flag) && isRemoveSet(_flag)) {
    return true;
  } else {
    return false;
  }
}

function setFlag(value) {
  _flag = value;
}

module.exports = {
  isAddSet: isAddSet,
  isRemoveSet: isRemoveSet,
  isAllSet: isAllSet,
  setFlag: setFlag,
  ADD,
  REMOVE
};
