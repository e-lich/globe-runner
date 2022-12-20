import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "./App.css";
import Home from "./pages/Home";
import BasicRegister from "./pages/auth/BasicRegister";
import CartographerRegister from "./pages/auth/CartographerRegister";
import Register from "./pages/auth/Register";
import SignIn from "./pages/auth/SignIn";
import About from "./pages/About";
import EmailConfirm from "./pages/auth/EmailConfirm";
import UserHomeMap from "./components/UserHomeMap";
import AllUsers from "./pages/admin/AllUsers";
import AdminHome from "./pages/admin/AllCards";
import CartographerRequests from "./pages/admin/CartographerRequests";
import UserHome from "./pages/user/UserHome";
import GlobalStats from "./pages/user/GlobalStats";
import NearbyPlayers from "./pages/user/NearbyPlayers";
import UserProfile from "./pages/user/UserProfile";
import CartographerHome from "./pages/cartographer/CartographerHome";
import CartographerMyProfile from "./pages/cartographer/CartographerMyProfile";
import OnSiteApproval from "./pages/cartographer/OnSiteApproval";
import AddLocation from "./pages/advancedUser/AddLocation";
import AllCards from "./pages/admin/AllCards";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* general routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/basic" element={<BasicRegister />} />
        <Route
          path="/register/cartographer"
          element={<CartographerRegister />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/confirm" element={<EmailConfirm />} />
        <Route path="/map" element={<UserHomeMap />} />

        {/* user and advanced user only routes */}
        <Route path="/userHome" element={<UserHome />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/globalStats" element={<GlobalStats />} />
        <Route path="/nearbyPlayers" element={<NearbyPlayers />} />

        {/* advanced user only routes */}
        <Route path="/addLocation" element={<AddLocation />} />

        {/* cartographer only routes */}
        <Route path="/cartographerHome" element={<CartographerHome />} />
        <Route
          path="/cartographerProfile"
          element={<CartographerMyProfile />}
        />
        <Route path="/onSiteApproval" element={<OnSiteApproval />} />

        {/* admin only routes */}
        <Route path="/adminHome" element={<AllCards />} />
        <Route path="/allUsers" element={<AllUsers />} />
        <Route
          path="/cartographerRequests"
          element={<CartographerRequests />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
