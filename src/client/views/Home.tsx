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
		<>
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
		</>
	);
};

export default Home;
