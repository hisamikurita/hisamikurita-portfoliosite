precision mediump float;

uniform sampler2D u_texture;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    vec2 ratio = vec2(
        min((u_resolution.x / u_resolution.y) / (u_texturesize.x / u_texturesize.y), 1.0),
        min((u_resolution.y / u_resolution.x) / (u_texturesize.y / u_texturesize.x), 1.0)
    );

    uv *= ratio;
    vec4 texture = texture2D(u_texture, uv);

    gl_FragColor = vec4(texture.rgb, 1.0);
}