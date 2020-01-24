// variables for gradient background design
let noiseY;
let noiseSpeed = 0.01;
let noiseHeight = 20;

// keeps track of the values for minute()
// in order to print minutes() to console
var prev_m = -1;

// variables for making flowers for minute
var flower_colors = ['rgba(204,97,71,1)', 'rgba(240,159,39,1)', '#CC724C'];
var min_xs=[], min_ys=[], min_angles=[];


function setup() {
	// set frame as the whole webpage based on user's screen size
    createCanvas(windowWidth,windowHeight);
    // noCursor();

    // For gradient background
    noiseY = height * 3 / 4;

    // Populate arrays for flower coordinates
    for (var i = 0; i < 60; i++) {
    	min_xs[i] = random(width * 3.3 / 9, width * 5.8 / 9);
    	min_ys[i] = random(height*1.5 / 7, height * 5.3 / 7);
    	min_angles[i] = random(360);
    }

    // Updates every second
    frameRate(1);
}



function draw() {
	// yellow and green-ish background color
	background(255, 250, 195);
	// add gradient design to the whole background
    background_gradient();

    // add a title for my clock
    title();

    // Create a simple Earth at the center of the page
    earth();

    // Add blinking stars to background
    stars();

    // Generate clock based on hour, minute, and second:
    var h = hour();
    var m = minute();
    var s = second();

    // Make circles of decreasing radius to represent second
    circleSecond(s);

    // Make trees around the Earth to represent the hour
    treeHour(s, h);

    // Make flowers inside the Earth to represent the minute
    // And print out minute() to console
    flowerMinute(m);
}



// Helper Functions:

// for background decorations
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

function title() {
	fill(78,115,140);
    textSize(60);
    text('Make', width/15, height/3);
    text('Earth', width/15, height/2);
    text('Green', width*16.5/20, height/3);
    text('Again!', width*16.5/20, height/2);
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

function stars() {
	var galaxy = { 
	locationX : random(width),
	locationY : random(height),
	size : random(1,15)
	}
	fill(255,255,255); // white
	noStroke();
	// a stream of stars following after mouse cursor
	ellipse(mouseX ,mouseY, galaxy.size,galaxy.size);
	ellipse(galaxy.locationX ,galaxy.locationY, galaxy.size, galaxy.size);
}


// Functions for Clock Display:

// Seconds:
function circleSecond(s) {
    push();
    translate(width/2, height/2);
    // Update the number of circles based on second
    for (i = 0; i < s; i++) {
	    stroke(124, 185, 232); // light blue
	    strokeWeight(2);
	    noFill();
	    // first circle has the same width as the earth: 530
	    ellipse(0, 0, 530-i*9, 530-i*9);
	    // widths of the subsequent circles are updated to smaller values
    }
    pop();
    /** These blue circles represent water level.
     *	When water circles fill up the whole earth,
     *	flowers (minute) and trees (hour) will grow,
     *	thus makes Earth greener and prettier!!
     *	See more details in flowerMinute and treeHour
     *	functions below.
     **/
    
    // Make a water drop at the center of the earth when second restarts at 0.
    // This shows how we are currently collecting water circles to fill up the Earth!
    for(var j = 0; j < s; j++) {
      for (var i = 2; i < 10; i++ ) {
        noStroke();
        fill(124, 185, 232); // light blue
        // make multiple ellipses of different widths
        // and combine them to form a water-drop shape:
        ellipse(width/2, height/2.2 + i*4, i*2, i*2);
      }
    }
}

// Hours:
function treeHour(s, h) {
    push();
    translate(width/2, height/2);
    // Make all trees rotating around Earth every single second
    var angle = 360 * s / 60;
    rotate( radians(angle - 90) );

    // Update the number of trees based on second:
    for (i = 0; i < h; i++) {
    	// a max of 24 can trees revolve around the Earth
        rotate( radians(15) ); // 360/24=15
        noStroke();
        // tree consists of a rectangle and a circle
        fill(181,107,42);
        rect(0, -315, 15, 70)
        fill(59,122,87);
        ellipse(7, -315, 50, 50);
    }
    pop();
}

// Minutes:
function flowerMinute(m) {
	// Task: print minute() to console everytime it changes.
	// Compare current minute with the previous to avoid
	// printing out the same value
	if (m != prev_m) {
    	console.log(m);
    }
 	// update current value for minute();
    prev_m = m;

    // Draw flowers based on the current minute value
    for (var i = 0; i < m; i++) {
    	drawFlower(min_xs[i], min_ys[i], min_angles[i], 4, i % flower_colors.length);
    }
}

// Make flower shapes for flowerMinute function:
function drawFlower(x, y, angle, petals, color) {
    push();
    // flowers of different colors
    fill(flower_colors[color]);
    translate(x, y);

    // petals rotate around to make a complete flower
    rotate(angle);
    for (var i = 0; i < petals; i++) {
    	push();
    	rotate(360 * i / petals);
    	ellipse(0, 13, 26 * pow(0.92, petals), 26);
    	pop();
    }

    // Make a small circle as the flower core:
    fill('#E9D558'); // yellow
    ellipse(0,0,10,10);
    pop();
}