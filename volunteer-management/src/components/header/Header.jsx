import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <ul className="nav-items">
        <li>
          {" "}
          <NavLink to="/"> Volunteers </NavLink>{" "}
        </li>
        <li>
          {" "}
          <NavLink to="/events"> Events </NavLink>{" "}
        </li>
      </ul>
    </div>
  );
};

export default Header;
