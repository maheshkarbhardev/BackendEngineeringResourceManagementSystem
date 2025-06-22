const express=require('express');
const router=express.Router();
const projectController=require('../controllers/projectController');
const {protect,authorizeRoles}=require('../middlewares/authMiddleware');

//Only Admin and Managers can manage projects

router.get('/',protect,authorizeRoles('Admin','Manager'),projectController.getAllProjects);
router.get('/:id',protect,authorizeRoles('Admin','Manager'),projectController.getProjectById);
router.post('/',protect,authorizeRoles('Admin','Manager'),projectController.createProject);
router.put('/:id',protect,authorizeRoles('Admin','Manager'),projectController.updateProject);
router.delete('/:id',protect,authorizeRoles('Admin','Manager'),projectController.deleteProject);

module.exports=router;