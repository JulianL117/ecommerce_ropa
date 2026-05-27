-- Migra la tabla categoria para soportar el campo de imagen
ALTER TABLE categoria
ADD COLUMN imagen VARCHAR(500) NULL;
