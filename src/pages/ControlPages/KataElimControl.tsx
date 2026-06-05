import { useEffect, useRef, useState } from "react";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Add } from "@mui/icons-material";
import { KataOptions } from "../../config";
import { drawsHooks } from "../../hooks";
import { useAuth } from "../../access/GlobalAuthProvider";

export default function KataElimControl(
  props: Readonly<{ currentMatchData: any }>,
) {
  const socketRef = useRef<WebSocket | null>(null);
  const [points, setPoints] = useState<number | undefined>(undefined);

  const { user } = useAuth();

  const updateMatch = drawsHooks.useUpdateMatch();
  const patchMatch = drawsHooks.usePatchMatch(user?.role!);
  const patchMatchWinner = drawsHooks.usePatchMatchWinner();

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

  const sendPlayer1Point = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ player1: points }));
      setPoints(undefined);
      // stil need to send the points
      const flags_contender_2 = 5 - points!;
      const payload = {
        kataresult: {
          flags_contender_1: points ?? 0,
          flags_contender_2: flags_contender_2 ?? 0,
        },
      };
      patchMatch.mutate({ matchId: props.currentMatchData.id, data: payload });
      const winner = { winner: points! > flags_contender_2 ? 1 : 2 };
      patchMatchWinner.mutate({
        matchId: props.currentMatchData.id,
        data: winner,
      });
    }
  };

  const sendPlayer1Kata = () => {
    if (watch("player1Kata") === "") {
      setError("player1Kata", { message: "Este campo é obrigatório" });
    } else if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      socketRef.current.send(
        JSON.stringify({ player1Kata: watch("player1Kata") }),
      );
    }
  };

  const sendPlayer2Kata = () => {
    if (watch("player2Kata") === "") {
      setError("player2Kata", { message: "Este campo é obrigatório" });
    } else if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      socketRef.current.send(
        JSON.stringify({ player2Kata: watch("player2Kata") }),
      );
    }
  };

  const {
    control,
    watch,
    setError,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      player1Kata: "",
      player2Kata: "",
    },
  });

  useEffect(() => {
    if (props.currentMatchData !== undefined) {
      reset({
        player1Kata:
          props.currentMatchData.kataresult?.kata_contender_1 === "none"
            ? ""
            : props.currentMatchData.kataresult?.kata_contender_1,
        player2Kata:
          props.currentMatchData.kataresult?.kata_contender_2 === "none"
            ? ""
            : props.currentMatchData.kataresult?.kata_contender_2,
      });
    }
  }, [props.currentMatchData]);

  const onSubmitKatas = (data: any) => {
    let flags_contender_2 = undefined;
    if (points !== undefined) {
      flags_contender_2 = 5 - points;
    }
    const payload = {
      kataresult: {
        flags_contender_1: points ?? 0,
        flags_contender_2: flags_contender_2 ?? 0,
        kata_contender_1: data.player1Kata,
        kata_contender_2: data.player2Kata,
      },
      contender_1: data.contender_1,
      contender_2: data.contender_2,
      winner: null,
    };
    updateMatch.mutate(
      { matchId: props.currentMatchData.id, data: payload },
      // {
      //   onSuccess: () => {
      //     props.handleModalClose();
      //     setSelectedWinner("");
      //   },
      // },
    );
  };

  return (
    <Grid
      container
      size={12}
      spacing={3}
      mt={3}
      p={2}
      justifyContent={"space-between"}
    >
      <Grid size={6} container>
        <Grid size={8}>
          <Controller
            name="player1Kata"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Kata Competidor 1"
                fullWidth
                select
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors();
                }}
                error={!!errors.player1Kata}
                helperText={errors.player1Kata?.message}
              >
                <MenuItem sx={{ px: 2, color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
                {KataOptions.filter((item) => item.value !== "none").map(
                  (item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ),
                )}
              </TextField>
            )}
          />
        </Grid>
        <Grid
          container
          // justifyContent={"center"}
          alignContent="center"
        >
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={() => {
              sendPlayer1Kata();
              handleSubmit(onSubmitKatas)();
            }}
            startIcon={<Add />}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
      <Grid size={6} container justifyContent={"flex-end"}>
        <Grid size={8}>
          <Controller
            name="player2Kata"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Kata Competidor 2"
                fullWidth
                select
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors();
                }}
                error={!!errors.player2Kata}
                helperText={errors.player2Kata?.message}
              >
                <MenuItem sx={{ px: 2, color: "lightgrey" }} value="">
                  -- Selecionar --
                </MenuItem>
                {KataOptions.filter((item) => item.value !== "none").map(
                  (item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ),
                )}
              </TextField>
            )}
          />
        </Grid>
        <Grid
          container
          // justifyContent={"center"}
          alignContent="center"
        >
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={() => {
              sendPlayer2Kata();
              handleSubmit(onSubmitKatas)();
            }}
            startIcon={<Add />}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>

      <Grid
        mt={5}
        spacing={5}
        container
        alignItems="center"
        size={12}
        justifyContent={"space-between"}
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
    </Grid>
  );
}
