import React, { useState } from 'react';
import { WEDDING_EVENTS } from '../data/weddingData';
import { generateIcsCalendar, getGoogleCalendarUrl } from '../utils/calendar';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus, Check } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Kolyari' | 'Khakhad'>('all');
  const [savedCalendarId, setSavedCalendarId] = useState<string | null>(null);

  const filteredEvents = WEDDING_EVENTS.filter((evt) => {
    if (filter === 'all') return true;
    return evt.locationTag === filter;
  });

  const handleDownloadIcs = (evt: typeof WEDDING_EVENTS[0]) => {
    generateIcsCalendar(evt);
    setSavedCalendarId(evt.id);
    setTimeout(() => setSavedCalendarId(null), 3000);
  };

  return (
    <section id="events" className="py-16 sm:py-24 px-4 bg-[#7A1220] text-[#FAF5EB] relative overflow-hidden">
      {/* Subtle traditional motif background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F5D77F_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F5D77F] block mb-1">
            Ceremonial Itinerary &amp; Auspicious Muhurats
          </span>
          <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[#FAF5EB] drop-shadow-sm">
            Wedding Ceremonies
          </h2>
          <div className="my-3 flex items-center justify-center gap-3">
            <div className="h-[1px] w-14 bg-[#F5D77F]" />
            <span className="font-hindi text-[#F5D77F] text-base">॥ शुभ कार्यक्रम तालिका ॥</span>
            <div className="h-[1px] w-14 bg-[#F5D77F]" />
          </div>
          <p className="text-xs sm:text-sm text-[#FDF8EE] max-w-xl mx-auto">
            Please grace each ceremony with your presence and shower the bride and groom with your warm blessings.
          </p>

          {/* Interactive Filter Tabs (Button-based segmented control) */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-xl bg-[#590C17] border border-[#F5D77F]/40 shadow-inner">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#240409] shadow-md'
                  : 'text-[#FDF8EE] hover:text-[#FFF2B2]'
              }`}
            >
              All Ceremonies (6)
            </button>
            <button
              onClick={() => setFilter('Kolyari')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'Kolyari'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#240409] shadow-md'
                  : 'text-[#FDF8EE] hover:text-[#FFF2B2]'
              }`}
            >
              Kolyari Events (5)
            </button>
            <button
              onClick={() => setFilter('Khakhad')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'Khakhad'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#240409] shadow-md'
                  : 'text-[#FDF8EE] hover:text-[#FFF2B2]'
              }`}
            >
              Khakhad Vivah (1)
            </button>
          </div>
        </div>

        {/* 6 Events Grid - Lightened Cream/Parchment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredEvents.map((event, index) => {
            const isSaved = savedCalendarId === event.id;
            const googleCalUrl = getGoogleCalendarUrl(event);

            return (
              <div
                key={event.id}
                className="relative rounded-2xl bg-[#FFFDF9] text-[#2C1810] p-6 border-2 border-[#D4AF37]/50 shadow-xl flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Event Index & Location Tag */}
                <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30">
                  <span className="text-xs font-serif-royal font-bold text-[#801323] tracking-wider">
                    Ceremony 0{index + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-[#801323] px-3 py-0.5 rounded-full bg-[#FFF3D6] border border-[#D4AF37]/50">
                    {event.locationTag}
                  </span>
                </div>

                {/* Event Name & Description */}
                <div className="my-4">
                  <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#801323] mb-1 group-hover:text-[#A81C30] transition-colors">
                    {event.name}
                  </h3>
                  <p className="font-hindi text-sm text-[#8C6208] font-semibold mb-3">
                    {event.hindiName}
                  </p>

                  <p className="text-xs text-[#5C2E0A] leading-relaxed mb-4 min-h-[40px]">
                    {event.description}
                  </p>

                  {/* Timing & Venue details */}
                  <div className="space-y-2 p-3.5 rounded-xl bg-[#FAF5EB] border border-[#D4AF37]/35 text-xs">
                    <div className="flex items-center gap-2 text-[#2C1810]">
                      <Calendar className="w-3.5 h-3.5 text-[#801323] shrink-0" />
                      <span className="font-bold">{event.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#801323]">
                      <Clock className="w-3.5 h-3.5 text-[#801323] shrink-0" />
                      <span className="font-semibold font-mono tabular-nums">{event.time}</span>
                    </div>

                    <div className="flex items-start gap-2 text-[#5C2E0A]">
                      <MapPin className="w-3.5 h-3.5 text-[#801323] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#2C1810] block">{event.venue}</span>
                        <span className="text-[11px] text-[#78350F]">{event.address}</span>
                      </div>
                    </div>

                    {event.auspiciousNote && (
                      <div className="pt-1.5 border-t border-[#D4AF37]/30 text-[11px] font-hindi text-[#801323] font-semibold">
                        {event.auspiciousNote}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions: Google Maps & Add to Calendar */}
                <div className="pt-3 border-t border-[#D4AF37]/30 space-y-2">
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#801323] hover:bg-[#9B192C] text-xs font-bold text-[#FFF2B2] shadow-sm transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#F5D77F]" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-[#F5D77F]" />
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDownloadIcs(event)}
                      className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#FAF5EB] hover:bg-[#F3E5AB]/40 border border-[#D4AF37]/50 text-[11px] font-medium text-[#78350F] transition-colors cursor-pointer"
                      title="Download .ics Calendar file"
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Saved</span>
                        </>
                      ) : (
                        <>
                          <CalendarPlus className="w-3 h-3 text-[#801323]" />
                          <span>Download .ics</span>
                        </>
                      )}
                    </button>

                    <a
                      href={googleCalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#FAF5EB] hover:bg-[#F3E5AB]/40 border border-[#D4AF37]/50 text-[11px] font-medium text-[#78350F] transition-colors"
                      title="Add directly to Google Calendar"
                    >
                      <Calendar className="w-3 h-3 text-[#801323]" />
                      <span>Google Cal</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
