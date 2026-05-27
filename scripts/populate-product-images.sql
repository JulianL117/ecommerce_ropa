-- Migra las filas de producto existentes para agregar la URL de imagen correcta.
-- Ejecutar una vez después de haber cargado datos iniciales sin imagen.

USE ecommerce_ropa;

UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop' WHERE id_producto = 'PRD001';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=500&fit=crop' WHERE id_producto = 'PRD002';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop' WHERE id_producto = 'PRD003';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop' WHERE id_producto = 'PRD004';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop' WHERE id_producto = 'PRD005';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500&h=500&fit=crop' WHERE id_producto = 'PRD006';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop' WHERE id_producto = 'PRD007';
UPDATE producto SET imagen = 'https://armatura.com.co/cdn/shop/files/Vestido_tejido_negro_contexto.webp?v=1722539161' WHERE id_producto = 'PRD008';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=500&fit=crop' WHERE id_producto = 'PRD009';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop' WHERE id_producto = 'PRD010';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop' WHERE id_producto = 'PRD011';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500&h=500&fit=crop' WHERE id_producto = 'PRD012';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop' WHERE id_producto = 'PRD013';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop' WHERE id_producto = 'PRD014';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500&h=500&fit=crop' WHERE id_producto = 'PRD015';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=500&fit=crop' WHERE id_producto = 'PRD016';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=500&fit=crop' WHERE id_producto = 'PRD017';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop' WHERE id_producto = 'PRD018';
UPDATE producto SET imagen = 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQsVL4WYhdjeaYspfhgCKoVG4Zxldr9ubdvr3t4SVYgnb8fMqLn202m57mWtDXmS6kdn6WHcqXKGnm-qkqU1ADFlIyZ5IXheFC8EI9TrqM8cNtu3_hoWHeM_A' WHERE id_producto = 'PRD019';
UPDATE producto SET imagen = 'https://images.unsplash.com/photo-1592301933927-35b597393c0a?w=500&h=500&fit=crop' WHERE id_producto = 'PRD020';
