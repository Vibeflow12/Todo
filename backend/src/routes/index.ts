import { Router } from "express"
import { health } from "../controllers/todo.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
// import authRouter from "./auth.routes.js";
import TodoRouter from "./todo.routes.js";

const router: Router = Router();

//public
router.get('/health', health);

//private all our todos get delete update
router.use("/todos", isAuthenticated, TodoRouter)

export default router
