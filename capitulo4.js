/* ==========================================================================
   AS QUATRO VONTADES · CAPÍTULO IV · LAUS — O AZARÃO (roteiro interativo)
   --------------------------------------------------------------------------
   Cada texto vem em par: T('português', 'english'). O português é a chave;
   o inglês é registrado em window.LIVRO_EN. Mudou o PT, mude o EN na mesma linha.
   // M = texto do Marcelo (revisado e aprovado)   // N = texto novo (aprovado no roteiro)
   REGRA DE GÊNERO: até o elmo voar (c10), a narração de Laura não usa nenhum
   adjetivo que marque gênero. A primeira palavra no feminino é "encharcada".
   CALENDÁRIO: Dia 1 arqueria + prova dos escribas · Dia 2 cavalgada · Dia 3 quintana,
   soma ao meio-dia, semifinais à tarde · Dia 4 a final. Osmund: 21 dias antes (o dia dos
   mantos, 9 dias depois do Cap. II). Vigília pedida 7 dias antes, começa na véspera do Dia 1.
   Estado lido dos capítulos anteriores: window.AQV_ANTES (aqv_estado.cap2 / cap3).
   ========================================================================== */
window.LIVRO_EN = window.LIVRO_EN || {};
const T = (pt, en) => { if (en != null) window.LIVRO_EN[pt] = en; return pt; };
const se = (cond, t) => ({ se: cond, t });
const antes = () => window.AQV_ANTES || {};
const c2 = () => antes().cap2 || {};
const c3 = () => antes().cap3 || {};
const J2 = () => c2().justine || {};
const simonSabe = () => c2().simon === 'verdade';
const temLenco = () => J2().lenco === 'guardar';
const desconfia = () => !!J2().desconfia;
const promessa = () => c2().promessa || 'calar';
const comGuarda = () => promessa() === 'recusar' || !!c2().visto;
const assistiu = (st) => st.escolhas.assistir === 'assistir';
const simonVem = (st) => simonSabe() && st.escolhas.simonTenda !== 'mandar';
const lenco = (st) => st.escolhas.lenco4 || null;
const justineDePe = (st) => lenco(st) === 'braco' || desconfia();
// o coração manda na voz: com o peito disparado, Laus só consegue a resposta trêmula
const fJ = (st) => (st.arena && st.arena.joseph) || {};
const disparado = {
  placar: (st) => (st.bpm || 0) >= 128 || !!(st.arqueria && st.arqueria.total < 12),
  joseph: (st) => (fJ(st).golpesSofridos || 0) >= 2 || (fJ(st).bpmFinal || 0) >= 140,
  // de manhã o coração já baixou (respirar, amolar): o que dispara é a mão que não acertou a pedra, ou a voz que já escorregou duas vezes
  escudeiro: (st) => (st.bpm || 0) >= 112 || !!(st.amolar && st.amolar.tentativas >= 3) || (st.deslizes || 0) >= 2,
};
// o título: venceu Markus sem tomar um único golpe
const lamina = (st) => !!(st.arena && st.arena.markus && st.arena.markus.golpesSofridos === 0);
const IMG = (n) => 'assets/images/' + n + '.jpg';
const VID = (n) => 'assets/video/' + n + '.mp4';

window.LIVRO_UI = {
  pt: { parte: 'Parte', prox: 'Próxima', fim: 'Encerrar o capítulo', voltar: '← Voltar', ouvir: 'Ouvir', cena: '▶ Ver a cena', oque: 'O que Laus faz?', decida: 'Decida', decidir: 'Decidir', escolheu: 'Você escolheu:', resp: 'Responder a', silencio: 'não responder', silencioR: 'Silêncio', momento: 'Momento de jogo',
    mg: { passos: 'Contar os passos', arena: 'Ao círculo', tenda: 'Olhar o baú', amolar: 'Amolar a espada', fenda: 'Olhar pela fenda', arqueria: 'Pegar o arco', respirar: 'Respirar' },
    dica: { passos: 'Treze pegadas até o centro. Toque no compasso do passo.', arena: (st) => (st.arena && st.arena.joseph ? 'Markus. Leia, aguente, e conte.' : 'Joseph. Um golpe limpo decide.'), tenda: 'Três coisas em cima do baú. Cada uma traz uma lembrança.', amolar: 'A pedra vai e volta. O coração acompanha.', fenda: 'O mundo inteiro cabe numa fresta. Só dá tempo de um olhar.', arqueria: 'Três flechas. O coração bate dentro do elmo.', respirar: 'O coração não deixa dormir.' },
    coverEye: 'As Quatro Vontades · Livro I · Capítulo IV', coverLede: 'Quatro dias de elmo fechado. Dois duelos. Treze passos.', coverGo: 'Entrar na arena', coverCont: 'Continuar de onde parei', coverRestart: 'Começar do início', coverHint: 'Use fones. Avance com o botão, com a seta → ou deslizando para o lado.',
    confirm: 'Recomeçar o capítulo? Suas escolhas serão apagadas.', capN: 'Capítulo IV', fimCap: 'Fim do Capítulo IV', ficou: 'O que ficou na areia', suas: 'O que você escolheu', reler: 'Reler e escolher diferente', mesmo: (p) => `${p}% dos leitores fizeram o mesmo`,
    pontos: 'Pontuação do capítulo', jornada: 'Jornada (Capítulos I a IV)', posicao: (p, n) => `${p}º de ${n} leitores`, semCap1: 'Jogue os capítulos anteriores neste navegador para somar a jornada.',
    pts: { arqueria: 'A arqueria', joseph: 'Joseph', markus: 'Markus', passos: 'Os passos', coracao: 'O coração', amolar: 'A pedra', antes: 'Capítulos I a III' },
  },
  en: { parte: 'Part', prox: 'Next', fim: 'Close the chapter', voltar: '← Back', ouvir: 'Listen', cena: '▶ Watch the scene', oque: 'What does Laus do?', decida: 'Decide', decidir: 'Decide', escolheu: 'You chose:', resp: 'Answer', silencio: 'say nothing', silencioR: 'Silence', momento: 'Moment of play',
    mg: { passos: 'Count the steps', arena: 'To the circle', tenda: 'Look at the chest', amolar: 'Whet the sword', fenda: 'Look through the slit', arqueria: 'Take up the bow', respirar: 'Breathe' },
    dica: { passos: 'Thirteen footprints to the centre. Tap in time with the step.', arena: (st) => (st.arena && st.arena.joseph ? 'Markus. Read, endure, and count.' : 'Joseph. One clean blow decides.'), tenda: 'Three things on the chest. Each one brings back a memory.', amolar: 'The stone goes and comes back. The heart follows.', fenda: 'The whole world fits in a slit. There’s only time for one look.', arqueria: 'Three arrows. The heart beats inside the helmet.', respirar: 'The heart won’t let me sleep.' },
    coverEye: 'The Four Wills · Book I · Chapter IV', coverLede: 'Four days behind a closed helm. Two duels. Thirteen steps.', coverGo: 'Enter the arena', coverCont: 'Continue where I left off', coverRestart: 'Start from the beginning', coverHint: 'Wear headphones. Move on with the button, the → key, or a swipe.',
    confirm: 'Restart the chapter? Your choices will be erased.', capN: 'Chapter IV', fimCap: 'End of Chapter IV', ficou: 'What stayed on the sand', suas: 'What you chose', reler: 'Read again and choose differently', mesmo: (p) => `${p}% of readers did the same`,
    pontos: 'Chapter score', jornada: 'Journey (Chapters I to IV)', posicao: (p, n) => `#${p} of ${n} readers`, semCap1: 'Play the earlier chapters in this browser to add up the journey.',
    pts: { arqueria: 'The archery', joseph: 'Joseph', markus: 'Markus', passos: 'The steps', coracao: 'The heart', amolar: 'The stone', antes: 'Chapters I to III' },
  },
};

