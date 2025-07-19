document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("gTkebkZwBUh-MNMDO");
    
    // Initialize first page
    showPage(1);
    
    // Navigation handling
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href').replace('#page-', '');
            goToPage(parseInt(targetPage));
        });
    });
    
    // Contact form handling with EmailJS
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.send('service_j37gzwv', 'template_7ynejb9', {
                name: name,           // matches {{name}} in template
                email: email,         // matches {{email}} in template  
                message: message      // matches {{message}} in template
            })
            .then(function(response) {
                alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon!`);
                contactForm.reset();
                console.log('SUCCESS!', response.status, response.text);
            })
            .catch(function(error) {
                alert('Sorry, there was an error sending your message. Please try again or contact me directly at tawhidurrahman830@gmail.com');
                console.error('EmailJS error:', error);
            })
            .finally(function() {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            prevPage();
        }
    });
});

// Page navigation functions
function goToPage(pageNumber) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    
    // Show target page
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.style.display = 'block';
    }
    
    // Update navigation
    updateNavigation(pageNumber);
    
    // Store current page
    currentPage = pageNumber;
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function showPage(pageNumber) {
    goToPage(pageNumber);
}

function updateNavigation(activePageNumber) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
        link.classList.remove('active');
        if (index + 1 === activePageNumber) {
            link.classList.add('active');
        }
    });
}

let currentPage = 1;

function nextPage() {
    if (currentPage < 6) {
        goToPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}