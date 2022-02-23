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
    this.video.src ="https://videos.ctfassets.net/cj90nies7oz5/4vJihp1CBpwTSZtAWHgxmj/5094e6f42502313e1012d23addc8d352/ALL_15.07.20.mp4";
    this.video.crossOrigin = "anonymous";
    this.video.muted = true;
    this.video.setAttribute("playsinline", "playsinline");
    this.video.loop = true;
    this.video.play();

  }

  init() {
    this._setMesh();
  }

  _setMesh() {
    const metaballsPosition = [];
    const metaballsRadius = [];

    this.numMetaballs = 8;
    this.metaball = [{
        x: -130,
        y: 150,
      },
      {
        x: -200,
        y: 90,
      },
      {
        x: 110,
        y: 110,
      },
      {
        x: 0,
        y: -50,
      },
      {
        x: 190,
        y: -50,
      },
      {
        x: -20,
        y: -290,
      },
      {
        x: 200,
        y: -140,
      },
      {
        x: -300,
        y: -140,
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
      66,
    ]
    this.rands = [
      0.84,
      0.66,
      0.62,
      -0.43,
      0.81,
      -0.49,
      -0.67,
      -0.57,
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

    const geometry = new THREE.PlaneBufferGeometry(2, 2, 1,1);

    const material = new THREE.RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        u_texture: {
          type: "t",
					value: new THREE.VideoTexture(this.video)
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

  onResize() {
    this.width = this.stage.renderParam.width;
    this.height = this.stage.renderParam.height;

    this.mesh.material.uniforms.u_resolution.value.x =this.width;
    this.mesh.material.uniforms.u_resolution.value.y = this.height;
  }

  _render() {
    this.mesh.material.uniforms.u_time.value += 0.036;
  }

  onRaf() {
    this._render();
  }
}
