import React, { useState } from 'react';
import { VENUES } from '../data/weddingData';
import { MapPin, Navigation, Copy, Check, ExternalLink, Compass } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="venues" className="py-16 sm:py-24 px-4 bg-[#FAF5EB] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C6208] block mb-1">
            Reaching The Celebrations
          </span>
          <h2 className="font-royal text-2xl sm:text-4xl font-bold text-[#3B0710] tracking-wide">
            Venues &amp; Navigation Guides
          </h2>
          <div className="my-3 flex items-center justify-center gap-3">
            <div className="h-[1px] w-14 bg-[#D4AF37]" />
            <span className="font-hindi text-[#D4AF37] text-base">॥ विवाह स्थल एवं मार्ग दर्शन ॥</span>
            <div className="h-[1px] w-14 bg-[#D4AF37]" />
          </div>
          <p className="text-xs sm:text-sm text-[#78350F] max-w-xl mx-auto">
            Direct navigation links and guidance for both the groom&apos;s residence in Kolyari and the bride&apos;s residence in Khakhad.
          </p>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {VENUES.map((venue) => {
            const isCopied = copiedId === venue.id;

            return (
              <div
                key={venue.id}
                className="relative rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#F7EFE1] p-6 sm:p-8 border border-[#D4AF37]/50 shadow-lg flex flex-col justify-between group hover:shadow-2xl transition-all duration-300"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/25">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B8860B]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6208]">
                      {venue.town} Venue
                    </span>
                  </div>
                  <span className="text-xs font-hindi text-[#78350F]">
                    {venue.town === 'Kolyari' ? 'शर्मा निवास' : 'दवे निवास'}
                  </span>
                </div>

                {/* Content */}
                <div className="my-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-[#3B0710] text-[#D4AF37] shrink-0 mt-1 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#3B0710]">
                        {venue.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#8C6208]">
                        {venue.town}, Udaipur District
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#5C2E0A] leading-relaxed mb-4">
                    {venue.description}
                  </p>

                  {/* Address Box */}
                  <div className="p-4 rounded-xl bg-[#FFF8ED] border border-[#D4AF37]/40 mb-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8C6208] block">
                          Full Postal Address
                        </span>
                        <p className="text-xs font-medium text-[#2C1810]">
                          {venue.address}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopy(venue.address, venue.id)}
                        className="p-1.5 rounded-md hover:bg-[#F3E5AB] text-[#8C6208] transition-colors shrink-0"
                        title="Copy Address"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center gap-1.5 text-[11px] text-[#78350F]">
                      <Compass className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                      <span>{venue.landmarks}</span>
                    </div>
                  </div>

                  {/* Ceremonies Hosted */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6208] block mb-2">
                      Ceremonies Held Here:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {venue.eventsHosted.map((evt) => (
                        <span
                          key={evt}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#FFF5E6] border border-[#D4AF37]/40 text-[#3B0710]"
                        >
                          {evt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Google Maps Action Button */}
                <div className="pt-4 border-t border-[#D4AF37]/25">
                  <a
                    href={venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-[#3B0710] to-[#5A0C17] hover:from-[#4E0A16] hover:to-[#72101E] text-[#FFF2B2] font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all"
                  >
                    <Navigation className="w-4 h-4 text-[#D4AF37]" />
                    <span>Open {venue.town} in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Travel & Highway Advisory Box */}
        <div className="mt-10 p-5 rounded-xl bg-[#FFFDF9] border border-[#D4AF37]/40 text-xs text-[#5C2E0A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#FAF5EB] text-[#B8860B]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-[#3B0710] block text-sm">
                Guest Travel Assistance
              </span>
              <span>
                Both Kolyari and Khakhad are well-connected by road from Udaipur City (via Jhadol route). Cabs and private transport are readily available.
              </span>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-[#8C6208] font-medium">
            <span>Udaipur Dist. · Rajasthan</span>
          </div>
        </div>
      </div>
    </section>
  );
};
