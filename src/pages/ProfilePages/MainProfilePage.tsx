import {
  Cancel,
  Check,
  Clear,
  PhotoCamera,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import FormCard from "../../dashboard/FormCard";
import {
  Avatar,
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import stringAvatar from "../../dashboard/utils/avatarColor";
import { useNavigate } from "react-router-dom";

const MainProfilePage = (props: { user: any }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2((prev) => !prev);
  };
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email_contact: "",
      contact: "",
      cellphone_number: "",
      username: "",
      location: "",
      password: "",
      password2: "",
      bio: "",
    },
  });

  useEffect(() => {}, []);

  //   const uploadPersonProfilePicture = membersHooks.usePatchMemberData();

  const avatarData = stringAvatar(props.user?.username, 174, "any");

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
  };

  const onSubmit = () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("profile_image", selectedFile);
    }
    // uploadPersonProfilePicture.mutate({
    //   personId: memberId!,
    //   data: formData,
    // });
  };

  const previewUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;
  return (
    <Grid>
      <PageInfoCard description="" title="Meu Perfil"></PageInfoCard>
      <Grid container justifyContent={"flex-end"}>
        <Button
          sx={{ mr: 6 }}
          size="large"
          variant="contained"
          color="info"
          onClick={() => navigate("list_notifications/")}
        >
          Notificações
        </Button>
      </Grid>
      <FormCard
        title="Informações do Clube"
        subheader="Modifique as credênciais do seu Clube"
        actions={true}
      >
        <Grid
          p={2}
          size={2}
          height={"100%"}
          container
          justifyContent={"center"}
        >
          <Tooltip
            placement="top"
            disableHoverListener={props.user?.role === "main_admin"}
            title={
              props.user?.profile_image || previewUrl
                ? "Alterar Foto"
                : "Adicionar Foto"
            }
          >
            <Avatar
              src={previewUrl || props.user?.profile_image || undefined}
              {...avatarData}
              onMouseEnter={() => {
                if (props.user.role !== "main_admin") {
                  setIsHovered(true);
                }
              }}
              onMouseLeave={() => {
                if (props.user.role !== "main_admin") {
                  setIsHovered(false);
                }
              }}
              onClick={() => {
                if (props.user.role !== "main_admin") {
                  handleAvatarClick();
                }
              }}
            >
              {isHovered ? (
                <PhotoCamera sx={{ color: "white" }} />
              ) : (
                !previewUrl && !props.user?.profile_image && avatarData.children
              )}
            </Avatar>
          </Tooltip>
          {previewUrl !== null && props.user.role !== "main_admin" ? (
            <Grid container justifyContent={"center"} spacing={1} mt={2}>
              <Chip
                color="success"
                sx={{ p: 1 }}
                onClick={() => {
                  onSubmit();
                }}
                clickable
                icon={<Check />}
                size="small"
                label="Confirmar"
              ></Chip>
              <Chip
                color="error"
                sx={{ p: 1 }}
                onClick={() => {
                  setSelectedFile(undefined);
                }}
                clickable
                icon={<Cancel />}
                size="small"
                label="Cancelar"
              ></Chip>
            </Grid>
          ) : null}
        </Grid>
        <Grid p={2} size={10} container spacing={4}>
          <Grid size={12}>
            <Controller
              name="username"
              disabled
              control={control}
              render={({ field }) => (
                <TextField
                  disabled
                  color="warning"
                  variant={"outlined"}
                  label="Nome de Utilizador (Nome do Clube)"
                  fullWidth
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.username}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Primeiro Nome"
                  fullWidth
                  required
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("first_name") === ""}
                            onClick={() => setValue("first_name", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("first_name") === ""
                                  ? "disabled"
                                  : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Último Nome"
                  fullWidth
                  required
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("last_name") === ""}
                            onClick={() => setValue("last_name", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("last_name") === "" ? "disabled" : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              name="email_contact"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Email de contacto"
                  fullWidth
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("email_contact") === ""}
                            onClick={() => setValue("email_contact", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("email_contact") === ""
                                  ? "disabled"
                                  : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.email_contact}
                  helperText={errors.email_contact?.message}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              name="contact"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  type="number"
                  label="Contacto telefónico"
                  fullWidth
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("contact") === ""}
                            onClick={() => setValue("contact", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("contact") === "" ? "disabled" : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.contact}
                  helperText={errors.contact?.message}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              name="cellphone_number"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  type="number"
                  label="Contacto Pessoal"
                  fullWidth
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("cellphone_number") === ""}
                            onClick={() => setValue("cellphone_number", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("cellphone_number") === ""
                                  ? "disabled"
                                  : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.cellphone_number}
                  helperText={errors.cellphone_number?.message}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Morada"
                  fullWidth
                  required
                  {...field}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disabled={watch("location") === ""}
                            onClick={() => setValue("location", "")}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            <Clear
                              color={
                                watch("location") === "" ? "disabled" : "error"
                              }
                            ></Clear>
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </FormCard>
      <FormCard title="Bio" subheader="Escreva algo sobre o seu Clube" actions>
        <Grid size={12}>
          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Bio"
                placeholder="Primeiro Clube de Karate em ... fundado em ..."
                fullWidth
                multiline
                minRows={4}
                maxRows={8}
                {...field}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disabled={watch("bio") === ""}
                          onClick={() => setValue("bio", "")}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          <Clear
                            color={watch("bio") === "" ? "disabled" : "error"}
                          ></Clear>
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors.bio}
                helperText={errors.bio?.message}
              />
            )}
          />
        </Grid>
      </FormCard>
      <FormCard
        title="Definições de Autenticação"
        subheader="Escreva algo sobre o seu Clube"
        actions
      >
        <Grid p={2} size={6}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                label="Palavra-Passe"
                color="warning"
                variant={"outlined"}
                type={showPassword ? "text" : "password"}
                fullWidth
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </Grid>
        <Grid p={2} size={6}>
          <Controller
            name="password2"
            control={control}
            render={({ field }) => (
              <TextField
                label="Confirmar Palavra-Passe"
                color="warning"
                variant={"outlined"}
                type={showPassword2 ? "text" : "password"}
                fullWidth
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword2}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!errors.password2}
                helperText={errors.password2?.message}
              />
            )}
          />
        </Grid>
      </FormCard>
      {/* hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Grid>
  );
};

export default MainProfilePage;
