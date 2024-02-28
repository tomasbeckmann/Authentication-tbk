import { useNavigate, Navigate, Outlet } from "react-router-dom"
import React, { useEffect } from "react";

export const ProtectedRoute = ({ user }) => {

    const isLoggedIn = localStorage.getItem('token') !== null;

    const navigate = useNavigate();


    useEffect(() => {

        isLoggedIn ? (
            navigate("/private")
        ) : (
            navigate("/")
        )
    }, [])

    /*     useEffect(() => {
            console.log(user)
            if (user == null) {
                navigate("/")
            }
        }, [])
     */
    return <Outlet />
}



