import { useNavigate } from "react-router-dom"; // swap for your router if different
import { useSearch } from "../../hooks/search/useSearch";
import { SearchResult } from "../../openapi";
import {
  Autocomplete,
  Backdrop,
  Box,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";

// Human-readable labels for each `type` your endpoint returns.
// Extend this as you add more searchable models.
const TYPE_LABELS: Record<string, string> = {
  person: "Membros",
  team: "Equipas",
  event: "Eventos",
};

interface HomeSearchProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function HomeSearch({
  query,
  setQuery,
}: Readonly<HomeSearchProps>) {
  const navigate = useNavigate();
  const { results, loading, error } = useSearch({ query, setQuery });
  const [open, setOpen] = useState(false);
  return (
    <>
      <Backdrop
        open={open}
        sx={{
          zIndex: (theme) => theme.zIndex.modal - 1,
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0, 0, 0, 0.15)",
        }}
      />
      <Card
        sx={{
          m: 2,
          mb: 0,
          zIndex: (theme) => (open ? theme.zIndex.modal + 1 : "auto"),
          position: "relative",
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", p: 3 }}>
          <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            sx={{
              width: "100%",
              position: "relative",
              zIndex: (theme) => open ? theme.zIndex.modal + 1 : "auto",
            }}
            options={results}
            loading={loading}
            filterOptions={(x) => x}
            groupBy={(option) => TYPE_LABELS[option.type] ?? option.type}
            getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(a, b) => a.id === b.id && a.type === b.type}
            slotProps={{
              popper: {
                sx: {
                  pt: 5,
                },
              },
            }}
            noOptionsText={
              query.trim().length < 2 ? (
                <Typography variant="body2" color="text.secondary">
                  Digite pelo menos 2 caracteres para procurar
                </Typography>
              ) : (
                ((error && !loading) ?? (
                  <Typography variant="body2" color="text.secondary">
                    Não foram encontrados resultados"
                  </Typography>
                ))
              )
            }
            inputValue={query}
            onInputChange={(_, value) => setQuery(value)}
            onChange={(_, value: SearchResult | null) => {
              if (value) {
                if (value.type === "person") {
                  navigate(`/members/${value.id}/`);
                } else if (value.type === "team") {
                  navigate(`/teams/${value.id}/`);
                } else if (value.type === "event") {
                  navigate(`/events/${value.id}/`);
                }
              }
            }}
            renderOption={(props, option) => (
              <Tooltip title="Ir para" placement="left">
                <Box
                  component="li"
                  {...props}
                  key={`${option.type}-${option.id}`}
                >
                  <Typography p={1} pl={2} variant="body2">
                    {option.title}
                  </Typography>
                </Box>
              </Tooltip>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Procurar por primeiro nome, apelido, nome de evento, etc..."
                size="small"
                sx={{
                  zIndex: 0,
                }}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress size={16} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  },
                }}
              />
            )}
          />
        </CardContent>
      </Card>
    </>
  );
}
