import * as React from "react";
import {
  Box,
  List,
  Button,
  Drawer,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  Stack,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { SeasonOptions } from "../../config";
import { Tune } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";

const FiltersBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -20px;
    right: -55px;
  }
`;

export default function EventFilters(props: {
  control: any;
  errors: any;
  changedCount: number;
}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 500 }} role="presentation">
      <List>
        <Grid sx={{ p: 2 }} size={2}>
          <Controller
            name="season"
            control={props.control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Época"
                type="number"
                slotProps={{
                  htmlInput: {
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  },
                }}
                fullWidth
                select
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!props.errors.season}
                helperText={props.errors.season?.message}
              >
                {SeasonOptions.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
          <Controller
            name="has_registrations"
            control={props.control}
            render={({ field }) => (
              <FormControl
                component="fieldset"
                variant="standard"
                error={!!props.errors.has_registrations}
              >
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
                        name="has_registrations"
                      />
                    }
                    label="Tem Inscrições"
                    sx={{ justifyContent: "left", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
          <Controller
            name="has_teams"
            control={props.control}
            render={({ field }) => (
              <FormControl
                component="fieldset"
                variant="standard"
                error={!!props.errors.has_categories}
              >
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
                        name="has_teams"
                      />
                    }
                    label="Tem Equipas"
                    sx={{ justifyContent: "left", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
          <Controller
            name="has_categories"
            control={props.control}
            render={({ field }) => (
              <FormControl
                component="fieldset"
                variant="standard"
                error={!!props.errors.has_categories}
              >
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
                        name="has_categories"
                      />
                    }
                    label="Tem Escalões"
                    sx={{ justifyContent: "left", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
          <Controller
            name="is_open"
            control={props.control}
            render={({ field }) => (
              <FormControl
                component="fieldset"
                variant="standard"
                error={!!props.errors.is_open}
              >
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
                        name="is_open"
                      />
                    }
                    label="Inscrições abertas"
                    sx={{ justifyContent: "left", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
          <Controller
            name="is_retification"
            control={props.control}
            render={({ field }) => (
              <FormControl
                component="fieldset"
                variant="standard"
                error={!!props.errors.is_retification}
              >
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
                        name="is_retification"
                      />
                    }
                    label="Em periodo de retificações"
                    sx={{ justifyContent: "left", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
          <Controller
            name="is_closed"
            control={props.control}
            render={({ field }) => (
              <FormControl
                component="fieldset"
                variant="standard"
                error={!!props.errors.is_closed}
              >
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
                        name="is_closed"
                      />
                    }
                    label="Inscrições fechadas"
                    sx={{ justifyContent: "left", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
          <Controller
            name="encounter"
            control={props.control}
            render={({ field }) => (
              <FormControl
                component="fieldset"
                variant="standard"
                error={!!props.errors.encounter}
              >
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
                        name="encounter"
                      />
                    }
                    label="Encontro"
                    sx={{ justifyContent: "left", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
          <Controller
            name="has_ended"
            control={props.control}
            render={({ field }) => (
              <FormControl
                component="fieldset"
                variant="standard"
                error={!!props.errors.has_ended}
              >
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
                        name="has_ended"
                      />
                    }
                    label="Já realizado"
                    sx={{ justifyContent: "left", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
      </List>
    </Box>
  );

  return (
    <Grid
      size={12}
      container
      spacing={2}
      justifyContent={"flex-end"}
      alignItems={"center"}
    >
      <Button
        endIcon={<Tune sx={{ ml: 1 }}></Tune>}
        size="large"
        variant="outlined"
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
