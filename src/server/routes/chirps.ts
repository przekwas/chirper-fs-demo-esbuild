import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/:chirpid', async (req, res, next) => {
	try {
		const chirpid = parseInt(req.params.chirpid, 10);

		if (!chirpid) {
			return res.status(400).json({ message: 'Invalid chirpid parameter' });
		}

		const [chirp] = await db.chirpsService.getOneChirp(chirpid);

        if (!chirp) {
            return res.status(404).json({ message: 'Chirp not found' });
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
		newChirp.user_id = 6;
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
			return res.status(400).json({ message: 'Invalid chirpid parameter' });
		}

		const updatedChirp = req.body;
		const result = await db.chirpsService.updateChirp(updatedChirp, chirpid);

		if (!result.affectedRows) {
			return res.status(404).json({ message: 'Chirp not found' });
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
			return res.status(400).json({ message: 'Invalid chirpid parameter' });
		}

		const result = await db.chirpsService.destroyChirp(chirpid);

		if (!result.affectedRows) {
			return res.status(404).json({ message: 'Chirp not found' });
		}

		res.json({ message: 'Chirp destroyed', id: chirpid });
	} catch (error) {
		next(error);
	}
});

export default router;
