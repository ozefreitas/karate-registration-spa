import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import MatchTypeInfo from "../../components/DisplayScreenComponents/MatchTypeInfo";

export default function KataFinal(props: Readonly<{ matchType: string }>) {
  const [ponctuation, setPonctuation] = useState<number | undefined>(0.0);
  const [points, setPoints] = useState<any>({
    points1: "0.0",
    points2: "0.0",
    points3: "0.0",
    points4: "0.0",
    points5: "0.0",
  });
  const [minIndex, setMinIndex] = useState<string>("");
  const [maxIndex, setMaxIndex] = useState<string>("");
  const [player1Name, setPlayer1Name] = useState<string>("NOME COMPETIDOR 1");
  const [tatami, setTatami] = useState<string>("");

  useEffect(() => {
    let baseURL = import.meta.env.VITE_API_URL || "127.0.0.1:8000";

    // Remove protocol prefix (http:// or https://)
    baseURL = baseURL.replace(/^https?:\/\//, "");

    // Detect the correct protocol
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";

    // Construct the full WebSocket URL
    const socket = new WebSocket(`${protocol}://${baseURL}/ws/match/123/`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.player1Name) {
        setPlayer1Name(data.player1Name);
      }
      if (data.ponctuation) {
        setPonctuation(data.ponctuation);
        const newPoints = {
          points1: data.points1,
          points2: data.points2,
          points3: data.points3,
          points4: data.points4,
          points5: data.points5,
        };
        setPoints(newPoints);
      }
      if (data.min_index) {
        setMinIndex(data.min_index);
      }
      if (data.max_index) {
        setMaxIndex(data.max_index);
      }
      if (data.tatami) {
        setTatami(data.tatami);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <>
      <MatchTypeInfo
        matchType={
          props.matchType === "team" ? "Kata Equipa" : "Final Kata Individual"
        }
        tatami={tatami}
      ></MatchTypeInfo>
      <Grid
        container
        size={12}
        sx={{ mt: 10, mb: 2, height: "65vh" }}
        justifyContent="space-between"
      >
        <Grid container size={8} alignContent="space-between">
          <Grid
            sx={{
              height: "50%",
              backgroundColor: "#bf0303",
              borderRadius: 5,
              mr: 5,
              pt: 5,
            }}
            size={12}
            container={props.matchType === "team"}
          >
            <Grid>
              <Typography sx={{ m: 3, mb: 0, ml: 5 }} variant="h3">
                {player1Name}
              </Typography>
            </Grid>
            {props.matchType !== "team" ? (
              <Grid container>
                <Typography sx={{ m: 1, ml: 5 }} variant="h4Half">
                  001
                </Typography>
                <Typography sx={{ m: 1, ml: 5 }} variant="h4Half">
                  <i>AKFAFE</i>
                </Typography>
              </Grid>
            ) : null}
            <Grid>
              <Typography sx={{ mt: 4, ml: 5 }} variant="h3">
                NOME DO KATA
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            size={12}
            justifyContent={"space-between"}
            sx={{ height: "40%", mr: 5 }}
          >
            <Grid
              size={2.3}
              container
              justifyContent="center"
              alignContent="center"
              sx={{
                mt: 2,
                color: points.points1 !== "0.0" ? "white" : "darkgrey",
                backgroundColor: "grey",
                textDecoration:
                  maxIndex === "points1" || minIndex === "points1"
                    ? "line-through"
                    : null,
                borderRadius: 5,
              }}
            >
              <Typography variant="h1" sx={{ fontSize: 80 }}>
                {points.points1}
              </Typography>
            </Grid>
            <Grid
              size={2.3}
              container
              justifyContent="center"
              alignContent="center"
              sx={{
                mt: 2,
                color: points.points2 !== "0.0" ? "white" : "darkgrey",
                backgroundColor: "grey",
                textDecoration:
                  maxIndex === "points2" || minIndex === "points2"
                    ? "line-through"
                    : null,
                borderRadius: 5,
              }}
            >
              <Typography variant="h1" sx={{ fontSize: 80 }}>
                {points.points2}
              </Typography>
            </Grid>
            <Grid
              size={2.3}
              container
              justifyContent="center"
              alignContent="center"
              sx={{
                mt: 2,
                color: points.points3 !== "0.0" ? "white" : "darkgrey",
                backgroundColor: "grey",
                textDecoration:
                  maxIndex === "points3" || minIndex === "points3"
                    ? "line-through"
                    : null,
                borderRadius: 5,
              }}
            >
              <Typography variant="h1" sx={{ fontSize: 80 }}>
                {points.points3}
              </Typography>
            </Grid>
            <Grid
              size={2.3}
              container
              justifyContent="center"
              alignContent="center"
              sx={{
                mt: 2,
                color: points.points4 !== "0.0" ? "white" : "darkgrey",
                backgroundColor: "grey",
                textDecoration:
                  maxIndex === "points4" || minIndex === "points4"
                    ? "line-through"
                    : null,
                borderRadius: 5,
              }}
            >
              <Typography variant="h1" sx={{ fontSize: 80 }}>
                {points.points4}
              </Typography>
            </Grid>
            <Grid
              size={2.3}
              container
              justifyContent="center"
              alignContent="center"
              sx={{
                mt: 2,
                color: points.points5 !== "0.0" ? "white" : "darkgrey",
                backgroundColor: "grey",
                textDecoration:
                  maxIndex === "points5" || minIndex === "points5"
                    ? "line-through"
                    : null,
                borderRadius: 5,
              }}
            >
              <Typography variant="h1" sx={{ fontSize: 80 }}>
                {points.points5}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignContent="center"
          size={4}
          sx={{
            // m: 2,
            // mr: 0,
            backgroundColor: "darkgrey",
            color: points.points1 !== "0.0" ? "white" : "grey",
            borderRadius: 5,
          }}
        >
          <Typography variant="h1" sx={{ fontWeight: "bold", fontSize: 180 }}>
            {ponctuation}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
