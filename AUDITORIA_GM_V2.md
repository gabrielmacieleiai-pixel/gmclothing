# Auditoria GM Clothing V2

Data: 20/07/2026  
Branch de seguranca: `gm-v2-audit`  
Base analisada: commit `2a352c5` (`chore: ignore local vercel deployment artifacts`)

## Resumo executivo

O projeto tem uma base tecnica aproveitavel para a V2: Next.js App Router, TypeScript, Tailwind, dados centralizados de produto, carrinho, pre-checkout, variantes por cor/tamanho, WhatsApp, paginas institucionais e estrutura inicial de Yampi.

O principal problema nao e falta de componente. O problema e direcao comercial e peso/organizacao de assets:

- A home ainda esta orientada a Copa 2026, quando a V2 precisa comunicar moda masculina premium com Colecao Inverno como foco.
- O menu, hero, SEO, primeira secao da home e colecao geral ainda dao protagonismo a Copa/Brasil.
- A pasta `public` tem cerca de 559 MB, sendo aproximadamente 529 MB em PNG. Isso pesa deploy, organizacao e pode piorar a experiencia mobile se imagens pesadas forem usadas por engano.
- Existem muitas imagens no projeto que nao aparecem referenciadas no codigo atual. Elas podem ser produto real ainda nao cadastrado, duplicatas antigas ou material de apoio sem curadoria.
- O checkout Yampi esta preparado, mas quase todos os tokens sao placeholders. A compra direta real ainda nao esta pronta para a maioria das variantes.
- Existe confusao de Vercel: o projeto correto online e `gmclothing-z4mm`; `gmclothing.vercel.app` pertence a outro projeto e retorna 404.

Conclusao: antes de redesenhar, a V2 precisa de uma limpeza de narrativa, assets, taxonomia de colecoes e dados comerciais. A base pode ser reaproveitada, mas a home e a arquitetura de colecoes devem mudar.

## Framework, dependencias e estrutura

Framework:

- Next.js `^16.0.0` com App Router em `src/app`.
- React `^19.2.0`.
- TypeScript em modo `strict`.
- Tailwind CSS `^3.4.0`.
- ESLint `^9.0.0`.
- `sharp` instalado em devDependencies para otimizacao de imagens.

Scripts principais:

- `npm run dev`
- `npm run build`
- `npm run lint`

Estrutura principal:

- `src/app`: rotas do site.
- `src/components`: componentes de UI, produto, carrinho, checkout, header, footer e hero.
- `src/data/products.ts`: fonte central dos produtos mockados.
- `src/data/hero-slides.ts`: slides do hero.
- `src/data/brand-assets.ts`: imagens editoriais e banners.
- `src/lib/yampi.ts`: mapa central de tokenReference Yampi.
- `src/lib/checkout.ts`: injeta URLs de checkout nas variantes.
- `src/lib/whatsapp.ts`: helper central de WhatsApp.
- `public/products`: fotos de produto, imagens editoriais e materiais antigos.

## Git, GitHub, Vercel e ambiente

Git:

- Remote: `https://github.com/gabrielmacieleiai-pixel/gmclothing.git`
- Branch de auditoria criada: `gm-v2-audit`
- Branch original antes da auditoria: `main`

Vercel:

- Projeto local vinculado atualmente: `gmclothing-z4mm`
- Project ID: `prj_ISrpCHsT07xXR7SL5Xzg4h66Q26q`
- URL publica testada com sucesso: `https://gmclothing-z4mm.vercel.app`
- `https://gmclothing.vercel.app` esta em outro projeto Vercel e retorna 404.

Ambiente:

- `.env.example` existe e nao contem valores sensiveis.
- `.vercel/.env.production.local` existe localmente e esta ignorado pelo Git. Nao foi aberto nem copiado para o relatorio.
- `.vercel` esta no `.gitignore`.

## Rotas testadas

Base testada: `https://gmclothing-z4mm.vercel.app`

