status="";
object=[];
function setup(){
    canvas=createCanvas(480,380)
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();

}
function got_results(error,results){

    if(error){
        console.error(error);
    }else{
        console.log(results);
        object=results;
    }
}
function start(){
    object_detecter=ml5.objectDetector('cocossd',model_loaded);
    document.getElementById("status").innerHTML="Status : Object Detecting";
all_objects=document.getElementById("all_objects").value;
console.log(all_objects);
}
function model_loaded(){
    console.log("model loaded");
    status=true;
}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
           
            fill("blue");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+20);
            noFill();
    stroke("blue");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

            if(object[i].label==all_objects){
                video.stop();
                object_detecter.detect(got_results);
                document.getElementById("status").innerHTML=all_objects+" : found";
                utterthis= new SpeechSynthesisUtterance(all_objects+"found");
                synth.speak(utterthis);
            }else{
                 document.getElementById("status").innerHTML=all_objects+" : not found";
            }
        }
    }
}