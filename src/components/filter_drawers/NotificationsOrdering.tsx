import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";
import { notificationOrderingOptions } from "../../dashboard/filters";
import FilterDrawer from "./FilterDrawer";

type OrderField = {
  key: string;
  label: string;
  options: string[];
};

export default function NotificationsOrdering(
  props: Readonly<{
    isLoading: boolean;
    control: any;
    reset: () => void;
    changedCount: number;
    orderFields: OrderField[];
    setOrderFields: Dispatch<SetStateAction<OrderField[]>>;
  }>,
) {
  const moveField = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= props.orderFields.length) return;

    const updatedFields = [...props.orderFields];
    [updatedFields[index], updatedFields[targetIndex]] = [
      updatedFields[targetIndex],
      updatedFields[index],
    ];
    props.setOrderFields(updatedFields);
  };

  return (
    <FilterDrawer
      label="Ordem"
      changedCount={props.changedCount}
      isLoading={props.isLoading}
    >
      <List sx={{ p: 1, pr: 2, mt: 2 }}>
        <Typography variant="h6" pl={2}>
          Ordenação
        </Typography>
        <Grid
          container
          alignItems="center"
          justifyContent={"space-between"}
          size={12}
          mx={{ xs: 3, sm: 5, md: 3 }}
          rowSpacing={3}
          mt={5}
        >
          {props.orderFields.map((item, index) => (
            <Grid
              key={item.key}
              container
              size={12}
              spacing={0.5}
              alignItems="center"
              wrap="nowrap"
            >
              <Grid size={8}>
                <Controller
                  name={item.key}
                  control={props.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="warning"
                      variant="outlined"
                      label={item.label}
                      fullWidth
                      select
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          // height: 38,
                          borderRadius: 3,
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.7rem",
                        },
                      }}
                      size="small"
                      onChange={(event) => field.onChange(event.target.value)}
                    >
                      <MenuItem value="">-- Selecionar --</MenuItem>
                      {notificationOrderingOptions
                        .filter((option) => item.options.includes(option.value))
                        .map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid size={2} container justifyContent="center">
                <IconButton
                  size="small"
                  aria-label={`Mover ${item.label} para cima`}
                  disabled={index === 0}
                  onClick={() => moveField(index, -1)}
                >
                  <ArrowUpward fontSize="small" />
                </IconButton>
              </Grid>
              <Grid size={2} container justifyContent="center">
                <IconButton
                  size="small"
                  aria-label={`Mover ${item.label} para baixo`}
                  disabled={index === props.orderFields.length - 1}
                  onClick={() => moveField(index, 1)}
                >
                  <ArrowDownward fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          ))}
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
    </FilterDrawer>
  );
}
