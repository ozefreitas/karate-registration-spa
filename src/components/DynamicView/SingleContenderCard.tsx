import { Box, Card, Grid, Typography } from "@mui/material";

const SingleContenderCard = (props: { match: any; roundNumber: number }) => {
  return (
    <Card>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        p={2}
      >
        <Grid container gap={2}>
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: "50%",
              width: 25,
              height: 25,
            }}
          ></Box>
          <Typography
            fontWeight={
              props.match.kataresult?.flags_contender_1! >
              props.match.kataresult?.flags_contender_2!
                ? 700
                : undefined
            }
          >
            {props.match.contender_1?.full_name === undefined &&
            props.roundNumber !== 0
              ? "TBD"
              : props.match.contender_1?.full_name === undefined &&
                  props.roundNumber === 0
                ? "bye"
                : props.match.contender_1?.full_name}
          </Typography>
        </Grid>
        <Grid container alignItems={"center"} gap={2}>
          <Typography
            variant="h6"
            fontWeight={
              props.match.kataresult?.flags_contender_1! >
              props.match.kataresult?.flags_contender_2!
                ? 900
                : undefined
            }
          >
            {props.match.kataresult?.flags_contender_1! ?? "-"}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SingleContenderCard;
