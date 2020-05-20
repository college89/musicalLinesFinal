let input, button, greeting;
let submit_remove = 0;
let canvas;
let gifLength = 5;

let started = 0;

let master_text = "";
let text_size = 60;
let lock = -1, lock_x = 0, lock_y = 0;

function setup() {

   var p5Canvas = createCanvas(windowWidth, windowHeight-10);
   canvas = p5Canvas.canvas;

   colorMode(HSB, 360, 100, 100);
   background(0,0,10);

	frameRate(4);

}


function save_photo(){
     save('pix.jpg');
}

function save_video(){
	if(started != 1){
	 capturer.start();
	 started = 1;
	 console.log("Starting to save");
 }

draw() ;
}

let count = 0;
function draw() {


    background(0,0,10);

   var hue = random(0, 360);
    for(var i = 0; i<width; i+=4){
      stroke(hue+(i/width)*100, 100, 80);
      line(i, 0, i, random(160, 640)*noise(i/200)*2);
    }
    for(var y = 2; y<width; y+=4){
      stroke(hue+(y/width)*100, 100, 80);
      line(y, 0, y, 800);
    }

    // let the user change the text size with the up and down arrow
      if (keyIsDown(UP_ARROW)) {
          if(text_size < 510){
            text_size += 20;
          }
       }

       if (keyIsDown(DOWN_ARROW)) {
         if(text_size > 20){
           text_size -= 20;
         }
       }

       fill(255);
       textSize(text_size);
       textAlign(CENTER);

       if(lock === -1){
         text(master_text, mouseX, mouseY);
       }else{
         text(master_text, lock_x, lock_y);
       }


   var num = random(4, 8);
    for(var x = 0; x<num; x++){
      fill(hue+90, 100, 80+random(0, 20));
      //text("hana", random(-480, 240), random(0, 960));
    }

	if(started === 1 && count < 50){
		//capturer.start();

		capturer.capture(canvas);
		count++;
		console.log("started to capture");

	}else if (started === 1) {

		capturer.stop();
	 capturer.save();
	 started = 0;
	 count = 0;
	 console.log("done");
	}

console.log("sdf");

}

//add this function make the text be dynamic
function keyReleased() {
 if (keyCode==8) {
   if (master_text.length>0) {
      master_text = master_text.substring(0, master_text.length-1);
   }
 }
 else if (keyCode>=65 && keyCode<=90 || keyCode==32 || keyCode==54) {
   master_text += str(key);
 }else if(keyCode == ENTER || keyCode == RETURN){
   console.log("hi");
   master_text = master_text + " " + master_text;
 }else if (keyCode == CONTROL) {
   console.log("control");

   lock = lock * -1;
   lock_x = mouseX;
   lock_y = mouseY;
 }
}
