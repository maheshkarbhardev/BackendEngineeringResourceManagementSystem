const express=require('express');
const router=express.Router();
const dashboardController=require('../controllers/dashboardController');
const {protect,authorizeRoles}=require('../middlewares/authMiddleware');

// Accessible to Admin and Manager

router.get('/engineer-capacity',protect,authorizeRoles('Admin', 'Manager'),dashboardController.getEngineerCapacityReport);

router.get('/summary',dashboardController.getDashboardSummary);

module.exports=router;