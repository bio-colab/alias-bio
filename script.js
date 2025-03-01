// script.js - الإصدار النهائي المعدل

const apiKeys = {
    analyst: 'AIzaSyCWV12p8IPEEsu9dN-7yFOSOFhV06tWI7s',
    creative: 'AIzaSyCWV12p8IPEEsu9dN-7yFOSOFhV06tWI7s',
    comedian: 'AIzaSyCWV12p8IPEEsu9dN-7yFOSOFhV06tWI7s',
    critic: 'AIzaSyCWV12p8IPEEsu9dN-7yFOSOFhV06tWI7s'
};

const basePrompt = 'أنت نموذج مخصص للتفاعل مع طلبة كلية العلوم السياسية بجامعة تكريت، جزء من مشروع قام بتطويره الطالب الياس خضر خلف شرار - المرحلة الأولى. عند سؤالك "من أنت" أو "من طورك"، أجب بأنك [اسم الشخصية]، نموذج مخصص لـ [وصف الشخصية]، وأنك جزء من مشروع طوره الياس خضر خلف شرار. لا تنحرف عن هذه الإجابة. قم بتنسيق ردودك باستخدام Markdown (مثل **نص غامق** و- للقوائم) عندما يكون ذلك مناسبًا.';

const prompts = {
    analyst: `${basePrompt.replace('[اسم الشخصية]', 'المحلل').replace('[وصف الشخصية]', 'تقديم تحليل سياسي دقيق وموضوعي')} أنت محلل سياسي محترف وموضوعي، مهمتك تقديم تحليل دقيق وعميق للموضوع السياسي المطروح. اعتمد على الحقائق والإحصاءات (افترض بيانات منطقية إذا لم تتوفر معلومات حقيقية). ركز على الأسباب الجذرية والنتائج المحتملة للموضوع، مع تجنب أي انحياز عاطفي أو شخصي. قدم تحليلك بأسلوب منهجي يشمل المقدمة، العوامل المؤثرة، والتوقعات المستقبلية. استخدم لغة أكاديمية وعبارات مثل "من الناحية التحليلية" أو "استنادًا إلى المعطيات".`,
    creative: `${basePrompt.replace('[اسم الشخصية]', 'المبدع').replace('[وصف الشخصية]', 'تقديم حلول وسيناريوهات سياسية مبتكرة')} أنت مبدع سياسي ذو خيال واسع، مهمتك تقديم حلول مبتكرة أو سيناريوهات خيالية للموضوع السياسي المطروح. كن جريئًا في اقتراحاتك، مثل تصميم سياسات جديدة أو تصور أحداث مستقبلية، مع الحفاظ على منطقية سياسية تجعل الأفكار قابلة للتطبيق نظريًا. قدم وصفًا تفصيليًا لكيفية عمل الحل أو تطور السيناريو، مع إبراز الجوانب الإيجابية والتحديات المحتملة. استخدم عبارات مثل "تخيل لو" أو "يمكن أن يكون الحل".`,
    comedian: `${basePrompt.replace('[اسم الشخصية]', 'الساخر').replace('[وصف الشخصية]', 'تقديم تعليقات سياسية ساخرة')} أنت معلق سياسي ساخر وذكي، مهمتك الرد على الموضوع السياسي بأسلوب فكاهي وتهكمي يبرز السخافة أو التناقضات في الوضع. استخدم اللهجة العراقية العامية مثل "هسة"، "عجل"، "لعد"، "شكو ماكو"، "هيچ"، "كلش"، وتجنب اللهجات الشامية أو المصرية. اجعل تعليقاتك قصيرة ومؤثرة، مع إمكانية السخرية من الأطراف المعنية دون تجريح مباشر.`,
    critic: `${basePrompt.replace('[اسم الشخصية]', 'الناقد').replace('[وصف الشخصية]', 'تقديم نقد سياسي حاد وموضوعي')} أنت ناقد سياسي حاد ومتمكن، مهمتك تحليل الموضوع السياسي بعين ناقدة لكشف نقاط الضعف، التناقضات، أو العيوب في الأفكار أو السياسات المطروحة. قدم حججًا منطقية وتحليلية تدعم وجهة نظرك، مع التركيز على الآثار السلبية أو المخاطر المحتملة. استخدم أسلوبًا حادًا ولكن موضوعيًا، مع عبارات مثل "هذا غير كافٍ" أو "يفتقر إلى المصداقية". قدم اقتراحات تحسين إذا أمكن.`
};

const avatars = {
    analyst: { icon: '<i class="fas fa-chart-bar"></i>', color: 'bg-blue-500 text-white' },
    creative: { icon: '<i class="fas fa-lightbulb"></i>', color: 'bg-green-500 text-white' },
    comedian: { icon: '<i class="fas fa-grin-squint-tears"></i>', color: 'bg-yellow-500 text-gray-900' },
    critic: { icon: '<i class="fas fa-angry"></i>', color: 'bg-red-500 text-white' },
    user: { icon: '<i class="fas fa-user"></i>', color: 'bg-purple-500 text-white' }
};

