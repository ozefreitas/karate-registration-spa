import { EmojiEvents } from "@mui/icons-material";
import { Box, Card, Grid, Typography } from "@mui/material";

const SingleContenderCard = (props: {
  contenderNumber: number;
  roundNumber: number;
  matchNumber: number;
  isWinner: boolean;
  points: number;
  fullName: string;
  club: string;
  isMatchFinished: boolean;
  ongoing: boolean;
}) => {
  return (
    <Card
      elevation={props.isMatchFinished ? (props.isWinner ? 5 : 0) : 2}
      sx={{
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
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        p={2}
      >
        <Grid container gap={3} alignItems={"center"}>
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
          <Grid container direction={"column"} spacing={1}>
            <Typography
              fontWeight={
                props.isMatchFinished
                  ? props.isWinner
                    ? 700
                    : undefined
                  : undefined
              }
            >
              {props.fullName ?? "TBD"}
            </Typography>
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
              {props.club ?? "TBD"}
            </Typography>
          </Grid>
          {props.isMatchFinished &&
            props.isWinner &&
            props.roundNumber === 0 &&
            props.matchNumber === 1 && (
              <EmojiEvents sx={{ color: "#16a34a" }} fontSize="large" />
            )}
        </Grid>
        <Grid container alignItems={"center"} gap={2}>
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

export default SingleContenderCard;
