import { EmojiEvents } from "@mui/icons-material";
import { Avatar, Box, Chip, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

export interface MatchCardPerson {
  id: string;
  full_name: string;
  club: string;
}

// What the card needs to draw one side of a match. For teams, build this
// yourself from team_contender_N and pass it through the `contenders` prop.
export interface MatchCardContender {
  id: string | number;
  name: string;
  club?: string | null;
  dorsal?: string | null;
}

// Minimal shape of a match. Every field except id/round/match number is optional,
// so your API match type should be assignable to it without any mapping.
export interface MatchCardData {
  id: number;
  group?: number | null;
  group_number?: number | string | null;
  round_number: number;
  match_number: number;
  ongoing?: boolean | null;
  contender_1?: MatchCardPerson | null;
  contender_2?: MatchCardPerson | null;
  contender_1_dorsal?: string | null;
  contender_2_dorsal?: string | null;
  winner?: { id: string } | null;
  team_winner?: { id: string | number } | null;
  kumiteresult?: {
    points_contender_1?: number | null;
    points_contender_2?: number | null;
  } | null;
  kataresult?: {
    flags_contender_1?: number | null;
    flags_contender_2?: number | null;
  } | null;
}

export function getIndividualContenders(
  match: MatchCardData,
): [MatchCardContender | null, MatchCardContender | null] {
  const build = (
    person: MatchCardPerson | null | undefined,
    dorsal: string | null | undefined,
  ): MatchCardContender | null =>
    person
      ? { id: person.id, name: person.full_name, club: person.club, dorsal }
      : null;
  return [
    build(match.contender_1, match.contender_1_dorsal),
    build(match.contender_2, match.contender_2_dorsal),
  ];
}

// Same rules as before: no result, or 0-0, shows "-"; a match is only finished
// when it has a winner, is not live and (if it has a result) both scores are filled in.
function readScores(match: MatchCardData, isKata: boolean) {
  const s1 = isKata
    ? match.kataresult?.flags_contender_1
    : match.kumiteresult?.points_contender_1;
  const s2 = isKata
    ? match.kataresult?.flags_contender_2
    : match.kumiteresult?.points_contender_2;
  const hasResult = isKata
    ? match.kataresult != null
    : match.kumiteresult != null;
  const complete = !hasResult || (s1 != null && s2 != null);
  const show = hasResult && !(s1 === 0 && s2 === 0);
  return {
    score1: show ? (s1 ?? null) : null,
    score2: show ? (s2 ?? null) : null,
    complete,
  };
}

// One line of the card. Exported so a scoring-entry (finals) can reuse it
// with `rank` instead of building a separate card.
export function ContenderRow(
  props: Readonly<{
    side: 1 | 2;
    contender: MatchCardContender | null;
    placeholder?: string;
    score?: number | null;
    isWinner?: boolean;
    isLoser?: boolean;
    showTrophy?: boolean;
    rank?: number | null;
  }>,
) {
  const { contender, isWinner } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 1,
        py: 0.75,
        borderRadius: 2,
        border: "1px solid",
        borderColor: isWinner ? "#86efac" : "transparent",
        bgcolor: isWinner ? "#f0fdf4" : undefined,
        opacity: props.isLoser ? 0.5 : 1,
        transition: "all 0.2s ease",
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          width: 14,
          height: 14,
          borderRadius: "50%",
          border: props.side === 1 ? "1px solid black" : "1px solid red",
          bgcolor: props.side === 1 ? "white" : "red",
        }}
      />
      {contender?.dorsal && (
        <Avatar
          sx={{
            bgcolor: isWinner ? "success.main" : "grey.600",
            width: 28,
            height: 28,
            fontSize: 11,
          }}
        >
          {contender.dorsal}
        </Avatar>
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" noWrap fontWeight={isWinner ? 700 : 400}>
          {contender?.name ?? props.placeholder ?? "TBD"}
        </Typography>
        {contender?.club && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {contender.club}
          </Typography>
        )}
      </Box>
      {props.showTrophy && isWinner && (
        <EmojiEvents sx={{ color: "#16a34a" }} />
      )}
      {props.rank ? (
        <Chip
          size="small"
          label={`Classificação prov.: ${props.rank}º Lugar`}
        />
      ) : null}
      <Typography
        variant="h6"
        sx={{ minWidth: 24, textAlign: "right" }}
        fontWeight={isWinner ? 900 : undefined}
      >
        {props.score ?? "-"}
      </Typography>
    </Box>
  );
}

