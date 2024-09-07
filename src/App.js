import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./page/MainPage";
import WritePage from "./page/WritePage";

function App() {
  return (
    <Routes>
      <Route path="/main" element={<MainPage/>}/>
      <Route path="/write" element={<WritePage/>}/>
      <Route path="/*" element={<Navigate to="/main"/>}/>
    </Routes>
  );
}

export default App;