| Rota | Status | Observacao |
| --- | ---: | --- |
| `/` | 200 | Title ainda orientado a Drop Copa 2026 |
| `/colecao` | 200 | Pagina geral muito ligada a Copa/Oversized/Frio |
| `/colecao/frio` | 200 | Funciona; title duplicado com `| GM Clothing | GM Clothing` |
| `/colecao/oversized` | 200 | Funciona; title duplicado com `| GM Clothing | GM Clothing` |
| `/copa-do-mundo` | 200 | Ainda muito protagonista |
| `/acessorios` | 200 | Estrutura em breve/aparicao estrategica existe |
| `/carrinho` | 200 | Carrinho existe |
| `/checkout` | 200 | Pre-checkout existe, mas multi-item externo nao finaliza Yampi |
| `/trocas-e-devolucoes` | 200 | Title sem acento: `devolucoes` |
| `/prazo-de-envio` | 200 | OK |
| `/formas-de-pagamento` | 200 | OK |
| `/politica-de-privacidade` | 200 | Title sem acento: `Politica` |
| `/duvidas-frequentes` | 200 | Title sem acento: `Duvidas` |
| `/produto/oversized-court-verde-militar` | 200 | Produto abre |

Limitacao: nesta sessao nao consegui acionar a ferramenta de controle visual do navegador interno; portanto a auditoria visual desktop/mobile foi feita por codigo, rotas publicas e estrutura de imagem, nao por screenshots comparativos.

## Produtos e colecoes atuais

Fonte central: `src/data/products.ts`.

Estruturas exportadas importantes:

- `products`
- `activeProducts`
- `catalogProducts`
- `copaProducts`
- `featuredProducts`
- `getProductHref`
- `getRelatedProducts`
- `getProductPricing`
- `getProductTotalStock`

Colecoes/categorias atuais identificadas no codigo:

- `Copa do Mundo`
- `Colecao Frio`
- `Oversized`
- `Essentials`
- `New Chapter`
- `Court Culture`
- `National Series`
- Categorias como `Brasil`, `Argentina`, `Cristiano Ronaldo`, `Sueter`, `Polo Tricot`, `Jerseys`.

Problema para V2:

Essas colecoes nao batem perfeitamente com a arquitetura desejada:

- Inverno
- GM Essentials
- GM Street
- GM Faith
- Ultimas Pecas

Hoje Copa ainda e uma colecao de destaque, quando deveria virar `Ultimas Pecas` ou uma subcolecao discreta.

## Home atual

Arquivos relevantes:

- `src/app/page.tsx`
- `src/data/hero-slides.ts`
- `src/components/hero-carousel.tsx`

Problemas encontrados:

- Metadata da home: `Drop Copa 2026 e streetwear masculino premium`.
- Primeiro quick category: `Copa 2026`.
- Segundo quick category relacionado a futebol: `Futebol`.
- Primeira secao principal da home: `Drop Copa 2026`.
- Primeiro slide do hero: `Brasil em campo`.
- O slide Copa nao usa imagem real no `heroSlides`; cai no fallback grafico interno do componente.
- A Colecao Frio ja existe, mas aparece depois da Copa.

O que pode ser aproveitado:

- `HeroCarousel` ja suporta swipe, indicadores, CTA e imagem desktop/mobile.
- `SectionHeading` e `ProductGrid` ja podem ser reaproveitados.
- Os produtos de frio ja estao cadastrados e podem virar prioridade visual.

O que deve mudar:

- Home deve abrir com Colecao Inverno.
- Copa deve sair do menu principal e da primeira dobra.
- Produtos Brasil/Argentina/CR7 devem ser movidos para comunicacao de `Ultimas Pecas`.

## Menu e rodape

Arquivos:

- `src/components/header.tsx`
- `src/components/footer.tsx`

Problemas:

- Header comeca por `Copa 2026`.
- Header usa `Lancamentos` apontando para frio, mas a V2 pede mais clareza: `Inverno`, `Essentials`, `Street`, `Faith`, `Ultimas Pecas`.
- Footer ainda tem `Drop Copa`.

O que pode ser aproveitado:

- Header e footer estao centralizados e simples de ajustar.
- Menu mobile usa a mesma lista do desktop.

## Colecoes

Arquivos:

- `src/app/colecao/page.tsx`
- `src/app/colecao/[slug]/page.tsx`
- `src/components/collection-browser.tsx`
- `src/components/copa-collection-browser.tsx`

Problemas:

