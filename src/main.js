/* =========================
   UTIL: Theme (persisted)
   ========================= */
const THEME_KEY = "amit-theme";
const root = document.documentElement;
const saved = localStorage.getItem(THEME_KEY);
if (saved) root.setAttribute("data-theme", saved);
document.getElementById("year").textContent = new Date().getFullYear();

const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", current);
  localStorage.setItem(THEME_KEY, current);
});

/* =========================
   SPA PAGES (Rich Content)
   ========================= */
const pages = {
  home: `
    <section class="hero">
      <div>
        <span class="kicker"><span class="dot"></span> Flutter • DevOps • Animation</span>
        <h1>Building polished apps with <br/> motion & infrastructure discipline.</h1>
        <p class="sub">
          I'm <strong>Amit Sharan</strong> — a Flutter developer and DevOps learner who also crafts visuals
          with Blender and Rive. I mix performance, reliability, and delightful micro-interactions.
        </p>
        <div class="cta-row">
          <a class="btn primary" href="#projects">View Projects</a>
          <a class="btn" href="#about">About Me</a>
        </div>
        <div class="badges">
          <span class="badge">Flutter</span>
          <span class="badge">Dart</span>
          <span class="badge">CI/CD</span>
          <span class="badge">AWS</span>
          <span class="badge">Blender</span>
          <span class="badge">Rive</span>
        </div>
      </div>
      <div class="portrait">
        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" alt="Amit portrait">
      </div>
    </section>

    <section style="margin-top:2rem" class="grid-2">
      <div class="card">
        <h3>What I do</h3>
        <ul class="list">
          <li>Design & build Flutter apps with smooth animations.</li>
          <li>Set up CI/CD and cloud deploys (GitHub Actions, AWS, Firebase).</li>
          <li>Prototype visuals in Blender and interactive motion in Rive.</li>
        </ul>
      </div>
      <div class="card">
        <h3>Currently learning</h3>
        <ul class="list">
          <li>DevOps pipelines, containers, IaC.</li>
          <li>Advanced shader tricks for Flutter and WebGL.</li>
          <li>3D-to-UI storytelling (Rive + Blender combos).</li>
        </ul>
      </div>
    </section>
  `,
  about: `
    <section class="grid-2">
      <div>
        <h2>About Me</h2>
        <p class="sub">
          I’m a developer who believes great apps feel alive. My workflow balances
          <em>user experience</em> (animation, feedback, rhythm) with <em>engineering discipline</em>
          (testing, automation, observability).
        </p>
        <div class="badges">
          <span class="badge">Flutter</span><span class="badge">Dart</span><span class="badge">Riverpod</span>
          <span class="badge">REST</span><span class="badge">WebSockets</span><span class="badge">Firebase</span>
          <span class="badge">AWS</span><span class="badge">Docker</span>
        </div>
      </div>
      <div class="card">
        <img src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop" alt="Workspace">
      </div>
    </section>

    <section class="card" style="margin-top:1.5rem">
      <h3>Experience Timeline</h3>
      <div class="timeline">
        <div class="ti"><strong>2025 — Present:</strong> Building portfolio, polishing animations & CI.</div>
        <div class="ti"><strong>2024:</strong> Explored DevOps pipelines (GH Actions, AWS Amplify, ECS basics).</div>
        <div class="ti"><strong>2023:</strong> Shipped Flutter mini-apps and Rive micro-interactions.</div>
        <div class="ti"><strong>2022:</strong> Blender animation experiments for app intros.</div>
      </div>
    </section>
  `,
  projects: `
    <section>
      <h2>Featured Projects</h2>
      <div class="projects-grid" style="margin-top:.8rem">
        ${projectCard(
          "E-commerce App",
          "Cross-platform shop with secure payments and caching.",
          "Flutter, Riverpod, Stripe",
          "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop"
        )}
        ${projectCard(
          "CI/CD Pipeline",
          "Automated build & deploy with GitHub Actions → AWS.",
          "Actions, Docker, ECS",
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop"
        )}
        ${projectCard(
          "3D Portfolio",
          "Interactive 3D hero with shader-driven motion.",
          "Three.js, GLSL",
          "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop"
        )}
        ${projectCard(
          "Chat App",
          "Realtime messaging with presence & reactions.",
          "Flutter, WebSockets, Firebase",
          "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1200&auto=format&fit=crop"
        )}
        ${projectCard(
          "Analytics Dashboard",
          "KPIs with charts and role-based access.",
          "Flutter Web, REST",
          "https://images.unsplash.com/photo-1551281044-8d8d0d8d3a56?q=80&w=1200&auto=format&fit=crop"
        )}
        ${projectCard(
          "Rive Micro-UX",
          "Tiny delight animations for onboarding & states.",
          "Rive, Flutter",
          "https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=1200&auto=format&fit=crop"
        )}
      </div>
    </section>
  `,
  contact: `
    <section class="grid-2">
      <div>
        <h2>Contact</h2>
        <p class="sub">Let’s collaborate. Whether it’s a Flutter app, pipeline, or animation — I’m in.</p>
        <div class="socials">
          <a class="btn" href="mailto:sharanamit02@gmail.com">📧 Email</a>
          <a class="btn" href="https://www.linkedin.com/in/amit-sharan-51b81b163/" target="_blank" rel="noreferrer">💼 LinkedIn</a>
          <a class="btn" href="https://github.com/sharanAmit" target="_blank" rel="noreferrer">🐙 GitHub</a>
        </div>
      </div>
      <form class="card form" onsubmit="event.preventDefault(); alert('Thanks! This demo form is not wired to a backend yet.');">
        <input class="input" type="text" name="name" placeholder="Your name" required />
        <input class="input" type="email" name="email" placeholder="Your email" required />
        <textarea class="input" name="message" rows="5" placeholder="Your message..." required></textarea>
        <button class="btn primary" type="submit">Send Message</button>
      </form>
    </section>
  `
};

