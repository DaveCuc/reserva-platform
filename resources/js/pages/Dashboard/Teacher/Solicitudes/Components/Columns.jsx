import { Link } from "@inertiajs/react";
import { ArrowUpDown } from "lucide-react";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";

export const columns = [
    {
        accessorKey: "comercial_name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nombre comercial
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "user.name",
        header: "Solicitante",
        cell: ({ row }) => row.original.user?.name || "Sin usuario",
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Estado
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") || "draft";

            if (status === "pending") {
                return <Badge className="bg-amber-500">Pendiente</Badge>;
            }

            if (status === "approved") {
                return <Badge className="bg-emerald-600">Aprobado</Badge>;
            }

            if (status === "rejected") {
                return <Badge className="bg-rose-600">Rechazado</Badge>;
            }

            return <Badge className="bg-brand-ink">Borrador</Badge>;
        },
    },
    {
        accessorKey: "updated_at",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Última actualización
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const value = row.original.updated_at;
            return value ? new Date(value).toLocaleDateString("es-MX") : "-";
        },
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
            <Link href={`/teacher/solicitudes/${row.original.id}`}>
                <Button variant="outline" size="sm">Ver detalle</Button>
            </Link>
        ),
    },
];
