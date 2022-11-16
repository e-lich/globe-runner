import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav">
      <h1>GlobeRunner</h1>
      <ul className="nav--links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}
