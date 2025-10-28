import { useEffect, useRef, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Add } from "@mui/icons-material";
import FormCard from "../../dashboard/FormCard";

export default function KataElimControl() {
  const socketRef = useRef<WebSocket | null>(null);
  const [points, setPoints] = useState<number | undefined>(undefined);

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_URL || "127.0.0.1:8000";
    socketRef.current = new WebSocket(`ws://${baseURL}/ws/match/123/`);

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendPlayer1Point = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ player1: points }));
      setPoints(undefined);
    }
  };

  const sendPlayer1Name = () => {
    if (watch("player1Name") === "") {
      setError("player1Name", { message: "Este campo é obrigatório" });
    } else if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      socketRef.current.send(
        JSON.stringify({ player1Name: watch("player1Name") })
      );
    }
  };

  const sendPlayer2Name = () => {
    if (watch("player2Name") === "") {
      setError("player2Name", { message: "Este campo é obrigatório" });
    } else if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      socketRef.current.send(
        JSON.stringify({ player2Name: watch("player2Name") })
      );
    }
  };

  const {
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      player1Name: "",
      player2Name: "",
    },
  });
  return (
    <FormCard title="Controles de Kata Individual">
      <Grid sx={{ p: 2 }} size={10}>
        <Controller
          name="player1Name"
          control={control}
          render={({ field }) => (
            <TextField
              color="warning"
              variant={"outlined"}
              label="Nome Competidor 1"
              fullWidth
              {...field}
              onChange={(e) => {
                field.onChange(e);
                clearErrors();
              }}
              error={!!errors.player1Name}
              helperText={errors.player1Name?.message}
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
            sendPlayer1Name();
          }}
          startIcon={<Add />}
        >
          Enviar
        </Button>
      </Grid>
      <Grid sx={{ p: 2 }} size={10}>
        <Controller
          name="player2Name"
          control={control}
          render={({ field }) => (
            <TextField
              color="warning"
              variant={"outlined"}
              label="Nome Competidor 2"
              fullWidth
              {...field}
              onChange={(e) => {
                field.onChange(e);
                clearErrors();
              }}
              error={!!errors.player2Name}
              helperText={errors.player2Name?.message}
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
            sendPlayer2Name();
          }}
          startIcon={<Add />}
        >
          Enviar
        </Button>
      </Grid>
      <Grid
        sx={{ m: 3 }}
        spacing={3}
        container
        alignItems="center"
        justifyContent="space-around"
      >
        <Typography>Número de Bandeiras AKA</Typography>
        <Button
          variant="contained"
          disabled={points !== 0 && points !== undefined}
          color={points === 0 ? "success" : "primary"}
          onClick={() => setPoints(0)}
        >
          0
        </Button>
        <Button
          variant="contained"
          disabled={points !== 1 && points !== undefined}
          color={points === 1 ? "success" : "primary"}
          onClick={() => setPoints(1)}
        >
          1
        </Button>
        <Button
          variant="contained"
          disabled={points !== 2 && points !== undefined}
          color={points === 2 ? "success" : "primary"}
          onClick={() => setPoints(2)}
        >
          2
        </Button>
        <Button
          variant="contained"
          disabled={points !== 3 && points !== undefined}
          color={points === 3 ? "success" : "primary"}
          onClick={() => setPoints(3)}
        >
          3
        </Button>
        <Button
          variant="contained"
          disabled={points !== 4 && points !== undefined}
          color={points === 4 ? "success" : "primary"}
          onClick={() => setPoints(4)}
        >
          4
        </Button>
        <Button
          variant="contained"
          disabled={points !== 5 && points !== undefined}
          color={points === 5 ? "success" : "primary"}
          onClick={() => setPoints(5)}
        >
          5
        </Button>
        <Grid container spacing={2}>
          <Button
            disabled={points === undefined}
            variant="contained"
            color="success"
            onClick={() => sendPlayer1Point()}
          >
            Confirmar
          </Button>
          <Button
            disabled={points === undefined}
            variant="contained"
            color="warning"
            onClick={() => setPoints(undefined)}
          >
            Reiniciar
          </Button>
        </Grid>
      </Grid>
    </FormCard>
  );
}
