import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function TodosEmpty() {
  return (
      <>
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col gap-2">
            <span>
              <span className="text-blue-400">
                할일
              </span>
              을 입력해주세요.
            </span>
            <Button
              size="large"
              variant="contained"
              component={NavLink}
              to="/write"
            >
              할일 추가하기
            </Button>
          </div>
        </div>
      </>
  );
}
