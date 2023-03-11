"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/helpers/get-user-by-token.ts
var get_user_by_token_exports = {};
__export(get_user_by_token_exports, {
  getUserByToken: () => getUserByToken
});
module.exports = __toCommonJS(get_user_by_token_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var getUserByToken = async (token, res) => {
  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  const secret = process.env.TOKEN;
  const decoded = import_jsonwebtoken.default.verify(token, secret);
  return decoded;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUserByToken
});
