import TodosEmpty from "../components/TodosEmpty";

function MainPage() {
  const todosEmpty = true;

  if (todosEmpty) {
    return <TodosEmpty />;
  }

  return (
    <>
      <div className="flex-1 flex justify-center items-center">
        <div>
          <span>메인 페이지</span>
        </div>
      </div>
    </>
  );
}

export default MainPage;
