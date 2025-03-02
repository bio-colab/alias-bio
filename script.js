// script.js - الإصدار المحدث مع تحسينات UI/UX والميزات المطلوبة

const apiKeys = {
    analyst: 'AIzaSyCWV12p8IPEEsu9dN-7yFOSOFhV06tWI7s',
    creative: 'AIzaSyCWV12p8IPEEsu9dN-7yFOSOFhV06tWI7s',
    comedian: 'AIzaSyCWV12p8IPEEsu9dN-7yFOSOFhV06tWI7s',
    critic: 'AIzaSyCWV12p8IPEEsu9dN-7yFOSOFhV06tWI7s'
};

// قاعدة النص الاساسية للـ prompt
const basePrompt = 'أنت نموذج مخصص للتفاعل مع طلبة كلية العلوم السياسية بجامعة تكريت، جزء من مشروع قام بتطويره الطالب الياس خضر خلف شرار - المرحلة الأولى. عند سؤالك "من أنت" أو "من طورك"، أجب بأنك [اسم الشخصية]، نموذج مخصص لـ [وصف الشخصية]، وأنك جزء من مشروع طوره الياس خضر خلف شرار. لا تنحرف عن هذه الإجابة. قم بتنسيق ردودك باستخدام Markdown (مثل **نص غامق** و- للقوائم) عندما يكون ذلك مناسبًا.';

// توصيفات الشخصيات - يمكن تعديلها من خلال واجهة التخصيص
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
const chat = document.getElementById('chat');
let pendingResponses = 0;
let currentTopic = '';
let selectedCharacter = null;
let responseHistory = []; // لتخزين سجل المحادثة للتصدير
let characterPromptSettings = {}; // لتخزين إعدادات تخصيص الشخصيات
let activeCharacters = {}; // لتتبع حالة الشخصيات النشطة

// --- وظائف تهيئة التطبيق ---

function initApp() {
    if (!document.getElementById('chat') || !document.querySelector('main')) {
        console.error("عناصر DOM الأساسية غير موجودة!");
        return;
    }
    
    loadCustomSettings(); // تحميل إعدادات التخصيص
    convertToChatInterface();
    addWelcomeMessage();
    setupTopicInput();
    setupTopicSuggestions();
    setupModals();
    setupExportFeature();
    setupHelpPanel();
}

function setupTopicInput() {
    const topicInput = document.getElementById('topic');
    
    topicInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitTopic();
        }
    });
    
    topicInput.addEventListener('input', function() {
        showTopicSuggestions(this.value);
    });
    
    // إضافة زر عرض المقترحات
    const inputContainer = topicInput.parentElement;
    const suggestionsButton = document.createElement('button');
    suggestionsButton.className = 'absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300';
    suggestionsButton.innerHTML = '<i class="fas fa-lightbulb"></i>';
    suggestionsButton.title = 'عرض المواضيع المقترحة';
    suggestionsButton.onclick = toggleSuggestions;
    inputContainer.appendChild(suggestionsButton);
}

function setupTopicSuggestions() {
    const topicSuggestionsDiv = document.getElementById('topic-suggestions');
    
    // تفريغ الحاوية
    topicSuggestionsDiv.innerHTML = '';
    
    // إضافة المواضيع المقترحة
    for (const topic of suggestedTopics) {
        const button = document.createElement('button');
        button.className = 'topic-suggestion';
        button.textContent = topic;
        button.addEventListener('click', function() {
            document.getElementById('topic').value = topic;
            toggleSuggestions(false);
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
        
        suggestionsDiv.classList.remove('hidden');
    }
}

function showTopicSuggestions(searchText) {
    const suggestionsDiv = document.getElementById('topic-suggestions');
    
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
                document.getElementById('topic').value = topic;
                toggleSuggestions(false);
            });
            suggestionsDiv.appendChild(button);
        });
        suggestionsDiv.classList.remove('hidden');
    } else {
        toggleSuggestions(false);
    }
}

// تم إزالة وظائف الوضع الليلي

