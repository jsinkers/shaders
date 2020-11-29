#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 smoothCircle(vec2 centre, float innerEdge, float outerEdge);
vec3 circle(vec2 centre, float radius);

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;
    float pct = 0.0;


    // distance from pixel to the center
    pct = distance(st, vec2(0.5));

    // equivalently, length of vector from pixel to the centre
    //vec2 toCenter = vec2(0.5) - st;
    //pct = length(toCenter);

    // equivalently, sqrt of vector from pixel to the centre
    //vec2 tC = vec2(0.5) - st;
    ////pct = sqrt(tC.x*tC.x+tC.y*tC.y);

    // draw a circle
    pct = step(distance(st, mouse), 0.25);
    // draw an inverted circle
    pct = 1.0- step(distance(st, mouse), 0.25);
    // draw a smooth circle
    pct = 1.0- smoothstep(0.1, 0.5, distance(st, mouse));

    //pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
    //pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
    //pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    //pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    //pct = pow(distance(st,mouse),distance(st,1.0-mouse));
    
    vec3 color = vec3(pct);
    color = vec3(color.r*abs(sin(u_time)), color.g*cos(u_time), color.b*tan(u_time/10.0));
    vec3 circle2 = smoothCircle(vec2(0.25), 0.1, 0.2);
    color += vec3(1.0-circle2.r, 0.0, 0.0);
    vec3 circle3 = smoothCircle(vec2(0.75), 0.1, 0.2);
    color += vec3(1.0-circle3.r, 0.0, 0.0);
    vec3 circle4 = smoothCircle(vec2(0.25,0.75), 0.1, 0.2);
    vec3 circle5 = smoothCircle(vec2(0.75,0.25), 0.1, 0.2);
    color += vec3(1.0-circle4.r, 0.0, 0.0);
    color += vec3(1.0-circle5.r, 0.0, 0.0);

    //color = smoothCircle(mouse, 0.4, 0.5);

    gl_FragColor = vec4(color, 1.0);

}

// draw a sharp circle at centre with radius
vec3 circle(vec2 centre, float radius) {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    pct = step(distance(st, centre), radius);
    return vec3(pct);
}

// draw a smooth edged circle at centre with inner edge/outer edge
vec3 smoothCircle(vec2 centre, float innerEdge, float outerEdge) {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    pct = smoothstep(innerEdge, outerEdge, distance(st, centre));
    return vec3(pct);
}


// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com
// cheap circle using dot product
float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
            _radius+(_radius*0.01),
            dot(dist,dist)*4.0);
}
