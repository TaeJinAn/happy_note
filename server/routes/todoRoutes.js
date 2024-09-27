import { Router } from "express";
import {
  addTodo,
  checkTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";

const router = Router();

router.get("/:user_code/todos", getTodos);
router.post("/:user_code/todos", addTodo);
router.post("/:user_code/todos/:id", checkTodo);
router.patch("/:user_code/todos/:id", updateTodo);
router.delete("/:user_code/todos/:id", deleteTodo);

export default router;