function setupModals() {
    // إعداد مودال تخصيص الشخصيات
    const customizeModal = document.getElementById('customize-modal');
    const customizeButton = document.getElementById('customizeButton');
    const closeCustomizeButton = document.getElementById('close-customize-modal');
    const saveSettingsButton = document.getElementById('save-character-settings');
    
    if(!customizeButton || !customizeModal || !closeCustomizeButton || !saveSettingsButton) {
        console.error("عناصر المودال غير موجودة!");
        return;
    }
    
    // إضافة مستمع الحدث لزر التخصيص
    customizeButton.onclick = function() {
        populateCharacterSettings();
        customizeModal.classList.add('active');
    };
    
    closeCustomizeButton.onclick = function() {
        customizeModal.classList.remove('active');
    };
    
    saveSettingsButton.onclick = function() {
        saveCharacterSettings();
        customizeModal.classList.remove('active');
    };
    
    // إغلاق المودال عند النقر خارجه
    window.onclick = function(event) {
        if (event.target == customizeModal) {
            customizeModal.classList.remove('active');
        }
    };
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
}

function setupExportFeature() {
    const exportButton = document.getElementById('exportButton');
    
    exportButton.addEventListener('click', function() {
        exportConversation();
    });
}

function populateCharacterSettings() {
    const characterSettingsDiv = document.getElementById('character-settings');
    characterSettingsDiv.innerHTML = '';
    
    // لكل شخصية، أضف إعدادات التخصيص
    for (const character in characterNames) {
        if (character === 'user') continue;
        
        const characterDiv = document.createElement('div');
        characterDiv.className = 'mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg';
        
        const header = document.createElement('div');
        header.className = 'flex items-center mb-4';
        header.innerHTML = `
            <div class="avatar ${avatars[character].color} text-center mr-3">
                ${avatars[character].avatar_icon}
            </div>
            <h4 class="font-bold text-lg">${characterNames[character]}</h4>
        `;
        
        const form = document.createElement('div');
        
        // إضافة خيار تعديل الوصف
        const descriptionField = document.createElement('div');
        descriptionField.className = 'mb-3';
        
        const descLabel = document.createElement('label');
        descLabel.className = 'block text-sm font-medium mb-1';
        descLabel.setAttribute('for', `${character}-description`);
        descLabel.textContent = 'وصف الشخصية:';
        
        const descTextarea = document.createElement('textarea');
        descTextarea.className = 'w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white';
        descTextarea.id = `${character}-description`;
        descTextarea.rows = 4;
        
        // استرجاع القيمة المحفوظة أو استخدام الافتراضية
        const savedDesc = characterPromptSettings[character] ? 
            characterPromptSettings[character] : 
            prompts[character].replace(basePrompt, '').trim();
        
        descTextarea.value = savedDesc;
        
        descriptionField.appendChild(descLabel);
        descriptionField.appendChild(descTextarea);
        
        form.appendChild(descriptionField);
        characterDiv.appendChild(header);
        characterDiv.appendChild(form);
        characterSettingsDiv.appendChild(characterDiv);
    }
    
    // إضافة قسم لإضافة شخصية جديدة (وظيفة مستقبلية)
    const addNewSection = document.createElement('div');
    addNewSection.className = 'mt-6 p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center';
    addNewSection.innerHTML = `
        <button id="add-new-character" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 w-full py-2">
            <i class="fas fa-plus-circle mr-2"></i> إضافة شخصية جديدة (قريبًا)
        </button>
    `;
    characterSettingsDiv.appendChild(addNewSection);
}

function saveCharacterSettings() {
    characterPromptSettings = {};
    
    // لكل شخصية، احفظ الإعدادات
    for (const character in characterNames) {
        if (character === 'user') continue;
        
        const descTextarea = document.getElementById(`${character}-description`);
        if (descTextarea) {
            characterPromptSettings[character] = descTextarea.value.trim();
            
            // تحديث الـ prompts
            prompts[character] = `${basePrompt.replace('[اسم الشخصية]', characterNames[character])
                .replace('[وصف الشخصية]', getShortDescription(character))} ${characterPromptSettings[character]}`;
        }
    }
    
    // حفظ الإعدادات في localStorage
    localStorage.setItem('characterSettings', JSON.stringify(characterPromptSettings));
    
    showToast('تم حفظ إعدادات الشخصيات بنجاح!');
}

function getShortDescription(character) {
    switch(character) {
        case 'analyst': return 'تقديم تحليل سياسي دقيق وموضوعي';
        case 'creative': return 'تقديم حلول وسيناريوهات سياسية مبتكرة';
        case 'comedian': return 'تقديم تعليقات سياسية ساخرة';
        case 'critic': return 'تقديم نقد سياسي حاد وموضوعي';
        default: return '';
    }
}

