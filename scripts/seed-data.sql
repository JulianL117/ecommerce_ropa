-- ============================================================
-- SCRIPT DE DATOS INICIALES - E-COMMERCE ROPA
-- ============================================================
-- Ejecutar después de crear las tablas con script(1).sql
-- ============================================================
-- Cumplimiento de normas:
-- - ISO 9001:2015 - Datos de prueba documentados
-- - IEEE 730 - Datos de verificación
-- ============================================================

USE ecommerce_ropa;

-- ========================================
-- INSERTAR ROLES
-- ========================================
INSERT INTO rol (id_rol, nombre) VALUES
('ROL001', 'Cliente'),
('ROL002', 'Administrador');

-- ========================================
-- INSERTAR USUARIOS DE PRUEBA
-- ========================================
-- NOTA: En producción, las contraseñas deben estar hasheadas con bcrypt
INSERT INTO usuario (id_usuario, nombreusuario, emailusuario, telefono, clave, id_rol) VALUES
('USR001', 'Administrador', 'admin@tienda.com', '3001234567', 'admin123', 'ROL002'),
('USR002', 'Cliente Demo', 'cliente@test.com', '3009876543', 'cliente123', 'ROL001'),
('USR003', 'Maria Garcia', 'maria@email.com', '3005551234', 'maria123', 'ROL001');

-- ========================================
-- INSERTAR CATEGORÍAS
-- ========================================
INSERT INTO categoria (id_categoria, nombre) VALUES
('CAT001', 'Camisetas'),
('CAT002', 'Pantalones'),
('CAT003', 'Vestidos'),
('CAT004', 'Zapatos'),
('CAT005', 'Accesorios'),
('CAT006', 'Chaquetas'),
('CAT007', 'Faldas');

