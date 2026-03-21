import {
  Box,
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
import React, { useEffect, useRef, useState } from "react";
import SectionHeader from "../Header/SectionHeader";
import { RoundsOptions } from "../../config";
import {
  ArrowBackIos,
  ArrowForwardIos,
  CheckBox,
  CheckBoxOutlineBlank,
  Close,
  Sports,
} from "@mui/icons-material";
import SingleContenderCard from "../DynamicView/SingleContenderCard";
import { authHooks, drawsHooks } from "../../hooks";
import { useAuth } from "../../access/GlobalAuthProvider";

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
    getValues: any;
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

  const { user } = useAuth();

  const patchOngoingMatch = drawsHooks.usePatchMatch(user?.role!);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = gridRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft + 35 + el.clientWidth < el.scrollWidth - 1);
  };

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
          <Grid>
            <Typography variant="h6" fontWeight={700} sx={{ color: "#1a1a1a" }}>
              Selecionar Partida de {props.bracketName}
            </Typography>
            <Typography variant="body2">
              Partida a amarelo é a que está a ser apresentada no ecrã num dado
              momento.
            </Typography>
          </Grid>
          <IconButton
            size="small"
            onClick={props.handleModalClose}
            sx={{ color: "#9e9e9e" }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Grid>
      </DialogTitle>

      <Grid
        ref={gridRef}
        overflow={"auto"}
        onScroll={handleScroll}
        sx={{
          "&::-webkit-scrollbar": {
            height: 5,
            width: 5,
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: 10,
          },
        }}
      >
        <Grid
          container
          alignItems={"center"}
          my={3}
          width={"fit-content"}
          pl={10}
          size={12}
          wrap="nowrap"
          // sx={{
          //   maskImage:
          //     "linear-gradient(to left, transparent 0%, black 5%, black 95%, transparent 100%)",
          // }}
        >
          <Box
            onClick={() =>
              gridRef.current?.scrollBy({ left: -300, behavior: "smooth" })
            }
            sx={{
              position: "absolute",
              left: 0,
              top: 95,
              bottom: 95,
              zIndex: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              px: 5,
              background:
                "linear-gradient(to right, rgba(255,255,255,0.9) 45%, transparent 100%)",
            }}
          >
            {canScrollLeft && (
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  bgcolor: "error.main",
                  boxShadow: 3,
                  color: "white",
                  transition: "0.2s",
                  "&:hover": {
                    bgcolor: "error.dark",
                    boxShadow: 6,
                    transform: "scale(1.1)",
                  },
                }}
              >
                <ArrowBackIos
                  fontSize="small"
                  sx={{ color: "text.secondary", ml: 0.8 }}
                />
              </Box>
            )}
          </Box>

          <Box
            onClick={() =>
              gridRef.current?.scrollBy({ left: 300, behavior: "smooth" })
            }
            sx={{
              position: "absolute",
              right: 0,
              top: 95,
              bottom: 95,
              zIndex: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              px: 10,
              background:
                "linear-gradient(to left, rgba(255,255,255,0.9) 45%, transparent 100%)",
            }}
          >
            {canScrollRight && (
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  bgcolor: "error.main",
                  boxShadow: 3,
                  color: "white",
                  transition: "0.2s",
                  "&:hover": {
                    bgcolor: "error.dark",
                    boxShadow: 6,
                    transform: "scale(1.1)",
                  },
                }}
              >
                <ArrowForwardIos
                  fontSize="small"
                  sx={{ color: "text.secondary" }}
                />
              </Box>
            )}
          </Box>

          {props.rounds.map((roundNumber: any, index: number) => (
            <Grid key={index} container sx={{ minWidth: 550 }}>
              <Grid size={10} container spacing={6} direction={"column"}>
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
                    const hasBothContenders =
                      match.contender_1 !== null && match.contender_2 !== null;
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
                          if (String(match.id) === selectedMatchId) {
                            setSelectedMatchId("");
                          } else {
                            setSelectedMatchId(String(match.id));
                          }
                        }}
                        sx={{
                          transition: "0.3s",
                          opacity:
                            matchFinished || !hasBothContenders ? "0.4" : 1,
                          "&:hover": {
                            cursor:
                              matchFinished || !hasBothContenders
                                ? "default"
                                : "pointer",
                            transform:
                              matchFinished || !hasBothContenders
                                ? "none"
                                : "translateY(-3px)",
                            boxShadow:
                              matchFinished || !hasBothContenders ? 0 : 6,
                            borderColor:
                              matchFinished || !hasBothContenders
                                ? "#9dd3fc"
                                : "#88cafc",
                          },
                        }}
                      >
                        {roundNumber === 0 && (
                          <Grid container size={12} justifyContent={"flex-end"}>
                            <Box
                              sx={{
                                width: "fit-content",
                                border: "1px solid red",
                                fontSize: 14,
                                px: 1,
                                py: 0.5,
                                borderRadius: 2,
                              }}
                            >
                              {match.match_number === 1
                                ? "1º e 2º Lugares"
                                : "3º e 4º Lugares"}
                            </Box>
                          </Grid>
                        )}
                        <Grid
                          size={10}
                          container
                          direction={"column"}
                          spacing={2}
                        >
                          <SingleContenderCard
                            roundNumber={roundNumber}
                            matchNumber={match.match_number}
                            contenderNumber={1}
                            isWinner={!is2Winner}
                            points={
                              match.kataresult === null ||
                              (match.kataresult?.flags_contender_1 === 0 &&
                                match.kataresult?.flags_contender_2 === 0)
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
                            matchNumber={match.match_number}
                            contenderNumber={2}
                            isWinner={is2Winner}
                            points={
                              match.kataresult === null ||
                              (match.kataresult?.flags_contender_1 === 0 &&
                                match.kataresult?.flags_contender_2 === 0)
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
                            disabled={matchFinished || !hasBothContenders}
                            onClick={() => {
                              if (String(match.id) === selectedMatchId) {
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
              patchOngoingMatch.mutate(
                {
                  matchId: Number(selectedMatchId),
                  data: { ongoing: true },
                },
                {
                  onSuccess: () => {
                    props.changeMatch(selectedMatchId);
                    props.setValue("match", selectedMatchId);
                  },
                },
              );
              props.handleModalClose();
            }}
          >
            Prosseguir
          </Button>
          <Button
            sx={{ p: 1 }}
            size="small"
            onClick={() => {
              setSelectedMatchId(props.getValues("match"));
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
