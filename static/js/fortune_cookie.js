// Fortune Cookie Game - use globals from animations.js
let cookiesOpened = 0;

// Fortune messages - only positive and inspirational
const fortunes = {
    'en': [
        "Your kindness and compassion make the world a better place.",
        "Great opportunities await you in the coming months.",
        "Your positive energy inspires everyone around you.",
        "Success comes to those who believe in themselves - and you do!",
        "Your creativity will lead you to amazing discoveries.",
        "The best is yet to come in your journey.",
        "Your hard work and dedication will be rewarded soon.",
        "You have the power to make your dreams come true.",
        "Happiness follows you wherever you go.",
        "Your wisdom guides others toward success.",
        "Amazing adventures are heading your way.",
        "You bring joy to those around you.",
        "Your talents will shine brightly this year.",
        "Good fortune smiles upon you today and always.",
        "You are destined for great things.",
        "Your positive attitude creates positive outcomes.",
        "Wonderful surprises are coming your way.",
        "You have the courage to achieve anything.",
        "Your generosity will be returned tenfold.",
        "Success is within your reach - keep going!",
        "A thrilling time is in your near future.",
        "You will soon be surrounded by good friends and laughter.",
        "Your life will be filled with happiness and peace.",
        "Something wonderful is about to happen to you.",
        "Your smile will bring happiness to many people.",
        "Trust your intuition - it will guide you well.",
        "A pleasant surprise is waiting for you.",
        "Your future is filled with promising opportunities.",
        "The greatest risk is not taking one.",
        "Believe in yourself and magic will happen.",
        "Your determination will lead to success.",
        "Embrace change - it brings new beginnings.",
        "You will find beauty in the simplest things.",
        "Your dreams are within reach - pursue them.",
        "Good things come to those who wait, but better things come to those who act.",
        "You are capable of amazing things.",
        "Your persistence will be rewarded.",
        "Today is the first day of the rest of your life.",
        "You have a kind heart and a brilliant mind.",
        "The seeds you plant today will bloom tomorrow."
    ],
    'es': [
        "Tu bondad y compasión hacen del mundo un lugar mejor.",
        "Grandes oportunidades te esperan en los próximos meses.",
        "Tu energía positiva inspira a todos a tu alrededor.",
        "El éxito llega a quienes creen en sí mismos - ¡y tú lo haces!",
        "Tu creatividad te llevará a descubrimientos asombrosos.",
        "Lo mejor está por venir en tu viaje.",
        "Tu trabajo duro y dedicación serán recompensados pronto.",
        "Tienes el poder de hacer realidad tus sueños.",
        "La felicidad te sigue a donde quiera que vayas.",
        "Tu sabiduría guía a otros hacia el éxito.",
        "Aventuras increíbles se dirigen hacia ti.",
        "Traes alegría a quienes te rodean.",
        "Tus talentos brillarán intensamente este año.",
        "La buena fortuna te sonríe hoy y siempre.",
        "Estás destinado a grandes cosas.",
        "Tu actitud positiva crea resultados positivos.",
        "Maravillosas sorpresas vienen en tu camino.",
        "Tienes el coraje para lograr cualquier cosa.",
        "Tu generosidad será devuelta diez veces más.",
        "¡El éxito está a tu alcance - sigue adelante!",
        "Un momento emocionante está en tu futuro cercano.",
        "Pronto estarás rodeado de buenos amigos y risas.",
        "Tu vida se llenará de felicidad y paz.",
        "Algo maravilloso está a punto de sucederte.",
        "Tu sonrisa traerá felicidad a muchas personas.",
        "Confía en tu intuición - te guiará bien.",
        "Una agradable sorpresa te está esperando.",
        "Tu futuro está lleno de oportunidades prometedoras.",
        "El mayor riesgo es no tomar ninguno.",
        "Cree en ti mismo y la magia sucederá.",
        "Tu determinación te llevará al éxito.",
        "Abraza el cambio - trae nuevos comienzos.",
        "Encontrarás belleza en las cosas más simples.",
        "Tus sueños están a tu alcance - persíguelos.",
        "Las cosas buenas llegan a quienes esperan, pero las mejores llegan a quienes actúan.",
        "Eres capaz de cosas asombrosas.",
        "Tu persistencia será recompensada.",
        "Hoy es el primer día del resto de tu vida.",
        "Tienes un corazón bondadoso y una mente brillante.",
        "Las semillas que plantas hoy florecerán mañana."
    ],
    'zh': [
        "你的善良和同情心让世界变得更美好。",
        "未来几个月将有巨大的机遇等着你。",
        "你的正能量激励着周围的每个人。",
        "成功属于相信自己的人——而你就是！",
        "你的创造力将带你发现惊人的事物。",
        "你旅程中最好的部分还未到来。",
        "你的努力和奉献很快就会得到回报。",
        "你有力量实现你的梦想。",
        "幸福跟随你到任何地方。",
        "你的智慧引导他人走向成功。",
        "奇妙的冒险正在向你走来。",
        "你给周围的人带来欢乐。",
        "今年你的才华将大放异彩。",
        "好运今天和永远都对你微笑。",
        "你注定要成就伟大的事情。",
        "你的积极态度创造积极的结果。",
        "美妙的惊喜正在向你走来。",
        "你有勇气实现任何事情。",
        "你的慷慨将会十倍奉还。",
        "成功就在你的掌握之中——继续前进！",
        "激动人心的时刻即将到来。",
        "你很快就会被好朋友和欢笑包围。",
        "你的生活将充满幸福与和平。",
        "美好的事情即将发生在你身上。",
        "你的微笑将给许多人带来幸福。",
        "相信你的直觉——它会很好地指引你。",
        "一个愉快的惊喜在等着你。",
        "你的未来充满了有前途的机会。",
        "最大的风险就是不冒险。",
        "相信自己，奇迹就会发生。",
        "你的决心将带来成功。",
        "拥抱变化——它带来新的开始。",
        "你会在最简单的事物中发现美。",
        "你的梦想触手可及——去追求它们。",
        "好事降临于等待的人，但更好的事降临于行动的人。",
        "你能够做出惊人的事情。",
        "你的坚持将得到回报。",
        "今天是你余生的第一天。",
        "你有一颗善良的心和聪明的头脑。",
        "你今天播下的种子明天将会绽放。"
    ],
    'fr': [
        "Votre gentillesse et compassion rendent le monde meilleur.",
        "De grandes opportunités vous attendent dans les mois à venir.",
        "Votre énergie positive inspire tous ceux qui vous entourent.",
        "Le succès vient à ceux qui croient en eux-mêmes - et vous y croyez!",
        "Votre créativité vous mènera à des découvertes étonnantes.",
        "Le meilleur reste à venir dans votre voyage.",
        "Votre travail acharné et votre dévouement seront bientôt récompensés.",
        "Vous avez le pouvoir de réaliser vos rêves.",
        "Le bonheur vous suit partout où vous allez.",
        "Votre sagesse guide les autres vers le succès.",
        "D'incroyables aventures se dirigent vers vous.",
        "Vous apportez de la joie à ceux qui vous entourent.",
        "Vos talents brilleront cette année.",
        "La bonne fortune vous sourit aujourd'hui et toujours.",
        "Vous êtes destiné à de grandes choses.",
        "Votre attitude positive crée des résultats positifs.",
        "De merveilleuses surprises vous attendent.",
        "Vous avez le courage d'accomplir n'importe quoi.",
        "Votre générosité vous sera rendue au centuple.",
        "Le succès est à votre portée - continuez!",
        "Un moment palpitant vous attend dans un avenir proche.",
        "Vous serez bientôt entouré de bons amis et de rires.",
        "Votre vie sera remplie de bonheur et de paix.",
        "Quelque chose de merveilleux est sur le point de vous arriver.",
        "Votre sourire apportera du bonheur à beaucoup de gens.",
        "Faites confiance à votre intuition - elle vous guidera bien.",
        "Une agréable surprise vous attend.",
        "Votre avenir est rempli d'opportunités prometteuses.",
        "Le plus grand risque est de ne pas en prendre.",
        "Croyez en vous et la magie se produira.",
        "Votre détermination mènera au succès.",
        "Embrassez le changement - il apporte de nouveaux départs.",
        "Vous trouverez la beauté dans les choses les plus simples.",
        "Vos rêves sont à portée de main - poursuivez-les.",
        "Les bonnes choses arrivent à ceux qui attendent, mais les meilleures arrivent à ceux qui agissent.",
        "Vous êtes capable de choses étonnantes.",
        "Votre persévérance sera récompensée.",
        "Aujourd'hui est le premier jour du reste de votre vie.",
        "Vous avez un cœur généreux et un esprit brillant.",
        "Les graines que vous plantez aujourd'hui fleuriront demain."
    ],
    'hi': [
        "आपकी दयालुता और करुणा दुनिया को बेहतर जगह बनाती है।",
        "आने वाले महीनों में महान अवसर आपका इंतजार कर रहे हैं।",
        "आपकी सकारात्मक ऊर्जा आपके आसपास के सभी लोगों को प्रेरित करती है।",
        "सफलता उन लोगों के पास आती है जो खुद पर विश्वास करते हैं - और आप करते हैं!",
        "आपकी रचनात्मकता आपको अद्भुत खोजों की ओर ले जाएगी।",
        "आपकी यात्रा में सबसे अच्छा अभी आना बाकी है।",
        "आपकी मेहनत और समर्पण जल्द ही पुरस्कृत किया जाएगा।",
        "आपके पास अपने सपनों को सच करने की शक्ति है।",
        "खुशी आपका पीछा करती है जहां भी आप जाते हैं।",
        "आपकी बुद्धि दूसरों को सफलता की ओर मार्गदर्शन करती है।",
        "अद्भुत रोमांच आपकी ओर आ रहे हैं।",
        "आप अपने आसपास के लोगों के लिए खुशी लाते हैं।",
        "इस साल आपकी प्रतिभा चमकेगी।",
        "अच्छा भाग्य आज और हमेशा आप पर मुस्कुराता है।",
        "आप महान चीजों के लिए नियत हैं।",
        "आपका सकारात्मक दृष्टिकोण सकारात्मक परिणाम बनाता है।",
        "अद्भुत आश्चर्य आपके रास्ते में आ रहे हैं।",
        "आपमें कुछ भी हासिल करने का साहस है।",
        "आपकी उदारता दस गुना वापस मिलेगी।",
        "सफलता आपकी पहुंच में है - आगे बढ़ते रहें!",
        "आपके निकट भविष्य में एक रोमांचक समय है।",
        "आप जल्द ही अच्छे दोस्तों और हंसी से घिरे होंगे।",
        "आपका जीवन खुशी और शांति से भरा होगा।",
        "कुछ अद्भुत आपके साथ होने वाला है।",
        "आपकी मुस्कान कई लोगों को खुशी देगी।",
        "अपने अंतर्ज्ञान पर भरोसा करें - यह आपको अच्छी तरह से मार्गदर्शन करेगा।",
        "एक सुखद आश्चर्य आपका इंतजार कर रहा है।",
        "आपका भविष्य आशाजनक अवसरों से भरा है।",
        "सबसे बड़ा जोखिम कोई जोखिम न लेना है।",
        "खुद पर विश्वास करें और जादू होगा।",
        "आपका दृढ़ संकल्प सफलता की ओर ले जाएगा।",
        "परिवर्तन को गले लगाओ - यह नई शुरुआत लाता है।",
        "आप सबसे सरल चीजों में सुंदरता पाएंगे।",
        "आपके सपने पहुंच में हैं - उनका पीछा करें।",
        "अच्छी चीजें उन लोगों के पास आती हैं जो प्रतीक्षा करते हैं, लेकिन बेहतर चीजें उन लोगों के पास आती हैं जो कार्य करते हैं।",
        "आप अद्भुत चीजें करने में सक्षम हैं।",
        "आपकी दृढ़ता का पुरस्कार मिलेगा।",
        "आज आपके शेष जीवन का पहला दिन है।",
        "आपके पास एक दयालु हृदय और एक शानदार दिमाग है।",
        "आज आप जो बीज बोते हैं वे कल खिलेंगे।"
    ],
    'tl': [
        "Ang iyong kabaitan at habag ay gumagawa ng mundo ng mas magandang lugar.",
        "Malaking mga pagkakataon ay naghihintay sa iyo sa mga darating na buwan.",
        "Ang iyong positibong enerhiya ay nag-inspire sa lahat sa paligid mo.",
        "Ang tagumpay ay dumarating sa mga nananalig sa kanilang sarili - at ikaw ay naniniwala!",
        "Ang iyong pagkamalikhain ay maglalakbay sa iyo sa mga kamangha-manghang pagtuklas.",
        "Ang pinakamahusay ay darating pa sa iyong paglalakbay.",
        "Ang iyong sipag at dedikasyon ay gagantimpalaan sa lalong madaling panahon.",
        "Mayroon kang kapangyarihan na gawing totoo ang iyong mga pangarap.",
        "Ang kaligayahan ay sumusunod sa iyo saan ka man pumunta.",
        "Ang iyong karunungan ay gumagabay sa iba tungo sa tagumpay.",
        "Mga kamangha-manghang pakikipagsapalaran ay papunta sa iyo.",
        "Ikaw ay nagdudulot ng kagalakan sa mga nakapaligid sa iyo.",
        "Ang iyong mga talento ay maningning nang maliwanag ngayong taon.",
        "Ang mabuting kapalaran ay ngumingiti sa iyo ngayon at magpakailanman.",
        "Ikaw ay nakatakda para sa mga dakilang bagay.",
        "Ang iyong positibong pag-uugali ay lumilikha ng positibong mga resulta.",
        "Mga kahanga-hangang sorpresa ay paparating sa iyong paraan.",
        "Mayroon kang tapang na makamit ang anumang bagay.",
        "Ang iyong kagandahang-loob ay ibabalik nang sampung beses.",
        "Ang tagumpay ay nasa iyong abot - magpatuloy!",
        "Ang isang nakakawiling panahon ay nasa iyong malapit na hinaharap.",
        "Ikaw ay malapit nang mapapalibutan ng mga mabubuting kaibigan at tawanan.",
        "Ang iyong buhay ay mapupuno ng kaligayahan at kapayapaan.",
        "May kahanga-hangang bagay na mangyayari sa iyo.",
        "Ang iyong ngiti ay magdadala ng kaligayahan sa maraming tao.",
        "Magtiwala sa iyong instinct - ito ay gagabay sa iyo nang mabuti.",
        "Ang isang kasiya-siyang sorpresa ay naghihintay sa iyo.",
        "Ang iyong hinaharap ay puno ng mga pangakong pagkakataon.",
        "Ang pinakamalaking panganib ay ang hindi pag-risk.",
        "Maniwala sa iyong sarili at mangyayari ang mahika.",
        "Ang iyong determinasyon ay hahantong sa tagumpay.",
        "Yakapin ang pagbabago - ito ay nagdadala ng mga bagong simula.",
        "Makikita mo ang kagandahan sa mga pinakasimpleng bagay.",
        "Ang iyong mga pangarap ay nasa iyong abot - habulin ang mga ito.",
        "Ang mga mabubuting bagay ay dumarating sa mga naghihintay, ngunit ang mas mabuting bagay ay dumarating sa mga kumikilos.",
        "Ikaw ay may kakayahang gumawa ng mga kamangha-manghang bagay.",
        "Ang iyong pagtitiyaga ay gagantimpalaan.",
        "Ngayon ay ang unang araw ng natitirang bahagi ng iyong buhay.",
        "Mayroon kang mabuting puso at isang mahusay na isip.",
        "Ang mga binhi na iyong itatanim ngayon ay mamumulaklak bukas."
    ],
    'ja': [
        "あなたの優しさと思いやりが世界をより良い場所にしています。",
        "今後数ヶ月で素晴らしい機会があなたを待っています。",
        "あなたのポジティブなエネルギーは周りの人々を刺激します。",
        "成功は自分を信じる人のもとに訪れます - そしてあなたは信じています！",
        "あなたの創造性は素晴らしい発見へと導いてくれるでしょう。",
        "あなたの旅で最高のことはこれから訪れます。",
        "あなたの努力と献身はまもなく報われるでしょう。",
        "あなたには夢を実現する力があります。",
        "幸せはあなたがどこへ行ってもついて来ます。",
        "あなたの知恵は他の人を成功へと導きます。",
        "素晴らしい冒険があなたに向かっています。",
        "あなたは周りの人々に喜びをもたらします。",
        "今年、あなたの才能は明るく輝くでしょう。",
        "幸運は今日もそしていつもあなたに微笑んでいます。",
        "あなたは偉大なことを運命づけられています。",
        "あなたの前向きな態度がポジティブな結果を生み出します。",
        "素晴らしい驚きがあなたの道にやってきます。",
        "あなたには何でも達成する勇気があります。",
        "あなたの寛大さは十倍になって返ってくるでしょう。",
        "成功はあなたの手の届くところにあります - 頑張ってください！",
        "エキサイティングな時間があなたの近い将来に待っています。",
        "まもなく良い友達と笑い声に囲まれるでしょう。",
        "あなたの人生は幸せと平和で満たされるでしょう。",
        "素晴らしいことがあなたに起こりそうです。",
        "あなたの笑顔は多くの人に幸せをもたらすでしょう。",
        "直感を信じてください - それはあなたをよく導いてくれます。",
        "楽しい驚きがあなたを待っています。",
        "あなたの未来は有望な機会に満ちています。",
        "最大のリスクはリスクを取らないことです。",
        "自分を信じれば魔法が起こります。",
        "あなたの決意は成功につながります。",
        "変化を受け入れてください - それは新しい始まりをもたらします。",
        "あなたは最もシンプルなものに美しさを見出すでしょう。",
        "あなたの夢は手の届くところにあります - それを追いかけてください。",
        "良いことは待つ人に訪れますが、より良いことは行動する人に訪れます。",
        "あなたは素晴らしいことができます。",
        "あなたの粘り強さは報われるでしょう。",
        "今日はあなたの残りの人生の最初の日です。",
        "あなたは優しい心と優れた頭脳を持っています。",
        "今日あなたが蒔いた種は明日花開くでしょう。"
    ]
};

