# Capítulo IV (Laus, o Azarão) · Notas

## Versão 1

- **38 páginas em três partes (cada leitor vê de 30 a 36, conforme o caminho):** I · O Círculo (semifinal contra Joseph), II · A Véspera (a tenda e as três lembranças), III · Treze Passos (a final na chuva e a revelação). Texto em PT e EN, pareado em `capitulo4.js` (`// M` = seu texto revisado, `// N` = novo, aprovado no roteiro).
- **Motor:** o do Cap. II (`livro.js`), com: coração como fôlego (`st.bpm`, começa no peso do Cap. II), voz abafada quando Laus fala de dentro do elmo, chuva na tela, páginas que voltam ao baú (`volta`), pontuação da jornada dos Caps. I a IV.
- **A arena** (`arena.js`): tempo real, poses recortadas (`assets/images/arena/`, 32 imagens), sem barra de vida: um golpe limpo decide. Escudo com 6 pontos; segurar Respirar entre os golpes acalma o coração e refaz o escudo.
  - Joseph: o 5º golpe sai torto (atacar ali é cedo demais); o 6º é o largo: passo lateral e golpe.
  - Markus: fase 1 (chuva fina, golpe pesado, estocada, finta), fase 2 (chuva forte: o aviso vira som, a respiração dele), fase 3 (treze passos: cada golpe empurra Laura um passo, a voz dela conta de 13 a 1; no um, o passo lateral faz Markus escorregar na pedra; vídeo do elmo; um único "Golpear").
  - Markus espera por ela uma vez se o escudo cair. Perder leva a "Tentar de novo" (vencer é canon).
- **Os outros jogos** (`jogos4.js`): contar os passos (2 vezes), a tenda (três lembranças em qualquer ordem), amolar (o dedo controla o vídeo), a fenda do elmo (um olhar até o sino).
- **Decisões aplicadas:** título "Laus — O Azarão"; Laura diz "Laura D'Orrose" sem escolha; última página: "O elmo continua na lama. Não me abaixo para pegar." (o início do costume da Bryne de lutar sem elmo).
- **Do que o Cap. II e o III deixaram:** peso, promessa, Simon (sabe ou não), lenço, Justine desconfiada, carta do Registro, rotas de fuga, guarda que viu, arsenal trancado, marca, brancarda, correções da postura do Cavaleiro. Grava `aqv_estado.cap4` (pagamento de Osmund, lenço, Justine de pé, misericórdia de Markus etc.) para os próximos capítulos.
- **Música:** sintetizada (tambores graves), como você pediu, até testar a do Udio.

## Testes desta versão (Chromium sem janela, jogador-robô na arena)
- Celular, inglês, quem recusou a promessa e foi visto: as 28 páginas até a final, sem erro; e a final até a tela de fim, sem erro, sem arquivo faltando.
- PC, português, quem prometeu, contou a Simon e guardou o lenço: Joseph vencido; a final até a tela de fim, sem erro, sem arquivo faltando; pontuação e jornada calculadas; `aqv_estado.cap4` gravado.
- Não testado: a pontuação no Supabase e a posição entre os leitores (o sandbox não alcança o banco); o som de verdade (o robô não ouve); a dificuldade com mão humana.
