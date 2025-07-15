window.scienceEasy = [
    {
        question: 'What planet is known as the "Red Planet"?',
        choices: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
        answer: 'Mars'
    },
    {
        question: 'What is the boiling point of water in Celsius?',
        choices: ['90°C', '100°C', '110°C', '80°C'],
        answer: '100°C'
    },
    {
    question: 'Which organ pumps blood throughout the body?',
    choices: ['Liver', 'Heart', 'Lungs', 'Stomach'],
    answer: 'Heart'
  },
  {
    question: 'Which gas do we breathe in to survive?',
    choices: ['Carbon Dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'],
    answer: 'Oxygen'
  },
  {
    question: 'What state of matter is water at room temperature?',
    choices: ['Solid', 'Gas', 'Liquid', 'Plasma'],
    answer: 'Liquid'
  },
  {
    question: 'What natural satellite orbits the Earth?',
    choices: ['Mars', 'Comet', 'Moon', 'Venus'],
    answer: 'Moon'
  },
  {
    question: 'Which sense organ allows us to see?',
    choices: ['Nose', 'Eyes', 'Ears', 'Skin'],
    answer: 'Eyes'
  },
  {
    question: 'What is the center of the solar system?',
    choices: ['Earth', 'Moon', 'Sun', 'Mars'],
    answer: 'Sun'
  },
  {
    question: 'What do bees collect from flowers?',
    choices: ['Nectar', 'Water', 'Honey', 'Nectar'],
    answer: 'Nectar'
  },
  {
    question: 'Which force pulls objects toward the Earth?',
    choices: ['Magnetism', 'Gravity', 'Friction', 'Electricity'],
    answer: 'Gravity'
  }
]

window.scienceMedium = [
  {
    question: 'What gas do plants absorb during photosynthesis?',
    choices: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'],
    answer: 'Carbon dioxide'
  },
  {
    question: 'What is the center of an atom called?',
    choices: ['Electron', 'Orbit', 'Nucleus', 'Molecule'],
    answer: 'Nucleus'
  },
  {
    question: 'Which part of the human eye controls light entry?',
    choices: ['Cornea', 'Retina', 'Iris', 'Lens'],
    answer: 'Iris'
  },
  {
    question: 'What type of blood cells fight infection?',
    choices: ['Red', 'White', 'Platelets', 'Plasma'],
    answer: 'White'
  },
  {
    question: 'What organ produces insulin?',
    choices: ['Liver', 'Stomach', 'Pancreas', 'Kidney'],
    answer: 'Pancreas'
  },
  {
    question: 'Which gas is most abundant in Earth’s atmosphere?',
    choices: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'],
    answer: 'Nitrogen'
  },
  {
    question: 'What force resists motion between surfaces?',
    choices: ['Gravity', 'Friction', 'Magnetism', 'Electricity'],
    answer: 'Friction'
  },
  {
    question: 'What unit measures force?',
    choices: ['Watt', 'Pascal', 'Newton', 'Volt'],
    answer: 'Newton'
  },
  {
    question: 'What part of a plant absorbs water?',
    choices: ['Leaves', 'Roots', 'Stem', 'Flowers'],
    answer: 'Roots'
  },
  {
    question: 'Which phase of matter has no fixed volume or shape?',
    choices: ['Solid', 'Liquid', 'Gas', 'Plasma'],
    answer: 'Gas'
  }
];

window.scienceHard = [
  {
    question: 'What is the chemical symbol for gold?',
    choices: ['Au', 'Ag', 'Gd', 'Go'],
    answer: 'Au'
  },
  {
    question: 'Which part of the brain controls balance and coordination?',
    choices: ['Cerebrum', 'Medulla', 'Cerebellum', 'Thalamus'],
    answer: 'Cerebellum'
  },
  {
    question: 'What is the powerhouse of the cell?',
    choices: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'],
    answer: 'Mitochondria'
  },
  {
    question: 'Which scientist developed the laws of motion?',
    choices: ['Newton', 'Einstein', 'Galileo', 'Kepler'],
    answer: 'Newton'
  },
  {
    question: 'Which planet has the most moons?',
    choices: ['Jupiter', 'Saturn', 'Mars', 'Neptune'],
    answer: 'Saturn'
  },
  {
    question: 'What is the basic unit of heredity?',
    choices: ['DNA', 'Gene', 'Chromosome', 'Protein'],
    answer: 'Gene'
  },
  {
    question: 'What’s the pH of pure water?',
    choices: ['5', '7', '9', '0'],
    answer: '7'
  },
  {
    question: 'What do we call animals that eat only plants?',
    choices: ['Omnivores', 'Carnivores', 'Herbivores', 'Detritivores'],
    answer: 'Herbivores'
  },
  {
    question: 'What is the hardest natural substance?',
    choices: ['Iron', 'Quartz', 'Diamond', 'Granite'],
    answer: 'Diamond'
  },
  {
    question: 'What gas do humans exhale?',
    choices: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    answer: 'Carbon Dioxide'
  }
];

const params = new URLSearchParams(window.location.search);
const difficulty = params.get('difficulty');

let currentQuestions = [];
let currentIndex = 0;
let score = 0;

if (difficulty === 'easy') {
  currentQuestions = window.scienceEasy;
} else if (difficulty === 'medium') {
  currentQuestions = window.scienceMedium;
} else if (difficulty === 'hard') {
  currentQuestions = window.scienceHard;
}

const modal = document.getElementById('quiz-modal');
const questionText = document.getElementById('question-text');
const choicesBox = document.getElementById('choices-box'); // ✅ fixed
const nextBtn = document.getElementById('next-btn');       // ✅ defined

modal.style.display = 'flex';
showQuestion();

function showQuestion() {
  const q = currentQuestions[currentIndex];
  questionText.textContent = `${currentIndex + 1}. ${q.question}`;
  choicesBox.innerHTML = '';

  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.className = 'choice-btn';
    btn.onclick = () => selectAnswer(btn, q.answer);
    choicesBox.appendChild(btn);
  });

  nextBtn.style.display = 'none'; // hide next until answered
}

function selectAnswer(selectedBtn, correctAnswer) {
  const allBtns = document.querySelectorAll('.choice-btn');
  allBtns.forEach(btn => (btn.disabled = true));

  if (selectedBtn.textContent === correctAnswer) {
    selectedBtn.style.backgroundColor = 'green';
    score++;
  } else {
    selectedBtn.style.backgroundColor = 'red';
    allBtns.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.style.backgroundColor = 'green';
      }
    });
  }

  nextBtn.style.display = 'inline-block';
  nextBtn.onclick = () => {
    currentIndex++;
    if (currentIndex < currentQuestions.length) {
      showQuestion();
    } else {
      questionText.textContent = `Quiz Complete! Score: ${score} / ${currentQuestions.length}`;
      choicesBox.innerHTML = '';
      nextBtn.style.display = 'none';
    }
  };
}
