const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext("2d" , { willReadFrequently: true });

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(effect, x, y, color) {
    this.effect = effect;
    this.x = Math.random() * this.effect.canvasWidth;z
    // this.y = Math.random() * this.effect.canvasHeight;
    this.y = 0;
    this.color = color;
    this.size = this.effect.gap ;
    this.originX = x;
    this.originY = y;
    this.size = this.effect.gap;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = Math.random() * 0.05 + 0.94;
    this.ease = Math.random() * 0.1 + 0.05;
  }
  draw() {
    this.effect.context.fillStyle !== this.color ?? (this.effect.context.fillStyle = this.color); 
    this.effect.context.fillRect(this.x, this.y, this.size, this.size);
  }
  update() {
    this.x += (this.originX - this.x) * this.ease;
    this.y += (this.originY - this.y) * this.ease
  }
}

class Effect {
  constructor(context, canvasWidth, canvasHeight) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.fontSize = 100;
    this.lineHeight = this.fontSize * 0.9;
    this.maxTextWidth = this.canvasWidth * 0.8;
    this.textInput = document.getElementById("text-input");
    this.textInput.addEventListener("keyup", (e) => {
      if (e.key !== " ") {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.wrapText(e.target.value);
      }
    });

    // particles
    this.particles = [];
    this.gap = 5;
    this.mouse = {
      radius: 2000,
      x: 0,
      y: 0,
    };
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      // console.log(this.mouse.x,this.mouse.y)
    });
  }
  wrapText(text) {
    // this should display a text on the canvas wrapping it to the next line
    const gradient = this.context.createLinearGradient(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
    gradient.addColorStop(0.4, "orangered");
    gradient.addColorStop(1, "green");
    this.context.fillStyle = gradient;
    this.context.font = `${this.fontSize}px Arial`;
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.lineWidth = 3;
    this.context.strokeStyle = "white";
    // brreak multiline text
    let linesArray = [];
    let words = text.split(" ");
    let line = "";
    let lineCounter = 0;
    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + " ";
      let testWidth = this.context.measureText(testLine).width;
      if (testWidth > this.maxTextWidth) {
        linesArray[lineCounter] = line;
        line = words[i] + " ";
        lineCounter++;
      } else {
        line = testLine;
      }
      linesArray[lineCounter] = line;
    }
    let textHeight = linesArray.length * this.lineHeight;
    this.textY = this.canvasHeight / 2 - textHeight / 2;
    linesArray.forEach((line, index) => {
      this.context.fillText(
        line,
        this.textX,
        this.textY + index * this.lineHeight
      );
      this.context.strokeText(
        line,
        this.textX,
        this.textY + index * this.lineHeight
      );
    });
    this.convertToParticles();
  }
  convertToParticles() {
    this.particles = [];
    const pixels = this.context.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let y = 0; y < this.canvasHeight; y += this.gap) {
      for (let x = 0; x < this.canvasWidth; x += this.gap) {
        const index = (y * this.canvasWidth + x) * 4;
        const alpha = pixels.data[index + 3];
        if (alpha > 0) {
          // if the pixel is not transparent
          const red = pixels.data[index + 0];
          const green = pixels.data[index + 1];
          const blue = pixels.data[index + 2];
          const color = `rgb(${red},${green},${blue})`;
          this.particles.push(new Particle(this, x, y, color));
        }
      }
    }
    // console.log(this.particles);
  }
  render() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
  }
}

function animate(){
  effect.render();
  requestAnimationFrame(animate);
}

const effect = new Effect(ctx, canvas.width, canvas.height);
effect.wrapText("HELLO MADAFAKER");
animate();
