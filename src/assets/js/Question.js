export default class Question {
    constructor(question, reponse) {
        this.question = question;
        this.reponse = reponse;
    }

    toHtml() {
        const div = document.createElement('div');
        const questionElement = document.createElement('p');
        const answerUser = document.createElement('input');
        const btn = document.createElement('button');
        const text = document.createElement('p');

        div.className = ' min-w-[325px]  lg:min-w-[600px]  px-4 flex flex-col justify-center items-center snap-start gap-8';
        questionElement.className = 'text-white text-2xl'
        answerUser.className = 'w-full p-2 rounded-sm'
        btn.className = 'w-1/2 bg-white bg-opacity-50 drop-shadow-xl hover:bg-black hover:text-white  p-2 rounded-sm'
        text.className = 'text-white'
        questionElement.textContent = this.question;
        btn.textContent = 'Valider';

        div.appendChild(questionElement);
        div.appendChild(answerUser);
        div.appendChild(btn);
        div.appendChild(text);

        btn.addEventListener('click', () => {
            const value = answerUser.value.toLowerCase();
            const isCorrect = this.checkAnswer(value, text);

            if (isCorrect) {
                updateQuestion(); 
            }
        });



        return div;
    }

    checkAnswer(value, text) {
        if (value !== this.reponse.toLowerCase()) {
            text.textContent = `Dommage, ${value} n'est pas la bonne réponse`;
            return false;
        } else {
            text.textContent = `Bravo, ${value} est la bonne réponse`;
            return true;
        }
    }
}

const container = document.querySelector('.container__question');

const questions = [
    new Question('Je suis une couleur et je suis le mélange du rouge et du jaune. Qui suis-je ?', 'orange'),
    new Question(" J'ai des villes mais pas de maisons, des forêts mais pas d'arbres, et des rivières mais pas d'eau. Qui suis-je ?", 'carte'),
    new Question ("Je suis un fruit jaune et courbé. Qui suis-je ?", "banane"),
    new Question(" Plus je sèche, plus je deviens humide. Qui suis-je ?", 'une serviette'),
    new Question ("Je suis souvent devant vous mais vous ne pouvez jamais me voir. Qui suis-je ?", 'futur'),
    new Question ("Je suis souvent devant vous mais vous ne pouvez jamais me voir. Qui suis-je ?", 'tout les mois'),
    new Question ("Je commence par un 'e', je finis par un 'e', et je ne contiens qu'une lettre. Qui suis-je ?", 'une enveloppe'),

];


let currentQuestionIndex = 0;

function displayQuestion(index) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    container.appendChild(questions[index].toHtml());
}

function updateQuestion() {
    currentQuestionIndex++; 

    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex); 
    } else {
        const endMessage = document.createElement('p');
        endMessage.textContent = "Félicitations, vous avez terminé toutes les questions !";
        container.appendChild(endMessage);
    }
}


displayQuestion(currentQuestionIndex);

