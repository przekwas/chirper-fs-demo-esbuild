import { Router } from 'express';
import db from '../db';
import { APIError } from '../utils/apiError';

const router = Router();

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
		const chirps = await db.chirpsService.getAllChirps();
		res.json(chirps);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const newChirp = req.body;
		newChirp.user_id = 14;
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
