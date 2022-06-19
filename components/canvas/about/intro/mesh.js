import { gsap } from 'gsap';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import vertexShader from './shaders/vertexshader.vert';
import fragmentShader from './shaders/fragmentshader.frag';
import effectVertexShader from './shaders/effect-vertexshader.vert';
import effectFragmentShader from './shaders/effect-fragmentshader.frag';

export default class Mesh {
  constructor(stage,config,texture) {
    // ステージ
    this.stage = stage;
    // サイト共通の設定
    this.config = config;
    // 画像
    this.texture = new THREE.TextureLoader().load(texture);
    // 画像の元のサイズ
    this.naturalSizes = {
      'pc' : {
        x: 2560,
        y: 3000
      },
      'sp' : {
        x: 750,
        y: 1806
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

    this.width = this.stage.renderParam.width;
    this.height = this.stage.renderParam.height;

    this.mouse = { x: 0, y: 0, };
    this.tween = { x: 0, y: 0, };
    this.diff = { x: 0, y: 0, };
  }

  init() {
    this._setMesh();
    if(this.config.isPc){
      this._setPostEffect();
    }
  }

  _setMesh() {
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        u_texture: {
          type: "t",
          value: this.texture
        },
        u_meshsize: {
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
        u_mouse: { type: "v2", value: { x: 0, y: 0 } },
        u_diffmouse: { type: "v2", value: { x: 0, y: 0 } },
        u_time: { type: 'f', value: 0.0 },
      },
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.stage.scene.add(this.mesh);
  }

  _setPostEffect() {
    this.effectUniforms = {
        tDiffuse: { value: null },
        u_diffmouse: { type: "v2", value: { x: 0, y: 0 } },
    };

    this.composer = new EffectComposer(this.stage.renderer);
    this.composer.addPass(new RenderPass(this.stage.scene, this.stage.camera));

    this.customPass = new ShaderPass({
      vertexShader: effectVertexShader,
      fragmentShader: effectFragmentShader,
      uniforms: this.effectUniforms,
    });

    this.customPass.renderToScreen = true;
    this.composer.addPass(this.customPass);
}

  _setMeshScale() {
    this.width = this.stage.renderParam.width;
    this.height = this.stage.renderParam.height;

    this.mesh.scale.x = this.width;
    this.mesh.scale.y = this.height;

    this.mesh.material.uniforms.u_meshsize.value.x = this.mesh.scale.x;
    this.mesh.material.uniforms.u_meshsize.value.y = this.mesh.scale.y;
  }

  _destroy() {
    if(this.config.isPc){
      this.composer.removePass(this.customPass);
      this.composer = null;
      this.customPass = null;
    }
    this.stage.scene.remove(this.mesh);
    this.texture.dispose();
    this.geometry.dispose();
    this.material.dispose();
  }

  onMouseMove(e) {
    this.mouse.x = ((e.clientX / window.innerWidth) * 2.0 - 1.0);
    this.mouse.y = -(e.clientY / window.innerHeight) * 2.0 + 1.0;

    gsap.to(this.mesh.material.uniforms.u_mouse.value, {
      duration: 0.4,
      ease: "power1.out",
      x: this.mouse.x,
      y: this.mouse.y,
    });

    gsap.to(this.tween, {
        duration: 0.46,
        ease: "power1.out",
        x: this.mouse.x,
        y: this.mouse.y,
    });
  }

  onResize() {
    this._setMeshScale();
  }

  _render() {
    if(this.config.isPc){
      this.diff.x = Math.abs((this.mouse.x - this.tween.x));
      this.diff.y = Math.abs((this.mouse.y - this.tween.y));
      this.mesh.material.uniforms.u_diffmouse.value.x = this.diff.x;
      this.mesh.material.uniforms.u_diffmouse.value.y = this.diff.y;
      this.customPass.uniforms.u_diffmouse.value.x = this.diff.x;
      this.customPass.uniforms.u_diffmouse.value.y = this.diff.y;
      this.composer.setSize(this.stage.renderParam.width, this.stage.renderParam.height);
      this.composer.render();
    }
  }

  onRaf() {
    this._render();
  }
}
