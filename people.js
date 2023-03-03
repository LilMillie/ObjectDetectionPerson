object = "";
status = "";
song = "";

function preload() {
    song = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(600, 420);
    canvas.position(550, 275);
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting People";
}

function draw() {
    image(video, 0, 0, 600, 420);
    hasPerson = false;
    if(status != ""){
        objectDetector.detect(video, gotResult);
        if (object != null) {
            for(i = 0; i < object.length; i++) {
                document.getElementById("status").innerHTML = "Person is found";
                fill("#ff0000");
                percent = floor(object[i].confidence * 100);
                if (object[i].label == "person" && percent > 55) {
                    text(object[i].label + " " + percent + "%", object[i].x + 10, object[i].y + 10);
                    noFill();
                    stroke("#ff0000");
                    rect(object[i].x, object[i].y, object[i].width, object[i].height);
                    hasPerson = true;
                }
            }
            if (!hasPerson) {
                if(!song.isPlaying()) {
                   song.play();
                }
            } else {
                song.stop();
            }
        }
    }

}


function modelLoaded() {
    console.log("Model Loaded!!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}