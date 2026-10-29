// ---------- nav scroll state + active link ----------
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  });

  // ---------- mobile nav toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinksEl.classList.toggle('open'));
  navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinksEl.classList.remove('open')));

  // ---------- reveal on scroll ----------
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }

  // ---------- cycling role text ----------
  const roles = [
    "Building production RAG systems",
    "Shipping multi-agent workflows",
    "Evaluating LLMs with DeepEval & RAGAS",
    "Deploying AI to AWS with CI/CD",
    "Building WhatsApp AI bots"
  ];
  const roleEl = document.getElementById('roleText');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop(){
    const full = roles[roleIndex];
    if (!deleting){
      charIndex++;
      roleEl.textContent = full.slice(0, charIndex);
      if (charIndex === full.length){ deleting = true; setTimeout(typeLoop, 1600); return; }
    } else {
      charIndex--;
      roleEl.textContent = full.slice(0, charIndex);
      if (charIndex === 0){ deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
    }
    setTimeout(typeLoop, deleting ? 35 : 55);
  }
  if (reduceMotion){ roleEl.textContent = roles[0]; } else { typeLoop(); }

  // ---------- hero node-graph canvas (knowledge-graph motif) ----------
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  const heroSection = document.getElementById('home');
  const labels = ['Python','LangGraph','RAG','CrewAI','LLM','AWS','Qdrant','FastAPI','DeepEval','Agents'];
  let nodes = [];
  let mouse = { x: null, y: null };
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas(){
    const rect = heroSection.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    initNodes(rect.width, rect.height);
  }

  function initNodes(w, h){
    const count = w < 700 ? 16 : 26;
    nodes = [];
    for (let i = 0; i < count; i++){
      nodes.push({
        x: Math.random()*w,
        y: Math.random()*h,
        vx: (Math.random()-0.5)*0.25,
        vy: (Math.random()-0.5)*0.25,
        r: Math.random()*1.6 + 1.4,
        label: (w >= 700 && i < labels.length) ? labels[i] : null
      });
    }
  }

  function drawGraph(){
    const w = canvas.width/dpr, h = canvas.height/dpr;
    ctx.clearRect(0,0,w,h);

    // parallax shift based on mouse
    let ox = 0, oy = 0;
    if (mouse.x !== null){
      ox = (mouse.x - w/2) / w * 14;
      oy = (mouse.y - h/2) / h * 14;
    }

    for (let i=0;i<nodes.length;i++){
      const n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }

    // connections
    for (let i=0;i<nodes.length;i++){
      for (let j=i+1;j<nodes.length;j++){
        const a = nodes[i], b = nodes[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        const maxDist = w < 700 ? 130 : 170;
        if (dist < maxDist){
          const alpha = (1 - dist/maxDist) * 0.22;
          ctx.strokeStyle = `rgba(124,138,255,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x+ox, a.y+oy);
          ctx.lineTo(b.x+ox, b.y+oy);
          ctx.stroke();
        }
      }
    }

    // nodes + labels
    ctx.font = '11px JetBrains Mono, monospace';
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x+ox, n.y+oy, n.r, 0, Math.PI*2);
      ctx.fillStyle = n.label ? 'rgba(255,184,107,0.85)' : 'rgba(124,138,255,0.55)';
      ctx.fill();
      if (n.label){
        ctx.fillStyle = 'rgba(139,147,167,0.55)';
        ctx.fillText(n.label, n.x+ox+8, n.y+oy+4);
      }
    });

    requestAnimationFrame(drawGraph);
  }

  window.addEventListener('resize', resizeCanvas);
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  heroSection.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  resizeCanvas();
  if (!reduceMotion) requestAnimationFrame(drawGraph);
  else { drawGraph(); } // draw one static frame

  // ---------- project card 3D tilt ----------
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches){
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = ((y / rect.height) - 0.5) * -8;
        const ry = ((x / rect.width) - 0.5) * 8;
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }
