#!/usr/bin/env node

/**
 * Script para verificar que la migración se aplicó correctamente
 * Ejecuta: node scripts/verify-migration.js
 */

const mysql = require('mysql2/promise');

async function verifyMigration() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'ecommerce_ropa',
  });

  try {
    console.log('🔍 Verificando columnas en detalle_carrito...');
    const [carritoRows] = await connection.execute('SHOW COLUMNS FROM detalle_carrito');
    console.table(carritoRows.map(r => ({ Field: r.Field, Type: r.Type, Null: r.Null })));
    
    console.log('\n🔍 Verificando columnas en detalle_pedido...');
    const [pedidoRows] = await connection.execute('SHOW COLUMNS FROM detalle_pedido');
    console.table(pedidoRows.map(r => ({ Field: r.Field, Type: r.Type, Null: r.Null })));
    
    // Verificar que las columnas tallaSeleccionada existan
    const carritoHasTalla = carritoRows.some(r => r.Field === 'tallaSeleccionada');
    const pedidoHasTalla = pedidoRows.some(r => r.Field === 'tallaSeleccionada');
    
    console.log('\n✅ Verificación de resultados:');
    console.log(`   - detalle_carrito.tallaSeleccionada: ${carritoHasTalla ? '✅ EXISTE' : '❌ NO EXISTE'}`);
    console.log(`   - detalle_pedido.tallaSeleccionada: ${pedidoHasTalla ? '✅ EXISTE' : '❌ NO EXISTE'}`);
    
    if (carritoHasTalla && pedidoHasTalla) {
      console.log('\n🎉 ¡Migración aplicada correctamente!');
      process.exit(0);
    } else {
      console.log('\n❌ La migración no se completó correctamente');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error al verificar:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

verifyMigration();
