import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as  FaIcons from 'react-icons/fa';
//import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import '../css/Sidebar.css'


export default function Sidebar(props) {
    const [sidebar, setSidebar] = useState(props.active);
    console.log(props);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <nav className={sidebar ? 'sidebar-menu active' : 'sidebar-menu'}>
                    <ul className="nav-menu-items">
                        <li>
                            <Link to="#" className="menu-bars">
                                <FaIcons.FaArrowLeft onClick={showSidebar}/>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}