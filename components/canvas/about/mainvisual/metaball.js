import {
  gsap
} from 'gsap';
import * as THREE from 'three';
import vertexShader from './shaders/vertexshader.vert';
import fragmentShader from './shaders/fragmentshader.frag';

export default class Particle {
  constructor(stage, config, metaball) {
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
    this.width = this.stage.renderParam.width * this.stage.devicePixelRatio;
    this.height = this.stage.renderParam.height * this.stage.devicePixelRatio;
    // 画像の元のサイズ
    this.naturalSize = {
      x: 1280,
      y: 800
    };

    // ビデオテクスチャを生成
    this.video = document.createElement("video");
    this.video.src = "/movie/about-mv.mp4";
    this.video.setAttribute("crossOrigin", "anonymous");
    this.video.setAttribute("playsinline", "playsinline");
    this.video.muted = true;
    this.video.loop = true;
    this.video.play();
    this.texture = new THREE.VideoTexture(this.video);

    // メタボールの総数
    this.numMetaballs = 9;
    this.metaball = metaball;
    this.metaballs = [];

    // メタボールの初期値をまとめる
    for (let i = 0; i < this.numMetaballs; i++) {
      let x = 0;
      let y = 0;
      let rand = 0;
      let r = 0;

      if (this.config.isPc) {
        x = this.metaball[i].x.pc;
        y = this.metaball[i].y.pc;
        r = this.metaball[i].r.pc;
        rand = this.metaball[i].rand.pc
      }

      if (this.config.isMobile) {
        x = this.metaball[i].x.sp;
        y = this.metaball[i].y.sp;
        r = this.metaball[i].r.sp;
        rand = this.metaball[i].rand.sp
      }

      const metaball = {
        x: x * this.stage.devicePixelRatio,
        y: y * this.stage.devicePixelRatio,
        r: r * this.stage.devicePixelRatio,
        rand: rand * this.stage.devicePixelRatio,
      }

      this.metaballs.push(metaball);
    }

    // 最初に円周上にメタボールを配置しておく
    for (let i = 0; i < this.numMetaballs; i++) {
      const radians = (i / (this.numMetaballs)) * Math.PI * 2.0;
      const initX = (window.innerWidth * this.stage.devicePixelRatio * 1.5) * Math.cos(radians);
      const initY = (window.innerHeight * this.stage.devicePixelRatio * 1.5) * Math.sin(radians);

      this.metaballs[i].initX = initX;
      this.metaballs[i].initY = initY;
    }
    this.speed = 0.036 / (this.stage.devicePixelRatio);
    this.mouse = {
      x: 0,
      y: 0,
    };
    this.lastIndex = (this.numMetaballs - 1.0) * 2.0;
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
        this.metaballs[i].x,
        this.metaballs[i].y,
      );
      metaballsRadius.push(
        this.metaballs[i].rand,
      );

      metaballsRands.push(
        this.metaballs[i].rand
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
        u_ratio: {
          type: 'f',
          value: this.config.isPc ? window.innerWidth / 1280 : window.innerWidth / 800,
        },
        u_time: {
          type: 'f',
          value: 0.0
        },
      },
      transparent: true
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.stage.scene.add(this.mesh);
  }

  fadeIn() {
    for (let i = 0; i < this.numMetaballs; i++) {
      const x = {
        value: this.metaballs[i].initX
      }
      const y = {
        value: this.metaballs[i].initY
      }
      this.mesh.material.uniforms.u_metaballsRadius.value[i] = this.metaballs[i].r

      gsap.fromTo(x, {
        value: x.value,
      }, {
        duration: this.setMetaballDuration(i),
        delay: this.setMetaballDelay(i),
        ease: this.config.transform,
        value: this.metaballs[i].x,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0] = x.value
        }
      })

      gsap.fromTo(y, {
        value: y.value,
      }, {
        duration: this.setMetaballDuration(i),
        delay: this.setMetaballDelay(i),
        ease: this.config.transform,
        value: this.metaballs[i].y,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0 - 1.0] = y.value
        }
      })
    }

    // mouse
    const mouseR = {
      value: 0
    };
    this.mouseAnimation = gsap.fromTo(mouseR, {
      value: 0
    }, {
      duration: 1.0,
      delay: 0.2,
      ease: this.config.transform,
      value: this.metaballs[this.numMetaballs - 1.0].r,
      onUpdate: () => {
        this.mesh.material.uniforms.u_metaballsRadius.value[this.numMetaballs - 1.0] = mouseR.value
      }
    })
  }

  /**
   * particle共通のduration
   */
  setMetaballDuration(index, ratio = 1.0) {
    return ((0.80 * ratio) + Math.abs(this.metaballs[index].rand / this.stage.devicePixelRatio) * (0.90 * ratio))
  }

  /**
   * particle共通のdelay
   */
  setMetaballDelay(index, ratio = 1.0) {
    return index * (0.01 * ratio)
  }

  _destroy() {
    this.stage.scene.remove(this.mesh);
    this.texture.dispose();
    this.geometry.dispose();
    this.material.dispose();
  }

  onResize() {
    this.width = this.stage.renderParam.width * this.stage.devicePixelRatio;
    this.height = this.stage.renderParam.height * this.stage.devicePixelRatio;

    this.mesh.material.uniforms.u_ratio.value = this.config.isPc ? window.innerWidth / 1280 : window.innerWidth / 800;

    this.mesh.material.uniforms.u_resolution.value.x = this.width;
    this.mesh.material.uniforms.u_resolution.value.y = this.height;
  }

  _render() {
    this.mesh.material.uniforms.u_time.value += this.speed;
  }

  onMouseMove(e, s) {
    gsap.to(this.mouse, {
      duration: 6.0,
      ease: "power3.out",
      x: (((e.clientX * this.stage.devicePixelRatio / this.width) * 2.0 - 1.0) * (this.width / 2.8)),
      y: (-(e.clientY * this.stage.devicePixelRatio / this.height) * 2.0 + 1.0) * (this.height / 2.8) - s * 0.9,

      onUpdate: () => {
        this.mesh.material.uniforms.u_metaballsPos.value[this.lastIndex] = this.mouse.x;
        this.mesh.material.uniforms.u_metaballsPos.value[this.lastIndex + 1.0] = this.mouse.y;
      }
    });
  }

  onRaf() {
    this._render();
  }
}
