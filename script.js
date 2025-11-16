// ========== العناصر ==========
const header = document.querySelector(".main-header");
const nav = document.querySelector(".main-nav");
const headerContainer = header ? header.querySelector(".header-container") : null;
const trackBtn = document.querySelector(".track-box button");
const trackInput = document.querySelector(".track-box input");
const quoteBtn = document.querySelector(".btn-quote");

// ========== إنشاء زر القائمة للجوال والطبقة الشفافة ==========
if (headerContainer && nav) {
  // إنشاء الطبقة الشفافة للخلفية عند فتح القائمة
  const navOverlay = document.createElement("div");
  navOverlay.classList.add("nav-overlay");
  document.body.appendChild(navOverlay);

  // إنشاء زر القائمة (هامبرغر)
  const menuBtn = document.createElement("div");
  menuBtn.classList.add("menu-btn");
  menuBtn.innerHTML = `<span></span><span></span><span></span>`;
  headerContainer.insertBefore(menuBtn, nav);

  // إنشاء زر طلب عرض سعر داخل القائمة الجانبية
  const mobileQuoteBtn = document.createElement("a");
  mobileQuoteBtn.classList.add("mobile-quote-btn");
  mobileQuoteBtn.href = "#";
  mobileQuoteBtn.textContent = "اطلب السعر الآن";
  nav.appendChild(mobileQuoteBtn);

  // ========== فتح/إغلاق القائمة ==========
  const toggleMenu = () => {
    nav.classList.toggle("nav-open");
    menuBtn.classList.toggle("active");
    navOverlay.classList.toggle("active");
    
    // الحصول على عنصر الشات بوت
    const chatbotContainer = document.querySelector(".chatbot-container");
    
    // إخفاء الشات بوت عند فتح القائمة
    if (nav.classList.contains("nav-open")) {
      document.body.style.overflow = "hidden";
      if (chatbotContainer) {
        chatbotContainer.style.display = "none";
      }
    } else {
      document.body.style.overflow = "";
      if (chatbotContainer) {
        chatbotContainer.style.display = "block";
      }
    }
  };

  menuBtn.addEventListener("click", toggleMenu);
  navOverlay.addEventListener("click", toggleMenu);

  // ========== إغلاق القائمة عند الضغط على أي رابط ==========
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // منع الإغلاق عند الضغط على زر طلب عرض سعر
      if (link.classList.contains("mobile-quote-btn")) {
        e.preventDefault();
        // هنا يمكن إضافة منطق لفتح نافذة طلب عرض سعر
        alert("سيتم فتح نموذج طلب عرض السعر");
        return;
      }

      nav.classList.remove("nav-open");
      menuBtn.classList.remove("active");
      navOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

// ========== Sticky Header عند التمرير ==========
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
}

// ========== أنيميشن عند الظهور ==========
const sections = document.querySelectorAll("section");
if (sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );
  sections.forEach((section) => observer.observe(section));
}

