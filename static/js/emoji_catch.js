// Emoji Catch Game - use globals from animations.js
let caughtCount = 0;
let timeLeft = 30;
let gameActive = false;
let gamePaused = false;
let playerName = '';
let spawnInterval;
let timerInterval;
let countdownInterval;
let isCountingDown = false;
let isPauseTransitioning = false;
let lives = 3;

// Falling emoji configuration
const fallingEmojis = ['🎈', '🎉', '🎊', '🎁', '🌟', '⭐', '💫', '✨', '🎀', '🎂', '🍰', '🧁'];
const badEmojis = ['💣', '☠️', '👻', '🔥', '⚡', '💀'];
let basket;
let basketX = 0;

// Game translations
const emojiCatchTranslations = {
    'emoji_catch_game_title': {
        'en': '🧺 Emoji Catch',
        'es': '🧺 Atrapa Emojis',
        'zh': '🧺 捕捉表情符号',
        'fr': '🧺 Attrape Emoji',
        'hi': '🧺 इमोजी पकड़ो',
        'tl': '🧺 Hulihin ang Emoji',
        'ja': '🧺 絵文字キャッチ'
    },
    'emoji_catch_instructions': {
        'en': 'Catch as many falling emojis as you can with your basket!',
        'es': '¡Atrapa tantos emojis que caen como puedas con tu canasta!',
        'zh': '用你的篮子接住尽可能多的下落表情符号！',
        'fr': 'Attrapez autant d\'emojis qui tombent que possible avec votre panier!',
        'hi': 'अपनी टोकरी से जितने गिरते इमोजी पकड़ सकते हैं पकड़ें!',
        'tl': 'Hulihin ang maraming nahuhulog na emoji hangga\'t maaari sa iyong basket!',
        'ja': 'バスケットで落ちてくる絵文字をできるだけたくさんキャッチしよう！'
    },
    'caught_label': {
        'en': 'Caught:',
        'es': 'Atrapados:',
        'zh': '已捕获：',
        'fr': 'Attrapés:',
        'hi': 'पकड़े गए:',
        'tl': 'Nahuli:',
        'ja': 'キャッチ：'
    },
    'lives_label': {
        'en': 'Lives:',
        'es': 'Vidas:',
        'zh': '生命：',
        'fr': 'Vies:',
        'hi': 'जीवन:',
        'tl': 'Buhay:',
        'ja': 'ライフ：'
    },
    'missed_label': {
        'en': 'Missed:',
        'es': 'Perdidos:',
        'zh': '已错过：',
        'fr': 'Manqués:',
        'hi': 'छूटे हुए:',
        'tl': 'Nakaligtaan:',
        'ja': 'ミス：'
    },
    'end_game': {
        'en': 'End Game',
        'es': 'Terminar Juego',
        'zh': '结束游戏',
        'fr': 'Terminer le Jeu',
        'hi': 'खेल समाप्त करें',
        'tl': 'Tapusin ang Laro',
        'ja': 'ゲーム終了'
    },
    'emojis_caught': {
        'en': 'Emojis Caught:',
        'es': 'Emojis Atrapados:',
        'zh': '捕获的表情符号：',
        'fr': 'Emojis Attrapés:',
        'hi': 'पकड़े गए इमोजी:',
        'tl': 'Mga Nahuli na Emoji:',
        'ja': 'キャッチした絵文字：'
    },
    'emojis_missed': {
        'en': 'Emojis Missed:',
        'es': 'Emojis Perdidos:',
        'zh': '错过的表情符号：',
        'fr': 'Emojis Manqués:',
        'hi': 'छूटे हुए इमोजी:',
        'tl': 'Mga Nakaligtaang Emoji:',
        'ja': 'ミスした絵文字：'
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
    playEmojiCatchBackgroundMusic();
    
    // Event listeners
    document.getElementById('start-game-btn').addEventListener('click', validateAndStartGame);
    document.getElementById('play-again-btn').addEventListener('click', showPlayAgainModal);
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('same-name-btn').addEventListener('click', playAgainSameName);
    document.getElementById('new-name-btn').addEventListener('click', playAgainNewName);
    
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
});

