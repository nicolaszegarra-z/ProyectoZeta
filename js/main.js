const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('.explorer-card').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`translateY(-8px) rotateX(${-y*2}deg) rotateY(${x*2}deg) scale(1.01)`});card.addEventListener('mouseleave',()=>card.style.transform='')});


//  — cinematic intro controller
(() => {
  const intro = document.getElementById('cosmicIntro');
  if (!intro) return;

  const enter = document.getElementById('introEnter');
  const skip = document.getElementById('introSkip');
  const canvas = document.getElementById('introStars');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let raf = 0;
  let finished = false;

  function resizeStars(){
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(innerWidth*dpr);
    canvas.height = Math.round(innerHeight*dpr);
    canvas.style.width = innerWidth+'px';
    canvas.style.height = innerHeight+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    stars = Array.from({length: Math.min(320, Math.floor(innerWidth/4))}, () => ({
      x: Math.random()*innerWidth,
      y: Math.random()*innerHeight,
      r: Math.random()*1.35+.16,
      a: Math.random()*.78+.12,
      s: Math.random()*.075+.012,
      p: Math.random()*Math.PI*2,
      hue: Math.random() < .12 ? (Math.random() < .5 ? '190,225,255' : '255,220,190') : '235,242,255'
    }));
  }
  function drawStars(t){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    stars.forEach(star => {
      const pulse = .55 + .45*Math.sin(t*.0012 + star.p);
      ctx.fillStyle = `rgba(${star.hue},${star.a*pulse})`;
      ctx.beginPath();
      ctx.arc(star.x,star.y,star.r,0,Math.PI*2);
      ctx.fill();
      star.x += star.s;
      if(star.x > innerWidth+2) star.x = -2;
    });
    raf = requestAnimationFrame(drawStars);
  }

  function finishIntro(){
    if(finished) return;
    finished = true;
    document.body.classList.remove('intro-locked');
    document.body.classList.add('intro-complete');
    intro.classList.add('is-finished');
    cancelAnimationFrame(raf);
    window.dispatchEvent(new Event('zeta:intro-complete'));
    setTimeout(() => intro.remove(), 1250);
  }

  enter?.addEventListener('click', finishIntro);
  skip?.addEventListener('click', finishIntro);

  // A keyboard key or a deliberate tap/click outside the CTA skips after the first 2.5s.
  const start = performance.now();
  function userSkip(e){
    if(performance.now()-start < 2500) return;
    if(e.target === enter || e.target === skip) return;
    finishIntro();
  }
  intro.addEventListener('pointerdown', userSkip);
  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finishIntro();
  }, {once:true});

  // End the cinematic automatically after the full sequence if the user waits.
  setTimeout(finishIntro, 16600);

  resizeStars();
  window.addEventListener('resize', resizeStars);
  raf = requestAnimationFrame(drawStars);
})();


//  — mini quiz de contenido real
for (const card of document.querySelectorAll('.quiz-card')) {
  const answer = card.dataset.answer;
  const feedback = card.querySelector('.quiz-feedback');
  card.querySelectorAll('button[data-choice]').forEach(btn => {
    btn.addEventListener('click', () => {
      const ok = btn.dataset.choice === answer;
      card.querySelectorAll('button').forEach(b => b.classList.remove('correct','wrong'));
      btn.classList.add(ok ? 'correct' : 'wrong');
      feedback.textContent = ok ? 'Correcto. Esa es la conexión adecuada.' : 'Todavía no. Prueba otra opción.';
    });
  });
}

