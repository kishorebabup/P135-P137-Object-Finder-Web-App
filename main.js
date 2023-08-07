status = "";
find = "";
objects = [];

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(480, 380);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";
    find = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){
        objectDetector.detect(video, gotResult);  
       
        for(i = 0; i < objects.length; i++){
            
            document.getElementById("status").innerHTML = "Objects Detected";

            fill("red");
            noFill();
            stroke("red");
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == find){
                videoLiveView.stop();
                objectDector.detect(gotResult);
                document.getElementById("object_found").innerHTML = "object mentioned found";

                synth = window.speechSynthesis;
                utterThis = SpeechSynthesisUtterance("object mentioned found");
                synth.speak(utterThis);
            }else{
                document.getElementById("status").innerHTML = "object mentioned not found";
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);

    objects = results;
} 
