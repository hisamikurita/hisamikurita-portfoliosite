import * as THREE from 'three';

export default class Stage {
  constructor(canvas, wrapper = null) {
    this.wrapper = wrapper;
    this.renderParam = {
      width: !this.wrapper ? window.innerWidth : this.wrapper.clientWidth,
      height: !this.wrapper ? window.innerHeight : this.wrapper.clientHeight,
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
    this.devicePixelRatio = window.devicePixelRatio;
  }

  init() {
    this._setScene();
    this._setRender();
    this._setCamera();
    this.isInitialized = true;
  }

  _setScene() {
    this.scene = new THREE.Scene();
  }

  _setRender() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(this.devicePixelRatio);
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
    }

    this.renderParam.width = !this.wrapper ? window.innerWidth : this.wrapper.clientWidth;
    this.renderParam.height = !this.wrapper ? window.innerHeight : this.wrapper.clientHeight;
    this.camera.aspect = this.renderParam.width / this.renderParam.height;
    this.camera.fov =
    THREE.MathUtils.radToDeg(
      Math.atan(this.renderParam.width / this.camera.aspect / (2 * this.camera.position.z))
    ) * 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.renderParam.width, this.renderParam.height);
  }

  _destroy(){
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement = null;
  }

  _render() {
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this._setCamera();
  }

  onRaf() {
    this._render();
  }
}
