// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Header background on scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// Form submission
const orderForm = document.getElementById('orderForm');

if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(orderForm);
        const data = Object.fromEntries(formData);

        // Show success message
        showNotification('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.', 'success');

        // Reset form
        orderForm.reset();

        // Log data to console (в реальном проекте здесь была бы отправка на сервер)
        console.log('Данные заказа:', data);
    });
}

// Notification function
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f5576c'};
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 3.5s;
        min-width: 300px;
    `;

    // Add to body
    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .notification-icon {
        width: 24px;
        height: 24px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// Parallax effect for gradient orbs
window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and portfolio items
document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Play button interaction
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const playButton = item.querySelector('.play-button');
        playButton.textContent = playButton.textContent === '▶' ? '⏸' : '▶';

        // Show notification
        const title = item.querySelector('h3').textContent;
        showNotification(`Воспроизведение: ${title}`, 'success');
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = '7' + value.substring(1);
            } else {
                value = '7' + value;
            }
        }

        let formatted = '+7';
        if (value.length > 1) {
            formatted += ' (' + value.substring(1, 4);
        }
        if (value.length >= 5) {
            formatted += ') ' + value.substring(4, 7);
        }
        if (value.length >= 8) {
            formatted += '-' + value.substring(7, 9);
        }
        if (value.length >= 10) {
            formatted += '-' + value.substring(9, 11);
        }

        e.target.value = formatted;
    });
}

// Add loading animation to submit button
const submitBtn = orderForm?.querySelector('button[type="submit"]');
if (submitBtn) {
    submitBtn.addEventListener('click', function() {
        if (orderForm.checkValidity()) {
            this.innerHTML = '<span class="loading-spinner"></span> Отправка...';
            this.disabled = true;

            setTimeout(() => {
                this.innerHTML = 'Отправить заявку';
                this.disabled = false;
            }, 2000);
        }
    });
}

// Add spinner styles
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinnerStyle);