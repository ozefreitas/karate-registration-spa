import {
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  List,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { GenderOptions, MemberTypes } from "../../../config";
import { Controller, useWatch } from "react-hook-form";
import { useAuth } from "../../../access/GlobalAuthProvider";
import { useEffect, useState } from "react";
import { adminHooks } from "../../../hooks";

const MemberFilteringContent = (
  props: Readonly<{
    control: any;
    reset: any;
    resetField: any;
    changedCount: number;
    setPage: any;
    setSelectedUsers: any;
    setValue: any;
  }>,
) => {
  const [availableUsers, setAvailableUsers] = useState<string[]>([]);

  const { user } = useAuth();
  const userRole = user?.role;

  const { data: availableUsersData, isLoading: isAvailableUserLoading } =
    adminHooks.useFetchClubUsersData(undefined, userRole);

  useEffect(() => {
    if (!availableUsersData?.data) return;

    const newUsers = availableUsersData.data.map(
      (user: any) => `${user.username}`,
    );

    setAvailableUsers(newUsers);
  }, [availableUsersData]);

  const watchedValues = useWatch({
    control: props.control,
  });

  useEffect(() => {
    availableUsers.forEach((username) => {
      if (
        !Object.prototype.hasOwnProperty.call(watchedValues ?? {}, username)
      ) {
        props.resetField(username, { defaultValue: false });
      }
    });
  }, [availableUsers, watchedValues, props.resetField]);

  useEffect(() => {
    if (!availableUsersData?.data) return;

    const usersFiltering = availableUsersData.data
      .filter((item: any) => watchedValues?.[item.username])
      .map((item: any) => item.id)
      .join(",");

    props.setSelectedUsers(usersFiltering);
  }, [watchedValues, availableUsersData]);
  return (
    <>
      <List sx={{ p: 1, pr: 2, mt: 2 }}>
        <Typography variant="h6" pl={2}>
          Filtragem
        </Typography>
        <Grid
          container
          alignItems="center"
          justifyContent={"space-between"}
          size={12}
          mx={3}
          rowSpacing={2}
          mt={5}
        >
          {["subed_club", "superuser", "single_admin"].includes(user?.role!) ? (
            <Grid alignItems={"center"} container spacing={1} size={12}>
              <Typography variant="subtitle1" mr={2}>
                Tipo
              </Typography>
              {MemberTypes.map((item: any, index: any) => (
                <Controller
                  key={index}
                  name={`is${
                    item.value.charAt(0).toUpperCase() + item.value.slice(1)
                  }`}
                  control={props.control}
                  render={({ field }) => (
                    <Chip
                      variant={field.value ? "filled" : "outlined"}
                      color={field.value ? "success" : "default"}
                      clickable
                      size="small"
                      onClick={() => {
                        props.setPage(1);
                        field.onChange(!field.value);
                      }}
                      label={item.label}
                    ></Chip>
                  )}
                ></Controller>
              ))}
            </Grid>
          ) : null}
          <Grid alignItems={"center"} container spacing={1} py={1}>
            <Typography variant="subtitle1" mr={2}>
              Género
            </Typography>
            {GenderOptions.filter(
              (item: any) => item.label !== "Ambos" && item.label !== "Misto",
            ).map((item: any, index: any) => (
              <Controller
                key={index}
                name={`is${
                  item.value.charAt(0).toUpperCase() + item.value.slice(1)
                }`}
                control={props.control}
                render={({ field }) => (
                  <Chip
                    variant={field.value ? "filled" : "outlined"}
                    color={field.value ? "success" : "default"}
                    clickable
                    size="small"
                    onClick={() => {
                      props.setPage(1);
                      field.onChange(!field.value);
                    }}
                    label={item.label}
                  ></Chip>
                )}
              ></Controller>
            ))}
          </Grid>

          {["main_admin", "superuser"].includes(user?.role!) ? (
            <Grid size={12} container alignItems={"center"} spacing={1}>
              <Typography variant="subtitle1" mr={2}>
                Clube
              </Typography>
              {!isAvailableUserLoading &&
                availableUsers.map((fieldName) => (
                  <Controller
                    key={fieldName}
                    name={fieldName}
                    control={props.control}
                    render={({ field }) => (
                      <Chip
                        variant={field.value ? "filled" : "outlined"}
                        color={field.value ? "success" : "default"}
                        clickable
                        size="small"
                        onClick={() => {
                          props.setPage(1);
                          field.onChange(!field.value);
                        }}
                        label={fieldName}
                      ></Chip>
                    )}
                  />
                ))}
            </Grid>
          ) : (
            <>
              <Grid container size={12} justifyContent={"space-between"}>
                <Controller
                  name="isValidated"
                  control={props.control}
                  render={({ field }) => (
                    <FormControl
                      sx={{ width: "100%" }}
                      component="fieldset"
                      variant="standard"
                    >
                      <Stack>
                        <FormControlLabel
                          labelPlacement="start"
                          control={
                            <Switch
                              sx={{ ml: 2 }}
                              {...field}
                              checked={field.value}
                              onChange={(e) => {
                                props.setPage(1);
                                field.onChange(e.target.checked);
                              }}
                              name="quotesLegible"
                            />
                          }
                          label="Apenas Verificados"
                          sx={{
                            justifyContent: "space-between",
                            marginLeft: 0,
                          }}
                        />
                      </Stack>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid container size={12} justifyContent={"space-between"}>
                <Controller
                  name="quotesLegible"
                  control={props.control}
                  render={({ field }) => (
                    <FormControl
                      sx={{ width: "100%" }}
                      component="fieldset"
                      variant="standard"
                    >
                      <Stack>
                        <FormControlLabel
                          labelPlacement="start"
                          control={
                            <Switch
                              sx={{ ml: 2 }}
                              {...field}
                              checked={field.value}
                              onChange={(e) => {
                                props.setPage(1);
                                field.onChange(e.target.checked);
                              }}
                              name="quotesLegible"
                            />
                          }
                          label="Paga Quotas"
                          sx={{
                            justifyContent: "space-between",
                            marginLeft: 0,
                          }}
                        />
                      </Stack>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid container size={12} justifyContent={"space-between"}>
                <Controller
                  name="quotesOverdue"
                  control={props.control}
                  render={({ field }) => (
                    <FormControl
                      sx={{ width: "100%" }}
                      component="fieldset"
                      variant="standard"
                    >
                      <Stack>
                        <FormControlLabel
                          labelPlacement="start"
                          control={
                            <Switch
                              sx={{ ml: 2 }}
                              {...field}
                              checked={field.value}
                              onChange={(e) => {
                                props.setPage(1);
                                if (e.target.checked) {
                                  props.setValue("quotesLegible", true);
                                }
                                field.onChange(e.target.checked);
                              }}
                              name="quotesOverdue"
                            />
                          }
                          label="Quotas por pagar (mês corrente)"
                          sx={{
                            justifyContent: "space-between",
                            marginLeft: 0,
                          }}
                        />
                      </Stack>
                    </FormControl>
                  )}
                />
              </Grid>
            </>
          )}
        </Grid>
      </List>
      <Grid size={12} mt={5} mx={10} container>
        <Button
          color="error"
          disabled={props.changedCount === 0}
          sx={{ width: "100%" }}
          onClick={() => props.reset()}
          variant="contained"
        >
          Limpar
        </Button>
      </Grid>
    </>
  );
};

export default MemberFilteringContent;
