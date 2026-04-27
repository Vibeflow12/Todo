import { Router } from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.controller.js";

const TodoRouter: Router = Router();

TodoRouter.post("/createTodo", createTodo);
TodoRouter.put("/update/:id", updateTodo);
TodoRouter.delete("/delete:id", deleteTodo);
TodoRouter.get("/", getAllTodos);

export default TodoRouter;