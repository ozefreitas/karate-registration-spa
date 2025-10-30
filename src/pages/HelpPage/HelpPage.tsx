import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";

export default function HelpPage() {
  return (
    <div>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title={"Página de Ajuda."}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Nesta página pode encontrar todas as informações e ajudas que irá
          necessitar para o preenchimento dos formulários e navegação nesta
          plataforma.
        </CardContent>
      </Card>
      <Grid container size={12}>
        <Grid size={6}>
          <Grid size={12}>
            <Card sx={{ m: 2 }}>
              <CardHeader
                title={"Criação de Conta e Login"}
                sx={{
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
              ></CardHeader>
              <CardContent>
                Quando não tiver nenhuma sessão iniciada, irão aparecer no canto
                superior esquerdo dois botões: Login e Pedir Conta. Use Login
                para entrar na sua conta e Pedir Conta caso ainda não possua
                uma. <br />
                Quando cria uma conta, terá de escolher um nome de utilizador
                pré-definido, este nome irá remeter para o nome do Clube e
                utilizado nas provas.
                <br />O Login deverá sempre ser efetuado com este exato
                username!
              </CardContent>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card sx={{ m: 2 }}>
              <CardHeader
                title={"Atletas"}
                sx={{
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
              ></CardHeader>
              <CardContent>
                Os Atletas servem como referência para todos as provas a
                realizar, ou seja, serão a partir destes que terão de selecionar
                para cada prova. Atletas por si só (na página de Atletas) NÂO
                SERVEM COMO INSCRIÇÃO EM QUALQUER PROVA!<p></p>
                <Accordion sx={{ m: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: "bold" }}
                      component="span"
                    >
                      Formulário de registo de Atleta
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    Este formulário contém um número de campos necessários para
                    identificar um Atleta. Os campos obrigatórios estão marcados
                    com "*". Pode consultar regras mais específicas na própria{" "}
                    <Link to={"/athletes/new_athlete/"}>página</Link>. Registar
                    Atletas não tem nenhuma data nem periodo definidos, pelo que
                    pode (e deve) fazê-lo muito antes e fora do periodo de
                    inscrições em provas.
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ m: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: "bold" }}
                      component="span"
                    >
                      Página de todos os Atletas
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    Ná página de Atletas poderá consultar uma tabela simples com
                    a informação mais importante de cada atletas por linha. Tem
                    também um botão para adicionar um novo Atleta, e que o irá
                    levar para o formulário.
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ m: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: "bold" }}
                      component="span"
                    >
                      Perfil do Atleta
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    Cada Atleta terá uma página de perfil. Aqui poderá consultar
                    toda a informação que inseriu (e mais alguma de interesse)
                    aquando do preenchimento de cada formulário.
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card sx={{ m: 2 }}>
              <CardHeader
                title={"Equipas"}
                sx={{
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
              ></CardHeader>
              <CardContent>
                As Equipas servem como referência para todos as provas a
                realizar, ou seja, serão a partir destes que terão de selecionar
                para cada prova. Equipas por si só (na página de Equipas) NÂO
                SERVEM COMO INSCRIÇÃO EM QUALQUER PROVA!<p></p>
                <Accordion sx={{ m: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: "bold" }}
                      component="span"
                    >
                      Formulário de registo de Equipa
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    Este formulário contém um número de campos necessários para
                    identificar uma Equipa. Os campos obrigatórios estão
                    marcados com "*". Pode consultar regras mais específicas na
                    própria <Link to={"/teams/new_team/"}>página</Link>.
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ m: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: "bold" }}
                      component="span"
                    >
                      Página de todas as Equipas
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    Ná página de Equipas poderá consultar uma tabela simples com
                    a informação mais importante de cada Equipa por linha. Tem
                    também um botão para adicionar uma nova Equipa, e que o irá
                    levar para o formulário.
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{ m: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: "bold" }}
                      component="span"
                    >
                      Perfil da Equipa
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    Cada Equipa terá uma página de perfil. Aqui poderá consultar
                    toda a informação que inseriu (e mais alguma de interesse)
                    aquando do preenchimento de cada formulário. No caso das
                    Equipas, aparecerá um cartão de resumo do Perfil de cada
                    Atleta integrante dessa Equipa, no qual pode clicar para ver
                    os detalhes completos.
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card sx={{ m: 2 }}>
              <CardHeader
                title={"Classificações"}
                sx={{
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
              ></CardHeader>
              <CardContent>
                No final de cada competição será disponibilizado o quadro de
                classificações nesta página. Apenas os lugares de pódio podem
                ser consultados, contudo será disponibilizado um documento .PDF
                com os resultados completos.
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid size={6}>
          <Grid size={12}>
            <Card sx={{ m: 2 }}>
              <CardHeader
                title={"Subscrição"}
                sx={{
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
              ></CardHeader>
              <CardContent>
                A <i>Karate Score App</i> funciona com um sistema de subscrição,
                ou seja, para ter acesso a todas as funcionalidades, terá de
                pagar uma mensalidade. Apenas funções básicas de inscrições em
                eventos estão disponíveis em contas <i>free</i>, e estas com
                limitações. <p></p>
                Para mais informações sobre as possiblidades de pagamento, assim
                como das funcionalidades desbloquaedas com os mesmos, deve
                enviar um email para jpsfreitas12@gmail.com, com o assunto
                "Regimes de subscrição" seguido do seu nome de utilizador.{" "}
                <p></p>
                <strong>Detalhes</strong>: <br />
                Qualquer pessoa à qual o seu adminitrador conceder acesso poderá
                ter uma conta na <i>Karate Score App</i>. Todas as contas
                começam na modalidade <i>free</i>. Utilizadores <i>free</i> não
                terão acesso a qualquer informação detalhada sobre os seus
                atletas, nem mesmo à própria listagem dos mesmos. Em baixo fica
                um resumo das funcionalidades de cada tipo de conta:
                <ul>
                  <li>
                    Conta <i>free</i>: Sem qualquer tipo de acesso a
                    funcionalidades básicas. Única funcionalidade ativa será a
                    de poder inscrever membros do seu Clube em provas
                    determinadas pelo seu administrador. Para isso terá de saber
                    o número identificativo ou nome do membro.
                  </li>
                  <li>
                    Conta <i>subed</i> base: Primeiro regime de subscrição.
                    Acesso a listagem completa dos membros do seu clube, APENAS
                    daqueles registados na base de dados do seu administrador.
                    Ainda impossível registar novos membros. Acesso a informação
                    detalhada de cada membro. Acesso a notificações limitado.
                  </li>
                  <li>
                    Conta <i>subed</i> pro: Regime de subscrição intermédio.
                    Acesso a listagem completa dos membros do seu clube, APENAS
                    daqueles registados na base de dados do seu administrador.
                    Ainda impossível registar novos membros. Acesso a informação
                    detalhada de cada membro. Acesso total a notificações
                    personalizadas.
                  </li>
                  <li>
                    Conta <i>subed</i> elite (<strong>em breve</strong>): Regime
                    de subscrição avançado. Poderá agora registar membros do seu
                    clube na plataforma, os quais apenas você poderá ver e
                    aceder às suas informações. Poderá fazer pedidos diretos ao
                    seu administrador de forma a adicionar um novo membro do seu
                    clube na base de dados central, efetivando assim esse
                    registo com um número de identificação único e posterior
                    inscrição em eventos.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card sx={{ m: 2 }}>
              <CardHeader
                title={"Início"}
                sx={{
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
              ></CardHeader>
              <CardContent>
                A página de Início é um ecrã de resumo onde pode ver informação
                relevante à cerca das suas últimas ações, provas seguintes,
                notificações ou classificações. <br />
                As Notificações têm 5 niveis de importância:
                <ul>
                  <li>Normal - Apenas informativa;</li>
                  <li>
                    <span style={{ color: "green" }}>Verde</span> - Sem
                    importância nem necessidade de ser resolvida em breve;
                  </li>
                  <li>
                    <span style={{ color: "#DBB727" }}>Amarela</span> - Requer
                    alguma atenção;;
                  </li>
                  <li>
                    <span style={{ color: "orange" }}>Laranja</span> - Necessita
                    de ser resolvida em breve;
                  </li>
                  <li>
                    <span style={{ color: "red" }}>Vermelha</span> - Merece
                    completa atenção e deve ser resolvida o mais rápido
                    possível. Deve contactar o seu administrador.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card sx={{ m: 2 }}>
              <CardHeader
                title={"Inscrições"}
                sx={{
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
              ></CardHeader>
              <CardContent>
                As inscrições deverão ser feitas para cada prova, de forma
                independente. Pode inscrever Atletas e Equipas (para as
                competições que o permitirem) a partir do cartão de cada prova.
                As inscrições funcionam a partir da seleção de Atletas
                previamente registados na página Atletas.
              </CardContent>
            </Card>
          </Grid>
          <Grid size={12}>
            <Card sx={{ m: 2 }}>
              <CardHeader
                title={"Eventos"}
                sx={{
                  "& .MuiCardHeader-title": {
                    fontWeight: "bold",
                  },
                }}
              ></CardHeader>
              <CardContent>
                Os Eventos disponíveis são mostradas através de cartões. Cada
                Evento terá:
                <ul>
                  <li>Local;</li>
                  <li>Data de início das inscrições;</li>
                  <li>Data de fim das inscrições;</li>
                  <li>Data de fim de periodo de retificações;</li>
                  <li>Data de realização;</li>
                </ul>
                Lá dentro poderá consultar e inscrever Atletas nesse mesmo
                evento. Apenas poderá inscrever entre a data de início e a de
                fim de inscrições. Até ao fim do periodo de retificações apenas
                poderá fazer edições.
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
