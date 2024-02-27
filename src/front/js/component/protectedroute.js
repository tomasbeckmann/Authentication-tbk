import { useNavigate, Navigate, Outlet } from "react-router-dom"
import { useEffect } from "react";
import React from "react";

export const ProtectedRoute = () => {
    var TOKEN = localStorage.getItem("TOKEN")

    const navigate = useNavigate();

    /*     useEffect(() => {
            if (TOKEN) {
                navigate("/private")
            } else {
                navigate("/login")
            }
        }, []) */

    return <Outlet />
}