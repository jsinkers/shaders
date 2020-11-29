#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;
uniform sampler1D tex;

//uniform sampler2D u_tex0;
//uniform vec2 u_tex0Resolution;

float mandelbrot(vec2 posn);
vec3 hsb2rgb( in vec3 c );

void main (void) {
    // map space to (+x,-x) = (-2.5,1), (+y,-y)=(-1,1)
    vec2 st = gl_FragCoord.xy/u_resolution.xy; 
    st = (st*vec2(3.5,2.0) + vec2(-2.5, -1.0));
    //st = (st*vec2(3.5,2.0) + vec2(-2.5, -2.0));
    //st /= u_time;
    //st += vec2(-0.75, 0.0);
    //st -= vec2(0.0,2.5/u_time);/[>u_time;

    //st -= vec2(0.4, 0.0)/u_time;
    vec3 color = vec3(0.0);
    float m = mandelbrot(st);
    //color = vec3(0.0,0.0,-log(m));
    vec3 color1 = vec3(0.0, 0.0, 1.0);
    vec3 color2 = vec3(1.0, 1.0, 1.0);
    color = mix(color2, color1, log(1.0+m));
    
    // hsv attempt
    color = hsb2rgb(vec3(m, m, m));
    //color.h = m;
    //value = step(0.999,m);
    //color.s = 1.0;

    gl_FragColor = vec4(color,1.0);
    //gl_FragColor = texture1D(tex, m);
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

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}
