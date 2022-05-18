import { gsap } from 'gsap';

export default class Particle {
  constructor(config, canvas, color) {
    this.canvas = canvas || null;
    this.ctx = this.canvas.getContext('2d') || null;
    this.dpr = window.devicePixelRatio || 1.0;
    // サイト共通の設定
    this.config = config || null;
    // 生成したパーティクルを入れておく空配列
    this.particles = [];
    // パーティクルの初期値を入れておく空配列
    this.particlesInit = [];
    // パーティクルの合計数
    this.num = 7;
    // パーティクルのスピード
    this.speed = this.config.isPc ? 2.4 : 1.2;
    // パーティクルの色
    this.color = color || '#000000';

    // パーティクルの位置初期値
    this.pos = [{
        x: {
          'pc': 500,
          'sp': 160,
        },
        y: {
          'pc': 160,
          'sp': 150,
        }
      },
      {
        x: {
          'pc': 1060,
          'sp': 560,
        },
        y: {
          'pc': 220,
          'sp': 550,
        }
      },
      {
        x: {
          'pc': 110,
          'sp': 150,
        },
        y: {
          'pc': 630,
          'sp': 630,
        }
      },
      {
        x: {
          'pc': 1080,
          'sp': 200,
        },
        y: {
          'pc': 530,
          'sp': 930,
        }
      },
      {
        x: {
          'pc': 410,
          'sp': 280,
        },
        y: {
          'pc': 500,
          'sp': 780,
        }
      },
      {
        x: {
          'pc': 910,
          'sp': 630,
        },
        y: {
          'pc': 500,
          'sp': 400,
        }
      },
      {
        x: {
          'pc': 1076,
          'sp': 680,
        },
        y: {
          'pc': 684,
          'sp': 684,
        }
      },
    ]

    // パーティクルの半径初期値
    this.radius = {
      'pc': [
        130,
        158,
        100,
        74,
        60,
        60,
        46
      ],
      'tab': [
        80,
        108,
        50,
        64,
        40,
        42,
        46
      ],
      'sp': [
        55,
        27,
        50,
        37,
        22,
        26,
        20
      ]
    }

    // パーティクルの乱数初期値
    this.rand = [
      0.5,
      0.8,
      0.9,
      0.7,
      0.8,
      0.6,
      0.92,
    ]

    // パーティクル初期値をまとめる
    for (let i = 0; i < this.num; i++) {
      let x = 0;
      let y = 0;
      let r = 0;
      let color = '';
      const rand = this.rand[i];
      const clipR = 0;

      if (this.config.isPc) {
        x = this.pos[i].x.pc
        y = this.pos[i].y.pc
        r = this.radius.pc[i]
      }

      if (this.config.isTab) {
        r = this.radius.tab[i]
      }

      if (this.config.isMobile) {
        x = this.pos[i].x.sp
        y = this.pos[i].y.sp
        r = this.radius.sp[i]
      }

      if(i >= 4.0){
        color = this.color[0].dark;
      }
      else{
        color = this.color[0].light;
      }

      const particle = {
        x: x,
        y: y,
        r: r,
        clipR : clipR,
        color: color,
        rand: rand,
      }

      this.particlesInit.push(particle);
    }

    // 各シーンで動かしているGSAPを格納しておく空配列①
    this.setSceneAnimations = [];
    // 各シーンで動かしているGSAPを格納しておく空配列②
    this.setSceneReverseAnimations = [];

    // 衝突無効用のフラッグ
    this.collision = true;

    // シーンから次のページに遷移する時にパーティクルのスピードをGSAPで変更するためにオブジェクトにする必要がある
    this.pageTransitionSpeed = { value: 1.0 };
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
      const x = this.config.isPc ? (this.particlesInit[i].x / 1280) * window.innerWidth : (this.particlesInit[i].x / 750) * window.innerWidth;
      const y = this.config.isPc ? (this.particlesInit[i].y / 800) * window.innerHeight : (this.particlesInit[i].y / 1100) * window.innerHeight;
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

      // 拡大
      gsap.fromTo(this.particles[i], {
        clipR: 0,
      }, {
        duration: this.setParticleDuration(i),
        delay: this.setParticleDelay(i),
        ease: this.config.transform,
        clipR: this.particlesInit[i].r,
      })
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

      // 縮小
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
      // 縮小
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

          // 拡大
          const setSceneReverseAnimation = gsap.to(this.particles[i], {
            duration: this.setParticleDuration(i),
            delay: this.setParticleDelay(i),
            ease: this.config.transform,
            clipR: this.particlesInit[i].r,
          });
          this.setSceneReverseAnimations.push(setSceneReverseAnimation);
        }
      });

      this.setSceneAnimations.push(setSceneAnimation);
    }
  }

  /**
   * 次のページに遷移した時
   */
  setNextPageStart() {
    // 衝突無効
    this.collision = false;

    for (let i = 0; i < this.particles.length; i++) {
      // 他のアニメーションを消しておく
      if (this.setSceneAnimations[i]) this.setSceneAnimations[i].kill();
      if (this.setSceneReverseAnimations[i]) this.setSceneReverseAnimations[i].kill();

      gsap.to(this.particles[i], {
        duration: this.setParticleDuration(i, 1.6),
        delay: this.setParticleDelay(i, 1.2),
        ease: this.config.transformReverse,
        clipR: 0,
        pageTransitionSpeed: 3.8,

        onComplete: () => {
          this.particles[i].pageTransitionSpeed = 1.0;
        }
      })
    }
  }

  /**
   * 次のページに遷移を終えた時
   */
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
    const x = this.config.isPc ? (this.particlesInit[index].x / 1280) * window.innerWidth : (this.particlesInit[index].x / 750) * window.innerWidth;
    const y = this.config.isPc ? (this.particlesInit[index].y / 800) * window.innerHeight : (this.particlesInit[index].y / 1100) * window.innerHeight;
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
