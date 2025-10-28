import { Controller, useForm } from "react-hook-form";
import FormCard from "../../dashboard/FormCard";
import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";
import Time from "../../components/DisplayScreenComponents/´Time";

export default function KumiteTeamControl() {
  const [akaWazari, setAkaWazari] = useState<number>(0);
  const [shiroWazari, setShiroWazari] = useState<number>(0);
  const [akaIppon, setAkaIppon] = useState<number>(0);
  const [shiroIppon, setShiroIppon] = useState<number>(0);
  const [fouls, setFouls] = useState<any>({
    akaKekoku: 0,
    akaMubobi: 0,
    akaJogai: 0,
    shiroKekoku: 0,
    shiroMubobi: 0,
    shiroJogai: 0,
  });
  const socketRef = useRef<WebSocket | null>(null);

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
      defaultMinutes: "",
      defaultSeconds: "",
    },
  });

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_URL || "127.0.0.1:8000";
    socketRef.current = new WebSocket(`ws://${baseURL}/ws/match/123/`);

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendPoint = (
    operation: string,
    playerNumber: number,
    pointNumber: number
  ) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          player: playerNumber,
          points: pointNumber,
          operation: operation,
        })
      );
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

  return (
    <FormCard title="Controles de Kumite Equipa">
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

      <Time
        control={control}
        clearErrors={clearErrors}
        errors={errors}
        watch={watch}
      ></Time>
      <Grid container size={12} spacing={2} sx={{ m: "auto", mt: 5 }}>
        <Grid size={12} container justifyContent="center">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Pontos
          </Typography>
        </Grid>
        <Grid size={6} container justifyContent="center">
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Aka Wazari:
              </Typography>
            }
            control={
              <TextField
                sx={{ width: "30px" }}
                color="warning"
                variant="standard"
                label=""
                value={akaWazari}
                slotProps={{
                  input: {
                    readOnly: true,
                    disableUnderline: true,
                    style: { fontSize: 18, marginRight: 10 },
                  },
                }}
              />
            }
          ></FormControlLabel>
          <Grid container spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setAkaWazari((prev) => prev + 1);
                sendPoint("add", 1, 1);
              }}
            >
              <Add></Add>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setAkaWazari((prev) => prev - 1);
                sendPoint("remove", 1, 1);
              }}
            >
              <Remove></Remove>
            </Button>
          </Grid>
        </Grid>
        <Grid size={6} container justifyContent="center">
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Shiro Wazari:
              </Typography>
            }
            control={
              <TextField
                sx={{ width: "30px" }}
                color="warning"
                variant="standard"
                label=""
                value={shiroWazari}
                slotProps={{
                  input: {
                    readOnly: true,
                    disableUnderline: true,
                    style: { fontSize: 18, marginRight: 10 },
                  },
                }}
              />
            }
          ></FormControlLabel>
          <Grid container spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setShiroWazari((prev) => prev + 1);
                sendPoint("add", 2, 1);
              }}
            >
              <Add></Add>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setShiroWazari((prev) => prev - 1);
                sendPoint("remove", 2, 1);
              }}
            >
              <Remove></Remove>
            </Button>
          </Grid>
        </Grid>
        <Grid size={6} container justifyContent="center">
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Aka Ippon:
              </Typography>
            }
            control={
              <TextField
                sx={{ width: "40px" }}
                color="warning"
                variant="standard"
                label=""
                value={akaIppon}
                slotProps={{
                  input: {
                    readOnly: true,
                    disableUnderline: true,
                    style: { fontSize: 18, marginRight: 10 },
                  },
                }}
              />
            }
          ></FormControlLabel>
          <Grid container spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setAkaIppon((prev) => prev + 1);
                sendPoint("add", 1, 2);
              }}
            >
              <Add></Add>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setAkaIppon((prev) => prev - 1);
                sendPoint("remove", 1, 2);
              }}
            >
              <Remove></Remove>
            </Button>
          </Grid>
        </Grid>
        <Grid size={6} container justifyContent="center">
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Shiro Ippon:
              </Typography>
            }
            control={
              <TextField
                sx={{ width: "40px" }}
                color="warning"
                variant="standard"
                label=""
                value={shiroIppon}
                slotProps={{
                  input: {
                    readOnly: true,
                    disableUnderline: true,
                    style: { fontSize: 18, marginRight: 10 },
                  },
                }}
              />
            }
          ></FormControlLabel>
          <Grid container spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setShiroIppon((prev) => prev + 1);
                sendPoint("add", 2, 2);
              }}
            >
              <Add></Add>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setShiroIppon((prev) => prev - 1);
                sendPoint("remove", 2, 2);
              }}
            >
              <Remove></Remove>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container size={12} spacing={2} sx={{ m: "auto", mt: 5 }}>
        <Grid size={12} container justifyContent="center">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Faltas
          </Typography>
        </Grid>
        <Grid size={6} container justifyContent="center">
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Aka Kekoku:
              </Typography>
            }
            control={
              <TextField
                sx={{ width: "30px" }}
                color="warning"
                variant="standard"
                label=""
                value={fouls.akaKekoku}
                slotProps={{
                  input: {
                    readOnly: true,
                    disableUnderline: true,
                    style: { fontSize: 18, marginRight: 10 },
                  },
                }}
              />
            }
          ></FormControlLabel>
          <Grid container spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setFouls((prev: any) => ({
                  ...prev,
                  akaKekoku: prev.akaKekoku + 1,
                }));
                // sendPoint("add", 1, 1);
              }}
            >
              <Add></Add>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setFouls((prev: any) => ({
                  ...prev,
                  akaKekoku: prev.akaKekoku - 1,
                }));
                // sendPoint("remove", 1, 1);
              }}
            >
              <Remove></Remove>
            </Button>
          </Grid>
        </Grid>
        <Grid size={6} container justifyContent="center">
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Shiro Kekoku:
              </Typography>
            }
            control={
              <TextField
                sx={{ width: "30px" }}
                color="warning"
                variant="standard"
                label=""
                value={fouls.shiroKekoku}
                slotProps={{
                  input: {
                    readOnly: true,
                    disableUnderline: true,
                    style: { fontSize: 18, marginRight: 10 },
                  },
                }}
              />
            }
          ></FormControlLabel>
          <Grid container spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setFouls((prev: any) => ({
                  ...prev,
                  shiroKekoku: prev.shiroKekoku + 1,
                }));
                // sendPoint("add", 2, 1);
              }}
            >
              <Add></Add>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setFouls((prev: any) => ({
                  ...prev,
                  shiroKekoku: prev.shiroKekoku - 1,
                }));
                // sendPoint("remove", 2, 1);
              }}
            >
              <Remove></Remove>
            </Button>
          </Grid>
        </Grid>
        <Grid size={6} container justifyContent="center">
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Aka Mubobi:
              </Typography>
            }
            control={
              <TextField
                sx={{ width: "30px" }}
                color="warning"
                variant="standard"
                label=""
                value={fouls.akaMubobi}
                slotProps={{
                  input: {
                    readOnly: true,
                    disableUnderline: true,
                    style: { fontSize: 18, marginRight: 10 },
                  },
                }}
              />
            }
          ></FormControlLabel>
          <Grid container spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setFouls((prev: any) => ({
                  ...prev,
                  akaMubobi: prev.akaMubobi + 1,
                }));
                setAkaIppon((prev) => prev + 1);
                // sendPoint("add", 1, 2);
              }}
            >
              <Add></Add>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setFouls((prev: any) => ({
                  ...prev,
                  akaMubobi: prev.akaMubobi - 1,
                }));
                setAkaIppon((prev) => prev - 1);
                // sendPoint("remove", 1, 2);
              }}
            >
              <Remove></Remove>
            </Button>
          </Grid>
        </Grid>
        <Grid size={6} container justifyContent="center">
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Shiro Mubobi:
              </Typography>
            }
            control={
              <TextField
                sx={{ width: "30px" }}
                color="warning"
                variant="standard"
                label=""
                value={fouls.shiroMubobi}
                slotProps={{
                  input: {
                    readOnly: true,
                    disableUnderline: true,
                    style: { fontSize: 18, marginRight: 10 },
                  },
                }}
              />
            }
          ></FormControlLabel>
          <Grid container spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setFouls((prev: any) => ({
                  ...prev,
                  shiroMubobi: prev.shiroMubobi + 1,
                }));
                // sendPoint("add", 2, 2);
              }}
            >
              <Add></Add>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setFouls((prev: any) => ({
                  ...prev,
                  shiroMubobi: prev.shiroMubobi - 1,
                }));
                // sendPoint("remove", 2, 2);
              }}
            >
              <Remove></Remove>
            </Button>
          </Grid>
        </Grid>
        <Grid size={6} container justifyContent="center">
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Aka Jogai:
              </Typography>
            }
            control={
              <TextField
                sx={{ width: "50px" }}
                color="warning"
                variant="standard"
                label=""
                value={fouls.akaJogai}
                slotProps={{
                  input: {
                    readOnly: true,
                    disableUnderline: true,
                    style: { fontSize: 18, marginRight: 10 },
                  },
                }}
              />
            }
          ></FormControlLabel>
          <Grid container spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setFouls((prev: any) => ({
                  ...prev,
                  akaJogai: prev.akaJogai + 1,
                }));
                // sendPoint("add", 1, 2);
              }}
            >
              <Add></Add>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setFouls((prev: any) => ({
                  ...prev,
                  akaJogai: prev.akaJogai - 1,
                }));
                // sendPoint("remove", 1, 2);
              }}
            >
              <Remove></Remove>
            </Button>
          </Grid>
        </Grid>
        <Grid size={6} container justifyContent="center">
          <FormControlLabel
            sx={{ mr: 2 }}
            labelPlacement="start"
            label={
              <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                Shiro Jogai:
              </Typography>
            }
            control={
              <TextField
                sx={{ width: "50px" }}
                color="warning"
                variant="standard"
                label=""
                value={fouls.shiroJogai}
                slotProps={{
                  input: {
                    readOnly: true,
                    disableUnderline: true,
                    style: { fontSize: 18, marginRight: 10 },
                  },
                }}
              />
            }
          ></FormControlLabel>
          <Grid container spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setFouls((prev: any) => ({
                  ...prev,
                  shiroJogai: prev.shiroJogai + 1,
                }));
                // sendPoint("add", 2, 2);
              }}
            >
              <Add></Add>
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setFouls((prev: any) => ({
                  ...prev,
                  shiroJogai: prev.shiroJogai - 1,
                }));
                // sendPoint("remove", 2, 2);
              }}
            >
              <Remove></Remove>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </FormCard>
  );
}
