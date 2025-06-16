const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());
const port = 3000;
const users = [];
const { encodePassword } = require("./utils/encodePassword");
const { generateToken } = require("./utils/generateToken");
router.post("/sign-up", (req, res) => {
  const { email, password } = req.body;
  const id = Math.random().toString(36).substring(2, 9);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email is not required!" });
  }
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required!" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password length should be minimum 8 symbols!" });
  }
  const isUserCreated = users.find((user) => user.email === email);
  if (isUserCreated) {
    return res.status(400).json({ message: "Users already exists" });
  }
  const encodingPassword = encodePassword(password);
  users.push({ email, encodingPassword });

  return res
    .status(200)
    .json({ message: "user created successfully", user: id });
});
router.post("/sign-in", (req, res) => {
  const { email, password } = req.body;
  const id = Math.random().toString(36).substring(2, 9);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email is not required!" });
  }
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required!" });
  }
  const isUserCreated = users.find((user) => user.email === email);
  if (!isUserCreated) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res
    .status(200)
    .json({ message: "user created successfully", user: id });
});
module.exports = router;
