import React from 'react';
import { Head, Link } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export default function EventosIndex({ events }) {
  return (
    <HomeLayout>
      <Head title="Eventos de la Comunidad" />

      <main className="pt-24 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-brand-text tracking-tight">Próximos Eventos</h1>
          <p className="mt-4 text-lg text-brand-ink max-w-2xl mx-auto">
            Descubre y regístrate en los eventos más recientes de la comunidad. Aprende, conecta y construye el futuro con nosotros.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-brand-panel">
            <Calendar className="w-12 h-12 text-brand-soft mx-auto mb-4" />
            <h3 className="text-xl font-medium text-brand-text">No hay eventos próximos</h3>
            <p className="text-brand-ink mt-2">Vuelve pronto para enterarte de nuestras novedades.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Link href={`/eventos/${event.id}`} key={event.id} className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-brand-panel overflow-hidden">
                <div className="relative h-48 w-full bg-brand-light overflow-hidden">
                  {event.image_url ? (
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-light">
                      <Calendar className="w-10 h-10 text-brand-soft" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand shadow-sm">
                    {new Date(event.event_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-brand-text mb-2 line-clamp-2 group-hover:text-brand transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-sm text-brand-ink mb-4">
                    <MapPin className="w-4 h-4 mr-1 shrink-0" />
                    <span className="truncate">{event.location || event.short_description || "Ubicación por confirmar"}</span>
                  </div>
                  <div className="mt-auto pt-4 border-t border-brand-panel flex items-center justify-between text-brand font-medium text-sm">
                    <span>Ver detalles</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </HomeLayout>
  );
}