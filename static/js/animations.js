/**
 * Birthday Surprise Animations
 * Handles seasonal particle effects (leaves, snowflakes, petals, sparkles)
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
    
    // Translate sender names
    const senderElements = document.querySelectorAll('.sender-name');
    senderElements.forEach(element => {
        const originalName = element.getAttribute('data-sender');
        if (originalName) {
            const translatedName = translateName(originalName, targetLang);
            const fromText = getTranslation('message_from', targetLang) || 'From';
            element.innerHTML = `<span data-translate="message_from">${fromText}</span> ${translatedName}`;
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
    
    // Update emoji pop exit modal if it's visible
    if (typeof updateExitModalTranslation === 'function') {
        updateExitModalTranslation();
    }
    
    // Update emoji pop play again modal if it's visible
    if (typeof updatePlayAgainModalTranslation === 'function') {
        updatePlayAgainModalTranslation();
    }
    
    // Update pause button if game is active
    if (typeof updatePauseButtonTranslation === 'function') {
        updatePauseButtonTranslation();
    }
    
    // Update restart modal translation for emoji pop
    if (typeof updateRestartModalTranslation === 'function') {
        updateRestartModalTranslation();
    }
    
    // Update restart modal translation for emoji catch
    if (typeof updateEmojiCatchRestartModalTranslation === 'function') {
        updateEmojiCatchRestartModalTranslation();
    }
    
    // Update gift modals if they're visible on ending page
    if (typeof updateGiftModalTranslations === 'function') {
        updateGiftModalTranslations();
    }
    
    // Update leaderboards if they exist
    if (typeof window.updateEmojiPopLeaderboard === 'function') {
        window.updateEmojiPopLeaderboard();
    }
    if (typeof window.updateEmojiCatchLeaderboard === 'function') {
        window.updateEmojiCatchLeaderboard();
    }
}

/**
 * Translate names to native versions
 */
function translateName(name, lang) {
    const nameTranslations = {
        'Michelle': {
            'en': 'Michelle',
            'es': 'Michelle',
            'zh': '米歇尔',
            'fr': 'Michelle',
            'hi': 'मिशेल',
            'tl': 'Michelle',
            'ja': 'ミシェル'
        },
        'Narsimlu': {
            'en': 'Narsimlu',
            'es': 'Narsimlu',
            'zh': '纳西姆鲁',
            'fr': 'Narsimlu',
            'hi': 'नरसिम्लु',
            'tl': 'Narsimlu',
            'ja': 'ナルシムル'
        },
        'Matt': {
            'en': 'Matt',
            'es': 'Mateo',
            'zh': '马特',
            'fr': 'Matthieu',
            'hi': 'मैट',
            'tl': 'Matt',
            'ja': 'マット'
        },
        'Heather': {
            'en': 'Heather',
            'es': 'Heather',
            'zh': '希瑟',
            'fr': 'Heather',
            'hi': 'हीथर',
            'tl': 'Heather',
            'ja': 'ヘザー'
        },
        'Rebecca': {
            'en': 'Rebecca',
            'es': 'Rebeca',
            'zh': '丽贝卡',
            'fr': 'Rébecca',
            'hi': 'रेबेका',
            'tl': 'Rebecca',
            'ja': 'レベッカ'
        },
        'Becca': {
            'en': 'Becca',
            'es': 'Becca',
            'zh': '贝卡',
            'fr': 'Becca',
            'hi': 'बेक्का',
            'tl': 'Becca',
            'ja': 'ベッカ'
        }
    };
    
    return nameTranslations[name] ? nameTranslations[name][lang] : name;
}

/**
 * Get translation for a key in target language
 */
