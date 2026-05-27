/**
 * ============================================================
 * CONTROLADOR - Inventario (MVC)
 * ============================================================
 * Endpoints: GET, PUT /api/inventory
 * Cumplimiento: ISO 9001, ISO/IEC 25000, CMMI
 * ============================================================
 */

import { NextRequest, NextResponse } from "next/server";
import { InventoryModelMySQL } from "@/lib/db/models/inventory.mysql";

// GET - Obtener inventario
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lowStock = searchParams.get("low_stock") === "true";
    const id_producto = searchParams.get("id_producto");

    // Obtener inventario de producto especifico
    if (id_producto) {
      const inventario = await InventoryModelMySQL.findByProducto(id_producto);
      if (!inventario) {
        return NextResponse.json(
          { success: false, message: "Producto no encontrado" },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: inventario,
      });
    }

    // Obtener productos con bajo stock
    if (lowStock) {
      const inventarios = await InventoryModelMySQL.getLowStock();
      return NextResponse.json({
        success: true,
        data: inventarios,
        total: inventarios.length,
      });
    }

    // Obtener todo el inventario
    const inventarios = await InventoryModelMySQL.getAll();

    return NextResponse.json({
      success: true,
      data: inventarios,
      total: inventarios.length,
    });
  } catch (error) {
    console.error("[v0] Error obteniendo inventario:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar stock
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_producto, stock, action, cantidad } = body;
    const stockNumber = stock !== undefined && stock !== null ? Number(stock) : undefined;
    const cantidadNumber = cantidad !== undefined && cantidad !== null ? Number(cantidad) : undefined;

    if (!id_producto) {
      return NextResponse.json(
        { success: false, message: "ID de producto requerido" },
        { status: 400 }
      );
    }

    if (stockNumber !== undefined && Number.isNaN(stockNumber)) {
      return NextResponse.json(
        { success: false, message: "Stock inválido" },
        { status: 400 }
      );
    }

    if (cantidadNumber !== undefined && Number.isNaN(cantidadNumber)) {
      return NextResponse.json(
        { success: false, message: "Cantidad inválida" },
        { status: 400 }
      );
    }

    let resultado;

    if (action === "add" && cantidadNumber !== undefined) {
      resultado = await InventoryModelMySQL.addStock(id_producto, cantidadNumber);
    } else if (action === "remove" && cantidadNumber !== undefined) {
      resultado = await InventoryModelMySQL.removeStock(id_producto, cantidadNumber);
    } else if (stockNumber !== undefined) {
      resultado = await InventoryModelMySQL.updateStock(id_producto, stockNumber);
    } else {
      return NextResponse.json(
        { success: false, message: "Debe especificar stock o action con cantidad" },
        { status: 400 }
      );
    }

    if (!resultado.success) {
      return NextResponse.json(
        { success: false, message: resultado.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: resultado.message,
      data: resultado.inventario,
    });
  } catch (error) {
    console.error("[v0] Error actualizando inventario:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
