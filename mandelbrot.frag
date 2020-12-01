#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;
uniform sampler1D tex;

//uniform sampler2D u_tex0;
//uniform vec2 u_tex0Resolution;


// complex number operations
vec2 cadd( vec2 a, float s ) { return vec2( a.x+s, a.y ); }
vec2 cmul( vec2 a, vec2 b )  { return vec2( a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x ); }
vec2 cdiv( vec2 a, vec2 b )  { float d = dot(b,b); return vec2( dot(a,b), a.y*b.x - a.x*b.y ) / d; }
vec2 csqrt( vec2 z ) { float m = length(z); return sqrt( 0.5*vec2(m+z.x, m-z.x) ) * vec2( 1.0, sign(z.y) ); }
vec2 cconj( vec2 z ) { return vec2(z.x,-z.y); }
vec2 cpow( vec2 z, float n ) { 
    float r = length( z );
    float a = atan( z.y, z.x );
    return pow( r, n )*vec2( cos(a*n), sin(a*n) );
}

float mandelbrot(vec2 posn, float power);
float julia(vec2 posn, vec2 c, float r );
vec3 hsb2rgb( in vec3 c );
void main (void) {
    // map space to (+x,-x) = (-2.5,1), (+y,-y)=(-1,1)
    vec2 st = gl_FragCoord.xy/u_resolution.xy; 
    //st = (st*vec2(3.5,2.0) + vec2(-2.5, -1.0));
    //st = (st*vec2(3.5,2.0) + vec2(-2.5, -2.0));
    //st /= u_time;
    //st += vec2(-0.75, 0.0);
    //st -= vec2(0.0,2.5/u_time);/[>u_time;

    //st -= vec2(0.4, 0.0)/u_time;
    //vec3 color = vec3(0.0);
    //float power = 0.0;
    //power = 4.0+2.0*sin(u_time/10.0);
    //float m = mandelbrot(st, power);
    
    ////color = vec3(0.0,0.0,-log(m));
    ////vec3 color1 = vec3(0.0, 0.0, 1.0);
    ////vec3 color2 = vec3(1.0, 1.0, 1.0);
    ////color = mix(color2, color1, log(1.0+m));
    
    //// hsv attempt
    //color = hsb2rgb(vec3(m, m, m));
    ////color.h = m;
    ////value = step(0.999,m);
    ////color.s = 1.0;

    //gl_FragColor = vec4(color,1.0);
    //gl_FragColor = texture1D(tex, m);

    // julia
    st += vec2(-0.5);
    st *= 2.0;
    vec3 color = vec3(0.0);
    float power = 0.0;
    power = 2.0+0.2*sin(u_time/10.0);
    float m = mandelbrot(st, power);
    float j = julia(st, vec2(-0.8, 0.156)-0.05*sin(u_time/10.0), 2.0);


    color = hsb2rgb(vec3(j, j, j));
    gl_FragColor = vec4(color,1.0);
}

// return normalised number of iterations 
float mandelbrot(vec2 posn, float power) {
    int maxIterations = 100;
    float magZ = 0.0;
    float magC = 2.0;

    vec2 z = vec2(0.0);
    int i = 0;
    for (i = 0; i < maxIterations; i++) {
        magZ = length(z);
        if (magZ >= magC) {
            break;
        } else {
            z = cpow(z, power)+posn;
        }
    }

    float f_i = float(i);
    float f_maxIterations = float(maxIterations);
    float rv = f_i/f_maxIterations;
    return rv;
}

float julia(vec2 posn, vec2 c, float r ) {
    int maxIterations = 500;
    float magZ = 0.0;
    float power = 2.0;
    float magR = pow(r, 2.0);

    // z is normalised by r
    vec2 z = posn*r;
    //z.x += r/2.0;
    int i = 0;
    for (i = 0; i < maxIterations; i++) {
        magZ = length(z);
        if (magZ >= magR) {
            break;
        } else {
            z = cpow(z, power)+c;
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
