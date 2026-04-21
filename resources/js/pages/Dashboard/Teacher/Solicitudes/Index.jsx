import { Head } from "@inertiajs/react";

import MainLayout from "@/Layouts/MainLayout";
import { DataTable } from "./Components/DataTable";
import { columns } from "./Components/Columns";

export default function TeacherSolicitudesIndex({ trades }) {
    return (
        <MainLayout>
            <Head title="Solicitudes" />
            <div className="p-6">
                <h1 className="mb-4 text-2xl font-bold">Solicitudes de Negocios</h1>
                <DataTable columns={columns} data={trades} />
            </div>
        </MainLayout>
    );
}
