let saveMode = false


let shaderProgram;
let totalFrames = 960;
var fps = 60;
let frameCounter = 0

function preload() {
    // Load shaders
    shaderProgram = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(1080, 1920, WEBGL);
    noStroke();

    if (saveMode) {
        noLoop();
    }

    console.log('Starting frame export...');
    console.log('Will export ' + totalFrames + ' frames');
    
    // Start the frame export process
    redraw();
}

function draw() {
    background(0);

    // Use the shader
    shader(shaderProgram);

    // Calculate time based on frame counter for consistency
    let time = frameCounter / fps;

    // Set shader uniforms (variables you can pass to the shader)
    shaderProgram.setUniform('u_time', time);
    shaderProgram.setUniform('u_resolution', [width, height]);
    shaderProgram.setUniform('u_mouse', [mouseX, height - mouseY]);




    rect(0, 0, width, height);
    frameCounter++;




    if (saveMode) {
        // Save frame with ffmpeg-compatible naming (frame-0000.png, frame-0001.png, etc.)
        saveCanvas('frame-' + nf(frameCounter, 4), 'png');

        if (frameCounter < totalFrames) {
            setTimeout(function() {
                redraw();
            }, 100); // 100ms delay between frames to prevent skipping
        } else {
            console.log('Frame export complete! ' + totalFrames + ' frames saved');
            console.log('Use ffmpeg to create video (see README.md)');
        }
    }

}

function windowResized() {

}

