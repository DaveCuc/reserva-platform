import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { CheckCircle, Clock } from 'lucide-react';
import { InfoCard } from './Components/InfoCard';
import { CoursesList } from './Search/Components/CoursesList';

export default function Dashboard({ completedCourses, coursesInProgress }) {
    return (
        <MainLayout>
            <Head title="Mi Espacio de Estudiante" />
            <div className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard
                  icon={Clock}
                  label="Cursos en Progreso"
                  numberOfItems={coursesInProgress.length}
                />
                <InfoCard
                  icon={CheckCircle}
                  label="Cursos Completados"
                  numberOfItems={completedCourses.length}
                  variant="success"
                />
              </div>

              <div className="pt-2">
                <h2 className="text-xl font-bold tracking-tight text-brand-text mb-4">Continuar Aprendiendo</h2>
                <CoursesList items={[...coursesInProgress, ...completedCourses]} />
              </div>
            </div>
        </MainLayout>
    );
}
