import React from 'react';
import { useLoaderData } from 'react-router-dom';
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

	return (
		<div className="container mt-4">
			{chirps.map((chirp, index) => (
				<div key={index} className="card">
					<div className="card-header">
						<div>@{chirp.handle}</div>
						<small className="text-muted">{chirp.email}</small>
					</div>
					<div className="card-body py-5">
						<p className="card-text">{chirp.body}</p>
					</div>
					<div className="card-footer text-muted">
						<small>
							{new Date(chirp.created_at).toLocaleString()}, {chirp.location}
						</small>
					</div>
				</div>
			))}
		</div>
	);
};

export default Home;