-- ========================================
-- INSERTAR PRODUCTOS (Precios en COP)
-- ========================================
-- Camisetas
INSERT INTO producto (id_producto, nombre, descripcion, precio, imagen, id_categoria) VALUES
('PRD001', 'Camiseta Basica Blanca', 'Camiseta de algodon 100% en color blanco, perfecta para el dia a dia. Corte clasico y comodo.', 59900.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', 'CAT001'),
('PRD002', 'Camiseta Estampada Urban', 'Camiseta con diseno urbano moderno, tejido suave y resistente. Ideal para looks casuales.', 79900.00, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=500&fit=crop', 'CAT001'),
('PRD003', 'Camiseta Polo Classic', 'Polo elegante de pique con cuello y botones. Perfecto para ocasiones semi-formales.', 99900.00, 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop', 'CAT001');

-- Pantalones
INSERT INTO producto (id_producto, nombre, descripcion, precio, imagen, id_categoria) VALUES
('PRD004', 'Jeans Slim Fit Azul', 'Jeans de corte slim en denim premium azul oscuro. Comodos y con gran durabilidad.', 159900.00, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop', 'CAT002'),
('PRD005', 'Pantalon Chino Beige', 'Pantalon chino clasico en color beige. Versatil para trabajo o casual.', 119900.00, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop', 'CAT002'),
('PRD006', 'Jogger Deportivo Negro', 'Jogger comodo en tela tecnica. Ideal para deporte o uso diario.', 89900.00, 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500&h=500&fit=crop', 'CAT002');

-- Vestidos
INSERT INTO producto (id_producto, nombre, descripcion, precio, imagen, id_categoria) VALUES
('PRD007', 'Vestido Floral Verano', 'Vestido ligero con estampado floral. Perfecto para dias calidos.', 139900.00, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop', 'CAT003'),
('PRD008', 'Vestido Elegante Negro', 'Vestido negro de corte elegante. Ideal para eventos y cenas especiales.', 259900.00, 'https://armatura.com.co/cdn/shop/files/Vestido_tejido_negro_contexto.webp?v=1722539161', 'CAT003'),
('PRD009', 'Vestido Casual Midi', 'Vestido midi en tono neutro. Comodo y versatil para cualquier ocasion.', 179900.00, 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=500&fit=crop', 'CAT003');

-- Zapatos
INSERT INTO producto (id_producto, nombre, descripcion, precio, imagen, id_categoria) VALUES
('PRD010', 'Sneakers Blancos Classic', 'Zapatillas blancas de estilo clasico. Comodas y combinables con todo.', 179900.00, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop', 'CAT004'),
('PRD011', 'Tacones Elegantes Nude', 'Tacones de 8cm en color nude. Elegantes para ocasiones especiales.', 199900.00, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop', 'CAT004'),
('PRD012', 'Botas Chelsea Negras', 'Botas estilo Chelsea en cuero sintetico negro. Modernas y duraderas.', 239900.00, 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500&h=500&fit=crop', 'CAT004');

-- Accesorios
INSERT INTO producto (id_producto, nombre, descripcion, precio, imagen, id_categoria) VALUES
('PRD013', 'Cinturon Cuero Marron', 'Cinturon de cuero genuino en marron. Hebilla clasica en metal.', 69900.00, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop', 'CAT005'),
('PRD014', 'Gorra Baseball Negra', 'Gorra de baseball en algodon negro. Ajustable y comoda.', 49900.00, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop', 'CAT005'),
('PRD015', 'Bufanda Lana Gris', 'Bufanda de lana suave en gris melange. Perfecta para el invierno.', 79900.00, 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500&h=500&fit=crop', 'CAT005');

-- Chaquetas
INSERT INTO producto (id_producto, nombre, descripcion, precio, imagen, id_categoria) VALUES
('PRD016', 'Chaqueta Denim Classic', 'Chaqueta de jean clasica en azul medio. Estilo atemporal.', 179900.00, 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=500&fit=crop', 'CAT006'),
('PRD017', 'Blazer Negro Formal', 'Blazer negro de corte formal. Ideal para trabajo o eventos.', 299900.00, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=500&fit=crop', 'CAT006'),
('PRD018', 'Bomber Jacket Verde', 'Bomber jacket en verde militar. Estilo casual y moderno.', 219900.00, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop', 'CAT006');

-- Faldas
INSERT INTO producto (id_producto, nombre, descripcion, precio, imagen, id_categoria) VALUES
('PRD019', 'Falda Plisada Midi', 'Falda plisada elegante en tono neutro. Versatil y femenina.', 109900.00, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQsVL4WYhdjeaYspfhgCKoVG4Zxldr9ubdvr3t4SVYgnb8fMqLn202m57mWtDXmS6kdn6WHcqXKGnm-qkqU1ADFlIyZ5IXheFC8EI9TrqM8cNtu3_hoWHeM_A', 'CAT007'),
('PRD020', 'Mini Falda Denim', 'Mini falda de jean con bolsillos. Look casual y juvenil.', 89900.00, 'https://images.unsplash.com/photo-1592301933927-35b597393c0a?w=500&h=500&fit=crop', 'CAT007');

-- ========================================
-- INSERTAR INVENTARIO
-- ========================================
INSERT INTO inventario (id_inventario, stock, id_producto) VALUES
('INV001', 50, 'PRD001'),
('INV002', 35, 'PRD002'),
('INV003', 25, 'PRD003'),
('INV004', 40, 'PRD004'),
('INV005', 30, 'PRD005'),
('INV006', 45, 'PRD006'),
('INV007', 20, 'PRD007'),
('INV008', 15, 'PRD008'),
('INV009', 25, 'PRD009'),
('INV010', 60, 'PRD010'),
('INV011', 18, 'PRD011'),
('INV012', 22, 'PRD012'),
('INV013', 40, 'PRD013'),
('INV014', 55, 'PRD014'),
('INV015', 30, 'PRD015'),
('INV016', 28, 'PRD016'),
('INV017', 12, 'PRD017'),
('INV018', 20, 'PRD018'),
('INV019', 3, 'PRD019'),  -- Bajo stock
('INV020', 5, 'PRD020');  -- Bajo stock

-- ========================================
-- INSERTAR CARRITOS DE USUARIOS
-- ========================================
INSERT INTO carrito (id_carrito, id_usuario) VALUES
('CRT001', 'USR002'),
('CRT002', 'USR003');

-- ========================================
-- INSERTAR PEDIDOS DE EJEMPLO
-- ========================================
INSERT INTO pedido (id_pedido, fecha, id_usuario) VALUES
('PED001', '2024-01-15 10:30:00', 'USR002'),
('PED002', '2024-01-16 14:45:00', 'USR003'),
('PED003', '2024-01-17 09:15:00', 'USR002');

-- ========================================
-- INSERTAR DETALLES DE PEDIDOS
-- ========================================
INSERT INTO detalle_pedido (id_detalle, cantidad, precio, id_pedido, id_producto) VALUES
('DTP001', 2, 59900.00, 'PED001', 'PRD001'),
('DTP002', 1, 159900.00, 'PED001', 'PRD004'),
('DTP003', 1, 139900.00, 'PED002', 'PRD007'),
('DTP004', 2, 179900.00, 'PED002', 'PRD010'),
('DTP005', 1, 299900.00, 'PED003', 'PRD017'),
('DTP006', 1, 69900.00, 'PED003', 'PRD013');

-- ========================================
-- INSERTAR PAGOS
-- ========================================
INSERT INTO pago (id_pago, metodo, estado, id_pedido) VALUES
('PAG001', 'tarjeta', 'completado', 'PED001'),
('PAG002', 'paypal', 'completado', 'PED002'),
('PAG003', 'transferencia', 'pendiente', 'PED003');

-- ========================================
-- VERIFICACIÓN
-- ========================================
SELECT 'Datos insertados correctamente' as mensaje;
SELECT COUNT(*) as total_roles FROM rol;
SELECT COUNT(*) as total_usuarios FROM usuario;
SELECT COUNT(*) as total_categorias FROM categoria;
SELECT COUNT(*) as total_productos FROM producto;
SELECT COUNT(*) as total_inventario FROM inventario;
SELECT COUNT(*) as total_pedidos FROM pedido;
