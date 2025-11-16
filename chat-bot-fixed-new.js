// التأكد من تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة بالكامل');
    // الحصول على عناصر DOM
    const chatbotIcon = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotBody = document.getElementById('chatbot-body');

    // التحقق من وجود العناصر قبل تنفيذ الكود
    if (!chatbotIcon || !chatbotWindow || !chatbotClose || !chatbotInput || !chatbotSend || !chatbotBody) {
        console.error('عناصر الشات بوت غير موجودة في الصفحة');
        console.error('chatbotIcon:', chatbotIcon);
        console.error('chatbotWindow:', chatbotWindow);
        console.error('chatbotClose:', chatbotClose);
        console.error('chatbotInput:', chatbotInput);
        console.error('chatbotSend:', chatbotSend);
        console.error('chatbotBody:', chatbotBody);
        return;
    } else {
        console.log('تم العثور على جميع عناصر الشات بوت بنجاح');
    }

    // إضافة تأثير التمرير للأيقونة
    window.addEventListener('scroll', function() {
        // الحصول على موضع التمرير الحالي
        const scrollPosition = window.scrollY;

        // إذا كان التمرير أكثر من 100 بكسل، أضف تأثيراً بسيطاً
        if (scrollPosition > 100) {
            chatbotIcon.style.transform = 'scale(0.95)';
            chatbotIcon.style.boxShadow = '0 4px 15px rgba(255, 107, 0, 0.5)';
        } else {
            chatbotIcon.style.transform = 'scale(1)';
            chatbotIcon.style.boxShadow = '0 6px 20px rgba(255, 107, 0, 0.4)';
        }
    });

    // إظهار/إخفاء نافذة المحادثة
    if (chatbotIcon) {
        console.log('تم العثور على أيقونة الشات بوت، إضافة مستمع النقر');

        // إضافة مستمع النقر
        chatbotIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('تم النقر على أيقونة الشات بوت');

            if (chatbotWindow) {
                chatbotWindow.classList.add('active');
                chatbotIcon.style.display = 'none';
                console.log('تم فتح نافذة الشات بوت');
            } else {
                console.error('لم يتم العثور على نافذة الشات بوت');
            }
        });

        // التأكد من أن الأيقونة قابلة للنقر
        chatbotIcon.style.pointerEvents = 'auto';
    } else {
        console.error('لم يتم العثور على أيقونة الشات بوت');
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('تم النقر على زر الإغلاق');

            if (chatbotWindow) {
                chatbotWindow.classList.remove('active');
            }

            if (chatbotIcon) {
                chatbotIcon.style.display = 'flex';
            }
        });
    } else {
        console.error('لم يتم العثور على زر الإغلاق');
    }

    // وظيفة إرسال الرسالة
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

        // محاكاة تفكير البوت
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chatbot-message bot-message typing';
        typingIndicator.innerHTML = `<span></span><span></span><span></span>`;
        chatbotBody.appendChild(typingIndicator);

        // التمرير للأسفل
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

        // محاكاة استجابة البوت
        setTimeout(function() {
            // إزالة مؤشر الكتابة
            chatbotBody.removeChild(typingIndicator);

            // إنشاء رد البوت
            const botResponse = generateBotResponse(messageText);
            const botMessage = document.createElement('div');
            botMessage.className = 'chatbot-message bot-message';
            botMessage.textContent = botResponse;
            chatbotBody.appendChild(botMessage);

            // التمرير إلى الأسفل
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

    // إنشاء ردود البوت
    function generateBotResponse(message) {
        const lowerMessage = message.toLowerCase();

        // ردود مخصصة بناءً على الكلمات المفتاحية
        if (lowerMessage.includes('خدمات') || lowerMessage.includes('خدمة')) {
            return 'نقدم في فاد بلس مجموعة متنوعة من الخدمات اللوجستية تشمل النقل الثقيل، الشحن والتوجيه، التخزين، والنقل السريع. يمكنك زيارة صفحة خدماتنا للمزيد من التفاصيل.';
        } else if (lowerMessage.includes('سعر') || lowerMessage.includes('تكلفة')) {
            return 'للحصول على عرض سعر مخصص، يرجى ملء نموذج طلب عرض السعر أو التواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني.';
        } else if (lowerMessage.includes('تواصل') || lowerMessage.includes('اتصال')) {
            return 'يمكنك التواصل معنا عبر:\n📞 الهاتف: +966 50 123 4567\n📧 البريد الإلكتروني: info@fadplus.com\n📍 العنوان: الرياض، المملكة العربية السعودية';
        } else if (lowerMessage.includes('تتبع') || lowerMessage.includes('شحنة')) {
            return 'لتتبع شحنتك، يرجى إدخال رقم التتبع في حقل تتبع الشحنات الموجود في الصفحة الرئيسية.';
        } else if (lowerMessage.includes('شكر') || lowerMessage.includes('ممتاز')) {
            return 'شكراً لك! يسعدني مساعدتك. هل هناك أي استفسار آخر؟';
        } else if (lowerMessage.includes('وداع') || lowerMessage.includes('انتهى')) {
            return 'شكراً لتواصلك معنا. نتمنى لك يوماً سعيداً!';
        } else {
            // ردود عامة
            const generalResponses = [
                'شكراً لسؤالك. هل يمكنك توضيح استفسارك أكثر؟',
                'أفهم ما تقصده. سأكون سعيداً بمساعدتك. هل يمكنك تقديم المزيد من التفاصيل؟',
                'هذا سؤال جيد! للإجابة الدقيقة، يرجى زيارة صفحات موقعنا أو التواصل مع فريق خدمة العملاء.',
                'أنا هنا لمساعدتك. يمكنك طرح سؤالك بشكل مختلف أو التواصل معنا مباشرة للحصول على مساعدة متخصصة.'
            ];

            return generalResponses[Math.floor(Math.random() * generalResponses.length)];
        }
    }
}); // إغلاق دالة DOMContentLoaded