// Game translations
const fortuneTranslations = {
    'fortune_game_title': {
        'en': '🥠 Fortune Cookie',
        'es': '🥠 Galleta de la Fortuna',
        'zh': '🥠 幸运饼干',
        'fr': '🥠 Biscuit de Fortune',
        'hi': '🥠 भाग्य कुकी',
        'tl': '🥠 Fortune Cookie',
        'ja': '🥠 フォーチュンクッキー'
    },
    'fortune_instructions': {
        'en': 'Click on the fortune cookie to reveal your message!',
        'es': '¡Haz clic en la galleta de la fortuna para revelar tu mensaje!',
        'zh': '点击幸运饼干以揭示您的信息！',
        'fr': 'Cliquez sur le biscuit de fortune pour révéler votre message!',
        'hi': 'अपना संदेश प्रकट करने के लिए भाग्य कुकी पर क्लिक करें!',
        'tl': 'I-click ang fortune cookie upang ipakita ang iyong mensahe!',
        'ja': 'フォーチュンクッキーをクリックしてメッセージを表示しよう！'
    },
    'try_again': {
        'en': 'Try Again',
        'es': 'Intentar de Nuevo',
        'zh': '再试一次',
        'fr': 'Réessayer',
        'hi': 'पुनः प्रयास करें',
        'tl': 'Subukan Muli',
        'ja': 'もう一度試す'
    },
    'cookies_opened': {
        'en': 'Cookies Opened:',
        'es': 'Galletas Abiertas:',
        'zh': '已打开饼干：',
        'fr': 'Biscuits Ouverts:',
        'hi': 'खोली गई कुकीज़:',
        'tl': 'Mga Binuksan na Cookie:',
        'ja': '開いたクッキー：'
    },
    'next_fortune': {
        'en': 'Next Fortune',
        'es': 'Siguiente Fortuna',
        'zh': '下一个幸运',
        'fr': 'Prochaine Fortune',
        'hi': 'अगला भाग्य',
        'tl': 'Susunod na Fortune',
        'ja': '次の運勢'
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
    
    // Initialize cookie revealed flag
    window.cookieRevealed = false;
    
    // Generate single fortune cookie
    generateCookies();
    
    // Start background music
    playFortuneBackgroundMusic();
});

