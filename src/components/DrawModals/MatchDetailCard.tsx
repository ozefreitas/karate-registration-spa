import { Box, Typography, Paper, Grid, Chip } from "@mui/material";
import {
  Person,
  SportsMartialArts,
  Flag,
  Group,
  ModeStandby,
  PersonOff,
} from "@mui/icons-material";
import { KataOptions } from "../../config";

interface MatchDetailCardProps {
  isKata: boolean;
  color: string;
  contenderInfo: any;
  matchInfo: any;
  reverse?: boolean;
  scoring?: boolean;
  team?: boolean;
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
  isKata,
  color,
  contenderInfo,
  matchInfo,
  reverse,
  scoring,
  team,
}: Readonly<MatchDetailCardProps>) {
  return (
    <Grid container direction={"column"} gap={2} width={"100%"}>
      <InfoRow
        color={color}
        icon={team ? <Group /> : <Person />}
        value={
          <Grid
            container
            columnGap={2}
            size={12}
            rowGap={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {team ? (
              <Grid container spacing={4} alignItems={"center"}>
                <Grid container direction={"column"} rowSpacing={2}>
                  <Typography fontWeight={700}>
                    {contenderInfo.athlete1?.full_name ?? ""}
                  </Typography>
                  <Typography fontWeight={700}>
                    {contenderInfo.athlete2?.full_name ?? ""}
                  </Typography>
                  {contenderInfo.athlete3 === null ? null : (
                    <Typography fontWeight={700}>
                      {contenderInfo.athlete3?.full_name}
                    </Typography>
                  )}
                  {contenderInfo.athlete4 === null ? null : (
                    <Typography fontWeight={700}>
                      {contenderInfo.athlete4?.full_name}
                    </Typography>
                  )}
                </Grid>
                <Chip
                  size="small"
                  label={`${contenderInfo?.club ?? "N/A"}`}
                  color="info"
                  variant="outlined"
                ></Chip>
              </Grid>
            ) : contenderInfo === null ? (
              <Typography>Bye</Typography>
            ) : (
              <>
                <Typography fontWeight={700}>
                  {contenderInfo?.full_name ?? ""}
                </Typography>
                <Chip
                  size="small"
                  label={`${contenderInfo?.age ?? ""} anos`}
                ></Chip>
                <Chip size="small" label={contenderInfo?.club ?? "N/A"}></Chip>
              </>
            )}
          </Grid>
        }
        reverse={reverse}
      />
      {isKata && !scoring ? (
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
              {contenderInfo === null ? (
                <Typography>Bye</Typography>
              ) : (
                <>
                  <Typography>Kata:</Typography>
                  <Typography
                    fontWeight={700}
                    color={
                      color === "Aka"
                        ? matchInfo.kataresult?.kata_contender_2 ===
                            undefined ||
                          matchInfo.kataresult?.kata_contender_2 === ""
                          ? "textDisabled"
                          : undefined
                        : matchInfo.kataresult?.kata_contender_1 ===
                              undefined ||
                            matchInfo.kataresult?.kata_contender_1 === ""
                          ? "textDisabled"
                          : undefined
                    }
                  >
                    {KataOptions.find((item) => {
                      if (color === "Aka") {
                        return (
                          item.value === matchInfo.kataresult?.kata_contender_2
                        );
                      } else {
                        return (
                          item.value === matchInfo.kataresult?.kata_contender_1
                        );
                      }
                    })?.label ?? "N/A"}
                  </Typography>
                </>
              )}
            </Grid>
          }
          reverse={reverse}
        />
      ) : isKata && scoring ? (
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
              {contenderInfo === null ? (
                <Typography>Bye</Typography>
              ) : (
                <>
                  <Typography>Kata:</Typography>
                  <Typography
                    fontWeight={700}
                    color={matchInfo === null ? "textDisabled" : undefined}
                  >
                    {KataOptions.find((item) => item.value === matchInfo?.kata)
                      ?.label ?? "N/A"}
                  </Typography>
                </>
              )}
            </Grid>
          }
          reverse={reverse}
        />
      ) : null}
      {/* ) : (
        <InfoRow
          color={color}
          icon={<Warning />}
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
              {contenderInfo === null ? (
                <Typography>Bye</Typography>
              ) : (
                <Grid container>
                  <Grid size={12}>
                    <Typography>Faltas:</Typography>
                  </Grid>
                  <Grid size={12} container>
                    <Grid>Hansoku</Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          }
          reverse={reverse}
        />
      )} */}
      {!scoring && isKata ? (
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
              {contenderInfo === null ? (
                <Typography>Bye</Typography>
              ) : (
                <>
                  <Typography>Número de Bandeiras:</Typography>
                  <Typography
                    color={
                      color === "Aka"
                        ? matchInfo.kataresult?.flags_contender_2 === undefined
                          ? "textDisabled"
                          : undefined
                        : matchInfo.kataresult?.flags_contender_1 === undefined
                          ? "textDisabled"
                          : undefined
                    }
                    fontWeight={700}
                  >
                    {color === "Aka"
                      ? (matchInfo.kataresult?.flags_contender_2 ?? "N/A")
                      : (matchInfo.kataresult?.flags_contender_1 ?? "N/A")}
                  </Typography>
                </>
              )}
            </Grid>
          }
          reverse={reverse}
        />
      ) : null}
      {isKata ? null : (
        <InfoRow
          color={color}
          icon={<ModeStandby />}
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
              {contenderInfo === null ? (
                <Typography>Bye</Typography>
              ) : (
                <>
                  <Typography>
                    {team ? "Vitórias:" : "Pontos Marcados:"}
                  </Typography>
                  <Typography
                    color={
                      color === "Aka"
                        ? matchInfo.kumiteresult?.points_contender_2 ===
                          undefined
                          ? "textDisabled"
                          : undefined
                        : matchInfo.kumiteresult?.points_contender_1 ===
                            undefined
                          ? "textDisabled"
                          : undefined
                    }
                    fontWeight={700}
                  >
                    {color === "Aka"
                      ? (matchInfo.kumiteresult?.points_contender_2 ?? "N/A")
                      : (matchInfo.kumiteresult?.points_contender_1 ?? "N/A")}
                  </Typography>
                </>
              )}
            </Grid>
          }
          reverse={reverse}
        />
      )}
      <InfoRow
        color={color}
        icon={<PersonOff />}
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
            {contenderInfo === null ? (
              <Typography>Bye</Typography>
            ) : (
              <Typography
                color={
                  color === "Aka"
                    ? matchInfo.contender_1_present
                      ? undefined
                      : "textDisabled"
                    : matchInfo.contender_2_present
                      ? undefined
                      : "textDisabled"
                }
                fontWeight={700}
              >
                {color === "Aka"
                  ? matchInfo.contender_1_present
                    ? "Presente"
                    : "Falta de Comparência"
                  : matchInfo.contender_2_present
                    ? "Presente"
                    : "Falta de Comparência"}
              </Typography>
            )}
          </Grid>
        }
        reverse={reverse}
      />
    </Grid>
  );
}
