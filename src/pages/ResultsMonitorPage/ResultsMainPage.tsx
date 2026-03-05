import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  OpenInNew,
  CloseFullscreen,
  Add,
  Clear,
  AdsClick,
} from "@mui/icons-material";
import ControlPage from "../ResultsMonitorPage/ControlPage";
import { useEffect, useState, useRef } from "react";
import FormAccordion from "../../dashboard/FormAccordion";
import { Controller, useForm } from "react-hook-form";
import { MatchTypeOptions } from "../../config";
import { drawsHooks } from "../../hooks";
import FormCard from "../../dashboard/FormCard";
import { useSearchParams } from "react-router-dom";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import MatchPickerModal from "../../components/DrawModals/MatchPickerModal";

export default function ResultsMainPage() {
  const [isDisplayOpen, setIsDisplayOpen] = useState<boolean>(false);
  const [isBracketModalOpen, setIsBracketModalOpen] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<string>("");
  const displayWindowRef = useRef<Window | null>(null);
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
  const testEventId = "3-jornada-liga-soshinkai-20252026";

  const handleBracketModalOpen = () => {
    setIsBracketModalOpen(true);
  };

  const handleBracketModalClose = () => {
    setIsBracketModalOpen(false);
  };

  useEffect(() => {
    let baseURL = import.meta.env.VITE_API_URL || "127.0.0.1:8000";

    // Remove protocol prefix (http:// or https://)
    baseURL = baseURL.replace(/^https?:\/\//, "");

    // Detect the correct protocol
    const protocol = globalThis.location.protocol === "https:" ? "wss" : "ws";

    // Construct the full WebSocket URL
    socketRef.current = new WebSocket(`${protocol}://${baseURL}/ws/match/123/`);

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const {
    control,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bracket: "",
      match: "",
      tatami: "",
      restTime: "",
    },
  });

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (paramBracket === "" || watch("bracket") === "") {
      newParams.delete("bracket");
      setSearchParams(newParams);
    } else {
      setValue("bracket", paramBracket);
    }
  }, [paramBracket, watch("bracket")]);

  const { data: bracketsData } = drawsHooks.useBracketsData(testEventId);
  const {
    data: matchesData,
    isLoading: isMatchesLoading,
    error: matchesError,
    refetch,
  } = drawsHooks.useEventMatchesData(watch("bracket"), testEventId);

  const openDisplay = () => {
    if (!displayWindowRef.current || displayWindowRef.current.closed) {
      displayWindowRef.current = window.open(
        "/display_panel/",
        "_blank",
        "width=1000,height=800",
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

  const tatami = watch("tatami");

  const sendTatami = () => {
    if (tatami === "" || Number(tatami) > 3 || Number(tatami) <= 0) {
      setError("tatami", { message: "Este campo é obrigatório" });
    } else if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      socketRef.current.send(JSON.stringify({ tatami: tatami }));
    }
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
        <Grid container sx={{ mt: 3 }} size={12} alignContent="center">
          <Grid sx={{ p: 2 }} size={3}>
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
                  disabled={!isDisplayOpen}
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
              disabled={!isDisplayOpen}
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
          // alignItems={"center"}
          justifyContent={"space-evenly"}
          spacing={3}
          m={2}
        >
          <Grid container justifyContent={"center"} size={3}>
            <Button
              variant="contained"
              disabled={!isDisplayOpen}
              color="primary"
              startIcon={isDisplayOpen ? <CloseFullscreen /> : <OpenInNew />}
              onClick={() => {
                if (isDisplayOpen) {
                  navigateDisplay("");
                }
              }}
            >
              Abrir Screen Saver
            </Button>
          </Grid>
          {MatchTypeOptions.map(
            (match: { label: string; value: string }, index: any) => (
              <Grid container size={3} key={index} justifyContent={"center"}>
                <Button
                  variant="contained"
                  disabled={!isDisplayOpen}
                  color="primary"
                  startIcon={
                    isDisplayOpen ? <CloseFullscreen /> : <OpenInNew />
                  }
                  onClick={() => {
                    if (isDisplayOpen) {
                      setCurrentScreen(match.label);
                      navigateDisplay(match.value);
                    }
                  }}
                >
                  Abrir {match.label}
                </Button>
              </Grid>
            ),
          )}
        </Grid>
      </FormAccordion>
      {isDisplayOpen ? (
        <>
          <FormCard
            title="Selecionar Escalão"
            subheader="Selecione o Escalão para escolher a Partida a ser iniciada"
          >
            <Grid p={2} size={9}>
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
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid p={2} size={3} container alignItems={"center"}>
              <Button
                variant="contained"
                disabled={watch("bracket") === ""}
                color="primary"
                startIcon={<AdsClick></AdsClick>}
                onClick={handleBracketModalOpen}
              >
                Selecionar Partida
              </Button>
            </Grid>
          </FormCard>
          <FormCard
            title="A decorrer"
            subheader="Selecione o Escalão para escolher a Partida a ser iniciada"
          >
            {watch("match")}
          </FormCard>
          <ControlPage currentScreen={currentScreen}></ControlPage>
        </>
      ) : null}
      <MatchPickerModal
        handleModalClose={handleBracketModalClose}
        isModalOpen={isBracketModalOpen}
        matchesData={matchesData}
        setValue={setValue}
        bracketName={
          bracketsData?.find((item) => String(item.id) === watch("bracket"))
            ?.name!
        }
        changeMatch={changeMatch}
      ></MatchPickerModal>
    </Grid>
  );
}
