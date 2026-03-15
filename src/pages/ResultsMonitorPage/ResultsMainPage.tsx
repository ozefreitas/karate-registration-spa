import {
  Button,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";
import {
  OpenInNew,
  CloseFullscreen,
  Add,
  Clear,
  AdsClick,
  Person,
  Send,
} from "@mui/icons-material";
import ControlPage from "../ResultsMonitorPage/ControlPage";
import { useEffect, useState, useRef } from "react";
import FormAccordion from "../../dashboard/FormAccordion";
import { Controller, useForm } from "react-hook-form";
import { MatchTypeOptions } from "../../config";
import { drawsHooks } from "../../hooks";
import FormCard from "../../dashboard/FormCard";
import { useParams, useSearchParams } from "react-router-dom";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import MatchPickerModal from "../../components/DrawModals/MatchPickerModal";
import CommonActions from "../../components/DisplayScreenComponents/CommonActions";
import InfoRow from "../../components/General/InfoRow";
import { callNotiStack } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";

export default function ResultsMainPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { id: eventId } = useParams();
  const [isDisplayOpen, setIsDisplayOpen] = useState<boolean>(false);
  const [isBracketModalOpen, setIsBracketModalOpen] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<string>("");
  const displayWindowRef = useRef<Window | null>(null);
  const dynamicWindowRef = useRef<Window | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const paramBracket = searchParams.get("bracket") ?? "";
  const paramMatch = searchParams.get("match") ?? "";

  const changeBracket = (bracket: string) => {
    setSearchParams((prev) => {
      prev.set("bracket", bracket);
      return prev;
    });
  };

  const changeMatch = (match: string) => {
    setSearchParams((prev) => {
      prev.set("match", match);
      return prev;
    });
  };

  const handleBracketModalOpen = () => {
    setIsBracketModalOpen(true);
  };

  const handleBracketModalClose = () => {
    setIsBracketModalOpen(false);
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

  useEffect(() => {
    if (
      socketRef.current?.readyState === WebSocket.OPEN ||
      socketRef.current?.readyState === WebSocket.CONNECTING
    ) {
      return;
    }

    let baseURL = import.meta.env.VITE_API_URL || "127.0.0.1:8000";
    baseURL = baseURL.replace(/^https?:\/\//, "");
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";

    socketRef.current = new WebSocket(`${protocol}://${baseURL}/ws/match/123/`);

    socketRef.current.onopen = () => console.log("WS connected");
    socketRef.current.onerror = (e) => console.error("WS error", e);

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "DISPLAY_READY") {
        sendMatchState();
        sendTatami();
      }
    };

    return () => {
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, []);

  const {
    control,
    watch,
    setError,
    clearErrors,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bracket: "",
      match: "",
      tatami: "",
      restTime: "",
    },
  });

  const selectedMatchRef = useRef(watch("match"));
  const inputedTatamiRef = useRef(watch("tatami"));

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (paramBracket === "" || watch("bracket") === "") {
      newParams.delete("bracket");
      setSearchParams(newParams);
    } else {
      setValue("bracket", paramBracket);
    }
    if (paramMatch === "" || watch("match") === "") {
      newParams.delete("match");
      setSearchParams(newParams);
    } else {
      setValue("match", paramMatch);
    }
  }, [paramBracket, paramMatch]);

  const { data: bracketsData } = drawsHooks.useBracketsData(eventId!);
  const { data: matchesData, isLoading: isMatchesLoading } =
    drawsHooks.useEventMatchesData(watch("bracket"), eventId!);

  const matchesDataRef = useRef(matchesData);

  useEffect(() => {
    matchesDataRef.current = matchesData;
  }, [matchesData]);

  const hasSetOngoing = useRef(false);

  // at first fetch, checks if there's any ongoing match for the selected bracket. If so, gets the id and set
  // its value to the control, warning the user
  useEffect(() => {
    if (!matchesData || hasSetOngoing.current) return;

    const ongoingMatch = matchesData.find((match) => match.ongoing);
    const ongoingMatchId = ongoingMatch?.id ?? null;

    if (ongoingMatchId !== null) {
      setValue("match", String(ongoingMatchId));
      callNotiStack(
        enqueueSnackbar,
        "Uma partida já estava a decorrer! Altere se necessário.",
        "warning",
      );
    }

    hasSetOngoing.current = true;
  }, [matchesData]);

  // On mount, check if the named window is already open
  useEffect(() => {
    const existingWindow = window.open("", "displayPanel");

    // If the window exists and has a location (is actually open), update state
    if (
      existingWindow &&
      !existingWindow.closed &&
      existingWindow.location.href !== "about:blank"
    ) {
      displayWindowRef.current = existingWindow;
      setIsDisplayOpen(true);
    } else {
      // accidentally opened a blank window, close it
      existingWindow?.close();
    }
  }, []);

  const openDisplay = () => {
    if (!displayWindowRef.current || displayWindowRef.current.closed) {
      displayWindowRef.current = window.open(
        "/display_panel/",
        "displayPanel",
        "width=800,height=600",
      );
      setIsDisplayOpen(true);
    } else {
      displayWindowRef.current.focus();
    }
  };

  const closeDisplay = () => {
    displayWindowRef.current?.close();
    setCurrentScreen("");
  };

  const navigateDisplay = (matchId: string) => {
    if (displayWindowRef.current && !displayWindowRef.current?.closed) {
      displayWindowRef.current.location.href = `/display_panel/${matchId}/`;
    }
  };

  const sendTatami = () => {
    if (inputedTatamiRef.current === "") {
      setError("tatami", { message: "Este campo é obrigatório" });
    } else if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      socketRef.current.send(
        JSON.stringify({ tatami: inputedTatamiRef.current }),
      );
    }
  };

  useEffect(() => {
    matchesDataRef.current = matchesData;
  }, [matchesData]);

  useEffect(() => {
    selectedMatchRef.current = watch("match");
  }, [watch("match")]);

  useEffect(() => {
    inputedTatamiRef.current = watch("tatami");
  }, [watch("tatami")]);

  const sendMatchState = () => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN)
      return;

    const currentMatch = matchesDataRef.current?.find(
      (item) => String(item.id) === selectedMatchRef.current,
    );

    socketRef.current.send(
      JSON.stringify({
        player1Name: currentMatch?.contender_1?.full_name,
        player2Name: currentMatch?.contender_2?.full_name,
        player1Club: currentMatch?.contender_1?.club,
        player2Club: currentMatch?.contender_2?.club,
        player1Kata: currentMatch?.kataresult?.kata_contender_1,
        player2Kata: currentMatch?.kataresult?.kata_contender_2,
        tatami: inputedTatamiRef.current,
      }),
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayWindowRef.current) {
        setIsDisplayOpen(!displayWindowRef.current.closed);
      } else {
        setIsDisplayOpen(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const rounds = [
    ...new Set(matchesData?.map((m: any) => m.round_number)),
  ].sort((a: any, b: any) => b - a);

  const getOrderedMatches = () => {
    return rounds.flatMap((roundNumber: any) => {
      const roundMatches =
        matchesData?.filter((m: any) => m.round_number === roundNumber) ?? [];

      if (roundNumber === 0) {
        // 3rd/4th place (match_number 2) should come before finals (match_number 1)
        return [...roundMatches].sort(
          (a: any, b: any) => b.match_number - a.match_number,
        );
      }

      return roundMatches;
    });
  };

  const getNextMatchId = (currentMatchId: number) => {
    const orderedMatches = getOrderedMatches();
    const currentIndex = orderedMatches.findIndex(
      (m: any) => m.id === currentMatchId,
    );

    if (currentIndex === -1 || currentIndex === orderedMatches.length - 1)
      return null;
    return orderedMatches[currentIndex + 1].id;
  };

  const handleNextMatch = () => {
    const currentMatchId = getValues("match");
    const nextId = getNextMatchId(Number(currentMatchId));
    if (nextId !== null) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("match", String(nextId));
      setSearchParams(newParams);
      setValue("match", String(nextId));
    }
  };

  const getPrevMatchId = (currentMatchId: number) => {
    const orderedMatches = getOrderedMatches();
    const currentIndex = orderedMatches.findIndex(
      (m: any) => m.id === currentMatchId,
    );

    if (currentIndex <= 0) return null;
    return orderedMatches[currentIndex - 1].id;
  };

  const handlePrevMatch = () => {
    const currentMatchId = getValues("match");
    const prevId = getPrevMatchId(Number(currentMatchId));
    if (prevId === null) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("match", String(prevId));
    setSearchParams(newParams);
    setValue("match", String(prevId));
  };

  const openDynamicDrawPage = () => {
    if (!dynamicWindowRef.current || dynamicWindowRef.current.closed) {
      dynamicWindowRef.current = window.open(
        `/events/${eventId!}/draw/dynamic_view/?bracket=${getValues("bracket")}`,
        "_blank",
        "width=1000,height=800",
      );
    } else {
      dynamicWindowRef.current.focus();
    }
  };

  useEffect(() => {
    if (dynamicWindowRef.current && !dynamicWindowRef.current.closed) {
      dynamicWindowRef.current.location.href = `/events/${eventId!}/draw/dynamic_view/?bracket=${watch("bracket")}`;
    }
  }, [watch("bracket")]);

  return (
    <Grid container>
      <PageInfoCard
        description="Aqui poderá iniciar o sistema de monitorização de resultados de cada
          prova. Poderá controlar todos os aspetos, como inserir sorteios,
          definir diferentes parametros, entre outros."
        title="Monitorização e Mostragem de Resultados ao Vivo"
      ></PageInfoCard>
      <FormAccordion expanded title="Configurações de Monitor">
        <Grid p={2} size={3}>
          <Controller
            name="restTime"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Tempo de descanso (minutos)"
                type="number"
                disabled={isDisplayOpen}
                fullWidth
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors();
                }}
                error={!!errors.restTime}
                helperText={errors.restTime?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Button
            sx={{ m: 2 }}
            variant="contained"
            color={isDisplayOpen ? "error" : "success"}
            startIcon={isDisplayOpen ? <CloseFullscreen /> : <OpenInNew />}
            onClick={() => {
              if (isDisplayOpen) {
                closeDisplay();
              } else {
                openDisplay();
              }
            }}
          >
            {isDisplayOpen ? "Fechar Monitor" : "Inicializar Monitor"}
          </Button>
        </Grid>
      </FormAccordion>
      {isDisplayOpen ? (
        <>
          <FormCard
            title="Selecionar Escalão"
            subheader="Selecione o Escalão para escolher a Partida a ser iniciada."
          >
            <Grid
              p={2}
              size={12}
              spacing={2}
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid size={6}>
                <Controller
                  name="bracket"
                  control={control}
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
                                aria-label="toggle password visibility"
                              >
                                <Clear
                                  color={
                                    watch("bracket") === ""
                                      ? "disabled"
                                      : "error"
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
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid container size={6} gap={5} justifyContent={"flex-end"}>
                <Button
                  variant="contained"
                  disabled={watch("bracket") === "" || isMatchesLoading}
                  color="primary"
                  startIcon={<AdsClick></AdsClick>}
                  onClick={handleBracketModalOpen}
                  loading={isMatchesLoading}
                >
                  Selecionar Partida
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<OpenInNew />}
                  onClick={() => {
                    openDynamicDrawPage();
                  }}
                >
                  Abrir Sorteio completo
                </Button>
              </Grid>
            </Grid>
          </FormCard>
          <FormCard
            title="Selecionar Ecrã"
            subheader="Selecione um Escalão para poder selecionar o ecrã respetivo."
          >
            <Grid container size={12} alignContent="center">
              <Grid p={2} size={3}>
                <Controller
                  name="tatami"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="warning"
                      variant={"outlined"}
                      label="Tatami"
                      type="number"
                      required={isDisplayOpen}
                      disabled={!isDisplayOpen || currentScreen === ""}
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrors();
                      }}
                      error={!!errors.tatami}
                      helperText={errors.tatami?.message}
                    />
                  )}
                />
              </Grid>
              <Grid
                size={2}
                container
                justifyContent={"center"}
                alignContent="center"
              >
                <Button
                  sx={{ m: 1 }}
                  variant="contained"
                  size="large"
                  color="success"
                  disabled={!isDisplayOpen || currentScreen === ""}
                  onClick={() => {
                    sendTatami();
                  }}
                  startIcon={<Add />}
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
            <Grid
              size={12}
              container
              justifyContent={"space-between"}
              columnSpacing={5}
              rowSpacing={3}
              m={2}
              mb={3}
            >
              <Grid container justifyContent={"center"}>
                <Button
                  variant={currentScreen === "" ? "contained" : "outlined"}
                  color="primary"
                  startIcon={
                    currentScreen === "" ? <CloseFullscreen /> : <OpenInNew />
                  }
                  onClick={() => {
                    if (isDisplayOpen) {
                      navigateDisplay("");
                      setCurrentScreen("");
                    }
                  }}
                >
                  Screen Saver
                </Button>
              </Grid>
              {MatchTypeOptions.map(
                (match: { label: string; value: string }, index: any) => (
                  <Grid container key={index} justifyContent={"center"}>
                    <Button
                      variant={
                        currentScreen === match.label ? "contained" : "outlined"
                      }
                      disabled={watch("bracket") === ""}
                      color="primary"
                      startIcon={
                        currentScreen === match.label ? (
                          <CloseFullscreen />
                        ) : (
                          <OpenInNew />
                        )
                      }
                      onClick={() => {
                        if (isDisplayOpen) {
                          setCurrentScreen(match.label);
                          navigateDisplay(match.value);
                        }
                      }}
                    >
                      {match.label}
                    </Button>
                  </Grid>
                ),
              )}
            </Grid>
          </FormCard>
          <ControlPage
            currentScreen={currentScreen}
            currentMatch={matchesData?.find(
              (item) => String(item.id) === watch("match"),
            )}
            matchesData={matchesData}
            handleBracketModalOpen={handleBracketModalOpen}
            isMatchesLoading={isMatchesLoading}
            sendMatchState={sendMatchState}
            watch={watch}
          ></ControlPage>
          <CommonActions
            handleNextMatch={handleNextMatch}
            handlePrevMatch={handlePrevMatch}
            currentMatchId={getValues("match")}
            nextMatchId={String(getNextMatchId(Number(getValues("match"))))}
            prevMatchId={String(getPrevMatchId(Number(getValues("match"))))}
          ></CommonActions>
        </>
      ) : null}
      <MatchPickerModal
        handleModalClose={handleBracketModalClose}
        isModalOpen={isBracketModalOpen}
        matchesData={matchesData}
        rounds={rounds}
        watch={watch}
        setValue={setValue}
        getValues={getValues}
        bracketName={
          bracketsData?.find((item) => String(item.id) === watch("bracket"))
            ?.name!
        }
        changeMatch={changeMatch}
      ></MatchPickerModal>
    </Grid>
  );
}
