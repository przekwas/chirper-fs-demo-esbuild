import { createPool } from 'mysql2/promise';

const pool = createPool({
	host: 'localhost',
	user: 'chirper_demo_official_user',
	password: 'password123',
	database: 'chirper_demo_official',
	connectionLimit: 10,
	timezone: 'Z',
	dateStrings: true
});

export default pool;
