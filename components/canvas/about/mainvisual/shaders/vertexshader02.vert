precision mediump float;

attribute vec3 position;
attribute vec3 offsetPos;
attribute vec2 uv;
attribute float rand;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float u_time;
varying vec2 vUv;

void main() {
    vUv = uv;
    float randX = cos(u_time * rand) * rand * 1.5;
    float randY = sin(u_time * rand) * rand * 1.5;
    float randZ = 0.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position + vec3(randX,randY, randZ) + offsetPos, 1.0);
}