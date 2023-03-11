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

// src/routes/userRoutes.ts
var userRoutes_exports = {};
__export(userRoutes_exports, {
  userRoutes: () => userRoutes
});
module.exports = __toCommonJS(userRoutes_exports);
var import_express = require("express");

// src/entities/user.ts
var import_mongoose = require("mongoose");
var user = new import_mongoose.Schema({
  name: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true }
});
var User = (0, import_mongoose.model)("user", user);

// src/helpers/create-user-token.ts
var import_dotenv = require("dotenv");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
(0, import_dotenv.config)();
var createUserToken = async (user2, req, res) => {
  const secret = process.env.TOKEN;
  const token = import_jsonwebtoken.default.sign({
    name: user2.name,
    id: user2._id
  }, secret);
  res.status(200).json({ message: "Usu\xE1rio autenticado com sucesso!", token, id: user2._id });
};

// src/use-cases/userController.ts
var import_bcrypt = __toESM(require("bcrypt"));
var registerUser = async (req, res) => {
  const { name, login, password, confirmPassword } = req.body;
  if (!name || !login || !password || !confirmPassword) {
    return res.status(422).json({ message: "Por favor preencha todos os campos!" });
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ message: "as senhas divergem" });
  }
  const userExists = await User.findOne({ login });
  if (userExists) {
    return res.status(422).json({ message: "Este e-mail j\xE1 est\xE1 cadastrado!" });
  }
  const salt = await import_bcrypt.default.genSalt(12);
  const hashPassword = await import_bcrypt.default.hash(password, salt);
  const user2 = new User({
    name,
    login,
    password: hashPassword
  });
  try {
    await user2.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Algo deu errado. Tente novamente mais tarde!" });
  }
  await createUserToken(user2, req, res);
};
var loginUser = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(422).json({ message: "Por favor preencha todos os campos!" });
  }
  const user2 = await User.findOne({ login });
  if (!user2) {
    return res.status(404).json({ message: "Usu\xE1rio n\xE3o cadastrado" });
  }
  const checkIfPasswordMatch = await import_bcrypt.default.compare(password, user2.password);
  if (!checkIfPasswordMatch) {
    return res.status(422).json({ message: "Senha ou login inv\xE1lidos!" });
  }
  await createUserToken(user2, req, res);
};

// src/routes/userRoutes.ts
var userRoutes = (0, import_express.Router)();
userRoutes.get("/", (req, res) => {
  res.status(200).json({ message: "Sucesso!" });
});
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRoutes
});
