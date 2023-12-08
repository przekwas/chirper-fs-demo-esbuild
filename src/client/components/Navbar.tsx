import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">
					Chirper
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink
								className={({ isActive }) => `nav-link ${isActive && 'active'}`}
								to="/">
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className={({ isActive }) => `nav-link ${isActive && 'active'}`}
								to="/compose">
								Compose
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink
								className={({ isActive }) => `nav-link ${isActive && 'active'}`}
								to="/admin">
								Admin
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
