import {
  gsap
} from 'gsap';

export default class Particle {
  constructor(config, canvas, color) {
    this.config = config;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.dpr = window.devicePixelRatio;
    this.particles = [];
    // パーティクルの数
    this.num = 7;
    // パーティクルのスピード
    this.speed = window.innerWidth > 767 ? 2.4 : 1.2;
    // パーティクルの色
    this.color = color;
    this.clear = false;

    // 半径初期値
    this.radiusPc = [
      130,
      158,
      100,
      74,
      60,
      60,
      46
    ]
    this.radiusSp = [
      65,
      37,
      60,
      47,
      18,
      24,
      20
    ]

    // 初期値
    this.particlesInit = [{
        x: window.innerWidth > 767 ? 160 : 500,
        y: window.innerWidth > 767 ? 160 : 150,
        r: window.innerWidth > 767 ? this.radiusPc[0] : this.radiusSp[0],
        clipR: 0,
        color: this.color[0].dark,
        rand: 0.5,
      },
      {
        x: window.innerWidth > 767 ? 1060 : 560,
        y: window.innerWidth > 767 ? 220 : 550,
        r: window.innerWidth > 767 ? this.radiusPc[1] : this.radiusSp[1],
        clipR: 0,
        color: this.color[0].dark,
        rand: 0.8,
      },
      {
        x: window.innerWidth > 767 ? 110 : 150,
        y: window.innerWidth > 767 ? 630 : 630,
        r: window.innerWidth > 767 ? this.radiusPc[2] : this.radiusSp[2],
        clipR: 0,
        color: this.color[0].dark,
        rand: 0.9,
      },
      {
        x: window.innerWidth > 767 ? 1080 : 200,
        y: window.innerWidth > 767 ? 530 : 930,
        r: window.innerWidth > 767 ? this.radiusPc[3] : this.radiusSp[3],
        clipR: 0,
        color: this.color[0].dark,
        rand: 0.7,
      },
      {
        x: window.innerWidth > 767 ? 410 : 280,
        y: window.innerWidth > 767 ? 500 : 780,
        r: window.innerWidth > 767 ? this.radiusPc[4] : this.radiusSp[4],
        clipR: 0,
        color: this.color[0].light,
        rand: 0.8,
      },
      {
        x: window.innerWidth > 767 ? 910 : 630,
        y: window.innerWidth > 767 ? 500 : 400,
        r: window.innerWidth > 767 ? this.radiusPc[5] : this.radiusSp[5],
        clipR: 0,
        color: this.color[0].light,
        rand: 0.6,
      },
      {
        x: window.innerWidth > 767 ? 1076 : 680,
        y: window.innerWidth > 767 ? 684 : 684,
        r: window.innerWidth > 767 ? this.radiusPc[6] : this.radiusSp[6],
        clipR: 0,
        color: this.color[0].light,
        rand: 0.92,
      },
    ]

    this.setSceneAnimations = [];
    this.setSceneReverseAnimations = [];
    this.collision = true;
    this.pageTransitionSpeed = {
      value: 1.0
    };
  }

