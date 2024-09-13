import { faMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField } from "@mui/material";
import { useOptionDrawerState, useSnackBarState, useTodoState } from "../states";
import { useEffect, useState } from "react";
import { getCurrentDateTime } from "../util";

export default function TodoFrom({ mode, todoId }) {
  const todoState = useTodoState();
  const snackBarState = useSnackBarState();
  const optionDrawerState = useOptionDrawerState();
  let msg = mode == "edit" ? "수정" : "추가"
  // 상태로 날짜와 내용을 관리
  const [regDate, setRegDate] = useState(
    mode === "edit" ? optionDrawerState.drawerData.todo.regDate : getCurrentDateTime()
  );
  const [content, setContent] = useState(
    mode === "edit" ? optionDrawerState.drawerData.todo.content : ""
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    let returnTodoId;

    if (form.regDate.value.length == 0) {
      alert("언제 해야 하는지 알려 주세요.");
      return;
    }
    if (form.content.value.length == 0) {
      alert("무엇을 해야 하는지 알려 주세요.");
      return;
    }
    switch (mode) {
      case "add":
        returnTodoId = todoState.addTodos(
          form.regDate.value,
          form.content.value
        );
        setContent("");
        setRegDate(getCurrentDateTime());
        break;
      case "edit":
        returnTodoId = todoState.editTodo(
          todoId,
          form.regDate.value,
          form.content.value
        );
        break;
    }
    form.regDate.value = getCurrentDateTime();
    form.content.value = "";
    snackBarState.openSnackBar(`${returnTodoId}번 할일이 ${msg} 되었습니다.`);

    console.log(mode + "Todofrom onSubmit End");
  };

  useEffect(() => {
    console.log(
      "todos updated!! : " + JSON.stringify(todoState.todoData.todos)
    );
  }, [todoState.todoData.todos]);

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-1 gap-5 flex-col p-16">
        <TextField
          type="datetime-local"
          label="언제 해야 되나요?"
          focused
          name="regDate"
          value={regDate}
          onChange={(e)=>{setRegDate(e.target.value)}}
        />
        <TextField
          name="content"
          type="text"
          label="무엇을 해야 하나요?"
          multiline
          className="flex flex-1"
          slotProps={{
            input: { className: "flex-1 flex-col" },
            htmlInput: { className: "flex-1" },
          }}
          value={content}
          onChange={(e)=>{setContent(e.target.value)}}
        />
        <Button type="submit" variant="contained">
          {/* <i class="fa-solid fa-marker"></i> */}
          <FontAwesomeIcon icon={faMarker} className="mr-2" />
          <span>할일{msg}</span>
        </Button>
      </form>
    </>
  );
}
