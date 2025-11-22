// Emoji Pop Game - use globals from animations.js
let score = 0;
let timeLeft = 30;
let gameActive = false;
let gamePaused = false;
let playerName = '';
let spawnInterval;
let timerInterval;
let countdownInterval;
let isCountingDown = false;
let isPauseTransitioning = false;
let streak = 0;
let multiplier = 1;
let lastPopTime = 0;
const streakTimeout = 2000; // 2 seconds to maintain streak

// Emoji list for spawning
const gameEmojis = ['🎈', '🎉', '🎊', '🎁', '🌟', '⭐', '💫', '✨', '🎀', '🎂', '🍰', '🧁', '🎪', '🎨', '🎭', '🎯'];

// Game translations
const emojiPopTranslations = {
    'emoji_pop_game_title': {
        'en': '💥 Emoji Pop Challenge',
        'es': '💥 Desafío de Estalla Emojis',
        'zh': '💥 表情符号爆破挑战',
        'fr': '💥 Défi Éclatement d\'Emoji',
        'hi': '💥 इमोजी पॉप चुनौती',
        'tl': '💥 Hamon ng Emoji Pop',
        'ja': '💥 絵文字ポップチャレンジ'
    },
    'emoji_pop_instructions': {
        'en': 'Pop as many emojis as you can in 30 seconds!',
        'es': '¡Estalla tantos emojis como puedas en 30 segundos!',
        'zh': '在30秒内尽可能多地爆破表情符号！',
        'fr': 'Éclatez autant d\'emojis que possible en 30 secondes!',
        'hi': '30 सेकंड में जितने इमोजी हो सके उतने फोड़ें!',
        'tl': 'Pumutok ng maraming emoji hangga\'t maaari sa loob ng 30 segundo!',
        'ja': '30秒でできるだけ多くの絵文字をポップしよう！'
    },
    'enter_name': {
        'en': 'Enter Your Name:',
        'es': 'Ingresa Tu Nombre:',
        'zh': '输入您的姓名：',
        'fr': 'Entrez Votre Nom:',
        'hi': 'अपना नाम दर्ज करें:',
        'tl': 'Ilagay ang Iyong Pangalan:',
        'ja': '名前を入力してください：'
    },
    'name_error': {
        'en': 'Please enter a valid name',
        'es': 'Por favor ingresa un nombre válido',
        'zh': '请输入有效的姓名',
        'fr': 'Veuillez entrer un nom valide',
        'hi': 'कृपया एक मान्य नाम दर्ज करें',
        'tl': 'Mangyaring maglagay ng wastong pangalan',
        'ja': '有効な名前を入力してください'
    },
    'start_game': {
        'en': 'Start Game',
        'es': 'Iniciar Juego',
        'zh': '开始游戏',
        'fr': 'Commencer le Jeu',
        'hi': 'खेल शुरू करें',
        'tl': 'Simulan ang Laro',
        'ja': 'ゲーム開始'
    },
    'score_label': {
        'en': 'Score:',
        'es': 'Puntuación:',
        'zh': '得分：',
        'fr': 'Score:',
        'hi': 'स्कोर:',
        'tl': 'Puntos:',
        'ja': 'スコア：'
    },
    'time_label': {
        'en': 'Time:',
        'es': 'Tiempo:',
        'zh': '时间：',
        'fr': 'Temps:',
        'hi': 'समय:',
        'tl': 'Oras:',
        'ja': '時間：'
    },
    'game_over': {
        'en': 'Game Over!',
        'es': '¡Juego Terminado!',
        'zh': '游戏结束！',
        'fr': 'Jeu Terminé!',
        'hi': 'खेल खत्म!',
        'tl': 'Tapos na ang Laro!',
        'ja': 'ゲームオーバー！'
    },
    'your_score': {
        'en': 'Your Score:',
        'es': 'Tu Puntuación:',
        'zh': '你的得分：',
        'fr': 'Votre Score:',
        'hi': 'आपका स्कोर:',
        'tl': 'Iyong Puntos:',
        'ja': 'あなたのスコア：'
    },
    'play_again': {
        'en': 'Play Again',
        'es': 'Jugar de Nuevo',
        'zh': '再玩一次',
        'fr': 'Rejouer',
        'hi': 'फिर से खेलें',
        'tl': 'Maglaro Muli',
        'ja': 'もう一度プレイ'
    },
    'leaderboard_title': {
        'en': '🏆 Leaderboard',
        'es': '🏆 Tabla de Líderes',
        'zh': '🏆 排行榜',
        'fr': '🏆 Classement',
        'hi': '🏆 लीडरबोर्ड',
        'tl': '🏆 Leaderboard',
        'ja': '🏆 リーダーボード'
    },
    'pause_button': {
        'en': '⏸️ Pause',
        'es': '⏸️ Pausar',
        'zh': '⏸️ 暂停',
        'fr': '⏸️ Pause',
        'hi': '⏸️ रोकें',
        'tl': '⏸️ Ihinto',
        'ja': '⏸️ 一時停止'
    },
    'resume_button': {
        'en': '▶️ Resume',
        'es': '▶️ Reanudar',
        'zh': '▶️ 继续',
        'fr': '▶️ Reprendre',
        'hi': '▶️ जारी रखें',
        'tl': '▶️ Ituloy',
        'ja': '▶️ 再開'
    },
    'play_again_title': {
        'en': 'Play Again?',
        'es': '¿Jugar de Nuevo?',
        'zh': '再玩一次？',
        'fr': 'Rejouer?',
        'hi': 'फिर से खेलें?',
        'tl': 'Maglaro Muli?',
        'ja': 'もう一度プレイ？'
    },
    'play_again_question': {
        'en': 'Would you like to play again?',
        'es': '¿Te gustaría jugar de nuevo?',
        'zh': '你想再玩一次吗？',
        'fr': 'Voulez-vous rejouer?',
        'hi': 'क्या आप फिर से खेलना चाहेंगे?',
        'tl': 'Gusto mo bang maglaro muli?',
        'ja': 'もう一度プレイしますか？'
    },
    'same_name': {
        'en': 'Continue as',
        'es': 'Continuar como',
        'zh': '继续使用',
        'fr': 'Continuer en tant que',
        'hi': 'इस रूप में जारी रखें',
        'tl': 'Magpatuloy bilang',
        'ja': '続ける'
    },
    'new_name': {
        'en': 'Play as Different Person',
        'es': 'Jugar como Persona Diferente',
        'zh': '以不同身份游玩',
        'fr': 'Jouer en tant que Personne Différente',
        'hi': 'अलग व्यक्ति के रूप में खेलें',
        'tl': 'Maglaro bilang Ibang Tao',
        'ja': '別の人としてプレイ'
    },
    'exit_game_title': {
        'en': 'Exit Game?',
        'es': '¿Salir del Juego?',
        'zh': '退出游戏？',
        'fr': 'Quitter le Jeu?',
        'hi': 'खेल से बाहर निकलें?',
        'tl': 'Lumabas sa Laro?',
        'ja': 'ゲームを終了？'
    },
    'exit_game_question': {
        'en': 'Are you sure you want to exit? Your current game will be lost.',
        'es': '¿Estás seguro de que quieres salir? Tu juego actual se perderá.',
        'zh': '确定要退出吗？当前游戏将会丢失。',
        'fr': 'Êtes-vous sûr de vouloir quitter? Votre partie actuelle sera perdue.',
        'hi': 'क्या आप वाकई बाहर निकलना चाहते हैं? आपका वर्तमान खेल खो जाएगा।',
        'tl': 'Sigurado ka bang gusto mong lumabas? Mawawala ang iyong kasalukuyang laro.',
        'ja': '本当に終了しますか？現在のゲームは失われます。'
    },
    'exit_yes': {
        'en': 'Yes, Exit',
        'es': 'Sí, Salir',
        'zh': '是的，退出',
        'fr': 'Oui, Quitter',
        'hi': 'हां, बाहर निकलें',
        'tl': 'Oo, Lumabas',
        'ja': 'はい、終了'
    },
    'exit_no': {
        'en': 'No, Continue Playing',
        'es': 'No, Seguir Jugando',
        'zh': '不，继续游戏',
        'fr': 'Non, Continuer à Jouer',
        'hi': 'नहीं, खेलना जारी रखें',
        'tl': 'Hindi, Magpatuloy sa Paglalaro',
        'ja': 'いいえ、続ける'
    },
    'restart_game_title': {
        'en': 'Restart Game?',
        'es': '¿Reiniciar Juego?',
        'zh': '重新开始游戏？',
        'fr': 'Redémarrer le Jeu?',
        'hi': 'खेल पुनः प्रारंभ करें?',
        'tl': 'I-restart ang Laro?',
        'ja': 'ゲームを再開？'
    },
    'restart_game_question': {
        'en': 'Are you sure you want to restart? Your current game will be lost.',
        'es': '¿Estás seguro de que quieres reiniciar? Tu juego actual se perderá.',
        'zh': '确定要重新开始吗？当前游戏将会丢失。',
        'fr': 'Êtes-vous sûr de vouloir redémarrer? Votre partie actuelle sera perdue.',
        'hi': 'क्या आप वाकई पुनः प्रारंभ करना चाहते हैं? आपका वर्तमान खेल खो जाएगा।',
        'tl': 'Sigurado ka bang gusto mong i-restart? Mawawala ang iyong kasalukuyang laro.',
        'ja': '本当に再開しますか？現在のゲームは失われます。'
    },
    'restart_yes': {
        'en': 'Yes, Restart',
        'es': 'Sí, Reiniciar',
        'zh': '是的，重新开始',
        'fr': 'Oui, Redémarrer',
        'hi': 'हां, पुनः प्रारंभ करें',
        'tl': 'Oo, I-restart',
        'ja': 'はい、再開'
    },
    'restart_no': {
        'en': 'No, Continue Playing',
        'es': 'No, Seguir Jugando',
        'zh': '不，继续游戏',
        'fr': 'Non, Continuer à Jouer',
        'hi': 'नहीं, खेलना जारी रखें',
        'tl': 'Hindi, Magpatuloy sa Paglalaro',
        'ja': 'いいえ、続ける'
    },
    'game_paused': {
        'en': 'PAUSED',
        'es': 'PAUSADO',
        'zh': '已暂停',
        'fr': 'EN PAUSE',
        'hi': 'रोका गया',
        'tl': 'NAKA-PAHINGA',
        'ja': '一時停止中'
    },
    'pause_hint': {
        'en': 'Press SPACE or ▶️ Resume to continue',
        'es': 'Presiona ESPACIO o ▶️ Reanudar para continuar',
        'zh': '按空格键或 ▶️ 继续以继续',
        'fr': 'Appuyez sur ESPACE ou ▶️ Reprendre pour continuer',
        'hi': 'जारी रखने के लिए SPACE या ▶️ जारी रखें दबाएं',
        'tl': 'Pindutin ang SPACE o ▶️ Ituloy upang magpatuloy',
        'ja': 'スペースキーまたは ▶️ 再開を押して続行'
    },
    'reload_game_title': {
        'en': 'Leave Game?',
        'es': '¿Salir del Juego?',
        'zh': '离开游戏？',
        'fr': 'Quitter le Jeu?',
        'hi': 'खेल छोड़ें?',
        'tl': 'Umalis sa Laro?',
        'ja': 'ゲームを離れる？'
    },
    'reload_game_question': {
        'en': 'Are you sure you want to leave? Your current game will be lost.',
        'es': '¿ Estás seguro de que quieres salir? Tu juego actual se perderá.',
        'zh': '确定要离开吗？当前游戏将会丢失。',
        'fr': 'Êtes-vous sûr de vouloir partir? Votre partie actuelle sera perdue.',
        'hi': 'क्या आप वाकई छोड़ना चाहते हैं? आपका वर्तमान खेल खो जाएगा।',
        'tl': 'Sigurado ka bang gusto mong umalis? Mawawala ang iyong kasalukuyang laro.',
        'ja': '本当に離れますか？現在のゲームは失われます。'
    },
    'reload_yes': {
        'en': 'Yes, Leave',
        'es': 'Sí, Salir',
        'zh': '是的，离开',
        'fr': 'Oui, Quitter',
        'hi': 'हां, छोड़ें',
        'tl': 'Oo, Umalis',
        'ja': 'はい、離れる'
    },
    'reload_no': {
        'en': 'No, Stay',
        'es': 'No, Quedarme',
        'zh': '不，留下',
        'fr': 'Non, Rester',
        'hi': 'नहीं, रहें',
        'tl': 'Hindi, Manatili',
        'ja': 'いいえ、留まる'
    }
};

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    // Stop main background music if it exists
    if (window.currentBackgroundMusic) {
        window.currentBackgroundMusic.pause();
    }
    
    // Translate page content immediately
    if (typeof translatePage === 'function' && typeof window.currentLanguage !== 'undefined') {
        translatePage(window.currentLanguage);
    }
    
    // Update music toggle button state
    const toggleButton = document.getElementById('musicToggle');
    if (toggleButton && window.isMusicMuted) {
        toggleButton.innerHTML = '🔇';
        toggleButton.classList.add('muted');
    }
    
    // Start background music
    playEmojiPopBackgroundMusic();
    
    // Event listeners
    document.getElementById('start-game-btn').addEventListener('click', validateAndStartGame);
    document.getElementById('play-again-btn').addEventListener('click', showPlayAgainModal);
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('same-name-btn').addEventListener('click', playAgainSameName);
    document.getElementById('new-name-btn').addEventListener('click', playAgainNewName);
    
    // Prevent accidental page reload/close during active game
    window.addEventListener('beforeunload', function(e) {
        // Don't show warning if user already confirmed exit through our modal
        if (window.isNavigatingAway) {
            return;
        }
        // Only show warning if game is active (not on start screen or game over screen)
        if (gameActive || (playerName && document.getElementById('game-screen').style.display === 'block' && document.getElementById('game-over-screen').style.display === 'none')) {
            e.preventDefault();
            e.returnValue = ''; // Chrome requires returnValue to be set
            return ''; // For older browsers
        }
    });
    
    // Exit confirmation modal buttons
    document.getElementById('exit-yes-btn').addEventListener('click', confirmExit);
    document.getElementById('exit-no-btn').addEventListener('click', cancelExit);
    
    // Restart confirmation modal buttons
    document.getElementById('restart-yes-btn').addEventListener('click', confirmRestart);
    document.getElementById('restart-no-btn').addEventListener('click', cancelRestart);
    
    // Add Enter key support for name input
    document.getElementById('player-name').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            validateAndStartGame();
        }
    });
    
    // Add spacebar pause support
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && gameActive && !document.getElementById('exit-confirmation-modal').style.display.includes('flex')) {
            e.preventDefault();
            togglePause();
        }
    });
    
    // Display leaderboard
    displayLeaderboard();
});

