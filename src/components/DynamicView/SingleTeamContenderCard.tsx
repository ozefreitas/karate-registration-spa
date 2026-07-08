import { EmojiEvents } from "@mui/icons-material";
import { Box, Card, Chip, Grid, Typography } from "@mui/material";

const SingleTeamContenderCard = (props: {
  contenderNumber: number;
  roundNumber: number;
  matchNumber: number;
  isWinner: boolean;
  points: number;
  teamData: any;
  dorsalData: any;
  isMatchFinished: boolean;
  ongoing: boolean;
  isFirstRound?: boolean;
  rank?: number;
}) => {
  const athletes = Object.entries(props.teamData)
    .filter(([key, value]) => key.startsWith("athlete") && value !== null)
    .map(([key, athlete]) => ({
      key,
      athlete,
      dorsal: props.dorsalData?.[key],
    }));

  console.log(athletes);

  return (
    <Card
      elevation={props.isMatchFinished ? (props.isWinner ? 5 : 0) : 2}
      sx={{
        width: "100%",
        bgcolor: props.ongoing
          ? "#fffbeb"
          : props.isMatchFinished
            ? props.isWinner
              ? "#f0fdf4"
              : "#fafafa"
            : "white",
        border: props.ongoing
          ? "1px solid #fbbf24"
          : props.isMatchFinished
            ? props.isWinner
              ? "1px solid #86efac"
              : "1px solid #e0e0e0"
            : undefined,
        opacity: props.isMatchFinished && !props.isWinner ? 0.5 : 1,
        transition: "all 0.2s ease",
        boxShadow: props.ongoing
          ? "0 0 0 3px rgba(251, 191, 36, 0.3)"
          : undefined,
        animation: props.ongoing ? "pulse 2s infinite" : undefined,
        "@keyframes pulse": {
          "0%, 100%": { boxShadow: "0 0 0 3px rgba(251, 191, 36, 0.3)" },
          "50%": { boxShadow: "0 0 0 6px rgba(251, 191, 36, 0.1)" },
        },
      }}
    >
      <Grid
        size={12}
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        p={2}
        pr={4}
      >
        <Grid container spacing={3} alignItems={"center"} size={8}>
          <Grid
            size={2}
            container
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              sx={{
                border:
                  props.contenderNumber === 1
                    ? "1px solid black"
                    : "1px solid red",
                bgcolor: props.contenderNumber === 1 ? "white" : "red",
                borderRadius: "50%",
                width: 25,
                height: 25,
              }}
            ></Box>
          </Grid>
          <Grid container direction="column" spacing={1} size={7}>
            {athletes.map(
              ({
                key,
                athlete,
                dorsal,
              }: {
                key: any;
                athlete: any;
                dorsal: any;
              }) => (
                <Grid key={key} container spacing={2}>
                  <Typography
                    fontWeight={
                      props.isMatchFinished
                        ? props.isWinner
                          ? 700
                          : undefined
                        : undefined
                    }
                  >
                    {athlete.full_name === undefined && props.isFirstRound
                      ? "bye"
                      : athlete.full_name === undefined && !props.isFirstRound
                        ? "TBD"
                        : athlete.full_name}
                  </Typography>
                  <Chip
                    variant="outlined"
                    color="secondary"
                    size="small"
                    label={dorsal}
                  ></Chip>
                </Grid>
              ),
            )}
          </Grid>
          <Grid container>
            <Typography
              variant="subtitle2"
              fontWeight={
                props.isMatchFinished
                  ? props.isWinner
                    ? 700
                    : undefined
                  : undefined
              }
            >
              {props.teamData.club === undefined && props.isFirstRound ? (
                "bye"
              ) : props.teamData.club === undefined && !props.isFirstRound ? (
                "TBD"
              ) : (
                <Chip
                  variant="outlined"
                  color="info"
                  label={props.teamData.club}
                ></Chip>
              )}
            </Typography>
          </Grid>
          {props.isMatchFinished &&
            props.isWinner &&
            props.roundNumber === 0 &&
            props.matchNumber === 1 && (
              <EmojiEvents sx={{ color: "#16a34a" }} fontSize="large" />
            )}
        </Grid>

        <Grid
          container
          alignItems={"center"}
          size={3.5}
          pl={2}
          justifyContent={props.rank ? "space-between" : "flex-end"}
        >
          {props.rank && (
            <Grid>
              <Chip label={`Classicação prov.: ${props.rank}º Lugar`}></Chip>
            </Grid>
          )}
          <Typography
            variant="h6"
            fontWeight={
              props.isMatchFinished
                ? props.isWinner
                  ? 900
                  : undefined
                : undefined
            }
          >
            {props.points === 99 ? "-" : props.points}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SingleTeamContenderCard;
