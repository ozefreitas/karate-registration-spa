import { Typography, Grid, Chip } from "@mui/material";
import { monthlyPaymentsHooks } from "../../hooks";
import InfoBaseModal from "../base-modals/InfoBaseModal";

export default function PatchMemberSubscriptionModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
    paymentObj: any;
  }>,
) {
  const patchClubSubscription =
    monthlyPaymentsHooks.usePatchMonthlyMemberSubscriptionData();

  const handleSubmit = () => {
    const payload = { paid: !props.paymentObj.paid };
    patchClubSubscription.mutate({
      monthlySubscriptionId: props.paymentObj.id,
      data: payload,
    });
    props.handleClose();
  };

  return (
    <InfoBaseModal
      isModalOpen={props.isOpen}
      handleModalClose={() => {
        props.handleClose();
      }}
      title="Alteração de estado de pagamento"
      onSubmit={() => handleSubmit()}
      size="sm"
      chipName={`${props.paymentObj.month} de ${props.paymentObj.year}`}
    >
      <Grid
        container
        spacing={1}
        direction={"column"}
        px={2}
        justifyContent={"center"}
      >
        <Typography px={1}>
          Esta ação irá atualizar o estado do pagamento de:
        </Typography>
        <Chip
          color={props.paymentObj.paid ? "success" : "error"}
          label={props.paymentObj.paid ? "Pago" : "Em Falta"}
        ></Chip>
        <Typography px={1}>para:</Typography>
        <Chip
          color={props.paymentObj.paid ? "error" : "success"}
          label={props.paymentObj.paid ? "Em Falta" : "Pago"}
        ></Chip>
        <Typography mt={2} px={1}>
          Tem a certeza que pretende continuar? Poderá desfazer esta ação mais
          tarde.
        </Typography>
      </Grid>
    </InfoBaseModal>
  );
}
