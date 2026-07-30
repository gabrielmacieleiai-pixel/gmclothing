# Shopify checkout - GM Clothing

Este projeto ainda nao cria pagamento proprio. A finalizacao pode ser direcionada para Shopify quando a loja estiver cadastrada.

## Variaveis de ambiente

Configure em `.env.local` apenas na sua maquina ou na Vercel:

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=wgykiy-hp.myshopify.com
SHOPIFY_STORE_DOMAIN=gm-clothing.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
SHOPIFY_ADMIN_ACCESS_TOKEN=
```

Nunca commitar `.env.local` ou tokens reais.

O dominio da loja nao e segredo. O projeto tambem tem fallback para `wgykiy-hp.myshopify.com`, mas a variavel `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` deixa o checkout claro nos ambientes da Vercel.

## Como ligar um produto do site a Shopify

1. Cadastre o produto na Shopify.
2. Cadastre as variantes reais por cor e tamanho.
3. Copie o ID real da variante Shopify.
4. Preencha o mapa central em `src/data/shopify-variant-ids.ts`.

```ts
export const shopifyVariantIds = {
  "sueter-chenile-zara": {
    preto: {
      p: "1234567890",
    },
  },
};
```

O helper aceita tanto ID numerico quanto GID da Shopify no formato `gid://shopify/ProductVariant/1234567890`.

Enquanto os IDs das variantes nao estiverem preenchidos, o Sueter Chenile Zara usa o handle `sueter-chenile-zara` como fallback e abre a pagina do produto na Shopify.

## Ordem de prioridade do checkout

Ao montar a URL de compra, o site tenta:

1. `checkoutUrl` direto na variante.
2. `shopifyVariantId`, gerando link de carrinho Shopify.
3. `yampiCheckoutUrl` direto na variante.
4. Mapa de tokens Yampi em `src/lib/yampi.ts`.
5. `checkoutUrl` ou `yampiCheckoutUrl` do produto.

Se nada estiver configurado, o botao informa o cliente e mantem WhatsApp como alternativa.

## Carrinho com varios itens

O carrinho interno agora envia multiplos produtos para a Shopify usando permalink
no formato:

```text
https://wgykiy-hp.myshopify.com/cart/VARIANT_ID:QUANTIDADE,VARIANT_ID:QUANTIDADE
```

Para isso funcionar, todos os itens do carrinho precisam ter `shopifyVariantId`
preenchido em `src/data/shopify-variant-ids.ts`.

Se uma variante nao tiver ID, o site bloqueia o redirecionamento em carrinhos
com multiplos itens e mostra uma mensagem para revisar o mapa de variantes.

## Proximo passo

Quando a conta Shopify estiver pronta, preencher `SHOPIFY_STORE_DOMAIN` e os `shopifyVariantId` das variantes que ja podem vender.
