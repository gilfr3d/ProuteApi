import { Router } from "express";
import { getUser, loginUser, logoutUser, refresh } from "../controllers/authController.js";
import { registerUser } from "../controllers/registerController.js";
import loginLimiter from '../middlewares/loginLimiter.js'
import { getAllUsers, getUserById } from "../controllers/adminController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { createRoutes, deleteRoute, getPlanRoutes, updateRoute } from "../controllers/routesController.js";
import { createTerritories, getAllTerritories, getOneTerritory } from "../controllers/territoryController.js";
import { createOrders, deleteOrder, getAllOrders, getOrder, pickAndSend, updateOrder } from "../controllers/salesOrderController.js";
import { createCustomers } from "../controllers/customerController.js";
import { createVehicle, deleteVehicle, getAllVehicles, updateVehicle } from "../controllers/vehicleController.js";

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

// products/orders
router.post('/create-orders', createOrders)
router.get('/get-all-orders', getAllOrders)
router.get('/get-order/:order_number', getOrder);
router.put('/update-order/:order_number', updateOrder);
router.post('/orders/:order_number/pick-and-send', pickAndSend);
router.delete('/delete-order/:id', deleteOrder);

// customers/orders
router.post('/create-customer', createCustomers)

// vehicle
router.post('/create-vehicle', createVehicle)
router.get('/get-all-vehicles', getAllVehicles)
router.put('/update-vehicle/:license_plate', updateVehicle);
router.delete('/delete-vehicle/:id', deleteVehicle);

export default router;

