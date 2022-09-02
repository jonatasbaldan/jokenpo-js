const playerChoise = document.querySelectorAll('.c-game__choise');
let choiseValue = 0;
let computerValue = 0;
const optionsEmoji = {1: `✊`, 2:`✌️`, 3:`✋`};


for (const choise of playerChoise) {
    choise.addEventListener('click', (button) => {
        
        choiseValue = parseInt(button.target.value);
        
        MainGame ();
    });

}


function ComputerChoise(){
    let randomNumber = parseInt(Math.random() * 3) + 1;
    return randomNumber

}


function MainGame () {
   
    computerValue = ComputerChoise();
    
    const resultDiv = document.querySelector('.c-game__result');
   
    let result = '';

    if ((choiseValue < computerValue) && (computerValue === choiseValue + 1)){
        result = 'Você ganhou!';
    }

    else if (computerValue == choiseValue) {
        result = 'Empate!';
    }

    else if (choiseValue - 2 == computerValue){
        result = 'Você ganhou!';
    }

    else {
        result = 'Computador Venceu!';
    }

    resultDiv.style.display = 'flex';



    resultDiv.innerHTML =   `<section class="c-game__winner__animation">
                                <div class="c-game__option__animation is--right has--animation">${optionsEmoji[1]}</div>
                                <div class="c-game__option__animation is--left has--animation">${optionsEmoji[1]}</div>
                            </section>`;

    //Display the results after the hands animation.
    setTimeout(() => {
        resultDiv.innerHTML =   `<section class="c-game__winner">
                                    <div class="c-game__option is--right">${optionsEmoji[choiseValue]}</div>
                                    <div class="c-game__option is--x">X</div>
                                    <div class="c-game__option is--left">${optionsEmoji[computerValue]}</div>
                                </section>
                                <p class="c-game__winner__result">${result} </p>`;
    }, 3100);

    AnimationGame();
}


function AnimationGame () {

    const hideElements = () => {
        const $H2 = document.querySelector('.c-game__title__choise');
        $H2.style.display = 'none';
    
        const $BUTTONS = document.querySelectorAll('.c-game__choise');

        for (const button of $BUTTONS) {
            button.style.display = 'none';
        }
    }

    const H1Animation = () => {
        const $H1 = document.querySelector('h1');
        $H1.innerText = ` `;

        let countAnimationH1 = 0;

        //setInterval will loop every 1 second, when the H1 is entire showed
        //the clearInterval will stop the loop.
        
        const h1Animation = setInterval(() => {
    
            const h1Array = ['Pedra', ' Papel', ' ou Tesoura'];
            
            countAnimationH1 == 3 ? clearInterval(h1Animation) : $H1.innerText += `${h1Array[countAnimationH1]}`;
    
            countAnimationH1++
        }, 1000);
    }

    const displayButtonReset = () => {
        const $BUTTONRESET = document.querySelector('.c-game__reset');

        $BUTTONRESET.style.display = 'block';

        $BUTTONRESET.addEventListener('click', ResetGame);
    }

    hideElements();
    H1Animation();
    setTimeout(displayButtonReset, 3500);
}


function ResetGame () {
    const $H2 = document.querySelector('.c-game__title__choise');
    $H2.style.display = 'block';

    const $BUTTONRESET = document.querySelector('.c-game__reset');
    $BUTTONRESET.style.display = 'none';

    const $BUTTONS = document.querySelectorAll('.c-game__choise');

    for (const button of $BUTTONS) {
        button.style.display = 'block';
    }

    const resultDiv = document.querySelector('.c-game__result');
    resultDiv.style.display = 'none';

}