import {
  Typography,
  Grid,
  Card,
  IconButton,
  Tooltip,
  CardContent,
  Chip,
  CircularProgress,
  ListItem,
  ListItemText,
  Button,
  Pagination,
} from "@mui/material";
import { eventsHooks } from "../../hooks";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { East } from "@mui/icons-material";

export default function ClassificationsPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  console.log(setPageSize);

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

      <Grid sx={{ m: 2, mt: 4 }}>
        {isEventsLoading ? (
          <Grid mt={3} container justifyContent={"center"} size={12}>
            <CircularProgress />
          </Grid>
        ) : eventsError ? (
          <Grid my={3} container justifyContent="center" size={12}>
            <ListItem sx={{ textAlign: "center" }}>
              <ListItemText primary="Ocorreu um erro ao encontrar os Eventos disponíveis, tente mais tarde ou contacte um administrador."></ListItemText>
            </ListItem>
            <Button onClick={() => refetch()}>Refrescar</Button>
          </Grid>
        ) : eventsData?.count === 0 ? (
          <Grid m={2} container justifyContent="center" size={12}>
            <Typography variant="h6" sx={{ color: "gray", mt: 2 }}>
              Não foram encontrados registos.
            </Typography>
          </Grid>
        ) : (
          <Grid container direction={"column"} spacing={3} m={2}>
            {eventsData?.results.map((event, index: number) => (
              <Card key={index} sx={{ width: "100%" }}>
                <CardContent sx={{ pt: 3, px: 5, display: "flex" }}>
                  <Grid
                    container
                    size={12}
                    alignItems={"center"}
                    columnSpacing={3}
                  >
                    <Grid container alignItems={"center"} size={10}>
                      <Typography variant="h5">{event.name}</Typography>
                      <Chip
                        color="info"
                        variant="outlined"
                        label={event.season}
                      ></Chip>
                      <Chip
                        color="info"
                        variant="outlined"
                        label={event.event_date}
                      ></Chip>
                    </Grid>
                    <Grid
                      size={2}
                      container
                      justifyContent={"flex-end"}
                      alignItems={"center"}
                    >
                      <Tooltip placement="top" title="Ver Classificações">
                        <span>
                          <IconButton
                            sx={{
                              transition: "0.3s",
                              borderRadius: 4,
                              p: 1.5,
                              px: 2,
                              border: 2,
                              borderColor: "red",
                              "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: 6,
                                borderColor: "red",
                                bgcolor: "red",
                              },
                            }}
                            onClick={() =>
                              navigate(`/classifications/${event.id}/`)
                            }
                          >
                            <East sx={{ color: "black" }}></East>
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            {eventsData?.count === 0 ||
            isEventsLoading ||
            eventsError ? null : (
              <Grid size={12} mt={3} container justifyContent={"center"}>
                <Pagination
                  count={Math.ceil(eventsData?.count! / 10)}
                  page={page}
                  onChange={handleChange}
                  color="primary"
                />
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
}
