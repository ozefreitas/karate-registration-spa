import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { membersHooks } from "../../hooks";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditIndividualModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    handleEditModalOpen: any;
    id: string;
  }>
) {
  const { data: fetchSingleAthlete } = membersHooks.useFetchSingleMemberData(
    props.id
  );

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const formData = {
      firstName: fetchSingleAthlete?.data.first_name,
      lastName: fetchSingleAthlete?.data.last_name,
      graduation: fetchSingleAthlete?.data.graduation,
      category: fetchSingleAthlete?.data.category,
      gender: fetchSingleAthlete?.data.gender,
      id_number: fetchSingleAthlete?.data.id_number,
      is_student: fetchSingleAthlete?.data.is_student,
      birthDate: fetchSingleAthlete?.data.birth_date,
    };
    // props.reset(formData);
    props.handleModalClose();
    props.handleEditModalOpen();
  };

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle>
        <Typography variant="h5">Editar Atleta</Typography>
      </DialogTitle>
      <DialogContent>
        Não é possível editar uma Inscrição, apenas o pode fazer no própria
        Atleta. <br />
        Ao clicar em <strong>Continuar</strong>, irá editar o Atleta, mudando
        todas as inscrições dele.
      </DialogContent>
      <DialogActions>
        <Stack
          direction={{
            xs: "row-reverse",
            sm: "row",
          }}
          sx={{
            p: 2,
            gap: 4,
            flexShrink: 0,
            alignSelf: { xs: "flex-end", sm: "center" },
          }}
        >
          <Button
            size="small"
            onClick={(e) => handleEdit(e)}
            variant="contained"
          >
            Continuar
          </Button>
          <Button size="small" onClick={props.handleModalClose}>
            Voltar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
