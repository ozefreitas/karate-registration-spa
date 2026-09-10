import * as React from "react";
import {
  List,
  Button,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { memberOrderingOptions } from "../../../dashboard/filters";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

export default function MemberOrderingContent(
  props: Readonly<{
    control: any;
    reset: any;
    changedCount: number;
    orderFields: any;
    setOrderFields: any;
  }>,
) {
  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...props.orderFields];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    props.setOrderFields(updated);
  };

  const moveDown = (index: number) => {
    if (index === props.orderFields.length - 1) return;
    const updated = [...props.orderFields];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    props.setOrderFields(updated);
  };

  return (
    <>
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
          {props.orderFields.map((item: any, index: number) => (
            <React.Fragment key={item.key}>
              <Grid size={9}>
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
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          // height: 38,
                          borderRadius: 3,
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.7rem",
                        },
                      }}
                      slotProps={{ input: { style: { fontSize: 13 } } }}
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <MenuItem sx={{ color: "lightgrey" }} value="">
                        -- Selecionar --
                      </MenuItem>
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

              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                size={1}
              >
                <IconButton
                  size="small"
                  disabled={index === 0}
                  onClick={() => moveUp(index)}
                >
                  <ArrowUpward fontSize="small" />
                </IconButton>
              </Grid>

              <Grid
                size={1}
                container
                justifyContent={"center"}
                alignItems={"center"}
              >
                <IconButton
                  size="small"
                  disabled={index === props.orderFields.length - 1}
                  onClick={() => moveDown(index)}
                >
                  <ArrowDownward fontSize="small" />
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
          disabled={props.changedCount === 0}
        >
          Limpar
        </Button>
      </Grid>
    </>
  );
}
