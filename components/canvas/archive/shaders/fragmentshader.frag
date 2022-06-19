precision mediump float;

uniform vec2 u_texturesize;
uniform vec2 u_meshsize;
uniform sampler2D u_texture;
uniform float u_alpha;
uniform float u_time;
varying vec2 vUv;

void main() {
    vec2 ratio = vec2(
        min((u_meshsize.x / u_meshsize.y) / (u_texturesize.x / u_texturesize.y), 1.0),
        min((u_meshsize.y / u_meshsize.x) / (u_texturesize.y / u_texturesize.x), 1.0)
    );

    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    uv -= 0.5;
    uv *= ratio;
    uv += 0.5;


    vec4 texture = texture2D(u_texture, uv);

    gl_FragColor = vec4(texture.rgba);
}
