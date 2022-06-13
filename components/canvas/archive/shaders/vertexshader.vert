precision mediump float;

attribute vec3 position;
attribute vec2 uv;
uniform vec2 u_strength;
uniform vec2 u_resolution;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vUv;

#define PI 3.1415926535897932384626433832795

void main() {
  vUv = uv;

  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);
  newPosition.z += cos(newPosition.x / u_resolution.x * PI + PI / 2.0) * -u_strength.x;
  newPosition.z += sin(newPosition.y / u_resolution.y * PI + PI / 2.0) * -u_strength.y;
  gl_Position = projectionMatrix * newPosition;
}
