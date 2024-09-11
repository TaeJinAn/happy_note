import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import Header from "./components/Header";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/*" element={<Navigate to="/main" />} />
      </Routes>
    </>
  );
}

export default App;
