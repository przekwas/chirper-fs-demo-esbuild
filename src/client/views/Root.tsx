import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FeaturedUsersSidebar from '../components/FeaturedUserSidebar';
import FeaturedChirpsSidebar from '../components/FeaturedChirps';

interface RootProps {}

const Root = (props: RootProps) => {
	return (
		<>
			<div className="container mt-5">
				<div className="row justify-content-center mt-5">
					<div className="col-12 col-md-2 mb-3">
						<Navbar />
					</div>
					<div className="col-12 col-md-5 mb-3">
						<Outlet />
					</div>
					<div className="col-12 col-md-3 mb-3 d-none d-md-block">
						<div className="row">
							<div className="col-12 mb-3">
								<FeaturedUsersSidebar />
							</div>
							<div className="col-12">
								<FeaturedChirpsSidebar />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Root;
