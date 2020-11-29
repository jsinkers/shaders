#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float rand(float x) {
    return fract(sin(x)*100000.0);
}

float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    return mix(rand(i), rand(i+1.0), smoothstep(0.,1.,f));
}

// draw a smooth edged circle at centre with inner edge/outer edge
vec3 smoothCircle(vec2 st, vec2 centre, float innerEdge, float outerEdge) {
    float pct = 0.0;
    pct = smoothstep(innerEdge, outerEdge, distance(st, centre));
    return vec3(pct);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 2.0;
    st += vec2(-1.0);
    vec3 color = vec3(0.0);
    color = smoothCircle(st, vec2(0.0), noise(u_time/10.0), noise(u_time/5.0));
    gl_FragColor = vec4(color, 1.0);
}
