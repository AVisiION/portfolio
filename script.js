/* ===== Three.js IoT Network Scene ===== */
(function () {
  'use strict';

  // ── Loader ──────────────────────────────────────────────
  const loader   = document.getElementById('loader');
  const fill     = document.getElementById('loader-fill');
  let   progress = 0;
  const fillInterval = setInterval(() => {
    progress = Math.min(progress + Math.random() * 18, 95);
    if (fill) fill.style.width = progress + '%';
  }, 120);

  function finishLoader() {
    clearInterval(fillInterval);
    if (fill) fill.style.width = '100%';
    setTimeout(() => {
      if (loader) loader.classList.add('hidden');
      revealHero();
    }, 400);
  }

  // ── Three.js Scene ──────────────────────────────────────
  const canvas = document.getElementById('bg-canvas');
  let   W = window.innerWidth, H = window.innerHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x080810, 1);

  const scene  = new THREE.Scene();
  scene.fog    = new THREE.FogExp2(0x080810, 0.008);

  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 500);
  camera.position.set(0, 0, 55);

  // — Stars
  (function buildStars() {
    const geo  = new THREE.BufferGeometry();
    const n    = 3500;
    const pos  = new Float32Array(n * 3);
    const cols = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 300;
      pos[i*3+1] = (Math.random() - 0.5) * 300;
      pos[i*3+2] = (Math.random() - 0.5) * 200 - 50;
      const t    = Math.random();
      cols[i*3]   = t * 0;
      cols[i*3+1] = t * 0.9;
      cols[i*3+2] = t * 1;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(cols, 3));
    const mat = new THREE.PointsMaterial({ size: 0.14, vertexColors: true, transparent: true, opacity: 0.55 });
    scene.add(new THREE.Points(geo, mat));
  })();

  // — IoT Network Nodes + Connections
  const nodeGroup  = new THREE.Group();
  const connGroup  = new THREE.Group();
  const nodes      = [];
  const NODE_COUNT = 48;

  const nodeMat  = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
  const dimMat   = new THREE.MeshBasicMaterial({ color: 0x1a2a4a, transparent: true, opacity: 0.7 });
  const lineMat  = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.07 });

  for (let i = 0; i < NODE_COUNT; i++) {
    const r    = Math.random() < 0.25 ? 0.25 : 0.12;
    const geo  = new THREE.SphereGeometry(r, 8, 8);
    const mat  = Math.random() < 0.3 ? nodeMat.clone() : dimMat.clone();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 60,
      (Math.random() - 0.5) * 50 - 20
    );
    mesh.userData = {
      base:        mesh.position.clone(),
      speed:       Math.random() * 0.4 + 0.15,
      offset:      Math.random() * Math.PI * 2,
      isActive:    Math.random() < 0.3,
      pulsePhase:  Math.random() * Math.PI * 2,
    };
    nodeGroup.add(mesh);
    nodes.push(mesh);
  }

  // Build connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].position.distanceTo(nodes[j].position) < 22) {
        const geo = new THREE.BufferGeometry().setFromPoints([
          nodes[i].position.clone(),
          nodes[j].position.clone(),
        ]);
        connGroup.add(new THREE.Line(geo, lineMat.clone()));
      }
    }
  }

  scene.add(nodeGroup, connGroup);

  // — Floating Wireframe Shapes
  const shapes = [];
  [
    { r: 5,   pos: [ 35,  12, -40], s: 0.003 },
    { r: 3.2, pos: [-38, -14, -32], s: 0.005 },
    { r: 2,   pos: [ 22, -22, -25], s: 0.007 },
  ].forEach(({ r, pos, s }) => {
    const geo  = new THREE.IcosahedronGeometry(r, 1);
    const wGeo = new THREE.WireframeGeometry(geo);
    const mat  = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.12 });
    const mesh = new THREE.LineSegments(wGeo, mat);
    mesh.position.set(...pos);
    mesh.userData.speed = s;
    scene.add(mesh);
    shapes.push(mesh);
  });

  // — Large background torus ring
  const torusGeo = new THREE.TorusGeometry(22, 0.08, 8, 120);
  const torusMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.04 });
  const torus    = new THREE.Mesh(torusGeo, torusMat);
  torus.rotation.x = Math.PI / 3.5;
  scene.add(torus);

  // — Orbiting particle ring
  const ringGeo  = new THREE.BufferGeometry();
  const ringN    = 180;
  const ringPos  = new Float32Array(ringN * 3);
  for (let i = 0; i < ringN; i++) {
    const a = (i / ringN) * Math.PI * 2;
    const R = 18;
    ringPos[i*3]   = Math.cos(a) * R;
    ringPos[i*3+1] = Math.sin(a) * R * 0.3;
    ringPos[i*3+2] = Math.sin(a) * R * 0.5 - 20;
  }
  ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
  const ringMesh = new THREE.Points(ringGeo, new THREE.PointsMaterial({ size: 0.2, color: 0x00e5ff, transparent: true, opacity: 0.25 }));
  scene.add(ringMesh);

  // — Data particle streams
  const streamGeo  = new THREE.BufferGeometry();
  const streamN    = 600;
  const streamPos  = new Float32Array(streamN * 3);
  const streamVel  = new Float32Array(streamN * 3);
  for (let i = 0; i < streamN; i++) {
    streamPos[i*3]   = (Math.random() - 0.5) * 120;
    streamPos[i*3+1] = (Math.random() - 0.5) * 80;
    streamPos[i*3+2] = (Math.random() - 0.5) * 60 - 20;
    streamVel[i*3]   = (Math.random() - 0.5) * 0.04;
    streamVel[i*3+1] = (Math.random() - 0.5) * 0.04;
    streamVel[i*3+2] = (Math.random() - 0.5) * 0.02;
  }
  streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPos, 3));
  const streamMesh = new THREE.Points(streamGeo, new THREE.PointsMaterial({ size: 0.1, color: 0x00ffaa, transparent: true, opacity: 0.2 }));
  scene.add(streamMesh);

  // ── Mouse + Scroll State ────────────────────────────────
  let   mouseX = 0, mouseY = 0;
  let   targetRX = 0, targetRY = 0;
  let   scrollY  = 0;

  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / W - 0.5) * 2;
    mouseY = -(e.clientY / H - 0.5) * 2;
  });
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  });

  // ── Animate ─────────────────────────────────────────────
  let frameId;
  function animate() {
    frameId = requestAnimationFrame(animate);
    const t = performance.now() * 0.001;

    // Mouse parallax
    targetRX += (mouseY * 0.25 - targetRX) * 0.04;
    targetRY += (mouseX * 0.25 - targetRY) * 0.04;
    nodeGroup.rotation.x  = targetRX;
    nodeGroup.rotation.y  = targetRY;
    connGroup.rotation.x  = targetRX;
    connGroup.rotation.y  = targetRY;

    // Float nodes
    nodes.forEach(n => {
      n.position.y = n.userData.base.y + Math.sin(t * n.userData.speed + n.userData.offset) * 0.6;
      if (n.userData.isActive) {
        const p = (Math.sin(t * 2 + n.userData.pulsePhase) + 1) * 0.5;
        n.material.opacity = 0.5 + p * 0.5;
      }
    });

    // Shapes
    shapes.forEach(s => {
      s.rotation.x += s.userData.speed;
      s.rotation.y += s.userData.speed * 0.7;
    });

    // Rings & torus
    torus.rotation.z     = t * 0.04;
    ringMesh.rotation.y  = t * 0.06;

    // Stream particles
    const sp = streamGeo.attributes.position.array;
    for (let i = 0; i < streamN; i++) {
      sp[i*3]   += streamVel[i*3];
      sp[i*3+1] += streamVel[i*3+1];
      sp[i*3+2] += streamVel[i*3+2];
      if (Math.abs(sp[i*3]) > 60) streamVel[i*3]   *= -1;
      if (Math.abs(sp[i*3+1]) > 40) streamVel[i*3+1] *= -1;
      if (Math.abs(sp[i*3+2] + 20) > 30) streamVel[i*3+2] *= -1;
    }
    streamGeo.attributes.position.needsUpdate = true;

    // Scroll-driven camera
    camera.position.z = 55 - scrollY * 0.025;
    camera.position.y = -(scrollY * 0.008);

    renderer.render(scene, camera);
  }

  // ── 3D Card Tilt ────────────────────────────────────────
  function initTilt() {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateZ(8px)`;
        card.style.boxShadow = `0 24px 60px rgba(0,229,255,${0.06 + Math.abs(x + y) * 0.1})`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  // ── Scroll Reveal ───────────────────────────────────────
  function initReveal() {
    const els = document.querySelectorAll('.reveal-up, .reveal-section');
    const io  = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }

  // ── Hero Reveal (GSAP) ───────────────────────────────────
  function revealHero() {
    const els = document.querySelectorAll('#hero .reveal-up');
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 100);
    });
  }

  // ── Navbar ──────────────────────────────────────────────
  function initNav() {
    const nav  = document.getElementById('navbar');
    const ham  = document.getElementById('hamburger');
    const links = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    ham && ham.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    document.querySelectorAll('.nav-item').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // ── MQTT Feed Animation ──────────────────────────────────
  function initMqttFeed() {
    const feeds = [
      'sensor/temp → ' + (24 + (Math.random()*2).toFixed(1)) + '°C',
      'sensor/hum → '  + (60 + Math.floor(Math.random()*15)) + '%',
      'led/strip → #00E5FF',
      'sensor/light → ' + (800 + Math.floor(Math.random()*200)) + ' lx',
      'cmd/servo → 90°',
      'sensor/co2 → 412 ppm',
    ];
    const items = document.querySelectorAll('.feed-text');
    let idx = 0;
    setInterval(() => {
      const item = items[idx % items.length];
      if (item) {
        item.style.opacity = '0';
        setTimeout(() => {
          item.textContent = feeds[Math.floor(Math.random() * feeds.length)];
          item.style.opacity = '1';
          item.style.transition = 'opacity 0.4s';
        }, 300);
      }
      idx++;
    }, 2200);
  }

  // ── Sensor Readout Animation ─────────────────────────────
  function initSensorReadout() {
    const temp  = document.getElementById('temp-val');
    const hum   = document.getElementById('hum-val');
    const light = document.getElementById('light-val');
    if (!temp) return;
    setInterval(() => {
      temp.textContent  = (23 + Math.random() * 3).toFixed(1) + '°C';
      hum.textContent   = Math.floor(60 + Math.random() * 15) + '%';
      light.textContent = Math.floor(790 + Math.random() * 80) + ' lx';
    }, 3000);
  }

  // ── Boot ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    animate();
    initNav();
    initTilt();
    initReveal();
    initMqttFeed();
    initSensorReadout();
    // finish loader after scene is ready
    setTimeout(finishLoader, 1200);
  });

})();
