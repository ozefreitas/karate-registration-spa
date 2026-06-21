import bannerLigaSoshinkai from "./assets/liga_soshinkai_banner.jpg";
import bannerTorneioSMA from "./assets/torneio_sma_banner.jpg";
import bannerRegulamentoGeral from "./assets/regulamento_geral_banner.jpg";
import { stringToColor } from "./dashboard/utils/avatarColor";

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

export const getGraduationFromValue = (gradValue: number) => {
  let gradLabel = undefined;
  GraduationsOptions.forEach((label) => {
    if (gradValue === label.value) {
      gradLabel = label.label;
    }
  });
  return gradLabel;
};

export const MonthOptions: { label: string; value: number }[] = [
  { label: "janeiro", value: 1 },
  { label: "fevereiro", value: 2 },
  { label: "março", value: 3 },
  { label: "abril", value: 4 },
  { label: "maio", value: 5 },
  { label: "junho", value: 6 },
  { label: "julho", value: 7 },
  { label: "agosto", value: 8 },
  { label: "setembro", value: 9 },
  { label: "outubro", value: 10 },
  { label: "novembro", value: 11 },
  { label: "dezembro", value: 12 },
];

export const YearOptions: { label: string; value: number }[] = [
  { label: "2025", value: 2025 },
  { label: "2026", value: 2026 },
  { label: "2027", value: 2027 },
  { label: "2028", value: 2028 },
  { label: "2029", value: 2029 },
  { label: "2030", value: 2030 },
];

export const getMonthFromValue = (monthValue: number) => {
  let monthLabel = undefined;
  MonthOptions.forEach((label) => {
    if (monthValue === label.value) {
      monthLabel = label.label;
    }
  });
  return monthLabel;
};

export const GenderOptions: { label: string; value: string }[] = [
  { label: "Masculino", value: "Masculino" },
  { label: "Feminino", value: "Feminino" },
  { label: "Misto", value: "Misto" },
  { label: "Ambos", value: "Ambos" },
];

export const TierOptions: { label: string; value: string }[] = [
  { label: "Base", value: "base" },
  { label: "Pro", value: "pro" },
  { label: "Elite", value: "elite" },
];

export const ReasonOptions: { label: string; value: string }[] = [
  { label: "Prática Desportiva", value: "sports" },
  { label: "Recomendação Médica", value: "medicine" },
  { label: "Influência de Pais/Amigos", value: "influence" },
  { label: "Defesa Pessoal", value: "defence" },
  { label: "Karate Tradicional", value: "traditional" },
];

export const EncounterOptions: {
  label: string;
  value: string;
  color: string;
}[] = [
  {
    label: "Competição/Torneio",
    value: "comp",
    color: stringToColor("comp"),
  },
  {
    label: "Encontro Regional",
    value: "regional",
    color: stringToColor("regional"),
  },
  {
    label: "Encontro Nacional",
    value: "nacional",
    color: stringToColor("nacionalasFAWSE"),
  },
  {
    label: "Encontro Internacional",
    value: "internacional",
    color: stringToColor("internacional"),
  },
  {
    label: "Instrutores",
    value: "instrutores",
    color: stringToColor("instrutores"),
  },
  { label: "Formação", value: "formacao", color: stringToColor("formacao") },
  {
    label: "Sessão de Exames",
    value: "exames",
    color: stringToColor("exames"),
  },
  { label: "Seminário", value: "seminario", color: stringToColor("seminario") },
  { label: "Workshop", value: "workshop", color: stringToColor("workshop") },
];

export const SeasonOptions: { label: string; value: string }[] = [
  { value: "2024/2025", label: "2024/2025" },
  { value: "2025/2026", label: "2025/2026" },
  { value: "2026/2027", label: "2026/2027" },
  { value: "2027/2028", label: "2027/2028" },
  { value: "2028/2029", label: "2028/2029" },
];

export const MatchTypeOptions: { label: string; value: string }[] = [
  { value: "kata_elim", label: "Kata Individual" },
  { value: "kata_final", label: "Final Kata Individual" },
  { value: "kata_team", label: "Kata Equipa" },
  { value: "kumite_indiv", label: "Kumite Individual" },
  { value: "kumite_team", label: "Kumite Equipa" },
  // { value: "katakumiteequipa", label: "Kata e Kumite Equipa" },
];

