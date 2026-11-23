import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  CalendarMonth,
  EmojiEvents,
  East,
  Refresh,
  Today,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventsHooks } from "../../hooks";
import PageInfoCard from "../../components/info-cards/PageInfoCard";

export default function ClassificationsPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const {
    data: eventsData,
    isLoading: isEventsLoading,
    error: eventsError,
    refetch,
  } = eventsHooks.useFetchEventsData(
    page,
    pageSize,
    "-event_date",
    undefined,
    true,
  );

  return (
    <>
      <PageInfoCard
        description={
          <>
            Aqui poderá consultar todas as classificações dos eventos
            (competições) realizadas até à data.
            <p></p>
            Consultando cada prova, poderá abrir as classificações de cada
            escalão. Lá dentro, os perfis de cada medalhado pode também ser
            aberto.
          </>
        }
        title="Classificações"
      ></PageInfoCard>

      <Box sx={{ mx: { xs: 2, sm: 4 }, mt: { xs: 2, sm: 4 } }}>
        {isEventsLoading ? (
          <Grid container spacing={2}>
            {[0, 1, 2].map((item) => (
              <Grid key={item} size={12}>
                <Card
                  variant="outlined"
                  sx={{ borderColor: "divider", borderRadius: 3 }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Skeleton width="45%" height={32} />
                    <Skeleton width="65%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : eventsError ? (
          <Card
            variant="outlined"
            sx={{ borderColor: "divider", borderRadius: 3 }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
                justifyContent: "space-between",
                gap: 2,
                p: { xs: 2, sm: 3 },
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Não foi possível carregar as classificações
                </Typography>
                <Typography color="text.secondary">
                  Tente novamente dentro de momentos.
                </Typography>
              </Box>
              <Button
                startIcon={<Refresh />}
                variant="outlined"
                onClick={() => refetch()}
                sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
              >
                Tentar novamente
              </Button>
            </CardContent>
          </Card>
        ) : eventsData?.count === 0 ? (
          <Card
            variant="outlined"
            sx={{ borderColor: "divider", borderRadius: 3 }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 1,
                py: { xs: 4, sm: 6 },
              }}
            >
              <EmojiEvents sx={{ fontSize: 42, color: "text.disabled" }} />
              <Typography variant="h6" fontWeight={700}>
                Ainda não há classificações
              </Typography>
              <Typography color="text.secondary">
                Os eventos com resultados publicados aparecerão aqui.
              </Typography>
            </CardContent>
          </Card>
        ) : eventsData ? (
          <>
            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              {eventsData.results.map((event) => (
                <Grid size={12} key={event.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      borderColor: "divider",
                      bgcolor: "background.paper",
                      transition:
                        "border-color 160ms ease, box-shadow 160ms ease",
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 1.5, sm: 2.5 },
                        "&:last-child": { pb: { xs: 1.5, sm: 2.5 } },
                      }}
                    >
                      <Grid
                        container
                        spacing={{ xs: 1.5, md: 2 }}
                        alignItems="center"
                      >
                        <Grid size={{ xs: 12, md: 10 }}>
                          <Stack
                            direction="row"
                            spacing={{ xs: 1.5, sm: 2 }}
                            alignItems="center"
                            sx={{ minWidth: 0 }}
                          >
                            <Box sx={{ minWidth: 0 }}>
                              <Typography
                                variant="h6"
                                fontWeight={700}
                                sx={{ overflowWrap: "anywhere" }}
                              >
                                {event.name}
                              </Typography>
                              <Stack
                                direction="row"
                                spacing={1}
                                useFlexGap
                                flexWrap="wrap"
                                sx={{ mt: 1 }}
                              >
                                <Chip
                                  size="small"
                                  variant="outlined"
                                  icon={<CalendarMonth fontSize="small" />}
                                  label={event.season}
                                  sx={{
                                    borderColor: "divider",
                                    "& .MuiChip-label": { fontWeight: 600 },
                                  }}
                                />
                                <Chip
                                  size="small"
                                  variant="outlined"
                                  icon={<Today fontSize="small" />}
                                  label={event.event_date}
                                  sx={{
                                    borderColor: "divider",
                                    "& .MuiChip-label": { fontWeight: 600 },
                                  }}
                                />
                              </Stack>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            endIcon={<East />}
                            onClick={() =>
                              navigate(`/classifications/${event.id}/`)
                            }
                            sx={{
                              minHeight: 40,
                              textTransform: "none",
                              fontWeight: 700,
                              boxShadow: "none",
                            }}
                          >
                            Ver classificações
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {eventsData.count > pageSize ? (
              <Grid container justifyContent="center" sx={{ mt: 3 }}>
                <Pagination
                  count={Math.ceil(eventsData.count / pageSize)}
                  page={page}
                  onChange={handleChange}
                  color="primary"
                />
              </Grid>
            ) : null}
          </>
        ) : null}
      </Box>
    </>
  );
}
