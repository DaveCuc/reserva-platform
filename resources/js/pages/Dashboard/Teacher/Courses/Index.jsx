import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { DataTable } from "./Components/DataTable";
import { columns } from "./Components/Columns";

export default function TeacherCourses({ courses }) {
    return ( 
        <MainLayout>
            <Head title="Mis Cursos" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Gestión de Cursos</h1>
                <DataTable columns={columns} data={courses} />
            </div>
        </MainLayout>
    );
}
