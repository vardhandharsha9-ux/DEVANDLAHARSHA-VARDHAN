import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { GoogleRouteMap, RouteHighlightItem } from '../components/GoogleRouteMap';
import {
  INDIA_STATES_DATA,
  searchIndianLocations,
  findNearestIndianLocation,
  POPULAR_ROUTE_PRESETS,
  FlatLocationResult,
  StateData,
  DistrictData,
  SubDivision,
  INDIA_TRANSIT_HUBS,
} from '../data/indiaLocations';
import { TicketBookingRecord, TicketTransportType } from '../types';
import {
  Ticket,
  Bus,
  Train,
  Plane,
  Car,
  MapPin,
  Search,
  Crosshair,
  ArrowRightLeft,
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Printer,
  Share2,
  Clock,
  Sparkles,
  Phone,
  QrCode,
  Download,
  X,
  CreditCard,
  ChevronDown,
  Navigation,
  ExternalLink,
  Award,
  Layers,
  Info,
  Map,
  Compass,
  ArrowRight,
} from 'lucide-react';

// Operator definitions for realistic All-India routes
interface TransportSchedule {
  id: string;
  type: TicketTransportType;
  operator: string;
  serviceNumber: string;
  departureTime: string;
  arrivalTime?: string;
  durationHours: number;
  classes: {
    code: string;
    name: string;
    rateMultiplier: number;
    availableSeats: number;
    baseFare?: number;
  }[];
  amenities: string[];
  providerName: string;
  cancellationPolicy: string;
  officialUrl?: string;
  speedKmh: number;
}

const BUS_TEMPLATES = [
  {
    operator: 'APSRTC Amaravati Multi-Axle Volvo AC',
    serviceNumber: 'Service #9421 (Garuda Plus)',
    departureTime: '21:30',
    speedKmh: 65,
    classes: [
      { code: 'AC-SL', name: 'AC Sleeper (2+1)', rateMultiplier: 2.2, availableSeats: 18 },
      { code: 'AC-ST', name: 'AC Semi-Sleeper', rateMultiplier: 1.8, availableSeats: 26 },
    ],
    amenities: ['Charging Points', 'Blanket & Pillow', 'Live GPS Tracking', 'Emergency SOS', 'Water Bottle'],
    providerName: 'APSRTC Inter-State Corporation',
    cancellationPolicy: '80% refund up to 12 hours before journey.',
    officialUrl: 'https://www.apsrtconline.in/',
  },
  {
    operator: 'KSRTC Airavat Club Class Multi-Axle',
    serviceNumber: 'Service #5102 (Airavat Diamond)',
    departureTime: '22:15',
    speedKmh: 68,
    classes: [
      { code: 'AC-CC', name: 'Club Class Semi-Sleeper', rateMultiplier: 2.1, availableSeats: 22 },
      { code: 'SL', name: 'Executive Sleeper', rateMultiplier: 2.4, availableSeats: 12 },
    ],
    amenities: ['Ergonomic Calf Rests', 'Wi-Fi Onboard', 'Punctuality Guarantee', 'Reading Lamps'],
    providerName: 'KSRTC Premier Inter-City GDS',
    cancellationPolicy: '75% refund up to 6 hours before departure.',
    officialUrl: 'https://ksrtc.in/',
  },
  {
    operator: 'TSRTC Garuda Plus Inter-State Superfast',
    serviceNumber: 'Service #7729 (Express AC)',
    departureTime: '20:45',
    speedKmh: 65,
    classes: [
      { code: 'AC-ST', name: 'AC Push-Back Seater', rateMultiplier: 1.7, availableSeats: 32 },
    ],
    amenities: ['Air Suspension Comfort', 'CCTV Surveillance', 'Luggage Tagging'],
    providerName: 'TSRTC State Bus Portal',
    cancellationPolicy: '85% refund up to 24 hours prior to travel.',
    officialUrl: 'https://www.tsrtconline.in/',
  },
  {
    operator: 'Orange Travels Sleeper & Multi-Axle',
    serviceNumber: 'Orange Lux #9901',
    departureTime: '23:00',
    speedKmh: 70,
    classes: [
      { code: 'L-SL', name: 'Lower Sleeper Suite', rateMultiplier: 2.5, availableSeats: 8 },
      { code: 'U-SL', name: 'Upper Sleeper Single', rateMultiplier: 2.3, availableSeats: 14 },
    ],
    amenities: ['Individual 10-inch LCD Screens', 'Premium Bedrolls', 'Restroom Stop at Branded Plaza', 'Snack Kit'],
    providerName: 'RedBus Verified Private GDS',
    cancellationPolicy: 'Full refund minus ₹50 fee up to 8 hours prior.',
    officialUrl: 'https://www.redbus.in/',
  },
];

const TRAIN_TEMPLATES = [
  {
    operator: 'Indian Railways - Vande Bharat Express',
    serviceNumber: 'Train #20608 (Superfast Express)',
    departureTime: '06:15',
    speedKmh: 95,
    classes: [
      { code: 'CC', name: 'AC Chair Car (CC)', rateMultiplier: 1.9, availableSeats: 48 },
      { code: 'EC', name: 'Executive Chair Car (EC)', rateMultiplier: 3.4, availableSeats: 16 },
    ],
    amenities: ['Onboard Gourmet Meals Included', '180° Rotatable Plush Seats', 'Bio-Vacuum Hygiene', 'Panoramic Windows'],
    providerName: 'IRCTC Next Generation eTicketing System',
    cancellationPolicy: 'IRCTC rules: ₹120 clerkage fee if cancelled 48h prior.',
    officialUrl: 'https://www.irctc.co.in/',
  },
  {
    operator: 'Indian Railways - Superfast Express',
    serviceNumber: 'Train #12760 (Charminar / Rayalaseema SF)',
    departureTime: '19:40',
    speedKmh: 75,
    classes: [
      { code: '1A', name: 'First AC (1A)', rateMultiplier: 3.8, availableSeats: 6 },
      { code: '2A', name: 'AC 2-Tier (2A)', rateMultiplier: 2.4, availableSeats: 24 },
      { code: '3A', name: 'AC 3-Tier (3A)', rateMultiplier: 1.7, availableSeats: 64 },
      { code: 'SL', name: 'Sleeper Class (SL)', rateMultiplier: 0.9, availableSeats: 80 },
    ],
    amenities: ['Pantry Car Food & Chai', 'Bedroll in AC Coaches', 'Reserved Berths', 'Charging Sockets'],
    providerName: 'IRCTC National Rail Network',
    cancellationPolicy: 'Refund subject to IRCTC chart preparation timelines.',
    officialUrl: 'https://www.irctc.co.in/',
  },
  {
    operator: 'Indian Railways - Shatabdi Express',
    serviceNumber: 'Train #12028 (Shatabdi Day Express)',
    departureTime: '14:20',
    speedKmh: 90,
    classes: [
      { code: 'CC', name: 'AC Chair Car (CC)', rateMultiplier: 2.0, availableSeats: 36 },
      { code: 'EC', name: 'Executive Anubhuti Class', rateMultiplier: 3.6, availableSeats: 8 },
    ],
    amenities: ['Complimentary Snacks & Tea', 'Reserved Express Seating', 'Daily On-Time Guarantee'],
    providerName: 'IRCTC Partner API',
    cancellationPolicy: 'Full refund minus nominal flat deduction 24h prior.',
    officialUrl: 'https://www.irctc.co.in/',
  },
];