function loadCustomSettings() {
    const savedSettings = localStorage.getItem('characterSettings');
    if (savedSettings) {
        characterPromptSettings = JSON.parse(savedSettings);
        
        // تحديث الـ prompts بناءً على الإعدادات المحفوظة
        for (const character in characterPromptSettings) {
            prompts[character] = `${basePrompt.replace('[اسم الشخصية]', characterNames[character])
                .replace('[وصف الشخصية]', getShortDescription(character))} ${characterPromptSettings[character]}`;
        }
    }
}

function convertToChatInterface() {
    const mainContainer = document.querySelector('main');
    if (!mainContainer) return;
    
    const topicInput = document.getElementById('topic');
    if (!topicInput) return;
    
    const chatInterface = document.createElement('div');
    chatInterface.className = 'flex flex-col h-[calc(100vh-140px)]';

    const chatContainer = document.createElement('div');
    chatContainer.className = 'flex-1 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 border border-gray-200 dark:border-gray-700';
    chatContainer.id = 'chat-messages-container';
    chatContainer.appendChild(chat);
    chatInterface.appendChild(chatContainer);

    const inputBar = document.createElement('div');
    inputBar.className = 'flex items-center gap-2 mb-4';
    const inputContainer = document.createElement('div');
    inputContainer.className = 'relative flex-1';

    topicInput.className = 'block w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12';
    topicInput.placeholder = 'أدخل موضوعًا سياسيًا للنقاش...';
    topicInput.classList.remove('hidden');

    const sendButton = document.createElement('button');
    sendButton.id = 'sendButton';
    sendButton.className = 'absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-transform';
    sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
    sendButton.onclick = submitTopic;

    inputContainer.appendChild(topicInput);
    inputContainer.appendChild(sendButton);
    inputBar.appendChild(inputContainer);

    const characterButtons = document.createElement('div');
    characterButtons.className = 'flex flex-wrap justify-center gap-2 mt-2';

    for (const character in avatars) {
        if (character === 'user') continue;
        const btn = document.createElement('button');
        btn.className = `response-btn ${avatars[character].color} font-semibold px-3 py-2 rounded-full shadow-sm transition-all hover:opacity-90 text-sm md:text-base flex items-center gap-1`;
        btn.dataset.character = character;
        btn.innerHTML = `${avatars[character].avatar_icon} <span class="hidden md:inline">${characterNames[character]}</span>`;
        btn.addEventListener('click', () => {
            getResponse(character);
            // تأكيد بصري عند اختيار الشخصية
            document.querySelectorAll('.response-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedCharacter = character;
        });
        characterButtons.appendChild(btn);
    }

    const allBtn = document.createElement('button');
    allBtn.className = 'response-btn all-characters bg-purple-600 hover:bg-purple-700 text-white font-semibold px-3 py-2 rounded-full shadow-sm transition-all text-sm md:text-base flex items-center gap-1';
    allBtn.innerHTML = '<i class="fas fa-users"></i> <span class="hidden md:inline">الكل</span>';
    allBtn.onclick = getAllResponses;
    characterButtons.appendChild(allBtn);

    const clearBtn = document.createElement('button');
    clearBtn.className = 'bg-gray-400 hover:bg-gray-500 text-white font-semibold px-3 py-2 rounded-full shadow-sm transition-all text-sm md:text-base flex items-center gap-1';
    clearBtn.innerHTML = '<i class="fas fa-trash"></i> <span class="hidden md:inline">مسح</span>';
    clearBtn.onclick = clearChat;
    characterButtons.appendChild(clearBtn);

    chatInterface.appendChild(inputBar);
    chatInterface.appendChild(characterButtons);

    // تفريغ الحاوية الرئيسية وإضافة الواجهة الجديدة
    while (mainContainer.firstChild) {
        if (mainContainer.firstChild.id === 'chat' || 
            mainContainer.firstChild.id === 'topic' ||
            mainContainer.firstChild.id === 'topic-suggestions' ||
            mainContainer.firstChild.id === 'active-characters') {
            // لا تحذف هذه العناصر، سنستخدمها لاحقاً
            mainContainer.removeChild(mainContainer.firstChild);
        } else {
            mainContainer.removeChild(mainContainer.firstChild);
        }
    }
    
    mainContainer.appendChild(chatInterface);
}

function addWelcomeMessage() {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'text-center py-4 px-3 bg-blue-50 rounded-lg mb-4';
    welcomeMessage.innerHTML = `
        <h2 class="text-lg font-bold text-blue-700 mb-2">مرحبًا بك في الحوار السياسي الافتراضي!</h2>
        <p class="text-gray-600">أدخل موضوعك السياسي في الأسفل، أو اختر من المواضيع المقترحة، ثم اختر شخصية للتفاعل.</p>
        <button id="show-suggestions-btn" class="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
            <i class="fas fa-lightbulb mr-1"></i> عرض المواضيع المقترحة
        </button>
    `;
    
    chat.appendChild(welcomeMessage);
    
    // إضافة استمع لزر عرض المقترحات
    const suggestionsButton = document.getElementById('show-suggestions-btn');
    if (suggestionsButton) {
        suggestionsButton.onclick = function() {
            toggleSuggestions(true);
            
            // التمرير لعرض المقترحات إذا كانت مرئية
            const suggestionsDiv = document.getElementById('topic-suggestions');
            if (suggestionsDiv && !suggestionsDiv.classList.contains('hidden')) {
                suggestionsDiv.scrollIntoView({ behavior: 'smooth' });
            }
        };
    }
}

// --- وظائف التعامل مع الرسائل ---

function addOrUpdateMessage(character, text, messageId, isTyping = false, replyTo = null) {
    const avatarInfo = avatars[character] || avatars.user;
    const charName = characterNames[character] || 'غير معروف';
    const isUser = character === 'user';

    const messageDirectionClass = isUser ? 'justify-end' : 'justify-start';
    
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
        <div class="flex items-start gap-3 group ${messageDirectionClass} mb-5 ${replyTo ? 'thread-container' : ''}">
            ${replyTo ? '<div class="thread-indicator"></div>' : ''}
            ${!isUser ? `<div class="avatar ${avatarInfo.color} text-center flex-shrink-0" title="${characterNames[character]}">${avatarInfo.avatar_icon}</div>` : ''}
            <div class="message-bubble p-3 rounded-xl shadow-sm ${bubbleBgClass} max-w-[80%] relative">
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
        return `<div class="bg-red-100 text-red-700 p-3 rounded-lg text-right">
            تم حجب هذا المحتوى لاحتوائه على عبارات غير مناسبة.
        </div>`;
    }
    
    // تحويل النص إلى HTML باستخدام Markdown
    const converter = new showdown.Converter();
    let formattedText = converter.makeHtml(text);
    
    // إضافة تحسينات خاصة بالشخصيات
    if (character === 'analyst') {
        formattedText = `<div class="text-right text-black">${formattedText}</div>`;
    } else if (character === 'creative') {
        formattedText = `<div class="text-right text-black">${formattedText}</div>`;
    } else if (character === 'comedian') {
        formattedText = `<div class="text-right text-black font-bold">${formattedText}</div>`;
    } else if (character === 'critic') {
        formattedText = `<div class="text-right text-black">${formattedText}</div>`;
    } else {
        formattedText = `<div class="text-right text-black">${formattedText}</div>`;
    }
    
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
        const isNearBottom = chatMessagesContainer.scrollHeight - chatMessagesContainer.scrollTop - chatMessagesContainer.clientHeight < 100;
        if (isNearBottom) {
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }
    } else {
        chat.scrollTop = chat.scrollHeight;
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
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast-notification fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    toast.innerText = message;
    document.body.appendChild(toast);

    // تأثير ظهور
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);

    // إخفاء تدريجي
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// --- وظائف التفاعل مع واجهة Gemini API ---

