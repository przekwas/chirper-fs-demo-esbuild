import { Table } from './tableCrud';
import type { IGenericRow } from './tableCrud';
import type { ResultSetHeader } from 'mysql2';

interface IMentionRow extends IGenericRow {
	user_id: number;
	chirp_id: number;
}

const mentionsTable = new Table<IMentionRow>('mentions');

export const mentionsService = {
	getAllMentions() {
		return mentionsTable.getAll({
			columns: `
				chirps.id AS chirp_id,
				chirps.body as body,
				mentionedUser.id AS mentioned_user_id,
				mentionedUser.handle AS mentioned_user_handle,
				authorUser.handle AS author_handle`,
			extraQuery: `
				JOIN chirps ON chirps.id = mentions.chirp_id
				JOIN users AS mentionedUser ON mentionedUser.id = mentions.user_id
				JOIN users AS authorUser ON authorUser.id = chirps.user_id`
		});
	},
	getAllMentionsForUserId(user_id: number) {
		return mentionsTable.customQuery(
			`
		SELECT 
			chirps.id AS chirp_id,
			chirps.body as body,
			mentionedUser.id AS mentioned_user_id,
			mentionedUser.handle AS mentioned_user_handle,
			authorUser.handle AS author_handle,
			authorUser.id AS author_id
		FROM mentions
			JOIN chirps ON chirps.id = mentions.chirp_id
			JOIN users AS mentionedUser ON mentionedUser.id = mentions.user_id
			JOIN users AS authorUser ON authorUser.id = chirps.user_id
		WHERE mentions.user_id = ?
		`,
			[user_id]
		);
	},
	getOneMention(id: number) {
		return mentionsTable.getOne(id);
	},
	insertMention(newMention: Partial<IMentionRow>) {
		return mentionsTable.insert(newMention);
	},
	updateMention(updatedMention: Partial<IMentionRow>, id: number) {
		return mentionsTable.update(updatedMention, id);
	},
	destroyMentionForChirpId(chirp_id: number) {
		return mentionsTable.customQuery('DELETE FROM mentions WHERE chirp_id = ?', [
			chirp_id
		]) as Promise<ResultSetHeader>;
	},
	destroyMentionsForUserId(user_id: number) {
		return mentionsTable.customQuery('DELETE FROM mentions WHERE user_id = ?', [user_id]);
	}
};
