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

// src/entities/expanse.ts
var expanse_exports = {};
__export(expanse_exports, {
  Expanse: () => Expanse
});
module.exports = __toCommonJS(expanse_exports);
var import_mongoose = require("mongoose");
var expanse = new import_mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  expanseType: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: false },
  userId: { type: String, required: true }
}, {
  timestamps: true
});
var Expanse = (0, import_mongoose.model)("expanse", expanse);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Expanse
});
