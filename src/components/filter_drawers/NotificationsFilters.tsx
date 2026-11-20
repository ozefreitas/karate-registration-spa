import { Tune } from "@mui/icons-material";
import {
  Box,
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
import { useEffect } from "react";
import { Controller, UseFormReset, useWatch } from "react-hook-form";
import { NotificationTypeOptions } from "../../dashboard/config";
import FilterDrawer from "./FilterDrawer";

const notificationFilterDefaults = Object.fromEntries([
  ...NotificationTypeOptions.map((option) => [option.value, false]),
  ["canRemove", undefined],
]);

export default function NotificationsFilters(
  props: Readonly<{
    isLoading: boolean;
    control: any;
    reset: UseFormReset<Record<string, boolean | undefined>>;
    changedCount: number;
    setSelectedTypes: (types: string) => void;
    userRole: string;
  }>,
) {
  const isAdmin = ["single_admin", "main_admin", "superuser"].includes(
    props.userRole,
  );
  const availableTypes = NotificationTypeOptions.filter(
    (option) =>
      isAdmin ||
      !["request", "reset", "member_request", "exam_prop"].includes(
        option.value,
      ),
  );
  const watchedValues = useWatch({ control: props.control });

  useEffect(() => {
    props.reset(notificationFilterDefaults);
  }, [props.reset]);

  useEffect(() => {
    const selectedTypes = NotificationTypeOptions.filter(
      (option) => watchedValues?.[option.value],
    )
      .map((option) => option.value)
      .join(",");
    props.setSelectedTypes(selectedTypes);
  }, [props.setSelectedTypes, watchedValues]);

  return (
    <FilterDrawer
      label="Filtros"
      changedCount={props.changedCount}
      isLoading={props.isLoading}
      icon={<Tune />}
    >
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
          mt={3}
        >
          <Typography variant="subtitle1">Tipo</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {availableTypes
              .filter((option) => option.value !== "none")
              .map((option) => (
                <Controller
                  key={option.value}
                  name={option.value}
                  control={props.control}
                  render={({ field }) => (
                    <Chip
                      variant={field.value ? "filled" : "outlined"}
                      color={field.value ? "success" : "default"}
                      clickable
                      size="small"
                      onClick={() => field.onChange(!field.value)}
                      label={option.label}
                    />
                  )}
                />
              ))}
          </Box>

          <FormControl fullWidth component="fieldset" variant="standard">
            <Stack>
              <Controller
                name="canRemove"
                control={props.control}
                render={({ field }) => (
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Switch
                        {...field}
                        checked={Boolean(field.value)}
                        onChange={(event) =>
                          field.onChange(
                            event.target.checked ? true : undefined,
                          )
                        }
                        name="canRemove"
                      />
                    }
                    label="Pode remover"
                    sx={{
                      justifyContent: "space-between",
                      mx: 0,
                      py: 1,
                      borderTop: 1,
                      borderColor: "divider",
                    }}
                  />
                )}
              />
            </Stack>
          </FormControl>
        </Grid>
      </List>

      <Grid size={12} mt={3} mx={10} container>
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
    </FilterDrawer>
  );
}
