import React from 'react';

export default function EventAbout({ event }) {
  return (
    <>
      <h2 className="text-3xl font-bold text-brand-text mb-6">Acerca del evento</h2>
      <div className="prose prose-lg max-w-none text-brand-ink prose-headings:text-brand-text prose-a:text-brand whitespace-pre-wrap">
        {event.description || "No hay descripción detallada disponible para este evento."}
      </div>
    </>
  );
}
