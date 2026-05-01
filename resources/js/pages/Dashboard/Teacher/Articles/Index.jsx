import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { DataTable } from "./Components/DataTable";
import { columns } from "./Components/Columns";

export default function TeacherArticles({ articles }) {
    return ( 
        <MainLayout>
            <Head title="Mis Artículos" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Gestión de Artículos</h1>
                <DataTable columns={columns} data={articles} />
            </div>
        </MainLayout>
    );
}
