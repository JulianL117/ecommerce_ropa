/**
 * ============================================================
 * CONFIGURACIÓN DE CONEXIÓN A MYSQL (FORZADA LOCAL)
 * ============================================================
 */

import * as mysql from 'mysql2/promise';

/**
 * Configuración del pool de conexiones MySQL
 * Datos locales directamente inyectados para omitir fallos de entorno
 */
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Julian17', // <-- Si tienes contraseña en HeidiSQL, escríbela aquí adentro (ej: '1234')
  database: 'ecommerce_ropa',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

/**
 * Ejecutar una consulta SQL con parámetros
 * @param sql - Consulta SQL parametrizada
 * @param params - Parámetros de la consulta
 * @returns Resultado de la consulta
 */
export async function query<T>(sql: string, params?: any[]): Promise<T> {
  try {
    const [rows] = await pool.execute(sql, params as any);
    return rows as T;
  } catch (error) {
    console.error('[MySQL Error]:', error);
    throw error;
  }
}

/**
 * Obtener una conexión individual del pool
 * Útil para transacciones
 */
export async function getConnection() {
  return await pool.getConnection();
}

/**
 * Ejecutar múltiples consultas en una transacción
 * @param queries - Array de objetos con sql y params
 * @returns Resultados de todas las consultas
 */
export async function transaction<T>(
  queries: { sql: string; params?: unknown[] }[]
): Promise<T[]> {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const results: T[] = [];
    for (const q of queries) {
      const [rows] = await connection.execute(q.sql, q.params as any);
      results.push(rows as T);
    }
    
    await connection.commit();
    return results;
  } catch (error) {
    await connection.rollback();
    console.error('[MySQL Transaction Error]:', error);
    throw error;
  } finally {
    connection.release();
  }
}

/**
 * Verificar conexión a la base de datos
 */
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('[MySQL] Conexión exitosa a la base de datos');
    return true;
  } catch (error) {
    console.error('[MySQL] Error de conexión:', error);
    return false;
  }
}

/**
 * Cerrar el pool de conexiones (para cleanup)
 */
export async function closePool(): Promise<void> {
  await pool.end();
}

export default pool;