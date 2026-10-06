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
    amolarT: 'Leve a pedra junto com a luz, do cabo à ponta. Devagar, sem parar.', amolarK: 'arraste, ou segure →', passadas: (n) => `${n} de 12`,
    fendaT: 'Arraste para olhar. Pare em alguém.', fendaK: 'arraste, ou use as setas', sino: 'até o sino',
    tendaT: 'Toque numa das três coisas',
    amolarOk: 'A lâmina inteira, numa passada só', amolarRapido: 'Rápido demais. A pedra raspa.', amolarParou: 'Parou. A pedra volta ao cabo.',
    respT: 'Segure enquanto o anel abre. Solte quando ele chegar no alto.', respK: 'toque e segure, ou espaço', respSeg: 'Segure', respIn: 'Inspira...', respBom: 'Solta.', respCedo: 'O ar escapa.',
    arqT: 'Segure para puxar e arraste para mirar. Solte entre duas batidas.', arqK: 'ou espaço para puxar e setas para mirar',
    arqFraco: 'A corda nem chegou ao rosto.', arqTrava: 'O espaldar trava o braço.', arqCentro: 'No centro.', arqBom: 'Dentro.', arqBeira: 'Na beirada.', arqFora: 'Na palha.', },
  en: { nums: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen'],
    passosT: 'Tap when the ring closes on the footprint', passosK: 'tap, click or space',
    amolarT: 'Move the stone with the light, hilt to tip. Slowly, never stopping.', amolarK: 'drag, or hold →', passadas: (n) => `${n} of 12`,
    fendaT: 'Drag to look. Rest on someone.', fendaK: 'drag, or use the arrows', sino: 'until the bell',
    tendaT: 'Touch one of the three things',
    amolarOk: 'The whole blade, in one stroke', amolarRapido: 'Too fast. The stone scrapes.', amolarParou: 'Stopped. The stone goes back to the hilt.',
    respT: 'Hold while the ring opens. Let go when it reaches the top.', respK: 'touch and hold, or space', respSeg: 'Hold', respIn: 'Breathe in...', respBom: 'Let go.', respCedo: 'The air slips out.',
    arqT: 'Hold to draw and drag to aim. Release between two heartbeats.', arqK: 'or space to draw and arrows to aim',
    arqFraco: 'The string never reached my face.', arqTrava: 'The backplate locks my arm.', arqCentro: 'Dead centre.', arqBom: 'Inside.', arqBeira: 'On the edge.', arqFora: 'In the straw.', },
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
      k++; num.textContent = T.nums[k - 1]; num.className = 'ps-num'; void num.offsetWidth; num.className = 'ps-num on ' + q;
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

