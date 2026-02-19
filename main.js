// Spanish - Korean Word Database (MVP)
const wordDatabase = [
    { es: "Hola", ko: ["안녕", "안녕하세요"], icon: "👋" },
    { es: "Gato", ko: ["고양이"], icon: "🐱" },
    { es: "Perro", ko: ["개", "강아지"], icon: "🐶" },
    { es: "Amor", ko: ["사랑"], icon: "❤️" },
    { es: "Casa", ko: ["집"], icon: "🏠" },
    { es: "Libro", ko: ["책"], icon: "📚" },
    { es: "Agua", ko: ["물"], icon: "💧" },
    { es: "Sol", ko: ["태양", "해"], icon: "☀️" },
    { es: "Luna", ko: ["달"], icon: "🌙" },
    { es: "Flor", ko: ["꽃"], icon: "🌸" },
    { es: "Feliz", ko: ["행복", "행복한"], icon: "😊" },
    { es: "Triste", ko: ["슬픔", "슬픈"], icon: "😢" },
    { es: "Grande", ko: ["크다", "큰"], icon: "🐘" },
    { es: "Pequeño", ko: ["작다", "작은"], icon: "🐜" },
    { es: "Comer", ko: ["먹다"], icon: "🍴" },
    { es: "Dormir", ko: ["자다"], icon: "😴" },
    { es: "Amigo", ko: ["친구"], icon: "👫" },
    { es: "Familia", ko: ["가족"], icon: "👨‍👩‍👧‍👦" },
    { es: "Gracias", ko: ["감사", "감사합니다", "고마워"], icon: "🙏" },
    { es: "Por favor", ko: ["제발", "부탁합니다"], icon: "🥺" },
    { es: "Si", ko: ["네", "예"], icon: "⭕" },
    { es: "No", ko: ["아니요", "아니"], icon: "❌" },
    { es: "Buenos días", ko: ["좋은 아침", "안녕하세요"], icon: "🌅" },
    { es: "Buenas noches", ko: ["안녕히 주무세요", "좋은 밤"], icon: "🌃" },
    { es: "Manzana", ko: ["사과"], icon: "🍎" },
    { es: "Leche", ko: ["우유"], icon: "🥛" },
    { es: "Pan", ko: ["빵"], icon: "🍞" },
    { es: "Escuela", ko: ["학교"], icon: "🏫" },
    { es: "Estudiante", ko: ["학생"], icon: "🎓" },
    { es: "Profesor", ko: ["선생님", "교수"], icon: "👨‍🏫" }
];

// State
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let wrongAnswers = [];
let isReviewMode = false;

// DOM Elements
const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen')
};

const ui = {
    wordCountInput: document.getElementById('word-count'),
    startBtn: document.getElementById('start-btn'),
    questionWord: document.getElementById('question-word'),
    iconDisplay: document.querySelector('.icon-display'),
    answerInput: document.getElementById('answer-input'),
    submitBtn: document.getElementById('submit-btn'),
    nextBtn: document.getElementById('next-btn'),
    feedbackMsg: document.getElementById('feedback-msg'),
    progressFill: document.getElementById('progress-fill'),
    finalScore: document.getElementById('final-score'),
    totalCount: document.getElementById('total-count'),
    wrongList: document.getElementById('wrong-list'),
    reviewSection: document.getElementById('review-section'),
    retryBtn: document.getElementById('retry-wrong-btn'),
    restartBtn: document.getElementById('restart-btn')
};

// Event Listeners
ui.startBtn.addEventListener('click', startQuiz);
ui.submitBtn.addEventListener('click', checkAnswer);
ui.nextBtn.addEventListener('click', nextQuestion);
ui.retryBtn.addEventListener('click', startReview);
ui.restartBtn.addEventListener('click', resetApp);
ui.answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (!ui.submitBtn.classList.contains('hidden')) {
            checkAnswer();
        } else {
            nextQuestion();
        }
    }
});

// Functions
function startQuiz() {
    const count = parseInt(ui.wordCountInput.value);
    if (isNaN(count) || count < 1) {
        alert('올바른 단어 수를 입력해주세요!');
        return;
    }

    // Reset State
    score = 0;
    wrongAnswers = [];
    currentIndex = 0;
    isReviewMode = false;

    // Select Random Words
    currentQuestions = getRandomWords(Math.min(count, wordDatabase.length));
    
    showScreen('quiz');
    showQuestion();
}

function getRandomWords(count) {
    const shuffled = [...wordDatabase].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function showScreen(screenName) {
    Object.values(screens).forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    
    // Remove hidden and add active with a slight delay for transition if needed
    // For simplicity:
    screens[screenName].classList.remove('hidden');
    setTimeout(() => {
        screens[screenName].classList.add('active');
    }, 10);
}

function showQuestion() {
    const current = currentQuestions[currentIndex];
    ui.questionWord.textContent = current.es;
    ui.iconDisplay.textContent = current.icon;
    ui.answerInput.value = '';
    ui.answerInput.focus();
    
    // Reset Buttons/Feedback
    ui.submitBtn.classList.remove('hidden');
    ui.nextBtn.classList.add('hidden');
    ui.feedbackMsg.classList.add('hidden');
    ui.feedbackMsg.className = 'feedback hidden'; // Reset classes

    // Update Progress
    const progress = ((currentIndex) / currentQuestions.length) * 100;
    ui.progressFill.style.width = `${progress}%`;
}

function checkAnswer() {
    const userAnswer = ui.answerInput.value.trim().toLowerCase();
    const current = currentQuestions[currentIndex];
    const correctAnswers = current.ko; // Array

    const isCorrect = correctAnswers.some(ans => ans === userAnswer);

    ui.feedbackMsg.classList.remove('hidden');
    
    if (isCorrect) {
        score++;
        ui.feedbackMsg.textContent = "✅ 정답입니다! (Correct)";
        ui.feedbackMsg.classList.add('correct');
    } else {
        ui.feedbackMsg.textContent = `❌ 오답입니다! 정답은: ${correctAnswers.join(', ')}`;
        ui.feedbackMsg.classList.add('wrong');
        // Add to wrong answers if not already there (for review)
        if (!wrongAnswers.includes(current)) {
            wrongAnswers.push(current);
        }
    }

    ui.submitBtn.classList.add('hidden');
    ui.nextBtn.classList.remove('hidden');
    ui.nextBtn.focus();
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    showScreen('result');
    ui.finalScore.textContent = score;
    ui.totalCount.textContent = currentQuestions.length;

    // Review Section Logic
    ui.wrongList.innerHTML = '';
    if (wrongAnswers.length > 0) {
        ui.reviewSection.classList.remove('hidden');
        wrongAnswers.forEach(word => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${word.es} ${word.icon}</span> <span>${word.ko[0]}</span>`;
            ui.wrongList.appendChild(li);
        });
    } else {
        ui.reviewSection.classList.add('hidden');
    }
}

function startReview() {
    if (wrongAnswers.length === 0) return;

    // Setup review session
    currentQuestions = [...wrongAnswers]; // Copy wrong answers
    score = 0; // Reset score for review or keep it? Usually reset.
    currentIndex = 0;
    wrongAnswers = []; // Clear wrong answers to track new mistakes in review
    isReviewMode = true;

    showScreen('quiz');
    showQuestion();
}

function resetApp() {
    showScreen('start');
}