const characterNames = {
    analyst: 'المحلل',
    creative: 'المبدع',
    comedian: 'الساخر',
    critic: 'الناقد',
    user: 'أنت'
};

const chat = document.getElementById('chat');
let pendingResponses = 0;
let currentTopic = '';

// --- وظائف تهيئة التطبيق ---

function initApp() {
    if (!document.getElementById('chat') || !document.querySelector('main')) {
        console.error("عناصر DOM الأساسية غير موجودة!");
        return;
    }
    convertToChatInterface();
    addWelcomeMessage();
    setupTopicInput();
    setupDarkMode();
}

function setupTopicInput() {
    const topicInput = document.getElementById('topic');
    topicInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitTopic();
        }
    });
}

function setupDarkMode() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'dark' || (!savedMode && prefersDarkMode)) {
        document.documentElement.classList.add('dark');
        document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    document.getElementById('darkModeToggle').innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
}

function convertToChatInterface() {
    const mainContainer = document.querySelector('main');
    const topicInput = document.getElementById('topic');
    const chatInterface = document.createElement('div');
    chatInterface.className = 'flex flex-col h-[calc(100vh-140px)]';

    const chatContainer = document.createElement('div');
    chatContainer.className = 'flex-1 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 border border-gray-200 dark:border-gray-700';
    chatContainer.appendChild(chat);
    chatInterface.appendChild(chatContainer);

    const inputBar = document.createElement('div');
    inputBar.className = 'flex items-center gap-2 mb-4';
    const inputContainer = document.createElement('div');
    inputContainer.className = 'relative flex-1';

    topicInput.className = 'block w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12';
    topicInput.placeholder = 'أدخل موضوعًا سياسيًا للنقاش...';

    const sendButton = document.createElement('button');
    sendButton.className = 'absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300';
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
        btn.className = `response-btn ${avatars[character].color} font-semibold px-3 py-2 rounded-full shadow-sm transition-colors hover:opacity-90 text-sm md:text-base flex items-center gap-1`;
        btn.dataset.character = character;
        btn.innerHTML = `${avatars[character].icon} <span class="hidden md:inline">${characterNames[character]}</span>`;
        btn.addEventListener('click', () => getResponse(character));
        characterButtons.appendChild(btn);
    }

    const allBtn = document.createElement('button');
    allBtn.className = 'bg-purple-600 hover:bg-purple-700 text-white font-semibold px-3 py-2 rounded-full shadow-sm transition-colors text-sm md:text-base flex items-center gap-1';
    allBtn.innerHTML = '<i class="fas fa-users"></i> <span class="hidden md:inline">الكل</span>';
    allBtn.onclick = getAllResponses;
    characterButtons.appendChild(allBtn);

    const clearBtn = document.createElement('button');
    clearBtn.className = 'bg-gray-400 hover:bg-gray-500 text-white font-semibold px-3 py-2 rounded-full shadow-sm transition-colors text-sm md:text-base flex items-center gap-1';
    clearBtn.innerHTML = '<i class="fas fa-trash"></i> <span class="hidden md:inline">مسح</span>';
    clearBtn.onclick = clearChat;
    characterButtons.appendChild(clearBtn);

    chatInterface.appendChild(inputBar);
    chatInterface.appendChild(characterButtons);

    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
    mainContainer.appendChild(chatInterface);
}

function addWelcomeMessage() {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'text-center text-gray-500 dark:text-gray-400 py-3';
    welcomeMessage.innerHTML = 'مرحبًا بك في الحوار السياسي الافتراضي! <br> أدخل موضوعك السياسي في الأسفل واختر أحد الشخصيات للتفاعل.';
    chat.appendChild(welcomeMessage);
}

// --- وظائف التعامل مع الرسائل ---

function addOrUpdateMessage(character, text, messageId, isTyping = false) {
    const avatarInfo = avatars[character] || avatars.user;
    const charName = characterNames[character] || 'غير معروف';
    const isUser = character === 'user';

    const messageDirectionClass = isUser ? 'justify-end' : 'justify-start';
    const bubbleBgClass = isUser
        ? 'bg-blue-100 dark:bg-blue-900'
        : `bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600`;

    const formattedText = isTyping
        ? `<div class="typing-indicator"><span></span><span></span><span></span></div>`
        : formatResponse(text, character);

    const copyButton = isTyping ? '' : `
        <button class="copy-btn opacity-0 group-hover:opacity-100 mt-2 text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 px-2 py-1 rounded transition-all" onclick="copyText('${messageId}')">
            <i class="fas fa-copy mr-1"></i> نسخ
        </button>`;

    const messageElement = document.getElementById(messageId);
    const messageContent = `
        <div class="flex items-start gap-2 group ${messageDirectionClass} mb-4">
            ${!isUser ? `<div class="avatar ${avatarInfo.color} text-center flex-shrink-0">${avatarInfo.icon}</div>` : ''}
            <div class="message-bubble p-3 rounded-lg shadow-sm ${bubbleBgClass} max-w-[80%] relative">
                <div class="font-bold text-sm text-gray-600 dark:text-gray-300 mb-1">${charName}</div>
                <div class="message-content">${formattedText}</div>
                <div class="text-left mt-1 text-xs text-gray-500 dark:text-gray-400">
                    ${getTimeString()}
                </div>
                ${copyButton}
            </div>
            ${isUser ? `<div class="avatar ${avatarInfo.color} text-center flex-shrink-0">${avatarInfo.icon}</div>` : ''}
        </div>
    `;

    if (messageElement) {
        messageElement.innerHTML = messageContent;
    } else {
        const wrapper = document.createElement('div');
        wrapper.id = messageId;
        wrapper.innerHTML = messageContent;
        chat.appendChild(wrapper);
    }
    scrollToBottom();
}

