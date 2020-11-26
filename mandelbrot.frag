#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

void main (void) {
    // map space to (-2.5,1), (-1,1)
    vec2 st = gl_FragCoord.xy/u_resolution.xy + vec2(-2.5, 0.0);
    vec3 color = vec3(0.0);

    if (st.x <= 0.1 && st.x >= -0.1) {
        color = vec3(1.0,1.0,1.0);
    } else if (st.y <= 0.1 || st.y >= -0.1) {
        float aspect = u_resolution.x/u_resolution.y;
        st.x *= aspect;
        color = vec3(st.x, st.y, st.y);
    }

    gl_FragColor = vec4(color,1.0);
}

// return normalised number of iterations 
float mandelbrot(vec2 posn) {
    int maxIterations = 1000;
    float thresh = 2.0;

    vec2 x = vec2(0.0);
    vec2 xNew = vec2(0.0);
    int i;
    for (i = 0; i < maxIterations; i++) {
        

        if ((pow(x,2)+ y^2) <= thresh) {
            break;
        }

    }

    

    return float(i)/maxIterations;
}
