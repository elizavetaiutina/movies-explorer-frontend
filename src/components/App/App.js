import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      {pathname === "/" || pathname === "/" ? <Header /> : null}
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {pathname === "/" || pathname === "/" ? <Footer /> : null}
    </div>
  );
}

export default App;
