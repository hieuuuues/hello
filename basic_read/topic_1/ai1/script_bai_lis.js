// Timer
let timeLeft = 600; // 10 minutes
const timerElement = document.getElementById("countdown");

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
  if (timeLeft > 0) {
    timeLeft--;
  } else {
    alert("Time's up! Submitting your answers.");
    submitAnswers();
  }
}

setInterval(updateTimer, 1000);

// Correct Answers
const correctAnswers = {
  q1: "B",
  q2: "C",
};

// Submit Answers
function submitAnswers() {
  const userAnswers = {};
  let correctCount = 0;
  let incorrectCount = 0;

  for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
    const selectedOption = document.querySelector(
      `input[name="${question}"]:checked`
    );
    if (selectedOption) {
      userAnswers[question] = selectedOption.value;
      if (selectedOption.value === correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    } else {
      userAnswers[question] = null;
      incorrectCount++;
    }
  }

  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  localStorage.setItem("correctCount", correctCount);
  localStorage.setItem("incorrectCount", incorrectCount);

  window.location.href = "result.html";
}

// Display Results
if (window.location.href.includes("result.html")) {
  const userAnswers = JSON.parse(localStorage.getItem("userAnswers"));
  const correctCount = localStorage.getItem("correctCount");
  const incorrectCount = localStorage.getItem("incorrectCount");

  document.getElementById("correct-count").textContent = correctCount;
  document.getElementById("incorrect-count").textContent = incorrectCount;

  const answersElement = document.getElementById("answers");
  for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
    const userAnswer = userAnswers[question];
    const isCorrect = userAnswer === correctAnswer;

    const answerBox = document.createElement("div");
    answerBox.classList.add("answer-box");
    answerBox.innerHTML = `
      <strong>${question}</strong>
      <p>Your Answer: ${userAnswer || "None"}<br>
      Correct Answer: ${correctAnswer}</p>
    `;

    if (isCorrect) {
      answerBox.classList.add("correct");
    } else {
      answerBox.classList.add("incorrect");
    }

    answersElement.appendChild(answerBox);
  }
}

// Go Back or Try Again
function goBack() {
  history.back();
}

function tryAgain() {
  window.location.href = "quiz_page.html";
}

// Attach event listener for submit button
document.getElementById("submit-btn").addEventListener("click", submitAnswers);

const circleButton = document.getElementById("circle-button");
const modal = document.getElementById("modal");
const loading = document.getElementById("loading");
const question = document.getElementById("question");
const closeButton = document.getElementById("close-btn");

let lastClickedTime = 0; // Lưu thời gian lần cuối bấm
const cooldownTime = 1 * 60 * 1000; // 5 phút
let lastQuestion = ""; // Câu hỏi cuối cùng được hiển thị

// Danh sách câu hỏi ngẫu nhiên
const questions = ["AI phân tích chủ đề từ vựng nên học: Daily routin "];

// Xử lý khi bấm nút tròn
circleButton.addEventListener("click", () => {
  const currentTime = Date.now();

  // Kiểm tra thời gian cooldown (giữ nội dung cũ trong 5 phút)
  if (currentTime - lastClickedTime < cooldownTime && lastQuestion) {
    displayModal(lastQuestion); // Hiển thị câu hỏi cũ
    return;
  }

  // Hiển thị modal với thông báo "Hệ thống đang xử lý"
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
  loading.classList.remove("hidden");
  question.classList.add("hidden");

  // Random nội dung mới sau 5 giây
  setTimeout(() => {
    loading.classList.add("hidden");
    lastQuestion = questions[Math.floor(Math.random() * questions.length)]; // Random câu hỏi mới
    displayModal(lastQuestion);
    lastClickedTime = Date.now(); // Cập nhật thời gian bấm
  }, 5000);
});

// Hiển thị nội dung trong modal
function displayModal(content) {
  question.textContent = content;
  question.classList.remove("hidden");
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
}

// Đóng modal
closeButton.addEventListener("click", () => {
  modal.style.visibility = "hidden";
  modal.style.opacity = "0";
});
