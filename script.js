/**
 * ==============================================================================
 * Quiz Application - Frontend JavaScript
 * Technologies: Vanilla JavaScript, Bootstrap 5, HTML5, CSS3
 * Suitable for College Project Viva Presentation & Beginner Understanding
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 1. QUIZ DATA (Questions, 4 Options per question, and Correct Answer Index)
// ------------------------------------------------------------------------------
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2 // Paris
  },
  {
    question: "Which programming language is known for its use in web development?",
    options: ["Java", "Python", "JavaScript", "C++"],
    correctAnswer: 2 // JavaScript
  },
  {
    question: "What is the result of 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1 // 4
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High-Level Text Machine Language",
      "Hyperlink and Text Markup Language",
      "Home Tool Markup Language"
    ],
    correctAnswer: 0 // Hyper Text Markup Language
  },
  {
    question: "Which CSS property is used to change the background color of an element?",
    options: ["color", "background-color", "bgcolor", "canvas-color"],
    correctAnswer: 1 // background-color
  }
];

// Option letter prefixes for multiple-choice display
const optionLetters = ["A", "B", "C", "D"];

// ------------------------------------------------------------------------------
// 2. DOM ELEMENTS (References to HTML elements)
// ------------------------------------------------------------------------------
// Screen Containers
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

// Action Buttons
const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

// Quiz Display Elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const currentQuestionNum = document.getElementById("current-question-num");
const totalQuestionsNum = document.getElementById("total-questions-num");
const quizProgressBar = document.getElementById("quiz-progress-bar");
const answeredBadge = document.getElementById("answered-badge");

// Results Display Elements
const finalScore = document.getElementById("final-score");
const finalTotal = document.getElementById("final-total");
const scorePercentageBadge = document.getElementById("score-percentage-badge");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const resultIcon = document.getElementById("result-icon");
const reviewContainer = document.getElementById("review-container");

// ------------------------------------------------------------------------------
// 3. APPLICATION STATE
// ------------------------------------------------------------------------------
let currentQuestionIndex = 0;
// userAnswers tracks the index of the selected option for each question (null if unanswered)
let userAnswers = new Array(quizData.length).fill(null);

// ------------------------------------------------------------------------------
// 4. SCREEN SWITCHING UTILITIES
// ------------------------------------------------------------------------------
function showScreen(screen) {
  welcomeScreen.classList.add("d-none");
  quizScreen.classList.add("d-none");
  resultsScreen.classList.add("d-none");

  screen.classList.remove("d-none");
  screen.classList.add("fade-in");
}

// ------------------------------------------------------------------------------
// 5. QUIZ INITIALIZATION & NAVIGATION
// ------------------------------------------------------------------------------

/**
 * Starts the quiz from the welcome screen
 */
function startQuiz() {
  currentQuestionIndex = 0;
  userAnswers = new Array(quizData.length).fill(null);
  totalQuestionsNum.textContent = quizData.length;
  showScreen(quizScreen);
  loadQuestion();
}

/**
 * Loads and renders the current question and its options
 */