- `CollectionBrowser` tem filtros `Copa 2026`, `Brasil`, `Jerseys`, `Oversized`, `Frio`, `Lancamentos`.
- Visual da colecao geral ainda coloca Copa/Brasil como campanha forte.
- Rotas especificas existem apenas para `/colecao/oversized` e `/colecao/frio`.
- A arquitetura desejada da V2 pede `/colecao/inverno`, `/colecao/essentials`, `/colecao/street`, `/colecao/faith`, `/colecao/ultimas-pecas` ou equivalente.

O que pode ser aproveitado:

- A pagina dinamica de colecao ja existe.
- A filtragem por categoria/colecao pode ser adaptada.
- `ProductGrid` ja suporta cards.

## Pagina de produto

Arquivos:

- `src/app/produto/[slug]/page.tsx`
- `src/app/copa-do-mundo/[slug]/page.tsx`
- `src/components/product-details.tsx`
- `src/components/product-card.tsx`

O que ja existe:

- Galeria com swipe horizontal.
- Miniaturas.
- Selecao de cor.
- Selecao de tamanho.
- Estoque por variante.
- Bloqueio quando variante esta sem estoque.
- Botao adicionar ao carrinho.
- Botao comprar agora.
- WhatsApp por produto.
- Produtos relacionados.
- `showSizeGuide` e estrutura de guia de medidas.
- Estrutura de midia com tipo `image` ou `video`.

Problemas:

- A mensagem `Checkout Yampi ainda nao configurado...` aparece para variantes sem token, o que pode passar inseguranca se ficar muito visivel.
- `Comprar agora` depende de token real Yampi; na maioria dos produtos ainda nao existe.
- O sticky mobile chama `Comprar agora`; para V2 talvez o CTA principal de mobile deva ser ajustado conforme checkout real.
- Textos visiveis/SEO tem alguns casos sem acento, especialmente paginas institucionais.

## Carrinho e checkout

Arquivos:

- `src/components/cart-provider.tsx`
- `src/components/cart-page.tsx`
- `src/components/cart-drawer.tsx`
- `src/components/checkout-form.tsx`
- `src/lib/coupons.ts`
- `src/lib/yampi.ts`
- `src/lib/checkout.ts`

O que existe:

- Carrinho com itens, quantidade, cupom, subtotal e total.
- Pre-checkout com dados de cliente/endereco.
- Redirecionamento para checkout externo quando ha apenas um item com checkoutUrl.

Problemas:

- Checkout para multiplos itens ainda nao esta integrado.
- Mapa Yampi tem um token real apenas para `camiseta-oversized-faith-jesus-e-o-caminho` preto P.
- Demais tokens sao placeholders `TOKEN_...`.
- Nao ha Shopify ainda.

Risco antes de vender:

O cliente pode montar um carrinho com mais de um item e chegar numa mensagem de integracao pendente. Para publicacao comercial, e melhor escolher um fluxo claro: Yampi por variante, WhatsApp assistido, ou Shopify.

## WhatsApp

Arquivo:

- `src/lib/whatsapp.ts`

Status:

- Numero oficial centralizado: `5547989031221`.
- Mensagens usam `Ola` sem acento. Nao e critico tecnicamente, mas pode ser polido na V2.

## Imagens e performance

Inventario tecnico:

- Arquivos em `public`: 626.
- Imagens em `public`: 625.
- Peso total aproximado de `public`: 559.38 MB.
- Peso aproximado de PNG: 529.62 MB.
- Peso aproximado de WebP: 19.45 MB.

Maiores arquivos identificados:

- `/products/brand-assets/tecido-premium-alta-gramatura.png` - 5176 KB, 2048x2048.
- `/products/Nova pasta/7afd3e70-4b48-4fae-b43d-09a70a3c94b6.png` - 5176 KB, 2048x2048.
- `/products/Nova pasta/cff8ad3f-2da6-4ecb-a726-ba51faa7a545.png` - 4457 KB.
- Varias imagens da Copa com 2.4 MB a 3 MB em PNG.

Referencias quebradas:

- O script encontrou uma referencia dinamica: `/products/oversized-catalog/${productCode}-${photoNumber}.webp`.
- Isso nao e necessariamente imagem quebrada; e template string usada por helper.
- Nao encontrei referencia estatica quebrada relevante.

Possiveis imagens nao utilizadas:

