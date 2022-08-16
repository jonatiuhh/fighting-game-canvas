const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

const player = new Fighter({
  position: {
    x: 0,
    y: 0
  }, 
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  color: 'blue'
})



const enemy = new Fighter({
  position: {
    x: 400,
    y: 100
  }, 
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: -50,
    y: 0
  },
  color: 'red'
})



const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  }
}

function rectangularColission({rectangule1, rectangule2}) {
  return (
    rectangule1.attackBox.position.x + rectangule1.attackBox.width >= rectangule2.position.x && 
    rectangule1.attackBox.position.x <= rectangule2.position.x + rectangule2.width && 
    rectangule1.attackBox.position.y + rectangule1.attackBox.height >= rectangule2.position.y && 
    rectangule1.attackBox.position.y <= rectangule2.position.y + rectangule2.height
    )
}

function determineWinner({player, enemy}){
  clearTimeout(timerid);
  document.querySelector('#timeoff').style.display = 'flex';
  if(player.health === enemy.health){
    document.querySelector('#timeoff').innerHTML = 'Tie';
  }else if(player.health > enemy.health){
    document.querySelector('#timeoff').innerHTML = 'Player 1 wins';
  }else{
    document.querySelector('#timeoff').innerHTML = 'Player 2 wins';
  }
}

let timer = 10;
let timerid;
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

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0,0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -3;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 3;
  }

  //enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -3;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 3;
  }

  //detection  for collision player
  if(rectangularColission({
    rectangule1: player, 
    rectangule2: enemy
    }) && 
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 5
    document.querySelector("#enemyHealth").style.width = enemy.health + '%';
  }
  // detection of collision enemy
  if(rectangularColission({
    rectangule1: enemy,
    rectangule2: player
  }) && enemy.isAttacking) {
      enemy.isAttacking = false;
      player.health -= 5
      document.querySelector('#playerHealth').style.width = player.health + '%';
     }

     //end game based on health 
     if(enemy.health <= 0 || player.health <= 0){
      determineWinner({player, enemy, timerid});
     }
}



animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'w':
      player.velocity.y = -15
      break;
    case ' ':
      player.attack();
      break;

    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      enemy.velocity.y = -15
      break;
    case 'ArrowDown':
      enemy.attack();
      break;
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 'w':
      keys.w.pressed = false;
      break;
  }

  //enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
    case 'ArrowUp':
      keys.ArrowUp.pressed = false;
      break;
  }
})