# 🎂 Birthday Surprise Web App for Michelle

An elegant, interactive birthday experience with beautiful seasonal themes.

## Features

- 🍂 **Seasonal Themes**: Each message has its own aesthetic (Summer, Autumn, Winter, Spring)
- ✨ **Smooth Animations**: Gentle falling particles and fade-in effects
- 🎨 **Elegant Design**: Warm autumn base with seasonal transitions
- 📱 **Responsive**: Works beautifully on all screen sizes
- 🚀 **Optimized**: Lightweight animations for smooth performance on work laptops

## Quick Start

### 1. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 2. Run the Application

```powershell
python app.py
```

### 3. Open in Browser

Navigate to: **http://127.0.0.1:5000**

Share this URL with Michelle to start the birthday surprise! 🎉

## Structure

```
birthday_surprise/
├── app.py                  # Flask application
├── requirements.txt        # Python dependencies
├── static/
│   ├── css/
│   │   └── style.css      # All styling and themes
│   └── js/
│       └── animations.js  # Particle effects and transitions
└── templates/
    ├── base.html          # Base template
    ├── home.html          # Welcome page
    ├── message.html       # Birthday messages
    └── ending.html        # Final wishes
```

## Customization

To add an image for Becca's message, you can modify the `message.html` template to include an image display section.

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Fonts**: Google Fonts (Playfair Display, Lato)
- **Effects**: CSS animations, vanilla JavaScript

---

Made with ❤️ for Michelle's Birthday
