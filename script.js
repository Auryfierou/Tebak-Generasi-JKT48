// List member dan generasi
const members = [
  {
    name: "Grace Octaviani",
    birthdate: "18 Oktober 2007",
    birthplace: "Semarang",
    generation: "11",
  },
  {
    name: "Greesella Adhalia Sophina",
    birthdate: "10 Januari 2006",
    birthplace: "Semarang",
    generation: "11",
  },
];

const allGenerations = Array.from(
  { length: 12 },
  (_, i) => `Generasi ${i + 1}`
);

let currentQuestion = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
const totalQuestions = 20;

const correctSpan = document.getElementById("correct");
const incorrectSpan = document.getElementById("incorrect");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function initializeQuestion() {
  const currentMember = members[currentQuestion];
  const biodataDiv = document.getElementById("biodata-container");
  const choicesDiv = document.getElementById("choices-container");

  biodataDiv.innerHTML = `
    <p id="bio">Nama: ${currentMember.name}</p>
    <p id="bio">Tanggal Lahir: ${currentMember.birthdate}</p>
    <p id="bio">Tempat Lahir: ${currentMember.birthplace}</p>
  `;

  choicesDiv.innerHTML = allGenerations
    .map(
      (generation) => `
    <button class="choice-btn" onclick="checkAnswer('${generation}')">${generation}</button>
  `
    )
    .join("");
}

function checkAnswer(selectedGeneration) {
  if (currentQuestion < totalQuestions) {
    const currentMember = members[currentQuestion];

    if (selectedGeneration === currentMember.generation) {
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }

    currentQuestion++;

    initializeQuestion();
    updateScore();
  } else {
    quizCompleted();
  }
}

function quizCompleted() {
  swal(
    "Selesai!",
    "Quiz completed! Total Benar: " +
      correctAnswers +
      ", Total Salah: " +
      incorrectAnswers,
    "success",
    {
      button: "Let's Go!",
    }
  ).then(() => {
    resetQuiz();
    initializeQuestion();
  });
}

function updateScore() {
  correctSpan.textContent = correctAnswers;
  incorrectSpan.textContent = incorrectAnswers;
}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  updateScore();
}

initializeQuestion();
