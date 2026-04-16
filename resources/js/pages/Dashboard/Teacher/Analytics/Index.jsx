import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { DataCard } from './Components/DataCard';
import { Chart } from './Components/Chart';

export default function AnalyticsIndex({ data, totalRevenue, totalSales }) {
  return (
    <MainLayout>
      <Head title="Estadísticas Estudiantiles" />
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DataCard
            label="Ingresos Totales"
            value={totalRevenue}
            shouldFormat
          />
          <DataCard
            label="Ventas Totales"
            value={totalSales}
          />
        </div>
        <Chart data={data} />
      </div>
    </MainLayout>
  );
}
