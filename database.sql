-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         12.2.2-MariaDB - MariaDB Server
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.14.0.7165
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para ecommerce_ropa
CREATE DATABASE IF NOT EXISTS `ecommerce_ropa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `ecommerce_ropa`;

-- Volcando estructura para tabla ecommerce_ropa.carrito
CREATE TABLE IF NOT EXISTS `carrito` (
  `id_carrito` varchar(20) NOT NULL,
  `id_usuario` varchar(20) NOT NULL,
  PRIMARY KEY (`id_carrito`),
  KEY `fk_carrito_usuario` (`id_usuario`),
  CONSTRAINT `fk_carrito_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce_ropa.carrito: ~0 rows (aproximadamente)
INSERT INTO `carrito` (`id_carrito`, `id_usuario`) VALUES
	('CRT001', 'USR001'),
	('CRT002', 'USR002');

-- Volcando estructura para tabla ecommerce_ropa.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `id_categoria` varchar(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce_ropa.categoria: ~0 rows (aproximadamente)
INSERT INTO `categoria` (`id_categoria`, `nombre`, `imagen`) VALUES
	('CAT001', 'Camisetas', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=80'),
	('CAT002', 'Pantalones', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80'),
	('CAT003', 'Vestidos', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80'),
	('CAT004', 'Zapatos', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&fit=crop'),
	('CAT005', 'Accesorios', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&fit=crop'),
	('CAT006', 'Chaquetas', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&fit=crop'),
	('CAT007', 'Faldas', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhEPaFdfU7gYFgVkb9KUeIzGr_cHSprF__6g&s'),
	('CATDXW3VDV', 'Medias', 'https://www.storefutbol.com/co/wp-content/uploads/2016/01/store-futbol-medias-rinat-gemometric-rojo-1.jpg');

-- Volcando estructura para tabla ecommerce_ropa.detalle_carrito
CREATE TABLE IF NOT EXISTS `detalle_carrito` (
  `id_detalle` varchar(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_carrito` varchar(20) NOT NULL,
  `id_producto` varchar(20) NOT NULL,
  `tallaSeleccionada` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `fk_detallecarrito_carrito` (`id_carrito`),
  KEY `fk_detallecarrito_producto` (`id_producto`),
  CONSTRAINT `fk_detallecarrito_carrito` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`),
  CONSTRAINT `fk_detallecarrito_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce_ropa.detalle_carrito: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ecommerce_ropa.detalle_pedido
CREATE TABLE IF NOT EXISTS `detalle_pedido` (
  `id_detalle` varchar(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `id_pedido` varchar(20) NOT NULL,
  `id_producto` varchar(20) NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `fk_detallepedido_pedido` (`id_pedido`),
  KEY `fk_detallepedido_producto` (`id_producto`),
  CONSTRAINT `fk_detallepedido_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`),
  CONSTRAINT `fk_detallepedido_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce_ropa.detalle_pedido: ~0 rows (aproximadamente)
INSERT INTO `detalle_pedido` (`id_detalle`, `cantidad`, `precio`, `id_pedido`, `id_producto`) VALUES
	('DTP3MGXK2E', 1, 189900.00, 'PED5TTJZLC', 'PRD011'),
	('DTP8R2Z1HF', 1, 139900.00, 'PED5TTJZLC', 'PRD007'),
	('DTPCHIQP3G', 1, 289900.00, 'PED5TTJZLC', 'PRD014'),
	('DTPGIXH074', 1, 59900.00, 'PED5TTJZLC', 'PRD001'),
	('DTPRHGR17P', 1, 99900.00, 'PED5TTJZLC', 'PRD003'),
	('DTPSMHDU4S', 2, 79900.00, 'PED5TTJZLC', 'PRD002');

-- Volcando estructura para tabla ecommerce_ropa.inventario
CREATE TABLE IF NOT EXISTS `inventario` (
  `id_inventario` varchar(20) NOT NULL,
  `stock` int(11) NOT NULL,
  `id_producto` varchar(20) NOT NULL,
  PRIMARY KEY (`id_inventario`),
  UNIQUE KEY `id_producto` (`id_producto`),
  CONSTRAINT `fk_inventario_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce_ropa.inventario: ~10 rows (aproximadamente)
INSERT INTO `inventario` (`id_inventario`, `stock`, `id_producto`) VALUES
	('INV001', 49, 'PRD001'),
	('INV002', 33, 'PRD002'),
	('INV003', 24, 'PRD003'),
	('INV004', 40, 'PRD004'),
	('INV005', 30, 'PRD005'),
	('INV006', 45, 'PRD006'),
	('INV007', 19, 'PRD007'),
	('INV008', 15, 'PRD008'),
	('INV009', 60, 'PRD009'),
	('INV010', 2, 'PRD010'),
	('INV011', 14, 'PRD011'),
	('INV012', 40, 'PRD012'),
	('INV013', 10, 'PRD013'),
	('INV014', 99, 'PRD014'),
	('INV015', 25, 'PRD015'),
	('INV016', 30, 'PRD016'),
	('INV017', 20, 'PRD017'),
	('INV018', 15, 'PRD018'),
	('INV019', 18, 'PRD019'),
	('INV020', 12, 'PRD020'),
	('INV021', 25, 'PRD021'),
	('INV9COLDD8', 18, 'PRD0HGIHZ6');

-- Volcando estructura para tabla ecommerce_ropa.pago
CREATE TABLE IF NOT EXISTS `pago` (
  `id_pago` varchar(20) NOT NULL,
  `metodo` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `id_pedido` varchar(20) NOT NULL,
  PRIMARY KEY (`id_pago`),
  UNIQUE KEY `id_pedido` (`id_pedido`),
  CONSTRAINT `fk_pago_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce_ropa.pago: ~0 rows (aproximadamente)
INSERT INTO `pago` (`id_pago`, `metodo`, `estado`, `id_pedido`) VALUES
	('PAGSZIZF10', 'tarjeta', 'completado', 'PED5TTJZLC');

-- Volcando estructura para tabla ecommerce_ropa.pedido
CREATE TABLE IF NOT EXISTS `pedido` (
  `id_pedido` varchar(20) NOT NULL,
  `fecha` timestamp NULL DEFAULT current_timestamp(),
  `id_usuario` varchar(20) NOT NULL,
  `direccion_calle` varchar(255) DEFAULT NULL,
  `direccion_ciudad` varchar(100) DEFAULT NULL,
  `direccion_departamento` varchar(100) DEFAULT NULL,
  `direccion_codigo_postal` varchar(20) DEFAULT NULL,
  `direccion_telefono` varchar(30) DEFAULT NULL,
  `direccion_referencias` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_pedido_usuario` (`id_usuario`),
  CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce_ropa.pedido: ~0 rows (aproximadamente)
INSERT INTO `pedido` (`id_pedido`, `fecha`, `id_usuario`, `direccion_calle`, `direccion_ciudad`, `direccion_departamento`, `direccion_codigo_postal`, `direccion_telefono`, `direccion_referencias`) VALUES
	('PED5TTJZLC', '2026-05-27 22:13:47', 'USR002', 'calle 1', 'popayan ', 'cauca', '10201', '3125462802', 'el auce');

-- Volcando estructura para tabla ecommerce_ropa.producto
CREATE TABLE IF NOT EXISTS `producto` (
  `id_producto` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `id_categoria` varchar(10) NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `fk_producto_categoria` (`id_categoria`),
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce_ropa.producto: ~0 rows (aproximadamente)
INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion`, `precio`, `imagen`, `id_categoria`) VALUES
	('PRD001', 'Camiseta Basica Blanca', 'Camiseta de algodon 100% en color blanco, perfecta para el dia a dia.', 59900.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', 'CAT001'),
	('PRD002', 'Camiseta Estampada Urban', 'Camiseta con diseno urbano moderno, tejido suave y resistente.', 79900.00, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop', 'CAT001'),
	('PRD003', 'Camiseta Polo Classic', 'Polo elegante de pique con cuello y botones.', 99900.00, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80', 'CAT001'),
	('PRD004', 'Jeans Slim Fit Azul', 'Jeans de corte slim en denim premium azul oscuro.', 159900.00, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop', 'CAT002'),
	('PRD005', 'Pantalon Chino Beige', 'Pantalon chino clasico en color beige.', 119900.00, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=500&fit=crop', 'CAT002'),
	('PRD006', 'Jogger Deportivo Negro', 'Jogger comodo en tela tecnica.', 89900.00, 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500&h=500&fit=crop', 'CAT002'),
	('PRD007', 'Vestido Floral Verano', 'Vestido ligero con estampado floral.', 139900.00, 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&auto=format&fit=crop&q=80', 'CAT003'),
	('PRD008', 'Vestido Elegante Negro', 'Vestido negro de corte elegante.', 259900.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-989NVALeqeU-zKENihoB9E3fLgIln5R1iQ&s', 'CAT003'),
	('PRD009', 'Sneakers Blancos Classic', 'Zapatillas blancas de estilo clasico.', 179900.00, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop', 'CAT004'),
	('PRD010', 'Botas Chelsea Negras', 'Botas estilo Chelsea en cuero sintetico negro.', 239900.00, 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500&h=500&fit=crop', 'CAT004'),
	('PRD011', 'Zapatos de Tacon Elegantes', 'Zapatos de tacon alto perfectos para fiestas y eventos formales.', 189900.00, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&fit=crop', 'CAT004'),
	('PRD012', 'Gafas de Sol Premium', 'Gafas de sol con proteccion UV400 y diseno moderno.', 65000.00, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&fit=crop', 'CAT005'),
	('PRD013', 'Reloj de Pulsera Minimalista', 'Reloj elegante con correa de cuero negro.', 220000.00, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&fit=crop', 'CAT005'),
	('PRD014', 'Chaqueta de Cuero Rocker', 'Chaqueta de cuero sintetico negro con cremalleras metalicas.', 289900.00, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&fit=crop', 'CAT006'),
	('PRD015', 'Chaqueta Denim Oversize', 'Chaqueta de jean clasica con estilo holgado.', 145000.00, 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=500&fit=crop', 'CAT006'),
	('PRD016', 'Falda Plisada Casual', 'Falda comoda y ligera de tiro alto, ideal para el dia.', 89900.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrTK-bnv9IW8KqhceJ1BKXwhltm-rb-qmBg&s', 'CAT007'),
	('PRD017', 'Camiseta Oversize Anime', 'Camiseta de corte suelto con un increíble estampado sutil estilo manga.', 85000.00, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&fit=crop', 'CAT001'),
	('PRD018', 'Falda de Mezclilla Clasica', 'Falda de Jean con botones frontales, tiro alto y bolsillos funcionales.', 95000.00, 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=80', 'CAT007'),
	('PRD019', 'Falda Larga Ajustada', 'Falda larga de canalé, elástica y súper cómoda para cualquier ocasión.', 110000.00, 'https://www.sevenseven.com/dw/image/v2/BHFM_PRD/on/demandware.static/-/Sites-storefront_catalog_sevenseven/default/dwbbcaf73f/images/hi-res/Enero_2025/Enero_15/Camisetas-Estampadas-para-mujer-28096098-9667_1.jpg?sw=800&sh=960', 'CAT007'),
	('PRD020', 'Vestido de Gala Rojo', 'Elegante vestido largo de gala en color rojo vibrante, ideal para ocasiones especiales.', 320000.00, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80', 'CAT003'),
	('PRD021', 'Vestido Casual de Lino', 'Vestido corto de lino, fresco y cómodo, con botones frontales para los días de sol.', 125000.00, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80', 'CAT003'),
	('PRD0HGIHZ6', 'Medias', 'Medias para jugar futbol', 20000.00, 'https://jogo.com.co/cdn/shop/files/medias-de-futbol-negras-jogo.webp?v=1758892912&width=1080', 'CATDXW3VDV');

-- Volcando estructura para tabla ecommerce_ropa.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `id_rol` varchar(10) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce_ropa.rol: ~2 rows (aproximadamente)
INSERT INTO `rol` (`id_rol`, `nombre`) VALUES
	('ROL001', 'Cliente'),
	('ROL002', 'Administrador');

-- Volcando estructura para tabla ecommerce_ropa.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` varchar(20) NOT NULL,
  `nombreusuario` varchar(50) NOT NULL,
  `emailusuario` varchar(80) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `id_rol` varchar(10) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `emailusuario` (`emailusuario`),
  KEY `fk_usuario_rol` (`id_rol`),
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Volcando datos para la tabla ecommerce_ropa.usuario: ~0 rows (aproximadamente)
INSERT INTO `usuario` (`id_usuario`, `nombreusuario`, `emailusuario`, `telefono`, `clave`, `id_rol`) VALUES
	('USR001', 'Administrador', 'admin@tienda.com', '3001234567', 'admin123', 'ROL002'),
	('USR002', 'Cliente Demo', 'cliente@test.com', '3009876543', 'cliente123', 'ROL001');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
