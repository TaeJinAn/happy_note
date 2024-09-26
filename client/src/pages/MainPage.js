import NoticeSnackBar from "../components/NoticeSnackBar";
import ArraySubTab from "../components/ArraySubTab";
import ArrayTab from "../components/ArrayTab";
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
      <NoticeSnackBar />
      <ArrayTab />
      <ArraySubTab />
      <TodoList />
    </>
  );
}

export default MainPage;
