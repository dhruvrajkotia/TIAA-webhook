"use strict";

const createHash = require("hash-generator");
const appConstant = require("./constants");

module.exports = ()=>{
    return  createHash(appConstant.hashLength);
};