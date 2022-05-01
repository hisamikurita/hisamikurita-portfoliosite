/*
Reference: http://jamie-wong.com/2016/07/06/metaballs-and-webgl/
*/

precision highp float;

uniform vec2 u_texturesize;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D u_texture;
uniform float u_scale;
uniform float u_ratio;
uniform float u_alpha;
uniform float u_time;
uniform float u_rand[8];
uniform vec2 u_metaballsPos[8];
uniform float u_metaballsRadius[8];
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

    float x = gl_FragCoord.x + u_mouse.x;
    float y = gl_FragCoord.y + u_mouse.y;

    float sum = 0.0;
    float l = 0.0;
    float dist = 0.0;
    float vRatio = u_ratio;

    for (int i = 0; i < 8; i++) {
        // float xx = u_metaballsPos[i].x + (u_mouse.x * 200.0);
        // float yy = u_metaballsPos[i].y + (u_mouse.y * 200.0);

        vec2 metaball = u_metaballsPos[i];
        // metaball.x += u_mouse.x * 100.0;
        // metaball.y += u_mouse.y * 100.0;

        float metaballRadius = u_metaballsRadius[i];
        float rand = u_rand[i];
        float sx = (metaball.x * vRatio) + cos(u_time * rand) * (((120.0 * vRatio) * rand * uv.x) + 40.0);
        float sy = (metaball.y * vRatio) + sin(u_time * rand) * (((120.0 * vRatio) * rand * uv.y) + 40.0);
        float dx = ((sx + (u_resolution.x / 2.0)) - x);
        float dy = ((sy + (u_resolution.y / 2.0)) - y) + u_mouse.x;
        float radius = metaballRadius * vRatio;

        sum += (radius * radius) / (dx * dx + dy * dy);

                // mouse
        // dx += (u_mouse.x * (metaballRadius * rand * 4.0));
        // dy += (u_mouse.y * (metaballRadius * rand * 4.0));
    }

    if (sum > 1.0) {
        gl_FragColor = vec4(texture.rgb, u_alpha);
        return;
    }
}