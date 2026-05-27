/**
 * ============================================================
 * MODELO - Producto con MySQL (MVC)
 * ============================================================
 * Cumplimiento de normas:
 * - ISO 9001:2015 - Gestión de calidad en catálogo
 * - IEEE 730 - Trazabilidad de productos
 * - ISO/IEC 25000 (SQuaRE) - Funcionalidad y eficiencia
 * - ISO/IEC 12207 - Ciclo de vida del software
 * - CMMI Nivel 2 - Gestión de requisitos de producto
 * ============================================================
 */

import { query } from '../mysql';
import type { Producto, FiltrosProducto, Categoria } from '@/lib/models/types';
import { productos as productosDefault } from '@/lib/models/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

/**
 * Interfaces para resultados de MySQL
 */
interface ProductoRow extends Producto, RowDataPacket {}
interface CategoriaRow extends Categoria, RowDataPacket {}

/**
 * Generador de IDs únicos (máximo 10 caracteres para MySQL VARCHAR(10))
 */
function generarId(prefijo: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random = '';
  for (let i = 0; i < 7; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefijo.substring(0, 3)}${random}`;
}

function fallbackProductImage(id_producto: string): string | undefined {
  return productosDefault.find((item) => item.id_producto === id_producto)?.imagen;
}

/**
 * Clase ProductModel - Operaciones CRUD para productos con MySQL
 */
export class ProductModelMySQL {
  /**
   * Obtener todos los productos con filtros
   */
  static async getAll(filtros?: FiltrosProducto): Promise<Producto[]> {
    let sql = `
      SELECT p.*, c.nombre as categoria_nombre, c.id_categoria as cat_id
      FROM producto p
      LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
      WHERE 1=1
    `;
    const params: unknown[] = [];

    if (filtros?.categoria) {
      sql += ' AND p.id_categoria = ?';
      params.push(filtros.categoria);
    }

    if (filtros?.precio_min !== undefined) {
      sql += ' AND p.precio >= ?';
      params.push(filtros.precio_min);
    }

    if (filtros?.precio_max !== undefined) {
      sql += ' AND p.precio <= ?';
      params.push(filtros.precio_max);
    }

    if (filtros?.busqueda) {
      sql += ' AND (p.nombre LIKE ? OR p.descripcion LIKE ?)';
      const busqueda = `%${filtros.busqueda}%`;
      params.push(busqueda, busqueda);
    }

    // Ordenamiento
    switch (filtros?.orden) {
      case 'precio_asc':
        sql += ' ORDER BY p.precio ASC';
        break;
      case 'precio_desc':
        sql += ' ORDER BY p.precio DESC';
        break;
      case 'nombre':
        sql += ' ORDER BY p.nombre ASC';
        break;
      case 'reciente':
        sql += ' ORDER BY p.id_producto DESC';
        break;
      default:
        sql += ' ORDER BY p.id_producto ASC';
    }

    const rows = await query<ProductoRow[]>(sql, params);

    return rows.map((row) => ({
      id_producto: row.id_producto,
      nombre: row.nombre,
      descripcion: row.descripcion,
      precio: Number(row.precio),
      id_categoria: row.id_categoria,
      imagen: row.imagen || fallbackProductImage(row.id_producto),
      categoria: row.categoria_nombre
        ? { id_categoria: row.cat_id, nombre: row.categoria_nombre }
        : undefined,
    }));
  }

  /**
   * Obtener producto por ID
   */
  static async findById(id: string): Promise<Producto | null> {
    const rows = await query<ProductoRow[]>(
      `SELECT p.*, c.nombre as categoria_nombre
       FROM producto p
       LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
       WHERE p.id_producto = ?`,
      [id]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id_producto: row.id_producto,
      nombre: row.nombre,
      descripcion: row.descripcion,
      precio: Number(row.precio),
      id_categoria: row.id_categoria,
      imagen: row.imagen || fallbackProductImage(row.id_producto),
      categoria: row.categoria_nombre
        ? { id_categoria: row.id_categoria, nombre: row.categoria_nombre }
        : undefined,
    };
  }

  /**
   * Obtener stock de un producto
   */
  static async getStock(id_producto: string): Promise<number> {
    const rows = await query<RowDataPacket[]>(
      'SELECT stock FROM inventario WHERE id_producto = ?',
      [id_producto]
    );
    return rows.length > 0 ? rows[0].stock : 0;
  }

  /**
   * Obtener productos por categoría
   */
  static async getByCategoria(id_categoria: string): Promise<Producto[]> {
    return this.getAll({ categoria: id_categoria });
  }

  /**
   * Crear nuevo producto (admin)
   */
  static async create(
    datos: Omit<Producto, 'id_producto'>
  ): Promise<{ success: boolean; producto?: Producto; message: string }> {
    // Validar categoría
    const categorias = await query<CategoriaRow[]>(
      'SELECT * FROM categoria WHERE id_categoria = ?',
      [datos.id_categoria]
    );

    if (categorias.length === 0) {
      return { success: false, message: 'Categoría no válida' };
    }

    const id_producto = generarId('PRD');
    const id_inventario = generarId('INV');

    try {
      // Insertar producto
      await query<ResultSetHeader>(
        `INSERT INTO producto (id_producto, nombre, descripcion, precio, id_categoria, imagen)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          id_producto,
          datos.nombre,
          datos.descripcion,
          datos.precio,
          datos.id_categoria,
          datos.imagen || null,
        ]
      );

      // Crear entrada de inventario con stock 0
      await query<ResultSetHeader>(
        'INSERT INTO inventario (id_inventario, stock, id_producto) VALUES (?, 0, ?)',
        [id_inventario, id_producto]
      );

      const producto = await this.findById(id_producto);

      return {
        success: true,
        producto: producto || undefined,
        message: 'Producto creado exitosamente',
      };
    } catch (error) {
      console.error('[ProductModel] Error al crear producto:', error);
      return { success: false, message: 'Error al crear producto' };
    }
  }

  /**
   * Actualizar producto (admin)
   */
  static async update(
    id: string,
    datos: Partial<Producto>
  ): Promise<{ success: boolean; producto?: Producto; message: string }> {
    const producto = await this.findById(id);
    if (!producto) {
      return { success: false, message: 'Producto no encontrado' };
    }

    const updates: string[] = [];
    const params: unknown[] = [];

    if (datos.nombre) {
      updates.push('nombre = ?');
      params.push(datos.nombre);
    }
    if (datos.descripcion) {
      updates.push('descripcion = ?');
      params.push(datos.descripcion);
    }
    if (datos.precio !== undefined) {
      updates.push('precio = ?');
      params.push(datos.precio);
    }
    if (datos.id_categoria) {
      updates.push('id_categoria = ?');
      params.push(datos.id_categoria);
    }
    if (datos.imagen !== undefined) {
      updates.push('imagen = ?');
      params.push(datos.imagen || null);
    }

    if (updates.length === 0) {
      return { success: false, message: 'No hay datos para actualizar' };
    }

    params.push(id);

    await query<ResultSetHeader>(
      `UPDATE producto SET ${updates.join(', ')} WHERE id_producto = ?`,
      params
    );

    const productoActualizado = await this.findById(id);

    return {
      success: true,
      producto: productoActualizado || undefined,
      message: 'Producto actualizado',
    };
  }

  /**
   * Eliminar producto (admin)
   */
  static async delete(id: string): Promise<{ success: boolean; message: string }> {
    const producto = await this.findById(id);
    if (!producto) {
      return { success: false, message: 'Producto no encontrado' };
    }

    try {
      // Eliminar inventario primero (foreign key)
      await query<ResultSetHeader>(
        'DELETE FROM inventario WHERE id_producto = ?',
        [id]
      );

      // Eliminar detalles de carrito
      await query<ResultSetHeader>(
        'DELETE FROM detalle_carrito WHERE id_producto = ?',
        [id]
      );

      // Eliminar producto
      await query<ResultSetHeader>(
        'DELETE FROM producto WHERE id_producto = ?',
        [id]
      );

      return { success: true, message: 'Producto eliminado' };
    } catch (error) {
      console.error('[ProductModel] Error al eliminar producto:', error);
      return { success: false, message: 'Error al eliminar producto' };
    }
  }

  /**
   * Contar productos
   */
  static async count(): Promise<number> {
    const result = await query<RowDataPacket[]>('SELECT COUNT(*) as count FROM producto');
    return result[0]?.count || 0;
  }

  /**
   * Obtener productos destacados
   */
  static async getFeatured(limit: number = 8): Promise<Producto[]> {
    const rows = await query<ProductoRow[]>(
      `SELECT p.*, c.nombre as categoria_nombre
       FROM producto p
       LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
       ORDER BY p.id_producto
       LIMIT ?`,
      [limit]
    );

    return rows.map((row) => ({
      id_producto: row.id_producto,
      nombre: row.nombre,
      descripcion: row.descripcion,
      precio: Number(row.precio),
      id_categoria: row.id_categoria,
      imagen: row.imagen,
      categoria: row.categoria_nombre
        ? { id_categoria: row.id_categoria, nombre: row.categoria_nombre }
        : undefined,
    }));
  }
}

/**
 * Clase CategoryModel - Operaciones CRUD para categorías con MySQL
 */
export class CategoryModelMySQL {
  private static imageColumnExists?: boolean;

  private static async supportsImageColumn(): Promise<boolean> {
    if (this.imageColumnExists !== undefined) {
      return this.imageColumnExists;
    }

    const rows = await query<RowDataPacket[]>(
      `SELECT COUNT(*) AS count
       FROM information_schema.columns
       WHERE table_schema = DATABASE()
         AND table_name = 'categoria'
         AND column_name = 'imagen'`
    );

    this.imageColumnExists = Number(rows[0]?.count || 0) > 0;
    return this.imageColumnExists;
  }

  /**
   * Obtener todas las categorías
   */
  static async getAll(): Promise<Categoria[]> {
    const selectFields = await this.supportsImageColumn()
      ? 'id_categoria, nombre, imagen'
      : 'id_categoria, nombre';

    const rows = await query<CategoriaRow[]>(
      `SELECT ${selectFields} FROM categoria ORDER BY nombre`
    );
    return rows;
  }

  /**
   * Obtener categoría por ID
   */
  static async findById(id: string): Promise<Categoria | null> {
    const selectFields = await this.supportsImageColumn()
      ? 'id_categoria, nombre, imagen'
      : 'id_categoria, nombre';

    const rows = await query<CategoriaRow[]>(
      `SELECT ${selectFields} FROM categoria WHERE id_categoria = ?`,
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Crear categoría (admin)
   */
  static async create(
    nombre: string,
    imagen?: string
  ): Promise<{ success: boolean; categoria?: Categoria; message: string }> {
    if (!nombre || nombre.trim().length === 0) {
      return { success: false, message: 'Nombre requerido' };
    }

    // Verificar nombre único
    const existente = await query<CategoriaRow[]>(
      'SELECT * FROM categoria WHERE LOWER(nombre) = LOWER(?)',
      [nombre.trim()]
    );

    if (existente.length > 0) {
      return { success: false, message: 'La categoría ya existe' };
    }

    const id_categoria = generarId('CAT');
    const hasImagen = await this.supportsImageColumn();
    const sql = hasImagen
      ? 'INSERT INTO categoria (id_categoria, nombre, imagen) VALUES (?, ?, ?)'
      : 'INSERT INTO categoria (id_categoria, nombre) VALUES (?, ?)';
    const params: unknown[] = hasImagen
      ? [id_categoria, nombre.trim(), imagen?.trim() || null]
      : [id_categoria, nombre.trim()];

    await query<ResultSetHeader>(sql, params);

    const categoria = await this.findById(id_categoria);

    return {
      success: true,
      categoria: categoria || undefined,
      message: 'Categoría creada',
    };
  }

  /**
   * Actualizar categoría (admin)
   */
  static async update(
    id: string,
    nombre: string,
    imagen?: string
  ): Promise<{ success: boolean; categoria?: Categoria; message: string }> {
    const categoria = await this.findById(id);
    if (!categoria) {
      return { success: false, message: 'Categoría no encontrada' };
    }

    const updates: string[] = ['nombre = ?'];
    const params: unknown[] = [nombre.trim()];
    const hasImagen = await this.supportsImageColumn();

    if (imagen !== undefined && hasImagen) {
      updates.push('imagen = ?');
      params.push(imagen?.trim() || null);
    }

    params.push(id);

    await query<ResultSetHeader>(
      `UPDATE categoria SET ${updates.join(', ')} WHERE id_categoria = ?`,
      params
    );

    const categoriaActualizada = await this.findById(id);

    return {
      success: true,
      categoria: categoriaActualizada || undefined,
      message: 'Categoría actualizada',
    };
  }

  /**
   * Eliminar categoría (admin)
   */
  static async delete(id: string): Promise<{ success: boolean; message: string }> {
    // Verificar que no haya productos en la categoría
    const productosEnCategoria = await query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM producto WHERE id_categoria = ?',
      [id]
    );

    if (productosEnCategoria[0]?.count > 0) {
      return {
        success: false,
        message: 'No se puede eliminar: hay productos en esta categoría',
      };
    }

    const categoria = await this.findById(id);
    if (!categoria) {
      return { success: false, message: 'Categoría no encontrada' };
    }

    await query<ResultSetHeader>(
      'DELETE FROM categoria WHERE id_categoria = ?',
      [id]
    );

    return { success: true, message: 'Categoría eliminada' };
  }

  /**
   * Contar productos por categoría
   */
  static async countProducts(id_categoria: string): Promise<number> {
    const result = await query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM producto WHERE id_categoria = ?',
      [id_categoria]
    );
    return result[0]?.count || 0;
  }
}
