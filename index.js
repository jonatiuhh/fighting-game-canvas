const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

const background = new Sprite ({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background2.jpg'
})

const shop = new Sprite({
  position: {
    x: 715,
    y: 300
  },
  imageSrc: './img/shop.png',
  scale: 1.5,
  framesMax: 6
})

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
  imageSrc: './img/martialHero3/Idle.png',
  framesMax: 10,
  scale: 2.5,
  offset: {x: 110,y: 50},
  sprites: {
    idle: {
      imageSrc: './img/martialHero3/Idle.png',
      framesMax: 10
    },
    run: {
      imageSrc: './img/martialHero3/Run.png',
      framesMax: 8,
    },
    jumpUp: {
      imageSrc: './img/martialHero3/jumpUp.png',
      framesMax: 3,
    },
    jumpDown: {
      imageSrc: './img/martialHero3/jumpDown.png',
      framesMax: 3,
    },
    attack: {
      imageSrc: './img/martialHero3/Attack4.png',
      framesMax: 3,
    },
    idlei: {
      imageSrc: './img/martialHero3/Idle-i.png',
      framesMax: 10
    },
    runi: {
      imageSrc: './img/martialHero3/Run-i.png',
      framesMax: 4,
    },
    jumpUpi: {
      imageSrc: './img/martialHero3/jumpUp-i.png',
      framesMax: 3,
    },
    jumpDowni: {
      imageSrc: './img/martialHero3/jumpDown-i.png',
      framesMax: 3,
    },
    attacki: {
      imageSrc: './img/martialHero3/Attack4-i.png',
      framesMax: 3,
    }
    },
  attackBox: {
    offset: {
      x: -10, 
      y: 70
    },
    width: 140,
    height: 70
  },
  attackBoxi: {
    offset: {
      x: -60, 
      y: 70
    },
    width: 140,
    height: 70
  }
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
  imageSrc: './img/martialHero4/idle.png',
  framesMax: 10,
  scale: 3,
  offset: {x: 70, y: -10},
  sprites: {
    idle: {
      imageSrc: './img/martialHero4/Idle.png',
      framesMax: 1
    },
    run: {
      imageSrc: './img/martialHero4/Run.png',
      framesMax: 8,
    },
    jumpUp: {
      imageSrc: './img/martialHero4/jumpUp.png',
      framesMax: 1,
    },
    jumpDown: {
      imageSrc: './img/martialHero4/jumpDown.png',
      framesMax: 1,
    },
    attack: {
      imageSrc: './img/martialHero4/attack.png',
      framesMax: 3,
    },
    idlei: {
      imageSrc: './img/martialHero4/Idle-i.png',
      framesMax: 1
    },
    runi: {
      imageSrc: './img/martialHero4/Run-i.png',
      framesMax: 8,
    },
    jumpUpi: {
      imageSrc: './img/martialHero4/jumpUp-i.png',
      framesMax: 1,
    },
    jumpDowni: {
      imageSrc: './img/martialHero4/jumpDown-i.png',
      framesMax: 1,
    },
    attacki: {
      imageSrc: './img/martialHero4/attack-i.png',
      framesMax: 4,
    }
  },
  attackBox: {
    offset: {
      x: -80, 
      y: 60
    },
    width: 100,
    height: 60
  },
  attackBoxi: {
    offset: {
      x: 60, 
      y: 60
    },
    width: 100,
    height: 60
  }
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


decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0,0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
    if (Originalside(player, enemy)) {
      player.switchSprite('run');
    } else {
      player.switchSprite('run-i');
    }
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
    if (Originalside(player, enemy)) {
      player.switchSprite('run');
    } else {
      player.switchSprite('run-i');
    }
  } else {
    if (Originalside(player, enemy)) {
      player.switchSprite('idle');
    } else {
      player.switchSprite('idle-i');
    }
  }

  if(player.velocity.y < 0 && Originalside(player, enemy)){
    player.switchSprite('jumpUp');
  } else if (player.velocity < 0 && !Originalside(player, enemy)){
    player.switchSprite('jumpUp-i')
  }
  else if(player.velocity.y > 0){
    if (Originalside(player, enemy)) {
      player.switchSprite('jumpDown');
    } else {
      player.switchSprite('jumpDown-i')
    } 
  }

  //enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
        if (Originalside(player, enemy)) {
      enemy.switchSprite('run');
      } else {
      enemy.switchSprite('run-i');
              }}
  else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
        if (Originalside(player, enemy)) {
      enemy.switchSprite('run');
      } else {
      enemy.switchSprite('run-i');
             } } 
  else {
         if (Originalside(player, enemy)) {
      enemy.switchSprite('idle');
       } else {
      enemy.switchSprite('idle-i');
    }
  }

  if(enemy.velocity.y < 0 && Originalside(player, enemy)){
    enemy.switchSprite('jumpUp');
  } else if (enemy.velocity < 0 && !Originalside(enemy, enemy)){
    enemy.switchSprite('jumpUp-i')
  }
  else if(enemy.velocity.y > 0){
    if (Originalside(player, enemy)) {
      enemy.switchSprite('jumpDown');
    } else {
      enemy.switchSprite('jumpDown-i')
    } 
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
      if(player.inGround && !gameover){
        player.velocity.y = -15;
        player.inGround = false;
      }
      break;
    case ' ':
      player.attack();
      if (Originalside(player, enemy)) {
        if (!gameover) player.switchSprite('attack');
      } else {
        if (!gameover) player.switchSprite('attack-i');
      }
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
      if (enemy.inGround && !gameover){
        enemy.velocity.y = -15;
        enemy.inGround = false;
      }
      break;
    case 'ArrowDown':
      enemy.attack();
      if (Originalside(player, enemy)) {
        if (!gameover) enemy.switchSprite('attack');
      } else {
        if (!gameover) enemy.switchSprite('attack-i');
      }
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