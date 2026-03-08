import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormHelperText,
  Grid,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import SectionHeader from "../Header/SectionHeader";
import { RoundsOptions } from "../../config";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  Close,
  Sports,
} from "@mui/icons-material";
import SingleContenderCard from "../DynamicView/SingleContenderCard";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MatchPickerModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    matchesData: any;
    rounds: any;
    setValue: any;
    watch: any;
    bracketName: string;
    changeMatch: any;
  }>,
) {
  const [selectedMatchId, setSelectedMatchId] = useState<string>(
    props.watch("match"),
  );

  useEffect(() => {
    setSelectedMatchId(props.watch("match"));
  }, [props.watch("match")]);

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle sx={{ p: 1, width: "100%" }}>
        <Grid
          size={12}
          container
          alignItems={"center"}
          justifyContent={"space-between"}
          p={2}
          sx={{
            borderBottom: "1px solid #eeeeee",
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ color: "#1a1a1a" }}>
            Selecionar Partida de {props.bracketName}
          </Typography>
          <IconButton
            size="small"
            onClick={props.handleModalClose}
            sx={{ color: "#9e9e9e" }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Grid>
      </DialogTitle>
      <Grid overflow={"auto"} width={"100%"}>
        <Grid
          container
          alignItems={"center"}
          m={6}
          mt={1}
          size={12}
          spacing={1}
          wrap="nowrap"
        >
          {props.rounds.map((roundNumber: any, index: number) => (
            <Grid key={index} size={6} container sx={{ minWidth: 400 }}>
              <Grid size={10} container spacing={4} direction={"column"}>
                <Grid px={2} size={12} container alignItems={"center"}>
                  <SectionHeader
                    title={
                      RoundsOptions.find(
                        (item) => Number(item.value) === roundNumber,
                      )?.label!
                    }
                    icon={<Sports sx={{ fontSize: 22 }} />}
                  ></SectionHeader>
                </Grid>
                {props.matchesData
                  ?.filter((item: any) => item.round_number === roundNumber)
                  .map((match: any, index: number) => {
                    const is2Winner =
                      match.winner?.id === match.contender_2?.id &&
                      match.kataresult?.flags_contender_2! >
                        match.kataresult?.flags_contender_1!;
                    const isOngoing = match.ongoing;
                    const matchFinished =
                      !match.ongoing &&
                      match.kataresult?.flags_contender_2 != null &&
                      match.kataresult?.flags_contender_1 != null &&
                      match.winner !== null;
                    return (
                      <Grid
                        size={12}
                        spacing={2}
                        key={index}
                        container
                        p={2}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        borderRadius={4}
                        bgcolor={"#d7ecfc"}
                        border={"1px solid #9dd3fc"}
                        onClick={() => {
                          if (match.id === selectedMatchId) {
                            setSelectedMatchId("");
                          } else {
                            setSelectedMatchId(String(match.id));
                          }
                        }}
                        sx={{
                          transition: "0.3s",
                          opacity: matchFinished ? "0.4" : 1,
                          "&:hover": {
                            cursor: matchFinished ? "default" : "pointer",
                            transform: matchFinished
                              ? "none"
                              : "translateY(-3px)",
                            boxShadow: matchFinished ? 0 : 6,
                            borderColor: matchFinished ? "#9dd3fc" : "#88cafc",
                          },
                        }}
                      >
                        <Grid
                          size={10}
                          container
                          direction={"column"}
                          spacing={2}
                        >
                          <SingleContenderCard
                            roundNumber={roundNumber}
                            contenderNumber={1}
                            isWinner={!is2Winner}
                            points={
                              match.kataresult === null
                                ? 99
                                : match.kataresult?.flags_contender_1
                            }
                            fullName={match.contender_1?.full_name}
                            club={match.contender_1?.club}
                            isMatchFinished={matchFinished}
                            ongoing={isOngoing}
                          ></SingleContenderCard>
                          <SingleContenderCard
                            roundNumber={roundNumber}
                            contenderNumber={2}
                            isWinner={is2Winner}
                            points={
                              match.kataresult === null
                                ? 99
                                : match.kataresult?.flags_contender_2
                            }
                            fullName={match.contender_2?.full_name}
                            club={match.contender_2?.club}
                            isMatchFinished={matchFinished}
                            ongoing={isOngoing}
                          ></SingleContenderCard>
                        </Grid>
                        <Grid size={2}>
                          <IconButton
                            disabled={matchFinished}
                            onClick={() => {
                              if (match.id === selectedMatchId) {
                                setSelectedMatchId("");
                              } else {
                                setSelectedMatchId(String(match.id));
                              }
                            }}
                          >
                            {selectedMatchId === String(match.id) ? (
                              <CheckBox />
                            ) : (
                              <CheckBoxOutlineBlank />
                            )}
                          </IconButton>
                        </Grid>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid ml={5} mr={1} mb={2}>
          {selectedMatchId === "" ? null : (
            <FormHelperText>
              Partida selecionada. Pode alternar entre as partidas anteriores e
              seguintes à escolhida na secção <i>Opções</i>.
            </FormHelperText>
          )}
        </Grid>
      </Grid>
      <DialogActions>
        <Stack
          direction={{
            xs: "row-reverse",
            sm: "row",
          }}
          sx={{
            p: 2,
            pt: 0,
            gap: 2,
            flexShrink: 0,
            alignSelf: { xs: "flex-end", sm: "center" },
          }}
        >
          <Button
            sx={{ px: 2 }}
            size="small"
            color="info"
            variant="contained"
            onClick={() => {
              props.changeMatch(selectedMatchId);
              props.setValue("match", selectedMatchId);
              props.handleModalClose();
            }}
          >
            Prosseguir
          </Button>
          <Button
            sx={{ p: 1 }}
            size="small"
            onClick={() => {
              props.setValue("match", "");
              props.handleModalClose();
            }}
          >
            Voltar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
