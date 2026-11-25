import { siteConfig } from "@/config/site";

export function buildWhatsAppLink(message: string, customPhone?: string): string {
  const phone = (customPhone || siteConfig.contact.whatsappNumber).replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildVehicleWhatsAppLink(params: {
  brand: string;
  model: string;
  year: string;
  price?: string;
}): string {
  const isEn = siteConfig.language === "en";
  const message = isEn
    ? `Hello! I would like more details regarding the ${params.brand} ${params.model} (${params.year}) listed on ${siteConfig.brand.name}.`
    : `Olá! Tenho interesse no veículo ${params.brand} ${params.model} (${params.year}) anunciado no site da ${siteConfig.brand.shortName}. Podemos conversar sobre condições e troca?`;
  return buildWhatsAppLink(message);
}

export function buildSourcingWhatsAppLink(params: {
  model: string;
  name: string;
  phone: string;
  specs?: string;
}): string {
  const isEn = siteConfig.language === "en";
  const message = isEn
    ? `Hello! I would like to request an appraisal or vehicle search with ${siteConfig.brand.name}:
- Model: ${params.model}
- Name: ${params.name}
- Phone/WhatsApp: ${params.phone}
- Details: ${params.specs || "Standard"}`
    : `Olá! Gostaria de falar com a ${siteConfig.brand.shortName} sobre avaliação, troca ou busca de veículo:
- Modelo / Assunto: ${params.model}
- Nome: ${params.name}
- Telefone/WhatsApp: ${params.phone}
- Detalhes: ${params.specs || "A combinar"}`;
  return buildWhatsAppLink(message);
}

export function buildVisitScheduleWhatsAppLink(): string {
  const isEn = siteConfig.language === "en";
  const message = isEn
    ? `Hello! I would like to schedule a visit to ${siteConfig.brand.name} in Joinville.`
    : `Olá! Gostaria de agendar uma visita à loja da ${siteConfig.brand.shortName} na R. Monsenhor Gercino, 4477.`;
  return buildWhatsAppLink(message);
}

export function buildConciergeGeneralWhatsAppLink(vehicleName?: string): string {
  const isEn = siteConfig.language === "en";
  let message: string;
  if (isEn) {
    message = vehicleName
      ? `Hello, I am browsing ${siteConfig.brand.name} and would like details about the ${vehicleName}.`
      : `Hello! I would like assistance from ${siteConfig.brand.name}.`;
  } else {
    message = vehicleName
      ? `Olá, estou no site da ${siteConfig.brand.shortName} e gostaria de mais informações sobre o veículo ${vehicleName}.`
      : `Olá! Gostaria de falar com um consultor da ${siteConfig.brand.shortName} em Joinville.`;
  }
  return buildWhatsAppLink(message);
}
