const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const upgrades = require("./upgrades");
const auth = require("./auth");
const balance = require("./balance");

app.use(express.json());

app.use("/auth", auth);
app.use("/", balance);

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});
