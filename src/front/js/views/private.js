import React, { useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useContext } from "react";
import "/workspaces/Authentication-tbk/src/front/styles/register.css"
import { useNavigate } from 'react-router-dom';
import { Navbar } from "../component/navbar";

export const PrivateView = () => {

    const navigate = useNavigate();

    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchToken().then((response) => {
            if (!response) {
                navigate("/")
            }
        })
    }, [])

    return (
        <>
        <Navbar />
        <h1>Bienvenido a la vista Privada !!</h1>
        </>
    );
}