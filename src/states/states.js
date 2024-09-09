import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { snackbarAtom, todosAtom } from "./atoms";
import { produce } from "immer";

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
      checked: false,
    };
    setTodoData({
      ...todoData,
      lastTodoId: id,
      todos: [newTodo, ...todoData.todos],
    });
    console.log("addTodos End todos");
    return id;
  };

  const checkTodo = (id) => {
    console.log("checkTodo start!!");
    setTodoData(
      produce(todoData, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id == id);
        if (index != -1) {
          draft.todos[index].checked = !draft.todos[index].checked;
        }
      })
    );
  };

  return {
    addTodos,
    checkTodo,
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
