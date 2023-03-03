img = "";
object="";
status="";

function preload() {
    img = loadImage('living_room.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.position(525, 250);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}

function draw() {
    image(img, 0, 0, 640, 420);
    if(status != "") {
        for(i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status = Object(s) Detected";
            fill("#ff0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x * 640 / 1200 + 10, object[i].y * 420 / 630 + 15);
            noFill();
            stroke("#ff0000");
            rect(object[i].x * 640 / 1200 + 5, object[i].y * 420 / 630, object[i].width * 640 / 1200, object[i].height * 420 / 630);
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}