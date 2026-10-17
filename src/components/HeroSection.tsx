import React from 'react';
import { ASSETS } from '../data/weddingData';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#FAF5EB]">
      {/* Background Udaipur Monuments Backdrop - Lightened & Vibrant */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.udaipurSkyline}
          alt="Udaipur City Palace and Lake Pichola at Golden Sunset"
          className="w-full h-full object-cover object-center opacity-70 filter saturate-110"
          referrerPolicy="no-referrer"
        />
        {/* Soft royal warm scrim for atmospheric glow and perfect text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D050B]/70 via-[#3B0710]/55 to-[#FAF5EB]" />
      </div>

      {/* Decorative Traditional Arch & Border */}
      <div className="absolute inset-4 sm:inset-8 border border-[#D4AF37]/50 rounded-2xl pointer-events-none z-10 hidden sm:block">
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center flex flex-col items-center">
        {/* Lord Ganesha Icon & Tilak */}
        <div className="relative mb-5 group">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1.5 bg-gradient-to-b from-[#F5D77F] via-[#D4AF37] to-[#8C6208] shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-transform duration-500 hover:scale-105">
            <div className="w-full h-full rounded-full overflow-hidden bg-white/95 p-1 border-2 border-[#D4AF37]">
              <img
                src={ASSETS.lordGanesha}
                alt="Lord Ganesha"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#801323] border border-[#D4AF37] text-[11px] font-hindi text-[#FFF2B2] whitespace-nowrap shadow-md">
            ॥ श्री गणेशाय नमः ॥
          </div>
        </div>

        {/* Auspicious Shloka */}
        <div id="shlokas" className="max-w-2xl mx-auto mb-6 px-4">
          <p className="font-hindi text-[#FFF2B2] text-sm sm:text-base leading-relaxed tracking-wide drop-shadow-md">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
            <br />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </p>
          <div className="my-3 flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm">✦ ॐ ✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <p className="font-hindi text-[#F5E6CC] text-xs sm:text-sm drop-shadow-sm">
            मंगलम् भगवान विष्णुः मंगलम् गरुडध्वजः।
            मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः॥
          </p>
        </div>

        {/* Royal Invitation Title */}
        <div className="mb-2">
          <span className="font-royal text-xs sm:text-sm tracking-[0.25em] text-[#D4AF37] uppercase font-semibold drop-shadow">
            Wedding Invitation
          </span>
        </div>

        {/* Couple Names */}
        <div className="mb-4 space-y-1">
          <h1 className="font-royal text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFDF9] drop-shadow-lg">
            Durgesh <span className="text-[#D4AF37] font-normal italic font-serif-royal">&amp;</span> Bhumika
          </h1>
          <p className="font-hindi text-xl sm:text-2xl text-[#F3E5AB] tracking-wide pt-1 drop-shadow">
            दुर्गेश संग भूमिका
          </p>
        </div>

        {/* Auspicious Wedding Muhurat Callout - Lighter Card */}
        <div className="my-6 max-w-lg mx-auto p-5 rounded-2xl bg-[#FFFDF9]/95 border-2 border-[#D4AF37] shadow-2xl backdrop-blur-md text-[#2C1810]">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#801323] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Shubh Vivah Muhurat</span>
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
          </div>
          <p className="font-serif-royal text-lg sm:text-xl font-bold text-[#801323]">
            Wednesday, 2 December 2026
          </p>
          <p className="font-hindi text-sm text-[#8C6208] mb-2 font-semibold">
            पाणिग्रहण संस्कार मुहूर्त: प्रातः ०८:५५ बजे
          </p>
          <div className="pt-2 border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#5C2E0A]">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#801323]" />
              Residence, Khakhad, Udaipur
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#801323]" />
              Reception on 4 Dec in Kolyari
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-[#240409] font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            <span>View All Ceremonies</span>
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#801323] hover:bg-[#9B192C] text-[#FFF2B2] border border-[#D4AF37]/70 font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all"
          >
            <span>Photo Gallery</span>
          </a>
          <a
            href="#venues"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FAF5EB] hover:bg-[#FFFDF9] text-[#801323] border border-[#D4AF37] font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-sm"
          >
            <MapPin className="w-4 h-4 text-[#801323]" />
            <span>Map &amp; Directions</span>
          </a>
        </div>
      </div>

      {/* Decorative Bottom Arch Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#FAF6EE] to-transparent z-20 pointer-events-none" />
    </section>
  );
};
