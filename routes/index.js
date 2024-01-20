import { Router } from "express";
import { loginUser, logoutUser, refresh } from "../controllers/authController.js";
import { registerUser } from "../controllers/registerController.js";
import loginLimiter from '../middlewares/loginLimiter.js'
import { getAllPermissions, getAllUsers } from "../controllers/adminController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { createRoutes, deleteRoute, getPlanRoutes, updateRoute } from "../controllers/routesController.js";

const router = Router()
// auth route
router.post('/register', registerUser)

router.post('/login', loginLimiter, loginUser);
router.get('/refresh', refresh);
router.post('/logout', logoutUser);

// admin route
router.use(verifyJWT)
router.get('/users', getAllUsers);
router.get('/permissions', getAllPermissions);
// plan route routes
router.post('/create-route', createRoutes)
router.get('/get-plan-route', getPlanRoutes)
router.delete('/delete-route/:routeId', deleteRoute)
router.put('/update-route/:routeId', updateRoute)

export default router;

