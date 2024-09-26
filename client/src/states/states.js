import { useRef } from "react";
import { useRecoilState } from "recoil";
import {
  arrayTabAtom,
  optionDrawerAtom,
  snackbarAtom,
  subTabAtom,
  todosAtom,
} from "./atoms";
import { produce } from "immer";
import { getCurrentDateTime } from "../util";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useInitTodoQuery } from "../api/queries";
import { useTodoMutation } from "../api/mutations";

export function useTodoState() {
  const [todoData, setTodoData] = useRecoilState(todosAtom);

  const { addTodoMutation, checkTodoMutation, updateTodoMutation, deleteTodoMutation } =
    useTodoMutation();

  const { isLoading, error, data: dataJson } = useInitTodoQuery();

  useEffect(() => {
    if (!isLoading && dataJson?.data) {
      const newTodos = dataJson.data.map((todo) => ({
        createDate: todo.reg_date,
        regDate: todo.perform_date,
        content: todo.content,
        id: todo.id,
        checked: todo.is_completed === 1,
      }));
      setTodoData({ ...todoData, todos: newTodos });
    }
  }, [isLoading, dataJson]);

  const addTodos = async (regDate, content) => {
    console.log(regDate, content, "start addTodos");

    const newTodo = {
      createDate: getCurrentDateTime(),
      regDate: regDate,
      content: content,
      checked: false,
    };

    const { data } = await addTodoMutation.mutateAsync(newTodo);

    if (!data) {
      console.error("No data received from addTodo");
      return;
    }

    const addedTodo = {
      createDate: data.reg_date,
      regDate: data.perform_date,
      content: data.content,
      id: data.id,
      checked: data.is_completed === 1,
    };

    setTodoData((prev) => ({
      ...prev,
      todos: [addedTodo, ...prev.todos],
    }));
    console.log(data.id);

    return data.id;
  };

  const editTodo = async (id, regDate, content) => {
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
    const { data } = await updateTodoMutation.mutateAsync({
      id,
      content,
      regDate,
    });

    if (!data) {
      console.error("No data received from updateTodo");
      return;
    }

    console.log("editTodo End");
    return id;
  };

  const checkTodo = async (id) => {
    console.log("checkTodo start!!");

    let checked;

    setTodoData(
      produce(todoData, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id == id);
        if (index != -1) {
          draft.todos[index].checked = !draft.todos[index].checked;
          checked = draft.todos[index].checked;
          draft.todos[index].checked
            ? (draft.todos[index].completeDate = getCurrentDateTime())
            : (draft.todos[index].completeDate = null);
        }
      })
    );

    console.log("checked check:::::", checked);
    const { data, resultCode, msg } = await checkTodoMutation.mutateAsync({
      id,
      checked,
    });

    if (!data) {
      console.error("No data received from checkTodo");
      return;
    }

    console.log(data, msg, resultCode);
  };

  const deleteTodo = async (id) => {
    setTodoData(
      produce(todoData, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id == id);
        if (index != -1) {
          draft.todos.splice(index, 1);
        }
      })
    );

    const { data, resultCode, msg } = await deleteTodoMutation.mutateAsync(id)

    if (!data) {
      console.error("No data received from checkTodo");
      return;
    }

    console.log(data, msg, resultCode);
  };

  return {
    addTodos,
    editTodo,
    checkTodo,
    deleteTodo,
    todoData,
    setTodoData,
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
    setTabData({ ...tabData, tab: tab });
  };
  return {
    tabData,
    handleChange,
  };
}

export function useArraySubTabState() {
  const [subTabData, setSubTabData] = useRecoilState(subTabAtom);
  const handleChange = (event, tab) => {
    setSubTabData({ ...subTabData, tab: tab });
  };
  return {
    subTabData,
    handleChange,
  };
}

export function useOptionDrawerState() {
  const [drawerData, setDrawerData] = useRecoilState(optionDrawerAtom);
  const drawerOpen = (todo) => {
    setDrawerData({ ...drawerData, open: true, todo: todo });
  };
  const handleClose = () => {
    setDrawerData({ todo: {}, open: false });
  };
  return {
    drawerData,
    handleClose,
    drawerOpen,
  };
}
