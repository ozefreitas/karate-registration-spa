import { Grid, Typography } from "@mui/material";
import Comp1Score from "../../components/DisplayScreenComponents/Scores/Comp1Score";
import Comp2Score from "../../components/DisplayScreenComponents/Scores/Comp2Score";
import MatchTypeInfo from "../../components/DisplayScreenComponents/MatchTypeInfo";
import { useState, useEffect } from "react";
import { KataOptions } from "../../config";
import { useDisplaySocket } from "./useDisplaySocket";

export default function CompetitorCard() {
  const [akaScore, setAkaScore] = useState<number | undefined>(undefined);
  console.log(setAkaScore);
  const [winner, setWinner] = useState({ aka: false, shiro: false });
  console.log(winner);
  const [player1Name, setPlayer1Name] = useState<string>("NOME COMPETIDOR 1");
  const [player2Name, setPlayer2Name] = useState<string>("NOME COMPETIDOR 2");
  const [player1Number, setPlayer1Number] = useState<string>("XXX");
  const [player2Number, setPlayer2Number] = useState<string>("XXX");
  const [player1Club, setPlayer1Club] = useState<string>("CLUBE COMPETIDOR 1");
  const [player2Club, setPlayer2Club] = useState<string>("CLUBE COMPETIDOR 2");
  const [player1Kata, setPlayer1Kata] = useState<string>("KATA COMPETIDOR 1");
  const [player2Kata, setPlayer2Kata] = useState<string>("KATA COMPETIDOR 2");
  const [tatami, setTatami] = useState<string>("0");

  useDisplaySocket((data) => {
    console.log(data);
    if (data.player1Name) setPlayer1Name(data.player1Name);
    if (data.player2Name) setPlayer2Name(data.player2Name);
    if (data.player1Number) setPlayer1Number(data.player1Number);
    if (data.player2Number) setPlayer2Number(data.player2Number);
    if (data.player1Club) setPlayer1Club(data.player1Club);
    if (data.player2Club) setPlayer2Club(data.player2Club);
    if (data.player1Kata) setPlayer1Kata(data.player1Kata);
    if (data.player2Kata) setPlayer2Kata(data.player2Kata);
    if (data.tatami) setTatami(data.tatami);
    if (data.reset) {
      setPlayer1Name("NOME COMPETIDOR 1");
      setPlayer1Club("CLUBE COMPETIDOR 1");
      setPlayer1Kata("KATA COMPETIDOR 1");
      setPlayer1Number("XXX");
      setPlayer2Name("NOME COMPETIDOR 2");
      setPlayer2Club("CLUBE COMPETIDOR 2");
      setPlayer2Kata("KATA COMPETIDOR 2");
      setPlayer2Number("XXX");
      setWinner({ aka: false, shiro: false });
      setAkaScore(undefined);
    }
  });

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
      <MatchTypeInfo
        matchType="Kata Individual"
        tatami={tatami}
      ></MatchTypeInfo>
      <Grid
        container
        size={12}
        justifyContent="space-between"
        sx={{ mt: 5, mb: 2 }}
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
            <Typography m={3} mb={0} ml={5} variant="h3">
              {player1Name}
            </Typography>
          </Grid>
          <Grid container>
            <Typography m={1} ml={5} variant="h4Half">
              {player1Number}
            </Typography>
            <Typography m={1} ml={5} variant="h4Half">
              <i>{player1Club}</i>
            </Typography>
          </Grid>
          <Grid>
            <Typography mt={1} ml={5} variant="h4">
              {KataOptions.find((item) => item.value === player1Kata)?.label ??
                "KATA COMPETIDOR 1"}
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
              <i>{player2Club}</i>
            </Typography>
            <Typography sx={{ m: 1, mr: 5, color: "black" }} variant="h4Half">
              {player2Number}
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Typography sx={{ mt: 1, mr: 5, color: "black" }} variant="h4">
              {KataOptions.find((item) => item.value === player2Kata)?.label ??
                "KATA COMPETIDOR 2"}
            </Typography>
          </Grid>
          <Comp2Score id="shiro" winner={false}></Comp2Score>
        </Grid>
      </Grid>
    </>
  );
}
