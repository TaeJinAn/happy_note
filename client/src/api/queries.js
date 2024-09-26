import { useQuery } from "@tanstack/react-query";
import { initTodos } from "./todoApi";

export const useInitTodoQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: initTodos,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("useInitTodoQuery error:", error);
    },
  });
};
