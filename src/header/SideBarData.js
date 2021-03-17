import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
// import * as IoIcons from 'react-icons/io'

export const SideBarData = [
    {
        title: 'Home',
        path: '/register',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Customer',
        path: '/customer',
        icon: <FaIcons.FaCartPlus/>,
        cName: 'nav-text'
    },    
    {
        title: 'Settings',
        path: '/',
        icon: <FaIcons.FaHammer/>,
        cName: 'nav-text'
    }
    ,    
    {
        title: 'Logout',
        path: '/logout',
        icon: <AiIcons.AiOutlineLogout/>,
        cName: 'nav-text'
    }
]