import { useMutation } from "@tanstack/react-query";
import { addTodo, checkTodo, deleteTodo, updateTodo } from "./todoApi";

export const useTodoMutation = () => {
  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: (data) => {
      console.log("success! data : ", data);
    },
    onError: (error) => {
      console.log("addTodoMutation error:", error);
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: (data) => {
      console.log("success! data: ", data);
    },
    onError: (error) => {
      console.log("updateTodoMutation error: ", error);
    },
  });

  const checkTodoMutation = useMutation({
    mutationFn: checkTodo,
    onSuccess: (data) => {
      console.log("success! data : ", data);
    },
    onError: (error) => {
      console.log("checkTodoMutation error:", error);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data) => {
      console.log("success! data : ", data);
    },
    onError: (error) => {
      console.log("deleteTodoMutation error:", error);
    },
  });

  return {
    addTodoMutation,
    checkTodoMutation,
    updateTodoMutation,
    deleteTodoMutation
  };
};
