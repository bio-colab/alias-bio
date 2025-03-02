// script.js - الإصدار المحدث مع تحسينات UI/UX والميزات المطلوبة والمبسطة

const apiKeys = {
     analyst: 'AIzaSyCWV12p8IPEEsu9dN-7yFOSOFhV06tWI7s',
    creative: 'AIzaSyCWV12p8IPEEsu9dN-7yFOSOFhV06tWI7s',
    comedian: 'AIzaSyCWV12p8IPEEsu9dN-7yFOSOFhV06tWI7s',
    critic: 'AIzaSyCWV12p8IPEEsu9dN-7yFOSOFhV06tWI7s'
};

// قاعدة النص الاساسية للـ prompt
const basePrompt = 'أنت نموذج مخصص للتفاعل مع طلبة كلية العلوم السياسية بجامعة تكريت، جزء من مشروع قام بتطويره الطالب الياس خضر خلف شرار - المرحلة الأولى. عند سؤالك "من أنت" أو "من طورك"، أجب بأنك [اسم الشخصية]، نموذج مخصص لـ [وصف الشخصية]، وأنك جزء من مشروع طوره الياس خضر خلف شرار. لا تنحرف عن هذه الإجابة. قم بتنسيق ردودك باستخدام Markdown (مثل **نص غامق** و- للقوائم) عندما يكون ذلك مناسبًا.';

// توصيفات الشخصيات -  مبسطة ولا يمكن تعديلها الان
let prompts = {
    analyst: `${basePrompt.replace('[اسم الشخصية]', 'المحلل').replace('[وصف الشخصية]', 'تقديم تحليل سياسي دقيق وموضوعي')} أنت محلل سياسي محترف وموضوعي، مهمتك تقديم تحليل دقيق وعميق للموضوع السياسي المطروح. اعتمد على الحقائق والإحصائيات (افترض بيانات منطقية إذا لم تتوفر معلومات حقيقية). ركز على الأسباب الجذرية والنتائج المحتملة للموضوع، مع تجنب أي انحياز عاطفي أو شخصي. قدم تحليلك بأسلوب منهجي يشمل المقدمة، العوامل المؤثرة، والتوقعات المستقبلية. استخدم لغة أكاديمية وعبارات مثل "من الناحية التحليلية" أو "استنادًا إلى المعطيات".`,
    creative: `${basePrompt.replace('[اسم الشخصية]', 'المبدع').replace('[وصف الشخصية]', 'تقديم حلول وسيناريوهات سياسية مبتكرة')} أنت مبدع سياسي ذو خيال واسع، مهمتك تقديم حلول مبتكرة أو سيناريوهات خيالية للموضوع السياسي المطروح. كن جريئًا في اقتراحاتك، مثل تصميم سياسات جديدة أو تصور أحداث مستقبلية، مع الحفاظ على منطقية سياسية تجعل الأفكار قابلة للتطبيق نظريًا. قدم وصفًا تفصيليًا لكيفية عمل الحل أو تطور السيناريو، مع إبراز الجوانب الإيجابية والتحديات المحتملة. استخدم عبارات مثل "تخيل لو" أو "يمكن أن يكون الحل".`,
    comedian: `${basePrompt.replace('[اسم الشخصية]', 'الساخر').replace('[وصف الشخصية]', 'تقديم تعليقات سياسية ساخرة')} أنت معلق سياسي ساخر وذكي، مهمتك الرد على الموضوع السياسي بأسلوب فكاهي وتهكمي يبرز السخافة أو التناقضات في الوضع. استخدم اللهجة العراقية العامية مثل "هسة"، "عجل"، "لعد"، "شكو ماكو"، "هيچ"، "كلش"، وتجنب اللهجات الشامية أو المصرية. اجعل تعليقاتك قصيرة ومؤثرة، مع إمكانية السخرية من الأطراف المعنية دون تجريح مباشر.`,
    critic: `${basePrompt.replace('[اسم الشخصية]', 'الناقد').replace('[وصف الشخصية]', 'تقديم نقد سياسي حاد وموضوعي')} أنت ناقد سياسي حاد ومتمكن، مهمتك تحليل الموضوع السياسي بعين ناقدة لكشف نقاط الضعف، التناقضات، أو العيوب في الأفكار أو السياسات المطروحة. قدم حججًا منطقية وتحليلية تدعم وجهة نظرك، مع التركيز على الآثار السلبية أو المخاطر المحتملة. استخدم أسلوبًا حادًا ولكن موضوعيًا، مع عبارات مثل "هذا غير كافٍ" أو "يفتقر إلى المصداقية". قدم اقتراحات تحسين إذا أمكن.`
};

// إعدادات الأيقونات والألوان
const avatars = {
    analyst: { icon: '<i class="fas fa-chart-bar"></i>', color: 'bg-green-500 text-white', avatar_icon: '<i class="fas fa-user-tie"></i>' },
    creative: { icon: '<i class="fas fa-lightbulb"></i>', color: 'bg-purple-500 text-white', avatar_icon: '<i class="fas fa-brain"></i>' },
    comedian: { icon: '<i class="fas fa-grin-squint-tears"></i>', color: 'bg-yellow-600 text-gray-900', avatar_icon: '<i class="fas fa-theater-masks"></i>' },
    critic: { icon: '<i class="fas fa-angry"></i>', color: 'bg-red-600 text-white', avatar_icon: '<i class="fas fa-balance-scale"></i>' },
    user: { icon: '<i class="fas fa-user"></i>', color: 'bg-blue-500 text-white', avatar_icon: '<i class="fas fa-user-circle"></i>' }
};

// أسماء الشخصيات
const characterNames = {
    analyst: 'المحلل',
    creative: 'المبدع',
    comedian: 'الساخر',
    critic: 'الناقد',
    user: 'أنت'
};

// قائمة المواضيع السياسية المقترحة
const suggestedTopics = [
    "دور الشباب في الإصلاح السياسي",
    "مستقبل الديمقراطية في الشرق الأوسط",
    "تأثير وسائل التواصل الاجتماعي على الرأي العام",
    "تحديات الأمن القومي في العراق",
    "إصلاح النظام الانتخابي",
    "العلاقات بين العراق ودول الجوار",
    "دور المرأة في الحياة السياسية",
    "السياسة الخارجية العراقية",
    "تأثير الاقتصاد على الاستقرار السياسي",
    "مكافحة الفساد والإصلاح الإداري",
    "الهوية الوطنية والانتماء",
    "التحول الديمقراطي وتحدياته",
    "تطوير المؤسسات التشريعية",
    "حرية التعبير والإعلام السياسي",
    "السياسات المائية وأزمة المياه"
];

// قائمة الكلمات المحظورة للتصفية
const inappropriateWords = [
    "كلمة_محظورة_1", "كلمة_محظورة_2", "كلمة_محظورة_3", // أضف الكلمات المحظورة هنا
];

// المتغيرات الأساسية
let chat;
let pendingResponses = 0;
let currentTopic = '';
let selectedCharacter = null;
let responseHistory = []; // لتخزين سجل المحادثة للتصدير
let activeCharacters = {}; // لتتبع حالة الشخصيات النشطة
let darkMode = false; // لتتبع حالة الوضع الداكن
let animationsEnabled = true; // للتحكم في تفعيل/تعطيل الرسوم المتحركة
let typingTimeout; // لتتبع مؤقت مؤشر الكتابة

