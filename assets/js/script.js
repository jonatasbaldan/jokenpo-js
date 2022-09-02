const OPTIONS = {
  PEDRA: "PEDRA",
  TESOURA: "TESOURA",
  PAPEL: "PAPEL",
};
const OPTIONS_EMOJI = {
  [OPTIONS.PEDRA]: "✊",
  [OPTIONS.TESOURA]: "✌️",
  [OPTIONS.PAPEL]: "✋",
};
const WIN_CONDITIONS = [
  { PLAYER: OPTIONS.PEDRA, COMPUTER: OPTIONS.TESOURA },
  { PLAYER: OPTIONS.TESOURA, COMPUTER: OPTIONS.PAPEL },
  { PLAYER: OPTIONS.PAPEL, COMPUTER: OPTIONS.PEDRA },
];
const RESULTS = {
  PLAYER_WON: "Você ganhou!",
  DRAW: "Empate!",
  PLAYER_LOST: "Computador Venceu!",
};

const resultDiv = document.querySelector(".c-game__result");
const optionsDiv = document.querySelector(".c-game__options");
const $H2 = document.querySelector(".c-game__title__choise");
const $BUTTONRESET = document.querySelector(".c-game__reset");

function createPlayerOptions() {
  Object.values(OPTIONS).forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.value = option;
    optionButton.textContent = OPTIONS_EMOJI[option];
    optionButton.className = "c-game__choise has--transition";
    optionButton.onclick = () => executeMainGame(option);
    optionsDiv.appendChild(optionButton);
  });
}

createPlayerOptions();

const $BUTTONS = document.querySelectorAll(".c-game__choise");

function getComputerChoice() {
  const optionsAmount = Object.values(OPTIONS).length;
  const randomNumber = parseInt(Math.random() * optionsAmount);
  return Object.values(OPTIONS)[randomNumber];
}

function getGameResult(playerChoice, computerChoice) {
  const meetsWinConditions = WIN_CONDITIONS.some(
    (condition) =>
      condition.PLAYER === playerChoice && condition.COMPUTER === computerChoice
  );

  if (meetsWinConditions) {
    return RESULTS.PLAYER_WON;
  }

  if (computerChoice === playerChoice) {
    return RESULTS.DRAW;
  }

  return RESULTS.PLAYER_LOST;
}

function executeMainGame(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = getGameResult(playerChoice, computerChoice);

  resultDiv.style.display = "flex";

  resultDiv.innerHTML = `<section class="c-game__winner__animation">
                                <div class="c-game__option__animation is--right has--animation">${OPTIONS_EMOJI.PEDRA}</div>
                                <div class="c-game__option__animation is--left has--animation">${OPTIONS_EMOJI.PEDRA}</div>
                            </section>`;

  //Display the results after the hands animation.
  setTimeout(() => {
    resultDiv.innerHTML = `<section class="c-game__winner">
                                    <div class="c-game__option is--right">${OPTIONS_EMOJI[playerChoice]}</div>
                                    <div class="c-game__option is--x">X</div>
                                    <div class="c-game__option is--left">${OPTIONS_EMOJI[computerChoice]}</div>
                                </section>
                                <p class="c-game__winner__result">${result}</p>`;
  }, 3100);

  animateGame();
}

function animateGame() {
  const hideElements = () => {
    $H2.style.display = "none";

    for (const button of $BUTTONS) {
      button.style.display = "none";
    }
  };

  const H1Animation = () => {
    const $H1 = document.querySelector("h1");
    $H1.innerText = ` `;

    let animationIteration = 0;

    //setInterval will loop every 1 second, when the H1 is entire showed
    //the clearInterval will stop the loop.

    const animation = setInterval(() => {
      const h1Array = ["Pedra", " Papel", " ou Tesoura"];

      animationIteration === 3
        ? clearInterval(animation)
        : ($H1.innerText += h1Array[animationIteration]);

      animationIteration++;
    }, 1000);
  };

  const displayButtonReset = () => {
    $BUTTONRESET.style.display = "block";

    $BUTTONRESET.addEventListener("click", resetGame);
  };

  hideElements();
  H1Animation();
  setTimeout(displayButtonReset, 3500);
}

function resetGame() {
  $H2.style.display = "block";

  $BUTTONRESET.style.display = "none";

  for (const button of $BUTTONS) {
    button.style.display = "block";
  }

  resultDiv.style.display = "none";
}
