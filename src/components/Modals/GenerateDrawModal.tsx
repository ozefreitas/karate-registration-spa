import { Typography } from "@mui/material";
import InfoBaseModal from "../base-modals/InfoBaseModal";

export default function GenerateDrawModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    eventId: string;
    willOverwrite: any;
    submitFunction: any;
    loading: boolean;
  }>,
) {
  const handleGenerate = async () => {
    props.submitFunction();
  };

  return (
    <InfoBaseModal
      isModalOpen={props.isModalOpen}
      handleModalClose={() => {
        props.handleModalClose();
      }}
      title="Gerar Sorteio"
      onSubmit={() => handleGenerate()}
      size="sm"
    >
      {props.willOverwrite ? (
        <Typography px={2}>
          Já existe um sorteio para este Evento.<p></p>
          Gerar um novo sorteio irá eliminar permanentemente o sorteio anterior.{" "}
          <p></p>
          Deseja continuar? Esta ação é <strong>IRREVERSÍVEL!</strong>
        </Typography>
      ) : (
        <Typography px={2} mb={1}>
          Esta ação irá criar um novo sorteio para todos os Escalões
          selecionados para cada uma das Modalidades.<p></p>
          Mais tarde, e antes do dia de início da prova, poderá apagar ou gerar
          um novo sorteio nesta página.<p></p>
          Deseja continuar?
        </Typography>
      )}
    </InfoBaseModal>
  );
}
