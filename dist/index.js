"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/index.ts
var import_express3 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));

// src/config/db.ts
var import_mongoose = __toESM(require("mongoose"));
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
import_mongoose.default.set("strictQuery", false);
async function main() {
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASS;
  await import_mongoose.default.connect(`mongodb+srv://${dbUser}:${dbPassword}@emeralddatabase.fmkyh8d.mongodb.net/?retryWrites=true&w=majority`);
  console.log("Banco de dados conectado com sucesso!");
}
main().catch((err) => console.log(err));

// src/routes/userRoutes.ts
var import_express = require("express");

// src/entities/user.ts
var import_mongoose2 = require("mongoose");
var user = new import_mongoose2.Schema({
  name: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true }
});
var User = (0, import_mongoose2.model)("user", user);

// src/helpers/create-user-token.ts
var import_dotenv2 = require("dotenv");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
(0, import_dotenv2.config)();
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

// src/routes/expanseRoutes.ts
var import_express2 = require("express");

// src/entities/expanse.ts
var import_mongoose3 = require("mongoose");
var expanse = new import_mongoose3.Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  expanseType: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: false },
  userId: { type: String, required: true }
}, {
  timestamps: true
});
var Expanse = (0, import_mongoose3.model)("expanse", expanse);

// src/helpers/get-token.ts
var getToken = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  return token;
};

// src/helpers/get-user-by-token.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var import_dotenv3 = require("dotenv");
(0, import_dotenv3.config)();
var getUserByToken = async (token, res) => {
  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  const secret = process.env.TOKEN;
  const decoded = import_jsonwebtoken2.default.verify(token, secret);
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
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));
var import_dotenv4 = require("dotenv");
(0, import_dotenv4.config)();
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
    const verified = import_jsonwebtoken3.default.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Token inv\xE1lido!" });
  }
};

// src/routes/expanseRoutes.ts
var expanseRoutes = (0, import_express2.Router)();
expanseRoutes.post("/register/expanse", verifyToken, registerExpanse);
expanseRoutes.get("/expanses/:id", verifyToken, searchUserExpanses);
expanseRoutes.get("/expanses", verifyToken, fetchUserExpansesById);
expanseRoutes.patch("/expanses/:id", verifyToken, updateUserExpanse);
expanseRoutes.delete("/expanses/:id", verifyToken, removeUserExpanse);
expanseRoutes.get("/expanse/search/:id", verifyToken, searchOneExpanse);

// src/index.ts
var app = (0, import_express3.default)();
var port = process.env.PORT || 3e3;
app.use(import_express3.default.json());
app.use((0, import_cors.default)());
app.use("/", userRoutes);
app.use("/", expanseRoutes);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
