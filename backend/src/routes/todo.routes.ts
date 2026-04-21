import { Router } from "express";
import { createTodo } from "../controllers/todo.controller.js";

const TodoRouter: Router = Router();

// router.route("/createTodo").post(createTodo)

// // This creates a POST request to /api/v1/todos/createTodo
// router.route("/createTodo").post(createTodo);

// // OR (shorthand)
TodoRouter.post("/createTodo", createTodo);

export default TodoRouter;