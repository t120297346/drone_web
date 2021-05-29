import React, { useState } from "react";
import {Button} from '../Button.js';
import drone_logo from "../icon/drone.svg";
import "../css/Navbar.css";
import { MenuItems } from "./MenuItems";

export default function NavBar(){
  const [clicked, setClicked] = useState(false);
  let handleClick = () => {
    setClicked(!clicked);
  }
  return(
    <nav className="NavbarItems">
        <h1 className="navbar-logo">Drone</h1>
        <img src={drone_logo} className="fa-drone" alt="logo"></img>
        <div className="menu-icon" onClick={handleClick}>
          <i
            className={clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        <Button>Sign Up</Button>
        <Button>Log In</Button>
      </nav>
  );
};
