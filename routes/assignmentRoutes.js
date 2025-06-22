const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

//Only Admin and Manager can assign engineers to projects

router.get('/',protect,authorizeRoles('Admin', 'Manager'),assignmentController.getAllAssignments);
router.get('/:id',protect,authorizeRoles('Admin', 'Manager'),assignmentController.getAssignmentsById);
router.post('/',protect,authorizeRoles('Admin', 'Manager'),assignmentController.createAssignments);
router.put('/:id',protect,authorizeRoles('Admin', 'Manager'),assignmentController.updateAssignments);
router.delete('/:id',protect,authorizeRoles('Admin', 'Manager'),assignmentController.deleteAssignments);

module.exports=router;