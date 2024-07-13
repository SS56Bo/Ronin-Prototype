const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let gravity = 0.7;
canvas.width = 1280;
canvas.height = 580;

const key = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

class Sprite {
  constructor({ position, velocity, color = 'red', offset }) {
    // Constrcutor for player position
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastkey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking = false;
  }

  draw(fillStyle) {
    c.fillStyle = this.color; //Constructor for player color and drawing [JUST A FORMALITY]
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //attack box
    //if (this.isAttacking) {
    c.fillStyle = 'yellow';
    c.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );
    //}
  }

  update(fillStyle) {
    this.draw(fillStyle);
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0; // SET BOUNDARIES HEIGHT
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  color: 'green',
});

player.draw('red');

const enemy = new Sprite({
  position: {
    x: 100,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0,
  },
  color: 'red',
});

function rectangularCollisions({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

animate = () => {
  //arrow function for creating animate function
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update('red');
  enemy.update('green');

  //player control
  player.velocity.x = 0;
  if (key.a.pressed && player.lastkey === 'a') {
    player.velocity.x = -5;
  } else if (key.d.pressed && player.lastkey === 'd') {
    player.velocity.x = 5;
  }

  //enemy control
  enemy.velocity.x = 0;
  if (key.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  } else if (key.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }

  //detect collision for player
  if (
    rectangularCollisions({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    console.log('go');
  }

  //detect collision for enemy
  if (
    rectangularCollisions({ rectangle1: player, rectangle2: enemy }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    console.log('enemy attack success');
  }
};

animate(); //creates a constant recursive infinite loop

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      key.d.pressed = true;
      player.lastkey = 'd';
      break;
    case 'a':
      key.a.pressed = true;
      player.lastkey = 'a';
      break;
    case 'w':
      player.velocity.y += -20;
      player.lastkey = 'w';
      break;
    case ' ':
      player.attack();
      break;

    case 'ArrowRight':
      key.ArrowRight.pressed = true;
      enemy.lastkey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      key.ArrowLeft.pressed = true;
      enemy.lastkey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      enemy.velocity.y += -20;
      enemy.lastkey = 'ArrowUp';
      break;
  }
  console.log(event.key);
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      key.d.pressed = false;
      break;
    case 'a':
      key.a.pressed = false;
      break;
    case 'w':
      key.w.pressed = false;
      break;
  }

  //enemy
  switch (event.key) {
    case 'ArrowRight':
      key.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      key.ArrowLeft.pressed = false;
      break;
  }
  console.log(event.key);
});
