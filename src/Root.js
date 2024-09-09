import { RecoilRoot } from "recoil";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

function Root() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#990011",
        contrastText: "#FCF6F5",
        background: {
          default: '#FCF6F5',  // 기본 배경색 설정
          paper: '#ffffff',     // 카드 등 컴포넌트의 배경색 설정
        },
      },
    },
  });
  return (
    <>
      <RecoilRoot>
        <HashRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </HashRouter>
      </RecoilRoot>
    </>
  );
}

export default Root;
