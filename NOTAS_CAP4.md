# Capítulo IV (Laus, o Azarão) · Notas

## Versão 9.7 (segundo check: texto e jogo, 23/10)

Aplicado tudo o que estava no REVISAO_CAP4_v2_TEXTO_E_JOGO.md, com D1 = (a) e D2 = botão "Treinar". Nenhum texto dublado mudou.

**Jogo**
- **G1 · aviso da eliminação:** no depois da cavalgada, se arqueria + escrita + cavalgada < 25: "Na tábua dos marechais, Merrow está entre os últimos. A quintana decide." A eliminação (total < 35) continua recomeçando o capítulo.
- **D2 · arqueria com "Treinar":** tela inicial igual à da cavalgada e da quintana. O treino é uma flecha que não conta (nem pontos, nem coração); depois, "Treinar de novo" ou "Agora vale".
- **G3 · amolar:** o toque só pega a pedra se cair até 8% dela; longe, a pedra pulsa e nada conta como erro.
- **G4 · depois do amolar** em três versões: sem erro (o texto antigo), 1–2 erros ("o fio está bom. Não está perfeito"), 3+ erros ("A pedra escapou da lâmina três vezes…").
- **Novo · o fio da espada** (ideia do Marcelo): o amolar decide quanto a lâmina morde a guarda de Markus. Sem erro 100%, 1–2 erros 85%, 3+ erros 70% (`fio(st)` no livro.js, `opts.fio` na arena). Com o fio ruim ele aguenta mais trocas antes da chuva e dos treze passos; na primeira vez que o golpe entra, Laura nota: "A lâmina bate no escudo e escorrega. A pedra não acabou o serviço de manhã." Joseph vem antes do amolar, então não muda.
- **G5 · escribas:** na pergunta de Corwin, "não sei", "não lembro", "no idea" e o "não" sozinho deixam de valer.
- **G6 · pontuação:** escrita (2.250 por acerto), cavalgada e quintana (360 por ponto) entram na conta e ganham linha na tela.
- **G7 · limpeza:** saíram o minijogo `tenda` e o ramo `perdeu` da arena no livro.js.

**Texto**
- T1–T3: "devagar" de 20 para 10; "a arena inteira" de 7 para 3; a frase de três muletas da arqueria.
- T4: Simon, "De capuz, eu sou só mais um pajem." T5: "Dos que riem, nenhum leu o retrato de Corwin." T6: m1 e c10 sem "inteiro". T7: "de vestido vinho" na i06e.
- T8: dicas do respirar, do amolar e da arqueria.
- T9–T11 (tela final): Justine rival "foi a última a se levantar, e não bateu palma"; rota "Cinco": "Laura disse à mãe que foram cinco mentiras, e não disse qual"; o "Ob… obrigado" trêmulo da flecha agora conta como deslize, e a nota da máscara não tem mais o final impossível.
- T12 (arena): "Ele passou. Por um triz." e "O aço estala no meu ombro."

**Verificado:** node --check em tudo; sete rotas com o bot até o fim sem erro (incluindo "Cinco" e Justine de pé); tela de treino e toque longe do amolar testados no navegador sem bot; Markus com fio 1 / .85 / .7; correção de Corwin com 22 respostas; recontagem: devagar 10, ninguém 20, inteiro 16, um instante 9, de novo 11, como quem 9.

---

## Versão 8 (feedback do Cap. II, lutas por turnos, Parte VI)

Nenhum texto dublado mudou de palavra nem de lugar. Onde uma linha nova entrou antes de uma fala dublada, o índice da voz passou a ser calculado (`b04` laus-nome: 4 ou 6; `v03` todos-riem continua no 6).

