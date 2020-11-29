// Author @patriciogv - 2015
// Title: Mosaic

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st *= vec2(50.0, 25.0); // Scale the coordinate system by 10

    st += vec2(random(vec2(floor(st.y),floor(st.y)))*u_time,0.0);
    st += vec2(random(vec2(0.0,(1.0-step(1.0, mod(st.y, 2.0)))*-5.0))*u_time,0.0);

    vec2 ipos = floor(st);  // get the integer coords
    vec2 fpos = fract(st);  // get the fractional coords
    //ipos += vec2(, 0.0);

    float val =random( ipos );
    // Assign a random value based on the integer coord
    vec3 color = vec3( smoothstep(0.1+u_mouse.y/u_resolution.xy.y,0.6+u_mouse.x/u_resolution.xy.x,val));

    // Uncomment to see the subdivided grid
    // color = vec3(fpos,0.0);

    gl_FragColor = vec4(color,1.0);
}
