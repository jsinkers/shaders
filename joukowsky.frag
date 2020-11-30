#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 joukowsky(vec2 st) {
    float x = st.x;
    float y = st.y;
    float sumSq = (pow(x, 2.0)+pow(y, 2.0));
    float rx = x*(sumSq+1.0)/sumSq;
    float ry = y*(sumSq-1.0)/sumSq;
    return vec2(rx,ry);
}

vec2 inverseJoukowsky(vec2 st, float c) {
    float x = st.x;
    float y = st.y;

    float alpha = pow(x, 2.0)-pow(y, 2.0)-pow(c, 2.0);
    float beta = 2.0*x*y;

    float r = sqrt(pow(alpha,2.0)+pow(beta,2.0));
    float theta = 0.0;
    theta = atan(beta,alpha);

    float s = sqrt(r);
    float psi = theta/2.0;

    vec2 zeta = vec2(0.0);

    // quadrant 1

    if (x >= 0.0 && y >= 0.0) {
        zeta.x = x + s*cos(psi);
        zeta.y = y + s*sin(psi);
    } else if (x < 0.0 && y >= 0.0) {
        zeta.x = x - s*cos(psi);
        zeta.y = y - s*sin(psi);
    } else if (x < 0.0 && y < 0.0) {
        zeta.x = x - s*cos(psi);
        zeta.y = y - s*sin(psi);
    } else if (x >= 0.0 && y < 0.0) {
        zeta.x = x + s*cos(psi);
        zeta.y = y + s*sin(psi);
    }

    return zeta;
}


vec2 inverseJoukowsky2(vec2 st, float c) {
    float x = st.x;
    float y = st.y;

    float alpha = (pow(x, 2.0)-pow(y, 2.0))*pow(c, 2.0)-4.0;
    float beta = 2.0*x*y*pow(c,2.0);

    float r = sqrt(pow(alpha,2.0)+pow(beta,2.0));
    float theta = 0.0;
    theta = atan(beta,alpha);

    float s = sqrt(r);
    float psi = theta/2.0;

    vec2 zeta = vec2(0.0);
    zeta.x = c*x/2.0 + s*cos(psi);
    zeta.y = c*y/2.0 + s*sin(psi);

    return zeta;
}

// draw a smooth edged circle at centre with inner edge/outer edge
float circle(vec2 st, vec2 centre, float radius) {
    float d = distance(st, centre);
    return step(d, radius);
}

float circleOutline(vec2 st, vec2 centre, float radius, float thickness) {
    float d = distance(st, centre);
    return smoothstep(radius-thickness/2.0, radius, d)-smoothstep(radius, radius+thickness/2.0,d);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    float width = 3.0;
    float xtrans = 0.;
    st *= width;
    st -= width/2.0;
    st += vec2(xtrans,0.0);
    vec2 centre = vec2(-0.08, 0.08);
    //float stripe = 0.2*abs(sin(st.x*10.0+u_time));
    //st = inverseJoukowsky(st, 1.5*sin(u_time/2.0)+4.0);
    //st = inverseJoukowsky(st, sin(u_time/10.0)*0.2+1.0);
    st = inverseJoukowsky(st, smoothstep(0.1, 0.9, u_time/10.0));
    
    //st = joukowsky(st);

    vec3 circle = vec3(circleOutline(st, centre, sin(u_time)/10.0+1.18, 0.05));
    float r = length(st - centre);

    vec3 colour = vec3(0.0);
    colour = vec3(0.4*abs(sin(r*5.0)));
    //colour += stripe;

    colour += circle;
  //colour = joukowsky(st));
    gl_FragColor = vec4(colour, 1.0);
}
