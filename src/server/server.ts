import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './routes';
import { APIError } from './utils/apiError';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const app = express();

if (isDevelopment) {
	app.use(cors());
}

if (isProduction) {
	app.use(express.static('public'));
}

app.use(morgan('dev'));
app.use(express.json());

// all our api routes
app.use('/api', apiRouter);

// 404 fallback for client side routing
if (isProduction) {
	app.get('*', (req, res) => {
		res.sendFile('index.html', { root: 'public' });
	});
}

app.use((req, res, next) => {
	const error = new APIError(`Path ${req.originalUrl} not found`);
	error.status = 404;
	next(error);
});

app.use(
	(error: APIError, req: express.Request, res: express.Response, next: express.NextFunction) => {
		console.error(error);
		const status = error.status || 500;
		const message = error.message || 'Internal server error';

		return res.status(status).json({ error: { message, status } });
	}
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