**Lutas (arena.js v8):** o motor por turnos do Cap. II, de armadura. Menu de quatro golpes no turno de Laus (o golpe entra quando o anel fecha), e no turno dele o anel fecha sobre Laus: ↑ escudo (janela larga, sobe o coração) ou ↓ passo lateral (janela estreita, abre o adversário). O coração estreita as janelas; dentro do elmo, respirar acalma menos. Três marcas recomeçam a fase, nunca a luta inteira. A primeira vez de cada golpe vem devagar, e depois de duas derrotas as janelas alargam.
- **Joseph:** o aviso é o giro da espada, desenhado sobre a mão dele (um giro, alto; dois giros, o golpe mais largo). Quem jogou o Cap. II lê no cartão: "no jantar, ele girava a taça antes de cada frase". O passo lateral no golpe largo faz ele passar do ponto, e ele se recupera ("Ainda não é o erro"). No quinto golpe ele erra, e o menu troca a finta por **Esperar**. Quem espera recebe o sexto, o mais largo; o passo lateral abre a coxa. Atacar depois do erro: "Ele se recupera". Quebrar a guarda dele também abre a coxa, mas não conta como `esperouErro`.
- **Markus:** não morde finta e devolve todo golpe que não entra limpo. Golpe pesado: passo lateral, e um contra-golpe rápido. Estocada e finta: escudo; o passo lateral leva a marca ("a ponta segue o corpo"). Na chuva ele vira borrão; o ar pelo nariz antes do pesado é a única pista (som, ondas na tela e a linha "Ar, pelo nariz..."; "Nenhum ar." quando não é pesado). Quem viu a semifinal ou ouviu Simon já sabe; os outros descobrem no primeiro pesado da chuva. Na chuva, o menu ganha **Escutar**. Misericórdia em duas marcas. Ombro do Cap. III, lenço no cabo e no peito continuam.
- **Treze passos:** Markus não deixa respirar. Recuar conta o passo na voz dela; Segurar guarda o chão e cobra o braço; o passo lateral no pesado segura o chão. Com o calcanhar na pedra, recuar escorrega. O único passo lateral que vence é o do golpe pesado com o calcanhar na pedra; depois, o vídeo do elmo.
- A história entra na caixa de texto, entre os turnos. Enter ou um toque adianta.

**Correções do feedback (A1–A4, B, C, D):** prova dos escribas com a balança (varia por `aula.leu`, `aula.venceu`, `engoliu.aula`); Corwin e Lúmae na fogueira; Maud; Joseph noivo de Justine; o giro e a taça; a lei de Joseph contra o cavalo emprestado; "Não pulsa. Não precisa." (o corte é raso, então ela recusa o garrote); a lei escapa para Simon; o corredor volta no túnel (com a dublagem do Cap. II passada no filtro de elmo, e Joseph desconfia); o pão de Tobias; Markus inclina o elmo para a mão dela; a confissão da devota da lei; a Casa Merrow na Ponte de Andrey; a espada de Laus; lágrimas na mentira da vigília; a mãe confere a manga; Justine pela faixa do Cap. II; "A senhora acreditava mesmo nela. Na lei."

**Parte VI · Depois da Chuva (nova):** o quarto, Tobias com os dois recados, e a escolha da primeira noite.
- **Justine (romance principal):** o oratório. "Ela merecia escolher" é a dublagem do Cap. II, dita à Juíza. O beijo depende do laço: faixa do Cap. II (sem nome 3, amiga 2, sem Cap. II 1, rival 0) + lenço no braço + olhou Justine pela fenda + Justine de pé antes + ficou ao lado dela no corredor do Cap. II. Com laço 2 ou mais, o beijo acontece (Laura beija, ou Justine beija se Laura pergunta do contrato). Abaixo disso, dois dedos nos lábios: "Não com o contrato na mesa do meu pai."
- **Markus (secundário):** a tenda dos curandeiros. Respeito, a revanche "sem chuva, sem elmo" e uma mão que demora no aperto. Laura tem dezesseis anos, então a cena fica nisso.
- **A mãe:** "Quatro mentiras este mês. Eu contei." E o "Desculpa, mãe" com lágrimas vira a quinta.
- Nos dois caminhos de fora, quando ela volta, a cadeira do quarto está virada para a janela, sem ninguém.

