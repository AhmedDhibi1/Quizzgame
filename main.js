let div_images = document.querySelector(".images-content");
let div_up = document.querySelector(".up");
let mistake = document.querySelector(".wrong-answers");
let mainres = document.querySelector(".mainres");
let final_result = document.querySelector(".final_result");
let result = document.querySelector(".result");
let score = document.querySelector(".score");
let close = document.querySelector(".closing");
let timer = document.querySelector(".timing");
mistake.textContent = 0;

for (let i = 0; i < div_images.children.length; i++) {
  div_images.children[i].setAttribute("data-number", i);
  div_up.children[i].setAttribute("data-number", i);
}

for (let i = 0; i < div_images.children.length; i = i + 2) {
  div_images.children[i].setAttribute("data-set", i);
  div_images.children[i + 1].setAttribute("data-set", i);
}

let t = 120;
timer.textContent = t;

let interval = setInterval(function () {
  t--;
  timer.textContent = t;
  if (t <= 0) {
    clearInterval(interval);
    checkGameResult();
  }
}, 1000);

function generateUniqueRandomNumbers(n) {
  var numbers = [];

  for (var i = 0; i < n; i++) {
    var randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * n);
    } while (numbers.includes(randomNumber));

    numbers.push(randomNumber);
  }

  return numbers;
}

let arr = Array.from(div_images.children);
let Arr = Array.from(div_up.children);
let randomNumbers = generateUniqueRandomNumbers(div_images.children.length);

for (let i = 0; i < div_images.children.length; i++) {
  for (let j = 0; j < div_images.children.length; j++) {
    if (div_images.children[i].getAttribute("data-number") == randomNumbers[j]) {
      arr[j] = div_images.children[i];
      Arr[j] = div_up.children[i];
    }
  }
}

for (let i = 0; i < div_images.children.length; i++) {
  div_images.appendChild(arr[i]);
  div_up.appendChild(Arr[i]);
}

let k = 0;
let clicked = [];
let isGameOver = false; // New variable to track game over status

for (let i = 0; i < div_images.children.length; i++) {
  (function (index) {
    div_up.children[index].addEventListener("click", function () {
      if (isGameOver) return; // Return if the game is already over
      div_up.children[index].classList.add("hidden-click");
      div_images.children[index].classList.add("image_visible");
      if (clicked.length < 2) {
        clicked.push(div_images.children[index]);
      }
      if (clicked.length === 2) {
        if (
          clicked[0].getAttribute("data-set") !==
          clicked[1].getAttribute("data-set")
        ) {
          setTimeout(function () {
            for (let j = 0; j < div_images.children.length; j++) {
              if (
                div_images.children[j] === clicked[0] ||
                div_images.children[j] === clicked[1]
              ) {
                div_images.children[j].classList.remove("image_visible");
                div_up.children[j].classList.remove("hidden-click");
              }
            }
            clicked = [];
            k++;
            mistake.textContent = k;
            checkGameResult();
          }, 500);
        } else {
          clicked = [];
        }
      }
    });
  })(i);
}

function checkGameResult() {
  if (k >= 10) {
    endGame("looser");
  } else if (isAllImagesVisible()) {
    endGame("winner");
  } else if (t <= 0) {
    endGame("looser");
  }
}
let s=div_images.children.length;
function isAllImagesVisible() {
  for (let j = 0; j < div_images.children.length; j++) {
    if (!div_images.children[j].classList.contains("image_visible")) {
      s--;
      return false;
    }
  }
  return true;
}

function endGame(resultType) {
  isGameOver = true; 
  mainres.classList.add("final_res");
  final_result.classList.add("final_result_visibility");
  result.classList.add(resultType);
  result.textContent = resultType;
  score.textContent = `score: ${div_images.children.length - k}`;
}

close.addEventListener("click", function () {
  location.reload();
});





  
  
