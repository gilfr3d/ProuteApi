import { Router } from "express";
import { getUser, loginUser, logoutUser, refresh } from "../controllers/authController.js";
import { registerUser } from "../controllers/registerController.js";
import loginLimiter from '../middlewares/loginLimiter.js'
import { getAllUsers, getUserById } from "../controllers/adminController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { createRoutes, deleteRoute, getPlanRoutes, updateRoute } from "../controllers/routesController.js";
import { createTerritories, getAllTerritories, getOneTerritory } from "../controllers/territoryController.js";
import { createProducts, getAllProducts } from "../controllers/productsController.js";

const router = Router()
// auth route
router.post('/register', registerUser)

router.post('/login', loginLimiter, loginUser);
router.get('/refresh', refresh);
router.post('/logout', logoutUser);

// admin route
//router.use(verifyJWT)
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.get('/user', getUser);
// plan route routes
router.post('/create-route', createRoutes)
router.get('/get-plan-route', getPlanRoutes)
router.delete('/delete-route/:routeId', deleteRoute)
router.put('/update-route/:routeId', updateRoute)
// plan territory
router.post('/create-territory', createTerritories )
router.get('/get-all-territories', getAllTerritories)
router.get('/get-territory/:territoryId', getOneTerritory)

// products
router.post('/create-products', createProducts)
router.get('/get-all-products', getAllProducts)

export default router;

