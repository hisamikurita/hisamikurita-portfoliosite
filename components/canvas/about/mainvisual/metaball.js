import {
  gsap
} from 'gsap';
import * as THREE from 'three';
import vertexShader from './shaders/vertexshader.vert';
import fragmentShader from './shaders/fragmentshader.frag';

export default class Particle {
  constructor(stage, config) {
    // ステージ
    this.stage = stage;
    // サイト共通の設定
    this.config = config;
    this.geometryParm = {
      width: 1.0,
      height: 1.0,
      widthSegments: 1.0,
      heightSegments: 1.0
    };
    this.mesh = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // 画像の元のサイズ
    this.naturalSize = {
      x: 1200,
      y: 830
    };

    // ビデオテクスチャを生成
    this.video = document.createElement("video");
    this.video.src = "./movie/about-mv.mp4";
    this.video.crossOrigin = "anonymous";
    this.video.muted = true;
    this.video.setAttribute("playsinline", "playsinline");
    this.video.loop = true;
    this.video.play();
    this.texture = new THREE.VideoTexture(this.video);

    // メタボールの総数
    this.numMetaballs = 8;
    this.metaball = [
      {
        x: this.config.isPc ? -130 : 30,
        y: this.config.isPc ? 160 : 290,
        r: this.config.isPc ? 90 : 120,
        rand: this.config.isPc ? 0.84 : 0.74,
      },
      {
        x: -200,
        y: 100,
        r: 60,
        rand: this.config.isPc ? 0.66 : 0.32,
      },
      {
        x: 110,
        y: 120,
        r: 60,
        rand: 0.62,
      },
      {
        x: 0,
        y: -40,
        r: 60,
        rand: -0.43,
      },
      {
        x: 190,
        y: -40,
        r: 20,
        rand: this.config.isPc ? 0.81 : 0.52,
      },
      {
        x: this.config.isPc ? -20 : 10,
        y: this.config.isPc ? -280 : -400,
        r: 80,
        rand: -0.49,
      },
      {
        x: 200,
        y: -130,
        r: 40,
        rand: -0.67,
      },
      {
        x: this.config.isPc ? -300 : -190,
        y: this.config.isPc ? -130 : -150,
        r: 66,
        rand: 0.57,
      },
    ]

    this.mouse = {
      x: 0,
      y: 0
    };
  }

  init() {
    this._setMesh();
  }

  _setMesh() {
    const metaballsPosition = [];
    const metaballsRadius = [];
    const metaballsRands = [];

    for (let i = 0; i < this.numMetaballs; i++) {
      metaballsPosition.push(
        this.metaball[i].x,
        this.metaball[i].y,
      );

      metaballsRadius.push(
        0
      );

      metaballsRands.push(
        this.metaball[i].rand
      );
    }

    this.geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);

    this.material = new THREE.RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        u_texture: {
          type: "t",
          value: this.texture
        },
        u_metaballsPos: {
          type: "v2v",
          value: metaballsPosition,
        },
        u_metaballsRadius: {
          type: "1fv",
          value: metaballsRadius,
        },
        u_resolution: {
          type: "v2",
          value: {
            x: this.width,
            y: this.height
          }
        },
        u_texturesize: {
          type: "v2",
          value: {
            x: this.naturalSize.x,
            y: this.naturalSize.y
          }
        },
        u_rand: {
          type: '1fv',
          value: metaballsRands
        },
        u_scale: {
          type: 'f',
          value: 0.0
        },
        u_alpha: {
          type: 'f',
          value: 1.0
        },
        u_ratio: {
          type: 'f',
          value: this.config.isPc ? window.innerWidth / 1280 : window.innerWidth / 750,
        },
        u_time: {
          type: 'f',
          value: 0.0
        },
        u_mouse: {
          type: "v2",
          value: {
            x: 0,
            y: 0
          }
        }
      },
      transparent: true
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.stage.scene.add(this.mesh);
  }

  fadeIn() {
    for (let i = 0; i < this.numMetaballs; i++) {
      const r = { value: 0 }

      gsap.to(r, {
        duration: 0.60 + Math.random() * 0.75,
        delay: i * 0.08,
        ease: this.config.transform,
        value: this.metaball[i].r,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsRadius.value[i] = r.value
        },
      })
    }
  }

  _destroy() {
    this.stage.scene.remove(this.mesh);
    this.texture.dispose();
    this.geometry.dispose();
    this.material.dispose();
  }

  onResize() {
    this.width = this.stage.renderParam.width;
    this.height = this.stage.renderParam.height;

    this.mesh.material.uniforms.u_ratio.value = this.config.isPc ? window.innerWidth / 1280 : window.innerWidth / 750;

    this.mesh.material.uniforms.u_resolution.value.x = this.width;
    this.mesh.material.uniforms.u_resolution.value.y = this.height;
  }

  onMouseMove(e) {
    gsap.to(this.mouse, {
      duration: 0.20,
      ease: 'power1.out',
      x: ((e.clientX / window.innerWidth) * 2.0 - 1.0) * 200,
      y: -((e.clientY / window.innerHeight) * 2.0 - 1.0) * 200,
    });

    // for (let i = 0; i < this.numMetaballs; i++) {
    //   this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0] = this.mouse.x
    //   this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0 - 1.0] = this.mouse.y
    // }
    this.mesh.material.uniforms.u_mouse.value.x = this.mouse.x;
    this.mesh.material.uniforms.u_mouse.value.y = this.mouse.y;
  }

  _render() {
    console.log('発火')
    this.mesh.material.uniforms.u_time.value += 0.03;
  }

  onRaf() {
    this._render();
  }
}