function submitTopic() {
    const topicInput = document.getElementById('topic');
    const topic = topicInput.value.trim();
    
    if (!topic) {
        showToast('الرجاء إدخال موضوع سياسي!', 'error');
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
    document.getElementById('exportButton').title = `تصدير محادثة: ${currentTopic}`;
}

function showCharacterPrompt() {
    const promptMessage = document.createElement('div');
    promptMessage.className = 'text-center text-sm text-gray-500 dark:text-gray-400 my-2 animate-pulse';
    promptMessage.textContent = 'اختر شخصية للرد على موضوعك...';
    chat.appendChild(promptMessage);
    
    // إزالة التلميح بعد 3 ثوان
    setTimeout(() => {
        if (chat.contains(promptMessage)) {
            chat.removeChild(promptMessage);
        }
    }, 3000);
    
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
        addOrUpdateMessage(character, 'جاري التفكير...', messageId, true);
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
                timeout: 20000
            }
        );
        
        // تحديث شريط التقدم
        updateProgressBar(70);

        if (!response.data || !response.data.candidates || !Array.isArray(response.data.candidates) || response.data.candidates.length === 0) {
            throw new Error("رد غير صالح من واجهة Gemini API");
        }

        const candidate = response.data.candidates[0];
        if (!candidate.content || !candidate.content.parts || !Array.isArray(candidate.content.parts) || candidate.content.parts.length === 0) {
            throw new Error("رد غير صالح من واجهة Gemini API");
        }

        let text = candidate.content.parts[0]?.text?.trim() || 'لا رد متاح';
        
        // تحديث شريط التقدم
        updateProgressBar(90);

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
        
        let errorMsg = 'حدث خطأ في الحصول على الرد.';
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log(error.response.data);
                errorMsg = `خطأ API (${error.response.status}): يرجى المحاولة مرة أخرى.`;
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

