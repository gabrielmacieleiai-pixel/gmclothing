# GM Clothing E-commerce

## Objetivo

Site de vendas da GM Clothing, com foco em streetwear masculino premium.

## Stack

- Next.js
- Tailwind CSS
- TypeScript
- Supabase futuramente
- Checkout externo via Yampi

## Como rodar

```bash
npm install
npm run dev
```

Para ativar o checkout externo, configure `YAMPI_CHECKOUT_BASE_URL` usando uma
URL real da Yampi. A URL pode conter `{sku}` para gerar um destino por variante.

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
