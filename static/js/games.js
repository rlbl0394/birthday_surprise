// Games Menu - Shared game functionality and translations
// Handles translation system for all game pages

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Stop main background music if it exists
    if (window.currentBackgroundMusic) {
        window.currentBackgroundMusic.pause();
    }
    
    // Translate page content immediately with current language
    if (typeof translatePage === 'function' && typeof window.currentLanguage !== 'undefined') {
        translatePage(window.currentLanguage);
    }
    
    // Update music toggle button state
    const toggleButton = document.getElementById('musicToggle');
    if (toggleButton && window.isMusicMuted) {
        toggleButton.innerHTML = '🔇';
        toggleButton.classList.add('muted');
    }
    
    // Start background music for games menu
    playGamesBackgroundMusic();
});

// Play background music for games
function playGamesBackgroundMusic() {
    // Stop and clean up previous game music if it exists
    if (window.gameBackgroundMusic) {
        window.gameBackgroundMusic.pause();
        window.gameBackgroundMusic.currentTime = 0;
    }
    
    // Create new game music
    window.gameBackgroundMusic = new Audio('https://www.bensound.com/bensound-music/bensound-happyrock.mp3');
    window.gameBackgroundMusic.volume = 0.15;
    window.gameBackgroundMusic.loop = true;
    
    // Set as current background music for toggle button
    window.currentBackgroundMusic = window.gameBackgroundMusic;
    
    // Play if not muted
    if (!window.isMusicMuted) {
        window.gameBackgroundMusic.play().catch(e => console.log('Background music failed:', e));
    }
}

// Add game-specific translations to the main translation system
if (typeof getTranslation === 'function') {
    // Extend existing translation function
} else {
    // Create translation function for games
    window.getTranslation = function(key, lang) {
        const gameTranslations = {
            // Games Menu
            'games_title': {
                'en': '🎮 Birthday Games',
                'es': '🎮 Juegos de Cumpleaños',
                'zh': '🎮 生日游戏',
                'fr': '🎮 Jeux d\'Anniversaire',
                'hi': '🎮 जन्मदिन के खेल',
                'tl': '🎮 Mga Laro ng Kaarawan',
                'ja': '🎮 誕生日ゲーム'
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
                'en': 'Pop as many emojis as you can in 30 seconds!',
                'es': '¡Estalla tantos emojis como puedas en 30 segundos!',
                'zh': '在30秒内尽可能多地爆破表情符号！',
                'fr': 'Éclatez autant d\'emojis que possible en 30 secondes!',
                'hi': '30 सेकंड में जितने इमोजी हो सके उतने फोड़ें!',
                'tl': 'Pumutok ng maraming emoji hangga\'t maaari sa loob ng 30 segundo!',
                'ja': '30秒でできるだけ多くの絵文字をポップしよう！'
            },
            'emoji_catch_title': {
                'en': 'Emoji Catch',
                'es': 'Atrapa Emojis',
                'zh': '捕捉表情符号',
                'fr': 'Attrape Emoji',
                'hi': 'इमोजी पकड़ो',
                'tl': 'Saluhin ang Emoji',
                'ja': '絵文字キャッチ'
            },
            'emoji_catch_desc': {
                'en': 'Catch falling emojis in your basket!',
                'es': '¡Atrapa emojis que caen en tu canasta!',
                'zh': '用你的篮子接住下落的表情符号！',
                'fr': 'Attrapez les emojis qui tombent dans votre panier!',
                'hi': 'अपनी टोकरी में गिरते इमोजी पकड़ें!',
                'tl': 'Hulihin ang mga nahuhulog na emoji sa iyong basket!',
                'ja': 'バスケットで落ちてくる絵文字をキャッチしよう！'
            },
            'play_button': {
                'en': 'Play',
                'es': 'Jugar',
                'zh': '玩',
                'fr': 'Jouer',
                'hi': 'खेलें',
                'tl': 'Maglaro',
                'ja': 'プレイ'
            },
            'back_home': {
                'en': '← Back to Home',
                'es': '← Volver al Inicio',
                'zh': '← 返回主页',
                'fr': '← Retour à l\'Accueil',
                'hi': '← होम पर वापस जाएं',
                'tl': '← Bumalik sa Home',
                'ja': '← ホームに戻る'
            },
            'back_games': {
                'en': '← Back to Games',
                'es': '← Volver a Juegos',
                'zh': '← 返回游戏',
                'fr': '← Retour aux Jeux',
                'hi': '← खेलों पर वापस जाएं',
                'tl': '← Bumalik sa Mga Laro',
                'ja': '← ゲームに戻る'
            },
            'play_games': {
                'en': '🎮 Play Games',
                'es': '🎮 Jugar Juegos',
                'zh': '🎮 玩游戏',
                'fr': '🎮 Jouer aux Jeux',
                'hi': '🎮 खेल खेलें',
                'tl': '🎮 Maglaro ng mga Laro',
                'ja': '🎮 ゲームをプレイ'
            }
        };
        
        return gameTranslations[key] && gameTranslations[key][lang] 
            ? gameTranslations[key][lang] 
            : gameTranslations[key] && gameTranslations[key]['en'] 
            ? gameTranslations[key]['en'] 
            : key;
    };
}

// Profanity filter - checks for inappropriate names
function isInappropriateName(name) {
    if (!name || name.trim().length === 0) return true;
    
    const trimmedName = name.trim().toLowerCase();
    
    // List of inappropriate words/patterns to block
    const inappropriateWords = [
        // Offensive terms
        'fuck', 'shit', 'damn', 'hell', 'ass', 'bastard', 'bitch', 'crap',
        'dick', 'cock', 'pussy', 'cunt', 'whore', 'slut', 'fag', 'nigger',
        'chink', 'spic', 'kike', 'retard', 'nazi', 'hitler',
        // Sexual terms
        'sex', 'porn', 'xxx', 'nude', 'naked', 'boob', 'tit', 'penis', 'vagina',
        // Derogatory terms
        'idiot', 'stupid', 'dumb', 'moron', 'loser', 'ugly', 'fat',
        // Variations with numbers/symbols
        'fuk', 'sh1t', 'a$$', 'b1tch', 'fck', 'd1ck', 'p0rn'
    ];
    
    // Check if name contains inappropriate words
    for (const word of inappropriateWords) {
        if (trimmedName.includes(word)) {
            return true;
        }
    }
    
    // Check for excessive special characters (spam)
    const specialCharCount = (trimmedName.match(/[^a-z0-9\s]/gi) || []).length;
    if (specialCharCount > trimmedName.length * 0.5) {
        return true;
    }
    
    return false;
}

// Play sound effect (respects mute setting)
function playGameSound(soundFile, volume = 0.3) {
    if (window.isMusicMuted) {
        return;
    }
    
    const audio = new Audio(soundFile);
    audio.volume = volume;
    audio.play().catch(e => console.log('Audio play failed:', e));
}

// Button sound effects
function playHoverSound() {
    if (!window.isMusicMuted) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3');
        audio.volume = 0.15;
        audio.play().catch(e => console.log('Hover sound failed:', e));
    }
}

function playClickSound() {
    if (!window.isMusicMuted) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
        audio.volume = 0.25;
        audio.play().catch(e => console.log('Click sound failed:', e));
    }
}
