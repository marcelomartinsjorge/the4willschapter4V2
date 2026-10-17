/* ==========================================================================
   Capítulo IV · A PROVA DOS ESCRIBAS
   Quatro perguntas, respondidas por escrito (o jogador digita).
   Aceita português e inglês em qualquer idioma do livro.
   LEMBRAR · abre a mesa da Mestra Hadasa, a tarde da aula no Cap. II, como lembrança.
             Três lembranças na prova inteira. Cada uma dura uma vela curta.
             Quem leu aquele item no Cap. II lembra por mais tempo.
   Resposta escrita não se apaga.
   ========================================================================== */
(() => {
'use strict';

const TX = {
  pt: {
    titulo: 'A prova dos escribas', perg: (i, n) => `Pergunta ${i} de ${n}`,
    escrever: 'Escrever', semVolta: 'A tinta não sai. Escrever assim?', sim: 'Escrever', nao: 'Ainda não',
    lembrar: 'Lembrar', lembrarK: (n) => (n === 1 ? 'resta 1 lembrança' : n ? `restam ${n} lembranças` : 'nenhuma lembrança'),
    ph: 'escreva a resposta', vazio: 'O pergaminho fica em branco.',
    mesa: 'A mesa da Mestra Hadasa', mesaSub: 'A tarde da aula, no alto da torre leste. Escolha o que lembrar.', voltar: 'Voltar à prova',
    apaga: 'A lembrança se apaga.', fim: 'A vela da prova chega ao fim.', ajuda: 'Digite e aperte Enter. Português ou inglês.',
    leuAntes: 'você leu isto na aula',
  },
  en: {
    titulo: 'The scribes’ trial', perg: (i, n) => `Question ${i} of ${n}`,
    escrever: 'Write', semVolta: 'Ink doesn’t come off. Write it like this?', sim: 'Write', nao: 'Not yet',
    lembrar: 'Remember', lembrarK: (n) => (n === 1 ? '1 memory left' : n ? `${n} memories left` : 'no memories left'),
    ph: 'write the answer', vazio: 'The parchment stays blank.',
    mesa: 'Mistress Hadasa’s desk', mesaSub: 'The afternoon of the lesson, at the top of the east tower. Choose what to remember.', voltar: 'Back to the trial',
    apaga: 'The memory fades.', fim: 'The trial candle burns out.', ajuda: 'Type and press Enter. English or Portuguese.',
    leuAntes: 'you read this in the lesson',
  },
};

// tira acento, caixa e pontuação: "Acima do corte!" -> "acima do corte"
const norm = (s) => ' ' + String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
const tem = (s, lista) => lista.some((w) => s.includes(' ' + w + ' '));

// as respostas certas, nas duas línguas
const CERTA = {
  balanca: (s) => tem(s, ['2', 'duas', 'dois', 'two']) && !tem(s, ['1', '3', '4', '5', '6', '9', 'uma', 'um', 'tres', 'quatro', 'one', 'three', 'four']),
  ponte: (s) => tem(s, ['3', 'tres', 'three']) && !tem(s, ['2', '4', 'dois', 'duas', 'quatro', 'two', 'four']),
  garrote: (s) => /\b(acima|above|upstream|higher)\b/.test(s) || /(entre a ferida e o coracao|between the wound and the heart|(perto|proximo|lado) do coracao|(closer|nearer|toward|towards) (to )?the heart|mais alto|mais perto do coracao)/.test(s)
    ? !/\b(abaixo|below|beneath|under)\b/.test(s) && !/(em cima d|on the cut|on top|sobre o corte|no corte|na ferida|in the wound)/.test(s) : false,
  corwin: (s) => tem(s, ['0', 'zero', 'nenhum', 'nenhuma', 'none', 'no', 'nao', 'nada', 'nunca', 'never', 'ninguem', 'nobody']) || /(nem uma|nem um|not one|not a single|no one)/.test(s)
    ? !/\b([1-9][0-9]*|dois|duas|tres|two|three|four|quatro)\b/.test(s) : false,
};

function escrita(root, o) {
  const T = TX[o.lang] || TX.en, A = o.A, bot = !!window.__ARENA_BOT, tr = (x) => (x && typeof x === 'object' ? (x[o.lang] || x.en || x.pt) : x);
  const PERG = o.perguntas, MEM = o.memorias;
  return new Promise((resolve) => {
    root.innerHTML = `<div class="es-bg" style="background-image:url('${o.img}')"></div>
      <div class="es-vela"><i></i></div>
      <div class="es-folha">
        <p class="es-cab"><span class="es-tit">${T.titulo}</span><span class="es-n"></span></p>
        <p class="es-mat"></p><p class="es-q"></p>
        <div class="es-linha"><input class="es-in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="80" placeholder="${T.ph}"></div>
        <p class="es-ajuda">${T.ajuda}</p>
        <div class="es-bts"><button class="es-lembrar"><span class="es-velas"></span>${T.lembrar}</button><button class="es-ok cta">${T.escrever}</button></div>
        <div class="es-confirma"><p>${T.semVolta}</p><button class="es-sim cta">${T.sim}</button><button class="es-nao ghost">${T.nao}</button></div>
        <ol class="es-feitas"></ol>
      </div>
      <div class="es-mem">
        <div class="es-mem-bg" style="background-image:url('${o.mesa}')"></div>
        <div class="es-mem-in">
          <h3>${T.mesa}</h3><p class="es-mem-sub">${T.mesaSub}</p>
          <div class="es-itens"></div>
          <div class="es-ler"><div class="es-ler-vela"><i></i></div><img class="es-ler-img" alt=""><p class="es-ler-t"></p></div>
          <button class="es-voltar ghost">${T.voltar}</button>
        </div>
      </div>`;
    const $ = (s) => root.querySelector(s);
    const inp = $('.es-in'), folha = $('.es-folha'), mem = $('.es-mem'), ler = $('.es-ler');
    let i = 0, lembrancas = bot ? 0 : 3, vivo = true, lendo = false;
    const res = { certas: {}, respostas: {}, lembrou: [], acertos: 0, total: PERG.length, tempoEsgotou: false, bpm: o.bpm || 100 };
    // a vela da prova inteira
    const DUR = bot ? 4000 : (o.segundos || 170) * 1000; let gasto = 0, t0 = performance.now(), ritmo = 1;
    const velaEl = $('.es-vela i');
    const relogio = () => {
      if (!vivo) return; const now = performance.now(); gasto += (now - t0) * ritmo; t0 = now;
      velaEl.style.transform = `scaleX(${Math.max(0, 1 - gasto / DUR)})`;
      if (gasto >= DUR) { res.tempoEsgotou = true; aviso(T.fim); fecha(); return; }
      requestAnimationFrame(relogio);
    };
    const aviso = (t) => { const p = document.createElement('p'); p.className = 'es-aviso'; p.textContent = t; root.appendChild(p); setTimeout(() => p.remove(), 2600); };
    const velas = () => { $('.es-velas').innerHTML = '<i></i>'.repeat(lembrancas) + '<i class="off"></i>'.repeat(3 - Math.min(3, lembrancas)); $('.es-lembrar').disabled = !lembrancas; $('.es-lembrar').title = T.lembrarK(lembrancas); };
    const mostra = () => {
      const q = PERG[i]; $('.es-n').textContent = T.perg(i + 1, PERG.length); $('.es-mat').textContent = tr(q.materia); $('.es-q').textContent = tr(q.q);
      inp.value = ''; folha.classList.remove('confirmando'); folha.classList.remove('entra'); void folha.offsetWidth; folha.classList.add('entra');
      if (!bot) setTimeout(() => inp.focus(), 60);
      if (bot) setTimeout(() => { inp.value = o.lang === 'en' ? q.botEn : q.botPt; grava(); }, 120);
    };
    const pede = () => { if (!vivo || lendo) return; if (!inp.value.trim()) { inp.classList.remove('treme'); void inp.offsetWidth; inp.classList.add('treme'); return; } folha.classList.add('confirmando'); $('.es-sim').focus(); };
    const grava = () => {
      const q = PERG[i], v = inp.value.trim(); const ok = !!CERTA[q.id](norm(v));
      res.respostas[q.id] = v; res.certas[q.id] = ok; if (ok) res.acertos++;
      try { A && A.once && A.once('assets/audio/sfx/pena-papel.mp3', .7); } catch (e) {}
      const li = document.createElement('li'); li.innerHTML = `<span>${tr(q.materia)}</span><b></b>`; li.querySelector('b').textContent = v || '—'; $('.es-feitas').appendChild(li);
      i++; if (i >= PERG.length) return fecha(); mostra();
    };
    const fecha = () => {
      if (!vivo) return; vivo = false;
      PERG.forEach((q) => { if (!(q.id in res.respostas)) { res.respostas[q.id] = ''; res.certas[q.id] = false; } });
      res.lembrancas = 3 - lembrancas;
      setTimeout(() => { removeEventListener('keydown', kd, true); resolve(res); }, bot ? 50 : 900);
    };
    // ---------- a lembrança
    const itens = $('.es-itens');
    MEM.forEach((m) => { const b = document.createElement('button'); b.className = 'es-item'; b.dataset.id = m.id; b.innerHTML = `<i>${m.ico}</i><span>${tr(m.nome)}</span>${m.leu ? `<small>${T.leuAntes}</small>` : ''}`; b.onclick = () => abreItem(m); itens.appendChild(b); });
    const abreMesa = () => { if (!lembrancas || !vivo) return; mem.classList.add('on'); mem.classList.remove('lendo'); ritmo = .6; };
    const fechaMesa = () => { mem.classList.remove('on', 'lendo'); lendo = false; ritmo = 1; if (vivo) setTimeout(() => inp.focus(), 60); };
    const abreItem = (m) => {
      if (lendo || !lembrancas) return; lendo = true; lembrancas--; velas(); res.lembrou.push(m.id);
      mem.classList.add('lendo'); $('.es-ler-t').textContent = tr(m.texto);
      const im = $('.es-ler-img'); if (m.img) { im.src = m.img; im.style.display = 'block'; } else im.style.display = 'none';
      mem.classList.toggle('quente', !!m.quente); if (m.quente) res.bpm = Math.min(170, res.bpm + 8);
      const ms = bot ? 100 : (m.leu ? 15000 : 9500), vl = $('.es-ler-vela i');
      vl.style.transition = 'none'; vl.style.transform = 'scaleX(1)'; void vl.offsetWidth; vl.style.transition = `transform ${ms}ms linear`; vl.style.transform = 'scaleX(0)';
      setTimeout(() => { mem.classList.add('apaga'); setTimeout(() => { mem.classList.remove('apaga', 'quente'); aviso(T.apaga); fechaMesa(); }, 900); }, ms);
    };
    $('.es-lembrar').onclick = abreMesa; $('.es-voltar').onclick = () => { if (!lendo) fechaMesa(); };
    $('.es-ok').onclick = pede; $('.es-sim').onclick = grava; $('.es-nao').onclick = () => { folha.classList.remove('confirmando'); inp.focus(); };
    const kd = (e) => {
      if (!vivo) return;
      if (e.key === 'Escape' && mem.classList.contains('on') && !lendo) { e.preventDefault(); fechaMesa(); return; }
      if (e.key === 'Enter') { e.preventDefault(); if (mem.classList.contains('on')) return; if (folha.classList.contains('confirmando')) grava(); else pede(); }
    };
    addEventListener('keydown', kd, true);
    inp.addEventListener('input', () => folha.classList.remove('confirmando'));
    velas(); mostra(); requestAnimationFrame(relogio);
  });
}

window.JOGOS4 = Object.assign(window.JOGOS4 || {}, { escrita });
window.ESCRITA_CERTA = CERTA; window.ESCRITA_NORM = norm;   // para os testes
})();
