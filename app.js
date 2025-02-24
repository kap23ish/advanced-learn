// Game state
let userProgress = {
    level: 1,
    experience: 0,
    achievements: [],
    completedChallenges: []
};

// Vocabulary database
const vocabularyDB = {
    beginner: [
        { word: "hello", translation: "hola", category: "greetings" },
        { word: "goodbye", translation: "adiós", category: "greetings" },
        { word: "thank you", translation: "gracias", category: "greetings" },
        { word: "please", translation: "por favor", category: "greetings" },
        { word: "good morning", translation: "buenos días", category: "greetings" },
        { word: "good night", translation: "buenas noches", category: "greetings" }
    ],
    intermediate: [
        { word: "achievement", translation: "logro", category: "education" },
        { word: "challenge", translation: "desafío", category: "education" },
        { word: "language", translation: "idioma", category: "education" },
        { word: "learning", translation: "aprendizaje", category: "education" }
    ]
};

// Track current card index
let currentCardIndex = 0;

// Game modes
function startGame(mode) {
    switch(mode) {
        case 'flashcards':
            startFlashcards();
            break;
        case 'matching':
            startMatching();
            break;
        case 'quiz':
            startQuiz();
            break;
    }
}

// Update the vocabulary database to include more words
function generateMoreVocabulary(language) {
    const baseVocab = vocabularyData[language].beginner;
    const extendedVocab = [
        ...baseVocab,
        { word: "city", translation: getTranslation(language, "city"), category: "places" },
        { word: "street", translation: getTranslation(language, "street"), category: "places" },
        { word: "beach", translation: getTranslation(language, "beach"), category: "places" },
        { word: "mountain", translation: getTranslation(language, "mountain"), category: "nature" },
        { word: "weather", translation: getTranslation(language, "weather"), category: "nature" },
        { word: "rain", translation: getTranslation(language, "rain"), category: "nature" },
        { word: "snow", translation: getTranslation(language, "snow"), category: "nature" },
        { word: "hot", translation: getTranslation(language, "hot"), category: "descriptions" },
        { word: "cold", translation: getTranslation(language, "cold"), category: "descriptions" },
        { word: "money", translation: getTranslation(language, "money"), category: "basics" },
        { word: "work", translation: getTranslation(language, "work"), category: "activities" },
        { word: "office", translation: getTranslation(language, "office"), category: "places" },
        { word: "home", translation: getTranslation(language, "home"), category: "places" },
        { word: "apartment", translation: getTranslation(language, "apartment"), category: "places" },
        { word: "clothes", translation: getTranslation(language, "clothes"), category: "objects" },
        { word: "shoes", translation: getTranslation(language, "shoes"), category: "objects" },
        { word: "food", translation: getTranslation(language, "food"), category: "food" },
        { word: "drink", translation: getTranslation(language, "drink"), category: "food" },
        { word: "coffee", translation: getTranslation(language, "coffee"), category: "food" },
        { word: "milk", translation: getTranslation(language, "milk"), category: "food" },
        { word: "bread", translation: getTranslation(language, "bread"), category: "food" },
        { word: "meat", translation: getTranslation(language, "meat"), category: "food" },
        { word: "fruit", translation: getTranslation(language, "fruit"), category: "food" },
        { word: "vegetable", translation: getTranslation(language, "vegetable"), category: "food" },
        { word: "music", translation: getTranslation(language, "music"), category: "entertainment" }
    ];
    return extendedVocab;
}

// Add translations for each language
const translations = {
    spanish: {
        water: "agua", food: "comida", house: "casa", car: "coche", book: "libro",
        phone: "teléfono", computer: "computadora", friend: "amigo", family: "familia",
        time: "tiempo", day: "día", night: "noche", sun: "sol", moon: "luna",
        star: "estrella", tree: "árbol", flower: "flor", dog: "perro", cat: "gato",
        bird: "pájaro", fish: "pez", school: "escuela", teacher: "profesor",
        student: "estudiante", doctor: "médico", hospital: "hospital",
        restaurant: "restaurante", store: "tienda", market: "mercado", airport: "aeropuerto",
        city: "ciudad", street: "calle", beach: "playa", mountain: "montaña",
        weather: "clima", rain: "lluvia", snow: "nieve", hot: "caliente",
        cold: "frío", money: "dinero", work: "trabajo", office: "oficina",
        home: "hogar", apartment: "apartamento", clothes: "ropa",
        shoes: "zapatos", drink: "bebida", coffee: "café", milk: "leche",
        bread: "pan", meat: "carne", fruit: "fruta", vegetable: "verdura",
        music: "música"
    },
    // Add translations for other languages...
};

// Add translations for other languages
const additionalTranslations = {
    french: {
        city: "ville", street: "rue", beach: "plage", mountain: "montagne",
        weather: "temps", rain: "pluie", snow: "neige", hot: "chaud",
        cold: "froid", money: "argent", work: "travail", office: "bureau",
        home: "maison", apartment: "appartement", clothes: "vêtements",
        shoes: "chaussures", food: "nourriture", drink: "boisson",
        coffee: "café", milk: "lait", bread: "pain", meat: "viande",
        fruit: "fruit", vegetable: "légume", music: "musique"
    },
    german: {
        city: "Stadt", street: "Straße", beach: "Strand", mountain: "Berg",
        weather: "Wetter", rain: "Regen", snow: "Schnee", hot: "heiß",
        cold: "kalt", money: "Geld", work: "Arbeit", office: "Büro",
        home: "Zuhause", apartment: "Wohnung", clothes: "Kleidung",
        shoes: "Schuhe", food: "Essen", drink: "Getränk",
        coffee: "Kaffee", milk: "Milch", bread: "Brot", meat: "Fleisch",
        fruit: "Obst", vegetable: "Gemüse", music: "Musik"
    }
    // Add similar blocks for other languages...
};

