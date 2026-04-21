import { Router } from "express"
import { health } from "../controllers/todo.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import authRouter from "./auth.routes.js";
import TodoRouter from "./todo.routes.js";

const v1Router: Router = Router();

//public
v1Router.get('/', health);
//public /auth/signin , /auth//auth/signup , /auth/logout
v1Router.use('/auth', authRouter);

//private all our todos get delete update
v1Router.use("/todos", isAuthenticated, TodoRouter)

export default v1Router

