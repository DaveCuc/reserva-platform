import React from 'react';
import { Users } from 'lucide-react';

export default function EventCollaborators({ collaborators }) {
  if (!collaborators || collaborators.length === 0) return null;
  return (
    <div className="mt-12 flex flex-col items-center">
      <h3 className="text-2xl font-bold text-brand-text mb-6 text-center">Colaboradores</h3>
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {collaborators.map((person, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-brand-panel hover:shadow-md transition-shadow w-full sm:w-64 max-w-[280px]">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-brand-light mb-4 border-4 border-white shadow-sm">
              {person.photo_url ? (
                <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
              ) : (
                <Users className="w-12 h-12 text-brand-soft mx-auto mt-5" />
              )}
            </div>
            <h4 className="font-bold text-brand-text">{person.name}</h4>
            <p className="text-sm text-brand-ink mt-1">{person.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
