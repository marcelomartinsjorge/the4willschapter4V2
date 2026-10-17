# Capítulo IV · v9 · As Provas

Este documento descreve o desenho completo da Parte I, com as quatro provas, as cenas entre elas, a torcida e a eliminação. Também lista tudo o que você precisa criar: imagens, vídeos, sons e dublagens.

**Já implementado nesta entrega:**
- a prova escrita;
- a cena do filho dos Varr pedindo a resposta.

**Ainda por implementar, quando a mídia chegar:** todo o resto.

---

## 0. A lore não muda

O Cap. II não tem nenhuma linha sobre as provas, então ele fica intocado. A ordem é a que o Cap. IV já conta:

| Dia | Prova | Estado |
|---|---|---|
| 1, manhã | Arqueria | minijogo existe |
| 1, tarde | Prova dos escribas (lógica, estratégia, primeiros socorros, história) | **minijogo novo, pronto** |
| 2 | Cavalgada: o circuito em volta da arena, com estacas, valas e um muro baixo | minijogo a fazer |
| 3, manhã | Quintana: o boneco com escudo e saco de areia | minijogo a fazer |
| 3, meio-dia | Os marechais somam os pontos | tela nova: a torcida e a eliminação |

Duas falas dubladas que não mudam, e o desenho respeita as duas:
- **a01:** "o meu vem em terceiro". Quem passa sempre entra em terceiro na semifinal. A faixa da torcida muda o que vem depois dessa linha, nunca ela.
- **i01:** a narração da abertura.

---

## 1. Pontos, torcida e eliminação

Cada prova vale até 25 pontos, e a soma vai de 0 a 100.

| Prova | Como vira ponto |
|---|---|
| Arqueria | total do minijogo (0 a 30) × 25/30 |
| Escrita | 6,25 por resposta certa (4 perguntas) |
| Cavalgada | tempo, obstáculos limpos e quedas (seção 4) |
| Quintana | centro, velocidade e o saco de areia (seção 5) |

As cenas de decisão também mexem na torcida (+/−), sem mexer nos pontos.

| Soma | Faixa | O que acontece |
|---|---|---|
| menos de 35 | **Eliminado** | Tela "Laus não está entre os quatro". O capítulo recomeça do início, com a mesma lógica da derrota na luta. |
| 35 a 59 | **X · Azarão** | A arquibancada torce para Joseph. Laura entra na primeira luta com +12 de coração. A cada golpe que ela leva, a vaia sobe mais o coração. |
| 60 a 79 | **Y · Dividida** | A arquibancada fica com ela contra Joseph e com Markus contra ela. Contra Joseph começa calma (−6); contra Markus, +8. |
| 80 ou mais | **Z · A fileira inteira** | A arquibancada é dela até contra Markus. Começa as duas lutas mais calma, e o anel de tempo fica 10% mais largo. |

Na faixa Z o povo grita **Azarão** a favor dela, como a fileira inteira da quintana. **Lâmina** continua sendo só a recompensa da luta com Markus sem nenhuma espada encostar nela.

**O que a torcida muda na luta:**
- o coração inicial;
- quanto o coração sobe a cada golpe;
- a largura do anel;
- o som: vaia ou grito de "Azarão".

A arena já tem tudo isso: o coração, o anel e a multidão. A faixa só regula os números.

---

## 2. Arqueria (já existe)

O minijogo fica como está. Só entra a conversão para pontos e a cena seguinte.

### Cena T1 · A flecha de Markus

Depois da arqueria, Markus atira logo em seguida. Na volta, ele pega do chão a flecha de Laus que fugiu para a palha e estende para ele, pela ponta, com o cabo virado para Laus.

**Decisão:**

| Opção | O que acontece | Consequência |
|---|---|---|
| Agradecer com o elmo, um aceno curto | — | Markus +1 de respeito |
| Dizer "Obrigado." | Usa o deslize que já existe: com o coração alto, a voz pode sair fina. Laus fala no masculino, porque é o disfarce. | Firme: Markus +2. Tremida: Markus nota a voz, e isso volta na tenda dos curandeiros da Parte VI. |
| Pegar a flecha sem olhar para ele | — | Markus 0 e torcida −1, porque a arquibancada vê |