// helper to render a project card
function projectCard(title, desc, stack, img) {
  return `
    <article class="project">
      <img src="${img}" alt="${title}">
      <div class="px">
        <h3>${title}</h3>
        <p class="sub" style="margin:.35rem 0 .6rem">${desc}</p>
        <div class="tags">
          ${stack.split(",").map(s => `<span class="tag">${s.trim()}</span>`).join("")}
        </div>
      </div>
    </article>
  `;
}

/* =========================
   SPA ROUTER + TRANSITIONS
   ========================= */
const contentEl = document.getElementById("content");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));

function setActive(h) {
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === h));
}

function loadPage(hash) {
  const page = (hash || "#home").replace("#", "");
  // fade out old
  contentEl.classList.remove("fade-in");
  contentEl.classList.add("fade-out");
  setTimeout(() => {
    contentEl.innerHTML = pages[page] || pages.home;
    contentEl.scrollTop = 0;
    // fade in new
    contentEl.classList.remove("fade-out");
    contentEl.classList.add("fade-in");
    setActive(`#${page}`);
  }, 150);
}

window.addEventListener("hashchange", () => loadPage(location.hash));
loadPage(location.hash || "#home");

navLinks.forEach(a => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const href = a.getAttribute("href");
    history.pushState(null, "", href);
    loadPage(href);
  });
});

/* =========================
   CURSOR PARTICLE TRAIL
   (glow + speed-sensitive)
   ========================= */
const canvas = document.getElementById("cursor-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let last = { x: null, y: null };

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

class Particle {
  constructor(x, y, speed) {
    const base = Math.min(speed / 5 + 2, 8);
    this.x = x; this.y = y;
    this.vx = (Math.random() - 0.5) * (speed / 6 + 1.2);
    this.vy = (Math.random() - 0.5) * (speed / 6 + 1.2);
    this.size = base * (0.6 + Math.random() * 0.8);
    const hue = 260 + Math.random() * 40; // purple-blue band
    this.color = `hsla(${hue}, 90%, 65%, .95)`;
    this.life = 90;
  }
  update() {
    this.x += this.vx; this.y += this.vy; this.life--; this.size *= 0.985;
  }
  draw(ctx) {
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.max(this.size, 0.3), 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

addEventListener("mousemove", (e) => {
  let speed = 0;
  if (last.x !== null) {
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    speed = Math.sqrt(dx*dx + dy*dy);
  }
  last = { x: e.clientX, y: e.clientY };
  for (let i = 0; i < 3; i++) particles.push(new Particle(e.clientX, e.clientY, Math.min(speed, 25)));
});

function tick() {
  // Gentle fade to create trails (use theme bg for both modes)
  const style = getComputedStyle(document.documentElement);
  const bg = style.getPropertyValue("--bg").trim() || "#0b0d12";
  ctx.fillStyle = hexOrCssToRgba(bg, 0.15);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update/draw
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update(); p.draw(ctx);
    if (p.life <= 0 || p.size < 0.25) particles.splice(i, 1);
  }
  requestAnimationFrame(tick);
}
tick();

/* Convert CSS color (hex or rgb) to rgba string with alpha */
function hexOrCssToRgba(color, alpha) {
  if (color.startsWith("#")) {
    const c = color.slice(1);
    const bigint = parseInt(c.length === 3 ? c.split("").map(h => h + h).join("") : c, 16);
    const r = (bigint >> 16) & 255, g = (bigint >> 8) & 255, b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  // fallback (already rgb/oklab etc.)
  return color.includes("rgba(") ? color.replace(/rgba\(([^)]+),\s*[^)]+\)/, `rgba($1, ${alpha})`)
                                 : `rgba(0,0,0,${alpha})`;
}
