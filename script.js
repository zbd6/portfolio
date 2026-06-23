/* ============================================================
   Portfolio - Zoubida BENHABIB
   Scripts du site (navigation, animations, filtres, formulaire,
   modale projets). Déplacé depuis index.html.
   ============================================================ */

/* ---- Navigation : menu mobile, effet scroll, lien actif ---- */
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', function () {
        mobileMenu.classList.add('open');
        menuToggle.classList.add('menu-open');
    });

    closeMenu.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('menu-open');
    });

    // Mobile nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('open');
            menuToggle.classList.remove('menu-open');
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('py-2', 'shadow-lg', 'shadow-black/20');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('py-2', 'shadow-lg', 'shadow-black/20');
            header.classList.add('py-4');
        }

        lastScrollY = window.scrollY;
    });

    // Active nav link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

/* ---- Animations : reveal au scroll + particules ---- */
document.addEventListener('DOMContentLoaded', function () {
    // Scroll animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const checkIfInView = () => {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            // Element is partially visible
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    // Check on load
    checkIfInView();

    // Check on scroll
    window.addEventListener('scroll', checkIfInView);

    // Particles animation
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;

        // Random animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.animation = `float ${duration}s ${delay}s infinite alternate ease-in-out`;

        particlesContainer.appendChild(particle);
    }
});

/* ---- Filtres des projets ---- */
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-primary', 'text-white');
                btn.classList.add('bg-[#1A1A1A]');
            });

            // Add active class to clicked button
            button.classList.add('active', 'bg-primary', 'text-white');
            button.classList.remove('bg-[#1A1A1A]');

            const filter = button.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

/* ---- Formulaire de contact ---- */
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            alert('Veuillez remplir tous les champs du formulaire.');
            return;
        }

        // Here you would normally send the form data to a server
        // For demo purposes, we'll just show a success message
        alert('Merci pour votre message ! Je vous répondrai dès que possible.');

        // Reset form
        contactForm.reset();
    });
});

/* ---- Modale de détails des projets ---- */
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalDetails = document.getElementById('modal-details');
    const modalLink = document.getElementById('modal-link');
    const cards = document.querySelectorAll('.project-card');

    function openModal(card) {
        const img = card.querySelector('img');
        const badge = card.querySelector('.absolute.top-3.right-3');
        const title = card.querySelector('h3');
        const desc = card.querySelector('p.text-gray-400');
        const tags = card.querySelector('.flex.flex-wrap.gap-2');
        const details = card.querySelector('.project-details');
        const link = card.querySelector('a');

        modalImage.src = img ? img.getAttribute('src') : '';
        modalImage.alt = img ? img.getAttribute('alt') : '';
        modalBadge.textContent = badge ? badge.textContent.trim() : '';
        modalTitle.textContent = title ? title.textContent.trim() : '';
        modalDesc.textContent = desc ? desc.textContent.trim() : '';
        modalTags.innerHTML = tags ? tags.innerHTML : '';
        modalDetails.innerHTML = details ? details.innerHTML : '';

        if (link) {
            modalLink.setAttribute('href', link.getAttribute('href'));
            if (link.hasAttribute('download')) {
                modalLink.setAttribute('download', '');
            } else {
                modalLink.removeAttribute('download');
            }
            modalLink.style.display = (link.getAttribute('href') === '#') ? 'none' : 'inline-block';
        }

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    cards.forEach(card => {
        card.classList.add('is-clickable');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');

        // Hint visuel "cliquer pour les détails"
        const imageWrap = card.querySelector('.relative.h-48');
        if (imageWrap) {
            const hint = document.createElement('div');
            hint.className = 'card-hint';
            hint.innerHTML = '<i class="ri-add-line"></i> Détails';
            imageWrap.appendChild(hint);
        }

        card.addEventListener('click', function (e) {
            // Laisser le lien "Voir le projet" fonctionner normalement
            if (e.target.closest('a')) return;
            openModal(card);
        });

        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card);
            }
        });
    });

    modal.querySelectorAll('[data-close]').forEach(el => {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
});