Só aparece se ela errou pelo menos uma flecha. Com as três dentro, Markus só bate dois dedos no próprio peito ao passar, sem decisão.

---

## 3. A prova dos escribas (pronta)

**Como funciona:**
- Quatro perguntas, respondidas por escrito no teclado. Aceita português e inglês em qualquer idioma do livro.
- Uma vela marca 170 segundos para a prova inteira.
- Resposta confirmada não volta mais. A tela pergunta "A tinta não sai. Escrever assim?" antes de gravar.

**Lembrar:**
- Abre a mesa da Mestra Hadasa do Cap. II em sépia, com a imagem `mesa-estudos` do Cap. II.
- São três lembranças na prova inteira. Enquanto a mesa está aberta, a vela da prova queima mais devagar.
- Cada item lembrado fica na tela por uma vela curta: 9,5 segundos, ou 15 se ela leu aquele item na aula do Cap. II. O item lido vem marcado "você leu isto na aula".
- Há duas armadilhas boas. **Justine** gasta uma lembrança mostrando a pena entre os dentes, deixa o rosto quente e sobe o coração. **A janela** mostra Simon errando o pé de trás. Nenhuma das duas está na prova, e as duas aparecem depois no texto.

**As respostas aceitas:**

| Pergunta | Certo | Errado |
|---|---|---|
| Lógica · as moedas | "duas", "2", "dois", "two", "duas pesagens" | "3", "2 ou 3" |
| Estratégia · a ponte | "3", "três", "three", "três de cada vez" | "30", "100" |
| Primeiros socorros · o garrote | "acima", "acima do corte", "above", "entre a ferida e o coração", "mais perto do coração" | "em cima do corte", "abaixo", "on the cut" |
| História · Corwin | "nenhuma", "0", "none", "no sword", "nem uma" | "uma", "1" |

O texto depois da prova muda com o número de acertos e com o que ela lembrou. As linhas antigas da letra que escapou e de "Justine saberia" continuam.

### Cena T2 · O filho dos Varr (pronta)

Ele cochicha: "— Merrow. As moedas. Quantas?"

| Opção | Consequência agora | Consequência futura |
|---|---|---|
| Escrever a resposta no canto da folha | Laura raspa o número depois. | Na fogueira (T3), ele chama Laus para o fogo. Torcida +1, porque a família Varr grita alto. |
| Balançar o elmo | Ele escreve três, risca, escreve quatro. | Ele perde pontos sozinho. |
| Escrever um número errado | Ela lê a mesma linha três vezes. | No meio-dia da soma, ele descobre e encara Laus. Na semifinal dele contra Markus, a irmã Maud não grita mais o nome dele. Joseph ri dele na fogueira, e Laura ouve. |

---

## 4. Noite 1 e manhã do dia 2

### T3 · A fogueira (a página que já existe, com um desvio)

Se ela ajudou o filho dos Varr, ele chama da fogueira: "— Merrow! Senta aqui." É a primeira vez que alguém chama o Azarão para o fogo, e a linha "Ninguém me chama para o fogo" deixa de ser verdade.

**Decisão:**
- **Sentar no fogo de elmo:** os outros riem e oferecem caneca. Ela aprende uma coisa da cavalgada: o escudeiro de Joseph mexe nas cilhas dos outros. Isso abre a opção certa em T4.
- **Recusar com a mão:** fica como hoje.

### T4 · A estrebaria, de madrugada (nova)

O cavalo emprestado é cinza, malhado, com uma orelha cortada. O cavalariço diz o nome dele. Sugestão de nome: **Cinza**, ou outro que você escolher.

Antes de o marechal chamar, dá tempo de fazer **uma** coisa:

