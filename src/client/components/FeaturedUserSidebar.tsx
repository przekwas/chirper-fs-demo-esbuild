import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../services/fetchData';
import type { IUser } from '../types';

const FeaturedUsersSidebar = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		fetchData('/api/users/featured').then(data => setUsers(data));
	}, []);

	return (
		<div className="card">
			<div className="card-header">Featured Users</div>
			<ul className="list-group list-group-flush">
				{users.map(user => (
					<li
						key={`featured-user-${user.id}`}
						className="list-group-item py-3"
						onClick={() => navigate(`/users/${user.id}`)}
						role="button">
						<p className="mb-1 handle-link">@{user.handle}</p>
						<small className="text-muted">
							{user.email}
						</small>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FeaturedUsersSidebar;
