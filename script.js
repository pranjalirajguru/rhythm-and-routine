// Task data structure
const taskData = {
  selfcare: [
    { name: "Skincare Mask", duration: 20, sticker: "skincare.gif" },
    { name: "Meditation", duration: 15, sticker: "meditation.gif" },
    { name: "Stretching/Yoga", duration: 20, sticker: "yoga.gif" },
    { name: "Power Nap", duration: 25, sticker: "nap.gif" },
    { name: "Deep Breathing", duration: 10, sticker: "breathing.gif" },
    { name: "Gratitude Journaling", duration: 10, sticker: "journal.gif" },
  ],
  focus: [
    { name: "Reading Time", duration: 30, sticker: "reading.gif" },
    { name: "Study Session", duration: 25, sticker: "study.gif" },
    { name: "Online Course", duration: 30, sticker: "online.gif" },
    { name: "Language Practice", duration: 20, sticker: "language.gif" },
  ],
  chores: [
    { name: "Declutter a Space", duration: 15, sticker: "declutter.gif" },
    { name: "Laundry Load", duration: 30, sticker: "laundry.gif" },
    { name: "Water Plants", duration: 10, sticker: "plants.gif" },
    { name: "Tidy Desk", duration: 10, sticker: "desk.gif" },
    { name: "Dishwashing", duration: 20, sticker: "dishes.gif" },
  ],
  fitness: [
    { name: "Walk/Run", duration: 30, sticker: "run.gif" },
    { name: "HIIT/Workout", duration: 20, sticker: "workout.gif" },
    { name: "Dance Break", duration: 10, sticker: "dance.gif" },
    { name: "Jump Rope", duration: 10, sticker: "rope.gif" },
  ],
  relax: [
    { name: "Make Tea/Coffee", duration: 10, sticker: "coffee.gif" },
    { name: "Watch a Relaxing Video", duration: 15, sticker: "video.gif" },
    { name: "Music Chill Session", duration: 10, sticker: "music.gif" },
    { name: "Aroma Therapy", duration: 15, sticker: "aroma.gif" },
  ],
  digital: [
    { name: "Check Emails", duration: 15, sticker: "email.gif" },
    { name: "Digital Declutter", duration: 20, sticker: "declutter-digital.gif" },
    { name: "Social Media Limit", duration: 10, sticker: "social.gif" },
    { name: "Plan Your Day", duration: 15, sticker: "planner.gif" },
  ]
};

const taskQuotes = {
  // same quotes...
};

const categorySection = document.getElementById("categorySection");
const taskSection = document.getElementById("taskSection");
const timerSection = document.getElementById("timerSection");
const taskGrid = document.getElementById("taskGrid");
const selectedTaskName = document.getElementById("selectedTaskName");
const timerDisplay = document.getElementById("timerDisplay");
const backgroundMusic = document.getElementById("backgroundMusic");
const beepSound = document.getElementById("beepSound");

let countdown;
let remainingTime = 0;
let currentTask = null;
let musicEnabled = true;

function updateBackground(category) {
  const backgrounds = {
    selfcare: "selfcare.jpg",
    focus: "focus.jpg",
    chores: "chores.jpg",
    fitness: "fitness.jpg",
    relax: "relax.jpg",
    digital: "digital.jpg"
  };
  document.body.style.backgroundImage = `url('assets/backgrounds/${backgrounds[category]}')`;
}

document.querySelectorAll(".categoryBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedCategory = btn.dataset.category;
    showTasks(selectedCategory);
  });
});

function showTasks(category) {
  updateBackground(category);
  categorySection.style.display = "none";
  taskSection.style.display = "block";
  timerSection.style.display = "none";
  taskGrid.innerHTML = "";
  document.getElementById("taskTitle").textContent = "Choose a Task";
  taskData[category].forEach(task => {
    const card = document.createElement("div");
    card.className = "taskCard";
    card.dataset.duration = task.duration;
    card.dataset.name = task.name;
    card.innerHTML = `
      <img src="assets/stickers/${task.sticker}" alt="${task.name}" />
      <span>${task.name} – ${task.duration} min</span>
    `;
    card.addEventListener("click", () => {
      startTask(task.name, task.duration);
    });
    taskGrid.appendChild(card);
  });
}