**Tela final:** "Tobias deixou o pão.", a letra que escapou, a primeira noite e a cadeira.
**estadoFinal novo:** `noite`, `oratorio`, `beijoJustine`, `laco`, `markusNoite`, `revanche`, `mae`, `letraEscapou`, `tobiasPao`, `cadeira`.
**Motor (livro.js):** `quente`, `quentePulso` e `lagrimas` do Cap. II; `efeito` pode ser função; fundo aceita `alt` (imagem reserva enquanto a nova não chega); zonas `oratorio` e `noite`.

---

## Versão 5 (correções da autoauditoria)

Nenhuma dublagem nova. O único áudio mexido foi cortado aqui: `voz/deslize-obrigado.mp3` agora diz "Thank you for the— … for the fight" (o "my la—" saiu).

**Calendário fixo** (está no topo do `capitulo4.js`):
- Dia 1: arqueria de manhã, prova dos escribas à tarde (página nova `i03b`, sem mídia nova).
- Dia 2: cavalgada (um parágrafo novo em `i06`).
- Dia 3: quintana, soma ao meio-dia, semifinais à tarde.
- Dia 4: a final.
- Osmund: 21 dias antes, no dia em que ele vai buscar os mantos de Gideon (nove dias depois do Cap. II). Laura vê ele sair do castelo e segue até a casa dele, de capuz.
- Vigília: pedida 7 dias antes, começa na véspera do Dia 1. Laura pediu três dias; o Torneio tem quatro, e ela deixa um bilhete pedindo mais um. A mãe responde pondo a cadeira na tribuna.

**Problemas corrigidos (P1 a P10):**
- **O Avesso é linear:** bolsa, elmo, vela, sem voltar ao baú. A narração `line4` continua igual. O elmo ficou curto (sem repetir o placar).
- **Cartão de Joseph:** mostra só os controles e "Um golpe limpo decide". Depois de perder duas vezes, aparece a ajuda inteira ("Duas vezes no chão. Agora eu sei o que olhar:").
- **As frases que importam param a luta:** o ar pelo nariz, o ombro (Cap. III), o lenço no cabo e a pedra dos treze passos congelam a luta por cerca de 2 s, com a legenda maior. O "um" final fica 5 s antes do vídeo do elmo.
- **"Não lembro quem" saiu:** "Alguém me ensinou isso uma noite, com a mão no meu ombro, nunca na espada."
- **Bug do "Não ataco ainda":** a frase não aparece mais por cima da abertura.
- **Deslizes:** placar e Joseph continuam com relógio. Escudeiro e túnel não têm mais. Quando o coração força a resposta trêmula, a firme aparece riscada. O escudeiro agora dispara de verdade (coração alto, mão que errou a pedra três vezes, ou duas escorregadas antes).
- **Um coração só:** o pulso da página mistura a tensão da cena com o coração do jogador (`st.bpm`).
- **Simon, Joseph e a tela final:** Simon só faz o sinal "de novo" se veio de manhã. A tela final não diz mais "ninguém percebeu" quando alguém percebeu. O oficial do placar aparece se ouviu. "O sino tocou antes" virou "Não deu tempo de olhar".
- **Inglês do deslize:** "Thank you for the— … for the fight", e o Joseph do túnel repete "Thank you for the…".

**Oportunidades (O1 a O10):**
- "E se outro vencer?" (Cap. II) volta no fim.
- O pão (comer ou não) volta na chuva.
- O lenço: a mancha do Cap. II em `a03`, e a mão no cabo ou no peito em `c10`.
- O preço de Osmund volta na revelação: colar em `c13`, promessa e confissão em `c12`.
- O olhar da fenda volta em `c10`, sem a fenda.
- O menino virou Simon.
- A Lâmina é preparada com Corwin, o General-Rei baixinho que venceu sem ser tocado. Ele aparece no fogo (`i04`), no codex do Torneio e em `c10b`. Markus não explica mais o título.
- A piada do cavaleiro de barba ruiva volta em `c13`.
- O 13 fica no canto da tela depois dos passos da final.
- "Amanhã não baixa a espada" (Simon), para quem baixou no Cap. II.

