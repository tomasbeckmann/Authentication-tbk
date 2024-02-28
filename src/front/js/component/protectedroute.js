import { useNavigate, Navigate, Outlet } from "react-router-dom"
import React, { useEffect } from "react";

export const ProtectedRoute = ({ user }) => {

    const navigate = useNavigate();

    useEffect(() => {
        console.log(user)
        if (user == null) {
            navigate("/")
        }
    }, [])

    return <Outlet />
}