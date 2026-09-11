import {
  Box,
  List,
  Button,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  Stack,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { SeasonOptions } from "../../config";
import { useState } from "react";

export default function EventFilteringContent(
  props: Readonly<{
    control: any;
    reset: any;
    changedCount: number;
    setPage: any;
  }>,
) {
  const [currentView, _] = useState(() => {
    return localStorage.getItem("eventsView") ?? "list";
  });

  return (
    <Box sx={{ width: 450 }} role="presentation">
      <List sx={{ p: 1, mt: 2 }}>
        <Typography variant="h6" pl={2} mb={3}>
          Filtragem
        </Typography>
        {currentView === "list" ? (
          <Grid p={2} size={2}>
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
                      fontSize: 13,
                    },
                  }}
                  fullWidth
                  select
                  {...field}
                  onChange={(e) => {
                    props.setPage(1);
                    field.onChange(e);
                  }}
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
        ) : null}
        <Grid p={3} py={1} container size={6}>
          <Controller
            name="has_registrations"
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
        <Grid p={3} py={1} container size={6}>
          <Controller
            name="has_teams"
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
        <Grid p={3} py={1} container size={6}>
          <Controller
            name="has_categories"
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
        <Grid p={3} py={1} container size={6}>
          <Controller
            name="is_open"
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
        <Grid p={3} py={1} container size={6}>
          <Controller
            name="is_retification"
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
        <Grid p={3} py={1} container size={6}>
          <Controller
            name="is_closed"
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
                        name="is_closed"
                      />
                    }
                    label="Inscrições Encerradas"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        <Grid p={3} py={1} container size={6}>
          <Controller
            name="has_ended"
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
                        name="has_ended"
                      />
                    }
                    label="Apenas já realizados"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        <Grid p={3} py={1} container size={6}>
          <Controller
            name="has_not_ended"
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
                        name="has_ended"
                      />
                    }
                    label="Apenas ainda não realizados"
                    sx={{ justifyContent: "space-between", marginLeft: 0 }}
                  />
                </Stack>
              </FormControl>
            )}
          />
        </Grid>
        <Grid p={3} py={1} container size={6}>
          <Controller
            name="isOngoing"
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
                        name="has_ended"
                      />
                    }
                    label="A decorrer hoje"
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
          disabled={props.changedCount === 0}
        >
          Limpar
        </Button>
      </Grid>
    </Box>
  );
}
