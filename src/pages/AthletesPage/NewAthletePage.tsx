import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  MenuItem,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { SnackbarKey, useSnackbar } from "notistack";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  GraduationsOptions,
  GenderOptions,
  CategoryOptions,
} from "../../config";

export default function NewAthletePage() {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isKataChecked, setIsKataChecked] = useState<boolean>(false);
  const [isKumiteChecked, setIsKumiteChecked] = useState<boolean>(false);

  const handleKataChecked = (event: any) => {
    setIsKataChecked((prev) => !prev);
  };

  const handleKumiteChecked = (event: any) => {
    setIsKumiteChecked((prev) => !prev);
  };

  const action = (snackbarId: SnackbarKey | undefined) => (
    <Close
      color="warning"
      sx={{ cursor: "pointer" }}
      onClick={() => {
        closeSnackbar(snackbarId);
      }}
    >
      Fechar
    </Close>
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      graduation: "",
      category: "",
      skip_number: null,
      kata: false,
      kumite: false,
      gender: "",
      is_student: false,
      birthDate: "",
      weight: "",
    },
  });

  const onSubmit = async (data: any) => {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const graduation = data.graduation;
    const category = data.category;
    const skip_number = data.skip_number;
    const kata = data.kata;
    const kumite = data.kumite;
    const gender = data.gender;
    const is_student = data.is_student;
    const birthDate = data.birthDate;
    const weight = data.weight;

    try {
      const response = await axios.post("http://127.0.0.1:8000/athletes/", {
        firstName,
        lastName,
        graduation,
        category,
        skip_number,
        kata,
        kumite,
        gender,
        is_student,
        birthDate,
        weight,
      });
      enqueueSnackbar("Atleta criado com sucesso!", {
        action,
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 3000,
        preventDuplicate: true
      });
      navigate("/athletes/");
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Algo correu mal!", {
        action,
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 3000,
        preventDuplicate: true
      });
    }
  };
  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de criação de Atletas"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá registar cada Atleta/Aluno. Todos têm um conjunto de
          informação que é obrigatória.<p></p>
          <strong>Importante</strong>: A regras em vigor ditam que a idade
          considerada para determinação de escalão é a idade que uma atleta tem
          no primeiro dia do último ano da presente época. <br /> Por exemplo:
          Um atleta nascido no dia 16 de dezembro de 2010 terá, para todas as
          provas da época 2024/2025, 14 anos, independentemente da idade a que
          se apresentar a dada prova. Isto é, havendo uma prova no dia 02 de
          novembro de 2024, o atleta terá na realidade 13 anos e por isso seria
          Juvenil, no entanto, essa não é a idade tida em conta, mas sim a do
          dia 1 de janeiro de 2025, onde terá 14 anos e será Cadete.
        </CardContent>
      </Card>
      <Grid container>
        <Grid sx={{ m: 2 }} size={9}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Primeiro Nome"
                fullWidth
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
        </Grid>
        <Grid sx={{ m: 2 }} size={9}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Último Nome"
                fullWidth
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Grid>
        <Grid sx={{ m: 2 }} size={9}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Escalão"
                fullWidth
                select
                multiline
                required
                maxRows={8}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.category}
                helperText={errors.category?.message}
              >
                {CategoryOptions.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid sx={{ m: 2 }} size={9}>
          <Controller
            name="graduation"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Graduação"
                select
                fullWidth
                multiline
                required
                maxRows={8}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.graduation}
                helperText={errors.graduation?.message}
              >
                {GraduationsOptions.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid sx={{ m: 2 }} size={9}>
          <Controller
            name="kata"
            control={control}
            render={({ field }) => (
              <FormControl component="fieldset" variant="standard">
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        handleKataChecked(e);
                      }}
                      name="kata"
                    />
                  }
                  label="Kata"
                />
              </FormControl>
            )}
          />
        </Grid>
        <Grid sx={{ m: 2 }} size={9}>
          <Controller
            name="kumite"
            control={control}
            render={({ field }) => (
              <FormControl component="fieldset" variant="standard">
                {/* <FormLabel component="legend">
                  Whether to make this document available for RAG pipelines and
                  information extraction.
                </FormLabel> */}
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        handleKumiteChecked(e);
                      }}
                      name="kumite"
                    />
                  }
                  label="Kumite"
                />
                {/* <FormHelperText sx={{ color: "red" }}>
                  Be careful.
                </FormHelperText> */}
              </FormControl>
            )}
          />
        </Grid>
        <Grid container size={12}>
          <Button
            variant="contained"
            size={"large"}
            color={"success"}
            type={"submit"}
            sx={{ marginBottom: "20px" }}
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            Submeter e voltar
          </Button>
          <Button
            variant="contained"
            size={"large"}
            color={"success"}
            type={"submit"}
            sx={{ marginBottom: "20px" }}
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            Submeter e Adicionar outro
          </Button>
          <Button
            variant="contained"
            size={"large"}
            color={"success"}
            type={"submit"}
            sx={{ marginBottom: "20px" }}
            onClick={() => {
              navigate("/athletes/")
            }}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
