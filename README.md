# 🎂 Birthday Surprise Web App

An elegant, multilingual interactive birthday experience featuring beautiful animated backgrounds, fortune cookie wisdom, and engaging emoji-based mini-games.

## ✨ Features

### 🌍 Multilingual Support
- **7 Languages**: English, Spanish, Chinese, French, Hindi, Filipino, Japanese
- Real-time language switching throughout the entire experience
- Seamless translation of all UI elements and messages

### 🎮 Interactive Mini-Games
- **Fortune Cookie Game**: Click to crack open fortune cookies and reveal personalized birthday messages
- **Emoji Pop**: Fast-paced clicking game where you pop emojis before they disappear
  - 30-second timer with progressive difficulty
  - Easy mode (first 10s) → Hard mode (last 20s with faster spawning)
  - High score tracking with local leaderboard
  - Confetti celebration for new records
- **Emoji Catch**: Catch falling emojis in your basket
  - Dynamic difficulty progression
  - Score tracking and miss counter
  - Local leaderboard system

### 🎨 Visual Polish
- **Animated Gradient Backgrounds**: Subtly moving, dancing colors on all pages
- **Smooth Animations**: Professional transitions and particle effects
- **Pause System**: Spacebar or button to pause games with visual overlay
- **Responsive Design**: Optimized for all screen sizes
- **Background Music**: Toggle-able ambient music throughout

### 🏆 Game Features
- **Persistent Leaderboards**: Scores saved locally for both games
- **Pause/Resume**: Full game state preservation during pause
- **Countdown System**: 3-2-1-GO countdown before game start and resume
- **Sound Effects**: Subtle, non-intrusive audio feedback
- **Keyboard Controls**: Enter to start, Spacebar to pause

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
(local) Navigate to: **http://127.0.0.1:5000**

### Deployment

This app is ready to deploy on platforms like Render, Railway, or PythonAnywhere.

**For Render:**
1. Push code to GitHub
2. Connect repository to Render
3. Use build command: `pip install -r requirements.txt`
4. Use start command: `gunicorn app:app`

## 📁 Project Structure

```
birthday_surprise/
├── app.py                      # Flask application & routes
├── requirements.txt            # Python dependencies (Flask, Werkzeug, Gunicorn)
├── .gitignore                 # Git exclusions
├── static/
│   ├── css/
│   │   ├── style.css          # Global styles & animated backgrounds
│   │   └── games.css          # Game-specific styles & animations
│   └── js/
│       ├── animations.js      # Translation system & UI interactions
│       ├── fortune_cookie.js  # Fortune cookie game logic
│       ├── emoji_pop.js       # Emoji Pop game with pause/leaderboard
│       └── emoji_catch.js     # Emoji Catch game with pause/leaderboard
└── templates/
    ├── base.html              # Base template with language selector
    ├── home.html              # Welcome page
    ├── message.html           # Birthday messages (unused in current flow)
    ├── ending.html            # Final wishes (unused in current flow)
    ├── games_menu.html        # Games selection hub
    ├── fortune_cookie.html    # Fortune cookie game page
    ├── emoji_pop.html         # Emoji Pop game page
    └── emoji_catch.html       # Emoji Catch game page
```

## 🎯 Game Mechanics

### Emoji Pop
- Click emojis before they disappear
- First 10 seconds: Easy (slower spawning, longer lifetime)
- Last 20 seconds: Hard (faster spawning, shorter lifetime)
- Pause anytime with spacebar or pause button
- Beat high scores for confetti celebration

### Emoji Catch
- Move basket with mouse to catch falling emojis
- Avoid missing emojis (they count against you)
- Progressive difficulty as timer counts down
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
Adjust spawn rates, speeds, and timers in:
- `static/js/emoji_pop.js` (lines ~520-530)
- `static/js/emoji_catch.js` (lines ~460-470)

### Changing Backgrounds
Edit animated gradients in `static/css/style.css` (search for `@keyframes gradientShift`)

## 🐛 Known Features

- Games pause during countdown (emojis freeze until "GO!")
- Leaderboards persist across sessions using LocalStorage
- Free hosting spins down after inactivity (~50s wake-up time)
- Sound effects automatically muted when music is toggled off

## 📝 Credits

Made with ❤️ • Visible in lower-left corner of all pages

---

**Live Demo**: [https://birthday-surprise-515r.onrender.com/]

**Repository**: [https://github.com/rlbl0394/birthday_surprise]


