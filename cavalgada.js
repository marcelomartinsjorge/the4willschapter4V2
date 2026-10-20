/* ==========================================================================
   Capítulo IV · A CAVALGADA (dia 2)
   Visão de lado. O cavalo é emprestado e não gosta dela.
   GALOPE   · toque no compasso do casco: no tempo acelera, fora do tempo perde a passada
   ACALMAR  · segure: o cavalo trota, o medo dele baixa, o coração dela também
   ESPORA   · três, recarregam; arranque curto, mas enche o medo
   SALTAR   · na marca antes de cada obstáculo
   MEDO     · cheio, o cavalo refuga no próximo obstáculo
   SELA     · se a cilha não foi conferida, ela solta no meio do circuito
   MARKUS   · uma silhueta apagada faz o tempo dele
   ========================================================================== */
(() => {
'use strict';
const TX = {
  pt: {
    titulo: 'A Cavalgada', sub: 'O circuito inteiro em volta da arena. O cavalo é emprestado.',
    regras: ['<b>Galope</b> · toque quando o anel fechar. No tempo, ele acelera.', '<b>Acalmar</b> · segure. Ele trota, e o medo dele baixa.', '<b>Espora</b> · arranque curto. Três, e cada uma assusta.', '<b>Saltar</b> · na marca, antes do obstáculo. Com medo cheio, ele refuga.'],
    teclas: 'espaço galope · ↓ segurar · ↑ saltar · E espora · ← → sela', montar: 'Valendo', treinar: 'Treinar', treinoSub: 'O treino não conta para a história nem para os pontos.', treino: 'Fim do treino', denovo: 'Treinar de novo', valendo: 'Agora vale',
    galope: 'Galope', segure: 'segure: acalmar', espora: 'Espora', saltar: 'Saltar', medo: 'Medo do cavalo', markus: 'Markus',
    perf: 'No tempo.', bom: 'Quase.', fora: 'Fora do tempo.', limpo: 'Limpo.', derruba: 'Derruba a estaca.', raspa: 'Raspa o muro.', lama: 'A pata afunda na vala.',
    refuga: 'Ele refuga.', empina: 'Ele empina.', calmo: 'Mais calmo.', sela: 'A sela escorrega!', selaK: (l) => (l < 0 ? 'toque ◀ três vezes' : 'toque ▶ três vezes'), selaOk: 'Os joelhos seguram.', queda: 'Caio.',
    marshal: 'O marechal manda passar.', fim: 'Fim do circuito', tempo: 'Tempo', tempoM: 'Markus', saltos: 'Saltos limpos', refugos: 'Refugos', quedas: 'Quedas', pontos: 'Pontos', seguir: 'Seguir',
    tres: ['Três', 'Dois', 'Um'], vai: 'Vai!',
    lbT: 'Os que cavalgaram melhor', lbPh: 'Seu nome', lbEnv: 'Gravar no placar', lbOk: 'Gravado. O circuito lembra de você.', lbErr: 'Não consegui falar com o placar agora. Tente de novo.', lbVazio: 'Ninguém cavalgou ainda. Seja o primeiro.', lbNome: 'Escreva um nome de até 16 letras.',
  },
  en: {
    titulo: 'The Riding', sub: 'The whole circuit around the arena. The horse is borrowed.',
    regras: ['<b>Gallop</b> · tap when the ring closes. On the beat, he speeds up.', '<b>Calm</b> · hold. He trots, and his fear goes down.', '<b>Spur</b> · a short burst. Three of them, and each one scares him.', '<b>Jump</b> · on the mark, before the obstacle. With full fear, he refuses.'],
    teclas: 'space gallop · ↓ hold · ↑ jump · E spur · ← → saddle', montar: 'For real', treinar: 'Practise', treinoSub: 'Practice doesn’t count for the story or the points.', treino: 'End of practice', denovo: 'Practise again', valendo: 'Now for real',
    galope: 'Gallop', segure: 'hold: calm him', espora: 'Spur', saltar: 'Jump', medo: 'Horse’s fear', markus: 'Markus',
    perf: 'On the beat.', bom: 'Almost.', fora: 'Off the beat.', limpo: 'Clean.', derruba: 'Knocks the stake.', raspa: 'Scrapes the wall.', lama: 'A hoof sinks in the ditch.',
    refuga: 'He refuses.', empina: 'He rears.', calmo: 'Calmer.', sela: 'The saddle slips!', selaK: (l) => (l < 0 ? 'tap ◀ three times' : 'tap ▶ three times'), selaOk: 'My knees hold.', queda: 'I fall.',
    marshal: 'The marshal waves me past.', fim: 'End of the circuit', tempo: 'Time', tempoM: 'Markus', saltos: 'Clean jumps', refugos: 'Refusals', quedas: 'Falls', pontos: 'Points', seguir: 'Continue',
    tres: ['Three', 'Two', 'One'], vai: 'Go!',
    lbT: 'Those who rode best', lbPh: 'Your name', lbEnv: 'Save score', lbOk: 'Saved. The circuit remembers you.', lbErr: 'Could not reach the leaderboard right now. Try again.', lbVazio: 'No one has ridden yet. Be the first.', lbNome: 'Write a name up to 16 letters.',
  },
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
// o placar da cavalgada no Supabase (o mesmo projeto do placar do Aheryn, no Cap. I)
const SUPA = { url: 'https://qoxvlgscpljsrybywivf.supabase.co', key: 'sb_publishable_XvoczGgXZGAezAmabNUBrQ_r25L-7ga' };
const PLACAR = {
  h() { return { apikey: SUPA.key, 'Content-Type': 'application/json' }; },
  async top(n = 10) { const r = await fetch(`${SUPA.url}/rest/v1/cavalgada_scores?select=id,name,score,tempo,venceu_markus&order=score.desc,tempo.asc,created_at.asc&limit=${n}`, { headers: this.h() }); if (!r.ok) throw new Error(r.status); return r.json(); },
  async grava(x) { const r = await fetch(`${SUPA.url}/rest/v1/cavalgada_scores`, { method: 'POST', headers: Object.assign(this.h(), { Prefer: 'return=representation' }), body: JSON.stringify(x) }); if (!r.ok) throw new Error(r.status); return (await r.json())[0]; },
};
const escH = (x) => String(x).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const BASE = 'assets/images/cav/';
// as folhas de sprite (recortadas dos vídeos): w/h do quadro, n quadros, colunas, caixa no vídeo original (para alinhar)
const SP = {
  galope: { f: 'laus-galope.webp', w: 373, h: 311, n: 21, cols: 12, box: [155, 22, 528, 333], fps: 24 },
  trote: { f: 'laus-trote.webp', w: 337, h: 298, n: 28, cols: 12, box: [158, 32, 495, 330], fps: 24 },
  salto: { f: 'laus-salto.webp', w: 370, h: 316, n: 19, cols: 12, box: [146, 17, 516, 333], fps: 24 },
  refuga: { f: 'laus-refuga.webp', w: 364, h: 325, n: 24, cols: 12, box: [148, 8, 512, 333], fps: 14 },
  markus: { f: 'markus-galope.webp', w: 398, h: 343, n: 27, cols: 12, box: [133, 12, 531, 355], fps: 24, chao: 346 },
};
const CHAO = 328, CX = 341, NARIZ = 162;   // em coordenadas do vídeo original: chão, centro do cavalo, focinho
const OBST = {
  estaca: { f: 'obst-estaca.webp', w: 552, h: 322, s: .44, txt: 'derruba' },
  vala: { f: 'obst-vala.webp', w: 880, h: 150, s: .48, txt: 'lama', afunda: 14 },
  muro: { f: 'obst-muro.webp', w: 628, h: 191, s: .58, txt: 'raspa' },
};
const PISTA = ['estaca', 'vala', 'estaca', 'muro', 'vala', 'estaca', 'muro'];
const ESPACO = 2300, INICIO = 2000, V = { trote: 300, base: 560, max: 940, markus: 690 };

function cavalgada(root, o) {
  const T = TX[o.lang] || TX.en, A = o.A, bot = !!window.__ARENA_BOT, erroBot = window.__ARENA_BOT_ERRO || 0;
  return new Promise((resolve) => {
    root.innerHTML = `<canvas class="cv-cv"></canvas>
      <div class="cv-hud">
        <div class="cv-pista"><i class="cv-fim"></i><b class="cv-eu"></b><b class="cv-mk" title="${T.markus}"></b></div>
        <div class="cv-lin"><span class="cv-t">0.0</span><span class="cv-medo"><small>${T.medo}</small><i><em></em></i></span><span class="cv-cor">♥ <b></b></span></div>
      </div>
      <p class="cv-pop"></p>
      <div class="cv-sela"><i class="cv-agulha"></i><b class="cv-seta"></b><small></small></div>
      <div class="cv-bts">
        <button class="cv-esp" data-a="espora"><span class="cv-pips"><i></i><i></i><i></i></span>${T.espora}</button>
        <button class="cv-gal" data-a="galope"><i class="cv-anel"></i><b>${T.galope}</b><small>${T.segure}</small></button>
        <button class="cv-sal" data-a="saltar">${T.saltar}</button>
      </div>
      <div class="cv-tela on"><h2>${T.titulo}</h2><p class="cv-sub">${T.sub}</p><ul>${T.regras.map((r) => `<li>${r}</li>`).join('')}</ul><p class="cv-k">${T.teclas}</p><div class="cv-tbts"><button class="ghost cv-treino">${T.treinar}</button><button class="cta cv-go">${T.montar}</button></div><p class="cv-k cv-tsub">${T.treinoSub}</p></div>`;
    const $ = (s) => root.querySelector(s);
    const cv = $('.cv-cv'), cx = cv.getContext('2d'), pop = $('.cv-pop'), anel = $('.cv-anel'), selaEl = $('.cv-sela'), agulha = $('.cv-agulha');
    // ---------- imagens
    const IM = {}; const carrega = (k, f) => { const i = new Image(); i.src = BASE + f; IM[k] = i; };
    Object.entries(SP).forEach(([k, s]) => carrega(k, s.f)); Object.entries(OBST).forEach(([k, s]) => carrega('o-' + k, s.f));
    carrega('fundo', 'cav-fundo.jpg'); carrega('chao', 'cav-chao.jpg');
    // ---------- som
    const sfx = (n, v = .6) => { try { A && A.sfx && A.sfx(n, v); } catch (e) {} };
    let loop = null;
    const tocaLoop = async (nome, vol) => {
      if (!A || !A.ctx || !A.buf) return;
      if (loop && loop.nome === nome) return;
      paraLoop(); const b = await A.buf('assets/audio/sfx/' + nome + '.mp3'); if (!b || !vivo) return;
      const s = A.ctx.createBufferSource(); s.buffer = b; s.loop = true; const g = A.ctx.createGain(); g.gain.value = 0; s.connect(g); g.connect(A.fx || A.ctx.destination); s.start();
      g.gain.setTargetAtTime(vol, A.ctx.currentTime, .3); loop = { nome, s, g };
    };
    const paraLoop = () => { if (!loop) return; const l = loop; loop = null; try { l.g.gain.setTargetAtTime(0, A.ctx.currentTime, .15); setTimeout(() => { try { l.s.stop(); } catch (e) {} }, 500); } catch (e) {} };
    // ---------- estado
    let W = 0, H = 0, DPR = 1, G = 0, k = 1, hcx = 0, vivo = true, rodando = false, t0 = 0, tAnt = 0, tempo = 0;
    let d = 0, v = V.trote, vT = V.trote, boost = 0, medo = clamp(o.medo0 != null ? o.medo0 : 22, 0, 90), bpm = o.bpm || 100, medoMax = medo;
    let beatMs = 520, prox = 0, ultTap = -1e9, tapNesta = false, segurando = false, segT = 0, esporas = 3, espRec = 0, espUsos = [];
    let estado = 'corre', estT = 0, salto = null, refugoAlvo = null, frame = 0, frameM = 0, pistaFim = 0, sela = null, selaFeita = !!o.cilhaOk, n = 0, shake = 0;
    let R = {}, obst = [], pista = PISTA, treino = false;
    const barra = $('.cv-pista');
    // prepara uma corrida (o treino é curto e sempre tem a sela soltando, para aprender)
    const prepara = (tr) => {
      treino = !!tr; pista = treino ? ['estaca', 'vala', 'muro'] : PISTA;
      R = { limpos: 0, derrubados: 0, refugos: 0, quedas: 0, perfeitos: 0, fora: 0, esporas: 0, acalmou: 0 };
      obst = pista.map((tipo, i) => ({ tipo, P: INICIO + i * ESPACO, feito: null, tent: 0 }));
      pistaFim = INICIO + pista.length * ESPACO + 600;
      d = 0; v = V.trote; vT = V.trote; boost = 0; medo = clamp(o.medo0 != null ? o.medo0 : 22, 0, 90); bpm = o.bpm || 100; medoMax = medo; tempo = 0;
      tapNesta = false; segurando = false; esporas = 3; espRec = 0; espUsos = []; estado = 'corre'; estT = 0; salto = null; refugoAlvo = null;
      sela = null; selaEl.classList.remove('on'); selaFeita = treino ? false : !!o.cilhaOk; shake = 0;
      barra.querySelectorAll('.cv-ob').forEach((m) => m.remove());
      obst.forEach((ob) => { const m = document.createElement('i'); m.className = 'cv-ob'; m.style.right = (ob.P / pistaFim * 100) + '%'; barra.appendChild(m); });
      pips && pips();
    };
    const rs = () => {
      DPR = Math.min(devicePixelRatio || 1, 2); W = root.clientWidth; H = root.clientHeight; cv.width = W * DPR; cv.height = H * DPR; cx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const ret = H > W * 1.1; G = H * (ret ? .66 : .80);
      k = Math.min(H * (ret ? .30 : .40) / 311, W * (ret ? .62 : .42) / 373);
      hcx = W * (ret ? .62 : .64);
    };
    addEventListener('resize', rs); rs();
    const aviso = (t, cls) => { pop.textContent = t; pop.className = 'cv-pop'; void pop.offsetWidth; pop.className = 'cv-pop on ' + (cls || ''); };
    const noseX = () => hcx + (NARIZ - CX) * k;
    // ---------- entradas
    const galope = () => {
      if (!rodando || estado !== 'corre' || segurando || sela) return;
      const now = performance.now(), prev = prox - beatMs, dd = Math.min(Math.abs(now - prox), Math.abs(now - prev));
      if (tapNesta && Math.abs(now - prev) < 160) return;   // um toque por passada
      tapNesta = true; ultTap = now;
      if (dd <= 60) { vT = Math.min(V.max, vT + 95); R.perfeitos++; medo = Math.max(0, medo - 3); aviso(T.perf, 'ok'); anel.classList.add('ok'); setTimeout(() => anel.classList.remove('ok'), 160); }
      else if (dd <= 125) { vT = Math.min(V.max, vT + 55); aviso(T.bom); }
      else { vT = Math.max(V.trote, vT - 80); medo += 7; R.fora++; aviso(T.fora, 'mal'); sfx('cavalo-bufa', .35); }
      if (vT < V.base && dd <= 125) vT = Math.max(vT, V.base);
    };
    const espora = () => {
      if (!rodando || estado !== 'corre' || sela || esporas <= 0) return;
      esporas--; espRec = 6; R.esporas++; boost = 340; medo += 15; bpm += 6; sfx('espora', .7);
      const now = performance.now(); espUsos = espUsos.filter((x) => now - x < 4000); espUsos.push(now);
      if (espUsos.length >= 3) { aviso(T.empina, 'mal'); estado = 'empina'; estT = 0; boost = 0; v = 0; vT = V.trote; medo += 10; sfx('cavalo-refuga', .7); }
      pips();
    };
    const saltar = () => {
      if (!rodando || estado !== 'corre' || salto || sela) return;
      const alvo = obst.find((x) => !x.feito && x.P - d > -40); if (!alvo) { salto = { t: 0, dur: .7, alvo: null }; return; }
      const dist = alvo.P - d, ideal = 150 + (v - V.base) * .12;
      salto = { t: 0, dur: clamp((OBST[alvo.tipo].w * OBST[alvo.tipo].s + 300) / Math.max(v, 400), .62, 1.05), alvo, nota: Math.abs(dist - ideal) };
      if (dist > 520) { salto.alvo = null; salto.nota = 999; }   // pulou no nada
    };
    const segura = (on) => { if (!rodando) return; segurando = on && !sela; if (on) segT = 0; };
    // teclado
    const kd = (e) => {
      if (!vivo) return;
      if (!rodando) { if ((e.key === 'Enter' || e.key === ' ') && $('.cv-tela.on .cv-go')) { e.preventDefault(); comeca(false); } return; }
      if (sela) { if (e.key === 'ArrowLeft' || e.key === 'a') { e.preventDefault(); if (!e.repeat) selaToque(-1); } if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); if (!e.repeat) selaToque(1); } return; }
      if (e.repeat) return;
      if (e.key === ' ') { e.preventDefault(); galope(); }
      else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') { e.preventDefault(); saltar(); }
      else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.key === 'Shift') { e.preventDefault(); segura(true); }
      else if (e.key === 'e' || e.key === 'E') { e.preventDefault(); espora(); }
    };
    const ku = (e) => { if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.key === 'Shift') segura(false);  };
    addEventListener('keydown', kd, true); addEventListener('keyup', ku, true);
    // botões: tocar no galope = passada; segurar = acalmar
    let holdT = null;
    $('.cv-gal').addEventListener('pointerdown', (e) => { e.preventDefault(); galope(); holdT = setTimeout(() => segura(true), 300); });
    const solta = () => { clearTimeout(holdT); segura(false); };
    $('.cv-gal').addEventListener('pointerup', solta); $('.cv-gal').addEventListener('pointerleave', solta); $('.cv-gal').addEventListener('pointercancel', solta);
    $('.cv-esp').addEventListener('pointerdown', (e) => { e.preventDefault(); if (sela) selaToque(-1); else espora(); });
    $('.cv-sal').addEventListener('pointerdown', (e) => { e.preventDefault(); if (sela) selaToque(1); else saltar(); });
    // a sela escorrega para um lado: três toques no lado oposto, com tempo de sobra
    const selaToque = (l) => {
      if (!sela) return;
      if (l === -sela.lado) { sela.n++; sfx('espora', .35); selaEl.classList.remove('bate'); void selaEl.offsetWidth; selaEl.classList.add('bate'); if (sela.n >= 3) { selaEl.classList.remove('on'); root.querySelectorAll('.cv-bts button').forEach((b) => b.classList.remove('alvo')); sela = null; aviso(T.selaOk, 'ok'); } }
    };
    const pips = () => root.querySelectorAll('.cv-pips i').forEach((p, i) => p.classList.toggle('off', i >= esporas));
    // ---------- começo
    const comeca = async (tr) => {
      if (rodando) return; prepara(tr === true); $('.cv-tela').classList.remove('on', 'fim');
      for (const c of T.tres) { aviso(c, 'conta'); sfx('cavalo-bufa', .25); await new Promise((r) => setTimeout(r, bot ? 30 : 700)); }
      aviso(T.vai, 'ok'); sfx('sino-arena', .7);
      rodando = true; t0 = performance.now(); tAnt = t0; prox = t0 + beatMs; vT = V.base; tocaLoop('galope-loop', .55);
    };
    const ligaIntro = () => { $('.cv-go').onclick = () => comeca(false); const t = $('.cv-treino'); if (t) t.onclick = () => comeca(true); };
    ligaIntro();
    // ---------- o laço
    const pinta = (sp, i, x, y, alpha = 1, flip = false, s = k) => {
      const img = IM[sp], S = SP[sp]; if (!img.complete || !img.naturalWidth) return;
      const fi = Math.floor(i) % S.n, sx = (fi % S.cols) * S.w, sy = Math.floor(fi / S.cols) * S.h;
      const chao = S.chao || CHAO, left = x + (S.box[0] - CX) * s, top = y + (S.box[1] - chao) * s;
      cx.save(); cx.globalAlpha = alpha; if (flip) { cx.translate(left + S.w * s / 2, 0); cx.scale(-1, 1); cx.translate(-(left + S.w * s / 2), 0); }
      cx.drawImage(img, sx, sy, S.w, S.h, left, top, S.w * s, S.h * s); cx.restore();
    };
    const tile = (img, off, y, h) => { if (!img.complete || !img.naturalWidth) return; const w = img.naturalWidth * h / img.naturalHeight; let x = (off % w) - w; while (x < W) { cx.drawImage(img, x, y, w + 1, h); x += w; } };
    const fim = () => {
      if (!rodando) return; rodando = false; paraLoop(); sfx('multidao-azarao', .55);
      const tM = (pistaFim) / V.markus;
      if (treino) {
        const tela = $('.cv-tela'); tela.innerHTML = `<h2>${T.treino}</h2><table><tr><td>${T.tempo}</td><td>${tempo.toFixed(1)}s</td></tr><tr><td>${T.saltos}</td><td>${R.limpos} / ${pista.length}</td></tr><tr><td>${T.refugos}</td><td>${R.refugos}</td></tr>${R.quedas ? `<tr><td>${T.quedas}</td><td>${R.quedas}</td></tr>` : ''}</table><div class="cv-tbts"><button class="ghost cv-treino">${T.denovo}</button><button class="cta cv-go">${T.valendo}</button></div><p class="cv-k cv-tsub">${T.treinoSub}</p>`;
        tela.classList.add('on'); ligaIntro(); if (bot) setTimeout(() => comeca(false), 60); return;
      }
      const ptsT = 12 * clamp((40 - tempo) / (40 - 22), 0, 1), ptsL = R.limpos * 9 / PISTA.length, ptsR = R.refugos === 0 ? 4 : R.refugos === 1 ? 2 : 0;
      const pontos = Math.round(clamp(ptsT + ptsL + ptsR - 3 * R.quedas, 0, 25) * 10) / 10;
      const res = Object.assign({}, R, { tempo: +tempo.toFixed(1), tempoMarkus: +tM.toFixed(1), venceuMarkus: tempo < tM, pontos, bpm: Math.round(clamp(bpm, 70, 170)), medoMax: Math.round(medoMax), cilhaOk: !!o.cilhaOk });
      const tela = $('.cv-tela'); tela.innerHTML = `<h2>${T.fim}</h2><table>
        <tr><td>${T.tempo}</td><td>${res.tempo}s</td></tr><tr><td>${T.tempoM}</td><td>${res.tempoMarkus}s</td></tr>
        <tr><td>${T.saltos}</td><td>${R.limpos} / ${PISTA.length}</td></tr><tr><td>${T.refugos}</td><td>${R.refugos}</td></tr>${R.quedas ? `<tr><td>${T.quedas}</td><td>${R.quedas}</td></tr>` : ''}
        <tr class="tot"><td>${T.pontos}</td><td>${pontos} / 25</td></tr></table>
        <div class="cv-lb"><h3>${T.lbT}</h3><form class="cv-lbf"><input class="cv-lbn" maxlength="16" placeholder="${T.lbPh}" autocomplete="off"><button class="ghost" type="submit">${T.lbEnv}</button></form><p class="cv-lbm"></p><ol class="cv-lbl"></ol></div>
        <button class="cta cv-seg">${T.seguir}</button>`;
      tela.classList.add('on', 'fim');
      // o placar: lista os dez melhores e deixa gravar o nome uma vez
      const loc = o.lang === 'en' ? 'en-US' : 'pt-BR', lbl = tela.querySelector('.cv-lbl'), lbm = tela.querySelector('.cv-lbm'), lbf = tela.querySelector('.cv-lbf'), lbn = tela.querySelector('.cv-lbn');
      const score = Math.round(pontos * 1000);
      const lista = async (meu) => { try { const t = await PLACAR.top(10); lbl.innerHTML = t.length ? t.map((x) => `<li class="${x.id === meu ? 'eu' : ''}"><span>${escH(x.name)}${x.venceu_markus ? ' ✦' : ''}</span><b>${Number(x.score).toLocaleString(loc)}</b><small>${Number(x.tempo).toFixed(1)}s</small></li>`).join('') : `<li><span>${T.lbVazio}</span></li>`; } catch (e) { lbm.textContent = T.lbErr; } };
      try { lbn.value = localStorage.getItem('aqv_nome') || ''; } catch (e) {}
      lbf.onsubmit = async (e) => {
        e.preventDefault(); const nome = lbn.value.trim(); if (!nome || nome.length > 16) { lbm.textContent = T.lbNome; return; }
        lbf.querySelector('button').disabled = true;
        try { localStorage.setItem('aqv_nome', nome); } catch (e2) {}
        try { const x = await PLACAR.grava({ name: nome, score, tempo: +tempo.toFixed(2), limpos: R.limpos, quedas: R.quedas, venceu_markus: tempo < tM, lang: o.lang === 'en' ? 'en' : 'pt' }); lbm.textContent = T.lbOk; lbf.hidden = true; lista(x && x.id); }
        catch (e3) { lbm.textContent = T.lbErr; lbf.querySelector('button').disabled = false; }
      };
      lbn.addEventListener('keydown', (e) => e.stopPropagation(), true);
      if (!bot) lista(null);
      const sai = () => { if (!vivo) return; vivo = false; removeEventListener('keydown', kd, true); removeEventListener('keyup', ku, true); removeEventListener('resize', rs); resolve(res); };
      tela.querySelector('.cv-seg').onclick = sai; if (bot) setTimeout(sai, 60);
    };
    const passo = (now) => {
      if (!vivo) return;
      const dt = Math.min(.05, (now - tAnt) / 1000); tAnt = now;
      if (rodando) {
        tempo = (now - t0) / 1000;
        // compasso
        if (now >= prox + 125) { if (!tapNesta && estado === 'corre' && !segurando && !sela) vT = Math.max(V.trote, vT - 40); tapNesta = false; prox += beatMs; }
        // bot
        if (bot && estado === 'corre') {
          if (!sela && !tapNesta && Math.abs(now - prox) < 25 && Math.random() > erroBot) galope();
          const alvo = obst.find((x) => !x.feito && x.P - d > 0);
          if (alvo && !salto && alvo.P - d < 150 + (v - V.base) * .12 + 10 && alvo.P - d > 60) saltar();
          if (medo > 80 && !segurando) segura(true); else if (segurando && medo < 40) segura(false);
          if (sela && Math.random() < dt * 4) selaToque(-sela.lado);
        }
        // velocidade e medo
        if (segurando) { vT = V.trote; medo = Math.max(0, medo - 24 * dt); bpm = Math.max(78, bpm - 7 * dt); segT += dt; if (segT > 1.2 && segT - dt <= 1.2) { aviso(T.calmo, 'ok'); R.acalmou++; } }
        if (espRec > 0) { espRec -= dt; if (espRec <= 0 && esporas < 3) { esporas++; pips(); if (esporas < 3) espRec = 6; } }
        boost = Math.max(0, boost - 260 * dt);
        if (estado === 'corre') { v += ((vT + boost) - v) * Math.min(1, 3.2 * dt); }
        if (bpm > 120) medo += 2 * dt;
        if (v > 800) bpm += 1.6 * dt; else bpm += (96 - bpm) * .05 * dt;
        medo = clamp(medo, 0, 100); medoMax = Math.max(medoMax, medo);
        if (medo > 75 && Math.random() < dt * .6) sfx('cavalo-bufa', .4);
        // estados especiais
        if (estado === 'empina' || estado === 'refuga' || estado === 'caido') {
          estT += dt; v = Math.max(0, v - 2000 * dt);
          const dur = estado === 'caido' ? 3.2 : 1.7;
          if (estT >= dur) { estado = 'corre'; v = V.trote; vT = V.base; if (refugoAlvo) { d = Math.min(d, refugoAlvo.P - 520); refugoAlvo = null; } }
        }
        d += v * dt;
        // salto
        if (salto) {
          salto.t += dt;
          if (salto.t >= salto.dur) {
            const a = salto.alvo;
            if (a && !a.feito) {
              const nota = salto.nota;
              if (nota <= 85) { a.feito = 'limpo'; R.limpos++; aviso(T.limpo, 'ok'); sfx('salto-pouso', .7); }
              else { a.feito = 'derrubou'; R.derrubados++; aviso(T[OBST[a.tipo].txt], 'mal'); sfx(a.tipo === 'estaca' ? 'estaca-cai' : 'salto-pouso', .8); medo += 10; bpm += 5; vT = Math.max(V.trote, vT - 160); shake = .5; setTimeout(() => sfx('multidao-ri', .45), 300); }
            } else sfx('salto-pouso', .5);
            salto = null;
          }
        }
        // chegou no obstáculo sem saltar (ou com medo cheio): refuga
        const alvo = obst.find((x) => !x.feito);
        if (alvo && estado === 'corre') {
          const dist = alvo.P - d;
          const medoRefuga = medo >= 99 && dist < 160 && dist > 0 && !(salto && salto.alvo === alvo);
          if ((dist <= 10 && !(salto && salto.alvo === alvo)) || medoRefuga) {
            salto = null; alvo.tent++; R.refugos++; estado = 'refuga'; estT = 0; refugoAlvo = alvo; medo = Math.max(30, medo - 45); bpm += 12; sfx('cavalo-refuga', .8); aviso(T.refuga, 'mal'); shake = .6;
            if (alvo.tent >= 2) { alvo.feito = 'passou'; refugoAlvo = null; setTimeout(() => aviso(T.marshal), 900); }
          }
        }
        // a sela solta, na metade
        if (!selaFeita && d > pistaFim * .52 && estado === 'corre' && !salto) {
          selaFeita = true; sela = { t: 0, lado: Math.random() < .5 ? -1 : 1, n: 0, prazo: 3.2 }; segurando = false; aviso(T.sela, 'mal'); selaEl.classList.add('on'); sfx('cavalo-bufa', .6);
          selaEl.querySelector('.cv-seta').textContent = sela.lado > 0 ? '◀' : '▶'; selaEl.querySelector('small').textContent = T.selaK(-sela.lado);
          root.querySelector(sela.lado > 0 ? '.cv-esp' : '.cv-sal').classList.add('alvo');
        }
        if (sela) {
          sela.t += dt; const incl = sela.lado * (1 - sela.n / 3) * (.6 + .4 * Math.min(1, sela.t / sela.prazo));
          agulha.style.transform = `translateX(${incl * 110}px) rotate(${incl * 32}deg)`;
          if (sela.t > sela.prazo) { selaEl.classList.remove('on'); root.querySelectorAll('.cv-bts button').forEach((b) => b.classList.remove('alvo')); sela = null; R.quedas++; estado = 'caido'; estT = 0; v = 0; shake = 1; aviso(T.queda, 'mal'); sfx('saco-nuca', .7); setTimeout(() => sfx('multidao-ri', .5), 400); bpm += 15; }
        }
        if (d >= pistaFim) fim();
        // som do galope acompanha
        if (loop && loop.s) { try { loop.s.playbackRate.setTargetAtTime(clamp(v / 640, .6, 1.4), A.ctx.currentTime, .1); } catch (e) {} if (v < 420 && loop.nome !== 'trote-loop' && rodando) tocaLoop('trote-loop', .5); else if (v >= 460 && loop.nome !== 'galope-loop' && rodando) tocaLoop('galope-loop', .55); }
      }
      // ---------- desenho
      shake = Math.max(0, shake - dt * 1.5);
      const sh = shake ? (Math.random() - .5) * 14 * shake : 0;
      cx.clearRect(0, 0, W, H); cx.save(); cx.translate(sh, sh * .5);
      if (sela) { cx.translate(W / 2, H / 2); cx.rotate(sela.lado * (1 - sela.n / 3) * .04); cx.translate(-W / 2, -H / 2); }
      tile(IM.fundo, d * k * .22, 0, G + H * .04);
      tile(IM.chao, d * k, G - H * .045, H - G + H * .06);
      // marcas de salto e obstáculos
      for (const ob of obst) {
        const x = noseX() - (ob.P - d) * k, O = OBST[ob.tipo]; if (x < -400 || x - O.w * O.s * k > W + 400) continue;
        if (!ob.feito) { const ideal = 150 + (v - V.base) * .12, mx = noseX() - (ob.P - ideal - d) * k, ph = H * .09, perto = clamp(1 - Math.abs(ob.P - ideal - d) / 900, 0, 1);
          cx.fillStyle = '#3a2716'; cx.fillRect(mx - 3, G - ph, 6, ph); cx.fillStyle = `rgba(242,${200 + 40 * perto},150,${.55 + .45 * perto})`; cx.beginPath(); cx.moveTo(mx + 3, G - ph); cx.lineTo(mx + 3 + 26 * k, G - ph + 7 * k); cx.lineTo(mx + 3, G - ph + 14 * k); cx.fill();
          cx.strokeStyle = `rgba(255,236,190,${.25 + .5 * perto})`; cx.lineWidth = 2; cx.setLineDash([6, 6]); cx.beginPath(); cx.moveTo(mx, G + 2); cx.lineTo(mx, H); cx.stroke(); cx.setLineDash([]); }
        const img = IM['o-' + ob.tipo]; if (img.complete && img.naturalWidth) { const w = O.w * O.s * k, h = O.h * O.s * k; cx.globalAlpha = ob.feito === 'derrubou' && ob.tipo === 'estaca' ? .55 : 1; cx.drawImage(img, x - w, G - h + (O.afunda || 0) * k, w, h); cx.globalAlpha = 1; }
      }
      // a chegada
      { const x = noseX() - (pistaFim - d) * k; if (x > -50 && x < W + 50) { cx.fillStyle = '#2a1d12'; cx.fillRect(x - 3, G - H * .34, 6, H * .34); cx.fillStyle = '#b8382f'; cx.beginPath(); cx.moveTo(x + 3, G - H * .34); cx.lineTo(x + 70, G - H * .31); cx.lineTo(x + 3, G - H * .27); cx.fill(); } }
      // Markus, o fantasma
      const dm = rodando || tempo ? Math.min(pistaFim, V.markus * tempo) : 0;
      frameM += dt * 24 * .95;
      { const x = hcx - (dm - d) * k; let y = G; for (const ob of obst) { const rel = dm - (ob.P - 150); if (rel > 0 && rel < 520) y -= Math.sin(rel / 520 * Math.PI) * H * .09; }
        if (x > -300 && x < W + 300) pinta('markus', frameM, x, y + 18 * k, .34, false, k * .96); }
      // ela
      let sp = 'galope', fi = frame, y = G;
      if (estado === 'refuga' || estado === 'empina' || estado === 'caido') { sp = 'refuga'; fi = Math.min(SP.refuga.n - 1, estT * SP.refuga.fps); if (estado === 'caido') cx.globalAlpha = .6 + .4 * Math.abs(Math.sin(estT * 6)); }
      else if (salto) { sp = 'salto'; const p = salto.t / salto.dur; fi = p * (SP.salto.n - 1); y -= Math.sin(p * Math.PI) * H * .11; }
      else if (v < 440 || segurando) { sp = 'trote'; frame += dt * 24 * clamp(v / 360, .5, 1.2); fi = frame; }
      else { frame += dt * 24 * clamp(v / 620, .7, 1.6); fi = frame; }
      cx.save(); cx.fillStyle = 'rgba(0,0,0,.35)'; cx.beginPath(); cx.ellipse(hcx - 10 * k, G + 4, 150 * k * (salto ? .7 : 1), 10 * k, 0, 0, 6.283); cx.fill(); cx.restore();
      pinta(sp, fi, hcx, y);
      cx.globalAlpha = 1; cx.restore();
      // ---------- HUD
      if (rodando) {
        const pr = clamp(d / pistaFim, 0, 1), pm = clamp(dm / pistaFim, 0, 1);
        $('.cv-eu').style.right = (pr * 100) + '%'; $('.cv-mk').style.right = (pm * 100) + '%';
        $('.cv-t').textContent = tempo.toFixed(1); $('.cv-medo em').style.transform = `scaleX(${medo / 100})`; $('.cv-medo').classList.toggle('alto', medo > 75);
        $('.cv-cor b').textContent = Math.round(bpm);
        const pa = clamp(1 - (prox - now) / beatMs, 0, 1); anel.style.transform = `scale(${1.9 - .9 * pa})`; anel.style.opacity = segurando ? .25 : .35 + .65 * pa;
        $('.cv-gal').classList.toggle('segura', segurando);
      }
      requestAnimationFrame(passo);
    };
    // marcas dos obstáculos na barra de progresso
    prepara(false); requestAnimationFrame((t) => { tAnt = t; passo(t); });
    if (bot) setTimeout(() => comeca(window.__CAV_TREINO ? true : false), 50);
  });
}
window.JOGOS4 = Object.assign(window.JOGOS4 || {}, { cavalgada });
})();
