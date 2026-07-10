import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
  Chip,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import InfoBaseModal from "../base-modals/InfoBaseModal";
import { disciplinesHooks, drawsHooks } from "../../hooks";
import { useEffect } from "react";
import { getGraduationFromValue } from "../../config";

export default function MergeBracketModal(
  props: Readonly<{ isOpen: boolean; handleClose: any; title: any }>,
) {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
    },
  });
  const { data, refetch, isLoading } =
    disciplinesHooks.useFetchSingleDisciplines(props.title?.discipline!);

  const mergeBracket = drawsHooks.useMergeBrackets();

  useEffect(() => {
    if (props.title) {
      refetch();
    }
  }, [props.title]);

  const onSubmit = (data: any) => {
    if (data.name === "") {
      setError("name", { message: "Este campo é obrigatório" });
    }
    if (data.category === "") {
      setError("category", { message: "Este campo é obrigatório" });
    }

    if (data.name !== "" && data.category !== "") {
      const formData = { name: data.name, category_id: data.category };
      mergeBracket.mutate({ bracketId: props.title?.id, data: formData });
    }
  };

  return (
    <InfoBaseModal
      isModalOpen={props.isOpen}
      handleModalClose={() => {
        props.handleClose();
        reset();
      }}
      title={`Fundir ${props.title?.name}`}
      onSubmit={handleSubmit(onSubmit)}
      size="md"
    >
      <Grid container alignItems={"center"}>
        <Typography px={2} pb={2} variant="body1">
          Ocasionalmente, alguns Escalões podem não ter inscrições suficientes.
          Contudo, alguns Escalões também permitem a fusão com outros, de forma
          permitir a partipação de Atletas, que de outra forma, iriam ver a sua
          prova eliminada.
        </Typography>
        <Typography px={2} variant="body1">
          Escolha o novo nome do Escalão.
        </Typography>
        <Grid m={2} size={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Nome"
                required
                fullWidth
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Typography px={2} variant="body1">
          Escolha o Escalão com o qual deseja fundir.
        </Typography>
        <Grid m={2} size={6}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Escalão"
                required
                select
                fullWidth
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.category}
                helperText={errors.category?.message}
              >
                {isLoading ? (
                  <MenuItem
                    disabled
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      my: 3,
                    }}
                  >
                    <CircularProgress sx={{ mr: 2 }} />A carregar Atletas...
                  </MenuItem>
                ) : (
                  [
                    data?.categories.length === 0 ? (
                      <MenuItem key="empty" disabled>
                        Sem opções disponíveis.
                      </MenuItem>
                    ) : (
                      <MenuItem
                        key="placeholder"
                        sx={{ color: "lightgrey" }}
                        value=""
                      >
                        -- Selecionar --
                      </MenuItem>
                    ),
                    ...(data?.categories.map((category, index: number) => (
                      <MenuItem
                        sx={{ display: "flex", gap: 2 }}
                        key={category.id ?? index}
                        value={category.id}
                      >
                        {category.name} {category.gender}
                        <Grid spacing={1}>
                          <Grid size={12} container spacing={2} p={1}>
                            <Chip
                              size="small"
                              label={`Idade Min.: ${
                                category.min_age ?? "N/A"
                              } anos`}
                            ></Chip>
                            <Chip
                              size="small"
                              label={`Idade Máx.: ${
                                category.max_age ?? "N/A"
                              } anos`}
                            ></Chip>
                          </Grid>
                          <Grid size={12} container spacing={2} p={1}>
                            <Chip
                              size="small"
                              label={`Graduação Min.: ${
                                getGraduationFromValue(
                                  Number(category.min_grad),
                                ) ?? "N/A"
                              }`}
                            ></Chip>
                            <Chip
                              size="small"
                              label={`Graduação Máx.: ${
                                getGraduationFromValue(
                                  Number(category.max_grad),
                                ) ?? "N/A"
                              }`}
                            ></Chip>
                          </Grid>
                          <Grid size={12} container spacing={2} p={1}>
                            <Chip
                              size="small"
                              label={`Peso Min.: ${
                                category.min_weight ?? "N/A"
                              } ${category.min_weight ? "Kg" : ""}`}
                            ></Chip>
                            <Chip
                              size="small"
                              label={`Peso Máx.: ${
                                category.max_weight ?? "N/A"
                              } ${category.max_weight ? "Kg" : ""}`}
                            ></Chip>
                          </Grid>
                          {category.max_athletes ? (
                            <Chip
                              size="small"
                              label={`Número Máx. de Atletas (Equipas): ${
                                category.max_athletes ?? "N/A"
                              } ${category.max_athletes ? "Atletas" : ""}`}
                            ></Chip>
                          ) : null}
                        </Grid>
                        {/* <Chip size="small" label={category.club} />
                        <Chip size="small" label={`${pcategoryerson.age} anos`} /> */}
                      </MenuItem>
                    )) ?? []),
                  ]
                )}
              </TextField>
            )}
          />
        </Grid>
        <FormHelperText sx={{ px: 2, mt: 5 }}>
          Será feita a validação da possibilidade do Escalão escolhido ser
          passível de ser fundido com o Escalão selecionado anteriormente. Em
          caso positivo, o sorteio será gerado, e deverá abrir o novo Escalão
          com o nome escolhido acima.
        </FormHelperText>
      </Grid>
    </InfoBaseModal>
  );
}
