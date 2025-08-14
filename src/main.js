import gsap from "gsap";
import * as THREE from "three";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// === GSAP hero entrance ===
gsap.from("h1", {y: 30, opacity:0, duration:0.8, ease:"power3.out"});
gsap.from("p", {y: 20, opacity:0, duration:0.6, delay:0.3});
gsap.from(".cta", {scale:0.8, opacity:0, duration:0.5, delay:0.6});

// === THREE.js placeholder animation ===
const container = document.getElementById("three-container");
const width = 400;
const height = 300;

const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, width/height, 0.1, 1000);
camera.position.z = 5;

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5,5,5);
scene.add(light);

const geometry = new THREE.IcosahedronGeometry(2, 1);
const material = new THREE.MeshStandardMaterial({color: 0x6C5CE7, wireframe: true});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate(){
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

// === Scroll animations ===
gsap.utils.toArray(".project-card").forEach(card => {
  gsap.from(card, {
    opacity:0, y:50, duration:0.6,
    scrollTrigger: {
      trigger: card,
      start: "top 80%"
    }
  });
});

gsap.from("form", {
  opacity:0, y:50, duration:0.6,
  scrollTrigger: {
    trigger: "form",
    start: "top 85%"
  }
});

// === Enhanced Cursor Particle Trail with Glow & Speed Sensitivity ===
const cursorCanvas = document.getElementById("cursor-canvas");
const cursorCtx = cursorCanvas.getContext("2d");

function resizeCanvas() {
  cursorCanvas.width = window.innerWidth;
  cursorCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
let lastMouse = { x: null, y: null };
let speed = 0;

class Particle {
  constructor(x, y, size, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.life = 100;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.96;
    this.life--;
  }
  draw() {
    cursorCtx.shadowColor = this.color;
    cursorCtx.shadowBlur = 10;
    cursorCtx.beginPath();
    cursorCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    cursorCtx.fillStyle = this.color;
    cursorCtx.fill();
    cursorCtx.shadowBlur = 0; // reset shadowBlur
  }
}

window.addEventListener("mousemove", (e) => {
  if (lastMouse.x !== null && lastMouse.y !== null) {
    const dx = e.x - lastMouse.x;
    const dy = e.y - lastMouse.y;
    speed = Math.min(Math.sqrt(dx * dx + dy * dy), 20); // cap speed
  }

  lastMouse.x = e.x;
  lastMouse.y = e.y;

  const baseSize = 2 + speed / 4;
  const baseSpeed = speed / 5;

  for (let i = 0; i < 3; i++) {
    const size = baseSize * (Math.random() * 0.6 + 0.7);
    const speedX = (Math.random() - 0.5) * baseSpeed;
    const speedY = (Math.random() - 0.5) * baseSpeed;

    // Purple hues around 260-280 degree hue range for brand color
    const hue = 260 + Math.random() * 20;
    const color = `hsl(${hue}, 80%, 70%)`;

    particles.push(new Particle(e.x, e.y, size, speedX, speedY, color));
  }
});

function animateParticles() {
  cursorCtx.fillStyle = "rgba(15, 23, 36, 0.2)"; // fade trails matching bg
  cursorCtx.fillRect(0, 0, cursorCanvas.width, cursorCanvas.height);

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.size < 0.5 || p.life <= 0) {
      particles.splice(i, 1);
    }
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();
