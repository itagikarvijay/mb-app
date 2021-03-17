import React from 'react'
import { useDispatch } from "react-redux";
import { logoutAction } from "../app-store/actions/logoutAction";

function Logout() {
    const dispatch = useDispatch();
    localStorage.clear()
    dispatch(logoutAction());
    return (
        <div>
            <h4>Hey, you have logged out successfully.!</h4>
        </div>
    )
}

export default Logout