//  — navegación móvil y estado activo
(() => {
  const nav = document.querySelector('nav');
  const menu = nav?.querySelector('.menu');
  if (!nav || !menu) return;
  if (!nav.querySelector('.mobile-nav-toggle')) {
    const btn = document.createElement('button');
    btn.className = 'mobile-nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label','Abrir menú');
    btn.textContent = '☰';
    nav.insertBefore(btn, menu);
    btn.addEventListener('click', () => {
      menu.classList.toggle('open');
      btn.textContent = menu.classList.contains('open') ? '✕' : '☰';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }
  const current = location.pathname.split('/').pop() || 'index.html';
  menu.querySelectorAll('a').forEach(a => {
    if ((a.getAttribute('href') || '').split('#')[0] === current) a.classList.add('active');
  });
})();

//  — explorador interactivo de cambios de paradigma
(() => {
  const root = document.querySelector('[data-paradigm]');
  if (!root) return;
  const data = {
    galileo: {
      before:'La Tierra ocupa un lugar central obligatorio.',
      evidence:'El telescopio revela satélites alrededor de Júpiter y las fases de Venus.',
      after:'El modelo antiguo deja de encajar de la misma manera y la Tierra pierde su papel de centro necesario.'
    },
    andromeda: {
      before:'La Vía Láctea puede ser todo el universo.',
      evidence:'Una Cefeida en Andrómeda permite estimar una distancia demasiado grande para pertenecer a nuestra galaxia.',
      after:'La Vía Láctea pasa a ser una galaxia entre muchas.'
    },
    cmb: {
      before:'Modelos rivales compiten sobre la historia del universo.',
      evidence:'La radiación cósmica de fondo aparece como una señal de microondas casi uniforme.',
      after:'Gana enorme apoyo la idea de un universo mucho más caliente y denso en el pasado.'
    },
    exo: {
      before:'Nuestro Sistema Solar es el único ejemplo conocido de sistema planetario.',
      evidence:'Velocidad radial, temporización y tránsitos revelan miles de mundos con arquitecturas inesperadas.',
      after:'Nuestro sistema deja de ser una plantilla universal para imaginar otros sistemas planetarios.'
    },
    dark: {
      before:'La expansión debería frenarse por la gravedad.',
      evidence:'Supernovas lejanas aparecen más débiles de lo esperado para un universo que se desacelera.',
      after:'La expansión acelerada queda bien establecida, aunque la naturaleza de la energía oscura siga abierta.'
    }
  };
  const before = root.querySelector('[data-before]');
  const evidence = root.querySelector('[data-evidence]');
  const after = root.querySelector('[data-after]');
  const buttons = root.querySelectorAll('button[data-case]');
  buttons.forEach((btn, i) => {
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => {
      const item = data[btn.dataset.case];
      if (!item) return;
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      before.textContent = item.before;
      evidence.textContent = item.evidence;
      after.textContent = item.after;
    });
  });
})();


//  — indicador lateral del viaje de telecomunicaciones
(() => {
  const chapters=[...document.querySelectorAll('.signal-chapter[data-step]')];
  if(!chapters.length) return;
  const links=[...document.querySelectorAll('.signal-progress a[data-progress]')];
  const activate=(step)=>links.forEach(a=>a.classList.toggle('active',a.dataset.progress===step));
  const io=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(visible) activate(visible.target.dataset.step);
  },{rootMargin:'-30% 0px -45% 0px',threshold:[0,.15,.35,.6]});
  chapters.forEach(c=>io.observe(c));
})();

//  — marca imágenes que necesitaron fallback para depuración visual.
document.addEventListener('error',e=>{if(e.target&&e.target.tagName==='IMG'){e.target.classList.add('image-fallback-used')}},true);


