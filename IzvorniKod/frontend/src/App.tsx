import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "./App.css";
import Home from "./pages/Home";
import BasicRegister from "./pages/BasicRegister";
import CartographerRegister from "./pages/CartographerRegister";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/basic" element={<BasicRegister />} />
        <Route
          path="/register/cartographer"
          element={<CartographerRegister />}
        />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