function getReplyToInfo() {
    // إذا كان هناك رسائل سابقة، اجعل الرد على آخر رسالة من المستخدم
    const messageElements = document.querySelectorAll('.message-wrapper');
    let lastUserMessage = null;
    
    for (let i = messageElements.length - 1; i >= 0; i--) {
        const character = messageElements[i].dataset.character;
        if (character === 'user') {
            lastUserMessage = messageElements[i].querySelector('.message-content').textContent.trim();
            if (lastUserMessage.length > 30) {
                lastUserMessage = lastUserMessage.substring(0, 30) + '...';
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
            status.className = 'fixed top-16 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm shadow-lg z-50 flex items-center gap-2';
            status.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                <span>جاري التحميل (${pendingResponses} شخصية متبقية)</span>
            `;
            document.body.appendChild(status);
        } else {
            statusElement.querySelector('span').textContent = `جاري التحميل (${pendingResponses} شخصية متبقية)`;
        }
    } else {
        if (statusElement) {
            statusElement.remove();
        }
    }
}

function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${percentage}%`;
    
    if (percentage >= 100) {
        setTimeout(() => {
            progressBar.style.width = '0%';
        }, 500);
    }
}

function updateActiveCharacter(character, isActive) {
    activeCharacters[character] = isActive;
    
    // تحديث الواجهة
    const activeCharactersDiv = document.getElementById('active-characters');
    if (!activeCharactersDiv) return;
    
    // تحقق مما إذا كانت هناك أي شخصيات نشطة
    const anyActive = Object.values(activeCharacters).some(active => active);
    
    if (anyActive) {
        activeCharactersDiv.classList.remove('hidden');
        
        // تحديث المحتوى
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
    } else {
        activeCharactersDiv.classList.add('hidden');
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
    document.querySelector('.all-characters').classList.add('selected');
    
    // الحصول على الردود
    const promises = characters.map(character => getResponse(character, true));

    try {
        await Promise.all(promises);
        showToast('تم الحصول على جميع الردود بنجاح!');
    } catch (error) {
        console.error("خطأ في getAllResponses:", error);
        showToast('حدث خطأ أثناء الحصول على بعض الردود.', 'error');
    }
}

function clearChat() {
    if (confirm('هل تريد مسح الدردشة بالكامل؟')) {
        chat.innerHTML = '';
        currentTopic = '';
        responseHistory = [];
        document.querySelectorAll('.response-btn').forEach(b => b.classList.remove('selected'));
        selectedCharacter = null;
        addWelcomeMessage();
        
        // إعادة تعيين مؤشر الشخصيات النشطة
        for (const char in activeCharacters) {
            activeCharacters[char] = false;
        }
        updateActiveCharacter(null, false);
        
        showToast('تم مسح المحادثة بنجاح!');
    }
}

// --- وظائف التصدير ---

function exportConversation() {
    if (responseHistory.length === 0) {
        showToast('لا توجد محادثة للتصدير!', 'error');
        return;
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'p-4 bg-white';
    
    // إضافة عنوان
    contentDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px; direction: rtl;">
            <h1 style="font-size: 24px; font-weight: bold;">حوار سياسي: ${currentTopic}</h1>
            <p style="color: #666;">تم التصدير في ${new Date().toLocaleString('ar-EG')}</p>
        </div>
    `;
    
    // إضافة المحادثة
    const conversationDiv = document.createElement('div');
    conversationDiv.style.direction = 'rtl';
    
    responseHistory.forEach(item => {
        const messageDiv = document.createElement('div');
        messageDiv.style.margin = '10px 0';
        messageDiv.style.padding = '10px';
        messageDiv.style.borderRadius = '10px';
        messageDiv.style.border = '1px solid #ddd';
        
        // تعيين لون خلفية بناءً على الشخصية
        if (item.character === 'user') {
            messageDiv.style.backgroundColor = '#e0f7fa';
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
        
        // إضافة اسم الشخصية والتاريخ
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.marginBottom = '8px';
        header.style.borderBottom = '1px solid #eee';
        header.style.paddingBottom = '5px';
        
        const nameSpan = document.createElement('span');
        nameSpan.style.fontWeight = 'bold';
        nameSpan.textContent = item.characterName;
        
        const dateSpan = document.createElement('span');
        dateSpan.style.fontSize = '12px';
        dateSpan.style.color = '#666';
        dateSpan.textContent = new Date(item.timestamp).toLocaleString('ar-EG');
        
        header.appendChild(nameSpan);
        header.appendChild(dateSpan);
        messageDiv.appendChild(header);
        
        // إضافة المحتوى
        const content = document.createElement('div');
        content.style.textAlign = 'right';
        content.textContent = item.text;
        messageDiv.appendChild(content);
        
        conversationDiv.appendChild(messageDiv);
    });
    
    contentDiv.appendChild(conversationDiv);
    
    // إضافة الفوتر
    contentDiv.innerHTML += `
        <div style="text-align: center; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px;">
            <p style="color: #666;">حوار سياسي - مشروع طوره الياس خضر خلف شرار - كلية العلوم السياسية - جامعة تكريت</p>
        </div>
    `;
    
    // تصدير إلى PDF
    const element = document.createElement('div');
    element.appendChild(contentDiv);
    document.body.appendChild(element);
    
    const options = {
        margin: 10,
        filename: `حوار-سياسي-${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
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
}

function exportSingleResponse(messageId) {
    const messageElement = document.getElementById(messageId);
    if (!messageElement) {
        showToast('لم يتم العثور على الرسالة!', 'error');
        return;
    }
    
    const character = messageElement.dataset.character;
    const text = messageElement.dataset.text || messageElement.querySelector('.message-content').textContent.trim();
    const charName = characterNames[character] || 'غير معروف';
    
    // إنشاء محتوى التصدير
    const contentDiv = document.createElement('div');
    contentDiv.className = 'p-4 bg-white';
    contentDiv.style.direction = 'rtl';
    
    // إضافة عنوان
    contentDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="font-size: 24px; font-weight: bold;">رد ${charName} على: ${currentTopic}</h1>
            <p style="color: #666;">تم التصدير في ${new Date().toLocaleString('ar-EG')}</p>
        </div>
    `;
    
    // إضافة المحتوى
    const messageDiv = document.createElement('div');
    messageDiv.style.margin = '10px 0';
    messageDiv.style.padding = '15px';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.border = '1px solid #ddd';
    
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
    header.style.borderBottom = '1px solid #eee';
    header.style.paddingBottom = '5px';
    header.textContent = charName;
    messageDiv.appendChild(header);
    
    // إضافة المحتوى
    const content = document.createElement('div');
    content.style.textAlign = 'right';
    content.textContent = text;
    messageDiv.appendChild(content);
    
    contentDiv.appendChild(messageDiv);
    
    // إضافة الفوتر
    contentDiv.innerHTML += `
        <div style="text-align: center; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px;">
            <p style="color: #666;">حوار سياسي - مشروع طوره الياس خضر خلف شرار - كلية العلوم السياسية - جامعة تكريت</p>
        </div>
    `;
    
    // تصدير إلى PDF
    const element = document.createElement('div');
    element.appendChild(contentDiv);
    document.body.appendChild(element);
    
    const options = {
        margin: 10,
        filename: `رد-${charName}-${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf()
        .from(element)
        .set(options)
        .save()
        .then(() => {
            document.body.removeChild(element);
            showToast(`تم تصدير رد ${charName} بنجاح!`);
        })
        .catch(err => {
            console.error("خطأ في تصدير الرد:", err);
            document.body.removeChild(element);
            showToast('حدث خطأ أثناء تصدير الرد.', 'error');
        });
}

// --- تعريف الوظائف العامة ---
window.copyText = copyText;
window.exportSingleResponse = exportSingleResponse;

// --- تهيئة التطبيق ---
initApp();
