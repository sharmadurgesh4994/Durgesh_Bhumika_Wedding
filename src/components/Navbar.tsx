import React, { useState } from 'react';
import { Menu, X, Calendar, Heart, Image as ImageIcon, Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenRsvp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRsvp }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin, openAuthModal, adminName } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#3D0812]/95 backdrop-blur-md border-b border-[#D4AF37]/40 text-[#FAF5EB] transition-colors shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="font-royal text-lg sm:text-xl font-bold tracking-wider text-[#F5D77F] hover:text-[#FFF2B2] transition-colors whitespace-nowrap shrink-0"
        >
          Durgesh &amp; Bhumika
        </a>

        {/* Zone 2: 4-5 Single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs lg:text-sm font-medium text-[#F3E5AB]">
          <a
            href="#couple"
            className="hover:text-[#FFF2B2] transition-colors whitespace-nowrap shrink-0"
          >
            The Royal Couple
          </a>
          <a
            href="#events"
            className="hover:text-[#FFF2B2] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-[#F5D77F]" />
            Ceremonies (6)
          </a>
          <a
            href="#gallery"
            className="hover:text-[#FFF2B2] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#F5D77F]" />
            Photo Gallery
          </a>
          <a
            href="#venues"
            className="hover:text-[#FFF2B2] transition-colors whitespace-nowrap shrink-0"
          >
            Venues &amp; Maps
          </a>
          <a
            href="#blessings"
            className="hover:text-[#FFF2B2] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 text-[#F5D77F]" />
            Blessings
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Host Status */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Host Portal Button */}
          <button
            onClick={openAuthModal}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              isAdmin
                ? 'bg-emerald-900/80 border-emerald-400 text-emerald-200'
                : 'bg-[#520C1A] hover:bg-[#680E21] border-[#D4AF37]/50 text-[#F5D77F]'
            }`}
            title={isAdmin ? `Logged in as ${adminName}` : 'Host Login (Durgesh)'}
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span className="font-semibold">Host (Durgesh)</span>
              </>
            ) : (
              <>
                <Lock className="w-3 h-3 text-[#D4AF37]" />
                <span>Host Login</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenRsvp}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#240409] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Send Blessings</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 text-[#F5D77F] hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#D4AF37]/25 bg-[#32060E] px-4 pt-3 pb-5 space-y-2 shadow-xl">
          <a
            href="#couple"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-[#FAF5EB] hover:bg-[#4E0A16] rounded-md"
          >
            The Royal Couple
          </a>
          <a
            href="#events"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-[#FAF5EB] hover:bg-[#4E0A16] rounded-md"
          >
            Ceremonies (All 6 Events)
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-[#FAF5EB] hover:bg-[#4E0A16] rounded-md"
          >
            Photo Gallery (Pre-Wedding &amp; Vivah)
          </a>
          <a
            href="#venues"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-[#FAF5EB] hover:bg-[#4E0A16] rounded-md"
          >
            Venues &amp; Directions (Kolyari &amp; Khakhad)
          </a>
          <a
            href="#blessings"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-[#FAF5EB] hover:bg-[#4E0A16] rounded-md"
          >
            Send Blessings &amp; Wishes
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal();
              }}
              className="w-full text-center py-2 text-xs font-semibold text-[#F5D77F] bg-[#520C1A] border border-[#D4AF37]/50 rounded-md"
            >
              {isAdmin ? 'Host Portal (Logged In)' : 'Host Login (Durgesh)'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRsvp();
              }}
              className="w-full text-center py-2.5 text-xs font-semibold text-[#240409] bg-[#D4AF37] rounded-md"
            >
              Write Blessing for Durgesh &amp; Bhumika
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
