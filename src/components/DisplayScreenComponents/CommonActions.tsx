import { Button, Grid } from "@mui/material";
import { Delete, NavigateNext, NavigateBefore } from "@mui/icons-material";
import FormCard from "../../dashboard/FormCard";
import { drawsHooks } from "../../hooks";
import { useEffect, useRef } from "react";
import { useAuth } from "../../access/GlobalAuthProvider";

export default function CommonActions(
  props: Readonly<{
    handleNextMatch: any;
    handlePrevMatch: any;
    currentMatchId: any;
    nextMatchId: any;
    prevMatchId: any;
    sendNextMatchState: any;
    setValue: any;
  }>,
) {
  const me = useAuth();
  const socketRef = useRef<WebSocket | null>(null);
  const advanceMatch = drawsHooks.useAdvanceMatch();
  const trackBackMatch = drawsHooks.useTrackBackMatch();
  const patchOngoingMatch = drawsHooks.usePatchMatch(me.user?.role!, true);

  useEffect(() => {
    let baseURL = import.meta.env.VITE_API_URL || "127.0.0.1:8000";

    // Remove protocol prefix (http:// or https://)
    baseURL = baseURL.replace(/^https?:\/\//, "");

    // Detect the correct protocol
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";

    // Construct the full WebSocket URL
    socketRef.current = new WebSocket(`${protocol}://${baseURL}/ws/match/123/`);

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendResetSignal = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ reset: true }));
    }
  };
  return (
    <FormCard title="Ações">
      <Grid
        size={12}
        container
        justifyContent="space-evenly"
        mb={1}
        alignItems={"center"}
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          disabled={props.prevMatchId === "null"}
          onClick={() => {
            trackBackMatch.mutate(
              {
                matchId: props.currentMatchId,
                data: { prev_match_id: props.prevMatchId },
              },
              {
                onSuccess: () => {
                  props.handlePrevMatch();
                },
              },
            );
          }}
          startIcon={<NavigateBefore />}
        >
          Partida Anterior
        </Button>
        <Button
          sx={{ m: 1 }}
          variant="contained"
          size="large"
          color="error"
          disabled={props.currentMatchId === ""}
          onClick={() => {
            sendResetSignal();
            patchOngoingMatch.mutate(
              {
                matchId: Number(props.currentMatchId),
                data: { ongoing: false },
              },
              {
                onSuccess: () => {
                  props.setValue("match", "");
                },
              },
            );
          }}
          startIcon={<Delete />}
        >
          Limpar Tudo
        </Button>
        <Button
          sx={{ m: 1 }}
          variant="contained"
          size="large"
          color="primary"
          disabled={props.nextMatchId === "null"}
          onClick={() => {
            advanceMatch.mutate(
              {
                matchId: props.currentMatchId,
                data: { next_match_id: props.nextMatchId },
              },
              {
                onSuccess: () => {
                  props.handleNextMatch();
                  props.sendNextMatchState(Number(props.nextMatchId));
                },
              },
            );
          }}
          endIcon={<NavigateNext />}
        >
          Próxima Partida
        </Button>
      </Grid>
    </FormCard>
  );
}
