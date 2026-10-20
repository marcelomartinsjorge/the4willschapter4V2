/* ==========================================================================
   Capítulo IV · A QUINTANA (dia 3)
   Primeira pessoa. Três passadas.
   1 · CORRIDA  · quatro compassos de galope: a força vem do cavalo, não do braço
   2 · MIRA     · a ponta da lança balança com o galope e com o coração; segure no centro do escudo
   3 · GOLPE    · o anel fecha sobre o escudo: golpeie
   Centro com força: o boneco balança inteiro. Centro sem força: só balança.
   Fora do centro: o boneco gira e o saco vem buscar a nuca. Abaixe.
   ========================================================================== */
(() => {
'use strict';
const TX = {
  pt: {
    titulo: 'A Quintana', sub: 'Um boneco de madeira num poste. Um escudo num braço, um saco de areia no outro.',
    regras: ['<b>Galope</b> · botão da esquerda, quatro toques no compasso. A força vem do cavalo.', '<b>Mira</b> · arraste, ou use as setas: segure a ponta da lança no centro do escudo.', '<b>Golpe</b> · botão da direita, quando o anel fechar sobre o escudo.', '<b>Abaixe</b> · botão da esquerda, se o boneco girar e o saco vier.'],
    teclas: 'espaço galope e abaixar · Enter golpe · setas mira', montar: 'Valendo', treinar: 'Treinar', treinoSub: 'O treino não conta para a história nem para os pontos.', treino: 'Fim do treino', denovo: 'Treinar de novo', valendo: 'Agora vale', passadaT: 'Passada de treino',
    passada: ['Primeira passada', 'Segunda passada', 'Última passada'], galope: 'Galope', golpe: 'Golpear', abaixe: 'Abaixe!', mira: 'Mire no centro',
    perf: 'No tempo.', bom: 'Quase.', fora: 'Fora do tempo.',
    forte: 'No centro. O boneco balança inteiro.', centro: 'No centro. O boneco só balança.', gira: 'Fora do centro. Ele gira.', desviou: 'O saco passa por cima.', saco: 'O saco me acerta a nuca.', erro: 'A lança passa ao lado do escudo.', nada: 'Passo sem golpear.',
    fim: 'Fim da quintana', pts: 'Pontos', seguir: 'Seguir', res: { forte: 'centro, com força', centro: 'centro', desviou: 'girou, abaixei', saco: 'girou, levei o saco', erro: 'errei o escudo', nada: 'não golpeei' },
  },
  en: {
    titulo: 'The Quintain', sub: 'A wooden figure on a post. A shield on one arm, a sandbag on the other.',
    regras: ['<b>Gallop</b> · left button, four taps on the beat. The strength comes from the horse.', '<b>Aim</b> · drag, or use the arrows: hold the lance tip on the centre of the shield.', '<b>Strike</b> · right button, when the ring closes on the shield.', '<b>Duck</b> · left button, if the figure spins and the sandbag comes.'],
    teclas: 'space gallop and duck · Enter strike · arrows aim', montar: 'For real', treinar: 'Practise', treinoSub: 'Practice doesn’t count for the story or the points.', treino: 'End of practice', denovo: 'Practise again', valendo: 'Now for real', passadaT: 'Practice pass',
    passada: ['First pass', 'Second pass', 'Last pass'], galope: 'Gallop', golpe: 'Strike', abaixe: 'Duck!', mira: 'Aim for the centre',
    perf: 'On the beat.', bom: 'Almost.', fora: 'Off the beat.',
    forte: 'Dead centre. The whole figure rocks.', centro: 'Centre. The figure only rocks.', gira: 'Off centre. It spins.', desviou: 'The sandbag sails over me.', saco: 'The sandbag catches my neck.', erro: 'The lance slides past the shield.', nada: 'I ride past without striking.',
    fim: 'End of the quintain', pts: 'Points', seguir: 'Continue', res: { forte: 'centre, with strength', centro: 'centre', desviou: 'spun, I ducked', saco: 'spun, took the sandbag', erro: 'missed the shield', nada: 'didn’t strike' },
  },
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const B = 'assets/images/cav/';
// onde está o boneco pintado na foto (frações da imagem 1672x940) e o escudo dentro do recorte
const FOTO = { w: 1672, h: 940, cx: .4982, topo: .2713, base: .4436 };   // o boneco pintado foi apagado da foto; o recorte entra no lugar dele
const BON = { w: 687, h: 1100, cabX: .512, esc: { x: .129, y: .189, r: .107 } };
const LANCA = { w: 505, h: 1100, tipX: 2, tipY: 1 };
const PTS = { forte: 25 / 3, centro: 5.5, desviou: 3, saco: 1, erro: 0, nada: 0 };

function quintana(root, o) {
  const T = TX[o.lang] || TX.en, A = o.A, bot = !!window.__ARENA_BOT, erroBot = window.__ARENA_BOT_ERRO || 0;
  return new Promise((resolve) => {
    root.innerHTML = `<canvas class="qt-cv"></canvas>
      <div class="qt-vid"><video playsinline muted preload="auto" src="${o.video || ''}"></video></div>
      <p class="cv-pop qt-pop"></p><p class="qt-pass"></p>
      <div class="qt-bts"><button class="qt-gal"><i class="cv-anel"></i><b>${T.galope}</b></button><button class="qt-gol"><b>${T.golpe}</b></button></div>
      <div class="cv-tela on"><h2>${T.titulo}</h2><p class="cv-sub">${T.sub}</p><ul>${T.regras.map((r) => `<li>${r}</li>`).join('')}</ul><p class="cv-k">${T.teclas}</p><div class="cv-tbts"><button class="ghost cv-treino">${T.treinar}</button><button class="cta cv-go">${T.montar}</button></div><p class="cv-k cv-tsub">${T.treinoSub}</p></div>`;
    const $ = (s) => root.querySelector(s);
    const cv = $('.qt-cv'), cx = cv.getContext('2d'), pop = $('.qt-pop'), pass = $('.qt-pass'), bt = $('.qt-gal'), btTxt = bt.querySelector('b'), btG = $('.qt-gol'), anel = bt.querySelector('.cv-anel'), vbox = $('.qt-vid'), vid = vbox.querySelector('video');
    const IM = {}; const carrega = (k, src) => { const i = new Image(); i.src = src; IM[k] = i; };
    carrega('pov', o.img || B + 'quintana-pov.jpg'); carrega('bon', B + 'quintana-boneco.webp'); carrega('lanca', B + 'quintana-lanca.webp');
    const sfx = (n, v = .6) => { try { A && A.sfx && A.sfx(n, v); } catch (e) {} };
    let W = 0, H = 0, DPR = 1, vivo = true, rodando = false, tAnt = 0;
    const rs = () => { DPR = Math.min(devicePixelRatio || 1, 2); W = root.clientWidth; H = root.clientHeight; cv.width = W * DPR; cv.height = H * DPR; cx.setTransform(DPR, 0, 0, DPR, 0, 0); };
    addEventListener('resize', rs); rs();
    const aviso = (t, cls) => { pop.textContent = t; pop.className = 'cv-pop qt-pop'; void pop.offsetWidth; pop.className = 'cv-pop qt-pop on ' + (cls || ''); };
    const espera = (ms) => new Promise((r) => setTimeout(r, bot ? Math.min(ms, 40) : ms));
    // ---------- estado de cena
    let Z = 1, Zalvo = 1, mira = { x: 0, y: 0 }, miraV = { x: 0, y: 0 }, tSway = 0, bpm = o.bpm || 100, fase = 'parado', balanco = 0, tremor = 0;
    let anelGolpe = null;   // { t0, dur }
    let toque = null, golpe = null, abaixou = null;
    const res = [];
    // geometria: a foto em "cover", com zoom em direção ao boneco
    const foto = () => {
      const s0 = Math.max(W / FOTO.w, H / FOTO.h), s = s0 * Z;
      const fx = FOTO.cx * FOTO.w, fy = (FOTO.topo + .06) * FOTO.h;            // ponto de fuga: o peito do boneco
      const ancX = W / 2, ancY = H * (Z > 1.5 ? .42 : .45);
      return { s, x0: ancX - fx * s, y0: ancY - fy * s };
    };
    const boneco = () => {
      const f = foto(), k = (FOTO.base - FOTO.topo) * FOTO.h * f.s / BON.h;
      const cabX = f.x0 + FOTO.cx * FOTO.w * f.s, topo = f.y0 + FOTO.topo * FOTO.h * f.s;
      const left = cabX - BON.cabX * BON.w * k;
      return { left, topo, k, esc: { x: left + BON.esc.x * BON.w * k, y: topo + BON.esc.y * BON.h * k, r: BON.esc.r * BON.w * k } };
    };
    const ponta = () => {   // onde está a ponta da lança agora: mira do jogador + balanço do galope e do coração
      const amp = (6 + Math.max(0, bpm - 80) * .32) * (fase === 'mira' ? 1 : .6) * Math.min(W, H) / 700;
      const sx = Math.sin(tSway * 2 * Math.PI / .52) * amp + Math.sin(tSway * 4.3) * amp * .5 + (Math.random() - .5) * tremor;
      const sy = Math.cos(tSway * 2 * Math.PI / .52) * amp * .7 + Math.sin(tSway * 3.1) * amp * .4;
      return { x: W / 2 + mira.x + sx, y: H * .42 + mira.y + sy };
    };
    // ---------- entradas
    // dois botões: o da esquerda é o cavalo (galope, abaixar); o da direita é a lança (golpe)
    let ultGalope = 0, golpeArmado = 0;
    const apertaCavalo = () => {
      if (!rodando) return; const now = performance.now();
      if (fase === 'corrida' && toque) { ultGalope = now; toque(now); }
      else if (fase === 'abaixar' && abaixou) abaixou(now);
    };
    const apertaLanca = () => {
      if (!rodando) return; const now = performance.now();
      if (fase === 'mira' && golpe && now >= golpeArmado && now - ultGalope > 350) golpe(now);
    };
    const kd = (e) => {
      if (!vivo) return;
      if (!rodando) { if ((e.key === 'Enter' || e.key === ' ') && $('.cv-tela.on .cv-go')) { e.preventDefault(); comeca(false); } return; }
      if (e.key === ' ') { e.preventDefault(); if (!e.repeat) apertaCavalo(); }
      else if (e.key === 'Enter' || e.key === 'f' || e.key === 'F' || e.key === 'g' || e.key === 'G') { e.preventDefault(); if (!e.repeat) apertaLanca(); }
      else if (e.key === 'ArrowDown' || e.key === 's') { e.preventDefault(); if (fase === 'abaixar' && abaixou) abaixou(performance.now()); else miraV.y = 1; }
      else if (e.key === 'ArrowUp' || e.key === 'w') { e.preventDefault(); miraV.y = -1; }
      else if (e.key === 'ArrowLeft' || e.key === 'a') { e.preventDefault(); miraV.x = -1; }
      else if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); miraV.x = 1; }
    };
    const ku = (e) => { if (['ArrowLeft', 'ArrowRight', 'a', 'd'].includes(e.key)) miraV.x = 0; if (['ArrowUp', 'ArrowDown', 'w', 's'].includes(e.key)) miraV.y = 0; };
    addEventListener('keydown', kd, true); addEventListener('keyup', ku, true);
    bt.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); apertaCavalo(); });
    btG.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); apertaLanca(); });
    // arrastar em qualquer lugar mexe a mira (movimento relativo, como segurar a lança)
    let arr = null;
    cv.addEventListener('pointerdown', (e) => { arr = { x: e.clientX, y: e.clientY }; });
    addEventListener('pointermove', (e) => { if (!arr || fase !== 'mira') return; mira.x += (e.clientX - arr.x) * 1.1; mira.y += (e.clientY - arr.y) * 1.1; arr = { x: e.clientX, y: e.clientY }; });
    addEventListener('pointerup', () => { arr = null; });
    // ---------- uma passada
    async function passada(i, tr) {
      Z = 1; Zalvo = 1; mira = { x: (Math.random() - .5) * W * .12, y: (Math.random() - .5) * H * .08 }; balanco = 0; tremor = 0;
      pass.textContent = tr ? T.passadaT : T.passada[i]; pass.classList.remove('on'); void pass.offsetWidth; pass.classList.add('on');
      await espera(1300);
      // 1 · corrida: quatro compassos
      fase = 'corrida'; btTxt.textContent = T.galope; bt.classList.add('on'); btG.classList.remove('on');
      const beat = 520; let forca = 0; const t0 = performance.now() + 400;
      await new Promise((ok) => {
        let n = 0, tocado = -1;
        toque = (now) => {
          const k = Math.round((now - t0) / beat); if (k < 0 || k > 3 || k === tocado) return; tocado = k;
          const dd = Math.abs(now - (t0 + k * beat));
          if (dd <= 60) { forca += .25; aviso(T.perf, 'ok'); anel.classList.add('ok'); setTimeout(() => anel.classList.remove('ok'), 150); } else if (dd <= 130) { forca += .15; aviso(T.bom); } else { aviso(T.fora, 'mal'); bpm += 3; }
        };
        const tick = () => {
          const now = performance.now(), pa = ((now - t0) % beat + beat) % beat / beat;
          anel.style.transform = `scale(${1.9 - .9 * pa})`; anel.style.opacity = .3 + .7 * pa;
          Zalvo = 1 + clamp((now - t0) / (beat * 4), 0, 1) * 1.3;
          if (bot && Math.abs(((now - t0) % beat) - 0) < 22 && Math.random() > erroBot) toque(now);
          if (now > t0 + beat * 3.5) { toque = null; return ok(); }
          requestAnimationFrame(tick);
        };
        tick(); void n;
      });
      forca = clamp(forca, 0, 1);
      // 2 · mira e 3 · golpe
      fase = 'mira'; bt.classList.remove('on'); btG.classList.add('on'); golpeArmado = performance.now() + 350; aviso(T.mira);
      const durMira = bot ? 900 : 2600, durAnel = bot ? 500 : 950, tm0 = performance.now();
      let resultado = null;
      await new Promise((ok) => {
        golpe = (now) => {
          if (resultado) return;
          const p = ponta(), e = boneco().esc, dist = Math.hypot(p.x - e.x, p.y - e.y) / e.r;
          const fecha = tm0 + durMira, dt = now - fecha, tempoBom = anelGolpe && Math.abs(dt) <= 160, cedo = dt < -300;
          const forcaEf = forca * (tempoBom ? 1 : cedo ? .4 : .7);
          if (dist <= .5) resultado = forcaEf >= .65 ? 'forte' : 'centro';
          else if (dist <= 1.05) resultado = 'gira';
          else resultado = 'erro';
          golpe = null; ok();
        };
        const tick = () => {
          const now = performance.now(), p = (now - tm0) / durMira;
          Zalvo = 2.3 + clamp(p, 0, 1) * 2.4;
          if (now > tm0 + durMira - durAnel && !anelGolpe) anelGolpe = { t0: tm0 + durMira - durAnel, dur: durAnel };
          if (bot) { const pt = ponta(), e = boneco().esc, ex = Math.random() < erroBot ? 1.4 : 0; mira.x += ((e.x + ex * e.r) - pt.x) * .2; mira.y += (e.y - pt.y) * .2; if (now >= tm0 + durMira - 20) golpe(now); }
          if (now > tm0 + durMira + 280) { if (!resultado) { resultado = 'nada'; golpe = null; ok(); } return; }
          if (!resultado) requestAnimationFrame(tick);
        };
        tick();
      });
      anelGolpe = null; bt.classList.remove('on'); btG.classList.remove('on');
      // o desfecho
      if (resultado === 'forte' || resultado === 'centro') {
        fase = 'impacto'; sfx('quintana-escudo', .85); balanco = resultado === 'forte' ? 1 : .45; tremor = 0;
        aviso(T[resultado], 'ok'); if (resultado === 'forte') setTimeout(() => sfx('multidao-azarao', .5), 300);
        await espera(1700);
      } else if (resultado === 'gira') {
        fase = 'gira'; aviso(T.gira, 'mal'); sfx('quintana-gira', .85);
        vbox.classList.add('on'); try { vid.currentTime = 0; } catch (e) {} vid.play().catch(() => {});
        await espera(1050);
        fase = 'abaixar'; btTxt.textContent = T.abaixe; bt.classList.add('on', 'urgente');
        const ab = await new Promise((ok) => { const t = setTimeout(() => { abaixou = null; ok(false); }, bot ? 30 : 650); abaixou = () => { clearTimeout(t); abaixou = null; ok(true); }; if (bot && Math.random() > erroBot) abaixou(); });
        bt.classList.remove('on', 'urgente');
        if (ab) { resultado = 'desviou'; aviso(T.desviou, 'ok'); setTimeout(() => sfx('multidao-azarao', .35), 200); }
        else { resultado = 'saco'; sfx('saco-nuca', .9); setTimeout(() => sfx('saco-nuca-grunt', .8), 120); setTimeout(() => sfx('multidao-ri', .55), 450); bpm += 15; root.classList.add('qt-pancada'); setTimeout(() => root.classList.remove('qt-pancada'), 700); aviso(T.saco, 'mal'); }
        await espera(1300); vbox.classList.remove('on');
      } else if (resultado === 'erro') { aviso(T.erro, 'mal'); setTimeout(() => sfx('multidao-ri', .5), 200); await espera(1500); }
      else { aviso(T.nada, 'mal'); await espera(1300); }
      res.push(resultado); fase = 'parado';
    }
    const comeca = async (tr) => {
      if (rodando) return; $('.cv-tela').classList.remove('on', 'fim'); rodando = true; res.length = 0; bpm = o.bpm || 100;
      if (tr === true) {   // treino: uma passada, não conta
        await passada(0, true); rodando = false;
        const r0 = res[0]; res.length = 0;
        const tela = $('.cv-tela'); tela.innerHTML = `<h2>${T.treino}</h2><p class="cv-sub">${T.res[r0]}</p><div class="cv-tbts"><button class="ghost cv-treino">${T.denovo}</button><button class="cta cv-go">${T.valendo}</button></div><p class="cv-k cv-tsub">${T.treinoSub}</p>`;
        tela.classList.add('on'); ligaIntro(); if (bot) setTimeout(() => comeca(false), 60); return;
      }
      for (let i = 0; i < 3; i++) await passada(i);
      rodando = false;
      const pontos = Math.round(clamp(res.reduce((a, r) => a + PTS[r], 0), 0, 25) * 10) / 10;
      const tela = $('.cv-tela'); tela.innerHTML = `<h2>${T.fim}</h2><table>${res.map((r, i) => `<tr><td>${T.passada[i]}</td><td>${T.res[r]}</td></tr>`).join('')}<tr class="tot"><td>${T.pts}</td><td>${pontos} / 25</td></tr></table><button class="cta cv-seg">${T.seguir}</button>`;
      tela.classList.add('on', 'fim');
      const sai = () => { if (!vivo) return; vivo = false; removeEventListener('keydown', kd, true); removeEventListener('keyup', ku, true); removeEventListener('resize', rs); resolve({ passadas: res, pontos, forte: res.filter((r) => r === 'forte').length, centros: res.filter((r) => r === 'forte' || r === 'centro').length, saco: res.filter((r) => r === 'saco').length, desvios: res.filter((r) => r === 'desviou').length, bpm: Math.round(clamp(bpm, 70, 170)) }); };
      tela.querySelector('.cv-seg').onclick = sai; if (bot) setTimeout(sai, 60);
    };
    const ligaIntro = () => { $('.cv-go').onclick = () => comeca(false); const t = $('.cv-treino'); if (t) t.onclick = () => comeca(true); };
    ligaIntro();
    // ---------- desenho
    const desenha = (now) => {
      if (!vivo) return;
      const dt = Math.min(.05, (now - tAnt) / 1000); tAnt = now; tSway += dt;
      Z += (Zalvo - Z) * Math.min(1, 4 * dt);
      if (fase === 'mira') { mira.x += miraV.x * 260 * dt; mira.y += miraV.y * 260 * dt; }
      mira.x = clamp(mira.x, -W * .45, W * .45); mira.y = clamp(mira.y, -H * .35, H * .35);
      cx.clearRect(0, 0, W, H);
      const bob = rodando && (fase === 'corrida' || fase === 'mira') ? Math.sin(tSway * 2 * Math.PI / .52) * 5 : 0;
      cx.save(); cx.translate(0, bob);
      const f = foto(); if (IM.pov.complete && IM.pov.naturalWidth) cx.drawImage(IM.pov, f.x0, f.y0, FOTO.w * f.s, FOTO.h * f.s);
      // o boneco recortado por cima do pintado, balançando
      const b = boneco();
      if (IM.bon.complete && IM.bon.naturalWidth) {
        balanco *= Math.pow(.25, dt); const ang = Math.sin(now / 90) * balanco * .12;
        cx.save(); cx.translate(b.left + BON.w * b.k * .5, b.topo + BON.h * b.k); cx.rotate(ang); cx.drawImage(IM.bon, -BON.w * b.k * .5, -BON.h * b.k, BON.w * b.k, BON.h * b.k); cx.restore();
      }
      // o anel que fecha sobre o escudo
      if (anelGolpe) { const p = clamp((now - anelGolpe.t0) / anelGolpe.dur, 0, 1.2), r = b.esc.r * (2.6 - 1.6 * Math.min(1, p)); cx.strokeStyle = `rgba(242,220,192,${p >= 1 ? 1 : .5 + .5 * p})`; cx.lineWidth = p >= 1 ? 4 : 2.5; cx.beginPath(); cx.arc(b.esc.x, b.esc.y, r, 0, 6.283); cx.stroke(); if (p >= 1) { cx.shadowColor = '#ffe7a8'; cx.shadowBlur = 16; cx.stroke(); cx.shadowBlur = 0; } }
      cx.restore();
      // a lança: a ponta vai onde está a mira
      if (rodando && IM.lanca.complete && IM.lanca.naturalWidth && fase !== 'gira' && fase !== 'abaixar') {
        const p = ponta(), s = H * .95 / LANCA.h;
        cx.save(); cx.translate(p.x, p.y); cx.rotate(-.05 + mira.x / W * .15); cx.drawImage(IM.lanca, -LANCA.tipX * s, -LANCA.tipY * s, LANCA.w * s, LANCA.h * s); cx.restore();
        if (fase === 'mira') { cx.fillStyle = 'rgba(255,240,210,.9)'; cx.beginPath(); cx.arc(p.x, p.y, 3, 0, 6.283); cx.fill(); }
      }
      requestAnimationFrame(desenha);
    };
    requestAnimationFrame((t) => { tAnt = t; desenha(t); });
    if (bot) setTimeout(() => comeca(window.__CAV_TREINO ? true : false), 50);
  });
}
window.JOGOS4 = Object.assign(window.JOGOS4 || {}, { quintana });
})();
