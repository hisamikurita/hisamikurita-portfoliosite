/*
Reference: http://jamie-wong.com/2016/07/06/metaballs-and-webgl/
*/

precision mediump float;

uniform vec2 u_texturesize;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D u_texture;
uniform float u_ratio;
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

    // 組み込み変数(gl_FragCoord)には これから処理しようとしているピクセルの位置が入ってくる
    float x = gl_FragCoord.x;
    float y = gl_FragCoord.y;

    float sum = 0.0;
    float l = 0.0;
    float dist = 0.0;
    float vRatio = u_ratio;

    for (int i = 0; i < 8; i++) {
        // float xx = u_metaballsPos[i].x + (u_mouse.x * 200.0);
        // float yy = u_metaballsPos[i].y + (u_mouse.y * 200.0);

        vec2 metaball = u_metaballsPos[i];
        metaball.x += u_mouse.x;
        metaball.y += u_mouse.y;

        float metaballRadius = u_metaballsRadius[i];
        float rand = u_rand[i];
        float sx = (metaball.x * vRatio) + cos(u_time * rand) * (((120.0 * vRatio) * rand * uv.x) + 40.0);
        float sy = (metaball.y * vRatio) + sin(u_time * rand) * (((120.0 * vRatio) * rand * uv.y) + 40.0);
        // 円の方程式 (x-a**2) + (y-b**2) = r**2 から、
        // (particle.z * particle.z) / (dx * dx + dy * dy) の計算をすると、
        // 任意の半径の箇所が r = 1,0 になり円の内側にかけて値が 2.0、3.0、4.0・・・と大きくなる
        // 逆に円の外側にかけて 0.9、0.8、0.7・・・と小さくなっていく
        float dx = ((sx + (u_resolution.x / 2.0)) - x);
        float dy = ((sy + (u_resolution.y / 2.0)) - y);
        float radius = metaballRadius * vRatio;

        // rの値を加算代入していくことによって、円と円とが近づいた時に円の外側にかけて閾値を超える場所が出てくるので、
        // 結果として円と円がくっついたような表現になる
        sum += (radius * radius) / (dx * dx + dy * dy);

                // mouse
        // dx += (u_mouse.x * (metaballRadius * rand * 4.0));
        // dy += (u_mouse.y * (metaballRadius * rand * 4.0));
    }

    // 閾値を超えた時だけ描画する
    if (sum > 1.0) {
        gl_FragColor = vec4(texture.rgb, 1.0);
        return;
    }
}