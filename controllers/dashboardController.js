const db = require("../config/db");

exports.getEngineerCapacityReport = (req, res) => {
  const query = `SELECT 
      e.id AS engineer_id,
      u.name AS engineer_name,
      e.capacity_hr,
      IFNULL(SUM(a.hours_allocated), 0) AS assigned_hours,
      ROUND(IFNULL(SUM(a.hours_allocated) / e.capacity_hr * 100, 0), 2) AS capacity_used_percent
    FROM engineers e
    JOIN users u ON e.user_id = u.id
    LEFT JOIN assignments a ON e.id = a.engineer_id
    GROUP BY e.id, u.name, e.capacity_hr`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json(result);
  });
};

exports.getDashboardSummary = (req, res) => {
  const summary = {
    totalEngineers: 0,
    totalProjects: 0,
    totalAssignments: 0,
    engineerUtilization: [],
  };

  const totalEngineersQuery = "SELECT COUNT(*) AS total FROM engineers";
  const totalProjectsQuery = "SELECT COUNT(*) AS total FROM projects";
  const totalAssignmentsQuery = "SELECT COUNT(*) AS total FROM assignments";
  const assignedEngineersQuery =
    "SELECT COUNT(DISTINCT engineer_id) AS assigned FROM assignments";

  db.query(totalEngineersQuery, (err, engineerResult) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    summary.totalEngineers = engineerResult[0].total;

    db.query(totalProjectsQuery, (err, projectResult) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      summary.totalProjects = projectResult[0].total;

      db.query(totalAssignmentsQuery, (err, assignmentResult) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        summary.totalAssignments = assignmentResult[0].total;

        db.query(assignedEngineersQuery, (err, assignedResult) => {
          if (err) {
            return res.status(500).json({ error: err });
          }

          const assigned = assignedResult[0].assigned;
          const available = summary.totalEngineers - assigned;

          summary.engineerUtilization = [
            { name: "Assigned", value: assigned },
            { name: "Available", value: available },
          ];

          res.json(summary);
        });
      });
    });
  });
};
