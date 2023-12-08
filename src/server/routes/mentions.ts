import { Router } from 'express';
import db from '../db';
import { APIError } from '../utils/apiError';

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const user_id = req.query.user_id as string;

		let mentions;
		if (user_id) {
			mentions = await db.mentionsService.getAllMentionsForUserId(parseInt(user_id, 10));
		} else {
			mentions = await db.mentionsService.getAllMentions();
		}

		res.json(mentions);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const newMention = req.body;
		await db.mentionsService.insertMention(newMention);
		res.json({ message: 'Mention inserted' });
	} catch (error) {
		next(error);
	}
});

router.delete('/chirp/:chirp_id', async (req, res, next) => {
	try {
		const chirp_id = parseInt(req.params.chirp_id, 10);

		if (!chirp_id) {
			throw new APIError('Invalid chirp_id parameter', 400);
		}

		await db.mentionsService.destroyMentionForChirpId(chirp_id);

		res.json({ message: 'Mention destroyed' });
	} catch (error) {
		next(error);
	}
});

export default router;
