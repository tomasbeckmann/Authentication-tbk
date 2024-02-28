import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

	const handleLogout = () => {
		localStorage.removeItem("TOKEN")
		localStorage.clear()
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Homepage</span>
				</Link>
				<div className="ml-auto">
					<button onClick={handleLogout} className="btn btn-primary">Cerrar sesion</button>
				</div>
			</div>
		</nav>
	);
};
