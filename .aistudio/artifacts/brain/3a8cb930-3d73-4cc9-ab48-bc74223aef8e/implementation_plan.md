# Durgesh & Bhumika's Royal Udaipur Wedding Invitation

An enchanting, royal Rajasthani digital wedding invitation website crafted for **Durgesh Sharma** and **Bhumika Dave**, set against the majestic heritage backdrop of Udaipur's City Palace and Lake Pichola, featuring traditional Sanskrit invocations, animated royal envelope reveal, authentic auspicious background music, comprehensive event itineraries with Google Maps directions, live countdown, and guest blessings.

> [!IMPORTANT]
> **Confirmed Choices & Preferences**:
> - **Visual Theme**: Royal Rajasthani Heritage aesthetic — deep crimson (`#7B1113`), regal gold (`#D4AF37`, `#F3E5AB`), royal ivory (`#FDFBF7`), and intricate jharokha/mandala gold filigree borders.
> - **Udaipur Monument Backgrounds**: Atmospheric Udaipur royal palace silhouettes (City Palace, Lake Palace, Jag Mandir pavilions) in background layers with subtle animated glowing lanterns and floating rose/marigold petals.
> - **Audio Experience**: Interactive Royal Invitation card that gracefully unseals on guest touch and starts the auspicious wedding shehnai & flute soundtrack, with persistent floating controls (play/pause/volume).
> - **All 6 Traditional Events**: Dedicated royal cards for Ganpati Sthapna, Haldi, Mandap & Mayra, Bindoli, Wedding Ceremony, and Reception with dates, times, venues, and direct Google Maps buttons.

---

### 1. Overview & Core Concept

- **What It Does**: Presents a personalized, interactive wedding invitation experience for the union of Durgesh Sharma (S/o Bhagwati Lal Sharma & Rekha Sharma, Kolyari) and Bhumika Dave (D/o Niranjan Kumar Dave & Shanta Dave, Khakhad). Guests are welcomed with an animated royal envelope, Lord Ganesha's blessings, Udaipur palace skyline, a live countdown to December 2, 2026, interactive itineraries for all 6 events with one-tap Google Maps directions, and an interactive guestbook for blessings and RSVPs.
- **Target Audience / Persona**: Family members, friends, and wedding guests from Udaipur, Rajasthan, across India, and worldwide accessing on smartphones and desktop browsers.
- **Key Value**: Delivers a rich, memorable Indian royal wedding celebration experience that combines sacred traditions with seamless navigation, precise event timings, calendar syncing, and interactive music.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **The Royal Seal & Arrival**: The visitor is greeted by a regal wax-sealed Rajasthani invitation card. Tapping *"Open Invitation"* triggers a ceremonial flourish, unrolls the royal scroll, and begins the traditional wedding shehnai music.
2. **Ganesha Vandana & Auspicious Blessing**: The top hero prominently presents Lord Ganesha's sacred illustration with the shloka:
   *वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥*
3. **The Royal Couple & Lineage**: Beautiful couple cards introducing the Groom (*Durgesh Sharma, S/o Bhagwati Lal Sharma & Rekha Sharma, Kolyari*) and Bride (*Bhumika Dave, D/o Niranjan Kumar Dave & Shanta Dave, Khakhad*) with royal Rajasthani crests.
4. **Live Wedding Countdown**: Real-time counter ticking down to the sacred Vivah muhurat: **December 2, 2026 at 08:55 AM**.
5. **Ceremony Itinerary (6 Auspicious Events)**:
   - **Ganpati Sthapna**: Nov 28, 2026 · 12:15 PM · Residence, Kolyari
   - **Haldi Ceremony**: Nov 28, 2026 · 04:00 PM · Residence, Kolyari
   - **Mandap & Mayra**: Dec 01, 2026 · 10:00 AM · Residence, Kolyari
   - **Bindoli (Royal Procession)**: Dec 01, 2026 · 07:00 PM · Residence, Kolyari
   - **Shubh Vivah (Wedding)**: Dec 02, 2026 · 08:55 AM · Residence, Khakhad
   - **Reception**: Dec 04, 2026 · 06:00 PM · Residence, Kolyari
   Each event features date, time, venue address, *"Add to Calendar (.ics)"*, and *"View on Google Maps"*.
6. **Interactive Venue Guides**: Dual venue locator cards for **Kolyari** and **Khakhad** with embedded directions and direct links to the exact Google Maps coordinates provided.
7. **Guest Blessings & RSVP**: Interactive digital guestbook where guests can leave heartfelt wishes and confirm attendance, instantly stored in local state.

