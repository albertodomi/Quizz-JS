const questions = [
    {
        question: "Qual é a capital da França?",
        options: ["Londres", "Berlim", "Paris"],
        answer: "Paris"
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        options: ["Vênus", "Júpiter", "Marte"],
        answer: "Júpiter"
    },
    {
        question: "Quem escreveu 'Romeu e Julieta'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen"],
        answer: "William Shakespeare"
    }
];

let currentQuestionIndex = -1;
let correctAnswers = 0;
let wrongAnswers = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showQuestion(question) {
    const questionElement = document.getElementById("question");
    questionElement.textContent = question.question;

    const optionsList = document.getElementById("options");
    optionsList.innerHTML = "";

    shuffleArray(question.options);

    question.options.forEach((option, index) => {
        const listItem = document.createElement("li");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = option;
        listItem.appendChild(input);
        listItem.appendChild(document.createTextNode(option));
        optionsList.appendChild(listItem);
    });
}

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const userAnswer = selectedAnswer.value;
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer === correctAnswer) {
            correctAnswers++;
        } else {
            wrongAnswers++;
        }

        const resultElement = document.getElementById("result");

        if (userAnswer === correctAnswer) {
            resultElement.textContent = "Resposta correta!";
        } else {
            resultElement.textContent = `Resposta errada. A resposta correta é: ${correctAnswer}`;
        }

        const scoreElement = document.getElementById("score");
        scoreElement.textContent = `Acertos: ${correctAnswers} | Erros: ${wrongAnswers}`;
    } else {
        const resultElement = document.getElementById("result");
        resultElement.textContent = "Por favor, selecione uma resposta.";
        return;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
    } else {
        const form = document.getElementById("quizForm");
        form.innerHTML = "<p>Quiz concluído!</p>";
    }
}

// Iniciar o quiz
showQuestion(questions[0]);
const nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", nextQuestion);
