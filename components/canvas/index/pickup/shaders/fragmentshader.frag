precision mediump float;

uniform vec2 u_texturesize;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform float u_scale;
uniform float u_alpha;
uniform vec2 u_metaballsPos[7];
uniform float u_metaballsRadius[7];
varying vec2 vUv;

void main() {
    vec2 ratio = vec2(
        min((u_resolution.x / u_resolution.y) / (u_texturesize.x / u_texturesize.y), 1.0),
        min((u_resolution.y / u_resolution.x) / (u_texturesize.y / u_texturesize.x), 1.0)
    );

    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec4 texture = texture2D(u_texture, uv);

    float x = gl_FragCoord.x;
    float y = gl_FragCoord.y;

    float sum = 0.0;
    float l = 0.0;
    float dist = 0.0;

    for (int i = 0; i < 7; i++) {
        vec2 metaball = u_metaballsPos[i];
        float metaballRadius = u_metaballsRadius[i];
        float dx = (metaball.x + (u_resolution.x / 2.0)) - x;
        float dy = (metaball.y + (u_resolution.y / 2.0)) - y;
        float radius = metaballRadius;

        sum += (radius * radius) / (dx * dx + dy * dy);
    }

    if (sum > 1.0) {
        gl_FragColor = vec4(texture.rgb, u_alpha);
        return;
    }

    // gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    }

    // vec4 video_texture = texture2D(u_video_texture, uv);

    // gl_FragColor = vec4(texture.rgb, video_texture.r);
// }