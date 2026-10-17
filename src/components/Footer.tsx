import React from 'react';
import { ASSETS } from '../data/weddingData';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#1A0206] text-[#FAF5EB] border-t border-[#D4AF37]/30 overflow-hidden">
      {/* Visual Anchor: Heritage Palace Courtyard Mandap */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <img
          src={ASSETS.royalMandap}
          alt="Royal Indian Wedding Mandap Courtyard"
          className="w-full h-full object-cover object-center opacity-40 filter saturate-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0206] via-[#1A0206]/70 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <div className="p-3 rounded-full bg-[#2A050B]/80 border border-[#D4AF37]/50 mb-3 shadow-lg">
            <span className="font-hindi text-[#D4AF37] text-lg">॥ अतिथि देवो भवः ॥</span>
          </div>
          <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#FFF2B2] mb-1">
            With Joyous Gratitude
          </h3>
          <p className="font-hindi text-base sm:text-lg text-[#F3E5AB]">
            शर्मा एवं दवे परिवार आपका हार्दिक स्वागत एवं अभिनंदन करता है
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#D4AF37]/20 text-center md:text-left">
          {/* Col 1: Invitation Identity */}
          <div>
            <h4 className="font-royal text-xl font-bold text-[#D4AF37] mb-2">
              Durgesh &amp; Bhumika
            </h4>
            <p className="font-hindi text-sm text-[#E8DCB8] mb-3">
              शुभ विवाह · २ दिसम्बर २०२६
            </p>
            <p className="text-xs text-[#C5A059] leading-relaxed">
              We look forward to celebrating each auspicious moment together with family, relatives, and loved ones.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-3">
              Wedding Navigation
            </h5>
            <ul className="space-y-2 text-xs text-[#E8DCB8]">
              <li>
                <a href="#events" className="hover:text-[#FFF2B2] transition-colors">
                  Ceremonial Itinerary (All 6 Events)
                </a>
              </li>
              <li>
                <a href="#venues" className="hover:text-[#FFF2B2] transition-colors">
                  Venues: Kolyari &amp; Khakhad (Google Maps)
                </a>
              </li>
              <li>
                <a href="#couple" className="hover:text-[#FFF2B2] transition-colors">
                  Groom &amp; Bride Family Lineage
                </a>
              </li>
              <li>
                <a href="#blessings" className="hover:text-[#FFF2B2] transition-colors">
                  Send Wishes &amp; Blessings
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Host Families */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-3">
              Host Families
            </h5>
            <div className="space-y-2 text-xs text-[#E8DCB8]">
              <div>
                <span className="font-semibold text-[#FAF5EB] block">Sharma Family</span>
                <span>Bhagwati Lal &amp; Rekha Sharma · Kolyari</span>
              </div>
              <div className="pt-1">
                <span className="font-semibold text-[#FAF5EB] block">Dave Family</span>
                <span>Niranjan Kumar &amp; Shanta Dave · Khakhad</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C6208]">
          <div className="flex items-center gap-1.5">
            <span>Crafted with devotion for Durgesh &amp; Bhumika</span>
            <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
            <span>Udaipur, Rajasthan</span>
          </div>

          <div className="text-[11px] font-hindi text-[#D4AF37]">
            सदा मंगलम्, सदा कल्याणम्
          </div>
        </div>
      </div>
    </footer>
  );
};