**Coerência:**
- "Um nome que ontem não existia" saiu.
- A manopla de `a03` agora bate com `a01`.
- O roxo do laranjal virou "a pele já esqueceu".
- "Qual das duas [vozes]" saiu.
- "Pela primeira vez no Torneio" virou "comigo".
- O arauto da final diz que a noiva é a filha da Mãe-Rainha.
- Os codex do Torneio (quintana, prova dos escribas, Corwin) e do costume (antes do combate) estão atualizados.

## Versão 4

- **Mais prosa entre a arqueria e o torneio** (sem mídia nova): a noite na tenda tirando o elmo no escuro (i05) e o terceiro dia, com a quintana e a espera pelos pontos embaixo da tribuna (i06). Agora "três dias de provas" fecha a conta: cavalgada, arqueria e quintana.
- **Dublagem da semifinal:** "Três dias de provas somam os pontos..." toca a sua gravação original dessa página, com o efeito do elmo (`narration/line1a.mp3`).
- **Contar os passos com a voz dela:** cada passo toca "One... Thirteen", abafado pelo elmo, nas duas entradas na arena.
- **O coração manda na voz:** com o peito disparado, só a resposta trêmula aparece, e o texto avisa ("A voz não vai sair inteira").
  - No placar: depois de uma arqueria ruim (menos de 12 pontos) ou com o coração a 128 ou mais.
  - Com Joseph: se Laus levou 2 golpes ou mais, ou terminou a luta com o coração a 140 ou mais.
  - Com o escudeiro: com o coração a 128 ou mais de manhã.
- **Consequências:** a resposta trêmula a Joseph faz Joseph desconfiar. No túnel ele repete a sílaba engolida ("Mas dessa voz eu lembro"), e no fim ergue o odre na boca do túnel. A do escudeiro faz Markus olhar a fenda do elmo um instante a mais antes da final. Tudo fica gravado para os próximos capítulos (`josephDesconfia`, `escudeiroOuviu`, `placarDesconfia`).
- **O Avesso logo depois da vitória:** o golpe, o elmo voando, "E, no meio da chuva, eu lembro.", as três lembranças, e só então o arauto, "encharcada", "Obrigada" e o nome. O Avesso agora começa em "Numa tenda que cheirava a couro e a medo..." (a gravação foi cortada para combinar: era a noite anterior, não "três dias antes").
- **Título: a Lâmina** para quem vence Markus sem tomar um único golpe, em nenhum momento da luta (não basta terminar com o escudo cheio). Aparece na arquibancada ("Lâmina", baixo, como quem reza), na fala de Markus, na tela final e no estado (`titulo: 'lamina'`).
- **Incoerências corrigidas:**
  - Laus "engrossando a voz" no placar e no flashback.
  - O sino que tocava duas vezes (fenda e final).
  - A contagem de dias (o primeiro cheiro bom e a chuva no rosto "desde que o Torneio começou"; o baú era a noite anterior).
  - "Durmo" seguido de "não consigo dormir" (agora "cochilo").
  - O flashback que repetia a arqueria e dizia "acerto mais que os maiores" mesmo para quem errou.
  - "o nosso sinal de de novo".
  - A frase de Markus "é a primeira vez em três dias..." (agora: "Pela primeira vez no Torneio, o costume acontece inteiro: dois rostos descobertos, um diante do outro.").

