import { Box, Typography, Paper, Grid, Chip } from "@mui/material";
import {
  Person,
  LocationOn,
  SportsMartialArts,
  Flag,
} from "@mui/icons-material";

interface MatchDetailCardProps {
  color: string;
  type: string;
  contenderInfo: any;
  reverse?: boolean;
}

function IconBox({ icon }: Readonly<{ icon: React.ReactNode }>) {
  return (
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        bgcolor: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: "#fff",
      }}
    >
      {icon}
    </Box>
  );
}

function InfoRow({
  icon,
  value,
  reverse,
}: Readonly<{
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
          <Typography
            variant="body1"
            fontWeight={700}
            sx={{ color: "#1a1a1a" }}
          >
            {value}
          </Typography>
          <IconBox icon={icon} />
        </>
      ) : (
        <>
          <IconBox icon={icon} />
          <Typography
            variant="body1"
            fontWeight={700}
            sx={{ color: "#1a1a1a" }}
          >
            {value}
          </Typography>
        </>
      )}
    </Paper>
  );
}

export default function MatchDetailCard({
  color,
  type,
  contenderInfo,
  reverse,
}: Readonly<MatchDetailCardProps>) {
  return (
    <Grid container direction={"column"} gap={2} width={"100%"}>
      <InfoRow
        icon={<Person />}
        value={
          <Grid
            container
            columnGap={2}
            rowGap={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography>{contenderInfo.full_name}</Typography>
            <Chip size="small" label={`${contenderInfo.age} anos`}></Chip>
            <Chip size="small" label={contenderInfo.club}></Chip>
          </Grid>
        }
        reverse={reverse}
      />
      <InfoRow
        icon={<SportsMartialArts />}
        value={
          <Grid
            container
            columnGap={2}
            rowGap={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography>Kata: </Typography>
          </Grid>
        }
        reverse={reverse}
      />
      <InfoRow
        icon={<Flag />}
        value={
          <Grid
            container
            columnGap={2}
            rowGap={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography>Número de Bandeira: </Typography>
            <Typography>
              {contenderInfo.kataresult.flags_contender_1}
            </Typography>
          </Grid>
        }
        reverse={reverse}
      />
    </Grid>
  );
}
