import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { DataTable } from "./Components/DataTable";
import { columns } from "./Components/Columns";

export default function TeacherEvents({ events }) {
    return ( 
        <MainLayout>
            <Head title="Mis Eventos" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Gestión de Eventos</h1>
                <DataTable columns={columns} data={events} />
            </div>
        </MainLayout>
    );
}