## Testes da v4
- Capítulo inteiro numa sessão contínua, com leitor lento, 49 páginas: sem erro, sem arquivo faltando; as 11 decisões só abriram depois do "Próxima"; a voz contou os 13 passos; as 5 narrações tocaram; título Lâmina conquistado e mostrado na tela final.
- A resposta trêmula forçada conferida no navegador (Joseph com 3 golpes: só a trêmula aparece) e, fora dele, nos três pontos e nas consequências.
- Não testado nesta rodada: o celular e a dificuldade com mão humana.

## Versão 3

- **"Ao círculo" não respondia (corrigido):** a camada dos minijogos era um único elemento reaproveitado, e cada jogo (arqueria, passos, fenda, amolar) deixava ali os seus ouvintes de toque; a arqueria ainda travava o ponteiro na camada, e o clique no botão ia parar nela. Agora a camada é um elemento novo a cada abertura e a cada fechamento. Reproduzido antes e testado depois.
- **Decisão só depois do "Próxima":** o texto aparece, o leitor lê e clica em "Próxima"; só então a decisão abre (e, nas de tempo curto, o relógio só começa aí). Enter e espaço fazem o mesmo. Nenhuma decisão aparece antes, em nenhuma das 10 páginas de decisão.
- **Sons e vozes amarrados ao parágrafo** (`sons`, `sonsDepois` e `vozAuto` com `p`, em `capitulo4.js`): tocam quando o leitor, no ritmo médio de leitura (3,3 palavras por segundo), chega ao parágrafo. Com `fim: true`, se o leitor virar a página antes, o som toca na virada; as vozes não (tocariam por cima da página seguinte).
  - Ligados agora: o sino em "O sino soa" (c08), a chuva no capacete, a bolsa de moedas e a pena na linha certa, o rugido em "Azarão!", suspiro da arena e elmo na lama na revelação, a pena no nome, a pedra de amolar na passada certa.
  - As falas de Osmund inteiras ("One nobody will claim", "Then what does?"), "I'll remember" depois da promessa, "Courage" na vela e as quatro de Laus na véspera (com o efeito do elmo): "Before sunrise", "Go back", "I only need one", "Everyone laughs".
- **Ainda é só texto, sem gravação:** o último parágrafo novo da véspera (a `line2` termina antes dele) e o segundo parágrafo da manhã (a `line3` cobre só o primeiro).

## Testes da v3 (Chromium sem janela, jogador-robô)
- Capítulo inteiro numa sessão contínua, sem recarregar (45 páginas, caminho dos deslizes): sem erro, sem arquivo faltando, estado do capítulo gravado.
- "Leitor lento" (tempo de leitura comprimido): confirmou no registro do navegador cada som e voz novos, e os três caminhos do Avesso (colar, promessa, confissão; vigília calma e com medo).
- Auditoria: dos 74 áudios do pacote, 69 foram pedidos pelo navegador nesta rodada. Os 5 restantes: `laus-obrigado`, `nome-placar` e `vigilia-paz-nervosa` dependem do caminho (vistos tocando em testes anteriores); `esforco-3` é uma de 3 variantes sorteadas; `pedra-amolar` foi corrigido e confirmado à parte.
- Não testado: dificuldade com mão humana, o som de verdade, a posição no Supabase; o celular só foi rodado antes desta rodada.

## Versão 2

O capítulo foi reestruturado para esconder Laura até o elmo cair.

