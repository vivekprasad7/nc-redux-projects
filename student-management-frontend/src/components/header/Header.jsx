import {NavLink} from "react-router-dom"
import "./Header.css"

const Header = () => {
    const navClass = ({isActive}) => {
       return isActive ? "nav-link active-nav" : "nav-link"
    }
    return(
            <ul className="header">
                <li>
                <NavLink to="/" className={navClass}>
                    Students
                </NavLink>
                </li>
                <li>
                <NavLink to="/teacher" className={navClass}>
                    Teachers
                </NavLink>
                </li>
                <li>
                <NavLink to="/class" className={navClass}>
                    Classes
                </NavLink>
                </li>
                <li>
                <NavLink to="/school" className={navClass}>
                    Schools
                </NavLink>
                </li>
            </ul>        
    )
}

export default Header