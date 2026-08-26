# Transferência do projeto — GM Clothing

Atualizado em 26 de agosto de 2026.

## Onde o projeto está

- Produção: https://gmclo.shop
- Vercel: projeto `gmclothing-z4mm`
- Repositório: https://github.com/gabrielmacieleiai-pixel/gmclothing
- Branch de trabalho: `gm-v2-audit`

## Como retomar em outro computador

1. Instale Node.js e Git.
2. Clone o repositório ou extraia o pacote portátil.
3. Entre na pasta do projeto.
4. Execute `npm install`.
5. Execute `npm run dev` para abrir a loja localmente.
6. Antes de publicar, execute `npm run lint` e `npm run build`.

## Configuração externa

- O checkout principal usa Shopify.
- Os IDs das variantes ficam em `src/data/shopify-variant-ids.ts`.
- A integração e a ordem de prioridade do checkout estão documentadas em
  `SHOPIFY_CHECKOUT.md`.
- A Vercel deve ser vinculada novamente com `npx vercel link` usando o projeto
  `gmclothing-z4mm`.
- Variáveis locais reais devem ser recriadas a partir de `.env.example`.
- Nenhum arquivo `.env` real faz parte deste backup.

## Estado entregue

- Campanha de inverno publicada.
- Estoque oficial por variante ativo.
- Produtos sem estoque bloqueados e produtos disponíveis priorizados.
- Carrinho e checkout Shopify validados.
- Layout branco revisado em desktop e mobile.
- Título da coleção Chenille Zara corrigido.
- Next.js 16.3.1 e Sharp 0.35.3 instalados.
- Auditoria de dependências sem vulnerabilidades conhecidas no momento da
  transferência.
- Último deployment confirmado na Vercel:
  `dpl_8fe95Kk1eU9EfUwepaBpnNkiP3np`.

## Arquivos de contexto

- `AGENTS.md`: regras permanentes do projeto e da marca.
- `AUDITORIA_GM_V2.md`: auditoria técnica e visual.
- `CHECKLIST_CONTEUDO_GM_V2.md`: conteúdo necessário para evolução da loja.
- `SHOPIFY_CHECKOUT.md`: integração do checkout.
- `README.md`: comandos básicos.

## Conteúdo excluído do pacote portátil

As pastas abaixo são locais ou reconstruíveis e não são necessárias para
retomar o projeto:

- `node_modules`
- `.next`
- `.vercel/output`
- `work`
- `outputs`

O histórico completo do Git é fornecido separadamente em um arquivo `.bundle`.
