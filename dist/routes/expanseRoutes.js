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

// src/routes/expanseRoutes.ts
var expanseRoutes_exports = {};
__export(expanseRoutes_exports, {
  expanseRoutes: () => expanseRoutes
});
module.exports = __toCommonJS(expanseRoutes_exports);
var import_express = require("express");

// src/entities/expanse.ts
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

// src/helpers/get-token.ts
var getToken = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  return token;
};

// src/helpers/get-user-by-token.ts
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

// src/use-cases/expanseController.ts
var registerExpanse = async (req, res) => {
  const { amount, type, expanseType, date, description } = req.body;
  if (!amount || !type || !date || !expanseType) {
    return res.status(422).json({ message: "Por favor preencha todos os campos!" });
  }
  const token = getToken(req);
  const objectUser = getUserByToken(token, res);
  const id = (await objectUser).valueOf();
  const expanse2 = new Expanse({
    amount,
    date,
    type,
    expanseType,
    description,
    userId: id.id
  });
  try {
    await expanse2.save();
    return res.status(201).json({ message: "sucesso!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde!" });
  }
};
var searchUserExpanses = async (req, res) => {
  const id = req.params.id;
  const token = getToken(req);
  const userToken = getUserByToken(token, res);
  const userData = (await userToken).valueOf();
  const userIdToken = userData.id;
  if (id !== userIdToken) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  const userExpanses = await Expanse.find({ userId: id });
  try {
    return res.status(200).json({ data: userExpanses });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde!" });
  }
};
var updateUserExpanse = async (req, res) => {
  const id = req.params.id;
  const { amount, type, date, description } = req.body;
  if (!amount || !type || !date) {
    return res.status(422).json({ message: "Por favor preencha todos os campos!" });
  }
  const token = getToken(req);
  const userToken = getUserByToken(token, res);
  const userData = (await userToken).valueOf();
  const userIdToken = userData.id;
  const idTokenChecked = await Expanse.findOne({ userId: userIdToken });
  if (!idTokenChecked) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  try {
    await Expanse.updateOne({ _id: id, userId: userIdToken }, { amount, type, date, description });
    return res.status(200).json({ message: "Dados atualizados com sucesso!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde!" });
  }
};
var removeUserExpanse = async (req, res) => {
  const id = req.params.id;
  const token = getToken(req);
  const userToken = getUserByToken(token, res);
  const userData = (await userToken).valueOf();
  const userIdToken = userData.id;
  const idTokenChecked = await Expanse.findOne({ userId: userIdToken });
  if (!idTokenChecked) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  try {
    await Expanse.deleteOne({ _id: id, userId: userIdToken });
    return res.status(200).json({ message: "Dados deletados com sucesso!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde!" });
  }
};
var fetchUserExpansesById = async (req, res) => {
  const token = getToken(req);
  const userToken = getUserByToken(token, res);
  const userData = (await userToken).valueOf();
  const userIdToken = userData.id;
  const idTokenChecked = await Expanse.findOne({ userId: userIdToken });
  if (!idTokenChecked) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  try {
    const data = await Expanse.find({ userId: userIdToken }).sort({ createdAt: -1 });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde!" });
  }
};
var searchOneExpanse = async (req, res) => {
  const id = req.params.id;
  const token = getToken(req);
  const userToken = getUserByToken(token, res);
  const userData = (await userToken).valueOf();
  const userIdToken = userData.id;
  const idTokenChecked = await Expanse.findOne({ userId: userIdToken });
  if (!idTokenChecked) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  try {
    const data = await Expanse.findOne({ _id: id });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde!" });
  }
};

// src/helpers/verify-token.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var import_dotenv2 = require("dotenv");
(0, import_dotenv2.config)();
var verifyToken = (req, res, next) => {
  const secret = process.env.TOKEN;
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  const token = getToken(req);
  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  try {
    const verified = import_jsonwebtoken2.default.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Token inv\xE1lido!" });
  }
};

// src/routes/expanseRoutes.ts
var expanseRoutes = (0, import_express.Router)();
expanseRoutes.post("/register/expanse", verifyToken, registerExpanse);
expanseRoutes.get("/expanses/:id", verifyToken, searchUserExpanses);
expanseRoutes.get("/expanses", verifyToken, fetchUserExpansesById);
expanseRoutes.patch("/expanses/:id", verifyToken, updateUserExpanse);
expanseRoutes.delete("/expanses/:id", verifyToken, removeUserExpanse);
expanseRoutes.get("/expanse/search/:id", verifyToken, searchOneExpanse);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  expanseRoutes
});
