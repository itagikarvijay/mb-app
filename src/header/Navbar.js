import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { SideBarData } from './SideBarData'
import '../css/Work.css'
import { IconContext } from 'react-icons'
import { useStore } from 'react-redux'

function Navbar() {
    const [sideBar, setSideBar] = useState(false);

    const showSideBar = () => setSideBar(!sideBar);
    const user = useStore().getState().appReducer['user'];
    return (
        <> 
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSideBar} />
                    </Link>
                    <span style={{color: "white", textAlign: "right"}}>Welcome : {user} </span>
                </div>
                <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSideBar}>
                        <li className='navbar-toggle'>
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineCloseCircle />
                            </Link>
                        </li>
                        {
                            SideBarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })
                        };
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
