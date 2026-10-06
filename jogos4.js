/* ==========================================================================
   Capítulo IV · os momentos de jogo menores
   PASSOS  · treze toques no compasso do passo, da borda até o centro
   TENDA   · o baú com três coisas (bolsa, elmo, vela): cada uma abre uma lembrança
   AMOLAR  · o dedo leva a pedra pela lâmina (o vídeo obedece ao dedo)
   FENDA   · o mundo visto pela fenda da viseira: um olhar, até o sino
   Nenhum deles dá para perder.
   ========================================================================== */
(() => {
'use strict';
const TX = {
  pt: { nums: ['Um', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove', 'Dez', 'Onze', 'Doze', 'Treze'],
    passosT: 'Toque quando o anel fechar sobre a pegada', passosK: 'toque, clique ou espaço',
    amolarT: 'Arraste a pedra pela lâmina, de ponta a ponta', amolarK: 'arraste, ou segure ← →', passadas: (n) => `${n} de 12`,
    fendaT: 'Arraste para olhar. Pare em alguém.', fendaK: 'arraste, ou use as setas', sino: 'até o sino',
    tendaT: 'Toque numa das três coisas', },
  en: { nums: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen'],
    passosT: 'Tap when the ring closes on the footprint', passosK: 'tap, click or space',
    amolarT: 'Drag the stone along the blade, end to end', amolarK: 'drag, or hold ← →', passadas: (n) => `${n} of 12`,
    fendaT: 'Drag to look. Rest on someone.', fendaK: 'drag, or use the arrows', sino: 'until the bell',
    tendaT: 'Touch one of the three things', },
};
const vsrc = (u) => (document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"') || !/\.mp4$/.test(u) ? u : u.replace(/\.mp4$/, '.webm'));

// ------------------------------------------------------------------ PASSOS
function passos(root, o) {
  const T = TX[o.lang] || TX.en, A = o.A, bot = !!window.__ARENA_BOT;
  return new Promise((resolve) => {
    root.innerHTML = `${o.video ? `<video class="j4-bg" src="${vsrc(o.video)}" muted loop playsinline autoplay></video>` : `<div class="j4-bg" style="background-image:url('${o.img}')"></div>`}
      <div class="j4-veu"></div>
      <div class="ps-num"></div>
      <div class="ps-alvo"><i class="pe"></i><i class="anel"></i></div>
      <p class="j4-dica">${T.passosT}<small>${T.passosK}</small></p>`;
    const v = root.querySelector('video'); v && v.play().catch(() => {});
    const anel = root.querySelector('.anel'), num = root.querySelector('.ps-num'), alvo = root.querySelector('.ps-alvo');
    let bpm = o.bpm || 96, k = 0, t0 = 0, per = 0, tocou = false, vivo = true;
    const R = { firmes: 0, quase: 0, falhas: 0 };
    const periodo = () => Math.max(560, Math.min(860, 860 - (bpm - 90) * 3)) * (bpm > 130 ? .9 + Math.random() * .2 : 1);
    const ciclo = () => {
      if (!vivo) return;
      if (k >= 13) return fim();
      per = periodo(); t0 = performance.now(); tocou = false;
      anel.style.transition = 'none'; anel.style.transform = 'translate(-50%,-50%) scale(2.6)'; anel.style.opacity = '.0'; void anel.offsetWidth;
      anel.style.transition = `transform ${per}ms linear, opacity ${per * .4}ms ease-out`; anel.style.transform = 'translate(-50%,-50%) scale(1)'; anel.style.opacity = '1';
      if (bot) setTimeout(toque, per - 10);
      setTimeout(() => { if (!vivo) return; if (!tocou) { R.falhas++; bpm += 2; passo('falha'); } setTimeout(ciclo, 140); }, per + 160);
    };
    const passo = (q) => {
      k++; num.textContent = T.nums[k - 1]; num.className = 'ps-num on ' + q; void num.offsetWidth;
      alvo.classList.remove('f', 'q', 'x'); void alvo.offsetWidth; alvo.classList.add(q === 'firme' ? 'f' : q === 'quase' ? 'q' : 'x');
      A && A.sfx && A.sfx('passo-areia', .5, () => A.hiss(.12, 160, .6, .14, 0, 'lowpass'));
      if (A && A.batida && A.on) A.batida(Math.min(1, (bpm - 70) / 100));
    };
    const toque = () => {
      if (!vivo || tocou || !t0) return; const d = Math.abs(performance.now() - (t0 + per));
      if (d > 260) { bpm += 1; return; }
      tocou = true; if (d <= 110) { R.firmes++; bpm = Math.max(72, bpm - 1.5); passo('firme'); } else { R.quase++; passo('quase'); }
    };
    const fim = () => { vivo = false; removeEventListener('keydown', kd, true); setTimeout(() => resolve(Object.assign(R, { bpm: Math.round(bpm) })), 700); };
    const kd = (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); toque(); } };
    addEventListener('keydown', kd, true);
    root.addEventListener('pointerdown', (e) => { e.preventDefault(); toque(); });
    setTimeout(ciclo, 900);
  });
}

// ------------------------------------------------------------------ TENDA
function tenda(root, o) {
  const T = TX[o.lang] || TX.en;
  return new Promise((resolve) => {
    root.innerHTML = `<div class="tn-cena"><img src="${o.img}" alt="">${o.pontos.map((p) => `<button class="tn-pt ${o.vistos.includes(p.id) ? 'visto' : ''}" data-id="${p.id}" style="left:${p.x * 100}%;top:${p.y * 100}%"><i></i><span>${p.rotulo}</span></button>`).join('')}</div>
      <p class="j4-dica">${T.tendaT}</p>`;
    root.querySelectorAll('.tn-pt').forEach((b) => b.onclick = () => {
      if (b.classList.contains('visto')) return;
      o.A && o.A.tone && o.A.tone(392, .6, 'sine', .04);
      root.querySelector('.tn-cena').classList.add('sai'); b.classList.add('esc');
      setTimeout(() => resolve(b.dataset.id), 650);
    });
    if (window.__ARENA_BOT) setTimeout(() => { const b = [...root.querySelectorAll('.tn-pt:not(.visto)')][0]; b && b.click(); }, 300);
  });
}

// ------------------------------------------------------------------ AMOLAR
function amolar(root, o) {
  const T = TX[o.lang] || TX.en, A = o.A, bot = !!window.__ARENA_BOT;
  return new Promise((resolve) => {
    root.innerHTML = `<video class="j4-bg am-v" src="${vsrc(o.video)}" muted playsinline preload="auto"></video>
      <div class="j4-veu leve"></div>
      <div class="am-trilho"><i class="am-pedra"></i></div>
      <p class="am-n"></p>
      <p class="j4-dica">${T.amolarT}<small>${T.amolarK}</small></p>`;
    const v = root.querySelector('video'), tr = root.querySelector('.am-trilho'), pd = root.querySelector('.am-pedra'), nn = root.querySelector('.am-n');
    let pos = 0, lado = 0, n = 0, bpm = o.bpm || 96, vivo = true, arr = false, t0 = performance.now();
    const set = (p) => {
      pos = Math.max(0, Math.min(1, p)); pd.style.left = (pos * 100) + '%';
      if (v.duration) { try { v.currentTime = pos * (v.duration - .05); } catch (e) {} }
      if (lado === 0 && pos > .96) { lado = 1; passada(); } else if (lado === 1 && pos < .04) { lado = 0; passada(); }
    };
    const passada = () => {
      n++; bpm = Math.max(72, bpm - 3); nn.textContent = T.passadas(n); nn.classList.remove('on'); void nn.offsetWidth; nn.classList.add('on');
      A && A.sfx && A.sfx('pedra-amolar', .7, () => A.hiss(.5, 3200, 1.2, .06));
      if (A && A.batida && A.on) A.batida(Math.min(1, (bpm - 70) / 100) * .6);
      if (n >= 12) fim();
    };
    const fim = () => { if (!vivo) return; vivo = false; removeEventListener('keydown', kd, true); removeEventListener('keyup', ku, true); clearInterval(kt); setTimeout(() => resolve({ passadas: n, bpm: Math.round(bpm), seg: Math.round((performance.now() - t0) / 1000) }), 600); };
    const px = (e) => { const r = tr.getBoundingClientRect(); return (e.clientX - r.left) / r.width; };
    root.addEventListener('pointerdown', (e) => { arr = true; set(px(e)); root.setPointerCapture && root.setPointerCapture(e.pointerId); });
    root.addEventListener('pointermove', (e) => { if (arr) set(px(e)); });
    root.addEventListener('pointerup', () => { arr = false; });
    let kdir = 0; const kt = setInterval(() => { if (kdir) set(pos + kdir * .035); }, 30);
    const kd = (e) => { if (e.key === 'ArrowRight') { kdir = 1; e.preventDefault(); } if (e.key === 'ArrowLeft') { kdir = -1; e.preventDefault(); } e.stopPropagation(); };
    const ku = (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') kdir = 0; };
    addEventListener('keydown', kd, true); addEventListener('keyup', ku, true);
    setTimeout(fim, 30000);
    if (bot) { let d = 1; const bt = setInterval(() => { if (!vivo) return clearInterval(bt); set(pos + d * .08); if (pos >= 1) d = -1; if (pos <= 0) d = 1; }, 16); }
  });
}

// ------------------------------------------------------------------ FENDA
function fenda(root, o) {
  const T = TX[o.lang] || TX.en, A = o.A, bot = !!window.__ARENA_BOT;
  return new Promise((resolve) => {
    root.innerHTML = `<div class="fd-pano" style="background-image:url('${o.img}')"></div>
      <div class="fd-mask"><i class="t"></i><i class="b"></i></div>
      <div class="fd-mira"><i></i></div>
      <p class="fd-nome"></p>
      <div class="fd-tempo"><i></i></div>
      <p class="j4-dica">${T.fendaT}<small>${T.fendaK} · ${T.sino}</small></p>`;
    const pano = root.querySelector('.fd-pano'), mira = root.querySelector('.fd-mira'), nome = root.querySelector('.fd-nome'), tempo = root.querySelector('.fd-tempo i');
    const R = o.proporcao || 3;
    let W = root.clientWidth, H = root.clientHeight, PH = 0, PW = 0, cx = .5, cy = .45, vivo = true, alvo = null, tA = 0, inicio = performance.now();
    const DUR = (o.segundos || 14) * 1000;
    const medir = () => { W = root.clientWidth; H = root.clientHeight; PH = Math.max(H * 1.5, W / R * 1.15); PW = PH * R; pano.style.width = PW + 'px'; pano.style.height = PH + 'px'; aplica(); };
    const aplica = () => {
      cx = Math.max(W / 2 / PW, Math.min(1 - W / 2 / PW, cx)); cy = Math.max(H / 2 / PH, Math.min(1 - H / 2 / PH, cy));
      pano.style.transform = `translate(${W / 2 - cx * PW}px, ${H / 2 - cy * PH}px)`;
    };
    addEventListener('resize', medir); medir();
    let arr = null;
    root.addEventListener('pointerdown', (e) => { arr = { x: e.clientX, y: e.clientY, cx, cy }; root.setPointerCapture && root.setPointerCapture(e.pointerId); });
    root.addEventListener('pointermove', (e) => { if (!arr) return; cx = arr.cx - (e.clientX - arr.x) / PW; cy = arr.cy - (e.clientY - arr.y) / PH; aplica(); });
    root.addEventListener('pointerup', () => { arr = null; });
    const kd = (e) => { const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key]; if (!d) return; e.preventDefault(); e.stopPropagation(); cx += d[0] * .03; cy += d[1] * .05; aplica(); };
    addEventListener('keydown', kd, true);
    const fim = (id) => {
      if (!vivo) return; vivo = false; removeEventListener('keydown', kd, true); removeEventListener('resize', medir);
      if (!id) A && A.sfx && A.sfx('sino-arena', .8);
      setTimeout(() => resolve(id || null), id ? 900 : 1200);
    };
    let bt = null; if (bot) { const p = o.pontos[0]; bt = setInterval(() => { cx += (p.x - cx) * .2; cy += (p.y - cy) * .2; aplica(); }, 30); }
    const laco = () => {
      if (!vivo) { clearInterval(bt); return; }
      const agora = performance.now(), fr = (agora - inicio) / DUR;
      tempo.style.transform = `scaleX(${Math.max(0, 1 - fr)})`;
      if (fr >= 1) return fim(null);
      // quem está no centro da fenda?
      const perto = o.pontos.find((p) => Math.abs((p.x - cx) * PW) < (p.r || .05) * PW && Math.abs((p.y - cy) * PH) < (p.ry || .09) * PH);
      if (perto !== alvo) { alvo = perto; tA = agora; nome.classList.toggle('on', !!perto); nome.textContent = perto ? perto.rotulo : ''; }
      const k = alvo ? Math.min(1, (agora - tA) / 1000) : 0;
      mira.style.setProperty('--k', k.toFixed(3)); mira.classList.toggle('on', !!alvo);
      if (alvo && k >= 1) { A && A.tone && A.tone(330, .7, 'sine', .04); root.classList.add('fixou'); return fim(alvo.id); }
      requestAnimationFrame(laco);
    };
    requestAnimationFrame(laco);
  });
}

window.JOGOS4 = { passos, tenda, amolar, fenda };
})();