// ------------------------------------------------------------------ AMOLAR (uma passada só, devagar e constante)
// Uma luz anda pela lâmina no ritmo certo; a pedra tem de ir junto. Rápida demais, raspa e volta ao cabo.
// Parou, volta ao cabo. Com o coração alto, a luz anda num passo menos regular.
function amolar(root, o) {
  const T = TX[o.lang] || TX.en, A = o.A, bot = !!window.__ARENA_BOT;
  return new Promise((resolve) => {
    root.innerHTML = `<video class="j4-bg am-v" src="${vsrc(o.video)}" muted playsinline preload="auto"></video>
      <div class="j4-veu leve"></div>
      <div class="am-trilho"><i class="am-luz"></i><i class="am-pedra"></i></div>
      <p class="am-n"></p>
      <p class="j4-dica">${T.amolarT}<small>${T.amolarK}</small></p>`;
    const v = root.querySelector('video'), tr = root.querySelector('.am-trilho'), pd = root.querySelector('.am-pedra'), luz = root.querySelector('.am-luz'), nn = root.querySelector('.am-n');
    let velM = 0, bpm = o.bpm || 96, pos = 0, guia = 0, ativo = false, vivo = true, tentativas = 0, parado = 0, t0 = performance.now(), ult = performance.now(), seg = false, alvoDedo = null, kdir = 0;
    const DUR = 7.5 + Math.max(0, (bpm - 90) / 20);    // segundos de uma passada inteira
    const aviso = (t, cls) => { nn.textContent = t; nn.className = 'am-n'; void nn.offsetWidth; nn.className = 'am-n on ' + (cls || ''); };
    const volta = (txt) => {
      tentativas++; ativo = false; pos = 0; guia = 0; parado = 0; velM = 0; bpm = Math.min(150, bpm + 3); aviso(txt, 'mal');
      A && A.sfx && A.sfx('pedra-amolar', .9, () => A.hiss(.25, 5200, 2.4, .12)); if (navigator.vibrate) try { navigator.vibrate(60); } catch (e) {}
      root.classList.add('raspa'); setTimeout(() => root.classList.remove('raspa'), 400);
    };
    const desenha = () => {
      pd.style.left = (pos * 100) + '%'; luz.style.left = (guia * 100) + '%'; luz.style.opacity = ativo ? 1 : .35;
      if (v.duration) { try { v.currentTime = pos * (v.duration - .05); } catch (e) {} }
    };
    const fim = () => {
      if (!vivo) return; vivo = false; removeEventListener('keydown', kd, true); removeEventListener('keyup', ku, true);
      bpm = Math.max(72, bpm - 18); aviso(T.amolarOk, 'bem'); root.classList.add('brilho');
      A && A.tone && A.tone(523, 1.4, 'sine', .05);
      setTimeout(() => resolve({ passadas: 1, tentativas, bpm: Math.round(bpm), seg: Math.round((performance.now() - t0) / 1000) }), 1600);
    };
    const laco = (now) => {
      if (!vivo) return; const dt = Math.min(.05, (now - ult) / 1000); ult = now;
      if (kdir) alvoDedo = Math.min(1, (alvoDedo == null ? pos : alvoDedo) + dt / DUR * (1.05 + (bpm > 120 ? (Math.random() - .5) * .9 : 0)));
      if (bot) alvoDedo = ativo ? Math.min(1, guia + .004) : .02;
      if (alvoDedo != null) {
        const novo = Math.max(pos, Math.min(1, alvoDedo));      // a pedra só vai para a frente
        const vel = (novo - pos) / Math.max(dt, .001); velM += (vel - velM) * Math.min(1, dt * 5);
        if (!ativo && novo > .015) { ativo = true; guia = pos; }
        if (ativo) {
          const ritmo = 1 / DUR * (1 + (bpm > 115 ? .25 * Math.sin(now / 340) : 0));
          guia = Math.min(1, guia + ritmo * dt);
          if (novo - guia > .07 || velM > ritmo * 2.6) { volta(T.amolarRapido); alvoDedo = null; desenha(); return requestAnimationFrame(laco); }
          parado = velM < ritmo * .15 ? parado + dt : 0;
          if (parado > .45 || guia - novo > .12) { volta(T.amolarParou); alvoDedo = null; desenha(); return requestAnimationFrame(laco); }
          if ((Math.floor(novo * 9) > Math.floor(pos * 9)) && A && A.hiss) A.hiss(.22, 3000, 1.1, .05);
          pos = novo; if (pos >= .995) { desenha(); return fim(); }
        }
      }
      desenha(); requestAnimationFrame(laco);
    };
    const px = (e) => { const r = tr.getBoundingClientRect(); return (e.clientX - r.left) / r.width; };
    root.addEventListener('pointerdown', (e) => { seg = true; alvoDedo = px(e); root.setPointerCapture && root.setPointerCapture(e.pointerId); });
    root.addEventListener('pointermove', (e) => { if (seg) alvoDedo = px(e); });
    root.addEventListener('pointerup', () => { seg = false; alvoDedo = null; });
    const kd = (e) => { if (e.key === 'ArrowRight' || e.key === ' ') { kdir = 1; e.preventDefault(); } e.stopPropagation(); };
    const ku = (e) => { if (e.key === 'ArrowRight' || e.key === ' ') { kdir = 0; alvoDedo = null; } };
    addEventListener('keydown', kd, true); addEventListener('keyup', ku, true);
    requestAnimationFrame(laco);
  });
}

