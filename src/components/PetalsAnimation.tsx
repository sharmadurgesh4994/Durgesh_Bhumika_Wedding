import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PetalItem {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  type: 'rose' | 'marigold';
  rotateStart: number;
}

export const PetalsAnimation: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  // Pre-calculated deterministic petals to avoid hydration mismatch
  const petals: PetalItem[] = [
    { id: 1, left: '5%', delay: '0s', duration: '14s', size: 14, type: 'rose', rotateStart: 12 },
    { id: 2, left: '15%', delay: '3s', duration: '18s', size: 18, type: 'marigold', rotateStart: 45 },
    { id: 3, left: '25%', delay: '7s', duration: '16s', size: 12, type: 'rose', rotateStart: 90 },
    { id: 4, left: '38%', delay: '1s', duration: '20s', size: 16, type: 'marigold', rotateStart: 130 },
    { id: 5, left: '50%', delay: '5s', duration: '15s', size: 14, type: 'rose', rotateStart: 30 },
    { id: 6, left: '62%', delay: '2s', duration: '19s', size: 18, type: 'marigold', rotateStart: 70 },
    { id: 7, left: '75%', delay: '8s', duration: '17s', size: 13, type: 'rose', rotateStart: 160 },
    { id: 8, left: '88%', delay: '4s', duration: '21s', size: 17, type: 'marigold', rotateStart: 210 },
    { id: 9, left: '95%', delay: '6s', duration: '15s', size: 12, type: 'rose', rotateStart: 40 },
  ];

  return (
    <>
      {enabled && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
          {petals.map((petal) => {
            const isRose = petal.type === 'rose';

            return (
              <div
                key={petal.id}
                className="absolute top-0 animate-petal"
                style={{
                  left: petal.left,
                  animationDelay: petal.delay,
                  animationDuration: petal.duration,
                }}
              >
                <svg
                  width={petal.size}
                  height={petal.size * 1.3}
                  viewBox="0 0 24 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="filter drop-shadow-sm opacity-75"
                >
                  {isRose ? (
                    // Deep red / crimson rose petal
                    <path
                      d="M12 2C6 6 2 14 3 22C4 28 9 31 13 31C18 31 22 26 21 20C20 12 16 6 12 2Z"
                      fill="url(#roseGrad)"
                    />
                  ) : (
                    // Golden marigold petal
                    <path
                      d="M12 2C7 7 4 15 5 21C6 27 10 30 13 30C17 30 20 26 19 19C18 11 15 5 12 2Z"
                      fill="url(#marigoldGrad)"
                    />
                  )}
                  <defs>
                    <linearGradient id="roseGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#C5162E" />
                      <stop offset="100%" stopColor="#7E0C1C" />
                    </linearGradient>
                    <linearGradient id="marigoldGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            );
          })}
        </div>
      )}

      {/* Subtle bottom-left toggle for animation preference */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setEnabled(!enabled)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#240409]/90 backdrop-blur-md border border-[#D4AF37]/40 text-[#E8DCB8] hover:text-[#FFF2B2] text-[10px] font-medium shadow-md transition-colors"
          title={enabled ? 'Pause Falling Petals Animation' : 'Enable Falling Petals Animation'}
        >
          {enabled ? <EyeOff className="w-3 h-3 text-[#D4AF37]" /> : <Eye className="w-3 h-3 text-[#D4AF37]" />}
          <span className="hidden sm:inline">{enabled ? 'Pause Petals' : 'Play Petals'}</span>
        </button>
      </div>
    </>
  );
};
