let saveMode = true

let shaderProgram;
let totalFrames = 90*60
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


    // Start the frame export process
    redraw();
}

let r = 5

function draw() {

    // Use the shader
    shader(shaderProgram);

    // Calculate time based on frame counter for consistency
    let time_val = frameCounter / fps;


    speed = 10

    let x = r * cos(frameCount / speed)
    let y = r * sin(frameCount / speed)

    let dr = noise(x * 0.15, y * 0.15, frameCount * 0.05) * 30 - 10; // small offset ±10
    vmag = (r * 16) * 4

    let center_x1 = x + cos(vmag) * dr
    let center_y1 = y + sin(vmag) * dr


    center_x1 = width * 0.5 + center_x1 * 8
    center_y1 = height * 0.5 + center_y1 * 8

    let x1 = r * cos(frameCount / speed) * -1
    let y2 = r * sin(frameCount / speed) * -1
    let center_x2 = x1 - cos(vmag) * dr // maybe plus here
    let center_y2 = y2 - sin(vmag) * dr


    center_x2 = width * 0.5 + center_x2 * 8
    center_y2 = height * 0.5 + center_y2 * 8


    // Set shader uniforms (variables you can pass to the shader)
    shaderProgram.setUniform('u_time', time_val);
    shaderProgram.setUniform('u_resolution', [width, height]);
    shaderProgram.setUniform('u_mouse1', [center_x1,  height - center_y1]);
    shaderProgram.setUniform('u_mouse2', [center_x2,  height - center_y2]);

    rect(0, 0, width, height);

    frameCounter++;

    if (saveMode) {
        // Save frame with ffmpeg-compatible naming (frame-0000.png, frame-0001.png, etc.)
        saveCanvas('frame-' + nf(frameCounter, 4), 'png');

        if (frameCounter < totalFrames) {
            setTimeout(function () {
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

