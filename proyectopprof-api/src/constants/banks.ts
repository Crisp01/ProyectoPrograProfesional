export const bciBank = {
  id: "bci",
  baseUrl: "https://www.bci.cl",
  benefitsSegment: "/beneficios/beneficios-bci",
} as const;

export const chileBank = {
  id: "chile",
  baseUrl: "https://sitiospublicos.bancochile.cl",
  benefitsSegment: "/personas/beneficios/beneficios-del-dia",
} as const;

export const bankNames = [bciBank.id, chileBank.id] as const;
