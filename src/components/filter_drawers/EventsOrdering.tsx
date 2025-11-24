import * as React from "react";
import {
  Box,
  List,
  Button,
  Drawer,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { eventOrderingOptions } from "../../dashboard/filters";
import { SwapVert } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";

const FiltersBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -20px;
    right: -55px;
  }
`;

export default function EventsOrdering(props: {
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
        <Grid sx={{ p: 2 }} size={2}>
          <Controller
            name="name"
            control={props.control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Nome"
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
                {eventOrderingOptions
                  .filter((item: any) => ["name", "-name"].includes(item.value))
                  .map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid sx={{ p: 2 }} size={2}>
          <Controller
            name="event_date"
            control={props.control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Data"
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
                {eventOrderingOptions
                  .filter((item: any) =>
                    ["event_date", "-event_date"].includes(item.value)
                  )
                  .map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid sx={{ p: 2 }} size={2}>
          <Controller
            name="start_registration"
            control={props.control}
            render={({ field }) => (
              <TextField
                color="warning"
                variant={"outlined"}
                label="Início de inscrições"
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
                {eventOrderingOptions
                  .filter((item: any) =>
                    ["start_registration", "-start_registration"].includes(
                      item.value
                    )
                  )
                  .map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
              </TextField>
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
        endIcon={<SwapVert sx={{ ml: 1 }}></SwapVert>}
        size="large"
        variant="outlined"
        disabled={props.isLoading}
        onClick={toggleDrawer(true)}
      >
        Ordem
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
