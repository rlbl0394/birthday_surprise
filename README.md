# 🎮 Interactive Games Collection

A fun, multilingual web application featuring engaging mini-games with beautiful animated backgrounds and global accessibility.

## ✨ Features

### 🌍 Multilingual Support
- **7 Languages**: English, Spanish, Chinese, French, Hindi, Filipino, Japanese
- Real-time language switching throughout the entire experience
- Seamless translation of all UI elements and game content

### 🎮 Interactive Mini-Games

#### Fortune Cookie Game
- Click to crack open fortune cookies
- Reveal inspirational and motivational messages
- Beautiful animations and sound effects

#### Emoji Pop
- Fast-paced clicking game with combo multiplier system
- **30-second timer** with progressive difficulty that scales with your multiplier
- Build combo streaks for up to **6x score multiplier** (every 5 pops = +1x)
- **Dynamic Difficulty**: Game gets harder as multiplier increases
  - x1: 900ms spawn, 3.0s lifetime, 3.0rem size
  - x6: 500ms spawn, 1.5s lifetime, 2.5rem size (fastest)
- Rainbow glow effects and visual multiplier popups
- Combo meter showing streak progress
- High score tracking with local leaderboard
- Confetti celebration for new records

#### Emoji Catch
- Strategic catching game with life system
- Catch good emojis while avoiding **6 types of bad emojis** (💣☠️👻🔥⚡💀)
- **3-heart life system** - lose a life for each bad emoji caught
- Bad emojis feature **red pulsing glow** animation for easy identification
- **Visual Life Feedback**:
  - Red border pulse animation when losing a life
  - Faint heartbreak emoji (💔) popup appears briefly
  - Prominent continuous red glow warning when only 1 life remains
- Full-page mouse tracking for basket movement
- Purple/magenta gradient background for better emoji visibility
- Game over when all lives are lost
- Fixed 500px gameplay box with stable UI elements
- Progressive difficulty (Easy → Hard mode)
- Score tracking with local leaderboard

### 🎨 Visual Polish
- **Animated Gradient Backgrounds**: Subtly moving, dancing colors on all pages
- **Game-Specific Backgrounds**: Custom gradients for each game
- **Smooth Animations**: Professional transitions and particle effects
- **Life Loss Effects**: Red border pulse, heartbreak emoji popup, and low-life warning glow
- **Multiplier Feedback**: Faint popup display and rainbow glow pulsation on combo thresholds
- **Fixed UI Elements**: Stable gameplay boxes with consistent stat displays
- **Centered Layouts**: Optimized content positioning with minimal scrolling
- **Pause System**: Spacebar or button to pause games with visual overlay
- **Responsive Design**: Optimized for all screen sizes
- **Color-Coded Buttons**: Orange Start/Play Again, Blue Pause, Orange Restart for visual clarity
- **Background Music**: Toggle-able ambient music throughout

### 🏆 Game Features
- **Combo System (Emoji Pop)**: Build streaks for multipliers (every 5 pops = +1x, max 6x)
- **Life System (Emoji Catch)**: 3 hearts with visual indicators (❤️ or 💔)
- **Visual Feedback**: Rainbow glow effects, pulsing animations, multiplier popups
- **Persistent Leaderboards**: Scores saved locally for both games
- **Pause/Resume**: Full game state preservation during pause
- **Countdown System**: 3-2-1-GO countdown before game start and resume
- **Sound Effects**: Subtle, non-intrusive audio feedback
- **Keyboard Controls**: Enter to start, Spacebar to pause
- **Exit Confirmations**: Custom popups prevent accidental navigation during active games

## 🚀 Quick Start

### Local Development

1. **Install Dependencies**
```powershell
pip install -r requirements.txt
```

2. **Run the Application**
```powershell
python app.py
```

3. **Open in Browser**
Navigate to: **http://127.0.0.1:5000**

### Deployment

This app is ready to deploy on platforms like Render, Railway, or PythonAnywhere.

**For Render:**
1. Push code to GitHub
2. Connect repository to Render
3. Use build command: `pip install -r requirements.txt`
4. Use start command: `gunicorn app:app`

## 📁 Project Structure

