export const memberOrderingOptions: { value: string; label: string }[] = [
  { value: "first_name", label: "Ascendente" },
  { value: "-first_name", label: "Descendente" },
  { value: "gender", label: "Ascendente" },
  { value: "-gender", label: "Descendente" },
  { value: "member_type", label: "Ascendente" },
  { value: "-member_type", label: "Descendente" },
  { value: "-birth_date", label: "Ascendente" },
  { value: "birth_date", label: "Descendente" },
];

export const eventOrderingOptions: { value: string; label: string }[] = [
  { value: "name", label: "Ascendente" },
  { value: "-name", label: "Descendente" },
  { value: "event_date", label: "Ascendente" },
  { value: "-event_date", label: "Descendente" },
  { value: "start_registration", label: "Ascendente" },
  { value: "-start_registration", label: "Descendente" },
];

export const quotesOrderingOptions: { value: string; label: string }[] = [
  { value: "year", label: "Ascendente" },
  { value: "-year", label: "Descendente" },
  { value: "month", label: "Ascendente" },
  { value: "-month", label: "Descendente" },
  { value: "paid", label: "Ascendente (Em Falta 1º)" },
  { value: "-paid", label: "Descendente (Pago 1º)" },
  { value: "paid_at", label: "Mais Recentes 1º" },
  { value: "-paid_at", label: "Mais Antigas 1º" },
];
