let string =
  "%$£*^&%^SACDu'#||HΩºª•ª£¶§€ª¡®´ˆ¨ƒ∆˙∆˚œ∆µ˚¬∆µ¨√TFR";
let list = [];
let rain = [];
let tex;
let input;

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  input = createInput();
let p = createP("Enter something into the void");
p.position(windowWidth/2 - 115 , windowHeight/2-40);
input.changed(User);
input.position(windowWidth/2 - 75 , windowHeight/2+10);
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  // canvas.position(windowWidth/2 - 300,0);
  canvas.style("z-index", "-1");
  noStroke();
// strokeWeight(0.05)
// stroke(255)

tex = createGraphics(windowWidth, windowHeight);
tex.noStroke();
tex.background(0);
tex.push(p);
for (let i = 0; i < string.length; i++) {
list.push(string[i]);
}
//removing blank-spaces and commas and other unwanted characters incase the string used changes
for (let j = 0; j < list.length; j++) {
  if (list[j] == " " || list[j] == "," || list[j] == "'") {
    list.splice(j, 1);
  }
}
}

function draw() {
  tex.background(0)
  background(0);
  // orbitControl(2, 2);
  tex.fill(255)
  // tex.display();
  push();
  // tex.translate(-width / 2, -height / 2);



     //framecount is used to avoid flooding the screen with letters
  if (frameCount % 5 == 0) {
    for (let i = 0; i < list.length; i++) {
      rain.push(new Letter(random(0, width), 0, list[i]));
    }
  }

  for (let i = 0; i < rain.length; i++) {
    rain[i].display();
    rain[i].rainy();
  }

  //removes letters that cant be seen from the list to enhance execution
  for (let i = 0; i < rain.length; i++) {
    if (rain[i].y < -20) {
      rain.splice(i, 1);
    }
  }
  pop();

  texture(tex);
  // rotateY(90)
  rotateX(-90.3)
  scale(5,5)
// tor
  torus(210, 195, 100,100);
  pointLight(255,255, 255, 0,0,-10)
  // camera(frameCount*0.1,180,100, 0,0,0)
  // cam
  // camera(0,0,-10)
}

function f(x, y, t) {
  k = round(noise(x / 1000, y / 1000, t / 1000) * 100);

  return k % 2 == 1;
}


class Letter {
  constructor(x, y, letter) {
    this.x = x;
    this.y = height+y;
    this.size = random(3, 8);
    this.letter = letter;
    this.speed = random(-3, -8);
    this.move = 0;
  }

  display() {
    // textFont(font);
    tex.textSize(this.size);
    tex.text(this.letter, this.x, this.y);
  }

  rainy() {
    //used to make the letters move or stop in place
    if (this.move == 0) {
      this.y += map(noise(this.speed * frameCount * 0.1), 0, 1, -10, 2);
    } else {
      this.y += 0;
    }
  }
}

function User() {
  list.push(input.value())
}
