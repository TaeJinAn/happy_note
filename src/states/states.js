import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { snackbarAtom, todosAtom } from "./atoms";

export function useTodoState() {
  const [todoData, setTodoData] = useRecoilState(todosAtom);
  const lastTodoIdRef = useRef(todoData.lastTodoId);

  lastTodoIdRef.current = todoData.lastTodoId;

  const addTodos = (regDate, content) => {
    console.log(regDate, content, "start addTodos");
    const id = ++lastTodoIdRef.current;
    const newTodo = {
      regDate: regDate,
      content: content,
      id: id,
    };
    setTodoData({
      ...todoData,
      lastTodoId: id,
      todos: [newTodo, ...todoData.todos],
    });
    console.log("addTodos End todos");
    return id;
  };

  return {
    addTodos,
    todoData,
  };
}

export function useSnackBarState() {
  const [snackbarData, setSnackbarData] = useRecoilState(snackbarAtom);
  const handleClose = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };
  const openSnackBar = (msg, severity = "success", duration = 6000) => {
    console.log("openSnackBar start!!!");
    setSnackbarData({
      open: true,
      severity: severity,
      duration: duration,
      msg: msg,
    });
  };

  return {
    snackbarData,
    handleClose,
    openSnackBar,
  };
}
