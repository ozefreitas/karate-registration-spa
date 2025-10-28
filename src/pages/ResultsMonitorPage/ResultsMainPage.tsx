import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { OpenInNew, CloseFullscreen, Add } from "@mui/icons-material";
import ControlPage from "../ResultsMonitorPage/ControlPage";
import { useEffect, useState, useRef } from "react";
import FormAccordion from "../../dashboard/FormAccordion";
import { Controller, useForm } from "react-hook-form";
import { MatchTypeOptions } from "../../config";

export default function ResultsMainPage() {
  const [isDisplayOpen, setIsDisplayOpen] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<string>("");
  const displayWindowRef = useRef<Window | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let baseURL = import.meta.env.VITE_API_URL || "127.0.0.1:8000";

    // Remove protocol prefix (http:// or https://)
    baseURL = baseURL.replace(/^https?:\/\//, "");

    // Detect the correct protocol
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";

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
    formState: { errors },
  } = useForm({
    defaultValues: {
      tatami: "",
      restTime: "",
      player1Designation: "",
      player2Designation: "",
    },
  });

  const openDisplay = () => {
    if (!displayWindowRef.current || displayWindowRef.current.closed) {
      displayWindowRef.current = window.open(
        "/display_panel/",
        "_blank",
        "width=1000,height=800"
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
    <div>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de Monitorização e Mostragem de Resultados ao Vivo"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá iniciar o sistema de monitorização de resultados de cada
          prova. Poderá controlar todos os aspetos, como inserir sorteios,
          definir diferentes parametros, entre outros.
        </CardContent>
      </Card>
      <FormAccordion expanded title="Configurações de Monitor">
        <Grid sx={{ p: 2 }} size={3}>
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
        <Grid sx={{ p: 2 }} size={4}>
          <Controller
            name="player1Designation"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Designação Competidor 1"
                disabled={isDisplayOpen}
                fullWidth
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors();
                }}
                error={!!errors.player1Designation}
                helperText={errors.player1Designation?.message}
              />
            )}
          />
        </Grid>
        <Grid sx={{ p: 2 }} size={4}>
          <Controller
            name="player2Designation"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Designação Competidor 2"
                disabled={isDisplayOpen}
                fullWidth
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors();
                }}
                error={!!errors.player2Designation}
                helperText={errors.player2Designation?.message}
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
              if (!isDisplayOpen) {
                openDisplay();
              } else {
                closeDisplay();
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
        <Grid size={12} container alignContent="center">
          <Grid size={2}>
            <Button
              sx={{ m: 2 }}
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
              <Grid size={2} key={index}>
                <Button
                  sx={{ m: 2 }}
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
            )
          )}
        </Grid>
      </FormAccordion>
      {isDisplayOpen ? (
        <ControlPage currentScreen={currentScreen}></ControlPage>
      ) : null}
    </div>
  );
}
