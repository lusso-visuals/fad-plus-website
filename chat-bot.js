document.addEventListener('DOMContentLoaded', function() {
    // الحصول على عناصر DOM
    const chatbotIcon = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotBody = document.getElementById('chatbot-body');

    // التحقق من وجود العناصر
    if (!chatbotIcon || !chatbotWindow || !chatbotClose || !chatbotInput || !chatbotSend || !chatbotBody) {
        console.error('بعض عناصر الشات بوت غير موجودة');
        return;
    }

    // فتح نافذة الشات بوت
    chatbotIcon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        chatbotWindow.classList.add('active');
        chatbotIcon.style.display = 'none';
    });

    // إغلاق نافذة الشات بوت
    chatbotClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        chatbotWindow.classList.remove('active');
        chatbotIcon.style.display = 'flex';
    });

    // إغلاق النافذة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!chatbotWindow.contains(e.target) && !chatbotIcon.contains(e.target)) {
            if (chatbotWindow.classList.contains('active')) {
                chatbotWindow.classList.remove('active');
                chatbotIcon.style.display = 'flex';
            }
        }
    });

    // إرسال الرسالة
    function sendMessage() {
        const messageText = chatbotInput.value.trim();
        if (messageText === '') return;

        // إضافة رسالة المستخدم
        const userMessage = document.createElement('div');
        userMessage.className = 'chatbot-message user-message';
        userMessage.textContent = messageText;
        chatbotBody.appendChild(userMessage);

        // مسح حقل الإدخال
        chatbotInput.value = '';

        // التمرير إلى الأسفل
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

        // إظهار مؤشر الكتابة
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chatbot-message bot-message typing';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatbotBody.appendChild(typingIndicator);

        // التمرير للأسفل
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

        // محاكاة استجابة البوت
        setTimeout(function() {
            chatbotBody.removeChild(typingIndicator);
            const botResponse = generateBotResponse(messageText);
            const botMessage = document.createElement('div');
            botMessage.className = 'chatbot-message bot-message';
            botMessage.textContent = botResponse;
            chatbotBody.appendChild(botMessage);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }, 1500);
    }

    // إرسال الرسالة عند النقر على زر الإرسال
    chatbotSend.addEventListener('click', sendMessage);

    // إرسال الرسالة عند الضغط على Enter
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // توليد ردود البوت
    function generateBotResponse(message) {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('خدمات') || lowerMessage.includes('خدمة')) {
            return 'نقدم مجموعة متنوعة من الخدمات اللوجستية. كيف يمكنني مساعدتك في اختيار الخدمة المناسبة؟';
        } else if (lowerMessage.includes('سعر') || lowerMessage.includes('تكلفة')) {
            return 'للحصول على معلومات الأسعار، يرجى تحديد الخدمة التي تهتم بها.';
        } else if (lowerMessage.includes('تواصل') || lowerMessage.includes('اتصال')) {
            return 'يمكنك التواصل معنا عبر:\n📞 الهاتف: +966 50 123 4567\n📧 البريد الإلكتروني: info@example.com';
        } else if (lowerMessage.includes('شكر')) {
            return 'على الرحب والسعة! هل هناك شيء آخر يمكنني مساعدتك به؟';
        } else if (lowerMessage.includes('وداع')) {
            return 'شكراً لتواصلك معنا. نتمنى لك يوماً سعيداً!';
        } else {
            const responses = [
                'أفهم سؤالك. هل يمكنك توضيح المزيد؟',
                'هذا سؤال جيد! سأكون سعيداً بمساعدتك.',
                'يمكنني مساعدتك في هذا الموضوع. هل لديك سؤال محدد؟'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
});
