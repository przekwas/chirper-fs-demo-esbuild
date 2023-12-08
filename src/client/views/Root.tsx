import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FeaturedUsersSidebar from '../components/FeaturedSidebar';

interface RootProps {}

const Root = (props: RootProps) => {
	return (
		<>
			<div className="container mt-5">
				<div className="row mt-5">
					<div className="col-12 col-md-2 mb-3">
						<Navbar />
					</div>
					<div className="col-12 col-md-6 mb-3">
						<Outlet />
					</div>
					<div className="col-12 col-md-2 mb-3">
						<FeaturedUsersSidebar />
					</div>
				</div>
			</div>
		</>
	);
};

export default Root;
