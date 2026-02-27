export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
    id: string;
    titlePL: string;
    descriptionPL: string;
    icon: string;
    rarity: AchievementRarity;
    xpReward: number;
    category: 'fitness' | 'mind' | 'health' | 'expedition' | 'consistency';
    conditionType: 'steps_single_day' | 'steps_total' | 'pomodoro_sessions' |
    'calories_burned' | 'quests_completed' | 'water_glasses' |
    'pages_read' | 'expedition_km' | 'level_reached' | 'login_streak';
    conditionValue: number;
}

export const ACHIEVEMENTS: Achievement[] = [
    // COMMON — 50 XP
    { id: 'first_steps', titlePL: 'Pierwsze Kroki', descriptionPL: 'Przejdź 1000 kroków w ciągu dnia', icon: '👣', rarity: 'common', xpReward: 50, category: 'fitness', conditionType: 'steps_single_day', conditionValue: 1000 },
    { id: 'first_pomodoro', titlePL: 'Władca Czasu', descriptionPL: 'Ukończ pierwszą sesję Pomodoro', icon: '🍅', rarity: 'common', xpReward: 50, category: 'mind', conditionType: 'pomodoro_sessions', conditionValue: 1 },
    { id: 'hydration_start', titlePL: 'Hydro Bohater', descriptionPL: 'Wypij 8 szklanek wody w ciągu dnia', icon: '💧', rarity: 'common', xpReward: 50, category: 'health', conditionType: 'water_glasses', conditionValue: 8 },
    { id: 'first_quest', titlePL: 'Gracz Questów', descriptionPL: 'Ukończ pierwszy dzienny quest', icon: '📜', rarity: 'common', xpReward: 50, category: 'consistency', conditionType: 'quests_completed', conditionValue: 1 },
    { id: 'reader_start', titlePL: 'Mól Książkowy', descriptionPL: 'Przeczytaj łącznie 10 stron', icon: '📚', rarity: 'common', xpReward: 50, category: 'mind', conditionType: 'pages_read', conditionValue: 10 },
    { id: 'calorie_first', titlePL: 'Pożeracz Kalorii', descriptionPL: 'Spał 300 kcal w jednej sesji', icon: '🔥', rarity: 'common', xpReward: 50, category: 'fitness', conditionType: 'calories_burned', conditionValue: 300 },
    // RARE — 150 XP
    { id: '10k_steps', titlePL: 'Mistrz Kroków', descriptionPL: 'Przejdź 10 000 kroków w jednym dniu', icon: '🏃', rarity: 'rare', xpReward: 150, category: 'fitness', conditionType: 'steps_single_day', conditionValue: 10000 },
    { id: 'pomo_25', titlePL: 'Mistrz Pomodoro', descriptionPL: 'Ukończ łącznie 25 sesji Pomodoro', icon: '⏱️', rarity: 'rare', xpReward: 150, category: 'mind', conditionType: 'pomodoro_sessions', conditionValue: 25 },
    { id: 'quest_30', titlePL: 'Wojownik Questów', descriptionPL: 'Ukończ 30 dziennych questów', icon: '⚔️', rarity: 'rare', xpReward: 150, category: 'consistency', conditionType: 'quests_completed', conditionValue: 30 },
    { id: 'streak_7', titlePL: 'Tygodniowy Wojownik', descriptionPL: 'Loguj się przez 7 dni z rzędu', icon: '🔥', rarity: 'rare', xpReward: 150, category: 'consistency', conditionType: 'login_streak', conditionValue: 7 },
    { id: 'exp_100km', titlePL: 'Pionier Szlaków', descriptionPL: 'Przejdź łącznie 100 km na ekspedycji', icon: '🗺️', rarity: 'rare', xpReward: 150, category: 'expedition', conditionType: 'expedition_km', conditionValue: 100 },
    { id: 'level_10', titlePL: 'Doświadczony Weteran', descriptionPL: 'Osiągnij Poziom 10', icon: '⭐', rarity: 'rare', xpReward: 150, category: 'consistency', conditionType: 'level_reached', conditionValue: 10 },
    // EPIC — 300 XP
    { id: 'steps_200k', titlePL: 'Żelazny Piechur', descriptionPL: 'Przejdź łącznie 200 000 kroków (160 km)', icon: '🦾', rarity: 'epic', xpReward: 300, category: 'fitness', conditionType: 'steps_total', conditionValue: 200000 },
    { id: 'pomo_100', titlePL: 'Demon Skupienia', descriptionPL: 'Ukończ łącznie 100 sesji Pomodoro', icon: '😈', rarity: 'epic', xpReward: 300, category: 'mind', conditionType: 'pomodoro_sessions', conditionValue: 100 },
    { id: 'camino_half', titlePL: 'Pielgrzym Camino', descriptionPL: 'Przejdź 400 km na Camino de Santiago', icon: '🐚', rarity: 'epic', xpReward: 300, category: 'expedition', conditionType: 'expedition_km', conditionValue: 400 },
    { id: 'streak_30', titlePL: 'Miesięczna Legenda', descriptionPL: 'Loguj się przez 30 dni z rzędu', icon: '📅', rarity: 'epic', xpReward: 300, category: 'consistency', conditionType: 'login_streak', conditionValue: 30 },
    { id: 'level_25', titlePL: 'Wschodzący Arcymagik', descriptionPL: 'Osiągnij Poziom 25', icon: '🔮', rarity: 'epic', xpReward: 300, category: 'consistency', conditionType: 'level_reached', conditionValue: 25 },
    { id: 'pages_500', titlePL: 'Uczony Epok', descriptionPL: 'Przeczytaj łącznie 500 stron', icon: '📖', rarity: 'epic', xpReward: 300, category: 'mind', conditionType: 'pages_read', conditionValue: 500 },
    // LEGENDARY — 500 XP
    { id: 'camino_full', titlePL: 'Pielgrzym Świętego Jakuba', descriptionPL: 'Ukończ pełne 800 km Camino de Santiago', icon: '✝️', rarity: 'legendary', xpReward: 500, category: 'expedition', conditionType: 'expedition_km', conditionValue: 800 },
    { id: 'max_level', titlePL: 'Bóg Życia', descriptionPL: 'Osiągnij maksymalny Poziom 50', icon: '👑', rarity: 'legendary', xpReward: 500, category: 'consistency', conditionType: 'level_reached', conditionValue: 50 },
    { id: 'steps_1m', titlePL: 'Mistrz Maratonu', descriptionPL: 'Przejdź łącznie milion kroków (800 km)', icon: '🏆', rarity: 'legendary', xpReward: 500, category: 'fitness', conditionType: 'steps_total', conditionValue: 1000000 },
    { id: 'streak_365', titlePL: 'Wieczny Płomień', descriptionPL: 'Loguj się przez 365 dni z rzędu', icon: '🕯️', rarity: 'legendary', xpReward: 500, category: 'consistency', conditionType: 'login_streak', conditionValue: 365 },
    { id: 'pomo_500', titlePL: 'Tysiąc Godzin', descriptionPL: 'Ukończ 500 sesji Pomodoro (208+ godz.)', icon: '⚡', rarity: 'legendary', xpReward: 500, category: 'mind', conditionType: 'pomodoro_sessions', conditionValue: 500 },
    { id: 'all_quests_100', titlePL: 'Mistrz Misji', descriptionPL: 'Ukończ łącznie 100 dziennych questów', icon: '🎖️', rarity: 'legendary', xpReward: 500, category: 'consistency', conditionType: 'quests_completed', conditionValue: 100 },
];

export const RARITY_CONFIG = {
    common: { label: 'ZWYKŁA', color: '#8B8FA8', glow: 'rgba(139,143,168,0.3)', border: 'rgba(139,143,168,0.3)' },
    rare: { label: 'RZADKA', color: '#3B82F6', glow: 'rgba(59,130,246,0.4)', border: 'rgba(59,130,246,0.4)' },
    epic: { label: 'EPICKA', color: '#8B5CF6', glow: 'rgba(139,92,246,0.5)', border: 'rgba(139,92,246,0.5)' },
    legendary: { label: 'LEGENDARNA', color: '#F59E0B', glow: 'rgba(245,158,11,0.6)', border: 'rgba(245,158,11,0.6)' },
};
