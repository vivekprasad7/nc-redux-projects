import {Navlink} from "react-router-dom"

export const Header = () => {
    const navClass = ({isActive}) => {
        isActive ? "nav-link active-nav" : "nav-link"
    }
    return(
        <div className="header">
            <ul>
                <li>
                <Navlink to="/" className={navClass}>
                    Students
                </Navlink>
                </li>
                <li>
                <Navlink to="/teacher-data" className={navClass}>
                    Teachers
                </Navlink>
                </li>
                <li>
                <Navlink to="/class-data" className={navClass}>
                    Classes
                </Navlink>
                </li>
                <li>
                <Navlink to="/school-data" className={navClass}>
                    Schools
                </Navlink>
                </li>
            </ul>        
        </div>
    )
}