import React from 'react';
import { MapPin } from 'lucide-react';

export default function EventCover({ event }) {
  return (
    <div className=" relative pt-20">
      <div className="w-full h-[40vh] md:h-[50vh] bg-brand-dark relative">
        {event.cover_image_url && (
          <img
            src={event.cover_image_url}
            alt={event.title}
            className="w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-10 w-full">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-4xl leading-tight">
              {event.title}
            </h1>
            {event.short_description && (
              <p className="mt-4 text-lg md:text-xl text-brand-mint max-w-2xl">
                {event.short_description}
              </p>
            )}
            <div className="flex items-center gap-4 mt-6 text-brand-mint font-medium">
              {event.location && (
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {event.location}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
