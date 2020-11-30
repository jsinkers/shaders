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
    st *= 9.0;

    vec3 color = vec3(0.0);

    // extract tile index
    vec2 i_st = floor(st);
    // extract position within tile
    vec2 f_st = fract(st);

    // find the distance to the 8 other points in adjacent cells
    float minDist = 1.0;
    vec2 minPoint = vec2(0.0);
    int minJ = 0;
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            // get the tile of interest
            vec2 neighbour = vec2(float(i),float(j));
            // get the random point for this tile
            vec2 neighbourPt = random2(i_st+neighbour);
            neighbourPt = 0.5 + 0.5*cos(u_time+6.23*neighbourPt);
            neighbourPt *= cos(u_time)/4.0;
            // find the distance to the random point
            vec2 diff = neighbour + neighbourPt - f_st;
            float dist = length(diff);
            // find minimum distance
            if (dist < minDist) {
                minDist = dist;
                minPoint = neighbourPt;
                minJ = j;
            }
            //minDist = min(minDist, dist);
        }
    }

    color += minDist;
    //color.b = minPoint
    //color.rg -= smoothstep(0.1,0.3,minPoint+sin(u_time+minPoint));
    vec3 c1 = vec3(0.1, 0.2, 0.3);
    vec3 c2 = vec3(0.1, 0.5, 0.1);
    color += 1.2*mix(c1, c2, minPoint.y);
    //color.b = smoothstep(0.1, 0.3, i_st.y*minPoint.y);
    

    gl_FragColor = vec4(color, 1.0);
}
