export interface WeddingEvent {
  id: string;
  name: string;
  hindiName: string;
  date: string; // e.g. "28 November 2026"
  time: string; // e.g. "12:15 PM"
  venue: string; // e.g. "Residence, Kolyari"
  address: string; // e.g. "Kolyari, Udaipur Rajasthan 313701"
  mapUrl: string;
  category: 'pre-wedding' | 'wedding' | 'reception';
  locationTag: 'Kolyari' | 'Khakhad';
  color: string;
  description: string;
  auspiciousNote?: string;
  isoDate: string; // "2026-11-28T12:15:00"
  durationHours: number;
}

export interface Blessing {
  id: string;
  sender: string;
  relation: string;
  message: string;
  timestamp: string;
  avatarSeed?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'Pre-Wedding' | 'Haldi' | 'Mandap' | 'Bindoli' | 'Vivah' | 'Reception';
  imageUrl: string;
  dateAdded?: string;
  description?: string;
}

export interface CoupleDetails {
  groom: {
    name: string;
    hindiName: string;
    fatherName: string;
    motherName: string;
    residence: string;
    residenceHindi: string;
    title: string;
  };
  bride: {
    name: string;
    hindiName: string;
    fatherName: string;
    motherName: string;
    residence: string;
    residenceHindi: string;
    title: string;
  };
}
