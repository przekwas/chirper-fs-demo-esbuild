import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData } from '../services/fetchData';
import type { IChirp } from '../types';

const FeaturedChirpsSidebar = () => {
	const navigate = useNavigate();
	const [chirps, setChirps] = useState<IChirp[]>([]);

	useEffect(() => {
		fetchData('/api/chirps/featured').then(data => setChirps(data));
	}, []);

	return (
		<div className="card">
			<div className="card-header">Featured Chirps</div>
			<ul className="list-group list-group-flush">
				{chirps.map(chirp => (
					<li
						key={`featured-chirp-${chirp.id}`}
						className="list-group-item py-3"
						onClick={() => navigate(`/chirps/${chirp.id}`)}
						role="button">
						<p className="mb-1">{chirp.body}</p>
						<small className="text-muted">
							<Link
								to={`/users/${chirp.user_id}`}
								onClick={e => e.stopPropagation()}
								className="handle-link">
								@{chirp.handle}
							</Link>{' '}
							- {new Date(chirp.created_at).toLocaleDateString()}
						</small>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FeaturedChirpsSidebar;

