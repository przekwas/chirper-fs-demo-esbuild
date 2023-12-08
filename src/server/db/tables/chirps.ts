import { Table } from './tableCrud';
import type { IGenericRow } from './tableCrud';

interface IChirpRow extends IGenericRow {
	id: number;
	user_id: number;
	body: string;
	location: string;
	created_at: string;
}

const chirpsTable = new Table<IChirpRow>('chirps');

export const chirpsService = {
	getAllChirps() {
		return chirpsTable.getAll({
			columns: 'chirps.*, users.handle, users.email',
			extraQuery: 'JOIN users ON users.id = chirps.user_id ORDER BY chirps.created_at DESC'
		});
	},
	getChirpsForUserId(user_id: number) {
		return chirpsTable.customQuery(
			`
		SELECT 
			chirps.*, 
			users.handle,
			users.email
		FROM chirps
		JOIN users ON users.id = chirps.user_id
		WHERE chirps.user_id = ?
		ORDER BY chirps.created_at DESC
		`,
			[user_id]
		);
	},
	getOneChirp(id: number) {
		return chirpsTable.getOne(id, {
			columns: 'chirps.*, users.handle, users.email',
			extraQuery: 'JOIN users ON users.id = chirps.user_id'
		});
	},
	insertChirp(newChirp: Partial<IChirpRow>) {
		return chirpsTable.insert(newChirp);
	},
	updateChirp(updatedChirp: Partial<IChirpRow>, id: number) {
		return chirpsTable.update(updatedChirp, id);
	},
	destroyChirp(id: number) {
		return chirpsTable.destroy(id);
	},
	destroyChirpsForUser(user_id: number) {
		return chirpsTable.customQuery('DELETE FROM chirps WHERE user_id = ?', [user_id]);
	}
};
