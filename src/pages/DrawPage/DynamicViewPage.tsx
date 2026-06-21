import { useParams, useSearchParams } from "react-router-dom";
import { drawsHooks } from "../../hooks";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemText,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import {
  AccountTree,
  ArrowBackIos,
  ArrowForwardIos,
  Clear,
  East,
  FormatListNumbered,
  LiveTv,
  Settings,
  Sports,
  SportsScore,
  Visibility,
} from "@mui/icons-material";
import FormCard from "../../dashboard/FormCard";
import { Controller, useForm } from "react-hook-form";
import { Fragment, useEffect, useRef, useState } from "react";
import MatchInfoModal from "../../components/DrawModals/MatchInfoModal";
import SingleContenderCard from "../../components/DynamicView/SingleContenderCard";
import SingleTeamContenderCard from "../../components/DynamicView/SingleTeamContenderCard";
import { RoundsOptions } from "../../config";
import SectionHeader from "../../components/Header/SectionHeader";
import { useQueryClient } from "@tanstack/react-query";
import ScoringEntryInfoModal from "../../components/DrawModals/ScoringEntryInfoModal";

export default function DynamicViewPage(props: Readonly<{ userRole: string }>) {
  const [tab, setTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    changeTab(String(newValue));
  };

  const queryClient = useQueryClient();
  useEffect(() => {
    const channel = new BroadcastChannel("match_updates");

    channel.onmessage = (event) => {
      if (event.data.type === "MATCH_UPDATED") {
        queryClient.invalidateQueries({ queryKey: ["brackets"] });
        queryClient.invalidateQueries({ queryKey: ["event-matches"] });
      }
    };

    return () => channel.close();
  }, []);

  const { id: eventId } = useParams();
  const [isMatchInfoModalOpen, setIsMatchInfoModalOpen] =
    useState<boolean>(false);
  const [isScoringEntryInfoModalOpen, setIsScoringEntryInfoModalOpen] =
    useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isTeam, setIsTeam] = useState<boolean>(false);
  const [selectedForInfo, setSelectedForInfo] = useState<number | undefined>(
    undefined,
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const paramBracket = searchParams.get("bracket") ?? "";
  const paramTab = searchParams.get("tab") ?? "";

  const changeBracket = (bracket: string) => {
    setSearchParams((prev) => {
      prev.set("bracket", bracket);
      return prev;
    });
  };

  const changeTab = (tab: string) => {
    setSearchParams((prev) => {
      prev.set("tab", tab);
      return prev;
    });
  };

  const {
    control: eventMetadataControl,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bracket: "",
    },
  });

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (paramBracket === "" && watch("bracket") === "") {
      newParams.delete("bracket");
      setSearchParams(newParams);
    } else {
      setValue("bracket", paramBracket);
    }
    if (paramTab === "") {
      newParams.delete("tab");
      setSearchParams(newParams);
    } else {
      setTab(Number(paramTab));
    }
  }, [paramBracket, paramTab]);

  const handleModalOpen = (matchId: number, isEdit: boolean) => {
    setSelectedForInfo(matchId);
    setIsEditMode(isEdit);
    setIsMatchInfoModalOpen(true);
  };

  const handleModalClose = () => {
    setIsMatchInfoModalOpen(false);
  };

  const handleScoringModalOpen = (
    scoringEntryId: number,
    isEdit: boolean,
    isTeam: boolean,
  ) => {
    console.log(isTeam);
    setSelectedForInfo(scoringEntryId);
    setIsEditMode(isEdit);
    setIsTeam(isTeam);
    setIsScoringEntryInfoModalOpen(true);
  };

  const handleScoringModalClose = () => {
    setIsScoringEntryInfoModalOpen(false);
  };

  const { data: bracketsData } = drawsHooks.useBracketsData(eventId!);
  const {
    data: matchesData,
    isLoading: isMatchesLoading,
    error: matchesError,
    refetch: matchesRefetch,
  } = drawsHooks.useEventMatchesData(watch("bracket"), eventId!);
  const {
    data: scoringEntriesData,
    isLoading: isScoringEntriesLoading,
    error: scoringEntriesError,
    refetch: scoringEntriesRefetch,
  } = drawsHooks.useEventScoringEntriesData(watch("bracket"), eventId!);

  const rounds = [...new Set(matchesData?.map((m) => m.round_number))].sort(
    (a, b) => b - a,
  );

  const has_finals = scoringEntriesData?.length !== 0;

  const endBracket = drawsHooks.useOfficializeBracket();

  const patchOngoingMatch = drawsHooks.usePatchMatch(props.userRole);
  const patchOngoingScoringEntry = drawsHooks.usePatchScoringEntry(
    props.userRole,
  );

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = gridRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 25);
    setCanScrollRight(el.scrollLeft + 45 + el.clientWidth < el.scrollWidth - 1);
  };

  const isKata = bracketsData
    ?.find((item) => watch("bracket") === String(item.id))
    ?.name.includes("Kata");

  return (
    <>
      <PageInfoCard
        description="Aqui pode visualizar as partidas a decorrer do sorteio para esta prova."
        title="Vista Dinâmica"
      ></PageInfoCard>
      <FormCard
        title="Selecionar Escalão"
        subheader="Selecione o Escalão para visualizar o Sorteio"
      >
        <Grid p={2} size={12}>
          <Controller
            name="bracket"
            control={eventMetadataControl}
            render={({ field }) => (
              <TextField
                sx={{
                  "& .MuiSelect-icon": {
                    left: "auto",
                    right: 40,
                  },
                }}
                color="warning"
                variant={"outlined"}
                label="Escalão"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disabled={watch("bracket") === ""}
                          onClick={() => setValue("bracket", "")}
                          edge="end"
                          aria-label="remove bracket selection"
                        >
                          <Clear
                            color={
                              watch("bracket") === "" ? "disabled" : "error"
                            }
                          ></Clear>
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                fullWidth
                select
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  changeBracket(e.target.value);
                }}
                error={!!errors.bracket}
                helperText={errors.bracket?.message}
              >
                <MenuItem sx={{ color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
                {bracketsData?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    <Grid px={1} container spacing={3} alignItems={"center"}>
                      <Typography>{item.name}</Typography>
                      {item.officialized_at === null ? null : (
                        <Chip color="success" label="Realizado"></Chip>
                      )}
                      {item.has_only_scoring_rounds && (
                        <Chip
                          color="warning"
                          size="small"
                          label="Final Direta"
                        ></Chip>
                      )}
                    </Grid>
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        {[undefined, "subed_club", "free_club"].includes(
          props.userRole,
        ) ? null : (
          <Grid size={12} container justifyContent={"flex-end"} m={2}>
            <Button
              startIcon={<SportsScore> </SportsScore>}
              variant="contained"
              disabled={watch("bracket") === ""}
              onClick={() => {
                endBracket.mutate({
                  bracketId: Number(watch("bracket")),
                  data: {},
                });
              }}
            >
              Concluir Escalão
            </Button>
          </Grid>
        )}
      </FormCard>
      {isMatchesLoading ? (
        <Grid mt={5} container size={12} justifyContent={"center"}>
          <CircularProgress />
        </Grid>
      ) : matchesError ? (
        <Grid my={3} container justifyContent="center" size={12}>
          <ListItem sx={{ textAlign: "center" }}>
            <ListItemText primary="Ocorreu um erro ao encontrar as Partidas disponíveis para o Escalão selecionado, tente mais tarde ou contacte um administrador."></ListItemText>
          </ListItem>
          <Button onClick={() => matchesRefetch()}>Refrescar</Button>
        </Grid>
      ) : rounds.length === 0 && !has_finals ? null : (
        <Grid>
          <Tabs
            value={tab}
            onChange={handleChange}
            sx={{ m: 6, borderBottom: "1px solid lightgrey" }}
            aria-label="tabs for different parts of the draw"
          >
            <Tab
              icon={<AccountTree />}
              label="Eliminatórias"
              sx={{ fontSize: 15, mx: 2 }}
            />
            <Tab
              icon={<FormatListNumbered />}
              label="Finais"
              sx={{ fontSize: 15 }}
            />
          </Tabs>
          {rounds.length !== 0 && tab === 0 && matchesData?.length !== 0 ? (
            <Grid
              ref={gridRef}
              overflow={"auto"}
              onScroll={handleScroll}
              m={6}
              px={6}
              py={3}
              sx={{
                maskImage:
                  "linear-gradient(to left, transparent 0%, black 5%, black 95%, transparent 100%)",
                "&::-webkit-scrollbar": {
                  height: 5,
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
              <Box sx={{ width: "80%", position: "absolute" }}>
                <Box
                  onClick={() =>
                    gridRef.current?.scrollBy({
                      left: -300,
                      behavior: "smooth",
                    })
                  }
                  sx={{
                    position: "fixed",
                    left: 200,
                    top: 300,
                    zIndex: 1,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
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
                    position: "fixed",
                    top: 300,
                    right: 150,
                    zIndex: 1,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
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
              </Box>

              <Grid
                container
                alignItems={"center"}
                size={12}
                spacing={5}
                width={"fit-content"}
                wrap="nowrap"
              >
                {rounds.map((roundNumber, index: number) => (
                  <Fragment key={index}>
                    <Grid size={5} container pb={5} sx={{ minWidth: 450 }}>
                      <Grid
                        size={12}
                        sx={{ minWidth: 300 }}
                        container
                        spacing={8}
                        direction={"column"}
                      >
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
                        {matchesData
                          ?.filter((item) => item.round_number === roundNumber)
                          .map((match, index: number) => {
                            const is2Winner = isKata
                              ? match.winner?.id === match.contender_2?.id &&
                                match.kataresult?.flags_contender_2! >
                                  match.kataresult?.flags_contender_1!
                              : match.winner?.id === match.contender_2?.id &&
                                match.kumiteresult?.points_contender_2! >
                                  match.kumiteresult?.points_contender_1!;
                            const isOngoing = match.ongoing;
                            const matchFinished = isKata
                              ? (!match.ongoing &&
                                  match.kataresult?.flags_contender_2 != null &&
                                  match.kataresult?.flags_contender_1 != null &&
                                  match.winner !== null) ||
                                (!match.ongoing &&
                                  match.kataresult === null &&
                                  match.winner !== null)
                              : (!match.ongoing &&
                                  match.kumiteresult?.points_contender_2 !=
                                    null &&
                                  match.kumiteresult?.points_contender_1 !=
                                    null &&
                                  match.winner !== null) ||
                                (!match.ongoing &&
                                  match.kumiteresult === null &&
                                  match.winner !== null);
                            const isFirstRound = roundNumber === rounds[0];
                            return (
                              <Grid container size={12} spacing={2} key={index}>
                                {roundNumber === 0 && (
                                  <Grid
                                    container
                                    size={12}
                                    justifyContent={"flex-end"}
                                  >
                                    <Box
                                      sx={{
                                        width: "fit-content",
                                        border: "1px solid #1976d2",
                                        fontSize: 14,
                                        px: 1,
                                        py: 0.5,
                                        borderRadius: 3,
                                      }}
                                    >
                                      {match.match_number === 1
                                        ? "1º e 2º Lugares"
                                        : "3º e 4º Lugares"}
                                    </Box>
                                  </Grid>
                                )}
                                {isOngoing && (
                                  <Box
                                    sx={{
                                      mt: 1,
                                      width: "fit-content",
                                      bgcolor: "#f59e0b",
                                      color: "white",
                                      fontSize: 12,
                                      fontWeight: 700,
                                      px: 1,
                                      py: 0.5,
                                      borderRadius: 1,
                                      letterSpacing: 1,
                                    }}
                                  >
                                    LIVE
                                  </Box>
                                )}
                                <Grid size={12} spacing={1} container>
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
                                        isKata
                                          ? match.kataresult === null ||
                                            (match.kataresult
                                              ?.flags_contender_1 === 0 &&
                                              match.kataresult
                                                ?.flags_contender_2 === 0)
                                            ? 99
                                            : match.kataresult
                                                ?.flags_contender_1
                                          : match.kumiteresult === null ||
                                              (match.kumiteresult
                                                ?.points_contender_1 === 0 &&
                                                match.kumiteresult
                                                  ?.points_contender_2 === 0)
                                            ? 99
                                            : match.kumiteresult
                                                ?.points_contender_1!
                                      }
                                      fullName={match.contender_1?.full_name}
                                      club={match.contender_1?.club}
                                      isMatchFinished={matchFinished}
                                      ongoing={isOngoing!}
                                      isFirstRound={isFirstRound}
                                    ></SingleContenderCard>
                                    <SingleContenderCard
                                      roundNumber={roundNumber}
                                      matchNumber={match.match_number}
                                      contenderNumber={2}
                                      isWinner={is2Winner}
                                      points={
                                        isKata
                                          ? match.kataresult === null ||
                                            (match.kataresult
                                              ?.flags_contender_1 === 0 &&
                                              match.kataresult
                                                ?.flags_contender_2 === 0)
                                            ? 99
                                            : match.kataresult
                                                ?.flags_contender_2
                                          : match.kumiteresult === null ||
                                              (match.kumiteresult
                                                ?.points_contender_1 === 0 &&
                                                match.kumiteresult
                                                  ?.points_contender_2 === 0)
                                            ? 99
                                            : match.kumiteresult
                                                ?.points_contender_2!
                                      }
                                      fullName={match.contender_2?.full_name}
                                      club={match.contender_2?.club}
                                      isMatchFinished={matchFinished}
                                      ongoing={isOngoing!}
                                      isFirstRound={isFirstRound}
                                    ></SingleContenderCard>
                                  </Grid>
                                  <Grid
                                    size={2}
                                    px={2}
                                    borderRadius={4}
                                    bgcolor={"#fdecea"}
                                    container
                                    alignItems={"center"}
                                    border={"0.2px solid red"}
                                    justifyContent={"center"}
                                    alignContent={"space-evenly"}
                                    minWidth={50}
                                  >
                                    {[
                                      "subed_club",
                                      "free_club",
                                      undefined,
                                    ].includes(props.userRole) ? null : (
                                      <>
                                        <Tooltip
                                          title="Fazer Alterações"
                                          placement="top"
                                        >
                                          <span>
                                            <IconButton
                                              size="small"
                                              onClick={() => {
                                                handleModalOpen(match.id, true);
                                              }}
                                            >
                                              <Settings />
                                            </IconButton>
                                          </span>
                                        </Tooltip>
                                        <Tooltip
                                          title={
                                            match.ongoing
                                              ? "Já está em Direto"
                                              : "Pôr em Direto"
                                          }
                                          placement="right"
                                        >
                                          <span>
                                            <IconButton
                                              size="small"
                                              disabled={
                                                match.ongoing ||
                                                (!match.ongoing &&
                                                  match.kataresult === null &&
                                                  match.winner !== null)
                                              }
                                              onClick={() => {
                                                patchOngoingMatch.mutate({
                                                  matchId: Number(match.id),
                                                  data: { ongoing: true },
                                                });
                                              }}
                                            >
                                              <LiveTv />
                                            </IconButton>
                                          </span>
                                        </Tooltip>
                                      </>
                                    )}

                                    <Tooltip title="Consultar">
                                      <span>
                                        <IconButton
                                          size="small"
                                          // disabled={
                                          //   match.kataresult === null ||
                                          //   match.winner === null
                                          // }
                                          onClick={() => {
                                            handleModalOpen(match.id, false);
                                          }}
                                        >
                                          <Visibility />
                                        </IconButton>
                                      </span>
                                    </Tooltip>
                                  </Grid>
                                </Grid>
                              </Grid>
                            );
                          })}
                      </Grid>
                    </Grid>
                    {/* Connector column — render between rounds, not after the last */}
                    {index < rounds.length - 1 &&
                      (() => {
                        const currentRoundMatches =
                          matchesData?.filter(
                            (item) => item.round_number === roundNumber,
                          ) ?? [];
                        const nextRoundMatches =
                          matchesData?.filter(
                            (item) => item.round_number === rounds[index + 1],
                          ) ?? [];

                        // Each pair of current matches feeds one next-round match
                        // Matches are grouped in pairs: [0,1] → nextMatch[0], [2,3] → nextMatch[1], etc.
                        const CARD_HEIGHT = 95; // height of one SingleContenderCard (px)
                        const CARD_GAP = 16; // spacing={2} between the two cards
                        const MATCH_GAP = 64; // spacing={8} between matches
                        const HEADER_OFFSET = roundNumber === 1 ? -120 : -380; // SectionHeader height
                        // const SVG_HEIGHT = 600; // tall enough to cover all matches

                        return (
                          <Grid
                            size="auto"
                            sx={{ width: 40, position: "relative" }}
                          >
                            <svg
                              width="40"
                              height="10dvh"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                overflow: "visible",
                              }}
                            >
                              {nextRoundMatches.map((_, nextIdx) => {
                                // The two R1 matches that feed this R2 match
                                const matchA = currentRoundMatches[nextIdx * 2];
                                const matchB =
                                  currentRoundMatches[nextIdx * 2 + 1];
                                if (!matchA || !matchB) return null;

                                // Y center of winner card (contender_1 = top card) for each match
                                const matchAY =
                                  HEADER_OFFSET +
                                  nextIdx *
                                    2 *
                                    (CARD_HEIGHT * 2 + CARD_GAP + MATCH_GAP) +
                                  CARD_HEIGHT / 2;

                                const matchBY =
                                  HEADER_OFFSET +
                                  (nextIdx * 2 + 1) *
                                    (CARD_HEIGHT * 2 + CARD_GAP + MATCH_GAP) +
                                  CARD_HEIGHT / 2;

                                // Y of top and bottom cards in the next round match
                                const nextTopY =
                                  HEADER_OFFSET +
                                  nextIdx *
                                    (CARD_HEIGHT * 2 + CARD_GAP + MATCH_GAP) +
                                  CARD_HEIGHT / 2 +
                                  (roundNumber === 1 ? -30 : 210);

                                const nextBottomY =
                                  nextTopY + CARD_HEIGHT + CARD_GAP;

                                return (
                                  <g key={nextIdx}>
                                    {/* Match A winner → next round top card */}
                                    <path
                                      d={`M0 ${matchAY} H20 V${nextTopY} H40`}
                                      fill="none"
                                      stroke="#d1d5db"
                                      strokeWidth={2}
                                      strokeDasharray={
                                        nextRoundMatches[nextIdx]
                                          ? undefined
                                          : "5 3"
                                      }
                                    />
                                    {/* Match B winner → next round bottom card */}
                                    <path
                                      d={`M0 ${matchBY} H20 V${nextBottomY} H40`}
                                      fill="none"
                                      stroke="#d1d5db"
                                      strokeWidth={2}
                                      strokeDasharray={
                                        nextRoundMatches[nextIdx]
                                          ? undefined
                                          : "5 3"
                                      }
                                    />
                                  </g>
                                );
                              })}
                            </svg>
                          </Grid>
                        );
                      })()}
                  </Fragment>
                ))}
                {isScoringEntriesLoading ? (
                  <Grid mt={5} container size={12} justifyContent={"center"}>
                    <CircularProgress />
                  </Grid>
                ) : scoringEntriesError ? (
                  <Grid my={3} container justifyContent="center" size={12}>
                    <ListItem sx={{ textAlign: "center" }}>
                      <ListItemText primary="Ocorreu um erro ao encontrar as Partidas disponíveis para o Escalão selecionado, tente mais tarde ou contacte um administrador."></ListItemText>
                    </ListItem>
                    <Button onClick={() => scoringEntriesRefetch()}>
                      Refrescar
                    </Button>
                  </Grid>
                ) : scoringEntriesData !== undefined &&
                  scoringEntriesData.length > 0 ? (
                  <Grid
                    container
                    direction={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    textAlign={"center"}
                    border={"0.2px solid red"}
                    borderRadius={4}
                    bgcolor={"#fafafa"}
                    p={3}
                    pb={4}
                    boxShadow={4}
                    width={"1000px"}
                    sx={{
                      opacity: 0.85,
                      transform: "rotate(-90deg)",
                      transformOrigin: "center",
                    }}
                  >
                    <Typography variant="h4">
                      Vencedores seguem para Finais
                    </Typography>
                    <Tooltip placement="top" title="Ir para Finais">
                      <span>
                        <IconButton
                          sx={{
                            transition: "0.3s",
                            borderRadius: 4,
                            p: 1.5,
                            px: 2,
                            border: 4,
                            borderColor: "lightgray",
                            bgcolor: "red",
                            transform: "rotate(90deg)",
                            transformOrigin: "center",
                            "&:hover": {
                              transform: "rotate(90deg)",
                              transformOrigin: "center",
                              boxShadow: 6,
                              borderColor: "red",
                              bgcolor: "red",
                            },
                          }}
                          onClick={() => {
                            setTab(1);
                            changeTab("1");
                            window.scrollTo(0, 300);
                          }}
                        >
                          <East sx={{ color: "white" }}></East>
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          ) : tab === 0 && watch("bracket") === "" ? (
            <Grid my={3} container justifyContent="center" size={12}>
              <Typography color="textDisabled">
                Comece por selecionar um Escalão no campo de cima.
              </Typography>
            </Grid>
          ) : tab === 0 && matchesData?.length === 0 ? (
            <Grid my={3} container justifyContent="center" size={12}>
              <Typography>
                Não existem provas de Eliminatórias para o Escalão selecionado.
              </Typography>
            </Grid>
          ) : null}
          {has_finals && tab === 1 && watch("bracket") === "" ? (
            <Grid my={3} container justifyContent="center" size={12}>
              <Typography color="textDisabled">
                Comece por selecionar um Escalão no campo de cima.
              </Typography>
            </Grid>
          ) : has_finals && scoringEntriesData?.length !== 0 && tab === 1 ? (
            <Grid
              overflow={"auto"}
              container
              size={12}
              spacing={2}
              m={4}
              px={6}
              pb={2}
              sx={{
                maskImage:
                  "linear-gradient(to left, transparent 0%, black 5%, black 95%, transparent 100%)",
                "&::-webkit-scrollbar": {
                  height: 5,
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
              {scoringEntriesData?.map((entry, index) => (
                <>
                  <Grid size={12} key={index}>
                    {entry.ongoing && (
                      <Box
                        sx={{
                          mt: 1,
                          width: "fit-content",
                          bgcolor: "#f59e0b",
                          color: "white",
                          fontSize: 12,
                          fontWeight: 700,
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          letterSpacing: 1,
                        }}
                      >
                        LIVE
                      </Box>
                    )}
                  </Grid>
                  <Grid size={10}>
                    {bracketsData?.find(
                      (item) => watch("bracket") === String(item.id),
                    )?.is_team ? (
                      <SingleTeamContenderCard
                        contenderNumber={index % 2 === 0 ? 1 : 2}
                        isMatchFinished={false}
                        isWinner={true}
                        matchNumber={entry.entry_number}
                        ongoing={entry.ongoing ?? false}
                        points={
                          Number(entry.score) === 0 ? 99 : Number(entry.score)
                        }
                        roundNumber={0}
                        teamData={entry.team}
                        rank={entry.rank!}
                      ></SingleTeamContenderCard>
                    ) : (
                      <SingleContenderCard
                        key={index}
                        roundNumber={0}
                        matchNumber={entry.entry_number}
                        contenderNumber={index % 2 === 0 ? 1 : 2}
                        isWinner={true}
                        points={
                          Number(entry.score) === 0 ? 99 : Number(entry.score)
                        }
                        fullName={entry.person?.full_name}
                        club={entry.person?.club}
                        isMatchFinished={false}
                        ongoing={entry.ongoing ?? false}
                        rank={entry.rank!}
                      ></SingleContenderCard>
                    )}
                  </Grid>
                  <Grid
                    size={2}
                    borderRadius={4}
                    bgcolor={"#fdecea"}
                    container
                    alignItems={"center"}
                    border={"0.2px solid red"}
                    justifyContent={"space-evenly"}
                    alignContent={"space-evenly"}
                    minWidth={50}
                  >
                    {["subed_club", "free_club", undefined].includes(
                      props.userRole,
                    ) ? null : (
                      <>
                        <Tooltip title="Fazer Alterações" placement="top">
                          <span>
                            <IconButton
                              size="small"
                              onClick={() => {
                                handleScoringModalOpen(
                                  entry.id,
                                  true,
                                  Boolean(
                                    bracketsData?.find(
                                      (item) =>
                                        watch("bracket") === String(item.id),
                                    )?.is_team,
                                  ),
                                );
                              }}
                            >
                              <Settings />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip
                          title={
                            entry.ongoing
                              ? "Já está em Direto"
                              : "Pôr em Direto"
                          }
                          placement="top"
                        >
                          <span>
                            <IconButton
                              size="small"
                              disabled={entry.ongoing}
                              onClick={() => {
                                patchOngoingScoringEntry.mutate({
                                  scoringEntryId: Number(entry.id),
                                  data: { ongoing: true },
                                });
                              }}
                            >
                              <LiveTv />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </>
                    )}
                    <Tooltip title="Consultar" placement="top">
                      <span>
                        <IconButton
                          size="small"
                          disabled={Boolean(
                            (bracketsData?.find(
                              (item) => watch("bracket") === String(item.id),
                            )?.is_team &&
                              entry.team == null) ||
                            (!bracketsData?.find(
                              (item) => watch("bracket") === String(item.id),
                            )?.is_team &&
                              entry.person == null),
                          )}
                          onClick={() => {
                            handleScoringModalOpen(
                              entry.id,
                              false,
                              Boolean(
                                bracketsData?.find(
                                  (item) =>
                                    watch("bracket") === String(item.id),
                                )?.is_team,
                              ),
                            );
                          }}
                        >
                          <Visibility />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Grid>
                </>
              ))}
            </Grid>
          ) : scoringEntriesData?.length === 0 && tab === 1 ? (
            <Grid my={3} container justifyContent="center" size={12}>
              <Typography>
                Não existem provas de Finais para o Escalão selecionado.
              </Typography>
            </Grid>
          ) : null}
        </Grid>
      )}
      {rounds.length === 0 || scoringEntriesData?.length === 0 ? null : (
        <Grid size={12} container spacing={3} pl={7} mt={3} gap={5}>
          <Typography variant="body2" fontWeight={500}>
            bye - Não tem registo
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            TBD - A aguardar resultado da ronda anterior
          </Typography>
        </Grid>
      )}
      <MatchInfoModal
        handleModalClose={handleModalClose}
        isModalOpen={isMatchInfoModalOpen}
        edit={isEditMode}
        matchData={matchesData?.find((item) => item.id === selectedForInfo)}
        brackedId={Number(watch("bracket"))}
        isKata={isKata}
      ></MatchInfoModal>
      <ScoringEntryInfoModal
        brackedId={Number(watch("bracket"))}
        edit={isEditMode}
        handleModalClose={handleScoringModalClose}
        isModalOpen={isScoringEntryInfoModalOpen}
        scoringEntryData={scoringEntriesData?.find(
          (item) => item.id === selectedForInfo,
        )}
        team={isTeam}
      ></ScoringEntryInfoModal>
    </>
  );
}
