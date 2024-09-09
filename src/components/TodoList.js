import { useTodoState } from "../states";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
  const todoState = useTodoState();
  const todoData = todoState.todoData;
  return (
    <>
      <ul>
        {todoData.todos.map((todo, index)=> {
          return <TodoListItem todo={todo} key={todo.id}/>
        })}
      </ul>
    </>
  );
}
