export type InstitutionalPageContent = {
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

export const institutionalPages = {
  exchanges: {
    title: "Trocas e devolucoes",
    eyebrow: "Atendimento GM",
    description:
      "Entenda como solicitar troca ou devolucao de forma simples e segura.",
    href: "/trocas-e-devolucoes",
    sections: [
      {
        title: "Prazo para solicitar",
        body: "Você pode solicitar troca ou devolução em até 7 dias corridos após o recebimento do pedido, desde que a peça esteja sem uso e com etiqueta.",
      },
      {
        title: "Condição da peça",
        body: "A peça precisa estar sem sinais de uso, lavagem, odor, ajustes ou danos. Produtos enviados fora dessas condições podem ser recusados.",
      },
      {
        title: "Como solicitar",
        body: "Fale com a GM Clothing pelo WhatsApp informando numero do pedido, produto e motivo da solicitacao. Nosso atendimento orienta os proximos passos.",
      },
    ],
  },
  shipping: {
    title: "Prazo de envio",
    eyebrow: "Entrega",
    description:
      "Informacoes claras sobre preparo, envio e acompanhamento do pedido.",
    href: "/prazo-de-envio",
    sections: [
      {
        title: "Preparacao do pedido",
        body: "Apos a confirmacao do pagamento, o pedido entra em separacao. O prazo de preparo pode variar conforme o volume do drop.",
      },
      {
        title: "Prazo de transporte",
        body: "O prazo final depende do endereço de entrega e da modalidade escolhida no checkout externo.",
      },
      {
        title: "Acompanhamento",
        body: "Quando o pedido for enviado, o cliente recebe as informações de rastreio pelo canal informado na compra.",
      },
    ],
  },
  payments: {
    title: "Formas de pagamento",
    eyebrow: "Checkout",
    description:
      "A compra e finalizada em ambiente externo seguro, preparado para Yampi.",
    href: "/formas-de-pagamento",
    sections: [
      {
        title: "Checkout externo",
        body: "A GM Clothing utiliza checkout externo para finalizar pedidos com mais seguranca e praticidade.",
      },
      {
        title: "Opcoes disponiveis",
        body: "As formas de pagamento aparecem diretamente no checkout no momento da compra, conforme as opcoes ativas na plataforma.",
      },
      {
        title: "Suporte na compra",
        body: "Se alguma combinação de produto ainda não estiver com checkout configurado, o cliente pode finalizar pelo WhatsApp com suporte da equipe.",
      },
    ],
  },
  privacy: {
    title: "Politica de privacidade",
    eyebrow: "Dados",
    description:
      "Como tratamos informações de contato, compra e atendimento no site.",
    href: "/politica-de-privacidade",
    sections: [
      {
        title: "Dados coletados",
        body: "Podemos coletar dados de contato fornecidos pelo cliente, como nome, e-mail, telefone e WhatsApp, para atendimento, recuperação de carrinho e comunicações da marca.",
      },
      {
        title: "Uso das informações",
        body: "As informações são usadas para processar pedidos, prestar suporte, melhorar a experiência de compra e enviar comunicações quando autorizadas.",
      },
      {
        title: "Seguranca",
        body: "Não publicamos dados sensíveis no site. Pagamentos são direcionados para checkout externo, sem criar gateway próprio dentro da loja.",
      },
    ],
  },
  faq: {
    title: "Duvidas frequentes",
    eyebrow: "FAQ",
    description:
      "Respostas rápidas para comprar com menos fricção e mais confiança.",
    href: "/duvidas-frequentes",
    sections: [
      {
        title: "Como escolher tamanho?",
        body: "O guia de medidas está temporariamente oculto enquanto as medidas oficiais são revisadas. Se tiver dúvida, fale pelo WhatsApp antes de comprar.",
      },
      {
        title: "Produto sem estoque pode ser comprado?",
        body: "Não. Variações sem estoque ficam indisponíveis para seleção e compra.",
      },
      {
        title: "A compra é feita no site?",
        body: "O site funciona como vitrine premium. A finalização acontece em checkout externo quando a variante tem link configurado.",
      },
      {
        title: "Posso comprar pelo WhatsApp?",
        body: "Sim. O WhatsApp continua como alternativa de suporte e compra assistida.",
      },
    ],
  },
} satisfies Record<string, InstitutionalPageContent>;

export const footerHelpLinks = [
  institutionalPages.exchanges,
  institutionalPages.shipping,
  institutionalPages.payments,
  institutionalPages.privacy,
  institutionalPages.faq,
];
