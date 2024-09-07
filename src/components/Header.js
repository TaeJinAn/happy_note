import { AppBar, Toolbar } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
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
                {location.pathname == "/main" && (
                  <NavLink to="/write">글쓰기</NavLink>
                )}
                {location.pathname == "/write" && (
                  <NavLink to="/main">이전</NavLink>
                )}
              </li>
            </ul>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
