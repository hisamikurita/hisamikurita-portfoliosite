import { gsap } from 'gsap';
import * as THREE from 'three';
import vertexShader from './shaders/vertexshader.vert';
import fragmentShader from './shaders/fragmentshader.frag';

export default class Particle {
  constructor(stage, config) {
    this.stage = stage;
    this.config = config;
    this.mesh = null;
    this.geometryParm = {
      width: 1.0,
      height: 1.0,
      widthSegments: 1.0,
      heightSegments: 1.0
    };
    this.width = this.stage.renderParam.width;
    this.height = this.stage.renderParam.height;
    this.naturalSize = {
      x: 1280,
      y: 800
    };

    this.video = document.createElement("video");
    this.video.src = "https://videos.ctfassets.net/cj90nies7oz5/4vJihp1CBpwTSZtAWHgxmj/5094e6f42502313e1012d23addc8d352/ALL_15.07.20.mp4";
    this.video.crossOrigin = "anonymous";
    this.video.muted = true;
    this.video.setAttribute("playsinline", "playsinline");
    this.video.loop = true;
    this.video.play();

    this.texture = new THREE.VideoTexture(this.video);
  }

  init() {
    this._setMesh();
  }

  _setMesh() {
    const metaballsPosition = [];
    const metaballsRadius = [];

    this.numMetaballs = 8;
    this.metaball = [{
        x: this.config.isPc ? -130 : 30,
        y: this.config.isPc ? 160 : 290,
      },
      {
        x: -200,
        y: 100,
      },
      {
        x: 110,
        y: 120,
      },
      {
        x: 0,
        y: -40,
      },
      {
        x: 190,
        y: -40,
      },
      {
        x: this.config.isPc ? -20 : 10,
        y: this.config.isPc ? -280 : -400,
      },
      {
        x: 200,
        y: -130,
      },
      {
        x: this.config.isPc ? -300 : -190,
        y: this.config.isPc ? -130 : -150,
      },
    ]
    this.metaballRadius = [
      this.config.isPc ? 90 : 120,
      60,
      60,
      60,
      20,
      80,
      40,
      66,
    ]
    this.rands = [
      this.config.isPc ? 0.84 : 0.74,
      this.config.isPc ? 0.66 : 0.32,
      0.62,
      -0.43,
      this.config.isPc ? 0.81 : 0.52,
      -0.49,
      -0.67,
      0.57,
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
        u_ratio: {
          type: 'f',
          value: this.config.isPc ? window.innerWidth / 1280 : window.innerWidth / 750,
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
        },
      })
    }
  }

  _destroy(){
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

  _render() {
    this.mesh.material.uniforms.u_time.value += 0.036;
  }

  onRaf() {
    this._render();
  }
}