// --- وظائف تهيئة التطبيق ---

document.addEventListener('DOMContentLoaded', function() {
    initApp();
    setupThemeToggle();
    // استرجاع الوضع المفضل
    if (localStorage.getItem('darkMode') === 'true') {
        toggleDarkMode(true);
    }
});

function initApp() {
    chat = document.getElementById('chat');

    if (!chat || !document.querySelector('main')) {
        console.error("عناصر DOM الأساسية غير موجودة!");
        return;
    }

    setupChatInterface();
    addWelcomeMessage();
    setupTopicInput();
    setupTopicSuggestions();
    setupHelpPanel(); // حافظنا على لوحة المساعدة ولكن مبسطة
    setupAccessibilityFeatures();
    setupExportFeature();


    // استمع لحجم النافذة لتحسين التجاوب
    window.addEventListener('resize', debounce(() => {
        adjustChatContainerHeight();
    }, 250));

    adjustChatContainerHeight();
}

function adjustChatContainerHeight() {
    const chatContainer = document.getElementById('chat-messages-container');
    if (!chatContainer) return;

    const viewportHeight = window.innerHeight;
    const headerHeight = document.querySelector('header').offsetHeight || 0;
    const footerHeight = document.querySelector('footer').offsetHeight || 0;
    const inputBarHeight = document.querySelector('.input-bar').offsetHeight || 0;
    const characterButtonsHeight = document.querySelector('.character-buttons').offsetHeight || 0;

    // حساب الارتفاع المناسب مع ترك مساحة للعناصر الأخرى
    const optimalHeight = viewportHeight - headerHeight - footerHeight - inputBarHeight - characterButtonsHeight - 40;

    chatContainer.style.height = `${Math.max(300, optimalHeight)}px`;
}

function setupThemeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => toggleDarkMode());
    }
}

function toggleDarkMode(setDark) {
    darkMode = setDark !== undefined ? setDark : !darkMode;

    if (darkMode) {
        document.documentElement.classList.add('dark');
        document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-moon"></i>';
    }

    // حفظ التفضيل
    localStorage.setItem('darkMode', darkMode);
}

function setupAccessibilityFeatures() {
    // إضافة زر لتفعيل/تعطيل الرسوم المتحركة للمستخدمين الذين يعانون من حساسية الحركة
    const accessibilityButton = document.createElement('button');
    accessibilityButton.id = 'accessibilityToggle';
    accessibilityButton.className = 'dark-mode-toggle mr-2';
    accessibilityButton.title = 'تفعيل/تعطيل الرسوم المتحركة';
    accessibilityButton.innerHTML = '<i class="fas fa-universal-access"></i>';

    const headerControlsContainer = document.querySelector('header .flex-1:first-child');
    if (headerControlsContainer) {
        headerControlsContainer.appendChild(accessibilityButton);

        accessibilityButton.addEventListener('click', toggleAnimations);
    }

    // إضافة خاصية التنقل باستخدام لوحة المفاتيح
    setupKeyboardNavigation();
}

function toggleAnimations() {
    animationsEnabled = !animationsEnabled;

    if (animationsEnabled) {
        document.documentElement.classList.remove('reduce-motion');
        showToast('تم تفعيل الرسوم المتحركة');
    } else {
        document.documentElement.classList.add('reduce-motion');
        showToast('تم تعطيل الرسوم المتحركة');
    }

    // حفظ التفضيل
    localStorage.setItem('reduceMotion', !animationsEnabled);

    // تحديث أيقونة الزر
    const accessibilityButton = document.getElementById('accessibilityToggle');
    if (accessibilityButton) {
        if (animationsEnabled) {
            accessibilityButton.innerHTML = '<i class="fas fa-universal-access"></i>';
        } else {
            accessibilityButton.innerHTML = '<i class="fas fa-low-vision"></i>';
        }
    }
}

function setupKeyboardNavigation() {
    // إضافة خاصية التنقل بين العناصر الرئيسية باستخدام لوحة المفاتيح
    document.addEventListener('keydown', function(e) {
        // Shift + Tab لفتح قائمة المساعدة
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            document.getElementById('helpButton').click();
        }

        // Alt + T للتبديل بين الوضعين الداكن والفاتح
        if (e.key === 't' && e.altKey) {
            e.preventDefault();
            toggleDarkMode();
        }

        // Alt + S لتقديم الموضوع
        if (e.key === 's' && e.altKey) {
            e.preventDefault();
            submitTopic();
        }

        // Alt + A لطلب الرد من جميع الشخصيات
        if (e.key === 'a' && e.altKey) {
            e.preventDefault();
            getAllResponses();
        }
    });

    // إضافة tabindex للعناصر القابلة للتنقل
    const navigableElements = document.querySelectorAll('.response-btn, #topicInput, #sendButton, #exportButton');
    navigableElements.forEach((element, index) => {
        element.setAttribute('tabindex', index + 1);
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function setupTopicInput() {
    const topicInput = document.getElementById('topicInput');
    if (!topicInput) return;

    topicInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitTopic();
        }
    });

    topicInput.addEventListener('input', debounce(function() {
        showTopicSuggestions(this.value);
    }, 300));

    // التركيز على حقل الإدخال عند تحميل الصفحة
    topicInput.focus();
}

function setupTopicSuggestions() {
    const topicSuggestionsDiv = document.getElementById('topic-suggestions');
    if (!topicSuggestionsDiv) return;

    // تفريغ الحاوية
    topicSuggestionsDiv.innerHTML = '';

    // إضافة المواضيع المقترحة
    for (const topic of suggestedTopics) {
        const button = document.createElement('button');
        button.className = 'topic-suggestion';
        button.textContent = topic;
        button.addEventListener('click', function() {
            document.getElementById('topicInput').value = topic;
            toggleSuggestions(false);
            // التركيز على زر الإرسال بعد اختيار موضوع
            document.getElementById('sendButton').focus();
        });
        topicSuggestionsDiv.appendChild(button);
    }
}

function toggleSuggestions(show) {
    const suggestionsDiv = document.getElementById('topic-suggestions');

    if (!suggestionsDiv) {
        console.error("حاوية المواضيع المقترحة غير موجودة!");
        return;
    }

    if (show === false) {
        suggestionsDiv.classList.add('hidden');
    } else {
        // التأكد من أن المقترحات موجودة قبل عرضها
        if (suggestionsDiv.children.length === 0) {
            setupTopicSuggestions();
        }

        suggestionsDiv.classList.toggle('hidden');
    }
}

function showTopicSuggestions(searchText) {
    const suggestionsDiv = document.getElementById('topic-suggestions');
    if (!suggestionsDiv) return;

    if (!searchText || searchText.length < 2) {
        toggleSuggestions(false);
        return;
    }

    // الفلترة حسب النص المدخل
    const filteredTopics = suggestedTopics.filter(topic =>
        topic.toLowerCase().includes(searchText.toLowerCase())
    );

    // إظهار النتائج إذا وجدت
    if (filteredTopics.length > 0) {
        suggestionsDiv.innerHTML = '';
        filteredTopics.forEach(topic => {
            const button = document.createElement('button');
            button.className = 'topic-suggestion';
            button.textContent = topic;
            button.addEventListener('click', function() {
                document.getElementById('topicInput').value = topic;
                toggleSuggestions(false);
            });
            suggestionsDiv.appendChild(button);
        });
        suggestionsDiv.classList.remove('hidden');
    } else {
        toggleSuggestions(false);
    }
}