// Play background music
function playEmojiPopBackgroundMusic() {
    // Stop and clean up previous game music if it exists
    if (window.gameBackgroundMusic) {
        window.gameBackgroundMusic.pause();
        window.gameBackgroundMusic.currentTime = 0;
    }
    
    // Create new game music
    window.gameBackgroundMusic = new Audio('https://www.bensound.com/bensound-music/bensound-funkyelement.mp3');
    window.gameBackgroundMusic.volume = 0.08;
    window.gameBackgroundMusic.loop = true;
    
    // Set as current background music for toggle button
    window.currentBackgroundMusic = window.gameBackgroundMusic;
    
    // Play if not muted
    if (!window.isMusicMuted) {
        window.gameBackgroundMusic.play().catch(e => console.log('Background music failed:', e));
    }
}

// Profanity filter
function isInappropriateName(name) {
    if (!name || name.trim().length === 0) return true;
    
    const trimmedName = name.trim().toLowerCase();
    const inappropriateWords = [
        'fuck', 'shit', 'damn', 'hell', 'ass', 'bastard', 'bitch', 'crap',
        'dick', 'cock', 'pussy', 'cunt', 'whore', 'slut', 'fag', 'nigger',
        'chink', 'spic', 'kike', 'retard', 'nazi', 'hitler',
        'sex', 'porn', 'xxx', 'nude', 'naked', 'boob', 'tit', 'penis', 'vagina',
        'idiot', 'stupid', 'dumb', 'moron', 'loser', 'ugly', 'fat',
        'fuk', 'sh1t', 'a$$', 'b1tch', 'fck', 'd1ck', 'p0rn'
    ];
    
    for (const word of inappropriateWords) {
        if (trimmedName.includes(word)) return true;
    }
    
    const specialCharCount = (trimmedName.match(/[^a-z0-9\s]/gi) || []).length;
    if (specialCharCount > trimmedName.length * 0.5) return true;
    
    return false;
}

