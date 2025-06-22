const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No Token, Auth Denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role?.toLowerCase(); // normalize token role
    const allowedRoles = roles.map(r => r.toLowerCase()); // normalize route roles
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};