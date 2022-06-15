import { gsap } from 'gsap';
import * as THREE from 'three';
import vertexShader from './shaders/vertexshader.vert';
import fragmentShader from './shaders/fragmentshader.frag';

export default class Particle {
  constructor(config, stage, metaball, imgPath) {
    // ステージ
    this.stage = stage;
    // サイト共通の設定
    this.config = config;
    // 画像
    this.texturePath = this.config.isPc ? imgPath.pc : imgPath.sp;
    this.texture = new THREE.TextureLoader().load(this.texturePath);
    // 画像の元のサイズ
    this.naturalSizes = {
      'pc': {
        x: 1280,
        y: 800
      },
      'sp': {
        x: 750,
        y: 1106
      },
    };
    this.naturalSize = this.config.isPc ? this.naturalSizes.pc : this.naturalSizes.sp;

    this.geometryParm = {
      width: 1.0,
      height: 1.0,
      widthSegments: 1.0,
      heightSegments: 1.0
    };
    this.mesh = null;
    // メタボールの総数
    this.numMetaballs = 8;
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

      if (this.config.isTab) {
        x = this.metaball[i].x.tab;
        y = this.metaball[i].y.tab;
        r = this.metaball[i].r.tab;
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
        rand: rand * (this.stage.devicePixelRatio),
      }

      this.metaballs.push(metaball);
    }

    // 最初に円周上にメタボールを配置しておく
    for (let i = 0; i < this.numMetaballs; i++) {
      const radians = (i / (this.numMetaballs - 1.0)) * Math.PI * 2.0;
      let initX = (window.innerWidth * 1.5 * this.stage.devicePixelRatio) * Math.cos(radians);
      let initY = (window.innerHeight * 1.5 * this.stage.devicePixelRatio) * Math.sin(radians);

      if(i === this.numMetaballs - 1.0) {
        initX = 0
        initY = 0
      }

      this.metaballs[i].initX = initX;
      this.metaballs[i].initY = initY;
    }

    this.speed = this.config.isPc ? 0.036 / (this.stage.devicePixelRatio) : 0.036;
    this.width = window.innerWidth * this.stage.devicePixelRatio;
    this.height = window.innerHeight * this.stage.devicePixelRatio;

    // 各シーンで動かしているGSAPを格納しておく空配列①
    this.setCenterAnimations = [];
    // 各シーンで動かしているGSAPを格納しておく空配列②
    this.setNextPageAnimations = [];

    this.metaballDeviceDiffuseRatio = this.config.isPc ? 0.50 : 0.70;

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
    const metaballsRand = [];

    for (let i = 0; i < this.numMetaballs; i++) {
      metaballsPosition.push(
        this.metaballs[i].initX,
        this.metaballs[i].initY,
      );

      metaballsRand.push(
        this.metaballs[i].rand,
      );

      metaballsRadius.push(
        0,
      );
    }
    const geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);

    const material = new THREE.RawShaderMaterial({
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
          value: metaballsRand
        },
        u_time: {
          type: 'f',
          value: 0.0
        },
      },
      transparent: true
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.stage.scene.add(this.mesh);
  }

  onResize() {
    this.mesh.material.uniforms.u_resolution.value.x = window.innerWidth * this.stage.devicePixelRatio;
    this.mesh.material.uniforms.u_resolution.value.y = window.innerHeight * this.stage.devicePixelRatio;
  }

  /**
   * 中心に集まる
   */
  setCenter() {
    // アニメーションを入れておく配列を再度定義
    this.setCenterAnimations = [];

    for (let i = 0; i < this.numMetaballs - 1.0; i++) {
      const x = {
        value: this.metaballs[i].initX
      }
      const y = {
        value: this.metaballs[i].initY
      }
      this.mesh.material.uniforms.u_time.value = 0.0;
      this.mesh.material.uniforms.u_metaballsRadius.value[i] = this.metaballs[i].r

      const setCenterXAnimation = gsap.fromTo(x, {
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

      const setCenterYAnimation = gsap.fromTo(y, {
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

      this.setCenterAnimations.push(setCenterXAnimation, setCenterYAnimation);
    }

    // mouse
    const mouseR = {
      value: 0
    };
    this.mouseAnimation = gsap.fromTo(mouseR, {
      value: 0,
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
   * 縮小する
   */
  setShrink() {
    for (let i = 0; i < this.setCenterAnimations.length; i++) {
      // 他のアニメーションを消しておく
      if (this.setCenterAnimations[i]) this.setCenterAnimations[i].kill();
    }

    for (let i = 0; i < this.numMetaballs - 1.0; i++) {
      const x = {
        value: this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0]
      }
      const y = {
        value: this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0 - 1.0]
      }
      const r = {
        value: this.mesh.material.uniforms.u_metaballsRadius.value[i]
      }

      gsap.to(x, {
        duration: this.setMetaballDuration(i, 0.3),
        delay: this.setMetaballDelay(i),
        ease: this.config.transform,
        value: 0,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0] = x.value
        }
      })

      gsap.to(y, {
        duration: this.setMetaballDuration(i, 0.3),
        delay: this.setMetaballDelay(i),
        ease: this.config.transform,
        value: 0,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0 - 1.0] = y.value
        }
      })

      gsap.to(r, {
        duration: this.setMetaballDuration(i, 0.6),
        delay: 0.2,
        ease: this.config.transform,
        value: 0,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsRadius.value[i] = r.value
        }
      })
    }

    // mouse
    const mouseR = {
      value: this.metaballs[this.numMetaballs - 1.0].r
    };
    this.mouseAnimation = gsap.fromTo(mouseR, {
      value: this.metaballs[this.numMetaballs - 1.0].r,
    }, {
      duration: 1.0,
      delay: 0.2,
      ease: this.config.transform,
      value: 0,
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

  setNextPageStart() {
    // アニメーションを入れておく配列を再度定義
    this.setNextPageAnimations = [];

    // マウスのアニメーションを消しておく
    this.mouseAnimation.kill()

    for (let i = 0; i < this.numMetaballs; i++) {
      const r = {
        value: this.mesh.material.uniforms.u_metaballsRadius.value[i]
      }

      this.setNextPageAnimation = gsap.to(r, {
        duration: this.setMetaballDuration(i, 1.6),
        delay: this.setMetaballDelay(i, 1.6),
        ease: this.config.transform,
        value: window.innerWidth * this.stage.devicePixelRatio * this.metaballDeviceDiffuseRatio,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsRadius.value[i] = r.value
        }
      })

      this.setNextPageAnimations.push(this.setNextPageAnimation);
    }
  }

  delete() {
    for (let i = 0; i < this.numMetaballs; i++) {
      // 他のアニメーションを消しておく
      if (this.setNextPageAnimations[i]) this.setNextPageAnimations[i].kill()

      this.mesh.material.uniforms.u_metaballsRadius.value[i] = 0
    }
  }

  _render() {
    this.mesh.material.uniforms.u_time.value += this.speed;
  }

  onMouseMove(e) {
    const x = (((e.clientX / window.innerWidth) * 2.0 - 1.0) * (window.innerWidth / 2.0)) * this.stage.devicePixelRatio;
    const y = ((-(e.clientY / window.innerHeight) * 2.0 + 1.0) * (window.innerHeight / 2.0)) * this.stage.devicePixelRatio;

    gsap.to(this.mouse, {
      duration: 6.0,
      ease: "power3.out",
      x: x,
      y: y,

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
