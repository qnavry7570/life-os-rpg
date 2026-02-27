export interface TrekWaypoint {
    name: string;
    km: number;
    emoji: string;
}

export type TrekRegion = 'poland' | 'europe' | 'americas' | 'asia' | 'cityWalk';
export type TrekDifficulty = 'easy' | 'medium' | 'hard' | 'epic' | 'legendary';

export interface Trek {
    id: string;
    name: string;
    nameEn: string;
    region: TrekRegion;
    country: string;
    flag: string;
    distanceKm: number;
    difficulty: TrekDifficulty;
    elevationM: number;       // max wzniesienie
    stepsPerKm: number;       // 1200 (łatwy) do 1600 (górski)
    description: string;
    descriptionPL: string;
    emoji: string;
    accentColor: string;      // Tailwind color dla UI
    centerLat: number;        // centrum mapy Leaflet
    centerLng: number;
    zoomLevel: number;
    route: [number, number][]; // tablica [lat, lng] punktów trasy (polyline)
    waypoints: TrekWaypoint[];
    xpReward: number;          // XP za ukończenie całości
    badge: string;             // nazwa odznaki achievement
}

export const TREKS: Trek[] = [
    // === POLSKA ===
    {
        id: "tatry_glowny",
        name: "Główny Szlak Tatrzański",
        nameEn: "Main Tatra Trail",
        region: "poland",
        country: "Polska",
        flag: "🇵🇱",
        distanceKm: 180,
        difficulty: "hard",
        elevationM: 2499,
        stepsPerKm: 1550,
        description: "Traverses the High Tatras ridge from Kasprowy Wierch to Rysy peak.",
        descriptionPL: "Główna grań Tatr Wysokich, szczyt Rysy 2499m n.p.m.",
        emoji: "⛰️",
        accentColor: "#3b82f6",
        centerLat: 49.23, centerLng: 19.98, zoomLevel: 10,
        route: [[49.23, 19.98], [49.25, 20.05], [49.22, 20.15], [49.18, 20.08]],
        waypoints: [
            { name: "Kasprowy Wierch", km: 0, emoji: "🚡" },
            { name: "Świnica", km: 45, emoji: "⛰️" },
            { name: "Zawrat", km: 90, emoji: "🏔️" },
            { name: "Rysy (2499m)", km: 180, emoji: "🏁" }
        ],
        xpReward: 3600, badge: "badge_tatry",
    },
    {
        id: "szlak_beskidzki",
        name: "Główny Szlak Beskidzki",
        nameEn: "Main Beskidy Trail",
        region: "poland", country: "Polska", flag: "🇵🇱",
        distanceKm: 496, difficulty: "medium", elevationM: 1725,
        stepsPerKm: 1400,
        descriptionPL: "Najdłuższy szlak w polskich górach, od Ustronia do Wołosatego.",
        description: "Longest trail in Polish mountains, 496 km.", emoji: "🌲",
        accentColor: "#10b981",
        centerLat: 49.55, centerLng: 19.8, zoomLevel: 8,
        route: [[49.72, 18.85], [49.65, 19.2], [49.55, 19.6], [49.4, 20.1], [49.25, 21.0], [49.1, 22.0], [49.05, 22.7]],
        waypoints: [
            { name: "Ustroń", km: 0, emoji: "🏁" },
            { name: "Babia Góra", km: 150, emoji: "⛰️" },
            { name: "Gorce", km: 280, emoji: "🌲" },
            { name: "Wołosate", km: 496, emoji: "🏁" }
        ],
        xpReward: 9920, badge: "badge_beskidy",
    },
    {
        id: "szlak_nadmorski",
        name: "Nadmorski Szlak Czerwony",
        nameEn: "Coastal Red Trail",
        region: "poland", country: "Polska", flag: "🇵🇱",
        distanceKm: 620, difficulty: "easy", elevationM: 120,
        stepsPerKm: 1250,
        descriptionPL: "Wzdłuż polskiego Bałtyku od Świnoujścia do Gdańska.",
        description: "Along the Polish Baltic coast.", emoji: "🌊",
        accentColor: "#06b6d4",
        centerLat: 54.35, centerLng: 17.5, zoomLevel: 7,
        route: [[53.92, 14.25], [54.15, 15.5], [54.2, 16.8], [54.35, 17.9], [54.4, 18.6], [54.52, 18.55]],
        waypoints: [
            { name: "Świnoujście", km: 0, emoji: "⚓" },
            { name: "Kołobrzeg", km: 150, emoji: "🏖️" },
            { name: "Łeba", km: 390, emoji: "🌊" },
            { name: "Gdańsk", km: 620, emoji: "🏙️" }
        ],
        xpReward: 7440, badge: "badge_coast",
    },

    // === EUROPA ===
    {
        id: "camino_santiago",
        name: "Camino de Santiago",
        nameEn: "Way of St. James",
        region: "europe", country: "Hiszpania", flag: "🇪🇸",
        distanceKm: 780, difficulty: "medium", elevationM: 1500,
        stepsPerKm: 1300,
        descriptionPL: "Słynna droga pielgrzymkowa do Santiago de Compostela.",
        description: "Famous pilgrimage route to Santiago de Compostela.", emoji: "✝️",
        accentColor: "#f59e0b",
        centerLat: 42.6, centerLng: -3.5, zoomLevel: 7,
        route: [[43.32, -1.92], [42.82, -1.65], [42.72, -2.93], [42.67, -3.5], [42.6, -4.65], [42.55, -5.57], [42.88, -8.54]],
        waypoints: [
            { name: "Saint-Jean-Pied-de-Port", km: 0, emoji: "🚶" },
            { name: "Pamplona", km: 75, emoji: "🐂" },
            { name: "Logroño", km: 190, emoji: "🍷" },
            { name: "Burgos", km: 350, emoji: "⛪" },
            { name: "León", km: 510, emoji: "🦁" },
            { name: "Santiago de Compostela", km: 780, emoji: "🏁" }
        ],
        xpReward: 15600, badge: "badge_camino",
    },
    {
        id: "tour_mont_blanc",
        name: "Tour du Mont Blanc",
        nameEn: "Tour du Mont Blanc",
        region: "europe", country: "Francja/Włochy/Szwajcaria", flag: "🇫🇷",
        distanceKm: 170, difficulty: "hard", elevationM: 4808,
        stepsPerKm: 1600,
        descriptionPL: "Okrążenie Mont Blanc przez 3 kraje. Korona Alp.",
        description: "Circumnavigation of Mont Blanc through 3 countries.", emoji: "🏔️",
        accentColor: "#8b5cf6",
        centerLat: 45.87, centerLng: 6.86, zoomLevel: 10,
        route: [[45.92, 6.87], [45.95, 7.05], [45.88, 7.12], [45.78, 7.07], [45.72, 6.98], [45.78, 6.72], [45.92, 6.87]],
        waypoints: [
            { name: "Chamonix", km: 0, emoji: "🏠" },
            { name: "Courmayeur (IT)", km: 50, emoji: "🇮🇹" },
            { name: "Champex (CH)", km: 110, emoji: "🇨🇭" },
            { name: "Chamonix (powrót)", km: 170, emoji: "🏁" }
        ],
        xpReward: 6800, badge: "badge_montblanc",
    },
    {
        id: "gr20_korsyka",
        name: "GR20 Korsyka",
        nameEn: "GR20 Corsica",
        region: "europe", country: "Francja (Korsyka)", flag: "🇫🇷",
        distanceKm: 180, difficulty: "epic", elevationM: 2706,
        stepsPerKm: 1650,
        descriptionPL: "Najtrudniejszy szlak w Europie. Dzika przyroda Korsyki.",
        description: "Toughest trail in Europe across wild Corsica.", emoji: "🔥",
        accentColor: "#ef4444",
        centerLat: 42.25, centerLng: 9.15, zoomLevel: 9,
        route: [[42.58, 8.93], [42.4, 9.0], [42.2, 9.12], [42.05, 9.18], [41.88, 9.22]],
        waypoints: [
            { name: "Calenzana (Północ)", km: 0, emoji: "🔥" },
            { name: "Vizzavona (Środek)", km: 90, emoji: "⛺" },
            { name: "Conca (Południe)", km: 180, emoji: "🏁" }
        ],
        xpReward: 7200, badge: "badge_gr20",
    },

    // === AMERYKI ===
    {
        id: "appalachian_trail",
        name: "Appalachian Trail",
        nameEn: "Appalachian Trail",
        region: "americas", country: "USA", flag: "🇺🇸",
        distanceKm: 3500, difficulty: "legendary", elevationM: 2037,
        stepsPerKm: 1400,
        descriptionPL: "Legendarny szlak wzdłuż wschodniego wybrzeża USA.",
        description: "Legendary trail along the US East Coast.", emoji: "🦅",
        accentColor: "#f97316",
        centerLat: 40.0, centerLng: -76.5, zoomLevel: 5,
        route: [[34.62, -84.19], [36.2, -83.5], [38.0, -79.5], [40.0, -76.5], [42.0, -73.5], [44.0, -71.0], [45.9, -68.92]],
        waypoints: [
            { name: "Springer Mtn, Georgia", km: 0, emoji: "🌺" },
            { name: "Shenandoah NP", km: 1400, emoji: "🦌" },
            { name: "Delaware Water Gap", km: 2100, emoji: "💧" },
            { name: "Mt Katahdin, Maine", km: 3500, emoji: "🏁" }
        ],
        xpReward: 70000, badge: "badge_appalachian",
    },
    {
        id: "inca_trail",
        name: "Inca Trail",
        nameEn: "Inca Trail",
        region: "americas", country: "Peru", flag: "🇵🇪",
        distanceKm: 43, difficulty: "hard", elevationM: 4215,
        stepsPerKm: 1700,
        descriptionPL: "Mistyczna droga Inków do Machu Picchu.",
        description: "Mystical Inca path to Machu Picchu.", emoji: "🏛️",
        accentColor: "#d97706",
        centerLat: -13.25, centerLng: -72.5, zoomLevel: 11,
        route: [[-13.52, -71.97], [-13.4, -72.2], [-13.32, -72.35], [-13.25, -72.52], [-13.16, -72.54]],
        waypoints: [
            { name: "Km 82 (Start)", km: 0, emoji: "🚶" },
            { name: "Warmihuañusca (4215m)", km: 18, emoji: "⛰️" },
            { name: "Machu Picchu", km: 43, emoji: "🏛️" }
        ],
        xpReward: 3440, badge: "badge_inca",
    },

    // === AZJA ===
    {
        id: "everest_base_camp",
        name: "Everest Base Camp",
        nameEn: "Everest Base Camp Trek",
        region: "asia", country: "Nepal", flag: "🇳🇵",
        distanceKm: 130, difficulty: "epic", elevationM: 5364,
        stepsPerKm: 1600,
        descriptionPL: "Baza pod najwyższą górą świata. Ikona trekkingu.",
        description: "Base camp of the world's highest mountain.", emoji: "🏔️",
        accentColor: "#ec4899",
        centerLat: 27.98, centerLng: 86.82, zoomLevel: 10,
        route: [[27.69, 86.71], [27.72, 86.71], [27.8, 86.72], [27.9, 86.76], [27.98, 86.82]],
        waypoints: [
            { name: "Lukla (2860m)", km: 0, emoji: "✈️" },
            { name: "Namche Bazaar", km: 32, emoji: "🏘️" },
            { name: "Tengboche", km: 60, emoji: "🙏" },
            { name: "EBC (5364m)", km: 130, emoji: "🏔️" }
        ],
        xpReward: 10400, badge: "badge_everest",
    },
    {
        id: "nakasendo_japonia",
        name: "Droga Nakasendo",
        nameEn: "Nakasendo Way",
        region: "asia", country: "Japonia", flag: "🇯🇵",
        distanceKm: 534, difficulty: "medium", elevationM: 1200,
        stepsPerKm: 1350,
        descriptionPL: "Historyczna droga samurajów z Edo do Kioto.",
        description: "Historic samurai road from Edo to Kyoto.", emoji: "⛩️",
        accentColor: "#ef4444",
        centerLat: 35.9, centerLng: 137.2, zoomLevel: 7,
        route: [[35.69, 139.69], [35.9, 137.9], [35.58, 136.93], [35.01, 135.76]],
        waypoints: [
            { name: "Tokio (Nihonbashi)", km: 0, emoji: "🗼" },
            { name: "Magome", km: 340, emoji: "⛩️" },
            { name: "Kioto (Sanjo)", km: 534, emoji: "🏁" }
        ],
        xpReward: 10680, badge: "badge_nakasendo",
    },

    // === SPACERY MIEJSKIE ===
    {
        id: "city_tokyo",
        name: "Tokio — Shinjuku & Harajuku",
        nameEn: "Tokyo City Walk",
        region: "cityWalk", country: "Japonia", flag: "🇯🇵",
        distanceKm: 12, difficulty: "easy", elevationM: 45,
        stepsPerKm: 1250,
        descriptionPL: "Neonowe ulice Shinjuku, świątynia Meiji, Takeshita Street.",
        description: "Neon streets of Shinjuku, Meiji Shrine, Harajuku.", emoji: "🗼",
        accentColor: "#ec4899",
        centerLat: 35.672, centerLng: 139.70, zoomLevel: 14,
        route: [
            [35.6896, 139.6917], [35.6852, 139.7019], [35.6762, 139.7031],
            [35.6718, 139.7003], [35.6654, 139.7025], [35.6584, 139.7022]
        ],
        waypoints: [
            { name: "Shinjuku Station", km: 0, emoji: "🚉" },
            { name: "Shinjuku Gyoen", km: 2, emoji: "🌸" },
            { name: "Meiji Jingu", km: 5.5, emoji: "⛩️" },
            { name: "Takeshita Street", km: 8, emoji: "👗" },
            { name: "Harajuku Omotesando", km: 12, emoji: "🛍️" }
        ],
        xpReward: 600, badge: "badge_tokyo",
    },
    {
        id: "city_nyc",
        name: "Nowy Jork — Manhattan Loop",
        nameEn: "NYC Manhattan Walk",
        region: "cityWalk", country: "USA", flag: "🇺🇸",
        distanceKm: 22, difficulty: "easy", elevationM: 30,
        stepsPerKm: 1200,
        descriptionPL: "Central Park, Times Square, Brooklyn Bridge, Wall Street.",
        description: "Central Park, Times Square, Brooklyn Bridge, Wall Street.", emoji: "🗽",
        accentColor: "#3b82f6",
        centerLat: 40.748, centerLng: -73.985, zoomLevel: 13,
        route: [
            [40.7829, -73.9654], [40.7580, -73.9855], [40.7551, -73.9870],
            [40.7484, -73.9856], [40.7128, -74.0059], [40.7064, -73.9969],
            [40.7061, -73.9969], [40.7260, -73.9938]
        ],
        waypoints: [
            { name: "Central Park North", km: 0, emoji: "🌳" },
            { name: "Times Square", km: 5, emoji: "🎭" },
            { name: "Empire State Bldg", km: 8, emoji: "🏢" },
            { name: "Brooklyn Bridge", km: 14, emoji: "🌉" },
            { name: "Wall Street", km: 18, emoji: "💵" },
            { name: "Battery Park", km: 22, emoji: "🗽" }
        ],
        xpReward: 1100, badge: "badge_nyc",
    },
    {
        id: "city_london",
        name: "Londyn — West End & Thames",
        nameEn: "London West End Walk",
        region: "cityWalk", country: "UK", flag: "🇬🇧",
        distanceKm: 8, difficulty: "easy", elevationM: 25,
        stepsPerKm: 1200,
        descriptionPL: "Buckingham Palace, St James Park, Trafalgar Square, South Bank.",
        description: "Buckingham Palace, Trafalgar Square, Thames South Bank.", emoji: "🎡",
        accentColor: "#dc2626",
        centerLat: 51.503, centerLng: -0.127, zoomLevel: 14,
        route: [
            [51.5014, -0.1419], [51.5025, -0.1347], [51.5074, -0.1278],
            [51.5077, -0.1246], [51.5007, -0.1246], [51.5055, -0.0754]
        ],
        waypoints: [
            { name: "Buckingham Palace", km: 0, emoji: "👑" },
            { name: "Trafalgar Square", km: 2, emoji: "🦁" },
            { name: "London Eye", km: 4.5, emoji: "🎡" },
            { name: "Tate Modern", km: 6.5, emoji: "🎨" },
            { name: "Borough Market", km: 8, emoji: "🥐" }
        ],
        xpReward: 400, badge: "badge_london",
    },
    {
        id: "city_rome",
        name: "Rzym — Wieczne Miasto",
        nameEn: "Rome Eternal City Walk",
        region: "cityWalk", country: "Włochy", flag: "🇮🇹",
        distanceKm: 10, difficulty: "easy", elevationM: 45,
        stepsPerKm: 1200,
        descriptionPL: "Koloseum, Forum Romanum, Fontanna di Trevi, Panteon.",
        description: "Colosseum, Roman Forum, Trevi Fountain, Pantheon.", emoji: "🏛️",
        accentColor: "#f59e0b",
        centerLat: 41.892, centerLng: 12.481, zoomLevel: 14,
        route: [
            [41.8902, 12.4922], [41.8925, 12.4853], [41.8998, 12.4777],
            [41.9009, 12.4833], [41.8986, 12.4769], [41.9004, 12.4665]
        ],
        waypoints: [
            { name: "Koloseum", km: 0, emoji: "🏟️" },
            { name: "Forum Romanum", km: 1.5, emoji: "🏛️" },
            { name: "Fontanna di Trevi", km: 4, emoji: "💧" },
            { name: "Panteon", km: 5.5, emoji: "🎭" },
            { name: "Piazza Navona", km: 7, emoji: "🎨" },
            { name: "Castel Sant'Angelo", km: 10, emoji: "⚔️" }
        ],
        xpReward: 500, badge: "badge_rome",
    },
];
