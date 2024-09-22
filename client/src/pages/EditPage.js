import NoticeSnackBar from "../components/NoticeSnackBar";
import TodoFrom from "../components/TodoFrom";
import { useOptionDrawerState } from "../states";

function EditPage() {
  const optionDrawerState = useOptionDrawerState();
  return <>
  <NoticeSnackBar />
    <TodoFrom mode={"edit"} todoId={optionDrawerState.drawerData.todo.id}/>
  </>
}

export default EditPage;