window.LIVRO = {
  id: 'cap04',
  titulo: 'Laus',
  subtitulo: 'O Azarão',
  subtituloEn: 'The Underdog',
  tituloPag: 'Laus, o Azarão · As Quatro Vontades',
  tituloPagEn: 'Laus, the Underdog · The Four Wills',
  capa: 'assets/images/capa.jpg',
  proximo: { titulo: 'Capítulo V · em breve', tituloEn: 'Chapter V · coming soon', url: null },
  // o coração começa onde o Cap. II deixou o peso
  inicio: (st) => { const p = Number.isFinite(c2().peso) ? c2().peso : 1; st.peso = p; st.bpm = 92 + 6 * Math.min(p, 4); st.deslizes = 0; },

  paginas: [

    // ===================================================== I · A ARQUERIA
    { id: 'parte-I', parte: 'I', zona: 'arena', fundo: { img: IMG('capa'), kb: 'in', dim: .6, clima: 'poeira' },
      cartao: { num: 'I', nome: T('A Arqueria', 'The Archery'), epigrafe: T('O arqueiro solta a flecha entre duas batidas do próprio coração. Quem solta na batida, erra por um dedo.', 'The archer looses between two beats of his own heart. Loose on the beat, and you miss by a finger.'), fonte: T('Anthony, Mestre das Armas', 'Anthony, Master of Arms') } },

    { id: 'i01', zona: 'arena', fundo: { img: IMG('arena-tendas'), kb: 'in', foco: '60% 45%', clima: 'poeira' }, pulso: 1.4,
      narracao: 'assets/audio/narration/line1.mp3', narracaoLang: 'en', capitular: true,
      texto: [
        T('A arquibancada ainda está meio vazia quando o marechal chama a arqueria. Os maiores atiram primeiro. Atiram como falam, alto, sem esperar, e o público aplaude cada flecha que entra no palheiro, mesmo as que entram na beirada.', 'The stands are still half empty when the marshal calls the archery. The big ones shoot first. They shoot the way they talk, loud, without waiting, and the crowd applauds every arrow that hits the straw, even the ones at the edge.'), // N
        T('Quando chamam o meu nome, ninguém aplaude. Ninguém sabe quem é.', 'When they call my name, nobody applauds. Nobody knows who it is.'), // N
        T('Laus, da Casa Merrow. Até hoje, só duas pessoas tinham dito esse nome em voz alta.', 'Laus, of House Merrow. Until today, only two people had ever said that name out loud.'), // N
      ] },

    { id: 'i02', zona: 'arena', fundo: { img: IMG('arqueria-alvo'), kb: 'in', foco: '50% 48%', dim: .5 }, pulso: 2,
      texto: [
        T('O arco é emprestado e mais duro do que eu queria. O espaldar trava o braço um instante antes do fim da puxada, e eu ainda não sei se isso é defeito ou aviso.', 'The bow is borrowed and stiffer than I’d like. The backplate locks my arm an instant before the end of the draw, and I still don’t know if that’s a flaw or a warning.'), // N
        T('Dentro do elmo, eu ouço o meu coração como se ele estivesse do lado de fora.', 'Inside the helmet, I hear my heart as if it were on the outside.'), // N
        T('Puxo. Respiro. Espero o intervalo.', 'I draw. I breathe. I wait for the gap.'), // N
      ],
      minijogo: 'arqueria', arqueria: { img: IMG('arqueria-alvo'), arco: 'assets/images/arqueria-arco.webp' },
      depois: (st) => {
        const t = (st.arqueria && st.arqueria.total) || 0;
        return [t >= 28 ? T('A terceira entra tão perto da segunda que racha a haste. Por um instante, a arena inteira fica quieta, como quem conta de novo.', 'The third goes in so close to the second that it splits the shaft. For an instant, the whole arena goes quiet, like someone counting again.')
          : t >= 16 ? T('A última entra no círculo de dentro. Alguém na arquibancada ri, mas não de mim.', 'The last one goes into the inner ring. Someone in the stands laughs, but not at me.')
            : T('Uma flecha foge para a palha. As outras ficam. O placar não conta o que o coração fez com o meu braço.', 'One arrow wanders off into the straw. The others stay. The scoreboard doesn’t count what my heart did to my arm.'),
          T('Então, lá do alto, alguém grita:', 'Then, from high up, someone shouts:'), T('— Azarão!', '— Underdog!'),
          T('Outros repetem. No fim do dia, o nome já é meu.', 'Others take it up. By the end of the day, the name is mine.')];
      }, sonsDepois: [{ s: 'assets/audio/sfx/rugido.mp3', p: 2, v: .8 }] }, // N

    { id: 'i03', zona: 'arena', fundo: { img: IMG('arena-tendas'), kb: 'out', foco: '55% 50%', dim: .58 }, pulso: 2.4,
      texto: [
        T('O oficial do placar vem até mim com a tábua de cera e o estilete. Olha a fenda do elmo como quem procura um rosto num poço.', 'The scorekeeper comes over with his wax tablet and stylus. He looks into the slit of my helmet like someone searching for a face at the bottom of a well.'), // N
        T('— Seu nome, rapaz, para o placar.', '— Your name, lad, for the board.'), // N
        se((st) => disparado.placar(st), T('O coração está na garganta. A voz não vai sair inteira.', 'My heart is in my throat. My voice won’t come out whole.')), // N
      ],
      escolha: { id: 'deslize1', urgente: true, somJanela: 'assets/audio/sfx/manopla.mp3', janela: (st) => (st.bpm > 120 ? 3 : 4), padrao: 'tremida', opcoes: [
        { id: 'firme', se: (st) => !disparado.placar(st), riscavel: true, voz: 'nome-placar', vozAtraso: 200, txt: T('"Laus, da Casa Merrow."', '"Laus, of House Merrow."'),
          resultado: [T('Ele escreve devagar, letra por letra, e vai embora sem olhar para trás.', 'He writes slowly, letter by letter, and walks off without looking back.')] },
        { id: 'tremida', tremida: true, deslize: true, flag: 'placarDesconfia', voz: 'deslize-nome', vozAtraso: 200, txt: T('"La... Laus."', '"La... Laus."'),
          resultado: [T('Ele levanta os olhos da tábua. Espera.', 'He looks up from the tablet. Waits.'), T('— Laus — repito, mais devagar, de dentro do aço.', '— Laus — I repeat, slower, from inside the steel.'), T('Ele escreve. O coração não acredita que passou.', 'He writes. My heart can’t believe it got past him.')] },
      ] } }, // N

    { id: 'i03b', zona: 'silencio', fundo: { img: IMG('galeria'), kb: 'out', foco: '40% 50%', dim: .72 }, pulso: 1.4,
      texto: [
        T('À tarde, a prova dos escribas. Uma sala comprida embaixo da arquibancada, sem janela, mesas de tábua e um tinteiro para cada um. Lógica, estratégia, primeiros socorros. Os grandes entram rindo, como quem entra numa aula.', 'In the afternoon, the scribes’ trial. A long room beneath the stands, windowless, plank tables and an inkwell for each of us. Logic, strategy, first aid. The big ones come in laughing, like boys walking into a lesson.'), // N
        T('Para escrever, tenho que tirar as manoplas. As minhas mãos ficam em cima da mesa, à vista, menores que as de qualquer um ali. Escrevo com a letra torta, de propósito, longe da que a professora corrigiu a vida inteira.', 'To write, I have to take off my gauntlets. My hands lie on the table in plain view, smaller than anyone else’s in the room. I write in a crooked hand, on purpose, far from the one the teacher corrected my whole life.'), // N
        T('Uma ponte, trinta homens do outro lado, cem do nosso, e a correnteza contra. Um soldado com um corte fundo atrás da coxa, longe de qualquer curandeiro. Uma porta, dois guardas, um que só mente e outro que só diz a verdade.', 'A bridge, thirty men on the far side, a hundred on ours, and the current against us. A soldier with a deep cut behind the thigh, far from any healer. A door, two guards, one who only lies and one who only tells the truth.'), // N
        T('Sei as três. Passei a vida inteira aprendendo a governar um reino. Ninguém pensou que isso fosse servir para outra coisa.', 'I know all three. I’ve spent my whole life learning to govern a kingdom. Nobody thought it might be good for anything else.'), // N
        T('Na saída, o marechal recolhe os pergaminhos e olha para as minhas mãos, já de volta dentro do aço. Não diz nada.', 'On the way out, the marshal gathers the parchments and looks at my hands, already back inside the steel. He says nothing.'), // N
      ] },

    { id: 'i04', zona: 'tenda', fundo: { img: IMG('tres-dias'), kb: 'in', foco: '62% 50%', dim: .5, clima: 'velas' }, pulso: 1.2,
      texto: [
        T('À noite, os outros competidores bebem juntos em volta do fogo, sem elmo, rindo. Eu como pão de costas para eles e escuto. Aprendo quem ronca, quem bebe demais, quem treme a mão de manhã. Aprendo que Joseph treme.', 'At night, the other competitors drink together around the fire, helmets off, laughing. I eat bread with my back to them and listen. I learn who snores, who drinks too much, whose hand shakes in the morning. I learn that Joseph’s does.'), // N
        T('Contam a história de sempre: Corwin, o General-Rei que não chegava ao ombro de ninguém e venceu o Torneio sem que uma espada encostasse nele. O povo chamava ele de Lâmina. Os grandes riem. Dizem que hoje um baixinho daqueles não passava da quintana.', 'They tell the old story: Corwin, the General-King who didn’t reach anyone’s shoulder and won the Tournament without a single sword touching him. The people called him the Blade. The big ones laugh. They say a runt like that wouldn’t get past the quintain these days.'), // N
        T('Ninguém me chama para o fogo. Ninguém precisa de motivo para não chamar o Azarão.', 'Nobody calls me to the fire. Nobody needs a reason not to call the Underdog.'), // N
      ] },

    { id: 'i05', zona: 'tenda', fundo: { img: IMG('tenda-objetos'), kb: 'in', foco: '57% 42%', dim: .6, clima: 'velas' }, pulso: 1.6,
      texto: [
        T('Quando o fogo vira brasa, os outros vão dormindo um por um, onde caem. Só então volto para a tenda.', 'When the fire burns down to embers, the others drop off to sleep one by one, wherever they fall. Only then do I go back to the tent.'), // N
        T('Fecho a lona, viro de costas para a entrada e tiro o elmo no escuro. O ar da noite bate no meu rosto como água fria. Fico assim um tempo, de olhos fechados, com o elmo no colo, só respirando.', 'I close the flap, turn my back to the entrance and take off the helmet in the dark. The night air hits my face like cold water. I stay like that a while, eyes closed, the helmet in my lap, just breathing.'), // N
        T('O coração não sabe que é noite. Bate como se o arauto ainda estivesse chamando o meu nome.', 'My heart doesn’t know it’s night. It beats as if the herald were still calling my name.'), // N
        T('Durmo pouco. Cada vez que a lona mexe com o vento, a mão vai para o elmo antes de eu acordar direito. Antes do sol, ele já está de volta na minha cabeça.', 'I barely sleep. Every time the canvas stirs in the wind, my hand goes to the helmet before I’m properly awake. Before sunrise, it’s back on my head.'), // N
      ] },

    { id: 'i06', zona: 'arena', fundo: { img: IMG('arena-tendas'), kb: 'out', foco: '55% 50%', dim: .55, clima: 'poeira' }, pulso: 1.8,
      sons: [{ s: 'assets/audio/sfx/rugido.mp3', p: 3, v: .7 }],
      texto: [
        T('O segundo dia é a cavalgada: o circuito inteiro em volta da arena, estacas, valas, um muro baixo de pedra. O cavalo é emprestado, como o arco, e não gosta de mim. Termino sem cair. Era tudo o que eu queria.', 'The second day is the riding: the whole circuit round the arena, stakes, ditches, a low stone wall. The horse is borrowed, like the bow, and doesn’t like me. I finish without falling. That was all I wanted.'), // N
        T('O terceiro dia começa com a quintana: um boneco de madeira num poste, um escudo num braço, um saco de areia no outro. Quem acerta o escudo fora do centro faz o boneco girar, e o saco vem buscar a nuca de quem passou.', 'The third day begins with the quintain: a wooden figure on a post, a shield on one arm, a sandbag on the other. Hit the shield off-centre and the figure spins, and the sandbag comes looking for the back of your neck.'), // N
        T('Os maiores passam a galope e batem com força. Metade leva o saco nas costas, e a arquibancada ri de cada um.', 'The big ones go by at a gallop and strike hard. Half of them take the sandbag across the back, and the stands laugh at every one.'), // N
        T('Eu não tenho força para fazer o boneco girar. Tenho a mira. Acerto o centro do escudo três vezes, e as três vezes o boneco só balança, como quem concorda.', 'I don’t have the strength to make the figure spin. I have the aim. I hit the centre of the shield three times, and all three times the figure only rocks, like someone nodding.'), // N
        T('Na última passada, quando gritam Azarão, não é mais uma voz. É uma fileira inteira.', 'On the last pass, when they shout Underdog, it isn’t one voice anymore. It’s a whole row.'), // N
        T('Ao meio-dia, os marechais somam os pontos das quatro provas, e nós esperamos embaixo da tribuna, cada um segurando o medo do jeito que sabe. Os grandes fingem que não esperam. Eu conto as colunas. São onze.', 'At noon, the marshals add up the points from the four trials, and we wait beneath the royal box, each of us holding our fear the way we know how. The big ones pretend they aren’t waiting. I count the columns. There are eleven.'), // N
      ] },

    // ===================================================== II · O CÍRCULO
    { id: 'parte-II', parte: 'II', zona: 'arena', fundo: { img: IMG('arena-arauto'), kb: 'in', dim: .6, clima: 'poeira' },
      cartao: { num: 'II', nome: T('O Círculo', 'The Circle'), epigrafe: T('Quem confia demais na própria força, cedo ou tarde a empresta ao inimigo.', 'Whoever trusts too much in their own strength sooner or later lends it to the enemy.'), fonte: T('Anthony, Mestre das Armas', 'Anthony, Master of Arms') } },

    { id: 'a01', zona: 'arena', fundo: { img: IMG('arena-tendas'), kb: 'in', foco: '60% 45%', clima: 'poeira' }, pulso: 1.4, capitular: true, narracao: 'assets/audio/narration/line1a.mp3', narracaoLang: 'en',
      texto: [T('Três dias de provas somam os pontos que me trazem até aqui, e nenhum pesa no corpo tanto quanto este instante: o arauto lê os nomes da semifinal, e o meu vem em terceiro. Laus. Sinto orgulho, como se eu fosse alguém especial de verdade. Sinto também a ansiedade de quem cruzou metade do caminho e ainda precisa atravessar a outra metade. Aperto as mãos uma contra a outra, e as manoplas rangem.',
        'Three days of trials add up to the points that brought me here, and none of them weighs on my body as much as this moment: the herald reads the names for the semifinal, and mine comes third. Laus. I feel proud, as if I were someone special after all. I also feel the anxiety of someone who has crossed half the way and still has the other half to go. I press my hands together, and the gauntlets creak.')], // M
      som: 'assets/audio/sfx/manopla.mp3' },

    { id: 'a02', zona: 'arena', fundo: { img: IMG('arena-tendas'), kb: 'out', foco: '55% 50%', dim: .58, clima: 'poeira' }, pulso: 1,
      texto: [
        T('A arqueria, a prova dos escribas, a cavalgada e a quintana ficaram para trás, a pontuação registrada em pergaminho, aplausos que quase me arrancam lágrimas de tanto alívio. O corpo lembra delas de outro jeito, mais honesto que o pergaminho: o ombro direito ainda dolorido de puxar a corda do arco contra o peso do espaldar, que trava o movimento um instante antes de o gesto terminar e me obriga a compensar com o cotovelo; as coxas queimando do galope, a dureza da sela sentida através das cnêmides de aço como se metal e osso fossem a mesma coisa; o pescoço rígido de sustentar o elmo fechado por quase três dias inteiros, o suor escorrendo por dentro sem ter para onde ir, secando salgado contra a nuca.',
          'The archery, the scribes’ trial, the riding and the quintain are behind me, the scores recorded on parchment, applause that almost wrung tears out of me from sheer relief. My body remembers them differently, more honestly than the parchment: my right shoulder still aching from drawing the bowstring against the weight of the backplate, which locks the movement an instant before the gesture ends and forces me to make up for it with my elbow; my thighs burning from the gallop, the hardness of the saddle felt through the steel greaves as if metal and bone were the same thing; my neck stiff from holding up the closed helmet for almost three whole days, the sweat running down inside with nowhere to go, drying salty against my nape.'), // M
        T('Mas nada disso importa mais. Só os duelos decidem o resto.', 'But none of that matters anymore. Only the duels decide the rest.'), // M
        T('Qualquer adversário que tenha chegado até aqui é maior, mais pesado, com um alcance que eu nunca vou ter. Não é surpresa. Eu me preparei para isso. Agora preciso mostrar em público.',
          'Any opponent who has made it this far is bigger, heavier, with a reach I will never have. It’s no surprise. I prepared for it. Now I have to show it in public.'), // M
        T('Se eu perder, a vida que escolheram para mim começa no domingo.', 'If I lose, the life they chose for me begins on Sunday.'), // N
        se(() => !!c2().marca, T('Embaixo da braçadeira esquerda, no lugar onde Simon me acertou no laranjal, a pele já esqueceu o roxo. A braçadeira lembra por ela a cada passo.', 'Under my left vambrace, where Simon caught me in the orangery, the skin has already forgotten the bruise. The vambrace remembers it for me with every step.')), // N
      ] },

    { id: 'a03', zona: 'arena', se: () => temLenco(), fundo: { img: IMG('tenda-dia'), kb: 'in', foco: '60% 50%', clima: 'poeira' }, pulso: 1.2,
      texto: [T('Tiro a manopla direita de novo e puxo o lenço de Justine de dentro do gibão. Está mais mole do que no dia em que ela me deu, de tanto eu dobrar e desdobrar. O J bordado no canto perdeu um ponto. Ao lado dele, a mancha da bolha do laranjal ficou marrom. Não saiu na água.',
        'I pull my right gauntlet off again and draw Justine’s handkerchief out of my gambeson. It’s softer than the day she gave it to me, from all my folding and unfolding. The J embroidered in the corner has lost a stitch. Beside it, the stain from the orangery blister has gone brown. Water didn’t take it out.')], // N
      escolha: { id: 'lenco4', pergunta: T('O lenço', 'The handkerchief'), opcoes: [
        { id: 'braco', txt: T('Amarrar no braço, à vista', 'Tie it on my arm, in plain sight'), pulso: 2,
          resultado: [T('Os cavaleiros amarram no braço a prenda de uma dama, e ninguém pergunta de quem é. Amarro por cima da braçadeira esquerda, com dois nós, e calço a manopla. Fica branco contra o aço, pequeno demais para alguém ler qualquer coisa de longe.', 'Knights tie a lady’s favour on their arm, and nobody asks whose it is. I tie it over my left vambrace, with two knots, and pull the gauntlet back on. It shows white against the steel, too small for anyone to read anything from far off.')] },
        { id: 'cabo', txt: T('Enrolar no cabo, por baixo da manopla', 'Wrap it round the grip, under the gauntlet'),
          resultado: [T('Enrolo no cabo da espada, como no laranjal, e fecho a manopla por cima. Ninguém vê. A mão sabe.', 'I wrap it round the sword’s grip, like in the orangery, and close the gauntlet over it. Nobody sees. My hand knows.')] },
        { id: 'peito', txt: T('Guardar no peito', 'Keep it against my chest'),
          resultado: [T('Dobro de novo e guardo dentro do gibão, do lado esquerdo, onde a placa do peito encosta. Calço a manopla.', 'I fold it again and tuck it inside the gambeson, on the left side, where the breastplate rests. I pull the gauntlet back on.')] },
      ] } },

    { id: 'a04', zona: 'arena', fundo: { video: VID('arena-entrada'), img: IMG('arena-tendas'), kb: 'none', foco: '50% 60%', dim: .5 }, pulso: 2,
      texto: [
        T('Quando piso na areia, o público vai ao delírio. Laus, o Azarão, é como me chamam: um nobre de linhagem quase esquecida, o menor entre todos os concorrentes, o nome que ninguém apostava ver chegar tão longe.',
          'When I step onto the sand, the crowd goes wild. Laus, the Underdog, that’s what they call me: a noble of an all-but-forgotten line, the smallest of all the contenders, the name nobody bet on seeing get this far.'), // M
        T('Vejo Justine lá em cima, entre a multidão, sentada reta demais. O nervosismo cede um pouco, e o coração acelera de um jeito diferente por um instante, antes de voltar a acelerar de medo.',
          'I see Justine up there, in the crowd, sitting too straight. The nerves give way a little, and my heart speeds up in a different way for a moment, before it goes back to racing with fear.'), // M
        (st) => (lenco(st) === 'braco' ? T('Os olhos dela descem até o meu braço esquerdo e ficam ali. Ela leva a mão à própria manga, onde guarda os lenços, e não tira nada.', 'Her eyes drop to my left arm and stay there. She lifts a hand to her own sleeve, where she keeps her handkerchiefs, and takes nothing out.')
          : desconfia() ? T('Ela não aplaude. É a única da fileira que não aplaude.', 'She doesn’t applaud. She’s the only one in her row who doesn’t.') : null), // N
        T('Respiro. Conto os passos até o centro da arena.', 'I breathe. I count the steps to the centre of the arena.'), // M
      ],
      minijogo: 'passos', passos: { video: VID('arena-entrada'), img: IMG('arena-tendas'), qual: 'semi' },
      depois: [T('Doze. Treze. Guardo o número sem saber ainda para que vai servir. É hábito, não plano.', 'Twelve. Thirteen. I keep the number without knowing yet what it will be for. It’s habit, not a plan.')] }, // M

    { id: 'a05', zona: 'arena', fundo: { img: IMG('joseph-retrato'), kb: 'in', foco: '65% 35%', dim: .5 }, pulso: 1.5,
      texto: [T('Meu oponente também é recebido com entusiasmo. Joseph já passou dos quarenta anos. Cruzei com ele algumas vezes nos corredores do castelo, e os olhos dele sempre demoravam em mim mais do que deviam, descendo e subindo devagar. Nessas vezes, disfarcei bem. Hoje preciso disfarçar melhor.',
        'My opponent is welcomed with cheers too. Joseph is past forty. I’ve crossed paths with him a few times in the castle corridors, and his eyes always lingered on me longer than they should, sliding down and up again, slowly. Those times, I hid it well. Today I have to hide it better.')] }, // M

    { id: 'a06', zona: 'arena', fundo: { img: IMG('arena-arauto'), kb: 'in', foco: '60% 40%', dim: .55 }, pulso: 1.5,
      texto: [
        T('O arauto ergue o bastão, e o público baixa a voz até quase o silêncio.', 'The herald raises his staff, and the crowd lowers its voice almost to silence.'), // M
        T('— Diante das duas testemunhas que fundaram esta terra, o Cavaleiro, que ensina que vitória sem honra não é vitória nenhuma, e a Juíza, que pesa cada golpe antes de qualquer punho o desferir, Redom chama seus filhos ao círculo! Que vençam pela lâmina, não pela sorte. Que percam pela lâmina, não pela vergonha. E que os Dois, de suas estátuas de pedra branca, testemunhem que aqui, hoje, a única linhagem que importa é a que se prova com as próprias mãos!',
          '— Before the two witnesses who founded this land, the Knight, who teaches that victory without honour is no victory at all, and the Judge, who weighs every blow before any fist delivers it, Redom calls its sons to the circle! Let them win by the blade, not by luck. Let them lose by the blade, not by shame. And let the Two, from their statues of white stone, bear witness that here, today, the only lineage that matters is the one proven with one’s own hands!'), // M
        T('O sino soa, e o mundo encolhe até o tamanho do círculo de areia entre nós dois.', 'The bell rings, and the world shrinks to the size of the circle of sand between the two of us.'), // M
      ], sons: [{ s: 'assets/audio/sfx/sino-arena.mp3', p: -1, v: .8, fim: true }] },

    { id: 'a07', zona: 'arena', fundo: { img: IMG('arena-arauto'), kb: 'out', foco: '50% 50%', dim: .62 }, pulso: 2.2,
      texto: [
        T('Levo o escudo à frente por instinto. O coração bate tão alto que tenho medo de Joseph ouvir através do metal. Respiro fundo, uma vez, devagar.', 'I bring my shield forward on instinct. My heart beats so loud I’m afraid Joseph can hear it through the metal. I take a deep breath, once, slowly.'), // M
        T('Joseph avança em passos largos, a espada girando em arcos amplos antes de cada troca de guarda. Gira a espada como quem já fez isso mil vezes e nunca precisou fazer de outro jeito.', 'Joseph advances in long strides, his sword wheeling in wide arcs before every change of guard. He spins it like someone who has done it a thousand times and never needed to do it any other way.'), // M
      ],
      minijogo: 'arena', arena: { quem: 'joseph', fundo: 'assets/images/arena/arena-fundo.jpg' },
      depois: [
        T('Entro nesse instante, o corpo decidindo antes de a cabeça terminar a conta.', 'I go in at that instant, my body deciding before my head finishes the count.'), // M
        T('A ponta da espada corta a parte de trás da coxa dele, onde a placa não cobre inteiro o joelho. Um corte raso, no único ponto em que toda armadura confia demais na sorte. Joseph grita e cai de joelho, a mão livre indo direto para o ferimento, o vermelho escuro escorrendo entre os dedos.', 'The point of my sword cuts the back of his thigh, where the plate doesn’t fully cover the knee. A shallow cut, in the one place where every suit of armour trusts too much to luck. Joseph cries out and drops to one knee, his free hand going straight to the wound, the dark red running between his fingers.'), // M
        T('Paro um segundo depois do golpe, a espada ainda erguida, o peito subindo e descendo rápido demais para o tamanho do corte. Não foi golpe para matar. Mas minhas mãos não sabem disso. Tremem como se tivessem feito algo maior.', 'I stop a second after the blow, sword still raised, my chest rising and falling too fast for the size of the cut. It wasn’t a killing blow. But my hands don’t know that. They shake as if they’d done something bigger.'), // M
      ] },

    { id: 'a08', zona: 'arena', fundo: { img: IMG('arena-arauto'), kb: 'in', foco: '60% 40%', dim: .5, clima: 'poeira' }, pulso: 2,
      texto: [
        T('O arauto entra no círculo antes que eu precise decidir mais nada, o bastão erguido entre nós dois.', 'The herald steps into the circle before I have to decide anything else, his staff raised between the two of us.'), // M
        T('— Sangue tirado, combate encerrado! Laus, o Azarão, vencedor!', '— Blood drawn, the bout is ended! Laus, the Underdog, victor!'), // M
        T('O que sobe das arquibancadas não é aplauso, é rugido, do tipo que entra pelas botas antes de chegar aos ouvidos. O peito ainda dispara, mas agora é outra coisa disparando nele, quente demais para caber no corpo. Dizem que vitória é um sentimento perigoso, que quer ser sentido de novo assim que passa. Agora eu entendo.', 'What rises from the stands isn’t applause, it’s a roar, the kind that comes in through your boots before it reaches your ears. My chest is still racing, but now it’s something else racing in it, too hot to fit inside my body. They say victory is a dangerous feeling, that it wants to be felt again the moment it passes. Now I understand.'), // M
        T('Na tribuna, a Mãe-Rainha não aplaude. Ao lado dela, uma cadeira vazia.', 'In the royal box, the Mother-Queen doesn’t applaud. Beside her, an empty chair.'), // N
      ], sons: [{ s: 'assets/audio/sfx/rugido.mp3', p: 2, v: .8, fim: true }] },

    { id: 'a09', zona: 'arena', fundo: { img: IMG('arena-arauto'), kb: 'out', foco: '50% 50%', dim: .6 }, pulso: (st) => (disparado.joseph(st) ? 3.2 : 2.2),
      texto: [
        T('Joseph continua de joelho, apertando o corte, xingando entre os dentes. Ajoelho ao lado dele antes que qualquer escudeiro se aproxime. Sei o costume: vencedor e vencido se cumprimentam de elmo erguido, cada um mostrando ao outro o próprio rosto, em sinal de respeito. Finjo não lembrar. Pressiono um pano contra o ferimento, as duas mãos ocupadas, a cabeça baixa demais para alguém pedir que eu a levante.', 'Joseph is still on one knee, clutching the cut, cursing through his teeth. I kneel beside him before any squire can come near. I know the custom: victor and vanquished greet each other with helms raised, each showing the other his own face, as a sign of respect. I pretend not to remember. I press a cloth against the wound, both hands busy, my head too low for anyone to ask me to lift it.'), // M
        T('Ele ergue os olhos para a fenda do meu elmo. Espera alguma coisa.', 'He lifts his eyes to the slit of my helmet. He’s waiting for something.'), // N
        se((st) => disparado.joseph(st), T('Cada golpe que levei ainda bate dentro do peito. A voz não vai sair inteira.', 'Every blow I took is still beating inside my chest. My voice won’t come out whole.')), // N
      ],
      escolha: { id: 'deslize2', urgente: true, somJanela: 'assets/audio/sfx/manopla.mp3', janela: (st) => (st.bpm > 120 ? 3 : 4), padrao: 'tremida', opcoes: [
        { id: 'firme', se: (st) => !disparado.joseph(st), riscavel: true, voz: 'laus-obrigado', vozAtraso: 200, txt: T('"Obrigado pelo combate."', '"Thank you for the fight."'),
          resultado: (st) => fimJoseph(st) },
        { id: 'tremida', tremida: true, deslize: true, flag: 'josephDesconfia', voz: 'deslize-obrigado', vozAtraso: 200, txt: T('"Obrigad... o pelo combate."', '"Thank you for the— ... for the fight."'),
          resultado: (st) => [T('A voz engasga no meio da palavra, e por meio fôlego não é a de Laus.', 'My voice catches in the middle of the word, and for half a breath it isn’t Laus’s.'), T('Joseph ergue a cabeça. Eu baixo a minha. Ele franze a testa e não diz nada. Fica olhando a fenda do meu elmo.', 'Joseph raises his head. I lower mine. He frowns and says nothing. He keeps looking at the slit of my helmet.')].concat(fimJoseph(st)) },
      ] } },

    { id: 'a10', zona: 'tenda', fundo: { img: IMG('tenda-dia'), kb: 'in', foco: '60% 50%', clima: 'poeira' }, pulso: 1,
      texto: [
        T('Só na sombra da tenda, longe dos olhos da arquibancada, eu me permito gritar. Grito com a boca dentro do elmo, e o grito volta para mim, abafado, do tamanho da minha cabeça. É o melhor dia da minha vida.', 'Only in the shade of the tent, far from the eyes of the stands, do I let myself scream. I scream with my mouth inside the helmet, and the scream comes back to me, muffled, the size of my head. It’s the best day of my life.'), // M
        T('Lá fora, o sino chama a outra semifinal. Markus. Quero ver como ele levanta o escudo, para que lado gira o corpo, o que faz quando cansa. Mas tudo pode desmoronar por curiosidade, por uma pequena vantagem.', 'Outside, the bell calls the other semifinal. Markus. I want to see how he raises his shield, which way he turns his body, what he does when he tires. But everything could fall apart out of curiosity, for a small advantage.'), // M
      ],
      escolha: { id: 'assistir', pergunta: T('A outra semifinal', 'The other semifinal'), opcoes: [
        { id: 'assistir', pulso: 2, txt: T('Assistir, da galeria dos competidores, de elmo fechado', 'Watch from the competitors’ gallery, helmet closed'),
          resultado: [T('Dormir pode esperar. Desço a escada da galeria com o elmo fechado e a cabeça baixa.', 'Sleep can wait. I go down the gallery stairs with my helmet closed and my head low.')] },
        { id: 'tenda', txt: T('Ficar na tenda, comer e dormir', 'Stay in the tent, eat and sleep'),
          resultado: [T('Vou ter que confiar numa boa refeição e no descanso. Como pão e queijo de costas para a entrada, o elmo no colo, e cochilo de gibão antes de o rugido da outra luta acabar.', 'I’ll have to trust a good meal and rest. I eat bread and cheese with my back to the entrance, the helmet in my lap, and doze off in my gambeson before the roar of the other bout dies down.')] }, // M
      ] } },

    { id: 'a11', zona: 'arena', se: assistiu, fundo: { img: IMG('galeria'), kb: 'in', foco: '65% 45%', dim: .55 }, pulso: 1.6,
      texto: [
        T('A galeria dos competidores fica embaixo da tribuna, uma faixa de sombra entre colunas. Fico no fundo, as costas na pedra.', 'The competitors’ gallery lies beneath the royal box, a strip of shade between columns. I stay at the back, my shoulders against the stone.'), // N
        T('Um cavaleiro de barba ruiva bate com os nós dos dedos no meu elmo.', 'A red-bearded knight raps his knuckles on my helmet.'), // N
        T('— Vai assistir de elmo, Azarão? Tem medo de pegar sol?', '— Watching with your helmet on, Underdog? Afraid of catching the sun?'), // N
        T('Os outros riem.', 'The others laugh.'), // N
      ],
      escolha: { id: 'piada', pergunta: T('Responder?', 'Answer?'), opcoes: [
        { id: 'piada', voz: 'laus-piada', vozAtraso: 300, txt: T('Fazer piada', 'Make a joke'),
          resultado: [T('— Tenho medo de que se apaixonem.', '— I’m afraid they’ll fall in love with me.'), T('Riem mais alto, e o de barba ruiva me deixa em paz.', 'They laugh louder, and the red-bearded one leaves me alone.')] },
        { id: 'calar', silencio: true, pulso: 2.5,
          resultado: [T('Não respondo. Ele bate de novo, mais forte, e o som fica rodando dentro da minha cabeça. Depois desiste.', 'I don’t answer. He raps again, harder, and the sound keeps circling inside my head. Then he gives up.')] },
      ] } },

    { id: 'a12', zona: 'arena', se: assistiu, fundo: { img: IMG('markus-semifinal'), kb: 'in', foco: '62% 45%', dim: .5, clima: 'poeira' }, pulso: 1.4, sons: [{ s: 'assets/audio/sfx/rugido.mp3', p: 3, v: .7, fim: true }],
      texto: [
        T('Markus entra sem girar a espada. Não acena para ninguém. Para no centro, ergue o escudo até a altura do queixo e espera.', 'Markus walks in without spinning his sword. He waves to no one. He stops at the centre, raises his shield to chin height, and waits.'), // N
        T('O filho dos Varr ataca primeiro, três vezes. Markus recebe as três no escudo e não recua um passo. Na quarta, gira o pulso por baixo da lâmina do outro, e a espada de Varr voa, rodando, e cai na areia a cinco passos.', 'The Varr son attacks first, three times. Markus takes all three on his shield and doesn’t give a single step. On the fourth, he turns his wrist under the other’s blade, and Varr’s sword flies, spinning, and lands in the sand five paces away.'), // N
        T('Qualquer um ali avançaria.', 'Anyone there would have pressed in.'), // N
        T('Markus não avança. Anda até a espada caída, abaixa, pega pela lâmina e oferece o cabo de volta. A arena inteira fica de pé.', 'Markus doesn’t. He walks to the fallen sword, bends, picks it up by the blade and offers the hilt back. The whole arena rises to its feet.'), // N
        T('Varr pega a espada com a mão tremendo. Markus volta à guarda e espera de novo. Na troca seguinte, abre um corte fino no antebraço dele, e o arauto encerra.', 'Varr takes the sword with a shaking hand. Markus returns to his guard and waits again. In the next exchange, he opens a thin cut on Varr’s forearm, and the herald ends it.'), // N
        T('Vitória sem honra não é vitória nenhuma. O arauto diz isso antes de cada combate. Markus é o único que parece ter ouvido.', 'Victory without honour is no victory at all. The herald says it before every bout. Markus is the only one who seems to have listened.'), // N
        T('Antes do golpe forte, ele puxa o ar pelo nariz, duas vezes, curto. Do fundo da galeria, eu ouço. Na arena, com o público gritando, talvez não ouça. Guardo assim mesmo.', 'Before the heavy blow, he draws air through his nose, twice, short. From the back of the gallery, I hear it. In the arena, with the crowd shouting, maybe I won’t. I keep it anyway.'), // N
        T('Volto para a tenda quando já está escuro, e o corpo cobra cada degrau.', 'I get back to the tent when it’s already dark, and my body charges me for every step.'), // N
      ] },

    // ===================================================== III · A VÉSPERA
    { id: 'parte-III', parte: 'III', zona: 'tenda', fundo: { img: IMG('tres-dias'), kb: 'in', dim: .62, clima: 'velas' },
      cartao: { num: 'III', nome: T('A Véspera', 'The Eve'), epigrafe: T('Nenhum nome entra no livro sem uma casa que o reclame.', 'No name enters the book without a house to claim it.'), fonte: T('Regimento do Registro do Torneio Real', 'Statutes of the Royal Tournament Registry') } },

    { id: 'v01', zona: 'tenda', fundo: { video: VID('tenda-vela'), img: IMG('tenda-objetos'), kb: 'none', foco: '50% 50%', dim: .45, clima: 'velas' }, pulso: 1.2,
      narracao: 'assets/audio/narration/line2.mp3', narracaoLang: 'en',
      texto: [
        T('Não consigo dormir. A tenda cheira a couro, a óleo de armadura e ao meu próprio suor. Lá fora, alguém canta uma música de taverna sobre o Azarão, errando o meu nome de propósito para rimar.', 'I can’t sleep. The tent smells of leather, of armour oil and of my own sweat. Outside, someone is singing a tavern song about the Underdog, getting my name wrong on purpose so it rhymes.'), // N
        T('Em cima do baú, três coisas. Cada vez que fecho os olhos, uma delas volta.', 'On top of the chest, three things. Every time I close my eyes, one of them comes back.'), // N
        T('Uma bolsa vazia. O elmo. Uma vela. Não olho para elas. Amanhã.', 'An empty purse. The helmet. A candle. I don’t look at them. Tomorrow.'), // N
      ] },

    { id: 'v03', zona: 'tenda', se: () => simonSabe(), fundo: { img: IMG('simon-tenda'), kb: 'in', foco: '62% 45%', dim: .5, clima: 'velas' }, pulso: 2, som: 'assets/audio/sfx/lona-arranhar.mp3', vozAuto: [{ voz: 'todos-riem', p: 6 }],
      texto: [
        T('Alguém arranha a lona do lado de fora, três vezes.', 'Someone scratches the canvas outside, three times.'), // N
        T('— Sou eu.', '— It’s me.'), // N
        T('Simon entra de capuz, sem fôlego, e fica parado olhando para o gibão, para o elmo em cima do baú.', 'Simon comes in hooded, out of breath, and stands still, looking at the gambeson, at the helmet on the chest.'), // N
        T('— Eu vi você contra o Joseph — ele diz. — O passo para o lado. Você faz isso comigo desde que eu tinha oito anos.', '— I saw you against Joseph — he says. — The sidestep. You’ve been doing that to me since I was eight.'), // N
        T('Não digo nada.', 'I say nothing.'), // N
        T('— Eu ri — ele diz. — Quando você me contou. Eu ri.', '— I laughed — he says. — When you told me. I laughed.'), // N
        T('— Todo mundo ri.', '— Everyone laughs.'), // N
        T('— Eu não devia.', '— I shouldn’t have.'), // N
        se(() => !!(c2().duelo && c2().duelo.resultado === 'deixou'), T('— E amanhã não baixa a espada. Não pra ele.', '— And tomorrow you don’t lower your sword. Not for him.')), // N
        (st) => (assistiu(st) ? null : T('— O Markus puxa o ar pelo nariz antes do golpe forte. Duas vezes, curto. Anthony fala disso nas aulas: os grandes respiram antes de pesar.', '— Markus draws air through his nose before the heavy blow. Twice, short. Anthony talks about it in lessons: the big ones breathe before they put their weight in.')), // N
        T('— Amanhã, antes do sol, eu te ajudo com as fivelas.', '— Tomorrow, before sunrise, I’ll help you with the buckles.'), // N
      ],
      escolha: { id: 'simonTenda', pergunta: T('Simon', 'Simon'), opcoes: [
        { id: 'aceitar', voz: 'antes-sol', vozAtraso: 200, txt: T('Aceitar', 'Accept'), resultado: [T('— Antes do sol. Se alguém te vir...', '— Before sunrise. If anyone sees you...'), T('— Ninguém olha para um menino de capuz.', '— Nobody looks at a boy in a hood.')] },
        { id: 'mandar', voz: 'simon-volta', vozAtraso: 200, txt: T('Mandar Simon embora', 'Send Simon away'), resultado: [T('— Volta. Se alguém te vir aqui, acabou para nós dois.', '— Go back. If anyone sees you here, it’s over for both of us.'), T('Ele fica parado na entrada um tempo. Depois vai.', 'He stands in the entrance a while. Then he goes.')] },
      ] } },

    { id: 'v04', zona: 'tenda', fundo: { img: IMG('tenda-objetos'), kb: 'out', foco: '55% 45%', dim: .7, clima: 'velas' }, pulso: 1.6,
      texto: [T('Deito de gibão, a espada do lado. O coração não deixa. Conto a respiração como conto os passos.', 'I lie down in my gambeson, the sword at my side. My heart won’t allow it. I count my breathing the way I count steps.')], // N
      minijogo: 'respirar', respirar: { img: IMG('tenda-objetos'), ciclos: 4 },
      depois: [T('Durmo. Não sonho com nada. Ou sonho, e não lembro.', 'I sleep. I don’t dream of anything. Or I do, and don’t remember.')] }, // N

    { id: 'c01', zona: 'manha', fundo: { img: IMG('manha-acampamento'), kb: 'in', foco: '60% 45%' }, pulso: 1.6,
      narracao: 'assets/audio/narration/line3.mp3', narracaoLang: 'en', capitular: true,
      texto: [
        T('O grande dia amanhece nublado. É verão, mas o ar está fresco e úmido, e a lona da tenda pinga sem ter chovido.', 'The great day dawns cloudy. It’s summer, but the air is cool and damp, and the tent canvas drips even though it hasn’t rained.'), // M
        T('Na entrada da tenda, alguém deixou pão, queijo e uma maçã.', 'At the tent’s entrance, someone has left bread, cheese and an apple.'), // N
      ],
      escolha: { id: 'comer', pergunta: T('O pão', 'The bread'), opcoes: [
        { id: 'comer', txt: T('Comer', 'Eat'), resultado: [T('Como devagar. Metade fica no estômago, metade fica na garganta.', 'I eat slowly. Half of it stays in my stomach, half stays in my throat.')] },
        { id: 'nao', pulso: 2, txt: T('Não comer', 'Don’t eat'), resultado: [T('Não como nada, com receio de que a comida não pare no estômago.', 'I don’t eat anything, afraid the food won’t stay down.')] }, // M
      ] } },

    { id: 'c02', zona: 'manha', fundo: { img: IMG('fivelas'), kb: 'in', foco: '62% 45%', dim: .5 }, pulso: 1.8, vozAuto: (st) => [{ voz: 'so-um', p: simonVem(st) ? 4 : 1 }],
      texto: [
        (st) => (simonVem(st) ? [
          T('Simon chega antes do sol, como prometeu. Aperta as fivelas das costas sem eu pedir, uma por uma, com o pé apoiado no baú, e a cada uma que fecha eu respiro menos. Na correia do elmo, ele para.', 'Simon arrives before sunrise, as he promised. He tightens the back buckles without my asking, one by one, a foot braced on the chest, and with every one that closes I breathe a little less. At the helmet’s strap, he stops.'),
          T('— Essa está gasta.', '— This one’s worn.'), T('— O ferreiro não terminou.', '— The smith didn’t finish.'), T('— Não aguenta outro dia.', '— It won’t last another day.'), T('— Só preciso de um.', '— I only need one.'),
          T('Ele bate dois dedos no peito, duas vezes, o sinal que a gente usava no laranjal para pedir mais uma rodada, e sai sem olhar para trás.', 'He taps two fingers on his chest, twice, the sign we used in the orangery to ask for one more round, and leaves without looking back.'),
        ] : [
          T('Visto a armadura com dificuldade. As mãos tremem, e eu não sei se é medo, ansiedade, ou os dois. Fecho as fivelas das costas com o gancho de bota. A correia do elmo escorrega do furo duas vezes, gasta onde o ferreiro não trocou. Puxo até o couro ranger. Aguenta mais um dia.', 'I struggle into the armour. My hands shake, and I don’t know if it’s fear, nerves, or both. I fasten the back buckles with the boot hook. The helmet’s strap slips out of its hole twice, worn where the smith didn’t replace it. I pull until the leather creaks. It’ll last one more day.'),
          T('Só preciso de um.', 'I only need one.'),
        ]), // M+N
        (st) => ({ braco: T('Refaço os dois nós no braço.', 'I retie the two knots on my arm.'), cabo: T('Enrolo o lenço no cabo de novo, mais apertado.', 'I wrap the handkerchief round the grip again, tighter.'), peito: T('O lenço continua no peito, do lado esquerdo.', 'The handkerchief is still against my chest, on the left side.') }[lenco(st)] || null), // N
      ] },

    { id: 'c03', zona: 'manha', fundo: { img: IMG('manha-acampamento'), kb: 'out', foco: '50% 50%', dim: .6 }, pulso: 1.6,
      texto: [T('Passo a manhã amolando a espada.', 'I spend the morning whetting my sword.')], // M
      minijogo: 'amolar', amolar: { video: VID('amolar') },
      depois: [T('Quando paro, a lâmina já não precisa de pedra faz tempo.', 'When I stop, the blade stopped needing the stone a long time ago.')] }, // N

    { id: 'c04', zona: 'manha', fundo: { img: IMG('markus-semifinal'), kb: 'in', foco: '60% 45%', dim: .55 }, pulso: 1.2,
      texto: [
        (st) => (assistiu(st) || simonVem(st) ? T('Lá fora, os escudeiros ainda contam como Markus devolveu a espada do adversário pelo cabo. A cada vez que contam, a espada voa mais longe.', 'Outside, the squires are still telling how Markus handed his opponent’s sword back hilt-first. Every time they tell it, the sword flies further.')
          : [T('Markus venceu a outra semifinal, num duelo mais bonito de ver do que o meu, pelo que ouço dos escudeiros enquanto amolo a espada. Dizem que ele desarmou o filho dos Varr na quarta troca. Dizem que, em vez de avançar, andou até a espada caída, pegou pela lâmina e devolveu pelo cabo. Dizem que a arena inteira ficou de pé. Um escudeiro conta duas vezes, e na segunda a espada já voou mais longe.', 'Markus won the other semifinal, in a bout prettier to watch than mine, from what I hear from the squires while I whet my sword. They say he disarmed the Varr son on the fourth exchange. They say that instead of pressing in, he walked to the fallen sword, picked it up by the blade and handed it back hilt-first. They say the whole arena rose to its feet. One squire tells it twice, and the second time the sword has flown further.'),
            T('Nenhum deles fala do Azarão. Melhor assim.', 'None of them mentions the Underdog. Better that way.')]), // M+N
      ] },

    { id: 'v08', zona: 'manha', fundo: { img: IMG('tenda-dia'), kb: 'in', foco: '60% 50%', dim: .55 }, pulso: 2.4,
      texto: [
        T('Um escudeiro de libré vermelha para na entrada da tenda, sem entrar.', 'A squire in red livery stops at the tent’s entrance, without coming in.'), // N
        T('— Sir Markus manda dizer que é costume, entre finalistas, se verem de rosto antes do combate. Ele pede, por honra.', '— Sir Markus bids me say that it is custom, between finalists, to see each other’s faces before the bout. He asks it, on his honour.'), // N
        se((st) => disparado.escudeiro(st), T('O coração dispara antes de eu abrir a boca.', 'My heart races before I even open my mouth.')), // N
      ],
      // sem relógio: um recado, não um susto. A resposta trêmula só aparece (e sozinha) se o coração disparou
      escolha: { id: 'deslize4', pergunta: T('O recado', 'The message'), opcoes: [
        { id: 'firme', se: (st) => !disparado.escudeiro(st), riscavel: true, voz: 'escudeiro-depois', vozAtraso: 200, txt: T('"Diga a ele que verá depois."', '"Tell him he’ll see it after."'),
          resultado: [T('O escudeiro hesita, faz uma reverência curta e vai.', 'The squire hesitates, gives a short bow, and goes.')] },
        { id: 'calar', se: (st) => !disparado.escudeiro(st), silencio: true, pulso: 2.2,
          resultado: [T('Não respondo. Aponto a arena com o queixo. O escudeiro espera um instante, como quem espera uma voz, e vai embora sem ela.', 'I don’t answer. I point my chin toward the arena. The squire waits a moment, like someone waiting for a voice, and leaves without it.')] },
        { id: 'tremida', se: (st) => disparado.escudeiro(st), tremida: true, deslize: true, flag: 'escudeiroOuviu', voz: 'deslize-escudeiro', vozAtraso: 200, txt: T('"Diga a ele que estou pronta... pronto. Que verá depois."', '"Tell him La— tell him he’ll see it after."'),
          resultado: [T('O escudeiro olha para a fenda do meu elmo um instante a mais. Depois vai. Fico com a mão no cabo da espada até os passos dele sumirem.', 'The squire looks at the slit of my helmet a moment too long. Then he goes. I keep my hand on the sword’s grip until his footsteps are gone.')] },
      ] } }, // N

    { id: 'v09', zona: 'arena', fundo: { img: IMG('galeria'), kb: 'in', foco: '60% 45%', dim: .6 }, pulso: 2.4,
      texto: [
        T('Joseph está encostado na parede do túnel, a perna enfaixada, um odre na mão. Quando passo, ele estica a bengala e bate de leve na minha cnêmide.', 'Joseph is leaning against the wall of the tunnel, his leg bandaged, a wineskin in his hand. As I pass, he stretches out his cane and taps it lightly against my greave.'), // N
        (st) => (st.f.josephDesconfia
          ? T('— Obrigad... o — ele repete, devagar, arrastando a sílaba que eu engoli ontem. — Te vi nos corredores, Azarão. — Os olhos dele sobem e descem pela fenda do elmo. — Não lembro do seu rosto. Mas dessa voz eu lembro.', '— Thank you for the... — he repeats, slowly, stopping exactly where I stopped yesterday. — I’ve seen you in the corridors, Underdog. — His eyes slide up and down the slit of my helmet. — I don’t remember your face. But that voice I remember.')
          : T('— Te vi nos corredores, Azarão. — Os olhos dele sobem e descem pela fenda do elmo. — Não lembro do seu rosto.', '— I’ve seen you in the corridors, Underdog. — His eyes slide up and down the slit of my helmet. — I don’t remember your face.')), // N
      ],
      escolha: { id: 'deslize5', pergunta: T('Joseph', 'Joseph'), opcoes: [
        { id: 'ninguem', voz: 'ninguem-lembra', vozAtraso: 200, txt: T('"Ninguém lembra."', '"Nobody does."'), resultado: [T('Ele ri pelo nariz e recolhe a bengala.', 'He laughs through his nose and draws back his cane.')] },
        { id: 'calar', silencio: true, pulso: 2.6, resultado: [T('Ele fica olhando até eu sair do túnel. Sinto o olhar na nuca, por dentro do aço.', 'He keeps looking until I’m out of the tunnel. I feel his gaze on the back of my neck, through the steel.')] },
      ] } }, // N

    // ===================================================== IV · TREZE PASSOS
    { id: 'parte-IV', parte: 'IV', zona: 'arena', fundo: { img: IMG('arena-arauto'), kb: 'in', dim: .6 },
      cartao: { num: 'IV', nome: T('Treze Passos', 'Thirteen Steps'), epigrafe: T('Aquele que vencer o Torneio Real será o General-Rei de Redom e tomará por esposa a Mãe-Rainha.', 'He who wins the Royal Tournament shall be General-King of Redom and shall take the Mother-Queen to wife.'), fonte: T('Lei da Capital Branca', 'Law of the White Capital') } },

    { id: 'c05', zona: 'arena', fundo: { video: VID('arena-entrada'), img: IMG('arena-tendas'), kb: 'none', foco: '50% 60%', dim: .5 }, pulso: 2.2,
      texto: [T('O momento chega. Piso na areia, e de novo respiro. Conto os passos até o centro.', 'The moment comes. I step onto the sand, and once again I breathe. I count the steps to the centre.')], // M
      minijogo: 'passos', passos: { video: VID('arena-entrada'), img: IMG('arena-tendas'), qual: 'final' }, numeral: '13',
      depois: [
        T('Treze. Igual a ontem.', 'Thirteen. Same as yesterday.'), // M
        T('O arauto anuncia Markus, e o que sobe das arquibancadas é mais alto do que foi para mim. Hoje ele é o favorito. Talvez sempre tenha sido.', 'The herald announces Markus, and what rises from the stands is louder than it was for me. Today he’s the favourite. Maybe he always was.'), // M
      ] },

    { id: 'c06', zona: 'arena', fundo: { img: IMG('arena-arauto'), kb: 'in', foco: '60% 40%', dim: .55 }, pulso: 2,
      texto: [
        T('O arauto ergue o bastão.', 'The herald raises his staff.'), // N
        T('— Hoje, diante das duas testemunhas, Redom escolhe o seu General-Rei! Aquele que vencer este círculo tomará por esposa a filha da Mãe-Rainha, a que reinará depois dela, e ela terá por esposo o melhor de Redom!', '— Today, before the two witnesses, Redom chooses its General-King! He who wins this circle shall take to wife the Mother-Queen’s daughter, she who will reign after her, and she shall have for husband the best of Redom!'), // N
        T('O rugido sobe. Dentro do elmo, eu paro de respirar. Olho para a tribuna.', 'The roar rises. Inside the helmet, I stop breathing. I look up at the royal box.'), // N
      ], sons: [{ s: 'assets/audio/sfx/rugido.mp3', p: 2, v: .8, fim: true }] },

    { id: 'c07', zona: 'arena', fundo: { img: 'assets/images/arquibancada-panorama.jpg', kb: 'none', foco: '25% 40%', dim: .55 }, pulso: 2.2,
      texto: [T('Pela fenda da viseira, a arquibancada inteira cabe numa fresta.', 'Through the slit of the visor, the whole of the stands fits in a sliver.')], // N
      minijogo: 'fenda', fenda: { img: 'assets/images/arquibancada-panorama.jpg', proporcao: 2172 / 724, segundos: 14, pontos: [
        { id: 'tribuna', x: .25, y: .42, r: .08, ry: .14, rotulo: T('A tribuna', 'The royal box') },
        { id: 'simon', x: .28, y: .26, r: .035, ry: .09, rotulo: T('Simon', 'Simon') },
        { id: 'justine', x: .60, y: .55, r: .045, ry: .12, rotulo: T('Justine', 'Justine') },
        { id: 'osmund', x: .30, y: .80, r: .06, ry: .10, rotulo: T('A mesa do Registro', 'The Registry table') },
        { id: 'cavaleiro', x: .92, y: .42, r: .05, ry: .2, rotulo: T('O Cavaleiro de pedra', 'The stone Knight') },
      ] },
      depois: (st) => ({
        tribuna: [T('A Mãe-Rainha está de vinho, as mãos no colo. Ao lado dela, uma cadeira com almofada de veludo, vazia. Ela olha duas vezes para a porta da tribuna, como quem espera alguém que prometeu chegar no fim.', 'The Mother-Queen is in wine-red, her hands in her lap. Beside her, a chair with a velvet cushion, empty. She glances twice at the door of the box, like someone waiting for a person who promised to arrive at the end.')],
        simon: simonVem(st) ? [T('Simon está de pé atrás da cadeira vazia. Quando meus olhos param nele, ele bate dois dedos no peito, duas vezes. De novo.', 'Simon is standing behind the empty chair. When my eyes stop on him, he taps two fingers on his chest, twice. Again.')]
          : simonSabe() ? [T('Simon está de pé atrás da cadeira vazia, onde eu mandei que não estivesse. Quando meus olhos param nele, ele bate dois dedos no peito, duas vezes: o sinal do laranjal, de pedir mais uma rodada.', 'Simon is standing behind the empty chair, where I told him not to be. When my eyes stop on him, he taps two fingers on his chest, twice: our sign from the orangery, for one more round.')]
          : [T('Simon está inclinado sobre o parapeito, os cotovelos apoiados. Olha para mim um tempo longo. Depois olha para a cadeira vazia.', 'Simon is leaning over the parapet, elbows propped. He looks at me for a long time. Then he looks at the empty chair.')],
        justine: [T('Justine está no mesmo lugar de ontem, sentada reta demais.', 'Justine is in the same place as yesterday, sitting too straight.'),
          lenco(st) === 'braco' ? T('Os olhos dela vão direto para o meu braço esquerdo.', 'Her eyes go straight to my left arm.') : desconfia() ? T('Ninguém da fileira olha para outra coisa que não Markus. Ela olha para mim.', 'Nobody in her row looks at anything but Markus. She looks at me.') : null].filter(Boolean),
        osmund: [T('Embaixo da tribuna, na mesa do Registro, Osmund segura a pena sem molhar. Foi a mão dele que escreveu Laus no livro. Está mais branco que a pedra. Quando o arauto diz o meu nome, ele fecha os olhos.', 'Below the royal box, at the Registry table, Osmund holds his quill without dipping it. It was his hand that wrote Laus in the book. He’s whiter than the stone. When the herald says my name, he closes his eyes.')],
        cavaleiro: [T('Do outro lado da arena, o Cavaleiro de pedra branca segura a espada de ponta para baixo. Ainda não chove, e mesmo assim o rosto dele está escuro de umidade. Peço coragem sem mexer a boca.', 'Across the arena, the Knight of white stone holds his sword point-down. It isn’t raining yet, and still his face is dark with damp. I ask for courage without moving my lips.')],
      }[st.escolhas.olhar] || [T('A voz do arauto me puxa de volta para o círculo antes de eu decidir para onde olhar.', 'The herald’s voice pulls me back into the circle before I decide where to look.')]) },

    { id: 'c08', zona: 'chuva', fundo: { video: VID('chuva-comeca'), img: IMG('markus-viseira'), kb: 'none', foco: '50% 45%', dim: .45, clima: 'chuva' }, pulso: 2.4, sons: [{ s: 'assets/audio/sfx/chuva-elmo.mp3', p: 2, v: .6 }, { s: 'assets/audio/sfx/sino-arena.mp3', p: -1, v: .85, fim: true }],
      texto: [
        T('Markus ergue a viseira para me cumprimentar, como manda o costume antes do combate, e espera. Eu não ergo a minha. Ele fica um instante assim, de rosto à mostra, com a mão no elmo.', 'Markus raises his visor to greet me, as the custom demands before a bout, and waits. I don’t raise mine. He stays like that a moment, face bare, hand on his helmet.'), // M
        (st) => (st.f.escudeiroOuviu
          ? T('— Que vença quem a merece — ele diz. Olha a fenda do meu elmo um instante a mais, como quem confere uma coisa que ouviu de manhã. Depois baixa a viseira, devagar.', '— May the one who deserves her win — he says. He looks at the slit of my helmet a moment longer, like someone checking something he heard this morning. Then he lowers the visor, slowly.')
          : T('— Que vença quem a merece — ele diz. Depois baixa a viseira, devagar.', '— May the one who deserves her win — he says. Then he lowers the visor, slowly.')), // N
        T('Começa a chover, forte. A primeira gota bate no meu elmo como um dedo. Depois, todas. Meu coração bate tão rápido quanto a chuva cai.', 'It starts to rain, hard. The first drop taps my helmet like a finger. Then all of them. My heart beats as fast as the rain falls.'), // M
        T('Pela fenda entra cheiro de terra molhada e de pedra. Respiro fundo. É o primeiro cheiro bom desde que o Torneio começou.', 'Through the slit comes the smell of wet earth and stone. I breathe in deep. It’s the first good smell since the Tournament began.'), // N
        (st) => (st.escolhas.comer === 'nao' ? T('O estômago, vazio desde ontem, se fecha feito um punho.', 'My stomach, empty since yesterday, closes like a fist.')
          : st.escolhas.comer === 'comer' ? T('O pão da manhã continua onde ficou: metade no estômago, metade na garganta.', 'The morning bread is still where it stayed: half in my stomach, half in my throat.') : null), // N
        T('O sino soa.', 'The bell rings.'), // N
      ] },

    { id: 'c09', zona: 'chuva', fundo: { img: IMG('markus-viseira'), kb: 'out', foco: '60% 45%', dim: .62, clima: 'chuva' }, pulso: 2.6,
      texto: [T('Markus ergue o escudo até o queixo e espera.', 'Markus raises his shield to his chin and waits.')], // N
      minijogo: 'arena', arena: { quem: 'markus', fundo: 'assets/images/arena/arena-fundo-chuva.jpg', fundoChuva: 'assets/images/arena/arena-fundo-chuva.jpg', videoElmo: VID('elmo-voa') },
      depois: [T('O golpe está dado. A chuva bate no meu rosto, e por um instante a arena inteira fica parada, como se alguém tivesse segurado o fôlego do mundo.', 'The blow is struck. The rain beats on my face, and for an instant the whole arena stands still, as if someone were holding the world’s breath.'), T('E, no meio da chuva, eu lembro.', 'And, in the middle of the rain, I remember.')] }, // N

    // ===================================================== V · O AVESSO
    { id: 'parte-V', parte: 'V', zona: 'tenda', fundo: { img: IMG('tenda-objetos'), kb: 'in', dim: .62, clima: 'velas' },
      cartao: { num: 'V', nome: T('O Avesso', 'The Lining'), epigrafe: T('Todo disfarce tem um avesso, e é por ele que se veste.', 'Every disguise has a lining, and it’s by the lining that you put it on.'), fonte: T('Dito de alfaiate da Capital Branca', 'Tailors’ saying, White Capital') } },

    { id: 'av01', zona: 'tenda', fundo: { video: VID('tenda-vela'), img: IMG('tenda-objetos'), kb: 'none', foco: '50% 50%', dim: .45, clima: 'velas' }, pulso: .8, narracao: 'assets/audio/narration/line4.mp3', narracaoLang: 'en',
      texto: [
        T('Numa tenda que cheirava a couro e a medo, havia três coisas em cima de um baú. Eu não olhava para elas.', 'In a tent that smelled of leather and fear, there were three things on top of a chest. I didn’t look at them.'), // N
        T('Agora posso.', 'Now I can.'), // N
        T('A bolsa primeiro.', 'The purse first.'), // N
      ],
    }, // N (linear: bolsa, elmo, vela; a voz cobre os dois primeiros parágrafos)

    // ----- a bolsa vazia: Osmund
    { id: 'b02', zona: 'rua', fundo: { img: IMG('osmund-porta'), kb: 'in', foco: '62% 45%', dim: .5 }, pulso: 1.5,
      texto: [
        T('Vinte e um dias antes do Torneio.', 'Twenty-one days before the Tournament.'), // N
        () => (c2().registro ? T('Faz nove dias que li a carta na mesa de Gideon, sem mexer a cabeça, só com os olhos. Hoje os mantos dos arautos ficam prontos, e o homem que assinou a carta vem buscá-los pessoalmente.', 'It’s been nine days since I read the letter on Gideon’s table, without moving my head, with only my eyes. Today the heralds’ cloaks are ready, and the man who signed the letter is coming to fetch them himself.')
          : T('Gideon passa a manhã reclamando dos mantos dos arautos. O oficial do Registro vem buscá-los hoje, pessoalmente, e não confia em pajem nenhum. Pergunto o nome dele como quem pergunta do tempo.', 'Gideon spends the morning grumbling about the heralds’ cloaks. The Registry officer is coming to fetch them today, himself, and trusts no page with them. I ask his name the way you’d ask about the weather.')), // N
        T('Osmund.', 'Osmund.'), // N
        T('Da janela do corredor, vejo ele atravessar o pátio com os mantos dobrados no braço. Ninguém suborna um oficial do Registro dentro do castelo da Mãe-Rainha.', 'From the corridor window, I watch him cross the courtyard with the cloaks folded over his arm. Nobody bribes a Registry officer inside the Mother-Queen’s castle.'), // N
        () => ((c2().rotas || []).length >= 3 ? T('Saio pela janela da sala do alfaiate, pelo telhado e pela vinha, do jeito que contei com os olhos naquela tarde, e alcanço ele no portão de baixo.', 'I leave through the window of the tailor’s room, across the roof and down the vine, the way I counted it with my eyes that afternoon, and catch up with him at the lower gate.')
          : T('Saio pela porta da cozinha, na troca da guarda, e alcanço ele no portão de baixo.', 'I slip out through the kitchen door at the change of the guard and catch up with him at the lower gate.')), // N
        T('Sigo de capuz, de longe. Ele anda devagar, sem olhar para trás, até uma rua estreita perto do muro, onde a água da chuva corre pelo meio da pedra. Espero a luz acender na janela de cima. Bato três vezes. Ele abre com tinta nos dedos e a pena ainda na mão.', 'I follow, hooded, at a distance. He walks slowly, never looking back, to a narrow street near the wall, where rainwater runs down the middle of the stone. I wait for the light in the upstairs window. I knock three times. He opens with ink on his fingers and the quill still in his hand.'), // N
        T('Ele me olha embaixo do capuz por mais tempo do que devia.', 'He looks at me under the hood for longer than he should.'), // N
        T('— Alteza.', '— Highness.'), // N
        T('Não era para ele saber. Tiro o capuz, porque agora não adianta.', 'He wasn’t supposed to know. I take off the hood, because now there’s no point.'), // N
        T('— Eu inscrevi o seu pai — ele diz. — Faz vinte e dois anos. Ele segurou a pena como quem segura uma espada e borrou o próprio nome.', '— I entered your father — he says. — Twenty-two years ago. He held the quill the way you hold a sword and smudged his own name.'), // N
      ] },
    { id: 'b03', zona: 'rua', sons: [{ s: 'assets/audio/sfx/bolsa-moedas.mp3', p: 4, v: .8 }], fundo: { img: IMG('osmund-livro'), kb: 'in', foco: '60% 50%', dim: .45, clima: 'velas' }, pulso: 1.6,
      texto: [
        T('— Quero me inscrever.', '— I want to enter.'), // N
        T('Ele não ri. É a primeira coisa que me faz confiar nele.', 'He doesn’t laugh. It’s the first thing that makes me trust him.'), // N
        T('— Com que nome?', '— Under what name?'), // N
        T('— Um que ninguém reclame.', '— One nobody will claim.'), // N
        T('Ponho a bolsa na mesa. Tudo o que eu tenho: as moedas de festa de dezesseis anos e os brincos de pérola da minha avó. Ele não abre. Pesa na mão, como Gideon pesa um tecido.', 'I put the purse on the table. Everything I have: sixteen years of feast-day coins and my grandmother’s pearl earrings. He doesn’t open it. He weighs it in his hand, the way Gideon weighs a cloth.'), // N
        T('— Isso compra o silêncio de um homem velho por uma noite, Alteza. Não compra o meu pescoço.', '— This buys an old man’s silence for one night, Highness. It doesn’t buy my neck.'), // N
        T('— Então o que compra?', '— Then what does?'), // N
        T('Ele espera. Quer que eu ofereça.', 'He waits. He wants me to make the offer.'), // N
      ], vozAuto: [{ voz: 'osmund-inscrever', p: 0 }, { voz: 'osmund-ninguem', p: 3 }, { voz: 'osmund-entao', p: 6 }],
      escolha: { id: 'pagamento', pergunta: T('O preço', 'The price'), opcoes: [
        { id: 'colar', peso: 1, txt: T('O colar do casamento', 'The wedding necklace'), txtNervoso: T('O colar... o do casamento', 'The necklace... the wedding one'),
          resultado: [T('Tiro do pescoço o colar que minha mãe mandou fazer para o casamento. Esmeraldas, para combinar com os meus olhos, ela disse. Uso desde a última prova do vestido, para acostumar o pescoço. Ponho em cima da bolsa. Ele fica olhando para as pedras e não toca nelas por um tempo. Depois toca.', 'I take from my neck the necklace my mother had made for the wedding. Emeralds, to match my eyes, she said. I’ve worn it since the last fitting of the gown, to get my neck used to it. I set it on top of the purse. He looks at the stones and doesn’t touch them for a while. Then he does.')] },
        { id: 'promessa', peso: 2, voz: [{ voz: 'pagar-promessa', p: 0 }, { voz: 'pagar-lembro', p: 3 }], txt: T('Uma promessa de rainha', 'A queen’s promise'), txtNervoso: T('Uma promessa... de rainha', 'A promise... a queen’s'),
          resultado: [T('— Quando eu for Mãe-Rainha, você vai ter o que pedir. Uma vez. O que for.', '— When I’m Mother-Queen, you’ll have whatever you ask. Once. Anything.'), T('Ele me olha como minha mãe olha um tecido que não vai comprar.', 'He looks at me the way my mother looks at a cloth she isn’t going to buy.'), T('— Rainha nenhuma lembra o que prometeu de noite.', '— No queen remembers what she promised at night.'), T('— Eu lembro.', '— I’ll remember.'), T('Ele anota alguma coisa num papel pequeno, dobra e guarda dentro do próprio livro. Não me mostra o que escreveu.', 'He writes something on a small slip of paper, folds it, and tucks it inside his own book. He doesn’t show me what he wrote.')] },
        { id: 'confissao', peso: 1, voz: 'pagar-verdade', vozAtraso: 300, txt: T('A confissão', 'The confession'),
          resultado: [T('— Eu não tenho mais nada. Só o motivo.', '— I have nothing else. Only the reason.'),
            T('Conto. Que não quero me casar com um homem que eu nunca vi. Que não quero ser rainha de ninguém, nem mãe de herdeiro nenhum por obrigação. Que eu quero, uma vez na vida, decidir o que acontece comigo. Falo mais do que queria, e a voz falha na parte que eu não ensaiei.', 'I tell him. That I don’t want to marry a man I’ve never seen. That I don’t want to be anyone’s queen, nor the mother of any heir out of duty. That I want, once in my life, to decide what happens to me. I say more than I meant to, and my voice breaks on the part I didn’t rehearse.'),
            T('Ele ouve alisando a página com a palma. Quando termino, nada mudou no rosto dele.', 'He listens, smoothing the page with his palm. When I finish, nothing in his face has changed.'),
            T('— Motivo não paga dívida, Alteza. Se descobrirem, o pescoço que vai para a corda é o meu.', '— A reason doesn’t pay a debt, Highness. If they find out, the neck that goes to the rope is mine.'),
            T('Então eu peço papel.', 'So I ask for paper.'),
            T('Escrevo devagar, com a minha letra, a que a professora corrigiu a vida inteira: que eu, Laura D’Orrose, falsifiquei sozinha a inscrição de Laus da Casa Merrow, sem o conhecimento de nenhum oficial do Registro. Assino. Ponho a data.', 'I write slowly, in my own hand, the one the teacher corrected my whole life: that I, Laura D’Orrose, forged the entry of Laus of House Merrow alone, without the knowledge of any officer of the Registry. I sign it. I date it.'),
            T('Osmund lê duas vezes. Dobra em quatro e guarda dentro do próprio livro, entre as casas mortas.', 'Osmund reads it twice. He folds it in four and tucks it inside his own book, among the dead houses.'),
            T('— Agora sim — ele diz. — Agora a corda é sua.', '— Now, yes — he says. — Now the rope is yours.')] },
      ] } },
    { id: 'b04', zona: 'rua', fundo: { video: VID('osmund-escreve'), img: IMG('osmund-livro'), kb: 'none', foco: '55% 50%', dim: .45, clima: 'velas' }, pulso: 1.2, vozAuto: [{ voz: 'laus-nome', p: 4 }],
      texto: [
        T('Osmund abre o livro grosso num ponto que parece saber de cor. Casas pequenas, extintas, com o último nome riscado.', 'Osmund opens the thick book at a place he seems to know by heart. Small houses, extinct, the last name struck through.'), // N
        T('— Casa Merrow. Uma garça cinza num campo branco. O último filho morreu de febre antes de aprender a montar. Ninguém reclama um nome de que ninguém lembra.', '— House Merrow. A grey heron on a white field. The last son died of fever before he learned to ride. Nobody claims a name nobody remembers.'), // N
        T('— Laus.', '— Laus.'), // N
        T('Ele levanta a pena.', 'He lifts the quill.'), // N
        T('— Laus, da Casa Merrow. Se alguém gritar o meu nome na arena, quero que pareça comigo.', '— Laus, of House Merrow. If anyone shouts my name in the arena, I want it to sound like me.'), // N
        T('Ele escreve. A pena arranha duas vezes no L.', 'He writes. The quill scratches twice on the L.'), // N
        T('— Ninguém olha embaixo do elmo de um perdedor — ele diz, soprando a tinta. — Caia cedo, Alteza. É o melhor para nós dois.', '— Nobody looks under a loser’s helmet — he says, blowing on the ink. — Fall early, Highness. It’s best for us both.'), // N
        T('Volto para o castelo antes do primeiro sino. Lavo as mãos duas vezes. A tinta dele não está nelas, e mesmo assim eu lavo.', 'I’m back at the castle before the first bell. I wash my hands twice. His ink isn’t on them, and I wash them anyway.'), // N
      ], sons: [{ s: 'assets/audio/sfx/pena-papel.mp3', p: 5, v: .8 }] },

    // ----- o elmo: três dias
    { id: 'b05', zona: 'tenda', fundo: { img: IMG('tres-dias'), kb: 'in', foco: '62% 50%', dim: .5, clima: 'velas' }, pulso: 1,
      texto: [
        T('A chuva continua batendo na arena. Eu continuo de pé no meio dela.', 'The rain keeps beating on the arena. I’m still standing in the middle of it.'), // N
        T('Depois, o elmo. Na noite antes da final, ele pesa mais vazio do que na cabeça. Viro ele nas mãos. O forro ainda está úmido.', 'Then, the helmet. On the night before the final, it weighs more empty than on my head. I turn it over in my hands. The lining is still damp.'), // N
        () => (c2().arsenalTrancado ? T('Minha mãe trancou o arsenal e guarda a chave. A armadura veio peça por peça do ferreiro da rua do muro, que não pergunta nada a quem paga adiantado.', 'My mother locked the armoury and keeps the key. The armour came piece by piece from the smith on the street by the wall, who asks nothing of those who pay in advance.')
          : T('A armadura é a de um pajem, esquecida no fundo do arsenal desde antes de eu nascer. O ferreiro da rua do muro apertou o que sobrava sem perguntar nada a quem paga adiantado.', 'The armour is a page’s, forgotten at the back of the armoury since before I was born. The smith on the street by the wall took in what was too loose without asking anything of those who pay in advance.')), // N
        T('Só a correia do elmo ele não terminou de trocar. Depois do Torneio, ele disse.', 'Only the helmet’s strap he didn’t finish replacing. After the Tournament, he said.'), // N
        se(() => !!c2().brancarda, T('Presa no forro, perto da têmpora, uma pétala seca de brancarda. Ninguém vai ver.', 'Tucked into the lining, near the temple, a dried whitebloom petal. Nobody will see it.')), // N
        T('Três dias sem tirar o elmo diante de ninguém. Visto a armadura de madrugada, de costas para a entrada da tenda, e as fivelas das costas eu fecho com um gancho de bota que entortei para isso. Como com o elmo no colo, para pôr de volta antes de engolir. Bebo pela fenda, de cabeça para trás, e metade da água desce pelo pescoço por dentro do gibão.', 'Three days without taking the helmet off in front of anyone. I put on the armour before dawn, with my back to the tent’s entrance, and I fasten the back buckles with a boot hook I bent for it. I eat with the helmet in my lap, to put it back on before I swallow. I drink through the slit, head tipped back, and half the water runs down my neck inside the gambeson.'), // N
        T('Na cavalgada, um escudeiro tenta levantar a minha viseira para me dar água, e eu seguro o pulso dele com tanta força que ele derruba o balde. Peço desculpa baixo, de dentro do elmo. Ele sai olhando para trás.', 'At the riding, a squire tries to lift my visor to give me water, and I grab his wrist so hard he drops the bucket. I apologise quietly, from inside the helmet. He leaves looking back over his shoulder.'), // N
        T('Em três dias, aprendo que o pior inimigo do disfarce não é o olho dos outros. É o meu coração.', 'In three days, I learn that the worst enemy of the disguise isn’t other people’s eyes. It’s my own heart.'), // N
      ] },

    // ----- a vela: a vigília
    { id: 'b06', zona: 'aposentos', fundo: { img: IMG('dolores-aposentos'), kb: 'in', foco: '62% 40%', dim: .5 }, pulso: 1.6, vozAuto: [{ voz: 'vigilia', p: 2 }],
      texto: [
        T('A vela por último. Sete dias antes do Torneio.', 'The candle last. Seven days before the Tournament.'), // N
        T('— Uma vigília — minha mãe repete.', '— A vigil — my mother repeats.'), // N
        T('— Três dias no oratório velho, só pão e água. A rainha Aldis fez assim antes do Torneio do marido. A professora contou. Só saio no fim, para receber o vencedor.', '— Three days in the old oratory, only bread and water. Queen Aldis did it before her husband’s Tournament. The teacher told us. I’ll only come out at the end, to receive the winner.'), // N
        T('Ela larga a carta que estava lendo.', 'She puts down the letter she was reading.'), // N
        () => (promessa() === 'prometer' ? [T('— Você prometeu, e está cumprindo.', '— You promised, and you’re keeping it.'), T('Os olhos dela brilham. Ela segura o meu rosto com as duas mãos, e os polegares passam na minha bochecha do jeito que passavam quando eu tinha febre.', 'Her eyes shine. She holds my face in both hands, and her thumbs move over my cheek the way they did when I had a fever.'), T('— Eu sabia.', '— I knew it.')]
          : promessa() === 'recusar' ? [T('— Você se recusou a me prometer. Eu tranquei o arsenal. E agora quer três dias longe dos meus olhos.', '— You refused to promise me. I locked the armoury. And now you want three days out of my sight.'), T('Ela vai até a janela e fica de costas.', 'She goes to the window and stands with her back to me.')]
            : [T('— Naquela manhã, você não disse sim — ela fala devagar. — E agora quer três dias de joelhos.', '— That morning, you didn’t say yes — she says slowly. — And now you want three days on your knees.'), T('Ela me olha do jeito que olhou as minhas mãos.', 'She looks at me the way she looked at my hands.')]), // N
      ],
      escolha: { id: 'vigilia', pergunta: T('A resposta', 'The answer'), opcoes: [
        { id: 'paz', peso: 1, voz: 'vigilia-paz', txt: T('"Quero chegar ao casamento em paz com Ele."', '"I want to come to the wedding at peace with Him."'), txtNervoso: T('"Quero chegar ao... em paz com Ele."', '"I want to come to the... at peace with Him."'), vozNervosa: 'vigilia-paz-nervosa',
          resultado: (st) => fimVigilia(st), resultadoNervoso: (st) => fimVigilia(st) },
        { id: 'medo', voz: 'vigilia-medo', txt: T('"Rezar é o que eu sei fazer quando tenho medo."', '"Praying is what I know how to do when I’m afraid."'),
          resultado: (st) => fimVigilia(st) },
      ] } },
    { id: 'b07', zona: 'tenda', fundo: () => (comGuarda() ? { img: IMG('capela-guarda'), kb: 'in', foco: '60% 45%', dim: .5 } : { video: VID('tenda-vela'), img: IMG('tenda-objetos'), kb: 'none', foco: '80% 45%', dim: .4, clima: 'velas' }), pulso: .8, vozAuto: [{ voz: 'coragem-tenda', p: -1 }],
      texto: [
        T('A vigília começa na véspera do Torneio. Na primeira noite, saio pela janela dos fundos da capela, que dá para o muro do pomar. A irmã que traz o pão e a água deixa tudo na grade e não olha para dentro. É a regra da vigília.', 'The vigil begins on the eve of the Tournament. On the first night, I climb out of the chapel’s back window, which opens onto the orchard wall. The sister who brings the bread and water leaves it all at the grille and doesn’t look inside. That’s the rule of the vigil.'), // N
        se(() => comGuarda(), T('O guarda fica de pé na frente de uma capela vazia, dia e noite.', 'The guard stands in front of an empty chapel, day and night.')), // N
        T('Três dias, eu disse. O Torneio dura quatro. Antes de sair, deixo com a irmã um bilhete dobrado, para entregar à minha mãe na terceira manhã: o Cavaleiro ainda não me respondeu, preciso de mais um dia. Minha mãe não manda resposta. Manda pôr uma cadeira ao lado da dela na tribuna, para o fim.', 'Three days, I said. The Tournament lasts four. Before I go, I leave the sister a folded note, to give my mother on the third morning: the Knight hasn’t answered me yet, I need one more day. My mother sends no reply. She has a chair set beside hers in the royal box, for the end.'), // N
        se(() => desconfia(), T('No segundo dia, Justine foi à capela pedir para rezar comigo. Não a deixaram entrar. Ela disse, a quem estava na porta, que a vigília de Aldis foi pelo marido morto, não pelo noivo. E foi embora.', 'On the second day, Justine went to the chapel and asked to pray with me. They didn’t let her in. She told whoever was at the door that Aldis’s vigil was for a dead husband, not a groom. And she left.')), // N
        T('Minha mãe acredita que eu estou rezando. Talvez eu esteja.', 'My mother believes I’m praying. Maybe I am.'), // N
        T('Sopro a vela, ajoelho no tapete de couro e peço coragem. É a única coisa que eu sei pedir.', 'I blow out the candle, kneel on the leather rug and ask for courage. It’s the only thing I know how to ask for.'), // N
      ] },

    { id: 'c10', zona: 'chuva', fundo: { video: VID('laura-chuva'), img: IMG('laura-revelada'), kb: 'none', foco: '60% 40%', dim: .4, clima: 'chuva' }, pulso: 3, sons: [{ s: 'assets/audio/sfx/suspiro-multidao.mp3', p: 2, v: .7, fim: true }, { s: 'assets/audio/sfx/elmo-lama.mp3', p: 3, v: .8, fim: true }],
      texto: [
        T('O arauto entra no círculo, o bastão erguido, a boca já aberta para o grito de sempre.', 'The herald steps into the circle, staff raised, his mouth already open for the usual cry.'), // N
        T('— Sangue tirado, combate encerrado! Laus, o Az...', '— Blood drawn, the bout is ended! Laus, the Under...'), // N
        T('Ele para.', 'He stops.'), // N
        T('O gorro de couro foi junto com o elmo, e o meu cabelo caiu inteiro. Está colado no rosto, no pescoço, nas ombreiras, escuro de chuva. O elmo está na lama, de boca para cima, enchendo de água.', 'The leather cap went with the helmet, and all my hair came down. It’s plastered to my face, my neck, my pauldrons, dark with rain. The helmet lies in the mud, mouth up, filling with water.'), // N
        T('Estou de pé no meio do círculo, encharcada, de rosto descoberto diante de Redom inteira.', 'I stand in the middle of the circle, soaked through, my face bare before all of Redom.'), // N
        T('Ninguém fala. Só se ouve a chuva.', 'Nobody speaks. There’s only the rain.'), // N
        (st) => ({ braco: T('No meu braço, o lenço de Justine pinga.', 'On my arm, Justine’s handkerchief drips.'), cabo: T('A mão direita continua fechada no cabo. Por baixo da manopla, o lenço está encharcado, e a mão não soltou.', 'My right hand is still closed on the grip. Under the gauntlet, the handkerchief is soaked, and my hand hasn’t let go.'), peito: T('A mão esquerda sobe sozinha até o peito, onde o lenço está, e fica ali.', 'My left hand rises on its own to my chest, where the handkerchief is, and stays there.') }[lenco(st)] || null), // N
        (st) => {
          const o = { tribuna: T('a cadeira vazia ao lado da minha mãe.', 'the empty chair beside my mother.'), simon: simonSabe() ? T('Simon, atrás da cadeira vazia, com a mão parada no meio do sinal.', 'Simon, behind the empty chair, his hand stopped halfway through the sign.') : T('Simon, inclinado sobre o parapeito, de boca aberta.', 'Simon, leaning over the parapet, mouth open.'), justine: T('Justine.', 'Justine.'), osmund: T('a mesa do Registro. Osmund não fecha os olhos desta vez.', 'the Registry table. Osmund doesn’t close his eyes this time.'), cavaleiro: T('o Cavaleiro de pedra, do outro lado. A chuva escorre pelo rosto dele como pelo meu.', 'the stone Knight, across the arena. The rain runs down his face the way it runs down mine.') }[st.escolhas.olhar];
          return o ? [T('Sem a fenda, a arena é larga demais. Os olhos vão sozinhos para onde foram antes do sino:', 'Without the slit, the arena is too wide. My eyes go on their own to where they went before the bell:'), o] : null;
        }, // N
        T('Na tribuna, minha mãe se inclina sobre o parapeito.', 'In the royal box, my mother leans out over the parapet.'), // N
      ] },

    { id: 'c10b', zona: 'chuva', fundo: { video: VID('justine-de-pe'), img: IMG('laura-revelada'), kb: 'none', foco: '55% 40%', dim: .4, clima: 'chuva' }, pulso: 2.6,
      texto: [(st) => (justineDePe(st) ? T('Lá em cima, no meio de todos sentados, uma pessoa está de pé. Justine. Não sei desde quando.', 'Up there, among everyone seated, one person is standing. Justine. I don’t know since when.')
        : T('Lá em cima, Justine se levanta, devagar. É a primeira.', 'Up there, Justine rises, slowly. She’s the first.')),
        se((st) => lamina(st), T('Lá do alto, alguém diz uma palavra só, e outros repetem, baixo, como quem reza: Lâmina.', 'From high up, someone says a single word, and others repeat it, low, like a prayer: Blade.')),
        se((st) => lamina(st), T('Era assim que chamavam Corwin. Nenhuma espada encostou em mim hoje. Eles contaram.', 'That was what they called Corwin. No sword touched me today. They counted.'))] }, // N

    { id: 'c11', zona: 'chuva', fundo: { video: VID('markus-tira-elmo'), img: IMG('markus-viseira'), kb: 'none', foco: '60% 40%', dim: .4, clima: 'chuva' }, pulso: 2.2, vozAuto: [{ voz: 'obrigada', p: -1 }],
      texto: [
        T('Markus se levanta da pedra devagar, a mão apertando o braço. Olha para mim um tempo. Depois tira o elmo com as duas mãos e o prende embaixo do braço, como manda o costume.', 'Markus gets up off the stone slowly, his hand clamped on his arm. He looks at me a while. Then he takes off his helmet with both hands and tucks it under his arm, as the custom demands.'), // N
        T('Pela primeira vez, o costume acontece inteiro comigo: dois rostos descobertos, um diante do outro.', 'For the first time, the custom happens whole with me: two bare faces, one before the other.'), // N
        T('— Obrigado pelo combate — ele diz.', '— Thank you for the fight — he says.'), // N
        T('— Que vença quem a merece — ele repete, baixo, como quem só agora entende a frase que disse antes do sino.', '— May the one who deserves her win — he repeats, low, like someone only now understanding what he said before the bell.'), // N
        T('A minha voz sai sem o aço na frente, e por um instante eu não reconheço o som dela.', 'My voice comes out with no steel in front of it, and for an instant I don’t recognise the sound of it.'), // N
        T('— Obrigada.', '— Thank you.'), // N
      ] },

    { id: 'c12', zona: 'chuva', fundo: { img: IMG('osmund-pena'), kb: 'in', foco: '60% 45%', dim: .45, clima: 'chuva' }, pulso: 2, vozAuto: (st) => [{ voz: 'nome-laura', p: (st.escolhas.pagamento === 'promessa' || st.escolhas.pagamento === 'confissao') ? 4 : 3 }], sons: [{ s: 'assets/audio/sfx/pena-papel.mp3', p: -1, v: .8 }],
      texto: [
        T('O arauto olha para a tribuna, depois para a mesa do Registro. A voz dele sai fina.', 'The herald looks at the royal box, then at the Registry table. His voice comes out thin.'), // N
        T('— Diante das duas testemunhas... o vencedor diz o próprio nome. Para o livro.', '— Before the two witnesses... the victor speaks his own name. For the book.'), // N
        T('Embaixo da tribuna, Osmund segura a pena em cima da página. A tinta pinga dela na mesa.', 'Below the box, Osmund holds his quill over the page. Ink drips from it onto the table.'), // N
        (st) => (st.escolhas.pagamento === 'promessa' ? T('Ele levanta os olhos da página e me olha. Uma vez. O que for.', 'He lifts his eyes from the page and looks at me. Once. Anything.')
          : st.escolhas.pagamento === 'confissao' ? T('Ao lado da página, o livro das casas mortas, fechado. A mão esquerda dele está em cima, aberta, como quem segura uma coisa que pode voar.', 'Beside the page, the book of dead houses, closed. His left hand lies on it, open, like someone holding down something that might fly away.') : null), // N
        T('— Laura D’Orrose.', '— Laura D’Orrose.'), // N
        T('Não grito. Não preciso. A arena está tão quieta que o meu nome chega até a última fileira e volta. Osmund escreve. A pena arranha duas vezes no L, como da outra vez.', 'I don’t shout. I don’t need to. The arena is so quiet that my name reaches the last row and comes back. Osmund writes. The quill scratches twice on the L, like the other time.'), // N
      ] },

    { id: 'c13', zona: 'chuva', fundo: { video: VID('dolores-levanta'), img: IMG('dolores-de-pe'), kb: 'none', foco: '55% 40%', dim: .4, clima: 'chuva' }, pulso: 2.4, fim: true,
      texto: [
        T('Minha mãe está de pé na tribuna, as mãos, que nunca saem do colo, agarradas ao parapeito. A cadeira ao lado dela continua vazia.', 'My mother is standing in the royal box, her hands, which never leave her lap, gripping the parapet. The chair beside her is still empty.'), // N
        se((st) => st.escolhas.pagamento === 'colar', T('Ela mandou fazer esmeraldas para combinar com os meus olhos. As esmeraldas estão com Osmund. Os olhos, ela está vendo agora.', 'She had emeralds made to match my eyes. The emeralds are with Osmund. The eyes, she’s seeing now.')), // N
        () => (simonSabe() ? T('Atrás dela, Simon tapa a própria boca com a mão, como eu tapei a dele no laranjal, e ri.', 'Behind her, Simon covers his own mouth with his hand, the way I covered his in the orangery, and laughs.')
          : T('Atrás dela, Simon está com as duas mãos na cabeça.', 'Behind her, Simon has both hands on his head.')), // N
        se((st) => !!st.f.josephDesconfia, T('Na boca do túnel, Joseph ergue o odre na minha direção, devagar, como quem brinda a uma aposta que ganhou sozinho.', 'At the mouth of the tunnel, Joseph raises his wineskin toward me, slowly, like a man toasting a bet he won alone.')), // N
        se((st) => st.escolhas.piada === 'piada', T('Na galeria, o cavaleiro de barba ruiva está de boca aberta. Tenho medo de que se apaixonem, eu disse a ele. Ele lembra. Dá para ver que lembra.', 'In the gallery, the red-bearded knight’s mouth is hanging open. I’m afraid they’ll fall in love with me, I told him. He remembers. You can see he remembers.')), // N
        T('O arauto ergue o bastão e faz o que fez a vida inteira. Começa a lei.', 'The herald raises his staff and does what he has done all his life. He begins the law.'), // N
        T('— Pela lei de Redom, aquele que vence o Torneio Real é o General-Rei, e toma por esposa a Mãe-Rainha...', '— By the law of Redom, he who wins the Royal Tournament is the General-King, and takes to wife the Mother-Queen...'), // N
        T('A Mãe-Rainha escolhida sou eu.', 'The chosen Mother-Queen is me.'), // N
        T('Ele também sabe. Para no meio, a boca aberta, o bastão no ar, a chuva escorrendo pelo braço dele até o cotovelo.', 'He knows it too. He stops halfway, mouth open, staff in the air, the rain running down his arm to the elbow.'), // N
        se(() => !!c2().perguntouOutro, T('Um mês atrás, com alfinetes no vestido, perguntei à minha mãe: e se outro vencer? Ela disse que eu me casaria com outro. Não venceu outro.', 'A month ago, with pins in my gown, I asked my mother: what if someone else wins? She said I’d marry someone else. No one else won.')), // N
        T('O elmo continua na lama. Não me abaixo para pegar.', 'The helmet is still in the mud. I don’t bend to pick it up.'), // N
        T('Ninguém em Redom sabe o que vem agora. Eu também não.', 'Nobody in Redom knows what comes now. Neither do I.'), // N
        T('Respiro. Cheira a chuva.', 'I breathe. It smells of rain.'), // N
      ] },
  ],

  // ---------------------------------------------------------------- o que este capítulo deixa para os próximos
  estadoFinal: (st) => ({
    peso: st.peso, bpm: st.bpm, pagamento: st.escolhas.pagamento || null, assistiu: assistiu(st), lenco: lenco(st), vigilia: st.escolhas.vigilia || null,
    simonSabe: simonSabe(), simonAjudou: simonVem(st), justineDePe: justineDePe(st), olhar: st.escolhas.olhar || null,
    misericordia: !!(st.arena && st.arena.markus && st.arena.markus.misericordia), nome: 'laura', titulo: lamina(st) ? 'lamina' : null, josephDesconfia: !!st.f.josephDesconfia, escudeiroOuviu: !!st.f.escudeiroOuviu, placarDesconfia: !!st.f.placarDesconfia, deslizes: st.deslizes || 0, comeu: st.escolhas.comer === 'comer', arqueria: st.arqueria || null,
    arena: st.arena || null, passos: st.passos || null, pontos: st.pontos || null, escolhas: st.escolhas,
  }),

  // ---------------------------------------------------------------- pontuação escondida
  pontos: (st) => {
    const j = (st.arena && st.arena.joseph) || {}, m = (st.arena && st.arena.markus) || {};
    const pj = Math.max(1500, Math.round(1200 * (j.leituras || 0) + 2500 * (j.esperouErro ? 1 : 0) + 3000 * (j.laterais ? 1 : 0) - 1500 * (j.escudosPerdidos || 0) - 5000 * (j.tentativas || 0) + ((j.escudosPerdidos || 0) === 0 ? 6000 : 0)));
    const pm = Math.max(3000, Math.round(500 * (m.leituras || 0) + 1000 * (m.laterais || 0) + 1500 * (m.fintasLidas || 0) + (m.contagemUm ? 8000 : 0) - 3000 * (m.misericordia || 0) - 1500 * (m.escudosPerdidos || 0) - 6000 * (m.tentativas || 0) + ((m.escudosPerdidos || 0) === 0 ? 12000 : 0)));
    const ps = (st.passos || []).reduce((a, p) => a + Math.min(3000, 230 * (p.firmes || 0) + 90 * (p.quase || 0)), 0);
    const medias = [j.bpmMedio, m.bpmMedio].filter(Number.isFinite);
    const pc = medias.length ? Math.round(Math.max(0, 150 - medias.reduce((a, b) => a + b, 0) / medias.length) * 60) : 0;
    const pa = st.amolar ? Math.max(500, 2500 - 400 * (st.amolar.tentativas || 0)) : 0;
    const paq = st.arqueria ? 300 * (st.arqueria.total || 0) : 0;
    return { total: paq + pj + pm + ps + pc + pa, partes: [['arqueria', paq], ['joseph', pj], ['markus', pm], ['passos', ps], ['coracao', pc], ['amolar', pa]] };
  },

  // ---------------------------------------------------------------- tela final
  resumo: (st, lang) => {
    const pt = lang !== 'en', L = (a, b) => (pt ? a : b);
    const frase = L('Laura venceu o Torneio Real. Disse o próprio nome diante de Redom inteira, e o elmo ficou na lama.', 'Laura won the Royal Tournament. She spoke her own name before all of Redom, and the helmet stayed in the mud.');
    const notas = [];
    if (lamina(st)) notas.push(L('★ Lâmina. Nenhuma espada encostou nela na final. Foi a primeira vez que alguém a chamou assim. Antes dela, só Corwin.', '★ Blade. No sword touched her in the final. It was the first time anyone called her that. Before her, only Corwin.'));
    if (st.f.josephDesconfia) notas.push(L('Joseph ouviu a voz escorregar, e não esqueceu.', 'Joseph heard the voice slip, and didn’t forget.'));
    if (st.f.escudeiroOuviu) notas.push(L('O escudeiro de Markus levou ao seu senhor uma palavra que não devia.', 'Markus’s squire carried a word to his master that he shouldn’t have.'));
    if (st.f.placarDesconfia) notas.push(L('O oficial do placar escreveu Laus devagar, e olhou duas vezes para a fenda do elmo.', 'The scorekeeper wrote Laus slowly, and looked twice into the slit of the helmet.'));
    const pg = st.escolhas.pagamento;
    const pgNota = { colar: L('Osmund guarda o colar de esmeraldas do casamento.', 'Osmund keeps the emerald wedding necklace.'), promessa: L('Osmund guarda, dentro do livro, uma promessa de rainha. Uma vez. O que for.', 'Osmund keeps a queen’s promise, folded inside his book. Once. Anything.'), confissao: L('Osmund guarda, entre as casas mortas, uma confissão assinada por ela.', 'Osmund keeps, among the dead houses, a confession in her own hand.') }[pg];
    if (pgNota) notas.push(pgNota);
    const m = (st.arena && st.arena.markus) || {};
    notas.push(m.misericordia ? L('Markus esperou por ela uma vez, e a arena o aplaudiu.', 'Markus waited for her once, and the arena applauded him.') : L('Markus nunca precisou esperar por ela.', 'Markus never had to wait for her.'));
    notas.push(justineDePe(st) ? L('Justine estava de pé antes de o elmo cair.', 'Justine was on her feet before the helmet fell.') : L('Justine foi a primeira a se levantar.', 'Justine was the first to rise.'));
    if (simonSabe()) notas.push(simonVem(st) ? L('Simon apertou as fivelas antes do sol. Sabia, e riu atrás da mão.', 'Simon tightened the buckles before sunrise. He knew, and laughed behind his hand.') : L('Simon foi mandado embora da tenda. Sabia, e riu atrás da mão.', 'Simon was sent away from the tent. He knew, and laughed behind his hand.'));
    const d = st.deslizes || 0;
    const notou = st.f.josephDesconfia || st.f.escudeiroOuviu || st.f.placarDesconfia;
    notas.push(d === 0 ? L('A máscara não escorregou nenhuma vez antes do elmo cair.', 'The mask never slipped before the helmet fell.')
      : (d === 1 ? L('A máscara escorregou uma vez', 'The mask slipped once') : L(`A máscara escorregou ${d} vezes`, `The mask slipped ${d} times`)) + (notou ? L(' antes do elmo cair.', ' before the helmet fell.') : L(', e ninguém percebeu.', ', and nobody noticed.')));
    const linhas = [
      { id: 'assistir', opcao: st.escolhas.assistir, q: L('A semifinal de Markus', 'Markus’s semifinal'), a: assistiu(st) ? L('Assistiu da galeria', 'Watched from the gallery') : L('Dormiu', 'Slept') },
      { id: 'pagamento', opcao: pg, q: L('O preço de Osmund', 'Osmund’s price'), a: { colar: L('O colar do casamento', 'The wedding necklace'), promessa: L('Uma promessa de rainha', 'A queen’s promise'), confissao: L('Uma confissão assinada', 'A signed confession') }[pg] || '—' },
      { id: 'vigilia', opcao: st.escolhas.vigilia, q: L('A mentira da vigília', 'The vigil lie'), a: { paz: L('"Em paz com Ele"', '"At peace with Him"'), medo: L('"Quando tenho medo"', '"When I’m afraid"') }[st.escolhas.vigilia] || '—' },
      { id: 'olhar', opcao: st.escolhas.olhar || 'nenhum', q: L('Pela fenda do elmo', 'Through the helmet’s slit'), a: { tribuna: L('A cadeira vazia', 'The empty chair'), simon: 'Simon', justine: 'Justine', osmund: 'Osmund', cavaleiro: L('O Cavaleiro de pedra', 'The stone Knight') }[st.escolhas.olhar] || L('Não deu tempo de olhar', 'No time to look') },
    ];
    if (st.escolhas.lenco4) linhas.splice(1, 0, { id: 'lenco4', opcao: st.escolhas.lenco4, q: L('O lenço de Justine', 'Justine’s handkerchief'), a: { braco: L('No braço, à vista', 'On her arm, in plain sight'), cabo: L('No cabo da espada', 'Round the sword’s grip'), peito: L('No peito', 'Against her chest') }[st.escolhas.lenco4] });
    return { frase, notas, linhas };
  },
};