//  — explorador cronológico de telecomunicaciones
(() => {
  const root = document.querySelector('.telecom-browser');
  if (!root) return;
  const buttons = [...root.querySelectorAll('.tele-menu-item')];
  const panels = [...root.querySelectorAll('[data-stage-panel]')];
  const menuPanel = root.querySelector('.telecom-menu-panel');
  const stageShell = root.querySelector('.telecom-stage-shell');
  const lightbox = document.getElementById('teleLightbox');
  const lbImg = lightbox?.querySelector('img');
  const lbCap = lightbox?.querySelector('p');
  let active = 1;

  function hydrate(panel){
    panel.querySelectorAll('img[data-src]').forEach(img => {
      if (!img.src) img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
  function showStage(n, options={scroll:true}){
    n = Math.max(1, Math.min(21, Number(n)||1));
    active=n;
    buttons.forEach(btn => {
      const on=Number(btn.dataset.stage)===n;
      btn.classList.toggle('is-active',on);
      btn.setAttribute('aria-selected',on?'true':'false');
      if(on){
        const list = btn.closest('.telecom-menu-list');
        if(list){
          const btnTop = btn.offsetTop;
          const btnBottom = btnTop + btn.offsetHeight;
          const viewTop = list.scrollTop;
          const viewBottom = viewTop + list.clientHeight;
          if(btnTop < viewTop) list.scrollTo({top:Math.max(0,btnTop-10),behavior:'smooth'});
          else if(btnBottom > viewBottom) list.scrollTo({top:btnBottom-list.clientHeight+10,behavior:'smooth'});
        }
      }
    });
    panels.forEach(panel => {
      const on=Number(panel.dataset.stagePanel)===n;
      panel.hidden=!on;
      panel.classList.toggle('is-active',on);
      panel.setAttribute('aria-hidden',on?'false':'true');
      if(on) hydrate(panel);
    });
    history.replaceState(null,'',`#etapa-${String(n).padStart(2,'0')}`);
    if(options.scroll){
      const activePanel = panels.find(panel => Number(panel.dataset.stagePanel) === n);
      requestAnimationFrame(() => {
        const target = activePanel || stageShell;
        const nav = document.querySelector('nav');
        const navOffset = (nav?.getBoundingClientRect().height || 0) + 18;
        const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({top: Math.max(0, top), behavior:'smooth'});
      });
    }
  }
  buttons.forEach(btn => btn.addEventListener('click',()=>showStage(btn.dataset.stage)));
  root.querySelectorAll('[data-go]').forEach(btn => btn.addEventListener('click',()=>showStage(btn.dataset.go)));
  const hashMatch=location.hash.match(/etapa-(\d{1,2})/);
  if(hashMatch) showStage(hashMatch[1],{scroll:false}); else showStage(1,{scroll:false});

  root.addEventListener('click',e => {
    const opener=e.target.closest('.tele-figure-open');
    if(!opener || !lightbox || !lbImg) return;
    const img=opener.querySelector('img');
    if(!img) return;
    lbImg.src=img.currentSrc || img.src;
    lbImg.alt=img.alt || 'Imagen ampliada';
    if(lbCap) lbCap.textContent=opener.closest('figure')?.querySelector('figcaption')?.textContent || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden','false');
  });
  function closeLb(){
    if(!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden','true');
  }
  lightbox?.querySelector('.tele-lightbox-close')?.addEventListener('click',closeLb);
  lightbox?.addEventListener('click',e=>{if(e.target===lightbox) closeLb()});
  window.addEventListener('keydown',e=>{if(e.key==='Escape') closeLb()});
})();


//  — interactive explanations + story rail for Materials and Conception.
(() => {
  document.querySelectorAll('[data-explainer]').forEach(root => {
    const tabs=[...root.querySelectorAll('[data-tab]')];
    const panels=[...root.querySelectorAll('[data-panel]')];
    tabs.forEach(tab => tab.addEventListener('click', () => {
      const id=tab.dataset.tab;
      tabs.forEach(t=>{const on=t===tab;t.classList.toggle('is-active',on);t.setAttribute('aria-selected',on?'true':'false')});
      panels.forEach(p=>p.classList.toggle('is-active',p.dataset.panel===id));
    }));
  });
  document.querySelectorAll('[data-story-rail]').forEach(root => {
    const nodes=[...root.querySelectorAll('.v067-rail-node')];
    nodes.forEach(node => node.addEventListener('click', () => {
      nodes.forEach(n=>n.classList.toggle('is-active',n===node));
    }));
  });
})();


//  — detecta títulos largos; CSS aplica la jerarquía según importancia y longitud.
(() => {
  const candidates = [...document.querySelectorAll('h1, h2')];
  candidates.forEach(title => {
    const label = (title.textContent || '').replace(/\s+/g,' ').trim();
    if (!label) return;
    const size = parseFloat(getComputedStyle(title).fontSize) || 0;
    // Solo interviene en encabezados que originalmente son grandes.
    if (size < 34) return;
    if (label.length >= 88) title.classList.add('auto-xlong-title');
    else if (label.length >= 54) title.classList.add('auto-long-title');
  });
})();


// Background soundtrack + interface hover tone.
// The soundtrack is the audio file supplied for this version of PROYECTO ZETA.
(() => {
  const INTRO_PRESENT = !!document.getElementById('cosmicIntro');
  const MUSIC_SRC = 'assets/audio/cornfield-chase-instrument.mp3';
  const AMBIENT_KEY = 'zetaAmbientEnabled';
  const TIME_KEY = 'zetaAmbientTime';
  let music = null;
  let musicStarted = false;
  let audioCtx = null;
  let lastBeepAt = 0;

  function getContext(){
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    if (audioCtx?.state === 'suspended') audioCtx.resume().catch(()=>{});
    return audioCtx;
  }

  function beep(){
    const now = performance.now();
    if (now - lastBeepAt < 55) return;
    lastBeepAt = now;
    const ctx = getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(720, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(860, ctx.currentTime + 0.045);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.018, ctx.currentTime + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.055);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }

  function makeMusic(){
    if (music) return music;
    music = new Audio(MUSIC_SRC);
    music.loop = true;
    music.preload = 'metadata';
    music.volume = 0;
    const saved = Number(sessionStorage.getItem(TIME_KEY) || 0);
    if (Number.isFinite(saved) && saved > 0) {
      music.addEventListener('loadedmetadata', () => {
        if (music.duration && Number.isFinite(music.duration)) music.currentTime = saved % music.duration;
      }, {once:true});
    }
    return music;
  }

  async function startMusic(){
    if (musicStarted) return;
    const el = makeMusic();
    try {
      await el.play();
      musicStarted = true;
      sessionStorage.setItem(AMBIENT_KEY, '1');
      const target = 0.30; // ambience intentionally soft / tenue
      const started = performance.now();
      const fade = () => {
        const p = Math.min(1, (performance.now() - started) / 3200);
        el.volume = target * p;
        if (p < 1) requestAnimationFrame(fade);
      };
      requestAnimationFrame(fade);
    } catch (_) {
      // Browsers may block autoplay after navigation. The next deliberate interaction retries it.
      const retry = () => {
        startMusic();
        window.removeEventListener('pointerdown', retry, true);
        window.removeEventListener('keydown', retry, true);
      };
      window.addEventListener('pointerdown', retry, true);
      window.addEventListener('keydown', retry, true);
    }
  }

  // Start only once the cinematic is finished. On later pages, resume the ambience if it was activated there.
  window.addEventListener('zeta:intro-complete', startMusic);
  if (!INTRO_PRESENT && sessionStorage.getItem(AMBIENT_KEY) === '1') startMusic();

  // Persist approximate playback position across normal page navigation.
  setInterval(() => {
    if (musicStarted && music && Number.isFinite(music.currentTime)) sessionStorage.setItem(TIME_KEY, String(music.currentTime));
  }, 1200);
  window.addEventListener('pagehide', () => {
    if (music && Number.isFinite(music.currentTime)) sessionStorage.setItem(TIME_KEY, String(music.currentTime));
  });

  // A restrained UI beep on hover. Touch devices do not trigger it.
  const interactiveSelector = 'button, .btn, nav a, .full-history-cta__button, .intro-enter, [role="button"], .tele-menu-item, .quiz-option, .mission-choice';
  document.addEventListener('pointerover', (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const target = e.target.closest?.(interactiveSelector);
    if (!target) return;
    if (target.contains(e.relatedTarget)) return;
    beep();
  });
  document.addEventListener('pointerdown', () => getContext(), {once:true, capture:true});
})();
