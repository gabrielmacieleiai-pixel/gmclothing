# GM Clothing E-commerce

## Objetivo

Site de vendas da GM Clothing, com foco em streetwear masculino premium.

## Stack

- Next.js
- Tailwind CSS
- TypeScript
- Supabase futuramente
- Checkout externo via Shopify ou Yampi

## Como rodar

```bash
npm install
npm run dev
```

Para ativar checkout externo, configure os dados reais da plataforma escolhida.
Yampi continua suportado por `YAMPI_CHECKOUT_BASE_URL` e pelo mapa em
`src/lib/yampi.ts`. Shopify fica preparado por `SHOPIFY_STORE_DOMAIN` e por
`shopifyVariantId` em cada variante de produto.

Para direcionar o atendimento ao número da loja, configure `WHATSAPP_NUMBER`
com DDI e DDD. Sem número, o botão abre o compartilhamento do WhatsApp.

## Como validar

```bash
npm run lint
npm run build
```

## Regras importantes

- Mobile-first
- Produtos têm variantes
- Checkout externo por produto ou variante
- Não expor secrets
