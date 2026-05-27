/**
 * ============================================================
 * VISTA - Página de Categorías (MVC)
 * ============================================================
 */

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { CategoryModelMySQL, ProductModelMySQL } from "@/lib/db/models/product.mysql";
import type { Categoria } from "@/lib/models/types";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata = {
  title: "Categorías - MODA E-Commerce",
  description: "Explora todas las categorías de productos",
};

interface CategoriaConPreview extends Categoria {
  productosCount: number;
  productosPreview: Array<{ id_producto: string; imagen?: string }>;
}

export default async function CategoriesPage() {
  const categorias = await CategoryModelMySQL.getAll();

  const categoriasConPreview: CategoriaConPreview[] = await Promise.all(
    categorias.map(async (categoria) => {
      const productos = await ProductModelMySQL.getByCategoria(categoria.id_categoria);
      return {
        ...categoria,
        productosCount: productos.length,
        productosPreview: productos.slice(0, 3).map((producto) => ({
          id_producto: producto.id_producto,
          imagen: producto.imagen,
        })),
      };
    })
  );

  return (
    <main className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Categorías</h1>
        <p className="text-muted-foreground">
          Explora nuestra colección por categorías
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriasConPreview.map((categoria) => (
          <Link
            key={categoria.id_categoria}
            href={`/products?categoria=${categoria.id_categoria}`}
          >
            <Card className="group hover:shadow-lg transition-shadow overflow-hidden">
              <div className="grid grid-cols-3 h-40">
                {categoria.productosPreview.map((producto) => (
                  <div
                    key={producto.id_producto}
                    className="relative bg-muted overflow-hidden"
                    style={{
                      backgroundImage: `url(${producto.imagen || '/placeholder.jpg'})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ))}
                {categoria.productosPreview.length < 3 &&
                  Array.from({ length: 3 - categoria.productosPreview.length }).map((_, i) => (
                    <div key={i} className="bg-muted" />
                  ))}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {categoria.nombre}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {categoria.productosCount} productos
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
