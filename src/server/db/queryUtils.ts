import pool from './pool';
import type { ResultSetHeader } from 'mysql2';

export async function SelectQuery<T>(queryString: string, params?: any) {
    const [result] = await pool.query(queryString, params);
    return result as T[];
}

export async function ModifyQuery(queryString: string, params?: any) {
    const [result] = await pool.query(queryString, params) as ResultSetHeader[];
    return result as ResultSetHeader;
}