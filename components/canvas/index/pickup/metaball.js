import { gsap } from 'gsap';
import * as THREE from 'three';
import vertexShader from './shaders/vertexshader.vert';
import fragmentShader from './shaders/fragmentshader.frag';

export default class Particle {
  constructor(config, stage, imgPath) {
    // ステージ
    this.stage = stage;
    // サイト共通の設定
    this.config = config;
    // 画像
    this.texture = new THREE.TextureLoader().load(imgPath);
    // 画像の元のサイズ
    this.naturalSize = {
      x: 1280,
      y: 800
    };
    this.geometryParm = {
      width: 1.0,
      height: 1.0,
      widthSegments: 1.0,
      heightSegments: 1.0
    };
    this.mesh = null;
    // メタボールの総数
    this.numMetaballs = 7;
    this.metaballs = [
      {
        x: 110,
        y: 160,
        r: 60,
        rand: 0.62,
      },
      {
        x: -40,
        y: 0,
        r: 60,
        rand: -0.43,
      },
      {
        x: -20,
        y: -240,
        r: 80,
        rand: -0.49,
      },
      {
        x: 220,
        y: -90,
        r: 40,
        rand: -0.67,
      },
      {
        x: -200,
        y: -60,
        r: 60,
        rand: 0.66,
      },
      {
        x: -330,
        y: 200,
        r: 90,
        rand: 0.84,
      },
      {
        x: 190,
        y: 0,
        r: 20,
        rand: 0.81,
      },
    ];

    // 最初に円周上にメタボールを配置しておく
    for (let i = 0; i < this.numMetaballs; i++) {
      const radians = (i / (this.numMetaballs - 1.0)) * Math.PI * 2.0;
      const initX = (window.innerWidth * 1.5) * Math.cos(radians);
      const initY = (window.innerHeight * 1.5) * Math.sin(radians);

      this.metaballs[i].initX = initX;
      this.metaballs[i].initY = initY;
    }

    this.speed = 0.036;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.nextPageStartAnimationArray = [];
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
        this.metaballs[i].r,
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
        u_scale: {
          type: 'f',
          value: 0.0
        },
        u_alpha: {
          type: 'f',
          value: 1.0
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
    this.mesh.material.uniforms.u_resolution.value.x = window.innerWidth;
    this.mesh.material.uniforms.u_resolution.value.y = window.innerHeight;
  }

  /**
   * 中心に集まる
   */
  setCenter() {
    for (let i = 0; i < this.numMetaballs; i++) {
      const x = { value: this.metaballs[i].initX }
      const y = { value: this.metaballs[i].initY }
      this.mesh.material.uniforms.u_time.value = 0.0;
      this.mesh.material.uniforms.u_metaballsRadius.value[i] = this.metaballs[i].r

      gsap.fromTo(x,
        {
          value: x.value,
        },
        {
          duration: this.setMetaballDuration(i),
          delay: this.setMetaballDelay(i),
          ease: this.config.transform,
          value: this.metaballs[i].x,
          onUpdate: () => {
            this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0] = x.value
          }
        })

      gsap.fromTo(y,
        {
          value: y.value,
        },
        {
          duration: this.setMetaballDuration(i),
          delay: this.setMetaballDelay(i),
          ease: this.config.transform,
          value: this.metaballs[i].y,
          onUpdate: () => {
            this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0 - 1.0] = y.value
          }
        })
    }
  }

  /**
   * 拡散する
   */
  setDiffusion() {
    for (let i = 0; i < this.numMetaballs; i++) {
      const x = { value: this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0] }
      const y = { value: this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0 - 1.0] }

      gsap.to(x, {
        duration: this.setMetaballDuration(i),
        delay: this.setMetaballDelay(i),
        ease: this.config.transformReverse,
        value: this.metaballs[i].initX,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0] = x.value
        }
      })

      gsap.to(y, {
        duration: this.setMetaballDuration(i),
        delay: this.setMetaballDelay(i),
        ease: this.config.transformReverse,
        value: this.metaballs[i].initY,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0 - 1.0] = y.value
        }
      })
    }
  }

  /**
   * 縮小する
   */
  setShrink(){
    for (let i = 0; i < this.numMetaballs; i++) {
      const x = { value: this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0] }
      const y = { value: this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0 - 1.0] }
      const r = { value: this.mesh.material.uniforms.u_metaballsRadius.value[i] }

      gsap.to(x, {
        duration: this.setMetaballDuration(i),
        delay: this.setMetaballDelay(i),
        ease: this.config.transform,
        value: 0,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0] = x.value
        }
      })

      gsap.to(y, {
        duration: this.setMetaballDuration(i),
        delay: this.setMetaballDelay(i),
        ease: this.config.transform,
        value: 0,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsPos.value[i * 2.0 - 1.0] = y.value
        }
      })

      gsap.to(r, {
        duration: this.setMetaballDuration(i),
        delay: this.setMetaballDelay(i),
        ease: this.config.transform,
        value: 0,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsRadius.value[i] = r.value
        }
      })
    }
  }

  /**
   * particle共通のduration
   */
  setMetaballDuration(index) {
    return 0.80 + Math.abs(this.metaballs[index].rand) * 0.90
  }

  /**
   * particle共通のdelay
   */
  setMetaballDelay(index) {
    return index * 0.01
  }

  setNextPageStart() {
    for (let i = 0; i < this.numMetaballs; i++) {
      const r = {
        value: this.metaballRadius[i]
      }
      this.nextPageStartAnimation = gsap.to(r, {
        duration: this.config.halfBaseDuration,
        delay: i * 0.08,
        ease: this.config.transform,
        value: window.innerWidth / 4.0,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsRadius.value[i] = r.value
        },
      })
      this.nextPageStartAnimationArray.push(this.nextPageStartAnimation);
      // setTimeout(() => {
      //   this.mesh.material.uniforms.u_texture.value = this.imgPath[0]
      //   for (let i = 0; i < this.numMetaballs; i++) {
      //     this.mesh.material.uniforms.u_metaballsRadius.value[i] = 0
      //   }
      // }, (this.config.halfBaseDuration + (7 * 0.08)) * 1000)
    }
  }

  setNextPageEnd() {
    console.log('metaball:END発火')
    // this.speed = 0;
    for (let i = 0; i < this.numMetaballs; i++) {
      this.nextPageStartAnimationArray[i].kill();
    }
    this.mesh.material.uniforms.u_texture.value = this.imgPath[0]
    for (let i = 0; i < this.numMetaballs; i++) {
      this.mesh.material.uniforms.u_metaballsRadius.value[i] = 0
    }
    // console.log(this.mesh)
    // setTimeout(()=>{
    // console.log(this.mesh)
    // },100)
  }

  _render() {
    this.mesh.rotation.set(1.0, 0.0, 0.0);
    this.mesh.material.uniforms.u_time.value += this.speed;
  }

  onRaf() {
    this._render();
  }
}
