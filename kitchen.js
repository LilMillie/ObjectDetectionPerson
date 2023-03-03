img = "";
object = "";
status = "";

function preload() {
    img = loadImage('fruitbowl.jpg');
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.position(590, 250);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}

function draw() {
    image(img, 0, 0, 500, 500);
    if(status != "") {
        for(i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status = Object(s) Detected";
            fill("#ff0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x * 500 / 1958, object[i].y * 500 / 2560 + 15);
            noFill();
            stroke("#ff0000");
            rect(object[i].x * 500 / 1958 - 15, object[i].y * 500 / 2560, object[i].width * 500 / 1958, object[i].height * 500 / 2560);
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