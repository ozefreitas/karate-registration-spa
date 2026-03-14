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
  }>,
) {
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
      kata_contender_1: props.matchData?.kataresult?.kata_contender_1,
      flags_contender_1: props.matchData?.kataresult?.flags_contender_1,
      kata_contender_2: props.matchData?.kataresult?.kata_contender_2,
      flags_contender_2: props.matchData?.kataresult?.flags_contender_2,
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
        kata_contender_1: props.matchData.kataresult?.kata_contender_1 ?? "",
        flags_contender_1: props.matchData.kataresult?.flags_contender_1 ?? 0,
        kata_contender_2: props.matchData.kataresult?.kata_contender_2 ?? "",
        flags_contender_2: props.matchData.kataresult?.flags_contender_2 ?? 0,
      });
      if (props.matchData.winner !== null) {
        setSelectedWinner(
          props.matchData.winner.id === props.matchData.contender_1.id
            ? "SHIRO"
            : "AKA",
        );
      }
    }
  }, [props.matchData]);

  const onSubmit = (data: any) => {
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
    updateMatch.mutate(
      { matchId: props.matchData.id, data: payload },
      {
        onSuccess: () => {
          props.handleModalClose();
          setSelectedWinner("");
        },
      },
    );
    if (selectedWinner !== "") {
      const winner = { winner: selectedWinner === "SHIRO" ? 1 : 2 };
      patchMatchWinner.mutate({ matchId: props.matchData.id, data: winner });
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.isModalOpen}
      onClose={props.handleModalClose}
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
                color="Shiro"
                control={control}
                bracketId={props.brackedId}
              ></MatchDetailEditCard>
            ) : (
              <MatchDetailCard
                color="Shiro"
                contenderInfo={props.matchData?.contender_1}
                matchInfo={props.matchData?.kataresult?.flags_contender_1}
                kataInfo={props.matchData?.kataresult?.kata_contender_1}
              ></MatchDetailCard>
            )}
          </Grid>
          <Grid size={6}>
            {props.edit ? (
              <MatchDetailEditCard
                color="Aka"
                control={control}
                bracketId={props.brackedId}
                reverse
              ></MatchDetailEditCard>
            ) : (
              <MatchDetailCard
                color="Aka"
                contenderInfo={props.matchData?.contender_2}
                matchInfo={props.matchData?.kataresult?.flags_contender_2}
                kataInfo={props.matchData?.kataresult?.kata_contender_2}
                reverse
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
                  onClick={() => setSelectedWinner("SHIRO")}
                  variant={selectedWinner === "SHIRO" ? "filled" : "outlined"}
                  label={"SHIRO"}
                ></Chip>
                <Chip
                  sx={{ p: 3, fontSize: 20 }}
                  clickable
                  onClick={() => setSelectedWinner("AKA")}
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
                onClick={() => handleSubmit(onSubmit)()}
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
