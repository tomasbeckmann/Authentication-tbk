import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { RegisterForm } from "./views/register"
import { LoginView } from "./views/login"

import { Toaster } from "sonner";
import { ProtectedRoute } from './component/protectedroute.js'

import { useContext, useEffect } from 'react';
import { Context } from './store/appContext';
import { PrivateView } from "./views/private.js"

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    const { store, actions } = useContext(Context);

    return (
        <div>
            <Toaster position="top-center" />
            <BrowserRouter basename={basename}>

                <Routes>
                    <Route element={<LoginView />} path="/" />
                    <Route element={<RegisterForm />} path="/register" />
                    
                    <Route element={<ProtectedRoute user={store.user} />}>
                        <Route element={<PrivateView />} path="/private" />
                    </Route>
                </Routes>

            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
