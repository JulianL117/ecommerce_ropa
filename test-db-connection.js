const mysql = require('mysql2/promise');

async function testConnection() {
  const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Julian17',
    database: 'ecommerce_ropa',
    waitForConnections: true,
    connectionLimit: 10,
  });

  try {
    console.log('Intentando conectar...');
    const connection = await pool.getConnection();
    console.log('✅ Conexión exitosa!');
    
    const [rows] = await connection.execute('SELECT 1');
    console.log('✅ Query ejecutada:', rows);
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error de conexión:');
    console.error('Código:', error.code);
    console.error('Mensaje:', error.message);
    console.error('SQL State:', error.sqlState);
    console.error(error);
    process.exit(1);
  }
}

testConnection();
