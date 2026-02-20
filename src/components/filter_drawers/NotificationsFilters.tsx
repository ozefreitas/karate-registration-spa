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
import { NotificationTypeOptions } from "../../dashboard/config";

const FiltersBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -20px;
    right: -55px;
  }
`;

export default function NotificationsFilters(
  props: Readonly<{
    isLoading: boolean;
    control: any;
    setValue: any;
    errors: any;
    reset: any;
    changedCount: number;
    setSelectedTypes: any;
  }>,
) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const getNotificationTypeValues = (): string[] => {
    return NotificationTypeOptions.map((option) => option.value);
  };

  const notificationTypeValues = getNotificationTypeValues();

  React.useEffect(() => {
    const defaultValues: any = {};
    NotificationTypeOptions.forEach((noti: any) => {
      defaultValues[`${noti.value}`] = false;
    });

    props.reset(defaultValues);
  }, [NotificationTypeOptions]);

  const watchedValues = useWatch({
    control: props.control,
  });

  React.useEffect(() => {
    const usersFiltering = NotificationTypeOptions.filter(
      (item: any) => watchedValues?.[item.value],
    )
      .map((item: any) => item.value)
      .join(",");

    props.setSelectedTypes(usersFiltering);
  }, [watchedValues, NotificationTypeOptions]);

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation">
      <List sx={{ p: 1, mt: 2 }}>
        <Grid container size={12}>
          <Typography variant="h4" pl={2} mb={4}>
            Filtragem
          </Typography>
        </Grid>
        <Grid
          size={12}
          container
          alignItems={"center"}
          p={3}
          py={2}
          spacing={1}
        >
          <Typography fontSize={"1.05rem"} mr={2}>
            Tipo
          </Typography>
          {Object.keys(props.control._defaultValues)
            .filter(
              (fieldName) =>
                notificationTypeValues?.includes(fieldName) &&
                fieldName !== "none",
            )
            .map((fieldName) => (
              <Controller
                key={fieldName}
                name={fieldName}
                control={props.control}
                render={({ field }) => (
                  <Chip
                    variant={field.value ? "filled" : "outlined"}
                    color={field.value ? "success" : "default"}
                    clickable
                    onClick={() => field.onChange(!field.value)}
                    label={
                      NotificationTypeOptions.find(
                        (item) => item.value === fieldName,
                      )?.label
                    }
                  />
                )}
              />
            ))}
        </Grid>
        <Grid p={3} py={2} container>
          <Controller
            name="canRemove"
            control={props.control}
            render={({ field }) => (
              <FormControl
                sx={{ width: "100%" }}
                component="fieldset"
                variant="standard"
                error={!!props.errors.canRemove}
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
                            field.onChange(e.target.checked);
                          } else {
                            field.onChange(undefined);
                          }
                        }}
                        name="canRemove"
                      />
                    }
                    label="Pode Remover"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
      </List>
      <Grid size={12} mt={5} mx={10} container>
        <Button
          disabled={props.changedCount === 0}
          color="error"
          sx={{ width: "100%" }}
          onClick={() => {
            props.reset();
          }}
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
          display: { xs: "none", md: "flex" },
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
          display: { sm: "flex", md: "none" },
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
