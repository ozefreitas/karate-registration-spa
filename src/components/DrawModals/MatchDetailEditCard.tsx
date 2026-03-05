import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
  Chip,
} from "@mui/material";
import { Person, SportsMartialArts, Flag } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { KataOptions } from "../../config";
import { drawsHooks } from "../../hooks";

interface MatchDetailEditCardProps {
  color: string;
  control: any;
  reverse?: boolean;
  bracketId: number;
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
  control,
  reverse,
  bracketId,
}: Readonly<MatchDetailEditCardProps>) {
  // Retrieve all members inside a given bracked
  const { data: bracketMembersData, isLoading: isBracketMembersLoading } =
    drawsHooks.useMembersPerBracketData(bracketId);

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
            <Grid container size={10}>
              <Controller
                name={`contender_${color === "Shiro" ? 1 : 2}`}
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    type="text"
                    variant="outlined"
                    fullWidth
                    label="Atleta"
                    select
                    required
                    {...field}
                    slotProps={{
                      select: {
                        renderValue: (selected) => {
                          const selectedMember = bracketMembersData?.find(
                            (m: any) => m.id === selected,
                          );
                          return selectedMember?.full_name || "";
                        },
                      },
                    }}
                    onChange={(e) => field.onChange(e)}
                  >
                    <MenuItem sx={{ px: 2, color: "lightgrey" }} value="">
                      -- Selecionar --
                    </MenuItem>
                    {isBracketMembersLoading ? (
                      <Grid
                        mt={3}
                        container
                        size={12}
                        justifyContent={"center"}
                      >
                        <CircularProgress />
                      </Grid>
                    ) : (
                      bracketMembersData?.map((item: any, index: number) => (
                        <MenuItem
                          sx={{ display: "flex", gap: 2, p: 2 }}
                          key={index}
                          value={item.id}
                        >
                          {item.full_name}
                          <Chip size="small" label={item.club} />
                          <Chip size="small" label={`${item.age} anos`} />
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                )}
              />
            </Grid>
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
            rowGap={1}
            size={12}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid container size={10}>
              <Controller
                name={`kata_contender_${color === "Shiro" ? 1 : 2}`}
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    type="text"
                    variant={"outlined"}
                    label="Kata"
                    fullWidth
                    select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    // error={!!errors.kata_contender}
                  >
                    <MenuItem sx={{ px: 2, color: "lightgrey" }} value="">
                      -- Selecionar --
                    </MenuItem>
                    {KataOptions.filter((item) => item.value !== "none").map(
                      (item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ),
                    )}
                  </TextField>
                )}
              />
            </Grid>
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
            rowGap={1}
            size={12}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid container size={10}>
              <Controller
                name={`flags_contender_${color === "Shiro" ? 1 : 2}`}
                control={control}
                render={({ field }) => (
                  <TextField
                    color="warning"
                    type="number"
                    variant={"outlined"}
                    label="Número de Bandeiras"
                    fullWidth
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    // error={!!errors.flags_contender}
                  ></TextField>
                )}
              />
            </Grid>
          </Grid>
        }
        reverse={reverse}
      />
    </Grid>
  );
}
