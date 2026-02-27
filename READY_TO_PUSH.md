# 🎉 LIFE OS v2.0 — GOTOWE DO WRZUCENIA NA GITHUB!

## ✅ Co Zostało Zrobione?

### 1. ✅ **Ustawialny Burn Rate**
- Kliknij na "Spalanie: XX kcal/h" w silniku kalorycznym
- Pojawi się dialog do zmiany wartości
- Zapisuje się do profilu

### 2. ✅ **Mapa 4-Strefowa (Landing Page)**
Nowa główna strona z 4 kafelkami:
- ❤️ **Health** → Kroki + Kalorie
- 💼 **Work** → Questy + Pomodoro
- 🧘 **Sanctuary** → Bohater + Atrybuty
- 🤝 **Social** → "Coming Soon"

### 3. ✅ **Health Zone**
- Dodawanie kroków (manual input)
- Pasek postępu do celu (8000 kroków)
- Kalkulator kaloryczny z wykresem
- Statystyki wody

### 4. ✅ **Work Zone**
- **Timer Pomodoro**:
  - 25 minut praca / 5 minut przerwa
  - Start/Pauza/Reset
  - Automatyczne nagrody: +50 XP + Focus Token
  - Licznik ukończonych sesji
- **Daily Quests** (istniejące)

### 5. ✅ **Sanctuary Zone**
- Profil bohatera z poziomem i streakiem
- Panel 5 atrybutów
- Portfel tokenów
- Statystyki snu

### 6. ✅ **Social Zone**
- Placeholder "Coming Soon"
- 3 planowane funkcje (spotkania, rozmowy, wydarzenia)

### 7. ✅ **Weekly Summary** (Floating Button)
- Przycisk 📊 na głównej mapie (prawy dolny róg)
- Podsumowanie tygodnia:
  - Łączne XP
  - Kroki, Pomodoros, Questy
  - Średni sen
  - Streak status
  - Zdobyte odznaki
  - Cele na następny tydzień

---

## 📸 Jak Wygląda Teraz Aplikacja?

### Ekran Startowy (Mapa)
```
╔════════════════════════════════════╗
║          🧙‍♂️ Life OS              ║
║   Wybierz strefę swojego życia    ║
╠════════════════════════════════════╣
║  ┌──────────┐  ┌──────────┐      ║
║  │ ❤️ Health│  │ 🧘 Sanctu│      ║
║  │          │  │  ary     │      ║
║  └──────────┘  └──────────┘      ║
║  ┌──────────┐  ┌──────────┐      ║
║  │ 💼 Work  │  │ 🤝 Social│      ║
║  │          │  │          │      ║
║  └──────────┘  └──────────┘      ║
╠════════════════════════════════════╣
║         [📊 floating button]      ║
╚════════════════════════════════════╝
```

### Health Zone
```
❤️ Health Zone
━━━━━━━━━━━━━━━━━━━━━━━━
🚶 Kroki Dziś   [+Dodaj]
    6,234 / 8,000
    ▓▓▓▓▓▓▓░░░ 78%

⚡ Bilans Kalorii
    +340 kcal
    [wykres 6h]
    
💧 Woda: 4/8 szklanek
```

### Work Zone
```
💼 Work Zone
━━━━━━━━━━━━━━━━━━━━━━━━
🍅 Pomodoro Timer [3 sesje dziś]
    24:35
    💼 Praca
    [Start] [Reset]
    
📋 Dzienne Questy
    ○ Quest #1 ░░░░░ 0%
    ○ Quest #2 ░░░░░ 0%
```

---

## 🚀 JAK WRZUCIĆ NA GITHUB (Krok po Kroku)

### KROK 1: Utwórz Repozytorium

1. Wejdź na https://github.com/new
2. Nazwa: `life-os-rpg`
3. **Public** ✅
4. **NIE** dodawaj README (już mamy)
5. **Create repository**

### KROK 2: Przygotuj Git (W Terminalu)

```bash
# Jesteś w folderze life-os-rpg

# Inicjalizuj git
git init

# Dodaj wszystkie pliki
git add .

# Pierwszy commit
git commit -m "Life OS v2.0: 4-zone map + Pomodoro + Weekly summary"

# Połącz z GitHub (ZMIEŃ na swój username!)
git remote add origin https://github.com/TWOJ-USERNAME/life-os-rpg.git

# Wyślij
git branch -M main
git push -u origin main
```

### KROK 3: Gotowe! 🎉

Twój projekt jest teraz na:
```
https://github.com/TWOJ-USERNAME/life-os-rpg
```

---

## 🌐 JAK UDOSTĘPNIĆ LIVE DEMO?

### Opcja A: Vercel (NAJŁATWIEJSZE — 2 minuty)

