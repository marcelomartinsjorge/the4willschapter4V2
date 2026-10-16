/* ==========================================================================
   A ARENA v8 · Joseph e Markus no motor por turnos do Cap. II

   O mesmo duelo do laranjal, agora de armadura:
   - SEU TURNO: um menu (estocada, corte, finta, respirar). O golpe só entra
     se o toque cair quando o anel fecha sobre o adversário.
   - O TURNO DELE: ele avisa com o corpo, o anel fecha sobre Laus, e a
     resposta é na hora: ↑ ESCUDO (janela larga, cansa o braço e sobe o
     coração) ou ↓ PASSO LATERAL (janela estreita; certo, abre o adversário).
   - O CORAÇÃO estreita as janelas. Dentro do elmo, respirar acalma menos.
   - TRÊS MARCAS e a troca recomeça (do começo da fase, nunca do zero).

   Joseph: o aviso é o giro da espada (um giro, alto; dois giros, o golpe
   mais largo). No quinto golpe ele erra, e o menu oferece ESPERAR. Quem
   espera recebe o sexto, o mais largo, e o passo lateral abre a coxa.
   Markus: não morde finta e devolve todo golpe que não entra limpo. Na
   chuva os olhos falham e sobra o ouvido: o ar pelo nariz, duas vezes,
   antes do golpe pesado. No fim, treze passos até a pedra, contados na
   voz dela, e o único passo lateral que importa.

   A história entra na caixa de texto, entre os turnos, como num RPG.
   API igual à v7: window.ARENA.start(root, opts) → Promise<resultado>.
   ========================================================================== */
