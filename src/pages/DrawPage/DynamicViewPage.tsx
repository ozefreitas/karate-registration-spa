import { useParams } from "react-router-dom";
import { drawsHooks, eventsHooks } from "../../hooks";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { Clear, Settings, Visibility } from "@mui/icons-material";
import FormCard from "../../dashboard/FormCard";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import MatchInfoModal from "../../components/DrawModals/MatchInfoModal";
import SingleContenderCard from "../../components/DynamicView/SingleContenderCard";

export default function DynamicViewPage() {
  const { id: eventId } = useParams();
  const [isMatchInfoModalOpen, setIsMatchInfoModalOpen] =
    useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [selectedForInfo, setSelectedForInfo] = useState<number | undefined>(
    undefined,
  );

  const handleModalOpen = (matchId: number, isEdit: boolean) => {
    setSelectedForInfo(matchId);
    setIsEditMode(isEdit)
    setIsMatchInfoModalOpen(true);
  };

  const handleModalClose = () => {
    setIsMatchInfoModalOpen(false);
  };

  const {
    control: eventMetadataControl,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bracket: "",
    },
  });

  const { data: bracketsData } = drawsHooks.useBracketsData(eventId!);
  const {
    data: matchesData,
    isLoading: isMatchesLoading,
    error: matchesError,
    refetch,
  } = eventsHooks.useEventMatchesData(watch("bracket"), eventId!);

  console.log(watch("bracket"));

  const rounds = [...new Set(matchesData?.map((m) => m.round_number))].sort(
    (a, b) => a - b,
  );
  return (
    <>
      <PageInfoCard
        description="Aqui pode visualizar as partidas a decorrer do sorteio para esta prova."
        title="Vista Dinâmica"
      ></PageInfoCard>
      <FormCard
        title="Selecionar Escalão"
        subheader="Selecione o Escalão para visualizar o Sorteio"
      >
        <Grid sx={{ p: 2 }} size={12}>
          <Controller
            name="bracket"
            control={eventMetadataControl}
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
      </FormCard>
      {isMatchesLoading ? (
        <Grid mt={3} container size={12} justifyContent={"center"}>
          <CircularProgress />
        </Grid>
      ) : matchesError ? (
        <Grid my={3} container justifyContent="center" size={12}>
          <ListItem sx={{ textAlign: "center" }}>
            <ListItemText primary="Ocorreu um erro ao encontrar os Eventos disponíveis, tente mais tarde ou contacte um administrador."></ListItemText>
          </ListItem>
          <Button onClick={() => refetch()}>Refrescar</Button>
        </Grid>
      ) : rounds.length === 0 ? null : (
        <Box sx={{ overflowX: "auto", width: "100%" }}>
          <Grid
            container
            alignItems={"center"}
            m={6}
            size={12}
            spacing={2}
            wrap="nowrap"
          >
            {rounds.map((roundNumber, index: number) => (
              <Grid
                key={index}
                height={"100%"}
                size={5}
                container
                sx={{ minWidth: 420 }}
              >
                {/* <Grid size={1} container alignItems={"center"}>
              {roundNumber}
            </Grid> */}
                <Grid
                  size={10}
                  sx={{ minWidth: 300 }}
                  container
                  spacing={5}
                  direction={"column"}
                >
                  {matchesData
                    ?.filter((item) => item.round_number === roundNumber)
                    .map((match, index: number) => (
                      <Grid size={12} spacing={1} key={index} container>
                        <Grid
                          size={10}
                          container
                          direction={"column"}
                          spacing={2}
                        >
                          <SingleContenderCard
                            match={match}
                            roundNumber={roundNumber}
                          ></SingleContenderCard>
                          <Card>
                            <Grid
                              container
                              alignItems={"center"}
                              justifyContent={"space-between"}
                              p={2}
                            >
                              <Grid container gap={2}>
                                <Box
                                  sx={{
                                    border: "1px solid red",
                                    borderRadius: "50%",
                                    width: 25,
                                    height: 25,
                                    bgcolor: "red",
                                  }}
                                ></Box>
                                <Typography
                                  fontWeight={
                                    match.kataresult?.flags_contender_2! >
                                    match.kataresult?.flags_contender_1!
                                      ? 700
                                      : undefined
                                  }
                                >
                                  {match.contender_2?.full_name === undefined &&
                                  roundNumber !== 0
                                    ? "TBD"
                                    : match.contender_2?.full_name ===
                                          undefined && roundNumber === 0
                                      ? "bye"
                                      : match.contender_2?.full_name}
                                </Typography>
                              </Grid>
                              <Grid container alignItems={"center"} gap={2}>
                                <Typography
                                  variant="h6"
                                  fontWeight={
                                    match.kataresult?.flags_contender_2! >
                                    match.kataresult?.flags_contender_1!
                                      ? 900
                                      : undefined
                                  }
                                >
                                  {match.kataresult?.flags_contender_2 ?? "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                        <Grid
                          size={2}
                          px={2}
                          borderRadius={4}
                          height={"100%"}
                          bgcolor={"#fdecea"}
                          container
                          alignItems={"center"}
                          border={"0.2px solid red"}
                          justifyContent={"center"}
                          alignContent={"center"}
                          gap={3}
                          minWidth={50}
                        >
                          <IconButton
                            size="small"
                            onClick={() => {
                              handleModalOpen(match.id, true);
                            }}
                          >
                            <Settings />
                          </IconButton>
                          <IconButton
                            size="small"
                            disabled={match.kataresult === null}
                            onClick={() => {
                              handleModalOpen(match.id, false);
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Grid size={12} container spacing={3} pl={7} mt={3} gap={5}>
        <Typography variant="body2" fontWeight={500}>
          bye - Não tem registo
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          TBD - A aguardar resultado
        </Typography>
      </Grid>
      <MatchInfoModal
        handleModalClose={handleModalClose}
        isModalOpen={isMatchInfoModalOpen}
        edit={isEditMode}
        matchData={matchesData?.find((item) => item.id === selectedForInfo)}
      ></MatchInfoModal>
    </>
  );
}
