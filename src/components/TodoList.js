import { useArrayTabState, useTodoState } from "../states";
import OptionDrawer from "./OptionDrawer";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
  const todoState = useTodoState();
  const todoData = todoState.todoData;
  const arrayTabState = useArrayTabState();
  const tab = arrayTabState.tabData.tab;
  return (
    <>
      <OptionDrawer />
      <ul>
        {todoData.todos.map((todo, index) => {
          switch (tab) {
            case 0:
              return <TodoListItem todo={todo} key={todo.id} />;
            case 1:
              return todo.checked && <TodoListItem todo={todo} key={todo.id} />;
            case 2:
              return (
                !todo.checked && <TodoListItem todo={todo} key={todo.id} />
              );
          }
        })}
      </ul>
    </>
  );
}