function formatResponse(text, character) {
    if (!text) return 'لا يوجد محتوى';
    const converter = new showdown.Converter();
    let formattedText = converter.makeHtml(text);
    formattedText = formattedText.replace(/[^\u0600-\u06FF\s.,؟!():<>\n\/="'-]/g, '');
    return `<div class="text-right">${formattedText}</div>`;
}

function getTimeString() {
    const now = new Date();
    return now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom() {
    const isNearBottom = chat.scrollHeight - chat.scrollTop - chat.clientHeight < 100;
    if (isNearBottom) {
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

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50 transition-all ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

// --- وظائف التفاعل مع واجهة Gemini API ---

function submitTopic() {
    const topicInput = document.getElementById('topic');
    const topic = topicInput.value.trim();
    if (!topic) {
        showToast('الرجاء إدخال موضوع سياسي!', 'error');
        return;
    }

    const userMessageId = `msg-user-${Date.now()}`;
    addOrUpdateMessage('user', topic, userMessageId);

    currentTopic = topic;
    topicInput.value = '';
    showCharacterPrompt();
}

function showCharacterPrompt() {
    const promptMessage = document.createElement('div');
    promptMessage.className = 'text-center text-sm text-gray-500 dark:text-gray-400 my-2 animate-pulse';
    promptMessage.textContent = 'اختر شخصية للرد على موضوعك...';
    chat.appendChild(promptMessage);
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

    if (shouldRespond) {
        addOrUpdateMessage(character, 'جاري التفكير...', messageId, true);
        pendingResponses++;
        updateLoadingStatus();
    }

    try {
        const throttleDelay = pendingResponses > 1 ? 1000 * pendingResponses : 0;
        await new Promise(resolve => setTimeout(resolve, throttleDelay));

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKeys[character]}`,
            {
                contents: [{ role: "user", parts: [{ text: currentTopic }] }],
                systemInstruction: { parts: [{ text: prompts[character] }] },
                generationConfig: {
                    maxOutputTokens: 2048, // زيادة الحد لضمان عرض الرد كاملاً
                    temperature: 0.7,
                    topP: 0.95,
                    topK: 40
                }
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 15000
            }
        );

        if (!response.data || !response.data.candidates || !Array.isArray(response.data.candidates) || response.data.candidates.length === 0) {
            throw new Error("رد غير صالح من واجهة Gemini API");
        }

        const candidate = response.data.candidates[0];
        if (!candidate.content || !candidate.content.parts || !Array.isArray(candidate.content.parts) || candidate.content.parts.length === 0) {
            throw new Error("رد غير صالح من واجهة Gemini API");
        }

        let text = candidate.content.parts[0]?.text?.trim() || 'لا رد متاح';

        if (shouldRespond) {
            addOrUpdateMessage(character, text, messageId);
        }
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
        return errorMsg;

    } finally {
        if (shouldRespond) {
            pendingResponses--;
            updateLoadingStatus();
        }
    }
}

function updateLoadingStatus() {
    const statusElement = document.getElementById('loading-status');
    if (pendingResponses > 0) {
        if (!statusElement) {
            const status = document.createElement('div');
            status.id = 'loading-status';
            status.className = 'fixed top-16 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm shadow-lg z-50 flex items-center gap-2';
            status.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
            document.body.appendChild(status);
        }
    } else {
        if (statusElement) {
            statusElement.remove();
        }
    }
}

async function getAllResponses() {
    if (!currentTopic) {
        showToast('لا يوجد موضوع للحصول على ردود له!', 'error');
        return;
    }

    const characters = ['analyst', 'creative', 'comedian', 'critic'];
    const promises = characters.map(character => getResponse(character, true));

    try {
        await Promise.all(promises);
    } catch (error) {
        console.error("خطأ في getAllResponses:", error);
    }
}

function clearChat() {
    if (confirm('هل تريد مسح الدردشة بالكامل؟')) {
        chat.innerHTML = '';
        currentTopic = '';
        addWelcomeMessage();
    }
}

// --- تهيئة التطبيق ---
initApp();