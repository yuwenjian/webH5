document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mainHeader = document.querySelector('.main-header');

    // 汉堡菜单点击事件
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            mobileMenu.classList.toggle('is-active');
        });
    }

    // 点击移动菜单链接后关闭菜单
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            mobileMenu.classList.remove('is-active');
        });
    });

    // 页面滚动时给导航栏添加背景
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            mainHeader.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            mainHeader.style.backdropFilter = 'blur(10px)';
        } else {
            mainHeader.style.backgroundColor = 'var(--white-color)';
            mainHeader.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            mainHeader.style.backdropFilter = 'none';
        }
    });

    // 为元素添加进入视口时的动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.hero-text, .hero-image, .feature-item, .showcase-gallery img');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// 在CSS中添加动画效果
const style = document.createElement('style');
style.innerHTML = `
    .hero-text, .hero-image, .feature-item, .showcase-gallery img {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .hero-text.in-view, .hero-image.in-view, .feature-item.in-view, .showcase-gallery img.in-view {
        opacity: 1;
        transform: translateY(0);
    }

    .feature-item:nth-child(2).in-view { transition-delay: 0.1s; }
    .feature-item:nth-child(3).in-view { transition-delay: 0.2s; }
    .feature-item:nth-child(4).in-view { transition-delay: 0.3s; }

    .showcase-gallery img:nth-child(2).in-view { transition-delay: 0.1s; }
    .showcase-gallery img:nth-child(3).in-view { transition-delay: 0.2s; }
`;
document.head.appendChild(style); 