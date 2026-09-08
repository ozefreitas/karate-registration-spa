import {
  Typography,
  Grid,
  FormHelperText,
  ListItem,
  Tooltip,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  FormControl,
  FormLabel,
  Stack,
  FormControlLabel,
  Switch,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InfoBaseModal from "../base-modals/InfoBaseModal";
import { disciplinesHooks, drawsHooks } from "../../hooks";
import { useEffect, useMemo, useState } from "react";
import {
  Add,
  Clear,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Remove,
} from "@mui/icons-material";
import AllUseTable from "../Table/AllUseTable";
import { useAuth } from "../../access/GlobalAuthProvider";

export default function ReGenBracketDrawModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
    bracketInfo: any;
    setValue: any;
    setError: any;
  }>,
) {
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      remove_athletes: false,
      add_athletes: false,
      splitClubs: false,
      splitFavourites: false,
      finalsSize: props.bracketInfo?.draw_type !== "Misto" ? "8" : "",
    },
  });
  const [selectedAthletesToRemove, setSelectedAthletesToRemove] = useState<
    string[]
  >([]);
  const [selectedAthletesToAdd, setSelectedAthletesToAdd] = useState<string[]>(
    [],
  );
  const [isRemoveAthletesSectionOpen, setIsRemoveAthletesSectionOpen] =
    useState<boolean>(false);
  const [isAddAthletesSectionOpen, setIsAddAthletesSectionOpen] =
    useState<boolean>(false);
  const { data: bracketMembersData } =
    drawsHooks.useMembersPerBracketData(props.bracketInfo?.id);
  const { data: bracketTeamsData } =
    drawsHooks.useTeamsPerBracketData(props.bracketInfo?.id);
  const {
    data: singleDisciplinesData,
    refetch: refetchSingleDisciplineData,
  } = disciplinesHooks.useFetchSingleDisciplines(props.bracketInfo?.discipline);

  useEffect(() => {
    if (props.isOpen) {
      refetchSingleDisciplineData();
    }
  }, [props.isOpen]);

  const bracketMembersRows = useMemo(() => {
    return bracketMembersData?.map((person) => ({
      id: person.id,
      full_name: person.full_name,
      gender: person.gender === "Masculino" ? "M" : "F",
      username: person.club,
      age: person.age,
      weight: person.weight ?? "N/A",
    }));
  }, [bracketMembersData]);

  const bracketTeamsRows = useMemo(() => {
    return bracketTeamsData?.map((teamInfo) => ({
      id: teamInfo.id,
      athlete1:
        teamInfo.athlete1 === null ? (
          <Typography color="textDisabled">N/A</Typography>
        ) : (
          teamInfo.athlete1?.full_name
        ),
      athlete2:
        teamInfo.athlete2 === null ? (
          <Typography color="textDisabled">N/A</Typography>
        ) : (
          teamInfo.athlete2?.full_name
        ),
      athlete3:
        teamInfo.athlete3 === null ? (
          <Typography color="textDisabled">N/A</Typography>
        ) : (
          teamInfo.athlete3?.full_name
        ),
      gender: teamInfo.gender,
      club: teamInfo.club,
    }));
  }, [bracketTeamsData]);

  const disciplineIndividualsRegistrationsRows = useMemo(() => {
    return singleDisciplinesData?.individuals
      .filter((person) => {
        if (props.bracketInfo.category.gender === "Misto") {
          return person;
        } else {
          return person.person.gender === props.bracketInfo.category.gender;
        }
      })
      .map((person) => ({
        id: person.person.id,
        full_name: person.person.full_name,
        gender: person.person.gender === "Masculino" ? "M" : "F",
        username: person.person.club,
        age: person.person.age,
        weight: person.person.weight ?? "N/A",
      }));
  }, [singleDisciplinesData]);

  const membersColumnMapping = [
    { key: "full_name", label: "Nome" },
    { key: "gender", label: "Género" },
    { key: "username", label: "Clube" },
    { key: "age", label: "Idade" },
    { key: "weight", label: "Peso" },
  ];

  const teamsColumnMapping = [
    { key: "athlete1", label: "Atleta 1" },
    { key: "athlete2", label: "Atleta 2" },
    { key: "athlete3", label: "Atleta 3" },
    { key: "gender", label: "Género" },
    { key: "club", label: "Clube" },
  ];

  const generateBracketDraw = drawsHooks.useGenerateBracketDraw();

  useEffect(() => {
    if (props.bracketInfo) {
      refetchSingleDisciplineData();
    }
  }, [props.bracketInfo]);

  const onSubmit = (data: any) => {
    generateBracketDraw.mutate(
      {
        bracketId: props.bracketInfo.id,
        data: {
          splitClubs: data.splitClubs,
          splitFavourites: data.splitFavourites,
          finalsSize: data.finalsSize,
          removed_ids: selectedAthletesToRemove,
          added_ids: selectedAthletesToAdd,
        },
      },
      {
        onSuccess: () => {
          props.setValue("bracket", "");
          props.setError("bracket", {
            message: "Selecione o Escalão novamente.",
          });
          props.handleClose();
        },
      },
    );
  };

  return (
    <InfoBaseModal
      isModalOpen={props.isOpen}
      handleModalClose={() => {
        reset();
        setIsAddAthletesSectionOpen(false);
        setIsRemoveAthletesSectionOpen(false);
        props.handleClose();
      }}
      title={`Gerar novo Sorteio para ${props.bracketInfo?.name}`}
      subheader={
        isAddAthletesSectionOpen
          ? props.bracketInfo?.is_team
            ? "Adicionar novas Equipas"
            : "Adicionar novos Atletas"
          : isRemoveAthletesSectionOpen
            ? props.bracketInfo?.is_team
              ? "Remover Equipas"
              : "Remover Atletas"
            : undefined
      }
      onSubmit={handleSubmit(onSubmit)}
      size="md"
    >
      {!isAddAthletesSectionOpen && !isRemoveAthletesSectionOpen ? (
        <Grid>
          <Typography px={2} pb={2} variant="body1">
            Em caso de problemas encontrados no sorteio, ou excesso de faltas de
            comparência por parte dos atletas, poderá gerar um novo sorteio. Em
            caso de faltas de Atletas, deve remover os mesmos na tabela, após
            clicar no botão correspondente. Da mesma forma, no caso de mudança
            de escalão por parte de certos Atletas, tem também a opção de
            adicionar. No caso de formatos <strong>Misto</strong>, deverá
            fornecer de novo a composição das finais.
          </Typography>
          <Grid mx={2} mt={2} container size={12}>
            <ListItem
              // disablePadding
              secondaryAction={
                <Tooltip
                  title={
                    props.bracketInfo?.is_team
                      ? "Remover Equipas"
                      : "Remover Atletas"
                  }
                >
                  <span>
                    <IconButton
                      onClick={() => {
                        setIsRemoveAthletesSectionOpen(true);
                      }}
                      aria-label="go to select"
                    >
                      <KeyboardArrowRight color="success" />
                    </IconButton>
                  </span>
                </Tooltip>
              }
            >
              <ListItemButton
                sx={{ mr: 2 }}
                onClick={() => {
                  setIsRemoveAthletesSectionOpen(true);
                }}
              >
                <ListItemIcon>
                  <Remove color="error" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    props.bracketInfo?.is_team
                      ? "Remover Equipas"
                      : "Remover Atletas"
                  }
                  secondary={
                    selectedAthletesToRemove.length > 0 && (
                      <Chip
                        sx={{ mt: 1 }}
                        label={`${selectedAthletesToRemove.length} ${props.bracketInfo?.is_team ? "Equipa(s) selecionada(s)" : "Atleta(s) selecionado(s)"}`}
                      ></Chip>
                    )
                  }
                />
              </ListItemButton>
            </ListItem>
          </Grid>
          <Grid mx={2} container size={12}>
            <ListItem
              // disablePadding
              secondaryAction={
                <Tooltip
                  title={
                    props.bracketInfo?.is_team
                      ? "Adicionar Equipas"
                      : "Adicionar Atletas"
                  }
                >
                  <span>
                    <IconButton
                      onClick={() => {
                        setIsAddAthletesSectionOpen(true);
                      }}
                      aria-label="go to disciplines selection"
                    >
                      <KeyboardArrowRight color="success" />
                    </IconButton>
                  </span>
                </Tooltip>
              }
            >
              <ListItemButton
                sx={{ mr: 2 }}
                onClick={() => {
                  setIsAddAthletesSectionOpen(true);
                }}
              >
                <ListItemIcon>
                  <Add color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    props.bracketInfo?.is_team
                      ? "Adicionar Equipas"
                      : "Adicionar Atletas"
                  }
                  secondary={
                    selectedAthletesToAdd.length > 0 && (
                      <Chip
                        sx={{ mt: 1 }}
                        label={`${selectedAthletesToAdd.length} ${props.bracketInfo?.is_team ? "Equipa(s) selecionada(s)" : "Atleta(s) selecionado(s)"}`}
                      ></Chip>
                    )
                  }
                />
              </ListItemButton>
              <Divider />
            </ListItem>
          </Grid>
          <Grid p={3} pb={1} size={6}>
            <Controller
              name="finalsSize"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  type="number"
                  fullWidth
                  disabled={props.bracketInfo?.draw_type !== "Misto"}
                  label="Número de Atletas na final"
                  slotProps={{
                    input: {
                      inputProps: {
                        min: 0,
                        max: 100,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={
                              watch("finalsSize") === "" ||
                              props.bracketInfo?.draw_type !== "Misto"
                            }
                            onClick={() => setValue("finalsSize", "")}
                            edge="end"
                          >
                            <Clear
                              color={
                                watch("finalsSize") === "" ||
                                props.bracketInfo?.draw_type !== "Misto"
                                  ? "disabled"
                                  : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.finalsSize}
                  helperText={errors.finalsSize?.message}
                ></TextField>
              )}
            />
          </Grid>
          <Grid p={3} pb={0} container size={12}>
            <Controller
              name="splitClubs"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset" variant="standard">
                  <FormLabel sx={{ mb: 1 }}>
                    Selecione este campo para otimizar a separação de Membros do
                    mesmo Clube.
                  </FormLabel>
                  <Stack spacing={1}>
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <Switch
                          sx={{ ml: 2 }}
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                          }}
                          name="splitClubs"
                        />
                      }
                      label="Dividir Clubes"
                      sx={{ justifyContent: "left", marginLeft: 0 }}
                    />
                    {!!errors.splitClubs && (
                      <FormHelperText error sx={{ marginLeft: "14px" }}>
                        {errors.splitClubs?.message}
                      </FormHelperText>
                    )}
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
          <Grid p={3} pb={0} container size={12}>
            <Controller
              name="splitFavourites"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset" variant="standard">
                  <FormLabel sx={{ mb: 1 }}>
                    Selecione este campo para otimizar a separação de Membros
                    favoritos (vencedores de provas anteriores).
                  </FormLabel>
                  <Stack spacing={1}>
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <Switch
                          sx={{ ml: 2 }}
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                          }}
                          name="splitFavourites"
                        />
                      }
                      label="Dividir Favoritos"
                      sx={{ justifyContent: "left", marginLeft: 0 }}
                    />
                    {!!errors.splitFavourites && (
                      <FormHelperText error sx={{ marginLeft: "14px" }}>
                        {errors.splitFavourites?.message}
                      </FormHelperText>
                    )}
                  </Stack>
                </FormControl>
              )}
            />
          </Grid>
          <FormHelperText sx={{ pl: 2, pr: 3, mt: 5 }}>
            Será feita a validação da possibilidade dos Atletas selecionados
            serem adicionados a este Escalão. Em caso positivo, o sorteio será
            gerado, e deverá abrir o novo Escalão com o nome escolhido acima.
            Isto irá remover o Escalão selecionado.
          </FormHelperText>
        </Grid>
      ) : isRemoveAthletesSectionOpen ? (
        <Grid container>
          <Grid
            mt={2}
            container
            alignItems={"flex-start"}
            justifyContent={"center"}
            size={1}
          >
            <Tooltip title="Voltar atrás">
              <span>
                <IconButton
                  onClick={() => {
                    setIsRemoveAthletesSectionOpen(false);
                  }}
                  aria-label="back to select action"
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
          <Grid size={11}>
            <AllUseTable
              type="Atletas"
              data={
                props.bracketInfo === undefined
                  ? undefined
                  : props.bracketInfo?.is_team
                    ? bracketTeamsRows
                    : bracketMembersRows
              }
              count={
                props.bracketInfo === undefined
                  ? 0
                  : props.bracketInfo?.is_team
                    ? bracketTeamsRows?.length!
                    : bracketMembersRows?.length!
              }
              columnsHeaders={
                props.bracketInfo?.is_team
                  ? teamsColumnMapping
                  : membersColumnMapping
              }
              selection
              actions={false}
              userRole={user?.role!}
              disallowEdit
              disallowDelete
              selectedIds={selectedAthletesToRemove}
              onSelectionChange={setSelectedAthletesToRemove}
            ></AllUseTable>
          </Grid>
        </Grid>
      ) : isAddAthletesSectionOpen ? (
        <Grid container>
          <Grid
            mt={2}
            container
            alignItems={"flex-start"}
            justifyContent={"center"}
            size={1}
          >
            <Tooltip title="Voltar atrás">
              <span>
                <IconButton
                  onClick={() => {
                    setIsAddAthletesSectionOpen(false);
                  }}
                  aria-label="back to select action"
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
          <Grid size={11}>
            <AllUseTable
              type="Atletas"
              data={
                props.bracketInfo === undefined
                  ? undefined
                  : props.bracketInfo?.is_team
                    ? bracketTeamsRows
                    : disciplineIndividualsRegistrationsRows
              }
              count={
                props.bracketInfo === undefined
                  ? 0
                  : props.bracketInfo?.is_team
                    ? bracketTeamsRows?.length!
                    : disciplineIndividualsRegistrationsRows?.length!
              }
              columnsHeaders={
                props.bracketInfo?.is_team
                  ? teamsColumnMapping
                  : membersColumnMapping
              }
              selection
              actions={false}
              userRole={user?.role!}
              disallowEdit
              disallowDelete
              selectedIds={selectedAthletesToAdd}
              onSelectionChange={setSelectedAthletesToAdd}
            ></AllUseTable>
          </Grid>
        </Grid>
      ) : null}
    </InfoBaseModal>
  );
}