// Track if cookie has been revealed (prevent multiple clicks)
window.cookieRevealed = false;

// Play background music
function playFortuneBackgroundMusic() {
    // Stop and clean up previous game music if it exists
    if (window.gameBackgroundMusic) {
        window.gameBackgroundMusic.pause();
        window.gameBackgroundMusic.currentTime = 0;
    }
    
    // Create new game music
    window.gameBackgroundMusic = new Audio('https://www.bensound.com/bensound-music/bensound-ukulele.mp3');
    window.gameBackgroundMusic.volume = 0.08;
    window.gameBackgroundMusic.loop = true;
    
    // Set as current background music for toggle button
    window.currentBackgroundMusic = window.gameBackgroundMusic;
    
    // Play if not muted
    if (!window.isMusicMuted) {
        window.gameBackgroundMusic.play().catch(e => console.log('Background music failed:', e));
    }
}

// Generate fortune cookies (only 1)
function generateCookies() {
    if (window.cookieRevealed) return;
    
    const container = document.getElementById('cookies-container');
    container.innerHTML = '';
    
    // Create single cookie
    const cookie = document.createElement('div');
    cookie.className = 'fortune-cookie';
    cookie.innerHTML = '🥠';
    
    // Click handler for desktop
    cookie.addEventListener('click', () => openCookie(cookie));
    
    // Touch handler for mobile
    cookie.addEventListener('touchstart', (e) => {
        e.preventDefault();
        openCookie(cookie);
    }, { passive: false });
    
    container.appendChild(cookie);
}

