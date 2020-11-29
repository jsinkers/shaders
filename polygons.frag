#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html
float polygon(vec2 st, vec2 centre, int numSides);

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);
    float d = 0.0;

    // Remap the space to -1. to 1.
    st = st *2.-1.;

    // Number of sides of your shape
    int N = 3;

    // Angle and radius from the current pixel
    float a = atan(st.x,st.y)+PI;
    float r = TWO_PI/float(N);

    // Shaping function that modulate the distance
    d = cos(floor(.5+a/r)*r-a)*length(st);
    d = polygon(st, vec2(0.5,0.0), 4);

    //color = vec3(1.0-smoothstep(.4,.41,d));
    d = polygon(st, vec2(-0.0,0.0), 3 + int(u_time));
    color += vec3(1.0-smoothstep(.4,.41,d));
   //  color = vec3(d);

    gl_FragColor = vec4(color,1.0);
    
}

// return a distance field value
float polygon(vec2 st, vec2 centre, int numSides) {
    // Angle and radius from the current pixel
    float a = atan(st.x-centre.x, st.y-centre.y)+PI;
    float r = TWO_PI/float(numSides);

    // shaping function
    float d = 0.0;
    d = cos(floor(.5+a/r)*r-a)*length(st-centre);

    return d;
}
