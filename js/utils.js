function rectangularColission({rectangule1, rectangule2}) {
  return (
    rectangule1.attackBox.position.x + rectangule1.attackBox.width >= rectangule2.position.x && 
    rectangule1.attackBox.position.x <= rectangule2.position.x + rectangule2.width && 
    rectangule1.attackBox.position.y + rectangule1.attackBox.height >= rectangule2.position.y && 
    rectangule1.attackBox.position.y <= rectangule2.position.y + rectangule2.height
    )
}

function Originalside(left, right) {
  if (left.position.x < right.position.x) {
    return true;
  } else return false;
}

function determineWinner({player, enemy}){
  clearTimeout(timerid);
  gameover = true;
  document.querySelector('#timeoff').style.display = 'flex';
  if(player.health === enemy.health){
    document.querySelector('#timeoff').innerHTML = 'Tie';
  }else if(player.health > enemy.health){
    document.querySelector('#timeoff').innerHTML = 'Player 1 wins';
  }else{
    document.querySelector('#timeoff').innerHTML = 'Player 2 wins';
  }
}

let timer = 90;
let timerid;
let gameover = false;
function decreaseTimer(){ 
    if(timer > 0) {
      timerid = setTimeout(decreaseTimer, 1000);
      timer--;
      document.querySelector('#timer').innerHTML = timer;
    }

    if(timer === 0){
      determineWinner({player, enemy, timerid});
    }
  }