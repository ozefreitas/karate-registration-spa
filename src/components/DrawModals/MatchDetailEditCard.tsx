import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  TextField,
  MenuItem,
} from "@mui/material";
import { Person, SportsMartialArts, Flag } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { KataOptions } from "../../config";
import { membersHooks } from "../../hooks";

interface MatchDetailEditCardProps {
  color: string;
  contenderInfo: any;
  matchInfo: number;
  kataInfo: string;
  reverse?: boolean;
}

function IconBox({
  icon,
  color,
}: Readonly<{ icon: React.ReactNode; color: string }>) {
  return (
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        bgcolor: color === "Aka" ? "red" : "transparent",
        border: color === "Aka" ? "1px solid red" : "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: color === "Aka" ? "#fff" : "black",
      }}
    >
      {icon}
    </Box>
  );
}

function InfoRow({
  color,
  icon,
  value,
  reverse,
}: Readonly<{
  color: string;
  icon: React.ReactNode;
  value: React.ReactNode;
  reverse?: boolean;
}>) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: reverse ? "flex-end" : "flex-start",
        gap: 2,
        p: 2,
        borderRadius: 3,
        border: "1px solid #eeeeee",
        bgcolor: "#fff",
      }}
    >
      {reverse ? (
        <>
          {value}
          <IconBox color={color} icon={icon} />
        </>
      ) : (
        <>
          <IconBox color={color} icon={icon} />
          {value}
        </>
      )}
    </Paper>
  );
}

export default function MatchDetailEditCard({
  color,
  contenderInfo,
  matchInfo,
  kataInfo,
  reverse,
}: Readonly<MatchDetailEditCardProps>) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contender: contenderInfo?.id,
      flags_contender: 0,
      kata_contender: "",
      winner: "",
    },
  });
  return (
    <Grid container direction={"column"} gap={2} width={"100%"}>
      <InfoRow
        color={color}
        icon={<Person />}
        value={
          <Grid
            size={12}
            container
            columnGap={2}
            rowGap={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography>{color}:</Typography>
            <Controller
              name="contender"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  type="text"
                  variant={"outlined"}
                  label=""
                  fullWidth
                  select
                  required
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.contender}
                >
                  {KataOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        }
        reverse={reverse}
      />
      <InfoRow
        color={color}
        icon={<SportsMartialArts />}
        value={
          <Grid
            container
            columnGap={2}
            rowGap={1}
            size={12}
            textAlign={"center"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography>Kata:</Typography>
            <Controller
              name="kata_contender"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  type="text"
                  variant={"outlined"}
                  label=""
                  fullWidth
                  select
                  required
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.kata_contender}
                >
                  {KataOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        }
        reverse={reverse}
      />
      <InfoRow
        color={color}
        icon={<Flag />}
        value={
          <Grid
            container
            columnGap={2}
            rowGap={1}
            size={12}
            textAlign={"center"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography>Número de Bandeiras:</Typography>
            <Controller
              name="flags_contender"
              control={control}
              render={({ field }) => (
                <TextField
                  color="warning"
                  type="text"
                  variant={"outlined"}
                  label=""
                  fullWidth
                  required
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  error={!!errors.flags_contender}
                ></TextField>
              )}
            />
          </Grid>
        }
        reverse={reverse}
      />
    </Grid>
  );
}
