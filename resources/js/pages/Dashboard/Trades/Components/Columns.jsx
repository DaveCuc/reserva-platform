import { router } from "@inertiajs/react";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

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
        accessorKey: "email",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Correo
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const value = row.getValue("email");
            return value ? value : "Sin definir";
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

                        <DropdownMenuItem
                            className="cursor-pointer text-rose-700 focus:text-rose-800"
                            onClick={() => {
                                if (window.confirm("¿Deseas eliminar este registro? Esta acción no se puede deshacer.")) {
                                    router.delete(`/directory/trades/${id}`);
                                }
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
