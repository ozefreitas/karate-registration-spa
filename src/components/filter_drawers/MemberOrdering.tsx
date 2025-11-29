import * as React from "react";
import {
  Box,
  List,
  Button,
  Drawer,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { memberOrderingOptions } from "../../dashboard/filters";
import { SwapVert } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const FiltersBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -20px;
    right: -55px;
  }
`;

export default function MemberOrdering(props: {
  isLoading: boolean;
  control: any;
  errors: any;
  reset: any;
  changedCount: number;
  orderFields: any;
  setOrderFields: any;
}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const moveUp = (index: any) => {
    if (index === 0) return; // already at top
    const updated = [...props.orderFields];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    props.setOrderFields(updated);
  };

  const moveDown = (index: any) => {
    if (index === props.orderFields.length - 1) return; // already at bottom
    const updated = [...props.orderFields];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    props.setOrderFields(updated);
  };

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation">
      <List sx={{ p: 1, pr: 2, mt: 2 }}>
        <Typography variant="h4" pl={2} mb={4}>
          Ordenação
        </Typography>
        <Grid container alignContent="center" alignItems="center">
          {props.orderFields.map((item: any, index: any) => (
            <React.Fragment key={item.key}>
              <Grid sx={{ p: 2 }} size={10}>
                <Controller
                  name={item.key}
                  control={props.control}
                  render={({ field }) => (
                    <TextField
                      color="warning"
                      variant="outlined"
                      label={item.label}
                      fullWidth
                      select
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <MenuItem value="">-- Selecionar --</MenuItem>
                      {memberOrderingOptions
                        .filter((opt) => item.options.includes(opt.value))
                        .map((opt) => (
                          <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </MenuItem>
                        ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid size={1}>
                <IconButton
                  disabled={index === 0}
                  onClick={() => moveUp(index)}
                >
                  <ArrowUpward />
                </IconButton>
              </Grid>

              <Grid size={1}>
                <IconButton
                  disabled={index === 3}
                  onClick={() => moveDown(index)}
                >
                  <ArrowDownward />
                </IconButton>
              </Grid>
            </React.Fragment>
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
