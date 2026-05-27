-- ============================================================
-- MIGRATION: Agregar soporte para tallas en carrito y pedidos
-- ============================================================
-- Este script agrega las columnas tallaSeleccionada a las tablas
-- detalle_carrito y detalle_pedido para soportar la selección
-- de tallas en productos de ropa.
-- ============================================================

USE ecommerce_ropa;

-- Agregar columna tallaSeleccionada a detalle_carrito
ALTER TABLE detalle_carrito ADD COLUMN tallaSeleccionada VARCHAR(50) NULL DEFAULT NULL;

-- Agregar columna tallaSeleccionada a detalle_pedido
ALTER TABLE detalle_pedido ADD COLUMN tallaSeleccionada VARCHAR(50) NULL DEFAULT NULL;

-- Verificar que las columnas se agregaron correctamente
SHOW COLUMNS FROM detalle_carrito;
SHOW COLUMNS FROM detalle_pedido;
