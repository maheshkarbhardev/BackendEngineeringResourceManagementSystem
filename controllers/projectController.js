const db = require("../config/db");

//Get Api for all projects
exports.getAllProjects = (req, res) => {
  const query = "SELECT * FROM projects";

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(result);
  });
};

//Get project by Id
exports.getProjectById = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM projects WHERE id=?";

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(5000).json({ error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    res.json(result[0]);
  });
};

//create project
exports.createProject = (req, res) => {
  const { name, start_date, end_date, description } = req.body;
  const query =
    "INSERT INTO projects (name,start_date,end_date,description) VALUES (?,?,?,?)";

  db.query(query, [name, start_date, end_date, description], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: "Project Created.", id: result.insertId });
  });
};

//Update Project
exports.updateProject = (req, res) => {
  const id = req.params.id;
  const { name, start_date, end_date, description } = req.body;
  const query =
    "UPDATE projects SET name=?,start_date=?,end_date=?,description=? WHERE id=?";

  db.query(
    query,
    [name, start_date, end_date, description, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: "Project Updated Successfully." });
    }
  );
};

//Delete Project
exports.deleteProject = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM projects WHERE id=?";

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Project Deleted Successfully." });
  });
};
