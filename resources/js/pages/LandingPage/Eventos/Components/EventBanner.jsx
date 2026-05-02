import React from 'react';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/Components/ui/button';

export default function EventBanner({ event, isScrolled }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const cleanDate = dateStr.substring(0, 10);
    return new Date(cleanDate + 'T12:00:00').toLocaleDateString('es-ES', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const isPastEvent = event.event_date ? new Date(event.event_date.substring(0, 10) + 'T23:59:59') < new Date() : false;

  return (
    <div className={`sticky top-[80px] z-40 bg-white border-b border-brand-panel shadow-sm transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-brand-text font-medium">
          {event.event_date && (
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-brand" />
              {formatDate(event.event_date)}
            </div>
          )}
          {event.event_time && (
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-brand" />
              {event.event_time}
            </div>
          )}
        </div>
        <div>
          {isPastEvent ? (
            <Button size="lg" disabled className="bg-brand-panel text-brand-ink cursor-not-allowed px-8 shadow-sm font-bold">
              Evento Finalizado
            </Button>
          ) : event.rsvp_link ? (
            <a href={event.rsvp_link} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-brand hover:bg-brand-dark text-white font-bold px-8 shadow-md">
                RSVP / Registrarme <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          ) : (
            <Button size="lg" disabled className="bg-brand-panel text-brand-ink cursor-not-allowed font-bold">
              Registro no disponible
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
