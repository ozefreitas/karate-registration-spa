import { Box, Typography, Paper, Grid, Chip } from "@mui/material";
import { Person, SportsMartialArts, Flag } from "@mui/icons-material";
import { KataOptions } from "../../config";

interface MatchDetailCardProps {
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

export default function MatchDetailCard({
  color,
  contenderInfo,
  matchInfo,
  kataInfo,
  reverse,
}: Readonly<MatchDetailCardProps>) {
  return (
    <Grid container direction={"column"} gap={2} width={"100%"}>
      <InfoRow
        color={color}
        icon={<Person />}
        value={
          <Grid
            container
            columnGap={2}
            rowGap={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography fontWeight={700}>{contenderInfo.full_name}</Typography>
            <Chip size="small" label={`${contenderInfo.age} anos`}></Chip>
            <Chip size="small" label={contenderInfo.club}></Chip>
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
            <Typography fontWeight={700}>
              {KataOptions.find((item) => item.value === kataInfo)?.label}
            </Typography>
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
            <Typography fontWeight={700}>{matchInfo}</Typography>
          </Grid>
        }
        reverse={reverse}
      />
    </Grid>
  );
}
