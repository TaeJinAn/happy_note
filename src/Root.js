import { RecoilRoot } from "recoil";
import App from "./App";
import { HashRouter } from "react-router-dom";

function Root() {
  return (
    <>
      <RecoilRoot>
        <HashRouter>
          <App />
        </HashRouter>
      </RecoilRoot>
    </>
  );
}

export default Root;
