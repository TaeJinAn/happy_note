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

  // 정렬 함수 정의
  const sortTodos = (todos, subTab, tab) => {
    return [...todos].sort((a, b) => {
      let comparison = 0;

      if (subTab === 0) { // regDate 기준
        if (tab === 0) { // regDate 오름차순
          comparison = new Date(a.regDate) - new Date(b.regDate);
        } else if (tab === 1) { // regDate 내림차순
          comparison = new Date(b.regDate) - new Date(a.regDate);
        }
      } else if (subTab === 1) { // createDate 기준
        if (tab === 2) { // createDate 오름차순
          comparison = new Date(a.createDate) - new Date(b.createDate);
        } else if (tab === 3) { // createDate 내림차순
          comparison = new Date(b.createDate) - new Date(a.createDate);
        }
      }

      return comparison;
    });
  };

  // 필터링 및 정렬 적용
  const filteredTodos = todoData.todos.filter(todo => {
    if (tab === 1) return todo.checked;
    if (tab === 2) return !todo.checked;
    return true;
  });

  const filteredAndSortedTodos = sortTodos(filteredTodos, subTab, tab);

  return (
    <>
      <OptionDrawer />
      <ul>
        {filteredAndSortedTodos.map(todo => (
          <TodoListItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </>
  );
}
