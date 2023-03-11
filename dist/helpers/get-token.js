"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/helpers/get-token.ts
var get_token_exports = {};
__export(get_token_exports, {
  getToken: () => getToken
});
module.exports = __toCommonJS(get_token_exports);
var getToken = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  return token;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getToken
});