export const QuotesOptions: { label: string; value: string }[] = [
  { value: "overdue", label: "Em dívida" },
  { value: "regular", label: "Regular" },
];

export const KataOptions: { label: string; value: string }[] = [
  { value: "none", label: "N/A" },
  { value: "heianshodan", label: "Heian Shodan" },
  { value: "heiannidan", label: "Heian Nidan" },
  { value: "heiansandan", label: "Heian Sandan" },
  { value: "heianyondan", label: "Heian Yondan" },
  { value: "heiangodan", label: "Heian Godan" },
  { value: "tikishodan", label: "Tiki Shodan" },
  { value: "tikinidan", label: "Tiki Nidan" },
  { value: "tikisandan", label: "Tiki Sandan" },
  { value: "bassaidai", label: "Bassai Dai" },
  { value: "bassaisho", label: "Bassai Sho" },
  { value: "kankudai", label: "Kanku Dai" },
  { value: "kankusho", label: "Kanku Sho" },
  { value: "enpi", label: "Enpi" },
  { value: "jion", label: "Jion" },
  { value: "gankaku", label: "Gankaku" },
  { value: "hangetsu", label: "Hangetsu" },
  { value: "jitte", label: "Jitte" },
  { value: "chinte", label: "Chinte" },
  { value: "sochin", label: "Sochin" },
  { value: "meikyo", label: "Meikyo" },
  { value: "jiin", label: "Jiin" },
  { value: "gojushihodai", label: "Gojushiho Dai" },
  { value: "gojushihosho", label: "Gojushiho Sho" },
  { value: "ninjushiho", label: "Ninjushiho" },
  { value: "wankan", label: "Wankan" },
  { value: "unsi", label: "Unsu" },
];

export const MemberTypes: { value: string; label: string }[] = [
  { value: "student", label: "Aluno" },
  { value: "athlete", label: "Competidor" },
  { value: "coach", label: "Treinador" },
];

export const PaymentTypes: { value: string; label: string }[] = [
  { value: "quotes", label: "Quotas" },
  { value: "insurence", label: "Seguro Desportivo" },
  { value: "events", label: "Eventos" },
];

export const DrawFormatTypes: {
  value: string;
  label: string;
  description: string;
}[] = [
  {
    value: "torneio",
    label: "Torneio",
    description:
      "Rondas de eliminação, sem repescagem, até apuramento do pódio.",
  },
  {
    value: "grupos",
    label: "Liga",
    description:
      "Formação de grupos por Escalão. Pódio interno dentro de cada grupo.",
  },
  {
    value: "misto",
    label: "Misto",
    description:
      "Rondas de eliminação até apuramento de uma Final. Seguem para pontuações em prestações individuais.",
  },
];

export const RoundsOptions: { value: string; label: string }[] = [
  { value: "0", label: "Final" },
  { value: "1", label: "Semi-Final" },
  { value: "2", label: "Quartos-Final" },
  { value: "3", label: "Oitavos-Final" },
  { value: "4", label: "16-Avos-Final" },
];

export const RulesOptions: {
  image: string;
  file: string;
  rename: string;
  disabled: boolean;
}[] = [
  {
    image: bannerLigaSoshinkai,
    file: "/files/liga_soshinkai_rules.pdf",
    rename: "Regras_Liga_Shoshinkai",
    disabled: false,
  },
  {
    image: bannerTorneioSMA,
    file: "/files/torneio_sma_rules.pdf",
    rename: "Regras_Torneio_SMA",
    disabled: true,
  },
  {
    image: bannerRegulamentoGeral,
    file: "/files/geral_rules.pdf",
    rename: "Regras_Gerais",
    disabled: true,
  },
];

export const FeedbackOptions: { value: string; label: string }[] = [
  { value: "general", label: "Geral" },
  { value: "draw", label: "Sorteios" },
  { value: "event", label: "Eventos" },
  { value: "member", label: "Membros" },
];