// Validate name and start game
function validateAndStartGame() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim();
    const errorElement = document.getElementById('name-error');
    
    if (isInappropriateName(name)) {
        errorElement.style.display = 'block';
        playErrorSound();
        return;
    }
    
    playerName = name;
    errorElement.style.display = 'none';
    
    // Hide name input, show game screen
    document.getElementById('name-input-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    playClickSound();
    startGame();
}

// Start game
function startGame() {
    score = 0;
    timeLeft = 30;
    gameActive = false;
    gamePaused = false;
    streak = 0;
    multiplier = 1;
    lastPopTime = 0;
    
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    
    // Reset combo meter and rainbow glow
    const spawnArea = document.getElementById('emoji-spawn-area');
    if (spawnArea) {
        spawnArea.style.boxShadow = '';
        spawnArea.classList.remove('rainbow-glow');
        spawnArea.classList.remove('glow-pulse');
    }
    
    const multiplierDisplay = document.getElementById('multiplier-display');
    if (multiplierDisplay) multiplierDisplay.style.visibility = 'hidden';
    
    updateComboMeter();
    updateRainbowGlow();
    
    // Set pause button text with translation
    const pauseText = emojiPopTranslations['pause_button'][window.currentLanguage] || '⏸️ Pause';
    document.getElementById('pause-btn').textContent = pauseText;
    document.getElementById('pause-btn').classList.remove('paused');
    
    // Clear spawn area (but preserve multiplier popup)
    const spawnAreaEl = document.getElementById('emoji-spawn-area');
    const emojisToRemove = spawnAreaEl.querySelectorAll('.pop-emoji');
    emojisToRemove.forEach(emoji => emoji.remove());
    
    // Reset popup state
    const popup = document.getElementById('multiplier-popup');
    if (popup) {
        popup.classList.remove('show-popup');
        popup.style.opacity = '0';
    }
    
    // Show countdown before starting
    showCountdown(() => {
        gameActive = true;
        // Start spawning emojis with dynamic difficulty
        spawnEmojisWithDifficulty();
        // Start timer
        timerInterval = setInterval(updateTimer, 1000);
    });
}