function loadQuestion() {
  const currentQuiz = quizData[currentQuestionIndex];

  // 1. Update Question Counter & Progress Bar
  currentQuestionNum.textContent = currentQuestionIndex + 1;
  const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
  quizProgressBar.style.width = `${progressPercent}%`;

  // 2. Render Question Text
  questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuiz.question}`;

  // 3. Clear previous options and generate 4 new option buttons
  optionsContainer.innerHTML = "";

  currentQuiz.options.forEach((optionText, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    
    // Check if user previously selected this option
    const isSelected = userAnswers[currentQuestionIndex] === optionIndex;
    if (isSelected) {
      button.classList.add("selected");
    }

    // HTML structure for each option (Letter Badge + Option Text + Check Icon)
    button.innerHTML = `
      <span class="option-letter">${optionLetters[optionIndex]}</span>
      <span class="option-label text-start flex-grow-1">${optionText}</span>
      <i class="bi bi-check-circle-fill option-check"></i>
    `;

    // Click handler to select an answer
    button.addEventListener("click", () => selectOption(optionIndex));

    optionsContainer.appendChild(button);
  });

  // 4. Update Answered Status Badge
  updateAnswerStatusBadge();

  // 5. Update Navigation Buttons (Previous & Next/Submit)
  updateNavigationButtons();
}

/**
 * Handles option selection by user
 * @param {number} selectedIndex - The index of the selected option (0 to 3)
 */
function selectOption(selectedIndex) {
  // Save user's selected choice in state
  userAnswers[currentQuestionIndex] = selectedIndex;

  // Update visual selection styles on all option buttons
  const buttons = optionsContainer.querySelectorAll(".option-btn");
  buttons.forEach((btn, idx) => {
    if (idx === selectedIndex) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });

  // Update badge and enable Next/Submit button
  updateAnswerStatusBadge();
  updateNavigationButtons();
}

/**
 * Updates the 'Answered / Not answered' badge
 */
function updateAnswerStatusBadge() {
  const isAnswered = userAnswers[currentQuestionIndex] !== null;
  if (isAnswered) {
    answeredBadge.textContent = "Answered";
    answeredBadge.className = "badge bg-success-subtle text-success px-3 py-2 rounded-pill fw-medium";
  } else {
    answeredBadge.textContent = "Not answered";
    answeredBadge.className = "badge bg-secondary-subtle text-secondary px-3 py-2 rounded-pill fw-medium";
  }
}

/**
 * Updates Next & Previous buttons based on current question index & selection
 */
function updateNavigationButtons() {
  // Previous button: disabled on first question
  prevBtn.disabled = currentQuestionIndex === 0;

  const isLastQuestion = currentQuestionIndex === quizData.length - 1;
  const hasSelectedAnswer = userAnswers[currentQuestionIndex] !== null;

  // Toggle button appearance between "Next" and "Submit Quiz"
  if (isLastQuestion) {
    nextBtn.innerHTML = `Submit Quiz <i class="bi bi-check-circle ms-1"></i>`;
    nextBtn.className = "btn btn-success px-4 py-2 rounded-pill fw-semibold shadow-sm";
  } else {
    nextBtn.innerHTML = `Next <i class="bi bi-arrow-right ms-1"></i>`;
    nextBtn.className = "btn btn-primary px-4 py-2 rounded-pill fw-medium";
  }

  // Next/Submit button is enabled only when an answer is selected
  nextBtn.disabled = !hasSelectedAnswer;
}

/**
 * Navigates to previous question
 */
function goToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

/**
 * Navigates to next question or submits if last question
 */
function handleNextOrSubmit() {
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;

  if (isLastQuestion) {
    calculateAndShowResults();
  } else {
    currentQuestionIndex++;
    loadQuestion();
  }
}

// ------------------------------------------------------------------------------
// 6. SCORE CALCULATION & RESULTS REVIEW
// ------------------------------------------------------------------------------

/**
 * Calculates total score, renders statistics, and builds the answer review
 */
function calculateAndShowResults() {
  let score = 0;
  const totalQuestions = quizData.length;

  // Calculate score by comparing user's answers to correct answers
  quizData.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctAnswer) {
      score++;
    }
  });

  const percentage = Math.round((score / totalQuestions) * 100);

  // Update Score Elements in DOM
  finalScore.textContent = score;
  finalTotal.textContent = totalQuestions;
  scorePercentageBadge.textContent = `${percentage}% Score`;

  // Custom feedback message & icon based on score performance
  if (percentage >= 80) {
    resultTitle.textContent = "Outstanding Performance! 🎉";
    resultMessage.textContent = "You demonstrated excellent knowledge of web development basics!";
    resultIcon.className = "bi bi-trophy-fill display-4 text-warning";
    scorePercentageBadge.className = "badge bg-success px-3 py-2 rounded-pill fs-6";
  } else if (percentage >= 60) {
    resultTitle.textContent = "Great Job! 👏";
    resultMessage.textContent = "You did well, with a good grasp of the core concepts.";
    resultIcon.className = "bi bi-award-fill display-4 text-primary";
    scorePercentageBadge.className = "badge bg-primary px-3 py-2 rounded-pill fs-6";
  } else {
    resultTitle.textContent = "Good Effort! 📚";
    resultMessage.textContent = "Keep practicing and review the correct answers below to improve!";
    resultIcon.className = "bi bi-journal-bookmark-fill display-4 text-secondary";
    scorePercentageBadge.className = "badge bg-warning text-dark px-3 py-2 rounded-pill fs-6";
  }

  // Generate Answer Review List
  renderAnswersReview();

  // Show Results Screen
  showScreen(resultsScreen);
}

/**
 * Generates the review list displaying questions, user selections, and correct answers
 */
function renderAnswersReview() {
  reviewContainer.innerHTML = "";

  quizData.forEach((quizItem, index) => {
    const userAnswerIndex = userAnswers[index];
    const correctAnswerIndex = quizItem.correctAnswer;
    const isCorrect = userAnswerIndex === correctAnswerIndex;

    const userAnswerText = userAnswerIndex !== null 
      ? `${optionLetters[userAnswerIndex]}. ${quizItem.options[userAnswerIndex]}`
      : "Not Answered";

    const correctAnswerText = `${optionLetters[correctAnswerIndex]}. ${quizItem.options[correctAnswerIndex]}`;

    // Create review card container
    const reviewCard = document.createElement("div");
    reviewCard.className = `review-card ${isCorrect ? "correct-card" : "incorrect-card"}`;

    reviewCard.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="fw-bold mb-0 text-dark">Question ${index + 1}</h6>
        <span class="badge ${isCorrect ? "bg-success" : "bg-danger"} px-2 py-1">
          <i class="bi ${isCorrect ? "bi-check-circle" : "bi-x-circle"} me-1"></i>
          ${isCorrect ? "Correct" : "Incorrect"}
        </span>
      </div>
      
      <p class="mb-3 text-secondary small fw-medium">${quizItem.question}</p>
      
      <div class="row g-2 small">
        <div class="col-12 col-md-6">
          <div class="p-2 rounded border bg-light">
            <span class="text-muted d-block small mb-1">Your Answer:</span>
            <span class="${isCorrect ? "text-success fw-bold" : "text-danger fw-bold"}">
              ${userAnswerText}
            </span>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="p-2 rounded border bg-light">
            <span class="text-muted d-block small mb-1">Correct Answer:</span>
            <span class="text-success fw-bold">
              ${correctAnswerText}
            </span>
          </div>
        </div>
      </div>
    `;

    reviewContainer.appendChild(reviewCard);
  });
}

/**
 * Restarts the quiz back to the welcome screen
 */
function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = new Array(quizData.length).fill(null);
  showScreen(welcomeScreen);
}

// ------------------------------------------------------------------------------
// 7. EVENT LISTENERS
// ------------------------------------------------------------------------------
startBtn.addEventListener("click", startQuiz);
prevBtn.addEventListener("click", goToPreviousQuestion);
nextBtn.addEventListener("click", handleNextOrSubmit);
restartBtn.addEventListener("click", restartQuiz);

// Initialize on Welcome Screen
showScreen(welcomeScreen);
