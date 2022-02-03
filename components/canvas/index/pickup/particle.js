export default class Particle {
  constructor(canvas, color) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.dpr = window.devicePixelRatio;
    this.particles = [];
    this.num = 7;
    this.speed = 1.4;
    this.color = color;

    this.particlesInit = [{
        x: 160,
        y: 160,
        r: 140,
        color: this.color[0].dark,
      },
      {
        x: 1060,
        y: 220,
        r: 198,
        color: this.color[0].dark,
      },
      {
        x: 110,
        y: 630,
        r: 100,
        color: this.color[0].dark,
      },
      {
        x: 1080,
        y: 530,
        r: 74,
        color: this.color[0].dark,
      },
      {
        x: 410,
        y: 500,
        r: 60,
        color: this.color[0].light,
      },
      {
        x: 910,
        y: 500,
        r: 60,
        color: this.color[0].light,
      },
      {
        x: 1076,
        y: 684,
        r: 46,
        color: this.color[0].light,
      },
    ]
  }

  _update() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
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

  _drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this._update();
    this._rebound();
    this._particlesCollisionDetection();

    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.x = particle.nextx
      particle.y = particle.nexty

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.r, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = particle.color
      this.ctx.fill();
    }
  }

  _initParticles() {
    for (let i = 0; i < this.num; i++) {
      let p = null;
      const color = this.particlesInit[i].color;
      const r = this.particlesInit[i].r;
      const x = (this.particlesInit[i].x / 1280) * window.innerWidth;
      const y = (this.particlesInit[i].y / 800) * window.innerHeight;
      const s = Math.random() * this.speed;
      const angle = Math.floor(Math.random() * 360)
      const radians = angle * Math.PI / 180;
      const vx = Math.cos(radians) * this.speed;
      const vy = Math.sin(radians) * this.speed;
      p = {
        x: x,
        y: y,
        r: r,
        color: color,
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

  init() {
    this._setCanvasSize();
    this._initParticles();
  }

  onResize() {
    this._setCanvasSize();
  }

  setScene01() {
    for (let i = 0; i < 4; i++) {
      this.particles[i].color = this.color[0].dark;
    }
    for (let i = 4; i < 7; i++) {
      this.particles[i].color = this.color[0].light;
    }
  }

  setScene02() {
    for (let i = 0; i < 4; i++) {
      this.particles[i].color = this.color[1].dark;
    }
    for (let i = 4; i < 7; i++) {
      this.particles[i].color = this.color[1].light;
    }
  }

  setScene03() {
    for (let i = 0; i < 4; i++) {
      this.particles[i].color = this.color[2].dark;
    }
    for (let i = 4; i < 7; i++) {
      this.particles[i].color = this.color[2].light;
    }
  }
}