  _update() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.nextx = (particle.x + (particle.vx * particle.pageTransitionSpeed))
      particle.nexty = (particle.y + (particle.vy * particle.pageTransitionSpeed))
    }
  }

  _rebound() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];

      if (particle.nextx + particle.r > this.canvas.width) {
        particle.vx *= -1;
        particle.nextx = this.canvas.width - particle.r;
      } else if (particle.nextx - particle.r < 0) {
        particle.vx *= -1;
        particle.nextx = particle.r;
      } else if (particle.nexty + particle.r > this.canvas.height) {
        particle.vy *= -1;
        particle.nexty = this.canvas.height - particle.r;
      } else if (particle.nexty - particle.r < 0) {
        particle.vy *= -1;
        particle.nexty = particle.r;
      }
    }
  }

  _hitParticles(particle1, particle2) {
    let hit = false;
    const dx = particle1.nextx - particle2.nextx;
    const dy = particle1.nexty - particle2.nexty;
    const distance = (dx * dx) + (dy * dy);

    if (distance <= (particle1.r + particle2.r) * (particle1.r + particle2.r)) {
      hit = true;
    }

    return hit
  }

  _particlesCollisionDetection() {
    let particle1 = null;
    let particle2 = null;

    for (let i = 0; i < this.particles.length; i++) {
      particle1 = this.particles[i];

      for (let j = i + 1; j < this.particles.length; j++) {
        particle2 = this.particles[j]
        if (this._hitParticles(particle1, particle2)) {
          const dx = particle1.nextx - particle2.nextx
          const dy = particle1.nexty - particle2.nexty
          const collisionAngle = Math.atan2(dy, dx);
          const speed1 = Math.sqrt(particle1.vx * particle1.vx + particle1.vy * particle1.vy)
          const speed2 = Math.sqrt(particle2.vx * particle2.vx + particle2.vy * particle2.vy)
          const direction1 = Math.atan2(particle1.vy, particle1.vx)
          const direction2 = Math.atan2(particle2.vy, particle2.vx)
          const vx1 = speed1 * Math.cos(direction1 - collisionAngle);
          const vy1 = speed1 * Math.sin(direction1 - collisionAngle);
          const vx2 = speed2 * Math.cos(direction2 - collisionAngle);
          const vy2 = speed2 * Math.sin(direction2 - collisionAngle);
          const svx1 = ((particle1.mass - particle2.mass) * vx1 + (particle2.mass + particle2.mass) * vx2) / (particle1.mass + particle2.mass);
          const svx2 = ((particle1.mass + particle1.mass) * vx1 + (particle2.mass - particle1.mass) * vx2) / (particle1.mass + particle2.mass);
          const svy1 = vy1;
          const svy2 = vy2;
          particle1.vx = Math.cos(collisionAngle) * svx1 + Math.cos(collisionAngle + Math.PI / 2) * svy1;
          particle1.vy = Math.sin(collisionAngle) * svx1 + Math.sin(collisionAngle + Math.PI / 2) * svy1;
          particle2.vx = Math.cos(collisionAngle) * svx2 + Math.cos(collisionAngle + Math.PI / 2) * svy2;
          particle2.vy = Math.sin(collisionAngle) * svx2 + Math.sin(collisionAngle + Math.PI / 2) * svy2;
          particle1.nextx = (particle1.nextx += particle1.vx)
          particle1.nexty = (particle1.nexty += particle1.vy)
          particle2.nextx = (particle2.nextx += particle2.vx)
          particle2.nexty = (particle2.nexty += particle2.vy)
        }
      }
    }
  }

  _drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this._update();
    if (this.collision) this._rebound();
    if (this.collision) this._particlesCollisionDetection();

    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.x = particle.nextx
      particle.y = particle.nexty

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.clipR, 0, 2 * Math.PI, false);
      this.ctx.clip();
      this.ctx.arc(particle.x, particle.y, particle.clipR, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  _initParticles() {
    for (let i = 0; i < this.num; i++) {
      let p = null;
      const color = this.particlesInit[i].color;
      const clipR = this.particlesInit[i].clipR;
      const r = this.particlesInit[i].r;
      const x = window.innerWidth > 767 ? (this.particlesInit[i].x / 1280) * window.innerWidth : (this.particlesInit[i].x / 750) * window.innerWidth;
      const y = window.innerWidth > 767 ? (this.particlesInit[i].y / 800) * window.innerHeight : (this.particlesInit[i].y / 1100) * window.innerHeight;
      const s = Math.random() * this.speed;
      const angle = Math.floor(Math.random() * 360)
      const radians = angle * Math.PI / 180;
      const vx = Math.cos(radians) * this.speed;
      const vy = Math.sin(radians) * this.speed;
      const rand = this.particlesInit[i].rand;
      const pageTransitionSpeed = 1.0;

      p = {
        x: x,
        y: y,
        r: r,
        color: color,
        clipR: clipR,
        s: s,
        angle: angle,
        radians: radians,
        vx: vx,
        vy: vy,
        mass: r,
        rand: rand,
        pageTransitionSpeed: pageTransitionSpeed,
      }
      this.particles.push(p);
    }
  }

  _setCanvasSize() {
    const width = window.innerWidth
    const height = window.innerHeight
    this.canvas.width = width
    this.canvas.height = height
    this.ctx.save()
    this.ctx.scale(this.dpr, this.dpr)
    this.ctx.restore()
    this.canvas.style.width = width + 'px'
    this.canvas.style.height = height + 'px'
  }

  init() {
    this._setCanvasSize();
    this._initParticles();
  }

  onResize() {
    this._setCanvasSize();
  }

  /**
   * pickup初めのシーンのメソッド
   */
  setSceneFirst(sceneNumber) {
    // 衝突再度有効
    this.collision = true;

    for (let i = 0; i < this.particles.length; i++) {
      // 他のアニメーションを消しておく
      if (this.setSceneAnimations[i]) this.setSceneAnimations[i].kill();
      if (this.setSceneReverseAnimations[i]) this.setSceneReverseAnimations[i].kill();

      // パーティクルの位置をリセット
      this.setParticleResetPosition(i);

      // パーティクルの色を定義
      this.setParticleColor(i, sceneNumber);

      gsap.fromTo(this.particles[i],
        {
          clipR: 0,
        },
        {
        duration: this.setParticleDuration(i),
        delay: this.setParticleDelay(i),
        ease: this.config.transform,
        clipR: window.innerWidth > 767 ? this.radiusPc[i] : this.radiusSp[i]
      })
    }
    for (let i = 0; i < this.particles.length; i++) {
      console.log(this.particles[i])
    }
  }

  /**
   * pickup終わりのシーンのメソッド
   */
  setSceneEnd(sceneNumber) {
    // 衝突再度有効
    this.collision = true;

    for (let i = 0; i < this.particles.length; i++) {
      // 他のアニメーションを消しておく
      if (this.setSceneAnimations[i]) this.setSceneAnimations[i].kill();
      if (this.setSceneReverseAnimations[i]) this.setSceneReverseAnimations[i].kill();

      // パーティクルの色を定義
      this.setParticleColor(i, sceneNumber);

      gsap.to(this.particles[i], {
        duration: this.setParticleDuration(i),
        delay: this.setParticleDelay(i),
        ease: this.config.transform,
        clipR: 0,
      });
    }
  }

  /**
   * pickup中間シーンのメソッド
   */
  setScene(sceneNumber) {
    // 衝突無効
    this.collision = false;

    for (let i = 0; i < this.particles.length; i++) {
      // 他のアニメーションを消しておく
      if (this.setSceneAnimations[i]) this.setSceneAnimations[i].kill();
      if (this.setSceneReverseAnimations[i]) this.setSceneReverseAnimations[i].kill();
    }
    // アニメーションを入れておく配列を再度定義
    this.setSceneAnimations = [];
    this.setSceneReverseAnimations = [];

    for (let i = 0; i < this.particles.length; i++) {
      const setSceneAnimation = gsap.to(this.particles[i], {
        duration: this.setParticleDuration(i),
        delay: this.setParticleDelay(i),
        ease: this.config.transformReverse,
        clipR: 0,

        onComplete: () => {
          // 衝突再度有効
          this.collision = true;

          // パーティクルの位置をリセット
          this.setParticleResetPosition(i);

          // パーティクルの色を定義
          this.setParticleColor(i, sceneNumber);

          const setSceneReverseAnimation = gsap.to(this.particles[i], {
            duration: this.setParticleDuration(i),
            delay: this.setParticleDelay(i),
            ease: this.config.transform,
            clipR: window.innerWidth > 767 ? this.radiusPc[i] : this.radiusSp[i]
          });
          this.setSceneReverseAnimations.push(setSceneReverseAnimation);
        }
      });

      this.setSceneAnimations.push(setSceneAnimation);
    }
  }

  setNextPageStart() {
    // 衝突無効
    this.collision = false;

    for (let i = 0; i < this.particles.length; i++) {
      // 他のアニメーションを消しておく
      if (this.setSceneAnimations[i]) this.setSceneAnimations[i].kill();
      if (this.setSceneReverseAnimations[i]) this.setSceneReverseAnimations[i].kill();

      gsap.to(this.particles[i], {
        duration: this.setParticleDuration(i, 1.8),
        delay: this.setParticleDelay(i, 1.4),
        ease: this.config.transformReverse,
        clipR: 0,
        pageTransitionSpeed: 3.8,

        onComplete: () => {
          this.particles[i].pageTransitionSpeed = 1.0;
        }
      })
    }
  }

  setNextPageEnd() {
    //
  }

  /**
   * particle共通のduration
   */
  setParticleDuration(index, ratio = 1.0) {
    return (0.50 * ratio) + this.particles[index].rand * (0.40 * ratio)
  }

  /**
   * particle共通のdelay
   */
  setParticleDelay(index, ratio = 1.0) {
    return index * (0.06 * ratio)
  }

  /**
   * particleの位置をリセット
   */
  setParticleResetPosition(index) {
    const x = window.innerWidth > 767 ? (this.particlesInit[index].x / 1280) * window.innerWidth : (this.particlesInit[index].x / 750) * window.innerWidth;
    const y = window.innerWidth > 767 ? (this.particlesInit[index].y / 800) * window.innerHeight : (this.particlesInit[index].y / 1100) * window.innerHeight;
    const angle = Math.floor(Math.random() * 360)
    const radians = angle * Math.PI / 180;
    const vx = Math.cos(radians) * this.speed;
    const vy = Math.sin(radians) * this.speed;
    this.particles[index].x = x;
    this.particles[index].y = y;
    this.particles[index].vx = vx;
    this.particles[index].vy = vy;
  }

  /**
   * particleの色を変える
   */
  setParticleColor(index, sceneNumber) {
    if (index < 4) {
      this.particles[index].color = this.color[sceneNumber - 1].dark;
    } else {
      this.particles[index].color = this.color[sceneNumber - 1].light;
    }
  }

  /**
   * delete Canvasをクリアする
   */
  delete() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].clipR = 0;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
