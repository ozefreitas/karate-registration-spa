import {
  Box,
  Paper,
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
  Chip,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  Person,
  SportsMartialArts,
  Flag,
  Group,
  ModeStandby,
  PersonOff,
} from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { KataOptions } from "../../config";
import { drawsHooks } from "../../hooks";
import { ColoredIconBox } from "../icon-utils/boxes";

interface MatchDetailEditCardProps {
  isKata: boolean;
  color: string;
  control: any;
  reverse?: boolean;
  bracketId: number;
  scoring?: boolean;
  team?: boolean;
  watch?: any;
}

function InfoRow({
  color,
  icon,
  value,
  reverse,
}: Readonly<{
  color: string;
  icon: React.ReactNode;
  value: React.ReactNode;
  reverse?: boolean;
}>) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: reverse ? "flex-end" : "flex-start",
        gap: 2,
        p: 2,
        borderRadius: 3,
        border: "1px solid #eeeeee",
        bgcolor: "#fff",
      }}
    >
      {reverse ? (
        <>
          {value}
          <ColoredIconBox
            bgColor={color === "Aka" ? "red" : "transparent"}
            color={color === "Aka" ? "#fff" : "black"}
            border={color === "Aka" ? "1px solid red" : "1px solid black"}
            icon={icon}
          />
        </>
      ) : (
        <>
          <ColoredIconBox
            bgColor={color === "Aka" ? "red" : "transparent"}
            color={color === "Aka" ? "#fff" : "black"}
            border={color === "Aka" ? "1px solid red" : "1px solid black"}
            icon={icon}
          />
          {value}
        </>
      )}
    </Paper>
  );
}

