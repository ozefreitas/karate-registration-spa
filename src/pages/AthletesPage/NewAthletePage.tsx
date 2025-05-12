import { Card, CardContent, CardHeader } from "@mui/material";

export default function NewAthletePage() {
  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de criação de Atletas"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá registar cada Atleta/Aluno. Todos têm um conjunto de
          informação que é obrigatória.<p></p>
          <strong>Importante</strong>: A regras em vigor ditam que a idade
          considerada para determinação de escalão é a idade que uma atleta tem
          no primeiro dia do último ano da presente época. <br /> Por exemplo:
          Um atleta nascido no dia 16 de dezembro de 2010 terá, para todas as
          provas da época 2024/2025, 14 anos, independentemente da idade a que
          se apresentar a dada prova. Isto é, havendo uma prova no dia 02 de
          novembro de 2024, o atleta terá na realidade 13 anos e por isso seria
          Juvenil, no entanto, essa não é a idade tida em conta, mas sim a do
          dia 1 de janeiro de 2025, onde terá 14 anos e será Cadete.
        </CardContent>
      </Card>
    </>
  );
}
