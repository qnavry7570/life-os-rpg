# Life OS — RPG Dashboard 🎮

> Personal gamification life dashboard with real-time habit tracking, XP system, and 4-zone exploration.

![Life OS Dashboard](https://img.shields.io/badge/Status-Beta-green)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![React](https://img.shields.io/badge/React-18.2-blue)

**Life OS** transforms your daily habits into an engaging RPG experience with **4 life zones**: Health, Sanctuary, Work, and Social. Track calories, complete quests, use Pomodoro timer, level up your hero, and watch your real-life attributes grow.

---

## 🗺️ The 4 Zones

### ❤️ **Health Zone**
- 🚶 **Step Tracking**: Manual step input with daily goal progress
- ⚡ **Live Calorie Engine**: Real-time balance with 6-hour chart
- 🔥 **Configurable Burn Rate**: Click to change kcal/h
- 💧 **Water Intake**: Track glasses consumed

### 💼 **Work Zone**
- 🍅 **Pomodoro Timer**: 25 min work / 5 min break cycles
- 📋 **Daily Quests**: 5 auto-generated tasks with progress bars
- 🎯 **Focus Rewards**: +50 XP + Focus Token per Pomodoro
- ⚡ **Session Counter**: Track completed Pomodoros

### 🧘 **Sanctuary Zone**
- 🦸 **Hero Profile**: View level, XP, class, and streak
- ❤️ **Attributes Panel**: 5 bars (Vitality, Energy, Wisdom, Focus, Condition)
- 🎯 **Token Wallet**: Focus, Nature, Knowledge tokens
- 💤 **Rest Stats**: Sleep hours and meditation minutes

### 🤝 **Social Zone**
- 🚧 **Coming Soon**: Meetings, conversations, events tracking

### 📊 **Weekly Summary** (Floating Button)
- 📈 Total XP earned this week
- 🚶 Steps, 🍅 Pomodoros, ✅ Quests completed
- 💤 Average sleep
- 🔥 Streak status
- 🏆 Earned badges

---

## 🎮 Core Features

### ✅ Implemented

- **🗺️ Zone-Based Navigation**: 4 distinct life areas with specialized tools
- **🦸 Hero Progression**: Level, XP bar, 5 attributes, streak tracking
- **⚡ Real-Time Calorie Tracking**: Live balance with configurable burn rate
- **🍅 Pomodoro Timer**: Full 25/5 cycle with auto-rewards
- **📋 Quest System**: Daily quests with progress tracking
- **🎯 Token Economy**: Focus/Nature/Knowledge tokens
- **📊 Weekly Analytics**: Summary view with achievements
- **💾 Local-First Storage**: IndexedDB via Dexie.js
- **📱 PWA Ready**: Installable on mobile devices
- **🎨 Dark Gaming UI**: Cosmic theme with smooth animations

### 🚧 Roadmap

- **🗺️ Virtual Expedition Map** (next priority)
- **📸 GPS + Photo Quest Verification** 
- **⌚ Wearable Integration** (Google Fit, Garmin)
- **👥 Social Features** (contacts, meetings)
- **🌱 Seasonal Campaigns** (monthly themes)

---

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/life-os-rpg.git
cd life-os-rpg

# Install dependencies
npm install

# Run development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### First Launch

The app automatically:
- ✅ Initializes IndexedDB
- ✅ Creates hero profile (Level 1 "Odkrywca")
- ✅ Generates 5 daily quests
- ✅ Sets up 3 token types
- ✅ Displays 4-zone map

---

## 🎯 How to Use

### 1. Navigate Zones
- Open app → See 4-zone map
- Click **Health** → Track steps, log meals, monitor calories
- Click **Work** → Start Pomodoro, complete quests
- Click **Sanctuary** → View hero stats, attributes, tokens
- Click **Summary** button (bottom-right) → See weekly progress

### 2. Track Calories (Health Zone)
- Click **"+ Posiłek"** → Enter kcal
- Balance updates every minute
- Click **burn rate** to change kcal/h

### 3. Use Pomodoro (Work Zone)
- Click **"Start"** → 25-minute timer begins
- Work without interruption
- Auto-break after 25 minutes
- Earn +50 XP + Focus Token

### 4. Complete Quests (Work Zone)
- Progress updates automatically (manual input for now)
- Green checkmark when 100%
- XP awarded instantly

### 5. Check Weekly Progress
- Click floating **📊** button on map
- See total XP, steps, Pomodoros
- View earned badges
- Check streak status

---

## 📂 Project Structure

```
life-os-rpg/
├── src/
│   ├── components/
│   │   ├── Map/
│   │   │   └── ZoneMap.tsx           # 4-zone landing page
│   │   ├── Zones/
│   │   │   ├── HealthZone.tsx        # Steps + Calories
│   │   │   ├── WorkZone.tsx          # Pomodoro + Quests
│   │   │   ├── SanctuaryZone.tsx     # Hero + Attributes
│   │   │   └── SocialZone.tsx        # Coming soon
│   │   ├── Calories/
│   │   │   └── CalorieEngine.tsx     # Live balance + chart
│   │   ├── Quests/
│   │   │   └── DailyQuests.tsx       # Quest list
│   │   ├── Hero/
│   │   │   ├── HeroPanel.tsx         # Profile + XP
│   │   │   └── AttributesPanel.tsx   # 5 attribute bars
│   │   ├── Stats/
│   │   │   └── TokensPanel.tsx       # Tokens + daily stats
│   │   └── Summary/
│   │       └── WeeklySummary.tsx     # Weekly analytics
│   ├── db/
│   │   ├── types.ts                  # TypeScript interfaces
│   │   ├── database.ts               # Dexie schema
│   │   └── seed.ts                   # Initial data
│   ├── store/
│   │   └── lifeOsStore.ts            # Zustand state
│   ├── App.tsx                       # Main router
│   └── main.tsx                      # React entry
├── public/
├── index.html
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + TypeScript |
| **Build** | Vite 5 |
| **State** | Zustand |
| **Database** | IndexedDB (Dexie.js) |
| **Charts** | Recharts |
| **Styling** | Tailwind CSS |
| **PWA** | vite-plugin-pwa |
| **Icons** | Lucide React |

---

## 🌐 Deploy

### GitHub Pages

```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

Your app will be at: `https://yourusername.github.io/life-os-rpg/`

### Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Deploy (1 click)

### Netlify

1. `npm run build`
2. Drag `dist/` folder to [netlify.com](https://netlify.com)
3. Done!

---

## 📱 Install as PWA

### Android (Chrome)
1. Open app in Chrome
2. Menu (⋮) → "Add to Home screen"
3. App installs as standalone

### iOS (Safari)
1. Open in Safari
2. Share → "Add to Home Screen"
3. App appears on home screen

---

## 🎨 Features in Detail

### Pomodoro Timer
- **25 minutes work** → Auto-break (5 min)
- **Rewards**: +50 XP + 🎯 Focus Token
- **Counter**: Tracks completed sessions today
- **State**: Running → Break → Running cycle

### Calorie Engine
- **Live Balance**: Updates every 60 seconds
- **Configurable Burn Rate**: Click to change (default 80 kcal/h)
- **Meal Logging**: Add kcal + optional name
- **6-Hour Chart**: Visual history
- **Daily Stats**: Consumed vs Burned

### Weekly Summary
- **XP Earned**: Total for the week
- **Achievements**: Steps, Pomodoros, Quests
- **Badges**: Auto-awarded (Walker, Focused, Consistent)
- **Streak**: Days active
- **Next Week Goals**: Auto-suggestions

---

## 🔧 Configuration

### Change Hero Name

Edit `src/db/seed.ts`:

```typescript
heroName: 'Your Name',
heroClass: 'Explorer', // Explorer | Scholar | Warrior | Monk
```

### Adjust Burn Rate

Click on burn rate in Calorie Engine → Enter new value

### Customize Pomodoro

Edit `src/components/Zones/WorkZone.tsx`:

```typescript
const [pomodoroMinutes, setPomodoroMinutes] = useState(25) // Change to 30, 45, etc.
```

---

## 🐛 Known Issues

- **Timer phase transitions**: Sometimes require refresh
- **Quest progress**: Manual update only (auto-sync coming)
- **No expedition map yet**: Data model ready, UI pending

---

## 📄 License

MIT License — build whatever you want!

---

## 🙏 Acknowledgments

Inspired by:
- **Habitica** — habit RPG concept
- **Whiteout Survival** — timer mechanics
- **Garmin** — virtual expedition
- **Quantified Self** movement

---

## 📞 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 🚀 Roadmap

### Phase 2 (Next Weekend)
- [ ] Virtual expedition map with Leaflet.js
- [ ] Waypoint system (Camino de Santiago)
- [ ] Step → km conversion

### Phase 3
- [ ] GPS + photo verification
- [ ] Location-based quests

### Phase 4
- [ ] Google Fit / Garmin integration
- [ ] Auto-sync steps, sleep, HR

---

**Built with ❤️ for personal growth through gamification** 🎮✨

---

## 📚 Additional Documentation

- **[QUICKSTART.md](QUICKSTART.md)** — 5-minute setup guide
- **[GITHUB_SETUP.md](GITHUB_SETUP.md)** — How to push to GitHub
- **[DELIVERY.md](DELIVERY.md)** — Project delivery summary
