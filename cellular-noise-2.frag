// voronoi
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// returns a random point
vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),
                    dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    // scale
    st *= 3.0;

    vec3 color = vec3(0.0);

    // extract tile index
    vec2 i_st = floor(st);
    // extract position within tile
    vec2 f_st = fract(st);

    // find the distance to the 8 other points in adjacent cells
    float minDist = 1.0;
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            // get the tile of interest
            vec2 neighbour = vec2(float(i),float(j));
            // get the random point for this tile
            vec2 neighbourPt = random2(i_st+neighbour);
            neighbourPt = 0.5 + 0.5*cos(u_time+6.23*neighbourPt);
            // find the distance to the random point
            vec2 diff = neighbour + neighbourPt - f_st;
            float dist = length(diff);
            // find minimum distance
            minDist = min(minDist, dist);
        }
    }

    color += minDist;
    gl_FragColor = vec4(color, 1.0);
}