- **Cinco partes:** I · A Arqueria, II · O Círculo, III · A Véspera, IV · Treze Passos, V · O Avesso. Antes do elmo, nada diz "Laura": a interface diz "O que Laus faz?", Dolores é "a Mãe-Rainha" e o menino na tenda não tem nome. Os flashbacks (Osmund, os três dias, a vigília) só abrem depois de "Laura D'Orrose", no baú que Laus não quis tocar na véspera.
- **A voz:** Laus é a voz natural da Laura atrás do elmo. O efeito (abafado, eco metálico curto, tom um pouco mais baixo) está gravado nos arquivos: narrações 1 a 3, falas de Laus, contagem, grunhidos, deslizes. A primeira vez que se ouve a voz limpa dela é o "Obrigada". Falas sem elmo antes da revelação ficam sem voz.
- **Deslizes:** quatro escolhas rápidas (placar, Joseph, escudeiro de Markus, Joseph no túnel). A versão tremida quase entrega quem está no elmo; se o tempo acaba, ela escapa. A tela final conta quantas vezes a máscara escorregou.
- **Arqueria:** segurar puxa, arrastar mira, soltar entre duas batidas do coração. Com a corda toda puxada o arco fica transparente; o espaldar trava o braço em 1,6 s.
- **Arena v2** (as mesmas 32 poses): antecipação, golpe e volta à guarda; o tempo congela no impacto; a câmera aproxima, treme e inclina com o medo; rastro da lâmina; vibração no celular. Medo encurta janelas; cansaço fecha a fenda do elmo, abafa o som e deixa Laus lenta. Escudo cansa, passo lateral cansa mais e é o único que abre guarda, recuar entrega terreno. Respirar é a pausa entre as trocas (Markus às vezes não espera). Quando o elmo voa, a fenda some.
- **Amolar:** uma passada só, seguindo a luz; rápido demais ou parado, volta ao cabo.
- **Corrigido:** Joseph em guarda espelhado (e sem o verde da luz), o número dos passos que sumia, a frase dos escudeiros, a "verdade" de Osmund (agora a confissão assinada).

## Testes desta versão (Chromium sem janela, jogador-robô)
- PC, português, quem prometeu, contou a Simon e guardou o lenço: o capítulo inteiro em três trechos (até Joseph, até a final, a final e o Avesso), sem erro e sem arquivo faltando. Pontuação, jornada e `aqv_estado.cap4` gravados.
- Celular, inglês, quem recusou a promessa e foi visto: os mesmos três trechos, com os deslizes escapando; sem erro e sem arquivo faltando.
- Arqueria, amolar e respirar testados à parte (arqueria 30 de 30 com o robô).
- Não testado: dificuldade com mão humana, o som de verdade, a posição no Supabase.

## Versão 1
Primeira montagem (Laura revelada desde o início, duelo de lado sem direção). Substituída pela v2.

## Vídeos (10/out)
- `amolar.mp4/webm`: trocado pelo clipe novo (Laura de armadura e manoplas). Usado só o trecho cabo→ponta (1,0 s do original), esticado 3× com interpolação, todos os quadros-chave, sem áudio — o minijogo anda o vídeo quadro a quadro com a pedra.
- `tenda-vela.mp4/webm`: marca d'água removida por recorte (1216×684 de cima-esquerda, reescalado para 1280×720).
- `osmund-escreve.mp4/webm`: marca d'água removida com preenchimento (delogo) no canto, sem cortar a pena.

## Cap. V (12/out)
- Tela final: botão "Capítulo V · Aheryn →" agora aponta para https://marcelomartinsjorge.github.io/the4willschapter5V2/ (campo `proximo` em capitulo4.js). O estado do Cap. IV é gravado em `aqv_estado.cap4` ao abrir a tela final; como todos os repositórios compartilham a origem marcelomartinsjorge.github.io, o Cap. V consegue ler.

## Versão 6 — a arena refeita (12/out)
Motivo: primeira jogadora de fora achou a luta "0% intuitiva". Diagnóstico: regras para decorar antes de jogar, três defesas que faziam a mesma coisa, janela invisível, texto no meio da ação, derrota voltando ao zero, contagem dos 13 passos fora de hora.

