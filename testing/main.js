const canvas = document.getElementById('canvas1');

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle{
  constructor(){

  }
  draw(){}
  update(){}
}

class Effect{
  constructor( context , canvasWidth , canvasHeight){
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.textX = this.canvasWidth / 2;
    this.textY = this.canvasHeight / 2;
    this.fontSize = 100;
    this.lineHeight = this.fontSize * 0.8;
    this.maxTextWidth = this.canvasWidth * 0.8;
    this.textInput = document.getElementById('text-input');
    this.textInput.addEventListener('keyup', (e) => {
      this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
      this.wrapText(e.target.value);
    });

  }
  wrapText(text){
    // this should display a text on the canvas wrapping it to the next line
    const gradient = this.context.createLinearGradient(0,0,this.canvasWidth,this.canvasHeight);
    gradient.addColorStop(0,'red');
    gradient.addColorStop(0.5,'blue');
    gradient.addColorStop(1,'green');
    this.context.fillStyle = gradient;
    this.context.font = `${this.fontSize}px Arial`;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.lineWidth = 3;
    this.context.strokeStyle = 'white';
    // brreak multiline text
    let linesArray = [];
    let words = text.split(' ');
    let line = '';
    let lineCounter = 0;
    for(let i = 0; i < words.length; i++){
      let testLine = line + words[i] + ' ';
      let testWidth = this.context.measureText(testLine).width;
      if(testWidth > this.maxTextWidth){
        linesArray[lineCounter] = line;
        line = words[i] + ' ';
        lineCounter++;
      }else{
        line = testLine;
      }
      linesArray[lineCounter] = line;
    }
    let textHeight = linesArray.length * this.lineHeight;
    this.textY = this.canvasHeight / 2 - textHeight / 2;
    linesArray.forEach((line,index) => {
      this.context.fillText(line,this.textX,this.textY + index * this.lineHeight);
      this.context.strokeText(line,this.textX,this.textY + index * this.lineHeight);
    });
  }
  convertToParticles(){

  }
  draw(){}
  update(){}
}

const effect = new Effect(ctx,canvas.width,canvas.height);
