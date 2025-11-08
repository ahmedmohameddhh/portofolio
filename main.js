// ---- main.js ----

// mode toggle
const modeBtn = document.getElementById('mode-toggle');
const body = document.body;

modeBtn.addEventListener('click', () => {
  // بدّل بين الوضعين
  const isLight = body.classList.toggle('light');

  // غير الأيقونة حسب الوضع الحالي
  const icon = modeBtn.querySelector('i');
  icon.classList = isLight ? 'fas fa-sun' : 'fas fa-moon';
});




// portfolio 
// main.js — فلترة التبويبات ونقل كلاس active
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const projects = document.querySelectorAll('.project');

  // تحويل نص التاب إلى مفتاح فلترة (lowercase، من غير مسافات سلمية)
  function tabKey(el) {
    return el.textContent.trim().toLowerCase();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 1) نقل كلاس active
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // 2) فلترة المشاريع
      const key = tabKey(tab); // مثل "all" أو "web design" أو "mobile"
      projects.forEach(proj => {
        const cat = (proj.dataset.category || '').toLowerCase();

        if (key === 'all' || key === '' || cat === key) {
          // إظهار المشروع بلطف
          proj.style.display = 'flex';
          // مستخدم للانتقالات CSS: اجعل opacity/transform قابلة للتغيير إن أردت
          setTimeout(() => {
            proj.style.opacity = '1';
            proj.style.transform = 'translateY(0)';
          }, 30);
        } else {
          // إخفاء المشروع بلطف
          proj.style.opacity = '0';
          proj.style.transform = 'translateY(20px)';
          // بعد الانيميشن أخفيه من الفلو لتجنب فراغ
          setTimeout(() => {
            proj.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // تفعيل تاب افتراضى لو مش موجود
  if (!document.querySelector('.tab.active') && tabs[0]) {
    tabs[0].classList.add('active');
  }
});



// mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  if(open){
    mainNav.style.display = 'block';
  } else {
    mainNav.style.display = '';
  }
});

// smooth reveal on scroll
const sections = document.querySelectorAll('.section');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // optionally unobserve for performance:
      io.unobserve(e.target);
    }
  });
},{threshold: 0.15});

sections.forEach(s => io.observe(s));

// set current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const ya = document.getElementById('year');
  if(ya) ya.textContent = new Date().getFullYear();
});

// optional: highlight active nav link on scroll
const navLinks = document.querySelectorAll('.nav-link');
function setActiveLink(){
  let index = sections.length;
  while(--index && window.scrollY + 120 < sections[index].offsetTop) {}
  navLinks.forEach(link => link.classList.remove('active'));
  const id = sections[index].id;
  const link = document.querySelector('.nav a[href="#' + id + '"]');
  if(link) link.classList.add('active');
}
setActiveLink();
window.addEventListener('scroll', setActiveLink);
// contact 
// Contact Form Submit
const form = document.getElementById('contactForm');
const messageEl = document.getElementById('formMessage');

form.addEventListener('submit', e => {
  e.preventDefault();
  messageEl.textContent = "Your message has been sent! ✅";
  messageEl.style.color = "#e94560";

  // Reset form after 3 seconds
  setTimeout(() => {
    form.reset();
    messageEl.textContent = "";
  }, 3000);
});