// Open a fortune cookie
function openCookie(cookieElement) {
    if (window.cookieRevealed) return;
    
    // Play crack sound
    playClickSound();
    
    // Animate cookie breaking
    cookieElement.classList.add('cracking');
    window.cookieRevealed = true;
    
    setTimeout(() => {
        // Get random fortune index
        const fortuneList = fortunes[window.currentLanguage] || fortunes['en'];
        const fortuneIndex = Math.floor(Math.random() * fortuneList.length);
        
        // Store fortune index for translation
        window.currentFortuneIndex = fortuneIndex;
        
        // Display fortune in current language
        updateFortuneDisplay();
        document.getElementById('fortune-display').style.display = 'flex';
        
        // Play success sound and celebration
        playSuccessSound();
        createCelebrationAnimation();
        
        // Mark that cookie has been opened
        window.cookieHasBeenOpened = true;
    }, 500);
}

// Create celebration animation
function createCelebrationAnimation() {
    const celebration = document.createElement('div');
    celebration.className = 'celebration-container';
    
    // Create confetti particles
    const colors = ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C'];
    const emojis = ['✨', '🌟', '⭐', '💫', '🎉', '🎊', '💖', '🌈'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            const useEmoji = Math.random() > 0.5;
            
            if (useEmoji) {
                particle.className = 'celebration-emoji';
                particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            } else {
                particle.className = 'celebration-particle';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            }
            
            // Random starting position at top
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = (Math.random() * 0.3) + 's';
            particle.style.animationDuration = (1.5 + Math.random() * 1) + 's';
            
            celebration.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => particle.remove(), 3000);
        }, i * 50);
    }
    
    document.body.appendChild(celebration);
    
    // Remove container after all animations
    setTimeout(() => celebration.remove(), 4000);
}

// Update fortune display with current language
function updateFortuneDisplay() {
    if (typeof window.currentFortuneIndex !== 'undefined') {
        const fortuneList = fortunes[window.currentLanguage] || fortunes['en'];
        const fortune = fortuneList[window.currentFortuneIndex] || fortuneList[0];
        document.getElementById('fortune-message').textContent = fortune;
    }
}

// Sound effects
function playClickSound() {
    if (!window.isMusicMuted) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
        audio.volume = 0.1;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

function playSuccessSound() {
    if (!window.isMusicMuted) {
        // Play cheerful success sound
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Track if cookie has been opened
window.cookieHasBeenOpened = false;
window.isNavigatingAway = false;

// Prevent accidental page reload during active fortune cookie session
window.addEventListener('beforeunload', function(e) {
    // Don't show warning if user clicked "Back to Games" button
    if (window.isNavigatingAway) {
        return;
    }
    
    // Show warning if cookie has been opened and fortune is being displayed
    const fortuneDisplay = document.getElementById('fortune-display');
    if (window.cookieHasBeenOpened && fortuneDisplay && fortuneDisplay.style.display === 'flex') {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});
