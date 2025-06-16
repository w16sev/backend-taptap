const express = require("express");
const cors = require("cors");
const encodePassword = require("./hash").encodePassword;
const app = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
  const { email, password } = req.body;

  if (email || password) {
    res.status(400).json({ message: "Email and password are required!" });
    return;
  }

  if (password.length < 8) {
    res
      .status(400)
      .json({ message: "Password length should be minimum 8 symbols!" });
    return;
  }

  if (users.find((user) => user.email === email)) {
    res.status(400).json({ message: "User with this email already exists!" });
    return;
  }

  res.status(201).json({ message: "Реєстрація успішна!" });
});
