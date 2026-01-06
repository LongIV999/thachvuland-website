/**
 * THACHVULAND 2026 - Main JavaScript
 * Handles all interactions, animations, and dynamic features
 */

// ============================================
// PAGE LOAD & INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initPageTransition();
    renderProjects(); // Render content before Swiper
    renderNews(); // Render news cards
    initNewsDetail(); // Initialize news detail page if on that page
    initHeader();
    initMobileMenu();
    initHeroBackground();
    initSwiper();
    initFloorPlanSlider();
    initAOS();
    initGSAP();
    initParallax();
    initSmoothScroll();
    initLazyLoading();
    initInvestmentCalculator();
});

// ============================================
// PAGE TRANSITION
// ============================================

function initPageTransition() {
    const pageTransition = document.getElementById('pageTransition');

    // Hide loader after page loads
    window.addEventListener('load', function () {
        setTimeout(() => {
            pageTransition.classList.add('hidden');
        }, 500);
    });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================

function initHeader() {
    const header = document.getElementById('siteHeader');
    let lastScroll = 0;

    window.addEventListener('scroll', debounce(function () {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when scrolling down
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, 10));
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuLinks = mobileMenu.querySelectorAll('a');

    // Toggle menu function
    function toggleMenu() {
        const isActive = mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    // Toggle menu on click
    menuToggle.addEventListener('click', toggleMenu);

    // Keyboard support for menu toggle
    menuToggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            menuToggle.focus(); // Return focus to toggle button
        }
    });
}

// ============================================
// HERO BACKGROUND ANIMATION (3D Particles)
// ============================================

function initHeroBackground() {
    const heroBackground = document.getElementById('heroBackground');

    // Check if heroBackground exists and Three.js is available
    if (!heroBackground) return;
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded, using fallback background');
        return;
    }

    try {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        heroBackground.appendChild(renderer.domElement);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xC5A059,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        // Mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 3;

        // Animation
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        function animate() {
            requestAnimationFrame(animate);

            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x = mouseY * 0.1;
            particlesMesh.rotation.y += mouseX * 0.01;

            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

    } catch (error) {
        console.error('Error initializing 3D background:', error);
    }
}

// ============================================
// DATA RENDERING (COMPONENT-DRIVEN)
// ============================================

