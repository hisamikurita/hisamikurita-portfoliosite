import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
// import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';
import * as THREE from 'three';
import vertexShader from './shaders/vertexshader02.vert';
import fragmentShader from './shaders/fragmentshader02.frag';

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
    // this.video.src ="../images/metaball.mp4";
    // this.video.crossOrigin = "anonymous";
    // this.video.muted = true;
    // this.video.setAttribute("playsinline", "playsinline");
    // this.video.loop = true;
    // this.video.play();
  }

  init() {
    this._setMesh();
    this._setPostEffect();
    // this._setMeshScale();
  }

  _setMesh() {
    const originGeometry = new THREE.CircleBufferGeometry(1.0, 64);
    const geometry = new THREE.InstancedBufferGeometry();

    const vertice = originGeometry.attributes.position.clone();
    geometry.setAttribute('position', vertice);

    const normal = originGeometry.attributes.normal.clone();
    geometry.setAttribute('normals', normal);

    const uv = originGeometry.attributes.uv.clone();
    geometry.setAttribute('uv', uv);

    const indices = originGeometry.index.clone();
    geometry.setIndex(indices);

    const all = 10;

    const offsetPos = new THREE.InstancedBufferAttribute(new Float32Array(all * 3), 3);
    const num = new THREE.InstancedBufferAttribute(new Float32Array(all * 1), 1);
    const rand = new THREE.InstancedBufferAttribute(new Float32Array(all * 1), 1);

    for (let i = 0; i < all; i++) {
      const range = 5;
      const x = Math.random() * range - range / 2;
      const y = Math.random() * range - range / 2;
      const z = 0;
      offsetPos.setXYZ(i, x, y, z);
      num.setX(i, i);
      rand.setX(i, Math.random() - 1.0);
    }

    geometry.setAttribute('offsetPos', offsetPos);
    geometry.setAttribute('num', num);
    geometry.setAttribute('rand', rand);

    const material = new THREE.RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        u_texture: {
          type: "t",
          value: new THREE.TextureLoader().load(this.pathList[0])
        },
        // u_video_texture: {
        //   type: "t",
        //   value: new THREE.VideoTexture(this.video)
        // },
        // u_resolution: {
        //   type: "v2",
        //   value: {
        //     x: this.width,
        //     y: this.height
        //   }
        // },
        // u_texturesize: {
        //   type: "v2",
        //   value: {
        //     x: this.naturalSize.x,
        //     y: this.naturalSize.y
        //   }
        // },
        u_time: {
          type: 'f',
          value: 0.0
        },
      },
      transparent: true
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.stage.scene.add(this.mesh);
    console.log(this.mesh)
  }

  _setPostEffect() {
    this.bloomPassParam = {
      strength: 3.0,
      kernelSize: 25.0,
      sigma: 20.0,
      resolution: 512,
    }

    this.composer = new EffectComposer(this.stage.renderer);
    this.composer.addPass(new RenderPass(this.stage.scene, this.stage.camera));

    this.effectBloom = new BloomPass(this.bloomPassParam.strength, this.bloomPassParam.kernelSize, this.bloomPassParam.sigma, this.bloomPassParam.resolution);
    this.composer.addPass(this.effectBloom);

    // this.filmPassParam = {
    //   noiseIntensity: 0.35,
    //   scanlineIntensity: 0.025,
    //   scanlineCount: 648,
    //   grayscale: false,
    // }

    // this.filmPass = new FilmPass(this.filmPassParam.noiseIntensity, this.filmPassParam.scanlineIntensity, this.filmPassParam.scanlineCount, this.filmPassParam.grayscale);
    // this.composer.addPass(this.filmPass);

    this.toScreen = new ShaderPass(CopyShader);
    this.toScreen.renderToScreen = true;
    this.composer.addPass(this.toScreen);
  }

  // _setMeshScale() {
  //   this.width = window.innerWidth;
  //   this.height = window.innerHeight;

  //   this.mesh.scale.x = this.width;
  //   this.mesh.scale.y = this.height;

  //   this.mesh.material.uniforms.u_resolution.value.x = this.mesh.scale.x;
  //   this.mesh.material.uniforms.u_resolution.value.y = this.mesh.scale.y;
  // }

  onResize() {
    // this._setMeshScale();
  }


  _render() {
    this.mesh.material.uniforms.u_time.value += 0.05
    this.composer.render();
  }

  onRaf() {
    this._render();
  }
}
