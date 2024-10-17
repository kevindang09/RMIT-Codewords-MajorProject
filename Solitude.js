// Coded by Kevin Dang
// RMIT Creative Coding 2024

// Song: Brian Eno https://www.youtube.com/watch?v=OlaTeXX3uH8
// Moon texture: https://planetpixelemporium.com/earth.html
// Special thanks to Andy, Karen and Github Copilot 

let myTexture;
let graphics; 
let solitude;

let input;
let inputText = '';
let textX, textY;
let buttonSubmit

let button;
let song;
let isPlaying = false;

let spheres = [];
const numSpheres = 5000; // number of sphere will appear
let angle = 0;


function preload(){
  myTexture = loadImage('data/moonmap4k.jpg');
  song=loadSound('data/anending.mp3');
}

function setup() { 
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  normalMaterial();
  frameRate(120);
  background("black");

//button sound play---------------------------------------------------------------------------- 
  button = createButton('Sound Play');
  button.class('custom-button'); //pulling from a class 'custom-button' in CSS
  button.position(width*0.85, height*0.05);
  button.mousePressed(toggleSound);   
    
//text texture -------------------------------------------------------------------------
  solitude = createGraphics (800,800);
  solitude.fill('transparent');
  solitude.textAlign(CENTER);
  solitude.textSize(25);
  solitude.text('WE ENTER SOLITUDE, IN WHICH WE ALSO LOSE LONELINESS',400,400);


// Create an input and place it beneath the canvas ------------------------------------
  push();
    translate(0,0,0)
    input = createInput('');
    input.position(width*0.30, height*0.90);
    input.size(width*0.33,height*0.046);
// Add placeholder text 
    input.attribute('placeholder', 'Send your thoughts into the orbit...');  
// style for input box 
    input.class('custom-input'); //pulling from a class 'custom-input' in CSS
  pop();  
   
//Create a submit button 
  translate(0,0,0)
  buttonSubmit = createButton('Submit');
  buttonSubmit.size(width*0.065,height*0.065);
  buttonSubmit.position(width*0.65, height*0.90);
  buttonSubmit.class('custom-input');
  
// function when the button is pressed.
  buttonSubmit.mousePressed(updateText); 
// Also call greet when input is changed and enter/return button is pressed
  input.changed(updateText);
  
// small particles---------------------------------------------------------------------------    
  for (let i = 0; i < numSpheres; i++) {
    spheres.push({
       x: random(-width*2, width*2),
       y: random(-height*2, height*2),
       z: random(-width*2, height*2), // Random z position
       size: random(0.1, 1),
    });
  }  
}

//function for input value random position ------------------------------------------------------------
function updateText() {
  inputText = input.value();

//alert(inputText); // debug code to try if the function is working
  console.log(inputText) 
  input.value('');
  updateSolitudeGraphics();
}

function updateSolitudeGraphics() { 
  solitude.clear(); // Clear the graphics buffer 
  solitude.fill('white'); 
  solitude.text(inputText, solitude.width*0.5, solitude.height*0.5); 
}

function draw() {
 background ("black");
   
// Moon and the text rotate ------------------------------------------------------
  orbitControl(1.0,1.0,0.1);   

//Sphere moon   
  push();
// Calculate light position for rotation
    let lightX = sin(frameCount * 0.1)*300;
    let lightZ = cos(frameCount * 0.1)*300;

// Set up the rotating light
    directionalLight(255, 255, 255, lightX, 0, lightZ);
    directionalLight(155, 155, 155, lightX, -3, lightZ);
    directionalLight(75, 75, 75, -lightX, 1, -lightZ);
   
    translate(0, 0, 0);
  
    texture(myTexture);
    rotateY(frameCount * 0.2);
    noStroke(0);
    sphere(width*0.1);
  pop();
  
//Sphere with text textured
  push();

// Set up the rotating light
    translate(0, 0, 0);
    texture(solitude);
    rotateY(frameCount * -0.5);
    sphere(width*0.15);
  pop();
  
// Randomly decide to start n rotate -----------------------------------------------------------------------------
  rotateY(angle * 10); // Optional: Rotate around the y-axis for more dynamic effect
  angle += 0.01; // Increment the angle for continuous rotation
  
// Draw the spheres
  for (let i = 0; i < numSpheres; i++) {
    push();
     translate(spheres[i].x, spheres[i].y, spheres[i].z);
     fill(255); // Set the fill color to white
     noStroke(); // Remove the stroke for a cleaner look
     sphere(spheres[i].size * 2.5); // Scale the size for better visibility
    pop();
  } 
}


// function sound play on command---------------------------------------------------------------------------- 
function toggleSound() {
   if (isPlaying) {
     song.pause();
     button.html('Play Sound');
   } else {
     song.loop(); // Use loop() to resume from the paused position
     button.html('Pause Sound');
   }
   isPlaying = !isPlaying;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateInputPosition();
}

// Update the position and size of the input field and button based on the new canvas size 
function updateInputPosition(){ 
  button.position(width*0.85, height*0.05);

  input.position(width*0.30, height*0.90); 
  input.size(width*0.33,height*0.046);

  buttonSubmit.size(width*0.065,height*0.065); 
  buttonSubmit.position(width*0.65, height*0.90); 
}
