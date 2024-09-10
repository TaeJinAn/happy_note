import { atom } from "recoil";

export const todosAtom = atom({
  key: "app/todosAtom",
  default: {
    todos: [], // 배열로 초기화
    lastTodoId: 0,
  },
});

export const snackbarAtom = atom({
  key: "app/snackbarAtom",
  default: {
    open: false,
    severity: "success",
    duration: 6000,
    msg: "",
  },
});

export const arrayTabAtom = atom({
  key: "app/arrayTabAtom",
  default: {
    tab: 0,
  },
});
