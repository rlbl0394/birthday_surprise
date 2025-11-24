# 🎂 Birthday Surprise Web App

An elegant, multilingual interactive birthday experience featuring beautiful animated backgrounds, fortune cookie wisdom, engaging emoji-based mini-games, and personalized AI-generated gifts.

## ✨ Features

### 🌍 Multilingual Support
- **7 Languages**: English, Spanish, Chinese, French, Hindi, Filipino, Japanese
- Real-time language switching throughout the entire experience
- Seamless translation of all UI elements, messages, and AI image descriptions

### 🎁 Interactive Gift Reveal System
- **3 Sequential Gifts**: Progressive reveal with smooth fade transitions
- **Gift #1**: Celebratory cake emoji with confetti and balloons
- **Gift #2**: AI-generated Cat Yoga illustration with team outing theme
- **Gift #3**: AI-generated Team Portrait in semi-realistic anime style
- **Full-Screen Image Viewer**: Click images to view detailed AI generation prompts
- **Complete Translation**: All technical descriptions, prompts, and scene requirements translated into all 7 languages
- **Party Effects**: Confetti, balloons, and fireworks synchronized with gift reveals

### 🎮 Interactive Mini-Games
- **Fortune Cookie Game**: Click to crack open fortune cookies and reveal personalized birthday messages
- **Emoji Pop**: Fast-paced clicking game with combo multiplier system
  - 30-second timer with progressive difficulty that scales with your multiplier
  - Build combo streaks for up to 6x score multiplier (every 5 pops = +1x)
  - Dynamic difficulty: Game gets harder as multiplier increases
    - x1: 900ms spawn, 3.0s lifetime, 3.0rem size
    - x6: 500ms spawn, 1.5s lifetime, 2.5rem size (fastest)
  - **Visual Life Feedback**:
    - Rainbow glow effects and visual multiplier popups
    - Combo meter showing streak progress
    - High score tracking with local leaderboard
    - Confetti celebration for new records
- **Emoji Catch**: Strategic catching game with life system
  - Move basket with mouse anywhere on the page (not limited to game area)
  - Catch falling good emojis while avoiding 5 types of bad emojis (💣☠️👻🔥💀)
  - Bad emojis (15% spawn chance) have red pulsing glow for easy identification
  - Four unique power-ups (🛡️, ⭐, ⚡, ❤️) appear only as power-ups, never as regular emojis, and have a 10% spawn rate with a distinct glow effect
  - Start with 3 lives (hearts ❤️) - lose one for each bad emoji caught
  - **Visual Life Feedback**:
    - Red border pulse animation when losing a life
    - Faint heartbreak emoji (💔) popup appears briefly
    - Prominent continuous red glow warning when only 1 life remains
  - Game ends when all lives are lost
  - Purple/magenta gradient background enhances emoji visibility
  - Focus on maximizing caught emojis while managing your lives strategically
  - Fixed, spacious gameplay box and stats bar for stable UI
  - Pause and restart buttons are always visible
  - Progressive difficulty: Easy mode (1000ms spawn) → Hard mode (600ms spawn)
  - Compete for top leaderboard position

### 🎨 Visual Polish
- **Animated Gradient Backgrounds**: Subtly moving, dancing colors on all pages
- **Game-Specific Backgrounds**: Purple/magenta gradient for Emoji Catch, contrasting with emoji colors
- **Smooth Animations**: Professional transitions and particle effects
- **Life Loss Effects**: Red border pulse, heartbreak emoji popup, and low-life warning glow
- **Multiplier Feedback**: Faint popup display and rainbow glow pulsation on combo thresholds
- **Fixed UI Elements**: Stable 500px gameplay boxes with consistent stat displays (140px min-width)
- **Centered Layouts**: Optimized content positioning with minimal scrolling
- **Gift Modals**: Full-screen dark overlays with centered content and celebration effects
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
birthday_surprise/
├── app.py                      # Flask application & routes
├── requirements.txt            # Python dependencies (Flask, Werkzeug, Gunicorn)
├── .gitignore                 # Git exclusions
├── static/
│   ├── css/
│   │   ├── style.css          # Global styles, animated backgrounds, gift modals
│   │   └── games.css          # Game-specific styles & animations
│   ├── js/
│   │   ├── animations.js      # Translation system (7 languages), UI interactions
│   │   ├── fortune_cookie.js  # Fortune cookie game logic
│   │   ├── emoji_pop.js       # Emoji Pop game with pause/leaderboard
│   │   └── emoji_catch.js     # Emoji Catch game with pause/leaderboard
│   └── images/
│       ├── michelle.png       # Profile image for ending page
│       ├── cat_yoga.png       # AI-generated Cat Yoga team outing illustration
│       └── team_portrait.png  # AI-generated Team Portrait
└── templates/
    ├── base.html              # Base template with language selector & credit footer
    ├── home.html              # Welcome page
    ├── message.html           # Birthday messages
    ├── ending.html            # Gift reveal page with 3 sequential gifts & AI descriptions
    ├── games_menu.html        # Games selection hub
    ├── fortune_cookie.html    # Fortune cookie game page
    ├── emoji_pop.html         # Emoji Pop game page
    └── emoji_catch.html       # Emoji Catch game page
