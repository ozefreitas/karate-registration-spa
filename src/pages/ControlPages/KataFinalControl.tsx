import { Controller, useForm } from "react-hook-form";
import FormCard from "../../dashboard/FormCard";
import { Card, Grid, Button, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";

export default function KataFinalControl() {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://127.0.0.1:8000/ws/match/123/");

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const {
    control,
    clearErrors,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      player1Name: "",
      points1: undefined,
      points2: undefined,
      points3: undefined,
      points4: undefined,
      points5: undefined,
    },
  });

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

  const onSubmit = (data: any) => {
    const { points1, points2, points3, points4, points5 } = data;
    const values = { points1, points2, points3, points4, points5 };

    const entries = Object.entries(values).filter(
      ([_, v]) => typeof v === "number"
    );

    if (entries.length < 5) {
      console.warn("Some values are missing:", values);
    } else if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      let minEntry = entries[0];
      let maxEntry = entries[0];

      for (const entry of entries) {
        const [, value] = entry;
        if (value < minEntry[1]) minEntry = entry;
        if (value > maxEntry[1]) maxEntry = entry;
      }

      const middleEntries = entries.filter(
        ([key]) => key !== minEntry[0] && key !== maxEntry[0]
      );

      const sum = middleEntries.reduce((acc, [_, val]) => acc + val, 0);

      socketRef.current.send(
        JSON.stringify({
          ponctuation: sum,
          min_index: minEntry[0],
          max_index: maxEntry[0],
        })
      );
    }
  };

  return (
    <div>
      <FormCard title="Controles de Kata Individual">
        <Grid sx={{ p: 2 }} size={10}>
          <Controller
            name="player1Name"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Nome Competidor"
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
            onClick={() => {
              sendPlayer1Name();
            }}
            startIcon={<Add />}
          >
            Enviar
          </Button>
        </Grid>
        <Grid container size={12}>
          <Grid size={1.5} sx={{ p: 2 }}>
            <Controller
              name="points1"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Pontuação 1"
                  type="number"
                  fullWidth
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors();
                  }}
                  error={!!errors.points1}
                  helperText={errors.points1?.message}
                />
              )}
            />
          </Grid>
          <Grid size={1.5} sx={{ p: 2 }}>
            <Controller
              name="points2"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  type="number"
                  label="Pontuação 2"
                  fullWidth
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors();
                  }}
                  error={!!errors.points2}
                  helperText={errors.points2?.message}
                />
              )}
            />
          </Grid>
          <Grid size={1.5} sx={{ p: 2 }}>
            <Controller
              name="points3"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Pontuação 3"
                  type="number"
                  fullWidth
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors();
                  }}
                  error={!!errors.points3}
                  helperText={errors.points3?.message}
                />
              )}
            />
          </Grid>
          <Grid size={1.5} sx={{ p: 2 }}>
            <Controller
              name="points4"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Pontuação 4"
                  type="number"
                  fullWidth
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors();
                  }}
                  error={!!errors.points4}
                  helperText={errors.points4?.message}
                />
              )}
            />
          </Grid>
          <Grid size={1.5} sx={{ p: 2 }}>
            <Controller
              name="points5"
              control={control}
              render={({ field }) => (
                <TextField
                  type="number"
                  color="warning"
                  variant={"outlined"}
                  label="Pontuação 5"
                  fullWidth
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors();
                  }}
                  error={!!errors.points5}
                  helperText={errors.points5?.message}
                />
              )}
            />
          </Grid>
          <Grid
            size={3}
            container
            justifyContent={"center"}
            alignContent="center"
          >
            <Button
              sx={{ m: 1 }}
              variant="contained"
              size="large"
              color="success"
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
              startIcon={<Add />}
            >
              Calcular e Enviar
            </Button>
          </Grid>
        </Grid>
      </FormCard>
    </div>
  );
}
