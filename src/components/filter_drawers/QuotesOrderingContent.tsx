import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  List,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { quotesOrderingOptions } from "../../dashboard/filters";

export default function QuotesOrderingContent(
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
          justifyContent="space-between"
          size={12}
          mx={{ xs: 3, sm: 5, md: 3 }}
          rowSpacing={3}
          mt={5}
        >
          {props.orderFields.map((item: any, index: number) => (
            <Grid
              key={item.key}
              container
              alignItems="center"
              size={12}
              spacing={0.5}
              wrap="nowrap"
            >
              <Grid size={9}>
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
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.7rem",
                        },
                      }}
                      slotProps={{ input: { style: { fontSize: 13 } } }}
                      onChange={(event) => field.onChange(event.target.value)}
                    >
                      <MenuItem value="">-- Selecionar --</MenuItem>
                      {quotesOrderingOptions
                        .filter((option) =>
                          item.options.includes(option.value),
                        )
                        .map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid size={1} container justifyContent="center">
                <IconButton
                  size="small"
                  aria-label={`Mover ${item.label} para cima`}
                  disabled={index === 0}
                  onClick={() => moveUp(index)}
                >
                  <ArrowUpward fontSize="small" />
                </IconButton>
              </Grid>
              <Grid size={1} container justifyContent="center">
                <IconButton
                  size="small"
                  aria-label={`Mover ${item.label} para baixo`}
                  disabled={index === props.orderFields.length - 1}
                  onClick={() => moveDown(index)}
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
    </>
  );
}
