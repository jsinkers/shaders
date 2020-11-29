#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

vec3 borderRectangle(float edgeThickness, float softness);
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    //vec2 borders = smoothstep(vec2(0.1),vec2(0.2),st);
    //vec2 borders2 = smoothstep(vec2(0.1),vec2(0.2),1.0-st);
    //float pct = borders.x * borders.y * borders2.x * borders2.y ;
    //float right = step(0.9, st.x);
    //float top = step(0.9,st.y);

    color = borderRectangle(0.1, 0.1);
    //color = vec3(pct);

    gl_FragColor = vec4(color,1.0);

}


//void rectangle(float thickness, 
vec3 borderRectangle(float edgeThickness, float softness) {

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 borders = smoothstep(vec2(edgeThickness),vec2(edgeThickness+softness),st);
    vec2 borders2 = smoothstep(vec2(edgeThickness),vec2(edgeThickness+softness),1.0-st);
    float pct = borders.x * borders.y * borders2.x * borders2.y ;
    //float right = step(0.9, st.x);
    //float top = step(0.9,st.y);

    color = vec3(pct);

    return color;
}

vec3 floorRectangle(float edgeThickness) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

}