**Desenho (só com os sprites que já existiam, nenhuma mídia nova):**
- Três moedas: ESCUDO gasta braço (erguido em cima da hora gasta menos); RECUAR gasta chão (pegadas até a pedra; contra Markus, dá pressão a ele); PASSO LATERAL gasta fôlego e é o único que abre a guarda. GOLPEAR só existe na abertura.
- Sobre o adversário: sinal colorido da intenção (vermelho = pesado, laranja = largo, amarelo = estocada, vermelho que apaga e vira branco = finta, cinza tracejado = erro) e um anel que fecha até o golpe, com a faixa da janela certa.
- Botões acendem com as respostas boas enquanto o jogo ensina (Joseph inteiro, 1ª troca do Markus, ou depois de 2 derrotas).
- Ensino na hora: o tempo para no primeiro golpe de cada tipo, uma frase de Laus + uma linha de instrução, e o jogador aperta o botão que pisca (ou a palavra destacada).
- Trocas e pausas: nenhuma frase durante a troca (só "Agora!", "Cedo.", números). A história entra nas pausas (tempo parado, até 4 frases) e nos momentos (tempo parado, toque para continuar).
- Derrota volta ao começo da troca, com o motivo e a dica certa. Depois de 2 derrotas na troca (1 na reta final): janelas 50% maiores, sinal cedo, botões acesos.
- Joseph (3 trocas): só escudo → entra recuar (a pedra a 4 pegadas) → o erro no 5º golpe (não golpeie) → o golpe largo, passo lateral, abertura, golpe.
- Markus (3 trocas): estocada (nunca o lado) e pesado (lateral dá meia abertura; três golpes nela quebram a guarda dele e dão pausa) → chuva: sinal tarde, o ar dele antes do pesado (não existe antes da finta), finta → treze passos: cada recuo e cada golpe levado contam um passo na voz dela (conta-12…01); na pedra, recuar escorrega; só o passo lateral no pesado derruba ele.
- Misericórdia virou escolha: levantar o escudo (aplauso) ou avançar na guarda baixa (vaia; ele não espera de novo). Novo campo `avancou` → nota no resumo e `avancouNaGuarda` no estado do cap. 5.
- livro.js: `tentativas` passa a somar os recomeços internos da luta.

## Versão 7 — plano de profissionalização, seção do Cap. IV (13/out)
Sem o motor único (ignorado a pedido). Nenhuma mídia nova.
- **Avisos de consequência** (estilo Telltale) em 10 das 11 escolhas, 18 opções: placar, lenço (Justine / a mão / o peito), Joseph, assistir/dormir, piada (o cavaleiro ruivo), Simon, comer, escudeiro, pagamento (Osmund), vigília (sua mãe). Só o deslize5 ficou sem aviso: nada adiante lê essa escolha.
- **Riscada com motivo**: "O coração não deixa." embaixo da resposta firme cortada.
- **Coração como HUD**: no topo, coração que bate e o número de batimentos; vinheta mais forte; acima de 120 o coração fica vermelho vivo e o som ambiente abafa (a voz continua clara).
- **Escolhas 17–19 espaçadas**: a tela a10 virou duas. Nova frase (N): Laus tira o elmo na tenda e lava o sangue de Joseph das mãos; a escolha de assistir passou para a a10b.
- **Arqueria**: sem as faixas pretas (só a borda do elmo), arco mais baixo e inclinado, balançando no batimento; a flecha voa do arco até a mira e a câmera vai até o furo; instrução virou ícone no centro, só até a primeira flecha.
- **Arena**: antecipação (ele recua o corpo 90 ms antes do golpe), flash branco de um quadro, hit-stop, câmera lenta e zoom no bloqueio perfeito, lama no impacto na chuva; celular em pé com lutadores maiores e separados e botões grandes na base.
- **Revelação**: a frase do pé na pedra fica parada, o mundo emudece, o vídeo do elmo passa sem texto em câmera lenta, e só depois vem "O elmo voa. A chuva bate no meu rosto…" e o botão de golpear.
- **Selo da Lâmina** na tela final, com a porcentagem de jogadores que conseguiram (registro novo `lamina` no Supabase; a porcentagem aparece quando houver dados). A nota "★ Lâmina" saiu da lista para não repetir.
- **Pendente**: trilha real em camadas (precisa das músicas); "herdar o que Laura aprendeu" depende do motor único.
