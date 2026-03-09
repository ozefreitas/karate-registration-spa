import { useParams, useSearchParams } from "react-router-dom";
import { drawsHooks } from "../../hooks";
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
import { Clear, Settings, Sports, Visibility } from "@mui/icons-material";
import FormCard from "../../dashboard/FormCard";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import MatchInfoModal from "../../components/DrawModals/MatchInfoModal";
import SingleContenderCard from "../../components/DynamicView/SingleContenderCard";
import { RoundsOptions } from "../../config";
import SectionHeader from "../../components/Header/SectionHeader";
import { useQueryClient } from "@tanstack/react-query";

export default function DynamicViewPage() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const channel = new BroadcastChannel("match_updates");

    channel.onmessage = (event) => {
      if (event.data.type === "MATCH_UPDATED") {
        queryClient.invalidateQueries({ queryKey: ["brackets"] });
        queryClient.invalidateQueries({ queryKey: ["event-matches"] });
      }
    };

    return () => channel.close();
  }, []);

  const { id: eventId } = useParams();
  const [isMatchInfoModalOpen, setIsMatchInfoModalOpen] =
    useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedForInfo, setSelectedForInfo] = useState<number | undefined>(
    undefined,
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const paramBracket = searchParams.get("bracket") ?? "";

  const changeBracket = (bracket: string) => {
    setSearchParams((prev) => {
      prev.set("bracket", bracket);
      return prev;
    });
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

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    console.log(paramBracket);
    if (paramBracket === "" && watch("bracket") === "") {
      newParams.delete("bracket");
      setSearchParams(newParams);
    } else {
      setValue("bracket", paramBracket);
    }
  }, [paramBracket]);

  const handleModalOpen = (matchId: number, isEdit: boolean) => {
    setSelectedForInfo(matchId);
    setIsEditMode(isEdit);
    setIsMatchInfoModalOpen(true);
  };

  const handleModalClose = () => {
    setIsMatchInfoModalOpen(false);
  };

  const { data: bracketsData } = drawsHooks.useBracketsData(eventId!);
  const {
    data: matchesData,
    isLoading: isMatchesLoading,
    error: matchesError,
    refetch,
  } = drawsHooks.useEventMatchesData(watch("bracket"), eventId!);

  const rounds = [...new Set(matchesData?.map((m) => m.round_number))].sort(
    (a, b) => b - a,
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
        <Grid p={2} size={12}>
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
                  changeBracket(e.target.value);
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
                sx={{ minWidth: 450 }}
              >
                <Grid
                  size={10}
                  sx={{ minWidth: 300 }}
                  container
                  spacing={5}
                  direction={"column"}
                >
                  <Grid px={2} size={12} container alignItems={"center"}>
                    <SectionHeader
                      title={
                        RoundsOptions.find(
                          (item) => Number(item.value) === roundNumber,
                        )?.label!
                      }
                      icon={<Sports sx={{ fontSize: 22 }} />}
                    ></SectionHeader>
                  </Grid>
                  {matchesData
                    ?.filter((item) => item.round_number === roundNumber)
                    .map((match, index: number) => {
                      const is2Winner =
                        match.winner?.id === match.contender_2?.id &&
                        match.kataresult?.flags_contender_2! >
                          match.kataresult?.flags_contender_1!;
                      const isOngoing = match.ongoing;
                      const matchFinished =
                        !match.ongoing &&
                        match.kataresult?.flags_contender_2 != null &&
                        match.kataresult?.flags_contender_1 != null &&
                        match.winner !== null;
                      return (
                        <Grid container size={12} spacing={2} key={index}>
                          {isOngoing && (
                            <Box
                              sx={{
                                width: "fit-content",
                                bgcolor: "#f59e0b",
                                color: "white",
                                fontSize: 12,
                                fontWeight: 700,
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                letterSpacing: 1,
                              }}
                            >
                              LIVE
                            </Box>
                          )}
                          <Grid size={12} spacing={1} container>
                            <Grid
                              size={10}
                              container
                              direction={"column"}
                              spacing={2}
                            >
                              <SingleContenderCard
                                roundNumber={roundNumber}
                                contenderNumber={1}
                                isWinner={!is2Winner}
                                points={
                                  match.kataresult === null
                                    ? 99
                                    : match.kataresult?.flags_contender_1
                                }
                                fullName={match.contender_1?.full_name}
                                club={match.contender_1?.club}
                                isMatchFinished={matchFinished}
                                ongoing={isOngoing!}
                              ></SingleContenderCard>
                              <SingleContenderCard
                                roundNumber={roundNumber}
                                contenderNumber={2}
                                isWinner={is2Winner}
                                points={
                                  match.kataresult === null
                                    ? 99
                                    : match.kataresult?.flags_contender_2
                                }
                                fullName={match.contender_2?.full_name}
                                club={match.contender_2?.club}
                                isMatchFinished={matchFinished}
                                ongoing={isOngoing!}
                              ></SingleContenderCard>
                            </Grid>
                            <Grid
                              size={2}
                              px={2}
                              borderRadius={4}
                              bgcolor={"#fdecea"}
                              container
                              alignItems={"center"}
                              border={"0.2px solid red"}
                              justifyContent={"center"}
                              alignContent={"space-evenly"}
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
                                // disabled={
                                //   match.kataresult === null ||
                                //   match.winner === null
                                // }
                                onClick={() => {
                                  handleModalOpen(match.id, false);
                                }}
                              >
                                <Visibility />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {rounds.length === 0 ? null : (
        <Grid size={12} container spacing={3} pl={7} mt={3} gap={5}>
          <Typography variant="body2" fontWeight={500}>
            bye - Não tem registo
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            TBD - A aguardar resultado da ronda anterior
          </Typography>
        </Grid>
      )}
      <MatchInfoModal
        handleModalClose={handleModalClose}
        isModalOpen={isMatchInfoModalOpen}
        edit={isEditMode}
        matchData={matchesData?.find((item) => item.id === selectedForInfo)}
        brackedId={Number(watch("bracket"))}
      ></MatchInfoModal>
    </>
  );
}
