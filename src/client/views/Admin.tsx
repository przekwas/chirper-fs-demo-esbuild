import React, { useState } from 'react';
import { LoaderFunction, useLoaderData, useRevalidator } from 'react-router-dom';
import { fetchData } from '../services/fetchData';
import Modal from '../components/Modal';
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
	const revalidator = useRevalidator();

	const [selectedChirp, setSelectedChirp] = useState<IChirp | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editedContent, setEditedContent] = useState('');
	const [modalType, setModalType] = useState<'edit' | 'delete'>('delete');

	const handleEdit = (chirp: IChirp) => {
		setSelectedChirp(chirp);
		setEditedContent(chirp.body);
		setIsModalVisible(true);
		setModalType('edit');
	};

	const handleDelete = (chirp: IChirp) => {
		setSelectedChirp(chirp);
		setIsModalVisible(true);
		setModalType('delete');
	};

	const handleSaveEdit = async () => {
		try {
			if (selectedChirp) {
				await fetchData(`/api/chirps/${selectedChirp.id}`, 'PUT', { body: editedContent });
				setIsModalVisible(false);
				setSelectedChirp(null);
				revalidator.revalidate();
			}
		} catch (error) {
			throw error;
		}
	};

	const handleDeleteChirp = async () => {
		try {
			if (selectedChirp) {
				await fetchData(`/api/mentions/chirp/${selectedChirp.id}`, 'DELETE');
				await fetchData(`/api/chirps/${selectedChirp.id}`, 'DELETE');
				setIsModalVisible(false);
				setSelectedChirp(null);
				revalidator.revalidate();
			}
		} catch (error) {
			throw error;
		}
	};

	const closeModal = () => {
		setIsModalVisible(false);
		setSelectedChirp(null);
	};

	return (
		<>
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
										onClick={() => handleEdit(chirp)}>
										Edit
									</button>
									<button
										className="btn btn-sm btn-outline-danger"
										onClick={() => handleDelete(chirp)}>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<Modal
				title={modalType === 'edit' ? 'Edit Chirp' : 'Delete Chirp?'}
				show={isModalVisible}
				onClose={closeModal}
				onSave={modalType === 'edit' ? handleSaveEdit : handleDeleteChirp}
				saveBtnText={modalType === 'edit' ? 'Save' : 'Delete'}>
				{modalType === 'edit' ? (
					<textarea
						className="form-control"
						value={editedContent}
						onChange={e => setEditedContent(e.target.value)}
					/>
				) : (
					<>
						<p>Are you sure you want to delete this chirp:</p>
						<p className="fw-bold">{selectedChirp?.body}</p>
					</>
				)}
			</Modal>
		</>
	);
};

export default Admin;
