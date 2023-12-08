import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPenFancy, FaUserShield } from 'react-icons/fa';

const TrendingSidebar = () => {
	return (
		<>
			{/* Offcanvas Navbar for xs to md screens */}
			<nav className="navbar navbar-dark bg-dark fixed-top d-md-none">
				<div className="container-fluid">
					<NavLink className="navbar-brand" to="/">
						Chirper
					</NavLink>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasNavbar"
						aria-controls="offcanvasNavbar">
						<span className="navbar-toggler-icon"></span>
					</button>
				</div>
			</nav>

			{/* Offcanvas Content */}
			<div
				className="offcanvas offcanvas-start text-bg-dark"
				tabIndex={-1}
				id="offcanvasNavbar"
				aria-labelledby="offcanvasNavbarLabel">
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="offcanvasNavbarLabel">
						Navigation
					</h5>
					<button
						type="button"
						className="btn-close btn-close-white"
						data-bs-dismiss="offcanvas"
						aria-label="Close"></button>
				</div>
				<div className="offcanvas-body">
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link" to="/">
								<FaHome className="me-2" /> Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/compose">
								<FaPenFancy className="me-2" /> Compose
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/admin">
								<FaUserShield className="me-2" /> Admin
							</NavLink>
						</li>
					</ul>
				</div>
			</div>

			{/* Side Column for md and larger screens */}
			<div className="d-none d-md-block text-white vh-100">
				<ul className="nav flex-column">
					<li className="nav-item">
						<NavLink className="nav-link" to="/">
							<FaHome className="me-2" /> Home
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/compose">
							<FaPenFancy className="me-2" /> Compose
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/admin">
							<FaUserShield className="me-2" /> Admin
						</NavLink>
					</li>
				</ul>
			</div>
		</>
	);
};

export default TrendingSidebar;
