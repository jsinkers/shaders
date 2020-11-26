// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    float f = cos(a*3.);
     //f = abs(cos(a*3.+u_time));
     float h = abs(cos(a*2.5))*.5+.3;
     float g = abs(cos(a*12.)*sin(a*3.+u_time))*.8+.1;
     f = smoothstep(-.5,1., cos(a*10.+u_time))*0.2+0.5;

    color = vec3(0.0,0.0, 1.-smoothstep(f,f+0.3,r*abs(cos(u_time))));
    color += vec3(0.0,1.-smoothstep(g,g+0.23,r),0.0);
    color += vec3(1.-smoothstep(h,h+0.2,r),0.0,0.0);
    gl_FragColor = vec4(color, 1.0);
}
