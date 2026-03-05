import { EmojiEvents } from "@mui/icons-material";
import { Box, Card, Grid, Typography } from "@mui/material";

const SingleContenderCard = (props: {
  contenderNumber: number;
  roundNumber: number;
  isWinner: boolean;
  points: number;
  fullName: string;
  isMatchFinished: boolean;
}) => {
  return (
    <Card
      elevation={props.isMatchFinished ? (props.isWinner ? 5 : 0) : 2}
      sx={{
        bgcolor: props.isMatchFinished
          ? props.isWinner
            ? "#f0fdf4"
            : "#fafafa"
          : "white",
        border: props.isMatchFinished
          ? props.isWinner
            ? "1px solid #86efac"
            : "1px solid #e0e0e0"
          : undefined,
        opacity: props.isMatchFinished && !props.isWinner ? 0.5 : 1,
        transition: "all 0.2s ease",
      }}
    >
      <Grid
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        p={2}
      >
        <Grid container gap={2} alignItems={"center"}>
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
          <Typography
            fontWeight={
              props.isMatchFinished
                ? props.isWinner
                  ? 700
                  : undefined
                : undefined
            }
          >
            {props.fullName === undefined && props.roundNumber === 0
              ? "TBD"
              : props.fullName === undefined && props.roundNumber !== 0
                ? "bye"
                : props.fullName}
          </Typography>
          {props.isMatchFinished &&
            props.isWinner &&
            props.roundNumber === 0 && (
              <EmojiEvents sx={{ color: "#16a34a" }} />
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
            {props.points === 0 ? "-" : props.points}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SingleContenderCard;
