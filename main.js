document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor ---
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const hoverLinks = document.querySelectorAll('.hover-link, a, button, input, textarea, select');

    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding a slight delay for the outline for a smooth trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        hoverLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('cursor-hover');
            });
            link.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('cursor-hover');
            });
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Hero Slider ---
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds per slide

    const nextSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        
        // If it's a video slide, play it from start
        const video = slides[currentSlide].querySelector('video');
        if (video) {
            video.currentTime = 0;
            video.play();
        }
    };

    // Auto advance slides
    setInterval(nextSlide, slideInterval);


    // --- Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a counter, animate it
                if (entry.target.classList.contains('about-content')) {
                    startCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));


    // --- Animated Counters ---
    let countersStarted = false;
    const startCounters = () => {
        if (countersStarted) return;
        countersStarted = true;
        
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // lower is slower

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Lower inc to slow and higher to fast
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };


    // --- Parallax Effect ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxImg = document.querySelector('.parallax-img img');
        
        if (parallaxImg) {
            const val = scrolled * 0.1;
            parallaxImg.style.transform = `translateY(${val}px) scale(1.1)`;
        }
    });


    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.grid-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = item.getAttribute('href');
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden'; // prevent scrolling
        });
    });

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
    
    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending...';
            btn.style.opacity = '0.7';
            
            // Simulate form submission
            setTimeout(() => {
                btn.innerHTML = '<i class="ph ph-check"></i> Sent Successfully';
                btn.style.backgroundColor = '#25D366'; // Success green
                btn.style.color = '#fff';
                btn.style.opacity = '1';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style = '';
                }, 3000);
            }, 1500);
        });
    }
});
