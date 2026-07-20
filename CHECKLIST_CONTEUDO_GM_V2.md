# Checklist de Conteudo GM Clothing V2

Este checklist serve para preparar a V2 sem inventar dados, imagens, precos ou estoque.

## 1. Prioridade comercial

Responder primeiro:

- Qual e o produto numero 1 da Colecao Inverno?
- Qual produto deve aparecer no hero principal?
- Quais 3 produtos de inverno devem aparecer logo abaixo do hero?
- Quais camisetas caneladas entram em GM Essentials?
- Quais produtos da Copa devem virar `Ultimas Pecas`?
- Existe algum produto que deve ficar oculto temporariamente?

## 2. Produtos da Colecao Inverno

Para cada produto:

- Nome oficial.
- Slug desejado, se houver.
- Tipo: sueter grosso, trico leve, polo tricot, outro.
- Colecao: Inverno.
- Subcolecao, se houver.
- Cores reais.
- Tamanhos reais.
- Estoque por cor/tamanho.
- Preco.
- Preco promocional, se existir.
- Produto ativo ou oculto.
- Ordem de prioridade.
- Caracteristicas reais da peca.
- Composicao do tecido, se souber.
- Cuidados de lavagem.
- Guia de medidas.
- Link/token de checkout, se ja existir.

## 3. GM Essentials

Para cada camiseta canelada ou basico:

- Nome oficial.
- Cores.
- Tamanhos.
- Estoque.
- Preco.
- Preco promocional.
- Modelagem.
- Composicao.
- Fotos.
- Produto para cross-sell com sueteres: sim/nao.

## 4. GM Street

Produtos que entram aqui:

- Oversized streetwear.
- Estampas urbanas.
- CR7, se fizer sentido como street e nao como Copa.
- Produtos com pegada basquete/lifestyle.

Para cada produto, informar:

- Nome.
- Cores.
- Tamanhos.
- Estoque.
- Preco.
- Fotos.
- Tags: street, basquete, urbano, premium, oversized.

## 5. GM Faith

Produtos que entram aqui:

- Jesus is King.
- Faith Division.
- Salmo 23.
- Outras estampas cristas.

Para cada produto:

- Nome.
- Texto da estampa.
- Cores.
- Tamanhos.
- Estoque.
- Preco.
- Fotos.
- Nivel de destaque: alto, medio, discreto.

## 6. Ultimas Pecas

Produtos candidatos:

- Brasil.
- Argentina.
- Retro.
- CR7, se for estoque sazonal.
- Produtos com estoque quebrado.

Para cada produto:

- Manter ativo: sim/nao.
- Aparecer na home: sim/nao.
- Preco atual.
- Preco promocional.
- Estoque por tamanho.
- Deve ter selo `Ultimas pecas`: sim/nao.
- Deve aparecer apenas em colecao discreta: sim/nao.

## 7. Fotos

Para cada produto, enviar ou confirmar:

- Foto frontal.
- Foto costas.
- Foto lateral.
- Foto detalhe do tecido.
- Foto detalhe de gola/barra/etiqueta.
- Foto lifestyle com modelo.
- Foto para hero/banner, se existir.
- Video curto, se existir.

Padrao desejado:

- Preferir WebP ou AVIF.
- Fundo limpo.
- Sem alterar cor/modelagem.
- Sem IA mudando rosto, tecido, estampa ou caimento.
- Nomear arquivos de forma clara.

Modelo de pasta sugerido:

```text
public/products/
  winter/
    sueter-premium-caramelo/
      01-front.webp
      02-side.webp
      03-back.webp
      04-detail.webp
      05-lifestyle.webp
  essentials/
  street/
  faith/
  last-chance/
```

## 8. Home V2

Precisamos definir:

- Imagem principal do hero Inverno.
- Texto final do hero.
- CTA principal.
- CTA secundario.
- Quais produtos aparecem em `Novos sueteres`.
- Quais produtos aparecem em `GM Essentials`.
- Quais categorias aparecem em cards.
- Quais fotos lifestyle entram.
- Quais produtos entram em `Mais vendidos`.
- Quais produtos entram em `Ultimas Pecas`.
- Se entra bloco Instagram/prova social agora ou depois.

## 9. Politicas e confianca

Confirmar:

- Prazo de envio.
- Forma de envio.
- Politica de troca.
- Formas de pagamento.
- Politica de privacidade.
- WhatsApp oficial.
- Horario de atendimento.
- Cidade/base da marca.
- Informacoes de CNPJ/empresa, se devem aparecer.

## 10. Checkout

Escolher caminho:

- Yampi por variante.
- WhatsApp assistido por enquanto.
- Shopify no futuro.
- Shopify agora.

Se for Yampi:

- Enviar tokenReference por produto/cor/tamanho.
- Confirmar se carrinho com multiplos itens sera Yampi, pacote manual ou WhatsApp.

Se for Shopify:

- Confirmar se a loja ja existe.
- URL/admin da Shopify.
- Se sera tema nativo ou storefront customizado.
- Criar app personalizada.
- Permissoes necessarias.
- Credenciais somente via variavel de ambiente.
- Validar dry-run antes de criar produtos reais.

## 11. Dominio e publicacao

Confirmar:

- Dominio principal final.
- Se sera `gmclothing.com.br`, `gmclo.com.br` ou outro.
- Qual projeto Vercel deve ficar ativo.
- Se o projeto duplicado `gmclothing` pode ser arquivado/removido depois.
- Quem gerencia DNS.

## 12. Primeiras perguntas objetivas

Para seguir para a implementacao V2, responda esta primeira leva:

1. Qual produto de inverno vai ser o hero principal?
2. Quais sao os 3 produtos de inverno mais importantes?
3. Ja existem fotos finais dos sueteres ou ainda preciso usar as imagens atuais da pasta `colecao-frio`?
4. Quais produtos da Copa devem virar `Ultimas Pecas`?
5. O checkout da proxima versao sera Yampi por variante ou WhatsApp assistido temporariamente?
