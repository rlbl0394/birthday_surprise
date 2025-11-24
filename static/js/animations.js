/**
 * Games App Animations
 * Handles seasonal particle effects and translations
 */

// Preload button click sound
const buttonClickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
buttonClickSound.volume = 0.1;
buttonClickSound.load();

// Global audio instance for music control
let currentBackgroundMusic = null;
let isMusicMuted = localStorage.getItem('musicMuted') === 'true' || false;
let currentLanguage = localStorage.getItem('userLanguage') || 'en';

// Set global variables for cross-file access
window.currentLanguage = currentLanguage;
window.isMusicMuted = isMusicMuted;
window.getTranslation = getTranslation;

/**
 * Toggle language menu visibility
 */
function toggleLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    menu.classList.toggle('show');
}

/**
 * Close language menu when clicking outside
 */
document.addEventListener('click', function(e) {
    const languageSelector = document.querySelector('.language-selector');
    const menu = document.getElementById('languageMenu');
    
    if (languageSelector && !languageSelector.contains(e.target) && menu) {
        menu.classList.remove('show');
    }
});

/**
 * Translate page content to selected language
 */
function translatePage(targetLang) {
    if (currentLanguage === targetLang) return;
    
    currentLanguage = targetLang;
    window.currentLanguage = targetLang; // Update global variable
    localStorage.setItem('userLanguage', targetLang);
    
    // Update active state
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === targetLang) {
            btn.classList.add('active');
        }
    });
    
    // Close menu
    document.getElementById('languageMenu').classList.remove('show');
    
    // Get all translatable elements
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key, targetLang);
        
        if (translation) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translation;
            } else if (element.tagName === 'BUTTON') {
                element.textContent = translation;
            } else {
                element.innerHTML = translation;
            }
        }
    });
    
    // Update page title
    const titleTranslation = getTranslation('page_title', targetLang);
    if (titleTranslation) {
        document.title = titleTranslation;
    }
    
    // Update fortune cookie message if it exists and is displayed
    if (typeof updateFortuneDisplay === 'function') {
        updateFortuneDisplay();
    }
    
    // Update game leaderboard translations if they exist
    if (typeof updateLeaderboardTranslations === 'function') {
        updateLeaderboardTranslations();
    }
}

/**
 * Get translation for a key in target language
 */
