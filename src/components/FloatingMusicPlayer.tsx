import React, { useState, useEffect } from 'react';
import { weddingAudio } from '../utils/audio';
import { useAuth } from '../context/AuthContext';
import { Volume2, VolumeX, Play, Pause, Bell, Music, Upload, RotateCcw, Check } from 'lucide-react';

interface FloatingMusicPlayerProps {
  initialPlaying?: boolean;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({ initialPlaying = false }) => {
  const { isAdmin } = useAuth();
  const [isPlaying, setIsPlaying] = useState(initialPlaying);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [hasCustomAudio, setHasCustomAudio] = useState(false);
  const [audioUploadSuccess, setAudioUploadSuccess] = useState(false);

  useEffect(() => {
    setIsPlaying(weddingAudio.isPlaying());
    setHasCustomAudio(!!weddingAudio.getCustomAudio());
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
      weddingAudio.setVolume(volume || 0.65);
      setIsMuted(false);
    } else {
      weddingAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleChime = () => {
    weddingAudio.playCeremonialChime();
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        weddingAudio.setCustomAudio(dataUrl);
        setHasCustomAudio(true);
        setIsPlaying(true);
        setAudioUploadSuccess(true);
        setTimeout(() => setAudioUploadSuccess(false), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetToSynthesizer = () => {
    weddingAudio.resetCustomAudio();
    setHasCustomAudio(false);
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      {/* Extended Controls Popover */}
      {showControls && (
        <div className="p-3.5 rounded-2xl bg-[#240409]/95 backdrop-blur-md border border-[#D4AF37]/60 shadow-2xl flex flex-col gap-3 text-xs text-[#FAF5EB] w-64 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/30">
            <span className="font-semibold text-[#FFF2B2] flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-[#D4AF37]" />
              Soundtrack Settings
            </span>
            <button
              onClick={() => setShowControls(false)}
              className="text-[#D4AF37] hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>

          {/* Volume Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-[#E8DCB8] mb-1">
              <span>Volume</span>
              <span className="font-mono tabular-nums">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
          </div>

          {/* Host Custom Audio Upload Feature */}
          {isAdmin && (
            <div className="pt-2 border-t border-[#D4AF37]/25 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] block">
                Host Audio Control (Durgesh)
              </span>

              {audioUploadSuccess && (
                <div className="p-1.5 rounded-md bg-emerald-900/80 border border-emerald-400 text-emerald-200 text-[10px] flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Custom audio loaded &amp; playing!</span>
                </div>
              )}

              <label className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-[#520C1A] hover:bg-[#680E21] border border-[#D4AF37]/50 text-white font-semibold text-[11px] cursor-pointer transition-colors shadow-sm">
                <Upload className="w-3 h-3 text-[#D4AF37]" />
                <span>Upload Audio File (MP3/M4A)</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                />
              </label>

              {hasCustomAudio && (
                <button
                  onClick={handleResetToSynthesizer}
                  className="w-full inline-flex items-center justify-center gap-1 py-1 text-[10px] text-[#E8DCB8] hover:text-red-300 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Switch back to Din Shagna Da Flute</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main player bar */}
      <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-[#2A050B]/95 backdrop-blur-md border border-[#D4AF37]/60 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
          className="p-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-[#240409] hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        {/* Music label & animated soundbars */}
        <div
          onClick={() => setShowControls(!showControls)}
          className="hidden sm:flex items-center gap-2 px-2 text-left cursor-pointer hover:opacity-90 transition-opacity"
          title="Click to adjust volume & settings"
        >
          <div className="text-[11px] leading-tight">
            <span className="font-semibold text-[#FAF5EB] block">
              {hasCustomAudio ? 'Custom Wedding Soundtrack' : 'Din Shagna Da (Shehnai)'}
            </span>
            <span className="text-[9px] text-[#D4AF37] font-hindi">
              {hasCustomAudio ? 'विशेष मंगल गीत' : 'दिन शगना दा · मंगल शहनाई व बाँसुरी'}
            </span>
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
          className="p-1.5 rounded-full text-[#E8DCB8] hover:text-[#D4AF37] hover:bg-[#3D0812] transition-colors cursor-pointer"
          title="Play Temple Chime (मंदिर घंटी)"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* Volume & Settings Toggle */}
        <button
          onClick={() => setShowControls(!showControls)}
          aria-label={isMuted ? 'Unmute music' : 'Adjust volume'}
          className="p-1.5 rounded-full text-[#E8DCB8] hover:text-[#D4AF37] hover:bg-[#3D0812] transition-colors cursor-pointer"
          title="Soundtrack settings"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