// Update the translations object with the new words
Object.keys(additionalTranslations).forEach(language => {
    translations[language] = {
        ...translations[language],
        ...additionalTranslations[language]
    };
});

function getTranslation(language, word) {
    return translations[language]?.[word] || word;
}

// Update the flashcard display
function startFlashcards() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="game-container flashcards">
            <h2>Flashcards</h2>
            <div class="flashcard-progress">
                Card ${currentCardIndex + 1} of ${vocabularyDB.beginner.length}
            </div>
            <div class="flashcard" onclick="flipCard(this)">
                <div class="card-inner">
                    <div class="card-front">
                        <h3>${vocabularyDB.beginner[currentCardIndex].word}</h3>
                        <p>Click to reveal translation</p>
                    </div>
                    <div class="card-back">
                        <h3>${vocabularyDB.beginner[currentCardIndex].translation}</h3>
                        <p class="category">${vocabularyDB.beginner[currentCardIndex].category}</p>
                    </div>
                </div>
            </div>
            <div class="controls">
                <button onclick="previousCard()" ${currentCardIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-left"></i> Previous
                </button>
                <div class="card-counter">${currentCardIndex + 1}/${vocabularyDB.beginner.length}</div>
                <button onclick="nextCard()" ${currentCardIndex === vocabularyDB.beginner.length - 1 ? 'disabled' : ''}>
                    Next <i class="fas fa-arrow-right"></i>
                </button>
            </div>
            <button class="back-btn" onclick="returnToHome()">Back to Menu</button>
        </div>
    `;
}

function startMatching() {
    const container = document.querySelector('.container');
    const currentVocab = vocabularyDB.beginner;
    // Get 8 random words from vocabulary
    const shuffledVocab = [...currentVocab].sort(() => Math.random() - 0.5);
    const words = shuffledVocab.slice(0, 8);
    
    // Create pairs with both English and translated words
    const pairs = [];
    words.forEach((item, index) => {
        // Add English word
        pairs.push({ 
            id: `pair_${index}`,
            text: item.word,
            type: 'english',
            matched: false,
            pairId: index
        });
        // Add translated word
        pairs.push({ 
            id: `pair_${index}`,
            text: item.translation,
            type: 'translation',
            matched: false,
            pairId: index
        });
    });
    
    const shuffledPairs = pairs.sort(() => Math.random() - 0.5);
    
    container.innerHTML = `
        <div class="game-container matching">
            <h2>Word Matching - ${currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)}</h2>
            <div class="score-board">
                <span>Matches: <span id="matches">0</span>/${words.length}</span>
                <span>Attempts: <span id="attempts">0</span></span>
            </div>
            <div class="matching-grid">
                ${shuffledPairs.map((item, index) => `
                    <div class="matching-card" data-pair-id="${item.pairId}" data-type="${item.type}">
                        <div class="card-inner">
                            <div class="card-front">
                                <div class="card-content">?</div>
                            </div>
                            <div class="card-back">
                                <div class="card-content">${item.text}</div>
                                <div class="card-type">${item.type === 'english' ? 'English' : currentLanguage}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="back-btn" onclick="returnToHome()">Back to Menu</button>
        </div>
    `;

    let flippedCards = [];
    let matchedPairs = 0;
    let attempts = 0;

    // Add click event listeners
    document.querySelectorAll('.matching-card').forEach(card => {
        card.addEventListener('click', () => {
            if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
                card.classList.add('flipped');
                flippedCards.push(card);
                
                if (flippedCards.length === 2) {
                    attempts++;
                    document.getElementById('attempts').textContent = attempts;
                    
                    if (flippedCards[0].dataset.pairId === flippedCards[1].dataset.pairId) {
                        matchedPairs++;
                        document.getElementById('matches').textContent = matchedPairs;
                        flippedCards.forEach(c => {
                            c.classList.add('matched');
                            c.style.animation = 'matchSuccess 0.5s ease-out';
                        });
                        flippedCards = [];
                        
                        // Show success message
                        showMatchFeedback(true);
                        
                        if (matchedPairs === words.length) {
                            setTimeout(() => showMatchingCompletion(attempts), 500);
                        }
                    } else {
                        // Show error message
                        showMatchFeedback(false);
                        
                        setTimeout(() => {
                            flippedCards.forEach(c => c.classList.remove('flipped'));
                            flippedCards = [];
                        }, 1000);
                    }
                }
            }
        });
    });
}

// Add feedback function
function showMatchFeedback(isMatch) {
    const feedback = document.createElement('div');
    feedback.className = `match-feedback ${isMatch ? 'success' : 'error'}`;
    feedback.textContent = isMatch ? 'Match! 🎉' : 'Try again!';
    document.querySelector('.matching-grid').appendChild(feedback);
    
    setTimeout(() => feedback.remove(), 1000);
}

let currentQuestionIndex = 0;
let correctAnswers = 0;
let totalQuestions = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    showNextQuestion();
}