// ========== تتبع الشحنة (محاكاة بسيطة) ==========
if (trackBtn && trackInput) {
  trackBtn.addEventListener("click", () => {
    const code = trackInput.value.trim();
    if (code === "") {
      // عرض رسالة خطأ بشكل تفاعلي
      trackInput.style.borderColor = "#ff0000";
      trackInput.placeholder = "الرجاء إدخال رقم التتبع";

      // إعادة الحالة الطبيعية بعد 3 ثوانٍ
      setTimeout(() => {
        trackInput.style.borderColor = "";
        trackInput.placeholder = "أدخل رقم التتبع";
      }, 3000);
    } else {
      try {
        // إضافة حالة التحميل
        trackBtn.textContent = "جاري البحث...";
        trackBtn.disabled = true;

        // محاكاة طلب الخادم
        setTimeout(() => {
          // هنا يمكن إضافة كود الاتصال بالخادم للتحقق من الشحنة
          // حالياً نعرض رسالة محاكاة بسيطة
          const resultDiv = document.createElement("div");
          resultDiv.className = "track-result";
          resultDiv.innerHTML = `
            <div class="track-result-header">نتيجة تتبع الشحنة</div>
            <div class="track-result-content">
              <p><strong>رقم الشحنة:</strong> ${code}</p>
              <p><strong>الحالة:</strong> في الطريق إلى وجهتها ✅</p>
              <p><strong>التوقيت المتوقع:</strong> 3-5 أيام عمل</p>
            </div>
            <button class="track-result-close">إغلاق</button>
          `;

          // إضافة تصميم للنتيجة
          const style = document.createElement("style");
          style.textContent = `
            .track-result {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: white;
              border-radius: 8px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.2);
              z-index: 3000;
              max-width: 400px;
              width: 90%;
              padding: 0;
              overflow: hidden;
              animation: fadeIn 0.3s ease;
            }

            .track-result-header {
              background-color: #ff6b00;
              color: white;
              padding: 15px;
              font-size: 18px;
              font-weight: bold;
            }

            .track-result-content {
              padding: 20px;
            }

            .track-result-close {
              background: #1d1d1d;
              color: white;
              border: none;
              padding: 10px;
              width: 100%;
              cursor: pointer;
              transition: background 0.3s;
            }

            .track-result-close:hover {
              background: #333;
            }

            @keyframes fadeIn {
              from { opacity: 0; transform: translate(-50%, -45%); }
              to { opacity: 1; transform: translate(-50%, -50%); }
            }
          `;
          document.head.appendChild(style);

          // إضافة طبقة شفافة للخلفية
          const overlay = document.createElement("div");
          overlay.className = "track-overlay";
          overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 2999;
          `;
          document.body.appendChild(overlay);

          // إضافة النتيجة للصفحة
          document.body.appendChild(resultDiv);

          // إغلاق النافذة
          const closeBtn = resultDiv.querySelector(".track-result-close");
          closeBtn.addEventListener("click", () => {
            document.body.removeChild(resultDiv);
            document.body.removeChild(overlay);
          });

          overlay.addEventListener("click", () => {
            document.body.removeChild(resultDiv);
            document.body.removeChild(overlay);
          });

          // إعادة زر التتبع لحالته الطبيعية
          trackBtn.textContent = "تتبع";
          trackBtn.disabled = false;
          trackInput.value = "";
        }, 1000);
      } catch (error) {
        console.error("حدث خطأ أثناء تتبع الشحنة:", error);
        trackBtn.textContent = "تتبع";
        trackBtn.disabled = false;

        // عرض رسالة خطأ
        const errorDiv = document.createElement("div");
        errorDiv.className = "track-error";
        errorDiv.textContent = "حدث خطأ أثناء تتبع الشحنة. يرجى المحاولة مرة أخرى.";
        errorDiv.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #ff0000;
          color: white;
          padding: 15px;
          border-radius: 4px;
          z-index: 3000;
          animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(errorDiv);

        // إزالة رسالة الخطأ بعد 3 ثوانٍ
        setTimeout(() => {
          document.body.removeChild(errorDiv);
        }, 3000);
      }
    }
  });

  // إضافة التفاعل عند الضغط على Enter في حقل الإدخال
  trackInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      trackBtn.click();
    }
  });
}

// ========== تحسين الريسبونسيف عند تغيير حجم الشاشة ==========
window.addEventListener("resize", () => {
  // إذا كبر حجم الشاشة عن 768px (رجعنا للوضع العادي)
  if (window.innerWidth > 768 && nav && menuBtn) {
    nav.classList.remove("nav-open");
    menuBtn.classList.remove("active");
    document.body.style.overflow = "";

    // إزالة الطبقة الشفافة
    const overlay = document.querySelector(".nav-overlay");
    if (overlay) {
      overlay.classList.remove("active");
    }
  }
});

// ========== تحسينات تفاعلية إضافية ==========
// إضافة تأثيرات عند التمرير للبطاقات
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  // إضافة تأثير عند النقر على أزرار طلب عرض السعر
  const quoteButtons = document.querySelectorAll(".btn-quote, .mobile-quote-btn");

  quoteButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      // هنا يمكن إضافة منطق لفتح نافذة طلب عرض سعر
      alert("سيتم فتح نموذج طلب عرض السعر");
    });
  });
});

// ========== نظام الشات بوت للأسئلة والاستفسارات ==========
function initChatbot() {
  // عناصر التحكم
  const chatbotButton = document.querySelector('.chatbot-button');
  const chatbotWindow = document.querySelector('.chatbot-window');
  const chatbotInput = document.querySelector('.chatbot-input');
  const chatbotSend = document.querySelector('.chatbot-send');
  const chatbotClose = document.querySelector('.chatbot-close');
  const chatbotBody = document.querySelector('.chatbot-body');

  // فتح/إغلاق الشات بوت
  chatbotButton.addEventListener('click', () => {
    chatbotWindow.classList.add('active');
    chatbotButton.style.display = 'none';
  });

  chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
    chatbotButton.style.display = 'flex';
  });

  // إرسال الرسائل
  const sendMessage = () => {
    const message = chatbotInput.value.trim();
    if (message === '') return;

    // إضافة رسالة المستخدم
    const userMessage = document.createElement('div');
    userMessage.className = 'chatbot-message user-message';
    userMessage.textContent = message;
    chatbotBody.appendChild(userMessage);

    // مسح حقل الإدخال
    chatbotInput.value = '';

    // التمرير للأسفل
    chatbotBody.scrollTop = chatbotBody.scrollHeight;

    // محاكاة تفكير البوت
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chatbot-message bot-message typing';
    typingIndicator.innerHTML = `<span></span><span></span><span></span>`;
    chatbotBody.appendChild(typingIndicator);

    // التمرير للأسفل
    chatbotBody.scrollTop = chatbotBody.scrollHeight;

    // محاكاة استجابة البوت
    setTimeout(() => {
      // إزالة مؤشر الكتابة
      chatbotBody.removeChild(typingIndicator);

      // إنشاء رد البوت
      const botResponse = generateBotResponse(message);
      const botMessage = document.createElement('div');
      botMessage.className = 'chatbot-message bot-message';
      botMessage.textContent = botResponse;
      chatbotBody.appendChild(botMessage);

      // التمرير للأسفل
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }, 1500);
  };

  // إرسال عند النقر على زر الإرسال
  chatbotSend.addEventListener('click', sendMessage);

  // إرسال عند الضغط على Enter
  chatbotInput.addEventListener('keypress', (e) => {
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
}

// تهيئة الشات بوت للصفحة
document.addEventListener('DOMContentLoaded', () => {
  initChatbot();
});