function getTranslation(key, lang) {
    const translations = {
        // Home page
        // Home page
        'home_title': {
            'en': 'Happy Birthday,<br><span class="name-highlight">Michelle!</span>',
            'es': '¡Feliz Cumpleaños,<br><span class="name-highlight">Michelle!</span>',
            'zh': '生日快乐，<br><span class="name-highlight">米歇尔！</span>',
            'fr': 'Joyeux Anniversaire,<br><span class="name-highlight">Michelle!</span>',
            'hi': 'जन्मदिन मुबारक,<br><span class="name-highlight">मिशेल!</span>',
            'tl': 'Maligayang Kaarawan,<br><span class="name-highlight">Michelle!</span>',
            'ja': 'お誕生日おめでとう、<br><span class="name-highlight">ミシェル！</span>'
        },
        'home_subtitle': {
            'en': 'Here is a special surprise from your team',
            'es': 'Aquí hay una sorpresa especial de tu equipo',
            'zh': '这是来自你团队的特别惊喜',
            'fr': 'Voici une surprise spéciale de votre équipe',
            'hi': 'यहाँ आपकी टीम से एक विशेष आश्चर्य है',
            'tl': 'Narito ang isang espesyal na sorpresa mula sa iyong teammates',
            'ja': 'あなたのチームからの特別なサプライズです'
        },
        'home_button': {
            'en': 'Begin Your Birthday Surprise',
            'es': 'Comienza Tu Sorpresa de Cumpleaños',
            'zh': '开始你的生日惊喜',
            'fr': 'Commencez Votre Surprise d\'Anniversaire',
            'hi': 'अपना जन्मदिन आश्चर्य शुरू करें',
            'tl': 'Simulan ang Sorpresa para sa iyong Kaarawan',
            'ja': 'バースデーサプライズを始める'
        },
        // Message page
        'message_from': {
            'en': 'From',
            'es': 'De',
            'zh': '来自',
            'fr': 'De',
            'hi': 'से',
            'tl': 'Mula kay',
            'ja': 'から'
        },
        'message_label': {
            'en': 'Message',
            'es': 'Mensaje',
            'zh': '消息',
            'fr': 'Message',
            'hi': 'संदेश',
            'tl': 'Mensahe',
            'ja': 'メッセージ'
        },
        'message_of': {
            'en': 'of',
            'es': 'de',
            'zh': '共',
            'fr': 'de',
            'hi': 'का',
            'tl': 'ng',
            'ja': 'の'
        },
        'prev_message': {
            'en': '← Previous Message',
            'es': '← Mensaje Anterior',
            'zh': '← 上一条消息',
            'fr': '← Message Précédent',
            'hi': '← पिछला संदेश',
            'tl': '← Nakaraang Mensahe',
            'ja': '← 前のメッセージ'
        },
        'next_message': {
            'en': 'Next Message →',
            'es': 'Siguiente Mensaje →',
            'zh': '下一条消息 →',
            'fr': 'Message Suivant →',
            'hi': 'अगला संदेश →',
            'tl': 'Susunod na Mensahe →',
            'ja': '次のメッセージ →'
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
        'final_message': {
            'en': 'Final Message →',
            'es': 'Mensaje Final →',
            'zh': '最后的消息 →',
            'fr': 'Message Final →',
            'hi': 'अंतिम संदेश →',
            'tl': 'Huling Mensahe →',
            'ja': '最後のメッセージ →'
        },
        // Ending page
        'ending_title': {
            'en': 'Wishing you the best year ahead,<br><span class="name-highlight">Michelle!</span>',
            'es': 'Deseándote el mejor año por delante,<br><span class="name-highlight">¡Michelle!</span>',
            'zh': '祝你来年一切顺利，<br><span class="name-highlight">米歇尔！</span>',
            'fr': 'Vous souhaitant la meilleure année à venir,<br><span class="name-highlight">Michelle!</span>',
            'hi': 'आपको आगे का सबसे अच्छा साल मुबारक,<br><span class="name-highlight">मिशेल!</span>',
            'tl': 'Hinihiling namin para sa iyo ang isang magandang taon,<br><span class="name-highlight">Michelle!</span>',
            'ja': '来年が最高の年になりますように、<br><span class="name-highlight">ミシェル！</span>'
        },
        'ending_subtitle': {
            'en': 'May this year bring you joy, success, and wonderful memories.',
            'es': 'Que este año te traiga alegría, éxito y recuerdos maravillosos.',
            'zh': '愿这一年给你带来快乐、成功和美好的回忆。',
            'fr': 'Que cette année vous apporte joie, succès et merveilleux souvenirs.',
            'hi': 'यह वर्ष आपके लिए खुशी, सफलता और अद्भुत यादें लाए।',
            'tl': 'Nawa ang susunod na taong ito ay magdala sa iyo ng kagalakan, tagumpay, at magagandang alaala.',
            'ja': 'この一年があなたに喜び、成功、そして素晴らしい思い出をもたらしますように。'
        },
        'gift_button': {
            'en': '🎁 Click here to receive gift',
            'es': '🎁 Haz clic aquí para recibir el regalo',
            'zh': '🎁 点击这里领取礼物',
            'fr': '🎁 Cliquez ici pour recevoir le cadeau',
            'hi': '🎁 उपहार प्राप्त करने के लिए यहां क्लिक करें',
            'tl': '🎁 I-click dito upang tanggapin ang iyong regalo',
            'ja': '🎁 ギフトを受け取るにはここをクリック'
        },
        'gift_button_1': {
            'en': '🎁 Open Gift #1',
            'es': '🎁 Abrir Regalo #1',
            'zh': '🎁 打开礼物 #1',
            'fr': '🎁 Ouvrir Cadeau #1',
            'hi': '🎁 उपहार #1 खोलें',
            'tl': '🎁 Buksan ang Regalo #1',
            'ja': '🎁 ギフト #1 を開く'
        },
        'gift_button_2': {
            'en': '🎁 Open Gift #2',
            'es': '🎁 Abrir Regalo #2',
            'zh': '🎁 打开礼物 #2',
            'fr': '🎁 Ouvrir Cadeau #2',
            'hi': '🎁 उपहार #2 खोलें',
            'tl': '🎁 Buksan ang Regalo #2',
            'ja': '🎁 ギフト #2 を開く'
        },
        'gift_button_3': {
            'en': '🎁 Open Gift #3',
            'es': '🎁 Abrir Regalo #3',
            'zh': '🎁 打开礼物 #3',
            'fr': '🎁 Ouvrir Cadeau #3',
            'hi': '🎁 उपहार #3 खोलें',
            'tl': '🎁 Buksan ang Regalo #3',
            'ja': '🎁 ギフト #3 を開く'
        },
        'view_gift_2_again': {
            'en': '🔄 View Gift #2 Again',
            'es': '🔄 Ver Regalo #2 Otra Vez',
            'zh': '🔄 再次查看礼物 #2',
            'fr': '🔄 Revoir Cadeau #2',
            'hi': '🔄 उपहार #2 फिर से देखें',
            'tl': '🔄 Tingnan Muli ang Regalo #2',
            'ja': '🔄 ギフト #2 をもう一度見る'
        },
        'view_gift_3_again': {
            'en': '🔄 View Gift #3 Again',
            'es': '🔄 Ver Regalo #3 Otra Vez',
            'zh': '🔄 再次查看礼物 #3',
            'fr': '🔄 Revoir Cadeau #3',
            'hi': '🔄 उपहार #3 फिर से देखें',
            'tl': '🔄 Tingnan Muli ang Regalo #3',
            'ja': '🔄 ギフト #3 をもう一度見る'
        },
        'img_gen_details': {
            'en': 'Image Generation Details',
            'es': 'Detalles de Generación de Imagen',
            'zh': '图像生成详细信息',
            'fr': 'Détails de Génération d\'Image',
            'hi': 'छवि निर्माण विवरण',
            'tl': 'Mga Detalye ng Paglikha ng Larawan',
            'ja': '画像生成の詳細'
        },
        'model_text_prompt': {
            'en': 'Model used for text prompt:',
            'es': 'Modelo usado para el texto:',
            'zh': '文本提示模型：',
            'fr': 'Modèle utilisé pour le texte:',
            'hi': 'पाठ के लिए उपयोग किया गया मॉडल:',
            'tl': 'Modelo na ginamit para sa teksto:',
            'ja': 'テキストプロンプトに使用されたモデル：'
        },
        'model_images': {
            'en': 'Model used for images:',
            'es': 'Modelo usado para imágenes:',
            'zh': '图像模型：',
            'fr': 'Modèle utilisé pour les images:',
            'hi': 'छवियों के लिए उपयोग किया गया मॉडल:',
            'tl': 'Modelo na ginamit para sa mga larawan:',
            'ja': '画像に使用されたモデル：'
        },
        'prompt_label': {
            'en': 'Prompt:',
            'es': 'Instrucción:',
            'zh': '提示词：',
            'fr': 'Prompt:',
            'hi': 'प्रॉम्प्ट:',
            'tl': 'Prompt:',
            'ja': 'プロンプト：'
        },
        'details_label': {
            'en': 'Details:',
            'es': 'Detalles:',
            'zh': '详细信息：',
            'fr': 'Détails:',
            'hi': 'विवरण:',
            'tl': 'Mga Detalye:',
            'ja': '詳細：'
        },
        'height_tier_details': {
            'en': 'Height/Tier Details:',
            'es': 'Detalles de Altura/Nivel:',
            'zh': '身高/层级详情：',
            'fr': 'Détails Hauteur/Niveau:',
            'hi': 'ऊंचाई/स्तर विवरण:',
            'tl': 'Mga Detalye ng Taas/Antas:',
            'ja': '身長/階層の詳細：'
        },
        'scene_requirements': {
            'en': 'Scene Requirements:',
            'es': 'Requisitos de Escena:',
            'zh': '场景要求：',
            'fr': 'Exigences de Scène:',
            'hi': 'दृश्य आवश्यकताएं:',
            'tl': 'Mga Kinakailangan ng Eksena:',
            'ja': 'シーン要件：'
        },
        'gift_title_cat_yoga': {
            'en': 'Team outing: Cat Yoga',
            'es': 'Salida del Equipo: Yoga con Gatos',
            'zh': '团队活动：猫咪瑜伽',
            'fr': 'Sortie d\'Équipe: Yoga avec Chats',
            'hi': 'टीम आउटिंग: कैट योग',
            'tl': 'Lakbay ng Koponan: Cat Yoga',
            'ja': 'チームアウティング：キャットヨガ'
        },
        'gift_title_team_portrait': {
            'en': 'Team Portrait',
            'es': 'Retrato del Equipo',
            'zh': '团队肖像',
            'fr': 'Portrait d\'Équipe',
            'hi': 'टीम का चित्र',
            'tl': 'Larawan ng Koponan',
            'ja': 'チームポートレート'
        },
        'click_for_details': {
            'en': 'Click the image to view full details',
            'es': 'Haz clic en la imagen para ver todos los detalles',
            'zh': '点击图像查看完整详情',
            'fr': 'Cliquez sur l\'image pour voir tous les détails',
            'hi': 'पूरी जानकारी देखने के लिए चित्र पर क्लिक करें',
            'tl': 'I-click ang larawan upang makita ang buong detalye',
            'ja': '画像をクリックして詳細を表示'
        },
        'cake_wish_line1': {
            'en': 'Here\'s a cake for your special day!',
            'es': '¡Aquí hay un pastel para tu día especial!',
            'zh': '这是为你特别的日子准备的蛋糕！',
            'fr': 'Voici un gâteau pour votre jour spécial !',
            'hi': 'आपके विशेष दिन के लिए यहाँ एक केक है!',
            'tl': 'Narito ang isang cake para sa iyong espesyal na araw!',
            'ja': 'あなたの特別な日のためのケーキです！'
        },
        'cake_wish_line2': {
            'en': 'Now make a wish!',
            'es': '¡Ahora pide un deseo!',
            'zh': '现在许个愿吧！',
            'fr': 'Maintenant, faites un vœu !',
            'hi': 'अब एक इच्छा करें!',
            'tl': 'Ngayon, gumawa ng isang wish!',
            'ja': 'さあ、願い事をしてください！'
        },
        // Cat Yoga prompt content
        'cat_yoga_intro': {
            'en': 'Create 2D animated images depicting the five individuals from the reference photo in a bright, serene public park during a pleasant morning. They are enjoying each other\'s company while participating in cat yoga.',
            'es': 'Crea imágenes animadas en 2D que representen a las cinco personas de la foto de referencia en un parque público luminoso y sereno durante una agradable mañana. Están disfrutando de la compañía mutua mientras participan en yoga con gatos.',
            'zh': '创作2D动画图像，描绘参考照片中的五个人在一个明亮宁静的公共公园里度过愉快的早晨。他们一起享受猫咪瑜伽的乐趣。',
            'fr': 'Créez des images animées 2D représentant les cinq personnes de la photo de référence dans un parc public lumineux et serein pendant une agréable matinée. Ils profitent de la compagnie les uns des autres tout en participant au yoga avec des chats.',
            'hi': '2D एनिमेटेड छवियां बनाएं जो संदर्भ फोटो के पांच व्यक्तियों को एक सुखद सुबह के दौरान एक उज्ज्वल, शांत सार्वजनिक पार्क में दिखाती हैं। वे कैट योग में भाग लेते हुए एक-दूसरे की संगति का आनंद ले रहे हैं।',
            'tl': 'Lumikha ng 2D animated na mga larawan na nagpapakita ng limang indibidwal mula sa reference photo sa isang maliwanag, payapang pampublikong parke sa isang kaaya-ayang umaga. Nag-eenjoy sila sa kompanya ng isa\'t isa habang lumalahok sa cat yoga.',
            'ja': '参照写真の5人を、心地よい朝の明るく穏やかな公共公園で描いた2Dアニメーション画像を作成してください。彼らはキャットヨガに参加しながら、お互いの会社を楽しんでいます。'
        },
        'cat_yoga_person1': {
            'en': 'Person 1 (North American male) — tallest',
            'es': 'Persona 1 (hombre norteamericano) — el más alto',
            'zh': '人物1（北美男性）— 最高',
            'fr': 'Personne 1 (homme nord-américain) — le plus grand',
            'hi': 'व्यक्ति 1 (उत्तर अमेरिकी पुरुष) — सबसे लंबा',
            'tl': 'Tao 1 (Hilagang Amerikanong lalaki) — pinakamataas',
            'ja': '人物1（北米男性）— 最も背が高い'
        },
        'cat_yoga_person2': {
            'en': 'Persons 3 and 4 (North American females) — second tallest',
            'es': 'Personas 3 y 4 (mujeres norteamericanas) — segunda más alta',
            'zh': '人物3和4（北美女性）— 第二高',
            'fr': 'Personnes 3 et 4 (femmes nord-américaines) — deuxième plus grandes',
            'hi': 'व्यक्ति 3 और 4 (उत्तर अमेरिकी महिलाएं) — दूसरी सबसे लंबी',
            'tl': 'Mga Tao 3 at 4 (Hilagang Amerikanong babae) — pangalawang pinakamataas',
            'ja': '人物3と4（北米女性）— 2番目に背が高い'
        },
        'cat_yoga_person3': {
            'en': 'Person 2 (Indian male) — third tallest',
            'es': 'Persona 2 (hombre indio) — tercera más alta',
            'zh': '人物2（印度男性）— 第三高',
            'fr': 'Personne 2 (homme indien) — troisième plus grand',
            'hi': 'व्यक्ति 2 (भारतीय पुरुष) — तीसरा सबसे लंबा',
            'tl': 'Tao 2 (Indianong lalaki) — pangatlong pinakamataas',
            'ja': '人物2（インド人男性）— 3番目に背が高い'
        },
        'cat_yoga_person4': {
            'en': 'Person 5 (Filipina female) — shortest',
            'es': 'Persona 5 (mujer filipina) — la más baja',
            'zh': '人物5（菲律宾女性）— 最矮',
            'fr': 'Personne 5 (femme philippine) — la plus petite',
            'hi': 'व्यक्ति 5 (फिलिपिना महिला) — सबसे छोटा',
            'tl': 'Tao 5 (Babaeng Pilipina) — pinakamababa',
            'ja': '人物5（フィリピン人女性）— 最も背が低い'
        },
        'cat_yoga_scene1': {
            'en': 'All five individuals are positioned on yoga mats, performing Cat Pose or Cat-Cow Pose.',
            'es': 'Las cinco personas están posicionadas en colchonetas de yoga, realizando la Postura del Gato o la Postura Gato-Vaca.',
            'zh': '五个人都在瑜伽垫上，表演猫式或猫牛式。',
            'fr': 'Les cinq personnes sont positionnées sur des tapis de yoga, effectuant la pose du chat ou la pose chat-vache.',
            'hi': 'सभी पांच व्यक्ति योग मैट पर स्थित हैं, कैट पोज़ या कैट-काउ पोज़ कर रहे हैं।',
            'tl': 'Ang limang indibidwal ay nakaposisyon sa mga yoga mat, gumagawa ng Cat Pose o Cat-Cow Pose.',
            'ja': '5人全員がヨガマットの上に配置され、キャットポーズまたはキャット・カウポーズを行っています。'
        },
        'cat_yoga_scene2': {
            'en': 'Multiple cats are interacting with them:',
            'es': 'Varios gatos están interactuando con ellos:',
            'zh': '多只猫与他们互动：',
            'fr': 'Plusieurs chats interagissent avec eux:',
            'hi': 'कई बिल्लियाँ उनके साथ बातचीत कर रही हैं:',
            'tl': 'Maraming pusa ang nakikipag-ugnayan sa kanila:',
            'ja': '複数の猫が彼らと交流しています：'
        },
        'cat_yoga_scene2a': {
            'en': 'Some cats should be positioned on the backs of a few participants.',
            'es': 'Algunos gatos deben estar posicionados en las espaldas de algunos participantes.',
            'zh': '一些猫应该放在几个参与者的背上。',
            'fr': 'Certains chats doivent être positionnés sur le dos de quelques participants.',
            'hi': 'कुछ बिल्लियों को कुछ प्रतिभागियों की पीठ पर रखा जाना चाहिए।',
            'tl': 'Ang ilang pusa ay dapat nakaposisyon sa likod ng ilang kalahok.',
            'ja': '一部の猫は、数人の参加者の背中に配置する必要があります。'
        },
        'cat_yoga_scene2b': {
            'en': 'Additional cats should be on the ground beside or in front of the participants.',
            'es': 'Los gatos adicionales deben estar en el suelo al lado o frente a los participantes.',
            'zh': '其他猫应该在参与者旁边或前面的地面上。',
            'fr': 'Les chats supplémentaires doivent être au sol à côté ou devant les participants.',
            'hi': 'अतिरिक्त बिल्लियाँ प्रतिभागियों के बगल या सामने जमीन पर होनी चाहिए।',
            'tl': 'Ang karagdagang mga pusa ay dapat nasa lupa sa tabi o sa harap ng mga kalahok.',
            'ja': '追加の猫は、参加者の横または前の地面にいる必要があります。'
        },
        'cat_yoga_scene3': {
            'en': 'The atmosphere should be warm, friendly, and relaxed, with soft morning light filtering through park trees.',
            'es': 'El ambiente debe ser cálido, amigable y relajado, con luz suave de la mañana filtrándose a través de los árboles del parque.',
            'zh': '气氛应该温暖、友好、轻松，柔和的晨光透过公园的树木。',
            'fr': 'L\'atmosphère doit être chaleureuse, amicale et détendue, avec une douce lumière matinale filtrant à travers les arbres du parc.',
            'hi': 'वातावरण गर्म, मैत्रीपूर्ण और आरामदायक होना चाहिए, पार्क के पेड़ों से छनती हुई नरम सुबह की रोशनी के साथ।',
            'tl': 'Ang atmospera ay dapat mainit, palakaibigan, at relaxed, na may malambot na liwanag ng umaga na sumusala sa mga puno ng parke.',
            'ja': '雰囲気は暖かく、フレンドリーでリラックスしたものであり、公園の木々から柔らかな朝の光が差し込んでいる必要があります。'
        },
        'cat_yoga_scene4': {
            'en': 'The characters should maintain likeness based on the uploaded reference image, but rendered in 2D animated style with soft, expressive features and high detail.',
            'es': 'Los personajes deben mantener el parecido basado en la imagen de referencia cargada, pero renderizados en estilo animado 2D con características suaves, expresivas y de alto detalle.',
            'zh': '角色应根据上传的参考图像保持相似性，但以2D动画风格呈现，具有柔和、富有表现力的特征和高细节。',
            'fr': 'Les personnages doivent maintenir la ressemblance basée sur l\'image de référence téléchargée, mais rendus dans un style animé 2D avec des caractéristiques douces, expressives et très détaillées.',
            'hi': 'अपलोड की गई संदर्भ छवि के आधार पर पात्रों को समानता बनाए रखनी चाहिए, लेकिन कोमल, अभिव्यंजक विशेषताओं और उच्च विस्तार के साथ 2D एनिमेटेड शैली में प्रस्तुत किया जाना चाहिए।',
            'tl': 'Ang mga karakter ay dapat mapanatili ang pagkakahawig batay sa na-upload na reference image, ngunit na-render sa 2D animated na estilo na may malambot, mapagpahayag na mga katangian at mataas na detalye.',
            'ja': 'キャラクターは、アップロードされた参照画像に基づいて類似性を維持する必要がありますが、柔らかく表情豊かな特徴と高詳細を備えた2Dアニメーションスタイルでレンダリングされます。'
        },
        // Team Portrait prompt content
        'team_portrait_intro': {
            'en': 'Create a polished, semi-realistic anime-style team portrait featuring the five individuals from the reference image. The portrait should be clean, professional, and cohesive in tone.',
            'es': 'Crea un retrato de equipo pulido, semi-realista en estilo anime que presente a las cinco personas de la imagen de referencia. El retrato debe ser limpio, profesional y cohesivo en tono.',
            'zh': '创作一幅精致、半写实的动漫风格团队肖像，以参考图像中的五个人为特色。肖像应该干净、专业、色调统一。',
            'fr': 'Créez un portrait d\'équipe poli, semi-réaliste de style anime mettant en vedette les cinq personnes de l\'image de référence. Le portrait doit être propre, professionnel et cohérent dans le ton.',
            'hi': 'संदर्भ छवि से पांच व्यक्तियों को प्रदर्शित करते हुए एक पॉलिश, अर्ध-यथार्थवादी एनीमे-शैली की टीम पोर्ट्रेट बनाएं। पोर्ट्रेट स्वच्छ, पेशेवर और स्वर में सुसंगत होना चाहिए।',
            'tl': 'Lumikha ng isang pinakintab, semi-realistic anime-style na larawan ng koponan na nagtatampok sa limang indibidwal mula sa reference image. Ang larawan ay dapat malinis, propesyonal, at magkakaugnay sa tono.',
            'ja': '参照画像の5人をフィーチャーした、洗練された半写実的なアニメスタイルのチームポートレートを作成してください。ポートレートは、クリーンでプロフェッショナル、トーンが統一されている必要があります。'
        },
        'team_portrait_detail1': {
            'en': 'Characters must retain recognizable features from the original photo.',
            'es': 'Los personajes deben conservar características reconocibles de la foto original.',
            'zh': '角色必须保留原始照片中可识别的特征。',
            'fr': 'Les personnages doivent conserver des caractéristiques reconnaissables de la photo originale.',
            'hi': 'पात्रों को मूल फोटो से पहचानने योग्य विशेषताओं को बनाए रखना चाहिए।',
            'tl': 'Ang mga karakter ay dapat mapanatili ang nakikilalang mga katangian mula sa orihinal na larawan.',
            'ja': 'キャラクターは、元の写真から認識可能な特徴を保持する必要があります。'
        },
        'team_portrait_detail2': {
            'en': 'Arrange the group in a classic portrait composition. The overall mood should be warm, unified, and professional. Something suitable for representing a team or family group.',
            'es': 'Organiza el grupo en una composición de retrato clásica. El estado de ánimo general debe ser cálido, unificado y profesional. Algo adecuado para representar un equipo o grupo familiar.',
            'zh': '将团队安排在经典的肖像构图中。整体氛围应该温暖、统一和专业。适合代表团队或家庭团体的东西。',
            'fr': 'Disposez le groupe dans une composition de portrait classique. L\'ambiance générale doit être chaleureuse, unifiée et professionnelle. Quelque chose de convenable pour représenter une équipe ou un groupe familial.',
            'hi': 'समूह को एक क्लासिक पोर्ट्रेट संरचना में व्यवस्थित करें। समग्र मनोदशा गर्म, एकीकृत और पेशेवर होनी चाहिए। एक टीम या परिवार समूह का प्रतिनिधित्व करने के लिए उपयुक्त कुछ।',
            'tl': 'Ayusin ang grupo sa isang klasikong komposisyon ng larawan. Ang pangkalahatang mood ay dapat mainit, nagkakaisa, at propesyonal. Ang isang bagay na angkop para sa pagkatawan sa isang koponan o grupo ng pamilya.',
            'ja': 'グループを古典的なポートレート構図に配置します。全体的なムードは、暖かく、統一され、プロフェッショナルである必要があります。チームまたは家族グループを表すのに適したものです。'
        },
        'team_portrait_detail3': {
            'en': 'Use soft lighting, clean linework, and balanced colors to create a refined final image.',
            'es': 'Usa iluminación suave, líneas limpias y colores equilibrados para crear una imagen final refinada.',
            'zh': '使用柔和的照明、干净的线条和平衡的颜色来创建精致的最终图像。',
            'fr': 'Utilisez un éclairage doux, des lignes nettes et des couleurs équilibrées pour créer une image finale raffinée.',
            'hi': 'एक परिष्कृत अंतिम छवि बनाने के लिए नरम प्रकाश, स्वच्छ रेखाचित्र और संतुलित रंगों का उपयोग करें।',
            'tl': 'Gumamit ng malambot na liwanag, malinis na linework, at balanseng mga kulay upang lumikha ng isang pinong huling imahe.',
            'ja': '柔らかい照明、きれいな線画、バランスの取れた色を使用して、洗練された最終画像を作成します。'
        },
        'back_beginning': {
            'en': 'Back to Beginning',
            'es': 'Volver al Principio',
            'zh': '返回开始',
            'fr': 'Retour au Début',
            'hi': 'शुरुआत पर वापस जाएं',
            'tl': 'Bumalik sa Simula',
            'ja': '最初に戻る'
        },
        'page_title': {
            'en': 'Happy Birthday Michelle',
            'es': 'Feliz Cumpleaños Michelle',
            'zh': '生日快乐 Michelle',
            'fr': 'Joyeux Anniversaire Michelle',
            'hi': 'जन्मदिन मुबारक Michelle',
            'tl': 'Maligayang Kaarawan Michelle',
            'ja': 'お誕生日おめでとう Michelle'
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
        // Birthday Messages
        'message_1': {
            'en': 'Happy Birthday!<br>May your year ahead be filled with exciting opportunities!',
            'es': '¡Feliz Cumpleaños!<br>¡Que tu próximo año esté lleno de oportunidades emocionantes!',
            'zh': '生日快乐！<br>愿你的新一年充满令人兴奋的机会！',
            'fr': 'Joyeux Anniversaire!<br>Que votre année à venir soit remplie d\'opportunités passionnantes!',
            'hi': 'जन्मदिन मुबारक!<br>आपका आगामी वर्ष रोमांचक अवसरों से भरा हो!',
            'tl': 'Maligayang Kaarawan!<br>Nawa ang iyong darating na taon ay puno ng mga kapana-panabik na pagkakataon!',
            'ja': 'お誕生日おめでとう！<br>来年がエキサイティングな機会に満ちた年になりますように！'
        },
        'message_2': {
            'en': 'Happy Birthday!<br>Thanks for being a supportive manager. Hope you get some time to relax.',
            'es': '¡Feliz Cumpleaños!<br>Gracias por ser un gerente solidario. Espero que tengas tiempo para relajarte.',
            'zh': '生日快乐！<br>感谢您成为一位支持我们的经理。希望您有时间放松一下。',
            'fr': 'Joyeux Anniversaire!<br>Merci d\'être un manager qui nous soutient. J\'espère que vous aurez du temps pour vous détendre.',
            'hi': 'जन्मदिन मुबारक!<br>सहायक प्रबंधक होने के लिए धन्यवाद। आशा है कि आपको आराम करने का समय मिलेगा।',
            'tl': 'Maligayang Kaarawan!<br>Salamat sa pagiging suportang manager. Sana makakapagpahinga ka.',
            'ja': 'お誕生日おめでとう！<br>サポートしてくれるマネージャーでいてくれてありがとう。リラックスする時間が持てますように。'
        },
        'message_3': {
            'en': 'Happy Birthday, Michelle!!<br>Thank you for being a supportive and inclusive manager, it makes a big impact on team dynamics and morale, and we all appreciate it. I hope you have a fun and relaxing birthday weekend! ',
            'es': '¡Feliz Cumpleaños, Michelle!<br>Gracias por ser una gerente solidaria e inclusiva, tiene un gran impacto en la dinámica y la moral del equipo, y todos lo apreciamos. ¡Espero que tengas un fin de semana de cumpleaños divertido y relajante!',
            'zh': '生日快乐，米歇尔！！<br>感谢您成为一位支持性和包容性的经理，这对团队动力和士气产生了重大影响，我们都很感激。希望你度过一个愉快轻松的生日周末！',
            'fr': 'Joyeux Anniversaire, Michelle!!<br>Merci d\'être une manager solidaire et inclusive, cela a un grand impact sur la dynamique et le moral de l\'équipe, et nous l\'apprécions tous. J\'espère que vous passerez un week-end d\'anniversaire amusant et relaxant!',
            'hi': 'जन्मदिन मुबारक, मिशेल!!<br>सहायक और समावेशी प्रबंधक होने के लिए धन्यवाद, यह टीम की गतिशीलता और मनोबल पर बड़ा प्रभाव डालता है, और हम सभी इसकी सराहना करते हैं। मुझे आशा है कि आपका जन्मदिन का सप्ताहांत मजेदार और आरामदायक हो!',
            'tl': 'Maligayang Kaarawan, Michelle!!<br>Salamat sa pagiging suportado at inklusibong manager, ito ay may malaking epekto sa dinamika at moral ng koponan, at lahat kami ay nagpapahalaga nito. Sana magkaroon ka ng masaya at nakakarelaks na birthday weekend!',
            'ja': 'お誕生日おめでとう、ミシェル！！<br>サポート力があり包括的なマネージャーでいてくれてありがとうございます。これはチームのダイナミクスと士気に大きな影響を与えており、私たち全員が感謝しています。楽しくリラックスしたバースデーウィークエンドをお過ごしください！'
        },
        'message_4': {
            'en': 'Happy Birthday, Michelle!<br>This surprise is a bit late, but it is still Michelle Day all November. Thank you for your guidance and support. I have grown so much under your leadership. Wishing you a year ahead filled with health, success, and blessings!',
            'es': '¡Feliz Cumpleaños, Michelle!<br>Esta sorpresa es un poco tarde, pero sigue siendo el Día de Michelle todo noviembre. Gracias por tu orientación y apoyo. He crecido mucho bajo tu liderazgo. ¡Te deseo un año lleno de salud, éxito y bendiciones!',
            'zh': '生日快乐，米歇尔！<br>这个惊喜有点晚了，但整个十一月仍然是米歇尔日。感谢您的指导和支持。在您的领导下，我成长了很多。祝您来年健康、成功、幸福！',
            'fr': 'Joyeux Anniversaire, Michelle!<br>Cette surprise est un peu en retard, mais c\'est toujours le Jour de Michelle tout novembre. Merci pour vos conseils et votre soutien. J\'ai tellement grandi sous votre direction. Je vous souhaite une année remplie de santé, de succès et de bénédictions!',
            'hi': 'जन्मदिन मुबारक, मिशेल!<br>यह आश्चर्य थोड़ा देर से है, लेकिन यह अभी भी पूरे नवंबर में मिशेल दिवस है। आपके मार्गदर्शन और समर्थन के लिए धन्यवाद। मैं आपके नेतृत्व में बहुत बढ़ी हूं। आपको स्वास्थ्य, सफलता और आशीर्वाद से भरा एक वर्ष मिले!',
            'tl': 'Maligayang Kaarawan, Michelle!<br>Medyo huli ang sorpresang ito, ngunit ito ay Michelle Day pa rin buong Nobyembre. Salamat sa iyong gabay at suporta. Lumaki ako nang husto sa ilalim ng iyong pamumuno. Hinihiling ko sa iyo ang isang taon na puno ng kalusugan, tagumpay, at mga pagpapala!',
            'ja': 'お誕生日おめでとう、ミシェル！<br>このサプライズは少し遅れましたが、11月はまだミシェルの日です。ご指導とサポートをありがとうございます。あなたのリーダーシップの下で大きく成長しました。健康、成功、そして祝福に満ちた一年になりますように！'
        },
        'play_games': {
            'en': '🎮 Play Games',
            'es': '🎮 Jugar Juegos',
            'zh': '🎮 玩游戏',
            'fr': '🎮 Jouer aux Jeux',
            'hi': '🎮 खेल खेलें',
            'tl': '🎮 Maglaro ng mga Laro',
            'ja': '🎮 ゲームをプレイ'
        },
        // Games translations
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
            'en': 'Pop emojis and build combos for up to 6x multiplier! 30 seconds of fast-paced fun!',
            'es': '¡Estalla emojis y crea combos para un multiplicador de hasta 6x! ¡30 segundos de diversión!',
            'zh': '爆破表情符号并建立组合，最高6倍加成！30秒的快节奏乐趣！',
            'fr': 'Éclatez des emojis et créez des combos jusqu\'au multiplicateur 6x! 30 secondes de fun!',
            'hi': 'इमोजी फोड़ें और 6x गुणक तक कॉम्बो बनाएं! 30 सेकंड का मज़ा!',
            'tl': 'Pumutok ng emoji at gumawa ng combo para sa 6x multiplier! 30 segundo ng mabilis na laro!',
            'ja': '絵文字をポップしてコンボを築き、6倍まで増やそう！30秒間のスピードゲーム！'
        },
        'emoji_catch_title': {
            'en': 'Emoji Catch',
            'es': 'Atrapa Emojis',
            'zh': '捕捉表情符号',
            'fr': 'Attrape Emoji',
            'hi': 'इमोजी पकड़ो',
            'tl': 'Hulihin ang Emoji',
            'ja': '絵文字キャッチ'
        },
        'emoji_catch_desc': {
            'en': 'Catch good emojis, avoid bad ones! You have 3 lives - don\'t lose them all!',
            'es': '¡Atrapa emojis buenos, evita los malos! Tienes 3 vidas - ¡no las pierdas todas!',
            'zh': '捕捉好的表情符号，避免坏的！你有 3 条命 - 不要全部失去！',
            'fr': 'Attrapez les bons emojis, évitez les mauvais! Vous avez 3 vies - ne les perdez pas toutes!',
            'hi': 'अच्छे इमोजी पकड़ें， बुरे से बचें! आपके पास 3 जीवन हैं - सभी न खोएं!',
            'tl': 'Hulihin ang mabuting emoji, iwasan ang masama! Mayroon kang 3 buhay - huwag mawala lahat!',
            'ja': '良い絵文字をキャッチし、悪いものは避けて！3つのライフがある - 全部失わないで！'
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
        'back_games': {
            'en': '← Back to Games',
            'es': '← Volver a Juegos',
            'zh': '← 返回游戏',
            'fr': '← Retour aux Jeux',
            'hi': '← खेलों पर वापस जाएं',
            'tl': '← Bumalik sa Mga Laro',
            'ja': '← ゲームに戻る'
        },
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
            'en': 'Pop emojis and build combos for up to 6x multiplier! 30 seconds of fast-paced fun!',
            'es': '¡Estalla emojis y construye combos para multiplicador hasta x6! ¡30 segundos de diversión rápida!',
            'zh': '爆破表情符号并建立连击获得最高6倍乘数！30秒快节奏乐趣！',
            'fr': 'Éclatez les emojis et créez des combos pour un multiplicateur jusqu\'à x6! 30 secondes de plaisir rapide!',
            'hi': 'इमोजी फोड़ें और 6x गुणक तक कॉम्बो बनाएं! 30 सेकंड का तेज़ मज़ा!',
            'tl': 'Pumutok ng emoji at gumawa ng combo para sa hanggang 6x multiplier! 30 segundo ng mabilis na kasiyahan!',
            'ja': '絵文字をポップしてコンボを作り、最大6倍のマルチプライヤーを獲得！30秒間の速いペースの楽しみ！'
        },
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
            'en': 'Catch good emojis, avoid bad ones! You have 3 lives - don\'t lose them all!',
            'es': '¡Atrapa emojis buenos, evita los malos! Tienes 3 vidas - ¡no las pierdas todas!',
            'zh': '接住好的表情符号，避开坏的！你有3条命 - 不要全部失去！',
            'fr': 'Attrapez les bons emojis, évitez les mauvais! Vous avez 3 vies - ne les perdez pas toutes!',
            'hi': 'अच्छे इमोजी पकड़ें, बुरे से बचें! आपके पास 3 जीवन हैं - सभी मत खोइए!',
            'tl': 'Hulihin ang mabubuting emoji, iwasan ang masasama! Mayroon kang 3 buhay - huwag mawala lahat!',
            'ja': '良い絵文字をキャッチし、悪いものを避けよう！3つのライフがあります - 全部失わないように！'
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
        'caught_label': {
            'en': 'Caught:',
            'es': 'Atrapados:',
            'zh': '已捕获：',
            'fr': 'Attrapés:',
            'hi': 'पकड़े गए:',
            'tl': 'Nahuli:',
            'ja': 'キャッチ：'
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
        'leaderboard_points': {
            'en': 'points',
            'es': 'puntos',
            'zh': '分',
            'fr': 'points',
            'hi': 'अंक',
            'tl': 'puntos',
            'ja': 'ポイント'
        },
        'leaderboard_caught': {
            'en': 'caught',
            'es': 'atrapados',
            'zh': '已捕获',
            'fr': 'attrapés',
            'hi': 'पकड़े',
            'tl': 'nahuli',
            'ja': 'キャッチ'
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
        'restart_button': {
            'en': '🔄 Restart',
            'es': '🔄 Reiniciar',
            'zh': '🔄 重新开始',
            'fr': '🔄 Redémarrer',
            'hi': '🔄 पुनः प्रारंभ',
            'tl': '🔄 I-restart',
            'ja': '🔄 再開'
        }
    };
    
    return translations[key] ? translations[key][lang] : null;
}

/**
 * Toggle background music on/off
 */
function toggleMusic() {
    const toggleButton = document.getElementById('musicToggle');
    
    // Toggle mute state
    isMusicMuted = !isMusicMuted;
    window.isMusicMuted = isMusicMuted;
    localStorage.setItem('musicMuted', isMusicMuted.toString());
    
    // Update button appearance
    if (isMusicMuted) {
        toggleButton.innerHTML = '🔇';
        toggleButton.classList.add('muted');
        // Pause current music if playing
        if (currentBackgroundMusic) {
            currentBackgroundMusic.pause();
        }
        if (window.gameBackgroundMusic) {
            window.gameBackgroundMusic.pause();
        }
    } else {
        toggleButton.innerHTML = '🔊';
        toggleButton.classList.remove('muted');
        // Resume current music if it exists
        if (currentBackgroundMusic) {
            currentBackgroundMusic.play().catch(e => console.log('Music play failed:', e));
        } else if (window.gameBackgroundMusic) {
            window.gameBackgroundMusic.play().catch(e => console.log('Music play failed:', e));
        }
    }
}

/**
 * Initialize particles based on the theme
 * @param {string} theme - The theme type (summer, autumn, winter, spring)
 */
function initParticles(theme) {
    const container = document.getElementById('particles');
    
    // Clear existing particles
    container.innerHTML = '';
    
    // Determine particle count based on theme (lighter for performance)
    const particleCount = theme === 'winter' ? 50 : 35;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container, theme, i);
    }
}

/**
 * Initialize mixed particles from all seasons
 */
function initMixedParticles() {
    const container = document.getElementById('particles');
    
    // Clear existing particles
    container.innerHTML = '';
    
    const themes = ['summer', 'autumn', 'winter', 'spring'];
    const particlesPerTheme = 10;
    
    themes.forEach(theme => {
        for (let i = 0; i < particlesPerTheme; i++) {
            createParticle(container, theme, i);
        }
    });
}

/**
 * Create a single particle element
 * @param {HTMLElement} container - The container element
 * @param {string} theme - The theme type
 * @param {number} index - Particle index for variation
 */
function createParticle(container, theme, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Set particle appearance based on theme
    const particleConfig = getParticleConfig(theme);
    
    // Random starting position (use pixels for consistency with drag)
    const startX = Math.random() * window.innerWidth;
    const startY = -(Math.random() * 200);
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    // Random size within range
    const size = particleConfig.minSize + Math.random() * (particleConfig.maxSize - particleConfig.minSize);
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Set particle content and style
    particle.innerHTML = particleConfig.symbol;
    particle.style.fontSize = size + 'px';
    particle.style.opacity = particleConfig.opacity;
    particle.style.zIndex = '1000';
    
    // Random animation duration for variation
    const duration = particleConfig.minDuration + Math.random() * (particleConfig.maxDuration - particleConfig.minDuration);
    const delay = Math.random() * 5;
    
    particle.style.animation = `${particleConfig.animation} ${duration}s linear ${delay}s infinite`;
    
    // Make particles draggable and interactive
    particle.style.cursor = 'grab';
    particle.style.pointerEvents = 'auto';
    particle.style.userSelect = 'none';
    particle.style.position = 'fixed'; // Use fixed positioning for easier dragging
    
    let isDragging = false;
    let offsetX, offsetY;
    
    particle.addEventListener('mousedown', function(e) {
        isDragging = true;
        particle.style.cursor = 'grabbing';
        
        // Get the actual rendered position before stopping animation
        const rect = particle.getBoundingClientRect();
        
        // Stop animation and set position to where it currently is
        particle.style.animation = 'none';
        particle.style.left = rect.left + 'px';
        particle.style.top = rect.top + 'px';
        particle.style.zIndex = '2000';
        
        // Now calculate offset from the actual position
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        e.preventDefault();
        e.stopPropagation();
    });
    
    const handleMouseMove = function(e) {
        if (isDragging) {
            e.preventDefault();
            
            particle.style.left = (e.clientX - offsetX) + 'px';
            particle.style.top = (e.clientY - offsetY) + 'px';
        }
    };
    
    const handleMouseUp = function() {
        if (isDragging) {
            isDragging = false;
            particle.style.cursor = 'grab';
            particle.style.zIndex = '1000';
            
            // Resume animation from current position after a brief moment
            setTimeout(() => {
                particle.style.animation = `${particleConfig.animation} ${duration}s linear ${delay}s infinite`;
            }, 500);
        }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Touch support for mobile
    particle.addEventListener('touchstart', function(e) {
        isDragging = true;
        
        // Get the actual rendered position before stopping animation
        const rect = particle.getBoundingClientRect();
        
        // Stop animation and set position to where it currently is
        particle.style.animation = 'none';
        particle.style.left = rect.left + 'px';
        particle.style.top = rect.top + 'px';
        particle.style.zIndex = '2000';
        
        const touch = e.touches[0];
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        
        e.preventDefault();
        e.stopPropagation();
    });
    
    const handleTouchMove = function(e) {
        if (isDragging) {
            e.preventDefault();
            const touch = e.touches[0];
            
            particle.style.left = (touch.clientX - offsetX) + 'px';
            particle.style.top = (touch.clientY - offsetY) + 'px';
        }
    };
    
    const handleTouchEnd = function() {
        if (isDragging) {
            isDragging = false;
            particle.style.zIndex = '1000';
            
            setTimeout(() => {
                particle.style.animation = `${particleConfig.animation} ${duration}s linear ${delay}s infinite`;
            }, 500);
        }
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    container.appendChild(particle);
}

/**
 * Get particle configuration based on theme
 * @param {string} theme - The theme type
 * @returns {object} Particle configuration
 */
function getParticleConfig(theme) {
    const configs = {
        summer: {
            symbol: '☀️',
            minSize: 45,
            maxSize: 65,
            opacity: 0.7,
            minDuration: 15,
            maxDuration: 25,
            animation: 'fall'
        },
        autumn: {
            symbol: '🍂',
            minSize: 50,
            maxSize: 70,
            opacity: 0.8,
            minDuration: 12,
            maxDuration: 20,
            animation: 'fall'
        },
        winter: {
            symbol: '❄️',
            minSize: 45,
            maxSize: 65,
            opacity: 0.9,
            minDuration: 10,
            maxDuration: 18,
            animation: 'fall-winter'
        },
        spring: {
            symbol: '🌸',
            minSize: 48,
            maxSize: 68,
            opacity: 0.8,
            minDuration: 13,
            maxDuration: 22,
            animation: 'fall'
        }
    };
    
    return configs[theme] || configs.autumn;
}

/**
 * Create ripple effect on button click
 * @param {MouseEvent} e - The click event
 */
function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // Add sparkle effect
    createSparkles(e);
}

/**
 * Create sparkle/pop effect on button click
 * @param {MouseEvent} e - The click event
 */
function createSparkles(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const sparkleCount = 8;
    
    // Play button click sound (except for gift button)
    if (!button.id || button.id !== 'giftButton') {
        if (!isMusicMuted) {
            const clickSound = buttonClickSound.cloneNode();
            clickSound.volume = 0.1;
            clickSound.play().then(() => {
                console.log('Button click sound played successfully');
            }).catch((error) => {
                console.log('Click sound error:', error);
            });
        }
    }
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.innerHTML = '✨';
        
        const angle = (360 / sparkleCount) * i;
        const distance = 50 + Math.random() * 30;
        
        sparkle.style.left = (e.clientX - rect.left) + 'px';
        sparkle.style.top = (e.clientY - rect.top) + 'px';
        sparkle.style.setProperty('--angle', angle + 'deg');
        sparkle.style.setProperty('--distance', distance + 'px');
        
        button.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

/**
 * Add decorative floating elements to message boxes
 * @param {string} theme - The theme type
 */
function addMessageDecorations(theme) {
    const messageCard = document.querySelector('.message-card');
    if (!messageCard) return;
    
    const decorations = getThemeDecorations(theme);
    
    decorations.forEach((deco, index) => {
        const element = document.createElement('div');
        element.className = 'message-decoration';
        element.innerHTML = deco.emoji;
        element.style.fontSize = deco.size;
        element.style.opacity = deco.opacity;
        element.style.top = deco.top;
        element.style.left = deco.left;
        element.style.right = deco.right;
        element.style.bottom = deco.bottom;
        element.style.animation = `${deco.animation} ${deco.duration}s ${deco.timing} ${deco.delay}s infinite`;
        element.style.position = 'absolute';
        element.style.pointerEvents = 'none';
        
        messageCard.appendChild(element);
    });
}

/**
 * Get decoration configuration for each theme
 * @param {string} theme - The theme type
 * @returns {array} Array of decoration configs
 */
function getThemeDecorations(theme) {
    const configs = {
        summer: [
            { emoji: '☀️', size: '6rem', opacity: '0.05', top: '50%', left: '8%', animation: 'decoration-pulse', duration: 5, timing: 'ease-in-out', delay: 0 }
        ],
        autumn: [
            { emoji: '🍁', size: '7rem', opacity: '0.05', top: '50%', left: '8%', animation: 'decoration-sway', duration: 6, timing: 'ease-in-out', delay: 0 }
        ],
        winter: [
            { emoji: '❄️', size: '6rem', opacity: '0.06', top: '50%', left: '8%', animation: 'decoration-rotate', duration: 15, timing: 'linear', delay: 0 }
        ],
        spring: [
            { emoji: '🌸', size: '6rem', opacity: '0.06', top: '50%', left: '8%', animation: 'decoration-bloom', duration: 7, timing: 'ease-in-out', delay: 0 }
        ]
    };
    
    return configs[theme] || [];
}

/**
 * Play seasonal ambient sound based on theme
 * @param {string} theme - The theme type
 */
/**
 * Play seasonal ambient sound based on theme
 * @param {string} theme - The theme type
 */
function playSeasonalSound(theme) {
    const sounds = {
        summer: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3', // Upbeat sunny melody
        autumn: 'https://www.bensound.com/bensound-music/bensound-memories.mp3', // Warm nostalgic melody
        winter: 'https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3', // Jazzy elegant melody
        spring: 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3'  // Happy cheerful melody
    };
    
    const soundUrl = sounds[theme];
    if (soundUrl) {
        // Wait for page transition to complete before playing sound
        setTimeout(() => {
            const audio = new Audio(soundUrl);
            audio.volume = 0.08;
            audio.loop = true;
            currentBackgroundMusic = audio; // Store reference for toggle control
            
            // Don't auto-play if user has muted
            if (isMusicMuted) {
                return;
            }
            
            // Try to play, handle autoplay restrictions
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Seasonal music playing for theme:', theme);
                }).catch(error => {
                    console.log('Audio autoplay prevented for', theme, '. Click anywhere to enable sound.');
                    // Try to play on first user interaction
                    const playOnClick = () => {
                        audio.play().then(() => {
                            console.log('Music started after user interaction');
                        }).catch(() => {});
                        document.removeEventListener('click', playOnClick);
                    };
                    document.addEventListener('click', playOnClick, { once: true });
                });
            }
        }, 600);
    }
}

