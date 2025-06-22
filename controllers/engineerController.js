const db = require("../config/db");

exports.getAllEngineers = (req, res) => {
  const query = `SELECT engineers.id, users.name, users.email, users.role,engineers.skills,     engineers.capacity_hr
                 FROM engineers
                 JOIN users ON engineers.user_id = users.id`;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.getEngineerById = (req, res) => {
  const query = `SELECT engineers.id, users.name, users.email, users.role
                 FROM engineers
                 JOIN users ON engineers.user_id = users.id
                 WHERE engineers.id = ?`;

  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Engineer not found" });
    res.json(result[0]);
  });
};

exports.createEngineer = (req, res) => {
  const { name, email, role, skills = "", capacity_hr = 0 } = req.body;

  const createUserQuery =
    "INSERT INTO users (name, email, role) VALUES (?, ?, ?)";
  db.query(createUserQuery, [name, email, role], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const user_id = result.insertId;

    const createEngineerQuery =
      "INSERT INTO engineers (user_id, skills, capacity_hr) VALUES (?, ?, ?)";
    db.query(
      createEngineerQuery,
      [user_id, skills, capacity_hr],
      (err2, result2) => {
        if (err2) return res.status(500).json({ error: err2 });

        res.status(201).json({
          id: result2.insertId,
          name,
          email,
          role,
          skills,
          capacity_hr,
        });
      }
    );
  });
};

exports.updateEngineer = (req, res) => {
  const { name, email, role, skills = "", capacity_hr = 0 } = req.body;

  const updateUserQuery = `
    UPDATE users 
    JOIN engineers ON users.id = engineers.user_id 
    SET users.name = ?, users.email = ?, users.role = ?
    WHERE engineers.id = ?`;

  db.query(
    updateUserQuery,
    [name, email, role, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      const updateEngQuery = `UPDATE engineers SET role = ?, skills = ?, capacity_hr = ? WHERE id = ?`;
      db.query(
        updateEngQuery,
        [role, skills, capacity_hr, req.params.id],
        (err2, result2) => {
          if (err2) return res.status(500).json({ error: err2 });

          res.json({
            id: parseInt(req.params.id),
            name,
            email,
            role,
            skills,
            capacity_hr,
          });
        }
      );
    }
  );
};

exports.deleteEngineer = (req, res) => {
  const query = "DELETE FROM engineers WHERE id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Engineer Deleted Successfully." });
  });
};