```
becca_games/
├── app.py                      # Flask application & routes
├── requirements.txt            # Python dependencies (Flask, Werkzeug, Gunicorn)
├── .gitignore                 # Git exclusions
├── static/
│   ├── css/
│   │   ├── style.css          # Global styles, animated backgrounds
│   │   └── games.css          # Game-specific styles & animations
│   ├── js/
│   │   ├── animations.js      # Translation system (7 languages), UI interactions
│   │   ├── fortune_cookie.js  # Fortune cookie game logic
│   │   ├── emoji_pop.js       # Emoji Pop game with pause/leaderboard
│   │   ├── emoji_catch.js     # Emoji Catch game with pause/leaderboard
│   │   └── games.js           # Games menu interactions
│   └── images/
│       └── (game assets if needed)
└── templates/
    ├── base.html              # Base template with language selector
    ├── home.html              # Welcome/landing page
    ├── games_menu.html        # Games selection hub
    ├── fortune_cookie.html    # Fortune cookie game page
    ├── emoji_pop.html         # Emoji Pop game page
    └── emoji_catch.html       # Emoji Catch game page
```

## 🎯 Gameplay Details

### Emoji Pop Game
- Click emojis before they disappear to build combo streaks
- Every 5 pops increases multiplier (x2, x3, x4, x5, x6)
- **Multiplier-Based Difficulty**: Game progressively gets harder as you build combos
  - Higher multipliers = faster spawning, smaller emojis, shorter lifetimes
- Visual feedback: rainbow glow intensity scales with streak, faint multiplier popup appears when crossing thresholds
- Combo meter shows progress toward next multiplier level
- Missing an emoji resets your combo streak to 0
- Pause anytime with spacebar or pause button
- Beat high scores for confetti celebration

### Emoji Catch Game
- Move basket with mouse anywhere on the page (not limited to game area)
- Catch falling good emojis while avoiding bad emojis
- Bad emojis (30% spawn chance) have red pulsing glow for easy identification
- Start with 3 lives (hearts ❤️) - lose one for each bad emoji caught
- **Visual Life Feedback**:
  - Red border pulse animation when losing a life
  - Faint heartbreak emoji (💔) popup appears briefly
  - Prominent continuous red glow warning when only 1 life remains
- Game ends when all lives are lost
- Purple/magenta gradient background enhances emoji visibility
- Focus on maximizing caught emojis while managing your lives strategically
- Progressive difficulty: Easy mode (1000ms spawn) → Hard mode (600ms spawn)
- Compete for top leaderboard position

## 🛠️ Technologies Used

- **Backend**: Flask 3.0.0, Gunicorn (production server)
- **Frontend**: HTML5, CSS3 (animations, gradients, flexbox/grid)
- **JavaScript**: Vanilla JS (no frameworks)
- **Fonts**: Google Fonts (Playfair Display, Lato)
- **Audio**: External CDN-hosted sound effects and music
- **Storage**: LocalStorage for leaderboards and game state

## 🎨 Customization

### Adding Languages
Edit `static/js/animations.js` and add translations to the `translations` object.

### Modifying Game Difficulty
Adjust spawn rates, speeds, combo thresholds, and life counts in:
- `static/js/emoji_pop.js`:
  - Combo multiplier cap (line ~755): `Math.min(1 + Math.floor(streak / 5), 6)`
  - Multiplier-based spawn rates (lines ~649-660)
  - Multiplier-based lifetimes (lines ~705-716)
  - Emoji sizes by multiplier (lines ~685-696)
- `static/js/emoji_catch.js`:
  - Starting lives (line ~15): `let lives = 3`
  - Bad emoji spawn chance (line ~475): `Math.random() < 0.3`
  - Bad emoji types (line ~14): Array of 6 bad emojis
  - Spawn rates (lines ~588-596): Easy 1000ms, Hard 600ms

### Changing Backgrounds
Edit animated gradients in `static/css/style.css` (search for `@keyframes gradientShift`)

## 🐛 Known Features

- Games pause during countdown (emojis freeze until "GO!")
- Leaderboards persist across sessions using LocalStorage
- Sound effects automatically muted when music is toggled off

## 📝 Credits

**Created by R.B. Lorenzo** • Made with ❤️

---

**Enjoy playing the games!** 🎮
