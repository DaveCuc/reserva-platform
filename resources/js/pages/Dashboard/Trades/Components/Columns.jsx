import { router } from "@inertiajs/react";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Badge } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";

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
        accessorKey: "giro",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Giro
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const selectedGiros = row.original.giros || [];
            if (selectedGiros.length) {
                return selectedGiros.map((giro) => giro.name).join(', ');
            }

            const value = row.getValue("giro");
            return value ? value : "Sin definir";
        },
    },
    {
        accessorKey: "descripcion_corta",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Descripción corta
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const value = row.getValue("descripcion_corta");
            if (!value) {
                return "Sin definir";
            }

            return String(value).length > 70 ? `${String(value).slice(0, 70)}...` : value;
        },
    },
    {
        accessorKey: "phone",
        header: "Contacto negocio",
        cell: ({ row }) => {
            const phone = row.original.phone || "Sin teléfono";
            const email = row.original.email || "Sin correo";
            return `${phone} | ${email}`;
        },
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

            if (status === "approved") {
                return <Badge className={cn("bg-emerald-600")}>Aprobado</Badge>;
            }

            if (status === "pending") {
                return <Badge className={cn("bg-amber-500")}>En solicitud</Badge>;
            }

            if (status === "rejected") {
                return <Badge className={cn("bg-rose-600")}>Rechazado</Badge>;
            }

            return (
                <Badge className={cn("bg-brand-ink")}>Borrador</Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => router.visit(`/directory/trades/${id}/edit`)}
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
