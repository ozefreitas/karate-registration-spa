import { Grid, Button } from "@mui/material";
import {
  Casino,
  DynamicForm,
  FileDownload,
  Feedback,
} from "@mui/icons-material";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import bannerLigaSoshinkai from "./../../assets/sorteios_1_Jornadaa_liga_2526.jpg";
import SettingsButton from "../../components/Buttons/SettingsButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import DeleteDrawModal from "../../components/Modals/DeleteDrawModal";
import AddButton from "../../components/Buttons/AddButton";
import { eventsHooks, drawsHooks } from "../../hooks";
import FormCard from "../../dashboard/FormCard";

export default function RulesPage(props: Readonly<{ userRole: string }>) {
  const { id: eventId } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };
  const navigate = useNavigate();
  const DrawSettings: {
    image: string;
    file: string;
    rename: string;
  } = {
    image: bannerLigaSoshinkai,
    file: "/files/Sorteios_1_Jornada_Liga_Soshinkai_22_11_25.pdf",
    rename: "Sorteios_1_Jornada_Liga_Soshinkai_22_11_25",
  };

  const { data: bracketsData } = drawsHooks.useBracketsData(eventId!);
  const generateDrawPDF = eventsHooks.useGenerateDrawPDF();

  const handleDownloadPdf = () => {
    generateDrawPDF.mutate({
      eventId: eventId!,
      data: {},
    });
  };

  return (
    <div>
      <PageInfoCard
        description={
          ["main_admin", "superuser", "single_admin"].includes(
            props.userRole,
          ) ? (
            <>
              Aqui poderá fazer download dos Sorteios disponibilizados para o
              Evento selecionado.<p></p>
              Pode também gerar novos sorteios, alterar sorteios e iniciar a
              vista de Competição.
            </>
          ) : (
            <>
              Aqui poderá fazer download dos Sorteios disponibilizados para os
              Eventos em vigor.<p></p>
              Pode também iniciar a vista Dinâmica, ou comunicar um problema com
              o sorteio.
            </>
          )
        }
        title="Sorteios"
      ></PageInfoCard>
      <Grid container size={12}>
        <FormCard title="Ficheiro">
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            pt={1}
            px={2}
            size={12}
          >
            <Button
              size="medium"
              startIcon={<FileDownload></FileDownload>}
              variant="contained"
              disabled
            >
              Download
            </Button>
          </Grid>
        </FormCard>
        <FormCard title="Ações">
          <Grid
            container
            pt={1}
            px={2}
            size={12}
            spacing={5}
            rowSpacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              color="primary"
              variant="contained"
              disabled={bracketsData?.length === 0}
              startIcon={<DynamicForm></DynamicForm>}
            >
              Vista Dinâmica
            </Button>
            {["main_admin", "superuser"].includes(props.userRole) ? (
              <>
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<Casino></Casino>}
                  onClick={() => navigate("generate/")}
                >
                  Gerar Novo Sorteio
                </Button>
                <SettingsButton
                  label="Alterar Sorteio"
                  disabled={bracketsData?.length === 0}
                  size="medium"
                  to="patch/"
                ></SettingsButton>
                <DeleteButton
                  label="Eliminar Sorteio"
                  disabled={bracketsData?.length === 0}
                  id={eventId!}
                  size="medium"
                  handleModalOpen={handleDeleteModalOpen}
                ></DeleteButton>
                <AddButton
                  label="Gerar novo documento"
                  size="medium"
                  disabled={bracketsData?.length === 0}
                  action={handleDownloadPdf}
                ></AddButton>
              </>
            ) : (
              <Button
                color="primary"
                variant="contained"
                disabled={bracketsData?.length === 0}
                startIcon={<Feedback></Feedback>}
              >
                Comunicar Problema
              </Button>
            )}
          </Grid>
        </FormCard>
      </Grid>
      <DeleteDrawModal
        eventId={eventId!}
        handleModalClose={handleDeleteModalClose}
        isModalOpen={isDeleteModalOpen}
      ></DeleteDrawModal>
    </div>
  );
}