// Show countdown (3, 2, 1, GO!)
function showCountdown(callback) {
    isCountingDown = true;
    const overlay = document.getElementById('countdown-overlay');
    const numberElement = document.getElementById('countdown-number');
    overlay.style.display = 'flex';
    
    let count = 3;
    numberElement.textContent = count;
    
    countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            numberElement.textContent = count;
            // Restart animation
            numberElement.style.animation = 'none';
            setTimeout(() => {
                numberElement.style.animation = 'countdown-pulse 1s ease-in-out';
            }, 10);
            playClickSound();
        } else if (count === 0) {
            numberElement.textContent = 'GO!';
            numberElement.style.animation = 'none';
            setTimeout(() => {
                numberElement.style.animation = 'countdown-pulse 1s ease-in-out';
            }, 10);
            playPopSound();
        } else {
            clearInterval(countdownInterval);
            overlay.style.display = 'none';
            isCountingDown = false;
            if (callback) callback();
        }
    }, 1000);
}

// Toggle pause
function togglePause() {
    if (!gameActive || isCountingDown || isPauseTransitioning) return;
    
    isPauseTransitioning = true;
    
    gamePaused = !gamePaused;
    const pauseBtn = document.getElementById('pause-btn');
    
    if (gamePaused) {
        // Pause the game
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        
        // Update button text with translation
        const resumeText = emojiPopTranslations['resume_button'][window.currentLanguage] || '▶️ Resume';
        pauseBtn.textContent = resumeText;
        pauseBtn.classList.add('paused');
        playClickSound();
        
        // Show pause overlay
        document.getElementById('pause-overlay').classList.add('active');
        
        // Mark all emojis as paused (the intervals will respect this flag)
        const emojis = document.querySelectorAll('.pop-emoji');
        const pauseTime = Date.now();
        emojis.forEach(emoji => {
            emoji.style.animationPlayState = 'paused';
            emoji.dataset.isPaused = 'true';
            emoji.dataset.pauseTime = pauseTime;
            // Clear the removal interval to prevent fading during pause
            if (emoji.removalInterval) {
                clearInterval(emoji.removalInterval);
                emoji.removalInterval = null;
            }
        });
        
        isPauseTransitioning = false;
    } else {
        // Resume game - we need to restart removal timers for existing emojis
        const pauseText = emojiPopTranslations['pause_button'][window.currentLanguage] || '⏸️ Pause';
        pauseBtn.textContent = pauseText;
        pauseBtn.classList.remove('paused');
        
        // Hide pause overlay
        document.getElementById('pause-overlay').classList.remove('active');
        
        showCountdown(() => {
            isCountingDown = false;
            isPauseTransitioning = false;
            gamePaused = false;
            gameActive = true; // Ensure game is active when resuming
            
            // Resume all emoji animations AFTER countdown
            const resumeTime = Date.now();
            const emojis = document.querySelectorAll('.pop-emoji');
            emojis.forEach(emoji => {
                emoji.style.animationPlayState = 'running';
                emoji.dataset.isPaused = 'false';
                
                // Restart the removal interval for each emoji
                const lifetime = parseFloat(emoji.dataset.lifetime) || 3000;
                const createdAt = parseFloat(emoji.dataset.createdAt) || Date.now();
                const pauseTime = parseFloat(emoji.dataset.pauseTime) || resumeTime;
                const pauseDuration = resumeTime - pauseTime;
                
                // Adjust createdAt to account for pause time
                const adjustedCreatedAt = createdAt + pauseDuration;
                emoji.dataset.createdAt = adjustedCreatedAt;
                
                const elapsed = resumeTime - adjustedCreatedAt;
                const remaining = Math.max(0, lifetime - elapsed);
                
                if (remaining > 0) {
                    let localElapsed = elapsed;
                    const checkInterval = 50;
                    
                    const removalChecker = setInterval(() => {
                        if (gamePaused || emoji.dataset.isPaused === 'true') {
                            return;
                        }
                        
                        if (!gameActive) {
                            clearInterval(removalChecker);
                            if (emoji.parentElement) emoji.remove();
                            return;
                        }
                        
                        localElapsed += checkInterval;
                        
                        if (localElapsed >= lifetime) {
                            clearInterval(removalChecker);
                            if (emoji.parentElement) {
                                emoji.remove();
                            }
                        }
                    }, checkInterval);
                    
                    emoji.removalInterval = removalChecker;
                } else {
                    emoji.remove();
                }
            });
            
            // Resume spawning with appropriate difficulty and timer from current state
            spawnEmojisWithDifficulty();
            timerInterval = setInterval(updateTimer, 1000);
        });
    }
}

// Spawn emojis with difficulty progression
function spawnEmojisWithDifficulty() {
    if (!gameActive) return;
    
    // Clear existing interval
    if (spawnInterval) clearInterval(spawnInterval);
    
    // Difficulty progression based on multiplier
    // x1: 900ms (faster than before)
    // x2: 800ms
    // x3: 700ms
    // x4: 600ms
    // x5: 550ms
    // x6: 500ms (fastest)
    const spawnRates = {
        1: 900,
        2: 800,
        3: 700,
        4: 600,
        5: 550,
        6: 500
    };
    const spawnRate = spawnRates[multiplier] || 900;
    
    spawnInterval = setInterval(spawnEmoji, spawnRate);
}

