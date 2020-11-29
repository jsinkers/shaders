#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) +
            box(_st, vec2(_size/4.,_size));
}

// draw a sharp circle at centre with radius
vec3 circle(vec2 centre, float radius) {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    pct = step(distance(st, centre), radius);
    return vec3(pct);
}

float circle(vec2 st, vec2 centre, float radius) {
    float d = distance(st, centre);
    return step(d, radius);
}

float circleOutline(vec2 st, vec2 centre, float radius, float thickness) {
    float d = distance(st, centre);
    return smoothstep(radius-thickness/2.0, radius, d)-smoothstep(radius, radius+thickness/2.0,d);
}

float plot(vec2 st, float pct) {
    return smoothstep(pct-0.02,  pct, st.y) - smoothstep(pct, pct+0.02, st.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);


    // remap to -1..1
    st = st*2.0 -1.0;

    // spinning wedge 
    vec2 st3 = st;
    //vec2 translate3 = vec2(-1.0,-1.0);
    st3 -= vec2(0.0);
    // rotate the space
    st3 *= rotate2d(u_time);
    // move it back
    st3 += vec2(0.0);
    float c = circle(st3, vec2(0.0), 0.8);
    float a = atan(st3.y,st3.x);
    c *= step(a, -PI/2.0);
    c *= pow((a+PI/2.0)/(PI/2.0), 2.0);


    color += vec3(0.0,c,0.0);
    // concentric circles for the radar screen 
    color += vec3(circleOutline(st, vec2(0.0), 0.5, 0.01));
    color += vec3(circleOutline(st, vec2(0.0), 0.8, 0.02));
    color += vec3(circleOutline(st, vec2(0.0), 0.2, 0.01));
    color += vec3(circleOutline(st, vec2(0.0), 0.05, 0.01));
    // object moving across radar screen
    vec2 translate2 = vec2(-1.0+fract(u_time/10.0)*2.0,0.2);
    vec2 st2 = st;
    st2 += translate2;
    float target = circle(st2, vec2(0.0), 0.01);
    
    // To move the cross we move the space
    vec2 translate = vec2(cos(u_time),sin(u_time));
    st += translate*0.35;
    // move space from the center to the vec2(0.0)
    st -= vec2(0.5);
    // rotate the space
    st = rotate2d( sin(u_time)*3.1415) * st;
    // move it back to the original place
    st += vec2(0.5);

    // Show the coordinates of the space on the background
    //color = vec3(st.x,st.y,0.0);

    // Add the shape on the foreground
    //color += vec3(cross(st,0.25));
    color += vec3(target);


    gl_FragColor = vec4(color,1.0);
}
