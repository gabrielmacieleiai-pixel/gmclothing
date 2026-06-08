# AGENTS.md — GM Clothing E-commerce

## Contexto do projeto

Este projeto é o e-commerce da GM Clothing, uma marca masculina streetwear premium de Balneário Camboriú. A estética da marca deve ser clean, urbana, premium, com influência de streetwear, basquete e identidade cristã discreta.

O objetivo principal do site é vender camisetas, camisetas de seleção, acessórios e futuros lançamentos com uma experiência rápida, bonita e confiável.

## Prioridades de negócio

1. Aumentar conversão.
2. Facilitar compra pelo cliente.
3. Deixar o visual premium e limpo.
4. Evitar telas poluídas.
5. Priorizar velocidade no mobile.
6. Facilitar cadastro de produtos, variantes, fotos e estoque.
7. Integrar com checkout externo da Yampi quando aplicável.

## Estética e UI

* Visual premium, clean e moderno.
* Usar bastante espaço em branco ou preto, dependendo da página.
* Evitar excesso de texto.
* Priorizar fotos grandes de produto.
* Botões claros e objetivos.
* CTAs fortes: “Comprar agora”, “Ver coleção”, “Garantir minha peça”.
* Mobile-first sempre.
* Não usar visual genérico de loja amadora.
* Inspirar-se em marcas como Nike, Represent, Fear of God Essentials e streetwear premium.

## Estrutura esperada do e-commerce

O site deve conter:

* Home com hero forte.
* Seção de lançamentos.
* Página de coleção.
* Página de produto.
* Variações por tamanho e cor.
* Estoque por variação.
* Carrinho simples.
* Redirecionamento para checkout externo quando necessário.
* Página “Sobre a marca”.
* Página de contato/WhatsApp.
* Área administrativa simples para produtos, fotos, preços e estoque.

## Regras de produto

* Cada produto representa uma estampa/modelagem/proposta principal.
* Tamanho e cor devem ser variantes do mesmo produto.
* Não criar um produto separado para cada tamanho.
* Separar produtos quando mudar estampa principal, modelagem, proposta visual ou preço.
* O preço padrão das camisetas oversized é R$120, mas o sistema deve permitir alteração.
* O site deve suportar promoções e preço anterior/preço atual.

## Checkout

* Não criar gateway de pagamento próprio sem solicitação explícita.
* Priorizar integração com checkout externo da Yampi.
* O botão de compra deve enviar o cliente para o checkout correto, considerando produto e variação quando possível.
* Se a integração exata ainda não estiver disponível, criar uma estrutura preparada para receber links de checkout por produto ou variante.

## Performance

* O site deve ser rápido no mobile.
* Otimizar imagens.
* Evitar bibliotecas pesadas sem necessidade.
* Usar componentes reutilizáveis.
* Manter código simples, limpo e fácil de editar.

## SEO e conteúdo

Cada produto deve ter:

* Nome claro.
* Descrição curta e persuasiva.
* Descrição detalhada.
* Preço.
* Fotos.
* Tamanhos disponíveis.
* Cores disponíveis.
* Tags ou coleção.
* Texto focado em conversão, sem parecer forçado.

## Comandos do projeto

Use estas ações conforme necessário:

* `npm install`: instalar dependências ao preparar o ambiente ou após mudanças no `package.json` ou lockfile.
* `npm run dev`: iniciar o servidor local durante o desenvolvimento.
* `npm run build`: validar e gerar a versão de produção.
* `npm run lint`: verificar a qualidade e os padrões do código.

Antes de finalizar qualquer tarefa, rode:

* `npm run lint`
* `npm run build`

Se houver testes configurados, rode também:

* `npm test`

Se algum comando falhar, corrija antes de considerar a tarefa concluída.

## Padrão de entrega

Ao finalizar uma tarefa, explique:

1. O que foi alterado.
2. Quais arquivos principais foram modificados.
3. Como testar.
4. Quais comandos foram executados.
5. Se ficou algo pendente ou assumido.

## Restrições

* Não remover funcionalidades existentes sem autorização.
* Não alterar regras de preço sem explicar.
* Não adicionar dependências novas sem justificar.
* Não expor chaves, tokens ou segredos no código.
* Nunca criar ou commitar arquivos `.env` reais. Usar `.env.example` como referência.
* Não criar checkout fake como se fosse pagamento real.
* Não usar dados sensíveis reais em exemplos.
* Não deixar páginas quebradas no mobile.

## Tom da marca

A comunicação deve ser direta, premium e urbana. Evitar textos exagerados. Usar frases curtas e fortes.

Exemplos de tom:

* “Vista propósito.”
* “Streetwear com identidade.”
* “Peças limitadas. Presença real.”
* “Criada para quem não veste qualquer coisa.”