function showNextQuestion() {
    const container = document.querySelector('.container');
    const currentWord = vocabularyDB.beginner[currentQuestionIndex];
    
    // Generate wrong answers
    let wrongAnswers = vocabularyDB.beginner
        .filter(item => item !== currentWord)
        .map(item => item.translation)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    // Combine and shuffle answers
    let answers = [currentWord.translation, ...wrongAnswers]
        .sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="game-container quiz">
            <h2>Quiz Challenge</h2>
            <div class="quiz-progress">
                Question ${currentQuestionIndex + 1} of ${vocabularyDB.beginner.length}
                <div class="score-display">Score: ${correctAnswers}/${totalQuestions}</div>
            </div>
            <div class="quiz-question">
                <h3>What is the translation of "${currentWord.word}"?</h3>
                <div class="quiz-options">
                    ${answers.map(answer => `
                        <button onclick="checkAnswer(this, '${currentWord.translation}')">${answer}</button>
                    `).join('')}
                </div>
            </div>
            <div class="quiz-controls" style="display: none;">
                <button class="retry-btn" onclick="retryQuestion()">
                    <i class="fas fa-redo"></i> Try Again
                </button>
                <button class="next-btn" onclick="moveToNextQuestion()">
                    <i class="fas fa-arrow-right"></i> Next Question
                </button>
            </div>
            <button class="back-btn" onclick="returnToHome()">Back to Menu</button>
        </div>
    `;
}

function checkAnswer(button, correctAnswer) {
    totalQuestions++;
    const buttons = document.querySelectorAll('.quiz-options button');
    buttons.forEach(btn => btn.disabled = true);
    
    const controls = document.querySelector('.quiz-controls');
    controls.style.display = 'flex';

    if (button.textContent === correctAnswer) {
        button.classList.add('correct');
        correctAnswers++;
        updateProgress(10); // Add XP for correct answer
        
        // Show success message
        showFeedback('Correct! 🎉', 'success');
    } else {
        button.classList.add('wrong');
        // Highlight the correct answer
        buttons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
        
        // Show error message
        showFeedback('Try again!', 'error');
    }
}

function retryQuestion() {
    const buttons = document.querySelectorAll('.quiz-options button');
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('correct', 'wrong');
    });
    
    document.querySelector('.quiz-controls').style.display = 'none';
    removeFeedback();
    totalQuestions--; // Don't count retries in total attempts
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < vocabularyDB.beginner.length) {
        showNextQuestion();
    } else {
        // Quiz completed
        showQuizCompletion();
    }
}

function showFeedback(message, type) {
    const existingFeedback = document.querySelector('.feedback-message');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    const feedback = document.createElement('div');
    feedback.className = `feedback-message ${type}`;
    feedback.innerHTML = message;
    document.querySelector('.quiz-question').appendChild(feedback);
}

function removeFeedback() {
    const feedback = document.querySelector('.feedback-message');
    if (feedback) {
        feedback.remove();
    }
}

function showQuizCompletion() {
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const container = document.querySelector('.container');
    
    container.innerHTML = `
        <div class="game-container quiz-completion">
            <h2>Quiz Completed! 🎉</h2>
            <div class="completion-stats">
                <div class="score-circle">
                    <div class="score-number">${score}%</div>
                    <div class="score-label">Score</div>
                </div>
                <div class="stats-details">
                    <p>Correct Answers: ${correctAnswers}</p>
                    <p>Total Questions: ${totalQuestions}</p>
                    <p>XP Earned: ${correctAnswers * 10}</p>
                </div>
            </div>
            <div class="completion-buttons">
                <button onclick="startQuiz()" class="retry-quiz-btn">
                    <i class="fas fa-redo"></i> Try Again
                </button>
                <button onclick="returnToHome()" class="home-btn">
                    <i class="fas fa-home"></i> Back to Home
                </button>
            </div>
        </div>
    `;
}

function returnToHome() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <section class="welcome-section">
            <h1><span class="highlight">Welcome to Advanced Learn</span></h1>
            <p>Master languages through advanced learning techniques and AI-powered challenges!</p>
            <div class="language-selector">
                <!-- Original language buttons -->
                ${generateLanguageButtons()}
            </div>
        </section>

        <section class="game-modes">
            <h2>Learning Activities</h2>
            <div class="mode-cards">
                <!-- Original game cards -->
                ${generateGameCards()}
            </div>
        </section>

        <section class="daily-challenge">
            <h2>Daily Challenges</h2>
            <div class="challenge-container">
                <!-- Original challenge content -->
                ${generateChallengeContent()}
            </div>
        </section>
    `;
    
    // Reinitialize any necessary event listeners
    initializeHomeScreen();
}

// Add matching game logic
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;

function flipMatchingCard(card) {
    if (flippedCards.length === 2 || card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        attempts++;
        document.getElementById('attempts').textContent = attempts;
        
        if (flippedCards[0].querySelector('.card-content').textContent === flippedCards[1].querySelector('.card-content').textContent) {
            matchedPairs++;
            document.getElementById('matches').textContent = matchedPairs;
            flippedCards.forEach(fc => fc.classList.add('matched'));
            flippedCards = [];
            
            if (matchedPairs === 8) {
                showCompletionModal('matching', calculateScore(attempts));
            }
        } else {
            setTimeout(() => {
                flippedCards.forEach(fc => fc.classList.remove('flipped'));
                flippedCards = [];
            }, 1000);
        }
    }
}

