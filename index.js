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
    x: 200,
    y: 500
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
    },
    Die: {
      imageSrc: './img/martialHero3/Die.png',
      framesMax: 11,
    },
    Diei: {
      imageSrc: './img/martialHero3/Die-i.png',
      framesMax: 11,
    },
    TakeHit: {
      imageSrc: './img/martialHero3/TakeHit.png',
      framesMax: 3,
    },
    TakeHiti: {
      imageSrc: './img/martialHero3/TakeHit-i.png',
      framesMax: 3,
    }
    },
  attackBox: {
    offset: {
      x: 10, 
      y: 70,
      xi: -80,
      yi: 70
    },
    width: 100,
    height: 70
  }
})



const enemy = new Fighter({
  position: {
    x: 750,
    y: 380
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
    },
    Die: {
      imageSrc: './img/martialHero4/Die.png',
      framesMax: 4,
    },
    Diei: {
      imageSrc: './img/martialHero4/Die-i.png',
      framesMax: 4,
    },
    TakeHit: {
      imageSrc: './img/martialHero4/TakeHit.png',
      framesMax: 4,
    },
    TakeHiti: {
      imageSrc: './img/martialHero4/TakeHit-i.png',
      framesMax: 4,
    }
  },
  attackBox: {
    offset: {
      x: -85, 
      y: 70,
      xi: 37,
      yi: 70
    },
    width: 110,
    height: 50
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
  if (keys.a.pressed && player.lastKey === 'a' && player.position.x >= 0 && !gameover) {
    player.velocity.x = -5;
    if (Originalside(player, enemy)) {
      player.switchSprite('run');
    } else {
      player.switchSprite('run-i');
    }
  } else if (keys.d.pressed && player.lastKey === 'd' && player.position.x <= 924 && !gameover) {
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
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.position.x >= 0 && !gameover) {
    enemy.velocity.x = -5;
        if (Originalside(player, enemy)) {
      enemy.switchSprite('run');
      } else {
      enemy.switchSprite('run-i');
              }}
  else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && enemy.position.x <= 924 && !gameover) {
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

  //detection  for collision player & enemy gets hit
  if(rectangularColission({
    rectangule1: player, 
    rectangule2: enemy
    }) && 
    player.isAttacking && player.frameCurrent === 1
    ) {
    enemy.TakeHit();
    player.isAttacking = false;
    document.querySelector("#enemyHealth").style.width = enemy.health + '%';
  }
  //if player misses
  if (player.isAttacking && player.frameCurrent === 1){
    player.isAttacking = false;
  }


  // detection of collision enemy
  if(rectangularColission({
    rectangule1: enemy,
    rectangule2: player
  }) && enemy.isAttacking && enemy.frameCurrent === 1) {
      player.TakeHit();
      enemy.isAttacking = false;
      document.querySelector('#playerHealth').style.width = player.health + '%';
  }
  if (enemy.isAttacking && enemy.frameCurrent === 1){
    enemy.isAttacking = false;
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