// Spawn emoji with difficulty based on multiplier
function spawnEmoji() {
    if (!gameActive) return;
    
    const spawnArea = document.getElementById('emoji-spawn-area');
    const emoji = document.createElement('div');
    emoji.className = 'pop-emoji';
    emoji.textContent = gameEmojis[Math.floor(Math.random() * gameEmojis.length)];
    
    // Difficulty progression based on multiplier
    // Size decreases as multiplier increases
    const emojiSizes = {
        1: '3rem',
        2: '2.9rem',
        3: '2.8rem',
        4: '2.7rem',
        5: '2.6rem',
        6: '2.5rem'
    };
    emoji.style.fontSize = emojiSizes[multiplier] || '3rem';
    
    // Random position
    const maxX = spawnArea.clientWidth - 60;
    const maxY = spawnArea.clientHeight - 60;
    emoji.style.left = Math.random() * maxX + 'px';
    emoji.style.top = Math.random() * maxY + 'px';
    
    // Click handler for desktop
    emoji.addEventListener('click', () => popEmoji(emoji));
    
    // Touch handler for mobile
    emoji.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default touch behavior
        popEmoji(emoji);
    }, { passive: false });
    
    spawnArea.appendChild(emoji);
    
    // Auto-remove timing based on multiplier
    // Lifetime decreases as multiplier increases
    const lifetimes = {
        1: 3000,
        2: 2700,
        3: 2400,
        4: 2100,
        5: 1800,
        6: 1500
    };
    const lifetime = lifetimes[multiplier] || 3000;
    
    // Store creation time and lifetime for pause/resume
    emoji.dataset.createdAt = Date.now();
    emoji.dataset.lifetime = lifetime;
    emoji.dataset.remainingTime = lifetime;
    emoji.dataset.isPaused = 'false';
    
    // Use a checking interval instead of a simple timeout to respect pause state
    let elapsed = 0;
    const checkInterval = 50; // Check every 50ms
    
    const removalChecker = setInterval(() => {
        // If game is paused, don't increment elapsed time
        if (gamePaused || emoji.dataset.isPaused === 'true') {
            return;
        }
        
        // If game is not active, clear and remove
        if (!gameActive) {
            clearInterval(removalChecker);
            if (emoji.parentElement) emoji.remove();
            return;
        }
        
        elapsed += checkInterval;
        
        // Check if lifetime has passed
        if (elapsed >= lifetime) {
            clearInterval(removalChecker);
            if (emoji.parentElement) {
                // Emoji was missed - reset streak
                streak = 0;
                multiplier = 1;
                updateRainbowGlow();
                emoji.remove();
            }
        }
    }, checkInterval);
    
    // Store the interval reference so it can be cleared
    emoji.removalInterval = removalChecker;
}

// Pop emoji
function popEmoji(emoji) {
    if (!gameActive || gamePaused) return;
    
    const currentTime = Date.now();
    const previousStreak = streak;
    
    // Check if streak continues (within 2 seconds of last pop)
    if (currentTime - lastPopTime <= streakTimeout) {
        streak++;
    } else {
        streak = 1;
    }
    lastPopTime = currentTime;
    
    // Calculate multiplier based on streak (every 5 pops), capped at 6x
    const previousMultiplier = multiplier;
    multiplier = Math.min(1 + Math.floor(streak / 5), 6);
    
    // Show popup when crossing a multiplier threshold (x2, x3, x4, x5, x6)
    if (multiplier > previousMultiplier && multiplier >= 2) {
        showMultiplierPopup(multiplier);
    }
    
    // Add score with multiplier
    score += multiplier;
    document.getElementById('score').textContent = score;
    
    // Update rainbow glow based on streak
    updateRainbowGlow();
    
    // Update combo meter
    updateComboMeter();
    
    // Animate pop
    emoji.classList.add('popping');
    playPopSound();
    
    setTimeout(() => emoji.remove(), 300);
}

// Update rainbow glow effect based on streak
function updateRainbowGlow() {
    const spawnArea = document.getElementById('emoji-spawn-area');
    const multiplierDisplay = document.getElementById('multiplier-display');
    const multiplierSpan = document.getElementById('multiplier');
    
    if (!spawnArea) return;
    
    if (streak < 5) {
        // No glow for streaks less than 5
        spawnArea.style.boxShadow = '';
        spawnArea.classList.remove('rainbow-glow');
        if (multiplierDisplay) multiplierDisplay.style.visibility = 'hidden';
    } else {
        // Calculate intensity based on streak - progressively stronger glow
        const comboLevel = Math.floor(streak / 5);
        const intensity = Math.min(15 + (comboLevel * 10), 65); // 15px to 65px glow (stronger progression)
        
        // Add rainbow glow class for animation
        spawnArea.classList.add('rainbow-glow');
        spawnArea.style.setProperty('--glow-intensity', `${intensity}px`);
        
        // Show and update multiplier display
        if (multiplierDisplay) {
            multiplierDisplay.style.visibility = 'visible';
            if (multiplierSpan) multiplierSpan.textContent = multiplier;
        }
    }
}

// Show multiplier popup when threshold is crossed
function showMultiplierPopup(multiplierValue) {
    const popup = document.getElementById('multiplier-popup');
    if (!popup) return;
    
    // Update text
    popup.textContent = `x${multiplierValue}`;
    
    // Remove any existing animation
    popup.classList.remove('show-popup');
    
    // Trigger reflow to restart animation
    void popup.offsetWidth;
    
    // Add animation class
    popup.classList.add('show-popup');
    
    // Trigger pulsation on spawn area
    const spawnArea = document.getElementById('emoji-spawn-area');
    if (spawnArea) {
        spawnArea.classList.remove('glow-pulse');
        void spawnArea.offsetWidth;
        spawnArea.classList.add('glow-pulse');
        
        // Remove pulse class after animation
        setTimeout(() => {
            spawnArea.classList.remove('glow-pulse');
        }, 600);
    }
    
    // Remove show class after animation completes
    setTimeout(() => {
        popup.classList.remove('show-popup');
    }, 1500);
}

