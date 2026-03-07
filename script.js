// Terminal typing effect
const terminalText = [
    "Initializing secure shell...",
    "User detected: SOURABH_DAS_P_M",
    "Current Node: C3iHub_IIT_Kanpur",
    "Status: [Red Team | DFIR | CEH_v13]",
    "Access granted. Welcome to Command Center.",
    "---------------------------------------"
];

const terminalElement = document.getElementById('terminal-text');
let lineIndex = 0;
let charIndex = 0;

function typeLine() {
    if (lineIndex < terminalText.length) {
        if (charIndex < terminalText[lineIndex].length) {
            terminalElement.innerHTML += terminalText[lineIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeLine, 30);
        } else {
            terminalElement.innerHTML += '<br>';
            lineIndex++;
            charIndex = 0;
            setTimeout(typeLine, 500);
        }
    }
}

// Background Matrix/Node Effect
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.fillStyle = '#00ff41';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines between nearby particles
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}

// Scroll reveal
const sections = document.querySelectorAll('section');
const revealSection = () => {
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.8) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealSection);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    typeLine();
    animate();
    revealSection();
});
