precision highp float;
uniform sampler2D tDiffuse;
uniform vec2 u_diffmouse;
varying vec2 vUv;

void main(){
    float mousediff = (u_diffmouse.x + u_diffmouse.y) / 150.0;
    vec4 defaultColor = texture2D(tDiffuse, vUv);
    vec4 redColor = texture2D(tDiffuse, vUv + vec2(-mousediff, mousediff));
    vec4 blueColor = texture2D(tDiffuse, vUv + vec2(mousediff, -mousediff));

    gl_FragColor = vec4(redColor.r, defaultColor.g, blueColor.b, defaultColor.a);
}