export default function MatchDetailEditCard({
  isKata,
  color,
  control,
  reverse,
  bracketId,
  scoring,
  team,
  watch,
}: Readonly<MatchDetailEditCardProps>) {
  // Retrieve all members inside a given bracked
  const { data: bracketMembersData, isLoading: isBracketMembersLoading } =
    drawsHooks.useMembersPerBracketData(bracketId);

  const { data: bracketTeamsData, isLoading: isBracketTeamsLoading } =
    drawsHooks.useTeamsPerBracketData(bracketId);

  return (
    <Grid container direction={"column"} gap={2} width={"100%"}>
      <InfoRow
        color={color}
        icon={team ? <Group /> : <Person />}
        value={
          <Grid
            size={12}
            container
            columnGap={2}
            rowGap={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid container size={10}>
              <Controller
                name={
                  team
                    ? scoring
                      ? "person"
                      : `team_contender_${color === "Shiro" ? 1 : 2}`
                    : scoring
                      ? "person"
                      : `contender_${color === "Shiro" ? 1 : 2}`
                }
                control={control}
                disabled={watch(
                  `contender_${color === "Shiro" ? 1 : 2}_present`,
                )}
                render={({ field }) => (
                  <TextField
                    disabled={watch(
                      `contender_${color === "Shiro" ? 1 : 2}_present`,
                    )}
                    color="warning"
                    type="text"
                    variant="outlined"
                    fullWidth
                    label={team ? "Equipa" : "Atleta"}
                    select
                    required
                    {...field}
                    slotProps={{
                      select: {
                        renderValue: (selected) => {
                          if (!team) {
                            const selectedMember = bracketMembersData?.find(
                              (m: any) => m.id === selected,
                            );
                            return <>{selectedMember?.full_name || ""}</>;
                          }

                          const selectedTeam = bracketTeamsData?.find(
                            (m: any) => m.id === selected,
                          );

                          const athleteNames = [
                            selectedTeam?.athlete1?.full_name,
                            selectedTeam?.athlete2?.full_name,
                            selectedTeam?.athlete3?.full_name,
                            selectedTeam?.athlete4?.full_name,
                          ]
                            .filter(Boolean)
                            .join(" • ");

                          return (
                            <Grid
                              container
                              alignItems="center"
                              spacing={2}
                              m={1}
                            >
                              <Typography>{athleteNames}</Typography>
                              <Chip
                                label={selectedTeam?.club}
                                variant="outlined"
                                color="info"
                              />
                            </Grid>
                          );
                        },
                      },
                    }}
                    onChange={(e) => field.onChange(e)}
                  >
                    {team ? (
                      isBracketTeamsLoading ? (
                        <MenuItem
                          disabled
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            my: 3,
                          }}
                        >
                          <CircularProgress sx={{ mr: 2 }} />A carregar
                          Equipas...
                        </MenuItem>
                      ) : (
                        [
                          bracketTeamsData?.length === 0 ? (
                            <MenuItem key="empty" disabled>
                              Sem opções disponíveis.
                            </MenuItem>
                          ) : (
                            <MenuItem
                              key="placeholder"
                              sx={{ color: "lightgrey" }}
                              value=""
                            >
                              -- Selecionar --
                            </MenuItem>
                          ),
                          ...(bracketTeamsData?.map((team, index: number) => {
                            const athleteNames = [
                              team?.athlete1?.full_name,
                              team?.athlete2?.full_name,
                              team?.athlete3?.full_name,
                              team?.athlete4?.full_name,
                            ]
                              .filter(Boolean)
                              .join(" • ");

                            return (
                              <MenuItem
                                sx={{ display: "flex", gap: 2, p: 2 }}
                                key={team.id ?? index}
                                value={team.id}
                              >
                                <Typography flexGrow={1}>
                                  {athleteNames}
                                </Typography>
                                <Chip size="small" label={team.club} />
                              </MenuItem>
                            );
                          }) ?? []),
                        ]
                      )
                    ) : isBracketMembersLoading ? (
                      <MenuItem
                        disabled
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          my: 3,
                        }}
                      >
                        <CircularProgress sx={{ mr: 2 }} />A carregar Atletas...
                      </MenuItem>
                    ) : (
                      [
                        bracketMembersData?.length === 0 ? (
                          <MenuItem key="empty" disabled>
                            Sem opções disponíveis.
                          </MenuItem>
                        ) : (
                          <MenuItem
                            key="placeholder"
                            sx={{ color: "lightgrey" }}
                            value=""
                          >
                            -- Selecionar --
                          </MenuItem>
                        ),
                        ...(bracketMembersData?.map((person, index: number) => (
                          <MenuItem
                            sx={{ display: "flex", gap: 2, p: 2 }}
                            key={person.id ?? index}
                            value={person.id}
                          >
                            {person.full_name}
                            <Chip size="small" label={person.club} />
                            <Chip size="small" label={`${person.age} anos`} />
                          </MenuItem>
                        )) ?? []),
                      ]
                    )}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        }
        reverse={reverse}
      />
      {isKata && (
        <InfoRow
          color={color}
          icon={<SportsMartialArts />}
          value={
            <Grid
              container
              rowGap={1}
              size={12}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid container size={10}>
                <Controller
                  name={
                    scoring
                      ? "kata"
                      : `kata_contender_${color === "Shiro" ? 1 : 2}`
                  }
                  disabled={watch(
                    `contender_${color === "Shiro" ? 1 : 2}_present`,
                  )}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      disabled={watch(
                        `contender_${color === "Shiro" ? 1 : 2}_present`,
                      )}
                      color="warning"
                      type="text"
                      variant={"outlined"}
                      label="Kata"
                      fullWidth
                      select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      // error={!!errors.kata_contender}
                    >
                      <MenuItem sx={{ px: 2, color: "lightgrey" }} value="">
                        -- Selecionar --
                      </MenuItem>
                      {KataOptions.filter((item) => item.value !== "none").map(
                        (item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ),
                      )}
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>
          }
          reverse={reverse}
        />
      )}
      {/* // ) : (
      //   <InfoRow
      //     color={color}
      //     icon={<Warning />}
      //     value={
      //       <Grid
      //         container
      //         rowGap={1}
      //         size={12}
      //         justifyContent={"center"}
      //         alignItems={"center"}
      //       >
      //         <Grid container size={10}></Grid>
      //       </Grid>
      //     }
      //     reverse={reverse}
      //   />
      // )} */}
      {!scoring && isKata ? (
        <InfoRow
          color={color}
          icon={<Flag />}
          value={
            <Grid
              container
              rowGap={1}
              size={12}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid container size={10}>
                <Controller
                  disabled={watch(
                    `contender_${color === "Shiro" ? 1 : 2}_present`,
                  )}
                  name={`flags_contender_${color === "Shiro" ? 1 : 2}`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      disabled={watch(
                        `contender_${color === "Shiro" ? 1 : 2}_present`,
                      )}
                      color="warning"
                      type="number"
                      variant={"outlined"}
                      label="Número de Bandeiras"
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      // error={!!errors.flags_contender}
                    ></TextField>
                  )}
                />
              </Grid>
            </Grid>
          }
          reverse={reverse}
        />
      ) : !isKata ? (
        <InfoRow
          color={color}
          icon={<ModeStandby />}
          value={
            <Grid
              container
              rowGap={1}
              size={12}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid container size={10}>
                <Controller
                  disabled={watch(
                    `contender_${color === "Shiro" ? 1 : 2}_present`,
                  )}
                  name={`points_contender_${color === "Shiro" ? 1 : 2}`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      disabled={watch(
                        `contender_${color === "Shiro" ? 1 : 2}_present`,
                      )}
                      color="warning"
                      type="number"
                      variant={"outlined"}
                      label={team ? "Vitórias" : "Pontos Marcados"}
                      fullWidth
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    ></TextField>
                  )}
                />
              </Grid>
            </Grid>
          }
          reverse={reverse}
        />
      ) : null}
      <InfoRow
        color={color}
        icon={<PersonOff />}
        value={
          <Grid
            container
            rowGap={1}
            size={12}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid container size={10}>
              <Controller
                name={`contender_${color === "Shiro" ? 1 : 2}_present`}
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Checkbox
                        sx={{ ml: 2 }}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Faltou: "
                    sx={{
                      justifyContent: "center",
                      width: "100%",
                      alignItems: "center",
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        }
        reverse={reverse}
      />
    </Grid>
  );
}
