# Interactive Quiz Application

A responsive, modern, frontend-only Quiz Web Application built with **HTML5, CSS3, Bootstrap 5, and Vanilla JavaScript**.

Designed specifically for college mini-projects, viva demonstrations, and practical web development assessments.

---

## 🌟 Key Features

- **Welcome Screen:** Engaging introduction with quiz guidelines and simple one-click start.
- **Multiple-Choice Questions (MCQ):** Questions with 4 distinct options (A, B, C, D) styled cleanly.
- **Bidirectional Navigation:** Smoothly move forward (**Next**) and backward (**Previous**) between questions without losing selected answers.
- **Dynamic Progress Tracking:** Visual Bootstrap progress bar and question counter (e.g., *Question 2 of 5*).
- **Accurate Score Calculation:** Computes total correct answers and percentage score instantly upon submission.
- **Answer Review Section:** Detailed post-quiz breakdown comparing the user's selected answer with the official correct answer (color-coded in green for correct and red for incorrect).
- **Restart Quiz Functionality:** Easily reset the quiz state and play again without page reloads.
- **100% Frontend Only:** Zero backend/database required. Runs directly in any web browser by opening `index.html`.

---

## 🛠️ Tech Stack Used

- **HTML5:** Semantic markup structure (`index.html`)
- **CSS3:** Custom styles, CSS variables, linear gradients, and transitions (`style.css`)
- **Bootstrap 5 (v5.3.2):** Responsive grid system, utility classes, and components
- **Bootstrap Icons (v1.11.1):** Clean visual icons for questions, options, badges, and navigation
- **Vanilla JavaScript (ES6):** State management, DOM manipulation, scoring algorithm, and event handling (`script.js`)

---

## 📂 Project Structure

```text
Quiz App/
├── index.html       # Main HTML markup with Welcome, Quiz, and Results screens
├── style.css        # Custom CSS styling, responsive layout, and transitions
├── script.js        # Core JavaScript application logic and questions dataset
└── readme.md        # Comprehensive project documentation
```

---

## 🚀 How to Run the Project

1. Extract the `Quiz-App.zip` file (or clone/download the repository folder).
2. Double-click or right-click **`index.html`** and choose **"Open with Google Chrome"** (or Edge, Firefox, Safari).
3. The quiz application will launch instantly with no installations or local server needed!

---

## 🎓 College Viva & Interview Q&A Reference

### 1. How is the quiz state managed in JavaScript?
> State is managed using two primary variables:
> - `currentQuestionIndex`: An integer (0 to 4) tracking which question is actively displayed.
> - `userAnswers`: An array `[null, null, null, null, null]` initialized with `null`. When a user selects an option, its index (0, 1, 2, or 3) is stored at `userAnswers[currentQuestionIndex]`. This preserves choices even if the user navigates back and forth using the *Previous* and *Next* buttons.

### 2. How is the score calculated?
> When the user clicks "Submit Quiz", `calculateAndShowResults()` compares each item in `userAnswers` with `quizData[i].correctAnswer`. If they match, `score` increments by 1. The percentage is calculated as `Math.round((score / totalQuestions) * 100)`.

### 3. Why are separate screens handled in a single HTML file (SPA)?
> Single Page Application (SPA) architecture uses Bootstrap's `d-none` (display: none) utility class. The `showScreen()` function hides all sections and unhides the target section (`welcome-screen`, `quiz-screen`, or `results-screen`). This provides a seamless, flicker-free user experience without page reloads.

### 4. How was the duplicate event listener bug avoided?
> Option buttons are generated dynamically inside `loadQuestion()`. Instead of constantly attaching listeners to persistent buttons, the `optionsContainer.innerHTML` is cleared and fresh buttons with clean event listeners are created each time a question loads.

---

## 🌐 Live Deployment Guide (Optional)

To publish this project online for free:
- **Netlify Drop:** Drag and drop the unzipped project folder onto [app.netlify.com/drop](https://app.netlify.com/drop) for an instant live URL.
- **GitHub Pages:** Push the code to a GitHub repository and enable **Settings > Pages > Deploy from branch (main)**.
- **Vercel:** Import your repository or deploy directly via Vercel CLI.