// Add pronunciation game
function startPronunciation() {
    const container = document.querySelector('.container');
    const currentWord = vocabularyDB.beginner[currentCardIndex];
    
    container.innerHTML = `
        <div class="game-container pronunciation">
            <h2>Pronunciation Practice</h2>
            <div class="word-display">
                <div class="current-word">
                    <h3>${currentWord.word}</h3>
                    <p class="translation">${currentWord.translation}</p>
                </div>
                <div class="pronunciation-controls">
                    <button class="listen-btn" onclick="speakWord('${currentWord.word}')">
                        <i class="fas fa-volume-up"></i> Listen
                    </button>
                    <button class="record-btn" onclick="startRecording()">
                        <i class="fas fa-microphone"></i> Record
                    </button>
                </div>
                <div id="result" class="result-display"></div>
            </div>
            <div class="controls">
                <button onclick="previousWord()" ${currentCardIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-left"></i> Previous
                </button>
                <div class="word-counter">
                    ${currentCardIndex + 1} / ${vocabularyDB.beginner.length}
                </div>
                <button onclick="nextWord()" ${currentCardIndex === vocabularyDB.beginner.length - 1 ? 'disabled' : ''}>
                    Next <i class="fas fa-arrow-right"></i>
                </button>
            </div>
            <button class="back-btn" onclick="returnToHome()">Back to Menu</button>
        </div>
    `;
}

// Add text-to-speech functionality
function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = getLangCode(currentLanguage);
    speechSynthesis.speak(utterance);
}

// Get language code for speech synthesis
function getLangCode(language) {
    const langCodes = {
        spanish: 'es-ES',
        french: 'fr-FR',
        german: 'de-DE',
        italian: 'it-IT',
        japanese: 'ja-JP',
        korean: 'ko-KR',
        mandarin: 'zh-CN',
        portuguese: 'pt-PT'
    };
    return langCodes[language] || 'en-US';
}

// Add speech recognition functionality
function startRecording() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Speech recognition is not supported in your browser. Please try Chrome.');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = getLangCode(currentLanguage);
    recognition.continuous = false;
    recognition.interimResults = false;

    const recordBtn = document.querySelector('.record-btn');
    recordBtn.innerHTML = '<i class="fas fa-stop"></i> Stop';
    recordBtn.classList.add('recording');
    recordBtn.onclick = () => recognition.stop();

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        showPronunciationResult(result);
    };

    recognition.onend = () => {
        recordBtn.innerHTML = '<i class="fas fa-microphone"></i> Record';
        recordBtn.classList.remove('recording');
        recordBtn.onclick = startRecording;
    };

    recognition.start();
}

function showPronunciationResult(result) {
    const currentWord = vocabularyDB.beginner[currentCardIndex].word;
    const resultDisplay = document.getElementById('result');
    const isCorrect = result.toLowerCase().includes(currentWord.toLowerCase());

    resultDisplay.innerHTML = `
        <div class="pronunciation-result ${isCorrect ? 'correct' : 'incorrect'}">
            <i class="fas ${isCorrect ? 'fa-check' : 'fa-times'}"></i>
            <p>Your pronunciation: ${result}</p>
        </div>
    `;

    if (isCorrect) {
        updateProgress(5); // Add XP for correct pronunciation
    }
}

// Add completion modal
function showCompletionModal(gameType, score) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content completion-modal">
            <h2>Congratulations! 🎉</h2>
            <p>You've completed the ${gameType} challenge!</p>
            <div class="score-display">${score}%</div>
            <div class="ranking">${getRanking(score)}</div>
            <p>Experience gained: ${Math.floor(score/2)} XP</p>
            <button onclick="returnToHome()" class="continue-btn">Continue Learning</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    updateProgress(Math.floor(score/2));
}

function calculateScore(attempts) {
    const perfectScore = 8; // minimum possible attempts
    const score = Math.max(0, Math.round(100 * (perfectScore/attempts)));
    return score;
}

function getRanking(score) {
    if (score >= 90) return 'Master! 🌟';
    if (score >= 80) return 'Expert 🏆';
    if (score >= 70) return 'Advanced 💫';
    if (score >= 60) return 'Intermediate ⭐';
    return 'Beginner 👍';
}

// Daily Challenges
function loadDailyChallenge() {
    const challenges = [
        "Learn 5 new words",
        "Complete 3 matching games",
        "Achieve perfect score in quiz",
        "Practice pronunciation for 10 minutes"
    ];
    
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    document.getElementById('challengeDescription').textContent = randomChallenge;
}

function startDailyChallenge() {
    const challenge = document.getElementById('challengeDescription').textContent;
    console.log(`Starting daily challenge: ${challenge}`);
    // Implement challenge logic
}

// Navigation functions
function navigateTo(page) {
    switch(page) {
        case 'vocabulary':
            showVocabularyPage();
            break;
        case 'challenges':
            showChallengesPage();
            break;
        case 'achievements':
            showAchievementsPage();
            break;
    }
}

function showVocabularyPage() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="game-container vocabulary">
            <h2>Vocabulary List</h2>
            <div class="vocabulary-categories">
                <button class="category-btn active" onclick="filterVocabulary('all')">All Words</button>
                <button class="category-btn" onclick="filterVocabulary('greetings')">Greetings</button>
                <button class="category-btn" onclick="filterVocabulary('common')">Common Phrases</button>
                <button class="category-btn" onclick="filterVocabulary('advanced')">Advanced</button>
            </div>
            <div class="vocabulary-grid">
                ${generateVocabularyList()}
            </div>
        </div>
    `;
}

function showChallengesPage() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="game-container challenges">
            <h2>Daily Challenges</h2>
            <div class="challenges-grid">
                <div class="challenge-card">
                    <div class="challenge-header">
                        <i class="fas fa-graduation-cap"></i>
                        <h3>Vocabulary Master</h3>
                    </div>
                    <p>Learn 20 new words today</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${(wordsLearned/20) * 100}%"></div>
                    </div>
                    <div class="challenge-reward">
                        <span>Reward:</span>
                        <i class="fas fa-gem"></i> 100 XP
                        <i class="fas fa-medal"></i> Achievement
                    </div>
                    <button onclick="startVocabularyChallenge()">Start Challenge</button>
                </div>

                <div class="challenge-card">
                    <div class="challenge-header">
                        <i class="fas fa-fire"></i>
                        <h3>Perfect Streak</h3>
                    </div>
                    <p>Complete 5 exercises without mistakes</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${(perfectStreak/5) * 100}%"></div>
                    </div>
                    <div class="challenge-reward">
                        <span>Reward:</span>
                        <i class="fas fa-gem"></i> 150 XP
                        <i class="fas fa-star"></i> Special Badge
                    </div>
                    <button onclick="startStreakChallenge()">Continue</button>
                </div>

                <div class="challenge-card">
                    <div class="challenge-header">
                        <i class="fas fa-clock"></i>
                        <h3>Speed Challenge</h3>
                    </div>
                    <p>Match 10 pairs in under 60 seconds</p>
                    <div class="challenge-reward">
                        <span>Reward:</span>
                        <i class="fas fa-gem"></i> 200 XP
                        <i class="fas fa-trophy"></i> Speed Champion
                    </div>
                    <button onclick="startSpeedChallenge()">Try Now</button>
                </div>
            </div>
        </div>
    `;
}

