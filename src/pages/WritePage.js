import NoticeSnackBar from "../components/NoticeSnackBar";
import TodoFrom from "../components/TodoFrom";
import WriteTodoForm from "../components/WriteTodoForm";

function WritePage() {
  return (
    <>
      <NoticeSnackBar />
      <TodoFrom mode={"add"} />
    </>
  );
}
export default WritePage;
