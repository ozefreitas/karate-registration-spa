import KataElimControl from "../ControlPages/KataElimControl";
import KataFinalControl from "../ControlPages/KataFinalControl";
import KataTeamControl from "../ControlPages/KataTeamControl";
import KumiteIndivControl from "../ControlPages/KumiteIndivControl";
import KumiteTeamControl from "../ControlPages/KumiteTeamControl";
import { Grid, Typography, Chip, Button } from "@mui/material";
import InfoRow from "../../components/General/InfoRow";
import { Person, AdsClick, Send } from "@mui/icons-material";
import FormCard from "../../dashboard/FormCard";

export default function ControlPage(
  props: Readonly<{
    currentScreen: string;
    currentMatch: any;
    matchesData: any;
    watch: any;
    sendMatchState: any;
    handleBracketModalOpen: any;
    isMatchesLoading: any;
  }>,
) {
  return (
    <FormCard
      title={
        props.currentScreen === ""
          ? "Secção de Controlo"
          : `Controlos de ${props.currentScreen}`
      }
      subheader="Veja a partida que está a decorrer neste momento, e faça operações."
    >
      {props.matchesData?.find(
        (item: any) => String(item.id) === props.watch("match"),
      )?.contender_1 !== null &&
      props.matchesData?.find(
        (item: any) => String(item.id) === props.watch("match"),
      )?.contender_2 !== null &&
      props.watch("bracket") !== "" &&
      props.watch("match") !== "" ? (
        props.currentScreen === "" ? (
          <Grid container size={12} justifyContent={"center"} m={2}>
            <Typography color="textDisabled">
              Selecione um Ecrã para mostrar as informações da partida escolhida
              acima.
            </Typography>
          </Grid>
        ) : (
          <Grid m={2} container size={12} columnSpacing={5} rowSpacing={3}>
            <Grid container size={6}>
              <InfoRow
                color={"Shiro"}
                icon={<Person />}
                value={
                  <Grid
                    container
                    columnGap={2}
                    rowGap={1}
                    size={12}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight={700}>
                      {props.matchesData?.find(
                        (item: any) => String(item.id) === props.watch("match"),
                      )?.contender_1?.full_name ?? "N/A"}
                    </Typography>
                    <Chip
                      size="small"
                      label={`${
                        props.matchesData?.find(
                          (item: any) =>
                            String(item.id) === props.watch("match"),
                        )?.contender_1?.age ?? "N/A"
                      } anos`}
                    ></Chip>
                    <Chip
                      size="small"
                      label={`${
                        props.matchesData?.find(
                          (item: any) =>
                            String(item.id) === props.watch("match"),
                        )?.contender_1?.id_number ?? "N/A"
                      }`}
                    ></Chip>
                    <Chip
                      size="small"
                      label={`${
                        props.matchesData?.find(
                          (item: any) =>
                            String(item.id) === props.watch("match"),
                        )?.contender_1_dorsal ?? "N/A"
                      }`}
                    ></Chip>
                    <Chip
                      size="small"
                      label={
                        props.matchesData?.find(
                          (item: any) =>
                            String(item.id) === props.watch("match"),
                        )?.contender_1?.club ?? "N/A"
                      }
                    ></Chip>
                  </Grid>
                }
              />
            </Grid>
            <Grid container size={6}>
              <InfoRow
                color={"Aka"}
                icon={<Person />}
                value={
                  <Grid
                    container
                    columnGap={2}
                    rowGap={1}
                    size={12}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography fontWeight={700}>
                      {props.matchesData?.find(
                        (item: any) => String(item.id) === props.watch("match"),
                      )?.contender_2?.full_name ?? "N/A"}
                    </Typography>
                    <Chip
                      size="small"
                      label={`${
                        props.matchesData?.find(
                          (item: any) =>
                            String(item.id) === props.watch("match"),
                        )?.contender_2?.age ?? "N/A"
                      } anos`}
                    ></Chip>
                    <Chip
                      size="small"
                      label={`${
                        props.matchesData?.find(
                          (item: any) =>
                            String(item.id) === props.watch("match"),
                        )?.contender_2?.id_number ?? "N/A"
                      }`}
                    ></Chip>
                    <Chip
                      size="small"
                      label={`${
                        props.matchesData?.find(
                          (item: any) =>
                            String(item.id) === props.watch("match"),
                        )?.contender_2_dorsal ?? "N/A"
                      }`}
                    ></Chip>
                    <Chip
                      size="small"
                      label={
                        props.matchesData?.find(
                          (item: any) =>
                            String(item.id) === props.watch("match"),
                        )?.contender_2?.club ?? "N/A"
                      }
                    ></Chip>
                  </Grid>
                }
                reverse={true}
              />
            </Grid>
            <Grid container justifyContent={"flex-end"} size={12}>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  props.sendMatchState();
                }}
                startIcon={<Send />}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        )
      ) : (
        <Grid container m={1} mb={2} alignItems={"center"} gap={5}>
          <Typography color="textDisabled">Sem partidas a decorrer.</Typography>
          <Button
            variant="contained"
            disabled={props.watch("bracket") === "" || props.isMatchesLoading}
            color="primary"
            startIcon={<AdsClick></AdsClick>}
            onClick={props.handleBracketModalOpen}
            loading={props.isMatchesLoading}
          >
            Selecionar Partida
          </Button>
        </Grid>
      )}
      {props.watch("match") !== "" && (
        <>
          {props.currentScreen === "Kata Individual" ? (
            <KataElimControl currentMatchData={props.currentMatch} />
          ) : null}
          {props.currentScreen === "Final Kata Individual" ? (
            <KataFinalControl />
          ) : null}
          {props.currentScreen === "Kumite Individual" ? (
            <KumiteIndivControl />
          ) : null}
          {props.currentScreen === "Kata Equipa" ? <KataTeamControl /> : null}
          {props.currentScreen === "Kumite Equipa" ? (
            <KumiteTeamControl />
          ) : null}
        </>
      )}
    </FormCard>
  );
}