function showAchievementsPage() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="game-container achievements">
            <h2>Your Achievements</h2>
            <div class="achievements-grid">
                <div class="achievement-card unlocked">
                    <i class="fas fa-award"></i>
                    <h3>First Steps</h3>
                    <p>Complete your first lesson</p>
                    <span class="achievement-date">Earned on: ${new Date().toLocaleDateString()}</span>
                </div>
                <div class="achievement-card">
                    <i class="fas fa-crown"></i>
                    <h3>Language Master</h3>
                    <p>Learn 100 words</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: 45%"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showProfilePage() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="game-container profile">
            <h2>Your Profile</h2>
            <div class="profile-content">
                <div class="profile-header">
                    <div class="profile-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="profile-info">
                        <h3>Language Learner</h3>
                        <p>Level ${userProgress.level}</p>
                        <p>${userProgress.experience} XP</p>
                    </div>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-book-reader"></i>
                        <h4>Words Learned</h4>
                        <p>42</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-fire"></i>
                        <h4>Current Streak</h4>
                        <p>${streakCount} days</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Enhanced flashcard functions
function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % vocabularyDB.beginner.length;
    updateFlashcard();
}

function previousCard() {
    currentCardIndex = (currentCardIndex - 1 + vocabularyDB.beginner.length) % vocabularyDB.beginner.length;
    updateFlashcard();
}