function setupHelpPanel() {
    const helpPanel = document.getElementById('help-panel');
    const helpButton = document.getElementById('helpButton');
    const closeHelpButton = document.getElementById('close-help');

    if(!helpPanel || !helpButton || !closeHelpButton) {
        console.error("عناصر لوحة المساعدة غير موجودة!");
        return;
    }

    // إضافة مستمع الحدث لزر المساعدة
    helpButton.onclick = function() {
        helpPanel.classList.add('active');
    };

    closeHelpButton.onclick = function() {
        helpPanel.classList.remove('active');
    };

    // إغلاق اللوحة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (helpPanel.classList.contains('active') &&
            !helpPanel.contains(e.target) &&
            e.target !== helpButton &&
            !helpButton.contains(e.target)) {
            helpPanel.classList.remove('active');
        }
    });

    // إغلاق اللوحة باستخدام زر Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && helpPanel.classList.contains('active')) {
            helpPanel.classList.remove('active');
        }
    });
}

function setupExportFeature() {
    const exportButton = document.getElementById('exportButton');

    if (exportButton) {
        exportButton.addEventListener('click', function() {
            exportConversation();
        });
    }
}


function setupChatInterface() {
    const mainContainer = document.querySelector('main');
    if (!mainContainer) return;

    mainContainer.innerHTML = '';

    // إنشاء حاوية المحادثة
    const chatInterface = document.createElement('div');
    chatInterface.className = 'chat-interface flex flex-col';

    // إنشاء حاوية الرسائل مع تحكم أفضل بالارتفاع
    const chatContainer = document.createElement('div');
    chatContainer.className = 'flex-1 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 border border-gray-200 dark:border-gray-700 transition-colors';
    chatContainer.id = 'chat-messages-container';

    // تفريغ حاوية المحادثة وإعادة تعيينها
    chat = document.createElement('div');
    chat.id = 'chat';
    chat.className = 'space-y-4';

    chatContainer.appendChild(chat);
    chatInterface.appendChild(chatContainer);

    // إنشاء شريط الإدخال
    const inputBar = document.createElement('div');
    inputBar.className = 'input-bar flex items-center gap-2 mb-4';

    const inputContainer = document.createElement('div');
    inputContainer.className = 'relative flex-1';

    const topicInput = document.createElement('input');
    topicInput.type = 'text';
    topicInput.id = 'topicInput';
    topicInput.className = 'block w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12 transition-colors';
    topicInput.placeholder = 'أدخل موضوعًا سياسيًا للنقاش...';
    topicInput.autocomplete = 'off';

    const sendButton = document.createElement('button');
    sendButton.id = 'sendButton';
    sendButton.className = 'absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all hover:scale-110';
    sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
    sendButton.title = 'إرسال (Alt+S)';
    sendButton.onclick = submitTopic;

    const suggestionsButton = document.createElement('button');
    suggestionsButton.className = 'absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-all hover:scale-110';
    suggestionsButton.innerHTML = '<i class="fas fa-lightbulb"></i>';
    suggestionsButton.title = 'عرض المواضيع المقترحة';
    suggestionsButton.onclick = () => toggleSuggestions();

    inputContainer.appendChild(topicInput);
    inputContainer.appendChild(sendButton);
    inputContainer.appendChild(suggestionsButton);
    inputBar.appendChild(inputContainer);
    chatInterface.appendChild(inputBar);

    // إنشاء حاوية المقترحات
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.id = 'topic-suggestions';
    suggestionsContainer.className = 'topic-suggestions hidden transition-all duration-300 mb-4 max-h-40 overflow-y-auto bg-white dark:bg-gray-700 p-2 rounded-lg shadow-md';
    chatInterface.appendChild(suggestionsContainer);

    // إنشاء حاوية الشخصيات النشطة
    const activeCharactersContainer = document.createElement('div');
    activeCharactersContainer.id = 'active-characters';
    activeCharactersContainer.className = 'flex items-center justify-center mt-2 mb-4 flex-wrap gap-2 hidden transition-all duration-300';
    chatInterface.appendChild(activeCharactersContainer);

    // إنشاء أزرار الشخصيات
    const characterButtons = document.createElement('div');
    characterButtons.className = 'character-buttons flex flex-wrap justify-center gap-2 mt-2 mb-4';

    // إضافة أزرار الشخصيات
    for (const character in avatars) {
        if (character === 'user') continue;

        const btn = document.createElement('button');
        btn.className = `response-btn ${avatars[character].color} font-semibold px-3 py-2 rounded-full shadow-sm transition-all hover:opacity-90 text-sm md:text-base flex items-center gap-1`;
        btn.dataset.character = character;
        btn.innerHTML = `${avatars[character].avatar_icon} <span class="hidden sm:inline">${characterNames[character]}</span>`;
        btn.title = characterNames[character];
        btn.addEventListener('click', () => {
            getResponse(character);
            // تأكيد بصري عند اختيار الشخصية
            document.querySelectorAll('.response-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedCharacter = character;
        });
        characterButtons.appendChild(btn);
    }

    // زر "الكل"
    const allBtn = document.createElement('button');
    allBtn.className = 'response-btn all-characters bg-purple-600 hover:bg-purple-700 text-white font-semibold px-3 py-2 rounded-full shadow-sm transition-all text-sm md:text-base flex items-center gap-1';
    allBtn.innerHTML = '<i class="fas fa-users"></i> <span class="hidden sm:inline">الكل</span>';
    allBtn.title = 'الحصول على ردود من جميع الشخصيات (Alt+A)';
    allBtn.onclick = getAllResponses;
    characterButtons.appendChild(allBtn);

    // زر المسح
    const clearBtn = document.createElement('button');
    clearBtn.className = 'bg-gray-400 hover:bg-gray-500 text-white font-semibold px-3 py-2 rounded-full shadow-sm transition-all text-sm md:text-base flex items-center gap-1';
    clearBtn.innerHTML = '<i class="fas fa-trash"></i> <span class="hidden sm:inline">مسح</span>';
    clearBtn.title = 'مسح المحادثة';
    clearBtn.onclick = clearChat;
    characterButtons.appendChild(clearBtn);

    chatInterface.appendChild(characterButtons);

    // إضافة الواجهة الجديدة إلى الحاوية الرئيسية
    mainContainer.appendChild(chatInterface);
}

function addWelcomeMessage() {
    if (!chat) return;

    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'text-center py-4 px-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg mb-4 transform transition-all duration-500 animate-fadeIn';
    welcomeMessage.innerHTML = `
        <h2 class="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">مرحبًا بك في الحوار السياسي الافتراضي!</h2>
        <p class="text-gray-600 dark:text-gray-300">أدخل موضوعك السياسي في الأسفل، أو اختر من المواضيع المقترحة، ثم اختر شخصية للتفاعل.</p>
        <div class="mt-4 flex flex-wrap justify-center gap-2">
            <button id="show-suggestions-btn" class="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors flex items-center">
                <i class="fas fa-lightbulb mr-1"></i> عرض المواضيع المقترحة
            </button>
            <button id="show-help-btn" class="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-full text-sm hover:bg-green-200 dark:hover:bg-green-700 transition-colors flex items-center">
                <i class="fas fa-question-circle mr-1"></i> دليل الاستخدام
            </button>
        </div>
    `;

    chat.appendChild(welcomeMessage);

    // إضافة مستمع لزر عرض المقترحات
    const suggestionsButton = document.getElementById('show-suggestions-btn');
    if (suggestionsButton) {
        suggestionsButton.onclick = function() {
            toggleSuggestions(true);

            // التمرير لعرض المقترحات إذا كانت مرئية
            const suggestionsDiv = document.getElementById('topic-suggestions');
            if (suggestionsDiv && !suggestionsDiv.classList.contains('hidden')) {
                suggestionsDiv.scrollIntoView({ behavior: animationsEnabled ? 'smooth' : 'auto' });
            }
        };
    }

    // إضافة مستمع لزر عرض المساعدة
    const helpButton = document.getElementById('show-help-btn');
    if (helpButton) {
        helpButton.onclick = function() {
            document.getElementById('helpButton').click();
        };
    }

    // إضافة اختصارات لوحة المفاتيح
    const keyboardShortcuts = document.createElement('div');
    keyboardShortcuts.className = 'text-xs text-center text-gray-500 dark:text-gray-400 mt-3';
    keyboardShortcuts.innerHTML = `
        <p>اختصارات لوحة المفاتيح: <span class="inline-block mx-1">Alt+S (إرسال)</span> | <span class="inline-block mx-1">Alt+A (الكل)</span> | <span class="inline-block mx-1">Alt+T (الوضع الداكن)</span></p>
    `;
    welcomeMessage.appendChild(keyboardShortcuts);
}

// --- وظائف التعامل مع الرسائل ---

function addOrUpdateMessage(character, text, messageId, isTyping = false, replyTo = null) {
    if (!chat) return;

    const avatarInfo = avatars[character] || avatars.user;
    const charName = characterNames[character] || 'غير معروف';
    const isUser = character === 'user';

    const messageDirectionClass = isUser ? 'flex-row-reverse' : 'flex-row';

    // تعيين فئة فقاعة الرسالة حسب الشخصية
    let bubbleBgClass = isUser
        ? 'bubble-user'
        : 'border border-gray-200 dark:border-gray-600';

    if (!isUser) {
        bubbleBgClass = 'border border-gray-200 dark:border-gray-600 ';
        if (character === 'analyst') bubbleBgClass += 'bubble-analyst';
        else if (character === 'creative') bubbleBgClass += 'bubble-creative';
        else if (character === 'comedian') bubbleBgClass += 'bubble-comedian';
        else if (character === 'critic') bubbleBgClass += 'bubble-critic';
        else bubbleBgClass += 'bg-white dark:bg-gray-700';
    } else {
        bubbleBgClass = 'bubble-user';
    }

    // تنسيق النص أو إظهار مؤشر الكتابة
    const formattedText = isTyping
        ? `<div class="typing-indicator"><span></span><span></span><span></span></div>`
        : formatResponse(text, character);

    // زر النسخ والتصدير للرسالة
    const actionButtons = isTyping ? '' : `
        <div class="flex gap-1 mt-1">
            <button class="action-btn copy-btn" title="نسخ النص" onclick="copyText('${messageId}')">
                <i class="fas fa-copy"></i> <span class="hidden sm:inline">نسخ</span>
            </button>
            ${!isUser ? `
            <button class="action-btn export-btn" title="تصدير الرد" onclick="exportSingleResponse('${messageId}')">
                <i class="fas fa-download"></i> <span class="hidden sm:inline">تصدير</span>
            </button>
            ` : ''}
        </div>`;

    // إنشاء محتوى الرسالة كامل
    let messageContent = `
        <div class="flex items-start gap-3 group ${messageDirectionClass} mb-5 ${replyTo ? 'thread-container' : ''} ${isTyping ? 'typing-message' : 'complete-message'}">
            ${replyTo ? '<div class="thread-indicator"></div>' : ''}
            ${!isUser ? `<div class="avatar ${avatarInfo.color} text-center flex-shrink-0" title="${characterNames[character]}">${avatarInfo.avatar_icon}</div>` : ''}
            <div class="message-bubble ${isTyping ? 'pulse-animation' : ''} p-3 rounded-xl shadow-sm ${bubbleBgClass} max-w-[80%] relative">
                <div class="font-bold text-sm text-gray-700 dark:text-gray-300 mb-1 flex justify-between items-center">
                    <span>${charName}</span>
                    <span class="text-xs text-gray-500">${getTimeString()}</span>
                </div>
                ${replyTo ? `<div class="reply-to text-xs text-gray-500 dark:text-gray-400 mb-2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">ردًا على: ${replyTo}</div>` : ''}
                <div class="message-content">${formattedText}</div>
                ${actionButtons}
            </div>
            ${isUser ? `<div class="avatar ${avatarInfo.color} text-center flex-shrink-0" title="${characterNames[character]}">${avatarInfo.avatar_icon}</div>` : ''}
        </div>
    `;

    // تحديث أو إضافة الرسالة
    const messageElement = document.getElementById(messageId);
    if (messageElement) {
        messageElement.innerHTML = messageContent;
    } else {
        // إضافة فاصل بين الرسائل
        if (chat.children.length > 1) {
            const separator = document.createElement('div');
            separator.className = 'message-separator';
            chat.appendChild(separator);
        }

        const wrapper = document.createElement('div');
        wrapper.id = messageId;
        wrapper.className = 'message-wrapper';
        wrapper.dataset.character = character;
        wrapper.dataset.timestamp = Date.now();

        if (!isTyping) {
            wrapper.dataset.text = text;
        }

        wrapper.innerHTML = messageContent;
        chat.appendChild(wrapper);

        // تأثيرات الظهور التدريجي
        if (animationsEnabled) {
            wrapper.style.opacity = '0';
            wrapper.style.transform = 'translateY(10px)';

            setTimeout(() => {
                wrapper.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                wrapper.style.opacity = '1';
                wrapper.style.transform = 'translateY(0)';
            }, 10);
        }

        // إضافة إلى سجل المحادثة للتصدير
        if (!isTyping) {
            responseHistory.push({
                id: messageId,
                character: character,
                characterName: charName,
                text: text,
                formattedText: formattedText,
                timestamp: new Date().toISOString(),
                topic: currentTopic
            });
        }
    }

    scrollToBottom();
}

function formatResponse(text, character) {
    if (!text) return 'لا يوجد محتوى';

    // تتبع ما إذا كان النص يحتوي على محتوى غير مناسب
    const hasInappropriateContent = checkForInappropriateContent(text);
    if (hasInappropriateContent) {
        return `<div class="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 p-3 rounded-lg text-right">
            <i class="fas fa-exclamation-triangle mr-1"></i> تم حجب هذا المحتوى لاحتوائه على عبارات غير مناسبة.
        </div>`;
    }

    // تحويل النص إلى HTML باستخدام Markdown
    const converter = new showdown.Converter({
        tables: true,
        simpleLineBreaks: true,
        strikethrough: true,
        tasklists: true,
        emoji: true
    });
    let formattedText = converter.makeHtml(text);

    // تحسين العرض حسب نوع الشخصية
    let textWrapper = 'text-right text-black dark:text-white';

    if (character === 'analyst') {
        // تحسين عرض الجداول والمخططات للمحلل
        textWrapper += ' analyst-content';
    } else if (character === 'creative') {
        // تنسيق ملهم للأفكار الإبداعية
        textWrapper += ' creative-content';
    } else if (character === 'comedian') {
        // تنسيق مرح للتعليقات الساخرة
        textWrapper += ' comedian-content font-bold';
    } else if (character === 'critic') {
        // تنسيق صارم للتعليقات النقدية
        textWrapper += ' critic-content';
    }

    formattedText = `<div class="${textWrapper}">${formattedText}</div>`;

    return formattedText;
}

function checkForInappropriateContent(text) {
    // تحقق من وجود كلمات محظورة
    for (const word of inappropriateWords) {
        if (text.toLowerCase().includes(word.toLowerCase())) {
            return true;
        }
    }
    return false;
}

function getTimeString() {
    const now = new Date();
    return now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom() {
    const chatMessagesContainer = document.getElementById('chat-messages-container');
    if (chatMessagesContainer) {
        // التحقق مما إذا كان المستخدم قريب من أسفل المحتوى
        const isNearBottom = chatMessagesContainer.scrollHeight - chatMessagesContainer.scrollTop - chatMessagesContainer.clientHeight < 100;

        if (isNearBottom) {
            if (animationsEnabled) {
                chatMessagesContainer.scrollTo({
                    top: chatMessagesContainer.scrollHeight,
                    behavior: 'smooth'
                });
            } else {
                chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
            }
        }
    } else if (chat) {
        if (animationsEnabled) {
            chat.scrollTo({
                top: chat.scrollHeight,
                behavior: 'smooth'
            });
        } else {
            chat.scrollTop = chat.scrollHeight;
        }
    }
}

function copyText(messageId) {
    const messageElement = document.getElementById(messageId);
    if (!messageElement) return;

    const contentElement = messageElement.querySelector('.message-content');
    if (!contentElement) return;

    const textToCopy = contentElement.textContent.trim();

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            showToast('تم نسخ النص بنجاح!');
        })
        .catch(err => {
            console.error("فشل في نسخ النص:", err);
            showToast('فشل في نسخ النص، الرجاء المحاولة مرة أخرى.', 'error');
        });
}

