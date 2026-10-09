// Comprehensive India Administrative Geographic Hierarchy & Location System
// Covering all 36 States & Union Territories of India with normalized administrative divisions

export type SubDivisionType = 'Mandal' | 'Taluk' | 'Taluka' | 'Tehsil' | 'Block' | 'Sub-division' | 'Circle';

export interface LocationEntry {
  id: string;
  name: string;
  type: 'city' | 'town' | 'village' | 'landmark';
  pinCode?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SubDivision {
  name: string;
  type: SubDivisionType;
  locations: LocationEntry[];
}

export interface DistrictData {
  id: string;
  name: string;
  headquarters: string;
  subDivisions: SubDivision[];
}

export interface StateData {
  id: string;
  name: string;
  type: 'State' | 'Union Territory';
  subDivisionTerm: SubDivisionType;
  capital: string;
  districts: DistrictData[];
}

export interface FlatLocationResult {
  id: string;
  title: string;
  subtitle: string;
  state: string;
  district: string;
  subDivision: string;
  subDivisionType: SubDivisionType;
  locality: string;
  pinCode?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  landmark?: string;
}

export const INDIA_STATES_DATA: StateData[] = [
  // 1. Andhra Pradesh
  {
    id: 'ap',
    name: 'Andhra Pradesh',
    type: 'State',
    subDivisionTerm: 'Mandal',
    capital: 'Amaravati',
    districts: [
      {
        id: 'ap-tirupati',
        name: 'Tirupati',
        headquarters: 'Tirupati',
        subDivisions: [
          {
            name: 'Tirupati Urban',
            type: 'Mandal',
            locations: [
              { id: 'ap-tp-1', name: 'Tirupati Central', type: 'city', pinCode: '517501', coordinates: { lat: 13.6288, lng: 79.4192 } },
              { id: 'ap-tp-2', name: 'Alipiri Footpath Entry', type: 'landmark', pinCode: '517507', coordinates: { lat: 13.6521, lng: 79.4005 } },
              { id: 'ap-tp-3', name: 'Kapila Theertham', type: 'landmark', pinCode: '517501', coordinates: { lat: 13.6515, lng: 79.4194 } },
              { id: 'ap-tp-4', name: 'Tirupati Railway Station', type: 'landmark', pinCode: '517501', coordinates: { lat: 13.6283, lng: 79.4198 } },
            ],
          },
          {
            name: 'Tirumala Hills',
            type: 'Mandal',
            locations: [
              { id: 'ap-tm-1', name: 'Sri Venkateswara Temple (Tirumala)', type: 'landmark', pinCode: '517504', coordinates: { lat: 13.6833, lng: 79.3472 } },
              { id: 'ap-tm-2', name: 'Silathoranam', type: 'landmark', pinCode: '517504', coordinates: { lat: 13.6912, lng: 79.3418 } },
              { id: 'ap-tm-3', name: 'Papavinasanam', type: 'village', pinCode: '517504', coordinates: { lat: 13.7258, lng: 79.3392 } },
            ],
          },
          {
            name: 'Chandragiri',
            type: 'Mandal',
            locations: [
              { id: 'ap-cg-1', name: 'Chandragiri Fort', type: 'landmark', pinCode: '517101', coordinates: { lat: 13.5828, lng: 79.3175 } },
              { id: 'ap-cg-2', name: 'Chandragiri Town', type: 'town', pinCode: '517101', coordinates: { lat: 13.5855, lng: 79.3195 } },
              { id: 'ap-cg-3', name: 'Srinivasa Mangapuram', type: 'village', pinCode: '517102', coordinates: { lat: 13.6012, lng: 79.3391 } },
            ],
          },
          {
            name: 'Tiruchanur (Tirupati Rural)',
            type: 'Mandal',
            locations: [
              { id: 'ap-tr-1', name: 'Sri Padmavathi Ammavari Temple', type: 'landmark', pinCode: '517503', coordinates: { lat: 13.6125, lng: 79.4478 } },
              { id: 'ap-tr-2', name: 'Tiruchanur Village', type: 'village', pinCode: '517503', coordinates: { lat: 13.6111, lng: 79.4455 } },
            ],
          },
          {
            name: 'Yerravaripalem',
            type: 'Mandal',
            locations: [
              { id: 'ap-yv-1', name: 'Talakona Waterfalls Eco-Park', type: 'landmark', pinCode: '517194', coordinates: { lat: 13.8058, lng: 79.2158 } },
              { id: 'ap-yv-2', name: 'Nerabailu Village', type: 'village', pinCode: '517194', coordinates: { lat: 13.8015, lng: 79.2234 } },
            ],
          },
          {
            name: 'Srikalahasti',
            type: 'Mandal',
            locations: [
              { id: 'ap-sk-1', name: 'Srikalahasteeswara Temple (Vayu Lingam)', type: 'landmark', pinCode: '517644', coordinates: { lat: 13.7504, lng: 79.6978 } },
              { id: 'ap-sk-2', name: 'Srikalahasti Town', type: 'town', pinCode: '517644', coordinates: { lat: 13.7495, lng: 79.7022 } },
            ],
          },
        ],
      },
      {
        id: 'ap-visakhapatnam',
        name: 'Visakhapatnam',
        headquarters: 'Visakhapatnam',
        subDivisions: [
          {
            name: 'Visakhapatnam Urban',
            type: 'Mandal',
            locations: [
              { id: 'ap-vz-1', name: 'RK Beach & Submarine Museum', type: 'landmark', pinCode: '530002', coordinates: { lat: 17.7125, lng: 83.3325 } },
              { id: 'ap-vz-2', name: 'Kailasagiri Hilltop', type: 'landmark', pinCode: '530043', coordinates: { lat: 17.7495, lng: 83.3421 } },
              { id: 'ap-vz-3', name: 'Dwaraka Nagar (City Hub)', type: 'city', pinCode: '530016', coordinates: { lat: 17.7289, lng: 83.3134 } },
            ],
          },
          {
            name: 'Bheemunipatnam',
            type: 'Mandal',
            locations: [
              { id: 'ap-bm-1', name: 'Rushikonda Beach & Water Sports', type: 'landmark', pinCode: '530045', coordinates: { lat: 17.7825, lng: 83.3855 } },
              { id: 'ap-bm-2', name: 'Bheemili Dutch Fort & Beach', type: 'town', pinCode: '531163', coordinates: { lat: 17.8912, lng: 83.4542 } },
            ],
          },
        ],
      },
      {
        id: 'ap-alluri-sitharama-raju',
        name: 'Alluri Sitharama Raju (Araku)',
        headquarters: 'Paderu',
        subDivisions: [
          {
            name: 'Araku Valley',
            type: 'Mandal',
            locations: [
              { id: 'ap-ar-1', name: 'Araku Valley Coffee Gardens', type: 'landmark', pinCode: '531149', coordinates: { lat: 18.3273, lng: 82.8775 } },
              { id: 'ap-ar-2', name: 'Katiki Waterfalls', type: 'landmark', pinCode: '531149', coordinates: { lat: 18.2875, lng: 83.0041 } },
              { id: 'ap-ar-3', name: 'Borra Caves (Million Year Speleothems)', type: 'landmark', pinCode: '531149', coordinates: { lat: 18.2811, lng: 83.0402 } },
              { id: 'ap-ar-4', name: 'Chaparai Water Cascades', type: 'village', pinCode: '531149', coordinates: { lat: 18.3182, lng: 82.8423 } },
            ],
          },
        ],
      },
      {
        id: 'ap-krishna',
        name: 'Krishna (Vijayawada)',
        headquarters: 'Machilipatnam',
        subDivisions: [
          {
            name: 'Vijayawada Urban',
            type: 'Mandal',
            locations: [
              { id: 'ap-vj-1', name: 'Kanaka Durga Temple (Indrakeeladri)', type: 'landmark', pinCode: '520001', coordinates: { lat: 16.5167, lng: 80.6125 } },
              { id: 'ap-vj-2', name: 'Prakasam Barrage', type: 'landmark', pinCode: '520001', coordinates: { lat: 16.5058, lng: 80.6062 } },
              { id: 'ap-vj-3', name: 'Bhavani Island', type: 'landmark', pinCode: '520012', coordinates: { lat: 16.5241, lng: 80.5894 } },
            ],
          },
        ],
      },
      {
        id: 'ap-kurnool',
        name: 'Nandyal / Kurnool (Srisailam)',
        headquarters: 'Nandyal',
        subDivisions: [
          {
            name: 'Srisailam',
            type: 'Mandal',
            locations: [
              { id: 'ap-sr-1', name: 'Mallikarjuna Swamy Jyotirlinga Temple', type: 'landmark', pinCode: '518101', coordinates: { lat: 16.0744, lng: 78.8686 } },
              { id: 'ap-sr-2', name: 'Srisailam Dam Viewpoint', type: 'landmark', pinCode: '518101', coordinates: { lat: 16.0883, lng: 78.8974 } },
              { id: 'ap-sr-3', name: 'Pathala Ganga Ropeway', type: 'landmark', pinCode: '518101', coordinates: { lat: 16.0772, lng: 78.8711 } },
            ],
          },
          {
            name: 'Banaganapalle',
            type: 'Mandal',
            locations: [
              { id: 'ap-bg-1', name: 'Belum Caves (Second Largest in India)', type: 'landmark', pinCode: '518124', coordinates: { lat: 15.1022, lng: 78.1118 } },
            ],
          },
        ],
      },
      {
        id: 'ap-sri-sathya-sai',
        name: 'Sri Sathya Sai (Lepakshi)',
        headquarters: 'Puttaparthi',
        subDivisions: [
          {
            name: 'Lepakshi',
            type: 'Mandal',
            locations: [
              { id: 'ap-lp-1', name: 'Veerabhadra Temple & Hanging Pillar', type: 'landmark', pinCode: '515331', coordinates: { lat: 13.8041, lng: 77.6083 } },
              { id: 'ap-lp-2', name: 'Monolithic Nandi Bull', type: 'landmark', pinCode: '515331', coordinates: { lat: 13.8062, lng: 77.6095 } },
            ],
          },
          {
            name: 'Puttaparthi',
            type: 'Mandal',
            locations: [
              { id: 'ap-pp-1', name: 'Prasanthi Nilayam Ashram', type: 'landmark', pinCode: '515134', coordinates: { lat: 14.1652, lng: 77.8114 } },
            ],
          },
        ],
      },
    ],
  },

  // 2. Telangana
  {
    id: 'tg',
    name: 'Telangana',
    type: 'State',
    subDivisionTerm: 'Mandal',
    capital: 'Hyderabad',
    districts: [
      {
        id: 'tg-hyderabad',
        name: 'Hyderabad',
        headquarters: 'Hyderabad',
        subDivisions: [
          {
            name: 'Charminar',
            type: 'Mandal',
            locations: [
              { id: 'tg-cm-1', name: 'Charminar & Laad Bazaar', type: 'landmark', pinCode: '500002', coordinates: { lat: 17.3616, lng: 78.4747 } },
              { id: 'tg-cm-2', name: 'Mecca Masjid', type: 'landmark', pinCode: '500002', coordinates: { lat: 17.3604, lng: 78.4735 } },
              { id: 'tg-cm-3', name: 'Chowmahalla Palace', type: 'landmark', pinCode: '500002', coordinates: { lat: 17.3578, lng: 78.4717 } },
            ],
          },
          {
            name: 'Golconda',
            type: 'Mandal',
            locations: [
              { id: 'tg-gc-1', name: 'Golconda Fort (Acoustic Wonder)', type: 'landmark', pinCode: '500008', coordinates: { lat: 17.3833, lng: 78.4011 } },
              { id: 'tg-gc-2', name: 'Qutb Shahi Tombs Heritage Park', type: 'landmark', pinCode: '500008', coordinates: { lat: 17.3941, lng: 78.3962 } },
            ],
          },
          {
            name: 'Khairatabad',
            type: 'Mandal',
            locations: [
              { id: 'tg-kb-1', name: 'Hussain Sagar Lake & Buddha Statue', type: 'landmark', pinCode: '500004', coordinates: { lat: 17.4239, lng: 78.4738 } },
              { id: 'tg-kb-2', name: 'Birla Mandir (Naubat Pahad)', type: 'landmark', pinCode: '500063', coordinates: { lat: 17.4062, lng: 78.4691 } },
              { id: 'tg-kb-3', name: 'Lumbini Park & Laser Show', type: 'landmark', pinCode: '500004', coordinates: { lat: 17.4095, lng: 78.4725 } },
            ],
          },
          {
            name: 'Serilingampally',
            type: 'Mandal',
            locations: [
              { id: 'tg-sl-1', name: 'HITEC City & Cyber Towers', type: 'city', pinCode: '500081', coordinates: { lat: 17.4504, lng: 78.3808 } },
              { id: 'tg-sl-2', name: 'Durgam Cheruvu Cable-Stayed Bridge', type: 'landmark', pinCode: '500081', coordinates: { lat: 17.4344, lng: 78.3891 } },
            ],
          },
          {
            name: 'Bahadurpura',
            type: 'Mandal',
            locations: [
              { id: 'tg-bp-1', name: 'Nehru Zoological Park', type: 'landmark', pinCode: '500064', coordinates: { lat: 17.3512, lng: 78.4514 } },
            ],
          },
        ],
      },
      {
        id: 'tg-warangal',
        name: 'Warangal / Hanumakonda',
        headquarters: 'Warangal',
        subDivisions: [
          {
            name: 'Hanumakonda',
            type: 'Mandal',
            locations: [
              { id: 'tg-wg-1', name: 'Thousand Pillar Temple (Kakatiya)', type: 'landmark', pinCode: '506001', coordinates: { lat: 18.0041, lng: 79.5744 } },
              { id: 'tg-wg-2', name: 'Warangal Fort & Kakatiya Torana', type: 'landmark', pinCode: '506002', coordinates: { lat: 17.9575, lng: 79.6178 } },
              { id: 'tg-wg-3', name: 'Bhadrakali Lake & Temple', type: 'landmark', pinCode: '506001', coordinates: { lat: 17.9942, lng: 79.5815 } },
            ],
          },
          {
            name: 'Mulugu',
            type: 'Mandal',
            locations: [
              { id: 'tg-ml-1', name: 'Ramappa Temple (UNESCO World Heritage)', type: 'landmark', pinCode: '506345', coordinates: { lat: 18.2612, lng: 79.9431 } },
              { id: 'tg-ml-2', name: 'Bogatha Waterfalls (Telangana Niagara)', type: 'landmark', pinCode: '507136', coordinates: { lat: 18.2815, lng: 80.4358 } },
            ],
          },
        ],
      },
      {
        id: 'tg-yadadri',
        name: 'Yadadri Bhuvanagiri',
        headquarters: 'Bhuvanagiri',
        subDivisions: [
          {
            name: 'Yadagirigutta',
            type: 'Mandal',
            locations: [
              { id: 'tg-yd-1', name: 'Sri Lakshmi Narasimha Swamy Temple', type: 'landmark', pinCode: '508115', coordinates: { lat: 17.5855, lng: 78.9392 } },
              { id: 'tg-yd-2', name: 'Bhongir Fort & Monolithic Rock', type: 'landmark', pinCode: '508116', coordinates: { lat: 17.5115, lng: 78.8912 } },
            ],
          },
        ],
      },
    ],
  },

  // 3. Karnataka
  {
    id: 'ka',
    name: 'Karnataka',
    type: 'State',
    subDivisionTerm: 'Taluk',
    capital: 'Bengaluru',
    districts: [
      {
        id: 'ka-bengaluru-urban',
        name: 'Bengaluru Urban',
        headquarters: 'Bengaluru',
        subDivisions: [
          {
            name: 'Bengaluru North',
            type: 'Taluk',
            locations: [
              { id: 'ka-bn-1', name: 'Bangalore Palace & Grounds', type: 'landmark', pinCode: '560052', coordinates: { lat: 12.9988, lng: 77.5921 } },
              { id: 'ka-bn-2', name: 'Cubbon Park & Vidhana Soudha', type: 'landmark', pinCode: '560001', coordinates: { lat: 12.9797, lng: 77.5907 } },
              { id: 'ka-bn-3', name: 'Kempegowda Int. Airport (Devanahalli)', type: 'landmark', pinCode: '560300', coordinates: { lat: 13.1986, lng: 77.7066 } },
            ],
          },
          {
            name: 'Bengaluru South',
            type: 'Taluk',
            locations: [
              { id: 'ka-bs-1', name: 'Lalbagh Botanical Garden & Glass House', type: 'landmark', pinCode: '560004', coordinates: { lat: 12.9507, lng: 77.5848 } },
              { id: 'ka-bs-2', name: 'Bannerghatta National Park & Zoo Safari', type: 'landmark', pinCode: '560083', coordinates: { lat: 12.8009, lng: 77.5777 } },
            ],
          },
        ],
      },
      {
        id: 'ka-mysuru',
        name: 'Mysuru',
        headquarters: 'Mysuru',
        subDivisions: [
          {
            name: 'Mysuru',
            type: 'Taluk',
            locations: [
              { id: 'ka-my-1', name: 'Mysore Palace (Amba Vilas)', type: 'landmark', pinCode: '570001', coordinates: { lat: 12.3051, lng: 76.6551 } },
              { id: 'ka-my-2', name: 'Chamundi Hills & Nandi Bull', type: 'landmark', pinCode: '570010', coordinates: { lat: 12.2753, lng: 76.6711 } },
              { id: 'ka-my-3', name: 'Mysuru Sri Chamarajendra Zoo', type: 'landmark', pinCode: '570010', coordinates: { lat: 12.3021, lng: 76.6664 } },
              { id: 'ka-my-4', name: 'Brindavan Gardens & Musical Fountain', type: 'landmark', pinCode: '571607', coordinates: { lat: 12.4244, lng: 76.5728 } },
            ],
          },
        ],
      },
      {
        id: 'ka-kodagu',
        name: 'Kodagu (Coorg)',
        headquarters: 'Madikeri',
        subDivisions: [
          {
            name: 'Madikeri',
            type: 'Taluk',
            locations: [
              { id: 'ka-md-1', name: 'Abbey Falls & Coffee Estate', type: 'landmark', pinCode: '571201', coordinates: { lat: 12.4539, lng: 75.7188 } },
              { id: 'ka-md-2', name: 'Raja Seat Sunset Viewpoint', type: 'landmark', pinCode: '571201', coordinates: { lat: 12.4211, lng: 75.7364 } },
              { id: 'ka-md-3', name: 'Talakaveri (Source of River Kaveri)', type: 'landmark', pinCode: '571247', coordinates: { lat: 12.3842, lng: 75.4947 } },
            ],
          },
          {
            name: 'Somwarpet',
            type: 'Taluk',
            locations: [
              { id: 'ka-sw-1', name: 'Namdroling Golden Temple (Bylakuppe)', type: 'landmark', pinCode: '571104', coordinates: { lat: 12.4294, lng: 75.9681 } },
              { id: 'ka-sw-2', name: 'Dubare Elephant Camp', type: 'landmark', pinCode: '571234', coordinates: { lat: 12.3683, lng: 75.9056 } },
            ],
          },
        ],
      },
      {
        id: 'ka-vijayanagara',
        name: 'Vijayanagara (Hampi)',
        headquarters: 'Hosapete',
        subDivisions: [
          {
            name: 'Hospet (Hampi)',
            type: 'Taluk',
            locations: [
              { id: 'ka-hm-1', name: 'Virupaksha Temple (UNESCO Hampi)', type: 'landmark', pinCode: '583239', coordinates: { lat: 15.3350, lng: 76.4600 } },
              { id: 'ka-hm-2', name: 'Stone Chariot & Vijaya Vittala Temple', type: 'landmark', pinCode: '583239', coordinates: { lat: 15.3389, lng: 76.4789 } },
              { id: 'ka-hm-3', name: 'Matanga Hill Sunrise Point', type: 'landmark', pinCode: '583239', coordinates: { lat: 15.3328, lng: 76.4682 } },
            ],
          },
        ],
      },
      {
        id: 'ka-shivamogga',
        name: 'Shivamogga (Jog Falls)',
        headquarters: 'Shivamogga',
        subDivisions: [
          {
            name: 'Sagara',
            type: 'Taluk',
            locations: [
              { id: 'ka-jg-1', name: 'Jog Falls (Gersoppa 830ft Plunge)', type: 'landmark', pinCode: '577435', coordinates: { lat: 14.2283, lng: 74.8122 } },
            ],
          },
        ],
      },
    ],
  },

  // 4. Tamil Nadu
  {
    id: 'tn',
    name: 'Tamil Nadu',
    type: 'State',
    subDivisionTerm: 'Taluk',
    capital: 'Chennai',
    districts: [
      {
        id: 'tn-chennai',
        name: 'Chennai',
        headquarters: 'Chennai',
        subDivisions: [
          {
            name: 'Mylapore',
            type: 'Taluk',
            locations: [
              { id: 'tn-ch-1', name: 'Kapaleeshwarar Temple (Mylapore)', type: 'landmark', pinCode: '600004', coordinates: { lat: 13.0336, lng: 80.2694 } },
              { id: 'tn-ch-2', name: 'Marina Beach Promenade', type: 'landmark', pinCode: '600005', coordinates: { lat: 13.0500, lng: 80.2824 } },
              { id: 'tn-ch-3', name: 'Santhome Cathedral Basilica', type: 'landmark', pinCode: '600004', coordinates: { lat: 13.0331, lng: 80.2783 } },
            ],
          },
          {
            name: 'Egmore',
            type: 'Taluk',
            locations: [
              { id: 'tn-ch-4', name: 'Chennai Central Railway Station', type: 'landmark', pinCode: '600003', coordinates: { lat: 13.0827, lng: 80.2755 } },
              { id: 'tn-ch-5', name: 'Government Museum & Art Gallery', type: 'landmark', pinCode: '600008', coordinates: { lat: 13.0701, lng: 80.2562 } },
            ],
          },
          {
            name: 'Vandalur',
            type: 'Taluk',
            locations: [
              { id: 'tn-ch-6', name: 'Arignar Anna Zoological Park (Vandalur Zoo)', type: 'landmark', pinCode: '600048', coordinates: { lat: 12.8797, lng: 80.0817 } },
            ],
          },
        ],
      },
      {
        id: 'tn-chengalpattu',
        name: 'Chengalpattu (Mahabalipuram)',
        headquarters: 'Chengalpattu',
        subDivisions: [
          {
            name: 'Thirukalukundram',
            type: 'Taluk',
            locations: [
              { id: 'tn-mb-1', name: 'Shore Temple (UNESCO Heritage)', type: 'landmark', pinCode: '603104', coordinates: { lat: 12.6167, lng: 80.1983 } },
              { id: 'tn-mb-2', name: 'Pancha Rathas & Arjunas Penance', type: 'landmark', pinCode: '603104', coordinates: { lat: 12.6189, lng: 80.1925 } },
            ],
          },
        ],
      },
      {
        id: 'tn-madurai',
        name: 'Madurai',
        headquarters: 'Madurai',
        subDivisions: [
          {
            name: 'Madurai South',
            type: 'Taluk',
            locations: [
              { id: 'tn-md-1', name: 'Meenakshi Amman Temple', type: 'landmark', pinCode: '625001', coordinates: { lat: 9.9195, lng: 78.1193 } },
              { id: 'tn-md-2', name: 'Thirumalai Nayakkar Mahal', type: 'landmark', pinCode: '625001', coordinates: { lat: 9.9153, lng: 78.1239 } },
            ],
          },
        ],
      },
      {
        id: 'tn-nilgiris',
        name: 'The Nilgiris (Ooty)',
        headquarters: 'Udhagamandalam',
        subDivisions: [
          {
            name: 'Udhagamandalam (Ooty)',
            type: 'Taluk',
            locations: [
              { id: 'tn-ot-1', name: 'Ooty Botanical Gardens', type: 'landmark', pinCode: '643001', coordinates: { lat: 11.4178, lng: 76.7111 } },
              { id: 'tn-ot-2', name: 'Ooty Boat House & Lake', type: 'landmark', pinCode: '643001', coordinates: { lat: 11.4089, lng: 76.6897 } },
              { id: 'tn-ot-3', name: 'Doddabetta Peak (Highest Nilgiri Peak)', type: 'landmark', pinCode: '643002', coordinates: { lat: 11.4011, lng: 76.7364 } },
              { id: 'tn-ot-4', name: 'Pykara Waterfalls & Lake', type: 'landmark', pinCode: '643237', coordinates: { lat: 11.4644, lng: 76.6022 } },
            ],
          },
        ],
      },
      {
        id: 'tn-kanyakumari',
        name: 'Kanyakumari',
        headquarters: 'Nagercoil',
        subDivisions: [
          {
            name: 'Agastheeswaram',
            type: 'Taluk',
            locations: [
              { id: 'tn-kk-1', name: 'Vivekananda Rock Memorial', type: 'landmark', pinCode: '629702', coordinates: { lat: 8.0781, lng: 77.5550 } },
              { id: 'tn-kk-2', name: 'Thiruvalluvar Statue (133 ft)', type: 'landmark', pinCode: '629702', coordinates: { lat: 8.0772, lng: 77.5539 } },
              { id: 'tn-kk-3', name: 'Triveni Sangam (Three Seas Confluence)', type: 'landmark', pinCode: '629702', coordinates: { lat: 8.0811, lng: 77.5511 } },
            ],
          },
        ],
      },
    ],
  },

  // 5. Kerala
  {
    id: 'kl',
    name: 'Kerala',
    type: 'State',
    subDivisionTerm: 'Taluk',
    capital: 'Thiruvananthapuram',
    districts: [
      {
        id: 'kl-idukki',
        name: 'Idukki (Munnar)',
        headquarters: 'Painavu',
        subDivisions: [
          {
            name: 'Devikulam (Munnar)',
            type: 'Taluk',
            locations: [
              { id: 'kl-mn-1', name: 'Eravikulam National Park (Nilgiri Tahr)', type: 'landmark', pinCode: '685612', coordinates: { lat: 10.2033, lng: 77.0858 } },
              { id: 'kl-mn-2', name: 'Mattupetty Dam & Eco Point', type: 'landmark', pinCode: '685616', coordinates: { lat: 10.1064, lng: 77.1239 } },
              { id: 'kl-mn-3', name: 'Attukal Waterfalls', type: 'landmark', pinCode: '685612', coordinates: { lat: 10.0522, lng: 77.0456 } },
              { id: 'kl-mn-4', name: 'Tea Gardens & Kolukkumalai Sunrise', type: 'landmark', pinCode: '685612', coordinates: { lat: 10.0825, lng: 77.2289 } },
            ],
          },
        ],
      },
      {
        id: 'kl-alappuzha',
        name: 'Alappuzha (Alleppey)',
        headquarters: 'Alappuzha',
        subDivisions: [
          {
            name: 'Ambalappuzha',
            type: 'Taluk',
            locations: [
              { id: 'kl-al-1', name: 'Alleppey Backwaters & Houseboats Hub', type: 'landmark', pinCode: '688013', coordinates: { lat: 9.4981, lng: 76.3388 } },
              { id: 'kl-al-2', name: 'Vembanad Lake (Punnamada Lake)', type: 'landmark', pinCode: '688006', coordinates: { lat: 9.6133, lng: 76.4172 } },
              { id: 'kl-al-3', name: 'Alappuzha Beach & Pier', type: 'landmark', pinCode: '688012', coordinates: { lat: 9.4939, lng: 76.3197 } },
            ],
          },
        ],
      },
      {
        id: 'kl-wayanad',
        name: 'Wayanad',
        headquarters: 'Kalpetta',
        subDivisions: [
          {
            name: 'Vythiri',
            type: 'Taluk',
            locations: [
              { id: 'kl-wy-1', name: 'Banasura Sagar Dam (Earthen Dam)', type: 'landmark', pinCode: '673575', coordinates: { lat: 11.6706, lng: 75.9575 } },
              { id: 'kl-wy-2', name: 'Meenmutty Waterfalls (300m)', type: 'landmark', pinCode: '673577', coordinates: { lat: 11.5292, lng: 76.2411 } },
              { id: 'kl-wy-3', name: 'Edakkal Caves & Petroglyphs', type: 'landmark', pinCode: '673595', coordinates: { lat: 11.6289, lng: 76.2344 } },
            ],
          },
        ],
      },
    ],
  },

  // 6. Maharashtra
  {
    id: 'mh',
    name: 'Maharashtra',
    type: 'State',
    subDivisionTerm: 'Taluka',
    capital: 'Mumbai',
    districts: [
      {
        id: 'mh-mumbai-city',
        name: 'Mumbai City',
        headquarters: 'Mumbai',
        subDivisions: [
          {
            name: 'Colaba',
            type: 'Taluka',
            locations: [
              { id: 'mh-mb-1', name: 'Gateway of India & Taj Mahal Palace', type: 'landmark', pinCode: '400001', coordinates: { lat: 18.9220, lng: 72.8347 } },
              { id: 'mh-mb-2', name: 'Marine Drive & Queens Necklace', type: 'landmark', pinCode: '400020', coordinates: { lat: 18.9432, lng: 72.8231 } },
              { id: 'mh-mb-3', name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)', type: 'landmark', pinCode: '400001', coordinates: { lat: 18.9400, lng: 72.8353 } },
            ],
          },
        ],
      },
      {
        id: 'mh-aurangabad',
        name: 'Chhatrapati Sambhajinagar (Aurangabad)',
        headquarters: 'Aurangabad',
        subDivisions: [
          {
            name: 'Khuldabad (Ellora)',
            type: 'Taluka',
            locations: [
              { id: 'mh-el-1', name: 'Ellora Caves & Kailasa Temple (Cave 16)', type: 'landmark', pinCode: '431102', coordinates: { lat: 20.0258, lng: 75.1780 } },
              { id: 'mh-el-2', name: 'Grishneshwar Jyotirlinga Temple', type: 'landmark', pinCode: '431102', coordinates: { lat: 20.0242, lng: 75.1722 } },
            ],
          },
          {
            name: 'Sillod (Ajanta)',
            type: 'Taluka',
            locations: [
              { id: 'mh-aj-1', name: 'Ajanta Caves (UNESCO Buddhist Murals)', type: 'landmark', pinCode: '431117', coordinates: { lat: 20.5519, lng: 75.7033 } },
            ],
          },
        ],
      },
    ],
  },

  // 7. Goa
  {
    id: 'ga',
    name: 'Goa',
    type: 'State',
    subDivisionTerm: 'Taluka',
    capital: 'Panaji',
    districts: [
      {
        id: 'ga-north-goa',
        name: 'North Goa',
        headquarters: 'Panaji',
        subDivisions: [
          {
            name: 'Tiswadi',
            type: 'Taluka',
            locations: [
              { id: 'ga-ng-1', name: 'Basilica of Bom Jesus (Old Goa)', type: 'landmark', pinCode: '403402', coordinates: { lat: 15.5008, lng: 73.9117 } },
              { id: 'ga-ng-2', name: 'Fontainhas Latin Quarter (Panaji)', type: 'landmark', pinCode: '403001', coordinates: { lat: 15.4989, lng: 73.8278 } },
            ],
          },
          {
            name: 'Bardez',
            type: 'Taluka',
            locations: [
              { id: 'ga-ng-3', name: 'Calangute & Baga Beach', type: 'landmark', pinCode: '403516', coordinates: { lat: 15.5444, lng: 73.7553 } },
              { id: 'ga-ng-4', name: 'Fort Aguada & Lighthouse', type: 'landmark', pinCode: '403515', coordinates: { lat: 15.4925, lng: 73.7733 } },
            ],
          },
        ],
      },
      {
        id: 'ga-south-goa',
        name: 'South Goa',
        headquarters: 'Margao',
        subDivisions: [
          {
            name: 'Dharbandora',
            type: 'Taluka',
            locations: [
              { id: 'ga-sg-1', name: 'Dudhsagar Waterfalls (Sea of Milk 310m)', type: 'landmark', pinCode: '403410', coordinates: { lat: 15.3144, lng: 74.3144 } },
              { id: 'ga-sg-2', name: 'Palolem Beach & Butterfly Island', type: 'landmark', pinCode: '403702', coordinates: { lat: 15.0100, lng: 74.0231 } },
            ],
          },
        ],
      },
    ],
  },

  // 8. Rajasthan
  {
    id: 'rj',
    name: 'Rajasthan',
    type: 'State',
    subDivisionTerm: 'Tehsil',
    capital: 'Jaipur',
    districts: [
      {
        id: 'rj-jaipur',
        name: 'Jaipur',
        headquarters: 'Jaipur',
        subDivisions: [
          {
            name: 'Jaipur Heritage',
            type: 'Tehsil',
            locations: [
              { id: 'rj-jp-1', name: 'Hawa Mahal (Palace of Winds)', type: 'landmark', pinCode: '302002', coordinates: { lat: 26.9239, lng: 75.8267 } },
              { id: 'rj-jp-2', name: 'Amber Fort & Maota Lake', type: 'landmark', pinCode: '302028', coordinates: { lat: 26.9855, lng: 75.8513 } },
              { id: 'rj-jp-3', name: 'City Palace & Jantar Mantar', type: 'landmark', pinCode: '302002', coordinates: { lat: 26.9258, lng: 75.8236 } },
              { id: 'rj-jp-4', name: 'Nahargarh Fort Sunset Viewpoint', type: 'landmark', pinCode: '302001', coordinates: { lat: 26.9372, lng: 75.8156 } },
            ],
          },
        ],
      },
      {
        id: 'rj-udaipur',
        name: 'Udaipur (City of Lakes)',
        headquarters: 'Udaipur',
        subDivisions: [
          {
            name: 'Girwa (Udaipur)',
            type: 'Tehsil',
            locations: [
              { id: 'rj-ud-1', name: 'Lake Pichola & Jag Mandir', type: 'landmark', pinCode: '313001', coordinates: { lat: 24.5764, lng: 73.6800 } },
              { id: 'rj-ud-2', name: 'Udaipur City Palace Complex', type: 'landmark', pinCode: '313001', coordinates: { lat: 24.5761, lng: 73.6836 } },
            ],
          },
        ],
      },
    ],
  },

  // 9. Uttar Pradesh
  {
    id: 'up',
    name: 'Uttar Pradesh',
    type: 'State',
    subDivisionTerm: 'Tehsil',
    capital: 'Lucknow',
    districts: [
      {
        id: 'up-agra',
        name: 'Agra',
        headquarters: 'Agra',
        subDivisions: [
          {
            name: 'Agra',
            type: 'Tehsil',
            locations: [
              { id: 'up-ag-1', name: 'Taj Mahal (UNESCO Wonder of the World)', type: 'landmark', pinCode: '282001', coordinates: { lat: 27.1751, lng: 78.0421 } },
              { id: 'up-ag-2', name: 'Agra Red Fort', type: 'landmark', pinCode: '282003', coordinates: { lat: 27.1795, lng: 78.0211 } },
              { id: 'up-ag-3', name: 'Fatehpur Sikri & Buland Darwaza', type: 'landmark', pinCode: '283110', coordinates: { lat: 27.0944, lng: 77.6672 } },
            ],
          },
        ],
      },
      {
        id: 'up-varanasi',
        name: 'Varanasi (Kashi)',
        headquarters: 'Varanasi',
        subDivisions: [
          {
            name: 'Varanasi',
            type: 'Tehsil',
            locations: [
              { id: 'up-vn-1', name: 'Kashi Vishwanath Jyotirlinga Temple & Corridor', type: 'landmark', pinCode: '221001', coordinates: { lat: 25.3109, lng: 83.0107 } },
              { id: 'up-vn-2', name: 'Dashashwamedh Ghat & Evening Ganga Aarti', type: 'landmark', pinCode: '221001', coordinates: { lat: 25.3075, lng: 83.0102 } },
              { id: 'up-vn-3', name: 'Assi Ghat & Subah-e-Banaras', type: 'landmark', pinCode: '221005', coordinates: { lat: 25.2897, lng: 83.0069 } },
              { id: 'up-vn-4', name: 'Sarnath Deer Park (Buddha First Sermon)', type: 'landmark', pinCode: '221007', coordinates: { lat: 25.3811, lng: 83.0214 } },
            ],
          },
        ],
      },
      {
        id: 'up-ayodhya',
        name: 'Ayodhya',
        headquarters: 'Ayodhya',
        subDivisions: [
          {
            name: 'Ayodhya',
            type: 'Tehsil',
            locations: [
              { id: 'up-ay-1', name: 'Shri Ram Janmabhoomi Mandir', type: 'landmark', pinCode: '224123', coordinates: { lat: 26.7956, lng: 82.1944 } },
              { id: 'up-ay-2', name: 'Hanuman Garhi Temple', type: 'landmark', pinCode: '224123', coordinates: { lat: 26.7972, lng: 82.2014 } },
              { id: 'up-ay-3', name: 'Saryu River Ghats & Aarti', type: 'landmark', pinCode: '224123', coordinates: { lat: 26.8011, lng: 82.2033 } },
            ],
          },
        ],
      },
    ],
  },

  // 10. Delhi (NCT)
  {
    id: 'dl',
    name: 'Delhi (NCT)',
    type: 'Union Territory',
    subDivisionTerm: 'Sub-division',
    capital: 'New Delhi',
    districts: [
      {
        id: 'dl-new-delhi',
        name: 'New Delhi',
        headquarters: 'Connaught Place',
        subDivisions: [
          {
            name: 'Chanakyapuri',
            type: 'Sub-division',
            locations: [
              { id: 'dl-nd-1', name: 'India Gate & Kartavya Path', type: 'landmark', pinCode: '110001', coordinates: { lat: 28.6129, lng: 77.2295 } },
              { id: 'dl-nd-2', name: 'Rashtrapati Bhavan', type: 'landmark', pinCode: '110004', coordinates: { lat: 28.6143, lng: 77.1994 } },
              { id: 'dl-nd-3', name: 'National Zoological Park (Delhi Zoo)', type: 'landmark', pinCode: '110003', coordinates: { lat: 28.6044, lng: 77.2458 } },
            ],
          },
          {
            name: 'Central Delhi',
            type: 'Sub-division',
            locations: [
              { id: 'dl-cd-1', name: 'Red Fort (Lal Qila)', type: 'landmark', pinCode: '110006', coordinates: { lat: 28.6562, lng: 77.2410 } },
              { id: 'dl-cd-2', name: 'Qutub Minar (UNESCO 73m Minaret)', type: 'landmark', pinCode: '110030', coordinates: { lat: 28.5244, lng: 77.1855 } },
              { id: 'dl-cd-3', name: 'Lotus Temple & Akshardham Mandir', type: 'landmark', pinCode: '110092', coordinates: { lat: 28.6127, lng: 77.2773 } },
            ],
          },
        ],
      },
    ],
  },

  // 11. Jammu & Kashmir
  {
    id: 'jk',
    name: 'Jammu and Kashmir',
    type: 'Union Territory',
    subDivisionTerm: 'Tehsil',
    capital: 'Srinagar / Jammu',
    districts: [
      {
        id: 'jk-srinagar',
        name: 'Srinagar',
        headquarters: 'Srinagar',
        subDivisions: [
          {
            name: 'Srinagar North',
            type: 'Tehsil',
            locations: [
              { id: 'jk-sr-1', name: 'Dal Lake & Shikara Floating Market', type: 'landmark', pinCode: '190001', coordinates: { lat: 34.0911, lng: 74.8722 } },
              { id: 'jk-sr-2', name: 'Mughal Gardens (Shalimar & Nishat)', type: 'landmark', pinCode: '190021', coordinates: { lat: 34.1489, lng: 74.8789 } },
              { id: 'jk-sr-3', name: 'Gulmarg Gondola & Apharwat Peak', type: 'landmark', pinCode: '193403', coordinates: { lat: 34.0484, lng: 74.3805 } },
            ],
          },
        ],
      },
    ],
  },

  // 12. Himachal Pradesh
  {
    id: 'hp',
    name: 'Himachal Pradesh',
    type: 'State',
    subDivisionTerm: 'Tehsil',
    capital: 'Shimla',
    districts: [
      {
        id: 'hp-kullu',
        name: 'Kullu (Manali)',
        headquarters: 'Kullu',
        subDivisions: [
          {
            name: 'Manali',
            type: 'Tehsil',
            locations: [
              { id: 'hp-mn-1', name: 'Solang Valley (Snow Sports)', type: 'landmark', pinCode: '175131', coordinates: { lat: 32.3167, lng: 77.1583 } },
              { id: 'hp-mn-2', name: 'Atal Tunnel & Sissu (Lahaul)', type: 'landmark', pinCode: '175140', coordinates: { lat: 32.3653, lng: 77.1650 } },
              { id: 'hp-mn-3', name: 'Jogini Waterfalls & Vashisht Hot Springs', type: 'landmark', pinCode: '175131', coordinates: { lat: 32.2689, lng: 77.1956 } },
            ],
          },
        ],
      },
    ],
  },

  // 13. Uttarakhand
  {
    id: 'uk',
    name: 'Uttarakhand',
    type: 'State',
    subDivisionTerm: 'Tehsil',
    capital: 'Dehradun',
    districts: [
      {
        id: 'uk-dehradun',
        name: 'Dehradun (Rishikesh)',
        headquarters: 'Dehradun',
        subDivisions: [
          {
            name: 'Rishikesh',
            type: 'Tehsil',
            locations: [
              { id: 'uk-rk-1', name: 'Laxman Jhula & Ram Jhula', type: 'landmark', pinCode: '249137', coordinates: { lat: 30.1342, lng: 78.3308 } },
              { id: 'uk-rk-2', name: 'Triveni Ghat Evening Aarti', type: 'landmark', pinCode: '249201', coordinates: { lat: 30.1042, lng: 78.2936 } },
              { id: 'uk-rk-3', name: 'Neer Garh Waterfalls', type: 'landmark', pinCode: '249137', coordinates: { lat: 30.1444, lng: 78.3389 } },
            ],
          },
        ],
      },
    ],
  },

  // 14. West Bengal
  {
    id: 'wb',
    name: 'West Bengal',
    type: 'State',
    subDivisionTerm: 'Block',
    capital: 'Kolkata',
    districts: [
      {
        id: 'wb-kolkata',
        name: 'Kolkata',
        headquarters: 'Kolkata',
        subDivisions: [
          {
            name: 'Kolkata Central',
            type: 'Block',
            locations: [
              { id: 'wb-kl-1', name: 'Victoria Memorial Hall & Gardens', type: 'landmark', pinCode: '700071', coordinates: { lat: 22.5448, lng: 88.3426 } },
              { id: 'wb-kl-2', name: 'Howrah Bridge (Rabindra Setu)', type: 'landmark', pinCode: '700001', coordinates: { lat: 22.5851, lng: 88.3468 } },
              { id: 'wb-kl-3', name: 'Dakshineswar Kali Temple', type: 'landmark', pinCode: '700076', coordinates: { lat: 22.6533, lng: 88.3578 } },
              { id: 'wb-kl-4', name: 'Alipore Zoological Gardens', type: 'landmark', pinCode: '700027', coordinates: { lat: 22.5342, lng: 88.3314 } },
            ],
          },
        ],
      },
    ],
  },

  // 15. Gujarat
  {
    id: 'gj',
    name: 'Gujarat',
    type: 'State',
    subDivisionTerm: 'Taluka',
    capital: 'Gandhinagar',
    districts: [
      {
        id: 'gj-narmada',
        name: 'Narmada (Statue of Unity)',
        headquarters: 'Rajpipla',
        subDivisions: [
          {
            name: 'Garudeshwar',
            type: 'Taluka',
            locations: [
              { id: 'gj-su-1', name: 'Statue of Unity (World Tallest 182m)', type: 'landmark', pinCode: '393155', coordinates: { lat: 21.8380, lng: 73.7191 } },
              { id: 'gj-su-2', name: 'Sardar Sarovar Dam & Valley of Flowers', type: 'landmark', pinCode: '393155', coordinates: { lat: 21.8300, lng: 73.7483 } },
            ],
          },
        ],
      },
    ],
  },

  // 16. Madhya Pradesh
  {
    id: 'mp',
    name: 'Madhya Pradesh',
    type: 'State',
    subDivisionTerm: 'Tehsil',
    capital: 'Bhopal',
    districts: [
      {
        id: 'mp-ujjain',
        name: 'Ujjain',
        headquarters: 'Ujjain',
        subDivisions: [
          {
            name: 'Ujjain City',
            type: 'Tehsil',
            locations: [
              { id: 'mp-uj-1', name: 'Mahakaleshwar Jyotirlinga Temple & Corridor', type: 'landmark', pinCode: '456001', coordinates: { lat: 23.1827, lng: 75.7682 } },
              { id: 'mp-uj-2', name: 'Ram Ghat on Shipra River', type: 'landmark', pinCode: '456006', coordinates: { lat: 23.1844, lng: 75.7612 } },
            ],
          },
        ],
      },
      {
        id: 'mp-indore',
        name: 'Indore',
        headquarters: 'Indore',
        subDivisions: [
          {
            name: 'Indore',
            type: 'Tehsil',
            locations: [
              { id: 'mp-in-1', name: 'Rajwada Palace & Sarafa Bazaar', type: 'landmark', pinCode: '452002', coordinates: { lat: 22.7186, lng: 75.8554 } },
            ],
          },
        ],
      },
    ],
  },

  // 17. Bihar
  {
    id: 'br',
    name: 'Bihar',
    type: 'State',
    subDivisionTerm: 'Block',
    capital: 'Patna',
    districts: [
      {
        id: 'br-gaya',
        name: 'Gaya (Bodh Gaya)',
        headquarters: 'Gaya',
        subDivisions: [
          {
            name: 'Bodh Gaya',
            type: 'Block',
            locations: [
              { id: 'br-bg-1', name: 'Mahabodhi Temple & Bodhi Tree (UNESCO)', type: 'landmark', pinCode: '824231', coordinates: { lat: 24.6958, lng: 84.9914 } },
              { id: 'br-bg-2', name: 'Great Buddha Statue (80ft)', type: 'landmark', pinCode: '824231', coordinates: { lat: 24.6983, lng: 84.9856 } },
            ],
          },
        ],
      },
      {
        id: 'br-patna',
        name: 'Patna',
        headquarters: 'Patna',
        subDivisions: [
          {
            name: 'Patna Sadar',
            type: 'Block',
            locations: [
              { id: 'br-pt-1', name: 'Takht Sri Patna Sahib Gurudwara', type: 'landmark', pinCode: '800008', coordinates: { lat: 25.5941, lng: 85.2289 } },
            ],
          },
        ],
      },
    ],
  },

  // 18. Odisha
  {
    id: 'or',
    name: 'Odisha',
    type: 'State',
    subDivisionTerm: 'Block',
    capital: 'Bhubaneswar',
    districts: [
      {
        id: 'or-puri',
        name: 'Puri',
        headquarters: 'Puri',
        subDivisions: [
          {
            name: 'Puri Sadar',
            type: 'Block',
            locations: [
              { id: 'or-pr-1', name: 'Shree Jagannatha Temple (Char Dham)', type: 'landmark', pinCode: '752001', coordinates: { lat: 19.8049, lng: 85.8179 } },
              { id: 'or-pr-2', name: 'Golden Beach & Marine Drive (Blue Flag)', type: 'landmark', pinCode: '752002', coordinates: { lat: 19.7972, lng: 85.8311 } },
              { id: 'or-pr-3', name: 'Konark Sun Temple (Black Pagoda UNESCO)', type: 'landmark', pinCode: '752111', coordinates: { lat: 19.8876, lng: 86.0945 } },
            ],
          },
        ],
      },
      {
        id: 'or-khordha',
        name: 'Khordha (Bhubaneswar)',
        headquarters: 'Bhubaneswar',
        subDivisions: [
          {
            name: 'Bhubaneswar',
            type: 'Block',
            locations: [
              { id: 'or-bb-1', name: 'Lingaraj Temple & Bindu Sagar', type: 'landmark', pinCode: '751002', coordinates: { lat: 20.2382, lng: 85.8338 } },
              { id: 'or-bb-2', name: 'Udayagiri & Khandagiri Caves', type: 'landmark', pinCode: '751030', coordinates: { lat: 20.2631, lng: 85.7861 } },
            ],
          },
        ],
      },
    ],
  },

  // 19. Punjab
  {
    id: 'pb',
    name: 'Punjab',
    type: 'State',
    subDivisionTerm: 'Tehsil',
    capital: 'Chandigarh',
    districts: [
      {
        id: 'pb-amritsar',
        name: 'Amritsar',
        headquarters: 'Amritsar',
        subDivisions: [
          {
            name: 'Amritsar',
            type: 'Tehsil',
            locations: [
              { id: 'pb-as-1', name: 'Sri Harmandir Sahib (Golden Temple)', type: 'landmark', pinCode: '143006', coordinates: { lat: 31.6200, lng: 74.8765 } },
              { id: 'pb-as-2', name: 'Jallianwala Bagh Memorial', type: 'landmark', pinCode: '143006', coordinates: { lat: 31.6206, lng: 74.8801 } },
              { id: 'pb-as-3', name: 'Attari-Wagah Border Ceremony', type: 'landmark', pinCode: '143108', coordinates: { lat: 31.6047, lng: 74.5739 } },
            ],
          },
        ],
      },
    ],
  },

  // 20. Haryana
  {
    id: 'hr',
    name: 'Haryana',
    type: 'State',
    subDivisionTerm: 'Tehsil',
    capital: 'Chandigarh',
    districts: [
      {
        id: 'hr-gurugram',
        name: 'Gurugram',
        headquarters: 'Gurugram',
        subDivisions: [
          {
            name: 'Gurugram',
            type: 'Tehsil',
            locations: [
              { id: 'hr-gg-1', name: 'Cyber Hub & DLF Cyber City', type: 'city', pinCode: '122002', coordinates: { lat: 28.4950, lng: 77.0895 } },
              { id: 'hr-gg-2', name: 'Sultanpur National Park & Bird Sanctuary', type: 'landmark', pinCode: '122505', coordinates: { lat: 28.4617, lng: 76.8925 } },
            ],
          },
        ],
      },
      {
        id: 'hr-kurukshetra',
        name: 'Kurukshetra',
        headquarters: 'Kurukshetra',
        subDivisions: [
          {
            name: 'Thanesar',
            type: 'Tehsil',
            locations: [
              { id: 'hr-kk-1', name: 'Brahma Sarovar & Jyotisar (Gita Birthplace)', type: 'landmark', pinCode: '136118', coordinates: { lat: 29.9656, lng: 76.8375 } },
            ],
          },
        ],
      },
    ],
  },

  // 21. Assam
  {
    id: 'as',
    name: 'Assam',
    type: 'State',
    subDivisionTerm: 'Block',
    capital: 'Dispur (Guwahati)',
    districts: [
      {
        id: 'as-kamrup-metro',
        name: 'Kamrup Metropolitan (Guwahati)',
        headquarters: 'Guwahati',
        subDivisions: [
          {
            name: 'Guwahati',
            type: 'Block',
            locations: [
              { id: 'as-gh-1', name: 'Maa Kamakhya Devalaya Temple', type: 'landmark', pinCode: '781010', coordinates: { lat: 26.1664, lng: 91.7058 } },
              { id: 'as-gh-2', name: 'Umananda Island (Smallest River Island)', type: 'landmark', pinCode: '781001', coordinates: { lat: 26.1914, lng: 91.7483 } },
            ],
          },
        ],
      },
      {
        id: 'as-golaghat',
        name: 'Golaghat (Kaziranga)',
        headquarters: 'Golaghat',
        subDivisions: [
          {
            name: 'Bokakhat',
            type: 'Block',
            locations: [
              { id: 'as-kz-1', name: 'Kaziranga National Park (One-Horned Rhino UNESCO)', type: 'landmark', pinCode: '785609', coordinates: { lat: 26.5775, lng: 93.1711 } },
            ],
          },
        ],
      },
    ],
  },

  // 22. Jharkhand
  {
    id: 'jh',
    name: 'Jharkhand',
    type: 'State',
    subDivisionTerm: 'Block',
    capital: 'Ranchi',
    districts: [
      {
        id: 'jh-deoghar',
        name: 'Deoghar',
        headquarters: 'Deoghar',
        subDivisions: [
          {
            name: 'Deoghar Sadar',
            type: 'Block',
            locations: [
              { id: 'jh-dg-1', name: 'Baba Baidyanath Dham Jyotirlinga', type: 'landmark', pinCode: '814112', coordinates: { lat: 24.4925, lng: 86.7003 } },
            ],
          },
        ],
      },
      {
        id: 'jh-ranchi',
        name: 'Ranchi',
        headquarters: 'Ranchi',
        subDivisions: [
          {
            name: 'Kanke',
            type: 'Block',
            locations: [
              { id: 'jh-rn-1', name: 'Hundru Waterfalls & Subarnarekha River', type: 'landmark', pinCode: '835103', coordinates: { lat: 23.4478, lng: 85.6542 } },
              { id: 'jh-rn-2', name: 'Dassam Falls & Kanchi River', type: 'landmark', pinCode: '835204', coordinates: { lat: 23.1417, lng: 85.4678 } },
            ],
          },
        ],
      },
    ],
  },

  // 23. Chhattisgarh
  {
    id: 'cg',
    name: 'Chhattisgarh',
    type: 'State',
    subDivisionTerm: 'Tehsil',
    capital: 'Raipur',
    districts: [
      {
        id: 'cg-bastar',
        name: 'Bastar (Jagdalpur)',
        headquarters: 'Jagdalpur',
        subDivisions: [
          {
            name: 'Lohandiguda',
            type: 'Tehsil',
            locations: [
              { id: 'cg-ck-1', name: 'Chitrakote Waterfalls (Niagara of India 300m wide)', type: 'landmark', pinCode: '494010', coordinates: { lat: 19.2014, lng: 81.7061 } },
              { id: 'cg-ck-2', name: 'Tirathgarh Falls inside Kanger Valley', type: 'landmark', pinCode: '494001', coordinates: { lat: 18.9142, lng: 81.8653 } },
            ],
          },
        ],
      },
    ],
  },

  // 24. Sikkim
  {
    id: 'sk',
    name: 'Sikkim',
    type: 'State',
    subDivisionTerm: 'Sub-division',
    capital: 'Gangtok',
    districts: [
      {
        id: 'sk-gangtok',
        name: 'Gangtok',
        headquarters: 'Gangtok',
        subDivisions: [
          {
            name: 'Gangtok',
            type: 'Sub-division',
            locations: [
              { id: 'sk-gt-1', name: 'MG Marg Promenade & Ridge Park', type: 'landmark', pinCode: '737101', coordinates: { lat: 27.3314, lng: 88.6138 } },
              { id: 'sk-gt-2', name: 'Rumtek Dharma Chakra Centre', type: 'landmark', pinCode: '737135', coordinates: { lat: 27.2995, lng: 88.5447 } },
              { id: 'sk-gt-3', name: 'Tsomgo Lake & Nathu La Pass (14,140 ft)', type: 'landmark', pinCode: '737103', coordinates: { lat: 27.3742, lng: 88.7619 } },
            ],
          },
        ],
      },
    ],
  },

  // 25. Meghalaya
  {
    id: 'ml',
    name: 'Meghalaya',
    type: 'State',
    subDivisionTerm: 'Block',
    capital: 'Shillong',
    districts: [
      {
        id: 'ml-east-khasi-hills',
        name: 'East Khasi Hills (Shillong & Cherrapunji)',
        headquarters: 'Shillong',
        subDivisions: [
          {
            name: 'Sohra (Cherrapunji)',
            type: 'Block',
            locations: [
              { id: 'ml-cp-1', name: 'Nohkalikai Falls (Tallest Plunge in India 1,115 ft)', type: 'landmark', pinCode: '793108', coordinates: { lat: 25.2756, lng: 91.6847 } },
              { id: 'ml-cp-2', name: 'Double Decker Living Root Bridges (Nongriat)', type: 'landmark', pinCode: '793108', coordinates: { lat: 25.2514, lng: 91.6736 } },
              { id: 'ml-cp-3', name: 'Seven Sisters Waterfalls (Mawsmai)', type: 'landmark', pinCode: '793108', coordinates: { lat: 25.2503, lng: 91.7222 } },
            ],
          },
        ],
      },
    ],
  },

  // 26. Arunachal Pradesh
  {
    id: 'ar',
    name: 'Arunachal Pradesh',
    type: 'State',
    subDivisionTerm: 'Circle',
    capital: 'Itanagar',
    districts: [
      {
        id: 'ar-tawang',
        name: 'Tawang',
        headquarters: 'Tawang',
        subDivisions: [
          {
            name: 'Tawang',
            type: 'Circle',
            locations: [
              { id: 'ar-tw-1', name: 'Tawang Monastery (Largest in India)', type: 'landmark', pinCode: '790104', coordinates: { lat: 27.5861, lng: 91.8594 } },
              { id: 'ar-tw-2', name: 'Sela Pass & Sela Lake (13,700 ft)', type: 'landmark', pinCode: '790105', coordinates: { lat: 27.5056, lng: 92.1039 } },
            ],
          },
        ],
      },
    ],
  },

  // 27. Nagaland
  {
    id: 'nl',
    name: 'Nagaland',
    type: 'State',
    subDivisionTerm: 'Circle',
    capital: 'Kohima',
    districts: [
      {
        id: 'nl-kohima',
        name: 'Kohima',
        headquarters: 'Kohima',
        subDivisions: [
          {
            name: 'Kohima Sadar',
            type: 'Circle',
            locations: [
              { id: 'nl-kh-1', name: 'Kisama Heritage Village (Hornbill Festival)', type: 'landmark', pinCode: '797001', coordinates: { lat: 25.6028, lng: 94.1167 } },
              { id: 'nl-kh-2', name: 'Dzukou Valley Trek Entry', type: 'landmark', pinCode: '797001', coordinates: { lat: 25.5500, lng: 94.0667 } },
            ],
          },
        ],
      },
    ],
  },

  // 28. Manipur
  {
    id: 'mn',
    name: 'Manipur',
    type: 'State',
    subDivisionTerm: 'Sub-division',
    capital: 'Imphal',
    districts: [
      {
        id: 'mn-bishnupur',
        name: 'Bishnupur (Loktak Lake)',
        headquarters: 'Bishnupur',
        subDivisions: [
          {
            name: 'Moirang',
            type: 'Sub-division',
            locations: [
              { id: 'mn-lk-1', name: 'Loktak Lake & Keibul Lamjao Floating Park', type: 'landmark', pinCode: '795133', coordinates: { lat: 24.5500, lng: 93.8000 } },
            ],
          },
        ],
      },
    ],
  },

  // 29. Mizoram
  {
    id: 'mz',
    name: 'Mizoram',
    type: 'State',
    subDivisionTerm: 'Block',
    capital: 'Aizawl',
    districts: [
      {
        id: 'mz-aizawl',
        name: 'Aizawl',
        headquarters: 'Aizawl',
        subDivisions: [
          {
            name: 'Aizawl',
            type: 'Block',
            locations: [
              { id: 'mz-az-1', name: 'Durtlang Hills & Solomon Temple', type: 'landmark', pinCode: '796025', coordinates: { lat: 23.7719, lng: 92.7303 } },
            ],
          },
        ],
      },
    ],
  },

  // 30. Tripura
  {
    id: 'tr',
    name: 'Tripura',
    type: 'State',
    subDivisionTerm: 'Block',
    capital: 'Agartala',
    districts: [
      {
        id: 'tr-west-tripura',
        name: 'West Tripura (Agartala)',
        headquarters: 'Agartala',
        subDivisions: [
          {
            name: 'Agartala',
            type: 'Block',
            locations: [
              { id: 'tr-ag-1', name: 'Ujjayanta Palace & Museum', type: 'landmark', pinCode: '799001', coordinates: { lat: 23.8344, lng: 91.2825 } },
              { id: 'tr-ag-2', name: 'Neermahal Water Palace (Rudrasagar)', type: 'landmark', pinCode: '799115', coordinates: { lat: 23.4989, lng: 91.3214 } },
            ],
          },
        ],
      },
    ],
  },

  // 31. Ladakh
  {
    id: 'la',
    name: 'Ladakh',
    type: 'Union Territory',
    subDivisionTerm: 'Tehsil',
    capital: 'Leh',
    districts: [
      {
        id: 'la-leh',
        name: 'Leh Ladakh',
        headquarters: 'Leh',
        subDivisions: [
          {
            name: 'Leh',
            type: 'Tehsil',
            locations: [
              { id: 'la-lh-1', name: 'Pangong Tso High Altitude Lake (14,270 ft)', type: 'landmark', pinCode: '194201', coordinates: { lat: 33.7595, lng: 78.6674 } },
              { id: 'la-lh-2', name: 'Nubra Valley & Hunder Sand Dunes (Double Hump Camel)', type: 'landmark', pinCode: '194120', coordinates: { lat: 34.5833, lng: 77.4667 } },
              { id: 'la-lh-3', name: 'Shanti Stupa & Leh Palace', type: 'landmark', pinCode: '194101', coordinates: { lat: 34.1642, lng: 77.5847 } },
              { id: 'la-lh-4', name: 'Khardung La Pass (World Highest Motor Pass)', type: 'landmark', pinCode: '194101', coordinates: { lat: 34.2789, lng: 77.6044 } },
            ],
          },
        ],
      },
    ],
  },

  // 32. Puducherry
  {
    id: 'py',
    name: 'Puducherry',
    type: 'Union Territory',
    subDivisionTerm: 'Taluk',
    capital: 'Puducherry',
    districts: [
      {
        id: 'py-puducherry',
        name: 'Puducherry',
        headquarters: 'Puducherry',
        subDivisions: [
          {
            name: 'Puducherry',
            type: 'Taluk',
            locations: [
              { id: 'py-pd-1', name: 'Promenade Beach & French Quarter (White Town)', type: 'landmark', pinCode: '605001', coordinates: { lat: 11.9338, lng: 79.8358 } },
              { id: 'py-pd-2', name: 'Auroville & Matrimandir Golden Dome', type: 'landmark', pinCode: '605101', coordinates: { lat: 12.0069, lng: 79.8106 } },
              { id: 'py-pd-3', name: 'Paradise Beach & Chunnambar Boat House', type: 'landmark', pinCode: '605007', coordinates: { lat: 11.8842, lng: 79.8058 } },
            ],
          },
        ],
      },
    ],
  },

  // 33. Chandigarh
  {
    id: 'ch',
    name: 'Chandigarh',
    type: 'Union Territory',
    subDivisionTerm: 'Sub-division',
    capital: 'Chandigarh',
    districts: [
      {
        id: 'ch-chandigarh',
        name: 'Chandigarh',
        headquarters: 'Sector 17',
        subDivisions: [
          {
            name: 'Chandigarh Central',
            type: 'Sub-division',
            locations: [
              { id: 'ch-cg-1', name: 'Nek Chand Rock Garden', type: 'landmark', pinCode: '160001', coordinates: { lat: 30.7525, lng: 76.8067 } },
              { id: 'ch-cg-2', name: 'Sukhna Lake Promenade', type: 'landmark', pinCode: '160019', coordinates: { lat: 30.7422, lng: 76.8183 } },
              { id: 'ch-cg-3', name: 'Zakir Hussain Rose Garden (Asia Largest)', type: 'landmark', pinCode: '160016', coordinates: { lat: 30.7469, lng: 76.7828 } },
            ],
          },
        ],
      },
    ],
  },

  // 34. Andaman and Nicobar Islands
  {
    id: 'an',
    name: 'Andaman and Nicobar Islands',
    type: 'Union Territory',
    subDivisionTerm: 'Tehsil',
    capital: 'Port Blair',
    districts: [
      {
        id: 'an-south-andaman',
        name: 'South Andaman (Port Blair & Havelock)',
        headquarters: 'Port Blair',
        subDivisions: [
          {
            name: 'Port Blair',
            type: 'Tehsil',
            locations: [
              { id: 'an-pb-1', name: 'Cellular Jail National Memorial (Kala Pani)', type: 'landmark', pinCode: '744101', coordinates: { lat: 11.6739, lng: 92.7478 } },
              { id: 'an-pb-2', name: 'Radhanagar Beach (Havelock Swaraj Dweep)', type: 'landmark', pinCode: '744211', coordinates: { lat: 11.9839, lng: 92.9519 } },
              { id: 'an-pb-3', name: 'Elephant Beach Coral Reef', type: 'landmark', pinCode: '744211', coordinates: { lat: 12.0122, lng: 92.9567 } },
            ],
          },
        ],
      },
    ],
  },

  // 35. Dadra and Nagar Haveli and Daman and Diu
  {
    id: 'dd',
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    type: 'Union Territory',
    subDivisionTerm: 'Taluka',
    capital: 'Daman',
    districts: [
      {
        id: 'dd-daman',
        name: 'Daman',
        headquarters: 'Daman',
        subDivisions: [
          {
            name: 'Daman',
            type: 'Taluka',
            locations: [
              { id: 'dd-dm-1', name: 'Moti Daman Fort & Lighthouse', type: 'landmark', pinCode: '396220', coordinates: { lat: 20.4131, lng: 72.8322 } },
              { id: 'dd-dm-2', name: 'Devka Beach & Amusement Park', type: 'landmark', pinCode: '396210', coordinates: { lat: 20.4444, lng: 72.8317 } },
            ],
          },
        ],
      },
    ],
  },

  // 36. Lakshadweep
  {
    id: 'ld',
    name: 'Lakshadweep',
    type: 'Union Territory',
    subDivisionTerm: 'Sub-division',
    capital: 'Kavaratti',
    districts: [
      {
        id: 'ld-lakshadweep',
        name: 'Lakshadweep',
        headquarters: 'Kavaratti',
        subDivisions: [
          {
            name: 'Kavaratti',
            type: 'Sub-division',
            locations: [
              { id: 'ld-kv-1', name: 'Kavaratti Lagoon & Marine Aquarium', type: 'landmark', pinCode: '682555', coordinates: { lat: 10.5669, lng: 72.6422 } },
              { id: 'ld-kv-2', name: 'Agatti Island Airport & Coral Reef', type: 'landmark', pinCode: '682553', coordinates: { lat: 10.8242, lng: 72.1761 } },
              { id: 'ld-kv-3', name: 'Bangaram Atoll Scuba Diving Point', type: 'landmark', pinCode: '682553', coordinates: { lat: 10.9417, lng: 72.2889 } },
            ],
          },
        ],
      },
    ],
  },
];

// Major Transit Hubs & Terminals across India (Airports, Railway Stations, Bus Terminals, Pilgrimages)
export interface TransitHubLocation extends FlatLocationResult {
  category: 'Airport' | 'Railway Station' | 'Bus Station' | 'Pilgrimage' | 'Tourist';
  code?: string;
}

export const INDIA_TRANSIT_HUBS: TransitHubLocation[] = [
  // Major Airports
  {
    id: 'hub-del-air',
    title: 'Indira Gandhi International Airport (DEL)',
    subtitle: 'Palam, South West Delhi, Delhi - Airport Terminal T1/T2/T3',
    state: 'Delhi',
    district: 'South West Delhi',
    subDivision: 'Palam',
    subDivisionType: 'Sub-division',
    locality: 'Terminal 3 / Terminal 1',
    pinCode: '110037',
    category: 'Airport',
    code: 'DEL',
    coordinates: { lat: 28.5562, lng: 77.1000 },
  },
  {
    id: 'hub-bom-air',
    title: 'Chhatrapati Shivaji Maharaj International Airport (BOM)',
    subtitle: 'Sahar, Andheri East, Mumbai Suburban, Maharashtra',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    subDivision: 'Andheri',
    subDivisionType: 'Taluka',
    locality: 'Sahar / Vile Parle Terminal 2',
    pinCode: '400099',
    category: 'Airport',
    code: 'BOM',
    coordinates: { lat: 19.0896, lng: 72.8656 },
  },
  {
    id: 'hub-blr-air',
    title: 'Kempegowda International Airport Bengaluru (BLR)',
    subtitle: 'Devanahalli Taluk, Bengaluru Rural, Karnataka',
    state: 'Karnataka',
    district: 'Bengaluru Rural',
    subDivision: 'Devanahalli',
    subDivisionType: 'Taluk',
    locality: 'Devanahalli Airport Hub',
    pinCode: '560300',
    category: 'Airport',
    code: 'BLR',
    coordinates: { lat: 13.1986, lng: 77.7066 },
  },
  {
    id: 'hub-hyd-air',
    title: 'Rajiv Gandhi International Airport Hyderabad (HYD)',
    subtitle: 'Shamshabad Mandal, Rangareddy District, Telangana',
    state: 'Telangana',
    district: 'Rangareddy',
    subDivision: 'Shamshabad',
    subDivisionType: 'Mandal',
    locality: 'Shamshabad Airport City',
    pinCode: '500409',
    category: 'Airport',
    code: 'HYD',
    coordinates: { lat: 17.2403, lng: 78.4294 },
  },
  {
    id: 'hub-maa-air',
    title: 'Chennai International Airport (MAA)',
    subtitle: 'Meenambakkam, Chennai District, Tamil Nadu',
    state: 'Tamil Nadu',
    district: 'Chennai',
    subDivision: 'Alandur',
    subDivisionType: 'Taluk',
    locality: 'Meenambakkam',
    pinCode: '600027',
    category: 'Airport',
    code: 'MAA',
    coordinates: { lat: 12.9941, lng: 80.1709 },
  },
  {
    id: 'hub-ccu-air',
    title: 'Netaji Subhash Chandra Bose International Airport (CCU)',
    subtitle: 'Dum Dum, North 24 Parganas, West Bengal',
    state: 'West Bengal',
    district: 'North 24 Parganas',
    subDivision: 'Barrackpore',
    subDivisionType: 'Sub-division',
    locality: 'Dum Dum Airport',
    pinCode: '700052',
    category: 'Airport',
    code: 'CCU',
    coordinates: { lat: 22.6547, lng: 88.4467 },
  },
  {
    id: 'hub-tir-air',
    title: 'Tirupati Airport (TIR)',
    subtitle: 'Renigunta Mandal, Tirupati District, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    subDivision: 'Renigunta',
    subDivisionType: 'Mandal',
    locality: 'Renigunta Air Terminal',
    pinCode: '517520',
    category: 'Airport',
    code: 'TIR',
    coordinates: { lat: 13.6325, lng: 79.5434 },
  },
  {
    id: 'hub-vtz-air',
    title: 'Visakhapatnam International Airport (VTZ)',
    subtitle: 'NAD Junction, Visakhapatnam, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    subDivision: 'Visakhapatnam Urban',
    subDivisionType: 'Mandal',
    locality: 'NAD Kotha Road',
    pinCode: '530009',
    category: 'Airport',
    code: 'VTZ',
    coordinates: { lat: 17.7215, lng: 83.2245 },
  },
  {
    id: 'hub-vga-air',
    title: 'Vijayawada International Airport (VGA)',
    subtitle: 'Gannavaram Mandal, Krishna District, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    subDivision: 'Gannavaram',
    subDivisionType: 'Mandal',
    locality: 'Gannavaram Airport',
    pinCode: '521102',
    category: 'Airport',
    code: 'VGA',
    coordinates: { lat: 16.5304, lng: 80.7968 },
  },
  {
    id: 'hub-goi-air',
    title: 'Goa International Airport Dabolim & Mopa (GOI / GOX)',
    subtitle: 'Vasco da Gama / Pernem, Goa',
    state: 'Goa',
    district: 'South Goa',
    subDivision: 'Mormugao',
    subDivisionType: 'Taluka',
    locality: 'Dabolim Air Hub',
    pinCode: '403801',
    category: 'Airport',
    code: 'GOI',
    coordinates: { lat: 15.3800, lng: 73.8314 },
  },

  // Major Railway Stations
  {
    id: 'hub-tpty-rail',
    title: 'Tirupati Central Railway Station (TPTY)',
    subtitle: 'Tirupati Urban Mandal, Tirupati District, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    subDivision: 'Tirupati Urban',
    subDivisionType: 'Mandal',
    locality: 'Railway Station Road',
    pinCode: '517501',
    category: 'Railway Station',
    code: 'TPTY',
    coordinates: { lat: 13.6283, lng: 79.4198 },
  },
  {
    id: 'hub-ru-rail',
    title: 'Renigunta Junction Railway Station (RU)',
    subtitle: 'Renigunta Mandal, Tirupati District, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    subDivision: 'Renigunta',
    subDivisionType: 'Mandal',
    locality: 'Renigunta Junction',
    pinCode: '517520',
    category: 'Railway Station',
    code: 'RU',
    coordinates: { lat: 13.6517, lng: 79.5161 },
  },
  {
    id: 'hub-sc-rail',
    title: 'Secunderabad Junction Railway Station (SC)',
    subtitle: 'Secunderabad Mandal, Hyderabad, Telangana',
    state: 'Telangana',
    district: 'Hyderabad',
    subDivision: 'Secunderabad',
    subDivisionType: 'Mandal',
    locality: 'Station Road, Secunderabad',
    pinCode: '500003',
    category: 'Railway Station',
    code: 'SC',
    coordinates: { lat: 17.4338, lng: 78.5015 },
  },
  {
    id: 'hub-hyb-rail',
    title: 'Hyderabad Deccan Nampally Railway Station (HYB)',
    subtitle: 'Nampally Mandal, Hyderabad, Telangana',
    state: 'Telangana',
    district: 'Hyderabad',
    subDivision: 'Nampally',
    subDivisionType: 'Mandal',
    locality: 'Nampally Station Area',
    pinCode: '500001',
    category: 'Railway Station',
    code: 'HYB',
    coordinates: { lat: 17.3926, lng: 78.4682 },
  },
  {
    id: 'hub-bza-rail',
    title: 'Vijayawada Junction Railway Station (BZA)',
    subtitle: 'Vijayawada Urban Mandal, NTR District, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'NTR District',
    subDivision: 'Vijayawada Urban',
    subDivisionType: 'Mandal',
    locality: 'Railway Station Complex',
    pinCode: '520001',
    category: 'Railway Station',
    code: 'BZA',
    coordinates: { lat: 16.5186, lng: 80.6198 },
  },
  {
    id: 'hub-mas-rail',
    title: 'Chennai Central Railway Station - Puratchi Thalaivar Dr. MGR (MAS)',
    subtitle: 'Park Town, Chennai, Tamil Nadu',
    state: 'Tamil Nadu',
    district: 'Chennai',
    subDivision: 'Egmore',
    subDivisionType: 'Taluk',
    locality: 'Kannappar Thidal, Periamet',
    pinCode: '600003',
    category: 'Railway Station',
    code: 'MAS',
    coordinates: { lat: 13.0827, lng: 80.2755 },
  },
  {
    id: 'hub-sbc-rail',
    title: 'KSR Bengaluru City Junction Railway Station (SBC)',
    subtitle: 'Kempegowda Majestic, Bengaluru Urban, Karnataka',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    subDivision: 'Bengaluru North',
    subDivisionType: 'Taluk',
    locality: 'Majestic City Terminal',
    pinCode: '560023',
    category: 'Railway Station',
    code: 'SBC',
    coordinates: { lat: 12.9784, lng: 77.5695 },
  },
  {
    id: 'hub-ndls-rail',
    title: 'New Delhi Railway Station (NDLS)',
    subtitle: 'Paharganj / Ajmeri Gate, Central Delhi, Delhi',
    state: 'Delhi',
    district: 'Central Delhi',
    subDivision: 'Kotwali',
    subDivisionType: 'Sub-division',
    locality: 'Paharganj Gate',
    pinCode: '110006',
    category: 'Railway Station',
    code: 'NDLS',
    coordinates: { lat: 28.6431, lng: 77.2197 },
  },
  {
    id: 'hub-csmt-rail',
    title: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    subtitle: 'Fort, South Mumbai, Maharashtra',
    state: 'Maharashtra',
    district: 'Mumbai City',
    subDivision: 'Colaba',
    subDivisionType: 'Taluka',
    locality: 'Bori Bunder, Fort',
    pinCode: '400001',
    category: 'Railway Station',
    code: 'CSMT',
    coordinates: { lat: 18.9401, lng: 72.8354 },
  },
  {
    id: 'hub-hwh-rail',
    title: 'Howrah Junction Railway Station (HWH)',
    subtitle: 'Howrah, West Bengal (Largest Rail Hub in India)',
    state: 'West Bengal',
    district: 'Howrah',
    subDivision: 'Howrah Sadar',
    subDivisionType: 'Sub-division',
    locality: 'Station Approach Road',
    pinCode: '711101',
    category: 'Railway Station',
    code: 'HWH',
    coordinates: { lat: 22.5838, lng: 88.3426 },
  },
  {
    id: 'hub-bsb-rail',
    title: 'Varanasi Junction Cantt Railway Station (BSB)',
    subtitle: 'Varanasi Tehsil, Varanasi, Uttar Pradesh',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    subDivision: 'Varanasi',
    subDivisionType: 'Tehsil',
    locality: 'Cantonment Area',
    pinCode: '221002',
    category: 'Railway Station',
    code: 'BSB',
    coordinates: { lat: 25.3284, lng: 82.9868 },
  },
  {
    id: 'hub-ay-rail',
    title: 'Ayodhya Dham Junction Railway Station (AY)',
    subtitle: 'Ayodhya Sadar Tehsil, Ayodhya, Uttar Pradesh',
    state: 'Uttar Pradesh',
    district: 'Ayodhya',
    subDivision: 'Ayodhya Sadar',
    subDivisionType: 'Tehsil',
    locality: 'Dharmapath Station',
    pinCode: '224123',
    category: 'Railway Station',
    code: 'AY',
    coordinates: { lat: 26.7922, lng: 82.1998 },
  },

  // Major Bus Terminals
  {
    id: 'hub-mgbs-bus',
    title: 'MGBS - Mahatma Gandhi Bus Station (Imlibun)',
    subtitle: 'Gowliguda, Hyderabad, Telangana (Asia Largest Bus Station)',
    state: 'Telangana',
    district: 'Hyderabad',
    subDivision: 'Charminar',
    subDivisionType: 'Mandal',
    locality: 'Imlibun Island',
    pinCode: '500095',
    category: 'Bus Station',
    coordinates: { lat: 17.3773, lng: 78.4795 },
  },
  {
    id: 'hub-tpt-bus',
    title: 'Tirupati Central Bus Station Complex (APSRTC)',
    subtitle: 'Alipiri & Central RTC Complex, Tirupati, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    subDivision: 'Tirupati Urban',
    subDivisionType: 'Mandal',
    locality: 'RTC Central Stand',
    pinCode: '517501',
    category: 'Bus Station',
    coordinates: { lat: 13.6288, lng: 79.4192 },
  },
  {
    id: 'hub-blr-maj-bus',
    title: 'Kempegowda Majestic Bus Station (KSRTC & BMTC)',
    subtitle: 'Majestic Central, Bengaluru Urban, Karnataka',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    subDivision: 'Bengaluru North',
    subDivisionType: 'Taluk',
    locality: 'Gubbi Thotadappa Road',
    pinCode: '560009',
    category: 'Bus Station',
    coordinates: { lat: 12.9772, lng: 77.5713 },
  },
  {
    id: 'hub-cmbt-bus',
    title: 'CMBT - Chennai Mofussil Bus Terminus (Koyambedu)',
    subtitle: 'Koyambedu, Chennai, Tamil Nadu',
    state: 'Tamil Nadu',
    district: 'Chennai',
    subDivision: 'Aminjikarai',
    subDivisionType: 'Taluk',
    locality: 'Koyambedu Central',
    pinCode: '600107',
    category: 'Bus Station',
    coordinates: { lat: 13.0673, lng: 80.2057 },
  },
  {
    id: 'hub-pnbs-bus',
    title: 'Pandit Nehru Bus Station - PNBS (Vijayawada)',
    subtitle: 'Krishna Riverbank, Vijayawada, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'NTR District',
    subDivision: 'Vijayawada Urban',
    subDivisionType: 'Mandal',
    locality: 'RTC Complex PNBS',
    pinCode: '520013',
    category: 'Bus Station',
    coordinates: { lat: 16.5085, lng: 80.6277 },
  },
  {
    id: 'hub-isbt-del-bus',
    title: 'ISBT Maharana Pratap Kashmere Gate (Delhi)',
    subtitle: 'Kashmere Gate, North Delhi, Delhi',
    state: 'Delhi',
    district: 'North Delhi',
    subDivision: 'Kotwali',
    subDivisionType: 'Sub-division',
    locality: 'Kashmere Gate',
    pinCode: '110006',
    category: 'Bus Station',
    coordinates: { lat: 28.6672, lng: 77.2285 },
  },

  // Major Pilgrimages & Tourist Destinations
  {
    id: 'hub-trm-temple',
    title: 'Sri Venkateswara Swamy Temple (Tirumala Hills)',
    subtitle: 'Tirumala Hills Mandal, Tirupati District, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    subDivision: 'Tirumala Hills',
    subDivisionType: 'Mandal',
    locality: 'Srivari Sannidhi',
    pinCode: '517504',
    category: 'Pilgrimage',
    coordinates: { lat: 13.6833, lng: 79.3472 },
  },
  {
    id: 'hub-shirdi-temple',
    title: 'Shirdi Sai Baba Samadhi Temple',
    subtitle: 'Rahata Taluka, Ahmednagar / Ahilyanagar, Maharashtra',
    state: 'Maharashtra',
    district: 'Ahmednagar',
    subDivision: 'Rahata',
    subDivisionType: 'Taluka',
    locality: 'Shirdi Temple Complex',
    pinCode: '423109',
    category: 'Pilgrimage',
    coordinates: { lat: 19.7667, lng: 74.4764 },
  },
  {
    id: 'hub-puri-temple',
    title: 'Shree Jagannatha Temple Puri',
    subtitle: 'Puri Sadar, Puri District, Odisha',
    state: 'Odisha',
    district: 'Puri',
    subDivision: 'Puri Sadar',
    subDivisionType: 'Sub-division',
    locality: 'Grand Road Bada Danda',
    pinCode: '752001',
    category: 'Pilgrimage',
    coordinates: { lat: 19.8049, lng: 85.8179 },
  },
  {
    id: 'hub-vns-temple',
    title: 'Kashi Vishwanath Jyotirlinga Temple & Corridor',
    subtitle: 'Varanasi Tehsil, Varanasi, Uttar Pradesh',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    subDivision: 'Varanasi',
    subDivisionType: 'Tehsil',
    locality: 'Dashashwamedh Ghat Corridor',
    pinCode: '221001',
    category: 'Pilgrimage',
    coordinates: { lat: 25.3109, lng: 83.0107 },
  },
  {
    id: 'hub-ay-temple',
    title: 'Shri Ram Janmabhoomi Mandir (Ayodhya)',
    subtitle: 'Ramkot, Ayodhya Sadar, Uttar Pradesh',
    state: 'Uttar Pradesh',
    district: 'Ayodhya',
    subDivision: 'Ayodhya Sadar',
    subDivisionType: 'Tehsil',
    locality: 'Ram Janmabhoomi Complex',
    pinCode: '224123',
    category: 'Pilgrimage',
    coordinates: { lat: 26.7956, lng: 82.1943 },
  },
];

// Helper to search across the entire Indian database
export function searchIndianLocations(query: string): FlatLocationResult[] {
  if (!query || query.trim().length === 0) return [];
  const clean = query.trim().toLowerCase();

  const results: FlatLocationResult[] = [];

  // 1. Search Transit Hubs (Airports, Railway Stations, Bus Stands, Pilgrimages) first
  for (const hub of INDIA_TRANSIT_HUBS) {
    const titleMatch = hub.title.toLowerCase().includes(clean);
    const subtitleMatch = hub.subtitle.toLowerCase().includes(clean);
    const codeMatch = hub.code && hub.code.toLowerCase().includes(clean);
    const catMatch = hub.category.toLowerCase().includes(clean);

    if (titleMatch || subtitleMatch || codeMatch || catMatch) {
      results.push(hub);
    }
  }

  // 2. Search States, Districts, Mandals/Taluks, Towns, Villages
  for (const state of INDIA_STATES_DATA) {
    const stateMatches = state.name.toLowerCase().includes(clean);

    for (const district of state.districts) {
      const districtMatches = district.name.toLowerCase().includes(clean);

      for (const subDiv of district.subDivisions) {
        const subDivMatches = subDiv.name.toLowerCase().includes(clean);

        for (const loc of subDiv.locations) {
          const locMatches = loc.name.toLowerCase().includes(clean);
          const pinMatches = loc.pinCode && loc.pinCode.includes(clean);

          if (locMatches || pinMatches || subDivMatches || districtMatches || stateMatches) {
            results.push({
              id: loc.id,
              title: loc.name,
              subtitle: `${subDiv.name} ${subDiv.type}, ${district.name}, ${state.name}${loc.pinCode ? ` - ${loc.pinCode}` : ''}`,
              state: state.name,
              district: district.name,
              subDivision: subDiv.name,
              subDivisionType: subDiv.type,
              locality: loc.name,
              pinCode: loc.pinCode,
              coordinates: loc.coordinates,
              landmark: loc.type === 'landmark' ? loc.name : undefined,
            });
          }
        }
      }
    }
  }

  return results.slice(0, 20);
}

// Find nearest location entry based on coordinates (for GPS reverse-geocoding)
export function findNearestIndianLocation(lat: number, lng: number): FlatLocationResult {
  let minDistance = Infinity;
  let nearest: FlatLocationResult | null = null;

  for (const state of INDIA_STATES_DATA) {
    for (const district of state.districts) {
      for (const subDiv of district.subDivisions) {
        for (const loc of subDiv.locations) {
          const dLat = loc.coordinates.lat - lat;
          const dLng = loc.coordinates.lng - lng;
          const dist = Math.sqrt(dLat * dLat + dLng * dLng);

          if (dist < minDistance) {
            minDistance = dist;
            nearest = {
              id: loc.id,
              title: loc.name,
              subtitle: `${subDiv.name} ${subDiv.type}, ${district.name}, ${state.name}`,
              state: state.name,
              district: district.name,
              subDivision: subDiv.name,
              subDivisionType: subDiv.type,
              locality: loc.name,
              pinCode: loc.pinCode,
              coordinates: { lat, lng }, // retain exact GPS point
            };
          }
        }
      }
    }
  }

  // Fallback if none found
  if (!nearest) {
    return {
      id: 'gps-custom',
      title: 'Current GPS Location',
      subtitle: `${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E (India)`,
      state: 'Andhra Pradesh',
      district: 'Tirupati',
      subDivision: 'Tirupati Urban',
      subDivisionType: 'Mandal',
      locality: 'Current Coordinates',
      coordinates: { lat, lng },
    };
  }

  return nearest;
}

// Popular route pairs for instant quick-loading
export interface PopularRoutePreset {
  id: string;
  name: string;
  origin: FlatLocationResult;
  destination: FlatLocationResult;
  defaultMode: 'DRIVING' | 'TRANSIT' | 'TWO_WHEELER';
  tag: string;
}

export const POPULAR_ROUTE_PRESETS: PopularRoutePreset[] = [
  {
    id: 'pr-tpt-trm',
    name: 'Tirupati to Tirumala Ghat Road',
    tag: 'Pilgrimage Special',
    defaultMode: 'DRIVING',
    origin: {
      id: 'ap-tp-1',
      title: 'Tirupati Central (Alipiri Checkpoint)',
      subtitle: 'Tirupati Urban Mandal, Tirupati, Andhra Pradesh',
      state: 'Andhra Pradesh',
      district: 'Tirupati',
      subDivision: 'Tirupati Urban',
      subDivisionType: 'Mandal',
      locality: 'Tirupati Central',
      coordinates: { lat: 13.6288, lng: 79.4192 },
    },
    destination: {
      id: 'ap-tm-1',
      title: 'Sri Venkateswara Temple (Tirumala)',
      subtitle: 'Tirumala Hills Mandal, Tirupati, Andhra Pradesh',
      state: 'Andhra Pradesh',
      district: 'Tirupati',
      subDivision: 'Tirumala Hills',
      subDivisionType: 'Mandal',
      locality: 'Tirumala Temple',
      coordinates: { lat: 13.6833, lng: 79.3472 },
    },
  },
  {
    id: 'pr-chn-tpt',
    name: 'Chennai to Tirupati Pilgrimage Route',
    tag: 'Highway Express',
    defaultMode: 'DRIVING',
    origin: {
      id: 'tn-ch-4',
      title: 'Chennai Central Station',
      subtitle: 'Egmore Taluk, Chennai, Tamil Nadu',
      state: 'Tamil Nadu',
      district: 'Chennai',
      subDivision: 'Egmore',
      subDivisionType: 'Taluk',
      locality: 'Chennai Central',
      coordinates: { lat: 13.0827, lng: 80.2755 },
    },
    destination: {
      id: 'ap-tp-1',
      title: 'Tirupati Balaji Foothills',
      subtitle: 'Tirupati Urban Mandal, Tirupati, Andhra Pradesh',
      state: 'Andhra Pradesh',
      district: 'Tirupati',
      subDivision: 'Tirupati Urban',
      subDivisionType: 'Mandal',
      locality: 'Tirupati Central',
      coordinates: { lat: 13.6288, lng: 79.4192 },
    },
  },
  {
    id: 'pr-blr-tpt',
    name: 'Bengaluru to Tirupati Expressway',
    tag: 'Popular Corridor',
    defaultMode: 'DRIVING',
    origin: {
      id: 'ka-bn-2',
      title: 'Bengaluru Vidhana Soudha',
      subtitle: 'Bengaluru North Taluk, Bengaluru Urban, Karnataka',
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      subDivision: 'Bengaluru North',
      subDivisionType: 'Taluk',
      locality: 'Vidhana Soudha',
      coordinates: { lat: 12.9797, lng: 77.5907 },
    },
    destination: {
      id: 'ap-tp-1',
      title: 'Tirupati Sacred City',
      subtitle: 'Tirupati Urban Mandal, Tirupati, Andhra Pradesh',
      state: 'Andhra Pradesh',
      district: 'Tirupati',
      subDivision: 'Tirupati Urban',
      subDivisionType: 'Mandal',
      locality: 'Tirupati Central',
      coordinates: { lat: 13.6288, lng: 79.4192 },
    },
  },
  {
    id: 'pr-hyd-tpt',
    name: 'Hyderabad to Tirupati Heritage Expressway',
    tag: 'Interstate Highway',
    defaultMode: 'DRIVING',
    origin: {
      id: 'tg-kb-1',
      title: 'Hyderabad (Hussain Sagar / Khairatabad)',
      subtitle: 'Khairatabad Mandal, Hyderabad, Telangana',
      state: 'Telangana',
      district: 'Hyderabad',
      subDivision: 'Khairatabad',
      subDivisionType: 'Mandal',
      locality: 'Hussain Sagar',
      coordinates: { lat: 17.4239, lng: 78.4738 },
    },
    destination: {
      id: 'ap-tp-1',
      title: 'Tirupati Balaji Temple Base',
      subtitle: 'Tirupati Urban Mandal, Tirupati, Andhra Pradesh',
      state: 'Andhra Pradesh',
      district: 'Tirupati',
      subDivision: 'Tirupati Urban',
      subDivisionType: 'Mandal',
      locality: 'Tirupati Central',
      coordinates: { lat: 13.6288, lng: 79.4192 },
    },
  },
  {
    id: 'pr-tpt-tlk',
    name: 'Tirupati to Talakona Waterfall Trek',
    tag: 'Nature & Adventure',
    defaultMode: 'DRIVING',
    origin: {
      id: 'ap-tp-1',
      title: 'Tirupati City Center',
      subtitle: 'Tirupati Urban Mandal, Tirupati, Andhra Pradesh',
      state: 'Andhra Pradesh',
      district: 'Tirupati',
      subDivision: 'Tirupati Urban',
      subDivisionType: 'Mandal',
      locality: 'Tirupati Central',
      coordinates: { lat: 13.6288, lng: 79.4192 },
    },
    destination: {
      id: 'ap-yv-1',
      title: 'Talakona Waterfalls Eco-Park',
      subtitle: 'Yerravaripalem Mandal, Tirupati, Andhra Pradesh',
      state: 'Andhra Pradesh',
      district: 'Tirupati',
      subDivision: 'Yerravaripalem',
      subDivisionType: 'Mandal',
      locality: 'Talakona Waterfalls',
      coordinates: { lat: 13.8058, lng: 79.2158 },
    },
  },
];
