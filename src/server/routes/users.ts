import { Router } from 'express';
import db from '../db';
import { APIError } from '../utils/apiError';

const router = Router();

router.get('/featured', async (req, res, next) => {
	try {
		const users = await db.usersService.getAllUsers();
		const featuredFive = users
			.filter(user => user.id % 3 === 0 || user.id % 5 === 0)
			.slice(0, 5);
		res.json(featuredFive);
	} catch (error) {
		next(error);
	}
});

router.get('/:userid', async (req, res, next) => {
	try {
		const userid = parseInt(req.params.userid, 10);

		if (!userid) {
			throw new APIError('Invalid userid parameter', 400);
		}

		const [user] = await db.usersService.getOneUser(userid);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const users = await db.usersService.getAllUsers();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		let { handle, ...otherUserData } = req.body;

		handle = handle.trim();

		const handleRegex = /^[a-zA-Z0-9_]+$/;
		if (!handleRegex.test(handle)) {
			throw new APIError(
				'Invalid handle. Only alphanumeric characters and underscores are allowed.',
				400
			);
		}

		const newUser = { handle, ...otherUserData };
		const result = await db.usersService.insertUser(newUser);
		res.json({ message: 'New user created', id: result.insertId });
	} catch (error) {
		next(error);
	}
});

router.put('/:userid', async (req, res, next) => {
	try {
		const userid = parseInt(req.params.userid, 10);

		if (!userid) {
			throw new APIError('Invalid userid parameter', 400);
		}

		const updatedUser = req.body;
		const result = await db.usersService.updateUser(updatedUser, userid);

		if (!result.affectedRows) {
			throw new APIError('User not found', 404);
		}

		res.json({ message: 'User updated', id: userid });
	} catch (error) {
		next(error);
	}
});

router.delete('/:userid', async (req, res, next) => {
	try {
		const userid = parseInt(req.params.userid, 10);

		if (!userid) {
			throw new APIError('Invalid userid parameter', 400);
		}

		await db.mentionsService.destroyMentionsForUserId(userid);
		await db.chirpsService.destroyChirpsForUser(userid);
		const result = await db.usersService.destroyUser(userid);

		if (!result.affectedRows) {
			throw new APIError('User not found', 404);
		}

		res.json({ message: 'User destroyed', id: userid });
	} catch (error) {
		next(error);
	}
});

export default router;
