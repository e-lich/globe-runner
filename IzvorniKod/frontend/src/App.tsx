import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "./App.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import BasicRegister from "./pages/BasicRegister";
import CartographerRegister from "./pages/CartographerRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/auth/basic" element={<BasicRegister />} />
        ,<Route path="/auth/cartographer" element={<CartographerRegister />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
