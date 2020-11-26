#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

//uniform sampler2D u_tex0;
//uniform vec2 u_tex0Resolution;

float mandelbrot(vec2 posn);

void main (void) {
    // map space to (+x,-x) = (-2.5,1), (+y,-y)=(-1,1)
    vec2 st = gl_FragCoord.xy/u_resolution.xy; 
    st = st*vec2(3.5,2.0)+ vec2(-2.5, -1.0);
    vec3 color = vec3(0.0);
    float m = mandelbrot(st);
    //color = vec3(0.0,0.0,-log(m));
    vec3 color1 = vec3(0.0, 0.0, 1.0);
    vec3 color2 = vec3(1.0, 1.0, 1.0);
    color = mix(color2, color1, log(1.0+m));


    gl_FragColor = vec4(color,1.0);
}

// return normalised number of iterations 
float mandelbrot(vec2 posn) {
    int maxIterations = 100;
    float f_thresh = 2.0;

    vec2 z = vec2(0.0);
    vec2 zPrime = vec2(0.0);
    int i = 0;
    for (i = 0; i < maxIterations; i++) {
        if ((z.x*z.x + z.y*z.y) > f_thresh*f_thresh) {
            break;
        } else {
            z = vec2(z.x*z.x- z.y* z.y+posn.x, 2.0*z.x*z.y+posn.y);
        }
    }

    float f_i = float(i);
    float f_maxIterations = float(maxIterations);
    float rv = f_i/f_maxIterations;
    return rv;
}
