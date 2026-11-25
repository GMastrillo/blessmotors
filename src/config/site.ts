export interface PillarItem {
  title: string;
  description: string;
}

export interface SiteConfig {
  language?: "pt-BR" | "en";
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    logoPath: string;
    faviconPath: string;
    cityState: string;
    region: string;
  };
  contact: {
    whatsappNumber: string;
    displayPhone: string;
    email: string;
    addresses: string[];
    neighborhood: string;
    cityStateZip: string;
    businessHours: {
      weekdays: string;
      saturdays: string;
      sundays: string;
    };
  };
  social: {
    instagram?: string;
    facebook?: string;
    linktree?: string;
    tiktok?: string;
    youtube?: string;
  };
  media: {
    heroVideoSrc?: string;
    showroomBannerImage: string;
  };
  pillars: PillarItem[];
  seo: {
    siteUrl: string;
    keywords: string[];
  };
}

export const siteConfig: SiteConfig = {
  language: "pt-BR",
  brand: {
    name: "Bless Motors Multimarcas",
    shortName: "BLESS MOTORS",
    tagline: "SEMINOVOS SELECIONADOS · GARANTIA & PROCEDÊNCIA",
    description:
      "Revenda multimarcas em Joinville, SC. Veículos selecionados com vistoria cautelar, opções abaixo da Tabela FIPE, troca com troco, consignação e financiamento com as principais financeiras.",
    logoPath: "/logo.png",
    faviconPath: "/favicon.png",
    cityState: "JOINVILLE · SC",
    region: "Showroom R. Monsenhor Gercino, 4477",
  },
  contact: {
    whatsappNumber: "554734665858",
    displayPhone: "(47) 3466-5858",
    email: "rafael.blessmotorssc@gmail.com",
    addresses: ["R. Monsenhor Gercino, 4477 - Jarivatuba / Itaum"],
    neighborhood: "Jarivatuba · Itaum",
    cityStateZip: "Joinville - SC · CEP 89210-505",
    businessHours: {
      weekdays: "Segunda a Sexta: 08h00 às 19h00",
      saturdays: "Sábados: 08h00 às 14h00",
      sundays: "Domingos: Atendimento via WhatsApp",
    },
  },
  social: {
    instagram: "https://www.instagram.com/bless.motors/",
    facebook: "https://www.facebook.com/blessmotorsmultimarcas/",
    linktree: "https://linktr.ee/Bless.motors",
  },
  media: {
    showroomBannerImage: "/inventory/nissan-kicks-sl-2018.webp",
  },
  pillars: [
    {
      title: "CONDIÇÕES ABAIXO DA FIPE",
      description:
        "Oportunidades reais abaixo da Tabela FIPE, bônus na troca e financiamento com aprovação facilitada.",
    },
    {
      title: "PROCEDÊNCIA & GARANTIA",
      description:
        "Veículos selecionados, periciados e com opção de cobertura estendida Gestauto para sua tranquilidade.",
    },
    {
      title: "COMPRA, TROCA & CONSIGNAÇÃO",
      description:
        "Avaliação justa do seu usado na hora para venda à vista, troca com troco ou consignação no pátio.",
    },
    {
      title: "ATENDIMENTO EM JOINVILLE",
      description:
        "Loja física na R. Monsenhor Gercino, 4477 e suporte dedicado para compradores de Joinville e região.",
    },
  ],
  seo: {
    siteUrl: "https://blessmotors.com.br",
    keywords: [
      "Bless Motors Multimarcas",
      "Carros Seminovos Joinville",
      "Carros Usados Joinville SC",
      "Revenda de Veículos Jarivatuba",
      "Financiamento Automotivo Joinville",
      "Compra e Venda de Carros SC",
    ],
  },
};