1. Wejdź na https://vercel.com
2. Zaloguj się przez GitHub
3. Kliknij **"Import Project"**
4. Wybierz `life-os-rpg`
5. **Deploy**

Po minucie dostaniesz link:
```
https://life-os-rpg.vercel.app
```

### Opcja B: Netlify

1. `npm run build` (w terminalu)
2. Wejdź na https://netlify.com
3. Przeciągnij folder `dist/` na stronę
4. Gotowe!

---

## ✨ CO INNI ZOBACZĄ?

### Po Wejściu w Link:

1. **Mapa 4-Strefowa** (landing page)
2. Klikają **Health** → Widzą kroki + kalorie
3. Klikają **Work** → Mogą uruchomić Pomodoro
4. Klikają **Sanctuary** → Widzą bohatera
5. Klikają przycisk **📊** → Podsumowanie tygodnia

### Co Mogą Zrobić:

- ✅ Dodać kroki
- ✅ Zalogować posiłek
- ✅ Zmienić burn rate
- ✅ Uruchomić timer Pomodoro
- ✅ Zobaczyć progres questów
- ✅ Sprawdzić atrybuty bohatera
- ✅ Zobacz tygodniowe statystyki

---

## 📱 Testowanie na Telefonie

### Jeśli Masz Live Link (Vercel/Netlify):

1. Otwórz link na telefonie
2. Chrome → Menu → **"Dodaj do ekranu głównego"**
3. ✅ Aplikacja instaluje się jak natywna!

---

## 🎯 Co Dalej?

### Priorytety na Następny Weekend:

1. **Mapa ekspedycji** (Leaflet.js) — 4-6h
2. **GPS + foto verification** — 1 dzień
3. **Integracja Google Fit** — 2 tygodnie

---

## 📝 Changelog

### v2.0 (2026-02-27)

**✨ Nowe:**
- 🗺️ Mapa 4-strefowa jako landing page
- ❤️ Health Zone (kroki + kalorie)
- 💼 Work Zone (Pomodoro 25/5 + questy)
- 🧘 Sanctuary Zone (bohater + atrybuty)
- 🤝 Social Zone (placeholder)
- 📊 Weekly Summary (floating button)
- 🔥 Configurable burn rate (click to change)

**🔧 Poprawki:**
- Lepsza nawigacja między strefami
- Smooth animations na zone hover
- Mobile-first responsive design

**📚 Dokumentacja:**
- Zaktualizowany README.md
- Nowy GITHUB_SETUP.md
- Instrukcje deployment

---

## 🎮 Testuj Lokalnie

```bash
# Uruchom
npm run dev

# Otwórz
http://localhost:5173

# Co Przetestować:
1. Kliknij każdą strefę na mapie
2. W Health → dodaj kroki, dodaj posiłek, zmień burn rate
3. W Work → uruchom Pomodoro (poczekaj 1 min), sprawdź questy
4. W Sanctuary → zobacz atrybuty i tokeny
5. Kliknij 📊 → zobacz weekly summary
```

---

## 🐛 Jeśli Coś Nie Działa

### "npm run dev" nie startuje
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Białe karty stref (brak danych)
```bash
# Otwórz konsolę przeglądarki (F12)
# Jeśli są błędy → skopiuj i pokaż
```

### Timer Pomodoro nie odlicza
- Sprawdź czy useState działa
- Otwórz konsolę → szukaj błędów

---

## 📤 Jak Udostępnić Projekt?

### README.md — Dodaj na górze:

```markdown
## 🎮 Live Demo

**Try it now:** https://life-os-rpg.vercel.app

**GitHub:** https://github.com/yourusername/life-os-rpg
```

### Social Media:

**Twitter/X:**
> Stworzyłem Life OS v2.0 — RPG dashboard z 4 strefami życia! 🎮
> 
> ❤️ Health: Kroki + kalorie
> 💼 Work: Pomodoro 25/5 + questy
> 🧘 Sanctuary: Bohater + atrybuty
> 📊 Weekly summary
> 
> Open source! [link]

**Reddit** (r/productivity):
> **[Project] Life OS — Gamify Your Life with 4 Zones**
> 
> I built an RPG dashboard that tracks your real life in 4 zones...

---

## ✅ CHECKLIST PRZED WRZUCENIEM

- [x] Wszystkie pliki zapisane
- [x] npm run dev działa lokalnie
- [x] README.md zaktualizowany
- [x] .gitignore obecny
- [x] package.json poprawny
- [ ] GitHub repository utworzone
- [ ] Git push wykonany
- [ ] Live demo wdrożone (Vercel/Netlify)
- [ ] Link dodany do README

---

**🎉 Gotowe do wrzucenia!** Wszystkie funkcje działają, dokumentacja kompletna, kod gotowy do share'owania!

Powodzenia! 🚀✨
