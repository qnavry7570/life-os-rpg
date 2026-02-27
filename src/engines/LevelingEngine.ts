export interface LevelData {
    level: number;
    title: string;
    titlePL: string;
    xpRequired: number;
    xpToNext: number;
    accentColor: string;
    badge: string;
}

export const LEVEL_TABLE: LevelData[] = [
    // TIER 1 — Nowicjusz (1-10) szary #8B8FA8
    { level: 1, titlePL: 'Nowicjusz', xpRequired: 0, xpToNext: 100, accentColor: '#8B8FA8', badge: '⚪', title: 'Novice' },
    { level: 2, titlePL: 'Uczeń', xpRequired: 100, xpToNext: 150, accentColor: '#8B8FA8', badge: '⚪', title: 'Apprentice' },
    { level: 3, titlePL: 'Poszukiwacz', xpRequired: 250, xpToNext: 200, accentColor: '#8B8FA8', badge: '⚪', title: 'Seeker' },
    { level: 4, titlePL: 'Wędrowiec', xpRequired: 450, xpToNext: 250, accentColor: '#8B8FA8', badge: '⚪', title: 'Wanderer' },
    { level: 5, titlePL: 'Zwiadowca', xpRequired: 700, xpToNext: 350, accentColor: '#8B8FA8', badge: '⚪', title: 'Scout' },
    { level: 6, titlePL: 'Podróżnik', xpRequired: 1050, xpToNext: 450, accentColor: '#8B8FA8', badge: '⚪', title: 'Traveler' },
    { level: 7, titlePL: 'Odkrywca', xpRequired: 1500, xpToNext: 550, accentColor: '#8B8FA8', badge: '⚪', title: 'Explorer' },
    { level: 8, titlePL: 'Awanturnik', xpRequired: 2050, xpToNext: 700, accentColor: '#8B8FA8', badge: '⚪', title: 'Adventurer' },
    { level: 9, titlePL: 'Tropiciel', xpRequired: 2750, xpToNext: 850, accentColor: '#8B8FA8', badge: '⚪', title: 'Pathfinder' },
    { level: 10, titlePL: 'Weteran', xpRequired: 3600, xpToNext: 1000, accentColor: '#8B8FA8', badge: '⚪', title: 'Veteran' },

    // TIER 2 — Adept (11-20) zielony #10B981
    { level: 11, titlePL: 'Adept', xpRequired: 4600, xpToNext: 1200, accentColor: '#10B981', badge: '🟢', title: 'Adept' },
    { level: 12, titlePL: 'Inicjowany', xpRequired: 5800, xpToNext: 1400, accentColor: '#10B981', badge: '🟢', title: 'Initiate' },
    { level: 13, titlePL: 'Praktykant', xpRequired: 7200, xpToNext: 1650, accentColor: '#10B981', badge: '🟢', title: 'Practitioner' },
    { level: 14, titlePL: 'Specjalista', xpRequired: 8850, xpToNext: 1900, accentColor: '#10B981', badge: '🟢', title: 'Specialist' },
    { level: 15, titlePL: 'Ekspert', xpRequired: 10750, xpToNext: 2200, accentColor: '#10B981', badge: '🟢', title: 'Expert' },
    { level: 16, titlePL: 'Czeladnik', xpRequired: 12950, xpToNext: 2550, accentColor: '#10B981', badge: '🟢', title: 'Journeyman' },
    { level: 17, titlePL: 'Rzemieślnik', xpRequired: 15500, xpToNext: 2900, accentColor: '#10B981', badge: '🟢', title: 'Craftsman' },
    { level: 18, titlePL: 'Artyzan', xpRequired: 18400, xpToNext: 3300, accentColor: '#10B981', badge: '🟢', title: 'Artisan' },
    { level: 19, titlePL: 'Wirtuoz', xpRequired: 21700, xpToNext: 3750, accentColor: '#10B981', badge: '🟢', title: 'Virtuoso' },
    { level: 20, titlePL: 'Czempion', xpRequired: 25450, xpToNext: 4300, accentColor: '#10B981', badge: '🟢', title: 'Champion' },

    // TIER 3 — Mistrz (21-30) niebieski #3B82F6
    { level: 21, titlePL: 'Mistrz', xpRequired: 29750, xpToNext: 5000, accentColor: '#3B82F6', badge: '🔵', title: 'Master' },
    { level: 22, titlePL: 'Mędrzec', xpRequired: 34750, xpToNext: 5800, accentColor: '#3B82F6', badge: '🔵', title: 'Sage' },
    { level: 23, titlePL: 'Mentor', xpRequired: 40550, xpToNext: 6700, accentColor: '#3B82F6', badge: '🔵', title: 'Mentor' },
    { level: 24, titlePL: 'Czarodziej', xpRequired: 47250, xpToNext: 7700, accentColor: '#3B82F6', badge: '🔵', title: 'Wizard' },
    { level: 25, titlePL: 'Arcymagik', xpRequired: 54950, xpToNext: 8800, accentColor: '#3B82F6', badge: '🔵', title: 'Archmage' },
    { level: 26, titlePL: 'Warlord', xpRequired: 63750, xpToNext: 10000, accentColor: '#3B82F6', badge: '🔵', title: 'Warlord' },
    { level: 27, titlePL: 'Strażnik', xpRequired: 73750, xpToNext: 11500, accentColor: '#3B82F6', badge: '🔵', title: 'Guardian' },
    { level: 28, titlePL: 'Paladyn', xpRequired: 85250, xpToNext: 13000, accentColor: '#3B82F6', badge: '🔵', title: 'Paladin' },
    { level: 29, titlePL: 'Krzyżowiec', xpRequired: 98250, xpToNext: 14800, accentColor: '#3B82F6', badge: '🔵', title: 'Crusader' },
    { level: 30, titlePL: 'Wielki Lord', xpRequired: 113050, xpToNext: 16800, accentColor: '#3B82F6', badge: '🔵', title: 'Highlord' },

    // TIER 4 — Legenda (31-40) złoty #F59E0B
    { level: 31, titlePL: 'Legenda', xpRequired: 129850, xpToNext: 19000, accentColor: '#F59E0B', badge: '🟡', title: 'Legend' },
    { level: 32, titlePL: 'Mit', xpRequired: 148850, xpToNext: 21500, accentColor: '#F59E0B', badge: '🟡', title: 'Myth' },
    { level: 33, titlePL: 'Heros', xpRequired: 170350, xpToNext: 24000, accentColor: '#F59E0B', badge: '🟡', title: 'Hero' },
    { level: 34, titlePL: 'Półbóg', xpRequired: 194350, xpToNext: 27000, accentColor: '#F59E0B', badge: '🟡', title: 'Demigod' },
    { level: 35, titlePL: 'Tytan', xpRequired: 221350, xpToNext: 30000, accentColor: '#F59E0B', badge: '🟡', title: 'Titan' },
    { level: 36, titlePL: 'Boski', xpRequired: 251350, xpToNext: 33500, accentColor: '#F59E0B', badge: '🟡', title: 'Divine' },
    { level: 37, titlePL: 'Niebiański', xpRequired: 284850, xpToNext: 37500, accentColor: '#F59E0B', badge: '🟡', title: 'Celestial' },
    { level: 38, titlePL: 'Wieczny', xpRequired: 322350, xpToNext: 42000, accentColor: '#F59E0B', badge: '🟡', title: 'Eternal' },
    { level: 39, titlePL: 'Nieśmiertelny', xpRequired: 364350, xpToNext: 47000, accentColor: '#F59E0B', badge: '🟡', title: 'Immortal' },
    { level: 40, titlePL: 'Wzniosły', xpRequired: 411350, xpToNext: 52000, accentColor: '#F59E0B', badge: '🟡', title: 'Ascendant' },

    // TIER 5 — Bóg (41-50) fioletowy #8B5CF6 / różowy #EC4899
    { level: 41, titlePL: 'Transcendentny', xpRequired: 463350, xpToNext: 58000, accentColor: '#8B5CF6', badge: '🔮', title: 'Transcendent' },
    { level: 42, titlePL: 'Wszechwiedny', xpRequired: 521350, xpToNext: 65000, accentColor: '#8B5CF6', badge: '🔮', title: 'Omniscient' },
    { level: 43, titlePL: 'Wszechmocny', xpRequired: 586350, xpToNext: 73000, accentColor: '#8B5CF6', badge: '🔮', title: 'Omnipotent' },
    { level: 44, titlePL: 'Wszechobecny', xpRequired: 659350, xpToNext: 82000, accentColor: '#8B5CF6', badge: '🔮', title: 'Omnipresent' },
    { level: 45, titlePL: 'Stwórca', xpRequired: 741350, xpToNext: 92000, accentColor: '#8B5CF6', badge: '🔮', title: 'Creator' },
    { level: 46, titlePL: 'Arbiter', xpRequired: 833350, xpToNext: 103000, accentColor: '#8B5CF6', badge: '🔮', title: 'Arbiter' },
    { level: 47, titlePL: 'Suwerenny', xpRequired: 936350, xpToNext: 115000, accentColor: '#8B5CF6', badge: '🔮', title: 'Sovereign' },
    { level: 48, titlePL: 'Najwyższy', xpRequired: 1051350, xpToNext: 129000, accentColor: '#8B5CF6', badge: '🔮', title: 'Supreme' },
    { level: 49, titlePL: 'Absolutny', xpRequired: 1180350, xpToNext: 144000, accentColor: '#8B5CF6', badge: '🔮', title: 'Absolute' },
    { level: 50, titlePL: 'Bóg Życia', xpRequired: 1324350, xpToNext: 0, accentColor: '#EC4899', badge: '👑', title: 'Godlike' },
];

