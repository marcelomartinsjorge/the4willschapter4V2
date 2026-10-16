# Capítulo IV · Mídias (v8.2)

O capítulo roda inteiro sem os itens que ainda faltam: voz ou som que falta não toca, imagem que falta usa a de reserva, vídeo que falta mostra a imagem parada.

## Status

| | Entregue e instalado | Falta |
|---|---|---|
| Dublagem | as 13 falas novas da Laura | nada |
| Vídeos | `oratorio-vela`, `juiza-balanca`, `dolores-maos` (com `.mp4` e `.webm`) | nada |
| Imagens | `telhado-noite`, `tenda-curandeiros`, `juiza-balanca` | nada |
| Sons do oratório | | 4 efeitos (seção 3) |
| Trilha | | 2 opcionais (seção 4) |

A imagem `lauraandjustinekisses.jpg` não entrou no capítulo.

## 1. Dublagem instalada

Todas em `assets/audio/voz/`. `desviar`, `deixa` e `merecia-voce` vieram baixas (sussurro, por volta de −31 LUFS) e subi para −25, no nível das outras. As outras dez ficaram como chegaram.

**Filtro de elmo:** nenhuma das 13 precisa. A única que toca na arena (`merecia-voce`, página c10b) vem depois de o elmo voar. As outras são na Parte VI, sem armadura. A `caminho-elmo`, reaproveitada do Cap. II, já tem o filtro gravado.

| Arquivo | Fala | Onde |
|---|---|---|
| `desviar` | "I thought you'd look away." | j2, oratório |
| `deixa` | "Let her." | j2, depois do beijo |
| `sao-minhas` | "They're mine." | j2, as mãos |
| `quando-assinam` | "When do they sign?" | j2, o contrato |
| `merecia-voce` | "You deserved to choose." | c10b, arquibancada |
| `combinado` | "Agreed. I pick the day." | m2, a revanche |
| `contar-pai` | "And what will you tell him?" | m2, o pai |
| `voce-esperou` | "You waited for me to get up." | m1, a espera |
| `voce-esperou-2` | "You waited for me to get up. I didn't wait for you." | m1, a vaia |
| `doi` | "Does it hurt?" | m1, o braço |
| `cinco` | "Five." | d2, a mãe |
| `desculpa-mae` | "I'm sorry, Mother." | d2, a mãe |
| `ate-o-fim` | "You stayed to the end." | d3, na porta |

## 2. Vídeos e imagens instalados

- `oratorio-vela` (j2): as duas de costas, ajoelhadas, as velas tremendo.
- `juiza-balanca` (j2b, depois do beijo): a estátua, a fumaça subindo, a câmera chegando no rosto.
- `dolores-maos` (d2): o polegar da mãe nos calos.
- `telhado-noite` (j1), `tenda-curandeiros` (m1, m2, com o Markus), `juiza-balanca.jpg` (primeiro quadro da j2b).

Os vídeos foram reconvertidos para 1280 de largura, sem áudio, em `.mp4` e `.webm`. As imagens estão em `.jpg` de 1920.

## 3. Sons do oratório · 4 efeitos (faltam)

São eles que deixam a sala viva em volta do beijo. Ficam em `assets/audio/sfx/`. O código já chama cada um no parágrafo certo; enquanto o arquivo não existe, não toca nada.

| Arquivo | Toca em | Prompt (ElevenLabs Sound Effects ou similar) |
|---|---|---|
| `garoa-janela.mp3` | j2, ao abrir a porta, baixo | `Light drizzle tapping on a small high stained-glass window of a stone chapel at night, heard from inside, soft and steady, faint echo of the stone room, no thunder, no wind, 12 seconds` |
| `vela-apaga.mp3` | j2, quando a vela do altar se apaga; j2b, no começo | `A single small candle flame going out on its own in a quiet stone chapel, a soft short hiss and a tiny breath of air, then silence with a faint room tone, close and intimate, 2 seconds` |
| `cera-pinga.mp3` | j2, a cera pingando no degrau | `Two slow drops of hot candle wax falling onto a stone step, tiny soft taps, very close microphone, quiet stone room ambience, 3 seconds` |
| `respiracao-duas.mp3` | j2, a respiração antes da escolha; j2b, a testa no ombro | `Two young women breathing quietly and a little fast through their mouths, very close together, nervous and tender, no words, no moans, soft room tone of a stone chapel, 5 seconds` |

## 4. Trilha (opcional, para trocar a sintetizada)

- `assets/audio/arena-final-loop.mp3` (Udio): `Dark medieval duel music in the rain, slow heavy war drums and low taiko, tense cello ostinato, sustained strings, rising tension, no vocals, no lead melody, cinematic, seamless loop, 84 bpm, 90 seconds`
- `assets/audio/revelacao.mp3` (Udio): `Cinematic slow-motion reveal cue: everything drops to silence except a single low sustained cello note, then a quiet female choir enters without words, swelling slowly with strings, restrained and awe-struck, ends unresolved on a held chord, no drums, 60 seconds`
