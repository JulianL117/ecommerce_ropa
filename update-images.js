const mysql = require('mysql2/promise');

const imageUpdates = {
  'PRD001': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
  'PRD002': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
  'PRD003': 'https://images.unsplash.com/photo-1618272671563-430ee63602de?w=500&h=500&fit=crop',
  'PRD004': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
  'PRD005': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop',
  'PRD006': 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500&h=500&fit=crop',
  'PRD007': 'https://images.unsplash.com/photo-1595777707802-c426e10d017f?w=500&h=500&fit=crop',
  'PRD008': 'https://images.unsplash.com/photo-1595607707441-0c17bebad146?w=500&h=500&fit=crop',
  'PRD009': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
  'PRD010': 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500&h=500&fit=crop',
};

async function updateImages() {
  const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Julian17',
    database: 'ecommerce_ropa',
  });

  try {
    console.log('Actualizando imágenes en la base de datos...\n');
    
    for (const [id, url] of Object.entries(imageUpdates)) {
      const sql = 'UPDATE producto SET imagen = ? WHERE id_producto = ?';
      await pool.execute(sql, [url, id]);
      console.log(`✅ ${id} - Actualizado`);
    }
    
    console.log('\n✅ Todas las imágenes han sido actualizadas');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateImages();
