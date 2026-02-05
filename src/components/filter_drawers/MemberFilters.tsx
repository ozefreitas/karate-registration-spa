import * as React from "react";
import {
  Box,
  List,
  Button,
  Drawer,
  Grid,
  FormControl,
  Stack,
  FormControlLabel,
  Switch,
  Chip,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { Controller, useWatch } from "react-hook-form";
import { Tune } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { MemberTypes, GenderOptions } from "../../config";
import { useAuth } from "../../access/GlobalAuthProvider";
import { adminHooks } from "../../hooks";

const FiltersBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -20px;
    right: -55px;
  }
`;

export default function MemberFilters(
  props: Readonly<{
    isLoading: boolean;
    control: any;
    setValue: any;
    errors: any;
    reset: any;
    changedCount: number;
    setSelectedUsers: any;
  }>,
) {
  const [open, setOpen] = React.useState(false);
  const [availableUsers, setAvailableUsers] = React.useState<string[]>([]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const { user } = useAuth();
  const userRole = user?.data.role;

  const { data: availableUsersData, isLoading: isAvailableUserLoading } =
    adminHooks.useFetchClubUsersData(undefined, userRole);

  React.useEffect(() => {
    if (!availableUsersData?.data) return;

    const newUsers = availableUsersData.data.map(
      (user: any) => `${user.username}`,
    );

    setAvailableUsers(newUsers);
  }, [availableUsersData]);

  React.useEffect(() => {
    if (!availableUsersData?.data) return;

    const defaultValues: any = {};
    availableUsersData?.data.forEach((user: any) => {
      defaultValues[`${user.username}`] = false;
    });

    props.reset(defaultValues);
  }, [availableUsersData]);

  const watchedValues = useWatch({
    control: props.control,
  });

  React.useEffect(() => {
    if (!availableUsersData?.data) return;

    const usersFiltering = availableUsersData.data
      .filter((item: any) => watchedValues?.[item.username])
      .map((item: any) => item.id)
      .join(",");

    props.setSelectedUsers(usersFiltering);
  }, [watchedValues, availableUsersData]);

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation">
      <List sx={{ p: 1, mt: 2 }}>
        <Grid container size={12}>
          <Typography variant="h4" pl={2} mb={4}>
            Filtragem
          </Typography>
        </Grid>
        <Grid sx={{ p: 3, py: 1 }} alignItems={"center"} container spacing={2}>
          <Typography fontSize={"1.05rem"}>Tipo</Typography>
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
                  onClick={() => field.onChange(!field.value)}
                  label={item.label}
                ></Chip>
              )}
            ></Controller>
          ))}
        </Grid>
        <Grid sx={{ p: 3, py: 2 }} alignItems={"center"} container spacing={2}>
          <Typography fontSize={"1.05rem"}>Género</Typography>
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
                  onClick={() => field.onChange(!field.value)}
                  label={item.label}
                ></Chip>
              )}
            ></Controller>
          ))}
        </Grid>
        {["main_admin", "superuser"].includes(userRole) &&
        !isAvailableUserLoading ? (
          Object.keys(props.control._defaultValues)
            .filter((fieldName) => availableUsers?.includes(fieldName))
            .map((fieldName) => (
              <Grid
                key={fieldName}
                size={12}
                container
                alignItems={"center"}
                sx={{ p: 3, py: 2 }}
              >
                <Typography fontSize={"1.05rem"} mr={1}>
                  Clube
                </Typography>
                <Controller
                  name={fieldName}
                  control={props.control}
                  render={({ field }) => (
                    <Chip
                      variant={field.value ? "filled" : "outlined"}
                      color={field.value ? "success" : "default"}
                      clickable
                      onClick={() => field.onChange(!field.value)}
                      label={fieldName}
                    ></Chip>
                  )}
                />
              </Grid>
            ))
        ) : (
          <>
            <Grid sx={{ p: 3, py: 1 }} container>
              <Controller
                name="isValidated"
                control={props.control}
                render={({ field }) => (
                  <FormControl
                    sx={{ width: "100%" }}
                    component="fieldset"
                    variant="standard"
                    error={!!props.errors.isVerified}
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
                              field.onChange(e.target.checked);
                            }}
                            name="quotesLegible"
                          />
                        }
                        label="Apenas Verificados"
                        sx={{ justifyContent: "space-between", marginLeft: 0 }}
                      />
                    </Stack>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid sx={{ p: 3, py: 1 }} container>
              <Controller
                name="quotesLegible"
                control={props.control}
                render={({ field }) => (
                  <FormControl
                    sx={{ width: "100%" }}
                    component="fieldset"
                    variant="standard"
                    error={!!props.errors.quotesLegible}
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
                              field.onChange(e.target.checked);
                            }}
                            name="quotesLegible"
                          />
                        }
                        label="Paga Quotas"
                        sx={{ justifyContent: "space-between", marginLeft: 0 }}
                      />
                    </Stack>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid sx={{ p: 3, py: 1 }} container>
              <Controller
                name="quotesOverdue"
                control={props.control}
                render={({ field }) => (
                  <FormControl
                    sx={{ width: "100%" }}
                    component="fieldset"
                    variant="standard"
                    error={!!props.errors.quotesOverdue}
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
                              if (e.target.checked) {
                                props.setValue("quotesLegible", true);
                              }
                              field.onChange(e.target.checked);
                            }}
                            name="quotesOverdue"
                          />
                        }
                        label="Quotas por pagar (mês corrente)"
                        sx={{ justifyContent: "space-between", marginLeft: 0 }}
                      />
                    </Stack>
                  </FormControl>
                )}
              />
            </Grid>
          </>
        )}
      </List>
      <Grid size={12} mt={5} mx={10} container>
        <Button
          color="error"
          sx={{ width: "100%" }}
          onClick={() => props.reset()}
          variant="contained"
        >
          Limpar
        </Button>
      </Grid>
    </Box>
  );

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={"flex-end"}
        alignItems={"center"}
        sx={{
          display: { xs: "none", md: "flex" }, // hide on xs, show on sm+
        }}
      >
        <Button
          endIcon={<Tune sx={{ ml: 1 }}></Tune>}
          size="large"
          variant="outlined"
          disabled={props.isLoading}
          onClick={toggleDrawer(true)}
        >
          Filtros
          <FiltersBadge
            badgeContent={props.changedCount}
            color="primary"
            overlap="circular"
          />
        </Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent={"flex-end"}
        alignItems={"center"}
        sx={{
          display: { sm: "flex", md: "none" }, // hide on xs, show on sm+
        }}
      >
        <Tooltip title="Filtros" placement="top">
          <IconButton
            sx={{ border: 1, borderRadius: 3 }}
            size="large"
            color="primary"
            aria-label="delete"
          >
            <Tune></Tune>
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  );
}
