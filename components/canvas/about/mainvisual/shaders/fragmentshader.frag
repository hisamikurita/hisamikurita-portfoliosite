precision mediump float;

uniform vec2 u_texturesize;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
// uniform sampler2D u_video_texture;
uniform vec3 u_metaballs[30];
varying vec2 vUv;

void main() {
    // vec2 uv = vUv;

    // vec2 ratio = vec2(
    //     min((u_resolution.x / u_resolution.y) / (u_texturesize.x / u_texturesize.y), 1.0),
    //     min((u_resolution.y / u_resolution.x) / (u_texturesize.y / u_texturesize.x), 1.0)
    // );

    // uv *= ratio;

    // vec4 texture = texture2D(u_texture, uv);

    // float x = gl_FragCoord.x;
    // float y = gl_FragCoord.y;

    // float sum = 0.0;
    // for (int i = 0; i < 30; i++) {
    //     vec3 metaball = u_metaballs[i];
    //     float dx = metaball.x - x;
    //     float dy = metaball.y - y;
    //     float radius = metaball.z;

    //     sum += (radius * radius) / (dx * dx + dy * dy);
    // }

    // if (sum >= 0.99) {
    // gl_FragColor = vec4(texture.rgb, 1.0);
    // return;
    // }

    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }

    // vec4 video_texture = texture2D(u_video_texture, uv);

    // gl_FragColor = vec4(texture.rgb, video_texture.r);
// }