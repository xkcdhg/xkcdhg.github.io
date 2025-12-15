// Terminal Effects for Cyberpunk Blog
// Add subtle animations and interactions

// CRT Flicker Effect
function addCRTFlicker() {
    const body = document.body;
    setInterval(() => {
        if (Math.random() > 0.97) {
            body.style.opacity = '0.95';
            setTimeout(() => {
                body.style.opacity = '1';
            }, 50);
        }
    }, 100);
}

// Matrix Rain Background (Optional - can be heavy)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typing Effect for Terminal Prompt
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Glitch Text Effect on Hover
function addGlitchEffect() {
    const links = document.querySelectorAll('.post-card h3 a');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const originalText = this.textContent;
            let glitchInterval;
            let iterations = 0;
            
            glitchInterval = setInterval(() => {
                this.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                    })
                    .join('');
                
                iterations += 1/3;
                
                if (iterations >= originalText.length) {
                    clearInterval(glitchInterval);
                    this.textContent = originalText;
                }
            }, 30);
        });
    });
}

// Console Boot Sequence
function bootSequence() {
    console.log('%c[SYSTEM] Initializing...', 'color: #00ff41; font-family: monospace;');
    console.log('%c[SYSTEM] Loading cyberpunk.css...', 'color: #00ff41; font-family: monospace;');
    setTimeout(() => {
        console.log('%c[SYSTEM] Activating matrix protocol...', 'color: #00d9ff; font-family: monospace;');
    }, 500);
    setTimeout(() => {
        console.log('%c[SYSTEM] All systems operational', 'color: #00ff41; font-family: monospace;');
        console.log('%c[SYSTEM] Welcome, user.', 'color: #00ff41; font-family: monospace;');
    }, 1000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add CRT flicker
    addCRTFlicker();
    
    // Add glitch effect to post titles
    addGlitchEffect();
    
    // Boot sequence in console
    bootSequence();
    
    // Optional: Uncomment to enable matrix rain background
    // createMatrixRain();
    
    // Typing effect for specific elements (optional)
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const originalText = typingElement.textContent;
        typeWriter(typingElement, originalText, 150);
    }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Life timer
const birthDate = new Date('2001-04-26T13:30:00+03:00');

function updateLifeTimer() {
    const now = new Date();
    const diff = now - birthDate;
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalSeconds = Math.floor(diff / 1000);

    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (hoursEl) hoursEl.textContent = totalHours.toLocaleString();
    if (minutesEl) minutesEl.textContent = totalMinutes.toLocaleString();
    if (secondsEl) secondsEl.textContent = totalSeconds.toLocaleString();
}

setInterval(updateLifeTimer, 1000);
updateLifeTimer();