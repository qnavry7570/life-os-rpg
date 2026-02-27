# 🚀 Quick Start Guide — Life OS RPG Dashboard

## Installation & Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The app will open at: `http://localhost:5173`

### 3. First Launch Experience

On first visit, the app automatically:
- ✅ Creates IndexedDB database `LifeOS_DB`
- ✅ Seeds hero profile (Level 1 "Odkrywca")
- ✅ Initializes 3 timer windows
- ✅ Creates 6 quest templates
- ✅ Generates 5 daily quests for today
- ✅ Sets up token system (Focus, Nature, Knowledge)
- ✅ Creates today's daily stats record

---

## 📱 Core Workflows

### Workflow 1: Track Calories (2 clicks)
1. Click **"+ Posiłek"** button in Calorie Engine card
2. Enter kcal amount (e.g., 650)
3. Optional: add meal name
4. Click **"Dodaj Posiłek"**
5. ✅ Balance updates instantly, chart refreshes

**Result**: Calorie balance increases, daily stats update

---

### Workflow 2: Hit Timer Window (1 click)
1. Scroll to **"Okna Timerów"** section
2. Find active timer (e.g., 🚶 Okno Ruchu)
3. Click **"Wykonano"** button
4. ✅ Timer resets, XP awarded, token earned

**Result**: 
- Timer resets to full duration
- Earn +50 XP (or +30/+80 depending on timer)
- Possibly earn Focus Token
- Daily stats increment `timerWindowsHit`

---

### Workflow 3: Complete Quest (automatic)
1. Scroll to **"Dzienne Questy"** section
2. Progress updates automatically when you:
   - Hit timers (focus quest)
   - Log meals (nutrition quest)
   - Add steps manually (movement quest)
3. ✅ Quest completes when progress reaches 100%

**Result**:
- Quest turns green with checkmark
- XP awarded immediately
- Focus tokens awarded (if quest gives them)
- Quest removed from active list

---

### Workflow 4: Level Up (automatic)
1. Earn XP from any source (quests, timers, streaks)
2. Watch XP bar at top fill up
3. ✅ When bar reaches 100%, you level up!

**Result**:
- Hero level increases
- XP bar resets
- Bonus XP awarded (level × 50)
- Celebration animation (future feature)

---

## 🎮 Daily Routine Example

### Morning (7:00 AM)
- [ ] Open app
- [ ] Check 5 daily quests
- [ ] Log breakfast calories
- [ ] Hit hydration timer (💧)

### Mid-Day (12:00 PM)
- [ ] Log lunch calories
- [ ] Hit movement timer (🚶)
- [ ] Start focus session (🎯)

### Evening (8:00 PM)
- [ ] Log dinner calories
- [ ] Check quest completion
- [ ] Review daily stats
- [ ] Check streak status

**End of Day Result**:
- 3+ timer windows hit = 🔥 Streak continues
- 3+ quests completed = 💯 High XP day
- Attributes will recalculate at midnight

---

## 🛠️ Troubleshooting

### Timer Not Updating
**Issue**: Timer shows wrong time
**Fix**: Refresh page — ticker will resume

### Quest Not Completing
**Issue**: Progress at 100% but not marked complete
**Fix**: Currently manual system — feature coming soon

### No Chart Data
**Issue**: Calorie chart empty
**Fix**: Add first meal or wait 10 minutes for auto-snapshot

### App Not Installing (PWA)
**Issue**: "Add to Home Screen" not appearing
**Fix**: Must be HTTPS or localhost. Run `npm run build` then `npm run preview`

---

## 🔧 Customization

### Change Hero Name
Edit `src/db/seed.ts`:
```typescript
heroName: 'Your Name Here',
heroClass: 'Explorer', // or 'Scholar', 'Warrior', 'Monk'
```

### Adjust Timer Durations
Edit `src/db/seed.ts` timers array:
```typescript
{
  id: 'movement_90',
  durationMinutes: 60, // Change from 90 to 60
  xpOnHit: 100, // Increase reward
}
```

### Add Custom Quest
Edit `src/db/seed.ts` quests array:
```typescript
{
  type: 'daily',
  title: 'My Custom Quest',
  targetMetric: 'steps',
  targetValue: 10000,
  xpReward: 150,
}
```

---

## 📊 Data Management

### View Database (Chrome DevTools)
1. F12 → Application tab
2. IndexedDB → LifeOS_DB
3. Browse all stores

### Reset All Data
```javascript
// In browser console:
indexedDB.deleteDatabase('LifeOS_DB')
// Refresh page to re-seed
```

### Export Data (coming soon)
Future feature: JSON export/import

---

## 🚀 Next Steps After Setup

1. **Use for 1 week** → validate core mechanics
2. **Track what annoys you** → prioritize fixes
3. **Add expedition map** → Leaflet.js integration
4. **Connect Google Fit** → auto-sync steps
5. **Build seasonal campaign** → monthly themes

---

## 📞 Need Help?

Check:
- Full README.md for detailed docs
- TypeScript types in `src/db/types.ts`
- Zustand store in `src/store/lifeOsStore.ts`
- Component structure in `src/components/`

**Happy questing!** 🎮✨
