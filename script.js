const questions = [
    {
        question: "Quel est l'animal le plus grand du monde ?",
        answers: [
            { text: "Requin", correct: false},
            { text: "Baleine bleue", correct: true},
            { text: "Elephant", correct: false},
            { text: "Girafe", correct: false}
        ]
    },
    {
        question: "Quel est le pays le plus petit du monde ?",
        answers: [
            { text: "Vatican", correct: true},
            { text: "Népal", correct: false},
            { text: "Luxembourg", correct: false},
            { text: "Cuba", correct: false}
        ]
    },
    {
        question: "Quel est le plus grand fleuve ?",
        answers: [
            { text: "Amazonie", correct: true},
            { text: "Seine", correct: false},
            { text: "Nil", correct: false},
            { text: "Mékong", correct: false}
        ]
    },
    {
        question: "Quel est le continent le plus petit ?",
        answers: [
            { text: "Antarctique", correct: false},
            { text: "Oceanie", correct: true},
            { text: "Afrique", correct: false},
            { text: "Europe", correct: false}
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function StartQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct"); 
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    }) 
    nextButton.style.display = "block";  
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Tu a eu ${score} sur ${questions.length} !`;
    nextButton.innerHTML = "Rejouer";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
};

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        StartQuiz();
    }
})


StartQuiz();