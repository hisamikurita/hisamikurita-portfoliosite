import { gsap } from 'gsap';

export default class Particle {
  constructor(config, canvas) {
    this.config = config;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.dpr = window.devicePixelRatio;
    this.particles = [];
    this.num = 8;
    this.speed = 1.4;

    this.radiusPc = [
      140,
      198,
      100,
      40,
      60,
      60,
      74,
      46
    ]

    this.radiusSp = [
      65,
      37,
      60,
      47,
      18,
      24,
      24,
      20
    ]

    this.particlesInit = [{
        x: this.config.isPc ? 160 : 500,
        y: this.config.isPc ? 160 : 150,
        r: this.config.isPc ? this.radiusPc[0] : this.radiusSp[0],
        clipR: 0,
      },
      {
        x: this.config.isPc ? 1060 : 560,
        y: this.config.isPc ? 220 : 550,
        r: this.config.isPc ? this.radiusPc[1] : this.radiusSp[1],
        clipR: 0,
      },
      {
        x: this.config.isPc ? 110 : 150,
        y: this.config.isPc ? 630 : 630,
        r: this.config.isPc ? this.radiusPc[2] : this.radiusSp[2],
        clipR: 0,
      },
      {
        x: this.config.isPc ? 280 : 200,
        y: this.config.isPc ? 560 : 930,
        r: this.config.isPc ? this.radiusPc[3] : this.radiusSp[3],
        clipR: 0,
      },
      {
        x: this.config.isPc ? 410 : 280,
        y: this.config.isPc ? 500 : 780,
        r: this.config.isPc ? this.radiusPc[4] : this.radiusSp[4],
        clipR: 0,
      },
      {
        x: this.config.isPc ? 910 : 630,
        y: this.config.isPc ? 500 : 400,
        r: this.config.isPc ? this.radiusPc[5] : this.radiusSp[5],
        clipR: 0,
      },
      {
        x: this.config.isPc ? 1080 : 680,
        y: this.config.isPc ? 530 : 684,
        r: this.config.isPc ? this.radiusPc[6] : this.radiusSp[6],
        clipR: 0,
      },
      {
        x: this.config.isPc ? 1076 : 320,
        y: this.config.isPc ? 684 : 384,
        r: this.config.isPc ? this.radiusPc[7] : this.radiusSp[7],
        clipR: 0,
      },
    ]
  }

  _update(currentPos, tweenPosition) {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      const tween = Math.abs((currentPos - tweenPosition) * 0.00002);
      particle.vx += -tween
      particle.nextx = (particle.x + particle.vx)
      particle.nexty = (particle.y + particle.vy)
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

  _drawParticles(currentPos, tweenPosition) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this._update(currentPos, tweenPosition);
    this._rebound();
    this._particlesCollisionDetection();

    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.x = particle.nextx
      particle.y = particle.nexty

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.clipR, 0, 2 * Math.PI, false);
      this.ctx.clip();
      this.ctx.arc(particle.x, particle.y, particle.r, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = '#ffffff'
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  _initParticles() {
    for (let i = 0; i < this.num; i++) {
      let p = null;
      const clipR = this.particlesInit[i].clipR;
      const r = this.particlesInit[i].r;
      const x = this.config.isPc ? (this.particlesInit[i].x / 1280) * window.innerWidth : (this.particlesInit[i].x / 750) * window.innerWidth;
      const y = this.config.isPc ? (this.particlesInit[i].y / 800) * window.innerHeight : (this.particlesInit[i].y / 1100) * window.innerHeight;
      const s = Math.random() * this.speed;
      const angle = Math.floor(Math.random() * 360)
      const radians = angle * Math.PI / 180;
      const vx = Math.cos(radians) * this.speed;
      const vy = Math.sin(radians) * this.speed;
      p = {
        x: x,
        y: y,
        r: r,
        clipR: clipR,
        s: s,
        angle: angle,
        radians: radians,
        vx: vx,
        vy: vy,
        mass: r,
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

  _fadeIn(){
    for (let i = 0; i < this.particles.length; i++) {
      gsap.to(this.particles[i], {
        duration: this.config.baseDuration,
        delay: i * 0.08,
        ease: this.config.transform,
        clipR: this.config.isPc ? this.radiusPc[i] : this.radiusSp[i],
      })
    }
  }

  init() {
    this._setCanvasSize();
    this._initParticles();
  }

  onResize() {
    this._setCanvasSize();
  }
}