// Update combo meter display
function updateComboMeter() {
    const meterFill = document.getElementById('combo-meter-fill');
    const comboLevelText = document.getElementById('combo-level-text');
    const comboMultiplierText = document.getElementById('combo-multiplier-text');
    
    if (!meterFill) return;
    
    // Calculate percentage (0-100%) based on streak, capped at 30 (6x combo)
    const maxStreak = 30; // 6x multiplier at 30 streak
    const percentage = Math.min((streak / maxStreak) * 100, 100);
    
    // Update meter fill
    meterFill.style.width = `${percentage}%`;
    
    // Update text
    if (comboMultiplierText) {
        comboMultiplierText.textContent = `x${multiplier}`;
    }
    
    // Add rainbow effect when reaching higher combos
    if (streak >= 5) {
        meterFill.classList.add('rainbow-fill');
        if (comboLevelText) comboLevelText.textContent = 'COMBO';
    } else {
        meterFill.classList.remove('rainbow-fill');
        if (comboLevelText) comboLevelText.textContent = 'COMBO';
    }
    
    // Pulse effect on combo level up
    const currentComboLevel = Math.floor(streak / 5);
    const previousComboLevel = Math.floor((streak - 1) / 5);
    if (currentComboLevel > previousComboLevel && streak >= 5) {
        meterFill.classList.add('meter-pulse');
        setTimeout(() => meterFill.classList.remove('meter-pulse'), 500);
    }
}

// Update timer
function updateTimer() {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    
    // Trigger difficulty change when entering hard mode
    if (timeLeft === 20) {
        spawnEmojisWithDifficulty();
    }
    
    if (timeLeft <= 0) {
        endGame();
    }
}

// End game
function endGame() {
    gameActive = false;
    gamePaused = false;
    clearInterval(spawnInterval);
    clearInterval(timerInterval);
    clearInterval(countdownInterval);
    
    // Clear remaining emojis and remove rainbow glow
    const spawnArea = document.getElementById('emoji-spawn-area');
    spawnArea.innerHTML = '';
    spawnArea.classList.remove('rainbow-glow');
    spawnArea.style.boxShadow = '';
    
    // Save score to leaderboard
    saveScore(playerName, score);
    
    // Show game over screen
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'block';
    document.getElementById('final-score').textContent = score;
    
    // Display leaderboard
    displayLeaderboard();
    
    playGameOverSound();
}

// Show play again modal
function showPlayAgainModal() {
    const modal = document.getElementById('play-again-modal');
    modal.style.display = 'flex';
    updatePlayAgainModalTranslation();
    playClickSound();
}

// Update pause button translation (called when language changes)
window.updatePauseButtonTranslation = function() {
    const pauseBtn = document.getElementById('pause-btn');
    if (!pauseBtn) return;
    
    if (gamePaused) {
        const resumeText = emojiPopTranslations['resume_button'][window.currentLanguage] || '▶️ Resume';
        pauseBtn.textContent = resumeText;
    } else if (gameActive) {
        const pauseText = emojiPopTranslations['pause_button'][window.currentLanguage] || '⏸️ Pause';
        pauseBtn.textContent = pauseText;
    }
};

// Update play again modal translation (called when language changes)
window.updatePlayAgainModalTranslation = function() {
    const modal = document.getElementById('play-again-modal');
    
    // Only update if modal exists and is visible
    if (!modal || modal.style.display !== 'flex') return;
    
    // Update title and question with translations
    const titleElement = modal.querySelector('[data-translate="play_again_title"]');
    const questionElement = modal.querySelector('[data-translate="play_again_question"]');
    
    const titleText = emojiPopTranslations['play_again_title'][window.currentLanguage] || 'Play Again?';
    const questionText = emojiPopTranslations['play_again_question'][window.currentLanguage] || 'Would you like to play again?';
    
    titleElement.textContent = titleText;
    questionElement.textContent = questionText;
    
    // Update button text with translations
    const sameNameBtn = document.getElementById('same-name-btn');
    const newNameBtn = document.getElementById('new-name-btn');
    
    const sameNameText = emojiPopTranslations['same_name'][window.currentLanguage] || 'Continue as';
    const newNameText = emojiPopTranslations['new_name'][window.currentLanguage] || 'Play as Different Person';
    
    sameNameBtn.innerHTML = `${sameNameText} <span id="current-player-name">${playerName}</span>`;
    newNameBtn.textContent = newNameText;
};

// Play again with same name
function playAgainSameName() {
    document.getElementById('play-again-modal').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    playClickSound();
    startGame();
}

// Play again with new name
function playAgainNewName() {
    document.getElementById('play-again-modal').style.display = 'none';
    resetGame();
}

// Reset game (for navigating away)
function resetGame() {
    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('name-input-screen').style.display = 'block';
    document.getElementById('player-name').value = '';
    playerName = '';
    playClickSound();
}

// Handle back button click
function handleBackButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (gameActive) {
        // Game is active, show confirmation modal
        showExitConfirmation();
    } else {
        // Game is not active, navigate directly
        window.location.href = '/games';
    }
    return false;
}

// Show exit confirmation modal
function showExitConfirmation() {
    // Pause the game first
    if (gameActive && !gamePaused) {
        // Pause game timers
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        gamePaused = true;
        
        // Clear all emoji removal timeouts and store remaining time
        const emojis = document.querySelectorAll('.pop-emoji');
        const pauseTime = Date.now();
        emojis.forEach(emoji => {
            if (emoji.removalTimeout) {
                clearTimeout(emoji.removalTimeout);
                emoji.removalTimeout = null;
            }
            // Calculate remaining time
            const createdAt = parseFloat(emoji.dataset.createdAt);
            const lifetime = parseFloat(emoji.dataset.lifetime);
            const elapsed = pauseTime - createdAt;
            emoji.dataset.remainingTime = Math.max(0, lifetime - elapsed);
            emoji.style.animationPlayState = 'paused';
        });
    }
    
    const modal = document.getElementById('exit-confirmation-modal');
    modal.style.display = 'flex';
    updateExitModalTranslation();
    playClickSound();
}

