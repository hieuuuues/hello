document.addEventListener("DOMContentLoaded", function () {
  let time = 60; // Countdown time in seconds (10 minutes)
  const countdownElem = document.getElementById("countdown");
  const resultElem = document.getElementById("result");
  const submitBtn = document.getElementById("submit-btn");

  // Correct answers and explanations
  const answers = {
    q1: "B",
    q2: "A",
  };
  const explanations = {
    q1: "The main idea is Option 2 because...",
    q2: "The tone is Option 1 because...",
  };

  // Countdown timer function
  const updateCountdown = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    countdownElem.textContent = `Time: ${minutes}:${
      seconds < 15 ? "0" : ""
    }${seconds}`;
    time--;

    if (time < 0) {
      clearInterval(timer);
      alert("Time's up! Submitting automatically.");
      handleSubmit();
    }
  };

  const timer = setInterval(updateCountdown, 1000);

  // Handle form submission
  const handleSubmit = () => {
    clearInterval(timer);
    const form = document.getElementById("quiz-form");
    const formData = new FormData(form);
    let output = "<h2>Results</h2>";
    let correctCount = 0;

    for (const [question, correctAnswer] of Object.entries(answers)) {
      const userAnswer = formData.get(question);
      if (userAnswer === correctAnswer) {
        correctCount++;
        output += `<p>${question.toUpperCase()}: Correct! (${
          explanations[question]
        })</p>`;
      } else {
        output += `<p>${question.toUpperCase()}: Wrong! Correct answer: ${correctAnswer}. ${
          explanations[question]
        }</p>`;
      }
    }

    output += `<p><strong>Total Correct:</strong> ${correctCount} / ${
      Object.keys(answers).length
    }</p>`;
    resultElem.innerHTML = output;
    resultElem.style.display = "block";
  };

  submitBtn.addEventListener("click", handleSubmit);
});
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
