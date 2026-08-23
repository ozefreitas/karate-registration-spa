import { useNavigate } from "react-router-dom"; // swap for your router if different
import { useSearch } from "../../hooks/search/useSearch";
import { SearchResult } from "../../openapi";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

// Human-readable labels for each `type` your endpoint returns.
// Extend this as you add more searchable models.
const TYPE_LABELS: Record<string, string> = {
  person: "Members",
};

export default function HomeSearch() {
  const navigate = useNavigate();
  const { query, setQuery, results, loading, error } = useSearch();

  return (
    <Card sx={{ m: 2, mb: 0 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", p: 3 }}>
        <Autocomplete
          sx={{ width: { xs: "100%" } }}
          options={results}
          loading={loading}
          filterOptions={(x) => x} // server already filters; don't re-filter client-side
          groupBy={(option) => TYPE_LABELS[option.type] ?? option.type}
          getOptionLabel={(option) => option.title}
          isOptionEqualToValue={(a, b) => a.id === b.id && a.type === b.type}
          noOptionsText={
            query.trim().length < 2
              ? "Escreva para pesquisar..."
              : (error ?? "Não foram encontrados resultados")
          }
          onInputChange={(_, value) => setQuery(value)}
          onChange={(_, value: SearchResult | null) => {
            if (value) navigate(value.url);
          }}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={`${option.type}-${option.id}`}>
              <Box>
                <Typography variant="body2">{option.title}</Typography>
                {option.subtitle && (
                  <Typography variant="caption" color="text.secondary">
                    {option.subtitle}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search…"
              size="small"
              InputProps={{
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
              }}
            />
          )}
        />
      </CardContent>
    </Card>
  );
}
