import { Divider, List, ListItem, ListItemButton, SwipeableDrawer } from "@mui/material";
import { useOptionDrawerState, useSnackBarState, useTodoState } from "../states";
import { NavLink } from "react-router-dom";

export default function OptionDrawer() {
  const optionDrawerState = useOptionDrawerState();
  const {deleteTodo} = useTodoState();
  const {openSnackBar} = useSnackBarState();

  const onClickDelBtn = async () => {
      await deleteTodo(optionDrawerState.drawerData.todo.id);
      openSnackBar(`${optionDrawerState.drawerData.todo.id}번 할일이 삭제 되었습니다.`);
      optionDrawerState.handleClose();
  }
  return (
    <>
      <SwipeableDrawer
        anchor={"bottom"}
        onOpen={()=>{}}
        open={optionDrawerState.drawerData.open}
        onClose={optionDrawerState.handleClose}
        className="text-2xl"
      >
        <List>
          <ListItem className="!p-5 !px-10">
            <span>
              <span className="text-[#990011]">
                {optionDrawerState.drawerData.todo.id}
              </span>
              번 할일에 대해서
            </span>
          </ListItem>
          <Divider />
          <ListItem button="true" className="flex gap-2 items-baseline !p-5 !px-10" component={NavLink}
            to={`/edit/${optionDrawerState.drawerData.todo?.id}`}>
              <i className="fa-solid fa-pen-to-square"></i>
              <span>수정</span>
          </ListItem>
          <ListItem button="true" className="flex gap-2 items-baseline !p-5 !px-10" onClick={onClickDelBtn}>
              <i className="fa-solid fa-trash"></i>
              <span>삭제</span>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
}