#### Visual Identity & Theme
- **Color Palette**:
  - Dominant Canvas (60%): Warm royal ivory and soft cream parchment (`#FCF9F2`, `#FAF5EC`) with rich crimson hero accents (`#7A121D`, `#5B0D15`).
  - Structural Surfaces (30%): Deep royal maroon cards (`#66101F`), gold-bordered parchment panels (`#FFFDF9`), and brass embellishments (`#C5A059`).
  - Accent Budget (10%): Radiant antique gold (`#D4AF37`, `#F2D06B`) and saffron marigold (`#E65100`).
- **Typography & Hierarchy**:
  - Display & Headings: *Cinzel Decorative* / *Cinzel* / *Playfair Display* for royal titles, names, and Sanskrit shlokas.
  - Body & Event Details: *Plus Jakarta Sans* / *DM Sans* for high-legibility timings, venue addresses, and guest interactions.
- **Atmospheric Udaipur Backdrop**:
  - Layered SVG & CSS silhouettes of Udaipur's City Palace domes, jharokha archways, and Lake Pichola rippling waters.
  - Subtle floating animated rose/jasmine petals with pause/play toggle for accessibility.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Interactive Audio Engine with Multi-Layered Fallback**
  - *Chosen Approach*: Web Audio API + HTML5 Audio hybrid supporting the uploaded wedding instrumental music soundtrack, featuring an opening prompt so browser autoplay policies are respected seamlessly.
  - *Why*: Browsers strictly block autoplay audio without user interaction. The Royal Envelope click-to-open gesture naturally triggers audio playback smoothly without harsh browser blocks.
- **Decision 2: Direct Google Maps Deep Links with Offline-friendly .ics Calendar Generation**
  - *Chosen Approach*: Direct one-click links to `https://maps.app.goo.gl/ifMey6tvBozAFWTn9?g_st=ac` (Kolyari) and `https://maps.app.goo.gl/ScMm3hxmYeRpqRYS8` (Khakhad) alongside dynamic `.ics` calendar file downloads for each ceremony.
  - *Why*: Guests traveling to Udaipur, Kolyari, and Khakhad need instant GPS directions on Google Maps and reminder notifications on their Apple/Google calendars.
- **Decision 3: Zero-Dependency Client State Persistence**
  - *Chosen Approach*: Browser `localStorage` for guest wishes, RSVP confirmations, and audio playback preferences.
  - *Why*: Instant speed, zero external server latency, full functionality in offline or poor cellular connectivity common during destination travel.

---

### 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                    User / Guest Browser                      │
└──────────────────────────────┬───────────────────────────────┘
                               │
                ┌──────────────▼──────────────┐
                │       App.tsx (Root)        │
                │  - State: envelopeOpened    │
                │  - State: isPlayingAudio    │
                │  - State: activeEventTab    │
                └──────────────┬──────────────┘
                               │
       ┌───────────────────────┼────────────────────────┐
       │                       │                        │
┌──────▼────────┐       ┌──────▼────────┐       ┌───────▼────────┐
│ Royal Envelope│       │  Audio Engine │       │ Udaipur Sky    │
│ Unsealing UI  │       │ (Flute/Shehnai│       │ & Petal Motion │
│ (Wax Seal)    │       │ Music Toggle) │       │ (CSS/Motion)   │
└───────────────┘       └───────────────┘       └────────────────┘
                               │
       ┌───────────────────────┼────────────────────────┐
       │                       │                        │
┌──────▼────────┐       ┌──────▼────────┐       ┌───────▼────────┐
│ Ganesha &     │       │ Couple Lineage│       │ Countdown &    │
│ Shloka Banner │       │ & Family Card │       │ Calendar Sync  │
└───────────────┘       └───────────────┘       └────────────────┘
                               │
       ┌───────────────────────┴────────────────────────┐
       │                                                │
┌──────▼───────────────────────┐        ┌───────────────▼────────┐
│ 6-Event Timeline & Schedule  │        │ Venue Maps & Directions│
│ - Ganpati Sthapna (Nov 28)   │        │ - Kolyari Residence    │
│ - Haldi (Nov 28)             │        │ - Khakhad Residence    │
│ - Mandap & Mayra (Dec 01)    │        │ (Google Maps Nav)      │
│ - Bindoli (Dec 01)           │        └────────────────────────┘
│ - Shubh Vivah (Dec 02)       │                        │
│ - Royal Reception (Dec 04)   │        ┌───────────────▼────────┐
└──────────────────────────────┘        │ Guestbook & RSVP Store │
                                        │ (localStorage Sync)    │
                                        └────────────────────────┘
```

#### Event Data Model
```typescript
interface WeddingEvent {
  id: string;
  name: string;
  hindiName: string;
  date: string; // e.g., "28 November 2026"
  time: string; // e.g., "12:15 PM"
  isoDateTime: string; // "2026-11-28T12:15:00"
  venue: string; // e.g., "Residence, Kolyari"
  address: string; // e.g., "Kolyari, Udaipur, Rajasthan 313701"
  mapUrl: string; // Google Maps URL
  themeColor: string;
  icon: string;
  description: string;
}
```
