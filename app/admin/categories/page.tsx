"use client";

/**
 * ============================================================
 * VISTA - Gestión de Categorías (MVC)
 * ============================================================
 */

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Plus,
  RefreshCcw,
  Pencil,
  Trash2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface CategoriaExtendida {
  id_categoria: string;
  nombre: string;
  imagen?: string;
  productos_count: number;
}

export default function AdminCategoriesPage() {
  const [categorias, setCategorias] = useState<CategoriaExtendida[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingCategory, setEditingCategory] = useState<CategoriaExtendida | null>(null);
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();

      if (!response.ok || !data.success) {
        setCategorias([]);
        setError(data.message || "No se pudieron cargar las categorías");
        return;
      }

      setCategorias(data.data || []);
    } catch {
      setCategorias([]);
      setError("Error cargando categorías");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setNombre("");
    setImagen("");
    setEditingCategory(null);
    setError("");
    setSuccess("");
  };

  const handleEdit = (categoria: CategoriaExtendida) => {
    setEditingCategory(categoria);
    setNombre(categoria.nombre);
    setImagen(categoria.imagen || "");
    setError("");
    setSuccess("");
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const url = "/api/categories";
      const method = editingCategory ? "PUT" : "POST";
      const body = editingCategory
        ? { id_categoria: editingCategory.id_categoria, nombre, imagen }
        : { nombre, imagen };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.message || "Error creando/actualizando categoría");
        return;
      }

      setSuccess(editingCategory ? "Categoría actualizada" : "Categoría creada");
      setIsDialogOpen(false);
      resetForm();
      await loadData();
    } catch {
      setError("Error de conexión");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta categoría?")) return;

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "No se pudo eliminar la categoría");
        return;
      }

      setSuccess("Categoría eliminada");
      await loadData();
    } catch {
      setError("Error eliminando categoría");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categorías</h1>
          <p className="text-muted-foreground">
            Administra todas las categorías y revisa cuántos productos contiene cada una.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={loadData}
            disabled={isLoading}
          >
            <RefreshCcw className="h-4 w-4" />
            Actualizar lista
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva Categoría
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Accesorios"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imagen">URL de imagen</Label>
                  <Input
                    id="imagen"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                {imagen && (
                  <div className="rounded-md overflow-hidden border border-border">
                    <img
                      src={imagen}
                      alt="Vista previa de categoría"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingCategory ? (
                    "Actualizar categoría"
                  ) : (
                    "Crear categoría"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 bg-green-50 text-green-700">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Imagen</TableHead>
                <TableHead className="text-right">Productos</TableHead>
                <TableHead className="w-24">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Cargando categorías...
                    </div>
                  </TableCell>
                </TableRow>
              ) : categorias.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No hay categorías registradas. Agrega una nueva categoría para empezar.
                  </TableCell>
                </TableRow>
              ) : (
                categorias.map((categoria) => (
                  <TableRow key={categoria.id_categoria}>
                    <TableCell className="font-mono text-sm">
                      {categoria.id_categoria}
                    </TableCell>
                    <TableCell className="font-medium">{categoria.nombre}</TableCell>
                    <TableCell>
                      {categoria.imagen ? (
                        <img
                          src={categoria.imagen}
                          alt={categoria.nombre}
                          className="h-10 w-16 rounded object-cover"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">Sin imagen</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{categoria.productos_count}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(categoria)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(categoria.id_categoria)}
                          className="text-destructive"
                          disabled={categoria.productos_count > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
