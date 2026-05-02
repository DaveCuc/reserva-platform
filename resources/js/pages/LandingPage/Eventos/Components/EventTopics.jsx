import React from 'react';

export default function EventTopics({ event }) {
  if (!event.topics || event.topics.length === 0) return null;

  return (
    <div className="lg:col-span-1 lg:row-span-5 order-1 lg:order-1 space-y-10 pr-10">
      <div className="bg-brand-light p-6 rounded-2xl border border-brand-panel">
        <h3 className="text-xl font-bold text-brand-text mb-4">Temas a tratar</h3>
        <div className="flex flex-wrap gap-2">
          {event.topics.map((topic, idx) => (
            <span key={idx} className="bg-white border border-brand-panel text-brand-ink font-medium px-4 py-2 rounded-full text-sm shadow-sm">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
