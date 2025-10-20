const labels = {
  AVAILABLE: "disponível",
  LOW_STOCK: "baixo estoque",
  NO_STOCK: "sem estoque",

  PROCESSING: "processando",
  COMPLETED: "concluído",
  CANVELED: "cancelado",

  active: "ativo",
  vacation: "férias",
  ACTIVE: "ativo",
  VACATION: "férias",

  TODO: "a fazer",
  IN_PROGRESS: "em andamento",
  DONE: "concluída",
} as const;

export type LabelKey = keyof typeof labels;

export function getLabelPtbr(labelProp: LabelKey): string {
  return labels[labelProp];
}

export function getLabelFormat(labelProp: string): string {
  return labelProp.replace("-", " ");
}
