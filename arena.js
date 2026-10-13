/* ==========================================================================
   A ARENA v6 · os duelos do Torneio Real (Capítulo IV)

   Referências: Punch-Out (adversário grande, aviso exagerado, cada um é um
   quebra-cabeça), Sekiro (cada ataque perigoso tem UMA resposta certa),
   Slay the Spire (a intenção do inimigo aparece antes), Undertale (a luta é
   a história do personagem; a misericórdia é escolha), Celeste (errar volta
   ao último trecho, não ao começo).

   Três moedas, uma para cada defesa:
     ESCUDO  gasta BRAÇO   (os escudos no alto da tela; erguer em cima da hora gasta menos)
     RECUAR  gasta CHÃO    (as pegadas até a pedra; contra Markus, entrega pressão)
     LATERAL gasta FÔLEGO  (a fenda do elmo fecha) e é o único que abre a guarda
     GOLPEAR só existe dentro da abertura.
   Sobre o adversário: um sinal (a intenção) e um anel que fecha até o golpe.
   A luta acontece em trocas; a história entra nas pausas, com o tempo parado.
   Joseph ensina um botão por vez. Markus cobra: troca a regra, tira a vista
   com a chuva (sobra o ouvido) e faz Laus contar treze passos até a pedra.
   ========================================================================== */
