import React from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { fetchData } from '../services/fetchData';
import type { IChirp } from '../types';

export const adminLoader: LoaderFunction = async () => {
	try {
		const chirps = await fetchData('/api/chirps');
		return chirps;
	} catch (error) {
		throw error;
	}
};

interface AdminProps {}

const Admin = (props: AdminProps) => {
	const chirps = useLoaderData() as IChirp[];

	const handleEdit = (chirpId: number) => {
		console.log(`Editing chirp ${chirpId}`);
	};

	const handleDelete = (chirpId: number) => {
		console.log(`Deleting chirp ${chirpId}`);
	};

	return (
		<div>
			<div className="d-flex align-items-end">
				<h4>@{chirps[0].handle}</h4>
				<h6 className="text-muted ms-2">admin panel</h6>
			</div>
			<div>
				{chirps.map(chirp => (
					<div className="card mb-3" key={`chirp-card-${chirp.id}`}>
						<div className="card-body">
							<p className="card-text">{chirp.body}</p>
						</div>
						<div className="card-footer text-muted">
							<div className="d-flex justify-content-between align-items-center">
								<div>
									<small>
										Posted on {new Date(chirp.created_at).toLocaleString()}
									</small>
								</div>
								<div>
									<button
										className="btn btn-sm btn-outline-primary me-2"
										onClick={() => handleEdit(chirp.id)}>
										Edit
									</button>
									<button
										className="btn btn-sm btn-outline-danger"
										onClick={() => handleDelete(chirp.id)}>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Admin;