export enum XPAction {
    POMODORO_COMPLETE = 'pomodoro_complete',
    QUEST_COMPLETE = 'quest_complete',
    DAILY_STEPS_GOAL = 'daily_steps_goal',
    WATER_GLASS = 'water_glass',
    PAGES_READ = 'pages_read',
    CALORIE_GOAL = 'calorie_goal',
    EXPEDITION_KM = 'expedition_km',
    LOGIN_STREAK = 'login_streak',
    ACHIEVEMENT_UNLOCK = 'achievement_unlock',
}

export function getXPForAction(action: XPAction): number {
    const map: Record<XPAction, number> = {
        [XPAction.POMODORO_COMPLETE]: 50,
        [XPAction.QUEST_COMPLETE]: 175,
        [XPAction.DAILY_STEPS_GOAL]: 100,
        [XPAction.WATER_GLASS]: 10,
        [XPAction.PAGES_READ]: 5,
        [XPAction.CALORIE_GOAL]: 120,
        [XPAction.EXPEDITION_KM]: 20,
        [XPAction.LOGIN_STREAK]: 25,
        [XPAction.ACHIEVEMENT_UNLOCK]: 100,
    };
    return map[action];
}

export function getLevelData(totalXP: number): {
    current: LevelData;
    next: LevelData | null;
    progressPercent: number;
    xpIntoLevel: number;
} {
    let current = LEVEL_TABLE[0];
    for (const lvl of LEVEL_TABLE) {
        if (totalXP >= lvl.xpRequired) current = lvl;
        else break;
    }
    const next = current.level < 50 ? LEVEL_TABLE[current.level] : null;
    const xpIntoLevel = totalXP - current.xpRequired;
    const progressPercent = current.xpToNext > 0
        ? Math.min(100, (xpIntoLevel / current.xpToNext) * 100)
        : 100;

    return { current, next, progressPercent, xpIntoLevel };
}

export function addXP(currentTotalXP: number, xpGained: number): {
    newTotalXP: number;
    leveledUp: boolean;
    newLevel: number;
    oldLevel: number;
    newTitlePL: string;
    accentColor: string;
} {
    const oldData = getLevelData(currentTotalXP);
    const newTotalXP = currentTotalXP + xpGained;
    const newData = getLevelData(newTotalXP);

    return {
        newTotalXP,
        leveledUp: newData.current.level > oldData.current.level,
        newLevel: newData.current.level,
        oldLevel: oldData.current.level,
        newTitlePL: newData.current.titlePL,
        accentColor: newData.current.accentColor,
    };
}
