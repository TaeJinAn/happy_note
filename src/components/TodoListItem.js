import { Button, Chip, Divider } from "@mui/material";
import classNames from "classnames";
import { useTodoState } from "../states/states";

export default function TodoListItem({ todo }) {
  const todoState = useTodoState();
  console.log(JSON.stringify(todo.id));
  return (
    <>
      <li className="mt-5 mx-20  text-4xl">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Chip
              label={`번호 : ${todo.id}`}
              variant="filled"
              color="primary"
            />
            <Chip label={todo.regDate} variant="outlined" color="primary" />
          </div>
          <div className="rounded-lg shadow-md flex items-center">
            <Button color="inherit" className="rounded-lg flex-shrink-0" onClick={() => {todoState.checkTodo(todo.id);}}>
              <span
                className={classNames(
                  { "text-[#990011]": todo.checked },
                  { "text-[#dcdcdc]": !todo.checked },
                  "text-4xl", "h-[80px]","flex items-center"
                )}
              >
                <i className="fa-solid fa-check " />
              </span>
            </Button>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ background: "#dcdcdc", width: "3px" }}
            />
            <div className="hover:text-[#990011] whitespace-pre-wrap leading-relaxed flex-grow items-center p-3">
              {todo.content}
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
