import * as THREE from 'three';
// import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';
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
    // this.video.src ="../images/metaball.mp4";
    // this.video.crossOrigin = "anonymous";
    // this.video.muted = true;
    // this.video.setAttribute("playsinline", "playsinline");
    // this.video.loop = true;
    // this.video.play();
  }

  init() {
    this._setMesh();
    this._setMeshScale();
  }

  _setMesh() {
    const numMetaballs = 30;
    const metaballs = [];

    for (let i = 0; i < numMetaballs; i++) {
      const radius = Math.random() * 60 + 10;

      metaballs.push(
        (window.innerWidth / 2) + (Math.random() - 0.5) * 500,
        (window.innerHeight / 2) + (Math.random() - 0.5) * 500,
        radius * 0.75
      );
    }

    const geometry = new THREE.BufferGeometry();

    // console.log(BufferGeometryUtils)

    // const geometry = BufferGeometryUtils.toTrianglesDrawMode({geometry:geo,drawMode : THREE.TriangleStripDrawMode});
    // console.log(geometry)
    // mesh.setDrawMode( THREE.TriangleStripDrawMode );

    const vertices = new Float32Array([
      -1.0,  1.0,  0.0,
      1.0,  1.0,  0.0,
     -1.0, -1.0,  0.0,
      1.0, -1.0,  0.0
    ]);
    const uv = new Float32Array([
      0.0, 0.0,
      1.0, 0.0,
      0.0, 1.0,
      1.0, 1.0
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));

    const material = new THREE.RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        u_texture: {
          type: "t",
          value: new THREE.TextureLoader().load(this.pathList[0])
        },
        u_metaballs: {
          type: "v3v",
          value: metaballs,
        },
        // u_video_texture: {
        // 	type: "t",
        // 	value: new THREE.VideoTexture(this.video)
        // },
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
    // geometry.toTrianglesDrawMode()
    this.mesh = new THREE.Mesh(geometry, material);
    this.stage.scene.add(this.mesh);

    // console.log(this.mesh)
  }

  _setMeshScale() {
    // this.width = window.innerWidth;
    // this.height = window.innerHeight;

    // this.mesh.scale.x = this.width;
    // this.mesh.scale.y = this.height;

    // this.mesh.material.uniforms.u_resolution.value.x = this.mesh.scale.x;
    // this.mesh.material.uniforms.u_resolution.value.y = this.mesh.scale.y;
  }

  onResize() {
    this.mesh.material.uniforms.u_resolution.value.x = window.innerWidth;
    this.mesh.material.uniforms.u_resolution.value.y = window.innerHeight;
    this._setMeshScale();
  }


  _render() {
    //
  }

  onRaf() {
    this._render();
  }
}