function startTask(name, duration) {
  selectedTaskName.textContent = name;
  currentTask = name;
  remainingTime = duration * 60;
  updateDisplay();
  // showSticker(name);
  // showQuote(name);
  // updateProgressBar();
  taskSection.style.display = "none";
  timerSection.style.display = "block";
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("pauseBtn").style.display = "inline-block";
  document.getElementById("resumeBtn").style.display = "none";
  if (musicEnabled) playMusic();
  startTimer();
  showSticker(name);

}

function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60).toString().padStart(2, "0");
  const seconds = (remainingTime % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  clearInterval(countdown);
  countdown = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(countdown);
      playBeep();
      stopMusic();
      alert(`${currentTask} completed! Well done.`);
      return;
    }
    if (remainingTime === 60) playBeep();
    remainingTime--;
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(countdown);
  backgroundMusic.pause();
}

function resumeTimer() {
  backgroundMusic.play();
  startTimer();
}

function restartTimer() {
  stopMusic();
  clearInterval(countdown);
  updateDisplay();
  startTask(currentTask, Math.ceil(remainingTime / 60));
}

function playMusic() {
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();
}

function stopMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

function playBeep() {
  beepSound.currentTime = 0;
  beepSound.play();
}

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("pauseBtn").style.display = "inline-block";
  startTimer();
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  document.getElementById("pauseBtn").style.display = "none";
  document.getElementById("resumeBtn").style.display = "inline-block";
  pauseTimer();
});

document.getElementById("resumeBtn").addEventListener("click", () => {
  document.getElementById("resumeBtn").style.display = "none";
  document.getElementById("pauseBtn").style.display = "inline-block";
  resumeTimer();
});

document.getElementById("restartBtn").addEventListener("click", restartTimer);

document.getElementById("backToCategories").addEventListener("click", () => {
  taskSection.style.display = "none";
  categorySection.style.display = "block";
  stopMusic();
  document.body.style.backgroundImage = "url('assets/backgrounds/selfcare.jpg')";
});

document.getElementById("backToTasks").addEventListener("click", () => {
  timerSection.style.display = "none";
  taskSection.style.display = "block";
  stopMusic();
  clearInterval(countdown);
});

const themeSwitch = document.getElementById("themeSwitch");
const themeLabel = document.getElementById("themeLabel");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    themeSwitch.checked = true;
    themeLabel.textContent = "☾ Dark Mode";
  } else {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
    themeSwitch.checked = false;
    themeLabel.textContent = "☼ Light Mode";
  }
  localStorage.setItem("theme", theme);
}

themeSwitch.addEventListener("change", () => {
  const selectedTheme = themeSwitch.checked ? "dark" : "light";
  applyTheme(selectedTheme);
});

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

const muteBtn = document.getElementById("muteBtn");

muteBtn.addEventListener("click", () => {
  musicEnabled = !musicEnabled;

  if (musicEnabled) {
    muteBtn.textContent = "🔊";
    // Resume music only if a task is running and music is not already playing
    if (timerSection.style.display === "block" && backgroundMusic.paused) {
      backgroundMusic.play();
    }
  } else {
    muteBtn.textContent = "🔇";
    backgroundMusic.pause();
  }
});


function showSticker(taskName) {
  for (let category in taskData) {
    const task = taskData[category].find(t => t.name === taskName);
    if (task) {
      document.getElementById("stickerContainer").innerHTML = `
        <img src="assets/stickers/${task.sticker}" class="task-sticker" alt="${taskName}" />
      `;
      break;
    }
  }
}

