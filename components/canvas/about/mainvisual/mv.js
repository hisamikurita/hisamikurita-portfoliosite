// import { gsap } from 'gsap';
import * as THREE from 'three';
import vertexShader from './shaders/vertexshader.vert';
import fragmentShader from './shaders/fragmentshader.frag';

export default class Particle {
  constructor(stage) {
    this.stage = stage;
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
    this.pathList = [
      "../images/codepen-01.jpg",
      "../images/metaball.mp4"
    ];

    // texture
    // this.video = document.createElement("video");
    // this.video.src = "../images/metaball.mp4";
    // this.video.crossOrigin = "anonymous";
    // this.video.muted = true;
    // this.video.setAttribute("playsinline", "playsinline");
    // this.video.loop = true;
    // this.video.play();

    const w = window.innerWidth;
    const h = window.innerHeight;

    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    const c2 = document.createElement('canvas');
    const ctx2 = c2.getContext('2d');

    c.width = c2.width = w;
    c.height = c2.height = h;

    const THRESHOLD = 100;

    const makeCircle = () => {
      for (let i = 0; i < 5; i++) {
        const range = 700;
        const circle = {
          size: (50 * Math.random()) + 100,
          x:  (Math.random() * range - range / 2) + (w / 2),
          y: (Math.random() * range - range / 2) + (h / 2),
        };

        ctx2.beginPath();
        const gradient = ctx2.createRadialGradient(
          circle.x,
          circle.y,
          1,
          circle.x,
          circle.y,
          circle.size
        );
  
        gradient.addColorStop(0, `rgba(255, 255, 255, 1)`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx2.fillStyle = gradient;
        ctx2.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
        ctx2.fill();
      }
    }

    let count = 0;

    this.tick = () => {
      count++;
      if(count % 2 ===0) return

      console.log('発火')

      ctx2.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx2.fillRect(0, 0, w, h);
      makeCircle();

      const imageData = ctx2.getImageData(0, 0, w, h);
      const pixel = imageData.data;

      for (let i = 3; i < pixel.length; i += 4) {
        if (pixel[i] < THRESHOLD) {
          pixel[i] = 0;
        }
      }

      ctx.putImageData(imageData, 1, 1)
      // requestAnimationFrame(tick)
      //   console.log(pixel[1 + 70])
    }

    // gsap.ticker.add(this.tick)

  
    this.texture = new THREE.CanvasTexture(c);
    console.log(this.texture)
  }

  init() {
    this._setMesh();
    this._setMeshScale();
  }

  // _canvasTexture() {
  //   // const random = (min, max) => Math.random() * (max - min) + min;

 
  // }

  _setMesh() {
  

    const geometry = new THREE.PlaneBufferGeometry(
      this.geometryParm.width,
      this.geometryParm.height,
      this.geometryParm.widthSegments,
      this.geometryParm.heightSegments
    );

    const material = new THREE.RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        u_texture: {
          type: "t",
          value: new THREE.TextureLoader().load(this.pathList[0])
        },
        u_video_texture: {
          type: "t",
          value: this.texture
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

  _setMeshScale() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.mesh.scale.x = this.width;
    this.mesh.scale.y = this.height;

    this.mesh.material.uniforms.u_resolution.value.x = this.mesh.scale.x;
    this.mesh.material.uniforms.u_resolution.value.y = this.mesh.scale.y;
  }

  onResize() {
    this._setMeshScale();
  }


  _render() {
    this.mesh.material.uniforms.u_video_texture.needsUpdate = true;
    // if(this.mesh) this.tick();
    this.tick();
  }

  onRaf() {
    this._render();
  }
}
