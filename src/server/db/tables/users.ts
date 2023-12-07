import { Table } from './tableCrud';
import type { IGenericRow } from './tableCrud';

interface IUserRow extends IGenericRow {
	id: number;
	handle: string;
	email: string;
	created_at: string;
}

const usersTable = new Table<IUserRow>('users');

export const usersService = {
	getAllUsers() {
		return usersTable.getAll();
	},
	getOneUser(id: number) {
		return usersTable.getOne(id);
	},
	insertUser(newUser: Partial<IUserRow>) {
		return usersTable.insert(newUser);
	},
    updateUser(updatedUser: Partial<IUserRow>, id: number) {
        return usersTable.update(updatedUser, id);
    },
    destroyUser(id: number) {
        return usersTable.destroy(id);
    }
};