// ------------------------------------------------------------------ RESPIRAR (o anel: segurar para inspirar, soltar no alto)
function respirar(root, o) {
  const T = TX[o.lang] || TX.en, A = o.A, bot = !!window.__ARENA_BOT;
  return new Promise((resolve) => {
    root.innerHTML = `${o.img ? `<div class="j4-bg" style="background-image:url('${o.img}')"></div>` : ''}<div class="j4-veu"></div>
      <div class="rp-anel"><i class="rp-guia"></i><i class="rp-ar"></i></div>
      <p class="rp-fase"></p>
      <p class="j4-dica">${T.respT}<small>${T.respK}</small></p>`;
    const r = new Respiro(root.querySelector('.rp-anel'), root.querySelector('.rp-fase'), { lang: o.lang, A, bpm: o.bpm, ciclos: o.ciclos || 4, bot });
    const kd = (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) r.segura(); } };
    const ku = (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); r.solta(); } };
    addEventListener('keydown', kd, true); addEventListener('keyup', ku, true);
    root.addEventListener('pointerdown', (e) => { e.preventDefault(); r.segura(); });
    root.addEventListener('pointerup', () => r.solta()); root.addEventListener('pointercancel', () => r.solta());
    r.fim = (res) => { removeEventListener('keydown', kd, true); removeEventListener('keyup', ku, true); setTimeout(() => resolve(res), 900); };
    r.comeca();
  });
}
// O respiro também vive dentro da arena (pausas entre as trocas). Cada ciclo: segurar enquanto o anel abre,
// soltar quando ele chega no alto. Ciclo bom: o coração baixa. O tempo de inspirar encolhe com o medo.
class Respiro {
  constructor(anel, rot, o) { this.anel = anel; this.rot = rot; this.o = o; this.T = TX[o.lang] || TX.en; this.bpm = o.bpm || 96; this.bons = 0; this.k = 0; this.est = 'espera'; this.vivo = true; }
  get dur() { return Math.max(1.1, 2.6 - (this.bpm - 80) / 60); }
  comeca() { this.est = 'espera'; this.t = performance.now(); this.rot.textContent = this.T.respSeg; this.anel.className = 'rp-anel espera'; requestAnimationFrame(() => this.laco()); }
  segura() { if (!this.vivo || this.est !== 'espera') return; this.est = 'inspira'; this.t = performance.now(); this.rot.textContent = this.T.respIn; this.anel.className = 'rp-anel in'; this.o.A && this.o.A.hiss && this.o.A.hiss(this.dur, 700, .8, .05); }
  solta() {
    if (!this.vivo || this.est !== 'inspira') return;
    const f = (performance.now() - this.t) / 1000 / this.dur;
    const bom = f > .8 && f < 1.18;
    this.k++; if (bom) { this.bons++; this.bpm = Math.max(70, this.bpm - 7); } else this.bpm = Math.min(170, this.bpm + 2);
    this.est = 'expira'; this.t = performance.now(); this.rot.textContent = bom ? this.T.respBom : this.T.respCedo; this.anel.className = 'rp-anel out ' + (bom ? 'bom' : 'mal');
    this.o.A && this.o.A.hiss && this.o.A.hiss(this.dur * .9, 400, .7, bom ? .07 : .03);
    if (this.o.aoCiclo) this.o.aoCiclo(bom, this.bpm);
  }
  laco() {
    if (!this.vivo) return;
    const f = (performance.now() - this.t) / 1000 / this.dur;
    this.anel.style.setProperty('--f', this.est === 'inspira' ? Math.min(1.3, f).toFixed(3) : this.est === 'expira' ? Math.max(0, 1 - f).toFixed(3) : '0');
    if (this.est === 'inspira' && f > 1.35) this.solta();
    if (this.o.bot && this.est === 'espera') this.segura();
    if (this.o.bot && this.est === 'inspira' && f > .97) this.solta();
    if (this.est === 'expira' && f > .9) { if (this.k >= this.o.ciclos) return this.acaba(); this.est = 'espera'; this.rot.textContent = this.T.respSeg; this.anel.className = 'rp-anel espera'; }
    requestAnimationFrame(() => this.laco());
  }
  acaba() { this.vivo = false; this.fim && this.fim({ bons: this.bons, ciclos: this.k, bpm: Math.round(this.bpm) }); }
  para() { this.vivo = false; }
}