| Opção | Efeito na cavalgada |
|---|---|
| Dar o pão do café ao cavalo | O medo do cavalo começa mais baixo. |
| Conferir a cilha | Ela acha a correia meio cortada e troca. Sem isso, a sela escorrega na metade do circuito, e é preciso segurar o equilíbrio. Se ela sentou no fogo em T3, essa opção vem marcada. |
| Encostar o elmo no pescoço dele e respirar junto | O cavalo começa no ritmo dela: o primeiro compasso do galope vem mais fácil e o coração de Laura cai. |

---

## 5. A Cavalgada · minijogo (dia 2)

Visão de lado, com rolagem, como em Excitebike. São três voltas curtas em volta da arena, ou uma volta longa com 6 obstáculos: estaca, vala, estaca, muro baixo, vala, estaca.

**Os mecanismos:**

1. **Galope no compasso** (Uma Machine e Gallop Racer). Um anel pulsa no ritmo do casco, e você toca no tempo. Tocar no tempo acelera o cavalo; fora do tempo, ele perde a passada e desacelera. Tocar muito rápido não adianta, só no tempo.
2. **Esporas** (as cenouras da Epona). São três. Cada espora dá um arranque de 2 segundos e recarrega em 6. Gastar as três seguidas faz o cavalo empinar.
3. **Medo do cavalo** (o motor que superaquece em Excitebike). Uma barra que sobe com espora, toque fora do tempo, vaia e o coração de Laura acima de 120. Cheia, o cavalo **refuga** no próximo obstáculo: para, empina e perde 4 segundos. Para baixar, você **segura** o botão de respirar, o mesmo da tenda: o cavalo trota e perde velocidade.
4. **Salto.** Uma marca no chão antes de cada obstáculo. Tocar na marca salta limpo. Cedo demais, derruba a estaca: −2 pontos e a arquibancada ri. Tarde demais, o cavalo bate e Laura quase cai, com um anel rápido para segurar a crina.
5. **Faixas.** Seta para cima ou para baixo troca entre a de dentro (mais curta, com lama que tira velocidade) e a de fora (mais longa, chão firme).
6. **O fantasma de Markus.** Uma silhueta vermelha e apagada faz o tempo dele. Não é obrigatório vencer; é a régua.
7. **Sela solta**, só se ela não conferiu a cilha. Na metade, a tela inclina, e você segura para o lado oposto por 3 segundos.

**Pontos (0 a 25):** tempo (até 12) + obstáculos limpos (até 9) + sem refugar (4) − quedas.

**Controles:** tocar ou espaço para o galope e o salto; segurar para respirar; deslizar ou setas para trocar de faixa; um botão separado para a espora.

### T5 · Depois da cavalgada · O escudeiro de Joseph

Na saída do circuito, o escudeiro de Joseph enrola um chicote e sorri para o cavalo dela. Se ela achou a cilha cortada, sabe quem foi. Se não achou, a sela escorregou, e ela suspeita.

**Decisão:**

| Opção | O que acontece | Consequência |
|---|---|---|
| Denunciar ao marechal | Precisa falar, com risco de deslize (fala dublada nova, com filtro de elmo). | O marechal tira o escudeiro da arena. Torcida +1. Joseph passa a desconfiar de Laus, a flag que já existe. |
| Calar | — | Nada agora. Na luta, Joseph sorri mais. Texto apenas. |
| Pendurar a correia cortada na estaca da tenda de Joseph | Sem falar nada. | Joseph vê de manhã. Na luta, ele abre com o golpe largo duas vezes, nervoso, e fica mais fácil de ler. |

---

## 6. Noite 2

### T6 · A tenda

É uma página de respiro, sem decisão. Laura passa unguento nas coxas assadas da sela, e a mão treme do galope. Se ela deu o pão ao cavalo, pensa que comeu menos que ele hoje.

Se Simon sabe do segredo (Cap. II), é aqui que ele aparece pela primeira vez no Cap. IV. Ele traz uma maçã, "para o cavalo, não para você", e conta que Joseph apostou na taverna que Laus cai da quintana. Isso põe Simon no capítulo antes da tenda da noite da final, onde ele já aparece hoje.

---

