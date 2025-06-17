export const GraduationsOptions: { label: string; value: number }[] = [
  { label: "9º Kyu", value: 15 },
  { label: "8º Kyu Kari", value: 14.5 },
  { label: "8º Kyu", value: 14 },
  { label: "7º Kyu Kari", value: 13.5 },
  { label: "7º Kyu", value: 13 },
  { label: "6º Kyu Kari", value: 12.5 },
  { label: "6º Kyu", value: 12 },
  { label: "5º Kyu Kari", value: 11.5 },
  { label: "5º Kyu", value: 11 },
  { label: "4º Kyu Kari", value: 10.5 },
  { label: "4º Kyu", value: 10 },
  { label: "3º Kyu Kari", value: 9.5 },
  { label: "3º Kyu", value: 9 },
  { label: "2º Kyu ", value: 8 },
  { label: "1º Kyu", value: 7 },
  { label: "1º Dan", value: 6 },
  { label: "2º Dan", value: 5 },
  { label: "3º Dan", value: 4 },
  { label: "4º Dan", value: 3 },
  { label: "5º Dan", value: 2 },
  { label: "6º Dan", value: 1 },
];

export const CategoryOptions: { label: string; value: string }[] = [
  { label: "Infantil", value: "Infantil" },
  { label: "Iniciado", value: "Iniciado" },
  { label: "Juvenil", value: "Juvenil" },
  { label: "Cadete", value: "Cadete" },
  { label: "Júnior", value: "Júnior" },
  { label: "Sénior", value: "Sénior" },
  { label: "Veterano +35", value: "Veterano +35" },
  { label: "Veterano +50", value: "Veterano +50" },
];

export const GenderOptions: { label: string; value: string }[] = [
  { label: "Masculino", value: "Masculino" },
  { label: "Feminino", value: "Feminino" },
  { label: "Misto", value: "Misto" },
];

export const ReasonOptions: { label: string; value: string }[] = [
  { label: "Prática Desportiva", value: "sports" },
  { label: "Recomendação Médica", value: "medicine" },
  { label: "Influência de Pais/Amigos", value: "influence" },
  { label: "Defesa Pessoal", value: "defence" },
  { label: "Karate Tradicional", value: "traditional" },
];

export const WeightOptions = {
  Juvenil: [
    { value: "-47", label: "-47Kg" },
    { value: "+47", label: "+47Kg" },
  ],
  Cadete: [
    { value: "-57", label: "-57Kg" },
    { value: "+57", label: "+57Kg" },
  ],
  Júnior: [
    { value: "-65", label: "-65Kg" },
    { value: "+65", label: "+65Kg" },
  ],
  Sénior: [{ value: "open", label: "Open" }],
  "Veterano +35": [{ value: "open", label: "Open" }],
  "Veterano +50": [{ value: "open", label: "Open" }],
};

export const EncounterOptions: { label: string; value: string }[] = [
  { label: "Regional", value: "regional" },
  { label: "Nacional", value: "nacional" },
  { label: "Internacional", value: "internacional" },
  { label: "Instrutores", value: "instrutores" },
  { label: "Formação", value: "formacao" },
  { label: "Sessão de Exames", value: "exames" },
  { label: "Seminário", value: "seminario" },
];

export const SeasonOptions: { label: string; value: string }[] = [
  { value: "2425", label: "2024/2025" },
  { value: "2526", label: "2025/2026" },
  { value: "2627", label: "2026/2027" },
  { value: "2728", label: "2027/2028" },
  { value: "2829", label: "2028/2029" },
];

export const MatchTypeOptions: { label: string; value: string }[] = [
  { value: "kata", label: "Kata" },
  { value: "kumite", label: "Kumite" },
  { value: "katakumite", label: "Kata e Kumite" },
  // { value: "kataequipa", label: "Kata Equipa" },
  // { value: "kumiteequipa", label: "Kumite Equipa" },
  // { value: "katakumiteequipa", label: "Kata e Kumite Equipa" },
];

export const NotificationUrgencyOptions: { label: string; value: string }[] = [
  { value: "green", label: "Verde" },
  { value: "yellow", label: "Amarelo" },
  { value: "orange", label: "Laranja" },
  { value: "red", label: "Vermelho" },
];