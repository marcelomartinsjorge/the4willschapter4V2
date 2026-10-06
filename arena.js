/* ==========================================================================
   A ARENA · os duelos do Torneio Real (Capítulo IV)
   Tempo real, mas de leitura: o adversário avisa com o corpo (e, na chuva,
   com o som) antes de cada golpe. Sem barra de vida: a regra do Torneio é
   que UM golpe limpo decide. O escudo aguenta seis; o coração é o fôlego.
   Joseph ensina a paciência (o 5º golpe sai torto: ainda não; o 6º é o largo).
   Markus tem três fases: chuva fina, chuva forte (o aviso vira som) e os
   treze passos até a pedra da borda. No "um", o passo lateral; ele escorrega;
   o elmo voa (vídeo); um único golpe.
   ========================================================================== */
(() => {
'use strict';
const TX = {
  pt: {
    tJoseph: 'Joseph', sJoseph: 'Semifinal · o primeiro sangue decide',
    tMarkus: 'Markus', sMarkus: 'A final · o primeiro sangue decide',
    regrasJ: [
      ['Ele leva a espada lá atrás', 'golpe pesado', '↑ Escudo, ou ↓ passo lateral no último instante'],
      ['O braço cansa, o golpe sai torto', 'é cedo', 'Ainda não. Espere o próximo'],
      ['O golpe mais largo de todos', 'é agora', '↓ Passo lateral e → Golpear na abertura'],
      ['O coração dispara, o escudo racha', 'o braço treme', 'Segure Respirar entre os golpes: acalma e refaz o escudo'],
    ],
    regrasM: [
      ['A espada sobe por cima do ombro', 'golpe pesado', '↑ Escudo, ou ↓ passo lateral no último instante'],
      ['A espada recua na cintura', 'estocada rápida', '↑ Escudo ou ← Recuar. Nunca o passo lateral'],
      ['O golpe pesado que não vem', 'finta', '↑ Escudo. Quem desvia cedo leva o escudo dele'],
      ['Treze passos do centro até a pedra', 'conte', 'O resto, a arena ensina'],
    ],
    nuncaJ: 'Um golpe limpo decide. Não ataque antes da abertura.',
    nuncaM: 'Ele quase não erra. Leia, aguente, e conte.',
    nervo: 'O coração não para quieto hoje. Cada abertura vai durar menos.',
    comecar: 'Ao círculo', teclado: 'Teclado: ↑ escudo (segurar) · ↓ passo lateral · ← recuar · → golpear · espaço respirar (segurar)',
    botoes: ['Recuar', 'Lateral', 'Escudo', 'Golpear', 'Respirar'],
    cedo: 'Cedo demais.', ainda: 'Ainda não.', aberto: 'Agora!', aparou: 'Escudo', bloqueou: 'Aparado', esquivou: 'Passo lateral', treme: 'O braço treme.',
    perdeu: 'Não pode ser assim.', perdeuSub: 'Falta um golpe. Só um.', denovo: 'Tentar de novo',
    sangue: 'Sangue tirado!', golpear: 'Golpear',
    fase2: 'A chuva engrossa', fase3: 'Treze passos',
    J: {
      b1: 'O primeiro golpe vem alto. Ergo o escudo a tempo, mas o impacto sacode o braço inteiro até o cotovelo.',
      b2: 'Ele não me deixa respirar. O golpe acerta a borda do escudo com força bastante para me tirar um passo do equilíbrio.',
      medo: 'Por um instante, só um, o medo vence a conta. Empurro o pensamento para fora. Não tem espaço para ele agora.',
      pedra: 'Recuo rumo à borda do círculo, onde a areia dá lugar à pedra da arquibancada.',
      b4: 'Os braços já ardem, o suor desce por dentro do elmo e arde nos olhos. Quando ele vai errar?',
      erro: 'Ele erra no quinto golpe. É pequeno, quase nada. O golpe termina um dedo torto, e o pé direito arrasta na areia.',
      espera: 'Não ataco ainda. Deixo ele tentar mais uma vez.',
      largo: 'O sexto golpe é o mais largo de todos. Ele quer terminar ali.',
      lateral: 'Dou um passo para o lado em vez de recuar, e o peso dele o carrega um instante além do que qualquer guarda perdoaria.',
      lateralCedo: 'Ele se recupera. Ainda não é o erro.',
    },
    M: {
      inicio: 'Markus não gira a espada. Ergue o escudo até o queixo e espera.',
      b1: 'O golpe dele não é o mais forte que já recebi. É o mais certo. O escudo inteiro canta.',
      ataque: 'Ele nem recua. Recebe no escudo e devolve antes de eu terminar o gesto.',
      lateral: 'Passo para o lado. Ele não cai para a frente como Joseph. Segura o peso a um palmo do chão. Não há erro para esperar.',
      finta: 'O golpe pesado que não vem. Vem o escudo, na altura do meu peito.',
      misericordia: 'Meu escudo desce. Ele vê. Recua dois passos e espera eu levantar o braço de novo. A arena aplaude ele por isso.',
      chuva: 'A chuva engrossa. A água entra pela fenda do elmo, e já não vejo os pés dele.',
      ouvido: 'Não vejo. Mas ouço. Ar, pelo nariz, duas vezes, curto.',
      descobre: 'Antes do golpe pesado, alguma coisa. Um som, perto do elmo dele. Ar.',
      escorrega: 'O cabo escorrega na manopla molhada.',
      lenco: 'Por baixo da manopla, o lenço bebe a chuva. A mão não escorrega.',
      ombro: 'Abro os pés na largura dos ombros e solto o ombro. Alguém já fez isso por mim, uma mão no ombro, nunca na espada. Não lembro quem.',
      vem: 'Markus muda. Para de esperar. Vem.',
      deixo: 'Cada golpe me empurra um passo para trás. Eu deixo.',
      pedra: 'Atrás de mim, embaixo da lama, está a pedra da borda. Treze passos do centro até ela.',
      cedoPedra: 'Meu pé encontra a pedra antes da hora e escorrega.',
      calcanhar: 'O calcanhar toca a pedra. Daqui não recuo mais. Aguento.',
      um: 'Passo para o lado no último instante, e o pé dele, pesado, com pressa, desce onde o meu estaria. Na pedra molhada.',
      cai: 'Ele golpeia caindo, sem ver, só com o braço.',
      correia: 'O aço pega o meu elmo de lado. A correia gasta estala.',
      voa: 'O elmo voa.',
      rosto: 'A chuva bate no meu rosto pela primeira vez em três dias.',
      corte: 'A ponta da minha espada abre um corte fino no braço dele, embaixo da ombreira, onde a placa não alcança.',
    },
    nums: ['Um.', 'Dois.', 'Três.', 'Quatro.', 'Cinco.', 'Seis.', 'Sete.', 'Oito.', 'Nove.', 'Dez.', 'Onze.', 'Doze.', 'Treze.'],
  },
  en: {
    tJoseph: 'Joseph', sJoseph: 'Semifinal · first blood decides',
    tMarkus: 'Markus', sMarkus: 'The final · first blood decides',
    regrasJ: [
      ['He draws the sword far back', 'heavy blow', '↑ Shield, or ↓ sidestep at the last instant'],
      ['His arm tires, the blow goes crooked', 'too soon', 'Not yet. Wait for the next one'],
      ['The widest blow of all', 'now', '↓ Sidestep, then → Strike into the opening'],
      ['Your heart races, the shield cracks', 'your arm shakes', 'Hold Breathe between blows: it calms you and mends the shield'],
    ],
    regrasM: [
      ['The sword rises over his shoulder', 'heavy blow', '↑ Shield, or ↓ sidestep at the last instant'],
      ['The sword draws back at his hip', 'quick thrust', '↑ Shield or ← Step back. Never the sidestep'],
      ['The heavy blow that never comes', 'feint', '↑ Shield. Sidestep early and you eat his shield'],
      ['Thirteen steps from the centre to the stone', 'count', 'The arena will teach you the rest'],
    ],
    nuncaJ: 'One clean blow decides. Never strike before the opening.',
    nuncaM: 'He hardly ever errs. Read, endure, and count.',
    nervo: 'Your heart won’t keep still today. Every opening will be shorter.',
    comecar: 'To the circle', teclado: 'Keyboard: ↑ shield (hold) · ↓ sidestep · ← step back · → strike · space breathe (hold)',
    botoes: ['Step back', 'Sidestep', 'Shield', 'Strike', 'Breathe'],
    cedo: 'Too soon.', ainda: 'Not yet.', aberto: 'Now!', aparou: 'Shield', bloqueou: 'Blocked', esquivou: 'Sidestep', treme: 'My arm shakes.',
    perdeu: 'It can’t end like this.', perdeuSub: 'One blow left. Just one.', denovo: 'Try again',
    sangue: 'First blood!', golpear: 'Strike',
    fase2: 'The rain thickens', fase3: 'Thirteen steps',
    J: {
      b1: 'The first blow comes high. I raise the shield in time, but the impact shakes my whole arm to the elbow.',
      b2: 'He won’t let me breathe. The blow hits the rim of my shield hard enough to knock me a step off balance.',
      medo: 'For an instant, just one, the fear wins over the count. I push the thought out. There’s no room for it now.',
      pedra: 'I fall back toward the edge of the circle, where the sand gives way to the stone of the stands.',
      b4: 'My arms already burn, the sweat runs inside the helmet and stings my eyes. When is he going to miss?',
      erro: 'He misses on the fifth blow. It’s small, almost nothing. The blow ends a finger crooked, and his right foot drags in the sand.',
      espera: 'I don’t attack yet. I let him try once more.',
      largo: 'The sixth blow is the widest of all. He wants to end it here.',
      lateral: 'I step to the side instead of back, and his weight carries him an instant past what any guard would forgive.',
      lateralCedo: 'He recovers. It isn’t the mistake yet.',
    },
    M: {
      inicio: 'Markus doesn’t spin his sword. He raises his shield to his chin and waits.',
      b1: 'His blow isn’t the strongest I’ve ever taken. It’s the surest. The whole shield sings.',
      ataque: 'He doesn’t even step back. He takes it on the shield and returns it before I finish the motion.',
      lateral: 'I step aside. He doesn’t pitch forward like Joseph. He holds his weight a hand above the ground. There’s no mistake to wait for.',
      finta: 'The heavy blow that never comes. His shield comes instead, at the height of my chest.',
      misericordia: 'My shield drops. He sees it. He steps back two paces and waits for me to raise my arm again. The arena applauds him for it.',
      chuva: 'The rain thickens. Water gets in through the slit of the helmet, and I can’t see his feet anymore.',
      ouvido: 'I can’t see. But I can hear. Air, through the nose, twice, short.',
      descobre: 'Before the heavy blow, something. A sound, near his helmet. Air.',
      escorrega: 'The grip slips in my wet gauntlet.',
      lenco: 'Under the gauntlet, the handkerchief drinks the rain. My hand doesn’t slip.',
      ombro: 'I set my feet shoulder-width apart and loosen my shoulder. Someone did that for me once, a hand on my shoulder, never on the sword. I don’t remember who.',
      vem: 'Markus changes. He stops waiting. He comes.',
      deixo: 'Every blow pushes me a step back. I let it.',
      pedra: 'Behind me, under the mud, is the stone of the edge. Thirteen steps from the centre to it.',
      cedoPedra: 'My foot finds the stone too soon and slips.',
      calcanhar: 'My heel touches the stone. I give no more ground. I hold.',
      um: 'I step aside at the last instant, and his foot, heavy, in a hurry, comes down where mine would have been. On the wet stone.',
      cai: 'He swings as he falls, blind, all arm.',
      correia: 'The steel catches my helmet on the side. The worn strap snaps.',
      voa: 'The helmet flies.',
      rosto: 'The rain hits my face for the first time in three days.',
      corte: 'The point of my sword opens a thin cut in his arm, under the pauldron, where the plate doesn’t reach.',
    },
    nums: ['One.', 'Two.', 'Three.', 'Four.', 'Five.', 'Six.', 'Seven.', 'Eight.', 'Nine.', 'Ten.', 'Eleven.', 'Twelve.', 'Thirteen.'],
  },
};

// ------------------------------------------------------------------ poses (recortadas do fundo verde: assets/images/arena)
const META = window.ARENA_META || {};
const POSES = {
  laus: ['guarda', 'escudo', 'impacto', 'lateral', 'recuar', 'golpe', 'respirar', 'cansado', 'atingido', 'escorrega', 'vitoria'],
  joseph: ['guarda', 'aviso', 'golpe', 'erro', 'aviso-largo', 'desequilibrado', 'atingido', 'cansado'],
  markus: ['guarda', 'aviso-pesado', 'golpe-pesado', 'aviso-estocada', 'estocada', 'finta', 'escudo', 'recupera', 'espera', 'avanca', 'escorrega', 'atingido', 'vitoria-dele'],
};
const IMG = {};
function carrega(quem) {
  return Promise.all(POSES[quem].map((p) => new Promise((res) => {
    const n = quem + '-' + p; if (IMG[n]) return res(true);
    const im = new Image(); im.decoding = 'async'; im.onload = () => { IMG[n] = im; res(true); }; im.onerror = () => res(false);
    im.src = 'assets/images/arena/' + n + '.webp';
  })));
}
// altura em pé de cada um, relativa a Laus (ela é a menor de todos)
const ALTURA = { laus: 1, joseph: 1.07, markus: 1.13 };
const REF = { laus: 'guarda', joseph: 'guarda', markus: 'guarda' };

class Lutador {
  constructor(quem, lado) { this.quem = quem; this.lado = lado; this.pose = 'guarda'; this.de = 'guarda'; this.t0 = 0; this.dur = 1; this.dx = 0; this.alvoDx = 0; this.prof = 0; this.alvoProf = 0; this.alfa = 1; this.treme = 0; }
  vai(pose, dur, agora) { if (pose === this.pose) return; this.de = this.pose; this.pose = pose; this.t0 = agora; this.dur = dur || 160; }
}

// ------------------------------------------------------------------ trilha (sintetizada): tambores graves e um zumbido; acelera por fase
function trilha(A) {
  const nada = { fase() {}, corta() {}, volta() {}, para() {} };
  if (!A || !A.ctx || !A.master || !A.noise) return nada;
  const ctx = A.ctx, out = ctx.createGain(); out.gain.value = 0; out.connect(A.master);
  out.gain.setTargetAtTime(.7, ctx.currentTime, 1.5);
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 280; lp.connect(out);
  const dg = ctx.createGain(); dg.gain.value = .04; dg.connect(lp);
  const oscs = [49, 49.3, 73.4].map((f, i) => { const o = ctx.createOscillator(); o.type = i < 2 ? 'sawtooth' : 'triangle'; o.frequency.value = f; o.connect(dg); o.start(); return o; });
  const ruido = (t, v, freq, tipo, dur) => { const n = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(); n.buffer = A.noise; f.type = tipo; f.frequency.value = freq; g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + dur); n.connect(f); f.connect(g); g.connect(out); n.start(t); n.stop(t + dur + .02); };
  const tambor = (t, v, f0, f1, dur) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur * .4); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + dur); o.connect(g); g.connect(out); o.start(t); o.stop(t + dur + .02); };
  const PAD = [{ k: [0, 4], t: [], a: [] }, { k: [0, 3, 4], t: [6], a: [2, 6] }, { k: [0, 3, 4, 6], t: [2, 7], a: [1, 3, 5, 7] }];
  let bpm = 66, nivel = 0, prox = ctx.currentTime + .4, passo = 0, vivo = true;
  const id = setInterval(() => {
    if (!vivo) return; const dt = 60 / bpm / 2;
    while (prox < ctx.currentTime + .3) { const p = PAD[Math.min(nivel, 2)], s = passo % 8;
      if (p.k.includes(s)) { tambor(prox, s === 0 ? .55 : .36, 105, 38, .5); ruido(prox, .14, 900, 'lowpass', .08); }
      if (p.t.includes(s)) tambor(prox, .22, 165, 92, .32);
      if (p.a.includes(s)) ruido(prox, .04, 2600, 'bandpass', .05);
      prox += dt; passo++; }
  }, 50);
  return {
    fase(n) { nivel = Math.max(0, Math.min(2, n - 1)); bpm = [66, 80, 96][nivel]; dg.gain.setTargetAtTime(.04 + nivel * .02, ctx.currentTime, .8); },
    corta() { out.gain.setTargetAtTime(.12, ctx.currentTime, .3); }, volta() { out.gain.setTargetAtTime(.7, ctx.currentTime, .3); },
    para() { if (!vivo) return; vivo = false; clearInterval(id); out.gain.setTargetAtTime(0, ctx.currentTime, .6); setTimeout(() => { try { oscs.forEach((o) => o.stop()); out.disconnect(); } catch (e) {} }, 2500); },
  };
}

