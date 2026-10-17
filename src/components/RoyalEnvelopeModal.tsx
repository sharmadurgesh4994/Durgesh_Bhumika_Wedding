import React, { useState } from 'react';
import { weddingAudio } from '../utils/audio';
import { ASSETS } from '../data/weddingData';
import { Mail, Sparkles, Volume2 } from 'lucide-react';

interface RoyalEnvelopeModalProps {
  isOpen: boolean;
  onOpenInvitation: () => void;
}

export const RoyalEnvelopeModal: React.FC<RoyalEnvelopeModalProps> = ({
  isOpen,
  onOpenInvitation,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  if (!isOpen) return null;

  const handleOpen = () => {
    setIsOpening(true);
    weddingAudio.playCeremonialChime();
    setTimeout(() => {
      weddingAudio.startMusic();
      onOpenInvitation();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-700">
      <div
        className={`relative w-full max-w-lg p-1 rounded-2xl bg-gradient-to-b from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] shadow-2xl transition-all duration-700 transform ${
          isOpening ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="relative overflow-hidden rounded-[14px] bg-[#3B0710] p-6 sm:p-8 text-center border border-[#D4AF37]/40 shadow-inner">
          {/* Subtle ornate background texture */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Golden Filigree Corner Accents */}
          <div className="absolute top-2 left-2 text-[#D4AF37] opacity-60 text-xs">❖</div>
          <div className="absolute top-2 right-2 text-[#D4AF37] opacity-60 text-xs">❖</div>
          <div className="absolute bottom-2 left-2 text-[#D4AF37] opacity-60 text-xs">❖</div>
          <div className="absolute bottom-2 right-2 text-[#D4AF37] opacity-60 text-xs">❖</div>

          {/* Auspicious Header Shloka */}
          <div className="mb-4">
            <span className="font-hindi text-[#D4AF37] text-sm tracking-wider">
              ॥ श्री गणेशाय नमः ॥
            </span>
          </div>

          {/* Ganesha Crest */}
          <div className="relative mx-auto mb-4 w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#B8860B] via-[#F5D77F] to-[#D4AF37] shadow-lg">
            <div className="w-full h-full rounded-full overflow-hidden bg-white/95 p-1 border border-[#D4AF37]/50">
              <img
                src={ASSETS.lordGanesha}
                alt="Lord Ganesha Auspicious Blessing"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Royal Invitation Text */}
          <h2 className="font-royal text-2xl sm:text-3xl text-[#FAF5EB] font-bold tracking-wide mb-1">
            ROYAL WEDDING INVITATION
          </h2>
          <p className="font-hindi text-[#F3E5AB] text-sm sm:text-base mb-2">
            मंगल परिणय संस्कार
          </p>

          <div className="my-3 flex items-center justify-center gap-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs">✦ ✦ ✦</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <div className="space-y-1 mb-6">
            <p className="font-serif-royal text-xl sm:text-2xl font-semibold text-[#FFF2B2]">
              Durgesh <span className="text-[#D4AF37] font-normal">&amp;</span> Bhumika
            </p>
            <p className="text-xs text-[#E8DCB8] tracking-widest uppercase">
              Udaipur, Rajasthan · December 2026
            </p>
          </div>

          {/* Wax Seal Call-to-Action */}
          <div className="pt-2">
            <button
              onClick={handleOpen}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#8C6208] text-[#240307] font-bold tracking-wider text-sm shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#240307] group-hover:rotate-12 transition-transform" />
              <span>OPEN INVITATION</span>
              <Sparkles className="w-4 h-4 text-[#240307]" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#D4AF37]/80">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Includes Auspicious Shehnai &amp; Flute Music</span>
          </div>
        </div>
      </div>
    </div>
  );
};