function fimJoseph() {
  return [T('Não digo por gentileza, ou não só por gentileza. O que acabei de sentir nesse círculo, eu não sabia que existia, e ele faz parte disso.', 'I don’t say it out of courtesy, or not only out of courtesy. What I just felt in that circle, I didn’t know existed, and he is part of it.'), // M
    T('Ele resmunga algo que não chega a ser resposta. Um escudeiro chega para carregá-lo até a tenda dos curandeiros, e a confusão do momento engole o espaço onde o costume devia ter acontecido: o público ainda gritando, o arauto já anunciando o próximo confronto, alguém puxando meu braço para fora do círculo. Ninguém parece notar o que faltou.', 'He grunts something that doesn’t quite become an answer. A squire comes to carry him to the healers’ tent, and the confusion of the moment swallows the space where the custom should have happened: the crowd still shouting, the herald already announcing the next bout, someone pulling my arm out of the circle. Nobody seems to notice what was missing.')]; // M
}
function fimVigilia(st) {
  const r = promessa() === 'recusar'
    ? [T('— Três dias. Com um guarda na porta da capela, dia e noite.', '— Three days. With a guard at the chapel door, day and night.')]
    : [T('Ela demora. Depois beija a minha testa.', 'She takes her time. Then she kisses my forehead.'), T('— Três dias. E no fim você desce, de vestido, e sorri para ele.', '— Three days. And at the end you come down, in your gown, and you smile at him.')];
  if (c2().visto) r.push(T('— E o guarda vai ser o da ronda. O que viu duas sombras no jardim. Ele não esquece um passo.', '— And the guard will be the one from the night round. The one who saw two shadows in the garden. He never forgets a step.'));
  else if (promessa() !== 'recusar' && comGuarda()) r.push(T('— E um guarda na porta.', '— And a guard at the door.'));
  return r;
}