const FLIGHT_TEMPLATES = [
  {
    operator: 'IndiGo Airlines (6E)',
    serviceNumber: 'Flight 6E-7281 (Airbus A320neo)',
    departureTime: '09:50',
    speedKmh: 650,
    classes: [
      { code: 'ECO', name: 'Economy Class (15kg Bag)', rateMultiplier: 5.5, availableSeats: 28 },
      { code: 'FLEX', name: 'IndiGo Flexi Plus (Free Seat)', rateMultiplier: 6.8, availableSeats: 12 },
    ],
    amenities: ['15 kg Checked Baggage', '7 kg Cabin Bag', 'Express Web Check-in', 'USB Charging'],
    providerName: 'IndiGo Direct Airline NDC Gateway',
    cancellationPolicy: 'Airline credit shell provided upon cancellation 2h prior.',
    officialUrl: 'https://www.goindigo.in/',
  },
  {
    operator: 'Air India (AI)',
    serviceNumber: 'Flight AI-542 (Boeing 787 Dreamliner)',
    departureTime: '13:30',
    speedKmh: 680,
    classes: [
      { code: 'ECO', name: 'Economy Classic', rateMultiplier: 5.8, availableSeats: 20 },
      { code: 'BIZ', name: 'Business Class (Lie-Flat)', rateMultiplier: 12.0, availableSeats: 4 },
    ],
    amenities: ['Warm Meals & Beverages Included', '25 kg Baggage Allowance', 'Lounge Access (Business)'],
    providerName: 'Air India Amadeus Global Distribution',
    cancellationPolicy: 'Full refund minus standard airline cancellation fee.',
    officialUrl: 'https://www.airindia.com/',
  },
  {
    operator: 'Akasa Air (QP)',
    serviceNumber: 'Flight QP-1402 (Boeing 737 MAX)',
    departureTime: '18:15',
    speedKmh: 640,
    classes: [
      { code: 'ECO', name: 'Economy Saver', rateMultiplier: 4.8, availableSeats: 34 },
    ],
    amenities: ['Café Akasa Meals Pre-book', 'Quiet Cabin Ambient Mood Lighting', 'USB-A & USB-C Ports'],
    providerName: 'Akasa Air Direct Connect',
    cancellationPolicy: 'Refund processed within 48 hours to original payment mode.',
    officialUrl: 'https://www.akasaair.com/',
  },
];

const CAB_TEMPLATES = [
  {
    operator: 'Ola / Uber Intercity Outstation',
    serviceNumber: 'Intercity Prime Sedan (Dzire / Etios)',
    departureTime: 'Immediate / Scheduled Pickup',
    speedKmh: 65,
    classes: [
      { code: 'SEDAN', name: 'AC Prime Sedan (4-Seater)', rateMultiplier: 3.2, availableSeats: 4 },
      { code: 'SUV', name: 'AC Prime SUV (Ertiga/Innova)', rateMultiplier: 4.5, availableSeats: 6 },
    ],
    amenities: ['Doorstep Pickup & Drop', 'Toll & State Tax Included', 'Verified Chauffeur', '24x7 Helpline'],
    providerName: 'Ola / Uber Intercity Outstation Network',
    cancellationPolicy: 'Free cancellation up to 1 hour before scheduled pickup.',
    officialUrl: 'https://www.uber.com/in/en/ride/intercity/',
  },
  {
    operator: 'Savaari Premium Chauffeur Cabs',
    serviceNumber: 'Innova Crysta Executive Fleet',
    departureTime: 'Flexible Any-Time Pickup',
    speedKmh: 70,
    classes: [
      { code: 'CRYSTA', name: 'Innova Crysta Luxury (7-Seater)', rateMultiplier: 5.2, availableSeats: 7 },
      { code: 'ETIOS', name: 'Comfort Sedan Dzire', rateMultiplier: 3.0, availableSeats: 4 },
    ],
    amenities: ['Zero Surge Guarantee', 'Luggage Carrier', 'Chauffeur Background Verified', 'GPS Tracking'],
    providerName: 'Savaari Car Rentals Direct Portal',
    cancellationPolicy: '100% refund up to 24 hours prior.',
    officialUrl: 'https://www.savaari.com/',
  },
];

const CAR_TEMPLATES = [
  {
    operator: 'Zoomcar / Revv Self-Drive Mobility',
    serviceNumber: 'Self-Drive Fleet #ZC-8820',
    departureTime: 'Flexible Instant Keyless Pickup',
    speedKmh: 65,
    classes: [
      { code: 'HATCH', name: 'Swift / Baleno Petrol MT', rateMultiplier: 2.4, availableSeats: 5 },
      { code: 'SUV-SD', name: 'Creta / Brezza Automatic', rateMultiplier: 3.8, availableSeats: 5 },
      { code: '7SEAT', name: 'Scorpio-N / XUV700 4x4', rateMultiplier: 4.8, availableSeats: 7 },
    ],
    amenities: ['Unlimited KMs Option', 'Comprehensive Insurance Included', 'Keyless Bluetooth Unlock', 'Cleaned & Sanitized'],
    providerName: 'Zoomcar India Self-Drive GDS',
    cancellationPolicy: 'Full refund minus ₹200 fee up to 2 hours before booking.',
    officialUrl: 'https://www.zoomcar.com/',
  },
];

const VEHICLE_TEMPLATES = [
  {
    operator: 'Swastik Travels Luxury Fleet & Minibus',
    serviceNumber: 'Force Urbania / Maharaja Coach',
    departureTime: '06:00 / Custom Tour Departure',
    speedKmh: 60,
    classes: [
      { code: 'TEMPO12', name: '12-Seater Maharaja Tempo Traveller (2+1)', rateMultiplier: 6.5, availableSeats: 12 },
      { code: 'URBANIA17', name: '17-Seater Force Urbania Executive Van', rateMultiplier: 8.5, availableSeats: 17 },
      { code: 'COACH32', name: '32-Seater BharatBenz AC Air-Suspension Bus', rateMultiplier: 14.0, availableSeats: 32 },
    ],
    amenities: ['Reclining Push-Back Seats', 'Individual AC Vents & USB Chargers', 'Microphone & Audio System', 'Experienced Highway Captain'],
    providerName: 'Swastik Travels Official Fleet',
    cancellationPolicy: 'Refundable up to 24 hours prior with nominal fee.',
    officialUrl: 'tel:9391892404',
  },
];

const LOCAL_TEMPLATES = [
  {
    operator: 'City Local Auto & E-Rickshaw Stand',
    serviceNumber: 'Point-to-Point City Feeder',
    departureTime: 'On-Demand Instant',
    speedKmh: 35,
    classes: [
      { code: 'AUTO', name: '3-Wheeler Auto Rickshaw (Metred / Prepaid)', rateMultiplier: 1.2, availableSeats: 3 },
      { code: 'E-RICK', name: 'Eco E-Rickshaw Metro Feeder', rateMultiplier: 0.8, availableSeats: 4 },
      { code: 'TAXI', name: 'Local City Taxi (Non-AC/AC)', rateMultiplier: 1.8, availableSeats: 4 },
    ],
    amenities: ['Government Regulated Tariff', 'Prepaid Counter Receipts', 'Quick Hop-on / Hop-off', 'Available at All Stations & Stands'],
    providerName: 'District Transport Authority / Prepaid Counter',
    cancellationPolicy: 'No cancellation charges prior to boarding.',
    officialUrl: 'https://parivahan.gov.in/',
  },
];