// Update exit modal translation (called when language changes)
window.updateExitModalTranslation = function() {
    const modal = document.getElementById('exit-confirmation-modal');
    
    // Only update if modal exists and is visible
    if (!modal || modal.style.display !== 'flex') return;
    
    const titleElement = modal.querySelector('[data-translate="exit_game_title"]');
    const questionElement = modal.querySelector('[data-translate="exit_game_question"]');
    const yesBtn = document.getElementById('exit-yes-btn');
    const noBtn = document.getElementById('exit-no-btn');
    
    const titleText = emojiPopTranslations['exit_game_title'][window.currentLanguage] || 'Exit Game?';
    const questionText = emojiPopTranslations['exit_game_question'][window.currentLanguage] || 'Are you sure you want to exit? Your current game will be lost.';
    const yesText = emojiPopTranslations['exit_yes'][window.currentLanguage] || 'Yes, Exit';
    const noText = emojiPopTranslations['exit_no'][window.currentLanguage] || 'No, Continue Playing';
    
    titleElement.textContent = titleText;
    questionElement.textContent = questionText;
    yesBtn.textContent = yesText;
    noBtn.textContent = noText;
};

// Confirm exit - navigate to games page
function confirmExit() {
    playClickSound();
    // Set flag to bypass beforeunload event
    window.isNavigatingAway = true;
    // Reset game state
    gameActive = false;
    gamePaused = false;
    clearInterval(spawnInterval);
    clearInterval(timerInterval);
    // Navigate to games page
    window.location.href = '/games';
}

// Cancel exit - resume game
function cancelExit() {
    const modal = document.getElementById('exit-confirmation-modal');
    modal.style.display = 'none';
    playClickSound();
    
    // Resume game with countdown
    const pauseBtn = document.getElementById('pause-btn');
    const pauseText = emojiPopTranslations['pause_button'][window.currentLanguage] || '⏸️ Pause';
    pauseBtn.textContent = pauseText;
    pauseBtn.classList.remove('paused');
    
    // Hide pause overlay
    document.getElementById('pause-overlay').classList.remove('active');
    
    // Resume all emoji animations
    const emojis = document.querySelectorAll('.pop-emoji');
    emojis.forEach(emoji => {
        emoji.style.animationPlayState = 'running';
        emoji.dataset.isPaused = 'false';
        
        // Restart the removal interval for each emoji
        const lifetime = parseFloat(emoji.dataset.lifetime) || 3000;
        const createdAt = parseFloat(emoji.dataset.createdAt) || Date.now();
        const elapsed = Date.now() - createdAt;
        const remaining = Math.max(0, lifetime - elapsed);
        
        if (remaining > 0) {
            let localElapsed = elapsed;
            const checkInterval = 50;
            
            const removalChecker = setInterval(() => {
                if (gamePaused || emoji.dataset.isPaused === 'true') {
                    return;
                }
                
                if (!gameActive) {
                    clearInterval(removalChecker);
                    if (emoji.parentElement) emoji.remove();
                    return;
                }
                
                localElapsed += checkInterval;
                
                if (localElapsed >= lifetime) {
                    clearInterval(removalChecker);
                    if (emoji.parentElement) {
                        emoji.remove();
                    }
                }
            }, checkInterval);
            
            emoji.removalInterval = removalChecker;
        } else {
            emoji.remove();
        }
    });
    
    showCountdown(() => {
        gamePaused = false;
        isCountingDown = false;
        // Resume spawning with appropriate difficulty and timer from current state
        spawnEmojisWithDifficulty();
        timerInterval = setInterval(updateTimer, 1000);
    });
}

// Show restart confirmation modal
function showRestartModal() {
    if (!gameActive) return; // Only show if game is active
    
    // Pause the game first
    if (!gamePaused) {
        // Pause game timers
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        gamePaused = true;
        
        // Pause all emojis
        const emojis = document.querySelectorAll('.pop-emoji');
        emojis.forEach(emoji => {
            emoji.style.animationPlayState = 'paused';
            emoji.dataset.isPaused = 'true';
            if (emoji.removalInterval) {
                clearInterval(emoji.removalInterval);
                emoji.removalInterval = null;
            }
        });
    }
    
    const modal = document.getElementById('restart-confirmation-modal');
    modal.style.display = 'flex';
    updateRestartModalTranslation();
    playClickSound();
}

// Update restart modal translation
window.updateRestartModalTranslation = function() {
    const modal = document.getElementById('restart-confirmation-modal');
    if (!modal || modal.style.display !== 'flex') return;
    
    const titleElement = modal.querySelector('[data-translate="restart_game_title"]');
    const questionElement = modal.querySelector('[data-translate="restart_game_question"]');
    const yesBtn = document.getElementById('restart-yes-btn');
    const noBtn = document.getElementById('restart-no-btn');
    
    const titleText = emojiPopTranslations['restart_game_title'][window.currentLanguage] || 'Restart Game?';
    const questionText = emojiPopTranslations['restart_game_question'][window.currentLanguage] || 'Are you sure you want to restart? Your current game will be lost.';
    const yesText = emojiPopTranslations['restart_yes'][window.currentLanguage] || 'Yes, Restart';
    const noText = emojiPopTranslations['restart_no'][window.currentLanguage] || 'No, Continue Playing';
    
    if (titleElement) titleElement.textContent = titleText;
    if (questionElement) questionElement.textContent = questionText;
    if (yesBtn) yesBtn.textContent = yesText;
    if (noBtn) noBtn.textContent = noText;
};

// Confirm restart - restart the game
function confirmRestart() {
    playClickSound();
    const modal = document.getElementById('restart-confirmation-modal');
    modal.style.display = 'none';
    
    // Reset game completely
    gameActive = false;
    gamePaused = false;
    clearInterval(spawnInterval);
    clearInterval(timerInterval);
    document.getElementById('emoji-spawn-area').innerHTML = '';
    
    // Start fresh game
    startGame();
}