// Play background music
function playEmojiCatchBackgroundMusic() {
    // Stop and clean up previous game music if it exists
    if (window.gameBackgroundMusic) {
        window.gameBackgroundMusic.pause();
        window.gameBackgroundMusic.currentTime = 0;
    }
    
    // Create new game music
    window.gameBackgroundMusic = new Audio('https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3');
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
    caughtCount = 0;
    timeLeft = 30;
    lives = 3;
    gameActive = false;
    gamePaused = false;
    
    document.getElementById('score').textContent = caughtCount;
    document.getElementById('timer').textContent = timeLeft;
    updateLivesDisplay();
    
    // Set pause button text with translation
    const pauseText = emojiCatchTranslations['pause_button'][window.currentLanguage] || '⏸️ Pause';
    document.getElementById('pause-btn').textContent = pauseText;
    document.getElementById('pause-btn').classList.remove('paused');
    
    // Clear catch area
    document.querySelectorAll('.falling-emoji').forEach(emoji => emoji.remove());
    
    // Initialize basket
    basket = document.getElementById('basket');
    const catchArea = document.getElementById('catch-area');
    basketX = catchArea.clientWidth / 2 - 40;
    basket.style.left = basketX + 'px';
    
    // Basket movement with mouse
    catchArea.addEventListener('mousemove', moveBasket);
    
    // Show countdown before starting
    showCountdown(() => {
        gameActive = true;
        // Start spawning emojis with dynamic interval
        spawnEmojisWithDifficulty();
        // Start timer
        timerInterval = setInterval(updateTimer, 1000);
    });
}

// Move basket with mouse
function moveBasket(e) {
    if (!gameActive || gamePaused) return;
    
    const catchArea = document.getElementById('catch-area');
    const rect = catchArea.getBoundingClientRect();
    basketX = e.clientX - rect.left - 40; // Center basket on cursor
    
    // Keep basket within bounds
    const maxX = catchArea.clientWidth - 80;
    basketX = Math.max(0, Math.min(basketX, maxX));
    
    basket.style.left = basketX + 'px';
}

// Spawn falling emoji
function spawnFallingEmoji() {
    if (!gameActive) return;
    
    const catchArea = document.getElementById('catch-area');
    const emoji = document.createElement('div');
    
    // 30% chance to spawn bad emoji
    const isBadEmoji = Math.random() < 0.3;
    emoji.className = isBadEmoji ? 'falling-emoji bad-emoji' : 'falling-emoji';
    emoji.textContent = isBadEmoji 
        ? badEmojis[Math.floor(Math.random() * badEmojis.length)]
        : fallingEmojis[Math.floor(Math.random() * fallingEmojis.length)];
    emoji.dataset.isBad = isBadEmoji;
    
    // Random horizontal position
    const maxX = catchArea.clientWidth - 40;
    const startX = Math.random() * maxX;
    emoji.style.left = startX + 'px';
    emoji.style.top = '0px';
    
    catchArea.appendChild(emoji);
    
    // Difficulty progression based on time remaining
    // First 10 seconds (timeLeft 30-21): Easy mode
    // Last 20 seconds (timeLeft 20-0): Hard mode - faster falling
    const isHardMode = timeLeft <= 20;
    
    // Animate falling
    let posY = 0;
    // Easy mode: slower speed (2-4), Hard mode: faster speed (4-7)
    const fallSpeed = isHardMode ? 4 + Math.random() * 3 : 2 + Math.random() * 2;
    
    // Store current position on emoji element for pause/resume
    emoji.dataset.posY = '0';
    emoji.dataset.fallSpeed = fallSpeed;
    
    function continueFalling() {
        const fallInterval = setInterval(() => {
            if (!gameActive) {
                clearInterval(fallInterval);
                emoji.remove();
                return;
            }
            
            if (gamePaused) {
                clearInterval(fallInterval);
                emoji.fallInterval = null;
                return;
            }
            
            posY += fallSpeed;
            emoji.style.top = posY + 'px';
            emoji.dataset.posY = posY;
            
            // Check if caught
            const emojiRect = emoji.getBoundingClientRect();
            const basketRect = basket.getBoundingClientRect();
            
            if (checkCollision(emojiRect, basketRect)) {
                const isBadEmoji = emoji.dataset.isBad === 'true';
                
                if (isBadEmoji) {
                    // Bad emoji caught - lose a life
                    lives--;
                    updateLivesDisplay();
                    emoji.classList.add('bad-caught');
                    playErrorSound();
                    clearInterval(fallInterval);
                    emoji.fallInterval = null;
                    setTimeout(() => emoji.remove(), 300);
                    
                    // Check if game over due to no lives
                    if (lives <= 0) {
                        endGame();
                    }
                    return;
                } else {
                    // Good emoji caught
                    caughtCount++;
                    document.getElementById('score').textContent = caughtCount;
                    emoji.classList.add('caught');
                    playCatchSound();
                    clearInterval(fallInterval);
                    emoji.fallInterval = null;
                    setTimeout(() => emoji.remove(), 300);
                    return;
                }
            }
            
            // Check if reached bottom
            if (posY > catchArea.clientHeight - 40) {
                playMissSound();
                clearInterval(fallInterval);
                emoji.fallInterval = null;
                emoji.remove();
            }
        }, 20);
        
        emoji.fallInterval = fallInterval;
    }
    
    continueFalling();
}

