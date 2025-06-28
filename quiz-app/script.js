const DOM = {
    beginCard: document.getElementById("begin-card"),
    beginForm: document.getElementsByTagName("form")[0],
    nameInput: document.getElementById("name-inp"),
    confirmInput: document.getElementById("confirm-inp"),
    quizCard: document.getElementById("quiz-card"),
    currQuesNoTxt: document.getElementById("curr-ques-no-txt"),
    totalQuesNoTxt: Array.from(document.getElementsByClassName("total-ques-no-txt")),
    quesTxt: document.getElementById("ques-txt"),
    optionsList: document.getElementById("options-list"),
    nextQuesBtn: document.getElementById("next-ques-btn"),
    resultCard: document.getElementById("result-card"),
    userNameTxt: document.getElementById("user-name-txt"),
    scoreTxt: document.getElementById("score-txt"),
    retakeBtn: document.getElementById("retake-btn")
};

const questionBank = [
    {
        question: "What is the capital of the Indian state of Tripura?",
        choices: ["Dispur", "Itanagar", "Agartala", "Darjeeling"],
        answer: "Agartala"
    },
    {
        question: "Which of the following city is known as least populated city of India?",
        choices: ["Kapurthala", "Bilaspur", "Panjim", "Mysuru"],
        answer: "Kapurthala"
    },
    {
        question: "Which of the following Indian state doesn't have a coast?",
        choices: ["Andhra Pradesh", "West Bengal", "Gujarat", "Telangana"],
        answer: "Telangana"
    },
    {
        question: "What is the national aquatic animal of India?",
        choices: ["Blue whale", "River dolphin", "Sea turtle", "Otter"],
        answer: "River dolphin"
    },
    {
        question: "Which river is considered the longest in India?",
        choices: ["Tapi", "Ganga", "Godavari", "Brahmaputra"],
        answer: "Ganga"
    }
];

const noOfQues = questionBank.length;
let userName;
let currQuesNo;
let currChoice;
let userScore;
let userAnswers = [];


function evalResult() {
    for (let choiceIndex in userAnswers) {
        if (userAnswers[choiceIndex] === questionBank[choiceIndex].answer) userScore++;
    }
}

function startQuiz() {
    currQuesNo = 0;
    currChoice = null;
    userScore = 0;
    userAnswers = [];

    DOM.beginCard.classList.add("hidden");
    DOM.resultCard.classList.replace("flex", "hidden");
    DOM.nextQuesBtn.textContent = "Next";
    DOM.quizCard.classList.toggle("hidden");
    DOM.userNameTxt.textContent = userName;
    DOM.totalQuesNoTxt.forEach((node) => { node.textContent = String(noOfQues); });

    showQuestion();
}

function showQuestion() {
    const questionObj = questionBank[currQuesNo];
    currChoice = null;

    DOM.currQuesNoTxt.textContent = currQuesNo + 1;
    DOM.quesTxt.textContent = questionObj.question;
    DOM.optionsList.replaceChildren();

    questionObj.choices.forEach((choice) => {
        const choiceItem = document.createElement("li");
        // noinspection JSValidateTypes
        choiceItem.classList = "w-100 min-h-10 flex items-center rounded-lg bg-gray-600 px-7";
        // noinspection JSValidateTypes
        choiceItem.textContent = choice;
        DOM.optionsList.appendChild(choiceItem);
        
        choiceItem.addEventListener("click", () => {
            Array.from(DOM.optionsList.children).forEach((choiceLi) => {
                choiceLi.classList.replace("bg-purple-600", "bg-gray-600");
            });
            choiceItem.classList.replace("bg-gray-600", "bg-purple-600");
            currChoice = choiceItem.textContent;
        });
    });
}

function showResult() {
    evalResult();

    DOM.quizCard.classList.toggle("hidden");
    DOM.resultCard.classList.replace("hidden", "flex");
    DOM.scoreTxt.textContent = userScore;
}


document.addEventListener('DOMContentLoaded', () => {
    DOM.beginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = DOM.nameInput.value.trim();
        const confirmTxt = DOM.confirmInput.value.trim().toLowerCase();
        if (name && isNaN(name) && confirmTxt === "yes") {
            DOM.beginCard.classList.toggle("hidden");
            userName = name;
            startQuiz();
        }
    });

    DOM.nextQuesBtn.addEventListener("click", () => {
        if (!currChoice) return;

        userAnswers.push(currChoice);
        
        if (currQuesNo === noOfQues - 1) {
            showResult();
            return;
        }

        currQuesNo++;

        if (currQuesNo === noOfQues - 1) {
            DOM.nextQuesBtn.textContent = "Finish";
        }

        showQuestion();
    });
    
    DOM.retakeBtn.addEventListener("click", () => {
        startQuiz();
    })
});
