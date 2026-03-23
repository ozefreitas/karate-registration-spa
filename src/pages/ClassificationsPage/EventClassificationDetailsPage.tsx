import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { drawsHooks } from "../../hooks";
import {
  Button,
  Card,
  CardContent,
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
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const navigate = useNavigate();

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
                    p: 2,
                    height: "100%",
                    width: "100%",
                    transition: "0.3s",
                    border: "4px",
                    borderColor: "transparent",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: 6,
                      borderColor: "red",
                      cursor: "pointer",
                    },
                  }}
                >
                  <CardContent sx={{ width: "100%" }}>
                    <Grid container direction={"column"} size={12} spacing={2}>
                      <Grid
                        container
                        justifyContent={"center"}
                        size={12}
                        pt={2}
                        alignItems={"center"}
                        textAlign={"center"}
                      >
                        <Typography variant="h5">{bracket.name}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          ))
        )}
        <Grid container size={12} justifyContent={"flex-end"}>
          <Button onClick={() => navigate("/classifications/")}>Voltar</Button>
        </Grid>
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
