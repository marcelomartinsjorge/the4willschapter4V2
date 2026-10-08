/* ==========================================================================
   A ARENA v2 · os duelos do Torneio Real (Capítulo IV)
   As poses são paradas; a luta não. Cada ação tem antecipação, golpe com
   passo além do ponto e volta (sempre) à guarda. Impacto congela o tempo um
   instante, a câmera treme, aproxima no aviso e inclina com o medo; a lâmina
   deixa rastro; o celular vibra.
   O corpo em duas camadas, sem barra: MEDO (o coração: janelas mais curtas,
   braço que falha) e CANSAÇO (a fenda do elmo fecha, o som abafa, Laus fica
   lenta). Escudo cansa; passo lateral é o único que abre guarda e custa caro;
   recuar é de graça e entrega terreno. Respirar é a pausa entre as trocas.
   Sem barra de vida: um golpe limpo decide.
   ========================================================================== */
(() => {
'use strict';
const TX = {
  pt: {
    tJoseph: 'Joseph', sJoseph: 'Semifinal · o primeiro sangue decide',
    tMarkus: 'Markus', sMarkus: 'A final · o primeiro sangue decide',
    regrasJ0: [
      ['Ele leva a espada lá atrás', 'golpe pesado', '↑ Escudo (cansa) · ↓ Passo lateral no último instante'],
      ['Ele se afasta e vocês se medem', 'a pausa', 'Segure Respirar no anel: acalma e devolve fôlego'],
    ],
    ajudaJ: 'Duas vezes no chão. Agora eu sei o que olhar:',
    regrasJ: [
      ['Ele leva a espada lá atrás', 'golpe pesado', '↑ Escudo (cansa) · ↓ Passo lateral no último instante'],
      ['O braço cansa, o golpe sai torto', 'é cedo', 'Ainda não. Espere o próximo'],
      ['O golpe mais largo de todos', 'é agora', '↓ Passo lateral e → Golpear na abertura'],
      ['Ele se afasta e vocês se medem', 'a pausa', 'Segure Respirar no anel: acalma e devolve fôlego'],
    ],
    regrasM: [
      ['A espada sobe por cima do ombro', 'golpe pesado', '↑ Escudo · ↓ Passo lateral no último instante'],
      ['A espada recua na cintura', 'estocada', '↑ Escudo ou ← Recuar. Nunca o passo lateral'],
      ['O golpe pesado que não vem', 'finta', '↑ Escudo. Quem desvia cedo leva o escudo dele'],
      ['Treze passos do centro até a pedra', 'conte', 'O resto, a arena ensina'],
    ],
    custo: 'O escudo cansa o braço. O passo lateral cansa o corpo. Recuar entrega terreno.',
    nuncaJ: 'Um golpe limpo decide. Não ataque antes da abertura.',
    nuncaM: 'Ele quase não erra. Leia, aguente, e conte.',
    nervo: 'O coração não para quieto hoje. As mãos chegam um instante atrasadas.',
    exausto: 'O corpo ainda carrega os outros dias. A fenda do elmo começa estreita.',
    comecar: 'Ao círculo', teclado: 'Teclado: ← recuar · ↓ passo lateral · ↑ escudo (segurar) · → golpear · espaço respirar (nas pausas)',
    botoes: ['Recuar', 'Lateral', 'Escudo', 'Golpear'], respirar: 'Respirar',
    cedo: 'Cedo demais.', ainda: 'Ainda não.', aberto: 'Agora!', treme: 'O braço treme.', perfeito: 'Na hora.', pedraJ: 'A pedra nas costas.',
    perdeu: 'Não pode ser assim.', perdeuSub: 'Falta um golpe. Só um.', denovo: 'Tentar de novo',
    sangue: 'Sangue tirado!', golpear: 'Golpear', fase2: 'A chuva engrossa', fase3: 'Treze passos', pausa: 'Respire',
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
      pausa: 'Ele recua dois passos e gira o ombro. Me mede. Eu meço ele.',
      cansada: 'O elmo pesa o dobro do que pesava de manhã.',
    },
    M: {
      inicio: 'Markus não gira a espada. Ergue o escudo até o queixo e espera.',
      b1: 'O golpe dele não é o mais forte que já recebi. É o mais certo. O escudo inteiro canta.',
      ataque: 'Ele nem recua. Recebe no escudo e devolve antes de eu terminar o gesto.',
      lateral: 'Passo para o lado. Ele não cai para a frente como Joseph. Segura o peso a um palmo do chão. Não há erro para esperar.',
      finta: 'O golpe pesado que não vem. Vem o escudo, na altura do meu peito.',
      misericordia: 'Meu escudo desce. Ele vê. Recua dois passos e espera eu levantar o braço de novo. A arena aplaude ele por isso.',
      pausa: 'Ele se afasta e me rodeia, devagar. A chuva escorre pela fenda.',
      interrompe: 'Ele não espera eu terminar de respirar.',
      chuva: 'A chuva engrossa. A água entra pela fenda do elmo, e já não vejo os pés dele.',
      ouvido: 'Não vejo. Mas ouço. Ar, pelo nariz, duas vezes, curto.',
      descobre: 'Antes do golpe pesado, alguma coisa. Um som, perto do elmo dele. Ar.',
      escorrega: 'O cabo escorrega na manopla molhada.',
      lenco: 'Por baixo da manopla, o lenço bebe a chuva. A mão não escorrega.',
      ombro: 'Abro os pés na largura dos ombros e solto o ombro. Alguém me ensinou isso uma noite, com a mão no meu ombro, nunca na espada. O escudo volta a pesar o que pesa.',
      vem: 'Markus muda. Para de esperar. Vem.',
      deixo: 'Cada golpe me empurra um passo para trás. Eu deixo.',
      pedra: 'Atrás de mim, embaixo da lama, está a pedra da borda. Treze passos do centro até ela.',
      cedoPedra: 'Meu pé encontra a pedra antes da hora e escorrega.',
      calcanhar: 'O calcanhar toca a pedra. Daqui não recuo mais. Aguento.',
      um: 'Passo para o lado no último instante, e o pé dele, pesado, com pressa, desce onde o meu estaria. Na pedra molhada.',
      cai: 'Ele golpeia caindo, sem ver, só com o braço.',
      correia: 'O aço pega o meu elmo de lado. A correia gasta estala.',
      voa: 'O elmo voa.',
      rosto: 'A chuva bate no meu rosto pela primeira vez desde que o Torneio começou.',
      corte: 'A ponta da minha espada abre um corte fino no braço dele, embaixo da ombreira, onde a placa não alcança.',
      cansada: 'Cada respiração ecoa dentro do aço. Não sei quanto tempo ainda aguento.',
    },
    nums: ['Um.', 'Dois.', 'Três.', 'Quatro.', 'Cinco.', 'Seis.', 'Sete.', 'Oito.', 'Nove.', 'Dez.', 'Onze.', 'Doze.', 'Treze.'],
  },
  en: {
    tJoseph: 'Joseph', sJoseph: 'Semifinal · first blood decides',
    tMarkus: 'Markus', sMarkus: 'The final · first blood decides',
    regrasJ0: [
      ['He draws the sword far back', 'heavy blow', '↑ Shield (tiring) · ↓ Sidestep at the last instant'],
      ['He backs off and you take each other’s measure', 'the pause', 'Hold Breathe on the ring: it calms you and gives back breath'],
    ],
    ajudaJ: 'Twice on the ground. Now I know what to look for:',
    regrasJ: [
      ['He draws the sword far back', 'heavy blow', '↑ Shield (tiring) · ↓ Sidestep at the last instant'],
      ['His arm tires, the blow goes crooked', 'too soon', 'Not yet. Wait for the next one'],
      ['The widest blow of all', 'now', '↓ Sidestep, then → Strike into the opening'],
      ['He backs off and you take each other’s measure', 'the pause', 'Hold Breathe on the ring: it calms you and gives back breath'],
    ],
    regrasM: [
      ['The sword rises over his shoulder', 'heavy blow', '↑ Shield · ↓ Sidestep at the last instant'],
      ['The sword draws back at his hip', 'thrust', '↑ Shield or ← Step back. Never the sidestep'],
      ['The heavy blow that never comes', 'feint', '↑ Shield. Sidestep early and you eat his shield'],
      ['Thirteen steps from the centre to the stone', 'count', 'The arena will teach you the rest'],
    ],
    custo: 'The shield tires your arm. The sidestep tires your body. Stepping back gives up ground.',
    nuncaJ: 'One clean blow decides. Never strike before the opening.',
    nuncaM: 'He hardly ever errs. Read, endure, and count.',
    nervo: 'My heart won’t keep still today. My hands arrive a moment late.',
    exausto: 'The body still carries the other days. The helmet’s slit starts narrow.',
    comecar: 'To the circle', teclado: 'Keyboard: ← step back · ↓ sidestep · ↑ shield (hold) · → strike · space breathe (in the pauses)',
    botoes: ['Step back', 'Sidestep', 'Shield', 'Strike'], respirar: 'Breathe',
    cedo: 'Too soon.', ainda: 'Not yet.', aberto: 'Now!', treme: 'My arm shakes.', perfeito: 'Right on time.', pedraJ: 'Stone at my back.',
    perdeu: 'It can’t end like this.', perdeuSub: 'One blow left. Just one.', denovo: 'Try again',
    sangue: 'First blood!', golpear: 'Strike', fase2: 'The rain thickens', fase3: 'Thirteen steps', pausa: 'Breathe',
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
      pausa: 'He steps back two paces and rolls his shoulder. He measures me. I measure him.',
      cansada: 'The helmet weighs twice what it weighed this morning.',
    },
    M: {
      inicio: 'Markus doesn’t spin his sword. He raises his shield to his chin and waits.',
      b1: 'His blow isn’t the strongest I’ve ever taken. It’s the surest. The whole shield sings.',
      ataque: 'He doesn’t even step back. He takes it on the shield and returns it before I finish the motion.',
      lateral: 'I step aside. He doesn’t pitch forward like Joseph. He holds his weight a hand above the ground. There’s no mistake to wait for.',
      finta: 'The heavy blow that never comes. His shield comes instead, at the height of my chest.',
      misericordia: 'My shield drops. He sees it. He steps back two paces and waits for me to raise my arm again. The arena applauds him for it.',
      pausa: 'He backs off and circles me, slowly. The rain runs down through the slit.',
      interrompe: 'He doesn’t wait for me to finish breathing.',
      chuva: 'The rain thickens. Water gets in through the slit of the helmet, and I can’t see his feet anymore.',
      ouvido: 'I can’t see. But I can hear. Air, through the nose, twice, short.',
      descobre: 'Before the heavy blow, something. A sound, near his helmet. Air.',
      escorrega: 'The grip slips in my wet gauntlet.',
      lenco: 'Under the gauntlet, the handkerchief drinks the rain. My hand doesn’t slip.',
      ombro: 'I set my feet shoulder-width apart and loosen my shoulder. Someone taught me that one night, a hand on my shoulder, never on the sword. The shield goes back to weighing what it weighs.',
      vem: 'Markus changes. He stops waiting. He comes.',
      deixo: 'Every blow pushes me a step back. I let it.',
      pedra: 'Behind me, under the mud, is the stone of the edge. Thirteen steps from the centre to it.',
      cedoPedra: 'My foot finds the stone too soon and slips.',
      calcanhar: 'My heel touches the stone. I give no more ground. I hold.',
      um: 'I step aside at the last instant, and his foot, heavy, in a hurry, comes down where mine would have been. On the wet stone.',
      cai: 'He swings as he falls, blind, all arm.',
      correia: 'The steel catches my helmet on the side. The worn strap snaps.',
      voa: 'The helmet flies.',
      rosto: 'The rain hits my face for the first time since the Tournament began.',
      corte: 'The point of my sword opens a thin cut in his arm, under the pauldron, where the plate doesn’t reach.',
      cansada: 'Every breath echoes inside the steel. I don’t know how much longer I can last.',
    },
    nums: ['One.', 'Two.', 'Three.', 'Four.', 'Five.', 'Six.', 'Seven.', 'Eight.', 'Nine.', 'Ten.', 'Eleven.', 'Twelve.', 'Thirteen.'],
  },
};

