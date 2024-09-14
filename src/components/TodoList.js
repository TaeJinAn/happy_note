import { useArraySubTabState, useArrayTabState, useTodoState } from "../states";
import OptionDrawer from "./OptionDrawer";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
  const todoState = useTodoState();
  const todoData = todoState.todoData;
  const arrayTabState = useArrayTabState();
  const arraySubTabState = useArraySubTabState();
  const tab = arrayTabState.tabData.tab;
  const subTab = arraySubTabState.subTabData.tab;

  const sortTodos = (todos, subTab) => {
    return [...todos].sort((a, b) => {
      let comparison = 0;
      switch (subTab) {
        case 0:
          comparison = new Date(a.regDate) - new Date(b.regDate); // 급해요
          break;
        case 1:
          comparison = new Date(b.regDate) - new Date(a.regDate); // 널널해요
          break;
        case 2:
          comparison = new Date(a.createDate) - new Date(b.createDate); // 작성일 오름차순
          break;
        case 3:
          comparison = new Date(b.createDate) - new Date(a.createDate); // 작성일 내림차순
          break;
      }
      return comparison;
    });
  };

  // 필터링 및 정렬 적용
  const filteredTodos = todoData.todos.filter((todo) => {
    if (tab === 1) return todo.checked;
    if (tab === 2) return !todo.checked;
    return true;
  });

  const filteredAndSortedTodos = sortTodos(filteredTodos, subTab);

  return (
    <>
      <OptionDrawer />
      <ul>
        {filteredAndSortedTodos.map((todo) => (
          <TodoListItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </>
  );
}
