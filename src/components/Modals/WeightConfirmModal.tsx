import { Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InfoBaseModal from "../base-modals/InfoBaseModal";

export default function WeightConfirmModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    id?: string | null;
  }>,
) {
  const navigate = useNavigate();

  return (
    <InfoBaseModal
      isModalOpen={props.isModalOpen}
      handleModalClose={() => {
        props.handleModalClose();
      }}
      title="Novo peso adicionado"
      onSubmit={() => navigate(`/events/${props.id}/individuals/`)}
      size="sm"
    >
      <Grid px={2}>
        <Typography>
          Peso adicionado com sucesso. Deseja voltar à página de Inscrições?
        </Typography>
      </Grid>
    </InfoBaseModal>
  );
}
