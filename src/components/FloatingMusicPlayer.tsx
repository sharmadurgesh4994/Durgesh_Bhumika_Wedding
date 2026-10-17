import React, { useState, useEffect } from 'react';
import { weddingAudio } from '../utils/audio';
import { Volume2, VolumeX, Play, Pause, Bell } from 'lucide-react';

interface FloatingMusicPlayerProps {
  initialPlaying?: boolean;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({ initialPlaying = false }) => {
  const [isPlaying, setIsPlaying] = useState(initialPlaying);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(0.55);

  useEffect(() => {
    setIsPlaying(weddingAudio.isPlaying());
  }, []);

  const handleTogglePlay = () => {
    const newState = weddingAudio.toggleMusic();
    setIsPlaying(newState);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    weddingAudio.setVolume(newVol);
    if (newVol === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      weddingAudio.setVolume(volume || 0.55);
      setIsMuted(false);
    } else {
      weddingAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleChime = () => {
    weddingAudio.playCeremonialChime();
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      {/* Volume slider popover on hover/click */}
      {showVolume && (
        <div className="p-2.5 rounded-xl bg-[#240409]/95 backdrop-blur-md border border-[#D4AF37]/50 shadow-xl flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-20 accent-[#D4AF37] cursor-pointer"
            aria-label="Music volume"
          />
        </div>
      )}

      {/* Main player pill */}
      <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-[#2A050B]/95 backdrop-blur-md border border-[#D4AF37]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
          className="p-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-[#240409] hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        {/* Music label & animated soundbars */}
        <div className="hidden sm:flex items-center gap-2 px-2 text-left">
          <div className="text-[11px] leading-tight">
            <span className="font-semibold text-[#FAF5EB] block">Auspicious Shehnai</span>
            <span className="text-[9px] text-[#D4AF37] font-hindi">मंगल शहनाई संगीत</span>
          </div>

          {/* Animated sound waves when playing */}
          <div className="flex items-end gap-0.5 h-3.5 w-4">
            <span className={`w-1 bg-[#D4AF37] rounded-full transition-all duration-300 ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`} />
            <span className={`w-1 bg-[#F5D77F] rounded-full transition-all duration-300 ${isPlaying ? 'h-3.5 animate-pulse delay-100' : 'h-1.5'}`} />
            <span className={`w-1 bg-[#D4AF37] rounded-full transition-all duration-300 ${isPlaying ? 'h-2 animate-pulse delay-200' : 'h-1'}`} />
          </div>
        </div>

        {/* Chime Bell button */}
        <button
          onClick={handleChime}
          aria-label="Ring Temple Chime"
          className="p-1.5 rounded-full text-[#E8DCB8] hover:text-[#D4AF37] hover:bg-[#3D0812] transition-colors"
          title="Play Temple Chime (मंदिर घंटी)"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* Mute / Volume toggle button */}
        <button
          onClick={handleToggleMute}
          onMouseEnter={() => setShowVolume(true)}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          className="p-1.5 rounded-full text-[#E8DCB8] hover:text-[#D4AF37] hover:bg-[#3D0812] transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