```

## 🎯 Interactive Features

### Gift Reveal System (Ending Page)
- Sequential 3-gift reveal with fade transitions (no idle animations)
- Click "Open Gift #1" to reveal celebratory cake
- Click "Open Gift #2" to view Cat Yoga AI-generated image
- Click "Open Gift #3" to view Team Portrait AI-generated image
- Click images in modals to view full-screen with detailed AI generation information
- All content (titles, prompts, descriptions) translates in real-time

### AI Image Details (Translated Content)
- **Cat Yoga**: 2D animated images of team in public park doing cat yoga
  - Person height/tier details (North American, Indian, Filipina)
  - Scene requirements: yoga mats, cats on backs, park atmosphere
  - Full rendering specifications
- **Team Portrait**: Semi-realistic anime-style team portrait
  - Character likeness requirements
  - Classic portrait composition
  - Lighting and color specifications

## 🛠️ Technologies Used

- **Backend**: Flask 3.0.0, Gunicorn (production server)
- **Frontend**: HTML5, CSS3 (animations, gradients, flexbox/grid)
- **JavaScript**: Vanilla JS (no frameworks)
- **Fonts**: Google Fonts (Playfair Display, Lato)
- **Audio**: External CDN-hosted sound effects and music
- **Storage**: LocalStorage for leaderboards and game state

## 🎨 Customization

### Adding Languages
Edit `static/js/animations.js` and add translations to the `translations` object. The system includes extensive translation keys for:
- UI elements (buttons, labels, headings)
- Game instructions and messages
- AI image generation prompts and descriptions
- Gift titles and details

### Modifying Game Difficulty
Adjust spawn rates, speeds, power-up rates, and life counts in:
- `static/js/emoji_pop.js`:
  - Spawn rates, emoji lifetimes, and sizes (see relevant objects in code)
- `static/js/emoji_catch.js`:
  - Starting lives (line ~15): `let lives = 3`
  - Bad emoji spawn chance (line ~475): `Math.random() < 0.15`
  - Power-up spawn chance (line ~480): `Math.random() < 0.10`
  - Bad emoji types (line ~14): Array of 5 bad emojis
  - Power-up types (line ~20): Array of 4 power-up emojis
  - Spawn rates (lines ~588-596): Easy 1000ms, Hard 600ms
  - Low-life glow intensity (CSS lines ~1150-1175): Border colors and box-shadow values

### Changing Gift Images
Replace images in `static/images/`:
- `cat_yoga.png` - Update with new AI-generated image
- `team_portrait.png` - Update with new AI-generated image
- Update corresponding descriptions in `animations.js` translation keys

### Changing Backgrounds
Edit animated gradients in `static/css/style.css` (search for `@keyframes gradientShift`)

## 🐛 Known Features

- Games pause during countdown (emojis freeze until "GO!")
- Leaderboards persist across sessions using LocalStorage
- Free hosting spins down after inactivity (~50s wake-up time)
- Sound effects automatically muted when music is toggled off
- Gift modals use flexbox centering for optimal display across screen sizes
- All technical AI prompts fully translated (including art style specifications)

## 📝 Credits

**Created by R.B. Lorenzo** • Made with ❤️ • Visible in lower-left corner of all pages

---

**Live Demo**: [https://birthday-surprise-515r.onrender.com/]
**Repository**: [https://github.com/rlbl0394/birthday_surprise]
