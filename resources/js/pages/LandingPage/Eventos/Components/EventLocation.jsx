import React from 'react';
import { Calendar } from 'lucide-react';

export default function EventLocation({ event }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('es-ES', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <section className="w-full bg-brand">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16 text-white">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Calendar className="w-6 h-6 mr-3 opacity-80" /> Cuándo y Dónde
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-brand-mint text-sm font-semibold uppercase tracking-wider mb-2">Cuándo</h4>
            <p className="font-medium text-lg">
              {event.event_date ? formatDate(event.event_date) : "Fecha por confirmar"}
            </p>
            {event.event_time && <p className="text-white/90 mt-1">{event.event_time}</p>}
          </div>

          <div>
            <h4 className="text-brand-mint text-sm font-semibold uppercase tracking-wider mb-2">Dónde</h4>
            <p className="font-medium text-lg leading-relaxed">
              {event.location || "Ubicación por confirmar"}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