function getTranslation(key, lang) {
    const translations = {
        // Home page
        'home_title': {
            'en': '🎮 Becca\'s Game Collection',
            'es': '🎮 Colección de Juegos de Becca',
            'zh': '🎮 贝卡的游戏集合',
            'fr': '🎮 Collection de Jeux de Becca',
            'hi': '🎮 बेक्का का खेल संग्रह',
            'tl': '🎮 Koleksyon ng Laro ni Becca',
            'ja': '🎮 ベッカのゲームコレクション'
        },
        'home_subtitle': {
            'en': 'Choose from a variety of interactive games',
            'es': 'Elige entre una variedad de juegos interactivos',
            'zh': '从各种互动游戏中选择',
            'fr': 'Choisissez parmi une variété de jeux interactifs',
            'hi': 'विभिन्न इंटरैक्टिव खेलों में से चुनें',
            'tl': 'Pumili mula sa iba\'t ibang interactive na laro',
            'ja': 'さまざまなインタラクティブゲームから選択'
        },
        'play_games': {
            'en': 'Start Playing',
            'es': 'Comenzar a Jugar',
            'zh': '开始玩',
            'fr': 'Commencer à Jouer',
            'hi': 'खेलना शुरू करें',
            'tl': 'Simulan ang Paglalaro',
            'ja': 'プレイを開始'
        },
        'back_home': {
            'en': '← Back to Home',
            'es': '← Volver al Inicio',
            'zh': '← 返回首页',
            'fr': '← Retour à l\'Accueil',
            'hi': '← होम पर वापस जाएं',
            'tl': '← Bumalik sa Home',
            'ja': '← ホームに戻る'
        },
        'page_title': {
            'en': 'Becca\'s Game Collection',
            'es': 'Colección de Juegos de Becca',
            'zh': '贝卡的游戏集合',
            'fr': 'Collection de Jeux de Becca',
            'hi': 'बेक्का का खेल संग्रह',
            'tl': 'Koleksyon ng Laro ni Becca',
            'ja': 'ベッカのゲームコレクション'
        },
        'credit_footer': {
            'en': 'Created by R.B. Lorenzo',
            'es': 'Creado por R.B. Lorenzo',
            'zh': '由 R.B. Lorenzo 创建',
            'fr': 'Créé par R.B. Lorenzo',
            'hi': 'R.B. Lorenzo द्वारा बनाया गया',
            'tl': 'Ginawa ni R.B. Lorenzo',
            'ja': 'R.B. Lorenzo 作成'
        },
        // Games translations
        'games_title': {
            'en': '🎮 Becca\'s Game Collection',
            'es': '🎮 Colección de Juegos de Becca',
            'zh': '🎮 贝卡的游戏集合',
            'fr': '🎮 Collection de Jeux de Becca',
            'hi': '🎮 बेक्का का खेल संग्रह',
            'tl': '🎮 Koleksyon ng Laro ni Becca',
            'ja': '🎮 ベッカのゲームコレクション'
        },
        'games_subtitle': {
            'en': 'Choose a game to play!',
            'es': '¡Elige un juego para jugar!',
            'zh': '选择一个游戏来玩！',
            'fr': 'Choisissez un jeu à jouer!',
            'hi': 'खेलने के लिए एक खेल चुनें!',
            'tl': 'Pumili ng laro na laruin!',
            'ja': 'プレイするゲームを選んでください！'
        },
        'fortune_cookie_title': {
            'en': 'Fortune Cookie',
            'es': 'Galleta de la Fortuna',
            'zh': '幸运饼干',
            'fr': 'Biscuit de Fortune',
            'hi': 'भाग्य कुकी',
            'tl': 'Fortune Cookie',
            'ja': 'フォーチュンクッキー'
        },
        'fortune_cookie_desc': {
            'en': 'Open fortune cookies to reveal inspirational messages!',
            'es': '¡Abre galletas de la fortuna para revelar mensajes inspiradores!',
            'zh': '打开幸运饼干，发现鼓舞人心的信息！',
            'fr': 'Ouvrez des biscuits de fortune pour révéler des messages inspirants!',
            'hi': 'प्रेरणादायक संदेश प्रकट करने के लिए भाग्य कुकीज़ खोलें!',
            'tl': 'Buksan ang mga fortune cookie upang ipakita ang mga nakakainspirang mensahe!',
            'ja': 'フォーチュンクッキーを開いてインスピレーションあふれるメッセージを見つけよう！'
        },
        'emoji_pop_title': {
            'en': 'Emoji Pop',
            'es': 'Estalla Emojis',
            'zh': '表情符号爆破',
            'fr': 'Éclatement d\'Emoji',
            'hi': 'इमोजी पॉप',
            'tl': 'Emoji Pop',
            'ja': '絵文字ポップ'
        },
        'emoji_pop_desc': {
            'en': 'Click emojis fast to build combos! Difficulty increases with your multiplier - reach 6x for maximum challenge in 30 seconds!',
            'es': '¡Haz clic en los emojis rápidamente para construir combos! La dificultad aumenta con tu multiplicador - ¡alcanza 6x para el máximo desafío en 30 segundos!',
            'zh': '快速点击表情符号以建立连击！难度随乘数增加 - 在30秒内达到6倍以获得最大挑战！',
            'fr': 'Cliquez rapidement sur les emojis pour créer des combos ! La difficulté augmente avec votre multiplicateur - atteignez 6x pour le défi maximum en 30 secondes !',
            'hi': 'कॉम्बो बनाने के लिए इमोजी को तेज़ी से क्लिक करें! आपके गुणक के साथ कठिनाई बढ़ती है - 30 सेकंड में अधिकतम चुनौती के लिए 6x तक पहुंचें!',
            'tl': 'I-click nang mabilis ang mga emoji upang makabuo ng mga combo! Tumataas ang kahirapan sa iyong multiplier - maabot ang 6x para sa maximum na hamon sa loob ng 30 segundo!',
            'ja': '絵文字を素早くクリックしてコンボを作ろう！難易度は倍率とともに上昇 - 30秒以内に6倍を目指して最大の挑戦を！'
        },
        'emoji_catch_title': {
            'en': 'Emoji Catch',
            'es': 'Atrapa Emojis',
            'zh': '捕捉表情符号',
            'fr': 'Attrape Emoji',
            'hi': 'इमोजी पकड़ें',
            'tl': 'Emoji Catch',
            'ja': '絵文字キャッチ'
        },
        'emoji_catch_desc': {
            'en': 'Catch good emojis and dodge glowing red bad ones! Manage 3 lives with visual warnings - survive to the end!',
            'es': '¡Atrapa emojis buenos y esquiva los malos que brillan en rojo! Administra 3 vidas con advertencias visuales - ¡sobrevive hasta el final!',
            'zh': '抓住好表情符号并躲避发光的红色坏表情符号！管理3条生命并获得视觉警告 - 存活到最后！',
            'fr': 'Attrapez les bons emojis et esquivez les mauvais qui brillent en rouge ! Gérez 3 vies avec des avertissements visuels - survivez jusqu\'à la fin !',
            'hi': 'अच्छे इमोजी पकड़ें और चमकते लाल बुरे इमोजी से बचें! दृश्य चेतावनी के साथ 3 जीवन प्रबंधित करें - अंत तक जीवित रहें!',
            'tl': 'Hulihin ang mabuting mga emoji at iwasan ang pulang kumikinang na masama! Pamahalaan ang 3 buhay na may mga visual na babala - makaligtas hanggang sa dulo!',
            'ja': '良い絵文字をキャッチして、赤く光る悪い絵文字を避けよう！視覚的な警告で3つの命を管理 - 最後まで生き残ろう！'
        },
        'play_button': {
            'en': 'Play',
            'es': 'Jugar',
            'zh': '玩',
            'fr': 'Jouer',
            'hi': 'खेलें',
            'tl': 'Maglaro',
            'ja': 'プレイ'
        }
    };
    
    return translations[key] ? translations[key][lang] : null;
}

