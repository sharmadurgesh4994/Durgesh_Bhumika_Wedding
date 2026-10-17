import React from 'react';
import { COUPLE_DATA } from '../data/weddingData';
import { MapPin, Users } from 'lucide-react';

export const CoupleSection: React.FC = () => {
  const { groom, bride } = COUPLE_DATA;

  return (
    <section id="couple" className="py-16 sm:py-24 px-4 bg-[#FAF5EB] relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6208] block mb-1">
            Two Hearts, Two Families, One Sacred Journey
          </span>
          <h2 className="font-royal text-2xl sm:text-4xl font-bold text-[#3B0710] tracking-wide">
            The Royal Couple
          </h2>
          <div className="my-3 flex items-center justify-center gap-3">
            <div className="h-[1px] w-14 bg-[#D4AF37]" />
            <span className="font-hindi text-[#D4AF37] text-sm">॥ शुभ परिणय ॥</span>
            <div className="h-[1px] w-14 bg-[#D4AF37]" />
          </div>
          <p className="text-xs sm:text-sm text-[#78350F] max-w-xl mx-auto">
            With the divine blessings of our ancestors and elders, we cordially invite you to celebrate the holy union of our children.
          </p>
        </div>

        {/* Groom & Bride Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Groom Card */}
          <div className="relative rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#F7EFE1] p-6 sm:p-8 border border-[#D4AF37]/50 shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B8860B]">
                वर (The Groom)
              </span>
              <span className="text-xs font-hindi text-[#78350F]">
                शर्मा परिवार
              </span>
            </div>

            {/* Groom Details */}
            <div className="my-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#3B0710] to-[#680E1B] p-1 border-2 border-[#D4AF37] shadow-inner flex items-center justify-center">
                <span className="font-royal text-2xl font-bold text-[#D4AF37]">DS</span>
              </div>
              <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#3B0710] mb-1">
                {groom.name}
              </h3>
              <p className="font-hindi text-base text-[#8C6208] font-medium mb-4">
                {groom.hindiName}
              </p>

              {/* Lineage & Parents */}
              <div className="bg-[#FFF8ED] rounded-xl p-4 border border-[#D4AF37]/30 text-left space-y-2">
                <div className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-medium uppercase text-[#8C6208] block">
                      Son of (सुपुत्र)
                    </span>
                    <span className="text-sm font-semibold text-[#2C1810]">
                      {groom.motherName} &amp; {groom.fatherName}
                    </span>
                    <span className="text-xs font-hindi text-[#78350F] block">
                      श्रीमती रेखा शर्मा एवं श्री भगवती लाल शर्मा
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-[#D4AF37]/20">
                  <MapPin className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-medium uppercase text-[#8C6208] block">
                      Residence (निवास)
                    </span>
                    <span className="text-sm font-medium text-[#2C1810]">
                      {groom.residence}
                    </span>
                    <span className="text-xs font-hindi text-[#78350F] block">
                      निवास: {groom.residenceHindi}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-[#8C6208]/90 italic">
              &quot;May our togetherness be blessed with eternal devotion and joy.&quot;
            </div>
          </div>

          {/* Bride Card */}
          <div className="relative rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#F7EFE1] p-6 sm:p-8 border border-[#D4AF37]/50 shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B8860B]">
                वधू (The Bride)
              </span>
              <span className="text-xs font-hindi text-[#78350F]">
                दवे परिवार
              </span>
            </div>

            {/* Bride Details */}
            <div className="my-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#3B0710] to-[#680E1B] p-1 border-2 border-[#D4AF37] shadow-inner flex items-center justify-center">
                <span className="font-royal text-2xl font-bold text-[#D4AF37]">BD</span>
              </div>
              <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#3B0710] mb-1">
                {bride.name}
              </h3>
              <p className="font-hindi text-base text-[#8C6208] font-medium mb-4">
                {bride.hindiName}
              </p>

              {/* Lineage & Parents */}
              <div className="bg-[#FFF8ED] rounded-xl p-4 border border-[#D4AF37]/30 text-left space-y-2">
                <div className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-medium uppercase text-[#8C6208] block">
                      Daughter of (सुपुत्री)
                    </span>
                    <span className="text-sm font-semibold text-[#2C1810]">
                      {bride.motherName} &amp; {bride.fatherName}
                    </span>
                    <span className="text-xs font-hindi text-[#78350F] block">
                      श्रीमती शांता दवे एवं श्री निरंजन कुमार दवे
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-[#D4AF37]/20">
                  <MapPin className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-medium uppercase text-[#8C6208] block">
                      Residence (निवास)
                    </span>
                    <span className="text-sm font-medium text-[#2C1810]">
                      {bride.residence}
                    </span>
                    <span className="text-xs font-hindi text-[#78350F] block">
                      निवास: {bride.residenceHindi}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-[#8C6208]/90 italic">
              &quot;Embarking on a journey of sacred vows, love, and tradition.&quot;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