/**
 * Play happy birthday song for home and ending pages
 */
function playBirthdaySong() {
    // Using a gentle instrumental birthday melody
    const birthdaySongUrl = 'https://www.bensound.com/bensound-music/bensound-happyrock.mp3';
    
    setTimeout(() => {
        const audio = new Audio(birthdaySongUrl);
        audio.volume = 0.06;
        audio.loop = true;
        currentBackgroundMusic = audio; // Store reference for toggle control
        
        // Don't auto-play if user has muted
        if (isMusicMuted) {
            return;
        }
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Birthday music playing');
            }).catch(error => {
                console.log('Audio autoplay prevented. Click anywhere to enable sound.');
                const playOnClick = () => {
                    audio.play().then(() => {
                        console.log('Birthday music started after user interaction');
                    }).catch(() => {});
                    document.removeEventListener('click', playOnClick);
                };
                document.addEventListener('click', playOnClick, { once: true });
            });
        }
    }, 600);
}

/**
 * Add smooth page transition effect
 */
document.addEventListener('DOMContentLoaded', function() {
    // Restore saved language and music settings
    const savedLanguage = localStorage.getItem('userLanguage') || 'en';
    const savedMusicMuted = localStorage.getItem('musicMuted') === 'true';
    
    // Update global state
    currentLanguage = savedLanguage;
    isMusicMuted = savedMusicMuted;
    
    // Restore music toggle button state
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle && savedMusicMuted) {
        musicToggle.innerHTML = '🔇';
        musicToggle.classList.add('muted');
    }
    
    // Add fade-in effect to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 10);
    
    // Restore language setting after DOM is ready
    setTimeout(() => {
        if (savedLanguage !== 'en') {
            // Update active language button
            document.querySelectorAll('.lang-option').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-lang') === savedLanguage) {
                    btn.classList.add('active');
                }
            });
            
            // Translate all content
            const elementsToTranslate = document.querySelectorAll('[data-translate]');
            elementsToTranslate.forEach(element => {
                const key = element.getAttribute('data-translate');
                const translation = getTranslation(key, savedLanguage);
                
                if (translation) {
                    if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
                        element.textContent = translation;
                    } else {
                        element.innerHTML = translation;
                    }
                }
            });
            
            // Translate sender names if present
            const senderElements = document.querySelectorAll('.sender-name');
            senderElements.forEach(element => {
                const originalName = element.getAttribute('data-sender');
                if (originalName) {
                    const translatedName = translateName(originalName, savedLanguage);
                    const fromText = getTranslation('message_from', savedLanguage) || 'From';
                    element.innerHTML = `<span data-translate="message_from">${fromText}</span> ${translatedName}`;
                }
            });
            
            // Update page title
            const titleTranslation = getTranslation('page_title', savedLanguage);
            if (titleTranslation) {
                document.title = titleTranslation;
            }
        }
    }, 100);
    
    // Add ripple effect to all buttons (use a slight delay to ensure all elements are ready)
    setTimeout(() => {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-nav, .btn-prev, .btn-next, .btn-home');
        buttons.forEach(button => {
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.addEventListener('click', createRipple);
        });
    }, 50);
    
    // Handle link clicks for smooth transitions
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply transition for internal navigation
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();
                
                // Small delay to ensure click sound plays before transition
                setTimeout(() => {
                    // Fade out
                    document.body.style.transition = 'opacity 0.3s ease-out';
                    document.body.style.opacity = '0';
                    
                    // Navigate after fade
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }, 100);
            }
        });
    });
});
