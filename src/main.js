// SPA Content
const pages = {
  home: `
    <section>
      <h1>Hi, I'm Amit Sharan</h1>
      <p>Flutter Developer | DevOps Learner | Blender & Rive Animator</p>
      <p>I build modern apps with animations and robust infrastructure skills. I love blending code, art, and performance.</p>
      <img src="https://via.placeholder.com/800x400" alt="Amit" style="width:100%;border-radius:10px;">
    </section>
  `,
  about: `
    <section>
      <h2>About Me</h2>
      <p>I specialize in Flutter development and am expanding my expertise in DevOps. I also have a creative side with Blender 3D and Rive animations, merging art and technology.</p>
    </section>
  `,
  projects: `
    <section>
      <h2>Projects</h2>
      <div class="project-grid">
        <div class="project-card">
          <img src="https://via.placeholder.com/300x150" alt="Project 1">
          <p>Flutter E-commerce App</p>
        </div>
        <div class="project-card">
          <img src="https://via.placeholder.com/300x150" alt="Project 2">
          <p>DevOps Deployment Pipeline</p>
        </div>
        <div class="project-card">
          <img src="https://via.placeholder.com/300x150" alt="Project 3">
          <p>Blender 3D Portfolio</p>
        </div>
      </div>
    </section>
  `,
  contact: `
    <section>
      <h2>Contact Me</h2>
      <p>Email: <a href="mailto:amitsharan@example.com">amitsharan@example.com</a></p>
      <p>LinkedIn: <a href="https://linkedin.com" target="_blank">linkedin.com/in/amitsharan</a></p>
    </section>
  `
};

// Navigation logic
const content = document.getElementById('content');
const links = document.querySelectorAll('.nav-link');

function loadPage(hash) {
  const page = hash.replace('#', '') || 'home';
  content.innerHTML = pages[page] || pages.home;
  links.forEach(link => link.classList.remove('active'));
  document.querySelector(`.nav-link[href="#${page}"]`).classList.add('active');
}

window.addEventListener('hashchange', () => loadPage(location.hash));
loadPage(location.hash);

// Cursor Particle Animation
const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.color = `hsl(${Math.random() * 60 + 200}, 100%, 50%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.95;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].size < 0.5) {
      particles.splice(i, 1);
      i--;
    }
  }
}

window.addEventListener('mousemove', e => {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(e.x, e.y));
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}
animate();
