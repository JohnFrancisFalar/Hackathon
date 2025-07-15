const storyQuizzes = [
  {
    title: "The Mars Mission",
    story: "You're the lead engineer on humanity's first Mars colony mission. The journey takes 9 months, and you need to ensure the crew's survival.",
    image: "../Images/marsmission.png",
    chapters: [
      {
        text: "Launch day arrives. Your rocket uses a revolutionary propulsion system. What fuel provides the best efficiency for the Mars journey?",
        options: ["Liquid hydrogen and oxygen", "Solid rocket fuel", "Nuclear thermal", "Ion propulsion"],
        correct: 2,
        result: "Nuclear thermal propulsion offers the best balance of thrust and efficiency for Mars missions!"
      },
      {
        text: "Halfway to Mars, solar panels malfunction. You need backup power. What's your solution?",
        options: ["Wind turbines", "Radioisotope thermoelectric generator", "Exercise bikes", "Chemical batteries"],
        correct: 1,
        result: "RTGs provide reliable power in deep space where solar energy is limited!"
      },
      {
        text: "Arriving at Mars, you must choose a landing site. What's the most important factor?",
        options: ["Scenic views", "Water ice deposits", "Flat terrain only", "Distance from Earth"],
        correct: 1,
        result: "Water ice is crucial for survival - it provides drinking water, oxygen, and rocket fuel!"
      }
    ]
  }
];

let currentChapterIndex = 0;

function startStoryQuiz() {
  currentChapterIndex = 0;
  const story = storyQuizzes[0];
  document.getElementById('storyTitle').textContent = story.title;
  showStoryChapter(story, currentChapterIndex);
}

function showStoryChapter(story, index) {
  const chapter = story.chapters[index];
  const container = document.getElementById('storyContent');

  const showIntro = index === 0;

  container.innerHTML = `
    ${showIntro ? `<img src="${story.image}" alt="Story Image" class="story-image">
    <p class="story-text">${story.story}</p>` : ''}
    <p class="story-text">${chapter.text}</p>
    <div class="quiz-options">
      ${chapter.options.map((opt, i) => `
        <div class="quiz-option" onclick="selectOption(${i}, ${chapter.correct}, '${chapter.result}')">${opt}</div>
      `).join('')}
    </div>
  `;

  updateProgressBar(index + 1, story.chapters.length);
}

function selectOption(selected, correct, resultText) {
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, i) => {
    opt.onclick = null;
    if (i === correct) {
      opt.classList.add('correct');
    } else if (i === selected && i !== correct) {
      opt.classList.add('incorrect');
    }
  });

  const result = document.createElement('div');
  result.className = 'result-message';
  result.textContent = resultText;
  document.getElementById('storyContent').appendChild(result);

  setTimeout(() => {
    const story = storyQuizzes[0];
    if (currentChapterIndex < story.chapters.length - 1) {
      currentChapterIndex++;
      showStoryChapter(story, currentChapterIndex);
    } else {
      showStoryComplete();
    }
  }, 2500);
}

function showStoryComplete() {
  const container = document.getElementById('storyContent');
  container.innerHTML = `
    <h2 style="text-align:center;">Mission Complete! 🚀</h2>
    <p style="text-align:center;">You've successfully completed the Mars mission simulation. Well done!</p>
    <div style="text-align:center;">
      <button onclick="startStoryQuiz()" class="quiz-option" style="display:inline-block; margin-top:20px;">Play Again</button>
    </div>
  `;
  updateProgressBar(1, 1); 
}

function updateProgressBar(current, total) {
  const percent = (current / total) * 100;
  document.getElementById('storyProgress').style.width = `${percent}%`;
}

document.addEventListener('DOMContentLoaded', startStoryQuiz);