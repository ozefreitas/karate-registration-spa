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
  TextField,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";
import MatchDetailCard from "./MatchDetailCard";
import MatchDetailEditCard from "./MatchDetailEditCard";
import { Controller, useForm } from "react-hook-form";
import { drawsHooks } from "../../hooks";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScoringEntryInfoModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    scoringEntryData?: any;
    brackedId: number;
    edit: boolean;
  }>,
) {
  const updateScoringEntry = drawsHooks.useUpdateScoringEntry();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      person:
        props.scoringEntryData?.person === null
          ? ""
          : props.scoringEntryData?.person.id,
      kata: props.scoringEntryData?.scoring_result?.kata ?? "",
      score_1: props.scoringEntryData?.scoring_result?.score_1 ?? "N/A",
      score_2: props.scoringEntryData?.scoring_result?.score_2 ?? "N/A",
      score_3: props.scoringEntryData?.scoring_result?.score_3 ?? "N/A",
      score_4: props.scoringEntryData?.scoring_result?.score_4 ?? "N/A",
      score_5: props.scoringEntryData?.scoring_result?.score_5 ?? "N/A",
    },
  });

  React.useEffect(() => {
    if (props.scoringEntryData) {
      reset({
        person:
          props.scoringEntryData?.person === null
            ? ""
            : props.scoringEntryData?.person.id,
        kata: props.scoringEntryData?.scoring_result?.kata ?? "",
        score_1:
          props.scoringEntryData?.scoring_result?.score_1 === 0 ||
          props.scoringEntryData?.scoring_result?.score_1 === undefined
            ? "N/A"
            : props.scoringEntryData?.scoring_result?.score_1,
        score_2:
          props.scoringEntryData?.scoring_result?.score_2 === 0 ||
          props.scoringEntryData?.scoring_result?.score_2 === undefined
            ? "N/A"
            : props.scoringEntryData?.scoring_result?.score_2,
        score_3:
          props.scoringEntryData?.scoring_result?.score_3 === 0 ||
          props.scoringEntryData?.scoring_result?.score_3 === undefined
            ? "N/A"
            : props.scoringEntryData?.scoring_result?.score_3,
        score_4:
          props.scoringEntryData?.scoring_result?.score_4 === 0 ||
          props.scoringEntryData?.scoring_result?.score_4 === undefined
            ? "N/A"
            : props.scoringEntryData?.scoring_result?.score_4,
        score_5:
          props.scoringEntryData?.scoring_result?.score_5 === 0 ||
          props.scoringEntryData?.scoring_result?.score_5 === undefined
            ? "N/A"
            : props.scoringEntryData?.scoring_result?.score_5,
      });
    }
  }, [props.scoringEntryData, reset]);

  const onSubmit = (data: any) => {
    const payload = {
      scoring_result: {
        kata: data.kata,
        score_1: data.score_1 === "N/A" ? 0 : data.score_1,
        score_2: data.score_2 === "N/A" ? 0 : data.score_2,
        score_3: data.score_3 === "N/A" ? 0 : data.score_3,
        score_4: data.score_4 === "N/A" ? 0 : data.score_4,
        score_5: data.score_5 === "N/A" ? 0 : data.score_5,
      },
      person: data.person,
    };

    updateScoringEntry.mutate(
      { scoringEntryId: props.scoringEntryData.id, data: payload },
      {
        onSuccess: () => {
          props.handleModalClose();
        },
      },
    );
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.isModalOpen}
      onClose={() => {
        props.handleModalClose();
        reset();
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
            <Chip label={"Finais"}></Chip>
            <Typography fontWeight={"bold"} m={2} ml={1} variant="h4">
              {props.scoringEntryData?.name}
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
          {props.edit ? (
            <MatchDetailEditCard
              color={
                props.scoringEntryData?.entry_number % 2 === 0 ? "Shiro" : "Aka"
              }
              control={control}
              bracketId={props.brackedId}
              scoring
            ></MatchDetailEditCard>
          ) : (
            <MatchDetailCard
              color={
                props.scoringEntryData?.entry_number % 2 === 0 ? "Shiro" : "Aka"
              }
              contenderInfo={props.scoringEntryData?.person}
              matchInfo={
                props.scoringEntryData?.scoring_result?.flags_contender_1
              }
              kataInfo={props.scoringEntryData?.scoring_result?.kata}
              scoring
            ></MatchDetailCard>
          )}
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
            spacing={3}
          >
            {["score_1", "score_2", "score_3", "score_4", "score_5"].map(
              (scoreName: any, index: any) => (
                <Grid key={index} size={2.2}>
                  <Controller
                    name={scoreName}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        color="warning"
                        placeholder="0.0"
                        type={props.edit ? "number" : "text"}
                        variant={props.edit ? "outlined" : "standard"}
                        label={`Score ${index + 1}`}
                        fullWidth
                        slotProps={{
                          input: {
                            readOnly: !props.edit,
                            disableUnderline: true,
                            style: {
                              fontSize: 22,
                              marginRight: 10,
                              color:
                                field.value === "N/A" ? "lightgray" : "inherit",
                            },
                          },
                        }}
                        required={props.edit}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      ></TextField>
                    )}
                  ></Controller>
                </Grid>
              ),
            )}
          </Grid>
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
              reset();
            }}
          >
            Voltar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