O cruzamento simples codigo x `public/products` encontrou 533 imagens sem referencia direta no codigo. Isso inclui duplicatas PNG/WebP, produtos ainda nao cadastrados e material de apoio.

Por pasta:

- `brand-assets`: 12
- `brands 2`: 51
- `colecao-frio`: 40
- `copa`: 98
- `logo`: 2
- `Nova pasta`: 40
- `Oversized`: 120
- `oversized-catalog`: 110
- `súeter e coleção frio`: 60

Observacao importante: nao deletar automaticamente. Antes, separar em:

- produto real cadastrado;
- produto real pendente de cadastro;
- imagem editorial/lifestyle;
- duplicata PNG de uma WebP usada;
- arquivo antigo descartavel.

## SEO e textos

Problemas claros:

- Home title ainda comunica Copa.
- Algumas paginas institucionais retornam title sem acento:
  - `Trocas e devolucoes`
  - `Politica de privacidade`
  - `Duvidas frequentes`
- Colecoes especificas retornam title duplicado:
  - `Colecao Frio | GM Clothing | GM Clothing`
  - `Oversized | GM Clothing | GM Clothing`

## O que pode ser aproveitado

- Base Next/React/Tailwind.
- Tipagem de produto e variante.
- Carrinho e provider.
- Pre-checkout.
- Estrutura de guia de medidas.
- Estrutura de media futura com video.
- Hero com swipe.
- ProductGrid/ProductCard.
- Paginas institucionais separadas.
- Helper de WhatsApp.
- Helper de Yampi.
- Script de otimizacao de imagens.

## O que deve ser removido ou rebaixado

Nao apagar produtos sem aprovacao. Remover/rebaixar apenas protagonismo visual:

- Banner/hero principal de Copa.
- Secao principal `Drop Copa 2026` da home.
- Links de menu com Copa como primeira opcao.
- Filtro `Brasil` como foco da colecao geral.
- Copy de Copa como campanha principal.
- Imagens antigas da Copa fora da nova colecao `Ultimas Pecas`, apos curadoria.
- Duplicatas PNG pesadas quando houver WebP equivalente aprovado.

## O que precisa ser reconstruido

- Nova home V2 com prioridade Inverno.
- Arquitetura de colecoes V2.
- Taxonomia em `products.ts`: `Inverno`, `Essentials`, `Street`, `Faith`, `Ultimas Pecas`.
- Curadoria visual das imagens por funcao: produto, hero, banner, lifestyle, detalhe, institucional.
- Fluxo real de checkout: Yampi completo por variante ou Shopify.
- Plano de performance com limpeza de assets e imagens responsivas.

## Informacoes que preciso receber antes da implementacao visual

Prioridade maxima:

- Fotos reais dos novos sueteres que devem liderar a home.
- Quais sueteres sao prioridade de venda.
- Nomes oficiais dos sueteres.
- Precos e precos promocionais.
- Estoque por cor/tamanho.
- Fotos das camisetas caneladas GM Essentials.
- Quais produtos da Copa entram em `Ultimas Pecas`.
- Quais produtos devem ficar ocultos da home.
- Guia de medidas real.
- Politica final de troca, envio e pagamento.
- Decisao de checkout: Yampi por variante agora ou planejamento Shopify.

## Ordem recomendada de implementacao

1. Aprovar esta auditoria e checklist.
2. Curar imagens reais: escolher as que entram em hero, cards e produto.
3. Reorganizar `products.ts` para as colecoes V2 sem apagar produto.
4. Trocar home para foco Inverno.
5. Rebaixar Copa para `Ultimas Pecas`.
6. Criar/ajustar rotas de colecao V2.
7. Corrigir SEO, acentos e title duplicado.
8. Otimizar/remover duplicatas PNG pesadas apos confirmacao.
9. Definir checkout real.
10. Rodar lint/build, testar mobile, publicar e medir depois.

## Pendencias desta auditoria

- Fazer QA visual com navegador em desktop/mobile quando a ferramenta de browser estiver disponivel.
- Validar manualmente quais das 533 imagens nao referenciadas sao produto real.
- Medir Lighthouse ou ferramenta equivalente apos rodar o site em ambiente controlado.
- Confirmar DNS dos dominios finais.
