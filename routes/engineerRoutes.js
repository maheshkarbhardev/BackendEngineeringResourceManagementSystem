const express = require("express");
const router = express.Router();
const engineerController = require("../controllers/engineerController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");


router.get("/", protect, authorizeRoles("admin", "manager"), engineerController.getAllEngineers);
router.get("/:id", protect, authorizeRoles("admin", "manager"), engineerController.getEngineerById);
router.post("/", protect, authorizeRoles("admin"), engineerController.createEngineer);
router.put("/:id", protect, authorizeRoles("admin"), engineerController.updateEngineer);
router.delete("/:id", protect, authorizeRoles("admin"), engineerController.deleteEngineer);

module.exports = router;