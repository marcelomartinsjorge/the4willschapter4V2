-- Placar da cavalgada (Cap. IV). Mesmo modelo do placar do Aheryn (aheryn_scores):
-- qualquer um lê, qualquer um grava, e as checagens seguram valores absurdos.
create table if not exists public.cavalgada_scores (
  id bigint generated always as identity primary key,
  name text not null check (char_length(btrim(name)) between 1 and 16),
  score integer not null check (score between 0 and 25000),
  tempo real not null check (tempo between 5 and 600),
  limpos smallint not null default 0 check (limpos between 0 and 7),
  quedas smallint not null default 0 check (quedas between 0 and 10),
  venceu_markus boolean not null default false,
  lang text not null default 'pt' check (lang in ('pt', 'en')),
  created_at timestamptz not null default now()
);
create index if not exists cavalgada_scores_rank on public.cavalgada_scores (score desc, tempo asc, created_at asc);
alter table public.cavalgada_scores enable row level security;
drop policy if exists "placar cavalgada: qualquer um le" on public.cavalgada_scores;
create policy "placar cavalgada: qualquer um le" on public.cavalgada_scores for select to anon, authenticated using (true);
drop policy if exists "placar cavalgada: qualquer um grava" on public.cavalgada_scores;
create policy "placar cavalgada: qualquer um grava" on public.cavalgada_scores for insert to anon, authenticated with check (true);
grant select, insert on public.cavalgada_scores to anon, authenticated;
