const db = require("../config/db");

//Get All Assignments.
exports.getAllAssignments = (req, res) => {
  const query = `SELECT assignments.*,engineers.role AS engineer_role,users.name AS engineer_name,projects.name AS project_name FROM assignments JOIN engineers ON assignments.engineer_id =engineers.id JOIN users ON engineers.user_id =users.id JOIN projects ON assignments.project_id =projects.id`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(result);
  });
};

//Get Assignments by Id
exports.getAssignmentsById = (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM assignments WHERE id=?";

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Assignments Not Found." });
    }
    res.json(result[0]);
  });
};

//Create Assignments
exports.createAssignments=(req,res)=>{
    const {engineer_id, project_id, hours_allocated, start_date, end_date}=req.body;
    const query=`INSERT INTO assignments (engineer_id, project_id, hours_allocated, start_date, end_date) VALUES (?,?,?,?,?)`;

    db.query(query,[engineer_id, project_id, hours_allocated, start_date, end_date],(err,result)=>{
        if(err){
            return res.status(500).json({error:err})
        }
        res.status(201).json({message:"Assignments Created Successfully.",id:result.insertId})
    })

}

//Update Assignments
exports.updateAssignments = (req, res) => {
  const id = req.params.id;
  const { hours_allocated, start_date, end_date } = req.body;
  const query = `UPDATE assignments SET hours_allocated=?, start_date=?, end_date=? WHERE id=?`;

  db.query(query, [hours_allocated, start_date, end_date, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    // fetch updated row
    db.query('SELECT * FROM assignments WHERE id=?', [id], (err2, result) => {
      if (err2) {
        return res.status(500).json({ error: err2 });
      }
      res.json(result[0]); // send updated assignment to frontend
    });
  });
};

//Delete Assignments
exports.deleteAssignments=(req,res)=>{
    const id=req.params.id;
    const query="DELETE FROM assignments WHERE id=?";

    db.query(query,[id],(err,result)=>{
        if(err){
            return res.status(500).json({error:err})
        }
        res.json({message:"Assignments Deleted Successfully."})
    })
}
