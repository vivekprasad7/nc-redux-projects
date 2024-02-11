import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <ul className="nav-items">
        <li>
          {" "}
          <NavLink to="/"> Patients </NavLink>{" "}
        </li>
        <li>
          {" "}
          <NavLink to="/wards"> Wards </NavLink>{" "}
        </li>
        <li>
          {" "}
          <NavLink to="/hospital"> Hospital </NavLink>{" "}
        </li>
      </ul>
    </div>
  );
};

export default Header;
