import React, { useState } from 'react';
import { LoaderFunction, useLoaderData, Link, useLocation } from 'react-router-dom';
import { fetchData } from '../services/fetchData';
import type { IChirp, IChirpMention } from '../types';

export const userLoader: LoaderFunction = async ({ params }) => {
	try {
		const userHistory = await fetchData(`/api/chirps?user_id=${params.userid}`);
		const userMentions = await fetchData(`/api/mentions?user_id=${params.userid}`);
		return { userHistory, userMentions };
	} catch (error) {
		throw error;
	}
};

interface UserProps {}

const User = (props: UserProps) => {
	const { userHistory, userMentions } = useLoaderData() as {
		userHistory: IChirp[];
		userMentions: IChirpMention[];
	};

	const [toggle, setToggle] = useState({ showHistory: true, showMentions: false });

	return (
		<>
			<h4>@{userHistory[0].handle}</h4>
			<div className="btn-group mb-4 w-100">
				<button
					className={`btn btn-sm ${toggle.showHistory ? 'btn-primary' : 'btn-outline-primary'}`}
					onClick={() => setToggle({ showHistory: true, showMentions: false })}>
					History
				</button>
				<button
					className={`btn btn-sm ${toggle.showMentions ? 'btn-primary' : 'btn-outline-primary'}`}
					onClick={() => setToggle({ showHistory: false, showMentions: true })}>
					Mentions
				</button>
			</div>
			<div>
				{toggle.showHistory
					? userHistory.map(chirp => (
							<div className="card mb-3" key={chirp.id}>
								<div className="card-header">
									<span>@{chirp.handle}</span>
									<br />
									<small className="text-muted">{chirp.email}</small>
								</div>
								<div className="card-body py-5">
									<p className="card-text">{chirp.body}</p>
								</div>
								<div className="card-footer text-muted">
									<small>
										{new Date(chirp.created_at).toLocaleString()}, from{' '}
										{chirp.location}
									</small>
								</div>
							</div>
					  ))
					: userMentions.map((mention, index) => (
							<div className="card mb-3" key={`mention-${index}`}>
								<div className="card-header">
									Mention by{' '}
									<Link
										to={`/users/${mention.author_id}`}
										className="handle-link">
										@{mention.author_handle}
									</Link>
								</div>
								<div className="card-body py-5">
									<p className="card-text">{mention.body}</p>
								</div>
								<div className="card-footer text-muted">
									In chirp{' '}
									<Link to={`/chirps/${mention.chirp_id}`} className='text-secondary'>
										#{mention.chirp_id}
									</Link>
								</div>
							</div>
					  ))}
			</div>
		</>
	);
};

export default User;
