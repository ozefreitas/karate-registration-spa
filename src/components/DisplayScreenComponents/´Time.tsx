import { useState, useEffect, useRef } from "react";
import { Grid, Typography, Button, TextField } from "@mui/material";
import { Stop, PlayArrow, Pause, Add } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { useSnackbar, closeSnackbar } from "notistack";

export default function Time(
  props: Readonly<{
    control: any;
    clearErrors: any;
    errors: any;
    watch: any;
  }>
) {
  const { enqueueSnackbar } = useSnackbar();
  const socketRef = useRef<WebSocket | null>(null);
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(2);
  const [isRunning, setIsRunning] = useState<boolean | null>(null);
  const [timeLow, setTimeLow] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);

  console.log(ended);

  

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_URL || "127.0.0.1:8000";
    socketRef.current = new WebSocket(`ws://${baseURL}/ws/match/123/`);

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendClockControl = (action: "play" | "pause" | "stop") => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ action: action }));
    }
  };

  // Clock behavior
  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds((milliseconds) => milliseconds - 1);
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          setMilliseconds(99);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
          setMilliseconds(99);
        }
        if (seconds < 30 && minutes === 0) {
          setTimeLow(true);
          if (seconds === 0 && milliseconds === 0) {
            setEnded(true);
          }
        } else {
          setTimeLow(false);
          setEnded(false);
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [milliseconds, seconds, minutes, isRunning]);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  const startTimer = () => {
    if (minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
      setIsRunning(true);
      return true;
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const defaultMinutes = () => {
    const temp = Number(props.watch("defaultMinutes"));
    if (temp >= 0 && temp < 6) {
      closeSnackbar();
      return temp;
    } else {
      enqueueSnackbar(
        "Impossível inserir esse tempo. Defenido a 0. Tente novamente",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        }
      );
      return 0;
    }
  };
  const defaultSeconds = () => {
    const temp = Number(props.watch("defaultSeconds"));
    if (temp >= 0 && temp < 59) {
      closeSnackbar();
      return temp;
    } else {
      enqueueSnackbar(
        "Impossível inserir esse tempo. Defenido a 0. Tente novamente",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        }
      );
      return 0;
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLow(false);
    setMinutes(defaultMinutes());
    setSeconds(defaultSeconds());
    setMilliseconds(0);
  };

  const setDefaultMinutes = () => {
    setMinutes(defaultMinutes);
  };

  const setDefaultSeconds = () => {
    setSeconds(defaultSeconds);
  };

  return (
    <Grid container size={12} spacing={2} sx={{ m: "auto", mt: 0, mb: 5 }}>
      <Grid sx={{ p: 2 }} size={4}>
        <Controller
          name="defaultMinutes"
          control={props.control}
          render={({ field }) => (
            <TextField
              color="warning"
              variant={"outlined"}
              label="Definir Minutos"
              type="number"
              fullWidth
              {...field}
              onChange={(e) => {
                field.onChange(e);
                props.clearErrors();
              }}
              error={!!props.errors.player1Name}
              helperText={props.errors.player1Name?.message}
            />
          )}
        />
      </Grid>
      <Grid size={2} container justifyContent={"center"} alignContent="center">
        <Button
          sx={{ m: 1, ml: 0 }}
          variant="contained"
          size="large"
          color="success"
          onClick={() => {
            setDefaultMinutes();
          }}
          startIcon={<Add />}
        >
          Enviar
        </Button>
      </Grid>
      <Grid sx={{ p: 2 }} size={4}>
        <Controller
          name="defaultSeconds"
          control={props.control}
          render={({ field }) => (
            <TextField
              color="warning"
              variant={"outlined"}
              type="number"
              label="Definir Segundos"
              fullWidth
              {...field}
              onChange={(e) => {
                field.onChange(e);
                props.clearErrors();
              }}
              error={!!props.errors.player1Name}
              helperText={props.errors.player1Name?.message}
            />
          )}
        />
      </Grid>
      <Grid size={2} container justifyContent={"center"} alignContent="center">
        <Button
          sx={{ m: 1 }}
          variant="contained"
          size="large"
          color="success"
          onClick={() => {
            setDefaultSeconds();
          }}
          startIcon={<Add />}
        >
          Enviar
        </Button>
      </Grid>
      <Grid container size={12} sx={{ mt: 5 }} alignItems="center">
        <Grid size={5} container justifyContent="center" alignContent="center">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Relógio
          </Typography>
        </Grid>
        <Grid
          size={3}
          sx={{
            color: timeLow ? "orange" : "var(--clock-color)",
          }}
        >
          <Typography variant="h2">
            {minutes}:{formatTime(seconds)}:{formatTime(milliseconds)}
          </Typography>
        </Grid>
        <Grid container size={4} spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              sendClockControl("play");
              startTimer();
            }}
          >
            <PlayArrow></PlayArrow>
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              sendClockControl("pause");
              pauseTimer();
            }}
          >
            <Pause></Pause>
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              sendClockControl("stop");
              stopTimer();
            }}
          >
            <Stop></Stop>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
