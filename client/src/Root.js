import { RecoilRoot } from "recoil";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Root() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#990011",
        contrastText: "#FCF6F5",
        background: {
          default: "#FCF6F5", // 기본 배경색 설정
          paper: "#ffffff", // 카드 등 컴포넌트의 배경색 설정
        },
      },
    },
  });
  const queryClient = new QueryClient();
  return (
    <>
      <RecoilRoot>
        <HashRouter>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </ThemeProvider>
        </HashRouter>
      </RecoilRoot>
    </>
  );
}

export default Root;