function showToast(message, type = 'success', duration = 3000) {
    // إزالة التنبيه السابق إذا وجد
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast-notification fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 opacity-0 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    toast.innerHTML = `<div class="flex items-center gap-2">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    </div>`;
    document.body.appendChild(toast);

    // تأثير ظهور
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(-10px)';
    }, 10);

    // إخفاء تدريجي
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(0)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// --- وظائف التفاعل مع واجهة Gemini API ---

function submitTopic() {
    const topicInput = document.getElementById('topicInput');
    if (!topicInput) return;

    const topic = topicInput.value.trim();

    if (!topic) {
        // تحريك حقل الإدخال قليلاً لإعطاء تنبيه بصري
        if (animationsEnabled) {
            topicInput.classList.add('shake-animation');
            setTimeout(() => {
                topicInput.classList.remove('shake-animation');
            }, 500);
        }

        showToast('الرجاء إدخال موضوع سياسي!', 'error');
        topicInput.focus();
        return;
    }

    // التحقق من الحد الأدنى للطول
    if (topic.length < 3) {
        showToast('الرجاء إدخال موضوع أكثر تفصيلاً.', 'error');
        return;
    }

    // فحص المحتوى غير المناسب
    if (checkForInappropriateContent(topic)) {
        showToast('يرجى تجنب استخدام كلمات غير مناسبة في موضوعك.', 'error');
        return;
    }

    const userMessageId = `msg-user-${Date.now()}`;
    addOrUpdateMessage('user', topic, userMessageId);

    currentTopic = topic;
    topicInput.value = '';

    // إخفاء المقترحات
    toggleSuggestions(false);

    // إظهار تلميح لاختيار شخصية
    showCharacterPrompt();

    // تحديث عنوان التصدير
    const exportButton = document.getElementById('exportButton');
    if (exportButton) {
        exportButton.title = `تصدير محادثة: ${currentTopic}`;
    }

    // التركيز على شريط الإدخال مرة أخرى
    topicInput.focus();
}

