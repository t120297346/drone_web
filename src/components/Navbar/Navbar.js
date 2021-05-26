import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import {Button} from '../Button.js';
import drone_logo from "../icon/drone.svg";
import "../css/Navbar.css";

class NavBar extends Component {
  state = {clicked: false};
  
  handleClick = () => {
    this.setState({clicked: !this.state.clicked})
  };

  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">Drone</h1>
        <img src={drone_logo} className="fa-drone" alt="logo"></img>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
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
  }
}

export default NavBar;