function renderProjects() {
    const wrapper = document.getElementById('projectSliderWrapper');
    if (!wrapper || typeof projectData === 'undefined') return;

    wrapper.innerHTML = projectData.map(project => `
        <div class="swiper-slide">
            <div class="project-card glass-morphism">
                <div class="project-aurora-glow"></div>
                <div class="project-card-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <span class="project-card-badge neon-glow">${project.status}</span>
                </div>
                <div class="project-card-content">
                    <h3 class="project-card-title text-gradient">${project.title}</h3>
                    <div class="project-card-meta">
                        <div class="project-card-meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${project.location}</span>
                        </div>
                        ${project.specs ? `
                        <div class="project-card-meta-item">
                            <i class="fas fa-building"></i>
                            <span>${project.specs}</span>
                        </div>` : ''}
                        ${project.time ? `
                        <div class="project-card-meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${project.time}</span>
                        </div>` : ''}
                        ${project.price ? `
                        <div class="project-card-meta-item">
                            <i class="fas fa-dollar-sign"></i>
                            <span>${project.price}</span>
                        </div>` : ''}
                    </div>
                    <a href="${project.link}" class="btn-ghost">${project.cta} <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// NEWS RENDERING
// ============================================

function renderNews() {
    const newsGrid = document.getElementById('newsGrid');
    const newsListContainer = document.getElementById('newsListContainer'); // For news.html

    if (!newsGrid && !newsListContainer) return;
    if (typeof newsData === 'undefined') return;

    // On Homepage, show only latest 3. On News page, show all.
    const isHomepage = !!newsGrid;
    const displayData = isHomepage ? newsData.slice(0, 3) : newsData;
    const targetContainer = newsGrid || newsListContainer;

    targetContainer.innerHTML = displayData.map((news, index) => `
        <article class="news-card glass-morphism" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
            <div class="news-card-image">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
                <span class="news-card-category">${news.category}</span>
                <span class="news-card-date">${news.date}</span>
            </div>
            <div class="news-card-content">
                <h3 class="news-card-title">${news.title}</h3>
                <p class="news-card-excerpt">${news.excerpt}</p>
                <div class="news-card-footer">
                    <div class="news-card-author">
                        <i class="fas fa-user"></i>
                        <span>${news.author}</span>
                    </div>
                    <a href="news-detail.html?id=${news.id}" class="btn-ghost">Đọc thêm <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </article>
    `).join('');
}

function initNewsDetail() {
    const detailContainer = document.getElementById('newsDetailContainer');
    if (!detailContainer || typeof newsData === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const news = newsData.find(n => n.id === id);

    if (news) {
        // Update Page Title
        document.title = `${news.title} - Thạch Vũ Land`;

        detailContainer.innerHTML = `
            <div class="news-detail-header" data-aos="fade-up">
                <span class="news-detail-category">${news.category}</span>
                <h1 class="news-detail-title">${news.title}</h1>
                <div class="news-detail-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${news.date}</span>
                    <span><i class="fas fa-user"></i> ${news.author}</span>
                </div>
            </div>
            <div class="news-detail-featured-image" data-aos="zoom-in">
                <img src="${news.image}" alt="${news.title}">
            </div>
            <div class="news-detail-content glass-morphism" data-aos="fade-up">
                ${news.content || '<p>Nội dung đang được cập nhật...</p>'}
            </div>
            <div class="news-detail-footer" data-aos="fade-up">
                <a href="news.html" class="btn-secondary"><i class="fas fa-arrow-left"></i> Quay lại tin tức</a>
            </div>
        `;
    } else {
        detailContainer.innerHTML = `
            <div class="error-container">
                <h2>Không tìm thấy bài viết</h2>
                <p>Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.</p>
                <a href="news.html" class="btn-primary">Quay lại tin tức</a>
            </div>
        `;
    }
}

// ============================================
// SWIPER SLIDER
// ============================================

function initSwiper() {
    if (typeof Swiper === 'undefined') {
        return;
    }

    const sliderElement = document.querySelector('.projects-slider');
    if (!sliderElement) return;

    // Initialize Projects Slider
    new Swiper('.projects-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
}

// ============================================
// FLOOR PLAN SLIDER
// ============================================

function initFloorPlanSlider() {
    if (typeof Swiper === 'undefined') return;

    const floorSliderElement = document.querySelector('.floor-plans-slider');
    if (!floorSliderElement) return;

    new Swiper('.floor-plans-slider', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

// ============================================
// AOS (Animate On Scroll)
// ============================================

function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
}

// ============================================
// GSAP ANIMATIONS
// ============================================

function initGSAP() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    const heroTitle = document.querySelector('.hero-headline');
    if (heroTitle) {
        const tl = gsap.timeline();
        tl.from(heroTitle, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            delay: 0.5
        })
            .from('.hero-subtitle', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.8')
            .from('.hero-cta', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.6')
            .from('.scroll-indicator', {
                opacity: 0,
                duration: 1
            }, '-=0.4');
    }

    // Stats Bar Stagger
    if (document.querySelector('.stats-bar')) {
        gsap.from('.stat-item', {
            scrollTrigger: {
                trigger: '.stats-bar',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        });
    }

    // Section Titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Project Cards Stagger
    if (document.querySelector('.projects-slider')) {
        gsap.from('.swiper-slide', {
            scrollTrigger: {
                trigger: '.projects-slider',
                start: 'top 75%',
            },
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }

    // Service Cards Stagger
    if (document.querySelector('.services-grid')) {
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });
    }

    // Watermark Animation
    gsap.utils.toArray('.section-watermark').forEach(watermark => {
        gsap.from(watermark, {
            scrollTrigger: {
                trigger: watermark,
                start: 'top 90%',
                scrub: 1
            },
            x: -100,
            opacity: 0
        });
    });

    // CTA Parallax & Glass Card
    if (document.querySelector('.cta-section')) {
        gsap.to('.cta-parallax-bg', {
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: '-20%'
        });

        gsap.from('.cta-glass-card', {
            scrollTrigger: {
                trigger: '.cta-section',
                start: 'top 70%'
            },
            scale: 0.9,
            opacity: 0,
            duration: 1.5,
            ease: 'elastic.out(1, 0.5)'
        });
    }
}

// ============================================
// PARALLAX EFFECT
// ============================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', throttle(function () {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }, 10));
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.getElementById('siteHeader').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Add fade-in effect
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';

                    img.addEventListener('load', function () {
                        img.style.opacity = '1';
                    });

                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit function calls
 */
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

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// COUNTER ANIMATION (for stats)
// ============================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                const targetText = statNumber.textContent;
                const target = parseInt(targetText.replace(/\D/g, ''));
                const suffix = targetText.replace(/[0-9]/g, '');

                let current = 0;
                const duration = 2000;
                const increment = target / (duration / 16);

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        statNumber.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current) + suffix;
                    }
                }, 16);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe all stat items
document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// ============================================
// FORM VALIDATION (if needed)
// ============================================

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🏢 ThachVuLand 2026', 'font-size: 20px; font-weight: bold; color: #C5A059;');
console.log('%cWebsite thiết kế bởi Modern Corporate Luxury Design System', 'font-size: 12px; color: #004d40;');
console.log('%c📞 Liên hệ: 0903.469.888', 'font-size: 12px; color: #737373;');
// ============================================
// INVESTMENT CALCULATOR
// ============================================

function initInvestmentCalculator() {
    const propVal = document.getElementById('hpPropVal');
    const valDisp = document.getElementById('hpValDisplay');
    const rentPrice = document.getElementById('hpRentPrice');
    const loanPct = document.getElementById('hpLoanPct');

    if (!propVal) return; // Exit if not on page

    const yieldRes = document.getElementById('hpYieldRes');
    const annInc = document.getElementById('hpAnnualInc');
    const initCap = document.getElementById('hpInitCap');

    function calculate() {
        const price = parseFloat(propVal.value) * 1000; // to Million
        const monthlyRent = parseFloat(rentPrice.value) || 0;
        const loan = parseFloat(loanPct.value) / 100;

        const annualRent = monthlyRent * 12;
        const yield = (price > 0) ? (annualRent / price) * 100 : 0;
        const capital = (price * (1 - loan)) / 1000;

        // Update UI
        if (yieldRes) yieldRes.textContent = yield.toFixed(1) + '%';
        if (annInc) annInc.textContent = annualRent.toFixed(0) + ' Tr';
        if (initCap) initCap.textContent = capital.toFixed(1) + ' Tỷ';
        if (valDisp) valDisp.textContent = parseFloat(propVal.value).toFixed(1);
    }

    // Listeners
    propVal.addEventListener('input', calculate);
    rentPrice.addEventListener('input', calculate);
    loanPct.addEventListener('change', calculate);

    // Initial calculation
    calculate();
}
