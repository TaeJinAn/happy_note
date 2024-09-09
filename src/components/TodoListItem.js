import { Chip, Divider } from "@mui/material";

export default function TodoListItem({todo}) {
  console.log(JSON.stringify(todo.id));
  return (
    <>
      <li className="mt-5 mx-20  text-4xl">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Chip label={`번호 : ${todo.id}`} variant="filled" color="primary" />
            <Chip label={todo.regDate} variant="outlined" color="primary"/>
          </div>
          <div className="rounded-lg shadow-md p-2 flex items-baseline gap-3">
            <i className="fa-solid fa-check text-[#dcdcdc]" />
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ background:'#dcdcdc', width:'3px'}}
            />
            <div className="hover:text-[#990011] whitespace-pre-wrap leading-relaxed flex-grow items-center">
              {todo.content}
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