export const TicketBookingPage: React.FC = () => {
  const { ticketBookings, addTicketBooking, cancelTicketBooking, navigateTo, showToast, liveLocation } = useApp();

  // Active top tab
  const [activeTab, setActiveTab] = useState<'book' | 'my-tickets' | 'gateways'>('book');

  // Transport mode selection (7 modes)
  const [transportType, setTransportType] = useState<TicketTransportType>('BUS');

  // Origin location selection state
  const [originMode, setOriginMode] = useState<'search' | 'hierarchy' | 'gps'>('search');
  const [originQuery, setOriginQuery] = useState('');
  const [originResults, setOriginResults] = useState<FlatLocationResult[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<FlatLocationResult | null>(() => {
    return {
      id: 'ap-tp-1',
      title: 'Tirupati Central Bus Station (APSRTC)',
      subtitle: 'Tirupati Urban Mandal, Tirupati District, Andhra Pradesh',
      state: 'Andhra Pradesh',
      district: 'Tirupati',
      subDivision: 'Tirupati Urban',
      subDivisionType: 'Mandal',
      locality: 'Tirupati Central',
      pinCode: '517501',
      coordinates: { lat: 13.6288, lng: 79.4192 },
    };
  });

  // Hierarchy dropdowns for Origin
  const [originState, setOriginState] = useState<StateData | null>(
    INDIA_STATES_DATA.find((s) => s.name === 'Andhra Pradesh') || null
  );
  const [originDistrict, setOriginDistrict] = useState<DistrictData | null>(null);
  const [originSubDiv, setOriginSubDiv] = useState<SubDivision | null>(null);

  // Destination location selection state
  const [destMode, setDestMode] = useState<'search' | 'hierarchy' | 'gps'>('search');
  const [destQuery, setDestQuery] = useState('');
  const [destResults, setDestResults] = useState<FlatLocationResult[]>([]);
  const [selectedDest, setSelectedDest] = useState<FlatLocationResult | null>(() => {
    return {
      id: 'ka-bn-2',
      title: 'Kempegowda Majestic Bus Station (Bengaluru)',
      subtitle: 'Bengaluru North Taluk, Bengaluru Urban District, Karnataka',
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      subDivision: 'Bengaluru North',
      subDivisionType: 'Taluk',
      locality: 'Majestic City Center',
      pinCode: '560009',
      coordinates: { lat: 12.9772, lng: 77.5713 },
    };
  });

  // Hierarchy dropdowns for Destination
  const [destState, setDestState] = useState<StateData | null>(
    INDIA_STATES_DATA.find((s) => s.name === 'Karnataka') || null
  );
  const [destDistrict, setDestDistrict] = useState<DistrictData | null>(null);
  const [destSubDiv, setDestSubDiv] = useState<SubDivision | null>(null);

  // Journey details
  const [journeyDate, setJourneyDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [hasReturnTrip, setHasReturnTrip] = useState<boolean>(false);
  const [returnDate, setReturnDate] = useState<string>(() => {
    const after = new Date();
    after.setDate(after.getDate() + 4);
    return after.toISOString().split('T')[0];
  });

  // Passenger counts & manifest
  const [passengers, setPassengers] = useState<
    {
      name: string;
      age: number;
      gender: string;
      category: 'Adult' | 'Child' | 'Senior Citizen';
      berthPreference: string;
    }[]
  >([
    {
      name: 'Devandla Harsha Vardhan',
      age: 26,
      gender: 'Male',
      category: 'Adult',
      berthPreference: 'Lower / Window',
    },
  ]);
  const [contactMobile, setContactMobile] = useState('9391892404');
  const [contactEmail, setContactEmail] = useState('harsha@sathwikatravels.com');

  // Search execution state
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [lastSearchedAt, setLastSearchedAt] = useState<string | null>(null);

  // Selected schedule & class
  const [selectedScheduleIndex, setSelectedScheduleIndex] = useState<number>(0);
  const [selectedClassCode, setSelectedClassCode] = useState<string>('AC-SL');

  // Route metrics computed from coordinates or map
  const [routeDistanceKm, setRouteDistanceKm] = useState<number>(254);
  const [routeDurationMins, setRouteDurationMins] = useState<number>(290);
  const [showFullMap, setShowFullMap] = useState<boolean>(true);

  // Issued Ticket Preview Modal
  const [activeTicketModal, setActiveTicketModal] = useState<TicketBookingRecord | null>(null);

  // Search autocompletes
  useEffect(() => {
    if (originQuery.trim().length >= 2) {
      setOriginResults(searchIndianLocations(originQuery));
    } else {
      setOriginResults([]);
    }
  }, [originQuery]);

  useEffect(() => {
    if (destQuery.trim().length >= 2) {
      setDestResults(searchIndianLocations(destQuery));
    } else {
      setDestResults([]);
    }
  }, [destQuery]);

  // Recalculate straight/road distance whenever origin or destination changes
  useEffect(() => {
    if (!selectedOrigin || !selectedDest) return;
    const lat1 = selectedOrigin.coordinates.lat;
    const lon1 = selectedOrigin.coordinates.lng;
    const lat2 = selectedDest.coordinates.lat;
    const lon2 = selectedDest.coordinates.lng;

    const R = 6371; // Earth radius km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const airKm = R * c;

    // Road factor 1.28x
    const roadKm = Math.max(10, Math.round(airKm * 1.28));
    setRouteDistanceKm(roadKm);

    // Approximate duration by mode
    let avgSpeed = 60;
    if (transportType === 'TRAIN') avgSpeed = 80;
    if (transportType === 'FLIGHT') avgSpeed = 600;
    if (transportType === 'LOCAL') avgSpeed = 35;
    const mins = Math.max(20, Math.round((roadKm / avgSpeed) * 60));
    setRouteDurationMins(mins);
  }, [selectedOrigin, selectedDest, transportType]);

  // Generate dynamic transport schedules matching the current route
  const availableSchedules: TransportSchedule[] = useMemo(() => {
    const dist = Math.max(15, routeDistanceKm);

    let templates: any[] = BUS_TEMPLATES;
    let baseRate = 1.65;
    let baseOffset = 0;

    if (transportType === 'TRAIN') {
      templates = TRAIN_TEMPLATES;
      baseRate = 0.95;
      baseOffset = 120;
    } else if (transportType === 'FLIGHT') {
      templates = FLIGHT_TEMPLATES;
      baseRate = 3.8;
      baseOffset = 1800;
    } else if (transportType === 'CAB') {
      templates = CAB_TEMPLATES;
      baseRate = 2.4;
      baseOffset = 250;
    } else if (transportType === 'CAR') {
      templates = CAR_TEMPLATES;
      baseRate = 2.1;
      baseOffset = 300;
    } else if (transportType === 'VEHICLE') {
      templates = VEHICLE_TEMPLATES;
      baseRate = 3.2;
      baseOffset = 600;
    } else if (transportType === 'LOCAL') {
      templates = LOCAL_TEMPLATES;
      baseRate = 1.4;
      baseOffset = 40;
    }

    return templates.map((tmpl, idx) => {
      const durationHours =
        transportType === 'FLIGHT'
          ? Math.round((dist / tmpl.speedKmh + 0.5) * 10) / 10
          : Math.round((dist / tmpl.speedKmh) * 10) / 10;

      let arrTime = '23:30';
      if (tmpl.departureTime.includes(':')) {
        const [depH, depM] = tmpl.departureTime.split(':').map(Number);
        const arrDate = new Date();
        arrDate.setHours(depH + Math.floor(durationHours), depM + Math.round((durationHours % 1) * 60));
        arrTime = `${String(arrDate.getHours()).padStart(2, '0')}:${String(
          arrDate.getMinutes()
        ).padStart(2, '0')}`;
      } else {
        arrTime = 'Point-to-Point';
      }

      return {
        id: `${transportType.toLowerCase()}-sch-${idx}`,
        type: transportType,
        operator: tmpl.operator,
        serviceNumber: tmpl.serviceNumber,
        departureTime: tmpl.departureTime,
        arrivalTime: arrTime,
        durationHours,
        speedKmh: tmpl.speedKmh,
        classes: tmpl.classes.map((cls: any) => ({
          ...cls,
          baseFare: Math.max(
            50,
            Math.round(dist * baseRate * (cls.rateMultiplier / 2) + baseOffset)
          ),
        })),
        amenities: tmpl.amenities,
        providerName: tmpl.providerName,
        cancellationPolicy: tmpl.cancellationPolicy,
        officialUrl: tmpl.officialUrl,
      };
    });
  }, [transportType, routeDistanceKm]);

  // Selected schedule object
  const currentSchedule = availableSchedules[selectedScheduleIndex] || availableSchedules[0];

  // Adjust selected class code when schedule changes
  useEffect(() => {
    if (currentSchedule && currentSchedule.classes.length > 0) {
      const exists = currentSchedule.classes.some((c) => c.code === selectedClassCode);
      if (!exists) {
        setSelectedClassCode(currentSchedule.classes[0].code);
      }
    }
  }, [currentSchedule, selectedClassCode]);

  // Selected class
  const currentClass =
    currentSchedule?.classes.find((c) => c.code === selectedClassCode) || currentSchedule?.classes[0];

  // Pricing breakdown
  const pricing = useMemo(() => {
    const singleBaseFare = currentClass?.baseFare || 500;
    const passengerCount = passengers.length;
    const baseTotal = singleBaseFare * passengerCount * (hasReturnTrip ? 1.85 : 1);
    // GST: 5% for bus/train/cab, 12% for flight
    const gstRate = transportType === 'FLIGHT' ? 0.12 : 0.05;
    const taxes = Math.round(baseTotal * gstRate);
    const convenienceFee = transportType === 'FLIGHT' ? 180 : transportType === 'TRAIN' ? 35 : 50;
    const grandTotal = Math.round(baseTotal + taxes + convenienceFee);

    return {
      singleBaseFare,
      passengerCount,
      baseTotal: Math.round(baseTotal),
      taxes,
      convenienceFee,
      grandTotal,
    };
  }, [currentClass, passengers, transportType, hasReturnTrip]);

  // Swap Origin and Destination
  const handleSwapLocations = () => {
    const tempOrigin = selectedOrigin;
    setSelectedOrigin(selectedDest);
    setSelectedDest(tempOrigin);
    showToast('Origin and Destination swapped 🔄', 'info');
  };

  // Use GPS location for Origin (real Geolocation API)
  const handleUseGPSForOrigin = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser', 'error');
      return;
    }
    showToast('Acquiring real GPS coordinates from browser...', 'info');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const resolved = findNearestIndianLocation(latitude, longitude);
        setSelectedOrigin(resolved);
        showToast(`📍 GPS Origin resolved to ${resolved.locality} (${resolved.district}, ${resolved.state})`, 'success');
      },
      (err) => {
        showToast(`GPS Error: ${err.message}`, 'error');
      },
      { timeout: 12000, enableHighAccuracy: true }
    );
  };

  // Use GPS location for Destination
  const handleUseGPSForDest = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser', 'error');
      return;
    }
    showToast('Acquiring real GPS coordinates from browser...', 'info');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const resolved = findNearestIndianLocation(latitude, longitude);
        setSelectedDest(resolved);
        showToast(`📍 Destination set to ${resolved.locality} (${resolved.district}, ${resolved.state})`, 'success');
      },
      (err) => {
        showToast(`GPS Error: ${err.message}`, 'error');
      },
      { timeout: 12000, enableHighAccuracy: true }
    );
  };

  // Trigger search action
  const handleSearchTickets = () => {
    if (!selectedOrigin || !selectedDest) {
      showToast('Please select both Origin and Destination', 'error');
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setLastSearchedAt(new Date().toLocaleTimeString());
      showToast(
        `Found ${availableSchedules.length} options for ${selectedOrigin.locality} ➔ ${selectedDest.locality}!`,
        'success'
      );
    }, 400);
  };

  // Add passenger
  const handleAddPassenger = () => {
    if (passengers.length >= 6) {
      showToast('Maximum 6 passengers per booking', 'info');
      return;
    }
    setPassengers((prev) => [
      ...prev,
      {
        name: '',
        age: 28,
        gender: 'Female',
        category: 'Adult',
        berthPreference:
          transportType === 'BUS'
            ? 'Upper Sleeper'
            : transportType === 'TRAIN'
            ? 'Middle Berth'
            : 'Aisle',
      },
    ]);
  };

  // Remove passenger
  const handleRemovePassenger = (index: number) => {
    if (passengers.length <= 1) return;
    setPassengers((prev) => prev.filter((_, i) => i !== index));
  };

  // Update passenger
  const handlePassengerChange = (index: number, field: string, value: any) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  // Connect Ticket with Trip Planner
  const handlePlanTripFromTicket = () => {
    if (!selectedOrigin || !selectedDest) return;
    navigateTo('trip-planner', {
      startingLocation: `${selectedOrigin.locality}, ${selectedOrigin.district}, ${selectedOrigin.state}`,
      destination: `${selectedDest.locality}, ${selectedDest.district}, ${selectedDest.state}`,
      startDate: journeyDate,
      adults: passengers.length,
      budget: pricing.grandTotal * 3,
    });
    showToast('Routing ticket details to Trip Planner 🧳', 'info');
  };

  // Complete Booking & Generate Swastik E-Ticket
  const handleConfirmBooking = () => {
    if (!selectedOrigin || !selectedDest) {
      showToast('Please specify both Origin and Destination', 'error');
      return;
    }
    const emptyName = passengers.find((p) => !p.name.trim());
    if (emptyName) {
      showToast('Please provide names for all passengers', 'error');
      return;
    }

    const randomPnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const randomRef = `STT-TKT-${Date.now().toString().slice(-6)}`;

    // Assign realistic seats/berths
    const passengerRecords = passengers.map((p, idx) => {
      let seatOrBerth = `Seat #${idx + 12}`;
      if (transportType === 'BUS') {
        seatOrBerth = `Berth ${idx % 2 === 0 ? 'L' : 'U'}${idx + 4} (${p.berthPreference})`;
      } else if (transportType === 'TRAIN') {
        seatOrBerth = `Coach S${idx + 2} / Berth ${idx * 6 + 18} (${p.berthPreference})`;
      } else if (transportType === 'FLIGHT') {
        seatOrBerth = `Seat ${14 + idx}${idx % 2 === 0 ? 'A' : 'C'} (${p.berthPreference})`;
      } else if (transportType === 'CAB' || transportType === 'CAR') {
        seatOrBerth = `Passenger Seat #${idx + 1}`;
      } else if (transportType === 'VEHICLE') {
        seatOrBerth = `Luxury Seat #${idx + 3}`;
      } else {
        seatOrBerth = `Stand Slip #${idx + 1}`;
      }
      return {
        name: p.name.trim(),
        age: Number(p.age) || 25,
        gender: p.gender,
        seatOrBerth,
      };
    });

    const newTicket: TicketBookingRecord = {
      id: `tkt-${Date.now()}`,
      bookingRef: randomRef,
      pnrNumber: randomPnr,
      transportType,
      operator: currentSchedule.operator,
      serviceNumber: currentSchedule.serviceNumber,
      origin: `${selectedOrigin.title}, ${selectedOrigin.subDivision} ${selectedOrigin.subDivisionType}, ${selectedOrigin.district}, ${selectedOrigin.state}`,
      originCoordinates: selectedOrigin.coordinates,
      destination: `${selectedDest.title}, ${selectedDest.subDivision} ${selectedDest.subDivisionType}, ${selectedDest.district}, ${selectedDest.state}`,
      destinationCoordinates: selectedDest.coordinates,
      journeyDate,
      departureTime: currentSchedule.departureTime,
      arrivalTime: currentSchedule.arrivalTime || 'Estimated',
      passengers: passengerRecords,
      travelClass: currentClass.name,
      fare: pricing.baseTotal,
      taxes: pricing.taxes,
      totalAmount: pricing.grandTotal,
      status: 'Confirmed',
      bookedAt: new Date().toISOString(),
      isVerifiedProvider: true,
      providerName: currentSchedule.providerName,
      cancellationPolicy: currentSchedule.cancellationPolicy,
    };

    addTicketBooking(newTicket);
    setActiveTicketModal(newTicket);
  };

  // Nearby Transit Hub markers for Google Maps
  const mapHighlightItems: RouteHighlightItem[] = useMemo(() => {
    return INDIA_TRANSIT_HUBS.slice(0, 8).map((hub) => ({
      id: hub.id,
      name: hub.title,
      category: hub.category === 'Railway Station' ? 'Fuel / Stop' : 'Temple',
      lat: hub.coordinates.lat,
      lng: hub.coordinates.lng,
      description: `${hub.subtitle} (${hub.category})`,
    }));
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header & Official Credits */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/70 border border-emerald-600/50 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Pan-India Transit & Google Maps Corridor</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-heading">
                🎫 All-India Ticket Booking
              </h1>
              <p className="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed">
                Travel from any State, District, Mandal/Taluk, or Village across India with live GPS,
                genuine corridor tariffs, verified seat layouts, and official Swastik E-Tickets.
              </p>
              <div className="pt-2 text-xs text-emerald-300/90 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>
                  © 2026 <strong>DEVANDLA HARSHA VARDHAN</strong>. All Rights Reserved.
                </span>
                <span>•</span>
                <span>
                  Developer & Owner Contact:{' '}
                  <a href="tel:9391892404" className="text-amber-300 font-bold hover:underline">
                    9391892404
                  </a>
                </span>
              </div>
            </div>

            {/* Quick Action Navigation Tabs */}
            <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('book')}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'book'
                    ? 'bg-amber-400 text-slate-950 shadow-lg font-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Ticket className="w-4 h-4" />
                <span>Book Travel Tickets</span>
              </button>
              <button
                onClick={() => setActiveTab('my-tickets')}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'my-tickets'
                    ? 'bg-amber-400 text-slate-950 shadow-lg font-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>My Booked Tickets ({ticketBookings.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('gateways')}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'gateways'
                    ? 'bg-amber-400 text-slate-950 shadow-lg font-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Gateways & Status</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: BOOK NEW TICKET */}
        {activeTab === 'book' && (
          <div className="space-y-8">
            {/* Transport Mode Bar (7 Modes) */}
            <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-3 pb-2">
                Select Travel Mode
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                <button
                  onClick={() => setTransportType('BUS')}
                  className={`py-3 px-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all ${
                    transportType === 'BUS'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <Bus className="w-5 h-5" />
                  <span>🚌 Bus</span>
                </button>
                <button
                  onClick={() => setTransportType('TRAIN')}
                  className={`py-3 px-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all ${
                    transportType === 'TRAIN'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <Train className="w-5 h-5" />
                  <span>🚆 Train</span>
                </button>
                <button
                  onClick={() => setTransportType('FLIGHT')}
                  className={`py-3 px-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all ${
                    transportType === 'FLIGHT'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <Plane className="w-5 h-5" />
                  <span>✈️ Flight</span>
                </button>
                <button
                  onClick={() => setTransportType('CAB')}
                  className={`py-3 px-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all ${
                    transportType === 'CAB'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <Car className="w-5 h-5" />
                  <span>🚕 Cab / Taxi</span>
                </button>
                <button
                  onClick={() => setTransportType('CAR')}
                  className={`py-3 px-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all ${
                    transportType === 'CAR'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <Compass className="w-5 h-5" />
                  <span>🚗 Car (Self)</span>
                </button>
                <button
                  onClick={() => setTransportType('VEHICLE')}
                  className={`py-3 px-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all ${
                    transportType === 'VEHICLE'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="w-5 h-5" />
                  <span>🚐 Vehicle (Van)</span>
                </button>
                <button
                  onClick={() => setTransportType('LOCAL')}
                  className={`py-3 px-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all ${
                    transportType === 'LOCAL'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <Navigation className="w-5 h-5" />
                  <span>🛺 Local Transport</span>
                </button>
              </div>
            </div>

            {/* Provider Integration Notice Banner */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <span>Transparent Inventory Status:</span>
                  <span className="px-2 py-0.5 bg-amber-200/80 rounded-md text-[11px] font-extrabold">
                    Estimated / Swastik Direct Schedule
                  </span>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  Real external merchant banking requires commercial GDS partner tokens (IRCTC NGeT, RedBus B2B API, Amadeus). You can reserve confirmed digital vouchers through Swastik Travels or click to book directly on official government/airline provider portals!
                </p>
              </div>
            </div>

            {/* ==================================================== */}
            {/* ORIGIN & DESTINATION SELECTOR BOX */}
            {/* ==================================================== */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                    📍 Origin & Destination Corridors (All 36 States & UTs)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select locations using Real-Time Search, Administrative Hierarchy, or device GPS.
                  </p>
                </div>
                {/* Popular Route Quick Chips */}
                <div className="hidden lg:flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400">Popular Corridors:</span>
                  {POPULAR_ROUTE_PRESETS.slice(0, 3).map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedOrigin(preset.origin);
                        setSelectedDest(preset.destination);
                        showToast(`Loaded route: ${preset.name}`, 'info');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-[11px] font-semibold text-slate-700 transition-colors"
                    >
                      {preset.name.split(' to ')[0]} ➔ {preset.name.split(' to ')[1]?.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                {/* Center Swap Button */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <button
                    onClick={handleSwapLocations}
                    title="Swap Origin and Destination"
                    className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center border-4 border-white transition-transform hover:rotate-180"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                </div>

                {/* ---------------- ORIGIN SELECTOR ---------------- */}
                <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <label className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                      <span>FROM / ORIGIN</span>
                    </label>
                    <div className="flex items-center gap-1 text-xs">
                      <button
                        onClick={() => setOriginMode('search')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                          originMode === 'search'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        Search
                      </button>
                      <button
                        onClick={() => setOriginMode('hierarchy')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                          originMode === 'hierarchy'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        Hierarchy
                      </button>
                      <button
                        onClick={handleUseGPSForOrigin}
                        className="px-2.5 py-1 rounded-lg font-bold bg-slate-200/80 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800 transition-colors flex items-center gap-1"
                        title="Use device GPS"
                      >
                        <Crosshair className="w-3 h-3 text-emerald-600" />
                        <span>My GPS</span>
                      </button>
                    </div>
                  </div>

                  {/* Mode A: Search Box */}
                  {originMode === 'search' && (
                    <div className="relative">
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          type="text"
                          value={originQuery}
                          onChange={(e) => setOriginQuery(e.target.value)}
                          placeholder="Search Railway Station, Bus Stand, Airport, City, Village or PIN..."
                          className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                        />
                      </div>
                      {originResults.length > 0 && (
                        <div className="absolute z-30 left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-200 divide-y divide-slate-100">
                          {originResults.map((res) => (
                            <button
                              key={res.id}
                              onClick={() => {
                                setSelectedOrigin(res);
                                setOriginQuery('');
                                setOriginResults([]);
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-emerald-50 text-xs transition-colors flex items-start gap-2"
                            >
                              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-slate-900">{res.title}</p>
                                <p className="text-[11px] text-slate-500">{res.subtitle}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mode B: Hierarchy Dropdowns */}
                  {originMode === 'hierarchy' && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">State / UT</label>
                        <select
                          value={originState?.id || ''}
                          onChange={(e) => {
                            const found = INDIA_STATES_DATA.find((s) => s.id === e.target.value) || null;
                            setOriginState(found);
                            setOriginDistrict(null);
                            setOriginSubDiv(null);
                          }}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg font-medium"
                        >
                          <option value="">Select State</option>
                          {INDIA_STATES_DATA.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name} ({s.type})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">District</label>
                        <select
                          value={originDistrict?.id || ''}
                          disabled={!originState}
                          onChange={(e) => {
                            const found = originState?.districts.find((d) => d.id === e.target.value) || null;
                            setOriginDistrict(found);
                            setOriginSubDiv(null);
                          }}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg font-medium disabled:opacity-50"
                        >
                          <option value="">Select District</option>
                          {originState?.districts.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">
                          {originState?.subDivisionTerm || 'Sub-Division'}
                        </label>
                        <select
                          value={originSubDiv?.name || ''}
                          disabled={!originDistrict}
                          onChange={(e) => {
                            const found =
                              originDistrict?.subDivisions.find((sd) => sd.name === e.target.value) || null;
                            setOriginSubDiv(found);
                          }}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg font-medium disabled:opacity-50"
                        >
                          <option value="">Select {originState?.subDivisionTerm || 'Sub-Division'}</option>
                          {originDistrict?.subDivisions.map((sd) => (
                            <option key={sd.name} value={sd.name}>
                              {sd.name} ({sd.type})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Locality / Hub</label>
                        <select
                          disabled={!originSubDiv}
                          onChange={(e) => {
                            const loc = originSubDiv?.locations.find((l) => l.id === e.target.value);
                            if (loc && originState && originDistrict && originSubDiv) {
                              setSelectedOrigin({
                                id: loc.id,
                                title: loc.name,
                                subtitle: `${originSubDiv.name} ${originSubDiv.type}, ${originDistrict.name}, ${originState.name}`,
                                state: originState.name,
                                district: originDistrict.name,
                                subDivision: originSubDiv.name,
                                subDivisionType: originSubDiv.type,
                                locality: loc.name,
                                pinCode: loc.pinCode,
                                coordinates: loc.coordinates,
                              });
                              showToast(`Origin set to ${loc.name}`, 'success');
                            }
                          }}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg font-medium disabled:opacity-50"
                        >
                          <option value="">Select Locality</option>
                          {originSubDiv?.locations.map((l) => (
                            <option key={l.id} value={l.id}>
                              {l.name} ({l.type})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Active Origin Breadcrumb Display */}
                  {selectedOrigin && (
                    <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-xs space-y-1">
                      <div className="font-extrabold text-emerald-950 flex items-center justify-between">
                        <span>{selectedOrigin.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold">
                          {selectedOrigin.coordinates.lat.toFixed(4)}°N, {selectedOrigin.coordinates.lng.toFixed(4)}°E
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-800">
                        {selectedOrigin.subDivisionType}: <strong>{selectedOrigin.subDivision}</strong> &bull; District:{' '}
                        <strong>{selectedOrigin.district}</strong> &bull; State: <strong>{selectedOrigin.state}</strong>
                        {selectedOrigin.pinCode && ` (PIN ${selectedOrigin.pinCode})`}
                      </p>
                    </div>
                  )}
                </div>

                {/* ---------------- DESTINATION SELECTOR ---------------- */}
                <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <label className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                      <span>TO / DESTINATION</span>
                    </label>
                    <div className="flex items-center gap-1 text-xs">
                      <button
                        onClick={() => setDestMode('search')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                          destMode === 'search'
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        Search
                      </button>
                      <button
                        onClick={() => setDestMode('hierarchy')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                          destMode === 'hierarchy'
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        Hierarchy
                      </button>
                      <button
                        onClick={handleUseGPSForDest}
                        className="px-2.5 py-1 rounded-lg font-bold bg-slate-200/80 text-slate-700 hover:bg-rose-100 hover:text-rose-800 transition-colors flex items-center gap-1"
                        title="Use device GPS"
                      >
                        <Crosshair className="w-3 h-3 text-rose-600" />
                        <span>My GPS</span>
                      </button>
                    </div>
                  </div>

                  {/* Mode A: Search Box */}
                  {destMode === 'search' && (
                    <div className="relative">
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          type="text"
                          value={destQuery}
                          onChange={(e) => setDestQuery(e.target.value)}
                          placeholder="Search Destination Station, Airport, Bus Stand, City, Taluk or PIN..."
                          className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
                        />
                      </div>
                      {destResults.length > 0 && (
                        <div className="absolute z-30 left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-200 divide-y divide-slate-100">
                          {destResults.map((res) => (
                            <button
                              key={res.id}
                              onClick={() => {
                                setSelectedDest(res);
                                setDestQuery('');
                                setDestResults([]);
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-rose-50 text-xs transition-colors flex items-start gap-2"
                            >
                              <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-slate-900">{res.title}</p>
                                <p className="text-[11px] text-slate-500">{res.subtitle}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mode B: Hierarchy Dropdowns */}
                  {destMode === 'hierarchy' && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">State / UT</label>
                        <select
                          value={destState?.id || ''}
                          onChange={(e) => {
                            const found = INDIA_STATES_DATA.find((s) => s.id === e.target.value) || null;
                            setDestState(found);
                            setDestDistrict(null);
                            setDestSubDiv(null);
                          }}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg font-medium"
                        >
                          <option value="">Select State</option>
                          {INDIA_STATES_DATA.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name} ({s.type})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">District</label>
                        <select
                          value={destDistrict?.id || ''}
                          disabled={!destState}
                          onChange={(e) => {
                            const found = destState?.districts.find((d) => d.id === e.target.value) || null;
                            setDestDistrict(found);
                            setDestSubDiv(null);
                          }}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg font-medium disabled:opacity-50"
                        >
                          <option value="">Select District</option>
                          {destState?.districts.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">
                          {destState?.subDivisionTerm || 'Sub-Division'}
                        </label>
                        <select
                          value={destSubDiv?.name || ''}
                          disabled={!destDistrict}
                          onChange={(e) => {
                            const found =
                              destDistrict?.subDivisions.find((sd) => sd.name === e.target.value) || null;
                            setDestSubDiv(found);
                          }}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg font-medium disabled:opacity-50"
                        >
                          <option value="">Select {destState?.subDivisionTerm || 'Sub-Division'}</option>
                          {destDistrict?.subDivisions.map((sd) => (
                            <option key={sd.name} value={sd.name}>
                              {sd.name} ({sd.type})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Locality / Hub</label>
                        <select
                          disabled={!destSubDiv}
                          onChange={(e) => {
                            const loc = destSubDiv?.locations.find((l) => l.id === e.target.value);
                            if (loc && destState && destDistrict && destSubDiv) {
                              setSelectedDest({
                                id: loc.id,
                                title: loc.name,
                                subtitle: `${destSubDiv.name} ${destSubDiv.type}, ${destDistrict.name}, ${destState.name}`,
                                state: destState.name,
                                district: destDistrict.name,
                                subDivision: destSubDiv.name,
                                subDivisionType: destSubDiv.type,
                                locality: loc.name,
                                pinCode: loc.pinCode,
                                coordinates: loc.coordinates,
                              });
                              showToast(`Destination set to ${loc.name}`, 'success');
                            }
                          }}
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg font-medium disabled:opacity-50"
                        >
                          <option value="">Select Locality</option>
                          {destSubDiv?.locations.map((l) => (
                            <option key={l.id} value={l.id}>
                              {l.name} ({l.type})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Active Destination Breadcrumb Display */}
                  {selectedDest && (
                    <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-3 text-xs space-y-1">
                      <div className="font-extrabold text-rose-950 flex items-center justify-between">
                        <span>{selectedDest.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 font-bold">
                          {selectedDest.coordinates.lat.toFixed(4)}°N, {selectedDest.coordinates.lng.toFixed(4)}°E
                        </span>
                      </div>
                      <p className="text-[11px] text-rose-800">
                        {selectedDest.subDivisionType}: <strong>{selectedDest.subDivision}</strong> &bull; District:{' '}
                        <strong>{selectedDest.district}</strong> &bull; State: <strong>{selectedDest.state}</strong>
                        {selectedDest.pinCode && ` (PIN ${selectedDest.pinCode})`}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Journey Date, Return Trip Toggle & Prominent Search Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-2 rounded-xl">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-700">Journey Date:</span>
                    <input
                      type="date"
                      value={journeyDate}
                      onChange={(e) => setJourneyDate(e.target.value)}
                      className="bg-transparent font-bold text-slate-900 outline-hidden"
                    />
                  </div>

                  <label className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasReturnTrip}
                      onChange={(e) => setHasReturnTrip(e.target.checked)}
                      className="accent-emerald-600 rounded"
                    />
                    <span className="font-bold text-slate-700">Round Trip</span>
                  </label>

                  {hasReturnTrip && (
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-2 rounded-xl">
                      <Calendar className="w-4 h-4 text-rose-600" />
                      <span className="font-bold text-slate-700">Return Date:</span>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="bg-transparent font-bold text-slate-900 outline-hidden"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-2 rounded-xl text-emerald-950 font-semibold border border-emerald-200">
                    <Navigation className="w-4 h-4 text-emerald-600" />
                    <span>
                      Corridor: <strong>{routeDistanceKm} km</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-teal-50 px-3 py-2 rounded-xl text-teal-950 font-semibold border border-teal-200">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <span>
                      ETA: <strong>{Math.floor(routeDurationMins / 60)}h {routeDurationMins % 60}m</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setShowFullMap(!showFullMap)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1"
                  >
                    <span>{showFullMap ? 'Hide Google Map' : 'Show Google Map Route'}</span>
                  </button>

                  {/* PROMINENT SEARCH BUTTON */}
                  <button
                    onClick={handleSearchTickets}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95"
                  >
                    <Search className="w-4 h-4" />
                    <span>🔎 Search Tickets</span>
                  </button>
                </div>
              </div>

              {/* Interactive Google Maps Route Preview */}
              {showFullMap && selectedOrigin && selectedDest && (
                <div className="pt-2">
                  <div className="h-72 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                    <GoogleRouteMap
                      origin={selectedOrigin}
                      destination={selectedDest}
                      travelMode={transportType === 'TRAIN' ? 'TRANSIT' : 'DRIVING'}
                      liveLocation={liveLocation?.coords ? {
                        lat: liveLocation.coords.latitude,
                        lng: liveLocation.coords.longitude,
                        heading: liveLocation.coords.heading,
                        speed: liveLocation.coords.speed,
                      } : null}
                      highlightItems={mapHighlightItems}
                      onRouteCalculated={(details) => {
                        setRouteDistanceKm(details.distanceKm);
                        setRouteDurationMins(details.durationMinutes);
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 px-1">
                    <span>🟢 Origin &bull; 🔴 Destination &bull; 🔵 Live GPS &bull; Markers show nearby stations/airports</span>
                    {lastSearchedAt && <span>Results refreshed: {lastSearchedAt}</span>}
                  </div>
                </div>
              )}
            </div>

            {/* ==================================================== */}
            {/* SCHEDULES & TICKET OPTIONS */}
            {/* ==================================================== */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                    {transportType === 'BUS'
                      ? '🚌 Available Intercity Buses'
                      : transportType === 'TRAIN'
                      ? '🚆 Available Train Services'
                      : transportType === 'FLIGHT'
                      ? '✈️ Available Domestic Flights'
                      : transportType === 'CAB'
                      ? '🚕 Available Outstation Cabs'
                      : transportType === 'CAR'
                      ? '🚗 Self-Drive Rental Options'
                      : transportType === 'VEHICLE'
                      ? '🚐 Swastik Luxury Vans & Coaches'
                      : '🛺 City Feeder & Local Transport'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {availableSchedules.length} direct options for {journeyDate} between{' '}
                    <strong>{selectedOrigin?.locality || selectedOrigin?.title}</strong> and{' '}
                    <strong>{selectedDest?.locality || selectedDest?.title}</strong>.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlanTripFromTicket}
                    className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs border border-teal-200 flex items-center gap-1.5 transition-colors"
                    title="Transfer this route into the Trip Planner"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Plan Trip around Route</span>
                  </button>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    {transportType} Mode
                  </span>
                </div>
              </div>

              {/* Schedules Grid */}
              <div className="space-y-4">
                {availableSchedules.map((schedule, idx) => {
                  const isSelected = selectedScheduleIndex === idx;
                  const lowestFare = Math.min(...schedule.classes.map((c) => c.baseFare || 500));

                  return (
                    <div
                      key={schedule.id}
                      onClick={() => setSelectedScheduleIndex(idx)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500/20 shadow-md'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Operator & Service Details */}
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-black text-base text-slate-900">
                              {schedule.operator}
                            </span>
                            <span className="text-[11px] font-semibold text-slate-500 px-2 py-0.5 rounded-md bg-slate-100">
                              {schedule.serviceNumber}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              Estimated / Swastik Direct
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                            <span className="font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                              Dep: {schedule.departureTime}
                            </span>
                            <span>➔</span>
                            <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                              Arr: {schedule.arrivalTime}
                            </span>
                            <span className="text-slate-400">({schedule.durationHours} hrs &bull; {routeDistanceKm} km)</span>
                          </div>
                          {/* Amenities */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {schedule.amenities.slice(0, 4).map((am, i) => (
                              <span
                                key={i}
                                className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                              >
                                &bull; {am}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Class options & fare */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                          {/* Class selection pills */}
                          <div className="flex flex-wrap gap-1.5">
                            {schedule.classes.map((cls) => (
                              <button
                                key={cls.code}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedScheduleIndex(idx);
                                  setSelectedClassCode(cls.code);
                                }}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all text-left ${
                                  isSelected && selectedClassCode === cls.code
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                <span className="block">{cls.name}</span>
                                <span className="text-[11px] font-black opacity-90">₹{cls.baseFare}</span>
                              </button>
                            ))}
                          </div>

                          <div className="text-right pl-2 sm:border-l border-slate-200">
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">From</span>
                            <span className="text-xl font-black text-emerald-800">₹{lowestFare}</span>
                            <span className="text-[10px] text-slate-500 block">per seat + GST</span>
                          </div>

                          {/* Official Provider Link if applicable */}
                          {schedule.officialUrl && (
                            <a
                              href={schedule.officialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 shrink-0"
                              title="Visit official booking portal"
                            >
                              <span>Official Site</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ==================================================== */}
            {/* PASSENGER DETAILS & FARE SUMMARY */}
            {/* ==================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Passenger Info (2 cols) */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                      👤 Passenger Information
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Specify traveler details, age, category, and seat/berth preference.
                    </p>
                  </div>
                  <button
                    onClick={handleAddPassenger}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors flex items-center gap-1 border border-emerald-200"
                  >
                    <span>+ Add Passenger</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {passengers.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span className="flex items-center gap-2">
                          <span>Passenger #{idx + 1}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                            {p.category}
                          </span>
                        </span>
                        {passengers.length > 1 && (
                          <button
                            onClick={() => handleRemovePassenger(idx)}
                            className="text-rose-600 hover:text-rose-700 text-[11px] underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                        <div className="sm:col-span-4">
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Full Name</label>
                          <input
                            type="text"
                            value={p.name}
                            onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                            placeholder="e.g. Vardhandharsha G."
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-hidden"
                            required
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Age</label>
                          <input
                            type="number"
                            min="1"
                            max="110"
                            value={p.age}
                            onChange={(e) => {
                              const ageVal = Number(e.target.value);
                              let cat: 'Adult' | 'Child' | 'Senior Citizen' = 'Adult';
                              if (ageVal < 12) cat = 'Child';
                              else if (ageVal >= 60) cat = 'Senior Citizen';
                              handlePassengerChange(idx, 'age', ageVal);
                              handlePassengerChange(idx, 'category', cat);
                            }}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-hidden"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">Gender</label>
                          <select
                            value={p.gender}
                            onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-hidden"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="sm:col-span-3">
                          <label className="text-[10px] font-bold text-slate-500 block mb-1">
                            {transportType === 'BUS' ? 'Berth/Seat' : transportType === 'TRAIN' ? 'Berth Choice' : 'Seat Choice'}
                          </label>
                          <select
                            value={p.berthPreference}
                            onChange={(e) => handlePassengerChange(idx, 'berthPreference', e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-semibold outline-hidden"
                          >
                            {transportType === 'BUS' && (
                              <>
                                <option value="Lower Sleeper">Lower Sleeper</option>
                                <option value="Upper Sleeper">Upper Sleeper</option>
                                <option value="Window Seat">Window Seat</option>
                                <option value="Aisle Seat">Aisle Seat</option>
                              </>
                            )}
                            {transportType === 'TRAIN' && (
                              <>
                                <option value="Lower Berth">Lower Berth</option>
                                <option value="Middle Berth">Middle Berth</option>
                                <option value="Upper Berth">Upper Berth</option>
                                <option value="Side Lower">Side Lower</option>
                                <option value="Side Upper">Side Upper</option>
                                <option value="Window (CC)">Window (CC)</option>
                              </>
                            )}
                            {transportType === 'FLIGHT' && (
                              <>
                                <option value="Window">Window Seat</option>
                                <option value="Aisle">Aisle Seat</option>
                                <option value="Extra Legroom">Extra Legroom</option>
                              </>
                            )}
                            {['CAB', 'CAR', 'VEHICLE', 'LOCAL'].includes(transportType) && (
                              <>
                                <option value="Front Passenger">Front Passenger</option>
                                <option value="Window Seat">Window Seat</option>
                                <option value="Middle Seat">Middle Seat</option>
                              </>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Information */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">
                      Contact Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={contactMobile}
                      onChange={(e) => setContactMobile(e.target.value)}
                      placeholder="e.g. 9391892404"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">
                      Contact Email ID
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. traveler@sathwikatravels.com"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Fare Summary & Booking Button (1 col) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                      Pricing Summary
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                      Fare Breakdown
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Service:</span>
                      <strong className="text-slate-900 text-right">{currentSchedule?.operator}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Travel Class:</span>
                      <strong className="text-slate-900">{currentClass?.name}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Base Fare ({pricing.passengerCount} traveler{pricing.passengerCount > 1 ? 's' : ''}):</span>
                      <strong className="text-slate-900">₹{pricing.baseTotal}</strong>
                    </div>
                    {hasReturnTrip && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Includes Return Journey:</span>
                        <span>{returnDate}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>Taxes & GST:</span>
                      <strong className="text-slate-900">₹{pricing.taxes}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Operator Convenience Fee:</span>
                      <strong className="text-slate-900">₹{pricing.convenienceFee}</strong>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm">
                      <span className="font-extrabold text-slate-900">Total Payable:</span>
                      <span className="text-2xl font-black text-emerald-800">₹{pricing.grandTotal}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
                    <div className="flex items-center gap-1 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Swastik Direct Protection</span>
                    </div>
                    <p className="text-emerald-800">
                      Includes 24x7 helpline (+91 877 220 7000), verified boarding assistance, and instant e-ticket generation.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    onClick={handleConfirmBooking}
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2 hover:shadow-emerald-600/20"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm & Generate Swastik E-Ticket</span>
                  </button>

                  <p className="text-[10px] text-center text-slate-400">
                    By reserving, you agree to Swastik Travels terms. Instant PNR confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY BOOKED TICKETS */}
        {activeTab === 'my-tickets' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                    🧳 My Booked Tickets ({ticketBookings.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage upcoming journeys, download digital vouchers, or view route corridors.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('my-bookings')}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Open My Bookings Page</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('book')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>+ Book Another Ticket</span>
                  </button>
                </div>
              </div>

              {ticketBookings.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <Ticket className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-600">No tickets found yet</p>
                  <button
                    onClick={() => setActiveTab('book')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Book Your First Ticket Now
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ticketBookings.map((tkt) => (
                    <div
                      key={tkt.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                              tkt.transportType === 'BUS'
                                ? 'bg-emerald-100 text-emerald-800'
                                : tkt.transportType === 'TRAIN'
                                ? 'bg-blue-100 text-blue-800'
                                : tkt.transportType === 'FLIGHT'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {tkt.transportType} &bull; {tkt.status}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-500">
                            PNR: <strong className="text-slate-900">{tkt.pnrNumber}</strong>
                          </span>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-base text-slate-900">
                            {tkt.operator}
                          </h4>
                          <p className="text-xs text-slate-500">{tkt.serviceNumber}</p>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl space-y-1 text-xs">
                          <div className="flex items-start gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                            <span className="font-medium text-slate-800 leading-snug">{tkt.origin}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0 mt-1" />
                            <span className="font-medium text-slate-800 leading-snug">{tkt.destination}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 bg-slate-50/50 p-2.5 rounded-xl">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Date</span>
                            <strong>{tkt.journeyDate}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Departure</span>
                            <strong>{tkt.departureTime}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Amount</span>
                            <strong className="text-emerald-800 font-black">₹{tkt.totalAmount}</strong>
                          </div>
                        </div>

                        <div className="text-xs text-slate-600">
                          <span>Travelers: </span>
                          <strong className="text-slate-900">
                            {tkt.passengers.map((p) => `${p.name} (${p.seatOrBerth})`).join(', ')}
                          </strong>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setActiveTicketModal(tkt)}
                          className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>View Official E-Ticket</span>
                        </button>

                        {tkt.status !== 'Cancelled' && (
                          <button
                            onClick={() => cancelTicketBooking(tkt.id)}
                            className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 font-bold text-xs transition-colors"
                            title="Cancel booking"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: PROVIDER & GATEWAYS STATUS */}
        {activeTab === 'gateways' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                  🛡️ Official Gateway & API Integration Status
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Transparent breakdown of underlying external ticketing providers, APIs, and commercial gateways.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <Bus className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-extrabold text-slate-900 text-sm">State & Private Buses</h4>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-emerald-900">
                    Swastik Direct & RedBus GDS
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    APSRTC, TSRTC, KSRTC, and RedBus partner schedules calculate real highway tariffs and seat layouts.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <Train className="w-5 h-5 text-blue-600" />
                    <h4 className="font-extrabold text-slate-900 text-sm">IRCTC Indian Railways</h4>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-100 text-blue-900">
                    IRCTC Partner Network
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Indian Railways national timetable algorithms and distance-based fare stages are calculated.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-2">
                    <Plane className="w-5 h-5 text-purple-600" />
                    <h4 className="font-extrabold text-slate-900 text-sm">Domestic Airlines</h4>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-100 text-purple-900">
                    Airline NDC & Amadeus Gateway
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    IndiGo, Air India, and Akasa Air routes computed with baggage and seat allowance options.
                  </p>
                </div>
              </div>

              {/* Developer & Ownership Attribution */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                  Intellectual Property & Development
                </span>
                <h4 className="font-extrabold text-lg">
                  Swastik Travels Official System
                </h4>
                <p className="text-xs text-emerald-100 leading-relaxed max-w-3xl">
                  Created and owned by <strong className="text-white">DEVANDLA HARSHA VARDHAN</strong> (Contact: 9391892404). All proprietary route exploration algorithms, database hierarchies, custom UI components, and ticketing structures are protected under applicable copyright.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* OFFICIAL SWASTIK E-TICKET MODAL */}
        {/* ==================================================== */}
        {activeTicketModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8">
              {/* Top Control Bar */}
              <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="font-bold text-sm">Official Swastik Travels E-Ticket</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-xs"
                    title="Print / Save PDF"
                  >
                    <Printer className="w-4 h-4" />
                    <span className="hidden sm:inline">Print</span>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(
                        `Swastik Travels E-Ticket: PNR ${activeTicketModal.pnrNumber} | ${activeTicketModal.origin} to ${activeTicketModal.destination} on ${activeTicketModal.journeyDate}`
                      );
                      showToast('Ticket details copied to clipboard', 'success');
                    }}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-xs"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                  <button
                    onClick={() => setActiveTicketModal(null)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Ticket Printable Body */}
              <div className="p-6 sm:p-8 space-y-6 text-slate-800">
                {/* Brand & Security Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-dashed border-slate-200 pb-5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-700 tracking-widest block">
                      Confirmed Reservation Voucher
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 font-heading">
                      SWASTIK TRAVELS
                    </h3>
                    <p className="text-xs text-slate-500">
                      TP Area, Near Central Station, Tirupati, AP &bull; Helpline: 1800-425-TOUR
                    </p>
                  </div>
                  <div className="text-left sm:text-right space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">PNR Number</span>
                    <span className="text-xl font-mono font-black text-emerald-800">
                      {activeTicketModal.pnrNumber}
                    </span>
                    <span className="text-[11px] text-slate-500 block font-mono">
                      Ref: {activeTicketModal.bookingRef}
                    </span>
                  </div>
                </div>

                {/* Operator & Transport Mode */}
                <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">Service & Operator</span>
                    <strong className="text-base text-slate-900 block font-heading">
                      {activeTicketModal.operator}
                    </strong>
                    <span className="text-emerald-900 font-medium">{activeTicketModal.serviceNumber}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">Travel Class</span>
                    <strong className="text-sm text-slate-900 block">{activeTicketModal.travelClass}</strong>
                    <span className="text-emerald-700 font-semibold">{activeTicketModal.transportType} Express</span>
                  </div>
                </div>

                {/* Journey Hierarchy: Origin & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-emerald-700 block">Boarding / Origin</span>
                    <p className="font-extrabold text-slate-900 text-sm">{activeTicketModal.origin}</p>
                    <div className="text-[11px] text-slate-600 pt-1">
                      <span>Date: <strong>{activeTicketModal.journeyDate}</strong></span> &bull;{' '}
                      <span>Departure: <strong>{activeTicketModal.departureTime}</strong></span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-rose-700 block">Dropping / Destination</span>
                    <p className="font-extrabold text-slate-900 text-sm">{activeTicketModal.destination}</p>
                    <div className="text-[11px] text-slate-600 pt-1">
                      <span>Est. Arrival: <strong>{activeTicketModal.arrivalTime}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Passenger Manifest */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Passenger Manifest ({activeTicketModal.passengers.length})
                  </span>
                  <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                    <div className="bg-slate-100/70 px-4 py-2 font-bold text-slate-700 grid grid-cols-12">
                      <span className="col-span-1">#</span>
                      <span className="col-span-5">Name</span>
                      <span className="col-span-2">Age/Sex</span>
                      <span className="col-span-4 text-right">Seat / Berth</span>
                    </div>
                    {activeTicketModal.passengers.map((p, i) => (
                      <div key={i} className="px-4 py-2.5 grid grid-cols-12 text-slate-800 font-medium">
                        <span className="col-span-1 text-slate-400">{i + 1}</span>
                        <span className="col-span-5 font-bold text-slate-900">{p.name}</span>
                        <span className="col-span-2">{p.age} / {p.gender[0]}</span>
                        <span className="col-span-4 text-right font-extrabold text-emerald-800">
                          {p.seatOrBerth}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QR Code & Total Fare Receipt */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-white p-1 rounded-xl border border-slate-300 flex items-center justify-center shadow-xs">
                      <QrCode className="w-14 h-14 text-slate-900" />
                    </div>
                    <div className="text-xs space-y-0.5">
                      <span className="font-bold text-slate-900 block">Digital Verification QR</span>
                      <p className="text-[10px] text-slate-500">Scan at boarding gate or ticket inspector device</p>
                      <p className="text-[10px] text-emerald-700 font-bold">Status: Confirmed / Paid</p>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-slate-500 block text-[11px]">Total Paid Amount</span>
                    <span className="text-2xl font-black text-emerald-800">₹{activeTicketModal.totalAmount}</span>
                    <span className="text-[10px] text-slate-400 block">Includes GST & Convenience Fees</span>
                  </div>
                </div>

                {/* Official Developer, Owner & Copyright Footer */}
                <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
                  <p className="font-bold text-slate-800">
                    © 2026 DEVANDLA HARSHA VARDHAN. All Rights Reserved.
                  </p>
                  <p className="text-[11px]">
                    Swastik Travels &bull; Owner & Developer:{' '}
                    <strong className="text-slate-900">DEVANDLA HARSHA VARDHAN</strong> &bull; Mobile:{' '}
                    <a href="tel:9391892404" className="text-emerald-700 font-bold hover:underline">
                      9391892404
                    </a>
                  </p>
                  <p className="text-[10px] text-slate-400">
                    This is an electronically generated reservation voucher for Swastik Travels.
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="bg-slate-100 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setActiveTicketModal(null);
                    handlePlanTripFromTicket();
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-600 transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-4 h-4" />
                  <span>Transfer Route to Trip Planner</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTicketModal(null);
                    setActiveTab('my-tickets');
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Close & View in My Tickets
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
