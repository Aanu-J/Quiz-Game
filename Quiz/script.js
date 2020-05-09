function buildQuiz(){
    const output = [];
    myQuestions.forEach(
        (currentQuestions, questionNumber) => {
            const answers = [];
            for (letter in currentQuestions.answers){
                answers.push(
                    <label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter} :
                            ${currentQuestions.answers[letter]}
                        </input>
                    </label>
                );
            }
            output.push(
                <div class="question"> ${currentQuestions.question}</div>
                <div class="answers"> ${answers.join('')}</div>
            );
        }
    );
    quizContainer.innerHTML = output.join('');
}

function showResults(){
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    myQuestions.forEach( (currentQuestions, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name = question${questionNumber}] : checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(userAnswer === currentQuestions.correctAnswer){
            numCorrect++;
            answerContainers[questionNumber].style.color = 'green';
        }
        else{
            answerContainers[questionNumber].style.color = 'red';
        }
    });
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.elementFromPoint('submit');
//questions
const myQuestions = [
    {
        question: "What year was the very first model of the iPhone released?",
        answers: {
            a: 2008,
            b: 2007,
            c: 2006
        },
        correctAnswer: "b"
    },
    {
        question: "Which email service is owned by Microsoft?",
        answers: {
            a: "Hotmail",
            b: "Gmail",
            c: "Yahoo mail"
        },
        correctAnswer: "a"
    },
    {
        question: "Who is often called the father of computer?",
        answers: {
            a: "Charles Gabbage",
            b: "Charles Baggage",
            c: "Charles Babbage"
        }
        correctAnswer: "c"
    },
    {
        question: "How many bit makes a byte?",
        answers: {
            a: 8,
            b: 16,
            c: 24
        },
        correctAnswer: "a"
    },
    {
        question: "Who invented JavaScript?",
        answers: {
            a: "Bill Gates",
            b: "Brendan Eich",
            c: "Douglas Crockford"
        },
        correctAnswer: "b"
    }
];

//display quiz right away
buildQuiz(
    output.push(
        <div class="slide">
            <div class="question"> ${currentQuestions.question} </div>
            <div class="answers"> ${answers.join(" ")} </div>
        </div>
    );
);

//Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

//Show the first slide
function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if(currentSlide === 0){
        previousButton.style.display = "none";
    }
    else{
        previousButton.style.display = "inline-block";
    }
    if(currentSlide === slides.length-1){
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    }
    else{
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    }
}
showSlide(currentSlide);

//on submit, show results
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

