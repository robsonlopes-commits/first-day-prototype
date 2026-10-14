# First Day Prototype

Um **sandbox de design em React** que recria, com alta fidelidade, a loja [firstday.com](https://firstday.com) a partir do tema Shopify de produção.

Serve para **explorar ideias visuais rápido**: mudar um hero, comparar três alternativas de um card, testar outro layout de PDP ou ajustar só o mobile, sem mexer no Shopify e sem risco para a loja.

> **Não é a loja.** Não existe backend, checkout, pagamento, conta de cliente nem integração com a Shopify. Carrinho, avaliações e assinaturas são dados de mentira. Marca, textos e imagens pertencem ao First Day.

---

## A ideia

O tema Shopify **é** o design system. Por isso o protótipo não reinventa nada:

- **O CSS original do tema é reaproveitado**, sem Tailwind e sem reescrita.
- **As classes e a estrutura HTML originais são mantidas** no JSX, então cada seção do protótipo corresponde a uma seção do tema.
- **Fidelidade vence elegância de código.** Quando houve dúvida entre um React mais limpo e ficar igual ao site, ficou igual ao site.
- **Desktop e mobile têm o mesmo peso**, com as interações reais: menus, carrinho, galerias, acordeões, seletores.

## Páginas

| Rota | Template Shopify | O que é |
|---|---|---|
| `/` | `index.hp01-v2` | Home |
| `/products/kids-calming-magnesium` | `unified-default` | PDP legado |
| `/products/kids-enrichment-vitamin` | `uniified-default-v2` | PDP novo (implementação separada) |
| `/pages/tdk-behind-the-science-lp` e `/pages/kde-behind-the-science-lp` | `lp-BTS-master` | Landing "Behind the Science" (teens e kids) |
| `/pages/sale` | `bfcm-categories` | Página de promoção |
| `/pages/bundle-builder-v2` | `lp-bundle-v2` | Montador de pack com quiz, todos os estados |
| `/pages/bundle-quiz` | `lp-bundle-v3` | Buy box de bundle com popup e gaveta |
| `/__prototype` | | Índice privado de todas as páginas |

O **carrinho** abre como gaveta pelo ícone do header, com itens fixos, barra de progresso do brinde e um seletor discreto (só do protótipo) para alternar os estados. **Todo produto multivitamínico** leva ao PDP novo e **os demais produtos** levam ao PDP legado.

## Como rodar

Precisa de [Node.js](https://nodejs.org) 18 ou mais novo.

```bash
npm install
npm run dev
```

Abra http://localhost:5173 (a lista de páginas está em `/__prototype`).

As imagens e vídeos vêm da CDN pública do First Day e são **baixados sozinhos na primeira vez** que cada página abre, ficando guardados em `public/assets/`. A primeira visita a uma página pode ser mais lenta. Se uma imagem não carregar, aparece um espaço "Missing asset - upload image" onde você escolhe um arquivo local (vale só para a sessão do navegador).

Para gerar a versão de produção do protótipo: `npm run build`.

## Como o projeto é organizado

```
src/
  pages/       uma página por rota, só lista as seções na ordem do template
  sections/    uma seção por arquivo, com o nome da seção Shopify
               (homepage-hero-new.liquid vira HomepageHeroNew.jsx)
  layout/      header, footer, barra de anúncio e carrinho
  components/  peças reutilizáveis (Img, acordeão, ondas...)
  data/        todo o conteúdo mock: produtos, carrinho, navegação, páginas
  styles/      tokens de design e o CSS do tema Shopify
tools/         scripts para converter Liquid em CSS/JS
```

O guia completo para designers, com onde fica cada coisa e como adicionar outro template, está em [`PROTOTYPE_GUIDE.md`](PROTOTYPE_GUIDE.md).

## Trabalhando com Claude Code

O projeto foi pensado para ser editado por pedidos em linguagem natural. Exemplos:

- "Redesenha o hero da Home"
- "Me dá três alternativas para este card de produto"
- "Muda só a versão mobile do PDP legado"

Como cada seção é um arquivo com nome claro, a mudança fica isolada e não afeta o resto do site. A skill `firstday-design`, em [`.claude/skills/firstday-design`](.claude/skills/firstday-design/SKILL.md), carrega as regras do design system (cores, tipografia, botões, espaçamentos) para que as ideias novas continuem com cara de First Day. Para alternativas, o original nunca é sobrescrito: cada variante vira um arquivo novo.

## O que é simulado

Carrinho e adicionar ao carrinho, avaliações do Judge.me, bloco da FrontRowMD, assinaturas, busca, checkout, tradução, testes A/B e o popup da promoção. O contador do bundle builder conta até a meia-noite local.

## Stack

React 18, Vite 5 e React Router 6. Sem backend, sem banco de dados, sem Tailwind.
