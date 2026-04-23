import { Router } from "express";
import { createTodo, updateTodo } from "../controllers/todo.controller.js";

const TodoRouter: Router = Router();

TodoRouter.post("/createTodo", createTodo);
TodoRouter.put("/:todoId", updateTodo);
// TodoRouter.post("/createTodo", createTodo);
// TodoRouter.post("/createTodo", createTodo);
// TodoRouter.post("/createTodo", createTodo);

export default TodoRouter;