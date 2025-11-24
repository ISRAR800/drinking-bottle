// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
window.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .feature-card, .locator-content, .about-content, .contact-content');
    animateElements.forEach(el => observer.observe(el));
});

// Product button interactions
document.querySelectorAll('.product-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the product card
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Show product details (simulated)
        showProductDetails(productName);
    });
});

// Check Button Features Functionality
function initializeCheckFeatures() {
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    const checkAllBtn = document.getElementById('checkAllBtn');
    const uncheckAllBtn = document.getElementById('uncheckAllBtn');
    const verifyBtn = document.getElementById('verifyBtn');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const verificationResult = document.getElementById('verificationResult');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');

    // Update progress function
    function updateProgress() {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.custom-checkbox:checked').length;
        const percentage = (checked / total) * 100;
        
        progressFill.style.width = percentage + '%';
        progressText.textContent = `${checked}/${total} features checked`;
        
        // Change progress bar color based on completion
        if (percentage === 100) {
            progressFill.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
        } else if (percentage >= 75) {
            progressFill.style.background = 'linear-gradient(90deg, #FF9800, #FFC107)';
        } else if (percentage >= 50) {
            progressFill.style.background = 'linear-gradient(90deg, #2196F3, #03A9F4)';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, #9C27B0, #673AB7)';
        }
    }

    // Add click sound effect (simulated)
    function playCheckSound() {
        // Create a visual feedback instead of actual sound
        const soundWave = document.createElement('div');
        soundWave.classList.add('sound-wave');
        document.body.appendChild(soundWave);
        
        setTimeout(() => {
            soundWave.remove();
        }, 300);
    }

    // Checkbox change event
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateProgress();
            playCheckSound();
            
            // Add animation to the checked item
            if (this.checked) {
                const label = this.nextElementSibling;
                label.style.animation = 'checkPulse 0.5s ease';
                setTimeout(() => {
                    label.style.animation = '';
                }, 500);
            }
        });
    });

    // Check all button
    checkAllBtn.addEventListener('click', function() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        updateProgress();
        showNotification('✅ All features checked!');
        
        // Add animation to button
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // Uncheck all button
    uncheckAllBtn.addEventListener('click', function() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        updateProgress();
        showNotification('🔄 All features reset!');
        
        // Add animation to button
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // Verify button
    verifyBtn.addEventListener('click', function() {
        const checked = document.querySelectorAll('.custom-checkbox:checked').length;
        const total = checkboxes.length;
        
        // Add loading animation
        this.innerHTML = '🔍 Verifying...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = 'Verify Selection';
            this.disabled = false;
            
            if (checked === total) {
                // All features checked
                resultIcon.textContent = '🎉';
                resultTitle.textContent = 'Excellent Choice!';
                resultMessage.textContent = `You've selected all ${total} premium features. You're ready to experience the best water service!`;
                verificationResult.style.background = 'rgba(76, 175, 80, 0.2)';
                verificationResult.style.borderColor = '#4CAF50';
                showNotification('🎉 Perfect! All features verified!');
            } else if (checked >= total * 0.75) {
                // 75% or more checked
                resultIcon.textContent = '👍';
                resultTitle.textContent = 'Great Selection!';
                resultMessage.textContent = `You've selected ${checked} out of ${total} features. You're getting excellent value!`;
                verificationResult.style.background = 'rgba(255, 152, 0, 0.2)';
                verificationResult.style.borderColor = '#FF9800';
                showNotification('👍 Great! Most features selected!');
            } else if (checked >= total * 0.5) {
                // 50% or more checked
                resultIcon.textContent = '✅';
                resultTitle.textContent = 'Good Start!';
                resultMessage.textContent = `You've selected ${checked} out of ${total} features. Consider adding more for better experience!`;
                verificationResult.style.background = 'rgba(33, 150, 243, 0.2)';
                verificationResult.style.borderColor = '#2196F3';
                showNotification('✅ Good! Keep adding more features!');
            } else if (checked > 0) {
                // Less than 50% checked
                resultIcon.textContent = '📋';
                resultTitle.textContent = 'Keep Going!';
                resultMessage.textContent = `You've selected ${checked} out of ${total} features. Add more to unlock premium benefits!`;
                verificationResult.style.background = 'rgba(156, 39, 176, 0.2)';
                verificationResult.style.borderColor = '#9C27B0';
                showNotification('📋 Add more features for better experience!');
            } else {
                // None checked
                resultIcon.textContent = '❓';
                resultTitle.textContent = 'Make Your Selection';
                resultMessage.textContent = 'Select some features to see personalized recommendations!';
                verificationResult.style.background = 'rgba(255, 255, 255, 0.1)';
                verificationResult.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                showNotification('❓ Please select some features first!');
            }
            
            // Show result with animation
            verificationResult.style.display = 'block';
            verificationResult.style.animation = 'fadeInUp 0.5s ease';
            
        }, 1500);
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes checkPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .sound-wave {
            position: fixed;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            background: rgba(76, 175, 80, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: soundWave 0.3s ease-out;
            pointer-events: none;
            z-index: 9999;
        }
        
        @keyframes soundWave {
            0% {
                width: 20px;
                height: 20px;
                opacity: 1;
            }
            100% {
                width: 60px;
                height: 60px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize progress on page load
    updateProgress();
}

// Initialize School Bottles Section
function initializeSchoolBottles() {
    const schoolButtons = document.querySelectorAll('.btn-school');
    
    schoolButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
            
            // Show notification
            const bottleName = this.closest('.school-bottle-card').querySelector('h3').textContent;
            const discountedPrice = this.closest('.school-bottle-card').querySelector('.discounted-price').textContent;
            
            showNotification(`🎒 ${bottleName} added to cart! Student price: ${discountedPrice}`, 'success');
            
            // Add to cart animation
            this.textContent = '✓ Added to Cart!';
            this.style.background = 'linear-gradient(45deg, #00b894, #00a085)';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart - 10% Off';
                this.style.background = 'linear-gradient(45deg, #00cec9, #55a3ff)';
            }, 2000);
        });
    });
    
    // Add scroll animations for school bottles
    const schoolCards = document.querySelectorAll('.school-bottle-card');
    const schoolBenefits = document.querySelectorAll('.benefit-item');
    const orderSteps = document.querySelectorAll('.step');
    
    const schoolObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state and observe elements
    [...schoolCards, ...schoolBenefits, ...orderSteps].forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        schoolObserver.observe(element);
    });
    
    // Stagger animation for cards
    schoolCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    schoolBenefits.forEach((benefit, index) => {
        benefit.style.transitionDelay = `${index * 0.15}s`;
    });
    
    orderSteps.forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.2}s`;
    });
}

// Initialize Pakistani Bottles Section
function initializePakistaniBottles() {
    const pakistaniBottleCards = document.querySelectorAll('.pakistani-bottle-card');
    const orderButtons = document.querySelectorAll('.btn-pakistani');
    
    // Add scroll animations for Pakistani bottle cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                setTimeout(() => {
                    entry.target.style.animation = 'none';
                    entry.target.style.animation = 'slideInUp 0.8s ease forwards';
                }, delay);
            }
        });
    }, observerOptions);
    
    // Initialize cards
    pakistaniBottleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        observer.observe(card);
    });
    
    // Add ripple effect to order buttons
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
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
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Get bottle info
            const card = this.closest('.pakistani-bottle-card');
            const bottleName = card.querySelector('h3').textContent;
            const bottlePrice = card.querySelector('.price').textContent;
            
            // Show notification
            showNotification(`✅ ${bottleName} added to cart for ${bottlePrice}!`, 'success');
            
            // Add to cart animation
            this.innerHTML = '<span class="cart-animation">✓ Added!</span>';
            this.style.background = 'linear-gradient(45deg, #00b894, #00cec9)';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = 'Order Now';
                this.style.background = 'linear-gradient(45deg, #00cec9, #55a3ff)';
                this.disabled = false;
            }, 2000);
        });
    });
    
    // Add hover effects to city items
    const cityItems = document.querySelectorAll('.city-item');
    cityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add floating animation to brand badges
    const brandBadges = document.querySelectorAll('.brand-badge');
    brandBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Form validation
    function validateField(field, errorId, validationFn, errorMessage) {
        const errorElement = document.getElementById(errorId);
        const value = field.value.trim();
        
        if (!validationFn(value)) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            field.style.borderColor = '#ff6b6b';
            return false;
        } else {
            errorElement.classList.remove('show');
            field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            return true;
        }
    }
    
    // Validation functions
    const validations = {
        name: (value) => value.length >= 3,
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: (value) => !value || /^[\+]?[0-9]{10,15}$/.test(value),
        subject: (value) => value !== '',
        message: (value) => value.length >= 10
    };
    
    const errorMessages = {
        name: 'Name must be at least 3 characters long',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        subject: 'Please select a subject',
        message: 'Message must be at least 10 characters long'
    };
    
    // Real-time validation
    const fields = ['name', 'email', 'phone', 'subject', 'message'];
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        field.addEventListener('blur', () => {
            validateField(field, `${fieldName}Error`, validations[fieldName], errorMessages[fieldName]);
        });
        
        field.addEventListener('input', () => {
            if (document.getElementById(`${fieldName}Error`).classList.contains('show')) {
                validateField(field, `${fieldName}Error`, validations[fieldName], errorMessages[fieldName]);
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        fields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!validateField(field, `${fieldName}Error`, validations[fieldName], errorMessages[fieldName])) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('Please fix the errors in the form', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted with data:', data);
            
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            showNotification('Message sent successfully!', 'success');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                formSuccess.style.display = 'none';
                
                // Reset button state
                submitBtn.classList.remove('loading');
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
            
            // Reset button state
            submitBtn.classList.remove('loading');
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
    
    // Social media links
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('title');
            showNotification(`Opening ${platform}...`, 'info');
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add floating animation to contact info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.style.animation = 'fadeInUp 0.6s ease forwards';
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCheckFeatures();
    initializeSchoolBottles();
    initializePakistaniBottles();
    initializeContactForm();
});

// Offer button interactions
document.querySelectorAll('.offer-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const offerCard = this.closest('.offer-card');
        const offerTitle = offerCard.querySelector('h3').textContent;
        const offerDiscount = offerCard.querySelector('.offer-discount').textContent;
        
        // Create special offer animation
        offerCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            offerCard.style.transform = '';
        }, 200);
        
        // Show specific offer notification
        if (this.textContent.includes('Shop Now')) {
            showNotification(`🛒 ${offerDiscount} Family Pack added to cart! Limited time offer applied.`, 'success');
        } else if (this.textContent.includes('Get Code')) {
            showNotification(`🎉 New customer discount code: NEW15 applied! ${offerDiscount} off your first order!`, 'success');
        } else if (this.textContent.includes('View Flavors')) {
            showNotification(`🍓 Buy 2 Get 1 Free offer activated! Choose your favorite flavors.`, 'success');
        } else if (this.textContent.includes('Subscribe')) {
            showNotification(`📦 Monthly subscription activated! ${offerDiscount} off every delivery!`, 'success');
        }
        
        // Add to cart effect
        this.textContent = '✓ Added!';
        this.style.background = '#27ae60';
        
        setTimeout(() => {
            this.textContent = this.textContent.replace('✓ Added!', this.textContent);
            this.style.background = '';
        }, 2000);
    });
});

// Countdown timer for limited time offers
function updateOfferCountdown() {
    const offerCards = document.querySelectorAll('.offer-card');
    offerCards.forEach(card => {
        const badge = card.querySelector('.offer-badge');
        if (badge && badge.textContent.includes('Limited Time')) {
            const now = new Date();
            const endTime = new Date(now.getTime() + (2 * 60 * 60 * 1000)); // 2 hours from now
            
            const timeLeft = endTime - now;
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            
            if (hours > 0 || minutes > 0) {
                badge.textContent = `Ends in ${hours}h ${minutes}m`;
                badge.style.background = '#e74c3c';
            } else {
                badge.textContent = 'Expired';
                badge.style.background = '#95a5a6';
                card.style.opacity = '0.6';
                card.style.pointerEvents = 'none';
            }
        }
    });
}

// Update countdown every minute
setInterval(updateOfferCountdown, 60000);
updateOfferCountdown(); // Initial call

// Show product details function
function showProductDetails(productName) {
    // Create modal or alert for product details
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>${productName}</h3>
            <p>Experience the pure, refreshing taste of our ${productName}. Perfectly filtered and enhanced with essential minerals for optimal hydration.</p>
            <div class="product-details">
                <h4>Features:</h4>
                <ul>
                    <li>Premium filtration process</li>
                    <li>Enhanced with essential minerals</li>
                    <li>Eco-friendly packaging</li>
                    <li>Available in multiple sizes</li>
                </ul>
            </div>
            <button class="modal-cta">Find Near You</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Find near you button
    modal.querySelector('.modal-cta').addEventListener('click', () => {
        modal.remove();
        document.querySelector('#locator').scrollIntoView({ behavior: 'smooth' });
    });
}

// Contact form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Location search functionality
document.querySelector('.search-button').addEventListener('click', function() {
    const locationInput = document.querySelector('.location-input');
    const location = locationInput.value.trim();
    
    if (!location) {
        showNotification('Please enter a location.', 'error');
        return;
    }
    
    // Simulate location search
    const searchButton = this;
    const originalText = searchButton.textContent;
    searchButton.textContent = 'Searching...';
    searchButton.disabled = true;
    
    setTimeout(() => {
        showNotification(`Found 5 stores near "${location}". Check your local retailers!`, 'success');
        searchButton.textContent = originalText;
        searchButton.disabled = false;
        locationInput.value = '';
    }, 1500);
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <span class="notification-close">&times;</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// CTA Button interaction
document.querySelector('.cta-button').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Scroll to products section
    document.querySelector('#products').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Add click animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

// About button interaction
document.querySelector('.about-button').addEventListener('click', function() {
    showNotification('Learn more about our commitment to purity and sustainability!', 'info');
});

// Add CSS for modal and notifications
const additionalStyles = `
    .product-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        position: relative;
        animation: slideUp 0.3s ease;
    }
    
    .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 2rem;
        cursor: pointer;
        color: #999;
    }
    
    .close-modal:hover {
        color: #333;
    }
    
    .product-details {
        margin: 1.5rem 0;
    }
    
    .product-details ul {
        list-style: none;
        padding-left: 0;
    }
    
    .product-details li {
        padding: 0.5rem 0;
        position: relative;
        padding-left: 1.5rem;
    }
    
    .product-details li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #0066cc;
        font-weight: bold;
    }
    
    .modal-cta {
        background: linear-gradient(135deg, #0066cc, #00a8ff);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        width: 100%;
        transition: all 0.3s ease;
    }
    
    .modal-cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 102, 204, 0.3);
    }
    
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 1500;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
    }
    
    .notification-success {
        border-left: 4px solid #27ae60;
    }
    
    .notification-error {
        border-left: 4px solid #e74c3c;
    }
    
    .notification-info {
        border-left: 4px solid #3498db;
    }
    
    .notification-close {
        cursor: pointer;
        font-size: 1.2rem;
        color: #999;
        margin-left: auto;
    }
    
    .notification-close:hover {
        color: #333;
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
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;

// Add the additional styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('PURELY website loaded successfully! 🌊');