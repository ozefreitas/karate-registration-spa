import { Grid, Button } from "@mui/material";
import {
  Casino,
  DynamicForm,
  FileDownload,
  Feedback,
} from "@mui/icons-material";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
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

  const { data: bracketsData } = drawsHooks.useBracketsData(eventId!);
  const generateDrawPDF = eventsHooks.useGenerateDrawPDF();

  const handleDownloadPdf = async () => {
    const { data } = await generateDrawPDF.mutateAsync({
      eventId: eventId!,
      data: {},
    });
    if (data) {
      const url = globalThis.URL.createObjectURL(data.data);
      const link = document.createElement("a");
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
      globalThis.URL.revokeObjectURL(url);
    }
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
            pb={1}
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
            pb={1}
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
              onClick={() => navigate("dynamic_view/")}
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
                color="secondary"
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
