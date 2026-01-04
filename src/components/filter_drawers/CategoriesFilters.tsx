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
  Typography,
  Chip,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { Tune } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { GenderOptions } from "../../config";
import { categoryFilteringAgeOptions } from "../../dashboard/filters";

const FiltersBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -20px;
    right: -55px;
  }
`;

export default function CategoriesFilters(
  props: Readonly<{
    isLoading: boolean;
    control: any;
    errors: any;
    reset: any;
    watch: any;
    setValue: any;
    changedCount: number;
  }>
) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation">
      <List sx={{ p: 1, mt: 2 }}>
        <Typography variant="h4" pl={2} mb={4}>
          Filtragem
        </Typography>
        <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
          <Controller
            name="hasAge"
            control={props.control}
            render={({ field }) => (
              <FormControl
                sx={{ width: "100%" }}
                component="fieldset"
                variant="standard"
                error={!!props.errors.hasAge}
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
                          props.setValue("minAge", true);
                          props.setValue("maxAge", true);
                        }}
                        name="hasAge"
                      />
                    }
                    label="Tem Idades"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        {props.watch("hasAge") ? (
          <Grid
            sx={{ p: 3, pt: 1 }}
            alignItems={"center"}
            container
            spacing={2}
          >
            {categoryFilteringAgeOptions
              .filter((item: any) => ["minAge", "maxAge"].includes(item.value))
              .map((item: any, index: any) => (
                <Controller
                  key={index}
                  name={item.value}
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
        ) : null}
        <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
          <Controller
            name="hasGrad"
            control={props.control}
            render={({ field }) => (
              <FormControl
                sx={{ width: "100%" }}
                component="fieldset"
                variant="standard"
                error={!!props.errors.hasGrad}
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
                          props.setValue("minGrad", true);
                          props.setValue("maxGrad", true);
                        }}
                        name="hasGrad"
                      />
                    }
                    label="Tem Graduações"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        {props.watch("hasGrad") ? (
          <Grid
            sx={{ p: 3, pt: 1 }}
            alignItems={"center"}
            container
            spacing={2}
          >
            {categoryFilteringAgeOptions
              .filter((item: any) =>
                ["minGrad", "maxGrad"].includes(item.value)
              )
              .map((item: any, index: any) => (
                <Controller
                  key={index}
                  name={item.value}
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
        ) : null}
        <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
          <Controller
            name="hasWeight"
            control={props.control}
            render={({ field }) => (
              <FormControl
                sx={{ width: "100%" }}
                component="fieldset"
                variant="standard"
                error={!!props.errors.hasWeight}
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
                          props.setValue("minWeight", true);
                          props.setValue("maxWeight", true);
                        }}
                        name="hasWeight"
                      />
                    }
                    label="Tem Pesos"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        {props.watch("hasWeight") ? (
          <Grid
            sx={{ p: 3, pt: 0 }}
            alignItems={"center"}
            container
            spacing={2}
          >
            {categoryFilteringAgeOptions
              .filter((item: any) =>
                ["minWeight", "maxWeight"].includes(item.value)
              )
              .map((item: any, index: any) => (
                <Controller
                  key={index}
                  name={item.value}
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
        ) : null}
        <Grid sx={{ p: 3, py: 1 }} alignItems={"center"} container spacing={2}>
          <Typography fontSize={"1.05rem"}>Género</Typography>
          {GenderOptions.filter(
            (item: any) => item.label !== "Ambos" && item.label !== "Misto"
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
    <Grid
      container
      spacing={2}
      justifyContent={"flex-end"}
      alignItems={"center"}
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
  );
}
