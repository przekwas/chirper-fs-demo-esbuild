import React from 'react';
import { LoaderFunction, useLoaderData, useNavigate, Link } from 'react-router-dom';
import { fetchData } from '../services/fetchData';
import type { IChirp } from '../types';

export const detailsLoader: LoaderFunction = async ({ params }) => {
	try {
		const chirp = await fetchData(`/api/chirps/${params.chirpid}`);
		return chirp;
	} catch (error) {
		throw error;
	}
};

interface DetailsProps {}

const Details = (props: DetailsProps) => {
	const chirp = useLoaderData() as IChirp;
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1);
	};

	return (
		<>
			<div className="card">
				<div className="card-header">
					<Link to={`/users/${chirp.user_id}`} className="handle-link">
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
						Posted on {new Date(chirp.created_at).toLocaleString()} from{' '}
						{chirp.location}
					</small>
				</div>
			</div>
			<button className="btn btn-light mt-2" onClick={handleBackClick}>
				Back
			</button>
		</>
	);
};

export default Details;
