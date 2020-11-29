#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}
vec2 tileCoords(vec2 st, vec2 tiling) {
    return st *= tiling;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
	float xTiling = 3.0;
    float yTiling = 3.0;
    
    st = tileCoords(st, vec2(xTiling, yTiling));      // Scale up the space by 3
    st = fract(st); // Wrap around 1.0

    float xWidth = u_resolution.x/xTiling;
    float yWidth = u_resolution.y/yTiling;

    int row = int(floor(gl_FragCoord.xy.y/yWidth));
	int column = int(floor(gl_FragCoord.xy.x/xWidth));
    if (row == column) {
        // Now we have 9 spaces that go from 0-1
        color = vec3(st,0.0);
        color = vec3(circle(st,0.5));
    }
    gl_FragColor = vec4(color,1.0);
}
