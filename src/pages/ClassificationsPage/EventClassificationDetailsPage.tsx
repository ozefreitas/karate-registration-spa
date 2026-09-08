import { useState } from "react";
import { useParams } from "react-router-dom";
import { drawsHooks } from "../../hooks";
import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import BracketClassificationModal from "../../components/Modals/BracketClassificationModal";

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
      <Grid container size={12} spacing={3} m={6}>
        {isBracketsLoading ? (
          <Grid m={5} container justifyContent={"center"} size={12}>
            <CircularProgress />
          </Grid>
        ) : bracketsData?.length === 0 ? (
          <Grid m={5} container justifyContent="center" size={12}>
            <Typography variant="h6" sx={{ color: "gray" }}>
              Não foram encontradas Modalidades.
            </Typography>
          </Grid>
        ) : (
          bracketsData?.map((bracket, index: number) => (
            <Grid key={index} size={{ xl: 3, lg: 4, md: 6, xs: 12 }}>
              <Tooltip title="Consultar" placement="top">
                <Card
                  onClick={() => {
                    handleModalOpen(String(bracket.id));
                  }}
                  sx={{
                    // p: 2,
                    height: "100%",
                    width: "100%",
                    transition: "0.3s",
                    border: 1,
                    borderColor: "transparent",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: 6,
                      borderColor: "red",
                      cursor: "pointer",
                    },
                  }}
                >
                  <CardContent sx={{ width: "100%", p: 3 }}>
                    <Grid
                      container
                      size={12}
                      justifyContent={"center"}
                      alignItems={"center"}
                      p={2}
                      spacing={2}
                      textAlign={"center"}
                    >
                      <Typography variant="h5" mb={2}>
                        {bracket.name}
                      </Typography>
                      <Grid size={12} container justifyContent={"center"}>
                        <Chip
                          size="small"
                          label={`Idade Min.: ${
                            bracket.category.min_age ?? "N/A"
                          } anos`}
                        ></Chip>
                        <Chip
                          size="small"
                          label={`Idade Máx.: ${
                            bracket.category.max_age ?? "N/A"
                          } anos`}
                        ></Chip>
                      </Grid>
                      <Grid size={12} container justifyContent={"center"}>
                        <Chip
                          size="small"
                          label={`Peso Min.: ${
                            bracket.category.min_weight ?? "N/A"
                          } ${bracket.category.min_weight ? "Kg" : ""}`}
                        ></Chip>
                        <Chip
                          size="small"
                          label={`Peso Máx.: ${
                            bracket.category.max_weight ?? "N/A"
                          } ${bracket.category.max_weight ? "Kg" : ""}`}
                        ></Chip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          ))
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
