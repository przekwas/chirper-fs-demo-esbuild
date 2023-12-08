import React, { useState } from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { fetchData } from '../services/fetchData';
import type { IUser } from '../types';

export const composeLoader: LoaderFunction = async () => {
	try {
		const users = await fetchData('/api/users');
		return users;
	} catch (error) {
		throw error;
	}
};

interface ComposeProps {}

const Compose = (props: ComposeProps) => {
	const users = useLoaderData() as IUser[];

	const [chirpText, setChirpText] = useState('');
	const [selectedUserId, setSelectedUserId] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const result = await fetchData('/api/chirps', 'POST', {
				body: chirpText,
				location: 'Earth'
			});

			if (selectedUserId) {
				await fetchData('/api/mentions', 'POST', {
					chirp_id: result.id,
					user_id: selectedUserId
				});
			}
			setChirpText('');
			setSelectedUserId('');
		} catch (error) {
			throw error;
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="mt-1">
				<div className="form-group">
					<textarea
						className="form-control"
						value={chirpText}
						onChange={e => setChirpText(e.target.value)}
						placeholder="What's chirping?"
						rows={3}
					/>
				</div>
				<div className="form-group my-4">
					<label htmlFor="userMention">Mention User:</label>
					<select
						className="form-control"
						value={selectedUserId}
						onChange={e => setSelectedUserId(e.target.value)}
						id="userMention">
						<option value="">Select a user</option>
						{users.map(user => (
							<option key={user.id} value={user.id}>
								{user.handle}
							</option>
						))}
					</select>
				</div>
				<button type="submit" className="btn btn-primary mt-2">
					Chirp
				</button>
			</form>
		</>
	);
};

export default Compose;
