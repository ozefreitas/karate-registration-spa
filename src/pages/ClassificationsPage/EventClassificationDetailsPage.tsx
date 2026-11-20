import { useState } from "react";
import { useParams } from "react-router-dom";
import { drawsHooks } from "../../hooks";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import BracketClassificationModal from "../../components/Modals/BracketClassificationModal";
import { East, EmojiEvents } from "@mui/icons-material";

const EventClassificationDetailsPage = () => {
  const { id: eventId } = useParams<{ id: string }>();
  const [selectedBracket, setSelectedBracket] = useState<string | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = (bracketId: string) => {
    setSelectedBracket(bracketId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { data: bracketsData, isLoading: isBracketsLoading } =
    drawsHooks.useBracketsData(eventId!);

  return (
    <>
      <PageInfoCard
        title={`Classificações de ${eventId}`}
        description={
          "Consulte as classificações deste Evento, clicando em um dos Escalões. Poderá depois fazer download do ficheiro com todos os resultados."
        }
      ></PageInfoCard>
      <Grid
        container
        size={12}
        spacing={{ xs: 1.5, sm: 2 }}
        sx={{ mx: { xs: 1, sm: 2 }, mt: { xs: 2, sm: 3 } }}
      >
        {isBracketsLoading ? (
          [0, 1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
              <Card
                variant="outlined"
                sx={{ height: "100%", borderColor: "divider", borderRadius: 3 }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                  <Skeleton width="70%" height={32} />
                  <Skeleton width="100%" sx={{ mt: 2 }} />
                  <Skeleton width="100%" />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : bracketsData?.length === 0 ? (
          <Grid size={12}>
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
                  Não foram encontrados escalões.
                </Typography>
                <Typography color="text.secondary">
                  Os escalões deste evento aparecerão aqui quando estiverem
                  disponíveis.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          <>
            {bracketsData?.map((bracket) => (
              <Grid
                key={bracket.id}
                size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}
                sx={{ display: "flex" }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 3,
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    transition:
                      "border-color 160ms ease, box-shadow 160ms ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      boxShadow: 2,
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => handleModalOpen(String(bracket.id))}
                    aria-label={`Consultar classificações de ${bracket.name}`}
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "stretch",
                      textAlign: "left",
                    }}
                  >
                    <CardContent
                      sx={{
                        width: "100%",
                        p: { xs: 2, sm: 2.5 },
                        "&:last-child": { pb: { xs: 2, sm: 2.5 } },
                      }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{ overflowWrap: "anywhere" }}
                        >
                          {bracket.name}
                        </Typography>
                      </Box>
                      <Grid container spacing={1.5} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Box
                            sx={{
                              p: 1.5,
                              height: "100%",
                              border: "1px solid",
                              borderColor: "divider",
                              borderRadius: 2,
                              bgcolor: "action.hover",
                            }}
                          >
                            <Typography
                              variant="overline"
                              color="text.secondary"
                            >
                              Idade (anos)
                            </Typography>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              spacing={1}
                            >
                              <Box>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Mín.
                                </Typography>
                                <Typography fontWeight={700}>
                                  {bracket.category.min_age ?? "N/A"}
                                </Typography>
                              </Box>
                              <Box sx={{ textAlign: "right" }}>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Máx.
                                </Typography>
                                <Typography fontWeight={700}>
                                  {bracket.category.max_age ?? "N/A"}
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <Box
                            sx={{
                              p: 1.5,
                              height: "100%",
                              border: "1px solid",
                              borderColor: "divider",
                              borderRadius: 2,
                              bgcolor: "action.hover",
                            }}
                          >
                            <Typography
                              variant="overline"
                              color="text.secondary"
                            >
                              Peso (kg)
                            </Typography>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              spacing={1}
                            >
                              <Box>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Mín.
                                </Typography>
                                <Typography fontWeight={700}>
                                  {bracket.category.min_weight ?? "N/A"}
                                </Typography>
                              </Box>
                              <Box sx={{ textAlign: "right" }}>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Máx.
                                </Typography>
                                <Typography fontWeight={700}>
                                  {bracket.category.max_weight ?? "N/A"}
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                        </Grid>
                      </Grid>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 2, color: "primary.main" }}
                      >
                        <Typography variant="body2" fontWeight={700}>
                          Ver classificações
                        </Typography>
                        <East fontSize="small" />
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </>
        )}
      </Grid>
      <BracketClassificationModal
        bracketId={selectedBracket!}
        bracketName={
          bracketsData?.find((item) => String(item.id) === selectedBracket!)
            ?.name!
        }
        handleModalClose={handleModalClose}
        isModalOpen={isModalOpen}
      ></BracketClassificationModal>
    </>
  );
};

export default EventClassificationDetailsPage;
