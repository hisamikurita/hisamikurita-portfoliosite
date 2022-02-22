import {
  gsap
} from 'gsap';
import * as THREE from 'three';
import vertexShader from './shaders/vertexshader.vert';
import fragmentShader from './shaders/fragmentshader.frag';

export default class Particle {
  constructor(config, stage, imgPath) {
    this.config = config;
    this.stage = stage;
    this.imgPath = [
      new THREE.TextureLoader().load(imgPath[0]),
      new THREE.TextureLoader().load(imgPath[1]),
      new THREE.TextureLoader().load(imgPath[2]),
    ];
    this.mesh = null;
    this.geometryParm = {
      width: 1.0,
      height: 1.0,
      widthSegments: 1.0,
      heightSegments: 1.0
    };
    this.width = window.innerWidth
    this.height = window.innerHeight;
    this.naturalSize = {
      x: 1280,
      y: 800
    };
  }

  init() {
    this._setMesh();
  }

  _setMesh() {
    const metaballsPosition = [];
    const metaballsRadius = [];

    this.numMetaballs = 7;
    this.metaball = [{
        x: -130,
        y: 200,
      },
      {
        x: -200,
        y: -60,
      },
      {
        x: 110,
        y: 160,
      },
      {
        x: 0,
        y: 0,
      },
      {
        x: 190,
        y: 0,
      },
      {
        x: -20,
        y: -240,
      },
      {
        x: 200,
        y: -90,
      },
    ]
    this.metaballRadius = [
      90,
      60,
      60,
      60,
      20,
      80,
      40,
    ]
    this.rands = [
      0.84,
      0.66,
      0.62,
      -0.43,
      0.81,
      -0.49,
      -0.67,
    ]

    for (let i = 0; i < this.numMetaballs; i++) {
      metaballsPosition.push(
        this.metaball[i].x,
        this.metaball[i].y,
      );

      metaballsRadius.push(
        0
      );
    }

    const geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);

    const material = new THREE.RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        u_texture: {
          type: "t",
          value: this.imgPath[0]
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
          value: this.rands
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

  setSceneFirst() {
    for (let i = 0; i < this.numMetaballs; i++) {
      const r = {
        value: 0
      }
      gsap.to(r, {
        duration: 0.60 + Math.random() * 0.75,
        delay: i * 0.08,
        ease: this.config.transform,
        value: this.metaballRadius[i],
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsRadius.value[i] = r.value
        }
      })
    }
  }

  setScene(sceneNumber) {
    for (let i = 0; i < this.numMetaballs; i++) {
      const r = {
        value: this.metaballRadius[i]
      }
      gsap.to(r, {
        duration: 0.60 + Math.random() * 0.75,
        delay: i * 0.08,
        ease: this.config.transform,
        value: 0,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsRadius.value[i] = r.value
        },
        onComplete: () => {
          this.mesh.material.uniforms.u_texture.value = this.imgPath[sceneNumber - 1]

          gsap.to(r, {
            duration: 0.60 + Math.random() * 0.75,
            delay: i * 0.08,
            ease: this.config.transform,
            value: this.metaballRadius[i],
            onUpdate: () => {
              this.mesh.material.uniforms.u_metaballsRadius.value[i] = r.value
            }
          })
        }
      })
    }
  }

  setSceneEnd() {
    for (let i = 0; i < this.numMetaballs; i++) {
      const r = {
        value: this.metaballRadius[i]
      }
      gsap.to(r, {
        duration: 0.60 + Math.random() * 0.75,
        delay: i * 0.08,
        ease: this.config.transform,
        value: 0,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsRadius.value[i] = r.value
        }
      })
    }
  }

  setNextPage() {
    for (let i = 0; i < this.numMetaballs; i++) {
      const r = {
        value: this.metaballRadius[i]
      }
      gsap.to(r, {
        duration: this.config.halfBaseDuration,
        delay: i * 0.08,
        ease: this.config.transform,
        value: window.innerWidth / 4.0,
        onUpdate: () => {
          this.mesh.material.uniforms.u_metaballsRadius.value[i] = r.value
        },
      })

      setTimeout(() => {
        this.mesh.material.uniforms.u_texture.value = this.imgPath[0]
        for (let i = 0; i < this.numMetaballs; i++) {
          this.mesh.material.uniforms.u_metaballsRadius.value[i] = 0
        }
      }, (this.config.halfBaseDuration + (7 * 0.08)) * 1000)
    }
  }

  _render() {
    this.mesh.material.uniforms.u_time.value += 0.036;
  }

  onRaf() {
    this._render();
  }
}
