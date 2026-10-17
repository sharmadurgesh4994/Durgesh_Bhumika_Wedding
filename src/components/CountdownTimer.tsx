import React, { useState, useEffect } from 'react';
import { WEDDING_DATE } from '../data/weddingData';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = WEDDING_DATE.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-12 px-4 bg-[#FAF6EE] text-center border-b border-[#D4AF37]/20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8C6208] mb-2">
          <Clock className="w-4 h-4 text-[#B8860B]" />
          <span>Counting Down To The Sacred Vivah</span>
        </div>

        <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#3B0710] mb-1">
          The Auspicious Countdown
        </h2>
        <p className="font-hindi text-sm text-[#78350F] mb-6">
          शुभ विवाह की पावन घड़ी
        </p>

        {/* Countdown Grid with Tabular Numerals */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EB] border border-[#D4AF37]/40 shadow-sm flex flex-col items-center">
            <span className="font-serif-royal font-bold text-2xl sm:text-4xl text-[#3B0710] font-mono tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider text-[#8C6208] mt-1">
              Days
            </span>
            <span className="text-[9px] font-hindi text-[#8C6208]/80 hidden sm:block">
              दिन
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EB] border border-[#D4AF37]/40 shadow-sm flex flex-col items-center">
            <span className="font-serif-royal font-bold text-2xl sm:text-4xl text-[#3B0710] font-mono tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider text-[#8C6208] mt-1">
              Hours
            </span>
            <span className="text-[9px] font-hindi text-[#8C6208]/80 hidden sm:block">
              घंटे
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EB] border border-[#D4AF37]/40 shadow-sm flex flex-col items-center">
            <span className="font-serif-royal font-bold text-2xl sm:text-4xl text-[#3B0710] font-mono tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider text-[#8C6208] mt-1">
              Minutes
            </span>
            <span className="text-[9px] font-hindi text-[#8C6208]/80 hidden sm:block">
              मिनट
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EB] border border-[#D4AF37]/40 shadow-sm flex flex-col items-center">
            <span className="font-serif-royal font-bold text-2xl sm:text-4xl text-[#B8860B] font-mono tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider text-[#8C6208] mt-1">
              Seconds
            </span>
            <span className="text-[9px] font-hindi text-[#8C6208]/80 hidden sm:block">
              सेकंड
            </span>
          </div>
        </div>

        <p className="mt-4 text-xs text-[#78350F]/80">
          Festivities commence on 28 November 2026 with Ganpati Sthapna in Kolyari
        </p>
      </div>
    </section>
  );
};