## 7. A Quintana · minijogo (dia 3)

Primeira pessoa, como na justa de Defender of the Crown. São três passadas.

1. **A corrida.** O boneco cresce no centro da tela, e o galope do minijogo anterior volta em versão curta: 4 compassos. Quanto melhor o compasso, maior a **força**.
2. **A mira.** A ponta da lança balança com o galope e com o coração. Você segura ou arrasta a ponta para o centro do escudo.
3. **O golpe.** Solta no anel que fecha, o mesmo da arena. O resultado depende de onde e de com quanta força:

| Golpe | Resultado |
|---|---|
| Centro com força | O boneco balança inteiro e a arquibancada conta junto. É o máximo de pontos. |
| Centro sem força | O boneco só balança, "como quem concorda". Pontos médios. É o texto que já existe. |
| Fora do centro | O boneco **gira**, e o saco vem buscar a nuca. Um aviso rápido aparece para abaixar. Abaixou: a arquibancada aplaude. Não abaixou: leva o saco, perde pontos, o coração sobe e a arquibancada ri. |

**Pontos (0 a 25):** soma das três passadas.

A página da quintana, que hoje é narrada, passa a variar com o resultado. As linhas que existem continuam como possibilidades: "Eu não tenho força para fazer o boneco girar. Tenho a mira."

### T7 · Depois da última passada

A arquibancada grita "Azarão". Se a soma está alta, é uma fileira inteira.

**Decisão:**

| Opção | Consequência |
|---|---|
| Erguer a lança para a tribuna | Torcida +1. Dolores vê Laus erguer a lança para a tribuna dela. É um texto curto na Parte III. |
| Baixar a lança e sair a passo, como Markus faria | Markus +1. Ele bate dois dedos no peito. |

---

## 8. Meio-dia · A soma (tela nova)

Os marechais leem os pontos em voz alta. Cada nome é um pergaminho pregado numa coluna, e são onze colunas, como o texto já conta.

- **Eliminado:** "Laus" vem em quinto. A arquibancada já está indo embora. Tela de fim, com um botão para recomeçar o capítulo, igual à derrota da arena, mas em pergaminho.
- **Passou:** a faixa X, Y ou Z aparece como **reação da arquibancada**, sem número. É um parágrafo em cada faixa, e a faixa vira variável do capítulo.

---

## 9. O que você precisa criar

Todos os prompts estão em inglês. Os vídeos curtos precisam de duas versões, `.mp4` e `.webm`; se mandar só o `.mp4`, eu converto. Para as silhuetas, eu recorto os quadros e transformo em sprites. Por isso o fundo dos vídeos de sprite precisa ser **liso**, como verde ou cinza claro, com câmera parada e o cavalo de perfil.

### 9.1 Cavalgada · sprites (vídeo vira silhueta)

| Arquivo | Prompt |
|---|---|
| `cav-galope.mp4` (loop, 2 s) | `Side view, locked camera, full body of a grey dappled warhorse with one notched ear galloping in place on a treadmill-like loop, ridden by a small armored knight in a closed great helm and plain white surcoat with a grey heron emblem, against a flat solid light-grey studio background, even lighting, no shadows on the background, seamless gallop cycle, 2 seconds` |
| `cav-salto.mp4` (2 s) | `Side view, locked camera, the same grey dappled warhorse with a small armored knight in a closed great helm jumping cleanly over an invisible low obstacle, full arc from takeoff to landing, flat solid light-grey studio background, even lighting, 2 seconds` |
| `cav-refuga.mp4` (2 s) | `Side view, locked camera, the same grey dappled warhorse refusing a jump: it stops abruptly, rears up on its hind legs, the small armored rider in a closed great helm clinging to the mane, flat solid light-grey studio background, 2 seconds` |
| `cav-trote.mp4` (loop, 2 s) | `Side view, locked camera, the same grey dappled warhorse trotting slowly and calmly, the small armored rider in a closed great helm leaning forward with a hand on the horse's neck, flat solid light-grey background, seamless loop, 2 seconds` |
| `cav-markus.mp4` (loop, 2 s, o fantasma) | `Side view, locked camera, a large black warhorse galloping, ridden by a tall knight in steel plate and a red surcoat with a gold eight-pointed star, flat solid light-grey studio background, seamless gallop cycle, 2 seconds` |

