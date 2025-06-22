const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Registration API

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All Fields Are Required." });
  }

  const hash = bcrypt.hashSync(password, 10);
  const query = "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)";

  db.query(query, [name, email, hash, role], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Email Already Registered." });
      }
      return res.status(500).json({ message: "Database Error", error: err });
    }

    res.status(201).json({ message: "User Registered Successfully." });
  });
};

//Login API
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email =?";
  db.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "DB Error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const user = result[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials." });
    }

    const normalizedRole = user.role.toLowerCase();

    const token = jwt.sign(
      { id: user.id, role: normalizedRole },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login Successfully.",
      token,
      role: user.role,
      user: {
        id: user.id,
        name: user.name,
      },
    });
  });
};
