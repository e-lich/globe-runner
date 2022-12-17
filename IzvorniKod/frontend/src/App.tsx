import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "./App.css";
import Home from "./pages/user/UserHome";
import BasicRegister from "./pages/auth/BasicRegister";
import CartographerRegister from "./pages/auth/CartographerRegister";
import Register from "./pages/auth/Register";
import SignIn from "./pages/auth/SignIn";
import About from "./pages/About";
import EmailConfirm from "./pages/auth/EmailConfirm";
import LeafletMap from "./components/LeafletMap";
import AllUsers from "./pages/admin/AllUsers";
import AdminHome from "./pages/admin/AdminHome";
import CartographerRequests from "./pages/admin/CartographerRequests";
import UserHome from "./pages/user/UserHome";
import GlobalStats from "./pages/user/GlobalStats";
import NearbyPlayers from "./pages/user/NearbyPlayers";
import UserProfile from "./pages/user/UserProfile";
import CartographerHome from "./pages/cartographer/CartographerHome";
import CartographerMyProfile from "./pages/cartographer/CartographerMyProfile";
import OnSiteApproval from "./pages/cartographer/OnSiteApproval";
import AddLocation from "./pages/advancedUser/AddLocation";

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
        <Route path="/map" element={<LeafletMap />} />

        {/* user and advanced user only routes */}
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
        <Route path="/adminHome" element={<AdminHome />} />
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
