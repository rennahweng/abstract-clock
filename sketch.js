// variables for gradient background design
let noiseY;
let noiseSpeed = 0.01;
let noiseHeight = 20;

function setup() {
	// set frame as the whole webpage based on user's screen size
    createCanvas(windowWidth,windowHeight);

    // for gradient background
    noiseY = height * 3 / 4;
    
    frameRate(1);
}


function draw() {
	// yellow and green-ish background color
	background(255, 250, 195);
	// add gradient design to the whole background
    background_gradient();

    // Create a simple Earth at the center of the page
    earth();
}


function background_gradient() {
	for (let j = 0; j < 3; j++) {
      let offsetY = j * 100;
      noFill();
      stroke(0, 0, 255, 10);
      strokeWeight(height / 2);
      beginShape();
      curveVertex(0, height / 2);
      for (let i = 0; i < width; i += 50) {
        let y = noise(frameCount * noiseSpeed + i + j) * noiseHeight + noiseY + offsetY;
        curveVertex(i, y);
      }
      curveVertex(width, height / 2);
      endShape(CLOSE);
    }
}

function earth() {
    push();
    // set origin at center of the screen
    translate(width/2, height/2);
    noStroke(); // no outline
    fill(15, 4, 101); // dark blue
    // make a circle of radius 265 at origin 
    ellipse(0, 0, 530, 530); // width is 2*radius, or 530
    pop();
}
