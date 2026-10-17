import { WeddingEvent, CoupleDetails, GalleryImage } from '../types/wedding';
import lordGaneshaImg from '../assets/images/lord_ganesha_watercolor_1792205059617.jpg';
import udaipurSkylineImg from '../assets/images/udaipur_palace_skyline_1792205057773.jpg';
import royalMandapImg from '../assets/images/royal_mandap_palace_1792205058303.jpg';
import preweddingCourtyardImg from '../assets/images/prewedding_palace_courtyard_1792205976994.jpg';
import preweddingLakeImg from '../assets/images/prewedding_lake_pichola_1792205977281.jpg';

export const ASSETS = {
  lordGanesha: lordGaneshaImg,
  udaipurSkyline: udaipurSkylineImg,
  royalMandap: royalMandapImg,
  preweddingCourtyard: preweddingCourtyardImg,
  preweddingLake: preweddingLakeImg,
};

export const ADMIN_CONFIG = {
  email: 'wwwds4994@gmail.com',
  password: 'sharmaji',
  hostName: 'Durgesh Sharma',
};

export const COUPLE_DATA: CoupleDetails = {
  groom: {
    name: 'Durgesh Sharma',
    hindiName: 'दुर्गेश शर्मा',
    fatherName: 'Bhagwati Lal Sharma',
    motherName: 'Rekha Sharma',
    residence: 'Kolyari, Udaipur, Rajasthan',
    residenceHindi: 'कोलयारी, उदयपुर, राजस्थान',
    title: 'The Groom (वर)',
  },
  bride: {
    name: 'Bhumika Dave',
    hindiName: 'भूमिका दवे',
    fatherName: 'Niranjan Kumar Dave',
    motherName: 'Shanta Dave',
    residence: 'Khakhad, Udaipur, Rajasthan',
    residenceHindi: 'खाखड़, उदयपुर, राजस्थान',
    title: 'The Bride (वधू)',
  },
};

export const WEDDING_DATE = new Date('2026-12-02T08:55:00');

export const VENUES = [
  {
    id: 'kolyari',
    name: 'Sharma Family Residence',
    town: 'Kolyari',
    address: 'Kolyari, Udaipur, Rajasthan 313701',
    mapUrl: 'https://maps.app.goo.gl/ifMey6tvBozAFWTn9?g_st=ac',
    eventsHosted: ['Ganpati Sthapna', 'Haldi', 'Mandap & Mayra', 'Bindoli', 'Reception'],
    phone: '+91 94140 00000',
    landmarks: 'Near Central Village, Kolyari Tehsil Jhadol, Udaipur District',
    description: 'The ancestral residence of the Sharma family, hosting the traditional pre-wedding ceremonies and the grand wedding reception.',
  },
  {
    id: 'khakhad',
    name: 'Dave Family Residence',
    town: 'Khakhad',
    address: 'Khakhad, Udaipur, Rajasthan 313702',
    mapUrl: 'https://maps.app.goo.gl/ScMm3hxmYeRpqRYS8',
    eventsHosted: ['Wedding Ceremony (Saat Phere)'],
    phone: '+91 98290 00000',
    landmarks: 'Residence, Khakhad, Udaipur District',
    description: 'The sacred venue for the holy Vivah Sanskar, Varmala, and Saat Phere ceremonies at the auspicious morning muhurat of 8:55 AM.',
  },
];

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'ganpati-sthapna',
    name: 'Ganpati Sthapna',
    hindiName: 'गणपति स्थापना',
    date: '28 November 2026',
    time: '12:15 PM',
    venue: 'Residence, Kolyari',
    address: 'Kolyari, Udaipur, Rajasthan 313701',
    mapUrl: 'https://maps.app.goo.gl/ifMey6tvBozAFWTn9?g_st=ac',
    category: 'pre-wedding',
    locationTag: 'Kolyari',
    color: '#D97706',
    description: 'The auspicious invocation of Lord Ganesha to bless the wedding home, remove all obstacles, and usher in joy and spiritual grace.',
    auspiciousNote: 'शुभ मुहूर्त: मध्याह्न १२:१५ बजे',
    isoDate: '2026-11-28T12:15:00',
    durationHours: 3,
  },
  {
    id: 'haldi',
    name: 'Haldi Ceremony',
    hindiName: 'हल्दी रस्म',
    date: '28 November 2026',
    time: '4:00 PM',
    venue: 'Residence, Kolyari',
    address: 'Kolyari, Udaipur, Rajasthan 313701',
    mapUrl: 'https://maps.app.goo.gl/ifMey6tvBozAFWTn9?g_st=ac',
    category: 'pre-wedding',
    locationTag: 'Kolyari',
    color: '#EAB308',
    description: 'An afternoon immersed in sunshine hues, sacred turmeric paste, folk geet, and merry laughter with loved ones.',
    auspiciousNote: 'पीठी एवं मंगल स्नान',
    isoDate: '2026-11-28T16:00:00',
    durationHours: 3,
  },
  {
    id: 'mandap-mayra',
    name: 'Mandap & Mayra',
    hindiName: 'मण्डप रोपण एवं मायरा (भात)',
    date: '1 December 2026',
    time: '10:00 AM',
    venue: 'Residence, Kolyari',
    address: 'Kolyari, Udaipur, Rajasthan 313701',
    mapUrl: 'https://maps.app.goo.gl/ifMey6tvBozAFWTn9?g_st=ac',
    category: 'pre-wedding',
    locationTag: 'Kolyari',
    color: '#B45309',
    description: 'The holy erection of the sacred Mandap alongside the cherished Mayra (Maternal Uncle\'s Bhat) tradition bearing gifts, chunari, and blessings.',
    auspiciousNote: 'ननिहाल पक्ष का शुभागमन एवं भात स्वागत',
    isoDate: '2026-12-01T10:00:00',
    durationHours: 4,
  },
  {
    id: 'bindoli',
    name: 'Bindoli (Royal Procession)',
    hindiName: 'भव्य बिन्दोली',
    date: '1 December 2026',
    time: '7:00 PM',
    venue: 'Residence, Kolyari',
    address: 'Kolyari, Udaipur, Rajasthan 313701',
    mapUrl: 'https://maps.app.goo.gl/ifMey6tvBozAFWTn9?g_st=ac',
    category: 'pre-wedding',
    locationTag: 'Kolyari',
    color: '#9333EA',
    description: 'A vibrant Rajasthani evening procession illuminated by royal lights, dhol beats, dancing relatives, and grand celebration through Kolyari.',
    auspiciousNote: 'नाच-गान, आतिशबाजी एवं ढोल नगाड़े',
    isoDate: '2026-12-01T19:00:00',
    durationHours: 4,
  },
  {
    id: 'wedding',
    name: 'Shubh Vivah (Wedding)',
    hindiName: 'शुभ विवाह (सात फेरे)',
    date: '2 December 2026',
    time: '8:55 AM',
    venue: 'Residence, KHAKHAD',
    address: 'Khakhad, Udaipur, Rajasthan 313702',
    mapUrl: 'https://maps.app.goo.gl/ScMm3hxmYeRpqRYS8',
    category: 'wedding',
    locationTag: 'Khakhad',
    color: '#BE123C',
    description: 'The sacred wedding ceremony, Toran, Jaimala, Kanyadaan, and the seven eternal vows around the holy Agni uniting two souls and families.',
    auspiciousNote: 'पाणिग्रहण संस्कार मुहूर्त: प्रातः ०८:५५ बजे',
    isoDate: '2026-12-02T08:55:00',
    durationHours: 6,
  },
  {
    id: 'reception',
    name: 'Royal Reception',
    hindiName: 'प्रतिभोज (रिसेप्शन)',
    date: '4 December 2026',
    time: '6:00 PM',
    venue: 'Residence, Kolyari',
    address: 'Kolyari, Udaipur, Rajasthan 313701',
    mapUrl: 'https://maps.app.goo.gl/ifMey6tvBozAFWTn9?g_st=ac',
    category: 'reception',
    locationTag: 'Kolyari',
    color: '#0F766E',
    description: 'An evening of felicitation, royal Mewari feast, musical melodies, and welcoming the bride to her new home with affectionate blessings.',
    auspiciousNote: 'स्नेह मिलन एवं प्रीतिभोज',
    isoDate: '2026-12-04T18:00:00',
    durationHours: 5,
  },
];