// ------------------------------------------------------------------ o jogo
function start(root, opts) {
  const T = TX[opts.lang] || TX.en, A = opts.A, Q = opts.quem; // 'joseph' | 'markus'
  const isM = Q === 'markus', TQ = isM ? T.M : T.J;
  const bot = !!window.__ARENA_BOT;
  return new Promise((resolve) => {
    const regras = isM ? T.regrasM : T.regrasJ;
    root.innerHTML = `
      <div class="ar-bg" style="background-image:url('${opts.fundo}')"></div>
      <div class="ar-bg chuva" style="background-image:url('${opts.fundoChuva || opts.fundo}')"></div>
      <canvas class="ar-cv"></canvas>
      <div class="ar-hud"><span class="ar-cor" title=""></span><span class="ar-esc"></span><span class="ar-conta"></span></div>
      <p class="ar-leg"></p>
      <div class="ar-anuncio"></div>
      <div class="ar-botoes">${T.botoes.map((b, i) => `<button data-a="${['recuar', 'lateral', 'escudo', 'golpe', 'respirar'][i]}"><i>${['←', '↓', '↑', '→', '␣'][i]}</i>${b}</button>`).join('')}</div>
      <div class="ar-tela on">
        <h2>${isM ? T.tMarkus : T.tJoseph}</h2><p class="ar-sub">${isM ? T.sMarkus : T.sJoseph}</p>
        <ul class="ar-regras">${regras.map((r) => `<li><span>${r[0]}</span><small>${r[1]}</small><b>${r[2]}</b></li>`).join('')}</ul>
        <p class="ar-nunca">${isM ? T.nuncaM : T.nuncaJ}</p>${(opts.bpm || 0) >= 120 ? `<p class="ar-nervo">${T.nervo}</p>` : ''}
        <button class="cta ar-go">${T.comecar}</button>
        <p class="ar-teclado">${T.teclado}</p>
      </div>
      <div class="ar-video"><video playsinline muted></video><p class="ar-vleg"></p><button class="ar-golpear">${T.golpear}</button></div>`;
    const cv = root.querySelector('.ar-cv'), cx = cv.getContext('2d');
    const leg = root.querySelector('.ar-leg'), anuncio = root.querySelector('.ar-anuncio');
    const hudCor = root.querySelector('.ar-cor'), hudEsc = root.querySelector('.ar-esc'), hudConta = root.querySelector('.ar-conta');
    let W = 0, H = 0, DPR = 1;
    const rs = () => { DPR = Math.min(devicePixelRatio || 1, 2); W = root.clientWidth; H = root.clientHeight; cv.width = W * DPR; cv.height = H * DPR; cx.setTransform(DPR, 0, 0, DPR, 0, 0); };
    addEventListener('resize', rs); rs();

    // ---------- estado
    const ESC_MAX = 6;
    const S = { leituras: 0, laterais: 0, fintasLidas: 0, escudosPerdidos: 0, misericordia: 0, contagemUm: false, esperouErro: false, cedo: 0, bpmSoma: 0, bpmN: 0, tentativa: opts.tentativas || 0 };
    let esc = ESC_MAX, bpm = opts.bpm || 96, passos = 13, fase = 1, trocas = 0, golpeN = 0;
    const eu = new Lutador('laus', 1), ele = new Lutador(Q, -1);
    let agora = 0, ultimo = performance.now(), vivo = true, rodando = false, fim = false, slow = 1;
    let est = 'pronto', tEst = 0, atk = null, resp = null, proxima = 0, segEscudo = false, segResp = false, abertura = 0;
    const ja = {}; // legendas que só aparecem uma vez
    const parts = [], gotas = [], flashes = [];
    let chuva = isM ? .25 : 0, chuvaAlvo = chuva, poseTint = 0;
    let tResp = 0; let misericordiaUsada = false, ombroUsado = false, ouviuAviso = !!opts.sabeAviso, avisoMostrado = false;
    let musica = null;

    const legenda = (t, ms = 3600) => { leg.textContent = t; leg.classList.remove('on'); void leg.offsetWidth; leg.classList.add('on'); clearTimeout(legenda.t); legenda.t = setTimeout(() => leg.classList.remove('on'), ms); };
    const umaVez = (k, t, ms) => { if (ja[k]) return false; ja[k] = 1; legenda(t, ms); return true; };
    const anuncia = (t, cls = '') => { anuncio.className = 'ar-anuncio ' + cls; anuncio.textContent = t; void anuncio.offsetWidth; anuncio.classList.add('on'); };
    const hud = () => {
      hudEsc.innerHTML = Array.from({ length: ESC_MAX }, (_, i) => `<i class="${i < esc ? 'on' : ''}"></i>`).join('');
      hudEsc.className = 'ar-esc' + (esc <= 2 ? ' baixo' : '');
      hudConta.textContent = fase === 3 ? String(passos) : ''; hudConta.classList.toggle('on', fase === 3);
    };
    hud();
    const sfx = (n, v = .7, res) => A && A.sfx(n, v, res);
    const voz = (n, ms = 0) => { if (!A || !A.ctx || !A.on) return; setTimeout(() => A.once && A.vozAbafada ? A.vozAbafada('assets/audio/voz/' + n + '.mp3') : A.once('assets/audio/voz/' + n + '.mp3', 1), ms); };
    const som = {
      bloqueio(forte) { sfx(forte ? 'escudo-impacto-1' : 'escudo-impacto-2', .8, () => { A.tone(140, .3, 'triangle', .14); A.hiss(.2, 1800, 2, .14); }); },
      bash() { sfx('espada-escudo-bash', .85, () => A.tone(90, .35, 'sine', .25)); },
      vento() { sfx('golpe-ar', .6, () => A.hiss(.3, 1200, .9, .1)); },
      passo() { sfx(chuva > .5 ? 'passo-lama' : 'passo-areia', .45, () => A.hiss(.12, 160, .6, .14, 0, 'lowpass')); },
      ar() { sfx('respira-nariz', .9, () => { A.hiss(.12, 900, 1.5, .12); A.hiss(.12, 900, 1.5, .12, .22); }); },
      corte() { sfx('corte', .9, () => A.tone(196, .7, 'sine', .1)); },
      dor() { sfx('escudo-impacto-1', .6); A.tone && A.tone(70, .5, 'sine', .25, 0, .6); },
      rugido() { sfx('rugido', .75); }, suspiro() { sfx('suspiro-multidao', .7); },
      escorrega() { sfx('escorrega-pedra', .9); },
    };

    // ---------- coração (o fôlego dela)
    const fatorAbertura = () => 1 - Math.min(.35, Math.max(0, (bpm - 140) / 100));
    const mudaBpm = (d) => { bpm = Math.max(70, Math.min(190, bpm + d)); };
    let batT = 0;
    const bate = () => { // batida que o leitor ouve dentro do elmo
      if (!vivo) return;
      if (A && A.ctx && A.on && rodando) A.batida && A.batida(Math.min(1, Math.max(.15, (bpm - 80) / 90)));
      hudCor.classList.remove('b'); void hudCor.offsetWidth; hudCor.classList.add('b');
      root.style.setProperty('--aperto', Math.min(1, Math.max(0, (bpm - 100) / 80)).toFixed(3));
      batT = setTimeout(bate, 60000 / bpm);
    };

    // ---------- desenho
    const chao = () => H * .86;
    const escala = () => Math.min(H * .44, W * .52) / ((META['laus-' + REF.laus] || { alt: 600 }).alt);
    const posX = () => { // Laus fica à esquerda do centro; na fase 3 a câmera deixa a pedra entrar pela esquerda
      const meio = W * .5, dist = Math.min(W * .3, H * .42);
      return { eu: meio - dist * .55, ele: meio + dist * .55, pedra: meio - dist * .55 - (passos + .5) * Math.min(W * .055, 46) };
    };
    function desenhaLut(l, x, k) {
      const m = META[l.quem + '-' + l.pose], im = IMG[l.quem + '-' + l.pose];
      const t = Math.min(1, (agora - l.t0) / l.dur);
      const uma = (pose, alfa) => {
        const mm = META[l.quem + '-' + pose], ii = IMG[l.quem + '-' + pose]; if (!mm || !ii || alfa <= .01) return;
        const s = k * (1 - l.prof * .06), bob = (pose === 'guarda' || pose === 'respirar' || pose === 'cansado' || pose === 'espera') ? 1 + .006 * Math.sin(agora / 360 + (l.lado > 0 ? 0 : 1.7)) : 1;
        const w = mm.w * s, h = mm.h * s * bob, dx = x + l.dx - mm.ax * s + (l.treme ? (Math.random() - .5) * l.treme : 0), dy = chao() - mm.base * s * bob - l.prof * 6;
        cx.globalAlpha = alfa * l.alfa; cx.drawImage(ii, dx, dy, w, h);
      };
      if (!m || !im) return;
      cx.save();
      cx.filter = l.prof > .3 ? 'brightness(.82)' : 'none';
      if (l.de !== l.pose && t < 1) uma(l.de, Math.max(0, 1 - t * 2.2));
      uma(l.pose, l.de !== l.pose ? Math.min(1, t * 1.8) : 1);
      cx.restore();
    }
    function desenha(dt) {
      cx.clearRect(0, 0, W, H);
      const P = posX(), kL = escala();
      // a pedra da borda (só aparece quando ela recua o bastante)
      if (P.pedra > -60) {
        const g = cx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(0,0,0,0)');
        cx.fillStyle = chuva > .5 ? 'rgba(196,204,214,.92)' : 'rgba(214,208,196,.92)';
        cx.fillRect(P.pedra - 300, chao() - 10, 300, 22);
        cx.fillStyle = chuva > .5 ? 'rgba(235,242,250,.55)' : 'rgba(255,255,255,.25)'; cx.fillRect(P.pedra - 300, chao() - 10, 300, 3);
        cx.fillStyle = 'rgba(0,0,0,.35)'; cx.fillRect(P.pedra - 4, chao() - 10, 4, 22);
      }
      // sombras de contato
      const sombra = (x, r) => { const g = cx.createRadialGradient(x, chao(), 2, x, chao(), r); g.addColorStop(0, 'rgba(0,0,0,.45)'); g.addColorStop(1, 'rgba(0,0,0,0)'); cx.fillStyle = g; cx.beginPath(); cx.ellipse(x, chao(), r, r * .16, 0, 0, 6.283); cx.fill(); };
      sombra(P.eu + eu.dx, kL * 260); sombra(P.ele + ele.dx, kL * 300);
      // véu da chuva sobre o aviso (fase 2): o corpo dele fica turvo durante o aviso
      eu.dx += (eu.alvoDx - eu.dx) * Math.min(1, dt * 12); ele.dx += (ele.alvoDx - ele.dx) * Math.min(1, dt * 10);
      eu.prof += (eu.alvoProf - eu.prof) * Math.min(1, dt * 14);
      const kE = kL * ALTURA[Q] * (META['laus-' + REF.laus].alt / (META[Q + '-' + REF[Q]] || { alt: 600 }).alt);
      const kEu = kL;
      if (fase === 2 && est === 'aviso' && atk && !avisoVisivel()) { cx.save(); cx.filter = 'blur(6px)'; ele.alfa = .55; desenhaLut(ele, P.ele, kE); cx.restore(); ele.alfa = 1; }
      else desenhaLut(ele, P.ele, kE);
      desenhaLut(eu, P.eu, kEu);
      // anel de leitura (dica) sobre o elmo dele
      if (atk && est === 'aviso' && (atk.dica || (isM && fase >= 2 && atk.tipo === 'pesado' && ouviuAviso && !avisoMostrado))) {
        const r = 18 + 8 * Math.sin(agora / 90), x = P.ele + ele.dx - kE * 40, y = chao() - kE * (META[Q + '-guarda'].alt * .92);
        cx.strokeStyle = 'rgba(255,226,170,.8)'; cx.lineWidth = 2; cx.beginPath(); cx.arc(x, y, r, 0, 6.283); cx.stroke();
      }
      // a abertura
      if (est === 'abertura') {
        const x = P.ele + ele.dx - kE * 30, y = chao() - kE * 260, r = 26 + 10 * Math.sin(agora / 70);
        const g = cx.createRadialGradient(x, y, 2, x, y, r * 2); g.addColorStop(0, 'rgba(255,214,150,.55)'); g.addColorStop(1, 'rgba(255,214,150,0)'); cx.fillStyle = g; cx.beginPath(); cx.arc(x, y, r * 2, 0, 6.283); cx.fill();
      }
      // partículas (areia, lama, faíscas)
      for (let i = parts.length - 1; i >= 0; i--) { const q = parts[i], a = (agora - q.t) / q.vida; if (a >= 1) { parts.splice(i, 1); continue; } q.x += q.vx * dt; q.y += q.vy * dt; q.vy += 160 * dt; cx.globalAlpha = q.a * (1 - a); cx.fillStyle = `rgb(${q.cor})`; cx.beginPath(); cx.arc(q.x, q.y, q.r, 0, 6.283); cx.fill(); }
      cx.globalAlpha = 1;
      // chuva
      chuva += (chuvaAlvo - chuva) * Math.min(1, dt * .8);
      const n = Math.round(chuva * (W < 700 ? 110 : 220));
      while (gotas.length < n) gotas.push({ x: Math.random() * W * 1.2, y: Math.random() * H, v: 900 + Math.random() * 500, l: 10 + Math.random() * 18 });
      if (gotas.length > n) gotas.length = n;
      cx.strokeStyle = 'rgba(210,222,236,.32)'; cx.lineWidth = 1; cx.beginPath();
      for (const g of gotas) { g.y += g.v * dt * slow; g.x -= g.v * .12 * dt * slow; if (g.y > H) { g.y = -20; g.x = Math.random() * W * 1.2; } cx.moveTo(g.x, g.y); cx.lineTo(g.x + g.l * .12, g.y - g.l); }
      cx.stroke();
      // flashes
      for (let i = flashes.length - 1; i >= 0; i--) { const f = flashes[i], a = (agora - f.t) / f.d; if (a >= 1) { flashes.splice(i, 1); continue; } cx.fillStyle = `rgba(${f.cor},${(1 - a) * f.a})`; cx.fillRect(0, 0, W, H); }
      // a fenda do elmo: bordas escuras que apertam com o coração
      const ap = Math.min(1, Math.max(0, (bpm - 95) / 85));
      const vg = cx.createRadialGradient(W / 2, H * .55, Math.min(W, H) * (.62 - ap * .2), W / 2, H * .55, Math.max(W, H) * .78);
      vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(8,4,4,${.45 + ap * .4})`); cx.fillStyle = vg; cx.fillRect(0, 0, W, H);
    }
    const poeira = (x, y, n = 10, cor = '214,200,170') => { for (let i = 0; i < n; i++) parts.push({ x, y, vx: (Math.random() - .5) * 140, vy: -Math.random() * 120 - 20, r: 1 + Math.random() * 2.4, a: .7, cor: chuva > .5 ? '120,110,96' : cor, vida: 700 + Math.random() * 500, t: agora }); };
    const faisca = (x, y) => { for (let i = 0; i < 12; i++) parts.push({ x, y, vx: (Math.random() - .5) * 420, vy: -Math.random() * 260, r: .8 + Math.random() * 1.4, a: 1, cor: '255,226,170', vida: 380 + Math.random() * 260, t: agora }); };
    const flash = (cor = '255,240,215', a = .3, d = 220) => flashes.push({ cor, a, d, t: agora });
    const pontoChoque = () => { const P = posX(); return { x: (P.eu + P.ele) / 2, y: chao() - escala() * 520 }; };

    // ---------- o adversário
    const avisoVisivel = () => !atk || (agora - tEst) > atk.tell * .62;   // na chuva forte, o corpo só aparece no fim do aviso
    function escolheAtaque() {
      if (!isM) {
        golpeN++;
        if (golpeN === 5) return { tipo: 'erro', tell: 1000, poseT: 'aviso', poseG: 'erro', lateral: false };
        if (golpeN >= 6) return { tipo: 'largo', tell: 1300, poseT: 'aviso-largo', poseG: 'golpe', lateral: true, abre: true, dica: !ja.largoDica };
        return { tipo: 'pesado', tell: 1000 - golpeN * 30, poseT: 'aviso', poseG: 'golpe', lateral: true, dica: golpeN === 1 };
      }
      const r = Math.random();
      if (fase === 3) return r < (passos <= 2 ? .85 : .62) ? { tipo: 'pesado', tell: 780, poseT: 'aviso-pesado', poseG: 'golpe-pesado', lateral: true } : { tipo: 'estocada', tell: 520, poseT: 'aviso-estocada', poseG: 'estocada' };
      if (trocas >= 3 && r < .17) return { tipo: 'finta', tell: 900, poseT: 'finta', poseG: 'escudo', bash: true };
      if (r < .6) return { tipo: 'pesado', tell: 900, poseT: 'aviso-pesado', poseG: 'golpe-pesado', lateral: true, dica: trocas === 0 };
      return { tipo: 'estocada', tell: 560, poseT: 'aviso-estocada', poseG: 'estocada', dica: !ja.estocadaDica };
    }
    function agenda(ms) { est = 'guarda'; tEst = agora; proxima = agora + ms; atk = null; resp = null; }
    function iniciaAtaque() {
      atk = escolheAtaque(); resp = null; est = 'aviso'; tEst = agora;
      const tell = atk.tell * (bpm > 150 ? .92 : 1);
      atk.tell = tell; ele.vai(atk.poseT, Math.min(260, tell * .3), agora); som.passo();
      if (atk.tipo === 'largo') ja.largoDica = 1;
      if (atk.tipo === 'estocada') ja.estocadaDica = 1;
      if (isM && fase >= 2) { // na chuva, o aviso vira som
        if (atk.tipo === 'pesado') { som.ar(); if (!ouviuAviso && !ja.descobre && trocas > 7) { ja.descobre = 1; setTimeout(() => legenda(TQ.descobre, 3600), 200); ouviuAviso = true; } else if (ouviuAviso && !avisoMostrado && !ja.ouvido) { ja.ouvido = 1; legenda(TQ.ouvido, 3600); setTimeout(() => { avisoMostrado = true; }, tell); } }
        if (atk.tipo === 'estocada') sfx('passo-lama', .8);
      }
      if (atk.tipo === 'erro' && !ja.erroLeg) { /* a legenda vem no impacto */ }
      if (atk.tipo === 'largo') legenda(TQ.largo, 2600);
    }
    function impacto() {
      est = 'golpe'; tEst = agora; ele.vai(atk.poseG, 120, agora); ele.alvoDx = -Math.min(W * .05, 46);
      const P = pontoChoque();
      const r = resp || {};
      // passo lateral na hora certa
      if (r.tipo === 'lateral' && r.certo) {
        S.leituras++; S.laterais++; som.vento(); eu.alvoProf = 1; eu.vai('lateral', 120, agora);
        if (!isM && atk.abre) return abre(1100);
        if (isM && fase === 3) {
          if (passos <= 1) return queda();
          legenda(T.ainda, 1600); return volta(500);
        }
        if (isM) { if (!ja.mLateral) { ja.mLateral = 1; legenda(TQ.lateral, 4200); } return abre(320, true); }
        if (!ja.lateralCedo) { ja.lateralCedo = 1; legenda(TQ.lateralCedo, 2400); }
        return volta(520);
      }
      // finta: escudo dele no peito
      if (atk.bash) {
        if (r.tipo === 'lateral') { esc -= 2; S.escudosPerdidos += 2; som.bash(); flash('255,255,255', .2); eu.vai('impacto', 90, agora); poeira(P.x, chao()); umaVez('finta', TQ.finta, 3200); mudaBpm(12); hud(); return checa(600); }
        if (segEscudo || (bot && r.tipo === 'escudo')) { S.leituras++; S.fintasLidas++; som.bash(); eu.vai('escudo', 90, agora); mudaBpm(5); return volta(600); }
        esc -= 1; S.escudosPerdidos++; som.bash(); eu.vai('impacto', 90, agora); mudaBpm(8); hud(); return checa(600);
      }
      // recuo
      if (r.tipo === 'recuar') {
        S.leituras++; som.vento(); eu.vai('recuar', 120, agora);
        if (isM && fase === 3) return recuaPasso();
        if (!isM) empurra();
        eu.alvoDx = -Math.min(W * .03, 26); setTimeout(() => { eu.alvoDx = 0; }, 700);
        if (atk.tipo === 'erro') return erroPassou();
        return volta(560);
      }
      // escudo
      if (segEscudo || (bot && r.tipo === 'escudo')) {
        if (bpm > 170 && Math.random() < .25) { legenda(T.treme, 1500); return pancada(P); }
        const escorrega = isM && fase >= 2 && !opts.lencoCabo && Math.random() < .1;
        esc -= escorrega ? 2 : 1; S.leituras++; if (escorrega) { S.escudosPerdidos++; umaVez('escorrega', TQ.escorrega, 2600); }
        som.bloqueio(atk.tipo !== 'estocada'); faisca(P.x, P.y); eu.vai('escudo', 80, agora); setTimeout(() => !fim && eu.vai(segEscudo ? 'escudo' : 'guarda', 260, agora), 260);
        mudaBpm(atk.tipo === 'largo' ? 8 : 6); poeira(P.x - 20, chao(), 6);
        trocasLegenda();
        if (isM && fase >= 2 && opts.lencoCabo && !ja.lenco && trocas > 6) { ja.lenco = 1; setTimeout(() => legenda(TQ.lenco, 3200), 400); }
        hud();
        if (isM && fase === 3) { if (checaSemFim()) return; if (passos <= 1) { umaVez('calcanhar', TQ.calcanhar, 2600); return volta(420); } return recuaPasso(true); }
        if (!isM) empurra();
        if (atk.tipo === 'erro') return erroPassou();
        return checa(560);
      }
      return pancada(P);
    }
    function empurra() { if (passos > 2) passos--; if (passos === 9) setTimeout(() => umaVez('pedra', TQ.pedra, 3600), 3500); }
    function trocasLegenda() {
      const k = S.leituras;
      if (!isM) { if (k === 1) legenda(TQ.b1, 3400); else if (k === 2) legenda(TQ.b2, 3400); else if (k === 4) legenda(TQ.b4, 3400); }
      else if (k === 1) legenda(TQ.b1, 3200);
    }
    function pancada(P) { // o golpe chega no aço
      esc -= 2; S.escudosPerdidos += 2; som.dor(); flash('120,20,20', .25, 300); eu.vai('atingido', 90, agora); eu.alvoDx = -22; setTimeout(() => { eu.alvoDx = 0; }, 500);
      poeira(P.x, chao(), 12); mudaBpm(12); hud();
      if (atk && atk.tipo === 'erro') return erroPassou();
      return checa(700);
    }
    function checaSemFim() { if (esc > 0) return false; checa(600); return true; }
    function checa(ms) {
      if (esc <= 0) {
        if (isM && !misericordiaUsada) { // Markus espera
          misericordiaUsada = true; S.misericordia = 1; ele.vai('espera', 300, agora); ele.alvoDx = Math.min(W * .06, 60);
          legenda(TQ.misericordia, 4600); sfx('rugido', .5); est = 'espera'; tEst = agora;
          setTimeout(() => { if (fim) return; esc = 3; hud(); ele.alvoDx = 0; ele.vai('guarda', 400, agora); agenda(900); }, 2600);
          return;
        }
        return derrota();
      }
      if (isM && esc <= 2 && !ombroUsado && opts.ombro) { ombroUsado = true; esc++; hud(); setTimeout(() => legenda(TQ.ombro, 5200), 500); }
      return volta(ms);
    }
    function volta(ms) { est = 'recupera'; tEst = agora; trocas++; setTimeout(() => { if (fim) return; ele.alvoDx = 0; ele.vai(isM && fase === 3 ? 'avanca' : 'guarda', 260, agora); if (!segEscudo && !segResp) eu.vai('guarda', 260, agora); eu.alvoProf = 0; mudaFase(); agenda(gap()); }, ms); est = 'recupera'; }
    function gap() { if (!isM) return 1000 + Math.random() * 500; if (fase === 3) return 380 + Math.random() * 220; if (fase === 2) return 900 + Math.random() * 500; return 1100 + Math.random() * 600; }
    function erroPassou() { // o 5º golpe passou e ela não atacou: paciência
      if (!ja.erroLeg) { ja.erroLeg = 1; legenda(TQ.erro, 4200); setTimeout(() => !fim && legenda(TQ.espera, 2600), 4300); S.esperouErro = true; }
      ele.vai('erro', 120, agora); est = 'erro'; tEst = agora;
      setTimeout(() => { if (fim || est !== 'erro') return; ele.vai('guarda', 360, agora); agenda(1200); }, 1100);
    }
    function abre(ms, micro) {
      est = 'abertura'; tEst = agora; abertura = ms * fatorAbertura(); ele.vai(isM ? 'recupera' : 'desequilibrado', 180, agora); ele.alvoDx = -Math.min(W * .07, 60);
      if (!micro) { legenda(TQ.lateral, 3000); anuncia(T.aberto, 'ouro'); slow = .35; }
      atk.micro = !!micro;
    }
    function golpe() {
      if (est === 'abertura') {
        if (atk && atk.micro) { S.leituras++; eu.vai('golpe', 90, agora); som.bloqueio(false); faisca(pontoChoque().x, pontoChoque().y); legenda(TQ.ataque, 2600); est = 'recupera'; return volta(500); }
        return vitoriaJoseph();
      }
      if (est === 'pronto' || est === 'fim' || est === 'video' || est === 'espera') return;
      // atacou antes da hora
      S.cedo++; eu.vai('golpe', 90, agora); eu.alvoDx = 18; setTimeout(() => { eu.alvoDx = 0; }, 260);
      som.bloqueio(false); faisca(pontoChoque().x, pontoChoque().y); mudaBpm(6);
      if (!isM && est === 'erro') { legenda(T.cedo, 1800); golpeN = 2; est = 'recupera'; return volta(600); }
      legenda(isM ? TQ.ataque : T.cedo, 2200);
      // ele apara e devolve rápido
      if (est === 'guarda' || est === 'recupera' || est === 'aviso') { atk = isM ? { tipo: 'estocada', tell: 360, poseT: 'aviso-estocada', poseG: 'estocada' } : { tipo: 'pesado', tell: 420, poseT: 'aviso', poseG: 'golpe', lateral: false }; resp = null; est = 'aviso'; tEst = agora; ele.vai(atk.poseT, 90, agora); }
    }
    function recuaPasso(empurrada) {
      passos--; if (passos === 12 && !ja.deixo) { ja.deixo = 1; setTimeout(() => legenda(TQ.deixo, 3000), 300); }
      if (passos === 9 && !ja.pedraM) { ja.pedraM = 1; setTimeout(() => legenda(TQ.pedra, 3800), 200); }
      if (passos <= 0) { // pisou na pedra antes da hora
        passos = 2; esc -= 3; S.escudosPerdidos += 3; som.escorrega(); eu.vai('escorrega', 100, agora); legenda(TQ.cedoPedra, 2600); mudaBpm(14); hud();
        voz('conta-02', 700); return checa(900);
      }
      voz('conta-' + String(passos).padStart(2, '0'), 120); anuncia(T.nums[passos - 1], 'conta');
      eu.alvoDx = 0; hud(); return volta(empurrada ? 420 : 380);
    }
    function mudaFase() {
      if (!isM) return;
      if (fase === 1 && trocas >= 6) { fase = 2; chuvaAlvo = 1; root.classList.add('chuva-forte'); legenda(TQ.chuva, 4200); anuncia(T.fase2, 'fase'); musica && musica.fase(2); sfx('chuva-elmo', .6); }
      else if (fase === 2 && trocas >= 13) { fase = 3; passos = 13; legenda(TQ.vem, 3000); anuncia(T.fase3, 'fase'); musica && musica.fase(3); voz('conta-13', 900); hud(); }
    }

    // ---------- fim de luta
    function vitoriaJoseph() {
      fim = true; est = 'fim'; slow = .3; eu.vai('golpe', 80, agora); eu.alvoDx = Math.min(W * .08, 70); som.corte(); flash('180,20,20', .35, 500);
      setTimeout(() => { ele.vai('atingido', 220, agora); som.rugido(); anuncia(T.sangue, 'ouro'); slow = 1; }, 380);
      setTimeout(() => { eu.vai('vitoria', 500, agora); eu.alvoDx = 0; }, 1400);
      setTimeout(() => acaba({ resultado: 'venceu' }), 3400);
    }
    function queda() { // o um: o pé dele na pedra molhada
      fim = true; est = 'fim'; S.contagemUm = true; voz('conta-01', 0); anuncia(T.nums[0], 'conta');
      legenda(TQ.um, 3800); slow = .4; ele.vai('escorrega', 260, agora); ele.alvoDx = -Math.min(W * .12, 110);
      setTimeout(() => som.escorrega(), 300); setTimeout(() => som.suspiro(), 700);
      setTimeout(revelacao, 2300);
    }
    function revelacao() {
      est = 'video'; musica && musica.corta();
      const box = root.querySelector('.ar-video'), v = box.querySelector('video'), vl = box.querySelector('.ar-vleg'), bt = box.querySelector('.ar-golpear');
      const vleg = (t) => { vl.textContent = t; vl.classList.remove('on'); void vl.offsetWidth; vl.classList.add('on'); };
      box.classList.add('on'); v.src = opts.videoElmo; v.playbackRate = .8; v.play().catch(() => {});
      vleg(TQ.cai);
      setTimeout(() => { vleg(TQ.correia); sfx('correia-estala', 1); }, 1700);
      setTimeout(() => { vleg(TQ.voa); }, 3300);
      setTimeout(() => sfx('elmo-lama', .9), 5200);
      let feito = false;
      const final = () => { if (feito) return; feito = true; bt.classList.remove('on'); som.corte(); box.classList.add('corte'); vleg(TQ.corte); setTimeout(() => acaba({ resultado: 'venceu' }), 4200); };
      const mostraBotao = () => { vleg(TQ.rosto); bt.classList.add('on'); bt.onclick = final; if (bot) setTimeout(final, 400); };
      let mostrou = false;
      const quando = () => { if (!mostrou) { mostrou = true; mostraBotao(); } };
      v.onended = quando; setTimeout(quando, 6600);
      root._golpeFinal = () => { if (bt.classList.contains('on')) final(); };
    }
    function derrota() {
      fim = true; est = 'fim'; eu.vai('atingido', 100, agora); ele.vai(isM ? 'vitoria-dele' : 'guarda', 400, agora); som.dor(); flash('140,10,10', .45, 700); sfx('suspiro-multidao', .7);
      musica && musica.corta();
      setTimeout(() => {
        const tela = root.querySelector('.ar-tela');
        tela.innerHTML = `<h2>${T.perdeu}</h2><p class="ar-sub">${T.perdeuSub}</p><button class="cta ar-de-novo">${T.denovo}</button>`;
        tela.classList.add('on'); tela.querySelector('.ar-de-novo').onclick = () => acaba({ resultado: 'perdeu' });
      }, 1600);
    }
    function acaba(res) {
      if (!vivo) return; vivo = false; clearTimeout(batT); removeEventListener('resize', rs); removeEventListener('keydown', kd, true); removeEventListener('keyup', ku, true);
      musica && musica.para(); window.__ARENA = null;
      resolve(Object.assign({ quem: Q, bpmFinal: Math.round(bpm), bpmMedio: Math.round(S.bpmSoma / Math.max(1, S.bpmN)), escudoFinal: Math.max(0, esc) }, S, res));
    }

    // ---------- entrada do leitor
    function acao(a, solta) {
      if (!rodando || fim) { if (a === 'golpe' && root._golpeFinal) root._golpeFinal(); return; }
      if (a === 'escudo') { segEscudo = !solta; if (!solta) { segResp = false; eu.vai('escudo', 110, agora); } else if (!fim && est !== 'abertura') eu.vai('guarda', 200, agora); return; }
      if (a === 'respirar') { segResp = !solta; tResp = 0; if (!solta) { segEscudo = false; eu.vai('respirar', 260, agora); } else eu.vai('guarda', 260, agora); return; }
      if (solta) return;
      if (a === 'golpe') return golpe();
      if (a === 'lateral' || a === 'recuar') {
        if (est !== 'aviso' && est !== 'golpe') { // fora de hora: só gasta fôlego
          if (a === 'recuar' && est === 'guarda' && !isM) { eu.vai('recuar', 120, agora); setTimeout(() => !fim && eu.vai('guarda', 250, agora), 420); }
          mudaBpm(2); return;
        }
        if (resp) return;
        const falta = atk.tell - (agora - tEst);
        if (a === 'lateral') {
          const jan = (isM ? 300 : 400) * fatorAbertura();
          const certo = atk.lateral && est === 'aviso' && falta <= jan;
          resp = { tipo: 'lateral', certo };
          if (!certo) { eu.vai('lateral', 100, agora); if (!atk.bash) { setTimeout(() => !fim && eu.vai('guarda', 200, agora), 260); resp = null; S.cedo++; mudaBpm(4); if (atk.lateral && !ja.lateralCedoLeg) { ja.lateralCedoLeg = 1; legenda(T.cedo, 1400); } } }
          return;
        }
        if (a === 'recuar') { if (est === 'aviso' && falta > atk.tell * .75) return; resp = { tipo: 'recuar' }; mudaBpm(3); eu.vai('recuar', 120, agora); }
      }
    }
    const MAP = { ArrowLeft: 'recuar', ArrowDown: 'lateral', ArrowUp: 'escudo', ArrowRight: 'golpe', ' ': 'respirar', '1': 'recuar', '2': 'lateral', '3': 'escudo', '4': 'golpe', '5': 'respirar' };
    const kd = (e) => { const a = MAP[e.key]; if (!a) return; e.preventDefault(); e.stopPropagation(); if (e.repeat) return; acao(a, false); };
    const ku = (e) => { const a = MAP[e.key]; if (!a) return; e.preventDefault(); acao(a, true); };
    addEventListener('keydown', kd, true); addEventListener('keyup', ku, true);
    root.querySelectorAll('.ar-botoes button').forEach((b) => {
      const a = b.dataset.a, hold = a === 'escudo' || a === 'respirar';
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); b.classList.add('on'); acao(a, false); if (hold) b.setPointerCapture && b.setPointerCapture(e.pointerId); });
      const up = () => { b.classList.remove('on'); if (hold) acao(a, true); };
      b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('pointerleave', () => { if (!hold) b.classList.remove('on'); });
    });

    // ---------- o leitor-robô (só para testes automáticos): responde certo a tudo
    function robo() {
      if (!bot || !rodando || fim) return;
      if (est === 'abertura' && !atk.micro) return golpe();
      if (est === 'guarda' && esc < ESC_MAX && proxima - agora > 500) { if (!segResp) acao('respirar', false); return; }
      if (segResp && (est !== 'guarda' || proxima - agora < 350)) acao('respirar', true);
      if (est !== 'aviso' || resp) return;
      const falta = atk.tell - (agora - tEst);
      if (isM && fase === 3) { if (atk.tipo === 'pesado' && passos <= 1) { if (falta < 240) acao('lateral'); return; } if (falta < 260) { resp = passos <= 1 ? { tipo: 'escudo' } : { tipo: 'recuar' }; } return; }
      if (!isM && atk.tipo === 'largo' && falta < 260) return acao('lateral');
      if (atk.lateral && falta < 240) return acao('lateral');
      if (!atk.lateral && falta < 200) resp = { tipo: 'escudo' };
    }

    // ---------- laço
    const laco = (now) => {
      if (!vivo) return;
      const dtR = Math.min(.05, (now - ultimo) / 1000); ultimo = now; const dt = dtR * slow; agora += dt * 1000;
      if (rodando && !fim) {
        S.bpmSoma += bpm * dtR; S.bpmN += dtR;
        if (segResp) { mudaBpm(-8 * (opts.lencoPeito ? 1.3 : 1) * dtR); tResp += dtR; if (tResp >= .7 && esc < ESC_MAX) { tResp = 0; esc++; hud(); hudEsc.classList.add('volta'); setTimeout(() => hudEsc.classList.remove('volta'), 500); } } else if (est === 'guarda' || est === 'recupera') mudaBpm(-1.2 * dtR);
        robo();
        if (est === 'guarda' && agora >= proxima) iniciaAtaque();
        else if (est === 'aviso' && agora - tEst >= atk.tell) impacto();
        else if (est === 'abertura' && agora - tEst > abertura) { slow = 1; if (!isM) { legenda(TQ.lateralCedo, 1800); golpeN = 4; } volta(300); }
      }
      eu.treme = bpm > 165 ? (bpm - 165) / 8 : 0;
      desenha(dt);
      requestAnimationFrame(laco);
    };

    const comeca = () => {
      root.querySelector('.ar-tela').classList.remove('on'); rodando = true; ultimo = performance.now();
      if (A && A.ctx) { musica = trilha(A); musica.fase(1); }
      if (isM) setTimeout(() => legenda(TQ.inicio, 3600), 400);
      sfx('sino-arena', .8); agenda(2200); bate();
    };
    root.querySelector('.ar-go').onclick = comeca;
    Promise.all([carrega('laus'), carrega(Q)]).then(() => {});
    window.__ARENA = { get est() { return est; }, get atk() { return atk && atk.tipo; }, get resp() { return resp && (resp.tipo + (resp.certo ? '!' : '')); }, get esc() { return esc; }, get passos() { return passos; }, get fase() { return fase; }, get bpm() { return bpm; }, comeca, acao, S };
    requestAnimationFrame(laco);
  });
}
window.ARENA = { start };
})();
