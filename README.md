# p5.js Shader Animation Export Setup

This p5.js project exports animation frames as images for video compilation with ffmpeg.

## Files

- `index.html` - Main HTML file that loads p5.js and the sketch
- `sketch.js` - p5.js code that sets up and uses the shader
- `shader.vert` - Vertex shader (runs per vertex)
- `shader.frag` - Fragment shader (runs per pixel)
- `frames/` - Directory where exported frame images are saved (created automatically)

## Configuration

Edit `sketch.js` to configure:
- `totalFrames` - Number of frames to export (default: 960)
- `fps` - Frame rate (default: 60)
- Canvas size in `setup()` - Currently 1080x1920 (portrait)

## Running

Since shaders need to be loaded via HTTP, you'll need to run a local server:

### Option 1: Python (if installed)
```bash
python -m http.server 8000
```
Then open http://localhost:8000 in your browser.

### Option 2: Node.js (if installed)
```bash
npx http-server
```

### Option 3: VS Code Live Server
Install the "Live Server" extension and right-click `index.html` → "Open with Live Server"

## Exporting Frames

1. Open the page in your browser
2. Press **SPACE** to start/stop recording frames
3. Frames will automatically download to your browser's Downloads folder as `frame-0000.png`, `frame-0001.png`, etc.
4. Press **S** to save a single frame manually

**Note:** Frames download to your browser's Downloads folder. To organize them for ffmpeg:

### Option 1: Use the PowerShell script (Windows)
```powershell
.\organize-frames.ps1
```
This will automatically move all `frame-*.png` files from your Downloads folder to a `frames/` directory in your project.

### Option 2: Manual organization
Create a `frames/` folder in your project directory and manually move the downloaded frame files there.

## Creating Video with ffmpeg

Once you have exported frames, use ffmpeg to compile them into a video:

### Basic command:
```bash
ffmpeg -framerate 60 -i frames/frame-%04d.png -c:v libx264 -pix_fmt yuv420p output.mp4
```

### High quality (H.264):
```bash
ffmpeg -framerate 60 -i frames/frame-%04d.png -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p output.mp4
```

### For web (smaller file size):
```bash
ffmpeg -framerate 60 -i frames/frame-%04d.png -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p output.mp4
```

### Parameters explained:
- `-framerate 60` - Match your animation frame rate
- `-i frames/frame-%04d.png` - Input pattern (4-digit zero-padded numbers)
- `-c:v libx264` - H.264 video codec
- `-preset slow/medium/fast` - Encoding speed vs compression (slower = better quality)
- `-crf 18-23` - Quality (18 = high quality, 23 = good quality, lower = better)
- `-pix_fmt yuv420p` - Pixel format for compatibility
- `output.mp4` - Output filename

### Other formats:

**WebM (VP9):**
```bash
ffmpeg -framerate 60 -i frames/frame-%04d.png -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm
```

**GIF:**
```bash
ffmpeg -framerate 60 -i frames/frame-%04d.png -vf "fps=30,scale=1080:-1:flags=lanczos" -c:v gif output.gif
```

## Shader Uniforms

The shader receives these uniforms:
- `u_time` - Time in seconds (based on frame count / fps)
- `u_resolution` - Canvas width and height [width, height]
- `u_mouse` - Mouse position [x, y]

Modify `shader.frag` to create your own visual effects!