// Cancel restart - resume game
function cancelRestart() {
    const modal = document.getElementById('restart-confirmation-modal');
    modal.style.display = 'none';
    playClickSound();
    
    // Resume game with countdown
    const pauseBtn = document.getElementById('pause-btn');
    const pauseText = emojiPopTranslations['pause_button'][window.currentLanguage] || '⏸️ Pause';
    pauseBtn.textContent = pauseText;
    pauseBtn.classList.remove('paused');
    
    document.getElementById('pause-overlay').classList.remove('active');
    
    // Don't resume emojis yet - wait for countdown to finish
    showCountdown(() => {
        gamePaused = false;
        isCountingDown = false;
        
        // NOW resume all emoji animations after countdown
        const emojis = document.querySelectorAll('.pop-emoji');
        emojis.forEach(emoji => {
            emoji.style.animationPlayState = 'running';
            emoji.dataset.isPaused = 'false';
            
            // Restart removal interval
            const lifetime = parseFloat(emoji.dataset.lifetime) || 3000;
            const createdAt = parseFloat(emoji.dataset.createdAt) || Date.now();
            const elapsed = Date.now() - createdAt;
            const remaining = Math.max(0, lifetime - elapsed);
            
            if (remaining > 0) {
                let localElapsed = elapsed;
                const checkInterval = 50;
                
                const removalChecker = setInterval(() => {
                    if (gamePaused || emoji.dataset.isPaused === 'true') return;
                    if (!gameActive) {
                        clearInterval(removalChecker);
                        if (emoji.parentElement) emoji.remove();
                        return;
                    }
                    
                    localElapsed += checkInterval;
                    if (localElapsed >= lifetime) {
                        clearInterval(removalChecker);
                        if (emoji.parentElement) {
                            streak = 0;
                            multiplier = 1;
                            updateRainbowGlow();
                            emoji.remove();
                        }
                    }
                }, checkInterval);
                
                emoji.removalInterval = removalChecker;
            } else {
                emoji.remove();
            }
        });
        
        spawnEmojisWithDifficulty();
        timerInterval = setInterval(updateTimer, 1000);
    });
}

// Save score to localStorage (keep only highest score per player)
function saveScore(name, newScore) {
    let leaderboard = JSON.parse(localStorage.getItem('emojiPopLeaderboard')) || [];
    
    let isNewRecord = false;
    let isNewNumberOne = false;
    const oldTopScore = leaderboard.length > 0 ? leaderboard[0].score : 0;
    
    // Find existing entry for this player
    const existingIndex = leaderboard.findIndex(entry => entry.name.toLowerCase() === name.toLowerCase());
    
    if (existingIndex !== -1) {
        // Player exists - update only if new score is higher
        if (newScore > leaderboard[existingIndex].score) {
            leaderboard[existingIndex].score = newScore;
            leaderboard[existingIndex].date = new Date().toISOString();
            isNewRecord = true;
        }
        // If score is not higher, don't modify the existing entry
    } else {
        // New player - add to leaderboard
        leaderboard.push({ name, score: newScore, date: new Date().toISOString() });
        isNewRecord = true;
    }
    
    // Sort by score descending THEN keep top 5
    // This ensures new high scores are properly included
    leaderboard.sort((a, b) => b.score - a.score);
    
    // Check if this score is now #1
    if (isNewRecord && leaderboard[0].score === newScore && newScore > oldTopScore) {
        isNewNumberOne = true;
    }
    
    leaderboard = leaderboard.slice(0, 5);
    
    localStorage.setItem('emojiPopLeaderboard', JSON.stringify(leaderboard));
    
    // Trigger confetti celebration if high score or new #1
    if (isNewNumberOne) {
        triggerConfetti('🎉 NEW RECORD! #1 🎉');
    } else if (isNewRecord) {
        triggerConfetti('🎊 HIGH SCORE! 🎊');
    }
}

// Trigger confetti celebration
function triggerConfetti(message) {
    const container = document.getElementById('confetti-container');
    const messageEl = document.getElementById('celebration-message');
    
    // Show celebration message
    messageEl.textContent = message;
    messageEl.classList.add('show');
    
    // Create confetti pieces
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff1493', '#7fff00', '#ff4500'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = '0s';
            confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
            
            // Random shapes
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => confetti.remove(), 4000);
        }, i * 10);
    }
    
    // Hide message after animation
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, 2000);
}

// Display leaderboard
function displayLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('emojiPopLeaderboard')) || [];
    const list = document.getElementById('leaderboard-list');
    const listStart = document.getElementById('leaderboard-list-start');
    
    // Clear both lists
    list.innerHTML = '';
    if (listStart) listStart.innerHTML = '';
    
    if (leaderboard.length === 0) {
        const emptyMessage = '<li style="list-style: none; text-align: center; opacity: 0.6;">No scores yet</li>';
        list.innerHTML = emptyMessage;
        if (listStart) listStart.innerHTML = emptyMessage;
        return;
    }
    
    leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        const currentLang = window.currentLanguage || 'en';
        const pointsText = getTranslation('leaderboard_points', currentLang) || 'points';
        li.innerHTML = `<strong>${entry.name}</strong>: ${entry.score} ${pointsText}`;
        if (index === 0) li.style.color = '#ffd700';
        if (index === 1) li.style.color = '#c0c0c0';
        if (index === 2) li.style.color = '#cd7f32';
        list.appendChild(li);
        
        // Clone for start screen leaderboard
        if (listStart) {
            const liClone = li.cloneNode(true);
            listStart.appendChild(liClone);
        }
    });
}

// Make displayLeaderboard available globally for language updates
window.updateEmojiPopLeaderboard = displayLeaderboard;

// Sound effects
function playClickSound() {
    if (!window.isMusicMuted) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
        audio.volume = 0.1;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

function playPopSound() {
    if (!window.isMusicMuted) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
        audio.volume = 0.12;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

function playErrorSound() {
    if (!window.isMusicMuted) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

function playGameOverSound() {
    if (!window.isMusicMuted) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
        audio.volume = 0.15;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}
