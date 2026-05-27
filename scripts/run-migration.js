#!/usr/bin/env node

/**
 * Script de migración para agregar soporte de tallas
 * Ejecuta: node scripts/run-migration.js
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'ecommerce_ropa',
  });

  try {
    console.log('Iniciando migración...');
    
    // Leer el script de migración
    const migrationPath = path.join(__dirname, 'add-size-column.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    // Dividir por punto y coma y ejecutar cada statement
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'));
    
    for (const statement of statements) {
      console.log(`Ejecutando: ${statement.substring(0, 50)}...`);
      await connection.execute(statement);
    }
    
    console.log('✅ Migración completada exitosamente');
  } catch (error) {
    console.error('❌ Error en la migración:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

runMigration();
