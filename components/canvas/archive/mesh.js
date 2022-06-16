import * as THREE from 'three';
import vertexShader from './shaders/vertexshader.vert';
import fragmentShader from './shaders/fragmentshader.frag';

export default class Mesh {
  constructor(stage, elementOption, config) {
    // ステージ
    this.stage = stage;
    // サイト共通の設定
    this.config = config;

    this.elements = elementOption;
    this.meshSize = {
      x: this.elements.width,
      y: this.elements.height,
    }

    this.geometryParm = {
      width: 1.0,
      height: 1.0,
      widthSegments: 32.0,
      heightSegments: 32.0
    };
    this.mesh = null;

    this.image = null;

    this.texture = new THREE.TextureLoader().load(this.elements.img)

    this.textureSize = null;

    if(this.config.isPc){
      this.textureSize = { x: 220, y: 300 }
    }
    else{
      this.textureSize = { x: 176, y: 264 }
    }

    this.windowWidth = 0;
    this.windowHeight = 0;

    this.windowWidthHalf = 0;
    this.windowHeightHalf = 0;

    this.meshWidthHalf = 0;
    this.meshHeightHalf = 0;
  }

  init() {
    this._setWindowSize();
    this._setMesh();
    this._setMeshScale();
    this._setMeshPosition();
  }

  _setWindowSize() {
    // スクリーンサイズ
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    // スクリーンサイズの半分
    this.windowWidthHalf = this.windowWidth * 0.5;
    this.windowHeightHalf = this.windowHeight * 0.5;
  }

  _setMesh() {
    this.geometry = new THREE.PlaneBufferGeometry(
      this.geometryParm.width,
      this.geometryParm.height,
      this.geometryParm.widthSegments,
      this.geometryParm.heightSegments
    );
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
          value: this.meshSize
        },
        u_texturesize: {
          type: "v2",
          value: this.textureSize
        },
        u_resolution: {
          type: "v2",
          value: { x: window.innerWidth, y: window.innerHeight }
        },
        u_strength: {
          type: "v2",
          value: { x: 0, y: 0},
        },
        u_alpha: {
          type: "f",
          value: 0,
        }
      },
      transparent: true
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.stage.scene.add(this.mesh);
  }

  _setMeshScale() {
    this.mesh.scale.x = this.elements.width;
    this.mesh.scale.y = this.elements.height;

    this.mesh.material.uniforms.u_meshsize.value.x = this.mesh.scale.x;
    this.mesh.material.uniforms.u_meshsize.value.y = this.mesh.scale.y;

    this.meshWidthHalf = this.mesh.scale.x * 0.5;
    this.meshHeightHalf = this.mesh.scale.y * 0.5;
  }

  _setMeshPosition() {
    // ポジションを計算して、three.jsのobject3d classがもつpositionプロパティでメッシュの座標を変更する
    this.mesh.position.y = this.windowHeightHalf - this.meshHeightHalf - this.elements.top;
    this.mesh.position.x = -this.windowWidthHalf + this.meshWidthHalf + this.elements.left;
  }

  _setStrength(x,y){
    this.mesh.material.uniforms.u_strength.value.x = x
    this.mesh.material.uniforms.u_strength.value.y = y
  }

  _setRotate(rotate){
    this.mesh.rotation.z = rotate
  }

  _destroy() {
    this.stage.scene.remove(this.mesh);
    this.texture.dispose();
    this.geometry.dispose();
    this.material.dispose();
  }

  onResize() {
    this._setWindowSize();
  }

  _render() {
    if (this.mesh) {
      this._setMeshScale();
      this._setMeshPosition();
    }
  }

  onRaf() {
    this._render();
  }
}