// ------------------------------------------------------------------ ARQUERIA (soltar entre duas batidas)
// Segurar puxa a corda; arrastar mira. A cada batida do coração, a mira dá um tranco; entre as batidas,
// ela flutua com a respiração. Com a corda toda puxada, o espaldar trava o braço em 1,6 s: a mira cai.
function arqueria(root, o) {
  const T = TX[o.lang] || TX.en, A = o.A, bot = !!window.__ARENA_BOT;
  return new Promise((resolve) => {
    root.innerHTML = `<div class="aq-cena"><div class="aq-bg" style="background-image:url('${o.img}')"></div><canvas class="aq-cv"></canvas></div>
      <div class="fd-mask aq-fenda"><i class="t"></i><i class="b"></i></div>
      <img class="aq-arco" src="${o.arco}" alt="">
      <div class="aq-mira"><i></i></div>
      <p class="aq-n"></p><p class="aq-placar"></p>
      <p class="j4-dica">${T.arqT}<small>${T.arqK}</small></p>`;
    const cena = root.querySelector('.aq-cena'), bg = root.querySelector('.aq-bg'), cv = root.querySelector('.aq-cv'), cx = cv.getContext('2d');
    const arco = root.querySelector('.aq-arco'), mira = root.querySelector('.aq-mira'), nn = root.querySelector('.aq-n'), placar = root.querySelector('.aq-placar');
    const AL = { x: .4994, y: .4835, r: .031 };   // o alvo na imagem (frações da largura)
    const ZOOM = 3.1;
    let W = 0, H = 0, S = 0, bpm = o.bpm || 100, vivo = true, est = 'pronto', tPuxa = 0, tCheio = 0, ox = 0, oy = 0, dedo = null, base = null, flecha = 0;
    const furos = [], res = [];
    let proxBat = performance.now() + 60000 / bpm, tBat = -1e9, tranco = 0, tx = 0, ty = 0;
    const rs = () => {
      W = root.clientWidth; H = root.clientHeight; cv.width = W; cv.height = H; S = Math.max(W, H * 16 / 9) * (H > W ? 2 : ZOOM);
      const aw = Math.max(W * .8, H * 1.1), ah = aw * 941 / 1672;     // a ponta da flecha fica no centro da mira
      arco.style.width = aw + 'px'; arco.style.left = (W / 2 - .507 * aw) + 'px'; arco.style.top = (H * .46 - .355 * ah) + 'px'; arco.style.transformOrigin = '50.7% 35.5%';
    };
    addEventListener('resize', rs); rs();
    const aviso = (t, cls) => { nn.textContent = t; nn.className = 'aq-n'; void nn.offsetWidth; nn.className = 'aq-n on ' + (cls || ''); };
    const pontoDoAlvo = () => ({ x: W / 2 + (-ox) , y: H * .46 + (-oy) });   // onde o centro do alvo aparece
    const posAlvo = () => { const sx = AL.x * S, sy = AL.y * S * 9 / 16; return { left: W / 2 - sx + ox, top: H * .46 - sy + oy }; };
    const desenha = (now) => {
      const p = posAlvo(); bg.style.width = S + 'px'; bg.style.height = (S * 9 / 16) + 'px'; bg.style.transform = `translate(${p.left}px, ${p.top}px)`;
      cx.clearRect(0, 0, W, H);
      for (const f of furos) { const x = p.left + (AL.x * S) + f.dx * AL.r * S, y = p.top + (AL.y * S * 9 / 16) + f.dy * AL.r * S; cx.fillStyle = '#1a120c'; cx.beginPath(); cx.arc(x, y, 3.2, 0, 6.283); cx.fill(); cx.strokeStyle = 'rgba(240,220,180,.9)'; cx.lineWidth = 1.5; cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x - 7, y + 10); cx.stroke(); }
      const puxa = est === 'puxando' || est === 'cheio' ? Math.min(1, (now - tPuxa) / 900) : 0;
      arco.style.transform = `translateY(${(1 - puxa) * 30}%) scale(${1 + puxa * .06}) rotate(${(tx * .01).toFixed(2)}deg)`;
      arco.style.opacity = est === 'cheio' ? .32 : 1;   // com a corda toda puxada, só o alvo existe
      mira.style.opacity = puxa > .9 ? 1 : 0;
      if (flecha) { const k = Math.min(1, (now - flecha) / 260); cx.strokeStyle = `rgba(230,210,170,${1 - k})`; cx.lineWidth = 3 * (1 - k) + .5; cx.beginPath(); cx.moveTo(W / 2, H * .9); cx.lineTo(W / 2, H * .46 + (H * .44) * (1 - k) * .1); cx.stroke(); if (k >= 1) flecha = 0; }
    };
    const solta = () => {
      if (est !== 'cheio') { if (est === 'puxando') { est = 'pronto'; aviso(T.arqFraco, 'mal'); } return; }
      est = 'voando'; flecha = performance.now();
      // onde a flecha cai: o centro do alvo relativo à ponta da flecha, em raios
      const dx = -ox / (AL.r * S), dy = -oy / (AL.r * S);
      const d = Math.hypot(dx, dy);
      const ponto = d <= .26 ? 10 : d <= .45 ? 8 : d <= .71 ? 6 : d <= .87 ? 4 : d <= 1 ? 2 : 0;
      A && A.sfx && A.sfx('golpe-ar', .5, () => A.hiss(.25, 2000, 1.2, .08));
      setTimeout(() => {
        if (ponto) { furos.push({ dx, dy }); A && A.sfx && A.sfx('escudo-impacto-2', .4, () => A.tone(110, .3, 'sine', .2)); }
        res.push(ponto); placar.textContent = res.map((x) => (x ? x : '·')).join('  ');
        aviso(ponto >= 10 ? T.arqCentro : ponto >= 6 ? T.arqBom : ponto ? T.arqBeira : T.arqFora, ponto >= 6 ? 'bem' : 'mal');
        bpm = Math.max(78, Math.min(160, bpm + (ponto >= 8 ? -4 : 6)));
        setTimeout(() => { ox = (Math.random() - .5) * AL.r * S * 2.2; oy = (Math.random() - .5) * AL.r * S * 1.4; est = res.length >= 3 ? 'fim' : 'pronto'; if (est === 'fim') acaba(); }, 1300);
      }, 260);
    };
    const acaba = () => { vivo = false; removeEventListener('keydown', kd, true); removeEventListener('keyup', ku, true); removeEventListener('resize', rs); setTimeout(() => resolve({ flechas: res, total: res.reduce((a, b) => a + b, 0), bpm: Math.round(bpm) }), 900); };
    const puxa = () => { if (est !== 'pronto') return; est = 'puxando'; tPuxa = performance.now(); A && A.hiss && A.hiss(.9, 380, 1.6, .06); };
    const laco = (now) => {
      if (!vivo) return;
      const dt = 1 / 60;
      // o coração: tranco a cada batida
      if (now >= proxBat) { proxBat = now + 60000 / bpm; tBat = now; if (A && A.batida && A.on) A.batida(Math.min(1, (bpm - 70) / 90)); if (navigator.vibrate && est === 'cheio') try { navigator.vibrate(18); } catch (e) {} }
      tranco = Math.exp(-(now - tBat) / 110);
      if (est === 'puxando' && now - tPuxa > 900) { est = 'cheio'; tCheio = now; }
      if (est === 'cheio' || est === 'puxando') {
        const travou = est === 'cheio' && now - tCheio > 1600;
        const amp = AL.r * S * (.08 + (bpm - 70) / 400);
        tx = Math.sin(now / 900) * amp * .6 + Math.sin(now / 370) * amp * .25 + tranco * amp * 2.6 * (Math.random() > .5 ? 1 : -1);
        ty = Math.cos(now / 1100) * amp * .5 + tranco * amp * 2.2 + (travou ? (now - tCheio - 1600) / 6 : 0);
        if (travou && !root._avisouTrava) { root._avisouTrava = 1; aviso(T.arqTrava, 'mal'); }
        if (travou && now - tCheio > 2700) solta();
      } else { tx *= .9; ty *= .9; root._avisouTrava = 0; }
      // a mira do leitor: arrastar move a cena
      if (dedo && base) { ox = base.ox + (dedo.x - base.x) * 1.0; oy = base.oy + (dedo.y - base.y) * 1.0; }
      if (bot && (est === 'cheio' || est === 'puxando')) { ox += (-tx - ox) * .3; oy += (-ty - oy) * .3; if (est === 'cheio' && now - tBat > 300 && proxBat - now > 60 && now - tCheio > 200) solta(); }
      if (bot && est === 'pronto') puxa();
      const oxF = ox + tx, oyF = oy + ty; const sv = [ox, oy]; ox = oxF; oy = oyF; desenha(now); ox = sv[0]; oy = sv[1];
      requestAnimationFrame(laco);
    };
    // a solta usa a posição com o tremor do instante
    const soltaReal = solta; const soltaComTremor = () => { const sv = [ox, oy]; ox += tx; oy += ty; soltaReal(); if (est !== 'voando') { ox = sv[0]; oy = sv[1]; } };
    root.addEventListener('pointerdown', (e) => { e.preventDefault(); dedo = { x: e.clientX, y: e.clientY }; base = { x: e.clientX, y: e.clientY, ox, oy }; puxa(); root.setPointerCapture && root.setPointerCapture(e.pointerId); });
    root.addEventListener('pointermove', (e) => { if (dedo) dedo = { x: e.clientX, y: e.clientY }; });
    root.addEventListener('pointerup', () => { dedo = null; base = null; soltaComTremor(); });
    const keys = {}; const kd = (e) => { if (e.key === ' ') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) puxa(); } const d = { ArrowLeft: [6, 0], ArrowRight: [-6, 0], ArrowUp: [0, 6], ArrowDown: [0, -6] }[e.key]; if (d) { e.preventDefault(); e.stopPropagation(); ox += d[0]; oy += d[1]; } };
    const ku = (e) => { if (e.key === ' ') { e.preventDefault(); soltaComTremor(); } };
    addEventListener('keydown', kd, true); addEventListener('keyup', ku, true);
    ox = (Math.random() - .5) * AL.r * S * 2; oy = (Math.random() - .5) * AL.r * S;
    requestAnimationFrame(laco);
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

window.JOGOS4 = { passos, tenda, amolar, fenda, respirar, arqueria, Respiro };
})();
