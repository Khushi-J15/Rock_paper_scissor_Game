let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let isAutoPlaying = false;
let intervalId;

function resetScore(){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}

  
  document.querySelector('.reset-score-button')
  .addEventListener('click', () => {
    // resetScore();
    showResetConfirmation();
  });

  document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
      autoPlay();
    });

    
  document.body
  .addEventListener('keydown', (event) => {
    if(event.key === 'r'){
      playGame('rock');
    }
    else if(event.key === 'p'){
      playGame('paper');
    }
    else if(event.key === 's'){
      playGame('scissors');
    }

    else if(event.key === 'a'){
      autoPlay();
    }

    else if(event.key === 'Backspace'){
      showResetConfirmation();
      // resetScore();
    }
    
  });

  function showResetConfirmation(){
    document.querySelector('.js-reset-confirmation').innerHTML = `Are you sure you want to reset the score ?
    <button class="js-reset-confirm-yes reset-confirm-button">
      Yes
    </button>
    <button class="js-reset-confirm-no reset-confirm-button">
      No
    </button>
    `;

    document.querySelector('.js-reset-confirm-yes').addEventListener('click',() => {
      resetScore();
      hideResetConfirmation();
    });
  
    document.querySelector('.js-reset-confirm-no').addEventListener('click',() => {
      hideResetConfirmation();
    });
    
  }

  function hideResetConfirmation(){
    document.querySelector('.js-reset-confirmation').innerHTML = '';
  }

function autoPlay(){
  const autoPlayElement = document.querySelector('.js-auto-play-button');
  autoPlayElement.innerHTML = 'Stop Playing';

  if(!isAutoPlaying){
    intervalId = setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying = true;
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayElement.innerHTML = 'Auto Play';
  }
  
}

updateScoreElement();

function playGame(playerMove){
  const computerMove = pickComputerMove();

  let result = '';
  if(playerMove === 'scissors'){
      if(computerMove === 'rock'){
        result = 'You lose.';
      }
      else if(computerMove === 'paper'){
        result = 'You Win.';
      }
      else if(computerMove === 'scissors'){
        result = 'Tie';
      }
  }

  else if(playerMove === 'paper'){
      if(computerMove === 'rock'){
        result = 'You Win.';
      }
      else if(computerMove === 'paper'){
        result = 'Tie.';
      }
      else if(computerMove === 'scissors'){
        result = 'You lose.';
      }
  }

  if(playerMove === 'rock'){
      if(computerMove === 'rock'){
        result = 'Tie.';
      }
      else if(computerMove === 'paper'){
        result = 'You lose.';
      }
      else if(computerMove === 'scissors'){
        result = 'You Win.';
      }
  }

  if(result === 'You Win.'){
    score.wins++;
  }
  else if(result === 'You lose.'){
    score.losses++;
  }
  else{
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;

}

function updateScoreElement(){

  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

}

function pickComputerMove(){
  const randomNumber = Math.random();
    let computerMove = '';
    if(randomNumber >= 0 && randomNumber < 1/3){
      computerMove = 'rock';
    }
    else if(randomNumber >= 1/3 && randomNumber < 2/3){
      computerMove = 'paper';
    }
    else if(randomNumber >= 2/3 && randomNumber < 1){
      computerMove = 'scissors';
    }
  return computerMove;
}