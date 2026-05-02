import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';
import EventCover from './Components/EventCover';
import EventBanner from './Components/EventBanner';
import EventAbout from './Components/EventAbout';
import EventTopics from './Components/EventTopics';
import EventLocation from './Components/EventLocation';

import EventHosts from './Components/EventHosts';
import EventCollaborators from './Components/EventCollaborators';
import EventOrganizers from './Components/EventOrganizers';

export default function EventoShow({ event }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HomeLayout>
      <Head title={`${event.title} | Eventos`} />

      <EventCover event={event} />

      <EventBanner event={event} isScrolled={isScrolled} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-5 gap-6 lg:gap-[7px]">
          <EventTopics event={event} />
          <div className="lg:col-span-4 lg:row-span-5 order-2 lg:order-2">
            <EventAbout event={event} />
          </div>
        </div>
      </main>

      <EventLocation event={event} />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-12 md:pb-20">
        {(event.hosts?.length > 0 || event.collaborators?.length > 0 || event.organizers?.length > 0) && (
          <div className="pt-8">
            <EventHosts hosts={event.hosts} />
            <EventCollaborators collaborators={event.collaborators} />
            <EventOrganizers organizers={event.organizers} />
          </div>
        )}
      </section>

    </HomeLayout>
  );
}