// ------------------------------------------------------------------ poses
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
const ALTURA = { laus: 1, joseph: 1.07, markus: 1.13 };

class Lutador {
  constructor(quem, lado) { Object.assign(this, { quem, lado, pose: 'guarda', de: 'guarda', tPose: 0, dPose: 90, x: 0, alvoX: 0, lean: 0, alvoLean: 0, sq: 0, prof: 0, alvoProf: 0, branco: 0, fantasma: null, treme: 0 }); }
  vai(pose, agora, d = 90) { if (pose === this.pose) return; this.de = this.pose; this.pose = pose; this.tPose = agora; this.dPose = d; }
}

// ------------------------------------------------------------------ trilha sintetizada (o som abafa com o cansaço)
function trilha(A) {
  const nada = { fase() {}, corta() {}, volta() {}, para() {}, abafa() {} };
  if (!A || !A.ctx || !A.master || !A.noise) return nada;
  const ctx = A.ctx, out = ctx.createGain(); out.gain.value = 0;
  const mf = ctx.createBiquadFilter(); mf.type = 'lowpass'; mf.frequency.value = 9000; out.connect(mf); mf.connect(A.master);
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
    abafa(c) { mf.frequency.setTargetAtTime(9000 - c * 7600, ctx.currentTime, .4); },
    corta() { out.gain.setTargetAtTime(.12, ctx.currentTime, .3); }, volta() { out.gain.setTargetAtTime(.7, ctx.currentTime, .3); },
    para() { if (!vivo) return; vivo = false; clearInterval(id); out.gain.setTargetAtTime(0, ctx.currentTime, .6); setTimeout(() => { try { oscs.forEach((o) => o.stop()); out.disconnect(); mf.disconnect(); } catch (e) {} }, 2500); },
  };
}

