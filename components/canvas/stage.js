import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Stage {
  constructor(canvas) {
    this.renderParam = {
      clearColor: 0x000000,
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.cameraParam = {
      fov: 45,
      near: 0.1,
      far: 100,
      lookAt: new THREE.Vector3(0, 0, 0),
      x: 0,
      y: 0,
      z: 10
    };
    this.canvas = canvas;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.geometry = null;
    this.material = null;
    this.mesh = null;
    this.isInitialized = false;
  }

  init() {
    this._setScene();
    this._setRender();
    this._setCamera();
    this.isInitialized = true;
  }

  _setScene() {
    this.scene = new THREE.Scene();
    // this.scene.add(new THREE.GridHelper(1000, 100));
    // this.scene.add(new THREE.AxesHelper(100));
  }

  _setRender() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setClearColor(new THREE.Color(this.renderParam.clearColor));
    this.renderer.setSize(this.renderParam.width, this.renderParam.height);
    this.canvas.appendChild(this.renderer.domElement);
  }

  _setCamera() {
    if (!this.isInitialized) {
      this.camera = new THREE.PerspectiveCamera(
        0,
        0,
        this.cameraParam.near,
        this.cameraParam.far
      );

      this.camera.position.set(
        this.cameraParam.x,
        this.cameraParam.y,
        this.cameraParam.z
      );
      this.camera.lookAt(this.cameraParam.lookAt);
      // this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    this.camera.aspect = windowWidth / windowHeight;

    // ちょうどスクリーンいっぱいになる視野角を計算する
    this.camera.fov =
      THREE.MathUtils.radToDeg(
        Math.atan(
          windowWidth / this.camera.aspect / (2 * this.camera.position.z)
        )
      ) * 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(windowWidth, windowHeight);
  }

  _render() {
    this.renderer.render(this.scene, this.camera);
    // this.controls.update()
  }

  onResize() {
    this._setCamera();
  }

  onRaf() {
    this._render();
  }
}