(() => {
'use strict';
const TX = {
  pt: {
    tJoseph: 'Joseph', sJoseph: 'Semifinal · o primeiro sangue decide',
    tMarkus: 'Markus', sMarkus: 'A final · o primeiro sangue decide',
    introJ: 'Joseph gira a espada em arcos largos, como quem já fez isso mil vezes.',
    introM: 'Markus não gira a espada. Ergue o escudo até o queixo e espera.',
    comecar: 'Ao círculo', continuar: 'Continuar', toque: 'toque para continuar',
    teclado: 'Teclado: ↑ escudo (segure) · ← recuar · ↓ passo lateral · → golpear · espaço respirar · Enter continuar',
    botoes: { recuar: 'Recuar', lateral: 'Lateral', escudo: 'Escudo', golpe: 'Golpear', respirar: 'Respirar' },
    nervo: 'O coração não para quieto hoje. Os sinais vão chegar mais em cima da hora.',
    exausto: 'O corpo ainda carrega os outros dias. A fenda do elmo começa estreita.',
    cedo: 'Cedo.', ainda: 'Ainda não.', aberto: 'Agora!', perfeito: 'Na hora.', sente: 'Ele sente.', pedra: 'A pedra.', semEscudo: 'O braço não sobe.', bloqueia: 'Ele defende.',
    fase2: 'A chuva engrossa', fase3: 'Treze passos', sangue: 'Sangue tirado!', golpear: 'Golpear',
    perdeu: 'Não pode ser assim.', denovo: 'De novo, desta troca',
    // o que ensinar, na hora em que aparece: [o que Laus pensa, o que o jogador faz]
    ensino: {
      escudo: ['A espada sobe. Vem alto.', 'Segure ESCUDO até o golpe bater. Erguido quando o anel quase fecha, o braço quase não sente.'],
      recuar: ['Recuar não cansa o braço.', 'RECUAR tira você do alcance. Mas cada passo para trás é uma pegada a menos até a pedra.'],
      erro: ['O golpe sai torto. O pé arrasta na areia.', 'Isso não é a abertura. Não golpeie. Espere o próximo.'],
      lateral: ['O golpe mais largo de todos. Ele quer terminar aqui.', 'PASSO LATERAL agora, com o anel quase fechado. Nem antes.'],
      golpe: ['Ele passou do ponto.', 'GOLPEAR.'],
      estocada: ['A espada recua na cintura. Vem reta.', 'Sinal amarelo: a ponta. ESCUDO ou RECUAR. Para o lado, nunca: a ponta segue o corpo.'],
      micro: ['Ele passou. Por um instante, só um.', 'GOLPEAR. Ele defende, mas sente. Três vezes, e ele precisa se afastar.'],
      respirar: 'Segure RESPIRAR enquanto o anel enche e solte no alto. Cada fôlego certo devolve um escudo ao braço.',
      treze: 'Cada RECUAR é um passo, e eu conto. O ESCUDO segura o chão, mas cansa o braço. Com o calcanhar na pedra, só o PASSO LATERAL, no golpe pesado.',
      ouvido: 'Na chuva, o sinal chega tarde. O ar dele chega antes: duas vezes, curto, é o golpe pesado.',
    },
    motivo: {
      nada: ['Nada entre mim e a espada.', 'Escudo, recuar ou passo lateral: qualquer resposta é melhor que nenhuma.'],
      lateralPonta: ['Fui para o lado contra a ponta. A ponta seguiu o corpo.', 'Sinal amarelo é estocada: escudo ou recuar.'],
      lateralCedo: ['Fui para o lado cedo demais. Ele corrigiu o golpe no ar.', 'O passo lateral é no último instante, quando o anel quase fecha.'],
      cedo: ['Golpeei antes da abertura.', 'Golpear só quando ele passar do ponto e a abertura brilhar.'],
      braco: ['O braço não aguentou subir de novo.', 'O escudo cansa o braço. Recuar e o passo lateral não. Respire nas pausas.'],
      finta: ['O golpe pesado não veio. Veio o escudo dele.', 'Quando o sinal vermelho apaga e fica branco, é finta: escudo.'],
      escorrega: ['O pé achou a pedra antes da hora.', 'Com o calcanhar na pedra, não recue mais. Espere o golpe pesado.'],
    },
    misA: 'Meu escudo desce. Ele vê. Recua dois passos e espera.',
    misOps: ['Levanto o escudo.', 'Avanço na guarda baixa dele.'],
    misLevanta: 'Ergo o braço. Só então ele volta a avançar. A arena aplaude ele por isso.',
    misAvanca: 'Ele ergue o escudo antes de eu chegar, sem pressa nenhuma. A arena vaia, e não é para ele. Ele não vai esperar de novo.',
    guardaCede: 'Ele dá dois passos para trás e sacode o braço do escudo. Pela primeira vez, quem precisa de ar é ele.',
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
      b1: 'O golpe dele não é o mais forte que já recebi. É o mais certo. O escudo inteiro canta.',
      ataque: 'Ele nem recua. Recebe no escudo e devolve antes de eu terminar o gesto.',
      lateral: 'Passo para o lado. Ele não cai para a frente como Joseph. Segura o peso a um palmo do chão. Não há erro para esperar.',
      finta: 'O golpe pesado que não vem. Vem o escudo, na altura do meu peito.',
      pausa: 'Ele se afasta e me rodeia, devagar. A chuva escorre pela fenda.',
      pressao: 'Cada passo que eu dou para trás, ele toma. Sem pressa. O chão é dele agora.',
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
    introJ: 'Joseph wheels his sword in wide arcs, like someone who has done it a thousand times.',
    introM: 'Markus doesn’t spin his sword. He raises his shield to his chin and waits.',
    comecar: 'To the circle', continuar: 'Continue', toque: 'tap to continue',
    teclado: 'Keyboard: ↑ shield (hold) · ← step back · ↓ sidestep · → strike · space breathe · Enter continue',
    botoes: { recuar: 'Step back', lateral: 'Sidestep', escudo: 'Shield', golpe: 'Strike', respirar: 'Breathe' },
    nervo: 'My heart won’t keep still today. The signs will come later than they should.',
    exausto: 'The body still carries the other days. The helmet’s slit starts narrow.',
    cedo: 'Too soon.', ainda: 'Not yet.', aberto: 'Now!', perfeito: 'Right on time.', sente: 'He feels it.', pedra: 'The stone.', semEscudo: 'My arm won’t rise.', bloqueia: 'He blocks.',
    fase2: 'The rain thickens', fase3: 'Thirteen steps', sangue: 'First blood!', golpear: 'Strike',
    perdeu: 'It can’t end like this.', denovo: 'Again, from this exchange',
    ensino: {
      escudo: ['The sword rises. It’s coming high.', 'Hold SHIELD until the blow lands. Raised just as the ring closes, the arm barely feels it.'],
      recuar: ['Stepping back doesn’t tire the arm.', 'STEP BACK takes you out of reach. But every step back is one footprint less before the stone.'],
      erro: ['The blow goes crooked. His foot drags in the sand.', 'That isn’t the opening. Don’t strike. Wait for the next one.'],
      lateral: ['The widest blow of all. He wants to end it here.', 'SIDESTEP now, with the ring almost closed. Not before.'],
      golpe: ['He went past the point.', 'STRIKE.'],
      estocada: ['The sword draws back at his hip. It comes straight.', 'Yellow sign: the point. SHIELD or STEP BACK. Never to the side: the point follows the body.'],
      micro: ['He went past. For an instant, just one.', 'STRIKE. He blocks, but he feels it. Three times, and he has to back off.'],
      respirar: 'Hold BREATHE while the ring fills and let go at the top. Every good breath gives the arm back a shield.',
      treze: 'Every STEP BACK is a step, and I count it. The SHIELD holds the ground but tires the arm. With my heel on the stone, only the SIDESTEP, on the heavy blow.',
      ouvido: 'In the rain, the sign comes late. His breath comes first: twice, short, is the heavy blow.',
    },
    motivo: {
      nada: ['Nothing between me and the sword.', 'Shield, step back or sidestep: any answer beats none.'],
      lateralPonta: ['I went to the side against the point. The point followed my body.', 'A yellow sign is a thrust: shield or step back.'],
      lateralCedo: ['I went to the side too soon. He corrected the blow in the air.', 'The sidestep is at the last instant, when the ring is almost closed.'],
      cedo: ['I struck before the opening.', 'Strike only when he goes past the point and the opening shines.'],
      braco: ['My arm couldn’t lift again.', 'The shield tires the arm. Stepping back and sidestepping don’t. Breathe in the pauses.'],
      finta: ['The heavy blow never came. His shield did.', 'When the red sign goes out and turns white, it’s a feint: shield.'],
      escorrega: ['My foot found the stone too soon.', 'With my heel on the stone, don’t step back again. Wait for the heavy blow.'],
    },
    misA: 'My shield drops. He sees it. He steps back two paces and waits.',
    misOps: ['I raise my shield.', 'I go for his lowered guard.'],
    misLevanta: 'I raise my arm. Only then does he come on again. The arena applauds him for it.',
    misAvanca: 'He raises his shield before I get there, in no hurry at all. The arena boos, and it isn’t at him. He won’t wait again.',
    guardaCede: 'He takes two steps back and shakes out his shield arm. For the first time, he’s the one who needs air.',
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
      b1: 'His blow isn’t the strongest I’ve ever taken. It’s the surest. The whole shield sings.',
      ataque: 'He doesn’t even step back. He takes it on the shield and returns it before I finish the motion.',
      lateral: 'I step aside. He doesn’t pitch forward like Joseph. He holds his weight a hand above the ground. There’s no mistake to wait for.',
      finta: 'The heavy blow that never comes. His shield comes instead, at the height of my chest.',
      pausa: 'He backs off and circles me, slowly. The rain runs down through the slit.',
      pressao: 'Every step I give back, he takes. No hurry. The ground is his now.',
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

// ------------------------------------------------------------------ os golpes
// resp: as respostas boas (os botões que acendem quando o jogo ainda ensina)
// lateral: o que acontece com o passo lateral na hora certa
const ATQ = {
  jPesado: { tipo: 'pesado', tell: 1250, poseT: 'aviso', poseG: 'golpe', custo: 1, lateral: 'desvia', resp: ['escudo', 'recuar'] },
  jRapido: { tipo: 'pesado', tell: 640, poseT: 'aviso', poseG: 'golpe', custo: 1, lateral: 'desvia', resp: ['escudo', 'recuar'], rapido: true },
  jErro: { tipo: 'erro', tell: 1150, poseT: 'aviso', poseG: 'erro', custo: 0, resp: [] },
  jLargo: { tipo: 'largo', tell: 1550, poseT: 'aviso-largo', poseG: 'golpe', custo: 2, lateral: 'abre', resp: ['lateral'] },
  mPesado: { tipo: 'pesado', tell: 1080, poseT: 'aviso-pesado', poseG: 'golpe-pesado', custo: 2, lateral: 'micro', resp: ['escudo', 'lateral'] },
  mEstocada: { tipo: 'estocada', tell: 780, poseT: 'aviso-estocada', poseG: 'estocada', custo: 1, lateral: 'fere', resp: ['escudo', 'recuar'] },
  mRapida: { tipo: 'estocada', tell: 540, poseT: 'aviso-estocada', poseG: 'estocada', custo: 1, lateral: 'fere', resp: ['escudo', 'recuar'], rapido: true },
  mFinta: { tipo: 'finta', tell: 1080, poseT: 'finta', poseG: 'escudo', custo: 1, lateral: 'bash', resp: ['escudo', 'recuar'] },
};
const COR = { escudo: '242,220,192', recuar: '143,179,217', lateral: '232,96,80', golpe: '226,182,96', pesado: '226,72,58', largo: '238,120,52', estocada: '244,204,86', erro: '160,160,160', finta: '226,72,58' };

// ------------------------------------------------------------------ o jogo
function start(root, opts) {
  const T = TX[opts.lang] || TX.en, A = opts.A, Q = opts.quem;
  const isM = Q === 'markus', TQ = isM ? T.M : T.J;
  const bot = !!window.__ARENA_BOT;
  const vib = (ms) => { if (navigator.vibrate) try { navigator.vibrate(ms); } catch (e) {} };
  return new Promise((resolve) => {
    const B = T.botoes, ORD = ['recuar', 'lateral', 'escudo', 'golpe'], SET = { recuar: '←', lateral: '↓', escudo: '↑', golpe: '→' };
    root.innerHTML = `
      <div class="ar-bg" style="background-image:url('${opts.fundo}')"></div>
      <div class="ar-bg chuva" style="background-image:url('${opts.fundoChuva || opts.fundo}')"></div>
      <canvas class="ar-cv"></canvas>
      <div class="ar-hud"><span class="ar-cor"></span><span class="ar-esc"></span><span class="ar-peg"></span><span class="ar-gd"></span></div>
      <div class="ar-anuncio"></div>
      <div class="ar-painel"><p class="ar-pn-txt"></p><p class="ar-pn-dica"></p><div class="ar-pn-ops"></div><button class="cta ar-pn-ok"></button><p class="ar-pn-toque">${T.toque}</p></div>
      <div class="ar-respiro"><div class="rp-anel"><i class="rp-guia"></i><i class="rp-ar"></i></div><p class="rp-fase"></p></div>
      <div class="ar-botoes">${ORD.map((a) => `<button data-a="${a}" style="--c:${COR[a]}"><i>${SET[a]}</i>${B[a]}</button>`).join('')}<button data-a="respirar" class="resp" style="--c:200,214,232"><i>◯</i>${B.respirar}</button></div>
      <div class="ar-tela on">
        <h2>${isM ? T.tMarkus : T.tJoseph}</h2><p class="ar-sub">${isM ? T.sMarkus : T.sJoseph}</p>
        <p class="ar-intro">${isM ? T.introM : T.introJ}</p>
        ${(opts.bpm || 0) >= 120 ? `<p class="ar-nervo">${T.nervo}</p>` : ''}${(opts.cansaco || 0) >= .3 ? `<p class="ar-nervo">${T.exausto}</p>` : ''}
        <button class="cta ar-go">${T.comecar}</button>
        <p class="ar-teclado">${T.teclado}</p>
      </div>
      <div class="ar-video"><video playsinline muted></video><p class="ar-vleg"></p><button class="ar-golpear">${T.golpear}</button></div>`;
    const $ = (s) => root.querySelector(s);
    const cv = $('.ar-cv'), cx = cv.getContext('2d'), bgs = root.querySelectorAll('.ar-bg');
    const anuncio = $('.ar-anuncio'), hudCor = $('.ar-cor'), hudEsc = $('.ar-esc'), hudPeg = $('.ar-peg'), hudGd = $('.ar-gd');
    const pn = $('.ar-painel'), pnTxt = $('.ar-pn-txt'), pnDica = $('.ar-pn-dica'), pnOps = $('.ar-pn-ops'), pnOk = $('.ar-pn-ok');
    const respBox = $('.ar-respiro'), btn = {}; root.querySelectorAll('.ar-botoes button').forEach((b) => { btn[b.dataset.a] = b; });
    let W = 0, H = 0, DPR = 1;
    const rs = () => { DPR = Math.min(devicePixelRatio || 1, 2); W = root.clientWidth; H = root.clientHeight; cv.width = W * DPR; cv.height = H * DPR; };
    addEventListener('resize', rs); rs();

    // ---------- estado
    const ESC_MAX = 6;
    const S = { golpesSofridos: 0, leituras: 0, laterais: 0, perfeitos: 0, fintasLidas: 0, escudosPerdidos: 0, misericordia: 0, avancou: 0, contagemUm: false, esperouErro: false, cedo: 0, respiros: 0, recomecos: 0, bpmSoma: 0, bpmN: 0 };
    let esc = ESC_MAX, bpm = opts.bpm || 96, cansaco = Math.min(.6, opts.cansaco || 0);
    let passos = isM ? 13 : 4, pressao = 0, guardaM = 3, ronda = 0, idx = 0, fase = 1;
    const libera = new Set(isM ? ['escudo', 'recuar', 'lateral', 'golpe'] : ['escudo']);
    const falhas = [0, 0, 0], ensinado = {}, ja = {};
    let snap = null, motivoUlt = 'nada';
    const eu = new Lutador('laus', 1), ele = new Lutador(Q, -1);
    let agora = 0, ultimo = performance.now(), vivo = true, rodando = false, fim = false, slow = 1, congela = 0, trava = false, slowAte = 0;
    let est = 'pronto', atk = null, resp = null, segEscudo = false, tEscudo = -1e9, escudoForcado = false, abertura = null, token = 0;
    let painel = null, ensinoBtn = null, respiro = null, misUsada = false, ombroUsado = false, ouviu = false, sabeAviso = !!opts.sabeAviso;
    const cam = { x: 0, zoom: 1, alvoZoom: 1, rot: 0, sx: 0, sy: 0, shake: 0 };
    const parts = [], gotas = [], flashes = [], rastros = [], ondas = [], fila = [];
    let chuva = isM ? .25 : 0, chuvaAlvo = chuva, musica = null;

    // relógio do jogo: para quando a luta para (ensino, momento, pausa), anda devagar no slow
    const depois = (ms, fn) => fila.push({ t: agora + ms, fn });
    const assist = () => falhas[ronda] >= (isM && ronda === 2 ? 1 : 2);
    const ensinando = () => !isM || ronda === 0 || assist();

    // ---------- voz, som e letreiro
    const sfx = (n, v = .7, res) => A && A.sfx(n, v, res);
    const voz = (n, ms = 0) => { if (!A || !A.ctx || !A.on) return; setTimeout(() => A.once('assets/audio/voz/' + n + '.mp3', 1), ms); };
    const esforco = () => { if (Math.random() < .5) voz('esforco-' + (1 + Math.floor(Math.random() * 3)), 0); };
    const tom = (f, d, tipo = 'sine', v = .05) => A && A.tone && A.tone(f, d, tipo, v);
    const som = {
      bloqueio(forte) { sfx(forte ? 'escudo-impacto-1' : 'escudo-impacto-2', .8, () => { A.tone(140, .3, 'triangle', .14); A.hiss(.2, 1800, 2, .14); }); },
      bash() { sfx('espada-escudo-bash', .85, () => A.tone(90, .35, 'sine', .25)); },
      vento() { sfx('golpe-ar', .6, () => A.hiss(.3, 1200, .9, .1)); },
      passo() { sfx(chuva > .5 ? 'passo-lama' : 'passo-areia', .45, () => A.hiss(.12, 160, .6, .14, 0, 'lowpass')); },
      ar() { sfx('respira-nariz', .9, () => { A.hiss(.12, 900, 1.5, .12); A.hiss(.12, 900, 1.5, .12, .22); }); },
      corte() { sfx('corte', .9, () => A.tone(196, .7, 'sine', .1)); },
      dor() { sfx('escudo-impacto-1', .6); tom(70, .5, 'sine', .25); },
      rugido() { sfx('rugido', .75); }, suspiro() { sfx('suspiro-multidao', .7); },
      escorrega() { sfx('escorrega-pedra', .9); },
      sinal(tipo) { if (tipo === 'estocada') { tom(660, .09, 'triangle', .05); tom(880, .07, 'triangle', .04); } else if (tipo === 'largo') tom(98, .6, 'sawtooth', .05); else if (tipo === 'erro') tom(150, .2, 'triangle', .03); else tom(110, .35, 'sawtooth', .05); },
    };
    const anuncia = (t, cls = '') => { anuncio.className = 'ar-anuncio ' + cls; anuncio.textContent = t; void anuncio.offsetWidth; anuncio.classList.add('on'); };
    const hud = () => {
      hudEsc.innerHTML = Array.from({ length: ESC_MAX }, (_, i) => `<i class="${i < esc ? 'on' : ''}"></i>`).join('');
      hudEsc.className = 'ar-esc' + (esc <= 2 ? ' baixo' : '');
      const nPeg = isM ? (fase === 3 ? 13 : 0) : (libera.has('recuar') ? 4 : 0);
      hudPeg.innerHTML = nPeg ? Array.from({ length: nPeg }, (_, i) => `<i class="${i < passos ? 'on' : ''}"></i>`).join('') + (isM ? `<b>${passos}</b>` : '') : '';
      hudPeg.className = 'ar-peg' + (nPeg ? ' on' : '') + (passos <= 1 ? ' fim' : '');
      hudGd.innerHTML = isM && fase < 3 && ja.microVisto ? Array.from({ length: 3 }, (_, i) => `<i class="${i < guardaM ? 'on' : ''}"></i>`).join('') : '';
      ORD.forEach((a) => btn[a].classList.toggle('trava', !libera.has(a)));
      btn.escudo.classList.toggle('morto', esc <= 0);
    };
    const sugere = (lista) => { ORD.forEach((a) => btn[a].classList.toggle('sug', !!lista && lista.includes(a))); };

    // ---------- o corpo: medo (coração) e cansaço (fenda)
    const fatorJanela = () => (1 - Math.min(.3, Math.max(0, (bpm - 140) / 110))) * (1 - cansaco * .3) * (assist() ? 1.5 : 1);
    const janLateral = () => (isM ? 340 : 460) * fatorJanela();
    const janPerfeito = () => 260 * (assist() ? 1.4 : 1);
    const lentidao = () => 1 + cansaco * .5;
    const mudaBpm = (d) => { bpm = Math.max(70, Math.min(190, bpm + d)); };
    const cansa = (d) => { cansaco = Math.max(0, Math.min(1, cansaco + d)); };
    let batT = 0, folegoT = 0;
    const bate = () => {
      if (!vivo) return;
      if (A && A.ctx && A.on && rodando && !fim) A.batida && A.batida(Math.min(1, Math.max(.15, (bpm - 80) / 90)));
      if (rodando && !fim && bpm > 140) vib(bpm > 165 ? 22 : 12);
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
    const chao = () => H * .84;
    const escala = () => Math.min(H * .42, W * .5) / ((META['laus-guarda'] || { alt: 600 }).alt);
    const altM = () => (META[Q + '-guarda'] || { alt: 600 }).alt;
    const kE = () => escala() * ALTURA[Q] * ((META['laus-guarda'] || { alt: 600 }).alt / altM());
    const passoPx = () => Math.min(W * .045, 40);
    const dist = () => Math.min(W * .3, H * .42);
    const P = () => { const m = W / 2; return { eu: m - dist() * .55 + eu.x, ele: m + dist() * .55 + ele.x, pedra: m - dist() * .55 - (passos + .6) * passoPx() }; };
    const tremer = (f) => { cam.shake = Math.max(cam.shake, f); };
    const impactoFx = (forca, cor = '255,240,215') => { congela = Math.max(congela, 60 + forca * 50); tremer(5 + forca * 9); flashes.push({ cor, a: .12 + forca * .18, d: 200, t: agora }); vib(Math.round(18 + forca * 30)); };

    function desenhaLut(l, x, k) {
      const t = Math.min(1, (agora - l.tPose) / l.dPose);
      const uma = (pose, alfa, branco) => {
        const mm = META[l.quem + '-' + pose], ii = IMG[l.quem + '-' + pose]; if (!mm || !ii || alfa <= .01) return;
        const resp = (pose === 'guarda' || pose === 'respirar' || pose === 'cansado' || pose === 'espera' || pose === 'avanca') ? Math.sin(agora / (l === eu ? 520 - cansaco * 200 : 480)) * (l === eu ? .006 + cansaco * .014 : .006) : 0;
        const s = k * (1 - l.prof * .07), sy = 1 + resp + l.sq * -.04, sx = 1 + l.sq * .03;
        cx.save();
        cx.translate(x + (l.treme ? (Math.random() - .5) * l.treme : 0), chao() - l.prof * 8);
        cx.rotate(l.lean * l.lado); cx.globalAlpha = alfa;
        if (branco) cx.filter = 'brightness(0) invert(1)'; else if (l.prof > .3) cx.filter = 'brightness(.78)';
        cx.drawImage(ii, -mm.ax * s * sx, -mm.base * s * sy, mm.w * s * sx, mm.h * s * sy);
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
    // ---------- o sinal: o que vem, e quando
    const tipoSinal = () => (atk.tipo === 'finta' && (agora - atk.t0) / atk.tell > .55 ? 'bash' : atk.tipo);
    const sinalVisivel = () => { if (!atk) return 0; const f = (agora - atk.t0) / atk.tell; const de = atk.mostra || 0; return f < de ? 0 : Math.min(1, (f - de) / .08); };
    function desenhaSinal(p, ke) {
      const vis = sinalVisivel(); if (!vis) return;
      const f = Math.min(1, (agora - atk.t0) / atk.tell), tipo = tipoSinal();
      const x = p.ele - ke * 30, y = chao() - ke * altM() * 1.1, r0 = 17, R = r0 + 52 * (1 - f);
      const cor = tipo === 'bash' ? '245,245,245' : COR[atk.tipo];
      // o corpo dele acende onde o golpe nasce
      const gy = atk.tipo === 'estocada' ? chao() - ke * altM() * .5 : chao() - ke * altM() * .82;
      let g = cx.createRadialGradient(p.ele, gy, 4, p.ele, gy, ke * 260); g.addColorStop(0, `rgba(${cor},${.22 * vis * (.4 + f * .6)})`); g.addColorStop(1, `rgba(${cor},0)`);
      cx.fillStyle = g; cx.beginPath(); cx.arc(p.ele, gy, ke * 260, 0, 6.283); cx.fill();
      cx.save(); cx.globalAlpha = vis;
      // a faixa: a janela certa perto do fim do anel
      if (atk.tipo !== 'erro') {
        const band = atk.lateral === 'abre' || (atk.lateral === 'micro' && !(fase === 3 && passos > 1)) ? janLateral() : janPerfeito();
        const bw = Math.min(1, band / atk.tell) * 52, corB = atk.lateral === 'abre' || atk.lateral === 'micro' ? COR.lateral : COR.escudo;
        cx.strokeStyle = `rgba(${corB},.38)`; cx.lineWidth = bw; cx.beginPath(); cx.arc(x, y, r0 + bw / 2, 0, 6.283); cx.stroke();
      }
      cx.strokeStyle = 'rgba(255,255,255,.55)'; cx.lineWidth = 1.5; cx.beginPath(); cx.arc(x, y, r0, 0, 6.283); cx.stroke();
      cx.strokeStyle = `rgba(${cor},.95)`; cx.lineWidth = 3; cx.beginPath(); cx.arc(x, y, R, 0, 6.283); cx.stroke();
      // o ícone
      cx.fillStyle = `rgb(${cor})`; cx.strokeStyle = `rgb(${cor})`; cx.lineWidth = 3.2; cx.lineCap = 'round';
      if (tipo === 'pesado' || tipo === 'finta') { if (!(atk.tipo === 'finta' && f > .5 && Math.floor(agora / 45) % 2)) { cx.beginPath(); cx.arc(x + 4, y + 4, 10, -2.6, -.3); cx.stroke(); cx.beginPath(); cx.moveTo(x + 13, y + 3); cx.lineTo(x + 10, y + 11); cx.lineTo(x + 5, y + 4); cx.fill(); } }
      else if (tipo === 'largo') { cx.lineWidth = 4; cx.beginPath(); cx.arc(x, y + 6, 13, -2.9, -.25); cx.stroke(); cx.beginPath(); cx.moveTo(x - 12, y + 1); cx.lineTo(x - 16, y + 10); cx.lineTo(x - 7, y + 7); cx.fill(); }
      else if (tipo === 'estocada') { cx.beginPath(); cx.moveTo(x + 11, y); cx.lineTo(x - 9, y); cx.stroke(); cx.beginPath(); cx.moveTo(x - 12, y); cx.lineTo(x - 4, y - 6); cx.lineTo(x - 4, y + 6); cx.fill(); }
      else if (tipo === 'bash') { cx.beginPath(); cx.moveTo(x - 8, y - 9); cx.lineTo(x + 8, y - 9); cx.lineTo(x + 8, y + 1); cx.lineTo(x, y + 10); cx.lineTo(x - 8, y + 1); cx.closePath(); cx.fill(); }
      else if (tipo === 'erro') { cx.setLineDash([3, 4]); cx.beginPath(); cx.moveTo(x - 10, y + 4); cx.quadraticCurveTo(x - 2, y - 10, x + 3, y + 2); cx.quadraticCurveTo(x + 7, y + 9, x + 11, y - 3); cx.stroke(); cx.setLineDash([]); }
      cx.restore();
    }
    function desenha(dt) {
      cam.zoom += (cam.alvoZoom - cam.zoom) * Math.min(1, dt * 4);
      cam.rot += (((bpm > 150 ? Math.sin(agora / 700) * .012 * ((bpm - 150) / 40) : 0) + (cansaco > .5 ? Math.sin(agora / 1300) * .008 : 0)) - cam.rot) * Math.min(1, dt * 3);
      cam.shake *= Math.pow(.0009, Math.max(dt, .004)); cam.sx = (Math.random() - .5) * cam.shake; cam.sy = (Math.random() - .5) * cam.shake;
      const p = P(); const foco = (p.eu + p.ele) / 2; cam.x += ((foco - W / 2) - cam.x) * Math.min(1, dt * 3);
      bgs.forEach((b) => { b.style.transform = `translate(${(-cam.x * .25 + cam.sx * .5).toFixed(1)}px, ${(cam.sy * .5).toFixed(1)}px) scale(${(1.06 + (cam.zoom - 1) * .45).toFixed(3)}) rotate(${(cam.rot * 40).toFixed(2)}deg)`; });
      cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.clearRect(0, 0, W, H);
      cx.translate(W / 2 + cam.sx, chao() + cam.sy); cx.rotate(cam.rot); cx.scale(cam.zoom, cam.zoom); cx.translate(-W / 2 - cam.x, -chao());
      const mostraPedra = isM ? fase === 3 : libera.has('recuar');
      if (mostraPedra && p.pedra > -400) {
        cx.fillStyle = chuva > .5 ? 'rgba(196,204,214,.92)' : 'rgba(214,208,196,.92)'; cx.fillRect(p.pedra - 600, chao() - 10, 600, 24);
        cx.fillStyle = chuva > .5 ? 'rgba(235,242,250,.55)' : 'rgba(255,255,255,.25)'; cx.fillRect(p.pedra - 600, chao() - 10, 600, 3);
        cx.fillStyle = 'rgba(0,0,0,.35)'; cx.fillRect(p.pedra - 4, chao() - 10, 4, 24);
        // as pegadas que ainda restam até a pedra
        cx.fillStyle = 'rgba(255,240,215,.22)';
        for (let i = 0; i < passos; i++) { const px = p.pedra + (i + .6) * passoPx(); cx.beginPath(); cx.ellipse(px, chao() + 6, passoPx() * .18, 3, 0, 0, 6.283); cx.fill(); }
      }
      const sombra = (x, r) => { const g = cx.createRadialGradient(x, chao(), 2, x, chao(), r); g.addColorStop(0, 'rgba(0,0,0,.5)'); g.addColorStop(1, 'rgba(0,0,0,0)'); cx.fillStyle = g; cx.beginPath(); cx.ellipse(x, chao(), r, r * .16, 0, 0, 6.283); cx.fill(); };
      const kL = escala(), ke = kE();
      sombra(p.eu, kL * 260); sombra(p.ele, ke * 280);
      for (const l of [eu, ele]) { l.x += (l.alvoX - l.x) * Math.min(1, dt * (l === eu ? 10 / lentidao() : 9)); l.lean += (l.alvoLean - l.lean) * Math.min(1, dt * 10); l.sq *= Math.pow(.002, Math.max(dt, .004)); l.prof += (l.alvoProf - l.prof) * Math.min(1, dt * 12); }
      // na chuva, antes de o sinal chegar, ele é um borrão
      if (fase >= 2 && est === 'aviso' && atk && !sinalVisivel()) { cx.save(); cx.filter = 'blur(5px)'; cx.globalAlpha = .6; desenhaLut(ele, p.ele, ke); cx.restore(); }
      else desenhaLut(ele, p.ele, ke);
      desenhaLut(eu, p.eu, kL);
      for (let i = rastros.length - 1; i >= 0; i--) { const r = rastros[i], a = (agora - r.t) / 170; if (a >= 1) { rastros.splice(i, 1); continue; }
        cx.strokeStyle = `rgba(${r.cor},${.7 * (1 - a)})`; cx.lineWidth = 9 * (1 - a) + 1; cx.lineCap = 'round'; cx.beginPath(); cx.arc(r.x, r.y, r.r, Math.min(r.a0, r.a1), Math.max(r.a0, r.a1)); cx.stroke(); }
      // o ar dele, visto como onda, depois que ela descobre
      for (let i = ondas.length - 1; i >= 0; i--) { const o = ondas[i], a = (agora - o.t) / 700; if (a >= 1) { ondas.splice(i, 1); continue; } if (a < 0) continue;
        const ox = p.ele - ke * 40, oy = chao() - ke * altM() * .88; cx.strokeStyle = `rgba(225,236,248,${.85 * (1 - a)})`; cx.lineWidth = 3 - a * 2; cx.beginPath(); cx.arc(ox, oy, 14 + a * 70, Math.PI - 1, Math.PI + 1); cx.stroke(); }
      if (est === 'aviso' && atk) desenhaSinal(p, ke);
      if (est === 'abertura') { const x = p.ele - ke * 30, y = chao() - ke * 260, r = 26 + 10 * Math.sin(agora / 70); const g = cx.createRadialGradient(x, y, 2, x, y, r * 2); g.addColorStop(0, `rgba(${COR.golpe},.7)`); g.addColorStop(1, `rgba(${COR.golpe},0)`); cx.fillStyle = g; cx.beginPath(); cx.arc(x, y, r * 2, 0, 6.283); cx.fill(); }
      for (let i = parts.length - 1; i >= 0; i--) { const q = parts[i], a = (agora - q.t) / q.vida; if (a >= 1) { parts.splice(i, 1); continue; } q.x += q.vx * dt; q.y += q.vy * dt; q.vy += 300 * dt; cx.globalAlpha = q.a * (1 - a); cx.fillStyle = `rgb(${q.cor})`; cx.beginPath(); cx.arc(q.x, q.y, q.r, 0, 6.283); cx.fill(); }
      cx.globalAlpha = 1;
      cx.setTransform(DPR, 0, 0, DPR, 0, 0);
      chuva += (chuvaAlvo - chuva) * Math.min(1, dt * .8);
      const n = Math.round(chuva * (W < 700 ? 110 : 220));
      while (gotas.length < n) gotas.push({ x: Math.random() * W * 1.2, y: Math.random() * H, v: 900 + Math.random() * 500, l: 10 + Math.random() * 18 });
      if (gotas.length > n) gotas.length = n;
      const sg = trava ? 0 : slow;
      cx.strokeStyle = 'rgba(210,222,236,.32)'; cx.lineWidth = 1; cx.beginPath();
      for (const g of gotas) { g.y += g.v * dt * sg; g.x -= g.v * .12 * dt * sg; if (g.y > H) { g.y = -20; g.x = Math.random() * W * 1.2; } cx.moveTo(g.x, g.y); cx.lineTo(g.x + g.l * .12, g.y - g.l); }
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
      if (trava) { cx.fillStyle = 'rgba(0,0,0,.28)'; cx.fillRect(0, 0, W, H); }
    }
    const poeira = (x, y, n = 10, cor = '214,200,170') => { for (let i = 0; i < n; i++) parts.push({ x, y, vx: (Math.random() - .5) * 200, vy: -Math.random() * 180 - 30, r: 1 + Math.random() * 2.6, a: .7, cor: chuva > .5 ? '110,100,88' : cor, vida: 600 + Math.random() * 500, t: agora }); };
    const faisca = (x, y, n = 14, cor = '255,226,170') => { for (let i = 0; i < n; i++) parts.push({ x, y, vx: (Math.random() - .5) * 520, vy: -Math.random() * 320, r: .8 + Math.random() * 1.5, a: 1, cor, vida: 320 + Math.random() * 260, t: agora }); };
    const choque = () => { const p = P(); return { x: (p.eu + p.ele) / 2, y: chao() - escala() * 520 }; };

    // ---------- Laus: toda ação volta à guarda
    let voltaId = 0;
    function laus(pose, ms) {
      eu.vai(pose, agora, 80 * lentidao()); const id = ++voltaId;
      if (ms) depois(ms * lentidao(), () => { if (fim || id !== voltaId) return; eu.alvoProf = 0; eu.alvoX = 0; eu.alvoLean = 0; eu.vai(segEscudo && esc > 0 ? 'escudo' : respiro ? 'respirar' : cansaco > .7 ? 'cansado' : 'guarda', agora, 200 * lentidao()); });
    }

    // ---------- o painel: ensino, momento, pausa, escolha. Com ele aberto, o tempo da luta para.
    function abrePainel(modo, txt, dica, cfg = {}) {
      painel = modo; trava = modo !== 'pausa';
      pn.className = 'ar-painel on ' + modo; pnTxt.innerHTML = txt || ''; pnDica.innerHTML = dica ? fmtDica(dica) : ''; pnOps.innerHTML = '';
      pnOk.style.display = cfg.ok ? '' : 'none'; pnOk.textContent = cfg.ok || ''; pnOk.onclick = cfg.ok ? () => cfg.aoOk && cfg.aoOk() : null;
      $('.ar-pn-toque').style.display = cfg.toque ? '' : 'none';
      pn.onclick = cfg.toque ? (e) => { if (e.target.closest('button')) return; cfg.aoOk && cfg.aoOk(); } : null;
      (cfg.ops || []).forEach((o, i) => { const b = document.createElement('button'); b.className = 'cta ghost'; b.textContent = o; b.onclick = (e) => { e.stopPropagation(); cfg.aoOp(i); }; pnOps.appendChild(b); });
      painel_ok = cfg.aoOk || null; painel_op = cfg.aoOp || null;
    }
    let painel_ok = null, painel_op = null;
    function fechaPainel() { painel = null; trava = false; ensinoBtn = null; pn.className = 'ar-painel'; pn.onclick = null; ORD.forEach((a) => btn[a].classList.remove('ensina')); btn.respirar.classList.remove('ensina'); }
    // as palavras em maiúscula viram o botão, com a cor dele
    function fmtDica(d) {
      const mapa = {}; ORD.concat('respirar').forEach((a) => { mapa[B[a].toUpperCase()] = a; });
      return d.replace(/\b([A-ZÁÉÍÓÚÂÊÔÃÕÇ]{3,}(?: [A-ZÁÉÍÓÚÂÊÔÃÕÇ]{3,})?)\b/g, (m) => { const a = mapa[m] || (m === 'PASSO LATERAL' || m === 'SIDESTEP' ? 'lateral' : m === 'STEP BACK' ? 'recuar' : null); return a ? `<b class="k" data-a="${a}" style="--c:${COR[a] || '200,214,232'}">${SET[a] || '◯'} ${m}</b>` : m; });
    }
    const leitura = (t) => Math.min(9000, 1800 + t.length * 45);
    function momento(txt, dica, depoisFn) {
      abrePainel('momento', txt, dica, { toque: true, aoOk: () => { fechaPainel(); slowAte = agora + 500; depoisFn && depoisFn(); } });
      if (bot) setTimeout(() => { if (painel === 'momento') painel_ok(); }, 250);
    }
    function ensina(chave, botao, aoFeito) {
      ensinado[chave] = 1; const e = T.ensino[chave];
      abrePainel('ensino', e[0], e[1], botao ? {} : { toque: true, aoOk: () => { fechaPainel(); slowAte = agora + 700; aoFeito && aoFeito(); } });
      ensinoBtn = botao; if (botao) { btn[botao].classList.add('ensina'); ensinaFeito = aoFeito; }
      if (bot) setTimeout(() => { if (painel !== 'ensino') return; if (botao) acao(botao, false); else painel_ok(); }, 250);
    }
    let ensinaFeito = null;

    // ---------- as trocas
    const RJ = [
      { seq: ['jPesado', 'jPesado', 'jPesado'], libera: ['escudo'], ensina: { 0: 'escudo' } },
      { seq: ['jPesado', 'jPesado', 'jPesado', 'jPesado'], libera: ['escudo', 'recuar'], ensina: { 0: 'recuar' } },
      { seq: ['jPesado', 'jErro', 'jLargo'], libera: ['escudo', 'recuar'], ensina: { 1: 'erro', 2: 'lateral' }, volta: ['jPesado', 'jLargo'] },
    ];
    function escolheM() {
      const p = Math.min(4, pressao);
      if (fase === 3) {
        if (passos <= 1) { ja.naPedra = (ja.naPedra || 0) + 1; return (ja.naPedra >= 3 || Math.random() < .55) ? 'mPesado' : 'mEstocada'; }
        return Math.random() < .5 ? 'mPesado' : 'mEstocada';
      }
      if (ronda === 0 && idx === 0) return 'mEstocada';
      if (ronda === 0 && idx === 1) return 'mPesado';
      // ele lê Laus: quem ergue muito o escudo leva finta; quem vai muito para o lado leva estocada
      let wP = .5, wE = .34, wF = ronda === 1 && idx >= 1 ? .16 + Math.min(.25, (ja.escudoSeguidos || 0) * .07) : 0;
      wE += Math.min(.3, (ja.lateralRecente || 0) * .1);
      const r = Math.random() * (wP + wE + wF);
      void p; return r < wP ? 'mPesado' : r < wP + wE ? 'mEstocada' : 'mFinta';
    }
    function tamanhoRonda() { return isM ? (ronda === 0 ? 4 : 6) + Math.floor(pressao / 2) : RJ[ronda].seq.length; }
    function iniciaRonda(r, sem) {
      ronda = r; idx = 0; resp = null; atk = null; abertura = null; est = 'guarda';
      if (!isM) { RJ[r].libera.forEach((a) => libera.add(a)); passos = Math.max(passos, 4); }
      if (isM) {
        if (r === 1) { fase = 2; chuvaAlvo = 1; root.classList.add('chuva-forte'); musica && musica.fase(2); sfx('chuva-elmo', .6); if (!sem) anuncia(T.fase2, 'fase'); }
        if (r === 2) { fase = 3; passos = sem && ja.passosVolta ? ja.passosVolta : 13; musica && musica.fase(3); if (!sem) { anuncia(T.fase3, 'fase'); voz('conta-13', 300); } else if (passos < 13) { voz('conta-' + String(passos).padStart(2, '0'), 300); anuncia(T.nums[passos - 1], 'conta'); } }
      }
      pressao = 0; guardaM = 3;
      snap = { esc, bpm, cansaco, passos };
      hud(); const tok = ++token;
      depois(sem ? 600 : 1300, () => { if (tok === token && !fim) proximo(); });
    }
    function proximo() {
      if (fim || painel) return;
      let nome;
      if (!isM) {
        const R = RJ[ronda];
        if (idx < R.seq.length) nome = R.seq[idx];
        else if (R.volta) nome = R.volta[(idx - R.seq.length) % R.volta.length];
        else return pausa();
      } else {
        if (fase < 3 && idx >= tamanhoRonda()) return pausa();
        nome = escolheM();
      }
      iniciaAtaque(nome);
    }
    function iniciaAtaque(nome, extra) {
      const D = ATQ[nome]; const i = extra ? -1 : idx++;
      atk = Object.assign({ nome, i }, D); resp = null; est = 'aviso'; atk.t0 = agora;
      let tell = D.tell;
      if (!isM && !D.rapido) tell *= 1 - Math.min(.16, i * .04) * (ronda === 2 && i >= 3 ? 0 : 1);
      if (isM) tell *= 1 - .05 * Math.min(4, pressao) - (fase === 3 ? .06 : 0);
      if (bpm > 150) tell *= .93;
      if (assist()) tell *= 1.25;
      atk.tell = tell;
      // na chuva o sinal chega tarde; quem já ouviu o ar dele sabe antes
      atk.mostra = fase >= 2 && !assist() ? (atk.tipo === 'pesado' && ouviu ? .3 : .52) : 0;
      ele.vai(D.poseT, agora, Math.min(260, tell * .3)); ele.alvoLean = -.05; ele.alvoX = Math.min(W * .02, 16); som.passo();
      cam.alvoZoom = 1.08;
      if (!atk.mostra) som.sinal(atk.tipo); else { const tt = atk.t0, tp = atk.tipo; depois(tell * atk.mostra, () => { if (atk && atk.t0 === tt) som.sinal(tp); }); }
      sugere(ensinando() ? D.resp.filter((a) => libera.has(a) && !(a === 'recuar' && !podeRecuar())) : null);
      if (fase >= 2 && atk.tipo === 'pesado') { som.ar(); if (ouviu) ondas.push({ t: agora }, { t: agora + 200 }, { t: agora + 400 }); }
      if (fase >= 2 && atk.tipo === 'estocada') sfx('passo-lama', .8);
      const t0 = atk.t0;
      // o que se ensina, na hora em que aparece
      const R = !isM ? RJ[ronda] : null;
      const chave = R && R.ensina[i] && !ensinado[R.ensina[i]] ? R.ensina[i] : isM && i >= 0 && atk.tipo === 'estocada' && !ensinado.estocada ? 'estocada' : null;
      if (chave) {
        const quando = { escudo: .7, recuar: .55, erro: .5, estocada: .5 }[chave];
        const em = chave === 'lateral' ? tell - janLateral() * .55 : tell * quando;
        depois(em, () => {
          if (!atk || atk.t0 !== t0 || fim) return;
          // quem já respondeu sozinho não precisa da aula
          if (chave !== 'erro' && (resp || (chave === 'escudo' && segEscudo))) { ensinado[chave] = 1; if (chave === 'lateral') { libera.add('lateral'); hud(); } return; }
          if (chave === 'erro') return ensina('erro', null, () => {});
          if (chave === 'lateral') libera.add('lateral'), hud();
          ensina(chave, chave === 'estocada' ? 'recuar' : chave, () => {});
        });
      }
      // a descoberta: o ar antes do golpe pesado
      if (isM && fase === 2 && atk.tipo === 'pesado' && !ouviu && (sabeAviso || (ja.pesadosChuva = (ja.pesadosChuva || 0) + 1) >= 2)) {
        ouviu = true; ondas.push({ t: agora + 60 }, { t: agora + 280 });
        depois(60, () => { if (!fim) momento(sabeAviso ? TQ.ouvido : TQ.descobre, T.ensino.ouvido, () => { atk && (atk.mostra = Math.min(atk.mostra, .3)); }); });
      }
    }
    const podeRecuar = () => !isM ? passos > 0 : true;

    // ---------- o golpe chega
    function impacto() {
      est = 'golpe'; sugere(null);
      const p = P(), C = choque(), a = atk;
      ele.fantasma = { pose: ele.pose, t: agora }; ele.vai(a.poseG, agora, 70);
      ele.alvoX = -Math.min(W * .06, 56); ele.alvoLean = .07; ele.sq = 1; rastro(ele, p.ele, kE());
      cam.alvoZoom = 1.02;
      let r = resp;
      if (!r && (segEscudo || escudoForcado) && esc > 0) r = { tipo: 'escudo', perfeito: escudoForcado || (agora - tEscudo) <= janPerfeito() };
      escudoForcado = false;
      ja.lateralRecente = Math.max(0, (ja.lateralRecente || 0) - .34);
      if (a.tipo === 'erro') return passaErro(r);
      if (!r) return fere('nada', C);
      if (r.tipo === 'golpe') return fere('cedo', C);
      if (r.tipo === 'recuar') return recua();
      if (r.tipo === 'escudo') return defende(r.perfeito, C);
      // passo lateral
      ja.lateralRecente = (ja.lateralRecente || 0) + 1; ja.escudoSeguidos = 0;
      if (a.lateral === 'fere') return fere('lateralPonta', C);
      if (a.lateral === 'bash') { ja.fintaM = 1; return fere('finta', C, true); }
      if (!r.certo) return fere('lateralCedo', C);
      S.leituras++; S.laterais++; som.vento(); eu.alvoProf = 1; eu.alvoX = -14; laus('lateral', 520); cansa(.05);
      if (a.lateral === 'abre') return abre(1500, false);
      if (a.lateral === 'micro') {
        if (fase === 3) { if (passos <= 1) return queda(); anuncia(T.ainda, 'conta'); return segue(500); }
        ja.lateralM = 1; pressao = Math.max(0, pressao - 1); return abre(460, true);
      }
      return segue(520);
    }
    function defende(perfeito, C) {
      const a = atk; ja.escudoSeguidos = (ja.escudoSeguidos || 0) + 1;
      let custo = Math.max(0, a.custo - (perfeito ? 1 : 0));
      if (isM && fase >= 2 && !opts.lencoCabo && Math.random() < .12) { custo++; ja.escorregou = 1; }
      esc -= custo; S.escudosPerdidos += custo; S.leituras++; if (perfeito) S.perfeitos++;
      if (a.tipo === 'finta') { S.fintasLidas++; som.bash(); } else som.bloqueio(a.tipo !== 'estocada');
      cansa(perfeito ? .012 : .028);
      faisca(C.x, C.y, perfeito ? 22 : 12, perfeito ? '255,236,170' : '255,226,170'); impactoFx(perfeito ? .35 : .6);
      if (perfeito && (ja.perfeitoN = (ja.perfeitoN || 0) + 1) <= 3) anuncia(T.perfeito, 'conta');
      laus('impacto', 140); eu.alvoX = -10; eu.sq = .6; eu.branco = agora + 40;
      mudaBpm(a.custo >= 2 ? 6 : 4); poeira(C.x - 20, chao(), 6); esforco();
      if (esc <= 0) { esc = 0; hud(); return escudoCai(); }
      if (checaOmbro()) return;
      hud();
      return segue(560);
    }
    function recua() {
      S.leituras++; som.vento(); laus('recuar', 420); eu.alvoX = -passoPx(); eu.alvoLean = -.04; ja.escudoSeguidos = 0;
      if (!isM) { passos = Math.max(0, passos - 1); hud(); if (passos === 0) anuncia(T.pedra, 'conta'); return segue(540); }
      if (fase < 3) { pressao = Math.min(4, pressao + 1); if (pressao >= 2) ja.pressaoVista = 1; return segue(Math.max(300, 520 - pressao * 50)); }
      return recuaPasso();
    }
    // Contra Markus, na reta final: cada passo para trás é um número, na voz dela
    function recuaPasso() {
      passos--; cansa(.015);
      voz('conta-' + String(passos).padStart(2, '0'), 120); anuncia(T.nums[passos - 1], 'conta');
      if (passos <= 3 && A && A.tone) A.tone(880, .05, 'square', .015);
      hud();
      if (passos === 1 && !ja.calcanhar) { ja.calcanhar = 1; est = 'recupera'; depois(500, () => { if (!fim) momento(TQ.calcanhar, null, () => segue(200)); }); return; }
      return segue(400);
    }
    function escorregaPedra() {
      ja.escorregaPedra = 1; passos = 2; esc = Math.max(0, esc - 2); S.escudosPerdidos += 2; som.escorrega(); laus('escorrega', 700); impactoFx(1); mudaBpm(14); cansa(.06); motivoUlt = 'escorrega';
      voz('conta-02', 700); anuncia(TQ.cedoPedra.split('.')[0] + '.', 'fase'); hud();
      if (esc <= 0) return escudoCai();
      return segue(900);
    }
    function fere(motivo, C, bash) {
      motivoUlt = motivo; S.golpesSofridos++;
      if (motivo === 'lateralCedo' || motivo === 'lateralPonta') S.cedo++;
      if (esc <= 0) return derrota(motivo);
      esc = Math.max(0, esc - 2); S.escudosPerdidos += 2;
      if (bash) som.bash(); else som.dor();
      impactoFx(1.2, '160,20,20'); laus('atingido', 520); eu.alvoX = -28; eu.alvoLean = -.08; eu.branco = agora + 50;
      poeira(C.x, chao(), 14); mudaBpm(12); cansa(.06); vib(90); esforco();
      if (isM && fase === 3 && passos > 1) { passos--; voz('conta-' + String(passos).padStart(2, '0'), 380); anuncia(T.nums[passos - 1], 'conta'); }
      hud();
      if (esc <= 0) return escudoCai();
      if (isM && fase === 3 && passos === 1 && !ja.calcanhar) { ja.calcanhar = 1; est = 'recupera'; depois(700, () => { if (!fim) momento(TQ.calcanhar, null, () => segue(200)); }); return; }
      if (checaOmbro()) return;
      return segue(760);
    }
    function checaOmbro() {
      if (!(isM && esc <= 2 && !ombroUsado && opts.ombro)) return false;
      ombroUsado = true; esc++; hud(); est = 'recupera';
      depois(450, () => { if (!fim) momento(TQ.ombro, null, () => segue(200)); });
      return true;
    }
    // o braço do escudo cede
    function escudoCai() {
      segEscudo = false; laus(cansaco > .5 ? 'cansado' : 'guarda', 0);
      if (isM && !misUsada) return misericordia();
      anuncia(T.semEscudo, 'fase'); return segue(900);
    }
    function misericordia() {
      misUsada = true; S.misericordia = 1; est = 'espera';
      ele.vai('espera', agora, 300); ele.alvoX = Math.min(W * .08, 72); ele.alvoLean = 0;
      depois(700, () => {
        if (fim) return;
        abrePainel('escolha', T.misA, null, { ops: T.misOps, aoOp: (i) => {
          fechaPainel();
          if (i === 0) { esc = 3; hud(); som.rugido(); laus('escudo', 500); momento(T.misLevanta, null, () => { ele.alvoX = 0; ele.vai('guarda', agora, 400); segue(500); }); }
          else {
            S.avancou = 1; laus('golpe', 380); eu.alvoX = 26; ele.vai('escudo', agora, 120); ele.alvoX = 0; som.bash(); const C = choque(); faisca(C.x, C.y); impactoFx(.5);
            depois(400, () => sfx('suspiro-multidao', .8)); esc = 2; pressao = 4; hud();
            depois(700, () => momento(T.misAvanca, null, () => { ele.vai('guarda', agora, 300); segue(400); }));
          }
        } });
        if (bot) setTimeout(() => painel_op && painel_op(0), 300);
      });
    }
    function passaErro(r) {
      ele.vai('erro', agora, 120); est = 'erro'; ele.alvoLean = .05; som.vento();
      if (r && r.tipo === 'golpe') return castigaCedo();
      const tok = ++token;
      depois(1000, () => { if (fim || tok !== token || est !== 'erro') return; S.esperouErro = true; ele.vai('guarda', agora, 360); ele.alvoLean = 0; anuncia(T.ainda, 'conta'); segue(200); });
    }
    function abre(ms, micro) {
      est = 'abertura'; abertura = { t: agora, d: ms * fatorJanela() * (micro ? 1 : 1), micro };
      ele.vai(isM ? 'recupera' : 'desequilibrado', agora, 140); ele.alvoX = -Math.min(W * .08, 70); ele.alvoLean = .12;
      libera.add('golpe'); hud(); sugere(['golpe']);
      if (!micro) { anuncia(T.aberto, 'ouro'); slow = .35; cam.alvoZoom = 1.18; vib(30); }
      if (!micro && !ensinado.golpe) ensina('golpe', 'golpe');
      else if (micro && !ensinado.micro) { ja.microVisto = 1; hud(); ensina('micro', 'golpe'); }
    }
    function acertaAbertura() {
      sugere(null);
      if (!abertura.micro) return vitoriaJoseph();
      abertura = null; S.leituras++; laus('golpe', 360); eu.alvoX = 24; ele.vai('escudo', agora, 90); som.bloqueio(false);
      const C = choque(); faisca(C.x, C.y, 18); impactoFx(.45); guardaM--; pressao = 0; ja.microVisto = 1; hud();
      if (guardaM <= 0) { ja.guardaCedeu = 1; est = 'recupera'; ele.alvoX = Math.min(W * .08, 72); ele.vai('espera', agora, 400); depois(700, () => { if (!fim) pausa(true); }); return; }
      anuncia(T.sente, 'conta'); return segue(520);
    }
    // golpear fora da abertura: ele defende e devolve na hora
    function castigaCedo() {
      S.cedo++; motivoUlt = 'cedo'; est = 'recupera'; sugere(null);
      laus('golpe', 380); eu.alvoX = 22; rastro(eu, P().eu, escala(), '220,230,245'); cansa(.03);
      ele.vai(isM ? 'escudo' : 'guarda', agora, 90); som.bloqueio(false); const C = choque(); faisca(C.x, C.y); impactoFx(.4); mudaBpm(6);
      anuncia(T.cedo, 'mal'); if (isM) ja.ataqueM = 1; else S.esperouErro = false;
      const tok = ++token; depois(330, () => { if (fim || tok !== token) return; iniciaAtaque(isM ? 'mRapida' : 'jRapido', true); });
    }
    function segue(ms) {
      est = 'recupera'; sugere(null); const tok = ++token;
      depois(ms, () => {
        if (fim || tok !== token) return;
        ele.alvoX = 0; ele.alvoLean = 0; ele.vai(isM && fase === 3 ? 'avanca' : (!isM && ronda === 2 && idx >= 2 ? 'cansado' : 'guarda'), agora, 260);
        if (!segEscudo) laus('guarda', 0); eu.alvoProf = 0; eu.alvoX = 0; eu.alvoLean = 0;
        est = 'guarda';
        depois(gap(), () => { if (fim || tok !== token || est !== 'guarda') return; proximo(); });
      });
    }
    function gap() {
      const p = Math.min(4, pressao);
      if (!isM) return (ronda === 2 && idx >= 2 ? 1200 : 850) + Math.random() * 350;
      if (fase === 3) return 420 + Math.random() * 260;
      return (fase === 2 ? 760 : 900) * (1 - p * .12) + Math.random() * 380;
    }

    // ---------- a pausa: os dois se medem; a história entra aqui, e ela respira
    function linhasPausa(cedeu) {
      const L = [];
      if (!isM) {
        if (ronda === 0) L.push(TQ.pausa, TQ.b1);
        if (ronda === 1) { if (bpm > 128) L.push(TQ.medo); L.push(TQ.pedra, TQ.b4); }
        if (cansaco > .5 && !ja.cansadaDita) { ja.cansadaDita = 1; L.push(TQ.cansada); }
        return L;
      }
      // no máximo quatro frases: o que aconteceu de mais importante, e o que vem
      const extra = [];
      if (cedeu) extra.push(T.guardaCede);
      if (ronda === 0) {
        if (opts.lencoCabo) extra.push(TQ.lenco); if (ja.lateralM) extra.push(TQ.lateral); if (ja.ataqueM) extra.push(TQ.ataque); if (ja.pressaoVista) extra.push(TQ.pressao);
        return [TQ.b1].concat(extra.slice(0, 2), [TQ.chuva]);
      }
      if (ja.fintaM) extra.push(TQ.finta); if (ja.escorregou && !opts.lencoCabo) extra.push(TQ.escorrega); if (cansaco > .5) extra.push(TQ.cansada);
      return extra.slice(0, 2).concat([TQ.vem, TQ.pedra]);
    }
    function pausa(cedeu) {
      est = 'pausa'; sugere(null); cam.alvoZoom = .94; segEscudo = false;
      ele.alvoX = Math.min(W * .08, 80); ele.vai(isM ? 'espera' : 'cansado', agora, 400); laus('respirar', 0);
      if (!isM) passos = Math.min(4, passos + 2);
      pressao = 0; hud();
      const L = linhasPausa(cedeu), primeira = !ja.pausa; ja.pausa = 1;
      const dica = primeira ? T.ensino.respirar : (isM && ronda === 1 ? T.ensino.treze : null);
      root.classList.add('pausa');
      abrePainel('pausa', L.map((l) => `<span>${l}</span>`).join(''), dica, { ok: T.continuar, aoOk: fimPausa });
      if (primeira) btn.respirar.classList.add('ensina');
      const anel = respBox.querySelector('.rp-anel'), rot = respBox.querySelector('.rp-fase');
      respiro = new window.JOGOS4.Respiro(anel, rot, { lang: opts.lang, A, bpm, ciclos: 3, bot,
        aoCiclo: (bom, b) => { if (bom) { S.respiros++; bpm = Math.min(bpm, b) - (opts.lencoPeito ? 3 : 0); cansa(-.07); esc = Math.min(ESC_MAX, esc + 1); hud(); } else mudaBpm(2); } });
      respiro.fim = () => { pnOk.classList.add('pulsa'); if (bot) setTimeout(() => painel === 'pausa' && fimPausa(), 200); };
      respiro.comeca();
      // quem não respira ainda recupera um pouco: a pausa não pode ser castigo
      esc = Math.min(ESC_MAX, Math.max(esc, 2)); hud();
    }
    function fimPausa() {
      if (painel !== 'pausa') return;
      respiro && respiro.para(); respiro = null; root.classList.remove('pausa'); pnOk.classList.remove('pulsa'); fechaPainel();
      ele.alvoX = 0; ele.vai('guarda', agora, 300); laus('guarda', 0); cam.alvoZoom = 1;
      iniciaRonda(ronda + 1);
    }

    // ---------- fim de luta
    function vitoriaJoseph() {
      fim = true; est = 'fim'; sugere(null); slow = .3; laus('golpe', 0); eu.alvoX = Math.min(W * .1, 90); rastro(eu, P().eu, escala(), '255,214,170'); som.corte(); impactoFx(1.4, '180,20,20'); cam.alvoZoom = 1.25;
      setTimeout(() => { ele.vai('atingido', agora, 220); ele.alvoLean = 0; som.rugido(); anuncia(T.sangue, 'ouro'); slow = 1; cam.alvoZoom = 1; }, 380);
      setTimeout(() => { eu.vai('vitoria', agora, 500); eu.alvoX = 0; }, 1400);
      setTimeout(() => acaba({ resultado: 'venceu' }), 3400);
    }
    function queda() {
      fim = true; est = 'fim'; sugere(null); S.contagemUm = true; voz('conta-01', 0); anuncia(T.nums[0], 'conta');
      slow = .4; cam.alvoZoom = 1.2; ele.vai('escorrega', agora, 260); ele.alvoX = -Math.min(W * .14, 120); ele.alvoLean = .2;
      setTimeout(() => { som.escorrega(); impactoFx(.8); }, 300); setTimeout(() => som.suspiro(), 700);
      setTimeout(() => { trava = true; pn.className = 'ar-painel on momento'; pnTxt.textContent = TQ.um; pnDica.innerHTML = ''; pnOps.innerHTML = ''; pnOk.style.display = 'none'; $('.ar-pn-toque').style.display = 'none'; }, 900);
      setTimeout(() => { pn.className = 'ar-painel'; revelacao(); }, 5200);
    }
    function revelacao() {
      est = 'video'; musica && musica.corta(); musica && musica.abafa(0);
      const box = $('.ar-video'), v = box.querySelector('video'), vl = box.querySelector('.ar-vleg'), bt = box.querySelector('.ar-golpear');
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
    // perder não volta ao começo: volta ao começo desta troca
    function derrota(motivo) {
      if (isM && fase === 3) ja.passosVolta = Math.min(13, passos + 2);
      est = 'derrota'; token++; sugere(null); trava = false;
      laus('atingido', 0); ele.vai(isM ? 'vitoria-dele' : 'guarda', agora, 400); som.dor(); impactoFx(1.5, '140,10,10'); sfx('suspiro-multidao', .7); vib(200);
      const m = T.motivo[motivo] || T.motivo.nada;
      setTimeout(() => {
        const tela = $('.ar-tela');
        tela.innerHTML = `<h2>${T.perdeu}</h2><p class="ar-sub">${m[0]}</p><p class="ar-dica">${fmtDica(m[1])}</p><button class="cta ar-de-novo">${T.denovo}</button>`;
        tela.classList.add('on');
        const de = () => { tela.classList.remove('on'); recomeca(); };
        tela.querySelector('.ar-de-novo').onclick = de; if (bot) setTimeout(de, 300);
      }, 1500);
    }
    function recomeca() {
      falhas[ronda]++; S.recomecos++;
      esc = Math.max(snap.esc, 4); bpm = Math.max(80, snap.bpm - 8); cansaco = Math.max(0, snap.cansaco - .05); passos = snap.passos;
      fila.length = 0; abertura = null; resp = null; atk = null; segEscudo = false;
      eu.alvoX = 0; eu.alvoLean = 0; laus('guarda', 0); ele.alvoX = 0; ele.vai('guarda', agora, 300); hud();
      iniciaRonda(ronda, true);
    }
    function acaba(res) {
      if (!vivo) return; vivo = false; clearTimeout(batT); clearTimeout(folegoT); removeEventListener('resize', rs); removeEventListener('keydown', kd, true); removeEventListener('keyup', ku, true);
      respiro && respiro.para(); musica && musica.para(); window.__ARENA = null;
      resolve(Object.assign({ quem: Q, bpmFinal: Math.round(bpm), bpmMedio: Math.round(S.bpmSoma / Math.max(1, S.bpmN)), cansacoFinal: +cansaco.toFixed(2), escudoFinal: Math.max(0, esc) }, S, res));
    }

    // ---------- entrada do leitor
    function acao(a, solta) {
      if (!rodando) return;
      if (fim) { if (a === 'golpe' && !solta && root._golpeFinal) root._golpeFinal(); return; }
      if (a === 'respirar') { if (respiro && painel === 'pausa') { if (solta) respiro.solta(); else respiro.segura(); } return; }
      if (painel === 'ensino') {
        if (solta || a !== ensinoBtn) return;
        const feito = ensinaFeito; fechaPainel(); slowAte = agora + 700;
        if (a === 'escudo') { segEscudo = true; tEscudo = agora; escudoForcado = true; laus('escudo', 0); }
        else if (a === 'golpe') { if (abertura) acertaAbertura(); }
        else if (atk && est === 'aviso') registra(a, true);
        feito && feito(); return;
      }
      if (painel) return;
      if (!libera.has(a)) return;
      if (a === 'escudo') {
        if (solta) { segEscudo = false; if (est !== 'abertura' && est !== 'pausa') laus('guarda', 0); return; }
        if (esc <= 0) { anuncia(T.semEscudo, 'mal'); return; }
        segEscudo = true; tEscudo = agora; if (est !== 'pausa') laus('escudo', 0);
        return;
      }
      if (solta) return;
      if (a === 'golpe') {
        if (est === 'abertura' && abertura) return acertaAbertura();
        if (est === 'aviso' && !resp) { resp = { tipo: 'golpe' }; S.cedo++; motivoUlt = 'cedo'; laus('golpe', 380); eu.alvoX = 22; anuncia(T.cedo, 'mal'); return; }
        if (est === 'guarda' || est === 'recupera' || est === 'erro') return castigaCedo();
        return;
      }
      if (est === 'aviso' && !resp) return registra(a, false);
      // fora do aviso, o corpo se mexe mas não muda nada
      laus(a === 'recuar' ? 'recuar' : 'lateral', 300); if (a === 'lateral') { eu.alvoProf = .6; cansa(.015); }
    }
    function registra(a, ensinado_) {
      const falta = atk.tell - (agora - atk.t0);
      if (a === 'recuar') {
        if (isM && fase === 3 && passos <= 1) return escorregaPedraNoAviso();
        if (!podeRecuar()) { anuncia(T.pedra, 'mal'); laus('recuar', 200); eu.alvoX = -4; return; }
        resp = { tipo: 'recuar' }; laus('recuar', 420); eu.alvoX = -passoPx() * .6; mudaBpm(2); return;
      }
      if (a === 'lateral') {
        const certo = ensinado_ || falta <= janLateral();
        resp = { tipo: 'lateral', certo }; laus('lateral', 320); eu.alvoProf = .6; cansa(.03);
        if (!certo && atk.lateral !== 'fere' && atk.lateral !== 'bash' && atk.lateral !== 'desvia') anuncia(T.cedo, 'mal');
        if (!certo && atk.lateral === 'desvia') resp = { tipo: 'lateral', certo: true };   // contra Joseph, o passo lateral desvia mesmo cedo
      }
    }
    function escorregaPedraNoAviso() { atk = null; est = 'recupera'; sugere(null); ele.vai('guarda', agora, 200); escorregaPedra(); }
    const MAP = { ArrowLeft: 'recuar', ArrowDown: 'lateral', ArrowUp: 'escudo', ArrowRight: 'golpe', ' ': 'respirar', '1': 'recuar', '2': 'lateral', '3': 'escudo', '4': 'golpe', '5': 'respirar' };
    const kd = (e) => {
      if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); if (painel === 'momento' || (painel === 'ensino' && !ensinoBtn)) painel_ok && painel_ok(); else if (painel === 'pausa') fimPausa(); else if (!rodando) comeca(); return; }
      const a = MAP[e.key]; if (!a) return; e.preventDefault(); e.stopPropagation(); if (e.repeat) return; acao(a, false);
    };
    const ku = (e) => { const a = MAP[e.key]; if (!a) return; e.preventDefault(); acao(a, true); };
    addEventListener('keydown', kd, true); addEventListener('keyup', ku, true);
    Object.entries(btn).forEach(([a, b]) => {
      const hold = a === 'escudo' || a === 'respirar';
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); b.classList.add('on'); acao(a, false); if (hold) b.setPointerCapture && b.setPointerCapture(e.pointerId); });
      const up = () => { b.classList.remove('on'); if (hold) acao(a, true); };
      b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('pointerleave', () => { if (!hold) b.classList.remove('on'); });
    });

    // ---------- o leitor-robô (testes): lê bem, mas erra de vez em quando
    let botEsc = false;
    function robo() {
      if (!bot || !rodando || fim || painel) return;
      if (est === 'abertura' && abertura) return acao('golpe', false);
      if (botEsc && est !== 'aviso') { botEsc = false; acao('escudo', true); }
      if (est !== 'aviso' || resp || !atk) return;
      if (atk.botFalha == null) atk.botFalha = Math.random() < (window.__ARENA_BOT_ERRO || 0);
      if (atk.botFalha) return;
      const falta = atk.tell - (agora - atk.t0), t = atk.tipo;
      if (!sinalVisivel()) return;
      if (t === 'erro') return;
      if (isM && fase === 3) {
        if (t === 'pesado' && passos <= 1) { if (falta < janLateral() * .6) acao('lateral', false); return; }
        if (passos <= 1) { if (falta < 200 && !botEsc) { botEsc = true; acao('escudo', false); } return; }
        if (falta < 300) acao('recuar', false); return;
      }
      if (t === 'largo' || (t === 'pesado' && isM && libera.has('lateral') && cansaco < .7)) { if (falta < janLateral() * .6) acao('lateral', false); return; }
      if (t === 'estocada' && falta < 260) return acao('recuar', false);
      if (falta < 200 && !botEsc) { botEsc = true; acao('escudo', false); }
    }

    // ---------- laço
    const laco = (now) => {
      if (!vivo) return;
      const dtR = Math.min(.05, (now - ultimo) / 1000); ultimo = now;
      if (congela > 0) { congela -= dtR * 1000; desenha(0); return requestAnimationFrame(laco); }   // o impacto para o tempo
      if (trava) { desenha(dtR * .15); return requestAnimationFrame(laco); }
      const s = slowAte > agora ? Math.min(slow, .45) : slow;
      const dt = dtR * s; agora += dt * 1000;
      for (let i = 0; i < fila.length; i++) { if (fila[i].t <= agora) { const f = fila.splice(i, 1)[0]; i--; f.fn(); if (trava) break; } }
      if (rodando && !fim) {
        S.bpmSoma += bpm * dtR; S.bpmN += dtR; cansa(.003 * dtR * (isM ? 1.2 : 1));
        if (est === 'guarda' || est === 'recupera') mudaBpm(-1.2 * dtR);
        if (segEscudo) cansa(.004 * dtR);
        robo();
        if (est === 'aviso' && atk && agora - atk.t0 >= atk.tell) impacto();
        else if (est === 'abertura' && abertura && agora - abertura.t > abertura.d) {
          const micro = abertura.micro; abertura = null; slow = 1; cam.alvoZoom = 1; sugere(null);
          if (!micro) anuncia(T.ainda, 'conta');
          segue(300);
        }
        if (est === 'guarda') ele.alvoX = Math.sin(agora / 800) * 10;
      }
      eu.treme = bpm > 165 ? (bpm - 165) / 8 : 0;
      desenha(dt);
      requestAnimationFrame(laco);
    };

    const comeca = () => {
      if (rodando) return;
      $('.ar-tela').classList.remove('on'); rodando = true; ultimo = performance.now();
      if (A && A.ctx) { musica = trilha(A); musica.fase(1); }
      sfx('sino-arena', .8); bate(); folego();
      iniciaRonda(0);
    };
    $('.ar-go').onclick = comeca;
    // tocar a palavra destacada no ensino vale como tocar o botão
    pnDica.addEventListener('pointerdown', (e) => { const k = e.target.closest('.k'); if (!k || painel !== 'ensino' || k.dataset.a !== ensinoBtn) return; e.preventDefault(); e.stopPropagation(); acao(k.dataset.a, false); if (k.dataset.a === 'escudo') setTimeout(() => acao('escudo', true), 350); });
    // um momento (ou um ensino sem botão) continua com um toque em qualquer lugar da arena
    root.addEventListener('pointerup', (e) => { if (e.target.closest('.ar-botoes, .ar-painel, .ar-tela, .ar-video')) return; if ((painel === 'momento' || (painel === 'ensino' && !ensinoBtn)) && painel_ok) painel_ok(); });
    Promise.all([carrega('laus'), carrega(Q)]).then(() => {});
    hud();
    window.__ARENA = { get est() { return est; }, get atk() { return atk && atk.tipo; }, get resp() { return resp && (resp.tipo + (resp.certo ? '!' : '')); }, get esc() { return esc; }, get passos() { return passos; }, get fase() { return fase; }, get ronda() { return ronda; }, get painel() { return painel; }, get bpm() { return bpm; }, get cansaco() { return cansaco; }, comeca, acao, S, fimPausa };
    requestAnimationFrame(laco);
  });
}
window.ARENA = { start };
})();
