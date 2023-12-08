import { Router } from 'express';
import db from '../db';
import { APIError } from '../utils/apiError';
import { features } from 'process';

const router = Router();

router.get('/featured', async (req, res, next) => {
	try {
		const chirps = await db.chirpsService.getAllChirps();
		const featuredFive = chirps
			.filter(chirp => chirp.id % 3 === 0 || chirp.id % 5 === 0)
			.slice(0, 5);
		res.json(featuredFive);
	} catch (error) {
		next(error);
	}
});

router.get('/:chirpid', async (req, res, next) => {
	try {
		const chirpid = parseInt(req.params.chirpid, 10);

		if (!chirpid) {
			throw new APIError('Invalid chirpid parameter', 400);
		}

		const [chirp] = await db.chirpsService.getOneChirp(chirpid);

		if (!chirp) {
			throw new APIError('Chirp not found', 404);
		}

		res.json(chirp);
	} catch (error) {
		next(error);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const user_id = parseInt(req.query.user_id as string, 10);
		let chirps;

		if (user_id) {
			chirps = await db.chirpsService.getChirpsForUserId(user_id);
		} else {
			chirps = await db.chirpsService.getAllChirps();
		}

		res.json(chirps);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const newChirp = req.body;
		newChirp.user_id = 16;
		const result = await db.chirpsService.insertChirp(newChirp);
		res.json({ message: 'Chirp created', id: result.insertId });
	} catch (error) {
		next(error);
	}
});

router.put('/:chirpid', async (req, res, next) => {
	try {
		const chirpid = parseInt(req.params.chirpid, 10);

		if (!chirpid) {
			throw new APIError('Invalid chirpid parameter', 400);
		}

		const updatedChirp = req.body;
		const result = await db.chirpsService.updateChirp(updatedChirp, chirpid);

		if (!result.affectedRows) {
			throw new APIError('Chirp not found', 404);
		}

		res.json({ message: 'Chirp updated', id: chirpid });
	} catch (error) {
		next(error);
	}
});

router.delete('/:chirpid', async (req, res, next) => {
	try {
		const chirpid = parseInt(req.params.chirpid, 10);

		if (!chirpid) {
			throw new APIError('Invalid chirpid parameter', 400);
		}

		const result = await db.chirpsService.destroyChirp(chirpid);

		if (!result.affectedRows) {
			throw new APIError('Chirp not found', 404);
		}

		res.json({ message: 'Chirp destroyed', id: chirpid });
	} catch (error) {
		next(error);
	}
});

export default router;
