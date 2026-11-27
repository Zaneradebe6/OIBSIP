// app.js — renders data.js into the page, and calls the GitHub API

document.addEventListener("DOMContentLoaded", () => {
  renderStatementCard();
  renderProjects();
  renderExperience();
  renderEducation();
  renderSkills();
  setupNav();
  setupScrollReveal();
  setupCopyButtons();
  setupScrollSpy();
  setupProgressBar();
});

/* ---------- STATEMENT CARD (hero) ---------- */
function renderStatementCard() {
  const el = document.getElementById("statement-card");
  el.innerHTML = `
    <div class="statement-head">
      <span>Account Summary</span>
      <span class="live">● Online</span>
    </div>
    <div class="statement-row"><span class="label">Degree</span><span class="value">${PROFILE.degree}</span></div>
    <div class="statement-row"><span class="label">Focus</span><span class="value">${PROFILE.focus}</span></div>
    <div class="statement-row"><span class="label">Core Stack</span><span class="value">${PROFILE.stack}</span></div>
    <div class="statement-row"><span class="label">Deployed Projects</span><span class="value">${PROJECTS.length} shipped</span></div>
    <div class="statement-row"><span class="label">Institution</span><span class="value">${PROFILE.institution}</span></div>
  `;
}

/* ---------- PROJECTS (rendered from data, enriched from GitHub API) ---------- */
async function renderProjects() {
  const grid = document.getElementById("projects-grid");

  grid.innerHTML = PROJECTS.map(projectCardHTML).join("");
  document.querySelectorAll(".reveal").forEach(el => window.__revealObserver?.observe(el));

  PROJECTS.forEach(async (project, i) => {
    try {
      const res = await fetch(`https://api.github.com/repos/${PROFILE.github}/${project.repo}`);
      if (!res.ok) return;
      const repoData = await res.json();
      const meta = document.getElementById(`repo-meta-${i}`);
      if (meta) {
        const updated = new Date(repoData.pushed_at).toLocaleDateString("en-ZA", { month: "short", year: "numeric" });
        meta.textContent = `★ ${repoData.stargazers_count}  ·  updated ${updated}`;
      }
    } catch (err) {
      console.error("GitHub fetch failed for", project.repo, err);
    }
  });
}

function projectCardHTML(project, i) {
  return `
    <div class="project-card reveal">
      <span class="project-tag">${project.tag}</span>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="stack-row">
        ${project.stack.map(t => `<span class="chip">${t}</span>`).join("")}
      </div>
      <div class="repo-meta mono" id="repo-meta-${i}">loading repo stats…</div>
      <a class="project-link" href="https://github.com/${PROFILE.github}/${project.repo}" target="_blank" rel="noopener">
        View repository <span class="arrow">→</span>
      </a>
    </div>
  `;
}

/* ---------- EXPERIENCE ---------- */
function renderExperience() {
  const el = document.getElementById("experience-list");
  el.innerHTML = EXPERIENCE.map(job => `
    <div class="ledger-row reveal">
      <div class="date mono">${job.date}</div>
      <div>
        <h3>${job.role}</h3>
        <div class="org">${job.org}</div>
        <ul>${job.points.map(p => `<li>${p}</li>`).join("")}</ul>
      </div>
    </div>
  `).join("");
}

/* ---------- EDUCATION ---------- */
function renderEducation() {
  const el = document.getElementById("education-grid");
  el.innerHTML = EDUCATION.map(edu => `
    <div class="edu-card reveal">
      <div class="period mono">${edu.period}</div>
      <h3>${edu.title}</h3>
      <div class="org">${edu.org}</div>
    </div>
  `).join("");
}

/* ---------- SKILLS ---------- */
function renderSkills() {
  const el = document.getElementById("skills-grid");
  el.innerHTML = Object.entries(SKILLS).map(([category, items]) => `
    <div class="skill-group reveal">
      <div class="cat">${category}</div>
      <div class="skill-chips">
        ${items.map(s => `<span class="chip">${s}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

/* ---------- NAV TOGGLE (mobile hamburger) ---------- */
function setupNav() {
  const toggle = document.getElementById("navtoggle");
  const links = document.getElementById("navlinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
function setupScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navlinks a");

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(sec => spy.observe(sec));
}

/* ---------- SCROLL PROGRESS BAR ---------- */
function setupProgressBar() {
  const bar = document.getElementById("progressBar");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrollTop / docHeight) * 100;
    bar.style.width = `${pct}%`;
  });
}

/* ---------- SCROLL REVEAL ---------- */
function setupScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  window.__revealObserver = io;
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* ---------- COPY EMAIL BUTTON ---------- */
function setupCopyButtons() {
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.getAttribute("data-copy"));
        const original = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = original), 1500);
      } catch (err) {
        console.error("Copy failed", err);
      }
    });
  });
}