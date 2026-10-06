# Capítulo IV (Laus, o Azarão) · Notas

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
