import {
  alpha,
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  CloseFullscreen,
  Groups,
  LiveTv,
  OpenInFull,
  Settings,
  Visibility,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import { drawsHooks } from "../../hooks";

// Minimal shape of what this component needs from the matches payload.
// Your real match type has more fields; this stays compatible with it as long
// as the optional ones below match (or are absent from) your real type.
interface ContenderInfo {
  id: string;
  full_name: string;
  club: string;
}

export interface GroupMatch {
  id: number;
  group: number | null;
  group_number: number | null;
  round_number: number;
  match_number: number;
  ongoing?: boolean | null;
  contender_1: ContenderInfo | null;
  contender_2: ContenderInfo | null;
  contender_1_dorsal?: string | null;
  contender_2_dorsal?: string | null;
  winner?: { id: string } | null;
  kumiteresult?: {
    points_contender_1?: number | null;
    points_contender_2?: number | null;
  } | null;
  kataresult?: {
    flags_contender_1?: number | null;
    flags_contender_2?: number | null;
  } | null;
}

interface GroupMember {
  person: ContenderInfo;
  dorsal: string | null;
  matchesCount: number;
}

interface GroupData {
  groupId: number;
  groupNumber: number;
  members: GroupMember[];
  matches: GroupMatch[];
}

function buildGroups(matches: GroupMatch[]): GroupData[] {
  const groups = new Map<
    number,
    GroupData & { byPerson: Map<string, GroupMember> }
  >();

  for (const match of matches) {
    if (match.group == null) continue;

    let group = groups.get(match.group);
    if (!group) {
      group = {
        groupId: match.group,
        groupNumber: match.group_number ?? match.group,
        members: [],
        matches: [],
        byPerson: new Map(),
      };
      groups.set(match.group, group);
    }
    group.matches.push(match);

    const sides = [
      { person: match.contender_1, dorsal: match.contender_1_dorsal },
      { person: match.contender_2, dorsal: match.contender_2_dorsal },
    ];
    for (const { person, dorsal } of sides) {
      if (!person) continue;
      const existing = group.byPerson.get(person.id);
      if (existing) {
        existing.matchesCount += 1;
      } else {
        const member = { person, dorsal: dorsal ?? null, matchesCount: 1 };
        group.byPerson.set(person.id, member);
        group.members.push(member);
      }
    }
  }

  return [...groups.values()]
    .map(({ byPerson: _byPerson, ...group }) => ({
      ...group,
      members: [...group.members].sort((a, b) =>
        (a.dorsal ?? "").localeCompare(b.dorsal ?? ""),
      ),
      matches: [...group.matches].sort(
        (a, b) => a.match_number - b.match_number,
      ),
    }))
    .sort((a, b) => a.groupNumber - b.groupNumber);
}

function getScores(match: GroupMatch): [number | null, number | null] {
  const k = match.kumiteresult;
  const f = match.kataresult;
  if (k && (k.points_contender_1 != null || k.points_contender_2 != null)) {
    return [k.points_contender_1 ?? null, k.points_contender_2 ?? null];
  }
  if (f && (f.flags_contender_1 != null || f.flags_contender_2 != null)) {
    return [f.flags_contender_1 ?? null, f.flags_contender_2 ?? null];
  }
  return [null, null];
}

function ContenderLine(
  props: Readonly<{
    dorsal?: string | null;
    person: ContenderInfo | null;
    score: number | null;
    isWinner: boolean;
  }>,
) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        py: 0.5,
        opacity: props.person ? 1 : 0.5,
      }}
    >
      <Avatar
        sx={{
          bgcolor: props.isWinner ? "success.main" : "grey.500",
          width: 28,
          height: 28,
          fontSize: 11,
        }}
      >
        {props.dorsal ?? "-"}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          noWrap
          fontWeight={props.isWinner ? 700 : 400}
        >
          {props.person?.full_name ?? "bye"}
        </Typography>
        {props.person && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {props.person.club}
          </Typography>
        )}
      </Box>
      <Typography variant="body1" fontWeight={props.isWinner ? 700 : 400}>
        {props.score ?? "-"}
      </Typography>
    </Box>
  );
}

