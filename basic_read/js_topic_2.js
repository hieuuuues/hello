document.addEventListener("DOMContentLoaded", function () {
  let time = 900; // Countdown time in seconds (10 minutes)
  const countdownElem = document.getElementById("countdown");
  const resultElem = document.getElementById("result");
  const submitBtn = document.getElementById("submit-btn");

  // Correct answers and explanations
  const answers = {
    q1: "D",
    q2: "D",
  };
  const explanations = {
    q1: "The main idea is Option 2 because.sfgdgsdfgdfgsgađágdg..",
    q2: "The tone is Option 1 because.sdgsgsdgsdgsdgsdgsdgsdgsdgsdgdssdgsdgsg..",
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