function showCharacterPrompt() {
    const promptMessage = document.createElement('div');
    promptMessage.className = 'text-center text-sm text-gray-500 dark:text-gray-400 my-2 animate-pulse';
    promptMessage.innerHTML = `
        <div class="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full">
            <i class="fas fa-hand-point-down ml-1"></i>
            اختر شخصية للرد على موضوعك...
        </div>
    `;
    chat.appendChild(promptMessage);

    // ظهور تدريجي للتلميح
    if (animationsEnabled) {
        promptMessage.style.opacity = '0';
        setTimeout(() => {
            promptMessage.style.transition = 'opacity 0.5s ease';
            promptMessage.style.opacity = '1';
        }, 10);
    }

    // إزالة التلميح بعد 4 ثوان
    setTimeout(() => {
        if (chat.contains(promptMessage)) {
            if (animationsEnabled) {
                promptMessage.style.opacity = '0';
                setTimeout(() => {
                    if (chat.contains(promptMessage)) {
                        chat.removeChild(promptMessage);
                    }
                }, 300);
            } else {
                chat.removeChild(promptMessage);
            }
        }
    }, 4000);

    scrollToBottom();
}

async function getResponse(character, shouldRespond = true) {
    if (!currentTopic) {
        showToast('لا يوجد موضوع للرد عليه!', 'error');
        return;
    }

    const messageId = `msg-${Date.now()}-${character}`;

    // تحديث مؤشر الشخصيات النشطة
    updateActiveCharacter(character, true);

    if (shouldRespond) {
        // إظهار مؤشر الكتابة
        addOrUpdateMessage(character, 'جاري التفكير...', messageId, true);

        // تعيين مؤقت لتحديث نص "جاري التفكير..." كل 5 ثوانٍ لتحسين تجربة المستخدم
        let thinkingDots = '';
        typingTimeout = setInterval(() => {
            thinkingDots = thinkingDots.length < 3 ? thinkingDots + '.' : '';
            const typingIndicator = document.querySelector(`#${messageId} .typing-indicator`);
            if (typingIndicator) {
                typingIndicator.innerHTML = `<div class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg inline-block">جاري التفكير${thinkingDots}</div>`;
            }
        }, 500);

        pendingResponses++;
        updateLoadingStatus();
    }

    // تحديث شريط التقدم
    updateProgressBar(10);

    try {
        // تأخير تدريجي لتجنب تحميل الخادم
        const throttleDelay = pendingResponses > 1 ? 1000 * pendingResponses : 0;
        await new Promise(resolve => setTimeout(resolve, throttleDelay));

        // تحديث شريط التقدم
        updateProgressBar(30);

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKeys[character]}`,
            {
                contents: [{ role: "user", parts: [{ text: currentTopic }] }],
                systemInstruction: { parts: [{ text: prompts[character] }] },
                generationConfig: {
                    maxOutputTokens: 2048,
                    temperature: 0.7,
                    topP: 0.95,
                    topK: 40
                }
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 30000 // زيادة المهلة لتحسين الاعتمادية
            }
        );

        // تحديث شريط التقدم
        updateProgressBar(70);

        if (!response.data || !response.data.candidates || !Array.isArray(response.data.candidates) || response.data.candidates.length === 0) {
            throw new Error("رد غير صالح من واجهة Gemini API");
        }

        const candidate = response.data.candidates[0];
        if (!candidate.content || !candidate.content.parts || !Array.isArray(candidate.content.parts) || candidate.content.parts.length === 0) {
            throw new Error("محتوى الرد غير صالح من واجهة Gemini API");
        }

        let text = candidate.content.parts[0]?.text?.trim() || 'لا رد متاح';

        // تحديث شريط التقدم
        updateProgressBar(90);

        // مسح مؤقت مؤشر الكتابة
        clearInterval(typingTimeout);

        if (shouldRespond) {
            // تحديد ما إذا كان هذا الرد يجب أن يكون جزءًا من خيط
            const replyTo = getReplyToInfo();
            addOrUpdateMessage(character, text, messageId, false, replyTo);
        }

        // تحديث شريط التقدم
        updateProgressBar(100);

        // تحديث مؤشر الشخصيات النشطة
        updateActiveCharacter(character, false);

        return text;

    } catch (error) {
        console.error(`خطأ في الحصول على رد من ${character}:`, error);

        // مسح مؤقت مؤشر الكتابة
        clearInterval(typingTimeout);

        let errorMsg = 'حدث خطأ في الحصول على الرد.';
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log(error.response.data);
                errorMsg = `خطأ API (${error.response.status}): ${getHumanReadableError(error)}`;
            } else if (error.request) {
                errorMsg = 'تعذر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.';
            }
        }

        if (shouldRespond) {
            addOrUpdateMessage(character, errorMsg, messageId);
        }

        // تحديث شريط التقدم
        updateProgressBar(100);

        // تحديث مؤشر الشخصيات النشطة
        updateActiveCharacter(character, false);

        return errorMsg;

    } finally {
        if (shouldRespond) {
            pendingResponses--;
            updateLoadingStatus();
        }
    }
}

function getHumanReadableError(error) {
    if (!error.response || !error.response.data) return 'خطأ غير معروف';

    const errorData = error.response.data;

    if (errorData.error && errorData.error.message) {
        const errorMessage = errorData.error.message.toLowerCase();

        if (errorMessage.includes('quota')) {
            return 'تم تجاوز الحد الأقصى لعدد الطلبات. يرجى المحاولة لاحقًا.';
        } else if (errorMessage.includes('invalid')) {
            return 'مفتاح API غير صالح أو منتهي الصلاحية.';
        } else if (errorMessage.includes('permission')) {
            return 'ليس لديك إذن للوصول إلى هذه الخدمة.';
        } else if (errorMessage.includes('content')) {
            return 'تم رفض المحتوى بواسطة سياسات الأمان.';
        }

        return errorData.error.message;
    }

    return 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
}

function getReplyToInfo() {
    // إذا كان هناك رسائل سابقة، اجعل الرد على آخر رسالة من المستخدم
    const messageElements = document.querySelectorAll('.message-wrapper');
    let lastUserMessage = null;

    for (let i = messageElements.length - 1; i >= 0; i--) {
        const character = messageElements[i].dataset.character;
        if (character === 'user') {
            const messageContent = messageElements[i].querySelector('.message-content');
            if (messageContent) {
                lastUserMessage = messageContent.textContent.trim();
                if (lastUserMessage.length > 30) {
                    lastUserMessage = lastUserMessage.substring(0, 30) + '...';
                }
            }
            break;
        }
    }

    return lastUserMessage;
}

function updateLoadingStatus() {
    const statusElement = document.getElementById('loading-status');

    if (pendingResponses > 0) {
        if (!statusElement) {
            const status = document.createElement('div');
            status.id = 'loading-status';
            status.className = 'fixed top-16 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm shadow-lg z-50 flex items-center gap-2 transition-opacity';
            status.innerHTML = `
                <div class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>جاري التحميل (${pendingResponses} ${pendingResponses === 1 ? 'شخصية' : 'شخصيات'} متبقية)</span>
            `;
            document.body.appendChild(status);

            // ظهور تدريجي
            if (animationsEnabled) {
                status.style.opacity = '0';
                setTimeout(() => {
                    status.style.transition = 'opacity 0.3s ease';
                    status.style.opacity = '1';
                }, 10);
            }
        } else {
            statusElement.querySelector('span').textContent = `جاري التحميل (${pendingResponses} ${pendingResponses === 1 ? 'شخصية' : 'شخصيات'} متبقية)`;
        }
    } else {
        if (statusElement) {
            if (animationsEnabled) {
                statusElement.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(statusElement)) {
                        document.body.removeChild(statusElement);
                    }
                }, 300);
            } else {
                statusElement.remove();
            }
        }
    }
}

function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;

    progressBar.style.width = `${percentage}%`;

    if (percentage >= 100) {
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 500);
    }
}

function updateActiveCharacter(character, isActive) {
    if (character) {
        activeCharacters[character] = isActive;
    }

    // تحديث الواجهة
    const activeCharactersDiv = document.getElementById('active-characters');
    if (!activeCharactersDiv) return;

    // تحقق مما إذا كانت هناك أي شخصيات نشطة
    const anyActive = Object.values(activeCharacters).some(active => active);

    if (anyActive) {
        activeCharactersDiv.innerHTML = '<div class="text-sm text-gray-500 dark:text-gray-400 ml-2">الشخصيات النشطة:</div>';

        for (const char in activeCharacters) {
            if (activeCharacters[char]) {
                const charBadge = document.createElement('div');
                charBadge.className = `inline-flex items-center gap-1 px-2 py-1 rounded-full ${avatars[char].color} text-xs`;
                charBadge.innerHTML = `
                    <div class="character-loading">
                        <div class="character-loading-indicator"></div>
                    </div>
                    ${characterNames[char]}
                `;
                activeCharactersDiv.appendChild(charBadge);
            }
        }

        // عرض القسم مع تأثير ظهور تدريجي
        if (activeCharactersDiv.classList.contains('hidden')) {
            activeCharactersDiv.classList.remove('hidden');
            if (animationsEnabled) {
                activeCharactersDiv.style.opacity = '0';
                setTimeout(() => {
                    activeCharactersDiv.style.transition = 'opacity 0.3s ease';
                    activeCharactersDiv.style.opacity = '1';
                }, 10);
            }
        }
    } else {
        // إخفاء القسم مع تأثير اختفاء تدريجي
        if (!activeCharactersDiv.classList.contains('hidden')) {
            if (animationsEnabled) {
                activeCharactersDiv.style.opacity = '0';
                setTimeout(() => {
                    activeCharactersDiv.classList.add('hidden');
                }, 300);
            } else {
                activeCharactersDiv.classList.add('hidden');
            }
        }
    }
}

async function getAllResponses() {
    if (!currentTopic) {
        showToast('لا يوجد موضوع للحصول على ردود له!', 'error');
        return;
    }

    const characters = ['analyst', 'creative', 'comedian', 'critic'];

    // تحديث زر "الكل" لإظهار التحديد
    document.querySelectorAll('.response-btn').forEach(b => b.classList.remove('selected'));
    const allButton = document.querySelector('.all-characters');
    if (allButton) {
        allButton.classList.add('selected');

        // إضافة تأثير "نبض" للزر
        if (animationsEnabled) {
            allButton.classList.add('pulse-once');
            setTimeout(() => {
                allButton.classList.remove('pulse-once');
            }, 1000);
        }
    }

    // إظهار رسالة تنبيه للمستخدم
    showToast('جاري الحصول على ردود من جميع الشخصيات...');

    // تعطيل أزرار الشخصيات مؤقتًا
    document.querySelectorAll('.response-btn').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('opacity-50');
    });

    try {
        // تنفيذ الطلبات بالتوازي مع إدارة أفضل للأخطاء
        const promises = characters.map(character => getResponse(character, true));
        await Promise.allSettled(promises);

        showToast('تم الحصول على جميع الردود!');
    } catch (error) {
        console.error("خطأ في getAllResponses:", error);
        showToast('حدث خطأ أثناء الحصول على بعض الردود.', 'error');
    } finally {
        // إعادة تفعيل الأزرار
        document.querySelectorAll('.response-btn').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('opacity-50');
        });
    }
}

function clearChat() {
    const confirmClear = showConfirmDialog(
        'تأكيد المسح',
        'هل تريد مسح المحادثة بالكامل؟',
        () => {
            // تنفيذ عملية المسح
            chat.innerHTML = '';
            currentTopic = '';
            responseHistory = [];
            document.querySelectorAll('.response-btn').forEach(b => b.classList.remove('selected'));
            selectedCharacter = null;

            // إعادة تعيين مؤشر الشخصيات النشطة
            for (const char in activeCharacters) {
                activeCharacters[char] = false;
            }
            updateActiveCharacter(null, false);

            // إضافة رسالة الترحيب مرة أخرى
            addWelcomeMessage();

            showToast('تم مسح المحادثة بنجاح!');
        }
    );
}

function showConfirmDialog(title, message, onConfirm, onCancel) {
    // إزالة أي مربع حوار سابق
    const existingDialog = document.getElementById('confirm-dialog');
    if (existingDialog) {
        document.body.removeChild(existingDialog);
    }

    // إنشاء مربع الحوار
    const dialog = document.createElement('div');
    dialog.id = 'confirm-dialog';
    dialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    dialog.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-md w-full mx-4 transform transition-all duration-300 scale-95">
            <div class="flex justify-between items-center mb-4 border-b pb-2">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">${title}</h3>
                <button id="close-dialog" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="py-2">
                <p class="text-gray-700 dark:text-gray-300">${message}</p>
            </div>
            <div class="flex justify-end gap-2 mt-4">
                <button id="cancel-button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors">
                    إلغاء
                </button>
                <button id="confirm-button" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
                    تأكيد
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(dialog);

    // ظهور تدريجي
    setTimeout(() => {
        dialog.querySelector('div > div').classList.remove('scale-95');
        dialog.querySelector('div > div').classList.add('scale-100');
    }, 10);

    // إضافة المستمعات
    dialog.querySelector('#close-dialog').onclick = () => {
        closeDialog();
        if (onCancel) onCancel();
    };

    dialog.querySelector('#cancel-button').onclick = () => {
        closeDialog();
        if (onCancel) onCancel();
    };

    dialog.querySelector('#confirm-button').onclick = () => {
        closeDialog();
        if (onConfirm) onConfirm();
    };

    // إغلاق باستخدام Escape
    const escListener = (e) => {
        if (e.key === 'Escape') {
            closeDialog();
            if (onCancel) onCancel();
            document.removeEventListener('keydown', escListener);
        }
    };

    document.addEventListener('keydown', escListener);

    // وظيفة إغلاق مربع الحوار
    function closeDialog() {
        dialog.querySelector('div > div').classList.remove('scale-100');
        dialog.querySelector('div > div').classList.add('scale-95');
        dialog.style.opacity = '0';

        setTimeout(() => {
            if (document.body.contains(dialog)) {
                document.body.removeChild(dialog);
            }
            document.removeEventListener('keydown', escListener);
        }, 300);
    }
}

// --- وظائف التصدير ---

function exportConversation() {
    if (responseHistory.length === 0) {
        showToast('لا توجد محادثة للتصدير!', 'error');
        return;
    }

    // إظهار مؤشر التحميل
    showToast('جاري إعداد ملف التصدير...');

    setTimeout(() => {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'p-4 bg-white';

        // إضافة ترويسة للصفحة مع تصميم محسن
        contentDiv.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px; direction: rtl; border-bottom: 2px solid #4299e1; padding-bottom: 15px;">
                <h1 style="font-size: 24px; font-weight: bold; color: #2b6cb0;">حوار سياسي: ${currentTopic}</h1>
                <p style="color: #4a5568;">تم التصدير في ${new Date().toLocaleString('ar-EG')}</p>
            </div>
        `;

        // إضافة ملخص للمحادثة
        const summaryDiv = document.createElement('div');
        summaryDiv.style.direction = 'rtl';
        summaryDiv.style.marginBottom = '20px';
        summaryDiv.style.padding = '10px';
        summaryDiv.style.backgroundColor = '#f7fafc';
        summaryDiv.style.borderRadius = '8px';

        const characterCounts = {};
        for (const item of responseHistory) {
            if (item.character !== 'user') {
                characterCounts[item.character] = (characterCounts[item.character] || 0) + 1;
            }
        }

        let summaryContent = '<h2 style="font-size: 18px; margin-bottom: 10px; color: #4a5568;">ملخص المحادثة:</h2><ul style="list-style-type: none; padding: 0;">';
        summaryContent += `<li style="margin-bottom: 5px;">الموضوع: <strong>${currentTopic}</strong></li>`;
        summaryContent += `<li style="margin-bottom: 5px;">عدد الرسائل: <strong>${responseHistory.length}</strong></li>`;

        for (const character in characterCounts) {
            const characterName = characterNames[character] || character;
            summaryContent += `<li style="margin-bottom: 5px;">${characterName}: <strong>${characterCounts[character]}</strong> ردود</li>`;
        }

        summaryContent += '</ul>';
        summaryDiv.innerHTML = summaryContent;

        contentDiv.appendChild(summaryDiv);

        // إضافة المحادثة مع تصميم محسن
        const conversationDiv = document.createElement('div');
        conversationDiv.style.direction = 'rtl';

        responseHistory.forEach((item, index) => {
            const messageDiv = document.createElement('div');
            messageDiv.style.margin = '15px 0';
            messageDiv.style.padding = '12px';
            messageDiv.style.borderRadius = '12px';
            messageDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

            // تعيين لون خلفية محسن بناءً على الشخصية
            if (item.character === 'user') {
                messageDiv.style.backgroundColor = '#e6f7ff';
                messageDiv.style.borderRight = '4px solid #4fc3f7';
            } else if (item.character === 'analyst') {
                messageDiv.style.backgroundColor = '#e8f5e9';
                messageDiv.style.borderRight = '4px solid #66bb6a';
            } else if (item.character === 'creative') {
                messageDiv.style.backgroundColor = '#f3e5f5';
                messageDiv.style.borderRight = '4px solid #ab47bc';
            } else if (item.character === 'comedian') {
                messageDiv.style.backgroundColor = '#fff8e1';
                messageDiv.style.borderRight = '4px solid #ffd54f';
            } else if (item.character === 'critic') {
                messageDiv.style.backgroundColor = '#ffebee';
                messageDiv.style.borderRight = '4px solid #ef5350';
            }

            // إضافة رقم الرسالة
            const indexBadge = document.createElement('div');
            indexBadge.style.position = 'absolute';
            indexBadge.style.top = '-10px';
            indexBadge.style.right = '-10px';
            indexBadge.style.backgroundColor = '#718096';
            indexBadge.style.color = 'white';
            indexBadge.style.width = '24px';
            indexBadge.style.height = '24px';
            indexBadge.style.borderRadius = '50%';
            indexBadge.style.display = 'flex';
            indexBadge.style.alignItems = 'center';
            indexBadge.style.justifyContent = 'center';
            indexBadge.style.fontSize = '12px';
            indexBadge.style.fontWeight = 'bold';
            indexBadge.textContent = (index + 1).toString();

            messageDiv.style.position = 'relative';
            messageDiv.appendChild(indexBadge);

            // إضافة اسم الشخصية والتاريخ
            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.marginBottom = '8px';
            header.style.borderBottom = '1px solid #edf2f7';
            header.style.paddingBottom = '8px';

            const nameSpan = document.createElement('span');
            nameSpan.style.fontWeight = 'bold';
            nameSpan.style.color = '#4a5568';
            nameSpan.textContent = item.characterName;

            const dateSpan = document.createElement('span');
            dateSpan.style.fontSize = '12px';
            dateSpan.style.color = '#718096';
            dateSpan.textContent = new Date(item.timestamp).toLocaleString('ar-EG');

            header.appendChild(nameSpan);
            header.appendChild(dateSpan);
            messageDiv.appendChild(header);

            // إضافة المحتوى
            const content = document.createElement('div');
            content.style.textAlign = 'right';
            content.style.color = '#2d3748';
            content.style.lineHeight = '1.5';
            content.style.fontSize = '14px';
            content.textContent = item.text;
            messageDiv.appendChild(content);

            conversationDiv.appendChild(messageDiv);
        });

        contentDiv.appendChild(conversationDiv);

        // إضافة الفوتر مع تصميم محسن
        contentDiv.innerHTML += `
            <div style="text-align: center; margin-top: 30px; border-top: 2px solid #e2e8f0; padding-top: 15px;">
                <p style="color: #718096; font-size: 12px;">حوار سياسي - مشروع طوره الياس خضر خلف شرار - كلية العلوم السياسية - جامعة تكريت</p>
                <p style="color: #a0aec0; font-size: 10px;">تم إنشاء هذا الملف تلقائيًا في ${new Date().toISOString()}</p>
            </div>
        `;

        // تصدير إلى PDF
        const element = document.createElement('div');
        element.appendChild(contentDiv);
        document.body.appendChild(element);

        const options = {
            margin: 15,
            filename: `حوار-سياسي-${Date.now()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf()
            .from(element)
            .set(options)
            .save()
            .then(() => {
                document.body.removeChild(element);
                showToast('تم تصدير المحادثة بنجاح!');
            })
            .catch(err => {
                console.error("خطأ في تصدير المحادثة:", err);
                document.body.removeChild(element);
                showToast('حدث خطأ أثناء تصدير المحادثة.', 'error');
            });
    }, 500);
}

function exportSingleResponse(messageId) {
    const messageElement = document.getElementById(messageId);
    if (!messageElement) {
        showToast('لم يتم العثور على الرسالة!', 'error');
        return;
    }

    // إظهار مؤشر التحميل
    showToast('جاري تصدير الرد...');

    setTimeout(() => {
        const character = messageElement.dataset.character;
        const text = messageElement.dataset.text || messageElement.querySelector('.message-content').textContent.trim();
        const charName = characterNames[character] || 'غير معروف';

        // إنشاء محتوى التصدير
        const contentDiv = document.createElement('div');
        contentDiv.className = 'p-4 bg-white';
        contentDiv.style.direction = 'rtl';

        // إضافة عنوان
        contentDiv.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #4299e1; padding-bottom: 15px;">
                <h1 style="font-size: 24px; font-weight: bold; color: #2b6cb0;">رد ${charName} على: ${currentTopic}</h1>
                <p style="color: #4a5568;">تم التصدير في ${new Date().toLocaleString('ar-EG')}</p>
            </div>
        `;

        // إضافة المحتوى
        const messageDiv = document.createElement('div');
        messageDiv.style.margin = '20px 0';
        messageDiv.style.padding = '15px';
        messageDiv.style.borderRadius = '12px';
        messageDiv.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';

        // تعيين لون خلفية بناءً على الشخصية
        if (character === 'analyst') {
            messageDiv.style.backgroundColor = '#e8f5e9';
            messageDiv.style.borderRight = '4px solid #66bb6a';
        } else if (character === 'creative') {
            messageDiv.style.backgroundColor = '#f3e5f5';
            messageDiv.style.borderRight = '4px solid #ab47bc';
        } else if (character === 'comedian') {
            messageDiv.style.backgroundColor = '#fff8e1';
            messageDiv.style.borderRight = '4px solid #ffd54f';
        } else if (character === 'critic') {
            messageDiv.style.backgroundColor = '#ffebee';
            messageDiv.style.borderRight = '4px solid #ef5350';
        }

        // إضافة اسم الشخصية
        const header = document.createElement('div');
        header.style.fontWeight = 'bold';
        header.style.marginBottom = '10px';
        header.style.borderBottom = '1px solid #edf2f7';
        header.style.paddingBottom = '8px';
        header.style.color = '#4a5568';
        header.style.fontSize = '16px';
        header.textContent = charName;
        messageDiv.appendChild(header);

        // إضافة المحتوى
        const content = document.createElement('div');
        content.style.textAlign = 'right';
        content.style.lineHeight = '1.6';
        content.style.fontSize = '14px';
        content.style.color = '#2d3748';
        content.textContent = text;
        messageDiv.appendChild(content);

        contentDiv.appendChild(messageDiv);

        // إضافة الفوتر
        contentDiv.innerHTML += `
            <div style="text-align: center; margin-top: 30px; border-top: 2px solid #e2e8f0; padding-top: 15px;">
                <p style="color: #718096; font-size: 12px;">حوار سياسي - مشروع طوره الياس خضر خلف شرار - كلية العلوم السياسية - جامعة تكريت</p>
                <p style="color: #a0aec0; font-size: 10px;">تاريخ التصدير: ${new Date().toLocaleString('ar-EG')}</p>
            </div>
        `;

        // تصدير إلى PDF
        const element = document.createElement('div');
        element.appendChild(contentDiv);
        document.body.appendChild(element);

        const options = {
            margin: 15,
            filename: `رد-${charName}-${Date.now()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf()
            .from(element)
            .set(options)
            .save()
            .then(() => {
                document.body.removeChild(element);
                showToast('تم تصدير الرد بنجاح!');
            })
            .catch(err => {
                console.error("خطأ في تصدير الرد:", err);
                document.body.removeChild(element);
                showToast('حدث خطأ أثناء تصدير الرد.', 'error');
            });
    }, 500);
}
