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
} from "@mui/material";
import { Controller } from "react-hook-form";
import { Tune } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";

const FiltersBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -20px;
    right: -55px;
  }
`;

export default function MemberFilters(props: {
  isLoading: boolean;
  control: any;
  errors: any;
  reset: any;
  changedCount: number;
}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation">
      <List sx={{ p: 1, mt: 2 }}>
        <Grid sx={{ p: 3, pt: 1, pb: 1 }} container size={6}>
          <Controller
            name="has_registrations"
            control={props.control}
            render={({ field }) => (
              <FormControl
                sx={{ width: "100%" }}
                component="fieldset"
                variant="standard"
                error={!!props.errors.has_registrations}
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
                        name="has_registrations"
                      />
                    }
                    label="Tem Inscrições"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
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
                sx={{ width: "100%" }}
                component="fieldset"
                variant="standard"
                error={!!props.errors.has_categories}
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
                        name="has_teams"
                      />
                    }
                    label="Tem Equipas"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
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
                sx={{ width: "100%" }}
                component="fieldset"
                variant="standard"
                error={!!props.errors.has_categories}
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
                        name="has_categories"
                      />
                    }
                    label="Tem Escalões"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
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
                sx={{ width: "100%" }}
                component="fieldset"
                variant="standard"
                error={!!props.errors.is_open}
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
                        name="is_open"
                      />
                    }
                    label="Inscrições abertas"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
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
                sx={{ width: "100%" }}
                component="fieldset"
                variant="standard"
                error={!!props.errors.is_retification}
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
                        name="is_retification"
                      />
                    }
                    label="Em periodo de retificações"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
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
                sx={{ width: "100%" }}
                component="fieldset"
                variant="standard"
                error={!!props.errors.is_closed}
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
                        name="is_closed"
                      />
                    }
                    label="Inscrições fechadas"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
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
                sx={{ width: "100%" }}
                component="fieldset"
                variant="standard"
                error={!!props.errors.encounter}
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
                        name="encounter"
                      />
                    }
                    label="Encontro"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
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
                sx={{ width: "100%" }}
                component="fieldset"
                variant="standard"
                error={!!props.errors.has_ended}
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
                        name="has_ended"
                      />
                    }
                    label="Já realizado"
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
