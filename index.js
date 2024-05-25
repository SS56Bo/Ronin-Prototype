const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let gravity = 0.2;
canvas.width = 1280;
canvas.height = 580;

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor({ position, velocity }) {
    // Constrcutor for player position
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
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

    if (this.position.x + this.width + this.velocity.x >= canvas.width) {
      this.velocity.x = 0;
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
    y: 0.5,
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
  console.log('LFG');
};

animate(); //creates a constant recursive infinite loop

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      player.velocity.x += 1;
      break;
  }
  console.log(event.key);
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      player.velocity.x = 1;
      break;
    case 'a':
      player.velocity.x = -1;
      break;
  }
  console.log(event.key);
});
