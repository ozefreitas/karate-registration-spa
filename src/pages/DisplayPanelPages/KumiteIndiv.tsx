import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import MatchTypeInfo from "../../components/DisplayScreenComponents/MatchTypeInfo";
import FoulGrid from "../../components/DisplayScreenComponents/FoulGrid";

export default function KumiteIndiv() {
  const [akaWazari, setAkaWazari] = useState<number>(0);
  const [shiroWazari, setShiroWazari] = useState<number>(0);
  const [akaIppon, setAkaIppon] = useState<number>(0);
  const [shiroIppon, setShiroIppon] = useState<number>(0);
  const [akaScore, setAkaScore] = useState<number>(0);
  const [shiroScore, setShiroScore] = useState<number>(0);
  const [fouls, setFouls] = useState<any>({
    akaKekoku: 0,
    akaMubobi: 0,
    akaJogai: 0,
    shiroKekoku: 0,
    shiroMubobi: 0,
    shiroJogai: 0,
  });
  const [player1Name, setPlayer1Name] = useState<string>("NOME COMPETIDOR 1");
  const [player2Name, setPlayer2Name] = useState<string>("NOME COMPETIDOR 2");

  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(2);
  const [isRunning, setIsRunning] = useState<boolean | null>(null);
  const [timeLow, setTimeLow] = useState<boolean>(false);
  const [ended, setEnded] = useState<boolean>(false);

  console.log(ended);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/match/123/");

    const handleFoulUpdate = (
      type: "add_foul" | "remove_foul",
      player: number,
      code: string
    ) => {
      const sign = type === "add_foul" ? 1 : -1;
      const prefix = player === 1 ? "aka" : "shiro";

      const foulKey = {
        K: `${prefix}Kekoku`,
        M: `${prefix}Mubobi`,
        J: `${prefix}Jogai`,
      }[code];

      if (foulKey) {
        setFouls((prev: any) => ({
          ...prev,
          [foulKey]: prev[foulKey] + sign,
        }));
      }
    };

    const handleScoreUpdate = (
      operation: string,
      player: number,
      points: number | string
    ) => {
      const isAdd = operation === "add";
      const sign = isAdd ? 1 : -1;

      if (player === 1) {
        if (points === 1) setAkaWazari((prev) => prev + sign);
        else setAkaIppon((prev) => prev + sign);
      } else {
        if (points === 1) setShiroWazari((prev) => prev + sign);
        else if (points === 2) setShiroIppon((prev) => prev + sign);
      }
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      switch (data.action) {
        case "play":
          startTimer();
          break;
        case "pause":
          pauseTimer();
          break;
        case "stop":
          stopTimer();
          break;
      }

      if (data.player1Name) setPlayer1Name(data.player1Name);
      if (data.player2Name) setPlayer2Name(data.player2Name);

      if (["add", "remove"].includes(data.operation)) {
        handleScoreUpdate(data.operation, data.player, data.points);
      }

      if (["add_foul", "remove_foul"].includes(data.operation)) {
        handleFoulUpdate(data.operation, data.player, data.points);
      }
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    setAkaScore(akaWazari + 2 * akaIppon);
    setShiroScore(shiroWazari + 2 * shiroIppon);
  }, [akaWazari, akaIppon, shiroWazari, shiroIppon]);

  // Clock behavior
  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds((milliseconds) => milliseconds - 1);
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          setMilliseconds(99);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
          setMilliseconds(99);
        }
        if (seconds < 30 && minutes === 0) {
          setTimeLow(true);
          if (seconds === 0 && milliseconds === 0) {
            setEnded(true);
          }
        } else {
          setTimeLow(false);
          setEnded(false);
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [milliseconds, seconds, minutes, isRunning]);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  const startTimer = () => {
    if (minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
      setIsRunning(true);
      return true;
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLow(false);
    setMinutes(2);
    setSeconds(0);
    setMilliseconds(0);
  };

  return (
    <>
      <MatchTypeInfo matchType="Kumite Individual" tatami="1"></MatchTypeInfo>
      <Grid container size={12} justifyContent="space-between" sx={{ mt: 3 }}>
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
        </Grid>
      </Grid>
      <Grid container size={12} sx={{ mt: 3 }}>
        <Grid
          size={4}
          spacing={2}
          container
          justifyContent="center"
          sx={{ color: "#bf0303" }}
        >
          <Grid size={10} container spacing={2} justifyContent="space-between">
            <Typography variant="h3">K</Typography>
            <Grid
              container
              size={10}
              sx={{ height: "100%" }}
              alignItems="center"
              gap={3}
            >
              {Array.from({ length: fouls.akaKekoku }).map((_, index) => (
                <FoulGrid key={index} color="#bf0303"></FoulGrid>
              ))}
            </Grid>
          </Grid>
          <Grid size={10} container spacing={2} justifyContent="space-between">
            <Typography variant="h3">M</Typography>
            <Grid
              container
              size={10}
              sx={{ height: "100%" }}
              alignItems="center"
              gap={3}
            >
              {Array.from({ length: fouls.akaMubobi }).map((_, index) => (
                <FoulGrid key={index} color="#bf0303"></FoulGrid>
              ))}
            </Grid>
          </Grid>
          <Grid size={10} container spacing={2} justifyContent="space-between">
            <Typography variant="h3">J</Typography>
            <Grid
              container
              size={10}
              sx={{ height: "100%" }}
              alignItems="center"
              gap={3}
            >
              {Array.from({ length: fouls.akaJogai }).map((_, index) => (
                <FoulGrid key={index} color="#bf0303"></FoulGrid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          size={4}
          sx={{ height: "fit-content", color: timeLow ? "orange" : "yellow" }}
          container
          justifyContent="center"
        >
          <Typography variant="h1" sx={{ fontSize: 135 }}>
            {minutes}:{formatTime(seconds)}
          </Typography>
          <Typography
            variant="h3"
            sx={{ display: "flex", alignItems: "flex-end", mb: 2.5 }}
          >
            :{formatTime(milliseconds)}
          </Typography>
        </Grid>
        <Grid size={4} spacing={2} container justifyContent="center">
          <Grid size={10} container justifyContent="space-between">
            <Typography variant="h3">K</Typography>
            <Grid
              container
              size={10}
              sx={{ height: "100%" }}
              alignItems="center"
              gap={3}
            >
              {Array.from({ length: fouls.shiroKekoku }).map((_, index) => (
                <FoulGrid key={index} color="white"></FoulGrid>
              ))}
            </Grid>
          </Grid>
          <Grid size={10} container spacing={2} justifyContent="space-between">
            <Typography variant="h3">M</Typography>
            <Grid
              container
              size={10}
              sx={{ height: "100%" }}
              alignItems="center"
              gap={3}
            >
              {Array.from({ length: fouls.shiroMubobi }).map((_, index) => (
                <FoulGrid key={index} color="white"></FoulGrid>
              ))}
            </Grid>
          </Grid>
          <Grid size={10} container spacing={2} justifyContent="space-between">
            <Typography variant="h3">J</Typography>
            <Grid
              container
              size={10}
              sx={{ height: "100%" }}
              alignItems="center"
              gap={3}
            >
              {Array.from({ length: fouls.shiroJogai }).map((_, index) => (
                <FoulGrid key={index} color="white"></FoulGrid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          size={6}
          container
          justifyContent="flex-end"
          sx={{ color: "#bf0303" }}
        >
          <Grid
            size={5}
            container
            justifyContent="space-between"
            alignContent="center"
          >
            <Grid>
              <Typography variant="h3">Wazari</Typography>
            </Grid>
            <Grid>
              <Typography variant="h3">{akaWazari}</Typography>
            </Grid>
            <Grid>
              <Typography variant="h3">Ippon</Typography>
            </Grid>
            <Grid>
              <Typography variant="h3">{akaIppon}</Typography>
            </Grid>
          </Grid>
          <Grid size={6} container justifyContent="center" alignItems="center">
            <Typography variant="h1" sx={{ fontSize: 250 }}>
              {akaScore}
            </Typography>
          </Grid>
        </Grid>
        <Grid size={6} container>
          <Grid size={6} container justifyContent="center" alignItems="center">
            <Typography variant="h1" sx={{ fontSize: 250 }}>
              {shiroScore}
            </Typography>
          </Grid>
          <Grid size={6} container>
            <Grid
              size={10}
              container
              justifyContent="space-between"
              alignContent="center"
            >
              <Grid>
                <Typography variant="h3">Wazari</Typography>
              </Grid>
              <Grid>
                <Typography variant="h3">{shiroWazari}</Typography>
              </Grid>
              <Grid>
                <Typography variant="h3">Ippon</Typography>
              </Grid>
              <Grid>
                <Typography variant="h3">{shiroIppon}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
