import "./header.css"
import { NavLink } from "react-router-dom"

export function Header() {
   
  return (
    <div className="head">
        <div className="left-section">
            
            <NavLink to="/" end className="header-butt">Me</NavLink>
            <NavLink to="/projects" className="header-butt">Projects</NavLink>
            
        </div>
        <div className="right-section">
            
            <NavLink to="/minecraft-dashboard" className="header-butt">Minecraft?</NavLink>
            
        </div>
    </div>
  )

}