### 9.2 Cavalgada · cenário (camadas de paralaxe, panorâmicas)

| Arquivo | Prompt |
|---|---|
| `cav-fundo.jpg` (3:1, bem largo) | `Ultra-wide panoramic side view of a medieval tournament arena's outer riding circuit on an overcast morning, packed wooden stands with crowds and red banners with a white sword-and-scales emblem in the distance, a stone wall, no riders, painterly realism, horizon at two thirds height, 3:1` |
| `cav-chao.png` (faixa larga, fundo transparente ou verde) | `Ultra-wide side view strip of a packed dirt riding track with hoof marks, a muddy inner edge and a firm outer edge, seen exactly from the side at ground level, flat lighting, seamless tileable horizontally` |
| `cav-obstaculos.png` (uma folha com os 3) | `Three separate medieval riding-course obstacles in side view on a flat light-grey background, evenly spaced: a low post-and-rail of sharpened wooden stakes, a shallow muddy ditch with planked edges, a low dry-stone wall, plain even lighting, no people` |

### 9.3 Quintana

| Arquivo | Prompt |
|---|---|
| `quintana-pov.jpg` | `First-person view from horseback at the start of a tilting lane in a medieval tournament arena, a wooden quintain far ahead at the end of the lane: a carved wooden figure on a post holding a round shield in one arm and a hanging sandbag on the other, stands with crowd on both sides, overcast light, painterly realism, 16:9` |
| `quintana-boneco.png` (recorte) | `Front view of a wooden quintain figure on a post, crude carved head, a round painted shield with a red target on the left arm, a heavy leather sandbag hanging from a chain on the right arm, isolated on a flat light-grey background, even lighting` |
| `quintana-lanca.png` (recorte) | `First-person view of a long wooden jousting lance held couched under a steel-gauntleted right arm, pointing forward and slightly to the left, isolated on a flat light-grey background, lance tip at upper center` |
| `quintana-gira.mp4` (2 s) | `A wooden quintain figure spinning fast on its post after being struck off-center, the heavy sandbag on its other arm swinging around in a wide arc toward the camera, medieval arena, overcast, slow motion, 2 seconds` |

### 9.4 Imagens das cenas

| Arquivo | Cena | Prompt |
|---|---|---|
| `markus-flecha.jpg` | T1 | `Medieval archery range at a tournament, a tall knight in plate with a red surcoat and a gold eight-pointed star, helmet under his arm, short dark brown hair and stubble, holding out an arrow by its point, fletching first, to a much smaller knight in a closed great helm and white surcoat with a grey heron emblem, straw targets behind, overcast, painterly realism, 16:9` |
| `fogueira-varr.jpg` | T3 | `Night camp of tournament knights around a big fire, helmets off, tankards, laughter, a broad young knight with a blond beard beckoning toward the viewer, the viewer's side dark, painterly realism, warm firelight, 16:9` |
| `estrebaria.jpg` | T4 | `Medieval tournament stable at dawn, cold blue light through the slats, a grey dappled warhorse with one notched ear in a stall, a saddle on the rail, a small knight in a closed great helm standing close with a gloved hand on the horse's neck, breath steaming, painterly realism, 16:9` |
| `cilha-cortada.jpg` | T4 | `Extreme close-up of a leather saddle girth strap, half cut through cleanly with a blade near the buckle, straw and hoof dust around, cold dawn light, a steel-gauntleted hand holding it, shallow depth of field, 16:9` |
| `escudeiro-chicote.jpg` | T5 | `A smirking young squire in dark blue livery with a white scales emblem coiling a riding whip at the edge of a medieval riding circuit, horses and dust behind him, overcast, painterly realism, 16:9` |
| `quintana-saudacao.jpg` | T7 | `A small knight in a closed great helm on a grey dappled horse raising a jousting lance toward the royal box of a medieval arena, the crowd on their feet, red banners, overcast light breaking, painterly realism, 16:9` |
| `soma-colunas.jpg` | soma | `Eleven wooden columns beneath medieval tournament stands, each with a parchment nailed to it with names and scores in ink, marshals in tabards reading them aloud, knights waiting below, noon light, painterly realism, 16:9` |
| `eliminado.jpg` | eliminação | `A small knight in a closed great helm walking alone out of a medieval arena tunnel, back to the camera, the stands half empty behind, long shadow, overcast, melancholy, painterly realism, 16:9` |

