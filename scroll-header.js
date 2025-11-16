// تأثير حركة قائمة التنقل مع التمرير
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.main-nav');

    if (window.scrollY > 50) {
        // تغيير الهيدر
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.width = '100%';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        header.style.padding = '8px 0';
        header.style.transition = 'all 0.3s ease';
        header.style.zIndex = '1000';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(5px)';

        // تغيير قائمة التنقل على الموبايل
        if (window.innerWidth <= 768) {
            nav.style.top = header.offsetHeight + 'px';
        }

        // تغيير قائمة التنقل على الكمبيوتر
        if (window.innerWidth > 768) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            nav.style.backdropFilter = 'blur(3px)';
            nav.style.padding = '5px 0';
        }
    } else {
        // إعادة الهيدر
        header.style.position = 'relative';
        header.style.boxShadow = 'none';
        header.style.padding = '10px 0';
        header.style.backgroundColor = '#fff';
        header.style.backdropFilter = 'none';

        // إعادة قائمة التنقل على الموبايل
        if (window.innerWidth <= 768) {
            nav.style.top = '0';
        }

        // إعادة قائمة التنقل على الكمبيوتر
        if (window.innerWidth > 768) {
            nav.style.backgroundColor = 'transparent';
            nav.style.backdropFilter = 'none';
            nav.style.padding = '0';
        }
    }
});

// إضافة تأثير انتقالي سلس عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.main-nav');
    header.style.transition = 'all 0.3s ease';
    nav.style.transition = 'all 0.3s ease';
});

// معالجة تغيير حجم الشاشة
window.addEventListener('resize', function() {
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.main-nav');

    // إذا كان الهيدر مثبتًا عند تغيير حجم الشاشة
    if (window.scrollY > 50) {
        if (window.innerWidth <= 768) {
            nav.style.top = header.offsetHeight + 'px';
        } else {
            nav.style.top = '0';
        }
    }
});
