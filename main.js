function preload() {
    img = loadImage("eye.png");
    img1 = loadImage("nose.png");
}

leftEyeX = 0;
leftEyeY = 0;
rightEyeX = 0;
rightEyeY = 0;
noseX = 0;
noseY = 0;

function setup() {
    canvas = createCanvas(300, 300);
    canvas.position(500,200);
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses );
}

function modelLoaded() {
    console.log('PoseNet is Initiated');
}

function draw() {
    image(video, 0, 0, 300, 300);
    image(img, leftEyeX, leftEyeY, 30, 30);
    image(img, rightEyeX, rightEyeY, 30, 30);
    image(img1, noseX, noseY, 30, 30);
}

function take_snapshot() {
    save('face_filter.png');
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftEyeX = results[0].pose.leftEye.x-15;
        leftEyeY = results[0].pose.leftEye.y-18;
        rightEyeX = results[0].pose.rightEye.x-15;
        rightEyeY = results[0].pose.rightEye.y-18;
        noseX = results[0].pose.nose.x-15;
        noseY = results[0].pose.nose.y-18;
    } 
}