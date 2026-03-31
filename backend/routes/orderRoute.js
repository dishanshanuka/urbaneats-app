import express from "express"
import authMiddleware from "../middleware/auth.js";
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js"; 

const orderRouter = express.Router();

// User Routes
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);

// Admin Routes
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;