export const INITIAL_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    title: 'Sunset Harmony at Lake Pichola',
    category: 'Pre-Wedding',
    imageUrl: preweddingLakeImg,
    dateAdded: 'October 2026',
    description: 'Durgesh and Bhumika overlooking the serene waters of Lake Pichola and historic palace pavilions.',
  },
  {
    id: 'g2',
    title: 'Royal Marble Courtyard Moments',
    category: 'Pre-Wedding',
    imageUrl: preweddingCourtyardImg,
    dateAdded: 'October 2026',
    description: 'Romantic moments amidst the carved arches and royal jharokhas of Udaipur City Palace.',
  },
  {
    id: 'g3',
    title: 'Sacred Heritage Mandap',
    category: 'Vivah',
    imageUrl: royalMandapImg,
    dateAdded: 'Pre-view',
    description: 'The holy wedding pavilion adorned with fresh yellow marigold garlands and glowing brass diyas.',
  },
];

export const INITIAL_BLESSINGS = [
  {
    id: 'b1',
    sender: 'Kailash & Sushila Sharma',
    relation: 'Chacha & Chachi',
    message: 'दुर्गेश और भूमिका को जीवन की इस नई और पावन यात्रा पर हार्दिक बधाई और आशीर्वाद। भगवान एकलिंगनाथ जी और गणपति बप्पा सदा सुखी रखें!',
    timestamp: '2 hours ago',
  },
  {
    id: 'b2',
    sender: 'Pramod Dave & Family',
    relation: 'Mama Ji (Maternal Family)',
    message: 'Warmest congratulations to dearest Bhumika & Durgesh! May your love and bond grow stronger with each passing day. Excited for Mayra and Vivah!',
    timestamp: '5 hours ago',
  },
  {
    id: 'b3',
    sender: 'Vikram Singh Rathore',
    relation: 'Family Friend, Udaipur',
    message: 'Heartiest congratulations to Bhagwati Lal ji Sharma and Niranjan Kumar ji Dave for this joyous union. Looking forward to the grand celebrations in Kolyari!',
    timestamp: '1 day ago',
  },
];
