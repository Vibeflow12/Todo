import { Router } from "express";
import { createTodo, deleteTodo, getAllTodos, getOneTodo, updateTodo } from "../controllers/todo.controller.js";

const TodoRouter: Router = Router();

TodoRouter.post("/createTodo", createTodo);
TodoRouter.put("/update/:id", updateTodo);
TodoRouter.delete("/delete:id", deleteTodo);
TodoRouter.get("/", getAllTodos);
TodoRouter.get("/search/:id", getOneTodo);

export default TodoRouter;