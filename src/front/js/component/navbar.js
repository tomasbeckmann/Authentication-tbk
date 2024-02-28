import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

	handleLogout = () => {
		localStorage.setItem("Token", "token")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
						<button className="btn btn-primary">Cerrar</button>
				</div>
			</div>
		</nav>
	);
};
