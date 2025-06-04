// Custom JavaScript for Quinn's Birthday Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize animations
    initializeAnimations();
    
    // Set up smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Initialize lightbox settings
    initializeLightbox();
    
    // Add loading animations to elements
    addLoadingAnimations();
    
    // Set up navbar scroll effect
    setupNavbarEffect();
    
    // Add click animations to buttons
    setupButtonAnimations();
});

// Initialize loading animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe all story cards and gallery images
    const elementsToAnimate = document.querySelectorAll('.story-card, .gallery-img, .love-message');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Setup smooth scrolling for navigation
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const navbarToggler = document.querySelector('.navbar-toggler');
                        navbarToggler.click();
                    }
                }
            }
        });
    });
}

// Initialize lightbox with custom settings
function initializeLightbox() {
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'showImageNumberLabel': true,
            'albumLabel': 'Foto %1 van %2',
            'fadeDuration': 300,
            'imageFadeDuration': 300
        });
    }
}

// Add loading animations to elements
function addLoadingAnimations() {
    // Add staggered animation delays to gallery items
    const galleryItems = document.querySelectorAll('.gallery-img');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add animation delays to story cards
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Setup navbar scroll effect
function setupNavbarEffect() {
    const navbar = document.querySelector('.custom-navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'linear-gradient(90deg, rgba(52, 152, 219, 0.95), rgba(46, 204, 113, 0.95))';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(90deg, rgb(52, 152, 219), rgb(46, 204, 113))';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// Setup button animations
function setupButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add celebration animation when page loads
window.addEventListener('load', function() {
    // Add confetti effect to hero section
    createConfetti();
    
    // Add birthday message animation
    setTimeout(() => {
        showBirthdayMessage();
    }, 1000);
});

// Create confetti effect
function createConfetti() {
    const heroSection = document.querySelector('.hero-section');
    const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.zIndex = '1';
        
        heroSection.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Show birthday message
function showBirthdayMessage() {
    const message = document.createElement('div');
    message.innerHTML = '🏃 Quinn groeit van 2 naar 3 jaar! 🎈';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #e74c3c, #f1c40f, #2ecc71, #3498db);
        background-size: 400% 400%;
        color: white;
        padding: 20px 40px;
        border-radius: 20px;
        font-family: 'Fredoka', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        z-index: 9999;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        animation: popup 0.5s ease-out, colorfulBackground 3s ease-in-out infinite;
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 4 seconds
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease-in';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 500);
    }, 4000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
    
    @keyframes popup {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    
    @keyframes colorfulBackground {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console message
console.log(`
🏃 Quinn is 2 jaar en groeit naar 3! 
Deze website toont zijn groei - gemaakt door Papa & Mama
`);