export default function MatchCard(
  props: Readonly<{
    match: MatchCardData;
    // Override for teams (or anything that is not the individual contender fields)
    contenders?: [MatchCardContender | null, MatchCardContender | null];
    isTeam?: boolean;
    isKata?: boolean;
    // bye (true) or TBD (false) when a side is empty
    isFirstRound?: boolean;
    showMatchNumber?: boolean;
    // Buttons on the right (settings, live, consult...)
    actions?: ReactNode;
  }>,
) {
  const { match } = props;
  const [c1, c2] = props.contenders ?? getIndividualContenders(match);
  const { score1, score2, complete } = readScores(match, Boolean(props.isKata));

  const winnerId = props.isTeam ? match.team_winner?.id : match.winner?.id;
  const winnerSide: 1 | 2 | null =
    winnerId == null
      ? null
      : c1?.id === winnerId
        ? 1
        : c2?.id === winnerId
          ? 2
          : null;

  const ongoing = Boolean(match.ongoing);
  const finished = !ongoing && winnerId != null && complete;
  const placeholder = props.isFirstRound ? "bye" : "TBD";
  const isFinal =
    match.round_number === 0 && match.match_number === 1 && match.group == null;

  return (
    <Paper
      variant="outlined"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.5,
        borderRadius: 3,
        bgcolor: ongoing ? "#fffbeb" : "background.paper",
        borderColor: ongoing ? "#fbbf24" : "divider",
        boxShadow: ongoing ? "0 0 0 3px rgba(251, 191, 36, 0.3)" : undefined,
        animation: ongoing ? "pulse 2s infinite" : undefined,
        "@keyframes pulse": {
          "0%, 100%": { boxShadow: "0 0 0 3px rgba(251, 191, 36, 0.3)" },
          "50%": { boxShadow: "0 0 0 6px rgba(251, 191, 36, 0.1)" },
        },
      }}
    >
      {props.showMatchNumber && (
        <Box sx={{ minWidth: 56, textAlign: "center" }}>
          <Typography variant="caption" color="text.secondary">
            Combate
          </Typography>
          <Typography variant="h6" lineHeight={1.1}>
            {match.match_number}
          </Typography>
          {finished && (
            <Chip
              size="small"
              color="success"
              variant="outlined"
              label="Fim"
              sx={{ mt: 0.5, fontSize: 11, height: 20 }}
            />
          )}
        </Box>
      )}

      <Box sx={{ flex: 1, minWidth: 0 }}>
        {ongoing && (
          <Chip
            size="small"
            color="warning"
            label="LIVE"
            sx={{ mb: 0.5, fontWeight: 700, fontSize: 11, height: 20 }}
          />
        )}
        <ContenderRow
          side={1}
          contender={c1}
          placeholder={placeholder}
          score={score1}
          isWinner={finished && winnerSide === 1}
          isLoser={finished && winnerSide === 2}
          showTrophy={isFinal}
        />
        <ContenderRow
          side={2}
          contender={c2}
          placeholder={placeholder}
          score={score2}
          isWinner={finished && winnerSide === 2}
          isLoser={finished && winnerSide === 1}
          showTrophy={isFinal}
        />
      </Box>

      {props.actions && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            borderRadius: 3,
          }}
        >
          {props.actions}
        </Box>
      )}
    </Paper>
  );
}
