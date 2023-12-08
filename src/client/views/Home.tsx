import React from 'react';
import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { fetchData } from '../services/fetchData';
import type { IChirp } from '../types';

export const homeLoader = async () => {
	try {
		const chirps = await fetchData('/api/chirps');
		return chirps;
	} catch (error) {
		throw error;
	}
};

interface HomeProps {}

const Home = (props: HomeProps) => {
	const chirps = useLoaderData() as IChirp[];
	const navigate = useNavigate();

	return (
		<div className="container mt-4">
			<div className="row">
				{/* Sidebar for Trending - shown on the left on md and larger screens */}
				<div className="col-12 col-md-2 mb-3">
					<div className="card">
						<div className="card-header">Trending</div>
						<ul className="list-group list-group-flush">
							{/* Replace the following with actual trending content */}
							<li className="list-group-item">Trend 1</li>
							<li className="list-group-item">Trend 2</li>
							<li className="list-group-item">Trend 3</li>
						</ul>
					</div>
				</div>

				{/* Main content */}
				<div className="col-12 col-md-6 mb-3">
					{chirps.map(chirp => (
						<div
							className="card"
							key={`chirp-card-${chirp.id}`}
							onClick={() => navigate(`/chirps/${chirp.id}`)}
							role="button">
							<div className="card-header">
								<Link
									to={`/users/${chirp.user_id}`}
									onClick={e => e.stopPropagation()}
									className="handle-link">
									@{chirp.handle}
								</Link>
								<br />
								<small className="text-muted">{chirp.email}</small>
							</div>
							<div className="card-body py-5">
								<p className="card-text">{chirp.body}</p>
							</div>
							<div className="card-footer text-muted">
								<small>
									{new Date(chirp.created_at).toLocaleString()}, from {chirp.location}
								</small>
							</div>
						</div>
					))}
				</div>

				{/* Sidebar for Featured Users - shown on the right on md and larger screens */}
				<div className="col-12 col-md-2 mb-3">
					<div className="card">
						<div className="card-header">Featured Users</div>
						<ul className="list-group list-group-flush">
							{/* Replace the following with actual featured user content */}
							<li className="list-group-item">User 1</li>
							<li className="list-group-item">User 2</li>
							<li className="list-group-item">User 3</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
