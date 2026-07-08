import { Typography, Grid } from "@mui/material";
import { membershipsHooks } from "../../hooks";
import { useSnackbar } from "notistack";
import InfoBaseModal from "../base-modals/InfoBaseModal";

export default function DuplicateMemberModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    memberData?: any;
  }>,
) {
  const { enqueueSnackbar } = useSnackbar();

  const createMembership = membershipsHooks.useCreateMemberShip();
  const handleSubmit = () => {
    const formData: { member_type: any; person: string } = {
      member_type: props.memberData?.member_types?.some(
        (mt: any) => mt.member_type === "coach",
      )
        ? "student"
        : "coach",
      person: props.memberData?.id,
    };
    createMembership.mutate(formData, {
      onSuccess: () => {
        props.handleModalClose();
      },
      onError: (data: any) => {
        const errorData = data.response?.data || {};
        if (errorData.non_field_errors?.[0]) {
          enqueueSnackbar("Já existe um membro com esta informação!", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            autoHideDuration: 5000,
            preventDuplicate: true,
          });
        }
      },
    });
  };

  return (
    <InfoBaseModal
      isModalOpen={props.isModalOpen}
      handleModalClose={() => {
        props.handleModalClose();
      }}
      title={`Duplicar ${props.memberData?.full_name}`}
      onSubmit={handleSubmit}
      size="sm"
    >
      <Grid px={2}>
        {props.memberData?.member_types?.some(
          (mt: any) => mt.member_type === "coach",
        ) ? (
          <Grid>
            <Typography>
              Esta ação irá duplicar este Membro para <strong>Aluno</strong>.
            </Typography>
            <Typography>Deseja prosseguir?</Typography>
          </Grid>
        ) : (
          <Grid>
            <Typography>
              Esta ação irá duplicar este Membro para <strong>Treinador</strong>
              .
            </Typography>
            <Typography>Deseja prosseguir?</Typography>
          </Grid>
        )}
      </Grid>
    </InfoBaseModal>
  );
}
