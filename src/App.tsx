import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { RoyalEnvelopeModal } from './components/RoyalEnvelopeModal';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountdownTimer } from './components/CountdownTimer';
import { CoupleSection } from './components/CoupleSection';
import { EventsSection } from './components/EventsSection';
import { PhotoGallery } from './components/PhotoGallery';
import { VenueSection } from './components/VenueSection';
import { BlessingsGuestbook } from './components/BlessingsGuestbook';
import { Footer } from './components/Footer';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { PetalsAnimation } from './components/PetalsAnimation';
import { AdminLoginModal } from './components/AdminLoginModal';

function WeddingApp() {
  const [envelopeOpen, setEnvelopeOpen] = useState(true);

  const handleOpenInvitation = () => {
    setEnvelopeOpen(false);
  };

  const handleScrollToRsvp = () => {
    const el = document.getElementById('blessings');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#2C1810] relative flex flex-col font-sans">
      {/* 1. Host Authentication Modal */}
      <AdminLoginModal />

      {/* 2. Royal Envelope Opening Curtain */}
      <RoyalEnvelopeModal
        isOpen={envelopeOpen}
        onOpenInvitation={handleOpenInvitation}
      />

      {/* 3. Falling Petals Animation (Rose & Marigold) with toggle */}
      <PetalsAnimation />

      {/* 4. Floating Wedding Music Player (Shehnai & Flute Raga) */}
      <FloatingMusicPlayer initialPlaying={!envelopeOpen} />

      {/* 5. Top Navigation Bar (Strict 3-zone contract with Host Login) */}
      <Navbar onOpenRsvp={handleScrollToRsvp} />

      {/* 6. Main Content */}
      <main className="flex-1">
        {/* Hero Section with Lord Ganesha & Udaipur Palace Backdrop (Lightened & Radiant) */}
        <HeroSection />

        {/* Live Precision Countdown Timer */}
        <CountdownTimer />

        {/* Groom & Bride Lineage Presentation */}
        <CoupleSection />

        {/* Ceremonial Itinerary (All 6 Events with Google Maps & Calendar Links) */}
        <EventsSection />

        {/* Royal Photo Gallery (Pre-Wedding & Vivah Moments + Host Upload) */}
        <PhotoGallery />

        {/* Dual Venue Guides with Direct Map Navigation (Kolyari & Khakhad) */}
        <VenueSection />

        {/* Interactive Wishes & Blessings Guestbook (with Host delete capability) */}
        <BlessingsGuestbook id="blessings" />
      </main>

      {/* 7. Grand Heritage Mandap Footer with Family Welcome */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WeddingApp />
    </AuthProvider>
  );
}