/**
 * Toggle background music on/off
 */
function toggleMusic() {
    isMusicMuted = !isMusicMuted;
    window.isMusicMuted = isMusicMuted; // Update global variable
    localStorage.setItem('musicMuted', isMusicMuted);
    
    const button = document.getElementById('musicToggle');
    
    if (isMusicMuted) {
        button.textContent = '🔇';
        button.title = 'Music Off';
        if (currentBackgroundMusic) {
            currentBackgroundMusic.pause();
        }
    } else {
        button.textContent = '🔊';
        button.title = 'Music On';
        if (currentBackgroundMusic) {
            currentBackgroundMusic.play().catch(() => {});
        }
    }
}

/**
 * Initialize music toggle button state
 */
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('musicToggle');
    if (button) {
        if (isMusicMuted) {
            button.textContent = '🔇';
            button.title = 'Music Off';
        } else {
            button.textContent = '🔊';
            button.title = 'Music On';
        }
    }
    
    // Apply saved language
    const savedLanguage = localStorage.getItem('userLanguage') || 'en';
    if (savedLanguage !== 'en') {
        translatePage(savedLanguage);
    }
});

/**
 * Initialize particles based on theme
 */
function initParticles(theme) {
    const container = document.getElementById('particles');
    if (!container) return;
    
    container.innerHTML = '';
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container, theme, i);
    }
}

/**
 * Initialize mixed seasonal particles
 */
function initMixedParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    container.innerHTML = '';
    const themes = ['summer', 'autumn', 'winter', 'spring'];
    const particlesPerTheme = 12;
    
    themes.forEach((theme, themeIndex) => {
        for (let i = 0; i < particlesPerTheme; i++) {
            createParticle(container, theme, themeIndex * particlesPerTheme + i);
        }
    });
}

/**
 * Create a single particle
 */
function createParticle(container, theme, index) {
    const particle = document.createElement('div');
    particle.classList.add('particle', `particle-${theme}`);
    
    const config = getParticleConfig(theme);
    particle.innerHTML = config.emoji[Math.floor(Math.random() * config.emoji.length)];
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random size
    const size = 20 + Math.random() * 20;
    particle.style.fontSize = size + 'px';
    
    // Random animation duration
    const duration = config.duration.min + Math.random() * (config.duration.max - config.duration.min);
    particle.style.animationDuration = duration + 's';
    
    // Random delay
    particle.style.animationDelay = (index * 0.2) + 's';
    
    container.appendChild(particle);
}

/**
 * Get particle configuration by theme
 */
function getParticleConfig(theme) {
    const configs = {
        'summer': {
            emoji: ['☀️', '🌻', '🌊', '🦋', '🌞'],
            duration: { min: 15, max: 25 }
        },
        'autumn': {
            emoji: ['🍁', '🍂', '🍃', '🎃'],
            duration: { min: 10, max: 20 }
        },
        'winter': {
            emoji: ['❄️', '⛄', '🌨️', '💎'],
            duration: { min: 12, max: 22 }
        },
        'spring': {
            emoji: ['🌸', '🌺', '🌼', '🦋', '🌷'],
            duration: { min: 14, max: 24 }
        }
    };
    
    return configs[theme] || configs['autumn'];
}

// Initialize music button state on page load
if (isMusicMuted) {
    const button = document.getElementById('musicToggle');
    if (button) {
        button.textContent = '🔇';
        button.title = 'Music Off';
    }
}