function updateFlashcard() {
    const flashcard = document.querySelector('.flashcard');
    if (flashcard) {
        flashcard.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <h3>${vocabularyDB.beginner[currentCardIndex].word}</h3>
                    <p>Click to reveal translation</p>
                </div>
                <div class="card-back">
                    <h3>${vocabularyDB.beginner[currentCardIndex].translation}</h3>
                </div>
            </div>
        `;
    }
}

// Enhanced progress tracking
function updateProgress(experiencePoints) {
    const oldLevel = userProgress.level;
    userProgress.experience += experiencePoints;
    
    // Update XP counter with animation
    const xpCounter = document.getElementById('xpPoints');
    animateNumber(xpCounter, parseInt(xpCounter.textContent), userProgress.experience, 1000);
    
    // Level up logic
    const newLevel = Math.floor(userProgress.experience / 100) + 1;
    if (newLevel > oldLevel) {
        userProgress.level = newLevel;
        document.getElementById('userLevel').textContent = newLevel;
        showLevelUpAnimation();
    }
    
    // Update progress bar
    const progressPercentage = (userProgress.experience % 100);
    animateProgress(progressPercentage);
    
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const animate = () => {
        current += increment;
        element.textContent = Math.round(current);
        
        if ((increment > 0 && current < end) || (increment < 0 && current > end)) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = end;
        }
    };
    
    animate();
}

function animateProgress(percentage) {
    const progressBar = document.getElementById('progressFill');
    progressBar.style.width = percentage + '%';
    progressBar.style.transition = 'width 0.5s ease-out';
}

function showLevelUpAnimation() {
    const message = document.createElement('div');
    message.className = 'level-up-message';
    message.innerHTML = `
        <i class="fas fa-brain" style="font-size: 3rem; color: var(--primary-color);"></i>
        <h3>Advanced Achievement!</h3>
        <p>Congratulations! You've reached level ${userProgress.level}</p>
        <div class="achievement-badge">
            <i class="fas fa-star"></i> Advanced Learner
        </div>
    `;
    document.body.appendChild(message);
    
    // Add confetti effect
    createConfetti();
    
    setTimeout(() => message.remove(), 3000);
}

// Add confetti animation
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Add this CSS for confetti
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        top: -10px;
        width: 10px;
        height: 10px;
        animation: fall 3s linear forwards;
    }
    
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Update the initialization code
document.addEventListener('DOMContentLoaded', () => {
    // Hide main content initially
    document.querySelector('main').style.display = 'none';
    
    const splashScreen = document.getElementById('splash-screen');
    const introModal = document.getElementById('intro-modal');
    
    // Show splash screen with animations
    setTimeout(() => {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            introModal.style.display = 'flex';
            
            // Trigger modal animations
            requestAnimationFrame(() => {
                introModal.classList.add('show');
            });
            
            // Auto-hide intro modal after animation
            setTimeout(() => {
                introModal.style.opacity = '0';
                setTimeout(() => {
                    introModal.style.display = 'none';
                    document.querySelector('main').style.display = 'block';
                    requestAnimationFrame(() => {
                        document.querySelector('main').classList.add('fade-in');
                    });
                }, 500);
            }, 3000);
        }, 800);
    }, 3000);

    // Rest of initialization code...

    // Fix navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.closest('a').dataset.page;
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.closest('a').classList.add('active');
            
            // Navigate to the page
            switch(page) {
                case 'home':
                    returnToHome();
                    break;
                case 'vocabulary':
                    showVocabularyPage();
                    break;
                case 'challenges':
                    showChallengesPage();
                    break;
                case 'achievements':
                    showAchievementsPage();
                    break;
                case 'profile':
                    showProfilePage();
                    break;
            }
        });
    });
});

let currentLanguage = 'spanish';
let streakCount = 0;
let lastLoginDate = null;

function selectLanguage(language) {
    currentLanguage = language;
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // Add animation effect
    const welcomeSection = document.querySelector('.welcome-section');
    welcomeSection.style.animation = 'fadeOut 0.3s ease';
    
    setTimeout(() => {
        loadLanguageContent(language);
        welcomeSection.style.animation = 'fadeIn 0.3s ease';
    }, 300);
}

function loadLanguageContent(language) {
    const languageData = {
        spanish: {
            welcome: "¡Bienvenido a Advanced Learn!",
            subtitle: "Domina el español con técnicas avanzadas de aprendizaje"
        },
        french: {
            welcome: "Bienvenue sur Advanced Learn!",
            subtitle: "Maîtrisez le français avec des techniques d'apprentissage avancées"
        },
        german: {
            welcome: "Willkommen bei Advanced Learn!",
            subtitle: "Beherrschen Sie Deutsch mit fortgeschrittenen Lerntechniken"
        },
        italian: {
            welcome: "Benvenuto su Advanced Learn!",
            subtitle: "Padroneggia l'italiano con tecniche di apprendimento avanzate"
        },
        japanese: {
            welcome: "Advanced Learn へようこそ!",
            subtitle: "高度な学習テクニックで日本語をマスター"
        },
        korean: {
            welcome: "Advanced Learn에 오신 것을 환영합니다!",
            subtitle: "고급 학습 기술로 한국어 마스터하기"
        },
        mandarin: {
            welcome: "欢迎来到 Advanced Learn！",
            subtitle: "通过先进的学习技术掌握普通话"
        },
        portuguese: {
            welcome: "Bem-vindo ao Advanced Learn!",
            subtitle: "Domine o português com técnicas avançadas de aprendizagem"
        }
    };
    
    document.querySelector('.welcome-section h1').innerHTML = 
        `<span class="highlight">${languageData[language].welcome}</span>`;
    document.querySelector('.welcome-section p').textContent = 
        languageData[language].subtitle;
        
    // Update vocabulary database based on selected language
    updateVocabularyForLanguage(language);
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLoginDate');
    
    if (lastLogin === null) {
        streakCount = 1;
    } else if (lastLogin === today) {
        return; // Already logged in today
    } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastLogin === yesterday.toDateString()) {
            streakCount++;
        } else {
            streakCount = 1; // Streak broken
        }
    }
    
    localStorage.setItem('lastLoginDate', today);
    localStorage.setItem('streakCount', streakCount);
    document.getElementById('streakCount').textContent = streakCount;
    
    if (streakCount % 5 === 0) {
        showStreakAchievement(streakCount);
    }
}

function showStreakAchievement(days) {
    const message = document.createElement('div');
    message.className = 'level-up-message';
    message.innerHTML = `
        <i class="fas fa-fire" style="font-size: 3rem; color: #FF6B6B;"></i>
        <h3>${days} Day Streak!</h3>
        <p>Amazing consistency! Keep it up!</p>
        <div class="achievement-badge">
            <i class="fas fa-fire"></i> ${days} Day Warrior
        </div>
    `;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

// Update the vocabulary database for different languages
const vocabularyData = {
    spanish: {
        beginner: [
            { word: "hello", translation: "hola", category: "greetings" },
            { word: "goodbye", translation: "adiós", category: "greetings" },
            { word: "thank you", translation: "gracias", category: "greetings" },
            { word: "please", translation: "por favor", category: "greetings" },
            { word: "good morning", translation: "buenos días", category: "greetings" },
            { word: "good night", translation: "buenas noches", category: "greetings" }
        ]
    },
    french: {
        beginner: [
            { word: "hello", translation: "bonjour", category: "greetings" },
            { word: "goodbye", translation: "au revoir", category: "greetings" },
            { word: "thank you", translation: "merci", category: "greetings" },
            { word: "please", translation: "s'il vous plaît", category: "greetings" },
            { word: "good morning", translation: "bonjour", category: "greetings" },
            { word: "good night", translation: "bonne nuit", category: "greetings" }
        ]
    },
    german: {
        beginner: [
            { word: "hello", translation: "hallo", category: "greetings" },
            { word: "goodbye", translation: "auf wiedersehen", category: "greetings" },
            { word: "thank you", translation: "danke", category: "greetings" },
            { word: "please", translation: "bitte", category: "greetings" },
            { word: "good morning", translation: "guten morgen", category: "greetings" },
            { word: "good night", translation: "gute nacht", category: "greetings" }
        ]
    },
    italian: {
        beginner: [
            { word: "hello", translation: "ciao", category: "greetings" },
            { word: "goodbye", translation: "arrivederci", category: "greetings" },
            { word: "thank you", translation: "grazie", category: "greetings" },
            { word: "please", translation: "per favore", category: "greetings" },
            { word: "good morning", translation: "buongiorno", category: "greetings" },
            { word: "good night", translation: "buonanotte", category: "greetings" }
        ]
    },
    japanese: {
        beginner: [
            { word: "hello", translation: "こんにちは", category: "greetings" },
            { word: "goodbye", translation: "さようなら", category: "greetings" },
            { word: "thank you", translation: "ありがとう", category: "greetings" },
            { word: "please", translation: "お願いします", category: "greetings" },
            { word: "good morning", translation: "おはようございます", category: "greetings" },
            { word: "good night", translation: "おやすみなさい", category: "greetings" }
        ]
    },
    korean: {
        beginner: [
            { word: "hello", translation: "안녕하세요", category: "greetings" },
            { word: "goodbye", translation: "안녕히 가세요", category: "greetings" },
            { word: "thank you", translation: "감사합니다", category: "greetings" },
            { word: "please", translation: "주세요", category: "greetings" },
            { word: "good morning", translation: "좋은 아침입니다", category: "greetings" },
            { word: "good night", translation: "안녕히 주무세요", category: "greetings" }
        ]
    },
    mandarin: {
        beginner: [
            { word: "hello", translation: "你好", category: "greetings" },
            { word: "goodbye", translation: "再见", category: "greetings" },
            { word: "thank you", translation: "谢谢", category: "greetings" },
            { word: "please", translation: "请", category: "greetings" },
            { word: "good morning", translation: "早上好", category: "greetings" },
            { word: "good night", translation: "晚安", category: "greetings" }
        ]
    },
    portuguese: {
        beginner: [
            { word: "hello", translation: "olá", category: "greetings" },
            { word: "goodbye", translation: "adeus", category: "greetings" },
            { word: "thank you", translation: "obrigado/a", category: "greetings" },
            { word: "please", translation: "por favor", category: "greetings" },
            { word: "good morning", translation: "bom dia", category: "greetings" },
            { word: "good night", translation: "boa noite", category: "greetings" }
        ]
    }
};

// Update the function that changes vocabulary when language is selected
function updateVocabularyForLanguage(language) {
    if (vocabularyData[language]) {
        vocabularyDB.beginner = generateMoreVocabulary(language);
        currentCardIndex = 0;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Existing initialization code...
    
    updateStreak();
    loadUserProgress();
    
    // Add hover effect to game cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});

// Add this function to handle flashcard flips
function flipCard(card) {
    card.classList.toggle('flipped');
    updateProgress(1); // Add 1 XP for each flip
}

// Helper functions to generate content
function generateLanguageButtons() {
    const languages = [
        { code: 'spanish', name: 'Spanish', flag: 'es' },
        { code: 'french', name: 'French', flag: 'fr' },
        { code: 'german', name: 'German', flag: 'de' },
        { code: 'italian', name: 'Italian', flag: 'it' },
        { code: 'japanese', name: 'Japanese', flag: 'jp' },
        { code: 'korean', name: 'Korean', flag: 'kr' },
        { code: 'mandarin', name: 'Mandarin', flag: 'cn' },
        { code: 'portuguese', name: 'Portuguese', flag: 'pt' }
    ];

    return languages.map(lang => `
        <button class="lang-btn ${currentLanguage === lang.code ? 'active' : ''}" 
                onclick="selectLanguage('${lang.code}')">
            <img src="https://flagcdn.com/48x36/${lang.flag}.png" 
                 alt="${lang.name} flag"
                 onerror="this.src='https://flagsapi.com/${lang.flag.toUpperCase()}/flat/64.png'">
            ${lang.name}
        </button>
    `).join('');
}

function generateGameCards() {
    return `
        <div class="game-card" onclick="startGame('flashcards')">
            <i class="fas fa-clone"></i>
            <h3>Flashcards</h3>
            <p>Classic vocabulary learning</p>
            <span class="difficulty">Beginner</span>
        </div>
        <div class="game-card" onclick="startGame('matching')">
            <i class="fas fa-puzzle-piece"></i>
            <h3>Word Matching</h3>
            <p>Match words with meanings</p>
            <span class="difficulty">Intermediate</span>
        </div>
        <div class="game-card" onclick="startGame('quiz')">
            <i class="fas fa-question-circle"></i>
            <h3>Quiz Challenge</h3>
            <p>Test your knowledge</p>
            <span class="difficulty">Advanced</span>
        </div>
        <div class="game-card" onclick="startGame('pronunciation')">
            <i class="fas fa-microphone"></i>
            <h3>Pronunciation</h3>
            <p>Practice speaking</p>
            <span class="difficulty">All Levels</span>
        </div>
    `;
}

function generateChallengeContent() {
    return `
        <div id="dailyChallenge" class="challenge-card">
            <div class="challenge-header">
                <i class="fas fa-calendar-day"></i>
                <h3>Today's Challenge</h3>
            </div>
            <p id="challengeDescription">Loading...</p>
            <div class="challenge-reward">
                <span>Reward: </span>
                <i class="fas fa-gem"></i> 50 XP
            </div>
            <button onclick="startDailyChallenge()">
                <i class="fas fa-play"></i> Start Challenge
            </button>
        </div>
        <div class="streak-counter">
            <i class="fas fa-fire"></i>
            <span id="streakCount">0</span> Day Streak
        </div>
    `;
}

function initializeHomeScreen() {
    // Reinitialize event listeners and other necessary setup
    loadDailyChallenge();
    updateStreak();
    
    // Add hover effect to game cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
}

// Add these new words to the translations object
const additionalWords = [
    { word: "beautiful", category: "adjectives" },
    { word: "happy", category: "emotions" },
    { word: "sad", category: "emotions" },
    { word: "angry", category: "emotions" },
    { word: "tired", category: "emotions" },
    { word: "hungry", category: "feelings" },
    { word: "thirsty", category: "feelings" },
    { word: "big", category: "adjectives" },
    { word: "small", category: "adjectives" },
    { word: "fast", category: "adjectives" },
    { word: "slow", category: "adjectives" },
    { word: "today", category: "time" },
    { word: "tomorrow", category: "time" },
    { word: "yesterday", category: "time" },
    { word: "week", category: "time" },
    { word: "month", category: "time" },
    { word: "year", category: "time" },
    { word: "summer", category: "seasons" },
    { word: "winter", category: "seasons" },
    { word: "spring", category: "seasons" },
    { word: "autumn", category: "seasons" },
    { word: "breakfast", category: "meals" },
    { word: "lunch", category: "meals" },
    { word: "dinner", category: "meals" },
    { word: "kitchen", category: "house" },
    { word: "bathroom", category: "house" },
    { word: "bedroom", category: "house" },
    { word: "living room", category: "house" },
    { word: "garden", category: "house" },
    { word: "window", category: "house" },
    { word: "door", category: "house" },
    { word: "table", category: "furniture" },
    { word: "chair", category: "furniture" },
    { word: "bed", category: "furniture" },
    { word: "sofa", category: "furniture" },
    { word: "lamp", category: "furniture" },
    { word: "television", category: "electronics" },
    { word: "radio", category: "electronics" },
    { word: "laptop", category: "electronics" },
    { word: "smartphone", category: "electronics" },
    { word: "pencil", category: "school" },
    { word: "pen", category: "school" },
    { word: "notebook", category: "school" },
    { word: "paper", category: "school" },
    { word: "scissors", category: "tools" },
    { word: "knife", category: "tools" },
    { word: "fork", category: "tools" },
    { word: "spoon", category: "tools" },
    { word: "plate", category: "kitchen" },
    { word: "cup", category: "kitchen" }
];

// Add translations for Spanish
const spanishTranslations = {
    beautiful: "hermoso/a",
    happy: "feliz",
    sad: "triste",
    angry: "enojado/a",
    tired: "cansado/a",
    hungry: "hambriento/a",
    thirsty: "sediento/a",
    // ... add translations for all new words
};

// Update the intro animations in CSS 

function startVocabularyChallenge() {
    // Implementation for vocabulary challenge
    const container = document.querySelector('.container');
    let wordsToLearn = vocabularyDB.beginner.slice(0, 20);
    let currentWordIndex = 0;
    let correctAnswers = 0;

    function showNextWord() {
        if (currentWordIndex < wordsToLearn.length) {
            const currentWord = wordsToLearn[currentWordIndex];
            container.innerHTML = `
                <div class="challenge-container vocabulary-challenge">
                    <h2>Vocabulary Challenge</h2>
                    <div class="progress-indicator">
                        Word ${currentWordIndex + 1} of 20
                    </div>
                    <div class="word-card">
                        <h3>${currentWord.word}</h3>
                        <input type="text" placeholder="Type the translation" class="translation-input">
                        <button onclick="checkTranslation()">Check</button>
                    </div>
                </div>
            `;
        } else {
            showChallengeCompletion(correctAnswers);
        }
    }

    showNextWord();
}

function showChallengeCompletion(correctAnswers) {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="game-container challenge-completion">
            <h2>Vocabulary Challenge Completed!</h2>
            <div class="completion-stats">
                <div class="score-circle">
                    <div class="score-number">${Math.round((correctAnswers / 20) * 100)}%</div>
                    <div class="score-label">Score</div>
                </div>
                <div class="stats-details">
                    <p>Correct Answers: ${correctAnswers}</p>
                    <p>Total Words Learned: 20</p>
                    <p>XP Earned: ${correctAnswers * 10}</p>
                </div>
            </div>
            <div class="completion-buttons">
                <button onclick="startVocabularyChallenge()" class="retry-challenge-btn">
                    <i class="fas fa-redo"></i> Try Again
                </button>
                <button onclick="returnToHome()" class="home-btn">
                    <i class="fas fa-home"></i> Back to Home
                </button>
            </div>
        </div>
    `;
}

function startStreakChallenge() {
    // Implementation for streak challenge
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="game-container streak-challenge">
            <h2>Streak Challenge</h2>
            <p>Complete 5 exercises without mistakes</p>
            <button onclick="startStreakChallenge()" class="start-challenge-btn">Start Challenge</button>
        </div>
    `;
}

function startSpeedChallenge() {
    // Implementation for speed challenge
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="game-container speed-challenge">
            <h2>Speed Challenge</h2>
            <p>Match 10 pairs in under 60 seconds</p>
            <button onclick="startSpeedChallenge()" class="start-challenge-btn">Start Challenge</button>
        </div>
    `;
}

function showSpeedChallengeCompletion(time) {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div class="game-container speed-completion">
            <h2>Speed Challenge Completed!</h2>
            <div class="completion-stats">
                <div class="score-circle">
                    <div class="score-number">${Math.round((60 / time) * 100)}%</div>
                    <div class="score-label">Score</div>
                </div>
                <div class="stats-details">
                    <p>Time: ${time} seconds</p>
                    <p>XP Earned: ${Math.round((60 / time) * 10)}</p>
                </div>
            </div>
            <div class="completion-buttons">
                <button onclick="startSpeedChallenge()" class="retry-challenge-btn">
                    <i class="fas fa-redo"></i> Try Again
                </button>
                <button onclick="returnToHome()" class="home-btn">
                    <i class="fas fa-home"></i> Back to Home
                </button>
            </div>
        </div>
    `;
} 