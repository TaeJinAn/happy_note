import { AppBar, Toolbar } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // 핸들러 함수 정의
  const handleBack = () => {
    navigate(-1); // history.back()과 동일
  };

  return (
    <>
      <div>
        <AppBar position="static">
          <Toolbar>
            <ul className="flex flex-1 justify-between">
              <li className="text-xl font-bold">logo</li>
              <li>
                <span className="text-xl font-bold">Happy Note</span>
              </li>
              <li>
                {location.pathname === "/main" && (
                  <NavLink to="/write" className="hover:font-bold hover:underline">
                    할일 추가
                  </NavLink>
                )}
                {location.pathname === "/write" && (
                  <span onClick={handleBack} className="font-bold hover:underline">
                    다음에 할래요
                  </span>
                )}
                {location.pathname.includes("/edit") && (
                  <span onClick={handleBack} className="font-bold hover:underline">
                    다음에 할래요
                  </span>
                )}
              </li>
            </ul>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
