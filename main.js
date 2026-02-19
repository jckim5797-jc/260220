// Spanish - Korean Word Database (MVP)
const wordDatabase = [
    { es: "Hola", ko: ["안녕", "안녕하세요"], icon: "👋", example: "¡Hola! ¿Cómo estás?", hint: "인사" },
    { es: "Gato", ko: ["고양이"], icon: "🐱", example: "El gato duerme en el sofá.", hint: "야옹~ 하는 동물" },
    { es: "Perro", ko: ["개", "강아지"], icon: "🐶", example: "Mi perro es muy juguetón.", hint: "멍멍! 짖는 동물" },
    { es: "Amor", ko: ["사랑"], icon: "❤️", example: "Te tengo mucho amor.", hint: "마음, 하트" },
    { es: "Casa", ko: ["집"], icon: "🏠", example: "Mi casa es tu casa.", hint: "우리가 사는 곳" },
    { es: "Libro", ko: ["책"], icon: "📚", example: "Leo un libro interesante.", hint: "읽는 것" },
    { es: "Agua", ko: ["물"], icon: "💧", example: "Bebo mucha agua.", hint: "마시는 액체" },
    { es: "Sol", ko: ["태양", "해"], icon: "☀️", example: "El sol brilla fuerte hoy.", hint: "낮에 하늘에 떠있는 것" },
    { es: "Luna", ko: ["달"], icon: "🌙", example: "La luna está llena.", hint: "밤에 하늘에 떠있는 것" },
    { es: "Flor", ko: ["꽃"], icon: "🌸", example: "Esta flor huele bien.", hint: "식물, 예쁨" },
    { es: "Feliz", ko: ["행복", "행복한"], icon: "😊", example: "Estoy muy feliz.", hint: "기분이 좋은 상태" },
    { es: "Triste", ko: ["슬픔", "슬픈"], icon: "😢", example: "No estés triste.", hint: "기분이 우울한 상태" },
    { es: "Grande", ko: ["크다", "큰"], icon: "🐘", example: "Es un edificio grande.", hint: "작지 않음, 사이즈" },
    { es: "Pequeño", ko: ["작다", "작은"], icon: "🐜", example: "El ratón es pequeño.", hint: "크지 않음, 사이즈" },
    { es: "Comer", ko: ["먹다"], icon: "🍴", example: "Vamos a comer pizza.", hint: "음식을 섭취하다" },
    { es: "Dormir", ko: ["자다"], icon: "😴", example: "Necesito dormir 8 horas.", hint: "밤에 하는 것, 꿈나라" },
    { es: "Amigo", ko: ["친구"], icon: "👫", example: "Juan es mi mejor amigo.", hint: "친한 사이" },
    { es: "Familia", ko: ["가족"], icon: "👨‍👩‍👧‍👦", example: "Amo a mi familia.", hint: "엄마, 아빠, 나" },
    { es: "Gracias", ko: ["감사", "감사합니다", "고마워"], icon: "🙏", example: "Gracias por tu ayuda.", hint: "고마울 때 하는 말" },
    { es: "Por favor", ko: ["제발", "부탁합니다"], icon: "🥺", example: "Ayúdame, por favor.", hint: "부탁할 때 하는 말" },
    { es: "Si", ko: ["네", "예"], icon: "⭕", example: "¿Te gusta? Si, me gusta.", hint: "긍정의 대답" },
    { es: "No", ko: ["아니요", "아니"], icon: "❌", example: "No, no quiero.", hint: "부정의 대답" },
    { es: "Buenos días", ko: ["좋은 아침", "안녕하세요"], icon: "🌅", example: "Buenos días, mamá.", hint: "아침 인사" },
    { es: "Buenas noches", ko: ["안녕히 주무세요", "좋은 밤"], icon: "🌃", example: "Buenas noches, hasta mañana.", hint: "밤 인사" },
    { es: "Manzana", ko: ["사과"], icon: "🍎", example: "Me gusta la manzana roja.", hint: "빨간 과일" },
    { es: "Leche", ko: ["우유"], icon: "🥛", example: "Bebo leche con chocolate.", hint: "하얀 액체, 소가 줌" },
    { es: "Pan", ko: ["빵"], icon: "🍞", example: "Compro pan en la panadería.", hint: "베이커리에서 파는 것" },
    { es: "Escuela", ko: ["학교"], icon: "🏫", example: "Voy a la escuela en autobús.", hint: "공부하러 가는 곳" },
    { es: "Estudiante", ko: ["학생"], icon: "🎓", example: "Soy un estudiante aplicado.", hint: "학교에 다니는 사람" },
    { es: "Profesor", ko: ["선생님", "교수"], icon: "👨‍🏫", example: "El profesor enseña español.", hint: "가르치는 사람" }
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
    exampleSentence: document.getElementById('example-sentence'),
    hintBtn: document.getElementById('hint-btn'),
    hintText: document.getElementById('hint-text'),
    progressText: document.getElementById('progress-text'), // New
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
ui.hintBtn.addEventListener('click', toggleHint);

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
    
    screens[screenName].classList.remove('hidden');
    setTimeout(() => {
        screens[screenName].classList.add('active');
    }, 10);
}

function showQuestion() {
    const current = currentQuestions[currentIndex];
    ui.questionWord.textContent = current.es;
    ui.iconDisplay.textContent = current.icon;
    ui.exampleSentence.textContent = `"${current.example}"`;
    ui.hintText.textContent = current.hint;
    ui.hintText.classList.add('hidden'); // Hide hint initially
    
    ui.answerInput.value = '';
    ui.answerInput.focus();
    
    // Reset Buttons/Feedback
    ui.submitBtn.classList.remove('hidden');
    ui.nextBtn.classList.add('hidden');
    ui.feedbackMsg.classList.add('hidden');
    ui.feedbackMsg.className = 'feedback hidden';

    // Update Progress
    updateProgress();
}

function updateProgress() {
    const total = currentQuestions.length;
    const current = currentIndex + 1;
    const progress = (currentIndex / total) * 100; // Keep bar based on completed (start at 0%)
    
    ui.progressFill.style.width = `${((currentIndex) / total) * 100}%`;
    ui.progressText.textContent = `${current} / ${total}`;
}

function toggleHint() {
    ui.hintText.classList.toggle('hidden');
}

function checkAnswer() {
    const userAnswer = ui.answerInput.value.trim().toLowerCase();
    const current = currentQuestions[currentIndex];
    const correctAnswers = current.ko;

    const isCorrect = correctAnswers.some(ans => ans === userAnswer);

    ui.feedbackMsg.classList.remove('hidden');
    
    if (isCorrect) {
        score++;
        ui.feedbackMsg.textContent = "✅ 정답입니다! (Correct)";
        ui.feedbackMsg.classList.add('correct');
        // Update progress bar to reflect completion of this question
        ui.progressFill.style.width = `${((currentIndex + 1) / currentQuestions.length) * 100}%`;
    } else {
        ui.feedbackMsg.textContent = `❌ 오답입니다! 정답은: ${correctAnswers.join(', ')}`;
        ui.feedbackMsg.classList.add('wrong');
        if (!wrongAnswers.includes(current)) {
            wrongAnswers.push(current);
        }
        ui.progressFill.style.width = `${((currentIndex + 1) / currentQuestions.length) * 100}%`;
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

    currentQuestions = [...wrongAnswers];
    score = 0;
    currentIndex = 0;
    wrongAnswers = [];
    isReviewMode = true;

    showScreen('quiz');
    showQuestion();
}

function resetApp() {
    showScreen('start');
}