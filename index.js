const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let gravity = 0.2;
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

let lastkey;
class Sprite {
  constructor({ position, velocity }) {
    // Constrcutor for player position
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastkey;
  }

  draw(fillStyle) {
    c.fillStyle = fillStyle; //Constructor for player color and drawing [JUST A FORMALITY]
    c.fillRect(this.position.x, this.position.y, 50, 150);
  }

  update(fillStyle) {
    this.draw(fillStyle);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0; // SET BOUNDARIES HEIGHT
    } else {
      this.velocity.y += gravity;
    }
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
});

enemy.draw('blue');

animate = () => {
  //arrow function for creating animate function
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update('red');
  enemy.update('green');

  //player control
  player.velocity.x = 0;
  if (key.a.pressed && lastkey == 'a') {
    player.velocity.x = -1;
  } else if (key.d.pressed && lastkey == 'd') {
    player.velocity.x = 1;
  }

  //enemy control
  if (key.ArrowLeft.pressed && enemy.lastkey == 'ArrowLeft') {
    enemy.velocity.x = -1;
  } else if (key.ArrowRight.pressed && enemy.lastkey == 'ArrowRight') {
    enemy.velocity.x = 1;
  }
};

animate(); //creates a constant recursive infinite loop

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      key.d.pressed = true;
      lastkey = 'd';
      break;
    case 'a':
      key.a.pressed = true;
      lastkey = 'a';
      break;
    case 'w':
      player.velocity.y += -10;
      lastkey = 'w';
      break;

    case 'ArrowRight':
      key.ArrowRight.pressed = true;
      enemy.lastkey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      key.ArrowRight.pressed = true;
      enemy.lastkey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      enemy.velocity.y += -10;
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
