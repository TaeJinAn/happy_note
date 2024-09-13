import { useRef } from "react";
import { useRecoilState } from "recoil";
import { arrayTabAtom, optionDrawerAtom, snackbarAtom, subTabAtom, todosAtom } from "./atoms";
import { produce } from "immer";
import { getCurrentDateTime } from "../util";

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
    console.log("addTodos End");
    return id;
  };

  const editTodo = (id, regDate, content) => {
    console.log("editTodo start!!");
    setTodoData(
      produce(todoData, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id == id);
        if (index != -1) {
          draft.todos[index].content = content;
          draft.todos[index].regDate = regDate;
        }
      })
    );
    console.log("editTodo End");
    return id;
  }

  const checkTodo = (id) => {
    console.log("checkTodo start!!");
    setTodoData(
      produce(todoData, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id == id);
        if (index != -1) {
          draft.todos[index].checked = !draft.todos[index].checked;
          draft.todos[index].checked ? draft.todos[index].completeDate = getCurrentDateTime() : draft.todos[index].completeDate = null;
        }
      })
    );
  };

  return {
    addTodos,
    editTodo,
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

export function useArrayTabState() {
  const [tabData, setTabData] = useRecoilState(arrayTabAtom);
  const handleChange = (event, tab) => {
    setTabData({...tabData, tab: tab});
  };
  return {
    tabData,
    handleChange
  }
}

export function useArraySubTabState() {
  const [subTabData, setSubTabData] = useRecoilState(subTabAtom);
  const handleChange = (event, tab) => {
    setSubTabData({...subTabData, tab: tab});
  };
  return {
    subTabData,
    handleChange
  }
}

export function useOptionDrawerState() {
  const [drawerData, setDrawerData] = useRecoilState(optionDrawerAtom);
  const drawerOpen = (todo) => {
    setDrawerData({...drawerData, open: true, todo: todo});
  }
  const handleClose = () => {
    setDrawerData({todo: {}, open: false});
  }
  return {
    drawerData,
    handleClose,
    drawerOpen
  }
}
