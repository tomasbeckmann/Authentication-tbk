import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = (event) => {
		event.preventDefault()
		localStorage.removeItem("TOKEN")
		sessionStorage.removeItem("TOKEN")
		navigate("/")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Homepage</span>
				</Link>
				<div className="ml-auto">
					<button onClick={handleLogout} className="btn btn-primary">Log out</button>
				</div>
			</div>
		</nav>
	);
};