// ------------------------------------------------------------------ o jogo
function start(root, opts) {
  const T = TX[opts.lang] || TX.en, A = opts.A, Q = opts.quem;
  const isM = Q === 'markus', TQ = isM ? T.M : T.J;
  const bot = !!window.__ARENA_BOT;
  const vib = (ms) => { if (navigator.vibrate) try { navigator.vibrate(ms); } catch (e) {} };
  return new Promise((resolve) => {
    const ajuda = !isM && (opts.tentativas || 0) >= 2;
    const regras = isM ? T.regrasM : (ajuda ? T.regrasJ : T.regrasJ0);
    root.innerHTML = `
      <div class="ar-bg" style="background-image:url('${opts.fundo}')"></div>
      <div class="ar-bg chuva" style="background-image:url('${opts.fundoChuva || opts.fundo}')"></div>
      <canvas class="ar-cv"></canvas>
      <div class="ar-hud"><span class="ar-cor"></span><span class="ar-esc"></span><span class="ar-conta"></span></div>
      <p class="ar-leg"></p>
      <div class="ar-anuncio"></div>
      <div class="ar-respiro"><div class="rp-anel"><i class="rp-guia"></i><i class="rp-ar"></i></div><p class="rp-fase"></p></div>
      <div class="ar-botoes">${T.botoes.map((b, i) => `<button data-a="${['recuar', 'lateral', 'escudo', 'golpe'][i]}"><i>${['←', '↓', '↑', '→'][i]}</i>${b}</button>`).join('')}<button data-a="respirar" class="resp"><i>◯</i>${T.respirar}</button></div>
      <div class="ar-tela on">
        <h2>${isM ? T.tMarkus : T.tJoseph}</h2><p class="ar-sub">${isM ? T.sMarkus : T.sJoseph}</p>
        ${ajuda ? `<p class="ar-custo">${T.ajudaJ}</p>` : ''}<ul class="ar-regras">${regras.map((r) => `<li><span>${r[0]}</span><small>${r[1]}</small><b>${r[2]}</b></li>`).join('')}</ul>
        <p class="ar-custo">${T.custo}</p>
        <p class="ar-nunca">${isM ? T.nuncaM : T.nuncaJ}</p>${(opts.bpm || 0) >= 120 ? `<p class="ar-nervo">${T.nervo}</p>` : ''}${(opts.cansaco || 0) >= .25 ? `<p class="ar-nervo">${T.exausto}</p>` : ''}
        <button class="cta ar-go">${T.comecar}</button>
        <p class="ar-teclado">${T.teclado}</p>
      </div>
      <div class="ar-video"><video playsinline muted></video><p class="ar-vleg"></p><button class="ar-golpear">${T.golpear}</button></div>`;
    const cv = root.querySelector('.ar-cv'), cx = cv.getContext('2d');
    const bgs = root.querySelectorAll('.ar-bg');
    const leg = root.querySelector('.ar-leg'), anuncio = root.querySelector('.ar-anuncio');
    const hudCor = root.querySelector('.ar-cor'), hudEsc = root.querySelector('.ar-esc'), hudConta = root.querySelector('.ar-conta');
    const respBox = root.querySelector('.ar-respiro');
    let W = 0, H = 0, DPR = 1;
    const rs = () => { DPR = Math.min(devicePixelRatio || 1, 2); W = root.clientWidth; H = root.clientHeight; cv.width = W * DPR; cv.height = H * DPR; };
    addEventListener('resize', rs); rs();

    // ---------- estado
    const ESC_MAX = 6;
    const S = { golpesSofridos: 0, leituras: 0, laterais: 0, perfeitos: 0, fintasLidas: 0, escudosPerdidos: 0, misericordia: 0, contagemUm: false, esperouErro: false, cedo: 0, respiros: 0, bpmSoma: 0, bpmN: 0, tentativa: opts.tentativas || 0 };
    let esc = ESC_MAX, bpm = opts.bpm || 96, cansaco = Math.min(.6, opts.cansaco || 0), passos = 13, fase = 1, trocas = 0, golpeN = 0, desdePausa = 0;
    const eu = new Lutador('laus', 1), ele = new Lutador(Q, -1);
    let agora = 0, ultimo = performance.now(), vivo = true, rodando = false, fim = false, slow = 1, congela = 0;
    let est = 'pronto', tEst = 0, atk = null, resp = null, proxima = 0, segEscudo = false, tEscudo = 0, abertura = 0, voltaT = 0;
    const cam = { x: 0, zoom: 1, alvoZoom: 1, rot: 0, sx: 0, sy: 0, shake: 0 };
    const ja = {}, parts = [], gotas = [], flashes = [], rastros = [];
    let chuva = isM ? .25 : 0, chuvaAlvo = chuva, musica = null, respiro = null;
    let misericordiaUsada = false, ombroUsado = false, ouviuAviso = !!opts.sabeAviso, avisoMostrado = false;

    const legenda = (t, ms = 3600) => { leg.textContent = t; leg.classList.remove('on', 'forte'); void leg.offsetWidth; leg.classList.add('on'); clearTimeout(legenda.t); legenda.t = setTimeout(() => leg.classList.remove('on'), ms); };
    const umaVez = (k, t, ms) => { if (ja[k]) return false; ja[k] = 1; legenda(t, ms); return true; };
    // momento: o tempo da luta para, a frase fica maior e o leitor consegue ler
    const momento = (t, ms = 4200, para = 2200) => { congela = Math.max(congela, para); legenda(t, ms); leg.classList.add('forte'); clearTimeout(momento.t); momento.t = setTimeout(() => leg.classList.remove('forte'), ms + 600); };
    const anuncia = (t, cls = '') => { anuncio.className = 'ar-anuncio ' + cls; anuncio.textContent = t; void anuncio.offsetWidth; anuncio.classList.add('on'); };
    const hud = () => {
      hudEsc.innerHTML = Array.from({ length: ESC_MAX }, (_, i) => `<i class="${i < esc ? 'on' : ''}"></i>`).join('');
      hudEsc.className = 'ar-esc' + (esc <= 2 ? ' baixo' : '');
      hudConta.textContent = fase === 3 ? String(passos) : ''; hudConta.classList.toggle('on', fase === 3);
    };
    hud();
    const sfx = (n, v = .7, res) => A && A.sfx(n, v, res);
    const voz = (n, ms = 0) => { if (!A || !A.ctx || !A.on) return; setTimeout(() => A.once('assets/audio/voz/' + n + '.mp3', 1), ms); };
    const esforco = () => { if (Math.random() < .55) voz('esforco-' + (1 + Math.floor(Math.random() * 3)), 0); };
    const som = {
      bloqueio(forte) { sfx(forte ? 'escudo-impacto-1' : 'escudo-impacto-2', .8, () => { A.tone(140, .3, 'triangle', .14); A.hiss(.2, 1800, 2, .14); }); },
      bash() { sfx('espada-escudo-bash', .85, () => A.tone(90, .35, 'sine', .25)); },
      vento() { sfx('golpe-ar', .6, () => A.hiss(.3, 1200, .9, .1)); },
      passo() { sfx(chuva > .5 ? 'passo-lama' : 'passo-areia', .45, () => A.hiss(.12, 160, .6, .14, 0, 'lowpass')); },
      ar() { sfx('respira-nariz', .9, () => { A.hiss(.12, 900, 1.5, .12); A.hiss(.12, 900, 1.5, .12, .22); }); },
      corte() { sfx('corte', .9, () => A.tone(196, .7, 'sine', .1)); },
      dor() { sfx('escudo-impacto-1', .6); A && A.tone && A.tone(70, .5, 'sine', .25, 0, .6); },
      rugido() { sfx('rugido', .75); }, suspiro() { sfx('suspiro-multidao', .7); },
      escorrega() { sfx('escorrega-pedra', .9); },
    };

    // ---------- as duas camadas do corpo
    const fatorJanela = () => (1 - Math.min(.35, Math.max(0, (bpm - 140) / 100))) * (1 - cansaco * .35);
    const lentidao = () => 1 + cansaco * .6;
    const mudaBpm = (d) => { bpm = Math.max(70, Math.min(190, bpm + d)); };
    const cansa = (d) => { cansaco = Math.max(0, Math.min(1, cansaco + d)); };
    let batT = 0, folegoT = 0;
    const bate = () => {
      if (!vivo) return;
      if (A && A.ctx && A.on && rodando && !fim) A.batida && A.batida(Math.min(1, Math.max(.15, (bpm - 80) / 90)));
      if (rodando && !fim && bpm > 135) vib(bpm > 160 ? 22 : 12);
      hudCor.classList.remove('b'); void hudCor.offsetWidth; hudCor.classList.add('b');
      batT = setTimeout(bate, 60000 / bpm);
    };
    const folego = () => {
      if (!vivo) return;
      if (A && A.ctx && A.on && A.hiss && rodando && !fim && cansaco > .15) { A.hiss(.5 + cansaco * .4, 520, .9, .03 + cansaco * .09); A.hiss(.6, 360, .7, .02 + cansaco * .07, .65); }
      musica && musica.abafa(cansaco);
      folegoT = setTimeout(folego, (2600 - cansaco * 1200));
    };

    // ---------- câmera e mundo
    const chao = () => H * .86;
    const escala = () => Math.min(H * .44, W * .52) / ((META['laus-guarda'] || { alt: 600 }).alt);
    const kE = () => escala() * ALTURA[Q] * ((META['laus-guarda'] || { alt: 600 }).alt / (META[Q + '-guarda'] || { alt: 600 }).alt);
    const passoPx = () => Math.min(W * .055, 46);
    const dist = () => Math.min(W * .3, H * .42);
    const P = () => { const m = W / 2; return { eu: m - dist() * .55 + eu.x, ele: m + dist() * .55 + ele.x, pedra: m - dist() * .55 - (passos + .5) * passoPx() }; };
    const tremer = (f) => { cam.shake = Math.max(cam.shake, f); };
    const impactoFx = (forca, cor = '255,240,215') => { congela = Math.max(congela, 60 + forca * 50); tremer(5 + forca * 9); flashes.push({ cor, a: .12 + forca * .18, d: 200, t: agora }); vib(Math.round(18 + forca * 30)); };

    function desenhaLut(l, x, k) {
      const t = Math.min(1, (agora - l.tPose) / l.dPose);
      const uma = (pose, alfa, branco) => {
        const mm = META[l.quem + '-' + pose], ii = IMG[l.quem + '-' + pose]; if (!mm || !ii || alfa <= .01) return;
        const resp = (pose === 'guarda' || pose === 'respirar' || pose === 'cansado' || pose === 'espera' || pose === 'avanca') ? Math.sin(agora / (l === eu ? 520 - cansaco * 200 : 480)) * (l === eu ? .006 + cansaco * .014 : .006) : 0;
        const s = k * (1 - l.prof * .07), sy = 1 + resp + l.sq * -.04, sx = 1 + l.sq * .03;
        const w = mm.w * s * sx, h = mm.h * s * sy;
        cx.save();
        cx.translate(x + (l.treme ? (Math.random() - .5) * l.treme : 0), chao() - l.prof * 8);
        cx.rotate(l.lean * l.lado);
        cx.globalAlpha = alfa;
        if (branco) cx.filter = 'brightness(0) invert(1)'; else if (l.prof > .3) cx.filter = 'brightness(.78)';
        cx.drawImage(ii, -mm.ax * s * sx, -mm.base * s * sy, w, h);
        cx.restore();
      };
      if (l.fantasma && agora - l.fantasma.t < 140) uma(l.fantasma.pose, .22 * (1 - (agora - l.fantasma.t) / 140));
      if (l.de !== l.pose && t < 1) uma(l.de, Math.max(0, 1 - t * 1.8));
      uma(l.pose, l.de !== l.pose ? Math.min(1, .25 + t * 1.5) : 1, l.branco > agora);
    }
    function rastro(l, x, k, cor = '255,236,200') {
      const alt = (META[l.quem + '-guarda'] || { alt: 600 }).alt * k;
      rastros.push({ x: x + l.lado * alt * .12, y: chao() - alt * .62, r: alt * .5, a0: l.lado > 0 ? -1.9 : -2.6, a1: l.lado > 0 ? .55 : -4.05, t: agora, cor });
    }
    function desenha(dt) {
      cam.zoom += (cam.alvoZoom - cam.zoom) * Math.min(1, dt * 4);
      cam.rot += (((bpm > 150 ? Math.sin(agora / 700) * .012 * ((bpm - 150) / 40) : 0) + (cansaco > .5 ? Math.sin(agora / 1300) * .008 : 0)) - cam.rot) * Math.min(1, dt * 3);
      cam.shake *= Math.pow(.0009, Math.max(dt, .004)); cam.sx = (Math.random() - .5) * cam.shake; cam.sy = (Math.random() - .5) * cam.shake;
      const p = P(); const foco = (p.eu + p.ele) / 2; cam.x += ((foco - W / 2) - cam.x) * Math.min(1, dt * 3);
      bgs.forEach((b) => { b.style.transform = `translate(${(-cam.x * .25 + cam.sx * .5).toFixed(1)}px, ${(cam.sy * .5).toFixed(1)}px) scale(${(1.06 + (cam.zoom - 1) * .45).toFixed(3)}) rotate(${(cam.rot * 40).toFixed(2)}deg)`; });
      cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.clearRect(0, 0, W, H);
      cx.translate(W / 2 + cam.sx, chao() + cam.sy); cx.rotate(cam.rot); cx.scale(cam.zoom, cam.zoom); cx.translate(-W / 2 - cam.x, -chao());
      if (p.pedra > -400) {
        cx.fillStyle = chuva > .5 ? 'rgba(196,204,214,.92)' : 'rgba(214,208,196,.92)'; cx.fillRect(p.pedra - 600, chao() - 10, 600, 24);
        cx.fillStyle = chuva > .5 ? 'rgba(235,242,250,.55)' : 'rgba(255,255,255,.25)'; cx.fillRect(p.pedra - 600, chao() - 10, 600, 3);
        cx.fillStyle = 'rgba(0,0,0,.35)'; cx.fillRect(p.pedra - 4, chao() - 10, 4, 24);
      }
      const sombra = (x, r) => { const g = cx.createRadialGradient(x, chao(), 2, x, chao(), r); g.addColorStop(0, 'rgba(0,0,0,.5)'); g.addColorStop(1, 'rgba(0,0,0,0)'); cx.fillStyle = g; cx.beginPath(); cx.ellipse(x, chao(), r, r * .16, 0, 0, 6.283); cx.fill(); };
      const kL = escala(), ke = kE();
      sombra(p.eu, kL * 260); sombra(p.ele, ke * 280);
      for (const l of [eu, ele]) { l.x += (l.alvoX - l.x) * Math.min(1, dt * (l === eu ? 10 / lentidao() : 9)); l.lean += (l.alvoLean - l.lean) * Math.min(1, dt * 10); l.sq *= Math.pow(.002, Math.max(dt, .004)); l.prof += (l.alvoProf - l.prof) * Math.min(1, dt * 12); }
      if (fase === 2 && est === 'aviso' && atk && !avisoVisivel()) { cx.save(); cx.filter = 'blur(5px)'; cx.globalAlpha = .6; desenhaLut(ele, p.ele, ke); cx.restore(); }
      else desenhaLut(ele, p.ele, ke);
      desenhaLut(eu, p.eu, kL);
      for (let i = rastros.length - 1; i >= 0; i--) { const r = rastros[i], a = (agora - r.t) / 170; if (a >= 1) { rastros.splice(i, 1); continue; }
        cx.strokeStyle = `rgba(${r.cor},${.7 * (1 - a)})`; cx.lineWidth = 9 * (1 - a) + 1; cx.lineCap = 'round'; cx.beginPath(); cx.arc(r.x, r.y, r.r, Math.min(r.a0, r.a1), Math.max(r.a0, r.a1)); cx.stroke(); }
      if (atk && est === 'aviso' && (atk.dica || (isM && fase >= 2 && atk.tipo === 'pesado' && ouviuAviso && !avisoMostrado))) {
        const r = 18 + 8 * Math.sin(agora / 90), x = p.ele - ke * 40, y = chao() - ke * ((META[Q + '-guarda'] || { alt: 600 }).alt * .92);
        cx.strokeStyle = 'rgba(255,226,170,.85)'; cx.lineWidth = 2; cx.beginPath(); cx.arc(x, y, r, 0, 6.283); cx.stroke();
      }
      if (est === 'abertura') { const x = p.ele - ke * 30, y = chao() - ke * 260, r = 26 + 10 * Math.sin(agora / 70); const g = cx.createRadialGradient(x, y, 2, x, y, r * 2); g.addColorStop(0, 'rgba(255,214,150,.6)'); g.addColorStop(1, 'rgba(255,214,150,0)'); cx.fillStyle = g; cx.beginPath(); cx.arc(x, y, r * 2, 0, 6.283); cx.fill(); }
      for (let i = parts.length - 1; i >= 0; i--) { const q = parts[i], a = (agora - q.t) / q.vida; if (a >= 1) { parts.splice(i, 1); continue; } q.x += q.vx * dt; q.y += q.vy * dt; q.vy += 300 * dt; cx.globalAlpha = q.a * (1 - a); cx.fillStyle = `rgb(${q.cor})`; cx.beginPath(); cx.arc(q.x, q.y, q.r, 0, 6.283); cx.fill(); }
      cx.globalAlpha = 1;
      cx.setTransform(DPR, 0, 0, DPR, 0, 0);
      chuva += (chuvaAlvo - chuva) * Math.min(1, dt * .8);
      const n = Math.round(chuva * (W < 700 ? 110 : 220));
      while (gotas.length < n) gotas.push({ x: Math.random() * W * 1.2, y: Math.random() * H, v: 900 + Math.random() * 500, l: 10 + Math.random() * 18 });
      if (gotas.length > n) gotas.length = n;
      cx.strokeStyle = 'rgba(210,222,236,.32)'; cx.lineWidth = 1; cx.beginPath();
      for (const g of gotas) { g.y += g.v * dt * slow; g.x -= g.v * .12 * dt * slow; if (g.y > H) { g.y = -20; g.x = Math.random() * W * 1.2; } cx.moveTo(g.x, g.y); cx.lineTo(g.x + g.l * .12, g.y - g.l); }
      cx.stroke();
      for (let i = flashes.length - 1; i >= 0; i--) { const f = flashes[i], a = (agora - f.t) / f.d; if (a >= 1) { flashes.splice(i, 1); continue; } cx.fillStyle = `rgba(${f.cor},${(1 - a) * f.a})`; cx.fillRect(0, 0, W, H); }
      // o medo escurece as bordas; o cansaço fecha a fenda do elmo
      const ap = Math.min(1, Math.max(0, (bpm - 95) / 85));
      const vg = cx.createRadialGradient(W / 2, H * .55, Math.min(W, H) * (.62 - ap * .2), W / 2, H * .55, Math.max(W, H) * .78);
      vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(8,4,4,${.4 + ap * .4})`); cx.fillStyle = vg; cx.fillRect(0, 0, W, H);
      if (!root.classList.contains('sem-elmo')) {
        const fenda = H * (.03 + cansaco * .2), bordaY = fenda + H * .05;
        let g = cx.createLinearGradient(0, 0, 0, bordaY); g.addColorStop(0, 'rgba(3,2,2,.97)'); g.addColorStop(fenda / bordaY, 'rgba(3,2,2,.9)'); g.addColorStop(1, 'rgba(3,2,2,0)'); cx.fillStyle = g; cx.fillRect(0, 0, W, bordaY);
        g = cx.createLinearGradient(0, H, 0, H - bordaY); g.addColorStop(0, 'rgba(3,2,2,.97)'); g.addColorStop(fenda / bordaY, 'rgba(3,2,2,.9)'); g.addColorStop(1, 'rgba(3,2,2,0)'); cx.fillStyle = g; cx.fillRect(0, H - bordaY, W, bordaY);
      }
    }
    const poeira = (x, y, n = 10, cor = '214,200,170') => { for (let i = 0; i < n; i++) parts.push({ x, y, vx: (Math.random() - .5) * 200, vy: -Math.random() * 180 - 30, r: 1 + Math.random() * 2.6, a: .7, cor: chuva > .5 ? '110,100,88' : cor, vida: 600 + Math.random() * 500, t: agora }); };
    const faisca = (x, y, n = 14, cor = '255,226,170') => { for (let i = 0; i < n; i++) parts.push({ x, y, vx: (Math.random() - .5) * 520, vy: -Math.random() * 320, r: .8 + Math.random() * 1.5, a: 1, cor, vida: 320 + Math.random() * 260, t: agora }); };
    const choque = () => { const p = P(); return { x: (p.eu + p.ele) / 2, y: chao() - escala() * 520 }; };

    // ---------- Laus: toda ação volta à guarda
    function laus(pose, ms) {
      eu.vai(pose, agora, 80 * lentidao()); clearTimeout(voltaT);
      if (ms) voltaT = setTimeout(() => { if (fim) return; eu.alvoProf = 0; eu.alvoX = 0; eu.alvoLean = 0; eu.vai(segEscudo ? 'escudo' : respiro ? 'respirar' : cansaco > .7 ? 'cansado' : 'guarda', agora, 200 * lentidao()); }, ms * lentidao());
    }

    // ---------- o adversário
    const avisoVisivel = () => !atk || (agora - tEst) > atk.tell * .62;
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
    function agenda(ms) { est = 'guarda'; tEst = agora; proxima = agora + ms; atk = null; resp = null; cam.alvoZoom = 1; }
    function iniciaAtaque(interrompe) {
      atk = interrompe ? { tipo: 'estocada', tell: 600, poseT: 'aviso-estocada', poseG: 'estocada' } : escolheAtaque(); resp = null; est = 'aviso'; tEst = agora;
      atk.tell *= (bpm > 150 ? .92 : 1);
      ele.vai(atk.poseT, agora, Math.min(260, atk.tell * .3)); ele.alvoLean = -.05; ele.alvoX = Math.min(W * .02, 16); som.passo();
      cam.alvoZoom = 1.08;
      if (atk.tipo === 'largo') { ja.largoDica = 1; legenda(TQ.largo, 2600); }
      if (atk.tipo === 'estocada') ja.estocadaDica = 1;
      if (isM && fase >= 2) {
        if (atk.tipo === 'pesado') { som.ar(); if (!ouviuAviso && !ja.descobre && trocas > 7) { ja.descobre = 1; momento(TQ.descobre, 4200, 2000); ouviuAviso = true; } else if (ouviuAviso && !avisoMostrado && !ja.ouvido) { ja.ouvido = 1; momento(TQ.ouvido, 4000, 1800); const tl = atk.tell; setTimeout(() => { avisoMostrado = true; }, tl); } }
        if (atk.tipo === 'estocada') sfx('passo-lama', .8);
      }
    }
    function impacto() {
      est = 'golpe'; tEst = agora;
      const p = P(); ele.fantasma = { pose: ele.pose, t: agora }; ele.vai(atk.poseG, agora, 70);
      ele.alvoX = -Math.min(W * .06, 56); ele.alvoLean = .07; ele.sq = 1; rastro(ele, p.ele, kE());
      cam.alvoZoom = 1.02;
      const r = resp || {}, C = choque();
      if (r.tipo === 'lateral' && r.certo) {
        S.leituras++; S.laterais++; som.vento(); eu.alvoProf = 1; eu.alvoX = -14; laus('lateral', 520); cansa(.05);
        if (!isM && atk.abre) return abre(1100);
        if (isM && fase === 3) { if (passos <= 1) return queda(); legenda(T.ainda, 1600); return volta(500); }
        if (isM) { if (!ja.mLateral) { ja.mLateral = 1; legenda(TQ.lateral, 4200); } return abre(320, true); }
        if (!ja.lateralCedo) { ja.lateralCedo = 1; legenda(TQ.lateralCedo, 2400); }
        return volta(520);
      }
      if (atk.bash) {
        if (r.tipo === 'lateral') { S.golpesSofridos++; esc -= 2; S.escudosPerdidos += 2; som.bash(); impactoFx(1); laus('impacto', 420); eu.alvoX = -26; poeira(C.x, chao()); umaVez('finta', TQ.finta, 3200); mudaBpm(12); cansa(.05); hud(); return checa(600); }
        if (segEscudo || (bot && r.tipo === 'escudo')) { S.leituras++; S.fintasLidas++; som.bash(); impactoFx(.5); laus('escudo', 300); mudaBpm(5); cansa(.03); return volta(600); }
        S.golpesSofridos++; esc -= 1; S.escudosPerdidos++; som.bash(); impactoFx(.8); laus('impacto', 420); mudaBpm(8); hud(); return checa(600);
      }
      if (r.tipo === 'recuar') {
        S.leituras++; som.vento(); laus('recuar', 420); eu.alvoX = -passoPx(); eu.alvoLean = -.04;
        if (isM && fase === 3) return recuaPasso();
        if (!isM) { if (passos <= 2) { umaVez('pedraJ', T.pedraJ, 1600); return pancada(C); } empurra(); }
        if (atk.tipo === 'erro') return erroPassou();
        return volta(560);
      }
      if (segEscudo || (bot && r.tipo === 'escudo')) {
        if (bpm > 170 && Math.random() < .25) { legenda(T.treme, 1500); return pancada(C); }
        const perfeito = segEscudo ? (agora - tEscudo) < 220 : false;
        const escorrega = isM && fase >= 2 && !opts.lencoCabo && Math.random() < .1;
        esc -= escorrega ? 2 : 1; S.leituras++; if (perfeito) S.perfeitos++;
        if (escorrega) { S.escudosPerdidos++; umaVez('escorrega', TQ.escorrega, 2600); }
        cansa(perfeito ? .015 : .03);
        som.bloqueio(atk.tipo !== 'estocada'); faisca(C.x, C.y, perfeito ? 22 : 12, perfeito ? '255,236,170' : '255,226,170'); impactoFx(perfeito ? .35 : .6);
        if (perfeito && !ja.perfeito) { ja.perfeito = 1; anuncia(T.perfeito, 'fase'); }
        laus('impacto', 140); eu.alvoX = -10; eu.sq = .6; eu.branco = agora + 40;
        mudaBpm(atk.tipo === 'largo' ? 8 : 6); poeira(C.x - 20, chao(), 6); esforco();
        trocasLegenda();
        if (isM && fase >= 2 && opts.lencoCabo && !ja.lenco && trocas > 6) { ja.lenco = 1; setTimeout(() => { if (!fim) momento(TQ.lenco, 3600, 1500); }, 400); }
        hud();
        if (isM && fase === 3) { if (checaSemFim()) return; if (passos <= 1) { umaVez('calcanhar', TQ.calcanhar, 2600); return volta(420); } return recuaPasso(true); }
        if (!isM) empurra();
        if (atk.tipo === 'erro') return erroPassou();
        return checa(560);
      }
      return pancada(C);
    }
    function trocasLegenda() {
      const k = S.leituras;
      if (!isM) { if (k === 1) legenda(TQ.b1, 3400); else if (k === 2) legenda(TQ.b2, 3400); else if (k === 4) legenda(TQ.b4, 3400); }
      else if (k === 1) legenda(TQ.b1, 3200);
      if (bpm > 140 && !ja.medo && !isM) { ja.medo = 1; setTimeout(() => legenda(TQ.medo, 3400), 3500); }
    }
    function empurra() { if (passos > 2) passos--; if (passos === 9) setTimeout(() => umaVez('pedra', TQ.pedra, 3600), 3500); }
    function pancada(C) {
      S.golpesSofridos++; esc -= 2; S.escudosPerdidos += 2; som.dor(); impactoFx(1.2, '160,20,20'); laus('atingido', 520); eu.alvoX = -28; eu.alvoLean = -.08; eu.branco = agora + 50;
      poeira(C.x, chao(), 14); mudaBpm(12); cansa(.06); hud(); vib(90); esforco();
      if (atk && atk.tipo === 'erro') return erroPassou();
      return checa(700);
    }
    function checaSemFim() { if (esc > 0) return false; checa(600); return true; }
    function checa(ms) {
      if (esc <= 0) {
        if (isM && !misericordiaUsada) {
          misericordiaUsada = true; S.misericordia = 1; ele.vai('espera', agora, 300); ele.alvoX = Math.min(W * .07, 70); ele.alvoLean = 0;
          legenda(TQ.misericordia, 4600); sfx('rugido', .5); est = 'espera'; tEst = agora;
          setTimeout(() => { if (fim) return; esc = 3; hud(); ele.alvoX = 0; ele.vai('guarda', agora, 400); agenda(900); }, 2600);
          return;
        }
        return derrota();
      }
      if (isM && esc <= 2 && !ombroUsado && opts.ombro) { ombroUsado = true; esc++; hud(); setTimeout(() => { if (!fim) momento(TQ.ombro, 5600, 2600); }, 500); }
      return volta(ms);
    }
    function volta(ms) {
      est = 'recupera'; tEst = agora; trocas++; desdePausa++;
      setTimeout(() => {
        if (fim) return; ele.alvoX = 0; ele.alvoLean = 0; ele.vai(isM && fase === 3 ? 'avanca' : 'guarda', agora, 260);
        if (!segEscudo && !respiro) laus('guarda', 0); eu.alvoProf = 0; eu.alvoX = 0; eu.alvoLean = 0;
        mudaFase();
        if (cansaco > .55 && !ja.cansada) { ja.cansada = 1; legenda(TQ.cansada, 3200); }
        const cada = isM ? (fase === 1 ? 3 : fase === 2 ? 4 : 99) : 3;
        if (desdePausa >= cada && !(isM && fase === 3)) return pausa();
        agenda(gap());
      }, ms);
    }
    function gap() { if (!isM) return 900 + Math.random() * 400; if (fase === 3) return 380 + Math.random() * 220; if (fase === 2) return 800 + Math.random() * 400; return 900 + Math.random() * 500; }
    // ---------- a pausa: os dois se medem, e ela pode respirar
    function pausa() {
      desdePausa = 0; est = 'pausa'; tEst = agora; cam.alvoZoom = .94;
      ele.alvoX = Math.min(W * .08, 80); ele.vai(isM ? 'espera' : 'cansado', agora, 400);
      if (!ja.pausa) { ja.pausa = 1; legenda(TQ.pausa, 3200); }
      anuncia(T.pausa, 'fase'); root.classList.add('pausa');
      const anel = respBox.querySelector('.rp-anel'), rot = respBox.querySelector('.rp-fase');
      respiro = new window.JOGOS4.Respiro(anel, rot, { lang: opts.lang, A, bpm, ciclos: 2, bot,
        aoCiclo: (bom, b) => { if (bom) { S.respiros++; bpm = Math.min(bpm, b) - (opts.lencoPeito ? 3 : 0); cansa(-.07); esc = Math.min(ESC_MAX, esc + 1); hud(); } else mudaBpm(2); } });
      respiro.fim = () => fimPausa();
      respiro.comeca();
      laus('respirar', 0);
      if (isM && fase === 2 && Math.random() < .35) setTimeout(() => { if (est !== 'pausa' || fim) return; legenda(TQ.interrompe, 2200); fimPausa(true); }, 1600 + Math.random() * 1200);
      setTimeout(() => { if (est === 'pausa') fimPausa(); }, 9000);
    }
    function fimPausa(interrompe) {
      if (est !== 'pausa') return;
      respiro && respiro.para(); respiro = null; root.classList.remove('pausa');
      ele.alvoX = 0; ele.vai('guarda', agora, 300); laus('guarda', 0);
      if (interrompe) { iniciaAtaque(true); return; }
      agenda(700);
    }
    function erroPassou() {
      if (!ja.erroLeg) { ja.erroLeg = 1; legenda(TQ.erro, 4200); setTimeout(() => { if (!fim && est !== 'abertura' && !(atk && atk.tipo === 'largo')) legenda(TQ.espera, 2600); }, 4300); S.esperouErro = true; }
      ele.vai('erro', agora, 120); est = 'erro'; tEst = agora; ele.alvoLean = .05;
      setTimeout(() => { if (fim || est !== 'erro') return; ele.vai('guarda', agora, 360); ele.alvoLean = 0; agenda(1100); }, 1100);
    }
    function abre(ms, micro) {
      est = 'abertura'; tEst = agora; abertura = ms * fatorJanela(); ele.vai(isM ? 'recupera' : 'desequilibrado', agora, 140); ele.alvoX = -Math.min(W * .08, 70); ele.alvoLean = .12;
      if (!micro) { legenda(TQ.lateral, 3000); anuncia(T.aberto, 'ouro'); slow = .35; cam.alvoZoom = 1.18; vib(30); }
      atk.micro = !!micro;
    }
    function golpe() {
      if (est === 'abertura') {
        if (atk && atk.micro) { S.leituras++; laus('golpe', 360); eu.alvoX = 24; som.bloqueio(false); const C = choque(); faisca(C.x, C.y); impactoFx(.4); legenda(TQ.ataque, 2600); est = 'recupera'; cansa(.02); return volta(500); }
        return vitoriaJoseph();
      }
      if (est === 'pronto' || est === 'fim' || est === 'video' || est === 'espera' || est === 'pausa') return;
      S.cedo++; laus('golpe', 380); eu.alvoX = 22; rastro(eu, P().eu, escala(), '220,230,245'); cansa(.03);
      som.bloqueio(false); const C = choque(); faisca(C.x, C.y); impactoFx(.4); mudaBpm(6);
      if (!isM && est === 'erro') { legenda(T.cedo, 1800); golpeN = 2; est = 'recupera'; return volta(600); }
      legenda(isM ? TQ.ataque : T.cedo, 2200);
      if (est === 'guarda' || est === 'recupera' || est === 'aviso') { atk = isM ? { tipo: 'estocada', tell: 380, poseT: 'aviso-estocada', poseG: 'estocada' } : { tipo: 'pesado', tell: 440, poseT: 'aviso', poseG: 'golpe', lateral: false }; resp = null; est = 'aviso'; tEst = agora; ele.vai(atk.poseT, agora, 90); }
    }
    function recuaPasso(empurrada) {
      passos--; if (passos === 12 && !ja.deixo) { ja.deixo = 1; setTimeout(() => legenda(TQ.deixo, 3000), 300); }
      if (passos === 9 && !ja.pedraM) { ja.pedraM = 1; setTimeout(() => { if (!fim) momento(TQ.pedra, 4600, 2400); }, 200); }
      if (passos <= 0) {
        passos = 2; esc -= 3; S.escudosPerdidos += 3; som.escorrega(); laus('escorrega', 700); impactoFx(1); legenda(TQ.cedoPedra, 2600); mudaBpm(14); cansa(.06); hud();
        voz('conta-02', 700); return checa(900);
      }
      voz('conta-' + String(passos).padStart(2, '0'), 120); anuncia(T.nums[passos - 1], 'conta');
      if (passos <= 3 && A && A.tone) A.tone(880, .05, 'square', .015);
      hud(); return volta(empurrada ? 420 : 380);
    }
    function mudaFase() {
      if (!isM) return;
      if (fase === 1 && trocas >= 6) { fase = 2; chuvaAlvo = 1; root.classList.add('chuva-forte'); legenda(TQ.chuva, 4200); anuncia(T.fase2, 'fase'); musica && musica.fase(2); sfx('chuva-elmo', .6); }
      else if (fase === 2 && trocas >= 13) { fase = 3; passos = 13; desdePausa = 0; legenda(TQ.vem, 3000); anuncia(T.fase3, 'fase'); musica && musica.fase(3); voz('conta-13', 900); hud(); }
    }

    // ---------- fim de luta
    function vitoriaJoseph() {
      fim = true; est = 'fim'; slow = .3; laus('golpe', 0); eu.alvoX = Math.min(W * .1, 90); rastro(eu, P().eu, escala(), '255,214,170'); som.corte(); impactoFx(1.4, '180,20,20'); cam.alvoZoom = 1.25;
      setTimeout(() => { ele.vai('atingido', agora, 220); ele.alvoLean = 0; som.rugido(); anuncia(T.sangue, 'ouro'); slow = 1; cam.alvoZoom = 1; }, 380);
      setTimeout(() => { eu.vai('vitoria', agora, 500); eu.alvoX = 0; }, 1400);
      setTimeout(() => acaba({ resultado: 'venceu' }), 3400);
    }
    function queda() {
      fim = true; est = 'fim'; S.contagemUm = true; voz('conta-01', 0); anuncia(T.nums[0], 'conta');
      legenda(TQ.um, 5200); leg.classList.add('forte'); slow = .4; cam.alvoZoom = 1.2; ele.vai('escorrega', agora, 260); ele.alvoX = -Math.min(W * .14, 120); ele.alvoLean = .2;
      setTimeout(() => { som.escorrega(); impactoFx(.8); }, 300); setTimeout(() => som.suspiro(), 700);
      setTimeout(revelacao, 4400);
    }
    function revelacao() {
      est = 'video'; musica && musica.corta(); musica && musica.abafa(0);
      const box = root.querySelector('.ar-video'), v = box.querySelector('video'), vl = box.querySelector('.ar-vleg'), bt = box.querySelector('.ar-golpear');
      const vleg = (t) => { vl.textContent = t; vl.classList.remove('on'); void vl.offsetWidth; vl.classList.add('on'); };
      root.classList.add('sem-elmo');
      box.classList.add('on'); v.src = opts.videoElmo; v.playbackRate = .8; v.play().catch(() => {});
      vleg(TQ.cai);
      setTimeout(() => { vleg(TQ.correia); sfx('correia-estala', 1); vib([30, 40, 80]); }, 1700);
      setTimeout(() => { vleg(TQ.voa); }, 3300);
      setTimeout(() => sfx('elmo-lama', .9), 5200);
      let feito = false;
      const final = () => { if (feito) return; feito = true; bt.classList.remove('on'); som.corte(); vib(120); box.classList.add('corte'); vleg(TQ.corte); setTimeout(() => acaba({ resultado: 'venceu' }), 4200); };
      const mostraBotao = () => { vleg(TQ.rosto); bt.classList.add('on'); bt.onclick = final; if (bot) setTimeout(final, 400); };
      let mostrou = false; const quando = () => { if (!mostrou) { mostrou = true; mostraBotao(); } };
      v.onended = quando; setTimeout(quando, 6600);
      root._golpeFinal = () => { if (bt.classList.contains('on')) final(); };
    }
    function derrota() {
      fim = true; est = 'fim'; laus('atingido', 0); ele.vai(isM ? 'vitoria-dele' : 'guarda', agora, 400); som.dor(); impactoFx(1.5, '140,10,10'); sfx('suspiro-multidao', .7); vib(200);
      musica && musica.corta();
      setTimeout(() => {
        const tela = root.querySelector('.ar-tela');
        tela.innerHTML = `<h2>${T.perdeu}</h2><p class="ar-sub">${T.perdeuSub}</p><button class="cta ar-de-novo">${T.denovo}</button>`;
        tela.classList.add('on'); tela.querySelector('.ar-de-novo').onclick = () => acaba({ resultado: 'perdeu' });
      }, 1600);
    }
    function acaba(res) {
      if (!vivo) return; vivo = false; clearTimeout(batT); clearTimeout(folegoT); clearTimeout(voltaT); removeEventListener('resize', rs); removeEventListener('keydown', kd, true); removeEventListener('keyup', ku, true);
      respiro && respiro.para(); musica && musica.para(); window.__ARENA = null;
      resolve(Object.assign({ quem: Q, bpmFinal: Math.round(bpm), bpmMedio: Math.round(S.bpmSoma / Math.max(1, S.bpmN)), cansacoFinal: +cansaco.toFixed(2), escudoFinal: Math.max(0, esc) }, S, res));
    }

    // ---------- entrada do leitor
    function acao(a, solta) {
      if (!rodando || fim) { if (a === 'golpe' && root._golpeFinal) root._golpeFinal(); return; }
      if (a === 'respirar') { if (respiro) { if (solta) respiro.solta(); else respiro.segura(); } return; }
      if (a === 'escudo') {
        segEscudo = !solta;
        if (!solta) { tEscudo = agora; if (est !== 'pausa') laus('escudo', 0); } else if (est !== 'abertura' && est !== 'pausa') laus('guarda', 0);
        return;
      }
      if (solta) return;
      if (a === 'golpe') return golpe();
      if (a === 'lateral' || a === 'recuar') {
        if (est !== 'aviso' && est !== 'golpe') {
          if (est === 'pausa') return;
          laus(a === 'recuar' ? 'recuar' : 'lateral', 300); if (a === 'lateral') { eu.alvoProf = .6; cansa(.02); }
          mudaBpm(2); return;
        }
        if (resp) return;
        const falta = atk.tell - (agora - tEst);
        if (a === 'lateral') {
          const jan = (isM ? 300 : 400) * fatorJanela();
          const certo = atk.lateral && est === 'aviso' && falta <= jan;
          resp = { tipo: 'lateral', certo };
          if (!certo) { laus('lateral', 300); eu.alvoProf = .6; cansa(.03); if (!atk.bash) { resp = null; S.cedo++; mudaBpm(4); if (atk.lateral && !ja.lateralCedoLeg) { ja.lateralCedoLeg = 1; legenda(T.cedo, 1400); } } }
          return;
        }
        if (est === 'aviso' && falta > atk.tell * .75) return;
        resp = { tipo: 'recuar' }; mudaBpm(3); laus('recuar', 420); eu.alvoX = -passoPx() * .6;
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

    // ---------- o leitor-robô (testes): lê bem, mas cansa como qualquer um
    function robo() {
      if (!bot || !rodando || fim) return;
      if (est === 'abertura' && !atk.micro) return golpe();
      if (est !== 'aviso' || resp) return;
      const falta = atk.tell - (agora - tEst);
      if (isM && fase === 3) { if (atk.tipo === 'pesado' && passos <= 1) { if (falta < 240) acao('lateral'); return; } if (falta < 260) { resp = passos <= 1 ? { tipo: 'escudo' } : { tipo: 'recuar' }; } return; }
      if (!isM && atk.tipo === 'largo' && falta < 260) return acao('lateral');
      if (atk.lateral && falta < 240 && cansaco < .6) return acao('lateral');
      if (falta < 200) resp = { tipo: 'escudo' };
    }

    // ---------- laço
    const laco = (now) => {
      if (!vivo) return;
      const dtR = Math.min(.05, (now - ultimo) / 1000); ultimo = now;
      if (congela > 0) { congela -= dtR * 1000; desenha(0); return requestAnimationFrame(laco); }   // o impacto para o tempo
      const dt = dtR * slow; agora += dt * 1000;
      if (rodando && !fim) {
        S.bpmSoma += bpm * dtR; S.bpmN += dtR; cansa(.0035 * dtR * (isM ? 1.2 : 1));
        if (est === 'guarda' || est === 'recupera') mudaBpm(-1.2 * dtR);
        if (segEscudo) cansa(.004 * dtR);
        robo();
        if (est === 'guarda' && agora >= proxima) iniciaAtaque();
        else if (est === 'aviso' && agora - tEst >= atk.tell) impacto();
        else if (est === 'abertura' && agora - tEst > abertura) { slow = 1; cam.alvoZoom = 1; if (!isM) { legenda(TQ.lateralCedo, 1800); golpeN = 4; } volta(300); }
        if (est === 'guarda') ele.alvoX = Math.sin(agora / 800) * 10;
      }
      eu.treme = bpm > 165 ? (bpm - 165) / 8 : 0;
      desenha(dt);
      requestAnimationFrame(laco);
    };

    const comeca = () => {
      root.querySelector('.ar-tela').classList.remove('on'); rodando = true; ultimo = performance.now();
      if (A && A.ctx) { musica = trilha(A); musica.fase(1); }
      if (isM) setTimeout(() => legenda(TQ.inicio, 3600), 400);
      sfx('sino-arena', .8); agenda(2200); bate(); folego();
    };
    root.querySelector('.ar-go').onclick = comeca;
    Promise.all([carrega('laus'), carrega(Q)]).then(() => {});
    window.__ARENA = { get est() { return est; }, get atk() { return atk && atk.tipo; }, get resp() { return resp && (resp.tipo + (resp.certo ? '!' : '')); }, get esc() { return esc; }, get passos() { return passos; }, get fase() { return fase; }, get bpm() { return bpm; }, get cansaco() { return cansaco; }, comeca, acao, S };
    requestAnimationFrame(laco);
  });
}
window.ARENA = { start };
})();
