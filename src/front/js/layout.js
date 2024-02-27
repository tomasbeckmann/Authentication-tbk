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

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <Toaster position="top-center" />
            <BrowserRouter basename={basename}>

                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route element={<LoginView />} path="/" />
                        <Route element={<RegisterForm />} path="/register" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Route>
                </Routes>

            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
