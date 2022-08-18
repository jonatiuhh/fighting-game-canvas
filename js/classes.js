class Sprite {
  constructor({ 
    position, 
    imageSrc, 
    scale = 1, 
    framesMax = 1, 
    offset = {x: 0, y: 0}
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.frameCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 15
    this.offset = offset
    }
    
  draw() {
    c.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x, 
      this.position.y - this.offset.y, 
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
      )
  }

  animatedFrames() {
    this.framesElapsed++;

    if(this.framesElapsed % this.framesHold === 0){
    if (this.frameCurrent < this.framesMax -1){
      this.frameCurrent++;
    } else {
      this.frameCurrent = 0;
    }
    }
  }

  update(){
    this.draw();
    this.animatedFrames();
  }
}


class Fighter extends Sprite {
  constructor({
    position, 
    velocity, 
    color = 'red',  
    imageSrc, 
    scale = 1, 
    framesMax = 1,
    offset = {x: 0, y: 0},
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined}

  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
    });

    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height
    }
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.inGround = false;
    this.frameCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 15;
    this.sprites = sprites;

    for(const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }


  update(){
    this.draw();
    this.animatedFrames();

    //attack boxes
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    
    c.fillRect(this.attackBox.position.x, this.attackBox.position.y,this.attackBox.width, this.attackBox.height)

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // gravity 
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 48){
      this.velocity.y = 0;
      this.position.y = 378;
      this.inGround = true;
    }else this.velocity.y += gravity;
  }
    attack() {
      if(!gameover){
      this.isAttacking = true;
      setTimeout(() =>{
        this.isAttacking = false;
      }, 100)
    }}

    switchSprite(sprite){
      if (this.image === this.sprites.attack.image && this.frameCurrent < this.sprites.attack.framesMax - 1) {return}
      else if (this.image === this.sprites.attacki.image && this.frameCurrent < this.sprites.attacki.framesMax - 1) {return}
      

      switch (sprite){
        case 'idle':
          if (this.image !== this.sprites.idle.image){
             this.image = this.sprites.idle.image;
             this.framesMax = this.sprites.idle.framesMax;
             this.frameCurrent = 0;
          }
          break;
        case 'run':
          if (this.image !== this.sprites.run.image){
             this.image = this.sprites.run.image;
             this.framesMax = this.sprites.run.framesMax;
             this.frameCurrent = 0;
          }
          break;
        case 'jumpUp':
          if (this.image !== this.sprites.jumpUp.image){
            this.image =this.sprites.jumpUp.image;
            this.framesMax = this.sprites.jumpUp.framesMax;
            this.frameCurrent = 0;
          }
          break;
        case 'jumpDown':
          if (this.image !== this.sprites.jumpDown.image){
            this.image = this.sprites.jumpDown.image;
            this.framesMax = this.sprites.jumpDown.framesMax;
            this.frameCurrent = 0;
          }
          break;
        case 'attack':
          if (this.image !== this.sprites.attack.image){
            this.image =this.sprites.attack.image;
            this.framesMax = this.sprites.attack.framesMax;
            this.frameCurrent = 0;
          }
          break;
        case 'idle-i':
          if (this.image !== this.sprites.idlei.image){
             this.image = this.sprites.idlei.image;
             this.framesMax = this.sprites.idlei.framesMax;
             this.frameCurrent = 0;
          }
          break;
        case 'run-i':
          if (this.image !== this.sprites.runi.image){
             this.image = this.sprites.runi.image;
             this.framesMax = this.sprites.runi.framesMax;
             this.frameCurrent = 0;
          }
          break;
        case 'jumpUp-i':
          if (this.image !== this.sprites.jumpUpi.image){
            this.image =this.sprites.jumpUpi.image;
            this.framesMax = this.sprites.jumpUpi.framesMax;
            this.frameCurrent = 0;
          }
          break;
        case 'jumpDown-i':
          if (this.image !== this.sprites.jumpDowni.image){
            this.image = this.sprites.jumpDowni.image;
            this.framesMax = this.sprites.jumpDowni.framesMax;
            this.frameCurrent = 0;
          }
          break;
        case 'attack-i':
          if (this.image !== this.sprites.attacki.image){
            this.image =this.sprites.attacki.image;
            this.framesMax = this.sprites.attacki.framesMax;
            this.frameCurrent = 0;
          }
          break;
      }
    }
  
}