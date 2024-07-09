const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = User.findById(decoded.userId);
  if(!user) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  req.authInfo = decoded;
  next();
};

module.exports = authenticate;
