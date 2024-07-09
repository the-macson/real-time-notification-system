const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if(!username || !email || !password) {
    return res.status(400).send({ error: "All fields are required" });
  }
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).send({ error: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.send({ token });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

module.exports = { register, login };
