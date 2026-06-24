import { Grid } from "@mui/material";
import { drawsHooks } from "../../hooks";
import InfoBaseModal from "../base-modals/InfoBaseModal";

export default function DeleteDrawModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    eventId: string;
  }>,
) {
  const deleteDraw = drawsHooks.useDeleteDraw();

  const handleDelete = () => {
    deleteDraw.mutate(props.eventId, {
      onSuccess: () => props.handleModalClose(),
    });
  };

  return (
    <InfoBaseModal
      isModalOpen={props.isModalOpen}
      handleModalClose={() => {
        props.handleModalClose();
      }}
      title="Eliminar Sorteio"
      onSubmit={() => handleDelete()}
      size="sm"
    >
      <Grid px={2}>
        Esta ação irá eliminar o sorteio gerado para este Evento. <p></p> Todos
        os Clubes perderão acesso a este sorteio e serão notificados de tal.{" "}
        <p></p>
        Deseja continuar? Esta ação é <strong> IRREVERSÍVEL</strong>!
      </Grid>
    </InfoBaseModal>
  );
}
