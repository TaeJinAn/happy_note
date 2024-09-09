import ArrayTab from "../components/\bArrayTab";
import TodoList from "../components/TodoList";
import TodosEmpty from "../components/TodosEmpty";
import { useTodoState } from "../states";

function MainPage() {
  const todoState = useTodoState();
  const todoData = todoState.todoData;
  const todosEmpty = todoData.todos.length == 0;

  if (todosEmpty) {
    return <TodosEmpty />;
  }
  return (
    <>
      <ArrayTab />
      <TodoList />
    </>
  );
}

export default MainPage;
