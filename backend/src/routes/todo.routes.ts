import { Router } from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.controller.js";

const TodoRouter: Router = Router();

TodoRouter.post("/createTodo", createTodo);
TodoRouter.put("/:id", updateTodo);
TodoRouter.delete("/:id", deleteTodo);
TodoRouter.get("/", getAllTodos);
// TodoRouter.post("/createTodo", createTodo);

export default TodoRouter;