// Spawn emojis with difficulty progression
function spawnEmojisWithDifficulty() {
    if (!gameActive) return;
    
    // Clear existing interval
    if (spawnInterval) clearInterval(spawnInterval);
    
    // Difficulty progression based on time remaining
    // First 10 seconds (timeLeft 30-21): Easy mode - spawn every 1000ms
    // Last 20 seconds (timeLeft 20-0): Hard mode - spawn every 600ms (faster)
    const isHardMode = timeLeft <= 20;
    const spawnRate = isHardMode ? 600 : 1000;
    
    spawnInterval = setInterval(spawnFallingEmoji, spawnRate);
}

// Check collision between emoji and basket
function checkCollision(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
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
            playClickSound();
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
        const resumeText = emojiCatchTranslations['resume_button'][window.currentLanguage] || '▶️ Resume';
        pauseBtn.textContent = resumeText;
        pauseBtn.classList.add('paused');
        playClickSound();
        
        // Show pause overlay
        document.getElementById('pause-overlay').classList.add('active');
        
        // Stop all falling emojis (their fallIntervals will stop via gamePaused check)
        // Note: Individual fallIntervals check gamePaused and stop automatically
        
        isPauseTransitioning = false;
    } else {
        // Resume game - we need to restart falling for existing emojis
        const pauseText = emojiCatchTranslations['pause_button'][window.currentLanguage] || '⏸️ Pause';
        pauseBtn.textContent = pauseText;
        pauseBtn.classList.remove('paused');
        
        // Hide pause overlay
        document.getElementById('pause-overlay').classList.remove('active');
        
        showCountdown(() => {
            gamePaused = false;
            isCountingDown = false;
            isPauseTransitioning = false;
            
            // Resume all paused falling emojis
            const pausedEmojis = document.querySelectorAll('.falling-emoji');
            pausedEmojis.forEach(emoji => {
                if (!emoji.fallInterval) {
                    // Restore position from dataset
                    let posY = parseFloat(emoji.dataset.posY) || 0;
                    const fallSpeed = parseFloat(emoji.dataset.fallSpeed);
                    const catchArea = document.getElementById('catch-area');
                    
                    const fallInterval = setInterval(() => {
                        if (!gameActive) {
                            clearInterval(fallInterval);
                            emoji.remove();
                            return;
                        }
                        
                        if (gamePaused) {
                            clearInterval(fallInterval);
                            emoji.fallInterval = null;
                            return;
                        }
                        
                        posY += fallSpeed;
                        emoji.style.top = posY + 'px';
                        emoji.dataset.posY = posY;
                        
                        // Check if caught
                        const emojiRect = emoji.getBoundingClientRect();
                        const basketRect = basket.getBoundingClientRect();
                        
                        if (checkCollision(emojiRect, basketRect)) {
                            const isBadEmoji = emoji.dataset.isBad === 'true';
                            
                            if (isBadEmoji) {
                                // Bad emoji caught - lose a life
                                lives--;
                                updateLivesDisplay();
                                emoji.classList.add('bad-caught');
                                playErrorSound();
                                clearInterval(fallInterval);
                                emoji.fallInterval = null;
                                setTimeout(() => emoji.remove(), 300);
                                
                                // Check if game over due to no lives
                                if (lives <= 0) {
                                    endGame();
                                }
                                return;
                            } else {
                                // Good emoji caught
                                caughtCount++;
                                document.getElementById('score').textContent = caughtCount;
                                emoji.classList.add('caught');
                                playCatchSound();
                                clearInterval(fallInterval);
                                emoji.fallInterval = null;
                                setTimeout(() => emoji.remove(), 300);
                                return;
                            }
                        }
                        
                        // Check if reached bottom
                        if (posY > catchArea.clientHeight - 40) {
                            playMissSound();
                            clearInterval(fallInterval);
                            emoji.fallInterval = null;
                            emoji.remove();
                        }
                    }, 20);
                    
                    emoji.fallInterval = fallInterval;
                }
            });
            
            // Resume spawning with appropriate difficulty and timer from current state
            spawnEmojisWithDifficulty();
            timerInterval = setInterval(updateTimer, 1000);
        });
    }
}

