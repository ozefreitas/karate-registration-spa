import { Grid, Typography } from "@mui/material";
import Comp1Score from "../Scores/Comp1Score";
import Comp2Score from "../Scores/Comp2Score";
import styles from "./competitorcard.module.css";
import { useState, useEffect, useCallback } from "react";

export default function CompetitorCard(props: Readonly<{ match: string }>) {
  const [akaScore, setAkaScore] = useState<number | undefined>(undefined);
  const [winner, setWinner] = useState({ aka: false, shiro: false });
  const [player1Name, setPlayer1Name] = useState<string>("NOME COMPETIDOR 1");
  const [player2Name, setPlayer2Name] = useState<string>("NOME COMPETIDOR 2");

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/match/123/");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.player1Name) {
        setPlayer1Name(data.player1Name);
      }
      if (data.player2Name) {
        setPlayer2Name(data.player2Name);
      }
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    if (akaScore !== undefined && akaScore < 3) {
      setWinner({ aka: false, shiro: true });
    } else {
      setWinner({ shiro: false, aka: true });
    }
  }, [akaScore]);

  //   useEffect(() => {
  //     // attach the event listener
  //     document.addEventListener("keydown", handleKeyPress);

  //     // remove the event listener
  //     return () => {
  //       document.removeEventListener("keydown", handleKeyPress);
  //     };
  //   }, [handleKeyPress]);

  return (
    <>
      <Grid
        container
        size={12}
        justifyContent="space-between"
        sx={{ mt: 8, mb: 2 }}
      >
        <Typography sx={{ ml: 10, color: "red" }} variant="h3">
          <i>AKA</i>
        </Typography>
        <Typography sx={{ mr: 10 }} variant="h3">
          <i>SHIRO</i>
        </Typography>
      </Grid>
      <Grid container size={12} justifyContent="space-between">
        <Grid
          sx={{
            mt: 2,
            height: "40%",
            width: "49%",
            backgroundColor: "#bf0303",
            borderRadius: 5,
          }}
        >
          <Grid>
            <Typography sx={{ m: 3, mb: 0, ml: 5 }} variant="h3">
              {player1Name}
            </Typography>
          </Grid>
          <Grid container>
            <Typography sx={{ m: 1, ml: 5 }} variant="h4Half">
              001
            </Typography>
            <Typography sx={{ m: 1, ml: 5 }} variant="h4Half">
              <i>AKFAFE</i>
            </Typography>
          </Grid>
          <Grid>
            <Typography sx={{ mt: 1, ml: 5 }} variant="h4">
              NOME DO KATA
            </Typography>
          </Grid>
          <Comp1Score id="aka" winner={true}></Comp1Score>
        </Grid>
        <Grid
          sx={{
            mt: 2,
            height: "80%",
            width: "49%",
            backgroundColor: "white",
            borderRadius: 5,
          }}
        >
          <Grid container size={12} justifyContent="flex-end">
            <Typography
              sx={{ m: 3, mb: 0, mr: 5, color: "black" }}
              variant="h3"
            >
              {player2Name}
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Typography sx={{ m: 1, mr: 5, color: "black" }} variant="h4Half">
              <i>AKFAFE</i>
            </Typography>
            <Typography sx={{ m: 1, mr: 5, color: "black" }} variant="h4Half">
              002
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Typography sx={{ mt: 1, mr: 5, color: "black" }} variant="h4">
              NOME DO KATA
            </Typography>
          </Grid>
          <Comp2Score id="shiro" winner={false}></Comp2Score>
        </Grid>
      </Grid>
    </>
  );
}