function GroupMatchRow(
  props: Readonly<{
    match: GroupMatch;
    canEdit: boolean;
    onOpenMatch?: (matchId: number, edit: boolean) => void;
    mutation: any;
  }>,
) {
  const { match } = props;
  const [score1, score2] = getScores(match);
  const winnerId = match.winner?.id ?? null;
  const finished = winnerId !== null && !match.ongoing;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        border: "1px solid",
        borderColor: match.ongoing ? "warning.main" : "divider",
        borderRadius: 3,
        p: 1.5,
      }}
    >
      <Box sx={{ minWidth: 56, textAlign: "center" }}>
        <Typography variant="caption" color="text.secondary">
          Partida
        </Typography>
        <Typography variant="h6" lineHeight={1.1}>
          {match.match_number}
        </Typography>
        {match.ongoing && (
          <Chip
            size="small"
            color="warning"
            label="LIVE"
            sx={{ mt: 0.5, fontWeight: 700, fontSize: 11, height: 20 }}
          />
        )}
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
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <ContenderLine
          dorsal={match.contender_1_dorsal}
          person={match.contender_1}
          score={score1}
          isWinner={winnerId !== null && winnerId === match.contender_1?.id}
        />
        <ContenderLine
          dorsal={match.contender_2_dorsal}
          person={match.contender_2}
          score={score2}
          isWinner={winnerId !== null && winnerId === match.contender_2?.id}
        />
      </Box>
      {props.onOpenMatch && (
        <Grid container direction={"column"}>
          {props.canEdit && (
            <>
              <Tooltip title="Fazer Alterações" placement="left">
                <IconButton
                  size="small"
                  color="warning"
                  onClick={() => props.onOpenMatch!(match.id, true)}
                >
                  <Settings fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={match.ongoing ? "Remover de Direto" : "Pôr em Direto"}
                placement="top"
              >
                <span>
                  <IconButton
                    size="small"
                    color={match.ongoing ? "error" : "success"}
                    onClick={() => {
                      if (match.ongoing) {
                        props.mutation.mutate({
                          matchId: Number(match.id),
                          data: { ongoing: false },
                        });
                      } else {
                        props.mutation.mutate({
                          matchId: Number(match.id),
                          data: { ongoing: true },
                        });
                      }
                    }}
                  >
                    <LiveTv />
                  </IconButton>
                </span>
              </Tooltip>
            </>
          )}

          <Tooltip title="Consultar" placement="left">
            <IconButton
              size="small"
              color="info"
              onClick={() => props.onOpenMatch!(match.id, false)}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
    </Box>
  );
}

export default function GroupsListing(
  props: Readonly<{
    matches: GroupMatch[] | undefined;
    canEdit?: boolean;
    onOpenMatch?: (matchId: number, edit: boolean) => void;
    userRole: string;
  }>,
) {
  const groups = useMemo(
    () => buildGroups(props.matches ?? []),
    [props.matches],
  );
  const [expandedGroupId, setExpandedGroupId] = useState<number | null>(null);

  if (groups.length === 0) {
    return (
      <Grid my={3} container justifyContent="center" size={12}>
        <Typography color="textDisabled">
          Não existem grupos para o Escalão selecionado.
        </Typography>
      </Grid>
    );
  }

  const patchOngoingMatch = drawsHooks.usePatchMatch(props.userRole);

  return (
    <Grid container spacing={3} m={6}>
      {groups.map((group) => {
        const expanded = expandedGroupId === group.groupId;

        // Clubs that appear more than once in the group (clashes the draw could not avoid)
        const clubCount = new Map<string, number>();
        group.members.forEach((m) =>
          clubCount.set(m.person.club, (clubCount.get(m.person.club) ?? 0) + 1),
        );

        const hasLive = group.matches.some((m) => m.ongoing);

        return (
          <Grid
            key={group.groupId}
            size={expanded ? 12 : { xs: 12, md: 6, xl: 4 }}
          >
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardHeader
                sx={(theme) => ({
                  bgcolor: alpha(
                    theme.palette.error.main,
                    theme.palette.mode === "dark" ? 0.18 : 0.08,
                  ),
                })}
                avatar={<Groups />}
                title={`Grupo ${group.groupNumber}`}
                subheader={`${group.members.length} atletas · ${group.matches.length} partidas`}
                slotProps={{
                  title: { fontWeight: "bold", fontSize: "larger" },
                }}
                action={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {hasLive && (
                      <Chip
                        size="small"
                        color="warning"
                        label="LIVE"
                        sx={{ fontWeight: 700 }}
                      />
                    )}
                    <Tooltip
                      title={expanded ? "Fechar Partidas" : "Abrir Partidas"}
                      placement="left"
                    >
                      <IconButton
                        aria-label={
                          expanded ? "Fechar Partidas" : "Abrir Partidas"
                        }
                        aria-expanded={expanded}
                        onClick={() =>
                          setExpandedGroupId(expanded ? null : group.groupId)
                        }
                      >
                        {expanded ? (
                          <CloseFullscreen fontSize="small" />
                        ) : (
                          <OpenInFull fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              />
              <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                <List disablePadding>
                  {group.members.map((member, index) => {
                    const clashes =
                      (clubCount.get(member.person.club) ?? 0) > 1;
                    return (
                      <Box key={member.person.id}>
                        {index > 0 && <Divider component="li" />}
                        <ListItem
                          secondaryAction={
                            <Chip
                              size="small"
                              variant={clashes ? "filled" : "outlined"}
                              color={clashes ? "warning" : "default"}
                              label={member.person.club}
                            />
                          }
                        >
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                bgcolor: "error.main",
                                width: 36,
                                height: 36,
                                fontSize: 13,
                              }}
                            >
                              {member.dorsal ?? "-"}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={member.person.full_name}
                            secondary={`${member.matchesCount} partidas`}
                            sx={{ pr: 12 }}
                          />
                        </ListItem>
                      </Box>
                    );
                  })}
                </List>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Divider />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      Partidas do Grupo {group.groupNumber}
                    </Typography>
                    <Grid container spacing={2}>
                      {group.matches.map((match) => (
                        <Grid key={match.id} size={{ xs: 12, lg: 6 }}>
                          <GroupMatchRow
                            match={match}
                            canEdit={Boolean(props.canEdit)}
                            onOpenMatch={props.onOpenMatch}
                            mutation={patchOngoingMatch}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