// End game early
function endGameEarly() {
    if (confirm('Are you sure you want to end the game?')) {
        endGame();
    }
}

// End game
function endGame() {
    gameActive = false;
    clearInterval(spawnInterval);
    clearInterval(timerInterval);
    
    // Clear falling emojis
    document.querySelectorAll('.falling-emoji').forEach(emoji => emoji.remove());
    
    // Save score to leaderboard (only highest score per player)
    saveScore(playerName, caughtCount);
    
    // Show game over screen
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'block';
    document.getElementById('final-caught').textContent = caughtCount;
    
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
        const resumeText = emojiCatchTranslations['resume_button'][window.currentLanguage] || '▶️ Resume';
        pauseBtn.textContent = resumeText;
    } else if (gameActive) {
        const pauseText = emojiCatchTranslations['pause_button'][window.currentLanguage] || '⏸️ Pause';
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
    
    const titleText = emojiCatchTranslations['play_again_title'][window.currentLanguage] || 'Play Again?';
    const questionText = emojiCatchTranslations['play_again_question'][window.currentLanguage] || 'Would you like to play again?';
    
    titleElement.textContent = titleText;
    questionElement.textContent = questionText;
    
    // Update button text with translations
    const sameNameBtn = document.getElementById('same-name-btn');
    const newNameBtn = document.getElementById('new-name-btn');
    
    const sameNameText = emojiCatchTranslations['same_name'][window.currentLanguage] || 'Continue as';
    const newNameText = emojiCatchTranslations['new_name'][window.currentLanguage] || 'Play as Different Person';
    
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
        
        // Show pause overlay
        document.getElementById('pause-overlay').classList.add('active');
        
        // Freeze all falling emojis
        const emojis = document.querySelectorAll('.falling-emoji');
        emojis.forEach(emoji => {
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
    
    const titleText = emojiCatchTranslations['exit_game_title'][window.currentLanguage] || 'Exit Game?';
    const questionText = emojiCatchTranslations['exit_game_question'][window.currentLanguage] || 'Are you sure you want to exit? Your current game will be lost.';
    const yesText = emojiCatchTranslations['exit_yes'][window.currentLanguage] || 'Yes, Exit';
    const noText = emojiCatchTranslations['exit_no'][window.currentLanguage] || 'No, Continue Playing';
    
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
    const pauseText = emojiCatchTranslations['pause_button'][window.currentLanguage] || '⏸️ Pause';
    pauseBtn.textContent = pauseText;
    pauseBtn.classList.remove('paused');
    
    // Hide pause overlay
    document.getElementById('pause-overlay').classList.remove('active');
    
    // Resume all falling emoji animations
    const emojis = document.querySelectorAll('.falling-emoji');
    emojis.forEach(emoji => {
        emoji.style.animationPlayState = 'running';
    });
    
    showCountdown(() => {
        gamePaused = false;
        isCountingDown = false;
        
        // Resume all paused falling emojis
        const pausedEmojis = document.querySelectorAll('.falling-emoji');
        pausedEmojis.forEach(emoji => {
            if (!emoji.fallInterval) {
                // Restore position from dataset
                let posY = parseFloat(emoji.dataset.posY) || 0;
                const fallSpeed = parseFloat(emoji.dataset.fallSpeed);
                const catchArea = document.getElementById('catch-area');
                
                const fallInterval = setInterval(() => {
                    if (!gameActive) {
                        clearInterval(fallInterval);
                        emoji.remove();
                        return;
                    }
                    
                    if (gamePaused) {
                        clearInterval(fallInterval);
                        emoji.fallInterval = null;
                        return;
                    }
                    
                    posY += fallSpeed;
                    emoji.style.top = posY + 'px';
                    emoji.dataset.posY = posY;
                    
                    // Check if caught
                    const emojiRect = emoji.getBoundingClientRect();
                    const basketRect = basket.getBoundingClientRect();
                    
                    if (checkCollision(emojiRect, basketRect)) {
                        caughtCount++;
                        document.getElementById('score').textContent = caughtCount;
                        emoji.classList.add('caught');
                        playCatchSound();
                        clearInterval(fallInterval);
                        emoji.fallInterval = null;
                        setTimeout(() => emoji.remove(), 300);
                        return;
                    }
                    
                    // Check if reached bottom
                    if (posY > catchArea.clientHeight - 40) {
                        playMissSound();
                        clearInterval(fallInterval);
                        emoji.fallInterval = null;
                        emoji.remove();
                    }
                }, 20);
                
                emoji.fallInterval = fallInterval;
            }
        });
        
        // Resume spawning with appropriate difficulty and timer from current state
        spawnEmojisWithDifficulty();
        timerInterval = setInterval(updateTimer, 1000);
    });
}

// Show restart confirmation modal
function showRestartModal() {
    if (!gameActive) return;
    
    // Pause the game first
    if (!gamePaused) {
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        gamePaused = true;
        
        const emojis = document.querySelectorAll('.falling-emoji');
        emojis.forEach(emoji => {
            emoji.style.animationPlayState = 'paused';
            if (emoji.fallInterval) {
                clearInterval(emoji.fallInterval);
                emoji.fallInterval = null;
            }
        });
    }
    
    const modal = document.getElementById('restart-confirmation-modal');
    modal.style.display = 'flex';
    updateEmojiCatchRestartModalTranslation();
    playClickSound();
}

// Update restart modal translation
window.updateEmojiCatchRestartModalTranslation = function() {
    const modal = document.getElementById('restart-confirmation-modal');
    if (!modal || modal.style.display !== 'flex') return;
    
    const titleElement = modal.querySelector('[data-translate="restart_game_title"]');
    const questionElement = modal.querySelector('[data-translate="restart_game_question"]');
    const yesBtn = document.getElementById('restart-yes-btn');
    const noBtn = document.getElementById('restart-no-btn');
    
    const titleText = emojiCatchTranslations['restart_game_title'][window.currentLanguage] || 'Restart Game?';
    const questionText = emojiCatchTranslations['restart_game_question'][window.currentLanguage] || 'Are you sure you want to restart? Your current game will be lost.';
    const yesText = emojiCatchTranslations['restart_yes'][window.currentLanguage] || 'Yes, Restart';
    const noText = emojiCatchTranslations['restart_no'][window.currentLanguage] || 'No, Continue Playing';
    
    if (titleElement) titleElement.textContent = titleText;
    if (questionElement) questionElement.textContent = questionText;
    if (yesBtn) yesBtn.textContent = yesText;
    if (noBtn) noBtn.textContent = noText;
};

// Confirm restart
function confirmRestart() {
    playClickSound();
    const modal = document.getElementById('restart-confirmation-modal');
    modal.style.display = 'none';
    
    // Reset game completely
    gameActive = false;
    gamePaused = false;
    clearInterval(spawnInterval);
    clearInterval(timerInterval);
    document.getElementById('catch-area').innerHTML = '<div class="basket" id="basket">🧺</div>';
    
    // Start fresh game
    startGame();
}

// Cancel restart
function cancelRestart() {
    const modal = document.getElementById('restart-confirmation-modal');
    modal.style.display = 'none';
    playClickSound();
    
    // Resume game with countdown
    const pauseBtn = document.getElementById('pause-btn');
    const pauseText = emojiCatchTranslations['pause_button'][window.currentLanguage] || '⏸️ Pause';
    pauseBtn.textContent = pauseText;
    pauseBtn.classList.remove('paused');
    
    document.getElementById('pause-overlay').classList.remove('active');
    
    // Don't resume emojis yet - wait for countdown to finish
    showCountdown(() => {
        gamePaused = false;
        isCountingDown = false;
        
        // NOW resume all falling emoji animations after countdown
        const pausedEmojis = document.querySelectorAll('.falling-emoji');
        pausedEmojis.forEach(emoji => {
            emoji.style.animationPlayState = 'running';
            
            if (!emoji.fallInterval) {
                let posY = parseFloat(emoji.dataset.posY) || 0;
                const fallSpeed = parseFloat(emoji.dataset.fallSpeed);
                const catchArea = document.getElementById('catch-area');
                const basket = document.getElementById('basket');
                
                const fallInterval = setInterval(() => {
                    if (!gameActive) {
                        clearInterval(fallInterval);
                        emoji.remove();
                        return;
                    }
                    
                    if (gamePaused) {
                        clearInterval(fallInterval);
                        emoji.fallInterval = null;
                        return;
                    }
                    
                    posY += fallSpeed;
                    emoji.style.top = posY + 'px';
                    emoji.dataset.posY = posY;
                    
                    const emojiRect = emoji.getBoundingClientRect();
                    const basketRect = basket.getBoundingClientRect();
                    
                    if (checkCollision(emojiRect, basketRect)) {
                        caughtCount++;
                        document.getElementById('score').textContent = caughtCount;
                        emoji.classList.add('caught');
                        playCatchSound();
                        clearInterval(fallInterval);
                        emoji.fallInterval = null;
                        setTimeout(() => emoji.remove(), 300);
                        return;
                    }
                    
                    if (posY > catchArea.clientHeight - 40) {
                        missedCount++;
                        document.getElementById('missed').textContent = missedCount;
                        playMissSound();
                        clearInterval(fallInterval);
                        emoji.fallInterval = null;
                        emoji.remove();
                    }
                }, 20);
                
                emoji.fallInterval = fallInterval;
            }
        });
        
        spawnEmojisWithDifficulty();
        timerInterval = setInterval(updateTimer, 1000);
    });
}

// Save score to localStorage (keep only highest score per player)
function saveScore(name, newScore) {
    let leaderboard = JSON.parse(localStorage.getItem('emojiCatchLeaderboard')) || [];
    
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
    
    localStorage.setItem('emojiCatchLeaderboard', JSON.stringify(leaderboard));
    
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
    const leaderboard = JSON.parse(localStorage.getItem('emojiCatchLeaderboard')) || [];
    const list = document.getElementById('leaderboard-list');
    const listStart = document.getElementById('leaderboard-list-start');
    
    // Clear both lists
    if (list) list.innerHTML = '';
    if (listStart) listStart.innerHTML = '';
    
    if (leaderboard.length === 0) {
        const emptyMessage = '<li style="list-style: none; text-align: center; opacity: 0.6;">No scores yet</li>';
        if (list) list.innerHTML = emptyMessage;
        if (listStart) listStart.innerHTML = emptyMessage;
        return;
    }
    
    leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        const currentLang = window.currentLanguage || 'en';
        const caughtText = getTranslation('leaderboard_caught', currentLang) || 'caught';
        li.innerHTML = `<strong>${entry.name}</strong>: ${entry.score} ${caughtText}`;
        if (index === 0) li.style.color = '#ffd700';
        if (index === 1) li.style.color = '#c0c0c0';
        if (index === 2) li.style.color = '#cd7f32';
        
        // Add to game-over leaderboard
        if (list) list.appendChild(li);
        
        // Clone and add to start screen leaderboard
        if (listStart) {
            const liClone = li.cloneNode(true);
            listStart.appendChild(liClone);
        }
    });
}

// Make displayLeaderboard available globally for language updates
window.updateEmojiCatchLeaderboard = displayLeaderboard;

// Sound effects
function playClickSound() {
    if (!window.isMusicMuted) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
        audio.volume = 0.1;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

function playCatchSound() {
    if (!window.isMusicMuted) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2015/2015-preview.mp3');
        audio.volume = 0.04;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

function playMissSound() {
    if (!window.isMusicMuted) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3');
        audio.volume = 0.08;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Update lives display with hearts
function updateLivesDisplay() {
    const livesContainer = document.getElementById('lives');
    if (!livesContainer) return;
    
    let heartsHTML = '';
    for (let i = 0; i < 3; i++) {
        if (i < lives) {
            heartsHTML += '❤️'; // Red heart for remaining lives
        } else {
            heartsHTML += '💔'; // Broken heart for lost lives
        }
    }
    livesContainer.innerHTML = heartsHTML;
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
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}