### 9.5 Sons

| Arquivo | Prompt |
|---|---|
| `sfx/galope-loop.mp3` | `Single horse galloping on packed dirt, steady four-beat rhythm, close, seamless loop, 4 seconds` |
| `sfx/trote-loop.mp3` | `Single horse trotting slowly on packed dirt, steady two-beat rhythm, close, seamless loop, 4 seconds` |
| `sfx/cavalo-bufa.mp3` | `A nervous horse snorting twice through the nose, close, 2 seconds` |
| `sfx/cavalo-refuga.mp3` | `A horse rearing and whinnying in protest, hooves scraping, close, 3 seconds` |
| `sfx/salto-pouso.mp3` | `A horse landing heavily after a jump, hooves thudding on dirt, tack jingling, 1.5 seconds` |
| `sfx/estaca-cai.mp3` | `Wooden stakes knocked over and clattering on the ground, 1.5 seconds` |
| `sfx/espora.mp3` | `Rider's heels striking a horse's flanks with a short leather slap and a jingle of spurs, 1 second` |
| `sfx/quintana-escudo.mp3` | `A wooden lance striking a wooden shield dead center, heavy hollow thunk, 1 second` |
| `sfx/quintana-gira.mp3` | `A wooden quintain spinning on its post with a creak, then a heavy sandbag whooshing past, 2 seconds` |
| `sfx/saco-nuca.mp3` | `A heavy sandbag hitting a steel helmet from behind, dull clang, a grunt, 1.5 seconds` |
| `sfx/multidao-ri.mp3` | `A large medieval arena crowd bursting into laughter, 3 seconds` |
| `sfx/multidao-vaia.mp3` | `A large arena crowd booing and jeering, 4 seconds` |
| `sfx/multidao-azarao.mp3` | `A large arena crowd chanting a two-syllable name in rhythm, rising, 5 seconds` |

### 9.6 Dublagem nova (só Laura, em inglês)

As quatro primeiras são com Laura de elmo, então **com o filtro de elmo**.

| Arquivo | Fala | Onde | Direção |
|---|---|---|---|
| `obrigado-flecha.mp3` | "Thanks." | T1, firme | Grave de propósito, curta. É o disfarce. |
| `obrigado-flecha-tremida.mp3` | "Th... thanks." | T1, tremida | A voz falha para cima no meio. |
| `calma-cavalo.mp3` | "Easy. Easy, now." | T4, respirar junto | Sussurro, colado no pescoço do cavalo. |
| `cilha-marechal.mp3` | "His squire cut my girth." | T5, denunciar | Grave, sem pressa. Cada palavra pesa. |
| `merrow-fogo.mp3` | "Just one." | T3, sentar no fogo, aceitando a caneca | Seca, quase rindo. |

---

## 10. Ordem de trabalho

1. **Agora:** prova escrita e cena dos Varr, prontas nesta entrega.
2. **Sem mídia nova:** o sistema de pontos, a torcida, a eliminação e a tela da soma. Posso fazer já, com imagens de reserva.
3. **Quando chegarem os vídeos de sprite e o cenário:** a cavalgada e as cenas T4 e T5.
4. **Quando chegar a quintana:** o minijogo e a cena T7.
5. **As cenas T1, T3 e T6:** posso escrever já, com imagens de reserva.

Cada linha nova passa pelo processo de sempre: rascunho de IA, depois a voz da Laura, depois a comparação.
