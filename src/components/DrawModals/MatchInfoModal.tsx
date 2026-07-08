import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Stack,
  Chip,
  Grid,
  IconButton,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";
import MatchDetailCard from "./MatchDetailCard";
import MatchDetailEditCard from "./MatchDetailEditCard";
import { useForm } from "react-hook-form";
import { drawsHooks } from "../../hooks";
import { RoundsOptions } from "../../config";
import { callNotiStack } from "../../utils/utils";
import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MatchInfoModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    matchData?: any;
    brackedId: number;
    edit: boolean;
    isKata?: boolean;
    team?: boolean;
  }>,
) {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedWinner, setSelectedWinner] = React.useState<string>("");
  const updateMatch = drawsHooks.useUpdateMatch();
  const patchMatchWinner = drawsHooks.usePatchMatchWinner();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      contender_1:
        props.matchData?.contender_1 === null
          ? ""
          : props.matchData?.contender_1.id,
      contender_2:
        props.matchData?.contender_2 === null
          ? ""
          : props.matchData?.contender_2.id,
      team_contender_1:
        props.matchData?.team_contender_1 === null
          ? ""
          : props.matchData?.team_contender_1.id,
      team_contender_2:
        props.matchData?.team_contender_2 === null
          ? ""
          : props.matchData?.team_contender_2.id,
      kata_contender_1: props.matchData?.kataresult?.kata_contender_1,
      flags_contender_1: props.matchData?.kataresult?.flags_contender_1,
      kata_contender_2: props.matchData?.kataresult?.kata_contender_2,
      flags_contender_2: props.matchData?.kataresult?.flags_contender_2,
      points_contender_1: props.matchData?.kumiteresult?.points_contender_1,
      points_contender_2: props.matchData?.kumiteresult?.points_contender_2,
    },
  });

  React.useEffect(() => {
    if (props.matchData) {
      reset({
        contender_1:
          props.matchData?.contender_1 === null
            ? ""
            : props.matchData?.contender_1.id,
        contender_2:
          props.matchData?.contender_2 === null
            ? ""
            : props.matchData?.contender_2.id,
        team_contender_1:
          props.matchData?.team_contender_1 === null
            ? ""
            : props.matchData?.team_contender_1.id,
        team_contender_2:
          props.matchData?.team_contender_2 === null
            ? ""
            : props.matchData?.team_contender_2.id,
        kata_contender_1: props.matchData.kataresult?.kata_contender_1 ?? "",
        flags_contender_1: props.matchData.kataresult?.flags_contender_1 ?? 0,
        kata_contender_2: props.matchData.kataresult?.kata_contender_2 ?? "",
        flags_contender_2: props.matchData.kataresult?.flags_contender_2 ?? 0,
        points_contender_1:
          props.matchData?.kumiteresult?.points_contender_1 ?? 0,
        points_contender_2:
          props.matchData?.kumiteresult?.points_contender_2 ?? 0,
      });

      if (props.matchData.winner === null) {
        setSelectedWinner("");
      } else {
        setSelectedWinner(
          props.matchData.winner.id === props.matchData.contender_1.id
            ? "SHIRO"
            : "AKA",
        );
      }
    }
  }, [props.matchData]);

  const onKataSubmit = (data: any) => {
    console.log(data);
    // check if contender with most flags is the one selected as winner
    if (
      data.flags_contender_1 > data.flags_contender_2 &&
      selectedWinner === "AKA"
    ) {
      callNotiStack(
        enqueueSnackbar,
        "Vencedor selecionado não é o que tem mais bandeiras! Verifique o resultado.",
        "error",
      );
      return;
    }
    if (
      data.flags_contender_2 > data.flags_contender_1 &&
      selectedWinner === "SHIRO"
    ) {
      callNotiStack(
        enqueueSnackbar,
        "Vencedor selecionado não é o que tem mais bandeiras! Verifique o resultado.",
        "error",
      );
      return;
    }

    // veriry if sum equals 5 when flags are not 0
    if (
      Number(data.flags_contender_1) !== 0 &&
      Number(data.flags_contender_2) !== 0 &&
      Number(data.flags_contender_1) + Number(data.flags_contender_2) !== 5
    ) {
      callNotiStack(
        enqueueSnackbar,
        "Soma de bandeira não resulta em 5. Retifique!",
        "error",
      );
      return;
    }

    // if flags are 0, cannot submit a winner
    if (
      data.flags_contender_1 === 0 &&
      data.flags_contender_2 === 0 &&
      selectedWinner !== ""
    ) {
      callNotiStack(
        enqueueSnackbar,
        "Atribua as bandeiras da partida para submeter um vencedor.",
        "error",
      );
      return;
    }

    const payload = {
      kataresult: {
        flags_contender_1: data.flags_contender_1,
        flags_contender_2: data.flags_contender_2,
        kata_contender_1: data.kata_contender_1,
        kata_contender_2: data.kata_contender_2,
      },
      contender_1: data.contender_1,
      contender_2: data.contender_2,
      winner:
        selectedWinner === "SHIRO"
          ? data.contender_1
          : selectedWinner === "AKA"
            ? data.contender_2
            : null,
    };
    if (selectedWinner !== "") {
      const winner = { winner: selectedWinner === "SHIRO" ? 1 : 2 };
      patchMatchWinner.mutate({ matchId: props.matchData.id, data: winner });
    }
    updateMatch.mutate(
      { matchId: props.matchData.id, data: payload },
      {
        onSuccess: () => {
          props.handleModalClose();
          setSelectedWinner("");
        },
      },
    );
  };

  const onKumiteSubmit = (data: any) => {
    if (
      data.points_contender_1 > data.points_contender_2 &&
      selectedWinner === "AKA"
    ) {
      callNotiStack(
        enqueueSnackbar,
        "Vencedor selecionado não é o que tem mais pontos! Verifique o resultado.",
        "error",
      );
      return;
    }
    if (
      data.points_contender_2 > data.points_contender_1 &&
      selectedWinner === "SHIRO"
    ) {
      callNotiStack(
        enqueueSnackbar,
        "Vencedor selecionado não é o que tem mais pontos! Verifique o resultado.",
        "error",
      );
      return;
    }
    const payload = {
      kumiteresult: {
        points_contender_1: data.points_contender_1,
        points_contender_2: data.points_contender_2,
        points_conceded_contender_1: data.points_contender_2,
        points_conceded_contender_2: data.points_contender_1,
      },
      contender_1: data.contender_1,
      contender_2: data.contender_2,
      team_contender_1: data.team_contender_1,
      team_contender_2: data.team_contender_2,
      ongoing: true,
      winner:
        selectedWinner === "SHIRO"
          ? data.contender_1
          : selectedWinner === "AKA"
            ? data.contender_2
            : null,
    };
    if (selectedWinner !== "") {
      const winner = { winner: selectedWinner === "SHIRO" ? 1 : 2 };
      patchMatchWinner.mutate({ matchId: props.matchData.id, data: winner });
    }
    if (
      selectedWinner !== "" &&
      props.matchData.round_number === 0 &&
      props.matchData.match_number === 1
    ) {
      payload["ongoing"] = false;
    }
    updateMatch.mutate(
      { matchId: props.matchData.id, data: payload },
      {
        onSuccess: () => {
          props.handleModalClose();
          setSelectedWinner("");
        },
      },
    );
  };

  return (
    <Dialog
      fullWidth
      maxWidth={props.team ? "lg" : "md"}
      open={props.isModalOpen}
      onClose={() => {
        props.handleModalClose();
        if (props.matchData.winner === null) {
          setSelectedWinner("");
        }
      }}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle sx={{ borderTop: "red", width: "100%" }}>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"start"}
          mt={1}
        >
          <Grid>
            <Chip
              label={
                RoundsOptions.find(
                  (item) =>
                    Number(item.value) === props.matchData?.round_number,
                )?.label
              }
            ></Chip>
            <Typography fontWeight={"bold"} m={2} ml={1} variant="h4">
              {props.matchData?.name}
            </Typography>
          </Grid>
          <IconButton
            onClick={props.handleModalClose}
            sx={{ bgcolor: "#f0f0f0", "&:hover": { bgcolor: "#e0e0e0" } }}
          >
            <Close />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container columnSpacing={5} rowSpacing={2} size={12}>
          <Grid size={6}>
            {props.edit ? (
              <MatchDetailEditCard
                isKata={props.isKata!}
                color="Shiro"
                control={control}
                bracketId={props.brackedId}
                team={props.team}
              ></MatchDetailEditCard>
            ) : (
              <MatchDetailCard
                isKata={props.isKata!}
                color="Shiro"
                contenderInfo={
                  props.team
                    ? props.matchData?.team_contender_1
                    : props.matchData?.contender_1
                }
                matchInfo={props.matchData}
                team={props.team}
              ></MatchDetailCard>
            )}
          </Grid>
          <Grid size={6}>
            {props.edit ? (
              <MatchDetailEditCard
                isKata={props.isKata!}
                color="Aka"
                control={control}
                bracketId={props.brackedId}
                reverse
                team={props.team}
              ></MatchDetailEditCard>
            ) : (
              <MatchDetailCard
                isKata={props.isKata!}
                color="Aka"
                contenderInfo={
                  props.team
                    ? props.matchData?.team_contender_2
                    : props.matchData?.contender_2
                }
                matchInfo={props.matchData}
                reverse
                team={props.team}
              ></MatchDetailCard>
            )}
          </Grid>
          {props.matchData?.winner === null && !props.edit ? null : props
              .matchData?.winner !== null && !props.edit ? (
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              size={12}
              p={2.5}
              mt={3}
              borderRadius={3}
              bgcolor={"#fffff5"}
              border={"1px solid #ffcdd2"}
              gap={3}
            >
              <Typography variant="h6" sx={{ color: "#555", lineHeight: 1.7 }}>
                Vencedor:
              </Typography>
              <Typography
                variant="h5"
                fontWeight={"bold"}
                sx={{ color: "#555" }}
              >
                {props.matchData?.winner.full_name}
              </Typography>
            </Grid>
          ) : props.edit ? (
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              size={12}
              p={2.5}
              mt={3}
              borderRadius={3}
              bgcolor={"#fffff5"}
              border={"1px solid #ffcdd2"}
              gap={3}
            >
              <Typography variant="h6" sx={{ color: "#555", lineHeight: 1.7 }}>
                Vencedor:
              </Typography>
              <Grid container spacing={2}>
                <Chip
                  sx={{ p: 3, fontSize: 20 }}
                  clickable
                  onClick={() => {
                    if (selectedWinner === "SHIRO") {
                      setSelectedWinner("");
                    } else setSelectedWinner("SHIRO");
                  }}
                  variant={selectedWinner === "SHIRO" ? "filled" : "outlined"}
                  label={"SHIRO"}
                ></Chip>
                <Chip
                  sx={{ p: 3, fontSize: 20 }}
                  clickable
                  onClick={() => {
                    if (selectedWinner === "AKA") {
                      setSelectedWinner("");
                    } else setSelectedWinner("AKA");
                  }}
                  color="error"
                  variant={selectedWinner === "AKA" ? "filled" : "outlined"}
                  label={"AKA"}
                ></Chip>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </DialogContent>
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
          {props.edit ? (
            <>
              <Button
                sx={{ px: 2 }}
                size="small"
                color="info"
                variant="contained"
                onClick={() => {
                  if (props.isKata) {
                    handleSubmit(onKataSubmit)();
                  } else {
                    handleSubmit(onKumiteSubmit)();
                  }
                }}
              >
                Confirmar
              </Button>
              <Button
                sx={{ px: 2 }}
                size="small"
                color="warning"
                variant="contained"
                onClick={() => {
                  reset();
                  if (props.matchData.winner === null) {
                    setSelectedWinner("");
                  } else {
                    setSelectedWinner(
                      props.matchData.winner.id ===
                        props.matchData.contender_1.id
                        ? "SHIRO"
                        : "AKA",
                    );
                  }
                }}
              >
                Reverter
              </Button>
            </>
          ) : null}
          <Button
            sx={{ p: 1 }}
            size="small"
            onClick={() => {
              props.handleModalClose();
              setSelectedWinner("");
            }}
          >
            Voltar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
