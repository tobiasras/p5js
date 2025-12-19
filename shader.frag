// Fragment shader
// This runs once per pixel

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;


vec3 palette(in float t)
{
    vec3 a = vec3(0.0, 0.5, 0.5	);
    vec3 b = vec3(0.0, 0.5, 0	);
    vec3 c = vec3(1.0, 0.5, 0	);
    vec3 d = vec3(0.30, 0.20, 0.20);

    return a + b*cos( 6.283185*(c*t+d) );
}




void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

    for (float i = 0.0; i < 1.0; i++) {
        uv = fract(uv * 4.) - 0.5;

        float d = length(uv);
        vec3 col = palette(length(uv0) + u_time);

        d = sin(d * 4. - u_time*2.) / 8.;
        d = abs(d);
        d = 0.02 / d;


        finalColor += col * d;

    }




    gl_FragColor = vec4(finalColor, 1.0);
}

