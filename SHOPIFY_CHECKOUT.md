# Shopify checkout - GM Clothing

Este projeto ainda nao cria pagamento proprio. A finalizacao pode ser direcionada para Shopify quando a loja estiver cadastrada.

## Variaveis de ambiente

Configure em `.env.local` apenas na sua maquina ou na Vercel:

```bash
SHOPIFY_STORE_DOMAIN=gm-clothing.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
SHOPIFY_ADMIN_ACCESS_TOKEN=
```

Nunca commitar `.env.local` ou tokens reais.

## Como ligar um produto do site a Shopify

1. Cadastre o produto na Shopify.
2. Cadastre as variantes reais por cor e tamanho.
3. Copie o ID real da variante Shopify.
4. No produto mockado em `src/data/products.ts`, preencha a variante correspondente:

```ts
{
  id: "sueter-chenile-zara-preto-p",
  sku: "GM-CHENILE-PRETO-P",
  color: colors.black,
  size: "P",
  stock: 10,
  shopifyVariantId: "1234567890",
  yampiCheckoutUrl: null,
}
```

O helper aceita tanto ID numerico quanto GID da Shopify no formato `gid://shopify/ProductVariant/1234567890`.

## Ordem de prioridade do checkout

Ao montar a URL de compra, o site tenta:

1. `checkoutUrl` direto na variante.
2. `shopifyVariantId`, gerando link de carrinho Shopify.
3. `yampiCheckoutUrl` direto na variante.
4. Mapa de tokens Yampi em `src/lib/yampi.ts`.
5. `checkoutUrl` ou `yampiCheckoutUrl` do produto.

Se nada estiver configurado, o botao informa o cliente e mantem WhatsApp como alternativa.

## Proximo passo

Quando a conta Shopify estiver pronta, preencher `SHOPIFY_STORE_DOMAIN` e os `shopifyVariantId` das variantes que ja podem vender.
