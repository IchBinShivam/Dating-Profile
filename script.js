// Configuration
const CONFIG = {
    formEndpoint: 'https://formspree.io/f/mkgoqnjd',
    minPercentage: 91,
    maxPercentage: 100,
    animationDuration: 500,
    resultMessages: [
        "Our connection transcends space and time! 🌌",
        "Destiny's masterpiece! 🎨",
        "Two halves of one eternal soul! 💞",
        "The stars aligned just for us! ✨",
        "A love written in cosmic dust! 🌠"
    ],
    emojis: ['💋', '💖', '💌', '💕', '💞'],
    fireworkColors: ['#ff1493', '#ff69b4', '#ff00ff', '#ff0066']
};

// DOM Elements
const dom = {
    form: document.getElementById('secretNameForm'),
    nameInput: document.getElementById('userName'),
    resultSection: document.getElementById('compatibilityResult'),
    resultText: document.getElementById('compatibilityText'),
    progressBar: document.getElementById('loveProgress'),
    fireworks: document.getElementById('fireworks')
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initializeLoveCalculator();
});

// Love Calculator Functions
const initializeLoveCalculator = () => {
    dom.form.addEventListener('submit', handleFormSubmission);
};

const handleFormSubmission = async (event) => {
    event.preventDefault();
    const userName = dom.nameInput.value.trim();

    if (!userName) {
        showError("Please enter your beautiful name first! 💖");
        return;
    }

    try {
        await submitNameToServer(userName);
        showCompatibilityResult(userName);
        transitionToResultView();
        addKissButton(); // Add kiss button after showing results
    } catch (error) {
        console.error('Submission error:', error);
        showCompatibilityResult(userName);
        showError("Our connection is too strong for technical difficulties! 💪");
    }
};

const showCompatibilityResult = (userName) => {
    const percentage = generateLovePercentage();
    const message = getRandomRomanticMessage();

    dom.progressBar.style.width = `${percentage}%`;
    dom.resultText.innerHTML = createResultHTML(userName, percentage, message);
    dom.resultSection.classList.remove('hidden');
    scrollToResultAfterDelay();
};

// Kiss Effect Functions
const addKissButton = () => {
    const kissButton = document.createElement('button');
    kissButton.className = 'kiss-btn';
    kissButton.innerHTML = '💋 Send Virtual Kiss';
    kissButton.addEventListener('click', handleKissClick);
    dom.resultSection.appendChild(kissButton);
};

const handleKissClick = (e) => {
    createFireworks(e);
    createKissBubbles();
    animateKissButton(e.target);
};

const createKissBubbles = () => {
    const bubbleCount = 30;
    
    for(let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'kiss-bubble';
        bubble.innerHTML = CONFIG.emojis[Math.floor(Math.random() * CONFIG.emojis.length)];
        
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${3 + Math.random() * 3}s`;
        bubble.style.fontSize = `${20 + Math.random() * 30}px`;
        bubble.style.animationDelay = `${Math.random() * 1}s`;
        
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 4000);
    }
};

const animateKissButton = (button) => {
    button.innerHTML = '💋💖 Kisses Flying! 💖💋';
    setTimeout(() => {
        button.innerHTML = '💋 Send Virtual Kiss';
    }, 2000);
};

// Fireworks Functions
const createFireworks = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.style.backgroundColor = CONFIG.fireworkColors[Math.floor(Math.random() * CONFIG.fireworkColors.length)];
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 3 + Math.random() * 5;
        particle.style.setProperty('--tx', `${Math.cos(angle) * velocity * 50}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * velocity * 50}px`);

        dom.fireworks.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
};

// Helper Functions
const generateLovePercentage = () => 
    Math.floor(Math.random() * (CONFIG.maxPercentage - CONFIG.minPercentage + 1)) + CONFIG.minPercentage;

const getRandomRomanticMessage = () => 
    CONFIG.resultMessages[Math.floor(Math.random() * CONFIG.resultMessages.length)];

const createResultHTML = (name, percentage, message) => `
    <span class="heart">💖</span> 
    ${sanitizeInput(name)} & Shivam: ${percentage}% 💖<br>
    <div class="romantic-message">"${message}"</div>
`;

const scrollToResultAfterDelay = () => 
    setTimeout(() => dom.resultSection.scrollIntoView({ behavior: 'smooth' }), CONFIG.animationDuration);

const transitionToResultView = () => {
    document.body.classList.add('form-submitted');
    dom.form.reset();
};

const submitNameToServer = async (name) => {
    const response = await fetch(CONFIG.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            secretAdmirer: name,
            page: "Valentine's Love Calculator",
            timestamp: new Date().toISOString()
        })
    });
    if (!response.ok) throw new Error('Server response not OK');
};

const showError = (message) => {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    dom.form.parentNode.insertBefore(errorElement, dom.form.nextSibling);
    setTimeout(() => errorElement.remove(), 3000);
};

const sanitizeInput = (input) => 
    input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
let currentSlide = 0;
const slides = document.querySelectorAll('.date-slide');
const dots = document.querySelectorAll('.dot');

// Function to show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Function to move to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Automatically move to the next slide every 5 seconds
setInterval(nextSlide, 3500);

// Add click event listeners to dots for manual navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});
let noCount = 0;
const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const questionCard = document.querySelector('.question-card');
const flipContent = document.querySelector('.flip-content');

noButton.addEventListener('click', () => {
    noCount++;
    if (noCount === 1) {
        alert("Are you sure? Reconsider, please! 😢");
    } else if (noCount === 2) {
        alert("I'll be really sad if you say no again! 🥺");
    } else if (noCount === 3) {
        alert("Okay, fine. But you'll have to catch the 'No' button now! 😏");
        makeButtonRun();
    }
});

yesButton.addEventListener('click', () => {
    questionCard.classList.add('flipped');
    flipContent.classList.remove('hidden');
});

function makeButtonRun() {
    const button = document.getElementById('noButton');
    const container = document.querySelector('.button-container');
    const containerRect = container.getBoundingClientRect();

    button.style.position = 'absolute';
    button.style.transition = 'all 0.2s';
    button.classList.add('running');

    button.addEventListener('mouseover', () => {
        const randomX = Math.random() * (containerRect.width - button.offsetWidth);
        const randomY = Math.random() * (containerRect.height - button.offsetHeight);
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;
    });
}
