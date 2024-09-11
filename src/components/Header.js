import { AppBar, Toolbar } from "@mui/material";
import { hover } from "@testing-library/user-event/dist/hover";
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
                  <NavLink to="/write" className="hover:font-bold hover:underline">할일 추가</NavLink>
                )}
                {location.pathname == "/write" && (
                  <NavLink to="/main" className="hover:font-bold hover:underline">다음에 할래요</NavLink>
                )}
                {location.pathname.includes("/edit") && (
                  <NavLink to="/main" className="hover:font-bold hover:underline">다음에 할래요</NavLink>
                )}
              </li>
            </ul>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