(() => {
'use strict';
const TX = {
  pt: {
    tJoseph: 'Joseph', sJoseph: 'Semifinal · o primeiro sangue decide',
    tMarkus: 'Markus', sMarkus: 'A final · o primeiro sangue decide',
    introJ: 'Joseph gira a espada em arcos largos, como quem já fez isso mil vezes.',
    introM: 'Markus não gira a espada. Ergue o escudo até o queixo e espera.',
    regrasJ: [
      ['Seu turno', 'escolha o golpe e toque quando o anel fechar sobre ele'],
      ['O turno dele', '↑ Escudo segura. ↓ Passo lateral, no último instante, faz ele passar do ponto'],
      ['Um giro', 'o golpe vem alto'],
      ['Dois giros', 'o golpe mais largo de todos'],
      ['O coração', 'quanto mais alto, menos tempo para responder. Dentro do elmo, respirar acalma menos'],
    ],
    regrasM: [
      ['Seu turno', 'ele não morde finta, e devolve todo golpe que não entra limpo'],
      ['Golpe pesado', '↓ Passo lateral no último instante. Ele passa, só por um instante'],
      ['Estocada e finta', '↑ Escudo. Para o lado, nunca: a ponta segue o corpo'],
      ['A chuva', 'apaga os olhos. O ouvido continua'],
      ['Três marcas', 'e a troca recomeça'],
    ],
    taca: ['A taça', 'no jantar, ele girava a taça antes de cada frase'],
    ar: ['O ar', 'antes do golpe pesado, ele puxa o ar pelo nariz. Duas vezes, curto'],
    comecar: 'Ao círculo', teclado: 'Teclado: 1 a 4 escolhem · Espaço golpeia · ↑ escudo · ↓ passo lateral · ← recuar · Enter avança o texto',
    nervo: 'O coração não para quieto hoje. As janelas começam mais estreitas.',
    exausto: 'O corpo ainda carrega os outros dias. A fenda do elmo começa estreita.',
    pergunta: 'O que Laus faz?',
    golpes: {
      estocada: ['Estocada', 'Rápida. Um tempo.'],
      corte: ['Corte', 'Dois tempos. Mais estrago, mais coração.'],
      finta: ['Finta', 'Ele morde e mostra o próximo golpe.'],
      fintaM: ['Finta', 'Contra ele? Tente.'],
      escutar: ['Escutar', 'Fechar os olhos no elmo. O próximo golpe, ouvir.'],
      esperar: ['Esperar', 'Deixar ele tentar mais uma vez.'],
      respirar: ['Respirar', 'Acalma o coração. Ele recupera a guarda.'],
    },
    agora: 'Agora', escudo: 'Escudo', lateral: 'Passo lateral', recuar: 'Recuar', segurar: 'Segurar',
    recuarD: 'Um passo. Eu conto.', segurarD: 'O escudo segura o chão. O braço paga.',
    perfeito: 'Na hora', bom: 'Entrou', defende: 'Ele defende', cedo: 'Cedo', tarde: 'Tarde', sente: 'Ele sente',
    segurou: 'Segurou', passou: 'Passou', contra: 'Ele passou do ponto', marca: 'Marca', ainda: 'Ainda não', pedra: 'A pedra', escorregou: 'O cabo escorrega',
    guarda: 'Guarda', coracao: 'Coração', passos: 'Passos', coxa: 'A coxa',
    tellJ: { alto: 'Ele gira a espada uma vez.', largo: 'Dois giros.', erro: 'Ele gira. O giro sai torto.', altoPrim: 'Ele gira a espada uma vez. Depois do giro, vem o golpe.', largoPrim: 'Dois giros. O golpe mais largo de todos.' },
    tellM: { pesado: 'A espada sobe.', finta: 'A espada sobe.', estocada: 'A espada recua na cintura. Vem reta.', chuva: 'A água entra pela fenda.', escuta: 'Ar, pelo nariz, duas vezes, curto.', semAr: 'Nenhum ar.' },
    mordeu: { alto: 'Ele morde. Vai girar uma vez.', largo: 'Ele morde. Vai girar duas vezes.' },
    respirou: 'Respiro dentro do aço. O coração desce um pouco.', respirouLenco: 'Respiro com a mão no peito, onde o lenço está. O coração desce.',
    fintaM: 'Ele não morde. Fica olhando a minha espada, não o meu ombro.',
    escutou: 'Fecho os olhos dentro do elmo. A chuva, o meu coração, e ele.',
    esperouSem: 'Espero. Ele espera também.',
    marcaJ: 'O golpe passa. O aço canta no meu ombro.', marcaM: 'O golpe entra. O ar sai todo de dentro do elmo.',
    pontaSegue: 'Fui para o lado contra a ponta. A ponta seguiu o corpo.',
    bash: 'O golpe pesado não veio. Veio o escudo dele, no meu peito.',
    lateralM2: 'Passo para o lado. Ele segura o peso, de novo. Ainda não.',
    fase2: 'A chuva engrossa', fase3: 'Treze passos', sangue: 'Sangue tirado!', golpear: 'Golpear',
    perdeu: 'Não pode ser assim.', denovo: 'De novo, desta troca', denovoSub: 'A troca recomeça do começo desta fase.',
    motivo: {
      nada: 'Escudo ou passo lateral: qualquer resposta é melhor que nenhuma.',
      ponta: 'Estocada e finta: escudo. O passo lateral é para o golpe pesado.',
      cedo: 'O passo lateral é no último instante, quando o anel quase fecha.',
      pedra: 'Com o calcanhar na pedra, não recue mais. Espere o golpe pesado.',
      joseph: 'Um giro: escudo. Dois giros: passo lateral, no último instante.',
    },
    misA: 'Meu escudo desce. Ele vê. Recua dois passos e espera.',
    misOps: ['Levanto o escudo.', 'Avanço na guarda baixa dele.'],
    misLevanta: 'Ergo o braço. Só então ele volta a avançar. A arena aplaude ele por isso.',
    misAvanca: 'Ele ergue o escudo antes de eu chegar, sem pressa nenhuma. A arena vaia, e não é para ele. Ele não vai esperar de novo.',
    guardaCede: 'Ele dá dois passos para trás e sacode o braço do escudo. Pela primeira vez, quem precisa de ar é ele.',
    cedeJ: 'A guarda dele cede. A perna de trás fica para trás.',
    J: {
      b1: 'O primeiro golpe vem alto. Ergo o escudo a tempo, mas o impacto sacode o braço inteiro até o cotovelo.',
      b2: 'Ele não me deixa respirar.',
      medo: 'Por um instante, só um, o medo vence a conta. Empurro o pensamento para fora. Não tem espaço para ele agora.',
      b4: 'Os braços já ardem, o suor desce por dentro do elmo e arde nos olhos. Quando ele vai errar?',
      cansa: 'O giro sai mais lento. A ponta da espada desce antes de subir.',
      erro: 'Ele erra no quinto golpe. É pequeno, quase nada. O golpe termina um dedo torto, e o pé direito arrasta na areia.',
      espera: 'Não ataco ainda. Deixo ele tentar mais uma vez.',
      largo: 'O sexto golpe é o mais largo de todos. Ele quer terminar ali.',
      lateral: 'Dou um passo para o lado em vez de recuar, e o peso dele o carrega um instante além do que qualquer guarda perdoaria.',
      lateralCedo: 'Ele se recupera. Ainda não é o erro.',
      coxa: 'Atrás da coxa, onde a placa não cobre inteiro o joelho.',
      cansada: 'O elmo pesa o dobro do que pesava de manhã.',
    },
    M: {
      b1: 'O golpe dele não é o mais forte que já recebi. É o mais certo. O escudo inteiro canta.',
      ataque: 'Ele nem recua. Recebe no escudo e devolve antes de eu terminar o gesto.',
      lateral: 'Passo para o lado. Ele não cai para a frente como Joseph. Segura o peso a um palmo do chão. Não há erro para esperar.',
      micro: 'Ele passou. Por um instante, só um.',
      finta: 'O golpe pesado que não vem. Vem o escudo, na altura do meu peito.',
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
    regrasJ: [
      ['Your turn', 'pick a move and tap when the ring closes on him'],
      ['His turn', '↑ Shield holds. ↓ Sidestep, at the last instant, carries him past the point'],
      ['One spin', 'the blow comes high'],
      ['Two spins', 'the widest blow of all'],
      ['Your heart', 'the higher it runs, the less time you have. Inside the helmet, breathing calms it less'],
    ],
    regrasM: [
      ['Your turn', 'he won’t bite on a feint, and he answers every blow that doesn’t land clean'],
      ['Heavy blow', '↓ Sidestep at the last instant. He goes past, for one instant only'],
      ['Thrust and feint', '↑ Shield. Never to the side: the point follows the body'],
      ['The rain', 'puts out your eyes. Your ears keep working'],
      ['Three marks', 'and the exchange starts over'],
    ],
    taca: ['The cup', 'at dinner, he spun his cup before every sentence'],
    ar: ['His breath', 'before the heavy blow, he draws air through his nose. Twice, short'],
    comecar: 'To the circle', teclado: 'Keyboard: 1 to 4 choose · Space strikes · ↑ shield · ↓ sidestep · ← step back · Enter moves the text on',
    nervo: 'My heart won’t keep still today. The windows start narrower.',
    exausto: 'The body still carries the other days. The helmet’s slit starts narrow.',
    pergunta: 'What does Laus do?',
    golpes: {
      estocada: ['Thrust', 'Fast. One beat.'],
      corte: ['Cut', 'Two beats. More damage, more heart.'],
      finta: ['Feint', 'He bites and shows his next blow.'],
      fintaM: ['Feint', 'Against him? Try it.'],
      escutar: ['Listen', 'Close your eyes in the helmet. Hear the next blow.'],
      esperar: ['Wait', 'Let him try once more.'],
      respirar: ['Breathe', 'Calms the heart. He gets his guard back.'],
    },
    agora: 'Now', escudo: 'Shield', lateral: 'Sidestep', recuar: 'Step back', segurar: 'Hold',
    recuarD: 'One step. I count it.', segurarD: 'The shield holds the ground. The arm pays.',
    perfeito: 'Right on time', bom: 'It lands', defende: 'He blocks', cedo: 'Too soon', tarde: 'Too late', sente: 'He feels it',
    segurou: 'Held', passou: 'Past you', contra: 'He went past the point', marca: 'Mark', ainda: 'Not yet', pedra: 'The stone', escorregou: 'The grip slips',
    guarda: 'Guard', coracao: 'Heart', passos: 'Steps', coxa: 'The thigh',
    tellJ: { alto: 'He spins the sword once.', largo: 'Two spins.', erro: 'He spins. The spin comes out crooked.', altoPrim: 'He spins the sword once. After the spin, the blow.', largoPrim: 'Two spins. The widest blow of all.' },
    tellM: { pesado: 'The sword rises.', finta: 'The sword rises.', estocada: 'The sword draws back at his hip. It comes straight.', chuva: 'Water comes in through the slit.', escuta: 'Air, through the nose, twice, short.', semAr: 'No breath.' },
    mordeu: { alto: 'He bites. He’ll spin once.', largo: 'He bites. He’ll spin twice.' },
    respirou: 'I breathe inside the steel. My heart comes down a little.', respirouLenco: 'I breathe with my hand on my chest, where the handkerchief is. My heart comes down.',
    fintaM: 'He doesn’t bite. He keeps watching my sword, not my shoulder.',
    escutou: 'I close my eyes inside the helmet. The rain, my heart, and him.',
    esperouSem: 'I wait. He waits too.',
    marcaJ: 'The blow gets through. The steel sings on my shoulder.', marcaM: 'The blow lands. All the air goes out of the helmet.',
    pontaSegue: 'I went to the side against the point. The point followed my body.',
    bash: 'The heavy blow never came. His shield did, into my chest.',
    lateralM2: 'I step aside. He holds his weight again. Not yet.',
    fase2: 'The rain thickens', fase3: 'Thirteen steps', sangue: 'First blood!', golpear: 'Strike',
    perdeu: 'It can’t end like this.', denovo: 'Again, from this exchange', denovoSub: 'The exchange starts over from the beginning of this phase.',
    motivo: {
      nada: 'Shield or sidestep: any answer beats none.',
      ponta: 'Thrust and feint: shield. The sidestep is for the heavy blow.',
      cedo: 'The sidestep is at the last instant, when the ring is almost closed.',
      pedra: 'With your heel on the stone, don’t step back again. Wait for the heavy blow.',
      joseph: 'One spin: shield. Two spins: sidestep, at the last instant.',
    },
    misA: 'My shield drops. He sees it. He steps back two paces and waits.',
    misOps: ['I raise my shield.', 'I go for his lowered guard.'],
    misLevanta: 'I raise my arm. Only then does he come on again. The arena applauds him for it.',
    misAvanca: 'He raises his shield before I get there, in no hurry at all. The arena boos, and it isn’t at him. He won’t wait again.',
    guardaCede: 'He takes two steps back and shakes out his shield arm. For the first time, he’s the one who needs air.',
    cedeJ: 'His guard gives. His back leg stays behind.',
    J: {
      b1: 'The first blow comes high. I raise the shield in time, but the impact shakes my whole arm to the elbow.',
      b2: 'He won’t let me breathe.',
      medo: 'For an instant, just one, the fear wins over the count. I push the thought out. There’s no room for it now.',
      b4: 'My arms already burn, the sweat runs inside the helmet and stings my eyes. When is he going to miss?',
      cansa: 'The spin comes slower. The tip of the sword dips before it rises.',
      erro: 'He misses on the fifth blow. It’s small, almost nothing. The blow ends a finger crooked, and his right foot drags in the sand.',
      espera: 'I don’t attack yet. I let him try once more.',
      largo: 'The sixth blow is the widest of all. He wants to end it here.',
      lateral: 'I step to the side instead of back, and his weight carries him an instant past what any guard would forgive.',
      lateralCedo: 'He recovers. It isn’t the mistake yet.',
      coxa: 'Behind the thigh, where the plate doesn’t fully cover the knee.',
      cansada: 'The helmet weighs twice what it weighed this morning.',
    },
    M: {
      b1: 'His blow isn’t the strongest I’ve ever taken. It’s the surest. The whole shield sings.',
      ataque: 'He doesn’t even step back. He takes it on the shield and returns it before I finish the motion.',
      lateral: 'I step aside. He doesn’t pitch forward like Joseph. He holds his weight a hand above the ground. There’s no mistake to wait for.',
      micro: 'He went past. For an instant, just one.',
      finta: 'The heavy blow that never comes. His shield comes instead, at the height of my chest.',
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
      voa: 'The helmet flies.',
      rosto: 'The rain hits my face for the first time since the Tournament began.',
      corte: 'The point of my sword opens a thin cut in his arm, under the pauldron, where the plate doesn’t reach.',
      cansada: 'Every breath echoes inside the steel. I don’t know how much longer I can last.',
    },
    nums: ['One.', 'Two.', 'Three.', 'Four.', 'Five.', 'Six.', 'Seven.', 'Eight.', 'Nine.', 'Ten.', 'Eleven.', 'Twelve.', 'Thirteen.'],
  },
};

// ------------------------------------------------------------------ sprites
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
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// ------------------------------------------------------------------ trilha sintetizada (abafa com o cansaço)
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

// ------------------------------------------------------------------ os golpes deles
// dur: o anel (ms); poseT: o aviso no corpo; poseG: o golpe; giros: o aviso de Joseph
const ATQ = {
  alto: { poseT: 'aviso', poseG: 'golpe', dur: 1100, giros: 1 },
  largo: { poseT: 'aviso-largo', poseG: 'golpe', dur: 1250, giros: 2 },
  erro: { poseT: 'aviso', poseG: 'erro', dur: 1150, giros: 1 },
  pesado: { poseT: 'aviso-pesado', poseG: 'golpe-pesado', dur: 1050 },
  estocada: { poseT: 'aviso-estocada', poseG: 'estocada', dur: 820 },
  finta: { poseT: 'finta', poseG: 'escudo', dur: 1000 },
};

function start(root, opts) {
  const T = TX[opts.lang] || TX.en, A = opts.A, Q = opts.quem;
  const isM = Q === 'markus', TQ = isM ? T.M : T.J;
  const bot = !!window.__ARENA_BOT;
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vib = (ms) => { if (navigator.vibrate) try { navigator.vibrate(ms); } catch (e) {} };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  return new Promise((resolve) => {
    const regras = (isM ? T.regrasM : T.regrasJ).slice();
    if (!isM && opts.taca) regras.splice(2, 0, T.taca);
    if (isM && opts.sabeAviso) regras.splice(3, 0, T.ar);
    root.innerHTML = `
      <div class="ar-bg" style="background-image:url('${opts.fundo}')"></div>
      <div class="ar-bg chuva" style="background-image:url('${opts.fundoChuva || opts.fundo}')"></div>
      <canvas class="ar-cv"></canvas>
      <div class="av-info av-eu"><p class="av-nome">Laus <span class="av-dots av-marcas"></span></p>
        <div class="av-barra av-cor"><i></i></div><p class="av-rot">${T.coracao} <b class="av-bpm"></b><span class="av-ps"></span></p></div>
      <div class="av-info av-ele"><p class="av-nome">${isM ? T.tMarkus : T.tJoseph}</p>
        <div class="av-barra av-gd"><i></i></div><p class="av-rot">${T.guarda}</p></div>
      <div class="ar-anuncio"></div>
      <div class="av-pop"></div>
      <div class="av-baixo"><div class="av-msg"><p></p><i class="av-seta"></i></div><div class="av-cmd"></div></div>
      <div class="ar-painel"><p class="ar-pn-txt"></p><p class="ar-pn-dica"></p><div class="ar-pn-ops"></div><button class="cta ar-pn-ok"></button><p class="ar-pn-toque"></p></div>
      <div class="ar-tela on av-intro">
        <h2>${isM ? T.tMarkus : T.tJoseph}</h2><p class="ar-sub">${isM ? T.sMarkus : T.sJoseph}</p>
        <p class="ar-intro">${isM ? T.introM : T.introJ}</p>
        <ul class="av-regras">${regras.map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join('')}</ul>
        ${(opts.bpm || 0) >= 120 ? `<p class="ar-nervo">${T.nervo}</p>` : ''}${(opts.cansaco || 0) >= .3 ? `<p class="ar-nervo">${T.exausto}</p>` : ''}
        <button class="cta ar-go">${T.comecar}</button>
        <p class="ar-teclado">${T.teclado}</p>
      </div>
      <div class="ar-video"><video playsinline muted></video><p class="ar-vleg"></p><button class="ar-golpear">${T.golpear}</button></div>`;
    const $ = (s) => root.querySelector(s);
    const cv = $('.ar-cv'), cx = cv.getContext('2d'), bgs = root.querySelectorAll('.ar-bg');
    const anuncio = $('.ar-anuncio'), popEl = $('.av-pop'), msgBox = $('.av-msg'), msgP = $('.av-msg p'), cmd = $('.av-cmd');
    const pn = $('.ar-painel'), pnTxt = $('.ar-pn-txt'), pnOps = $('.ar-pn-ops');
    let W = 0, H = 0, DPR = 1;
    // o fundo é posicionado aqui, e o chão sai da mesma conta: os pés pisam a areia da foto, não o pé do muro
    const BG = { iw: 1916, ih: 821, muro: .765 };   // muro = altura (0..1) da base do muro na foto
    let chaoY = 0;
    const rs = () => {
      DPR = Math.min(devicePixelRatio || 1, 2); W = root.clientWidth; H = root.clientHeight; cv.width = W * DPR; cv.height = H * DPR;
      const ret = H > W * 1.15, z = ret ? 1.6 : 1.35, pe = ret ? .8 : .855;
      const s = Math.max(W / BG.iw, H * z / BG.ih), bw = BG.iw * s, bh = BG.ih * s, oy = H - bh;
      root.querySelectorAll('.ar-bg').forEach((d) => { d.style.backgroundSize = `${bw}px ${bh}px`; d.style.backgroundPosition = `50% ${oy}px`; });
      chaoY = H / 2 + (oy + pe * bh - H / 2) * 1.06;   // o fundo leva scale(1.06) da câmera
    };
    addEventListener('resize', rs); rs();

    // ---------- estado
    const S = { golpesSofridos: 0, leituras: 0, laterais: 0, perfeitos: 0, fintasLidas: 0, escudosPerdidos: 0, misericordia: 0, avancou: 0, contagemUm: false, esperouErro: false, cedo: 0, respiros: 0, recomecos: 0, bpmSoma: 0, bpmN: 0, turnos: 0 };
    const GMAX = isM ? 140 : 130;
    let bpm = clamp((opts.bpm || 96) + (isM ? 4 : 6), 82, 170), cansaco = Math.min(.6, opts.cansaco || 0);
    let guarda = GMAX, marcas = 0, fase = 1, passos = 13, acabou = false, vivo = true, rodando = false;
    let intencao = null, escutando = false, ouviu = false, misUsada = false, ombroUsado = false, falhasFase = 0;
    let nAtk = 0, nTurnoM = 0, erroAberto = false, esperando = false, visto = {}, snap = null;
    const eu = new Lutador('laus', 1), ele = new Lutador(Q, -1);
    let agora = performance.now(), congela = 0, musica = null, chuva = isM ? .25 : 0, chuvaAlvo = chuva, oculto = false;
    const cam = { x: 0, zoom: 1, alvoZoom: 1, rot: 0, sx: 0, sy: 0, shake: 0 };
    const parts = [], gotas = [], flashes = [], rastros = [], ondas = [], giros = [];
    let anel = null; // { quem: 'ele'|'eu', t0, dur, tipo, banda }
    const espera = (ms) => new Promise((r) => setTimeout(r, bot ? Math.min(ms, 60) : ms));

    // ---------- som e voz
    const sfx = (n, v = .7, res) => A && A.sfx && A.sfx(n, v, res);
    const voz = (n, ms = 0) => { if (!A || !A.ctx || !A.on) return; setTimeout(() => A.once('assets/audio/voz/' + n + '.mp3', 1), ms); };
    const esforco = () => { if (Math.random() < .5) voz('esforco-' + (1 + Math.floor(Math.random() * 3)), 0); };
    const tom = (f, d, tipo = 'sine', v = .05) => A && A.tone && A.tone(f, d, tipo, v);
    const som = {
      bloqueio(forte) { sfx(forte ? 'escudo-impacto-1' : 'escudo-impacto-2', .8, () => { A.tone(140, .3, 'triangle', .14); A.hiss(.2, 1800, 2, .14); }); },
      bash() { sfx('espada-escudo-bash', .85, () => A.tone(90, .35, 'sine', .25)); },
      vento() { sfx('golpe-ar', .6, () => A.hiss(.3, 1200, .9, .1)); },
      giro() { sfx('golpe-ar', .4, () => A.hiss(.22, 1500, .9, .08)); },
      passo() { sfx(chuva > .5 ? 'passo-lama' : 'passo-areia', .45, () => A.hiss(.12, 160, .6, .14, 0, 'lowpass')); },
      ar() { sfx('respira-nariz', .9, () => { A.hiss(.12, 900, 1.5, .12); A.hiss(.12, 900, 1.5, .12, .22); }); },
      corte() { sfx('corte', .9, () => A.tone(196, .7, 'sine', .1)); },
      dor() { sfx('escudo-impacto-1', .6); tom(70, .5, 'sine', .25); },
      rugido() { sfx('rugido', .75); }, suspiro() { sfx('suspiro-multidao', .7); },
      escorrega() { sfx('escorrega-pedra', .9); },
      tic() { tom(880, .06, 'sine', .03); },
    };

    // ---------- HUD
    const hud = () => {
      $('.av-gd i').style.width = clamp(guarda / GMAX * 100, 0, 100) + '%';
      $('.av-gd').classList.toggle('baixa', guarda < GMAX * .3);
      $('.av-cor i').style.width = clamp((bpm - 60) / 1.1, 0, 100) + '%';
      $('.av-cor').classList.toggle('alto', bpm >= 140);
      $('.av-bpm').textContent = Math.round(bpm);
      $('.av-marcas').innerHTML = [0, 1, 2].map((i) => `<i class="${i < marcas ? 'on' : ''}"></i>`).join('');
      $('.av-ps').innerHTML = isM && fase === 3 ? ` · ${T.passos} <b>${passos}</b>` : '';
      root.classList.toggle('na-pedra', isM && fase === 3 && passos <= 1);
    };
    const msg = (t) => { msgP.textContent = t; msgP.classList.remove('nova'); void msgP.offsetWidth; msgP.classList.add('nova'); };
    const pop = (t, cls = '') => { popEl.textContent = t; popEl.className = 'av-pop on ' + cls; clearTimeout(pop.t); pop.t = setTimeout(() => (popEl.className = 'av-pop'), 950); };
    const anuncia = (t, cls = '') => { anuncio.className = 'ar-anuncio ' + cls; anuncio.textContent = t; void anuncio.offsetWidth; anuncio.classList.add('on'); };
    const mudaBpm = (d) => { bpm = clamp(bpm + d, 70, 190); hud(); };
    const cansa = (d) => { cansaco = clamp(cansaco + d, 0, 1); };

    // a história entra aqui: uma frase por vez, no ritmo de leitura; toque ou Enter adianta
    let avancaTexto = null;
    const leitura = (t) => Math.min(6500, 1500 + t.length * 42);
    async function narra(lista) {
      for (const t of [].concat(lista).filter(Boolean)) {
        msg(t); msgBox.classList.add('lendo');
        await new Promise((r) => { const to = setTimeout(fim, bot ? 40 : leitura(t)); function fim() { clearTimeout(to); avancaTexto = null; r(); } avancaTexto = fim; });
        msgBox.classList.remove('lendo');
        if (acabou) return;
      }
    }

    // ---------- o coração estreita as janelas (ms, de cada lado do instante em que o anel fecha)
    const janela = () => {
      const x = clamp((bpm - 80) / 75, 0, 1), k = (falhasFase >= 2 ? 1.35 : 1) * (1 - cansaco * .2);
      return { lat: (160 - 55 * x) * k, esc: (300 - 100 * x) * k, recuar: (340 - 100 * x) * k, perf: (115 - 35 * x) * k, bom: (230 - 60 * x) * k };
    };

    // ---------- entrada do leitor
    let entrada = null, entradaMenu = null;
    const aguarda = (alvo, limite, aceita, botResp) => new Promise((res) => {
      let fim = false;
      const t = setTimeout(() => { if (fim) return; fim = true; entrada = null; res({ tipo: null, dt: Infinity }); }, Math.max(0, alvo + limite - performance.now()));
      entrada = (tipo) => { if (fim || !aceita.includes(tipo)) return; fim = true; clearTimeout(t); entrada = null; res({ tipo, dt: performance.now() - alvo }); };
      if (bot && botResp) { const erra = Math.random() < (window.__ARENA_BOT_ERRO || 0); if (!erra) setTimeout(() => entrada && entrada(botResp), Math.max(0, alvo - performance.now() - 10)); }
    });
    const botoes = (lista) => {
      cmd.className = 'av-cmd acao';
      cmd.innerHTML = lista.map(([id, rot, k, d]) => `<button class="av-bt ${id}" data-a="${id}"><span>${rot}</span>${d ? `<small>${d}</small>` : ''}<kbd>${k}</kbd></button>`).join('');
      cmd.querySelectorAll('button').forEach((b) => b.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); b.classList.add('on'); setTimeout(() => b.classList.remove('on'), 160); entrada && entrada(b.dataset.a); }));
    };
    const limpaCmd = () => { cmd.className = 'av-cmd'; cmd.innerHTML = ''; };
    const menu = (ids, pergunta) => new Promise((res) => {
      msg(pergunta || T.pergunta);
      cmd.className = 'av-cmd menu';
      cmd.innerHTML = ids.map((id, i) => `<button class="av-gl ${id}" data-g="${id}"><b><kbd>${i + 1}</kbd>${T.golpes[id][0]}</b><span>${T.golpes[id][1]}</span></button>`).join('');
      const escolhe = (id) => { entradaMenu = null; limpaCmd(); som.tic(); res(id); };
      cmd.querySelectorAll('.av-gl').forEach((b) => (b.onclick = () => escolhe(b.dataset.g)));
      entradaMenu = (n) => { if (ids[n]) escolhe(ids[n]); };
      if (bot) setTimeout(() => entradaMenu && escolhe(botMenu(ids)), 50);
    });
    function botMenu(ids) {
      if (ids.includes('esperar')) return 'esperar';
      if (bpm > 150) return 'respirar';
      if (isM && ids.includes('escutar') && !escutando && Math.random() < .3) return 'escutar';
      return Math.random() < .7 ? 'estocada' : 'corte';
    }

    // ---------- o anel: fecha sobre o alvo; a resposta é medida contra o instante em que ele fecha
    const anelEm = (quem, dur, tipo, banda) => { anel = { quem, t0: performance.now(), dur, tipo, banda }; return anel.t0 + dur; };
    const someAnel = () => { anel = null; };

    // ---------- câmera e mundo (o renderizador da v7)
    const retrato = () => H > W * 1.15;
    const chao = () => chaoY || H * .8;
    const escala = () => (retrato() ? Math.min(H * .27, W * .58) : Math.min(H * .38, W * .44)) / ((META['laus-guarda'] || { alt: 600 }).alt);
    const altM = () => (META[Q + '-guarda'] || { alt: 600 }).alt;
    const kE = () => escala() * ALTURA[Q] * ((META['laus-guarda'] || { alt: 600 }).alt / altM());
    const passoPx = () => Math.min(W * .03, 26);
    const dist = () => (retrato() ? W * .4 : Math.min(W * .3, H * .44));
    const P = () => { const m = W / 2; return { eu: m - dist() * .55 + eu.x, ele: m + dist() * .55 + ele.x, pedra: m - dist() * .55 - (passos + .6) * passoPx() }; };
    const tremer = (f) => { if (!reduz) cam.shake = Math.max(cam.shake, f); };
    const impactoFx = (forca, cor = '255,240,215') => { congela = Math.max(congela, 50 + forca * 30); tremer(5 + forca * 9); flashes.push({ cor: '255,255,255', a: .1 + forca * .14, d: 40, t: agora }, { cor, a: .12 + forca * .18, d: 200, t: agora }); vib(Math.round(18 + forca * 30)); };
    const poeira = (x, y, n = 10, cor = '214,200,170') => { for (let i = 0; i < n; i++) parts.push({ x, y, vx: (Math.random() - .5) * 200, vy: -Math.random() * 180 - 30, r: 1 + Math.random() * 2.6, a: .7, cor: chuva > .5 ? '110,100,88' : cor, vida: 600 + Math.random() * 500, t: agora }); };
    const faisca = (x, y, n = 14, cor = '255,226,170') => { for (let i = 0; i < n; i++) parts.push({ x, y, vx: (Math.random() - .5) * 520, vy: -Math.random() * 320, r: .8 + Math.random() * 1.5, a: 1, cor, vida: 320 + Math.random() * 260, t: agora }); };
    const choque = () => { const p = P(); return { x: (p.eu + p.ele) / 2, y: chao() - escala() * 520 }; };
    function rastro(l, x, k, cor = '255,236,200') {
      const alt = (META[l.quem + '-guarda'] || { alt: 600 }).alt * k;
      rastros.push({ x: x + l.lado * alt * .12, y: chao() - alt * .62, r: alt * .5, a0: l.lado > 0 ? -1.9 : -2.6, a1: l.lado > 0 ? .55 : -4.05, t: agora, cor });
    }
    function desenhaLut(l, x, k) {
      const t = Math.min(1, (agora - l.tPose) / l.dPose);
      const uma = (pose, alfa, branco) => {
        const mm = META[l.quem + '-' + pose], ii = IMG[l.quem + '-' + pose]; if (!mm || !ii || alfa <= .01) return;
        const respira = (pose === 'guarda' || pose === 'respirar' || pose === 'cansado' || pose === 'espera' || pose === 'avanca') ? Math.sin(agora / (l === eu ? 520 - cansaco * 200 : 480)) * (l === eu ? .006 + cansaco * .014 : .006) : 0;
        const s = k * (1 - l.prof * .07), sy = 1 + respira + l.sq * -.04, sx = 1 + l.sq * .03;
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
    // o anel desenhado no corpo de quem vai receber
    function desenhaAnel(p) {
      if (!anel) return;
      const f = clamp((performance.now() - anel.t0) / anel.dur, 0, 1.15);
      const k = anel.quem === 'ele' ? kE() : escala(), alt = anel.quem === 'ele' ? altM() : (META['laus-guarda'] || { alt: 600 }).alt;
      const x = anel.quem === 'ele' ? p.ele - k * 40 : p.eu + k * 20, y = chao() - k * alt * (anel.tipo === 'coxa' ? .32 : .58);
      const r0 = Math.max(24, Math.min(W, H) * .045), R = r0 + r0 * 1.7 * Math.max(0, 1 - f);
      const cor = anel.tipo === 'def' ? '176,204,255' : anel.tipo === 'coxa' ? '255,205,120' : '255,232,196';
      const bw = Math.min(r0 * 1.7, r0 * 1.7 * (anel.banda || 0) / anel.dur);
      cx.save();
      if (bw > 1) { cx.strokeStyle = `rgba(${cor},.22)`; cx.lineWidth = bw; cx.beginPath(); cx.arc(x, y, r0 + bw / 2, 0, 6.283); cx.stroke(); }
      cx.strokeStyle = `rgba(${cor},.85)`; cx.lineWidth = 2; cx.shadowColor = `rgba(${cor},.7)`; cx.shadowBlur = 14; cx.beginPath(); cx.arc(x, y, r0, 0, 6.283); cx.stroke();
      cx.shadowBlur = 0; cx.strokeStyle = `rgba(${cor},${.35 + .6 * Math.min(1, f)})`; cx.lineWidth = 3; cx.beginPath(); cx.arc(x, y, R, 0, 6.283); cx.stroke();
      if (anel.tipo === 'coxa') { const g = cx.createRadialGradient(x, y, 2, x, y, r0 * 2); g.addColorStop(0, 'rgba(255,205,120,.35)'); g.addColorStop(1, 'rgba(255,205,120,0)'); cx.fillStyle = g; cx.beginPath(); cx.arc(x, y, r0 * 2, 0, 6.283); cx.fill(); }
      cx.restore();
    }
    // o giro de Joseph: o aviso dele, desenhado como arco de aço sobre a mão da espada
    function desenhaGiros(p) {
      const k = kE();
      for (let i = giros.length - 1; i >= 0; i--) {
        const g = giros[i], a = (agora - g.t) / 330; if (a >= 1) { giros.splice(i, 1); continue; } if (a < 0) continue;
        const x = p.ele - k * 120, y = chao() - k * altM() * .86, r = k * 150;
        const ang = -Math.PI * .5 + a * Math.PI * 2;
        cx.save(); cx.strokeStyle = `rgba(240,230,215,${.8 * (1 - a * .6)})`; cx.lineWidth = 5 * (1 - a) + 1; cx.lineCap = 'round';
        cx.beginPath(); cx.arc(x, y, r, ang - 1.4, ang); cx.stroke(); cx.restore();
      }
    }
    function desenha(dt) {
      cam.zoom += (cam.alvoZoom - cam.zoom) * Math.min(1, dt * 4);
      cam.rot += (((bpm > 150 ? Math.sin(agora / 700) * .012 * ((bpm - 150) / 40) : 0) + (cansaco > .5 ? Math.sin(agora / 1300) * .008 : 0)) - cam.rot) * Math.min(1, dt * 3);
      cam.shake *= Math.pow(.0009, Math.max(dt, .004)); cam.sx = (Math.random() - .5) * cam.shake; cam.sy = (Math.random() - .5) * cam.shake;
      const p = P(); const foco = (p.eu + p.ele) / 2; cam.x += ((foco - W / 2) - cam.x) * Math.min(1, dt * 3);
      bgs.forEach((b) => { b.style.transform = `translate(${(-cam.x * .25 + cam.sx * .5).toFixed(1)}px, ${(cam.sy * .5).toFixed(1)}px) scale(${(1.06 + (cam.zoom - 1) * .45).toFixed(3)}) rotate(${(cam.rot * 40).toFixed(2)}deg)`; });
      cx.setTransform(DPR, 0, 0, DPR, 0, 0); cx.clearRect(0, 0, W, H);
      cx.translate(W / 2 + cam.sx, chao() + cam.sy); cx.rotate(cam.rot); cx.scale(cam.zoom, cam.zoom); cx.translate(-W / 2 - cam.x, -chao());
      if (isM && fase === 3 && p.pedra > -400) {
        cx.fillStyle = 'rgba(196,204,214,.92)'; cx.fillRect(p.pedra - 600, chao() - 10, 600, 24);
        cx.fillStyle = 'rgba(235,242,250,.55)'; cx.fillRect(p.pedra - 600, chao() - 10, 600, 3);
        cx.fillStyle = 'rgba(0,0,0,.35)'; cx.fillRect(p.pedra - 4, chao() - 10, 4, 24);
        cx.fillStyle = 'rgba(255,240,215,.22)';
        for (let i = 0; i < passos; i++) { const px = p.pedra + (i + .6) * passoPx(); cx.beginPath(); cx.ellipse(px, chao() + 6, passoPx() * .18, 3, 0, 0, 6.283); cx.fill(); }
      }
      const sombra = (x, r) => { const g = cx.createRadialGradient(x, chao(), 2, x, chao(), r); g.addColorStop(0, 'rgba(0,0,0,.5)'); g.addColorStop(1, 'rgba(0,0,0,0)'); cx.fillStyle = g; cx.beginPath(); cx.ellipse(x, chao(), r, r * .16, 0, 0, 6.283); cx.fill(); };
      const kL = escala(), ke = kE();
      sombra(p.eu, kL * 260); sombra(p.ele, ke * 280);
      for (const l of [eu, ele]) { l.x += (l.alvoX - l.x) * Math.min(1, dt * 9); l.lean += (l.alvoLean - l.lean) * Math.min(1, dt * 10); l.sq *= Math.pow(.002, Math.max(dt, .004)); l.prof += (l.alvoProf - l.prof) * Math.min(1, dt * 12); }
      // na chuva, antes de ele se mostrar, ele é um borrão
      if (oculto) { cx.save(); cx.filter = 'blur(7px)'; cx.globalAlpha = .55; desenhaLut(ele, p.ele, ke); cx.restore(); }
      else desenhaLut(ele, p.ele, ke);
      desenhaLut(eu, p.eu, kL);
      for (let i = rastros.length - 1; i >= 0; i--) { const r = rastros[i], a = (agora - r.t) / 170; if (a >= 1) { rastros.splice(i, 1); continue; }
        cx.strokeStyle = `rgba(${r.cor},${.7 * (1 - a)})`; cx.lineWidth = 9 * (1 - a) + 1; cx.lineCap = 'round'; cx.beginPath(); cx.arc(r.x, r.y, r.r, Math.min(r.a0, r.a1), Math.max(r.a0, r.a1)); cx.stroke(); }
      for (let i = ondas.length - 1; i >= 0; i--) { const o = ondas[i], a = (agora - o.t) / 700; if (a >= 1) { ondas.splice(i, 1); continue; } if (a < 0) continue;
        const ox = p.ele - ke * 40, oy = chao() - ke * altM() * .88; cx.strokeStyle = `rgba(225,236,248,${.85 * (1 - a)})`; cx.lineWidth = 3 - a * 2; cx.beginPath(); cx.arc(ox, oy, 14 + a * 70, Math.PI - 1, Math.PI + 1); cx.stroke(); }
      desenhaGiros(p);
      desenhaAnel(p);
      for (let i = parts.length - 1; i >= 0; i--) { const q = parts[i], a = (agora - q.t) / q.vida; if (a >= 1) { parts.splice(i, 1); continue; } q.x += q.vx * dt; q.y += q.vy * dt; q.vy += 300 * dt; cx.globalAlpha = q.a * (1 - a); cx.fillStyle = `rgb(${q.cor})`; cx.beginPath(); cx.arc(q.x, q.y, q.r, 0, 6.283); cx.fill(); }
      cx.globalAlpha = 1;
      cx.setTransform(DPR, 0, 0, DPR, 0, 0);
      chuva += (chuvaAlvo - chuva) * Math.min(1, dt * .8);
      const n = Math.round(chuva * (W < 700 ? 110 : 220));
      while (gotas.length < n) gotas.push({ x: Math.random() * W * 1.2, y: Math.random() * H, v: 900 + Math.random() * 500, l: 10 + Math.random() * 18 });
      if (gotas.length > n) gotas.length = n;
      cx.strokeStyle = 'rgba(210,222,236,.32)'; cx.lineWidth = 1; cx.beginPath();
      for (const g of gotas) { g.y += g.v * dt; g.x -= g.v * .12 * dt; if (g.y > H) { g.y = -20; g.x = Math.random() * W * 1.2; } cx.moveTo(g.x, g.y); cx.lineTo(g.x + g.l * .12, g.y - g.l); }
      cx.stroke();
      for (let i = flashes.length - 1; i >= 0; i--) { const f = flashes[i], a = (agora - f.t) / f.d; if (a >= 1) { flashes.splice(i, 1); continue; } cx.fillStyle = `rgba(${f.cor},${(1 - a) * f.a})`; cx.fillRect(0, 0, W, H); }
      const ap = clamp((bpm - 95) / 85, 0, 1);
      const vg = cx.createRadialGradient(W / 2, H * .5, Math.min(W, H) * (.62 - ap * .2), W / 2, H * .5, Math.max(W, H) * .78);
      vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, `rgba(8,4,4,${.4 + ap * .4})`); cx.fillStyle = vg; cx.fillRect(0, 0, W, H);
      if (!root.classList.contains('sem-elmo')) {
        const fenda = H * (.02 + cansaco * .14), bordaY = fenda + H * .05;
        let g = cx.createLinearGradient(0, 0, 0, bordaY); g.addColorStop(0, 'rgba(3,2,2,.97)'); g.addColorStop(fenda / bordaY, 'rgba(3,2,2,.9)'); g.addColorStop(1, 'rgba(3,2,2,0)'); cx.fillStyle = g; cx.fillRect(0, 0, W, bordaY);
      }
    }

    // ---------- o coração bate e o fôlego pesa
    let batT = 0, folegoT = 0;
    const bate = () => {
      if (!vivo) return;
      if (A && A.ctx && A.on && rodando && !acabou) A.batida && A.batida(clamp((bpm - 80) / 90, .15, 1));
      if (rodando && !acabou && bpm > 145) vib(bpm > 165 ? 22 : 12);
      batT = setTimeout(bate, 60000 / bpm);
    };
    const folego = () => {
      if (!vivo) return;
      if (A && A.ctx && A.on && A.hiss && rodando && !acabou && cansaco > .15) { A.hiss(.5 + cansaco * .4, 520, .9, .03 + cansaco * .09); A.hiss(.6, 360, .7, .02 + cansaco * .07, .65); }
      musica && musica.abafa(cansaco);
      folegoT = setTimeout(folego, 2600 - cansaco * 1200);
    };

    // ---------- poses: tudo volta à guarda
    const parado = () => { eu.alvoX = 0; eu.alvoLean = 0; eu.alvoProf = 0; ele.alvoX = 0; ele.alvoLean = 0; eu.vai(cansaco > .7 ? 'cansado' : 'guarda', agora, 220); ele.vai(guardaPose(), agora, 260); };
    const guardaPose = () => (isM ? (fase === 3 ? 'avanca' : 'guarda') : (nAtk >= 4 ? 'cansado' : 'guarda'));

    // ================================================================ o turno de Laus
    async function golpeLaus(beats, nome) {
      let total = 0, perfeitos = 0;
      for (let b = 0; b < beats.length; b++) {
        const [dur, dano] = beats[b];
        eu.vai('guarda', agora, 120); eu.alvoX = 10;
        botoes([['golpe', T.agora, 'Espaço']]);
        const j = janela(), alvo = anelEm('ele', dur, 'atq', j.perf);
        const r = await aguarda(alvo, j.bom, ['golpe'], 'golpe'); someAnel(); limpaCmd();
        const d = Math.abs(r.dt), C = choque();
        if (r.tipo && d <= j.perf) {
          eu.vai('golpe', agora, 70); eu.alvoX = Math.min(W * .07, 60); rastro(eu, P().eu, escala());
          ele.vai(isM ? 'escudo' : 'desequilibrado', agora, 90); ele.alvoX = 18; som.bloqueio(true); faisca(C.x, C.y, 20); impactoFx(.5);
          pop(T.perfeito, 'ouro'); total += dano; perfeitos++; S.perfeitos++;
        } else if (r.tipo && d <= j.bom) {
          eu.vai('golpe', agora, 70); eu.alvoX = Math.min(W * .05, 44);
          ele.vai(isM ? 'escudo' : 'guarda', agora, 90); som.bloqueio(false); faisca(C.x, C.y, 10); impactoFx(.3);
          pop(T.bom); total += Math.round(dano * .55);
        } else {
          eu.vai('golpe', agora, 70); eu.alvoX = 20; ele.vai(isM ? 'escudo' : 'guarda', agora, 90); som.bloqueio(false);
          pop(r.tipo && r.dt < 0 ? T.cedo : T.defende, 'ruim'); if (r.tipo && r.dt < 0) S.cedo++;
          mudaBpm(5); await espera(420); parado(); return { total, perfeitos, errou: true };
        }
        await espera(360); parado(); await espera(140);
      }
      void nome; return { total, perfeitos, errou: false };
    }
    function menuLaus() {
      if (!isM) return ['estocada', 'corte', erroAberto ? 'esperar' : 'finta', 'respirar'];
      return ['estocada', 'corte', fase === 2 && ouviu ? 'escutar' : 'fintaM', 'respirar'];
    }
    async function turnoLaus() {
      S.turnos++;
      const pergunta = erroAberto ? T.pergunta : intencao && !isM ? T.mordeu[intencao] + ' ' + T.pergunta : T.pergunta;
      const g = await menu(menuLaus(), pergunta);
      if (g === 'respirar') {
        if (erroAberto) { erroAberto = false; visto.erroVolta = nAtk + 2; }
        eu.vai('respirar', agora, 300); S.respiros++;
        const calma = (isM ? 15 : 17) + (opts.lencoPeito ? 8 : 0);
        mudaBpm(-calma); cansa(-.05); guarda = Math.min(GMAX, guarda + (isM ? 8 : 10)); hud();
        await narra(opts.lencoPeito && isM ? T.respirouLenco : T.respirou); parado(); return;
      }
      if (g === 'finta') {
        eu.vai('golpe', agora, 90); eu.alvoX = 14; await espera(220); ele.vai('aviso', agora, 120); som.passo();
        intencao = Math.random() < .5 ? 'alto' : 'largo'; guarda -= 8; mudaBpm(3); S.fintasLidas++; hud();
        pop(T.mordeu[intencao].split('.')[0], 'dica'); await espera(700); parado(); return;
      }
      if (g === 'fintaM') {
        eu.vai('golpe', agora, 90); eu.alvoX = 14; await espera(200); ele.vai('escudo', agora, 120); mudaBpm(4);
        await narra(T.fintaM); parado(); return;
      }
      if (g === 'escutar') {
        escutando = true; eu.vai('respirar', agora, 300); mudaBpm(-5);
        await narra(T.escutou); parado(); return;
      }
      if (g === 'esperar') {
        esperando = true; erroAberto = false; S.esperouErro = true;
        eu.vai('guarda', agora, 200); await narra(TQ.espera); return;
      }
      // golpes: depois do erro, atacar é cedo
      if (erroAberto) {
        erroAberto = false; visto.erroVolta = nAtk + 2;
        const r = await golpeLaus([[680, 0]]);
        void r; ele.vai('guarda', agora, 90);
        await narra(TQ.lateralCedo);
        return 'contra';
      }
      const base = isM ? .55 : nAtk < 4 ? .7 : 1;              // Joseph descansado quase não sente; Markus nunca sente muito
      const r = g === 'estocada' ? await golpeLaus([[720, 20 * base]]) : await golpeLaus([[780, 15 * base], [540, 15 * base]]);
      mudaBpm(g === 'corte' ? 8 : 3); cansa(g === 'corte' ? .04 : .02);
      guarda = Math.max(0, guarda - r.total); hud();
      if (isM && r.total > 0 && (r.perfeitos < (g === 'corte' ? 2 : 1))) {
        if (!visto.ataqueM) { visto.ataqueM = 1; await narra(TQ.ataque); }
        return 'contra';
      }
      if (isM && r.perfeitos && r.total) pop(T.sente, 'ouro');
      if (isM && r.errou) return 'contra';
    }

    // ================================================================ o turno dele
    // a resposta de Laus a um golpe. Devolve 'ok' | 'hit' | 'contra' | 'abre' | 'queda' | 'pedra'
    async function defesa(tipo, opc = {}) {
      const at = ATQ[tipo];
      let dur = at.dur * (opc.pressa || 1) * (intencao === tipo ? 1.3 : 1) * (escutando ? 1.25 : 1);
      if (!visto['t' + tipo]) dur *= bot ? 1 : 1.45;                      // a primeira vez de cada golpe vem devagar: é assim que se aprende
      if (isM && fase === 3) dur *= .9;
      if (bpm > 150) dur *= .94;
      visto['t' + tipo] = 1;
      ele.vai(at.poseT, agora, Math.min(240, dur * .3)); ele.alvoLean = -.05; ele.alvoX = Math.min(W * .02, 16); som.passo(); cam.alvoZoom = 1.06;
      // os avisos
      if (!isM) {
        const n = at.giros; for (let i = 0; i < n; i++) { giros.push({ t: agora + i * 280 }); setTimeout(() => som.giro(), i * 280); }
        msg(tipo === 'erro' ? T.tellJ.erro : (!visto['m' + tipo] ? T.tellJ[tipo + 'Prim'] : T.tellJ[tipo])); visto['m' + tipo] = 1;
        await espera(n * 280 + 120);
      } else {
        const naChuva = fase >= 2 && !escutando, ouve = escutando || (ouviu && fase >= 2);
        if (tipo === 'pesado') { som.ar(); if (ouve) ondas.push({ t: agora }, { t: agora + 220 }); }
        if (tipo === 'estocada' && fase >= 2) sfx('passo-lama', .8);
        oculto = naChuva;
        msg(ouve ? (tipo === 'pesado' ? T.tellM.escuta : T.tellM.semAr) : naChuva ? T.tellM.chuva : T.tellM[tipo]);
        await espera(200);
      }
      const j = janela();
      const fase3 = isM && fase === 3;
      const lista = fase3 ? [['recuar', T.recuar, '←', T.recuarD], ['escudo', T.segurar, '↑', T.segurarD], ['lateral', T.lateral, '↓']]
        : [['escudo', T.escudo, '↑'], ['lateral', T.lateral, '↓']];
      botoes(lista);
      const alvo = anelEm('eu', dur, 'def', j.lat);
      if (oculto) setTimeout(() => { oculto = false; }, dur * .55);
      const botR = botDefesa(tipo);
      const r = await aguarda(alvo, Math.max(j.esc, j.recuar), lista.map((l) => l[0]), botR);
      someAnel(); limpaCmd(); oculto = false; escutando = false; intencao = null;
      return resolve1(tipo, r, j);
    }
    function botDefesa(tipo) {
      if (tipo === 'erro') return 'escudo';
      if (!isM) return tipo === 'largo' ? 'lateral' : 'escudo';
      if (fase === 3) { if (passos <= 1) return tipo === 'pesado' ? 'lateral' : 'escudo'; return 'recuar'; }
      return tipo === 'pesado' ? 'lateral' : 'escudo';
    }
    // o que acontece com a resposta
    function resolve1(tipo, r, j) {
      const at = ATQ[tipo], p = P(), C = choque(), d = Math.abs(r.dt);
      ele.fantasma = { pose: ele.pose, t: agora }; ele.vai(at.poseG, agora, 70);
      ele.alvoX = -Math.min(W * .06, 56); ele.alvoLean = .07; ele.sq = 1; rastro(ele, p.ele, kE()); cam.alvoZoom = 1.02;
      const cedo = r.tipo && r.dt < 0;
      if (tipo === 'erro') { ele.vai('erro', agora, 120); som.vento(); if (r.tipo === 'escudo') { som.bloqueio(false); eu.vai('escudo', agora, 80); } return 'erro'; }
      // ---- passo lateral: estreito, e só serve para o golpe largo ou pesado
      if (r.tipo === 'lateral') {
        if (tipo === 'estocada' || tipo === 'finta') { eu.vai('lateral', agora, 80); eu.alvoProf = .6; return fere(tipo === 'finta' ? 'bash' : 'ponta', C); }
        if (d > j.lat) { eu.vai('lateral', agora, 80); eu.alvoProf = .6; return fere('cedo', C); }
        S.leituras++; S.laterais++; som.vento(); eu.vai('lateral', agora, 80); eu.alvoProf = 1; eu.alvoX = -14; cansa(.03);
        pop(T.passou, 'azul');
        if (!isM) return tipo === 'largo' ? 'abre' : 'contra';
        if (fase === 3) return passos <= 1 ? 'queda' : 'segurou';
        return 'micro';
      }
      // ---- recuar (só na reta final contra Markus)
      if (r.tipo === 'recuar') {
        if (d > j.recuar && cedo) return fere('cedo', C);
        if (passos <= 1) return 'pedra';
        S.leituras++; som.vento(); eu.vai('recuar', agora, 80); eu.alvoX = -passoPx(); eu.alvoLean = -.04;
        return 'recuou';
      }
      // ---- escudo: largo, cansa o braço, sobe o coração
      if (r.tipo === 'escudo' && d <= j.esc) {
        const perf = d <= j.perf;
        S.leituras++; if (perf) S.perfeitos++;
        eu.vai('escudo', agora, 60); eu.alvoX = -10; eu.sq = .6; eu.branco = agora + 40; setTimeout(() => eu.vai('impacto', agora, 60), 60);
        if (tipo === 'finta') { S.fintasLidas++; som.bash(); } else som.bloqueio(tipo !== 'estocada');
        faisca(C.x, C.y, perf ? 22 : 12); impactoFx(perf ? .35 : .6); poeira(C.x - 20, chao(), 6); esforco();
        const pesa = tipo === 'largo' ? 9 : tipo === 'pesado' ? 8 : 4;
        mudaBpm(perf ? Math.round(pesa / 2) : pesa); cansa(perf ? .012 : .028);
        // na chuva, sem o lenço no cabo, a mão escorrega
        if (isM && fase >= 2 && !opts.lencoCabo && Math.random() < .14) { mudaBpm(8); pop(T.escorregou, 'ruim'); visto.escorregou = 1; }
        else pop(perf ? T.perfeito : T.segurou, perf ? 'ouro' : '');
        return 'ok';
      }
      return fere(r.tipo ? (cedo ? 'cedo' : 'nada') : 'nada', C);
    }
    let motivoUlt = 'nada';
    function fere(motivo, C) {
      motivoUlt = isM ? motivo : 'joseph'; S.golpesSofridos++; S.escudosPerdidos++; marcas++;
      if (motivo === 'cedo') S.cedo++;
      if (motivo === 'bash') som.bash(); else som.dor();
      impactoFx(1.2, '160,20,20'); eu.vai('atingido', agora, 70); eu.alvoX = -28; eu.alvoLean = -.08; eu.branco = agora + 50;
      poeira(C.x, chao(), chuva > .5 ? 26 : 14); mudaBpm(13); cansa(.06); vib(90); esforco();
      pop(T.marca, 'ruim'); hud();
      return motivo === 'ponta' ? 'hitPonta' : motivo === 'bash' ? 'hitBash' : 'hit';
    }

    // ----- Joseph
    async function turnoJoseph() {
      const golpes = nAtk === 1 ? 2 : 1;                       // no segundo turno ele não deixa respirar
      if (golpes === 2) await narra(TQ.b2);
      for (let g = 0; g < golpes; g++) {
        nAtk++;
        let tipo;
        if (esperando) tipo = 'largo';
        else if (nAtk === 5 || (nAtk > 5 && visto.erroVolta && nAtk >= visto.erroVolta)) tipo = 'erro';
        else tipo = intencao || (nAtk <= 1 ? 'alto' : Math.random() < .42 ? 'largo' : 'alto');
        if (nAtk === 4 && !visto.cansaJ) { visto.cansaJ = 1; ele.vai('cansado', agora, 300); await narra([TQ.b4, TQ.cansa]); }
        if (tipo === 'largo' && esperando) await narra(TQ.largo);
        const r = await defesa(tipo);
        if (r === 'erro') { visto.erroVolta = 0; await espera(300); await narra(TQ.erro); erroAberto = true; parado(); return; }
        if (r === 'abre' && esperando) { esperando = false; return 'coxa'; }
        if (r === 'abre' || r === 'contra') {
          guarda = Math.max(0, guarda - (r === 'abre' ? 24 : 14)); hud(); ele.vai('desequilibrado', agora, 120); ele.alvoX = -Math.min(W * .05, 40);
          pop(T.contra, 'azul'); await espera(600);
          if (!visto.contraJ) { visto.contraJ = 1; await narra(TQ.lateralCedo); }
        }
        if (esperando) { esperando = false; visto.erroVolta = nAtk + 2; await espera(400); await narra(TQ.lateralCedo); }
        if (r === 'ok' && !visto.b1) { visto.b1 = 1; await espera(350); await narra(TQ.b1); }
        if (r.startsWith && r.startsWith('hit')) { await espera(500); if (!visto.marcaJ) { visto.marcaJ = 1; await narra(T.marcaJ); } }
        if (bpm > 128 && !visto.medo) { visto.medo = 1; await narra(TQ.medo); }
        await espera(380); parado(); await espera(200);
        if (marcas >= 3 || guarda <= 0) return;
      }
      if (cansaco > .5 && !visto.cansada) { visto.cansada = 1; await narra(TQ.cansada); }
    }
    // a coxa: o anel desce até atrás do joelho dele
    async function coxa(viaGuarda) {
      if (viaGuarda) { ele.vai('desequilibrado', agora, 140); await narra(T.cedeJ); }
      else { await narra(TQ.lateral); }
      ele.vai('desequilibrado', agora, 140); ele.alvoX = -Math.min(W * .08, 70); ele.alvoLean = .12;
      cam.alvoZoom = 1.18; anuncia(T.coxa, 'ouro'); msg(TQ.coxa);
      botoes([['golpe', T.golpear, 'Espaço']]);
      const j = janela(), alvo = anelEm('ele', 950, 'coxa', j.bom + 60);
      const r = await aguarda(alvo, j.bom + 80, ['golpe'], 'golpe'); someAnel(); limpaCmd(); cam.alvoZoom = 1;
      if (r.tipo && Math.abs(r.dt) <= j.bom + 80) return vitoriaJoseph();
      pop(r.tipo && r.dt < 0 ? T.cedo : T.tarde, 'ruim'); guarda = Math.max(guarda, 30); hud();
      await narra(TQ.lateralCedo); visto.erroVolta = nAtk + 2; parado();
    }

    // ----- Markus
    function tipoM() {
      if (fase === 3) {
        if (passos <= 1) { visto.naPedra = (visto.naPedra || 0) + 1; return visto.naPedra >= 3 || Math.random() < .55 ? 'pesado' : 'estocada'; }
        return Math.random() < .5 ? 'pesado' : 'estocada';
      }
      if (nTurnoM === 1) return 'estocada';
      if (nTurnoM === 2) return 'pesado';
      const r = Math.random();
      if (nTurnoM >= 3) return r < .45 ? 'pesado' : r < .78 ? 'estocada' : 'finta';
      return r < .55 ? 'pesado' : 'estocada';
    }
    async function golpeM(tipo, opc) {
      const r = await defesa(tipo, opc);
      if (r === 'micro') {
        if (!visto.lateralM) { visto.lateralM = 1; await narra(TQ.lateral); }
        // ele passou: um contra-golpe rápido
        ele.vai('recupera', agora, 120); ele.alvoX = -Math.min(W * .06, 50); msg(TQ.micro);
        botoes([['golpe', T.agora, 'Espaço']]);
        const j = janela(), alvo = anelEm('ele', 560, 'atq', j.perf);
        const g = await aguarda(alvo, j.bom, ['golpe'], 'golpe'); someAnel(); limpaCmd();
        if (g.tipo && Math.abs(g.dt) <= j.bom) { eu.vai('golpe', agora, 70); eu.alvoX = Math.min(W * .06, 50); ele.vai('escudo', agora, 80); som.bloqueio(false); const C = choque(); faisca(C.x, C.y, 18); impactoFx(.45); guarda = Math.max(0, guarda - 24); S.leituras++; pop(T.sente, 'ouro'); hud(); }
        else pop(T.ainda, 'ruim');
        await espera(420); parado(); await descobre(tipo); return r;
      }
      if (r === 'hitBash' && !visto.fintaM) { visto.fintaM = 1; await espera(400); await narra(T.bash); }
      if (r === 'hitPonta' && !visto.ponta) { visto.ponta = 1; await espera(400); await narra(T.pontaSegue); }
      if (r === 'ok' && tipo === 'finta' && !visto.fintaLida) { visto.fintaLida = 1; await espera(300); await narra(TQ.finta); }
      if (r === 'ok' && !visto.b1) { visto.b1 = 1; await espera(300); await narra(TQ.b1); }
      if (r === 'hit' && !visto.marcaM) { visto.marcaM = 1; await espera(400); await narra(T.marcaM); }
      if (visto.escorregou === 1) { visto.escorregou = 2; await narra(TQ.escorrega); }
      await descobre(tipo);
      await espera(320); parado(); await espera(160);
      return r;
    }
    // a descoberta do ar: o primeiro golpe pesado na chuva
    async function descobre(tipo) {
      if (tipo === 'pesado' && fase === 2 && !ouviu) { ouviu = true; ondas.push({ t: agora + 60 }, { t: agora + 280 }); await espera(300); await narra(TQ.descobre); }
    }
    async function turnoMarkus(contra) {
      nTurnoM++;
      if (contra) { await golpeM('estocada', { pressa: .75 }); return checaMarkus(); }
      const n = fase === 2 && Math.random() < .4 ? 2 : 1;
      for (let i = 0; i < n; i++) { await golpeM(tipoM(), {}); if (marcas >= 3) return; }
      return checaMarkus();
    }
    async function checaMarkus() {
      if (marcas >= 3) return;
      if (opts.ombro && !ombroUsado && bpm >= 140 && nTurnoM >= 2) { ombroUsado = true; mudaBpm(-26); eu.vai('respirar', agora, 300); await narra(TQ.ombro); parado(); }
      if (marcas === 2 && !misUsada && fase < 3) await misericordia();
      if (cansaco > .5 && !visto.cansada) { visto.cansada = 1; await narra(TQ.cansada); }
      if (fase === 1 && (nTurnoM >= 5 || guarda <= GMAX * .68)) await fase2();
      else if (fase === 2 && (nTurnoM >= 12 || guarda <= 0)) await fase3(guarda <= 0);
    }
    async function fase2() {
      fase = 2; chuvaAlvo = 1; root.classList.add('chuva-forte'); musica && musica.fase(2); sfx('chuva-elmo', .6); anuncia(T.fase2, 'fase');
      falhasFase = 0; snap = { bpm, guarda, cansaco };
      const L = [TQ.chuva];
      if (opts.lencoCabo) L.push(TQ.lenco);
      if (opts.sabeAviso) { ouviu = true; L.push(TQ.ouvido); }
      await espera(900); await narra(L);
    }
    async function fase3(cedeu) {
      fase = 3; passos = 13; falhasFase = 0; musica && musica.fase(3); anuncia(T.fase3, 'fase');
      const L = []; if (cedeu) L.push(T.guardaCede); L.push(TQ.vem, TQ.deixo, TQ.pedra);
      ele.vai('avanca', agora, 400); await espera(700); await narra(L);
      snap = { bpm, guarda, cansaco, passos: 13 };
      voz('conta-13', 200); anuncia(T.nums[12], 'conta'); hud(); await espera(700);
    }
    // a reta final: treze passos, e ele não deixa respirar
    async function retaFinal() {
      while (!acabou && marcas < 3) {
        const tipo = tipoM();
        const r = await defesa(tipo, {});
        if (r === 'queda') return queda();
        if (r === 'recuou') { passos--; voz('conta-' + String(passos).padStart(2, '0'), 120); anuncia(T.nums[passos - 1], 'conta'); cansa(.015); if (passos <= 3) tom(880, .05, 'square', .015); }
        else if (r === 'pedra') { const C = choque(); som.escorrega(); eu.vai('escorrega', agora, 80); fere('pedra', C); anuncia(TQ.cedoPedra.split('.')[0] + '.', 'fase'); await espera(500); await narra(TQ.cedoPedra); }
        else if (r === 'segurou') { await narra(T.lateralM2); }
        else if (r.startsWith && r.startsWith('hit') && passos > 1) { passos--; voz('conta-' + String(passos).padStart(2, '0'), 380); anuncia(T.nums[passos - 1], 'conta'); }
        hud();
        if (passos === 1 && !visto.calcanhar) { visto.calcanhar = 1; await espera(400); await narra(TQ.calcanhar); }
        await espera(300); parado(); await espera(120 + Math.random() * 200);
      }
    }

    // ---------- a misericórdia de Markus: duas marcas, e ele espera
    function misericordia() {
      misUsada = true; S.misericordia = 1;
      ele.vai('espera', agora, 300); ele.alvoX = Math.min(W * .08, 72); ele.alvoLean = 0; eu.vai('cansado', agora, 300);
      return new Promise((res) => {
        setTimeout(() => {
          pn.className = 'ar-painel on escolha'; pnTxt.innerHTML = T.misA; pnOps.innerHTML = ''; $('.ar-pn-ok').style.display = 'none'; $('.ar-pn-toque').style.display = 'none';
          T.misOps.forEach((o, i) => { const b = document.createElement('button'); b.className = 'cta ghost'; b.textContent = o; b.onclick = () => escolhe(i); pnOps.appendChild(b); });
          const escolhe = async (i) => {
            pn.className = 'ar-painel';
            if (i === 0) { som.rugido(); eu.vai('escudo', agora, 300); mudaBpm(-10); await narra(T.misLevanta); ele.alvoX = 0; ele.vai('guarda', agora, 400); }
            else {
              S.avancou = 1; eu.vai('golpe', agora, 90); eu.alvoX = 26; ele.vai('escudo', agora, 120); ele.alvoX = 0; som.bash(); const C = choque(); faisca(C.x, C.y); impactoFx(.5);
              setTimeout(() => sfx('suspiro-multidao', .8), 400); guarda = Math.max(0, guarda - 10); mudaBpm(10); hud();
              await espera(600); await narra(T.misAvanca);
            }
            parado(); res();
          };
          if (bot) setTimeout(() => escolhe(0), 80);
        }, bot ? 30 : 700);
      });
    }

    // ---------- fins
    function vitoriaJoseph() {
      acabou = true; eu.vai('golpe', agora, 60); eu.alvoX = Math.min(W * .1, 90); rastro(eu, P().eu, escala(), '255,214,170'); som.corte(); impactoFx(1.4, '180,20,20'); cam.alvoZoom = 1.25;
      setTimeout(() => { ele.vai('atingido', agora, 220); ele.alvoLean = 0; som.rugido(); anuncia(T.sangue, 'ouro'); cam.alvoZoom = 1; }, 380);
      setTimeout(() => { eu.vai('vitoria', agora, 500); eu.alvoX = 0; }, 1400);
      setTimeout(() => acaba({ resultado: 'venceu' }), bot ? 600 : 3400);
    }
    async function queda() {
      acabou = true; S.contagemUm = true; voz('conta-01', 0); anuncia(T.nums[0], 'conta');
      cam.alvoZoom = 1.2; ele.vai('escorrega', agora, 260); ele.alvoX = -Math.min(W * .14, 120); ele.alvoLean = .2;
      setTimeout(() => { som.escorrega(); impactoFx(.8); }, 300); setTimeout(() => som.suspiro(), 700);
      await new Promise((r) => setTimeout(r, bot ? 50 : 900));
      for (const t of [TQ.um, TQ.cai]) { msg(t); await new Promise((r) => setTimeout(r, bot ? 40 : leitura(t))); }
      revelacao();
    }
    function revelacao() {
      musica && musica.para();
      try { if (A && A.bed && A.ctx) A.bed.gain.setTargetAtTime(0, A.ctx.currentTime, .35); } catch (e) {}
      const volta = () => { try { if (A && A.bed && A.ctx) A.bed.gain.setTargetAtTime(1, A.ctx.currentTime, 1.2); } catch (e) {} };
      const box = $('.ar-video'), v = box.querySelector('video'), vl = box.querySelector('.ar-vleg'), bt = box.querySelector('.ar-golpear');
      const vleg = (t) => { vl.textContent = t; vl.classList.remove('on'); void vl.offsetWidth; vl.classList.add('on'); };
      root.classList.add('sem-elmo'); entrada = null; entradaMenu = null; avancaTexto = null;
      box.classList.add('on'); v.src = opts.videoElmo || ''; v.defaultPlaybackRate = .7; v.playbackRate = .7; v.play().catch(() => {});
      setTimeout(() => { sfx('correia-estala', 1); vib([30, 40, 80]); }, 1900);
      setTimeout(() => sfx('elmo-lama', .9), 6000);
      let feito = false;
      const final = () => { if (feito) return; feito = true; bt.classList.remove('on'); som.corte(); vib(120); box.classList.add('corte'); vleg(TQ.corte); volta(); setTimeout(() => acaba({ resultado: 'venceu' }), bot ? 300 : 4200); };
      // sem botão: o golpe final faz parte da cena, que corre sozinha até o fim
      const mostraBotao = () => { vl.classList.add('grande'); vleg(TQ.voa + ' ' + TQ.rosto); setTimeout(final, bot ? 200 : leitura(TQ.voa + ' ' + TQ.rosto) + 600); };
      let mostrou = false; const quando = () => { if (!mostrou) { mostrou = true; mostraBotao(); } };
      // a cena roda limpa: nada aparece e nada responde até o vídeo terminar
      v.onended = quando; v.onerror = () => setTimeout(quando, bot ? 50 : 1200);
      const reserva = (ms) => setTimeout(quando, bot ? 300 : ms);
      if (v.readyState >= 1 && isFinite(v.duration)) reserva(v.duration / v.playbackRate * 1000 + 800);
      else v.onloadedmetadata = () => reserva((isFinite(v.duration) ? v.duration : 6) / (v.playbackRate || 1) * 1000 + 800);
      if (!opts.videoElmo) reserva(1200);
      root._golpeFinal = () => { if (bt.classList.contains('on')) final(); };
    }
    // perder não volta ao começo: volta ao começo desta fase
    function derrota() {
      return new Promise((res) => {
        eu.vai('atingido', agora, 70); ele.vai(isM ? 'vitoria-dele' : 'guarda', agora, 400); som.dor(); impactoFx(1.5, '140,10,10'); sfx('suspiro-multidao', .7); vib(200);
        setTimeout(() => {
          const tela = $('.ar-tela'); tela.classList.remove('av-intro');
          tela.innerHTML = `<h2>${T.perdeu}</h2><p class="ar-sub">${T.denovoSub}</p><p class="ar-dica">${T.motivo[motivoUlt] || T.motivo.nada}</p><button class="cta ar-de-novo">${T.denovo}</button>`;
          tela.classList.add('on');
          const de = () => { tela.classList.remove('on'); recomeca(); res(); };
          tela.querySelector('.ar-de-novo').onclick = de; if (bot) setTimeout(de, 100);
        }, bot ? 100 : 1500);
      });
    }
    function recomeca() {
      falhasFase++; S.recomecos++; marcas = 0;
      if (snap) { bpm = Math.max(84, snap.bpm - 8); guarda = snap.guarda; cansaco = Math.max(0, snap.cansaco - .05); if (snap.passos) passos = Math.min(13, Math.max(passos + 2, 5)); }
      else { bpm = Math.max(84, bpm - 14); guarda = GMAX; cansaco = Math.max(0, cansaco - .1); }
      erroAberto = false; esperando = false; intencao = null; if (!isM) { nAtk = Math.min(nAtk, 3); visto.erroVolta = 0; }
      parado(); hud();
    }
    function acaba(res) {
      if (!vivo) return; vivo = false; acabou = true; clearTimeout(batT); clearTimeout(folegoT); removeEventListener('resize', rs); removeEventListener('keydown', kd, true);
      musica && musica.para(); window.__ARENA = null;
      resolve(Object.assign({ quem: Q, bpmFinal: Math.round(bpm), bpmMedio: Math.round(S.bpmSoma / Math.max(1, S.bpmN)), cansacoFinal: +cansaco.toFixed(2), marcasFinal: marcas, modo: 'turnos' }, S, res));
    }

    // ================================================================ o laço da luta
    async function luta() {
      snap = { bpm, guarda, cansaco };
      while (!acabou) {
        mudaBpm(-3);                                              // entre uma troca e outra, o corpo baixa um pouco sozinho
        if (isM && fase === 3) { await retaFinal(); if (acabou) return; if (marcas >= 3) { await derrota(); continue; } }
        const c = await turnoLaus();
        if (acabou) return;
        if (!isM && guarda <= 0) { await coxa(true); if (acabou) return; }
        const r = isM ? await turnoMarkus(c === 'contra') : await turnoJoseph();
        if (acabou) return;
        if (r === 'coxa') { await coxa(false); if (acabou) return; }
        if (marcas >= 3) { await derrota(); continue; }
        if (!isM && guarda <= 0) { await coxa(true); if (acabou) return; }
      }
    }

    // ---------- teclado e toque
    const kd = (e) => {
      if (!rodando) { if (e.key === 'Enter') { e.preventDefault(); comeca(); } return; }
      if (e.repeat) return;
      const k = e.key;
      if (entradaMenu && /^[1-4]$/.test(k)) { e.preventDefault(); entradaMenu(+k - 1); return; }
      if (entrada) {
        const m = { ' ': 'golpe', Enter: 'golpe', ArrowUp: 'escudo', w: 'escudo', W: 'escudo', ArrowDown: 'lateral', s: 'lateral', S: 'lateral', ArrowLeft: 'recuar', a: 'recuar', A: 'recuar', ArrowRight: 'golpe' }[k];
        if (m) { e.preventDefault(); entrada(m); }
        return;
      }
      if ((k === 'Enter' || k === ' ') && avancaTexto) { e.preventDefault(); avancaTexto(); }
      if (k === 'Enter' && root._golpeFinal) root._golpeFinal();
    };
    addEventListener('keydown', kd, true);
    // tocar na arena golpeia (no celular é o gesto natural) ou adianta o texto
    cv.addEventListener('pointerdown', () => { if (entrada) entrada('golpe'); else if (avancaTexto) avancaTexto(); });
    msgBox.addEventListener('pointerdown', () => { if (avancaTexto) avancaTexto(); });

    // ---------- relógio de desenho
    let ultimo = performance.now();
    const laco = (now) => {
      if (!vivo) return;
      const dt = Math.min(.05, (now - ultimo) / 1000); ultimo = now; agora = now;
      if (congela > 0) { congela -= dt * 1000; desenha(0); return requestAnimationFrame(laco); }
      if (rodando && !acabou) { S.bpmSoma += bpm * dt; S.bpmN += dt; cansa(.0025 * dt * (isM ? 1.2 : 1)); }
      eu.treme = bpm > 165 ? (bpm - 165) / 8 : 0;
      if (!anel && !acabou && rodando && ele.pose === guardaPose()) ele.alvoX = Math.sin(now / 800) * 8;
      desenha(dt);
      requestAnimationFrame(laco);
    };

    const comeca = async () => {
      if (rodando) return;
      $('.ar-tela').classList.remove('on'); rodando = true; ultimo = performance.now();
      if (A && A.ctx) { musica = trilha(A); musica.fase(1); }
      sfx('sino-arena', .8); bate(); folego(); hud();
      await narra(isM ? T.introM : T.introJ);
      luta();
    };
    $('.ar-go').onclick = comeca;
    Promise.all([carrega('laus'), carrega(Q)]).then(() => {});
    hud(); parado();
    window.__ARENA = { get fase() { return fase; }, get passos() { return passos; }, get marcas() { return marcas; }, get guarda() { return guarda; }, get bpm() { return bpm; }, get entrada() { return entrada; }, get menu() { return entradaMenu; }, get anel() { return anel; }, comeca, S };
    requestAnimationFrame(laco);
  });
}
window.ARENA = { start, modo: 'turnos' };
})();
